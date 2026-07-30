export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto w-full px-5 md:px-8 py-12 animate-pulse">
      <div className="h-10 w-64 rounded-sm bg-[var(--parchment-deep)] mb-10" />
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="h-24 rounded-sm bg-[var(--parchment-deep)]/60" />
        ))}
      </div>
    </div>
  );
}
