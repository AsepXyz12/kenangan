import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Roundel from "@/components/Roundel";
import BacaanTahlil from "@/components/BacaanTahlil";
import { getSurahDetail } from "@/lib/quran-api";
import { ACARA_LAINNYA } from "@/data/tahlil-yasin";

export const metadata = { title: "Tahlil, Yasin & Acara Lainnya — Mushaf" };

export default async function TahlilYasinPage() {
  const [fatihah, ikhlas, falaq, nas, baqarah, yasin] = await Promise.all([
    getSurahDetail(1),
    getSurahDetail(112),
    getSurahDetail(113),
    getSurahDetail(114),
    getSurahDetail(2),
    getSurahDetail(36),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
            Dzikir &amp; Majelis
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-4">
            Tahlil, Yasin &amp; Acara Lainnya
          </h1>
          <p className="text-[var(--ink-soft)] leading-relaxed">
            Tahlil adalah rangkaian bacaan Al-Qur&apos;an dan kalimat
            thayyibah yang lazim dibaca dalam majelis doa bersama, seperti
            tahlilan kematian dan yasinan. Halaman ini memuat susunan tahlil
            lengkap, Surat Yasin, serta panduan singkat bacaan untuk berbagai
            acara keislaman lain yang umum di masyarakat.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="font-display text-2xl text-[var(--ink)] mb-1">
            Bacaan Lengkap
          </h2>
          <p className="text-sm text-[var(--ink-soft)] mb-6">
            Teks Arab berharakat, transliterasi, dan terjemahan lengkap.
          </p>
          <BacaanTahlil
            fatihah={fatihah}
            ikhlas={ikhlas}
            falaq={falaq}
            nas={nas}
            baqarah={baqarah}
            yasin={yasin}
          />
        </div>

        <div>
          <h2 className="font-display text-2xl text-[var(--ink)] mb-1">
            Bacaan pada Acara-Acara Lain
          </h2>
          <p className="text-sm text-[var(--ink-soft)] mb-6">
            Panduan ringkas: kapan diadakan, apa yang biasa dibaca, dan
            catatan bila ada perbedaan pandangan ulama tentangnya.
          </p>
          <div className="space-y-5">
            {ACARA_LAINNYA.map((a, i) => (
              <div
                key={a.slug}
                className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Roundel number={i + 1} variant="teal" size={34} />
                  <div>
                    <h3 className="font-display text-lg text-[var(--ink)]">{a.nama}</h3>
                    <p className="text-xs text-[var(--ink-soft)] mt-0.5">{a.kapan}</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-3">
                  {a.penjelasan}
                </p>
                <p className="text-xs uppercase tracking-wide text-[var(--gold)] mb-1.5">
                  Yang biasa dibaca
                </p>
                <ul className="space-y-1 mb-3">
                  {a.bacaan.map((b) => (
                    <li key={b} className="text-sm text-[var(--ink-soft)] flex gap-2">
                      <span className="text-[var(--heading)]">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {a.catatan && (
                  <p className="text-xs text-[var(--ink-soft)] border-t border-[var(--parchment-line)] pt-3 leading-relaxed">
                    {a.catatan}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
