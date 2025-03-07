import { ReactNode, useReducer } from "react";
import { CalculatorContext } from "./CalculatorUtils";

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

const currentDate = new Date();
const prevDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() - 1,
);

const DEFAULT_COST_PER_WEEKDAY = 5;
const DEFAULT_COST_PER_WEEKEND = 7;

const initialState: CalculatorState = {
  year: currentDate.getFullYear(),
  month: String(currentDate.getMonth() + 1),
  tab: "previous",
  costPerWeekday: DEFAULT_COST_PER_WEEKDAY,
  costPerWeekend: DEFAULT_COST_PER_WEEKEND,
  weekdays: 0,
  weekends: 0,
  holidaysInWeekday: 0,
  holidaysInWeekend: 0,
  totalCost: null,
  isNumberOfOpen: false,
  isHolidaysOpen: false,
};

export const CalculatorProvider = ({ children }: { children: ReactNode }) => {
  const reducer = (state: CalculatorState, action: Action): CalculatorState => {
    switch (action.type) {
      case "SET_YEAR":
        return { ...state, year: action.payload };
      case "SET_MONTH":
        return { ...state, month: action.payload };
      case "SET_TAB":
        return { ...state, tab: action.payload };
      case "SET_COST_PER_WEEKDAY":
        return { ...state, costPerWeekday: action.payload };
      case "SET_COST_PER_WEEKEND":
        return { ...state, costPerWeekend: action.payload };
      case "SET_WEEKDAYS":
        return { ...state, weekdays: action.payload };
      case "SET_WEEKENDS":
        return { ...state, weekends: action.payload };
      case "SET_HOLIDAYS_IN_WEEKDAY":
        return { ...state, holidaysInWeekday: action.payload };
      case "SET_HOLIDAYS_IN_WEEKEND":
        return { ...state, holidaysInWeekend: action.payload };
      case "SET_TOTAL_COST":
        return { ...state, totalCost: action.payload };
      case "TOGGLE_NUMBER_OF_OPEN":
        return { ...state, isNumberOfOpen: !state.isNumberOfOpen };
      case "TOGGLE_HOLIDAYS_OPEN":
        return { ...state, isHolidaysOpen: !state.isHolidaysOpen };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    year: prevDate.getFullYear(),
    month: String(prevDate.getMonth() + 1),
  });

  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
      {children}
    </CalculatorContext.Provider>
  );
};

export { DEFAULT_COST_PER_WEEKDAY, DEFAULT_COST_PER_WEEKEND };
