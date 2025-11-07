/**
 * Formats duration in seconds to a readable format (e.g., "2h 30m")
 * Handles negative durations (running timers)
 */
export function formatDuration(seconds: number): string {
  
  // Handle running timers (negative duration)
  if (seconds < 0) {
    return "Running...";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours === 0) {
    return `${minutes}m`;
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
}

/**
 * Gets the first day of the month at 00:00:00
 */
export function getFirstDayOfMonth(year: number, month: number): Date {
  return new Date(year, month, 1, 0, 0, 0, 0);
}

/**
 * Gets the last day of the month at 23:59:59
 */
export function getLastDayOfMonth(year: number, month: number): Date {
  return new Date(year, month + 1, 0, 23, 59, 59, 999);
}

/**
 * Formats a date for display (e.g., "Nov 6, 2025, 9:20 AM")
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Formats a date for display (short format)
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Gets the month name from month number (0-11)
 */
export function getMonthName(month: number): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month];
}

/**
 * Calculates total duration from an array of durations
 * Excludes running timers (negative durations)
 */
export function calculateTotalDuration(durations: number[]): number {
  return durations.reduce((total, duration) => {
    if (duration > 0) {
      return total + duration;
    }
    return total;
  }, 0);
}

