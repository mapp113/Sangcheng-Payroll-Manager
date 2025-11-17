package com.g98.sangchengpayrollmanager.scheduler;

import com.g98.sangchengpayrollmanager.model.entity.User;
import com.g98.sangchengpayrollmanager.service.AttDailySummaryService;
import com.g98.sangchengpayrollmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class AttDailySummaryScheduler {

    private final AttDailySummaryService attDailySummaryService;
    private final UserRepository userRepo;

    /**
     * Chạy lúc 23:55 mỗi ngày.
     * Cron format: second minute hour day-of-month month day-of-week
     * "0 55 23 * * ?" = 23:55:00 hàng ngày
     */
    @Scheduled(cron = "0 00 23 * * ?")
    public void generateDailySummariesForToday() {
        LocalDate date = LocalDate.now();      // nếu muốn chạy cho "hôm nay"
        // Nếu bạn muốn chạy 0h05 hôm sau nhưng tạo summary cho "hôm qua":
        // LocalDate date = LocalDate.now().minusDays(1);

        log.info("Start generate daily summaries for date {}", date);

        // Lấy danh sách nhân viên (tuỳ bạn có flag active thì dùng findByIsActiveTrue)
        List<User> users = userRepo.findAll();

        for (User user : users) {
            String empCode = user.getEmployeeCode();
            try {
                attDailySummaryService.createDailySummary(empCode, date);
            } catch (IllegalStateException ex) {
                // Trường hợp daily summary đã tồn tại, bỏ qua
                log.warn(ex.getMessage());
            } catch (Exception ex) {
                // Các lỗi khác: log lại để kiểm tra
                log.error("Error creating daily summary for {} on {}", empCode, date, ex);
            }
        }

        log.info("Finish generate daily summaries for date {}", date);
    }
}

