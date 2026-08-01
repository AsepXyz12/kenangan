import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Roundel from "@/components/Roundel";
import BackButton from "@/components/BackButton";

export const metadata = { title: "Sejarah Islam — Mushaf" };

const KHULAFA = [
  {
    nomor: 1,
    nama: "Abu Bakar ash-Shiddiq",
    masa: "11–13 H / 632–634 M",
    ringkas:
      "Sahabat terdekat Nabi ﷺ dan orang dewasa pertama yang memeluk Islam. Masa kepemimpinannya yang singkat (sekitar 2 tahun) dipenuhi ujian besar: menumpas gerakan nabi-nabi palsu dan pemberontakan enggan membayar zakat (Perang Riddah), serta memulai pembukuan (kompilasi) mushaf Al-Qur'an atas usulan Umar bin Khattab setelah banyak penghafal Qur'an gugur di Perang Yamamah.",
  },
  {
    nomor: 2,
    nama: "Umar bin Khattab",
    masa: "13–23 H / 634–644 M",
    ringkas:
      "Dijuluki Al-Faruq (pembeda kebenaran dari kebatilan). Di masanya wilayah Islam meluas pesat meliputi Persia, Syam, dan Mesir. Beliau meletakkan dasar-dasar administrasi negara: kalender Hijriah, baitul mal (kas negara), sistem peradilan, dan jizyah. Wafat syahid ditikam oleh Abu Lu'lu'ah, seorang budak Persia, saat mengimami shalat Subuh.",
  },
  {
    nomor: 3,
    nama: "Utsman bin Affan",
    masa: "23–35 H / 644–656 M",
    ringkas:
      "Dikenal sangat dermawan dan pemalu (disegani bahkan oleh malaikat, menurut hadits). Jasa terbesarnya adalah menstandarkan satu mushaf resmi (Mushaf Utsmani) untuk menyeragamkan bacaan Al-Qur'an di seluruh wilayah Islam yang semakin luas, mencegah perpecahan akibat perbedaan qira'at. Wafat syahid dikepung pemberontak di rumahnya sendiri saat sedang membaca Al-Qur'an.",
  },
  {
    nomor: 4,
    nama: "Ali bin Abi Thalib",
    masa: "35–40 H / 656–661 M",
    ringkas:
      "Sepupu sekaligus menantu Nabi ﷺ, dikenal karena keberanian dan keilmuannya yang dalam. Masa kepemimpinannya diwarnai fitnah dan konflik internal (Perang Jamal dan Perang Shiffin) yang berujung pada perpecahan politik. Wafat syahid ditikam oleh Abdurrahman bin Muljam dari kelompok Khawarij saat hendak shalat Subuh, menandai berakhirnya era Khulafaur Rasyidin.",
  },
];

const PERIODE = [
  {
    judul: "Masa Kenabian (610–632 M)",
    isi: "Dimulai turunnya wahyu pertama di Gua Hira, dakwah sembunyi dan terang-terangan di Mekah selama 13 tahun, hijrah ke Madinah (622 M, titik awal kalender Hijriah), hingga wafatnya Nabi Muhammad ﷺ setelah Islam tersebar ke seluruh Jazirah Arab.",
  },
  {
    judul: "Khulafaur Rasyidin (632–661 M)",
    isi: "Empat khalifah pertama yang menyempurnakan warisan Nabi ﷺ — perluasan wilayah, kompilasi Al-Qur'an, dan peletakan dasar pemerintahan Islam. Lihat detail di atas.",
  },
  {
    judul: "Dinasti Umayyah (661–750 M)",
    isi: "Berpusat di Damaskus, mengubah sistem kekhalifahan menjadi monarki turun-temurun. Wilayah Islam meluas hingga Spanyol (Andalusia) di barat dan perbatasan India di timur — salah satu ekspansi wilayah tercepat dalam sejarah manusia.",
  },
  {
    judul: "Dinasti Abbasiyah (750–1258 M)",
    isi: "Berpusat di Baghdad, dikenal sebagai puncak Zaman Keemasan Islam (Islamic Golden Age). Baitul Hikmah menjadi pusat penerjemahan dan riset ilmu pengetahuan; lahir ilmuwan besar seperti Al-Khawarizmi (aljabar), Ibnu Sina (kedokteran), dan Ar-Razi (kimia). Berakhir setelah Baghdad dihancurkan pasukan Mongol.",
  },
  {
    judul: "Kesultanan Utsmaniyah (1299–1924 M)",
    isi: "Kekhalifahan Islam terakhir, berpusat di Istanbul (dahulu Konstantinopel, ditaklukkan 1453 M). Bertahan hampir 6 abad hingga akhirnya dibubarkan pasca Perang Dunia I, menandai berakhirnya sistem kekhalifahan dalam sejarah Islam.",
  },
];

export default function SejarahIslamPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <BackButton href="/" label="Beranda" />
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
            Peradaban
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-4">
            Sejarah Islam
          </h1>
          <p className="text-[var(--ink-soft)] leading-relaxed">
            Perjalanan singkat peradaban Islam dari masa kenabian hingga
            berakhirnya sistem kekhalifahan.
          </p>
        </div>

        <h2 className="font-display text-lg text-[var(--ink)] mb-4">
          Garis Waktu Besar
        </h2>
        <div className="space-y-5 mb-14">
          {PERIODE.map((p, i) => (
            <div
              key={i}
              className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-5 md:p-6"
            >
              <h3 className="font-display text-base text-[var(--ink)] mb-1.5">
                {p.judul}
              </h3>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                {p.isi}
              </p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-lg text-[var(--ink)] mb-4">
          Khulafaur Rasyidin — Empat Khalifah Pertama
        </h2>
        <div className="space-y-6">
          {KHULAFA.map((k) => (
            <div
              key={k.nomor}
              className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-3">
                <Roundel number={k.nomor} variant="maroon" size={40} />
                <div>
                  <h3 className="font-display text-xl text-[var(--ink)]">{k.nama}</h3>
                  <p className="text-xs text-[var(--ink-soft)]">{k.masa}</p>
                </div>
              </div>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                {k.ringkas}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
