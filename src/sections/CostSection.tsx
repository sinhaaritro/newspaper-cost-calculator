import { InputRow } from "@/layouts/InputRow";
import { useCalculator } from "@/contexts/CalculatorUtils";

export function CostSection() {
  const { state, dispatch } = useCalculator();
  const { costPerWeekday, costPerWeekend } = state;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Cost per</h3>
      <div className="flex space-x-4">
        <InputRow
          label="Weekday"
          id="cost-weekday"
          value={costPerWeekday}
          onChange={(value) =>
            dispatch({ type: "SET_COST_PER_WEEKDAY", payload: value })
          }
          placeholder="Enter cost"
        />
        <InputRow
          label="Weekend"
          id="cost-weekend"
          value={costPerWeekend}
          onChange={(value) =>
            dispatch({ type: "SET_COST_PER_WEEKEND", payload: value })
          }
          placeholder="Enter cost"
        />
      </div>
    </div>
  );
}
