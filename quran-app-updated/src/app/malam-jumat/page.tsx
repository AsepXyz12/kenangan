import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Roundel from "@/components/Roundel";
import BacaanMalamJumat from "@/components/BacaanMalamJumat";
import { getSurahDetail } from "@/lib/quran-api";
import BackButton from "@/components/BackButton";

export const metadata = { title: "Amalan Malam Jumat — Mushaf" };

const AMALAN = [
  {
    judul: "Memperbanyak sholawat",
    isi: "Rasulullah ﷺ menganjurkan umatnya memperbanyak sholawat pada malam dan hari Jumat, karena sholawat tersebut akan diperlihatkan kepada beliau (HR. Abu Dawud).",
  },
  {
    judul: "Membaca Surat Al-Kahf",
    isi: "Dianjurkan membaca Surat Al-Kahf pada malam atau hari Jumat. Sebagian ulama menyandarkannya pada hadits riwayat Al-Hakim dan Al-Baihaqi tentang cahaya yang akan menyinari seseorang di antara dua Jumat.",
  },
  {
    judul: "Membaca Surat Yasin",
    isi: "Banyak muslim di Indonesia terbiasa membaca Surat Yasin pada malam Jumat. Perlu dicatat, hadits yang secara khusus menyebut keutamaan membaca Yasin di malam Jumat dinilai lemah oleh sebagian ulama hadits. Meski begitu, membaca Al-Qur'an kapan pun tetap bernilai ibadah dan mendatangkan pahala, termasuk membaca Yasin.",
  },
  {
    judul: "Memperbanyak doa",
    isi: "Terdapat waktu mustajab untuk berdoa di hari Jumat, sebagaimana disebutkan dalam hadits riwayat Bukhari dan Muslim, meski waktu pastinya diperselisihkan ulama.",
  },
  {
    judul: "Bersedekah",
    isi: "Hari Jumat dianggap sebagai hari yang penuh keberkahan, sehingga banyak ulama menganjurkan memperbanyak sedekah pada hari ini.",
  },
];

export default async function MalamJumatPage() {
  const [yasin, kahf] = await Promise.all([getSurahDetail(36), getSurahDetail(18)]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <BackButton href="/" label="Beranda" />
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
            Amalan Pekanan
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-4">
            Amalan Malam Jumat
          </h1>
          <p className="text-[var(--ink-soft)] leading-relaxed">
            Dalam penanggalan Islam, satu hari dimulai sejak terbenam
            matahari. Karena itu, malam Jumat adalah malam yang dimulai
            sejak Maghrib hari Kamis, dan sudah termasuk bagian dari hari
            Jumat, hari yang oleh Nabi Muhammad ﷺ disebut sebagai penghulu
            segala hari (HR. Muslim).
          </p>
        </div>

        <div className="space-y-5 mb-14">
          {AMALAN.map((a, i) => (
            <div
              key={a.judul}
              className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <Roundel number={i + 1} variant="teal" size={34} />
                <h2 className="font-display text-lg text-[var(--ink)]">{a.judul}</h2>
              </div>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{a.isi}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-display text-2xl text-[var(--ink)] mb-1">
            Bacaan Lengkap
          </h2>
          <p className="text-sm text-[var(--ink-soft)] mb-6">
            Teks Arab berharakat, transliterasi, dan terjemahan lengkap.
          </p>
          <BacaanMalamJumat yasin={yasin} kahf={kahf} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
