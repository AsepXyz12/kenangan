import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Roundel from "@/components/Roundel";

export const metadata = { title: "Ilmu Tajwid — Mushaf" };

type Hukum = {
  nama: string;
  huruf?: string;
  penjelasan: string;
  contoh?: string;
};

type Bab = {
  nomor: number;
  judul: string;
  pengantar: string;
  hukum: Hukum[];
};

const BAB: Bab[] = [
  {
    nomor: 1,
    judul: "Hukum Nun Mati dan Tanwin",
    pengantar:
      "Ketika ada huruf nun mati (نْ) atau tanwin (ـً ـٍ ـٌ) bertemu huruf hijaiyah lain, terdapat empat hukum bacaan berikut ini.",
    hukum: [
      {
        nama: "Idzhar Halqi",
        huruf: "ء ه ع ح غ خ",
        penjelasan:
          "Nun mati/tanwin dibaca jelas tanpa dengung ketika bertemu salah satu dari enam huruf tenggorokan (halq) ini.",
        contoh: "مَنْ آمَنَ — dibaca jelas 'man aamana' tanpa dengung.",
      },
      {
        nama: "Idgham Bighunnah",
        huruf: "ي ن م و",
        penjelasan:
          "Nun mati/tanwin melebur (dimasukkan) ke huruf setelahnya disertai dengung, ketika bertemu salah satu dari empat huruf ini (dikenal dengan singkatan YANMU).",
        contoh: "مَنْ يَقُولُ — dibaca 'may yaquulu' dengan dengung.",
      },
      {
        nama: "Idgham Bilaghunnah",
        huruf: "ل ر",
        penjelasan:
          "Nun mati/tanwin melebur ke huruf lam atau ra tanpa disertai dengung sama sekali.",
        contoh: "مِنْ رَبِّهِمْ — dibaca 'mir rabbihim' tanpa dengung.",
      },
      {
        nama: "Iqlab",
        huruf: "ب",
        penjelasan:
          "Nun mati/tanwin diubah bunyinya menjadi mim ketika bertemu huruf ba, disertai dengung dan ditahan sejenak.",
        contoh: "مِنْ بَعْدِ — dibaca 'mim ba'di' (nun berubah bunyi jadi mim).",
      },
      {
        nama: "Ikhfa Haqiqi",
        huruf: "ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك",
        penjelasan:
          "Nun mati/tanwin dibaca samar-samar (antara jelas dan lebur) disertai dengung, ketika bertemu salah satu dari lima belas huruf sisanya.",
        contoh: "مَنْ تَابَ — dibaca samar dengan dengung ringan pada nun.",
      },
    ],
  },
  {
    nomor: 2,
    judul: "Hukum Mim Mati",
    pengantar:
      "Ketika ada huruf mim mati (مْ) bertemu huruf hijaiyah lain, terdapat tiga hukum bacaan berikut ini.",
    hukum: [
      {
        nama: "Ikhfa Syafawi",
        huruf: "ب",
        penjelasan: "Mim mati dibaca samar disertai dengung ketika bertemu huruf ba.",
        contoh: "تَرْمِيهِمْ بِحِجَارَةٍ — mim dibaca samar berdengung sebelum 'bihijaarah'.",
      },
      {
        nama: "Idgham Mimi (Mutamatsilain)",
        huruf: "م",
        penjelasan: "Mim mati melebur ke mim berikutnya disertai dengung karena bertemu huruf yang sama.",
        contoh: "لَهُمْ مَا — dibaca 'lahummaa' dengan dengung.",
      },
      {
        nama: "Idzhar Syafawi",
        huruf: "selain ب dan م",
        penjelasan: "Mim mati dibaca jelas tanpa dengung ketika bertemu huruf selain ba dan mim.",
        contoh: "أَنْعَمْتَ عَلَيْهِمْ — mim dibaca jelas.",
      },
    ],
  },
  {
    nomor: 3,
    judul: "Hukum Mad (Bacaan Panjang)",
    pengantar:
      "Mad adalah memanjangkan bacaan huruf tertentu. Secara garis besar terbagi menjadi Mad Thabi'i (asli) dan Mad Far'i (cabang) yang panjangnya bervariasi tergantung sebabnya.",
    hukum: [
      {
        nama: "Mad Thabi'i (Mad Asli)",
        penjelasan:
          "Dibaca panjang dua harakat (satu alif) ketika ada huruf berharakat fathah diikuti alif, kasrah diikuti ya sukun, atau dhammah diikuti wau sukun, tanpa sebab tambahan seperti hamzah atau sukun.",
        contoh: "قَالَ، قِيلَ، يَقُولُ",
      },
      {
        nama: "Mad Wajib Muttasil",
        penjelasan:
          "Mad thabi'i yang bertemu hamzah dalam satu kata yang sama, dibaca panjang empat sampai lima harakat.",
        contoh: "السَّمَاءِ، جَاءَ",
      },
      {
        nama: "Mad Jaiz Munfasil",
        penjelasan:
          "Mad thabi'i yang bertemu hamzah namun berada di kata yang berbeda (terpisah), dibaca panjang empat sampai lima harakat, boleh juga dua harakat tergantung riwayat qiraat.",
        contoh: "يَا أَيُّهَا، إِنَّا أَعْطَيْنَاكَ",
      },
      {
        nama: "Mad Lazim",
        penjelasan:
          "Mad thabi'i yang bertemu huruf bertasydid atau sukun tetap dalam satu kata, dibaca paling panjang yaitu enam harakat.",
        contoh: "الضَّالِّينَ، الْحَاقَّةُ",
      },
      {
        nama: "Mad 'Arid Lissukun",
        penjelasan:
          "Mad thabi'i yang terletak di akhir ayat/kalimat sehingga huruf terakhirnya diwaqafkan (disukunkan), boleh dibaca dua, empat, atau enam harakat.",
        contoh: "الرَّحِيمِ (di akhir ayat, dibaca 'ar-rahiim')",
      },
    ],
  },
  {
    nomor: 4,
    judul: "Qalqalah",
    pengantar:
      "Qalqalah adalah pantulan suara yang muncul ketika huruf tertentu berharakat sukun, baik asli maupun karena waqaf. Huruf qalqalah ada lima, disingkat 'Baju Di Toko' (ب ج د ط ق).",
    hukum: [
      {
        nama: "Qalqalah Sughra (kecil)",
        huruf: "ق ط ب ج د",
        penjelasan: "Pantulan ringan ketika salah satu huruf qalqalah sukun berada di tengah kata.",
        contoh: "يَجْعَلُونَ — pantulan ringan pada huruf jim.",
      },
      {
        nama: "Qalqalah Kubra (besar)",
        huruf: "ق ط ب ج د",
        penjelasan: "Pantulan lebih kuat ketika huruf qalqalah berada di akhir kata dan diwaqafkan (dihentikan).",
        contoh: "الْفَلَقْ — pantulan kuat pada huruf qaf saat diwaqafkan.",
      },
    ],
  },
  {
    nomor: 5,
    judul: "Tanda-tanda Waqaf",
    pengantar:
      "Waqaf adalah tanda berhenti dalam bacaan Al-Qur'an. Mengenali tanda-tandanya membantu pembaca berhenti di tempat yang tepat agar makna ayat tidak berubah.",
    hukum: [
      { nama: "مـ (Waqaf Lazim)", penjelasan: "Harus berhenti, karena jika disambung dapat mengubah makna." },
      { nama: "لا (Laa Waqfa)", penjelasan: "Tidak boleh berhenti di tempat ini; harus disambung ke ayat/kata berikutnya." },
      { nama: "ج (Waqaf Jaiz)", penjelasan: "Boleh berhenti atau boleh diteruskan, keduanya sama-sama baik." },
      { nama: "قلى (Al-Waqf Aula)", penjelasan: "Lebih diutamakan untuk berhenti, meski boleh juga diteruskan." },
      { nama: "صلى (Al-Wasl Aula)", penjelasan: "Lebih diutamakan untuk diteruskan (washal), meski boleh juga berhenti." },
      { nama: "∴ ∴ (Mu'anaqah)", penjelasan: "Tanda berpasangan; boleh berhenti di salah satu titik saja, tidak di kedua-duanya." },
    ],
  },
];

export default function IlmuTajwidPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
            Adab Membaca Al-Qur&apos;an
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-4">
            Ilmu Tajwid
          </h1>
          <p className="text-[var(--ink-soft)] leading-relaxed">
            Tajwid adalah ilmu yang mengatur cara membaca Al-Qur&apos;an
            dengan benar sesuai makhraj (tempat keluar huruf) dan sifat-sifat
            huruf, agar bacaan sesuai dengan yang diajarkan Rasulullah ﷺ.
            Mempelajari tajwid hukumnya fardhu kifayah, sementara
            mempraktikkannya saat membaca Al-Qur&apos;an hukumnya fardhu ain
            bagi setiap muslim.
          </p>
        </div>

        <div className="space-y-10">
          {BAB.map((b) => (
            <section key={b.nomor}>
              <div className="flex items-center gap-3 mb-2">
                <Roundel number={b.nomor} variant="gold" size={38} />
                <h2 className="font-display text-xl text-[var(--ink)]">{b.judul}</h2>
              </div>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-4">{b.pengantar}</p>
              <div className="space-y-3">
                {b.hukum.map((h) => (
                  <div
                    key={h.nama}
                    className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-5"
                  >
                    <div className="flex items-baseline justify-between gap-3 flex-wrap mb-2">
                      <p className="text-sm font-semibold text-[var(--teal-deep)]">{h.nama}</p>
                      {h.huruf && (
                        <p className="ayat-arabic text-lg text-[var(--ink)]" dir="rtl">
                          {h.huruf}
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{h.penjelasan}</p>
                    {h.contoh && (
                      <p className="text-xs text-[var(--ink-soft)] italic mt-2">
                        Contoh: <span className="ayat-arabic not-italic" dir="rtl">{h.contoh}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-6">
          <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
            Halaman ini merangkum kaidah dasar tajwid untuk pembelajaran.
            Praktik pengucapan yang tepat sebaiknya dipelajari langsung
            (talaqqi) dengan guru mengaji yang bersanad, karena tajwid pada
            dasarnya adalah ilmu praktik lisan yang sulit dikuasai hanya
            lewat teks tertulis.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
