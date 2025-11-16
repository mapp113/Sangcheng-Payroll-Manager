package com.g98.sangchengpayrollmanager.repository;

import com.g98.sangchengpayrollmanager.model.entity.SpecialDays;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface SpecialDaysRepository extends JpaRepository<SpecialDays, Integer> {
    Optional<SpecialDays> findByDate(LocalDate date);
    boolean existsByDate(LocalDate date);
}
