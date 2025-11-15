package com.g98.sangchengpayrollmanager.service.impl;

import com.g98.sangchengpayrollmanager.model.dto.OT.OvertimeRequestResponse;
import com.g98.sangchengpayrollmanager.model.dto.OvertimeRequestCreateDTO;
import com.g98.sangchengpayrollmanager.model.entity.*;
import com.g98.sangchengpayrollmanager.model.enums.LeaveandOTStatus;
import com.g98.sangchengpayrollmanager.repository.*;
import com.g98.sangchengpayrollmanager.service.OvertimeRequestService;
import com.g98.sangchengpayrollmanager.service.validator.RequestValidator;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.hibernate.sql.ast.tree.expression.Over;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.WeekFields;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OvertimeRequestServiceImpl implements OvertimeRequestService {


    private final UserRepository userRepository;
    private final OvertimeRequestRespository overtimeRequestRespository;
    private final RequestValidator requestValidator;
    private final DayTypeRepository dayTypeRepository;
    private final SpecialDaysRepository specialDaysRepository;
    private final OvertimeBalanceRepository overtimeBalanceRepository;

    @Override
    public OvertimeRequestResponse submitOvertimeRequest(OvertimeRequestCreateDTO overtimeRequestDTO) {


        String username = getCurrentUsername();
        User user = userRepository.findByUsernameWithRole(username)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user: " + username));

        LocalDate otDate = requestValidator.validateOvertime(overtimeRequestDTO);

        WeekFields wf = WeekFields.of(Locale.getDefault());
//        int weekOfMonth = otDate.get(wf.weekOfMonth());
//        int weekOfYear = otDate.get(wf.weekOfYear());

        DayType dayType = resolveDayType(otDate);

        long workedHours = Duration.between(overtimeRequestDTO.getFromTime(),
                                            overtimeRequestDTO.getToTime()).toHours();

        LocalDate weekStart = otDate.with(java.time.DayOfWeek.MONDAY);
        LocalDate weekEnd   = otDate.with(java.time.DayOfWeek.SUNDAY);


        boolean hasOverlap = overtimeRequestRespository.existsOverlappingRequest(
                user.getEmployeeCode(),
                otDate,
                overtimeRequestDTO.getFromTime(),
                overtimeRequestDTO.getToTime());

        if (hasOverlap) {
            throw new IllegalArgumentException(
                    "Khoảng thời gian OT này bị trùng với một đơn OT khác (đang chờ duyệt hoặc đã được duyệt) trong cùng ngày."
            );
        }

        int weeklyHours = overtimeRequestRespository.sumWorkedHoursInWeek(
                user.getEmployeeCode(), weekStart, weekEnd);

        if(weeklyHours + workedHours > 10 ){
            throw new IllegalArgumentException(  "Tổng số giờ OT trong tuần (bao gồm đơn này) không được vượt quá 10 giờ. "
                                                  +"Hiện tại bạn đã đăng ký " + weeklyHours + " giờ trong tuần này.");
        }

        OvertimeRequest entity = mapToEntity(overtimeRequestDTO, user, otDate, dayType, (int) workedHours);
       OvertimeRequest savedOvertimeRequest = overtimeRequestRespository.save(entity);

        upsertOvertimeBalance(user, otDate, (int) workedHours, weeklyHours);

        return mapToResponse(savedOvertimeRequest);
    }

    @Override
    public Page<OvertimeRequestResponse> getAllOvertimeRequests(int page, int size) {
        return null;
    }

    @Override
    public Page<OvertimeRequestResponse> getPendingOvertimeRequests(int page, int size) {
        return null;
    }


    @Override
    public OvertimeRequestResponse approveOvertimeRequest(Integer overtimeRequestId, String note) {
        OvertimeRequest ot = overtimeRequestRespository.findById(overtimeRequestId)
                .orElseThrow(() -> new RuntimeException("Đơn xin overtime ko tồn tại: " + overtimeRequestId));
        if (!LeaveandOTStatus.PENDING.name().equals(ot.getStatus())) {
            throw new IllegalStateException("Chỉ duyệt đơn OT ở trạng thái PENDING");
        }

        ot.setStatus(LeaveandOTStatus.APPROVED.name());
        ot.setApprovedDateOT(LocalDateTime.now());
        ot.setNoteOT(note);
        return mapToResponse(overtimeRequestRespository.save(ot));
    }

    @Override
    public OvertimeRequestResponse rejectOvertimeRequest(Integer overtimeRequestId, String note) {
        OvertimeRequest ot = overtimeRequestRespository.findById(overtimeRequestId)
                .orElseThrow(() -> new RuntimeException("Overtime request not found"));

        if (!LeaveandOTStatus.PENDING.name().equals(ot.getStatus())) {
            throw new IllegalStateException("Chỉ duyệt đơn OT ở trạng thái PENDING");
        }

        ot.setStatus(LeaveandOTStatus.REJECTED.name());
        ot.setApprovedDateOT(LocalDateTime.now());
        ot.setNoteOT(note);
        return mapToResponse(overtimeRequestRespository.save(ot));

    }


    // tạo overtime_balance mới cho tuần đó
    private void upsertOvertimeBalance(User user, LocalDate otDate, int workedHours, int weeklyHours) {
        WeekFields wf = WeekFields.of(Locale.getDefault());
        int weekOfMonth = otDate.get(wf.weekOfMonth());
        int year  = otDate.getYear();
        int month = otDate.getMonthValue();

        OvertimeBalance balance = overtimeBalanceRepository.
                                  findByUserEmployeeCodeAndYearAndMonthAndWeekOfMonth(
                                          user.getEmployeeCode(), year, month, weekOfMonth )
                .orElseGet(() -> OvertimeBalance.builder()
                        .user(user)
                        .year(year)
                        .month(month)
                        .weekOfMonth(weekOfMonth)
                        .hourBalance(0)
                        .build()
                );
        balance.setHourBalance(weeklyHours + workedHours);

        overtimeBalanceRepository.save(balance);
    }


    // xác định dạng ngày ot
    private DayType resolveDayType(LocalDate otDate) {

        if (specialDaysRepository.existsByDate(otDate)) {
            return dayTypeRepository.findByNameIgnoreCase("Holiday")
                    .orElseThrow(() -> new IllegalArgumentException("khoong tìm thấy ngày lẽ "));
        }

        var dow = otDate.getDayOfWeek();
        if (dow == DayOfWeek.SATURDAY || dow == DayOfWeek.SUNDAY) {
            return dayTypeRepository.findByNameIgnoreCase("Weekend")
                    .orElseThrow(() -> new IllegalArgumentException("khoong tìm thấy ngày "));
        }

        return dayTypeRepository.findByNameIgnoreCase("Working Day")
                .orElseThrow(() -> new IllegalArgumentException("khoong tìm thấy ngày "));
    }


    // xác định ngươời gửi đơn
    public static String getCurrentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getName())) {
            throw new RuntimeException("ko co nguoi dung");
        }
        return auth.getName();
    }



    private OvertimeRequest mapToEntity(OvertimeRequestCreateDTO overtimeRequestDTO, User user, LocalDate otDate, DayType dayType, int workedHours) {
        LocalDateTime fromTime = overtimeRequestDTO.getFromTime();
        LocalDateTime toTime = overtimeRequestDTO.getToTime();

        return OvertimeRequest.builder()
                .otDate(otDate)
                .fromTime(fromTime)
                .toTime(toTime)
                .workedTime(workedHours)
                .user(user)
                .dayType(dayType)
                .reason(overtimeRequestDTO.getReason())
                .status(LeaveandOTStatus.PENDING.name())
                .createdDateOT(LocalDateTime.now())
                .build();

    }

    private OvertimeRequestResponse mapToResponse(OvertimeRequest entity) {
        return OvertimeRequestResponse.builder()
                .id(entity.getId())
                .employeeCode(entity.getUser().getEmployeeCode())
                .fullName(entity.getUser().getFullName())
                .fromTime(entity.getFromTime())
                .toTime(entity.getToTime())
                .workedTime(entity.getWorkedTime())
                .reason(entity.getReason())
                .dayTypeId(entity.getDayType().getId())
                .dayTypeName(entity.getDayType().getName())
                .status(LeaveandOTStatus.valueOf(entity.getStatus()))
                .createdDateOT(entity.getCreatedDateOT())
                .approvedDateOT(entity.getApprovedDateOT())
                .note(entity.getNoteOT())
                .build();
    }

}
