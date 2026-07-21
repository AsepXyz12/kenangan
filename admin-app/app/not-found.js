import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24 text-center">
      <p className="mono text-xs uppercase tracking-[0.25em] text-accent">404</p>
      <h1 className="text-3xl font-semibold mt-3 text-ink">Halaman tidak ditemukan</h1>
      <p className="mt-3 text-ink/60">
        URL admin ini salah ketik, atau halamannya sudah dipindah.
      </p>
      <Link
        href="/"
        className="btn inline-block mt-8 text-xs uppercase mono px-5 py-2.5"
      >
        ← Kembali ke dashboard
      </Link>
    </main>
  );
}
