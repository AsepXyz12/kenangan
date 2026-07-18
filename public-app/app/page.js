import { readPhotos, readSettings } from "@/lib/store";
import Gallery from "@/components/Gallery";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const photos = await readPhotos();
  photos.sort((a, b) => (a.eventDate < b.eventDate ? 1 : -1));
  const settings = await readSettings();
  const siteName = settings.siteName || "Galeri Kenangan MA";

  const years = Array.from(
    new Set(photos.map((p) => (p.eventDate || "").slice(0, 4)).filter(Boolean))
  ).sort((a, b) => b - a);

  const angkatan = years.length > 0 ? `${years[years.length - 1]}–${years[0]}` : null;

  return (
    <main>
      <header className="relative overflow-hidden border-b border-emerald/10">
        <div className="max-w-5xl mx-auto px-6 pt-14 pb-16">
          {settings.logoUrl && (
            <div className="relative w-14 h-14 mb-5">
              <Image
                src={settings.logoUrl}
                alt={siteName}
                fill
                sizes="56px"
                className="object-contain"
              />
            </div>
          )}
          <p className="font-stamp text-xs tracking-[0.25em] uppercase text-emerald-light">
            Madrasah Aliyah — Arsip Bersama
          </p>
          <h1 className="font-display italic text-5xl sm:text-6xl mt-3 text-emerald leading-[1.05]">
            {siteName}
          </h1>
          <p className="mt-4 max-w-xl text-ink/70 leading-relaxed">
            Kumpulan foto, video, dan cerita dari perjalanan Madrasah Aliyah kita — mulai dari
            kegiatan kelas, acara sekolah, hingga momen kebersamaan yang layak dikenang.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-stamp text-xs uppercase tracking-wide text-ink/50">
            <span>{photos.length} kenangan tersimpan</span>
            {angkatan && (
              <>
                <span className="w-1 h-1 rounded-full bg-ink/20" />
                <span>Angkatan {angkatan}</span>
              </>
            )}
          </div>
          <hr className="thread mt-8" />
        </div>
      </header>

      <Gallery photos={photos} years={years} />

      <footer className="max-w-5xl mx-auto px-6 py-10 text-center">
        <hr className="thread mb-6" />
        <p className="font-stamp text-xs text-ink/40">
          {siteName} · Madrasah Aliyah
        </p>
      </footer>
    </main>
  );
}
