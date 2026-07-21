"use client";

export default function Error({ error, reset }) {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24 text-center">
      <p className="mono text-xs uppercase tracking-[0.25em] text-danger">Error</p>
      <h1 className="text-3xl font-semibold mt-3 text-ink">Ada yang salah</h1>
      <p className="mt-3 text-ink/60">
        Terjadi kesalahan saat memuat halaman ini. Coba muat ulang, atau
        kembali ke dashboard kalau masalah berlanjut.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <button onClick={() => reset()} className="btn text-xs uppercase mono px-5 py-2.5">
          Coba lagi
        </button>
        <a href="/" className="btn btn-outline text-xs uppercase mono px-5 py-2.5">
          Ke dashboard
        </a>
      </div>
    </main>
  );
}
