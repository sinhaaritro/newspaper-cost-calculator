export function getDaysInMonth(year: number, month: number) {
  // Month is 0-based in JavaScript Date (0 = January, 11 = December)
  const date = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();

  let weekdays = 0;
  let weekends = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    date.setDate(day);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekends++;
    } else {
      weekdays++;
    }
  }

  return { weekdays, weekends };
}

// Example usage for February 2025 (default for March 05, 2025)
export function getLastMonthDays() {
  const currentDate = new Date(); // March 05, 2025
  const lastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1,
  );
  const year = lastMonth.getFullYear(); // 2025
  const month = lastMonth.getMonth() + 1; // February (2)
  return getDaysInMonth(year, month);
}
