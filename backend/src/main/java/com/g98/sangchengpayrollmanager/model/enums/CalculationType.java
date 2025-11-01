package com.g98.sangchengpayrollmanager.model.enums;

// cột calculationType trong bảng legal policy
public enum CalculationType {
    TAX_CAP_RATIO_CALCULATE, //dùng cho payComponent service để tính phần bị đánh thuế của bonus, allowance
    PERSONAL_DEDUCTION;  //

    public static CalculationType fromString(String value) {
        if (value == null) return null;
        try {
            return CalculationType.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
