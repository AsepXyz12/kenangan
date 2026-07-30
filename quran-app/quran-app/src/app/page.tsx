import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Roundel from "@/components/Roundel";

const MENU = [
  {
    href: "/quran",
    nomor: 1,
    judul: "Al-Qur'an 30 Juz",
    deskripsi:
      "Baca lengkap 114 surat dan 30 juz, teks Arab berharakat, transliterasi, dan terjemahan Indonesia.",
  },
  {
    href: "/rukun-islam",
    nomor: 2,
    judul: "Rukun Islam",
    deskripsi: "Lima pondasi amal seorang muslim, lengkap dengan dalil dan penjelasannya.",
  },
  {
    href: "/rukun-iman",
    nomor: 3,
    judul: "Rukun Iman",
    deskripsi: "Enam pokok keyakinan yang menjadi dasar akidah seorang mukmin.",
  },
  {
    href: "/malam-jumat",
    nomor: 4,
    judul: "Amalan Malam Jumat",
    deskripsi:
      "Keutamaan malam Jumat, amalan yang dianjurkan, serta bacaan lengkap Surat Yasin dan Al-Kahf.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-10 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-[var(--gold)]" />
            <span className="text-xs tracking-[0.3em] uppercase text-[var(--gold)]">
              Mushaf Digital
            </span>
            <span className="h-px w-10 bg-[var(--gold)]" />
          </div>
          <h1 className="font-arabic text-5xl md:text-6xl text-[var(--ink)] mb-5" dir="rtl">
            القرآن الكريم
          </h1>
          <p className="font-display italic text-2xl md:text-3xl text-[var(--teal-deep)] mb-5">
            Satu tempat untuk membaca, memahami, dan mengamalkan
          </p>
          <p className="text-[var(--ink-soft)] leading-relaxed max-w-xl mx-auto">
            Al-Qur&apos;an 30 juz dengan harakat lengkap, pokok-pokok akidah
            dan syariat, amalan malam Jumat, serta akses ke ensiklopedia
            hadits sembilan imam.
          </p>
        </section>

        <section className="max-w-4xl mx-auto px-5 md:px-8 pb-24">
          <div className="grid sm:grid-cols-2 gap-5">
            {MENU.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="group relative rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/60 p-6 hover:border-[var(--gold)] transition-colors"
              >
                <Roundel number={m.nomor} variant="teal" className="mb-4" />
                <h2 className="font-display text-xl text-[var(--ink)] mb-2 group-hover:text-[var(--teal-deep)] transition-colors">
                  {m.judul}
                </h2>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                  {m.deskripsi}
                </p>
              </Link>
            ))}
          </div>

          <a
            href="https://www.carihadits.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center justify-between rounded-sm border border-[var(--teal)] bg-[var(--teal)] px-6 py-5 text-[var(--parchment)] hover:bg-[var(--teal-deep)] transition-colors"
          >
            <span>
              <span className="block font-display text-lg">
                Ensiklopedia Hadits 9 Imam
              </span>
              <span className="block text-sm text-[var(--parchment)]/80 mt-1">
                Ribuan hadits Bukhari, Muslim, dan tujuh kitab lainnya, lengkap dengan sanad dan terjemahan.
              </span>
            </span>
            <span className="font-display text-2xl shrink-0 ml-4">↗</span>
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
