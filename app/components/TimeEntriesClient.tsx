"use client";

import { useState, useTransition } from "react";
import { TimeEntrySummary } from "@/app/types/toggl";
import { MonthFilter } from "./MonthFilter";
import { SummaryCard } from "./SummaryCard";
import { TimeEntryCard } from "./TimeEntryCard";
import { fetchTimeEntries } from "@/app/actions/toggl";
import { getMonthName } from "@/app/utils/time";

interface TimeEntriesClientProps {
  initialData: TimeEntrySummary;
  initialYear: number;
  initialMonth: number;
  apiToken: string;
}

export function TimeEntriesClient({
  initialData,
  initialYear,
  initialMonth,
  apiToken,
}: TimeEntriesClientProps) {
  const [data, setData] = useState<TimeEntrySummary>(initialData);
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleMonthChange = async (newYear: number, newMonth: number) => {
    setYear(newYear);
    setMonth(newMonth);
    setError(null);

    startTransition(async () => {
      try {
        const newData = await fetchTimeEntries(apiToken, newYear, newMonth);
        setData(newData);
      } catch (err) {
        setError("Failed to fetch time entries. Please check your API token.");
        console.error(err);
      }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-1.5 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full print:hidden" />
              <h1 className="text-4xl py-2 sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent print:text-gray-900 print:bg-none print:text-3xl">
                Toggl Track Reporter
              </h1>
            </div>
            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="no-print flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print Report
            </button>
          </div>
          <p className="text-gray-600 text-lg ml-5 print:ml-0 print:text-base">
            View and analyze your time entries with detailed insights
          </p>
        </div>

        {/* Month Filter */}
        <div className="no-print bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/80 p-6 mb-8">
          <MonthFilter
            selectedYear={year}
            selectedMonth={month}
            onMonthChange={handleMonthChange}
          />
        </div>

        {/* Loading State */}
        {isPending && (
          <div className="no-print flex flex-col items-center justify-center py-16">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent absolute top-0 left-0"></div>
            </div>
            <p className="mt-4 text-sm font-medium text-gray-600">
              Loading time entries...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="no-print bg-red-50 border border-red-200/80 rounded-xl px-5 py-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-red-800 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Content */}
        {!isPending && !error && (
          <>
            {/* Summary Card */}
            <div className="mb-10">
              <SummaryCard
                totalEntries={data.entries.length}
                formattedTotal={data.formattedTotal}
                totalSeconds={data.totalDuration}
              />
            </div>

            {/* Time Entries Section */}
            <div className="mb-6 print:mb-4">
              <div className="flex items-center justify-between print:flex-col print:items-start print:gap-2">
                <h2 className="text-2xl font-bold text-gray-900 print:text-xl">
                  {getMonthName(month)} {year}
                </h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-700 ring-1 ring-gray-900/10 print:px-2 print:py-0.5 print:text-xs">
                  {data.entries.length}{" "}
                  {data.entries.length === 1 ? "entry" : "entries"}
                </span>
              </div>
            </div>

            {data.entries.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/80 p-12 text-center">
                <div className="max-w-sm mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No time entries found
                  </h3>
                  <p className="text-gray-500">
                    There are no time entries for {getMonthName(month)} {year}.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {data.entries.map((entry) => (
                  <TimeEntryCard key={entry.id} entry={entry} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
