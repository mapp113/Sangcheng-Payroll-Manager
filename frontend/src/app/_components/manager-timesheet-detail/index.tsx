"use client";

import {
    DetailHeader,
    type DetailHeaderLine,
    DetailShell,
    DetailSummaryCard,
} from "@/app/_components/detail";

import type {
    ManagerTimesheetDetailData,
    TimesheetEntry,
    TimesheetOtherEntry,
} from "./types";
import {formatDecimal, formatHours, formatTime} from "./utils";
import {useMemo, useState} from "react";

interface ManagerTimesheetDetailProps {
    detail: ManagerTimesheetDetailData;
    view?: "timesheet" | "other";
}

export default function ManagerTimesheetDetail({
                                                   detail,
                                                   view = "timesheet",
                                               }: ManagerTimesheetDetailProps) {
    // ✅ giữ state ngày, khởi tạo từ data
    const [startDate, setStartDate] = useState(detail.startDate);
    const [endDate, setEndDate] = useState(detail.endDate);

    const headerLines: DetailHeaderLine[] = [];
    if (detail.employee.employeeId) {
        headerLines.push({text: detail.employee.employeeId, variant: "accent"});
    }

    // ✅ hiển thị nhãn từ state ngày
    const periodLabel = useMemo(() => `${startDate} - ${endDate}`, [startDate, endDate]);
    headerLines.push({text: periodLabel, variant: "muted"});

    const header = (
        <DetailHeader
            badgeLabel={detail.title}
            title={detail.employee.name}
            subtitle={[detail.employee.position, detail.employee.department].filter(Boolean).join(" • ")}
            lines={headerLines}
            avatarName={detail.employee.name}
            avatarUrl={detail.employee.avatarUrl}
            summary={detail.summaryMetrics.map((metric) => (
                <DetailSummaryCard
                    key={metric.label}
                    label={metric.label}
                    value={metric.value}
                    iconSrc={metric.iconSrc}
                    unit={metric.unit}
                    formatValue={formatDecimal}
                />
            ))}
            summaryContainerClassName="grid w-full gap-3 sm:grid-cols-3 md:w-auto"
        />
    );

    if (view === "other") {
        return (
            <DetailShell>
                {header}
                <div className="space-y-6 p-6">
                    <OtherPeriodCard
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(s, e) => {
                            setStartDate(s);
                            setEndDate(e);
                        }}
                    />
                    <OtherEntriesTable entries={detail.otherEntries}/>
                </div>
            </DetailShell>
        );
    }

    return (
        <DetailShell>
            {header}

            <div className="grid gap-6 p-6 xl:grid-cols-[320px_1fr]">
                <div className="space-y-6">
                    <LeaveSummaryCard
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(s, e) => {
                            setStartDate(s);
                            setEndDate(e);
                        }}
                        leaveSummary={detail.leaveSummary}
                    />
                </div>

                <div className="space-y-6">
                    <TimesheetTable entries={detail.entries}/>
                </div>
            </div>
        </DetailShell>
    );
}

/* ===== Cards & Tables ===== */

function LeaveSummaryCard({
                              startDate,
                              endDate,
                              onChange,
                              leaveSummary,
                          }: {
    startDate: string;
    endDate: string;
    onChange: (s: string, e: string) => void;
    leaveSummary: ManagerTimesheetDetailData["leaveSummary"];
}) {
    return (
        <div
            className="rounded-2xl border border-dashed border-[#4AB4DE] bg-[#F4FBFF] p-5 text-[#1D3E6A] shadow-[6px_6px_0_#CCE1F0]">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1D3E6A]">
                TIME PERIOD
            </div>

            {/* ✅ 2 ô chọn ngày */}
            <div className="mt-2 flex flex-col gap-3">
                <div className="flex flex-col">
                    <label className="text-xs font-semibold text-[#56749A] mb-1">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => onChange(e.target.value, endDate)}
                        className="rounded-xl border border-[#CCE1F0] bg-white px-3 py-2 text-sm text-[#1D3E6A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4AB4DE]"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-xs font-semibold text-[#56749A] mb-1">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => onChange(startDate, e.target.value)}
                        className="rounded-xl border border-[#CCE1F0] bg-white px-3 py-2 text-sm text-[#1D3E6A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4AB4DE]"
                    />
                </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-black bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#1D3E6A] shadow-[3px_3px_0_#CCE1F0]"
                >
                    Leave Taken
                    <span className="rounded-full bg-[#4AB4DE] px-2 py-0.5 text-xs font-semibold text-white">
            {leaveSummary.takenDays}
          </span>
                </button>
                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-black bg-[#4AB4DE] px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-[3px_3px_0_#CCE1F0]"
                >
                    Remaining Leave
                    <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-[#1D3E6A]">
            {leaveSummary.remainingDays}
          </span>
                </button>
            </div>
        </div>
    );
}

function TimesheetTable({entries}: { entries: TimesheetEntry[] }) {
    return (
        <section
            className="overflow-hidden rounded-2xl border border-black bg.white text-[#1D3E6A] shadow-[6px_6px_0_#CCE1F0]">
            <table className="w-full border-collapse">
                <thead className="bg-[#CCE1F0] text-xs font-semibold uppercase tracking-[0.3em] text-[#1D3E6A]">
                <tr>
                    <th className="px-5 py-3 text-left">Day</th>
                    <th className="px-5 py-3 text-left">Checkin</th>
                    <th className="px-5 py-3 text-left">Checkout</th>
                    <th className="px-5 py-3 text-left">Work Hours</th>
                    <th className="px-5 py-3 text-left">Overtime</th>
                    <th className="px-5 py-3 text-left"></th>
                </tr>
                </thead>
                <tbody>
                {entries.map((entry) => (
                    <TimesheetTableRow key={entry.id} entry={entry}/>
                ))}
                </tbody>
            </table>
        </section>
    );
}

function OtherPeriodCard({
                             startDate,
                             endDate,
                             onChange,
                         }: {
    startDate: string;
    endDate: string;
    onChange: (s: string, e: string) => void;
}) {
    return (
        <div
            className="rounded-2xl border border-dashed border-[#4AB4DE] bg-[#F4FBFF] p-5 text-[#1D3E6A] shadow-[6px_6px_0_#CCE1F0]">
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#56749A]">
                Time period
            </div>
            <div className="mt-2 flex items-center gap-2">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => onChange(e.target.value, endDate)}
                    className="border rounded px-2 py-1 text-sm"
                />
                <span className="text-[#56749A]">-</span>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => onChange(startDate, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                />
            </div>
        </div>
    );
}

function OtherEntriesTable({entries}: { entries?: TimesheetOtherEntry[] }) {
    if (!entries?.length) return null;

    return (
        <section
            className="overflow-hidden rounded-2xl border border-black bg-white text-[#1D3E6A] shadow-[6px_6px_0_#CCE1F0]">
            <table className="w-full border-collapse">
                <thead className="bg-[#CCE1F0] text-xs font-semibold uppercase tracking-[0.3em] text-[#1D3E6A]">
                <tr>
                    <th className="px-5 py-3 text-left">Type</th>
                    <th className="px-5 py-3 text-left">Description</th>
                    <th className="px-5 py-3 text-left">Amount</th>
                    <th className="px-5 py-3 text-left">Started On</th>
                </tr>
                </thead>
                <tbody>
                {entries.map((entry) => (
                    <tr
                        key={`${entry.type}-${entry.description}-${entry.startedOn}`}
                        className="border-b border-[#E6F2FB] last:border-0"
                    >
                        <td className="px-5 py-4 text-sm font-semibold text-[#1D3E6A]">{entry.type}</td>
                        <td className="px-5 py-4 text-sm font-semibold text-[#1D3E6A]">{entry.description}</td>
                        <td className="px-5 py-4 text-sm font-semibold text-[#1D3E6A]">{entry.amount}</td>
                        <td className="px-5 py-4 text-sm font-semibold text-[#1D3E6A]">{entry.startedOn}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
}

function TimesheetTableRow({entry}: { entry: TimesheetEntry }) {
    const isLeave = entry.type === "leave";

    return (
        <tr className="border-b border-[#E6F2FB] last:border-0">
            <td className="px-5 py-4 align-top">
                <div className="text-sm font-semibold text-[#1D3E6A]">
                    {entry.day}
                    <span className="ml-2 text-xs font-normal text-[#56749A]">{entry.date}</span>
                </div>
            </td>
            <td className="px-5 py-4 text-sm font-semibold text-[#1D3E6A]">
                {isLeave ? "--" : formatTime(entry.checkIn)}
            </td>
            <td className="px-5 py-4 text-sm font-semibold text-[#1D3E6A]">
                {isLeave ? "--" : formatTime(entry.checkOut)}
            </td>
            <td className="px-5 py-4 text-sm font-semibold text-[#1D3E6A]">
                {isLeave ? (
                    <span
                        className="inline-flex items-center rounded-full bg-[#FFEFD6] px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#B45309]">
            {entry.note}
          </span>
                ) : (
                    formatHours(entry.workHours, {fallback: "--"})
                )}
            </td>
            <td className="px-5 py-4 text-sm font-semibold text-[#1D3E6A]">
                {isLeave ? "--" : formatHours(entry.overtimeHours)}
            </td>
            <td className="px-5 py-4 text-right">
                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full border border-[#4AB4DE] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#1D3E6A] transition hover:bg-[#E6F7FF]"
                >
                    Edit
                </button>
            </td>
        </tr>
    );
}

/* ===== utils.ts giữ nguyên ===== */
// export function formatDecimal(value: number, fractionDigits = 2) {
//     return value.toFixed(fractionDigits);
// }
//
// export function formatTime(value?: number | null) {
//     if (value === null || typeof value === "undefined") return "--";
//     return formatDecimal(value);
// }
//
// export function formatHours(value?: number | null, {fallback = "N/A"} = {}) {
//     if (value === null || typeof value === "undefined") return fallback;
//     return `${formatDecimal(value)}hrs`;
// }