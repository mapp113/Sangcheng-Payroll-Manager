export interface ManagerLeavesResonse {
  id: string;
  employeeCode: string;
  fullName: string;
  leaveTypeCode: string;
  fromDate: string;
  toDate: string;
  reason: string;
  duration: number; // duration in days
  status: "PENDING" | "APPROVED" | "REJECTED";
  isPaidLeave: boolean;
  approvalDate: string;
  note:string;
  file:string;
  createDate?: string;
}

export interface ManagerLeavesParams {
  date: string;
  indexPage: number;
  maxItems: number;
  totalPages?: number;
  keyword?: string;
}