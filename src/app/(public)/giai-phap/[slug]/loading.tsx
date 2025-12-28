export default function SolutionLoading() {
  return (
    <div className="space-y-10 px-4 py-12">
      <div className="container space-y-4 animate-pulse">
        <div className="h-8 w-72 rounded bg-surface-light" />
        <div className="h-5 w-96 rounded bg-surface-light" />
        <div className="h-64 rounded-3xl bg-surface-light" />
      </div>
      <div className="container grid gap-6 md:grid-cols-[1.6fr,1fr]">
        <div className="h-72 rounded-3xl bg-surface-light animate-pulse" />
        <div className="h-72 rounded-3xl bg-surface-light animate-pulse" />
      </div>
      <div className="container grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="h-48 rounded-2xl bg-surface-light animate-pulse" />
        ))}
      </div>
    </div>
  );
}
