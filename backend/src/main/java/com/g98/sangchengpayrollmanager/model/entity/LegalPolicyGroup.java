package com.g98.sangchengpayrollmanager.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "legal_policy_group")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LegalPolicyGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "policy_code", referencedColumnName = "code", nullable = false)
    private LegalPolicy policy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "component_type_id", referencedColumnName = "id", nullable = false)
    private PayComponentType componentType;
}

