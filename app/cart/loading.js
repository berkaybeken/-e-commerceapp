export default function Loading() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-3">
      <div className="h-7 w-28 bg-gray-200 dark:bg-zinc-800 rounded" />
      {[...Array(2)].map((_, i) => (
        <div key={i} className="card-skin p-3 flex items-center gap-3">
          <div className="w-16 h-16 bg-gray-200 dark:bg-zinc-800 rounded" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded" />
            <div className="h-3 w-1/3 bg-gray-200 dark:bg-zinc-800 rounded" />
          </div>
          <div className="w-24 h-9 bg-gray-200 dark:bg-zinc-800 rounded" />
        </div>
      ))}
    </div>
  );
}
