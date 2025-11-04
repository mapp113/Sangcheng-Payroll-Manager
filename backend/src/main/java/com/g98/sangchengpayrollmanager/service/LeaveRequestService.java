package com.g98.sangchengpayrollmanager.service;

import com.g98.sangchengpayrollmanager.model.entity.LeaveRequest;
import com.g98.sangchengpayrollmanager.model.enums.LeaveStatus;
import com.g98.sangchengpayrollmanager.repository.LeaveRequestRespository;

public class LeaveRequestService {

    private final LeaveRequestRespository leaveRequestRespository;

    public LeaveRequestService(LeaveRequestRespository leaveRequestRespository) {
        this.leaveRequestRespository = leaveRequestRespository;
    }

    public LeaveRequest submitLeaveRequest(LeaveRequest leaveRequest) {
        leaveRequest.setStatus(String.valueOf(LeaveStatus.PENDING));
        return leaveRequest;
    }
}
