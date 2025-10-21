import TableHeader from "./table-header";
import TableBody from "./table-body";
import Pagination from "./pagination";


export default function PayrollPage() {
  
  return (
    <div className="h-full w-full border border-black rounded-md mt-7 p-2">
      <h1 className="text-2xl font-semibold">Employees Payroll</h1>
      <TableHeader />
      <TableBody />
      <Pagination />
    </div>
  );
}