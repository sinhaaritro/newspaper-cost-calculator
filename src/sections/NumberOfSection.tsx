import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { InputRow } from "@/layouts/InputRow";
import { useCalculator } from "@/contexts/CalculatorUtils";

export function NumberOfSection() {
  const { state, dispatch } = useCalculator();
  const { weekdays, weekends, costPerWeekday, costPerWeekend, isNumberOfOpen } =
    state;
  const costOfAllDays = costPerWeekday * weekdays + costPerWeekend * weekends;

  return (
    <div>
      <Collapsible
        open={isNumberOfOpen}
        onOpenChange={() => dispatch({ type: "TOGGLE_NUMBER_OF_OPEN" })}
      >
        <CollapsibleTrigger asChild>
          <h3 className="text-lg font-semibold mb-2 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
            Number of
          </h3>
        </CollapsibleTrigger>
        <div className="flex space-x-4">
          <InputRow
            label="Weekday"
            id="weekdays"
            value={weekdays}
            onChange={(value) =>
              dispatch({ type: "SET_WEEKDAYS", payload: value })
            }
            placeholder="Enter days"
          />
          <InputRow
            label="Weekend"
            id="weekends"
            value={weekends}
            onChange={(value) =>
              dispatch({ type: "SET_WEEKENDS", payload: value })
            }
            placeholder="Enter days"
          />
        </div>
        <CollapsibleContent>
          <div className="mt-2 text-sm text-gray-500 font-mono">
            <p>
              Cost of all days in the month = (Cost per weekday * Number of
              weekday) + (Cost per weekend * Number of weekend)
            </p>
            <p>
              <span className="inline-block w-40" />= ({costPerWeekday} *{" "}
              {weekdays}) + ({costPerWeekend} * {weekends})
            </p>
            <p>
              <span className="inline-block w-40" />= (
              {costPerWeekday * weekdays}) + ({costPerWeekend * weekends})
            </p>
            <p>
              <span className="inline-block w-40" />= {costOfAllDays}
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
