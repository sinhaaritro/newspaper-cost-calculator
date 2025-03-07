export function calculateTotalCost(
  costPerWeekday: number,
  costPerWeekend: number,
  weekdays: number,
  weekends: number,
  holidaysInWeekday: number,
  holidaysInWeekend: number,
): number {
  return (
    costPerWeekday * weekdays +
    costPerWeekend * weekends -
    (costPerWeekday * holidaysInWeekday + costPerWeekend * holidaysInWeekend)
  );
}

export function calculateCostOfAllDays(
  costPerWeekday: number,
  costPerWeekend: number,
  weekdays: number,
  weekends: number,
): number {
  return costPerWeekday * weekdays + costPerWeekend * weekends;
}

export function calculateCostOfHolidays(
  costPerWeekday: number,
  costPerWeekend: number,
  holidaysInWeekday: number,
  holidaysInWeekend: number,
): number {
  return (
    costPerWeekday * holidaysInWeekday + costPerWeekend * holidaysInWeekend
  );
}
