export default function PublicLoading() {
  return (
    <div className="space-y-12 px-4 py-16">
      <div className="container animate-pulse space-y-4">
        <div className="h-10 w-64 rounded bg-surface-light" />
        <div className="h-5 w-96 rounded bg-surface-light" />
        <div className="h-64 w-full rounded-3xl bg-surface-light" />
      </div>
      <div className="container grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="h-48 rounded-2xl bg-surface-light animate-pulse" />
        ))}
      </div>
    </div>
  );
}
