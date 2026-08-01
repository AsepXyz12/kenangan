import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Roundel from "@/components/Roundel";
import BackButton from "@/components/BackButton";

export const metadata = { title: "Aqidah & Tauhid — Mushaf" };

const TAUHID = [
  {
    nomor: 1,
    judul: "Tauhid Rububiyah",
    penjelasan:
      "Meyakini bahwa hanya Allah satu-satunya Pencipta, Pemberi rezeki, Pemilik, dan Pengatur seluruh alam semesta — tidak ada sekutu bagi-Nya dalam perbuatan-perbuatan ini. Bahkan orang-orang musyrik zaman Nabi ﷺ pun sebenarnya mengakui tauhid ini (bahwa Allah-lah pencipta langit dan bumi), namun itu saja belum cukup menjadikan seseorang muslim, karena mereka tetap menyembah selain Allah.",
    dalilArab: "اللَّهُ خَالِقُ كُلِّ شَيْءٍ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ وَكِيلٌ",
    dalilArti: "\"Allah pencipta segala sesuatu dan Dia Maha Pemelihara atas segala sesuatu.\" (QS. Az-Zumar: 62)",
  },
  {
    nomor: 2,
    judul: "Tauhid Uluhiyah",
    penjelasan:
      "Mengesakan Allah dalam ibadah — meyakini bahwa hanya Allah yang berhak disembah, diminta pertolongan, ditakuti, diharapkan, dan ditaati secara mutlak, tanpa perantara maupun sekutu apa pun. Inilah inti dakwah seluruh para nabi dan rasul sejak Nabi Nuh hingga Nabi Muhammad ﷺ, dan inilah yang membedakan muslim dari kaum musyrikin — karena penyimpangan terbesar dalam sejarah manusia justru terjadi di tauhid jenis ini, bukan di tauhid rububiyah.",
    dalilArab: "وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ حُنَفَاءَ",
    dalilArti: "\"Padahal mereka tidak diperintah kecuali agar beribadah kepada Allah dengan memurnikan ketaatan kepada-Nya semata.\" (QS. Al-Bayyinah: 5)",
  },
  {
    nomor: 3,
    judul: "Tauhid Asma wa Sifat",
    penjelasan:
      "Menetapkan seluruh nama dan sifat Allah sebagaimana Dia tetapkan sendiri untuk diri-Nya dalam Al-Qur'an dan yang ditetapkan Rasulullah ﷺ dalam hadits sahih, tanpa tahrif (mengubah makna), ta'thil (meniadakan sifat), takyif (menanyakan bagaimana bentuknya), maupun tamtsil (menyerupakan dengan makhluk). Prinsip pokoknya diringkas dalam kaidah: menetapkan tanpa menyerupakan, dan mensucikan tanpa meniadakan.",
    dalilArab: "لَيْسَ كَمِثْلِهِ شَيْءٌ وَهُوَ السَّمِيعُ الْبَصِيرُ",
    dalilArti: "\"Tidak ada sesuatu pun yang serupa dengan Dia, dan Dialah Yang Maha Mendengar lagi Maha Melihat.\" (QS. Asy-Syura: 11)",
  },
];

const PEMBATAL = [
  "Syirik dalam beribadah kepada Allah — menujukan salah satu bentuk ibadah (doa, sembelihan, nazar, dsb.) kepada selain Allah.",
  "Menjadikan perantara antara diri dengan Allah, memohon syafaat dan bertawakal kepada perantara tersebut secara langsung.",
  "Tidak meyakini kekufuran orang musyrik, atau ragu terhadap kekufurannya, atau membenarkan keyakinannya.",
  "Meyakini bahwa selain petunjuk Nabi Muhammad ﷺ ada yang lebih sempurna, atau hukum selainnya lebih baik dari hukumnya.",
  "Membenci sesuatu yang dibawa oleh Rasulullah ﷺ walaupun mengamalkannya.",
  "Memperolok-olok sesuatu dari agama Allah, pahala, atau siksa-Nya.",
  "Sihir — baik mempelajari, mengajarkan, maupun mempraktikkannya, termasuk mendatangi dan membenarkan tukang sihir/dukun.",
  "Membantu dan mendukung kaum musyrikin dalam memerangi kaum muslimin.",
  "Meyakini bahwa sebagian manusia boleh keluar dari syariat Nabi Muhammad ﷺ.",
  "Berpaling total dari agama Allah — tidak mempelajari dan tidak mengamalkannya sama sekali.",
];

export default function AqidahPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <BackButton href="/" label="Beranda" />
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
            Pokok Akidah
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-4">
            Aqidah &amp; Tauhid
          </h1>
          <p className="text-[var(--ink-soft)] leading-relaxed">
            Tauhid adalah inti dan fondasi seluruh ajaran Islam — mengesakan
            Allah dalam tiga hal pokok berikut ini. Halaman ini melengkapi{" "}
            <a href="/rukun-iman" className="underline decoration-[var(--gold)] underline-offset-4">
              Rukun Iman
            </a>{" "}
            dengan pembahasan yang lebih mendalam tentang makna tauhid itu sendiri.
          </p>
        </div>

        <div className="space-y-8 mb-14">
          {TAUHID.map((t) => (
            <div
              key={t.nomor}
              className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Roundel number={t.nomor} variant="maroon" size={40} />
                <h2 className="font-display text-xl text-[var(--ink)]">{t.judul}</h2>
              </div>
              <p className="ayat-arabic text-2xl md:text-3xl text-[var(--ink)] mb-3">
                {t.dalilArab}
              </p>
              <p className="text-[var(--ink)] mb-4">{t.dalilArti}</p>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                {t.penjelasan}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-6 md:p-8">
          <h2 className="font-display text-xl text-[var(--ink)] mb-2">
            Sepuluh Pembatal Keislaman
          </h2>
          <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-4">
            Diringkas oleh Syaikh Muhammad bin Abdul Wahhab dari dalil-dalil
            Al-Qur'an dan Sunnah — hal-hal yang membatalkan keislaman
            seseorang jika dilakukan dengan sengaja, sadar, dan tanpa paksaan.
            Disebutkan di sini bukan untuk memvonis siapa pun, melainkan
            sebagai pengingat agar seorang muslim menjaga akidahnya.
          </p>
          <ol className="space-y-2 text-sm text-[var(--ink)] list-decimal list-inside">
            {PEMBATAL.map((p, i) => (
              <li key={i} className="leading-relaxed">
                {p}
              </li>
            ))}
          </ol>
        </div>
      </main>
      <Footer />
    </div>
  );
}
