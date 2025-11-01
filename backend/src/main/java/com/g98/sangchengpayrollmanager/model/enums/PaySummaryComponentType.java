package com.g98.sangchengpayrollmanager.model.enums;

import lombok.Getter;

@Getter
public enum PaySummaryComponentType {

    INSURANCE("INSURANCE"),         // BHXH, BHYT, BHTN
    ADDITION("ADDITION"),           // Phụ cấp, thưởng, bonus, allowance,...
    DEDUCTION("DEDUCTION"),         // Các khoản trừ nội bộ (tạm ứng, phạt,...)
    TAX("TAX"),                     // Thuế TNCN (phần phải nộp)
    TAX_DEDUCTION("TAX_DEDUCTION"); // Giảm trừ (bản thân, người phụ thuộc)

    private final String code;

    PaySummaryComponentType(String code) {
        this.code = code;
    }

    public static PaySummaryComponentType fromString(String value) {
        if (value == null) return null;
        for (PaySummaryComponentType t : PaySummaryComponentType.values()) {
            if (t.code.equalsIgnoreCase(value)) {
                return t;
            }
        }
        return null;
    }

    @Override
    public String toString() {
        return this.code;
    }
}

