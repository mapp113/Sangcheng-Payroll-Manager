package com.g98.sangchengpayrollmanager.model.dto.payroll;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PaySummaryComponentItem {

    private final String componentName;   // ví dụ: "BHXH", "Phụ cấp điện thoại"
    private final String componentType;   // "INSURANCE", "ALLOWANCE", "BONUS", "DEDUCTION"
    private final Integer amount;         // âm nếu là khoản trừ
    private final String note;            // ghi chú (vd: "8% trên 5,000,000 (trần 20tr)")
}

