import TimesheetTableHeader from "./header";
import TimesheetTableBody from "./body";
import TimesheetToolbar from "./toolbar";
import Pagination from "./pagination";

export default function TimesheetTable() {
  
  return (
    <div className="h-full w-full bg-white rounded-xl border border-gray-300 overflow-auto flex flex-col">
      <TimesheetToolbar />
      <div className="flex-1 overflow-auto">
        <table className="min-w-full">
          <TimesheetTableHeader />
          <TimesheetTableBody />
        </table>
      </div>
      <Pagination />
    </div>
  );
}
