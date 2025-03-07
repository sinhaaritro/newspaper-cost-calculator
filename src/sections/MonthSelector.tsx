import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ComboBox } from "@/layouts/ComboBox";
import { getDaysInMonth } from "@/lib/dateUtils";
import { useCalculator } from "@/contexts/CalculatorUtils";

const months = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export function MonthSelector() {
  const { state, dispatch } = useCalculator();
  const { year, month, tab } = state;

  useEffect(() => {
    const currentDate = new Date();
    if (tab === "previous") {
      const prevDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
      );
      dispatch({ type: "SET_YEAR", payload: prevDate.getFullYear() });
      dispatch({ type: "SET_MONTH", payload: String(prevDate.getMonth() + 1) });
      const { weekdays: newWeekdays, weekends: newWeekends } = getDaysInMonth(
        prevDate.getFullYear(),
        prevDate.getMonth() + 1,
      );
      dispatch({ type: "SET_WEEKDAYS", payload: newWeekdays });
      dispatch({ type: "SET_WEEKENDS", payload: newWeekends });
    } else if (tab === "custom") {
      const currentMonth = String(currentDate.getMonth() + 1);
      dispatch({ type: "SET_YEAR", payload: currentDate.getFullYear() });
      dispatch({ type: "SET_MONTH", payload: currentMonth });
      const { weekdays: newWeekdays, weekends: newWeekends } = getDaysInMonth(
        currentDate.getFullYear(),
        Number(currentMonth),
      );
      dispatch({ type: "SET_WEEKDAYS", payload: newWeekdays });
      dispatch({ type: "SET_WEEKENDS", payload: newWeekends });
    }
  }, [tab, dispatch]);

  const handleMonthChange = (selectedMonth: string) => {
    if (tab === "custom") {
      dispatch({ type: "SET_MONTH", payload: selectedMonth });
      const { weekdays: newWeekdays, weekends: newWeekends } = getDaysInMonth(
        year,
        Number(selectedMonth),
      );
      dispatch({ type: "SET_WEEKDAYS", payload: newWeekdays });
      dispatch({ type: "SET_WEEKENDS", payload: newWeekends });
    }
  };

  const handleYearChange = (newYear: number) => {
    if (tab === "custom") {
      dispatch({ type: "SET_YEAR", payload: newYear });
      const { weekdays: newWeekdays, weekends: newWeekends } = getDaysInMonth(
        newYear,
        Number(month),
      );
      dispatch({ type: "SET_WEEKDAYS", payload: newWeekdays });
      dispatch({ type: "SET_WEEKENDS", payload: newWeekends });
    }
  };

  return (
    <Tabs
      value={tab}
      onValueChange={(value) =>
        dispatch({ type: "SET_TAB", payload: value as "previous" | "custom" })
      }
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="previous">Previous Month</TabsTrigger>
        <TabsTrigger value="custom">Custom Month</TabsTrigger>
      </TabsList>
      <TabsContent value="previous" className="mt-2">
        <div className="flex space-x-4">
          <ComboBox
            options={months}
            defaultValue={month}
            onValueChange={handleMonthChange}
            placeholder="Search month..."
            initialText="Select month..."
            notFoundText="No month found."
            disabled
          />
          <Input
            type="number"
            value={year}
            onChange={(e) => handleYearChange(Number(e.target.value))}
            placeholder="Enter year"
            className="w-24"
            disabled
          />
        </div>
      </TabsContent>
      <TabsContent value="custom" className="mt-2">
        <div className="flex space-x-4">
          <ComboBox
            options={months}
            defaultValue={month}
            onValueChange={handleMonthChange}
            placeholder="Search month..."
            initialText="Select month..."
            notFoundText="No month found."
          />
          <Input
            type="number"
            value={year}
            onChange={(e) => handleYearChange(Number(e.target.value))}
            placeholder="Enter year"
            className="w-24"
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
