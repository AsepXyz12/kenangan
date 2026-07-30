export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto w-full px-5 md:px-8 py-12 animate-pulse">
      <div className="h-10 w-64 rounded-sm bg-[var(--parchment-deep)] mb-10" />
      <div className="grid sm:grid-cols-2 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="h-20 rounded-sm bg-[var(--parchment-deep)]/60" />
        ))}
      </div>
    </div>
  );
}
