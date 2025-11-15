package com.g98.sangchengpayrollmanager.repository;


import com.g98.sangchengpayrollmanager.model.dto.OT.OvertimeRequestResponse;
import com.g98.sangchengpayrollmanager.model.entity.OvertimeRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
    public interface OvertimeRequestRespository extends JpaRepository<OvertimeRequest, Integer> {

        Optional<OvertimeRequestResponse> findOvertimeRequestById(Integer overtimeRequestId);
        List<OvertimeRequest> findByStatus(String status);

    @Query("""
       SELECT COALESCE(SUM(o.workedTime), 0)
       FROM OvertimeRequest o
       WHERE o.user.employeeCode = :empCode
         AND o.otDate BETWEEN :weekStart AND :weekEnd
         AND o.status IN ('PENDING', 'APPROVED')
       """)
    int sumWorkedHoursInWeek(@Param("empCode") String empCode,
                             @Param("weekStart") LocalDate weekStart,
                             @Param("weekEnd") LocalDate weekEnd);


    @Query("""
       SELECT COUNT(o) > 0
       FROM OvertimeRequest o
       WHERE o.user.employeeCode = :employeeCode
         AND o.otDate = :otDate
         AND o.status IN ('PENDING', 'APPROVED')
         AND (o.fromTime < :toTime AND o.toTime > :fromTime)
       """)
    boolean existsOverlappingRequest(String employeeCode,
                                     LocalDate otDate,
                                     LocalDateTime fromTime,
                                     LocalDateTime toTime);

}

