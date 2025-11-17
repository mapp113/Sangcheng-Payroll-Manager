package com.g98.sangchengpayrollmanager.scheduler;

import com.g98.sangchengpayrollmanager.model.entity.User;
import com.g98.sangchengpayrollmanager.repository.UserRepository;
import com.g98.sangchengpayrollmanager.service.AttMonthSummaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class MonthSummaryScheduler {

    private final AttMonthSummaryService attMonthSummaryService;
    private final UserRepository userRepository;

    /**
     * Chạy lúc 23:59 mỗi ngày
     * Cron format: second minute hour day month day-of-week
     * 0 59 23 * * ? = 23:59:00 mỗi ngày
     */
    @Scheduled(cron = "0 50 23 * * ?")
    public void generateMonthSummaryDaily() {

        LocalDate today = LocalDate.now();   // hôm nay
        LocalDate dateForSummary = today;    // tạo summary theo ngày hôm nay

        log.info("⏳ Running Month Summary Scheduler for date: {}", dateForSummary);

        // Lấy tất cả nhân viên
        List<User> users = userRepository.findAll();

        for (User user : users) {
            try {
                attMonthSummaryService.createMonthSummary(
                        user.getEmployeeCode(),
                        dateForSummary
                );
                log.info("✔ Created/Updated month summary for user {}", user.getEmployeeCode());
            } catch (Exception ex) {
                log.error("❌ Failed for user {}: {}",
                        user.getEmployeeCode(),
                        ex.getMessage());
            }
        }

        log.info("✅ Month Summary Scheduler completed.");
    }
}

