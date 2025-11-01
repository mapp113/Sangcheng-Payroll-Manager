package com.g98.sangchengpayrollmanager.model.enums;

// cột taxTreatmentCode trong bảng pay_component_type
public enum TaxTreatmentCode {
    FULLY_TAXABLE,
    NON_TAXABLE,
    PARTIAL_CAP_RATIO; // khi có chính sách

    public static TaxTreatmentCode fromString(String value) {
        if (value == null) return null;
        try {
            return TaxTreatmentCode.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}

