import {cn} from "@/lib/utils";

import type {PayrollLineItem} from "../types";
import {formatCurrency} from "../utils";

interface PayrollDetailTableBodyProps {
    items: PayrollLineItem[];
}

export default function PayrollDetailTableBody({items}: PayrollDetailTableBodyProps) {
    return (
        <tbody className="divide-y divide-[#E4EEF9] text-[#1D3E6A]">
        {items.map((item, index) => (
            <tr
                key={`${item.label}-${index}`}
                className={cn(index % 2 === 0 ? "bg-white" : "bg-[#F8FCFF]")}
            >
                <td className="px-5 py-4 align-top">
                    <div className="font-semibold">{item.label}</div>
                    {item.description ? (
                        <p className="mt-1 text-xs text-[#56749A]">{item.description}</p>
                    ) : null}
                </td>
                <td className="px-5 py-4 text-right align-top text-sm font-semibold">
                    {formatCurrency(item.value)}
                </td>
            </tr>
        ))}
        </tbody>
    );
}