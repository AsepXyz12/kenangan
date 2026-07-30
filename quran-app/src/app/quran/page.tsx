import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuranIndexClient from "@/components/QuranIndexClient";
import { getSurahList } from "@/lib/quran-api";

export const metadata = {
  title: "Al-Qur'an 30 Juz — Mushaf",
};

export default async function QuranIndexPage() {
  const surahList = await getSurahList();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-5 md:px-8 py-12">
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
            Al-Qur&apos;an
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--ink)]">
            30 Juz &middot; 114 Surat
          </h1>
        </div>
        <QuranIndexClient surahList={surahList} />
      </main>
      <Footer />
    </div>
  );
}
