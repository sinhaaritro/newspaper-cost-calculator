import { Button } from "@/components/ui/button";
import { calculateTotalCost } from "@/lib/calculateTotalCost";
import { useCalculator } from "@/contexts/CalculatorUtils";
import {
  DEFAULT_COST_PER_WEEKDAY,
  DEFAULT_COST_PER_WEEKEND,
} from "@/contexts/CalculatorContext";

export function CalculateSection() {
  const { state, dispatch } = useCalculator();
  const {
    costPerWeekday,
    costPerWeekend,
    weekdays,
    weekends,
    holidaysInWeekday,
    holidaysInWeekend,
    totalCost,
  } = state;

  const handleCalculate = () => {
    const result = calculateTotalCost(
      costPerWeekday,
      costPerWeekend,
      weekdays,
      weekends,
      holidaysInWeekday,
      holidaysInWeekend,
    );
    dispatch({ type: "SET_TOTAL_COST", payload: result });
  };

  const handleReset = () => {
    dispatch({
      type: "SET_COST_PER_WEEKDAY",
      payload: DEFAULT_COST_PER_WEEKDAY,
    });
    dispatch({
      type: "SET_COST_PER_WEEKEND",
      payload: DEFAULT_COST_PER_WEEKEND,
    });
    dispatch({ type: "SET_HOLIDAYS_IN_WEEKDAY", payload: 0 });
    dispatch({ type: "SET_HOLIDAYS_IN_WEEKEND", payload: 0 });
    dispatch({ type: "SET_TOTAL_COST", payload: null });
  };

  return (
    <div className="flex items-center space-x-4">
      <Button onClick={handleCalculate}>Calculate</Button>
      <Button onClick={handleReset} variant="outline">
        Reset
      </Button>
      {totalCost !== null && (
        <span className="text-lg font-medium">Total: ₹{totalCost}</span>
      )}
    </div>
  );
}
