package com.g98.sangchengpayrollmanager.controller;

import com.g98.sangchengpayrollmanager.model.dto.OT.OvertimeRequestResponse;
import com.g98.sangchengpayrollmanager.model.dto.OvertimeRequestCreateDTO;
import com.g98.sangchengpayrollmanager.service.OvertimeRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/overtime")
@RequiredArgsConstructor
public class OvertimeRequestController {

    private final OvertimeRequestService overtimeRequestService;

    // Nhân viên submit OT
    @PostMapping(value = "/submit", consumes = {"multipart/form-data"})
    public ResponseEntity<OvertimeRequestResponse> submitOvertimeRequest(
            @RequestBody OvertimeRequestCreateDTO dto
    ) {
        return ResponseEntity.ok(overtimeRequestService.submitOvertimeRequest(dto));
    }


    // Duyệt đơn xin overtime
    @PostMapping("/approve/{id}")
    public ResponseEntity<OvertimeRequestResponse> approveOvertimeRequest(
            @PathVariable Integer id,
            @RequestParam(required = false) String note
    ) {
        return ResponseEntity.ok(overtimeRequestService.approveOvertimeRequest(id, note));
    }

    // Reject đơn xin overtime
    @PostMapping("/reject/{id}")
    public ResponseEntity<OvertimeRequestResponse> rejectOvertimeRequest(
            @PathVariable Integer id,
            @RequestParam String note
    ) {
        return ResponseEntity.ok(overtimeRequestService.rejectOvertimeRequest(id, note));
    }
}
