interface SummaryCardProps {
  totalEntries: number;
  formattedTotal: string;
  totalSeconds: number;
}

export function SummaryCard({
  totalEntries,
  formattedTotal,
  totalSeconds,
}: SummaryCardProps) {
  const totalHours = (totalSeconds / 3600).toFixed(2);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl shadow-xl shadow-blue-500/20 p-8 print:shadow-none print:rounded-lg print:p-4 print:border print:border-gray-300">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-white/10 blur-2xl print:hidden" />
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-24 w-24 rounded-full bg-white/10 blur-2xl print:hidden" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-6 print:mb-3">
          <div className="h-8 w-1 bg-white/80 rounded-full print:bg-gray-800" />
          <h2 className="text-xl font-semibold text-white print:text-gray-900 print:text-lg">Monthly Summary</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 print:gap-3">
          {/* Total Entries */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 print:bg-gray-50 print:border-gray-300 print:p-3">
            <p className="text-blue-100 text-sm font-medium mb-2 print:text-gray-700 print:text-xs">
              Total Entries
            </p>
            <p className="text-4xl font-bold text-white print:text-gray-900 print:text-2xl">{totalEntries}</p>
          </div>

          {/* Total Time */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 print:bg-gray-50 print:border-gray-300 print:p-3">
            <p className="text-blue-100 text-sm font-medium mb-2 print:text-gray-700 print:text-xs">Total Time</p>
            <p className="text-4xl font-bold text-white print:text-gray-900 print:text-2xl">{formattedTotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
