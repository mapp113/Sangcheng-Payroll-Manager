import {cn} from "@/lib/utils";

import {formatCurrency} from "../utils";

export interface PayrollDetailTableFooterRow {
    label: string;
    value: number;
    emphasis?: "normal" | "muted" | "highlight";
}

interface PayrollDetailTableFooterProps {
    rows: PayrollDetailTableFooterRow[];
}

export default function PayrollDetailTableFooter({rows}: PayrollDetailTableFooterProps) {
    return (
        <tfoot>
        {rows.map((row) => (
            <tr
                key={row.label}
                className={cn(
                    "bg-[#F4FBFF]",
                    row.emphasis === "highlight" && "bg-[#E6F7FF]"
                )}
            >
                <td
                    className={cn(
                        "px-5 py-3 text-xs uppercase tracking-[0.3em]",
                        row.emphasis === "muted" ? "text-[#7A90B6]" : "font-semibold text-[#1D3E6A]"
                    )}
                >
                    {row.label}
                </td>
                <td
                    className={cn(
                        "px-5 py-3 text-right",
                        row.emphasis === "muted"
                            ? "text-sm font-medium text-[#1D3E6A]"
                            : "text-base font-semibold text-[#1D3E6A]"
                    )}
                >
                    {formatCurrency(row.value)}
                </td>
            </tr>
        ))}
        </tfoot>
    );
}