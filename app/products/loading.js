export default function Loading() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto space-y-4">
      <div className="h-7 w-40 bg-gray-200 dark:bg-zinc-800 rounded" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="card-skin p-3">
            <div className="w-full aspect-square bg-gray-200 dark:bg-zinc-800 rounded" />
            <div className="mt-3 h-4 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded" />
            <div className="mt-2 h-4 w-1/3 bg-gray-200 dark:bg-zinc-800 rounded" />
            <div className="mt-3 h-9 w-full bg-gray-200 dark:bg-zinc-800 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
