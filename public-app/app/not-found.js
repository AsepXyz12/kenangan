import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24 text-center">
      <p className="font-stamp text-xs uppercase tracking-[0.25em] text-emerald-light">
        404
      </p>
      <h1 className="font-display italic text-4xl mt-3 text-emerald">
        Kenangan ini tidak ditemukan
      </h1>
      <p className="mt-3 text-ink/60">
        Foto yang kamu cari mungkin sudah dipindah atau tautannya salah ketik.
      </p>
      <Link
        href="/"
        className="inline-block mt-8 font-stamp text-xs uppercase tracking-wide bg-emerald text-parchment px-5 py-2.5 hover:bg-emerald-light transition-colors"
      >
        ← Kembali ke album
      </Link>
    </main>
  );
}
