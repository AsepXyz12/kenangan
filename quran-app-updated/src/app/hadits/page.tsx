import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Roundel from "@/components/Roundel";
import { getKitabList } from "@/lib/hadits-api";

export const metadata = { title: "Hadits 9 Imam — Mushaf" };

export default function HaditsIndexPage() {
  const kitabList = getKitabList();
  const totalSemua = kitabList.reduce((sum, k) => sum + k.totalHadits, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-5 md:px-8 py-12">
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
            Hadits 9 Imam
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-4">
            {totalSemua.toLocaleString("id-ID")} Hadits
          </h1>
          <p className="text-[var(--ink-soft)] leading-relaxed">
            Kumpulan hadits dari sembilan kitab induk, lengkap teks Arab dan
            terjemahan Indonesia, tersimpan langsung di dalam situs ini.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {kitabList.map((k, i) => (
            <Link
              key={k.slug}
              href={`/hadits/${k.slug}`}
              className="group flex items-center gap-4 rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-5 hover:border-[var(--gold)] transition-colors"
            >
              <Roundel number={i + 1} variant="maroon" size={40} />
              <div className="min-w-0">
                <p className="font-display text-lg text-[var(--ink)] group-hover:text-[var(--heading)] transition-colors">
                  {k.nama}
                </p>
                <p className="text-xs text-[var(--ink-soft)]">
                  {k.totalHadits.toLocaleString("id-ID")} hadits
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
