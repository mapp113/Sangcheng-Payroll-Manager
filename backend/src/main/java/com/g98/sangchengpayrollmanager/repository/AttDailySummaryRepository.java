package com.g98.sangchengpayrollmanager.repository;

import com.g98.sangchengpayrollmanager.model.entity.AttDailySummary;
import com.g98.sangchengpayrollmanager.model.entity.AttMonthSummary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttDailySummaryRepository extends JpaRepository<AttDailySummary,Integer> {
    List<AttDailySummary> findByUserEmployeeCodeAndDateBetween(String employeeCode, LocalDate fromDate, LocalDate toDate);
}
