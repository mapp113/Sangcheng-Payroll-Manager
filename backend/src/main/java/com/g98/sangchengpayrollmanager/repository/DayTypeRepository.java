package com.g98.sangchengpayrollmanager.repository;

import com.g98.sangchengpayrollmanager.model.entity.DayType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DayTypeRepository extends JpaRepository<DayType, Integer> {
    Optional<DayType> findByNameIgnoreCase(String name);
}
