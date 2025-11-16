package com.g98.sangchengpayrollmanager.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "att_policy")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttPolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 100)
    private String name;

    @Column(length = 255)
    private String description;

    @Column(name = "standard_hours_per_day", nullable = false)
    private Integer standardHoursPerDay;

    @Column(name = "min_hours_for_payable", nullable = false)
    private Integer minHoursForPayable;

    @Column(name = "min_hours_for_full_day", nullable = false)
    private Integer minHoursForFullDay;

    @Column(name = "min_hours_for_meal", nullable = false)
    private Integer minHoursForMeal;

    @Column(name = "late_grace_minutes", nullable = false)
    private Integer lateGraceMinutes;

    @Column(name = "late_max_minutes_for_payable", nullable = false)
    private Integer lateMaxMinutesForPayable;

    @Column(name = "early_grace_minutes", nullable = false)
    private Integer earlyGraceMinutes;

    @Column(name = "early_max_minutes_for_payable")
    private Integer earlyMaxMinutesForPayable;

    @Column(name = "ot_rounding_unit_minutes", nullable = false)
    private Integer otRoundingUnitMinutes;

    @Column(name = "apply_scope", length = 50, nullable = false)
    private String applyScope;
}

