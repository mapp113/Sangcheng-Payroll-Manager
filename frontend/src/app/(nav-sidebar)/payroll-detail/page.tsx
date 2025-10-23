import EmployeePayrollDetail from "@/app/_components/employee-payroll-detail";
import {hrPayrollDetail} from "@/app/_components/employee-payroll-detail/data/hr";
import EmployeePayrollDetailToolbar from "@/app/_components/employee-payroll-detail/tool-bar";

export default function PayrollDetailPage() {
    return (
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-12">
            <EmployeePayrollDetailToolbar
                title={hrPayrollDetail.title}
                subtitle={hrPayrollDetail.periodLabel}
            />
            <EmployeePayrollDetail detail={hrPayrollDetail}/>
        </div>
    );
}
