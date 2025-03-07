import { createContext, useContext, Dispatch } from "react";

interface CalculatorState {
  year: number;
  month: string;
  tab: "previous" | "custom";
  costPerWeekday: number;
  costPerWeekend: number;
  weekdays: number;
  weekends: number;
  holidaysInWeekday: number;
  holidaysInWeekend: number;
  totalCost: number | null;
  isNumberOfOpen: boolean;
  isHolidaysOpen: boolean;
}

type Action =
  | { type: "SET_YEAR"; payload: number }
  | { type: "SET_MONTH"; payload: string }
  | { type: "SET_TAB"; payload: "previous" | "custom" }
  | { type: "SET_COST_PER_WEEKDAY"; payload: number }
  | { type: "SET_COST_PER_WEEKEND"; payload: number }
  | { type: "SET_WEEKDAYS"; payload: number }
  | { type: "SET_WEEKENDS"; payload: number }
  | { type: "SET_HOLIDAYS_IN_WEEKDAY"; payload: number }
  | { type: "SET_HOLIDAYS_IN_WEEKEND"; payload: number }
  | { type: "SET_TOTAL_COST"; payload: number | null }
  | { type: "TOGGLE_NUMBER_OF_OPEN" }
  | { type: "TOGGLE_HOLIDAYS_OPEN" };

export const CalculatorContext = createContext<{
  state: CalculatorState;
  dispatch: Dispatch<Action>;
}>({
  state: {
    year: new Date().getFullYear(),
    month: String(new Date().getMonth() + 1),
    tab: "previous",
    costPerWeekday: 0,
    costPerWeekend: 0,
    weekdays: 0,
    weekends: 0,
    holidaysInWeekday: 0,
    holidaysInWeekend: 0,
    totalCost: null,
    isNumberOfOpen: false,
    isHolidaysOpen: false,
  },
  dispatch: () => null,
});

export const useCalculator = () => useContext(CalculatorContext);
