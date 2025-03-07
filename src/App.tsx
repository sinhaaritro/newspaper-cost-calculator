import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculatorProvider } from "@/contexts/CalculatorContext";
import { CostSection } from "@/sections/CostSection";
import { NumberOfSection } from "@/sections/NumberOfSection";
import { HolidaysSection } from "@/sections/HolidaysSection";
import { CalculateSection } from "@/sections/CalculateSection";
import { MonthSelector } from "@/sections/MonthSelector";

function App() {
  return (
    <CalculatorProvider>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Newspaper Cost Calculator</CardTitle>
            <MonthSelector />
          </CardHeader>
          <CardContent className="space-y-6">
            <CostSection />
            <NumberOfSection />
            <HolidaysSection />
            <CalculateSection />
          </CardContent>
        </Card>
      </div>
    </CalculatorProvider>
  );
}

export default App;
