package com.g98.sangchengpayrollmanager.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "att_daily_summary")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttDailySummary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_code", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    @Column(name = "work_hours", nullable = false)
    private Integer workHours;

    @Column(name = "ot_hour")
    private Integer otHour;

    @Column(name = "is_day_meal")
    private Boolean isDayMeal;

    @Column(name = "is_trial_day")
    private Boolean isTrialDay;

    @Column(name = "is_payable_day")
    private Boolean isPayableDay;

    @Column(name = "is_count_payable_day")
    private Boolean isCountPayableDay;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "day_type_id")
    private DayType dayType;

    @Column(name = "check_in_time")
    private LocalDateTime checkInTime;

    @Column(name = "check_out_time")
    private LocalDateTime checkOutTime;

    @Column(name = "late_minutes")
    private Integer lateMinutes;

    @Column(name = "is_late_counted", nullable = false)
    private Boolean isLateCounted;

    @Column(name = "early_leave_minutes")
    private Integer earlyLeaveMinutes;

    @Column(name = "is_early_leave_counted", nullable = false)
    private Boolean isEarlyLeaveCounted;

    @Column(name = "leave_type_code")
    private String leaveTypeCode;

    @Column(name = "is_absent")
    private Boolean isAbsent;
}

