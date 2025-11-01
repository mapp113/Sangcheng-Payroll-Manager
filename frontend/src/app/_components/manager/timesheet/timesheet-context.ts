import { createContext } from "react";
import type { TimesheetParamsContextType, TimesheetDataContextType } from "./type";

export const ParamsContext = createContext<TimesheetParamsContextType | null>(null);
export const DataContext = createContext<TimesheetDataContextType | null>(null);