import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Roundel from "@/components/Roundel";
import BackButton from "@/components/BackButton";

export const metadata = { title: "Rukun Islam — Mushaf" };

const RUKUN = [
  {
    nomor: 1,
    judul: "Syahadat",
    subjudul: "Dua Kalimat Syahadat",
    arab: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ",
    latin: "Asyhadu an laa ilaaha illallah, wa asyhadu anna Muhammadar rasulullah",
    arti: "Aku bersaksi bahwa tiada Tuhan selain Allah, dan aku bersaksi bahwa Nabi Muhammad adalah utusan Allah.",
    penjelasan:
      "Syahadat adalah pintu masuk ke dalam Islam. Kalimat pertama menegaskan tauhid, mengesakan Allah tanpa sekutu. Kalimat kedua menegaskan kerasulan Nabi Muhammad ﷺ sebagai penutup para nabi yang wajib diikuti tuntunannya.",
  },
  {
    nomor: 2,
    judul: "Sholat",
    subjudul: "Mendirikan Sholat Lima Waktu",
    dalilArab: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ",
    dalilArti: "\"Dan dirikanlah sholat, tunaikanlah zakat, dan rukuklah beserta orang-orang yang rukuk.\" (QS. Al-Baqarah: 43)",
    penjelasan:
      "Sholat lima waktu adalah tiang agama: Subuh (2 rakaat), Zuhur (4 rakaat), Ashar (4 rakaat), Maghrib (3 rakaat), dan Isya (4 rakaat). Sholat menjadi amal yang pertama kali dihisab di akhirat.",
  },
  {
    nomor: 3,
    judul: "Zakat",
    subjudul: "Menunaikan Zakat",
    dalilArab: "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِمْ بِهَا",
    dalilArti: "\"Ambillah zakat dari sebagian harta mereka, dengan zakat itu kamu membersihkan dan menyucikan mereka.\" (QS. At-Taubah: 103)",
    penjelasan:
      "Ada dua jenis zakat: zakat fitrah yang dikeluarkan setiap Ramadhan menjelang Idulfitri, dan zakat mal yang dikeluarkan dari harta yang telah mencapai nisab dan haul tertentu.",
  },
  {
    nomor: 4,
    judul: "Puasa",
    subjudul: "Berpuasa di Bulan Ramadhan",
    dalilArab: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِنْ قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ",
    dalilArti: "\"Wahai orang-orang yang beriman, diwajibkan atas kamu berpuasa sebagaimana diwajibkan atas orang-orang sebelum kamu agar kamu bertakwa.\" (QS. Al-Baqarah: 183)",
    penjelasan:
      "Puasa Ramadhan wajib bagi setiap muslim yang balig dan mampu, menahan diri dari makan, minum, dan hal-hal yang membatalkan puasa sejak fajar hingga terbenam matahari selama sebulan penuh.",
  },
  {
    nomor: 5,
    judul: "Haji",
    subjudul: "Menunaikan Ibadah Haji bagi yang Mampu",
    dalilArab: "وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا",
    dalilArti: "\"Mengerjakan haji adalah kewajiban manusia terhadap Allah, yaitu bagi orang yang mampu mengadakan perjalanan ke Baitullah.\" (QS. Ali 'Imran: 97)",
    penjelasan:
      "Haji ke Baitullah di Makkah wajib sekali seumur hidup bagi muslim yang mampu secara fisik, finansial, dan keamanan perjalanan.",
  },
];

export default function RukunIslamPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <BackButton href="/" label="Beranda" />
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
            Pondasi Amal
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-4">
            Rukun Islam
          </h1>
          <p className="text-[var(--ink-soft)] leading-relaxed">
            Lima perkara pokok yang menjadi bangunan keislaman seseorang.
            Rasulullah ﷺ bersabda bahwa Islam dibangun di atas lima perkara
            ini (HR. Bukhari dan Muslim, dari Ibnu Umar radhiyallahu
            &apos;anhuma).
          </p>
        </div>

        <div className="space-y-8">
          {RUKUN.map((r) => (
            <div
              key={r.nomor}
              className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Roundel number={r.nomor} variant="teal" size={40} />
                <div>
                  <h2 className="font-display text-xl text-[var(--ink)]">{r.judul}</h2>
                  <p className="text-sm text-[var(--ink-soft)]">{r.subjudul}</p>
                </div>
              </div>

              {r.arab && (
                <p className="ayat-arabic text-2xl md:text-3xl text-[var(--ink)] mb-3">
                  {r.arab}
                </p>
              )}
              {r.dalilArab && (
                <p className="ayat-arabic text-2xl md:text-3xl text-[var(--ink)] mb-3">
                  {r.dalilArab}
                </p>
              )}
              {r.latin && (
                <p className="italic text-sm text-[var(--ink-soft)] mb-3">{r.latin}</p>
              )}
              {r.arti && (
                <p className="text-[var(--ink)] mb-4">&ldquo;{r.arti}&rdquo;</p>
              )}
              {r.dalilArti && (
                <p className="text-[var(--ink)] mb-4">{r.dalilArti}</p>
              )}
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
