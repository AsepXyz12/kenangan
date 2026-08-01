import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Roundel from "@/components/Roundel";
import IqroCredit from "@/components/IqroCredit";
import { IQRO_DATA } from "@/lib/iqro-data";

export const metadata = {
  title: "Iqro Anak — Jilid 1 sampai 6",
  description:
    "Belajar membaca Al-Qur'an dari nol dengan metode Iqro jilid 1-6, dilengkapi suara pelafalan huruf untuk anak-anak.",
};

export default function IqroIndexPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-5 md:px-8 py-12">
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
            Untuk Anak-Anak
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-3">
            Iqro — Belajar Membaca Al-Qur&apos;an
          </h1>
          <p className="text-sm md:text-[15px] text-[var(--ink-soft)] leading-relaxed max-w-2xl">
            Enam jilid, dari mengenal huruf hijaiyah sampai siap membaca Al-Qur&apos;an 30 juz.
            Setiap contoh bisa didengarkan pelafalannya — cocok dipakai anak sambil didampingi
            orang tua atau ustadz/ustadzah.
          </p>
        </div>

        <div className="mb-8">
          <IqroCredit />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {IQRO_DATA.map((j) => (
            <Link
              key={j.jilid}
              href={`/iqro/${j.jilid}`}
              className="group relative rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/60 p-6 transition-all duration-300 hover:border-[var(--gold)] hover:-translate-y-1"
            >
              <Roundel number={j.jilid} variant={j.warna} className="mb-4" />
              <h2 className="font-display text-lg text-[var(--ink)] mb-2 group-hover:text-[var(--teal-deep)] transition-colors">
                {j.judul}
              </h2>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{j.ringkasan}</p>
              <span className="absolute bottom-0 left-6 right-6 h-px bg-[var(--gold)] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
