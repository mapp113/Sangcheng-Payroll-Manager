package com.g98.sangchengpayrollmanager.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "legal_policy")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LegalPolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false, length = 50)
    private String code;

    @Column(nullable = false, length = 200)
    private String description;

    @Column(name = "calculation_type", nullable = false, length = 50)
    private String calculationType;

    @Column(name = "apply_scope", nullable = false, length = 20)
    private String applyScope;

    private Integer amount;

    private Double percent;

    @Column(name = "effective_from", nullable = false)
    private LocalDate effectiveFrom;

    @Column(name = "effective_to")
    private LocalDate effectiveTo;
}

