package com.g98.sangchengpayrollmanager.repository;

import com.g98.sangchengpayrollmanager.model.entity.LeaveBalance;
import com.g98.sangchengpayrollmanager.model.entity.LeaveType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LeaveBalanceRepository  extends JpaRepository<LeaveBalance, Long> {

    @Query("SELECT lb FROM LeaveBalance lb WHERE lb.user.employeeCode = :employeeCode")
    Optional<LeaveBalance> findByEmployeeCode(@Param("employeeCode")  String employeeCode);
}
