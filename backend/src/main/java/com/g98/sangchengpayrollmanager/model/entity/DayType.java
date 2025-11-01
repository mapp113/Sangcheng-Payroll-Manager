package com.g98.sangchengpayrollmanager.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "day_type")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DayType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 50)
    private String name;

    @Column(length = 100)
    private String description;

    @Column(name = "ot_rate" , precision = 4, scale = 2)
    private BigDecimal otRate;
}

