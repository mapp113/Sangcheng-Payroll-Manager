package com.g98.sangchengpayrollmanager.service;

import com.g98.sangchengpayrollmanager.model.dto.OT.OvertimeRequestResponse;
import com.g98.sangchengpayrollmanager.model.dto.OvertimeRequestCreateDTO;
import org.springframework.data.domain.Page;

public interface OvertimeRequestService {

    OvertimeRequestResponse submitOvertimeRequest(OvertimeRequestCreateDTO dto);

    Page<OvertimeRequestResponse> getAllOvertimeRequests(int page, int size);

    Page<OvertimeRequestResponse> getPendingOvertimeRequests(int page, int size);

    OvertimeRequestResponse approveOvertimeRequest(Integer overtimeRequestId, String note);

    OvertimeRequestResponse rejectOvertimeRequest(Integer overtimeRequestId, String note);
}
