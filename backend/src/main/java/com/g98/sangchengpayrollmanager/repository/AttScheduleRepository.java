package com.g98.sangchengpayrollmanager.repository;

import com.g98.sangchengpayrollmanager.model.entity.AttSchedule;
import com.g98.sangchengpayrollmanager.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AttScheduleRepository extends JpaRepository<AttSchedule,Integer> {
    Optional<AttSchedule> findFirstByUserAndDayOfWeekAndStatus(
            User user,
            String dayOfWeek,
            String status
    );
}
