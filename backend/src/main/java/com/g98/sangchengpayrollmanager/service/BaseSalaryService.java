package com.g98.sangchengpayrollmanager.service;

import com.g98.sangchengpayrollmanager.model.entity.AttDailySummary;
import com.g98.sangchengpayrollmanager.model.entity.AttMonthSummary;
import com.g98.sangchengpayrollmanager.model.entity.SalaryInformation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BaseSalaryService {

    public int calculateBaseSalaryAmt(LocalDate monthStart, LocalDate monthEnd, List<AttDailySummary> adsList, AttMonthSummary ams, List<SalaryInformation> salaryInformationList) {
        // Guard
        if (ams == null || salaryInformationList == null || salaryInformationList.isEmpty()) {
            return 0;
        }

        BigDecimal dayStandard = ams.getDayStandard();
        if (dayStandard == null || dayStandard.compareTo(BigDecimal.ZERO) == 0) {
            return 0;
        }

        // 2. Tính tổng lương cơ bản prorate
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (SalaryInformation si : salaryInformationList) {

            // giao khoảng hiệu lực lương với tháng đang tính
            LocalDate effFrom = si.getEffectiveFrom().isAfter(monthStart) ? si.getEffectiveFrom() : monthStart;
            LocalDate effTo = (si.getEffectiveTo() == null || si.getEffectiveTo().isAfter(monthEnd))
                    ? monthEnd : si.getEffectiveTo();

            if (effFrom.isAfter(effTo)) {
                continue;
            }

            // Số ngày (hoặc phần ngày) được trả lương trong đoạn hiệu lực này
            BigDecimal payableDays = calculatePayableDaysInRange(effFrom, effTo, adsList, ams);
            // payableDays là BigDecimal, ví dụ 5.5 ngày tương đương (có nửa ngày làm)

            // baseSalary của mức lương này
            BigDecimal baseSalary = BigDecimal.valueOf(si.getBaseSalary());

            // số tiền lương theo từng khoảng trong tháng
            // Lương cơ bản tháng(theo từng base) * (số ngày được trả của khoảng này / ngày công chuẩn tháng)
            BigDecimal prorated = baseSalary
                    .multiply(payableDays)                       // baseSalary * payableDays
                    .divide(dayStandard, 2, RoundingMode.HALF_UP); // rồi chia cho chuẩn ngày công của tháng

            totalAmount = totalAmount.add(prorated);
        }

        // 3. Trả int
        return totalAmount.setScale(0, RoundingMode.HALF_UP).intValueExact();
    }

    public BigDecimal calculatePayableDaysInRange(LocalDate from, LocalDate to, List<AttDailySummary> adsList, AttMonthSummary ams){
        if (from == null || to == null || adsList == null || ams == null) {
            return BigDecimal.ZERO;
        }

        BigDecimal standardHoursPerDay = ams.getStandardHoursPerDay();
        if (standardHoursPerDay.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }

        BigDecimal total = BigDecimal.ZERO;

        for (AttDailySummary ads : adsList) {

            LocalDate d = ads.getDate();
            if (d == null) continue;

            // check d trong [from, to]
            boolean inRange = ( !d.isBefore(from) ) && ( !d.isAfter(to) );
            if (!inRange) {
                continue;
            }

            // 1) nếu ngày này được trả full lương (is_payable_day = 1) => cộng 1.0
            if (ads.getIsPayableDay()) {
                total = total.add(BigDecimal.ONE);
                continue;
            }

            // 2) nếu không flag payable full day nhưng vẫn có giờ làm thực tế
            // tạm xử lí được OT only day với workHours = 0 chỉ ghi vào ot_hours
            Integer workHours = ads.getWorkHours();
            if (workHours != null && workHours > 0) {
                // fractionOfDay = workHours / standardHoursPerDay
                BigDecimal fractionOfDay = BigDecimal
                        .valueOf(workHours)
                        .divide(standardHoursPerDay, 1, RoundingMode.HALF_UP);

                // ví dụ làm 4/8h -> +0.5 ngày
                total = total.add(fractionOfDay);
            }
        }
        return total;
    }
}
