import { readPhotos, readSettings } from "@/lib/store";
import Gallery from "@/components/Gallery";
import SplashScreen from "@/components/SplashScreen";

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
      <SplashScreen siteName={siteName} logoUrl={settings.logoUrl || null} />
      <header className="relative overflow-hidden border-b border-emerald/10">
        <div className="max-w-5xl mx-auto px-6 pt-14 pb-16">
          {settings.logoUrl && (
            /* eslint-disable-next-line @next/next/no-img-element -- logo diunggah admin,
               ukuran & rasio bebas, jadi <img> biasa lebih aman daripada next/image fill */
            <img
              src={settings.logoUrl}
              alt={siteName}
              className="h-20 sm:h-24 w-auto max-w-[240px] object-contain mb-5"
            />
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
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href="/kelas"
              className="font-stamp text-xs uppercase tracking-wide text-emerald underline"
            >
              Lihat Profil Kelas &amp; Wali Kelas &rarr;
            </a>
            <a
              href="/alumni"
              className="font-stamp text-xs uppercase tracking-wide text-clay underline"
            >
              Lihat Alumni &amp; Angkatan &rarr;
            </a>
          </div>
          <hr className="thread mt-8" />
        </div>
      </header>

      <Gallery photos={photos} years={years} />

      <section className="max-w-5xl mx-auto px-6 pb-4">
        <div className="border-t border-emerald/10 pt-10 text-center">
          <p className="font-stamp text-xs tracking-[0.25em] uppercase text-emerald-light">
            Mau Daftar ke MA?
          </p>
          <p className="mt-2 text-sm text-ink/60 max-w-md mx-auto">
            Hubungi salah satu contact person kami lewat WhatsApp untuk info pendaftaran.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/6285336119255"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-stamp text-xs uppercase tracking-wide bg-emerald text-parchment px-5 py-2.5 hover:bg-emerald-light transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.5 1.34 5.02L2 22l5.13-1.35c1.46.8 3.1 1.22 4.91 1.22 5.52 0 10-4.48 10-10s-4.48-10-10-10zm5.85 14.24c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2 .9 2.14.07.15.12.32.02.51-.09.19-.14.31-.28.48-.14.16-.29.36-.42.49-.14.14-.28.29-.12.57.16.27.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.2 1.37.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.52.72 1.78.85.26.13.44.19.5.3.06.11.06.63-.18 1.31z" />
              </svg>
              Pak Wilan
            </a>
            <a
              href="https://wa.me/6282142950566"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-stamp text-xs uppercase tracking-wide bg-emerald text-parchment px-5 py-2.5 hover:bg-emerald-light transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.5 1.34 5.02L2 22l5.13-1.35c1.46.8 3.1 1.22 4.91 1.22 5.52 0 10-4.48 10-10s-4.48-10-10-10zm5.85 14.24c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2 .9 2.14.07.15.12.32.02.51-.09.19-.14.31-.28.48-.14.16-.29.36-.42.49-.14.14-.28.29-.12.57.16.27.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.2 1.37.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.52.72 1.78.85.26.13.44.19.5.3.06.11.06.63-.18 1.31z" />
              </svg>
              Bu Era
            </a>
          </div>
        </div>
      </section>

      <footer className="max-w-5xl mx-auto px-6 py-10 text-center">
        <hr className="thread mb-6" />
        <p className="font-stamp text-xs text-ink/40">
          {siteName} · Madrasah Aliyah
        </p>
        <p className="font-stamp text-[10px] uppercase tracking-wide text-ink/30 mt-2">
          Dikembangkan oleh Ramzz dengan JavaScript (Next.js &amp; React), Tailwind CSS · disimpan di Vercel Blob
        </p>
        <p className="font-stamp text-[10px] text-ink/30 mt-1">
          copyright by Ramzz / asep xyz
        </p>
      </footer>
    </main>
  );
}
