export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto w-full px-5 md:px-8 py-12 animate-pulse">
      <div className="h-10 w-64 rounded-sm bg-[var(--parchment-deep)] mb-10" />
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-16 rounded-sm bg-[var(--parchment-deep)]/60" />
        ))}
      </div>
    </div>
  );
}
