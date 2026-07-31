import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Fiqih & Madzhab — Mushaf" };

const MADZHAB = [
  {
    nama: "Hanafi",
    pendiri: "Imam Abu Hanifah (80–150 H)",
    ciri:
      "Banyak berkembang di wilayah yang jauh dari Madinah (Kufah, Irak) sehingga lebih sering menggunakan qiyas (analogi) dan ra'yu (nalar) saat hadits yang sampai terbatas. Tersebar luas di Turki, Asia Selatan (India, Pakistan, Bangladesh), dan sebagian Asia Tengah.",
  },
  {
    nama: "Maliki",
    pendiri: "Imam Malik bin Anas (93–179 H)",
    ciri:
      "Berkembang di Madinah, sangat menekankan amal penduduk Madinah (praktik hidup masyarakat kota Nabi ﷺ) sebagai salah satu sumber hukum karena dianggap mewarisi langsung praktik generasi sahabat. Tersebar luas di Afrika Utara dan Afrika Barat.",
  },
  {
    nama: "Syafi'i",
    pendiri: "Imam Muhammad bin Idris asy-Syafi'i (150–204 H)",
    ciri:
      "Murid dari ulama Hanafi maupun Maliki, dikenal merumuskan kaidah ushul fiqih secara sistematis (kitab Ar-Risalah). Tersebar luas di Indonesia, Malaysia, Mesir bagian bawah, dan sebagian Afrika Timur.",
  },
  {
    nama: "Hanbali",
    pendiri: "Imam Ahmad bin Hanbal (164–241 H)",
    ciri:
      "Paling berhati-hati dalam berpegang pada hadits dan atsar sahabat, minim menggunakan ra'yu kecuali darurat. Tersebar luas di Arab Saudi dan sebagian Teluk.",
  },
];

const CONTOH = [
  {
    isu: "Batalnya wudhu karena bersentuhan kulit lawan jenis",
    perbandingan: [
      "Hanafi: tidak membatalkan wudhu selama tidak disertai syahwat/tanpa penghalang tertentu.",
      "Maliki & Hanbali: membatalkan wudhu jika disertai syahwat.",
      "Syafi'i: membatalkan wudhu secara mutlak (bersentuhan kulit langsung dengan lawan jenis bukan mahram), terlepas dari syahwat.",
    ],
  },
  {
    isu: "Membaca basmalah dalam shalat",
    perbandingan: [
      "Hanafi & Hanbali: basmalah dibaca pelan (sirr), bukan bagian ayat pertama Al-Fatihah yang wajib dikeraskan.",
      "Syafi'i: basmalah termasuk ayat Al-Fatihah dan dibaca (bisa dikeraskan) dalam shalat jahr.",
      "Maliki: tidak membaca basmalah sama sekali dalam shalat fardhu.",
    ],
  },
  {
    isu: "Qunut Subuh",
    perbandingan: [
      "Syafi'i: dianjurkan (sunnah muakkadah) dibaca setiap shalat Subuh.",
      "Hanafi & Maliki: hanya dianjurkan saat qunut nazilah (musibah/bencana tertentu), bukan rutin tiap Subuh.",
      "Hanbali: pendapat mayoritas ulama Hanbali sejalan dengan Hanafi — hanya saat ada musibah.",
    ],
  },
];

export default function FiqihMadzhabPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
            Fiqih
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-4">
            Fiqih &amp; Madzhab
          </h1>
          <p className="text-[var(--ink-soft)] leading-relaxed">
            Empat madzhab fiqih utama Ahlus Sunnah lahir dari ijtihad ulama
            besar yang sama-sama merujuk Al-Qur'an dan Sunnah, namun berbeda
            dalam metode dan penekanan. Perbedaan ini adalah{" "}
            <em>khilafiyah</em> (ranah ijtihad) yang diakui sah dalam Islam —
            bukan soal benar-salah, melainkan perbedaan cara memahami dalil
            yang sama-sama punya dasar kuat. Umat muslim umumnya mengikuti
            madzhab sesuai daerah/gurunya masing-masing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {MADZHAB.map((m) => (
            <div
              key={m.nama}
              className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-5 md:p-6"
            >
              <h2 className="font-display text-lg text-[var(--ink)] mb-1">
                {m.nama}
              </h2>
              <p className="text-xs text-[var(--gold)] mb-3">{m.pendiri}</p>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                {m.ciri}
              </p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-lg text-[var(--ink)] mb-2">
          Contoh Perbedaan Pandangan
        </h2>
        <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-6">
          Beberapa contoh masalah fiqih praktis yang dipandang berbeda oleh
          keempat madzhab, disajikan apa adanya tanpa menilai mana yang
          "paling benar" — silakan rujuk ke ustadz/kitab madzhab pilihan
          masing-masing untuk penjelasan dan dalil lengkapnya.
        </p>
        <div className="space-y-5">
          {CONTOH.map((c, i) => (
            <div
              key={i}
              className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-5 md:p-6"
            >
              <h3 className="font-display text-base text-[var(--ink)] mb-3">
                {c.isu}
              </h3>
              <ul className="space-y-1.5 text-sm text-[var(--ink-soft)]">
                {c.perbandingan.map((p, j) => (
                  <li key={j} className="leading-relaxed">
                    • {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
