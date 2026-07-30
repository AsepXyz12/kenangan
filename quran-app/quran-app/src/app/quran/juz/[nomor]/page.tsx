import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JuzReader, { type JuzSegment } from "@/components/JuzReader";
import { getJuzBoundary, surahRangeInJuz } from "@/lib/juz-data";
import { getSurahDetail } from "@/lib/quran-api";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ nomor: string }>;
}) {
  const { nomor } = await params;
  return { title: `Juz ${nomor} — Mushaf` };
}

export default async function JuzPage({
  params,
}: {
  params: Promise<{ nomor: string }>;
}) {
  const { nomor } = await params;
  const nomorJuz = Number(nomor);
  const boundary = getJuzBoundary(nomorJuz);

  if (!boundary) {
    notFound();
  }

  const surahNumbers = surahRangeInJuz(boundary);
  const surahDetails = await Promise.all(surahNumbers.map((s) => getSurahDetail(s)));

  const segments: JuzSegment[] = surahDetails.map((surah) => {
    const ayatMulai = surah.nomor === boundary.start.surah ? boundary.start.ayat : 1;
    const ayatSelesai =
      surah.nomor === boundary.end.surah ? boundary.end.ayat : surah.jumlahAyat;
    return { surah, ayatMulai, ayatSelesai };
  });

  const juzSebelumnya = nomorJuz > 1 ? nomorJuz - 1 : null;
  const juzSelanjutnya = nomorJuz < 30 ? nomorJuz + 1 : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
            Juz {nomorJuz}
          </p>
          <h1 className="font-display text-2xl md:text-3xl text-[var(--ink)]">
            {boundary.nama}
          </h1>
        </div>

        <JuzReader segments={segments} />

        <div className="flex items-center justify-between mt-10 pt-6 border-t border-[var(--parchment-line)]">
          {juzSebelumnya ? (
            <Link href={`/quran/juz/${juzSebelumnya}`} className="text-sm text-[var(--teal-deep)] hover:underline">
              ← Juz {juzSebelumnya}
            </Link>
          ) : (
            <span />
          )}
          {juzSelanjutnya ? (
            <Link href={`/quran/juz/${juzSelanjutnya}`} className="text-sm text-[var(--teal-deep)] hover:underline">
              Juz {juzSelanjutnya} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
