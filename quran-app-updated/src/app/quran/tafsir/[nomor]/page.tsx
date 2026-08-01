import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import Roundel from "@/components/Roundel";
import { getTafsirSurah } from "@/lib/tafsir-api";
import { getSurahDetail } from "@/lib/quran-api";
import { notFound } from "next/navigation";
import Link from "next/link";

export function generateStaticParams() {
  return Array.from({ length: 114 }).map((_, i) => ({ nomor: String(i + 1) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ nomor: string }>;
}) {
  const { nomor } = await params;
  try {
    const surah = await getSurahDetail(Number(nomor));
    return { title: `Tafsir ${surah.namaLatin} — Mushaf` };
  } catch {
    return { title: "Tafsir — Mushaf" };
  }
}

export default async function TafsirPage({
  params,
}: {
  params: Promise<{ nomor: string }>;
}) {
  const { nomor } = await params;
  const nomorSurah = Number(nomor);

  if (!Number.isInteger(nomorSurah) || nomorSurah < 1 || nomorSurah > 114) {
    notFound();
  }

  let surah;
  let tafsir;
  try {
    surah = await getSurahDetail(nomorSurah);
    tafsir = getTafsirSurah(nomorSurah);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <BackButton href={`/quran/surah/${nomorSurah}`} label="Kembali ke surat" />
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
            Tafsir · Kemenag RI
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-2">
            {surah.namaLatin}
          </h1>
          <p className="text-sm text-[var(--ink-soft)] mb-4">
            {surah.arti} · {surah.tempatTurun} · {surah.jumlahAyat} ayat
          </p>
          <Link
            href={`/quran/surah/${surah.nomor}`}
            className="text-sm underline decoration-[var(--gold)] underline-offset-4"
          >
            ← Baca ayat &amp; terjemahan
          </Link>
        </div>

        <div className="space-y-6">
          {tafsir.tafsir.map((t) => (
            <div
              key={t.ayat}
              className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-3">
                <Roundel number={t.ayat} variant="maroon" size={36} />
                <span className="text-xs text-[var(--ink-soft)]">Ayat {t.ayat}</span>
              </div>
              <p className="text-sm text-[var(--ink)] leading-relaxed whitespace-pre-line">
                {t.teks}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs text-[var(--ink-soft)]">
          Sumber: {tafsir.sumber} — tersimpan langsung di dalam aplikasi,
          tersedia offline tanpa perlu koneksi ke layanan luar.
        </p>
      </main>
      <Footer />
    </div>
  );
}
