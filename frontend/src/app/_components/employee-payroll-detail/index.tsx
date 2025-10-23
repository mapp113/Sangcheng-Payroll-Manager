import {
    DetailHeader,
    type DetailHeaderLine,
    DetailSectionCard,
    DetailShell,
    DetailSummaryCard,
} from "@/app/_components/detail";

import PayrollDetailTableBody from "./table/body";
import PayrollDetailTableFooter, {
    type PayrollDetailTableFooterRow,
} from "./table/footer";
import type {EmployeePayrollDetailData, PayrollLineItem} from "./types";
import {formatCurrency} from "./utils";

interface EmployeePayrollDetailProps {
    detail: EmployeePayrollDetailData;
}

export default function EmployeePayrollDetail({detail}: EmployeePayrollDetailProps) {
    const totalIncome = detail.totals.totalIncome ??
        detail.incomeItems.reduce((sum, item) => sum + item.value, 0);
    const totalGross = detail.totals.totalGross ?? totalIncome;
    const totalDeduct = detail.totals.totalDeduct;
    const netIncome = detail.totals.netIncome ?? totalGross - totalDeduct;
    const totalBackPay = detail.backPayItems?.reduce((sum, item) => sum + item.value, 0);

    const summaryCards = [
        {label: "Total Income", value: totalIncome},
        {label: "Total Deduct", value: totalDeduct},
        {label: "Net Income", value: netIncome, highlight: true},
    ];

    const headerLines: DetailHeaderLine[] = [
        {text: detail.role, variant: "accent"},
    ];

    if (detail.periodLabel) {
        headerLines.push({text: detail.periodLabel, variant: "muted"});
    }

    return (
        <DetailShell>
            <DetailHeader
                badgeLabel={detail.title}
                title={detail.employee?.name ?? detail.title}
                subtitle={
                    [detail.employee?.position, detail.employee?.department, detail.employee?.code]
                        .filter(Boolean)
                        .join(" • ")
                }
                lines={headerLines}
                avatarName={detail.employee?.name}
                avatarUrl={detail.employee?.avatarUrl}
                summary={summaryCards.map((card) => (
                    <DetailSummaryCard
                        key={card.label}
                        label={card.label}
                        value={card.value}
                        highlight={card.highlight}
                        formatValue={formatCurrency}
                    />
                ))}
                summaryContainerClassName="grid w-full gap-3 sm:grid-cols-3 md:w-auto"
            />

            <div className="grid gap-6 p-6 lg:grid-cols-[1.6fr_1fr]">
                <div className="space-y-6">
                    <DetailSectionCard title="General Information" iconSrc="/icons/employee.png">
                        <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                            {detail.generalInformation.map((item) => (
                                <div key={item.label} className="grid gap-1">
                                    <dt className="text-xs font-semibold uppercase tracking-wide text-[#56749A]">{item.label}</dt>
                                    <dd className="text-base font-semibold text-[#1D3E6A]">{item.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </DetailSectionCard>

                    <DetailSectionCard title="Income" iconSrc="/icons/payroll.png">
                        <PayrollLineItemTable
                            items={detail.incomeItems}
                            footerRows={[
                                {label: "Total Income", value: totalIncome, emphasis: "highlight"},
                                {label: "Total Gross", value: totalGross, emphasis: "muted"},
                            ]}
                        />
                    </DetailSectionCard>
                </div>

                <div className="space-y-6">
                    <DetailSectionCard title="Deductions" iconSrc="/icons/report.png">
                        <PayrollLineItemTable
                            items={detail.deductionItems}
                            footerRows={[
                                {label: "Total Deduct", value: totalDeduct, emphasis: "highlight"},
                            ]}
                        />
                    </DetailSectionCard>

                    {detail.backPayItems?.length ? (
                        <DetailSectionCard title="Back Pay" iconSrc="/icons/attendance.png">
                            <PayrollLineItemTable
                                items={detail.backPayItems}
                                footerRows={
                                    typeof totalBackPay === "number"
                                        ? [{label: "Total Back Pay", value: totalBackPay, emphasis: "muted"}]
                                        : undefined
                                }
                            />
                        </DetailSectionCard>
                    ) : null}

                    <TotalsSummaryCard totalDeduct={totalDeduct} netIncome={netIncome}/>
                </div>
            </div>
        </DetailShell>
    );
}

function PayrollLineItemTable({
                                  items,
                                  footerRows,
                              }: {
    items: PayrollLineItem[];
    footerRows?: PayrollDetailTableFooterRow[];
}) {
    return (
        <div className="overflow-hidden rounded-2xl border border-[#CCE1F0] shadow-[4px_4px_0_#CCE1F0]">
            <table className="w-full border-separate border-spacing-0">
                <colgroup>
                    <col className="w-[68%]"/>
                    <col className="w-[32%]"/>
                </colgroup>
                <PayrollDetailTableBody items={items}/>
                {footerRows ? <PayrollDetailTableFooter rows={footerRows}/> : null}
            </table>
        </div>
    );
}

function TotalsSummaryCard({
                               totalDeduct,
                               netIncome,
                           }: {
    totalDeduct: number;
    netIncome: number;
}) {
    return (
        <div className="rounded-2xl border border-dashed border-[#4AB4DE] bg-[#F4FBFF] p-5 text-[#1D3E6A]">
            <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#56749A]">
          Total Deduct
        </span>
                <span className="text-base font-semibold text-[#1D3E6A]">
          {formatCurrency(totalDeduct)}
        </span>
            </div>
            <div className="mt-4 rounded-2xl border border-[#CCE1F0] bg-white p-4 text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.4em] text-[#56749A]">Net Income</span>
                <div className="mt-2 text-2xl font-semibold text-[#1D3E6A]">
                    {formatCurrency(netIncome)}
                </div>
            </div>
        </div>
    );
}