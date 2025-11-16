package com.g98.sangchengpayrollmanager.repository;

import com.g98.sangchengpayrollmanager.model.entity.LeaveRequest;
import com.g98.sangchengpayrollmanager.model.entity.User;
import com.g98.sangchengpayrollmanager.model.enums.LeaveandOTStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Integer> {

    List<LeaveRequest> findByUser_EmployeeCode(String employeeCode);
    List<LeaveRequest> findByStatus(LeaveandOTStatus status);

    @Query("""
    SELECT lr FROM LeaveRequest lr
    WHERE lr.user = :user
      AND lr.status = :status
      AND lr.fromDate <= :date
      AND (lr.toDate IS NULL OR lr.toDate >= :date)
""")
    Optional<LeaveRequest> findByUserAndDateAndStatus(
            User user,
            LocalDate date,
            String status
    );

}
