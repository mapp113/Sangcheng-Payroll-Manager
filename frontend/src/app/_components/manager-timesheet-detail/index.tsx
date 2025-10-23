import {
    DetailHeader,
    type DetailHeaderLine,
    //  DetailSectionCard,
    DetailShell,
    DetailSummaryCard,
} from "@/app/_components/detail";

import type {
    ManagerTimesheetDetailData,
    TimesheetEntry,
    TimesheetOtherEntry,
} from "./types";
import {formatDecimal, formatHours, formatTime} from "./utils";

interface ManagerTimesheetDetailProps {
    detail: ManagerTimesheetDetailData;
    view?: "timesheet" | "other";
}

export default function ManagerTimesheetDetail({
                                                   detail,
                                                   view = "timesheet",
                                               }: ManagerTimesheetDetailProps) {
    const headerLines: DetailHeaderLine[] = [];

    if (detail.employee.employeeId) {
        headerLines.push({text: detail.employee.employeeId, variant: "accent"});
    }

    if (detail.periodLabel) {
        headerLines.push({text: detail.periodLabel, variant: "muted"});
    }

    const header = (
        <DetailHeader
            badgeLabel={detail.title}
            title={detail.employee.name}
            subtitle={
                [detail.employee.position, detail.employee.department]
                    .filter(Boolean)
                    .join(" • ")
            }
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
                    <OtherPeriodCard periodLabel={detail.periodLabel}/>
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
                    {/*<DetailSectionCard title="General Information" iconSrc="/icons/employee.png">*/}
                    {/*    <dl className="grid gap-y-4">*/}
                    {/*        {detail.generalInformation.map((item) => (*/}
                    {/*            <div key={item.label} className="grid gap-1">*/}
                    {/*                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-[#56749A]">{item.label}</dt>*/}
                    {/*                <dd className="text-sm font-semibold text-[#1D3E6A]">{item.value}</dd>*/}
                    {/*            </div>*/}
                    {/*        ))}*/}
                    {/*    </dl>*/}
                    {/*</DetailSectionCard>*/}

                    <LeaveSummaryCard periodLabel={detail.periodLabel} leaveSummary={detail.leaveSummary}/>
                </div>

                <div className="space-y-6">
                    <TimesheetTable entries={detail.entries}/>
                </div>
            </div>
        </DetailShell>
    );
}

function LeaveSummaryCard({
                              periodLabel,
                              leaveSummary,
                          }: {
    periodLabel: string;
    leaveSummary: ManagerTimesheetDetailData["leaveSummary"];
}) {
    return (
        <div
            className="rounded-2xl border border-dashed border-[#4AB4DE] bg-[#F4FBFF] p-5 text-[#1D3E6A] shadow-[6px_6px_0_#CCE1F0]">
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#56749A]">Time period</div>
            <div className="mt-2 text-lg font-semibold text-[#1D3E6A]">{periodLabel}</div>
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
            className="overflow-hidden rounded-2xl border border-black bg-white text-[#1D3E6A] shadow-[6px_6px_0_#CCE1F0]">
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

function OtherPeriodCard({periodLabel}: { periodLabel: string }) {
    return (
        <div
            className="rounded-2xl border border-dashed border-[#4AB4DE] bg-[#F4FBFF] p-5 text-[#1D3E6A] shadow-[6px_6px_0_#CCE1F0]">
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#56749A]">Time period</div>
            <div className="mt-2 text-lg font-semibold text-[#1D3E6A]">{periodLabel}</div>
        </div>
    );
}

function OtherEntriesTable({entries}: { entries?: TimesheetOtherEntry[] }) {
    if (!entries?.length) {
        return null;
    }

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
                    <tr key={`${entry.type}-${entry.description}-${entry.startedOn}`}
                        className="border-b border-[#E6F2FB] last:border-0">
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