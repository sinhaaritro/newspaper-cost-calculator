import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { InputRow } from "@/layouts/InputRow";
import { useCalculator } from "@/contexts/CalculatorUtils";

export function HolidaysSection() {
  const { state, dispatch } = useCalculator();
  const {
    holidaysInWeekday,
    holidaysInWeekend,
    costPerWeekday,
    costPerWeekend,
    weekdays,
    weekends,
    isHolidaysOpen,
  } = state;
  const costOfAllDays = costPerWeekday * weekdays + costPerWeekend * weekends;
  const costOfHolidays =
    costPerWeekday * holidaysInWeekday + costPerWeekend * holidaysInWeekend;

  return (
    <div>
      <Collapsible
        open={isHolidaysOpen}
        onOpenChange={() => dispatch({ type: "TOGGLE_HOLIDAYS_OPEN" })}
      >
        <CollapsibleTrigger asChild>
          <h3 className="text-lg font-semibold mb-2 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
            Number of <strong>holidays</strong> in
          </h3>
        </CollapsibleTrigger>
        <div className="flex space-x-4">
          <InputRow
            label="Weekday"
            id="holidays-weekday"
            value={holidaysInWeekday}
            onChange={(value) =>
              dispatch({ type: "SET_HOLIDAYS_IN_WEEKDAY", payload: value })
            }
            placeholder="Enter holidays"
          />
          <InputRow
            label="Weekend"
            id="holidays-weekend"
            value={holidaysInWeekend}
            onChange={(value) =>
              dispatch({ type: "SET_HOLIDAYS_IN_WEEKEND", payload: value })
            }
            placeholder="Enter holidays"
          />
        </div>
        <CollapsibleContent>
          <div className="mt-2 text-sm text-gray-500 font-mono">
            <p>
              Cost of holidays days in the month = (Cost per weekday * Number of
              holiday weekday) + (Cost per weekend * Number of holiday weekend)
            </p>
            <p>
              <span className="inline-block w-48" />= ({costPerWeekday} *{" "}
              {holidaysInWeekday}) + ({costPerWeekend} * {holidaysInWeekend})
            </p>
            <p>
              <span className="inline-block w-48" />= (
              {costPerWeekday * holidaysInWeekday}) + (
              {costPerWeekend * holidaysInWeekend})
            </p>
            <p>
              <span className="inline-block w-48" />= {costOfHolidays}
            </p>
            <p>
              Total Cost = Cost of all days in the month - Cost of holidays days
              in the month
            </p>
            <p>
              <span className="inline-block w-24" />= {costOfAllDays} -{" "}
              {costOfHolidays}
            </p>
            <p>
              <span className="inline-block w-24" />={" "}
              {costOfAllDays - costOfHolidays}
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
