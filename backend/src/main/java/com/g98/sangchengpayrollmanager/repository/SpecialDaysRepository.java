package com.g98.sangchengpayrollmanager.repository;

import com.g98.sangchengpayrollmanager.model.entity.SpecialDays;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface SpecialDaysRepository extends JpaRepository<SpecialDays, Integer> {
    boolean existsByDate(LocalDate date);
}
