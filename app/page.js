import { readPhotos } from "@/lib/store";
import Gallery from "@/components/Gallery";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const photos = await readPhotos();
  photos.sort((a, b) => (a.eventDate < b.eventDate ? 1 : -1));

  const years = Array.from(
    new Set(photos.map((p) => (p.eventDate || "").slice(0, 4)).filter(Boolean))
  ).sort((a, b) => b - a);

  return (
    <main>
      <header className="relative overflow-hidden border-b border-emerald/10">
        <div className="max-w-5xl mx-auto px-6 pt-14 pb-16">
          <p className="font-stamp text-xs tracking-[0.25em] uppercase text-emerald-light">
            Madrasah Aliyah — Arsip Bersama
          </p>
          <h1 className="font-display italic text-5xl sm:text-6xl mt-3 text-emerald leading-[1.05]">
            Galeri Kenangan MA
          </h1>
          <p className="mt-4 max-w-xl text-ink/70 leading-relaxed">
            Kumpulan foto dan cerita dari perjalanan Madrasah Aliyah kita — mulai dari
            kegiatan kelas, acara sekolah, hingga momen kebersamaan yang layak dikenang.
            Setiap foto bisa dilihat dan diberi komentar oleh siapa saja.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Link
              href="/admin"
              className="font-stamp text-xs uppercase tracking-wide bg-emerald text-parchment px-4 py-2.5 hover:bg-emerald-light transition-colors"
            >
              Masuk sebagai Admin
            </Link>
            <span className="font-stamp text-xs text-ink/50">
              {photos.length} foto tersimpan
            </span>
          </div>
        </div>
      </header>

      <Gallery photos={photos} years={years} />

      <footer className="max-w-5xl mx-auto px-6 py-10 text-center font-stamp text-xs text-ink/40">
        Galeri Kenangan · Madrasah Aliyah
      </footer>
    </main>
  );
}
