"use client"

import Pagination from "./pagination";
import type { PayrollRow } from "./table-item"
import PayrollBody from "./table-body";
import PayrollHeader from "./table-header";

const sample: PayrollRow[] = [
  { id: "SC-111", name: "Tran Van B", position: "Admin",      salary: 1000, status: "yellow" },
  { id: "SC-101", name: "Nguyen Ngoc A", position: "HR",       salary: 1024, status: "green"  },
  { id: "SC-102", name: "Tran Thi C",    position: "Employee", salary: 1000, status: "yellow" },
  { id: "SC-201", name: "Nguyen Vu A",   position: "Employee", salary: 1000, status: "green"  },
  { id: "SC-200", name: "Do Van B",      position: "Accounting",salary:1000, status: "red"    },
];


export default function PayrollPage() {
  
  return (
    <div className="h-full w-full border border-black rounded-lg mt-7 p-4">
      <h1 className="text-2xl font-semibold mb-5">Employees Payroll</h1>
      
      <div className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full table-fixed border-collapse">
          <colgroup>
            <col className="w-[12%]" />
            <col className="w-[22%]" />
            <col className="w-[18%]" />
            <col className="w-[12%]" />
            <col className="w-[10%]" />
            <col className="w-[18%]" />
            <col className="w-[8%]" />
          </colgroup>

          {/* 1) Header */}
          <PayrollHeader />

          {/* 2) Body (3) với các Item bên trong */}
          <PayrollBody rows={sample} />
        </table>
      </div>
      <Pagination />
    </div>
  );
}