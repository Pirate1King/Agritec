export default function OrderLoading() {
  return (
    <section className="container space-y-8 py-12">
      <div className="animate-pulse space-y-3">
        <div className="h-4 w-32 rounded bg-surface-light" />
        <div className="h-8 w-96 max-w-full rounded bg-surface-light" />
        <div className="h-4 w-80 max-w-full rounded bg-surface-light" />
      </div>
      <div className="grid gap-8 md:grid-cols-[1.6fr,1fr]">
        <div className="h-80 rounded-3xl bg-surface-light animate-pulse" />
        <div className="h-80 rounded-3xl bg-surface-light animate-pulse" />
      </div>
    </section>
  );
}
