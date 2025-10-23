import {EmployeePayrollDetailData} from "../types";

export const hrPayrollDetail: EmployeePayrollDetailData = {
    title: "Employee Payroll Detail",
    role: "Human Resources",
  
    employee: {
        name: "Nguyễn Văn A",
        code: "SC-101",
        position: "HR Specialist",
        department: "HR & Administration",
        avatarUrl: "/logo.jpg",
    },
    generalInformation: [
        {label: "Employee Code", value: "SC-101"},
        {label: "Department", value: "HR & Administration"},
        {label: "Date Joined", value: "01/05/2022"},
        {label: "E-mail", value: "nguyenvana@sangcheng.com"},
        {label: "Phone", value: "+84 981 234 567"},
        {label: "Tax Code", value: "0102030405"},
    ],
    incomeItems: [
        {
            label: "Work Salary (23 days)",
            value: 12500000,
            description: "Base salary calculated for 23 payable days",
        },
        {label: "Allowance - Meal", value: 1500000},
        {label: "Allowance - Transport", value: 800000},
        {label: "Bonus - Performance", value: 2500000},
        {label: "Bonus - Recognition", value: 1200000},
    ],
    deductionItems: [
        {label: "BHXH (8%)", value: 1000000},
        {label: "BHYT (1.5%)", value: 187500},
        {label: "BHTN (1%)", value: 125000},
        {label: "Personal Income Tax", value: 1850000},
        {label: "Advance Deduction", value: 350000},
        {
            label: "Other Deduction",
            description: "Union fee & miscellaneous adjustments",
            value: 240500,
        },
    ],
    backPayItems: [
        {
            label: "HI or PIT claim",
            description: "Refund for insurance overpayment",
            value: 220000,
        },
        {
            label: "Advance back pay adjustment",
            description: "Settlement for prior month advance",
            value: 180000,
        },
    ],
    totals: {
        totalIncome: 18500000,
        totalGross: 18500000,
        totalDeduct: 3753000,
        netIncome: 14747000,
    },
};