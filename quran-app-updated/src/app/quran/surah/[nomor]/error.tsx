"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="max-w-md mx-auto px-5 py-24 text-center">
      <p className="font-arabic text-3xl text-[var(--ink)] mb-4" dir="rtl">
        عَفْوًا
      </p>
      <h1 className="font-display text-xl text-[var(--ink)] mb-3">
        Terjadi kesalahan
      </h1>
      <p className="text-sm text-[var(--ink-soft)] mb-6 leading-relaxed">
        Halaman ini gagal dimuat. Coba muat ulang.
      </p>
      <button
        onClick={() => reset()}
        className="px-5 py-2.5 rounded-full bg-[var(--teal)] text-[var(--parchment)] hover:bg-[var(--teal-deep)] transition-colors text-sm"
      >
        Coba lagi
      </button>
    </div>
  );
}
