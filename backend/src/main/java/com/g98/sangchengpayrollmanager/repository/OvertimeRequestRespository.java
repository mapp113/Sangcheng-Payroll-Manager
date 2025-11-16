package com.g98.sangchengpayrollmanager.repository;


import com.g98.sangchengpayrollmanager.model.dto.OT.OvertimeRequestResponse;
import com.g98.sangchengpayrollmanager.model.entity.OvertimeRequest;
import com.g98.sangchengpayrollmanager.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
    public interface OvertimeRequestRespository extends JpaRepository<OvertimeRequest, Integer> {

        Optional<OvertimeRequestResponse> findOvertimeRequestById(Integer overtimeRequestId);
        List<OvertimeRequest> findByStatus(String status);

    @Query("""
        SELECT ot FROM OvertimeRequest ot
        WHERE ot.user = :user
          AND ot.status = :status
          AND DATE(ot.fromTime) = :date
    """)
    List<OvertimeRequest> findByUserAndDateAndStatus(
            @Param("user") User user,
            @Param("date") LocalDate date,
            @Param("status") String status
    );
}
