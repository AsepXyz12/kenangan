import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SurahReader from "@/components/SurahReader";
import { getSurahDetail } from "@/lib/quran-api";
import { notFound } from "next/navigation";

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
    return { title: `${surah.namaLatin} — Mushaf` };
  } catch {
    return { title: "Surat — Mushaf" };
  }
}

export default async function SurahPage({
  params,
}: {
  params: Promise<{ nomor: string }>;
}) {
  const { nomor } = await params;
  const nomorSurah = Number(nomor);

  if (!Number.isInteger(nomorSurah) || nomorSurah < 1 || nomorSurah > 114) {
    notFound();
  }

  const surah = await getSurahDetail(nomorSurah);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <div className="mb-4 text-right">
          <a
            href={`/quran/tafsir/${surah.nomor}`}
            className="text-sm underline decoration-[var(--gold)] underline-offset-4 text-[var(--ink-soft)]"
          >
            Baca tafsir surat ini →
          </a>
        </div>
        <SurahReader surah={surah} />
      </main>
      <Footer />
    </div>
  );
}
