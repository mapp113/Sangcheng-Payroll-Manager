import PayrollTable from "@/app/_components/payroll-table";
import PayrollToolbar from "@/app/_components/payroll-toolbar";

export default function payrollPage() {
  
  return (
    <div className="m-3">
      <PayrollToolbar />
      <PayrollTable />
    </div>
  );
}