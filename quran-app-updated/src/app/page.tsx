import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Roundel from "@/components/Roundel";
import LiveStrip from "@/components/LiveStrip";
import VisitorCounter from "@/components/VisitorCounter";
import ContinueReadingCard from "@/components/ContinueReadingCard";
import { getAyatHariIni } from "@/lib/quran-api";

export const revalidate = 3600;

const MENU = [
  {
    href: "/quran",
    nomor: 1,
    judul: "Al-Qur'an 30 Juz",
    deskripsi:
      "Baca lengkap 114 surat dan 30 juz, teks Arab berharakat, transliterasi, dan terjemahan Indonesia.",
  },
  {
    href: "/iqro",
    nomor: 2,
    judul: "Iqro Anak (Jilid 1-6)",
    deskripsi:
      "Belajar membaca Al-Qur'an dari mengenal huruf hijaiyah, lengkap dengan suara pelafalan tiap contoh.",
  },
  {
    href: "/hadits",
    nomor: 3,
    judul: "Hadits 9 Imam",
    deskripsi:
      "62.169 hadits dari sembilan kitab induk, teks Arab dan terjemahan Indonesia, tersimpan langsung di situs ini.",
  },
  {
    href: "/panduan-sholat",
    nomor: 3,
    judul: "Panduan Sholat Lengkap",
    deskripsi:
      "Tata cara sholat fardu, gerakan langkah demi langkah, lengkap dengan bacaan Arab, Latin, dan terjemahan.",
  },
  {
    href: "/kisah-nabi",
    nomor: 4,
    judul: "Kisah 25 Nabi dan Rasul",
    deskripsi:
      "Ringkasan kisah, hikmah, dan rujukan ayat dari Adam hingga Muhammad ﷺ.",
  },
  {
    href: "/sirah-nabawiyah",
    nomor: 5,
    judul: "Sirah Nabawiyah",
    deskripsi:
      "Sejarah lengkap Nabi Muhammad ﷺ dan awal mula Islam, disusun kronologis dari Jazirah Arab sebelum kenabian hingga wafat beliau.",
  },
  {
    href: "/rukun-islam",
    nomor: 6,
    judul: "Rukun Islam",
    deskripsi: "Lima pondasi amal seorang muslim, lengkap dengan dalil dan penjelasannya.",
  },
  {
    href: "/rukun-iman",
    nomor: 7,
    judul: "Rukun Iman",
    deskripsi: "Enam pokok keyakinan yang menjadi dasar akidah seorang mukmin.",
  },
  {
    href: "/malam-jumat",
    nomor: 8,
    judul: "Amalan Malam Jumat",
    deskripsi:
      "Keutamaan malam Jumat, amalan yang dianjurkan, serta bacaan lengkap Surat Yasin dan Al-Kahf.",
  },
  {
    href: "/akhlak-adab",
    nomor: 9,
    judul: "Akhlak & Adab",
    deskripsi:
      "Adab keseharian seorang muslim — makan, bertamu, kepada orang tua dan guru — beserta akhlak terpuji dan tercela.",
  },
  {
    href: "/ilmu-tajwid",
    nomor: 10,
    judul: "Ilmu Tajwid",
    deskripsi:
      "Kaidah dasar membaca Al-Qur'an: hukum nun mati, mim mati, mad, qalqalah, dan tanda waqaf.",
  },
  {
    href: "/sirah-sahabat",
    nomor: 11,
    judul: "Sirah Sahabat",
    deskripsi: "Kisah sepuluh sahabat yang dijamin Rasulullah ﷺ masuk surga semasa hidup.",
  },
  {
    href: "/wanita-dalam-islam",
    nomor: 12,
    judul: "Wanita dalam Islam",
    deskripsi: "Kedudukan, hak-hak, dan kisah tokoh muslimah teladan sepanjang sejarah Islam.",
  },
  {
    href: "/tahlil-yasin",
    nomor: 13,
    judul: "Tahlil, Yasin & Acara Lainnya",
    deskripsi:
      "Susunan tahlil lengkap, Surat Yasin, dan panduan bacaan untuk tahlilan, maulid, isra mikraj, dan acara lainnya.",
  },
];

export default async function Home() {
  const ayatHariIni = await getAyatHariIni();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-10 text-center">
          <div className="inline-flex items-center gap-3 mb-6 animate-fade-up">
            <span className="h-px w-10 bg-[var(--gold)] animate-glow" />
            <span className="text-xs tracking-[0.3em] uppercase text-[var(--gold)]">
              Mushaf Digital
            </span>
            <span className="h-px w-10 bg-[var(--gold)] animate-glow" />
          </div>
          <h1
            className="font-arabic text-gold-foil text-5xl md:text-6xl mb-5 animate-fade-up animate-glow"
            style={{ animationDelay: "0.08s" }}
            dir="rtl"
          >
            القرآن الكريم
          </h1>
          <p
            className="font-display italic text-2xl md:text-3xl text-[var(--heading)] mb-5 animate-fade-up"
            style={{ animationDelay: "0.16s" }}
          >
            Satu tempat untuk membaca, memahami, dan mengamalkan
          </p>
          <p
            className="text-[var(--ink-soft)] leading-relaxed max-w-xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.24s" }}
          >
            Al-Qur&apos;an 30 juz dengan harakat lengkap, pokok-pokok akidah
            dan syariat, amalan malam Jumat, serta akses ke ensiklopedia
            hadits sembilan imam.
          </p>
          <div
            className="mt-7 flex justify-center animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <VisitorCounter />
          </div>
        </section>

        <ContinueReadingCard />

        <LiveStrip />

        <section
          className="max-w-3xl mx-auto px-5 md:px-8 pb-16 animate-fade-up"
          style={{ animationDelay: "0.32s" }}
        >
          <Link
            href={`/quran/surah/${ayatHariIni.surahNomor}?dari=beranda`}
            className="group ornament-border ornament-corner block rounded-sm bg-[var(--parchment-deep)]/50 px-6 py-8 md:px-10 md:py-10 text-center transition-colors hover:bg-[var(--parchment-deep)]/80"
          >
            <span className="text-xs tracking-[0.25em] uppercase text-[var(--gold)]">
              Ayat Pilihan Hari Ini &middot; {ayatHariIni.tema}
            </span>
            <p
              className="ayat-arabic text-2xl md:text-3xl text-[var(--ink)] mt-5 mb-5"
              dir="rtl"
            >
              {ayatHariIni.ayat.teksArab}
            </p>
            <p className="text-sm md:text-[15px] text-[var(--ink-soft)] leading-relaxed max-w-xl mx-auto">
              {ayatHariIni.ayat.teksIndonesia}
            </p>
            <p className="font-display italic text-sm text-[var(--heading)] mt-5 group-hover:text-[var(--gold)] transition-colors">
              QS. {ayatHariIni.namaLatin}: {ayatHariIni.ayat.nomorAyat}
            </p>
          </Link>
        </section>

        <section className="max-w-4xl mx-auto px-5 md:px-8 pb-24">
          <div className="grid sm:grid-cols-2 gap-5">
            {MENU.map((m, i) => (
              <Link
                key={m.href}
                href={m.href}
                className="group relative rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/60 p-6 transition-all duration-300 hover:border-[var(--gold)] hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--parchment-line)]/40 animate-fade-up"
                style={{ animationDelay: `${0.4 + i * 0.07}s` }}
              >
                <Roundel
                  number={i + 1}
                  variant="teal"
                  className="mb-4 transition-transform duration-500 group-hover:rotate-[18deg]"
                />
                <h2 className="font-display text-xl text-[var(--ink)] mb-2 group-hover:text-[var(--heading)] transition-colors">
                  {m.judul}
                </h2>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                  {m.deskripsi}
                </p>
                <span className="absolute bottom-0 left-6 right-6 h-px bg-[var(--gold)] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
