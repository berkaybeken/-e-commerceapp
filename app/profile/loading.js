export default function Loading() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-4xl mx-auto space-y-4">
      <div className="h-7 w-28 bg-gray-200 dark:bg-zinc-800 rounded" />
      <div className="card-skin p-4 space-y-3">
        <div className="h-4 w-1/3 bg-gray-200 dark:bg-zinc-800 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gray-200 dark:bg-zinc-800 rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded" />
                <div className="h-3 w-1/3 bg-gray-200 dark:bg-zinc-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="card-skin p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-4 w-40 bg-gray-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded" />
          </div>
          <div className="h-5 w-28 bg-gray-200 dark:bg-zinc-800 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gray-200 dark:bg-zinc-800 rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded" />
                  <div className="h-3 w-1/3 bg-gray-200 dark:bg-zinc-800 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
