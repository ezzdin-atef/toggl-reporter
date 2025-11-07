import { TimeEntry } from "@/app/types/toggl";
import { formatDateTime, formatDuration } from "@/app/utils/time";
import { twMerge } from "tailwind-merge";

interface TimeEntryCardProps {
  entry: TimeEntry;
}

export function TimeEntryCard({ entry }: TimeEntryCardProps) {
  const isRunning = entry.duration < 0;

  return (
    <div className="group relative bg-white rounded-xl border border-gray-200/80 p-5 transition-all duration-200 hover:shadow-lg hover:shadow-gray-200/50 hover:border-gray-300/80 hover:-translate-y-0.5 print:p-3 print:rounded-lg print:shadow-none print:border-gray-400">
      {/* Project Color Accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all duration-200 group-hover:w-1.5 print:w-1"
        style={{ backgroundColor: entry.project_color }}
      />

      <div className="ml-4 print:ml-3">
        {/* Header: Project and Client */}
        <div className="flex items-start justify-between gap-4 mb-3 print:mb-2">
          <p className="text-gray-600 text-[18px] leading-relaxed mb-3 break-words print:text-sm print:mb-2">
            {entry.description}
          </p>

          {/* Duration Badge */}
          <div
            className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-semibold transition-colors print:px-2 print:py-0.5 print:text-xs print:bg-gray-100 print:text-gray-900 print:ring-1 print:ring-gray-400 ${
              isRunning
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                : "bg-gray-50 text-gray-900 ring-1 ring-gray-900/10"
            }`}
          >
            {formatDuration(entry.duration)}
          </div>
        </div>

        {/* Description */}

        {/* Footer: Tags and Time */}
        <div className="flex items-center justify-between gap-4 flex-wrap print:gap-2">
          {/* Tags */}
          {entry.tags && entry.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 print:gap-1">
              {entry.tags.map((tag, index) => (
                <span
                  key={index}
                  className={twMerge(
                    "inline-flex text-base font-medium items-center px-2.5 py-0.5 rounded-md text-xs font-medium ring-1 ring-inset print:px-1.5 print:py-0 print:text-[10px]",
                    tag.toLowerCase() === "feature"
                      ? "bg-green-50 text-green-700 ring-1 ring-green-600/20 print:bg-green-100 print:ring-green-700"
                      : tag.toLowerCase() === "bug"
                      ? "bg-red-50 text-red-700 ring-1 ring-red-600/20 print:bg-red-100 print:ring-red-700"
                      : tag.toLowerCase() === "docs"
                      ? "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20 print:bg-yellow-100 print:ring-yellow-700"
                      : tag.toLowerCase() === "refactor"
                      ? "bg-purple-50 text-purple-700 ring-1 ring-purple-600/20 print:bg-purple-100 print:ring-purple-700"
                      : tag.toLowerCase() === "meeting"
                      ? "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 print:bg-blue-100 print:ring-blue-700"
                      : "bg-gray-50 text-gray-700 ring-1 ring-gray-600/20 print:bg-gray-100 print:ring-gray-700"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <div />
          )}

          {/* Time */}
          <time className="text-sm text-gray-500 font-medium flex-shrink-0 print:text-xs print:text-gray-700">
            {formatDateTime(entry.start)}
          </time>
        </div>
      </div>
    </div>
  );
}
