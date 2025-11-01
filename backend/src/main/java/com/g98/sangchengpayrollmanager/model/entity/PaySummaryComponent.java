package com.g98.sangchengpayrollmanager.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pay_summary_component")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaySummaryComponent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    // many component thuộc 1 pay_summary
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "pay_summary_id",
            referencedColumnName = "id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_psc_pay_summary")
    )
    private PaySummary paySummary;

    // giữ theo DB để query nhanh theo nhân viên
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "employee_code",
            referencedColumnName = "employee_code",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_psc_user")
    )
    private User user;

    @Column(name = "component_name", length = 100, nullable = false)
    private String componentName;

    @Column(name = "component_type", length = 50, nullable = false)
    private String componentType;  // ví dụ: ALLOWANCE, BONUS, DEDUCTION

    @Column(name = "amount", nullable = false)
    private Integer amount;        // âm nếu khấu trừ

    @Column(name = "note", length = 200)
    private String note;
}
