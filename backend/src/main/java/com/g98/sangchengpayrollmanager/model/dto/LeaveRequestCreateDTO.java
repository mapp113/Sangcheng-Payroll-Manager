package com.g98.sangchengpayrollmanager.model.dto;

import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;


@Data

public class LeaveRequestCreateDTO {

    private String employeeCode;
   // private String fullName;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate fromDate;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate toDate;

    private String leaveType;

    @NotNull
    private String duration;

    @NotNull
    private String reason;

    private MultipartFile attachment;


}
