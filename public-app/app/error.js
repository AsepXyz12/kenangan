"use client";

export default function Error({ error, reset }) {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24 text-center">
      <p className="font-stamp text-xs uppercase tracking-[0.25em] text-clay">Error</p>
      <h1 className="font-display italic text-4xl mt-3 text-emerald">Ada yang salah</h1>
      <p className="mt-3 text-ink/60">
        Halaman ini gagal dimuat. Coba muat ulang, atau kembali ke album.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="font-stamp text-xs uppercase tracking-wide bg-emerald text-parchment px-5 py-2.5 hover:bg-emerald-light transition-colors"
        >
          Coba lagi
        </button>
        <a
          href="/"
          className="font-stamp text-xs uppercase tracking-wide border border-emerald/40 text-emerald px-5 py-2.5 hover:bg-emerald/10 transition-colors"
        >
          ← Kembali ke album
        </a>
      </div>
    </main>
  );
}
