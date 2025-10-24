export interface TimesheetSummaryMetric {
    label: string;
    value: number;
    unit?: string;
    iconSrc?: string;
}

export interface TimesheetGeneralInfoItem {
    label: string;
    value: string;
}

export interface TimesheetEntry {
    id: string;
    day: string;
    date: string;
    checkIn?: number | null;
    checkOut?: number | null;
    workHours?: number | null;
    overtimeHours?: number | null;
    note?: string;
    type?: "work" | "leave";
}

export interface TimesheetLeaveSummary {
    takenDays: number;
    remainingDays: number;
}

export interface TimesheetToolbarTab {
    label: string;
    href?: string;
    isActive?: boolean;
}

export interface TimesheetOtherEntry {
    type: string;
    description: string;
    amount: string;
    startedOn: string;
}

export interface ManagerTimesheetDetailData {
    dashboardTitle: string;
    title: string;
    tabs: TimesheetToolbarTab[];
    // ✅ thay periodLabel bằng 2 field dưới
    startDate: string; // ISO: "YYYY-MM-DD"
    endDate: string;   // ISO: "YYYY-MM-DD"
    employee: {
        name: string;
        position: string;
        department?: string;
        employeeId?: string;
        avatarUrl?: string;
    };
    summaryMetrics: TimesheetSummaryMetric[];
    generalInformation: TimesheetGeneralInfoItem[];
    leaveSummary: TimesheetLeaveSummary;
    entries: TimesheetEntry[];
    otherEntries?: TimesheetOtherEntry[];
}
