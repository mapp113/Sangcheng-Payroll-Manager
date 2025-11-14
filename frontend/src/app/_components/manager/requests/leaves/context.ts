import { createContext } from "react";
import type { ManagerLeavesParams, ManagerLeavesResonse } from "./types";

export interface ManagerLeavesParamsContextType {
  params: ManagerLeavesParams;
  setParams: React.Dispatch<React.SetStateAction<ManagerLeavesParams>>;
}

export interface ManagerLeavesDataContextType {
  leaves: ManagerLeavesResonse[];
  setLeaves: React.Dispatch<React.SetStateAction<ManagerLeavesResonse[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ParamsContext = createContext<ManagerLeavesParamsContextType | null>(null);
export const DataContext = createContext<ManagerLeavesDataContextType | null>(null);
