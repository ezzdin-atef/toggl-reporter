import { fetchTimeEntries } from "@/app/actions/toggl";
import { TimeEntriesClient } from "@/app/components/TimeEntriesClient";

export default async function Home() {
  // Get current month and year
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const apiToken = process.env.TOGGL_API_TOKEN || "YOUR_API_TOKEN_HERE";

  // Fetch initial data
  let initialData;
  let error = null;

  try {
    initialData = await fetchTimeEntries(apiToken, currentYear, currentMonth);
  } catch (err) {
    console.error("Failed to fetch initial data:", err);
    error =
      "Failed to load time entries. Please check your API token configuration.";
  }

  if (error || !initialData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <h2 className="font-semibold mb-2">Configuration Required</h2>
            <p className="mb-2">{error}</p>
            <p className="text-sm">
              Please set your TOGGL_API_TOKEN in .env.local or edit the apiToken
              in app/page.tsx
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <TimeEntriesClient
      initialData={initialData}
      initialYear={currentYear}
      initialMonth={currentMonth}
      apiToken={apiToken}
    />
  );
}
