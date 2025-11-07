"use server";

import { TimeEntry, TimeEntrySummary } from "@/app/types/toggl";
import {
  calculateTotalDuration,
  formatDuration,
  getFirstDayOfMonth,
  getLastDayOfMonth,
} from "@/app/utils/time";

export async function fetchTimeEntries(
  apiToken: string,
  year: number,
  month: number
): Promise<TimeEntrySummary> {
  const startDate = getFirstDayOfMonth(year, month);
  const endDate = getLastDayOfMonth(year, month);

  const startISO = startDate.toISOString();
  const endISO = endDate.toISOString();

  const url = `https://api.track.toggl.com/api/v9/me/time_entries?start_date=${encodeURIComponent(
    startISO
  )}&end_date=${encodeURIComponent(endISO)}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${apiToken}:api_token`).toString(
          "base64"
        )}`,
      },
      // cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch time entries: ${response.statusText}`);
    }

    const entries: TimeEntry[] = await response.json();

    // Filter entries by date range (in case API returns outside range)
    const filteredEntries = entries.filter((entry) => {
      const entryDate = new Date(entry.start);
      return entryDate >= startDate && entryDate <= endDate;
    });

    // Sort entries by start date (newest first)
    const sortedEntries = filteredEntries.sort((a, b) => {
      return new Date(b.start).getTime() - new Date(a.start).getTime();
    });

    // Calculate total duration
    const totalDuration = calculateTotalDuration(
      sortedEntries.map((e) => e.duration)
    );
    
    return {
      entries: sortedEntries,
      totalDuration,
      formattedTotal: formatDuration(totalDuration),
    };
  } catch (error) {
    console.error("Error fetching time entries:", error);
    throw error;
  }
}

