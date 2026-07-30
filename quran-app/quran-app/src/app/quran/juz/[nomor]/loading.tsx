export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto w-full px-5 md:px-8 py-12 animate-pulse">
      <div className="h-40 rounded-sm bg-[var(--parchment-deep)] mb-10" />
      <div className="space-y-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-20 rounded-sm bg-[var(--parchment-deep)]/60" />
        ))}
      </div>
    </div>
  );
}
