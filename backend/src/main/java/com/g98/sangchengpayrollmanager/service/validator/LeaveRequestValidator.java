package com.g98.sangchengpayrollmanager.service.validator;

import com.g98.sangchengpayrollmanager.model.dto.LeaveRequestCreateDTO;
import com.g98.sangchengpayrollmanager.model.entity.LeaveType;
import com.g98.sangchengpayrollmanager.model.enums.DurationType;
import com.g98.sangchengpayrollmanager.repository.LeaveTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

import static io.micrometer.common.util.StringUtils.isBlank;

@Component
@RequiredArgsConstructor
public class LeaveRequestValidator {

    private final LeaveTypeRepository leaveTypeRepository;

    public record ValidatedLeaveInputs(
            LeaveType leaveType,
            DurationType durationType
    ) {
    }

    public ValidatedLeaveInputs validateLeaveRequest(LeaveRequestCreateDTO dto) {
        //Null
        if (dto.getFromDate() == null) throw new IllegalArgumentException("fromDate là bắt buộc");
        if (isBlank(dto.getDuration())) throw new IllegalArgumentException("duration là bắt buộc");
        if (isBlank(dto.getLeaveType())) throw new IllegalArgumentException("leaveType là bắt buộc");
        if (isBlank(dto.getReason())) throw new IllegalArgumentException("reason là bắt buộc");

        if (dto.getReason().length() > 255) {
            throw new IllegalArgumentException("reason tối đa 255 ký tự");
        }
        //  Parse enum duration + quy tắc theo duration

//        if ((durationType == DurationType.HALF_DAY_AM || durationType == DurationType.HALF_DAY_PM)
//                && !from.equals(to)) {
//            throw new IllegalArgumentException("Nghỉ nửa ngày yêu cầu fromDate = toDate");
//        }

        DurationType durationType;
        try {
            durationType = DurationType.valueOf(dto.getDuration().trim().toUpperCase());
        } catch (Exception ex) {
            throw new IllegalArgumentException("duration không hợp lệ (FULL_DAY, HALF_DAY_AM, HALF_DAY_PM)");
        }

        LeaveType leaveType = leaveTypeRepository.findByCodeIgnoreCase(dto.getLeaveType())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy loại nghỉ: " + dto.getLeaveType()));

        return new ValidatedLeaveInputs(leaveType, durationType);
    }
}
