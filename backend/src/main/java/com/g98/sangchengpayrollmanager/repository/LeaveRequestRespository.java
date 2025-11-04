package com.g98.sangchengpayrollmanager.repository;

import com.g98.sangchengpayrollmanager.model.entity.LeaveRequest;
import com.g98.sangchengpayrollmanager.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LeaveRequestRespository extends JpaRepository<LeaveRequest, Integer> {
    List<LeaveRequest> findByUser_EmployeeCode(String employeeCode);
}
