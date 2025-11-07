"use client";

import { getMonthName } from "@/app/utils/time";

interface MonthFilterProps {
  selectedYear: number;
  selectedMonth: number;
  onMonthChange: (year: number, month: number) => void;
}

export function MonthFilter({
  selectedYear,
  selectedMonth,
  onMonthChange,
}: MonthFilterProps) {
  const years = [2025];
  const months = Array.from({ length: 12 }, (_, i) => i);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onMonthChange(parseInt(e.target.value), selectedMonth);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onMonthChange(selectedYear, parseInt(e.target.value));
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex items-center gap-3">
        <label htmlFor="year" className="text-sm font-semibold text-gray-700">
          Year
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
          className="h-10 px-1 w-22 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="h-6 w-px bg-gray-200" />

      <div className="flex items-center gap-3">
        <label htmlFor="month" className="text-sm font-semibold text-gray-700">
          Month
        </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="h-10 px-1 w-44 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {getMonthName(month)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
