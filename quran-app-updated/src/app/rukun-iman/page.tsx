import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Roundel from "@/components/Roundel";
import BackButton from "@/components/BackButton";

export const metadata = { title: "Rukun Iman — Mushaf" };

const RUKUN = [
  {
    nomor: 1,
    judul: "Iman kepada Allah",
    penjelasan:
      "Meyakini bahwa Allah adalah satu-satunya Pencipta, Pemilik, dan Pengatur alam semesta, tanpa sekutu dalam zat, sifat, maupun perbuatan-Nya. Segala bentuk ibadah hanya ditujukan kepada-Nya semata. Keimanan ini mencakup tiga tingkatan tauhid: Tauhid Rububiyah (meyakini Allah sebagai satu-satunya Pencipta, Pemberi rezeki, dan Pengatur alam semesta), Tauhid Uluhiyah (meyakini bahwa hanya Allah yang berhak disembah dan diibadahi, tanpa perantara maupun sekutu), dan Tauhid Asma wa Sifat (menetapkan nama-nama dan sifat-sifat Allah sebagaimana disebutkan dalam Al-Qur'an dan Sunnah, tanpa menyerupakan-Nya dengan makhluk maupun menolak maknanya).",
    dalilArab: "شَهِدَ اللَّهُ أَنَّهُ لَا إِلَٰهَ إِلَّا هُوَ وَالْمَلَائِكَةُ وَأُولُو الْعِلْمِ قَائِمًا بِالْقِسْطِ",
    dalilArti: "\"Allah menyatakan bahwa tidak ada Tuhan selain Dia, dan para malaikat serta orang-orang berilmu yang menegakkan keadilan.\" (QS. Ali 'Imran: 18)",
  },
  {
    nomor: 2,
    judul: "Iman kepada Malaikat",
    penjelasan:
      "Meyakini keberadaan malaikat sebagai makhluk gaib ciptaan Allah dari cahaya, yang senantiasa taat menjalankan tugasnya tanpa pernah membangkang. Sepuluh malaikat yang wajib diketahui beserta tugasnya: Jibril (menyampaikan wahyu kepada para nabi), Mikail (mengatur rezeki dan hujan), Israfil (meniup sangkakala pada hari kiamat), Izrail/Malakul Maut (mencabut nyawa), Munkar dan Nakir (menanyai manusia di alam kubur), Raqib dan Atid (mencatat amal baik dan buruk manusia), Malik (menjaga pintu neraka), dan Ridwan (menjaga pintu surga).",
    dalilArab: "آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ",
    dalilArti: "\"Rasul telah beriman kepada apa yang diturunkan kepadanya dari Tuhannya, demikian pula orang-orang yang beriman, semua beriman kepada Allah dan malaikat-malaikat-Nya.\" (QS. Al-Baqarah: 285)",
  },
  {
    nomor: 3,
    judul: "Iman kepada Kitab-kitab Allah",
    penjelasan:
      "Meyakini bahwa Allah menurunkan kitab suci kepada para rasul-Nya sebagai petunjuk hidup manusia: Suhuf Ibrahim dan Musa (lembaran-lembaran wahyu awal), Taurat kepada Nabi Musa, Zabur kepada Nabi Daud, Injil kepada Nabi Isa, dan Al-Qur'an kepada Nabi Muhammad ﷺ sebagai kitab penyempurna dan penutup seluruh kitab sebelumnya, yang dijaga keasliannya oleh Allah hingga hari kiamat.",
    dalilArab: "وَأَنْزَلْنَا إِلَيْكَ الْكِتَابَ بِالْحَقِّ مُصَدِّقًا لِمَا بَيْنَ يَدَيْهِ مِنَ الْكِتَابِ",
    dalilArti: "\"Dan Kami turunkan kepadamu Al-Qur'an dengan membawa kebenaran, membenarkan kitab-kitab sebelumnya.\" (QS. Al-Ma'idah: 48)",
  },
  {
    nomor: 4,
    judul: "Iman kepada Rasul-rasul Allah",
    penjelasan:
      "Meyakini bahwa Allah mengutus para rasul kepada setiap umat untuk membimbing manusia ke jalan yang lurus. Dua puluh lima nabi dan rasul disebutkan namanya secara langsung dalam Al-Qur'an, dan diyakini masih banyak lagi yang tidak disebutkan. Di antara mereka terdapat lima rasul bergelar Ulul Azmi (pemilik keteguhan hati luar biasa) yaitu Nabi Nuh, Ibrahim, Musa, Isa, dan Muhammad ﷺ, yang menghadapi ujian dakwah paling berat namun tetap teguh menyampaikan risalah Allah.",
    dalilArab: "لَقَدْ أَرْسَلْنَا رُسُلَنَا بِالْبَيِّنَاتِ وَأَنْزَلْنَا مَعَهُمُ الْكِتَابَ وَالْمِيزَانَ لِيَقُومَ النَّاسُ بِالْقِسْطِ",
    dalilArti: "\"Sungguh Kami telah mengutus rasul-rasul Kami dengan bukti-bukti nyata, dan Kami turunkan bersama mereka kitab dan neraca agar manusia dapat menegakkan keadilan.\" (QS. Al-Hadid: 25)",
  },
  {
    nomor: 5,
    judul: "Iman kepada Hari Kiamat",
    penjelasan:
      "Meyakini bahwa alam semesta akan berakhir dan seluruh manusia akan dibangkitkan untuk mempertanggungjawabkan seluruh amal perbuatannya, lalu dibalas dengan surga atau neraka sesuai timbangan amalnya. Waktu terjadinya dirahasiakan Allah, namun terdapat tanda-tanda kiamat kecil (seperti maraknya kebodohan agama, perzinaan, dan riba) yang telah dan sedang terjadi, serta tanda-tanda kiamat besar (seperti munculnya Dajjal, turunnya Nabi Isa, munculnya Ya'juj dan Ma'juj, dan terbitnya matahari dari barat) yang menandai kiamat sudah sangat dekat.",
    dalilArab: "إِنَّ السَّاعَةَ آتِيَةٌ أَكَادُ أُخْفِيهَا لِتُجْزَىٰ كُلُّ نَفْسٍ بِمَا تَسْعَىٰ",
    dalilArti: "\"Sesungguhnya hari kiamat akan datang, Aku merahasiakan waktunya agar setiap orang dibalas sesuai dengan apa yang telah diusahakannya.\" (QS. Taha: 15)",
  },
  {
    nomor: 6,
    judul: "Iman kepada Qada dan Qadar",
    penjelasan:
      "Meyakini bahwa segala sesuatu yang terjadi, baik maupun buruk, telah ditetapkan oleh Allah sesuai dengan ilmu dan kehendak-Nya. Keimanan ini mencakup empat tingkatan: Al-'Ilmu (Allah mengetahui segala sesuatu sebelum terjadi), Al-Kitabah (seluruh takdir telah tertulis di Lauhul Mahfuzh), Al-Masyi'ah (segala sesuatu terjadi atas kehendak Allah), dan Al-Khalq (Allah yang menciptakan segala sesuatu, termasuk perbuatan hamba-Nya). Keyakinan ini mendorong seorang mukmin untuk tetap berikhtiar sungguh-sungguh sambil bertawakal kepada Allah, bukan berpasrah tanpa usaha.",
    dalilArab: "إِنَّا كُلَّ شَيْءٍ خَلَقْنَاهُ بِقَدَرٍ",
    dalilArti: "\"Sesungguhnya Kami menciptakan segala sesuatu menurut ukuran (takdirnya).\" (QS. Al-Qamar: 49)",
  },
];

export default function RukunImanPage() {
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
            Rukun Iman
          </h1>
          <p className="text-[var(--ink-soft)] leading-relaxed">
            Enam pokok keyakinan yang menjadi dasar akidah seorang mukmin,
            sebagaimana disebutkan Rasulullah ﷺ dalam hadits Jibril yang
            masyhur (HR. Muslim).
          </p>
        </div>

        <div className="space-y-8">
          {RUKUN.map((r) => (
            <div
              key={r.nomor}
              className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Roundel number={r.nomor} variant="maroon" size={40} />
                <h2 className="font-display text-xl text-[var(--ink)]">{r.judul}</h2>
              </div>
              <p className="ayat-arabic text-2xl md:text-3xl text-[var(--ink)] mb-3">
                {r.dalilArab}
              </p>
              <p className="text-[var(--ink)] mb-4">{r.dalilArti}</p>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                {r.penjelasan}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
