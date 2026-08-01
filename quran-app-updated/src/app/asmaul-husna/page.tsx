import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Asmaul Husna — Mushaf" };

type Asma = { nomor: number; arab: string; latin: string; arti: string };

const ASMAUL_HUSNA: Asma[] = [
  { nomor: 1, arab: "الرَّحْمَٰن", latin: "Ar-Rahman", arti: "Yang Maha Pengasih" },
  { nomor: 2, arab: "الرَّحِيم", latin: "Ar-Rahiim", arti: "Yang Maha Penyayang" },
  { nomor: 3, arab: "الْمَلِك", latin: "Al-Malik", arti: "Yang Maha Merajai" },
  { nomor: 4, arab: "الْقُدُّوس", latin: "Al-Quddus", arti: "Yang Maha Suci" },
  { nomor: 5, arab: "السَّلَام", latin: "As-Salam", arti: "Yang Maha Memberi Kesejahteraan" },
  { nomor: 6, arab: "الْمُؤْمِن", latin: "Al-Mu'min", arti: "Yang Maha Memberi Keamanan" },
  { nomor: 7, arab: "الْمُهَيْمِن", latin: "Al-Muhaimin", arti: "Yang Maha Pemelihara" },
  { nomor: 8, arab: "الْعَزِيز", latin: "Al-'Aziz", arti: "Yang Maha Perkasa" },
  { nomor: 9, arab: "الْجَبَّار", latin: "Al-Jabbar", arti: "Yang Maha Kuasa/Memaksa" },
  { nomor: 10, arab: "الْمُتَكَبِّر", latin: "Al-Mutakabbir", arti: "Yang Maha Megah" },
  { nomor: 11, arab: "الْخَالِق", latin: "Al-Khaliq", arti: "Yang Maha Pencipta" },
  { nomor: 12, arab: "الْبَارِئ", latin: "Al-Bari'", arti: "Yang Maha Mengadakan" },
  { nomor: 13, arab: "الْمُصَوِّر", latin: "Al-Musawwir", arti: "Yang Maha Membentuk Rupa" },
  { nomor: 14, arab: "الْغَفَّار", latin: "Al-Ghaffar", arti: "Yang Maha Pengampun" },
  { nomor: 15, arab: "الْقَهَّار", latin: "Al-Qahhar", arti: "Yang Maha Memaksa" },
  { nomor: 16, arab: "الْوَهَّاب", latin: "Al-Wahhab", arti: "Yang Maha Pemberi Karunia" },
  { nomor: 17, arab: "الرَّزَّاق", latin: "Ar-Razzaq", arti: "Yang Maha Pemberi Rezeki" },
  { nomor: 18, arab: "الْفَتَّاح", latin: "Al-Fattah", arti: "Yang Maha Pembuka Rahmat" },
  { nomor: 19, arab: "اَلْعَلِيْم", latin: "Al-'Alim", arti: "Yang Maha Mengetahui" },
  { nomor: 20, arab: "الْقَابِض", latin: "Al-Qabidh", arti: "Yang Maha Menyempitkan" },
  { nomor: 21, arab: "الْبَاسِط", latin: "Al-Basith", arti: "Yang Maha Melapangkan" },
  { nomor: 22, arab: "الْخَافِض", latin: "Al-Khafidh", arti: "Yang Maha Merendahkan" },
  { nomor: 23, arab: "الرَّافِع", latin: "Ar-Rafi'", arti: "Yang Maha Meninggikan" },
  { nomor: 24, arab: "الْمُعِزّ", latin: "Al-Mu'izz", arti: "Yang Maha Memuliakan" },
  { nomor: 25, arab: "المُذِلّ", latin: "Al-Mudzil", arti: "Yang Maha Menghinakan" },
  { nomor: 26, arab: "السَّمِيع", latin: "As-Sami'", arti: "Yang Maha Mendengar" },
  { nomor: 27, arab: "الْبَصِير", latin: "Al-Bashir", arti: "Yang Maha Melihat" },
  { nomor: 28, arab: "الْحَكَم", latin: "Al-Hakam", arti: "Yang Maha Menetapkan Hukum" },
  { nomor: 29, arab: "الْعَدْل", latin: "Al-'Adl", arti: "Yang Maha Adil" },
  { nomor: 30, arab: "اللَّطِيف", latin: "Al-Lathif", arti: "Yang Maha Lembut" },
  { nomor: 31, arab: "الْخَبِير", latin: "Al-Khabir", arti: "Yang Maha Mengenal" },
  { nomor: 32, arab: "الْحَلِيم", latin: "Al-Halim", arti: "Yang Maha Penyantun" },
  { nomor: 33, arab: "الْعَظِيم", latin: "Al-'Azhim", arti: "Yang Maha Agung" },
  { nomor: 34, arab: "الْغَفُور", latin: "Al-Ghafur", arti: "Yang Maha Pengampun" },
  { nomor: 35, arab: "الشَّكُور", latin: "Asy-Syakur", arti: "Yang Maha Mensyukuri" },
  { nomor: 36, arab: "الْعَلِيّ", latin: "Al-'Aliy", arti: "Yang Maha Tinggi" },
  { nomor: 37, arab: "الْكَبِير", latin: "Al-Kabir", arti: "Yang Maha Besar" },
  { nomor: 38, arab: "الْحَفِيظ", latin: "Al-Hafizh", arti: "Yang Maha Memelihara" },
  { nomor: 39, arab: "المُقيت", latin: "Al-Muqit", arti: "Yang Maha Pemberi Kecukupan" },
  { nomor: 40, arab: "الْحسِيب", latin: "Al-Hasib", arti: "Yang Maha Membuat Perhitungan" },
  { nomor: 41, arab: "الْجَلِيل", latin: "Al-Jalil", arti: "Yang Maha Mulia" },
  { nomor: 42, arab: "الْكَرِيم", latin: "Al-Karim", arti: "Yang Maha Pemurah" },
  { nomor: 43, arab: "الرَّقِيب", latin: "Ar-Raqib", arti: "Yang Maha Mengawasi" },
  { nomor: 44, arab: "الْمُجِيب", latin: "Al-Mujib", arti: "Yang Maha Mengabulkan" },
  { nomor: 45, arab: "الْوَاسِع", latin: "Al-Wasi'", arti: "Yang Maha Luas" },
  { nomor: 46, arab: "الْحَكِيم", latin: "Al-Hakim", arti: "Yang Maha Bijaksana" },
  { nomor: 47, arab: "الْوَدُود", latin: "Al-Wadud", arti: "Yang Maha Mengasihi" },
  { nomor: 48, arab: "الْمَجِيد", latin: "Al-Majid", arti: "Yang Maha Mulia" },
  { nomor: 49, arab: "الْبَاعِث", latin: "Al-Ba'its", arti: "Yang Maha Membangkitkan" },
  { nomor: 50, arab: "الشَّهِيد", latin: "Asy-Syahid", arti: "Yang Maha Menyaksikan" },
  { nomor: 51, arab: "الْحَقّ", latin: "Al-Haqq", arti: "Yang Maha Benar" },
  { nomor: 52, arab: "الْوَكِيل", latin: "Al-Wakil", arti: "Yang Maha Memelihara Penyerahan" },
  { nomor: 53, arab: "الْقَوِيّ", latin: "Al-Qawiyy", arti: "Yang Maha Kuat" },
  { nomor: 54, arab: "الْمَتِين", latin: "Al-Matin", arti: "Yang Maha Kokoh" },
  { nomor: 55, arab: "الْوَلِيّ", latin: "Al-Waliyy", arti: "Yang Maha Melindungi" },
  { nomor: 56, arab: "الْحَمِيد", latin: "Al-Hamid", arti: "Yang Maha Terpuji" },
  { nomor: 57, arab: "الْمُحْصِي", latin: "Al-Muhshi", arti: "Yang Maha Menghitung" },
  { nomor: 58, arab: "الْمُبْدِئ", latin: "Al-Mubdi'", arti: "Yang Maha Memulai" },
  { nomor: 59, arab: "الْمُعِيد", latin: "Al-Mu'id", arti: "Yang Maha Mengembalikan" },
  { nomor: 60, arab: "الْمُحْيِي", latin: "Al-Muhyi", arti: "Yang Maha Menghidupkan" },
  { nomor: 61, arab: "اَلْمُمِيت", latin: "Al-Mumit", arti: "Yang Maha Mematikan" },
  { nomor: 62, arab: "الْحَيّ", latin: "Al-Hayy", arti: "Yang Maha Hidup" },
  { nomor: 63, arab: "الْقَيُّوم", latin: "Al-Qayyum", arti: "Yang Maha Berdiri Sendiri" },
  { nomor: 64, arab: "الْوَاجِد", latin: "Al-Wajid", arti: "Yang Maha Kaya (Menemukan)" },
  { nomor: 65, arab: "الْمَاجِد", latin: "Al-Majid", arti: "Yang Maha Mulia" },
  { nomor: 66, arab: "الْواحِد", latin: "Al-Wahid", arti: "Yang Maha Tunggal" },
  { nomor: 67, arab: "اَلاَحَد", latin: "Al-Ahad", arti: "Yang Maha Esa" },
  { nomor: 68, arab: "الصَّمَد", latin: "As-Shamad", arti: "Yang Maha Dibutuhkan (Tempat Bergantung)" },
  { nomor: 69, arab: "الْقَادِر", latin: "Al-Qadir", arti: "Yang Maha Kuasa" },
  { nomor: 70, arab: "الْمُقْتَدِر", latin: "Al-Muqtadir", arti: "Yang Maha Berkuasa" },
  { nomor: 71, arab: "الْمُقَدِّم", latin: "Al-Muqaddim", arti: "Yang Maha Mendahulukan" },
  { nomor: 72, arab: "الْمُؤَخِّر", latin: "Al-Mu'akhkhir", arti: "Yang Maha Mengakhirkan" },
  { nomor: 73, arab: "الأوَّل", latin: "Al-Awwal", arti: "Yang Maha Awal" },
  { nomor: 74, arab: "الآخِر", latin: "Al-Akhir", arti: "Yang Maha Akhir" },
  { nomor: 75, arab: "الظَّاهِر", latin: "Azh-Zhahir", arti: "Yang Maha Nyata" },
  { nomor: 76, arab: "الْبَاطِن", latin: "Al-Bathin", arti: "Yang Maha Tersembunyi" },
  { nomor: 77, arab: "الْوَالِي", latin: "Al-Wali", arti: "Yang Maha Memerintah" },
  { nomor: 78, arab: "الْمُتَعَالِي", latin: "Al-Muta'ali", arti: "Yang Maha Tinggi" },
  { nomor: 79, arab: "الْبَرّ", latin: "Al-Barr", arti: "Yang Maha Penderma Kebajikan" },
  { nomor: 80, arab: "التَّوَّاب", latin: "At-Tawwab", arti: "Yang Maha Penerima Tobat" },
  { nomor: 81, arab: "الْمُنْتَقِم", latin: "Al-Muntaqim", arti: "Yang Maha Pemberi Balasan" },
  { nomor: 82, arab: "العَفُوّ", latin: "Al-'Afuww", arti: "Yang Maha Pemaaf" },
  { nomor: 83, arab: "الرَّؤُوف", latin: "Ar-Ra'uf", arti: "Yang Maha Pengasuh" },
  { nomor: 84, arab: "مَالِكُ الْمُلْك", latin: "Malikul Mulk", arti: "Yang Maha Menguasai Kerajaan" },
  { nomor: 85, arab: "ذُوالْجَلَالِ وَالإكْرَام", latin: "Dzul Jalali wal Ikram", arti: "Yang Maha Memiliki Kebesaran dan Kemuliaan" },
  { nomor: 86, arab: "الْمُقْسِط", latin: "Al-Muqsith", arti: "Yang Maha Pemberi Keadilan" },
  { nomor: 87, arab: "الْجَامِع", latin: "Al-Jami'", arti: "Yang Maha Mengumpulkan" },
  { nomor: 88, arab: "الْغَنِيّ", latin: "Al-Ghani", arti: "Yang Maha Kaya" },
  { nomor: 89, arab: "الْمُغْنِي", latin: "Al-Mughni", arti: "Yang Maha Pemberi Kekayaan" },
  { nomor: 90, arab: "اَلْمَانِعُ", latin: "Al-Mani'", arti: "Yang Maha Mencegah" },
  { nomor: 91, arab: "الضَّار", latin: "Adh-Dharr", arti: "Yang Maha Memberi Derita" },
  { nomor: 92, arab: "النَّافِع", latin: "An-Nafi'", arti: "Yang Maha Memberi Manfaat" },
  { nomor: 93, arab: "النُّور", latin: "An-Nur", arti: "Yang Maha Bercahaya" },
  { nomor: 94, arab: "الْهَادِي", latin: "Al-Hadi", arti: "Yang Maha Pemberi Petunjuk" },
  { nomor: 95, arab: "الْبَدِيع", latin: "Al-Badi'", arti: "Yang Maha Pencipta yang Tiada Bandingan" },
  { nomor: 96, arab: "الْبَاقِي", latin: "Al-Baqi", arti: "Yang Maha Kekal" },
  { nomor: 97, arab: "الْوَارِث", latin: "Al-Warits", arti: "Yang Maha Mewarisi" },
  { nomor: 98, arab: "الرَّشِيد", latin: "Ar-Rasyid", arti: "Yang Maha Pandai" },
  { nomor: 99, arab: "الصَّبُور", latin: "As-Sabur", arti: "Yang Maha Penyabar" },
];

export default function AsmaulHusnaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--parchment)]">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-5 md:px-8 py-10 md:py-14 w-full">
        <span className="text-xs tracking-widest uppercase text-[var(--ink-soft)]">Aqidah</span>
        <h1 className="font-display text-3xl md:text-4xl text-[var(--heading)] mt-1 mb-3">
          Asmaul Husna
        </h1>
        <p className="text-[var(--ink-soft)] mb-4 leading-relaxed">
          99 nama Allah yang indah. Rasulullah ﷺ bersabda bahwa siapa yang menghafal dan
          memahaminya akan masuk surga.
        </p>
        <div className="mb-10 rounded-xl bg-[var(--parchment-deep)]/60 p-4 md:p-5 space-y-2">
          <p dir="rtl" className="font-arabic text-lg md:text-xl leading-loose text-[var(--ink)]">
            وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا
          </p>
          <p className="text-sm text-[var(--ink-soft)]">
            &ldquo;Hanya milik Allah asmaul husna (nama-nama yang terbaik), maka berdoalah kepada-Nya dengan menyebut asmaul husna itu.&rdquo; (QS. Al-A'raf: 180)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {ASMAUL_HUSNA.map((a) => (
            <div
              key={a.nomor}
              className="rounded-xl border border-[var(--parchment-line)] bg-[var(--parchment)] p-4 flex flex-col gap-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--ink-soft)]">{a.nomor}</span>
                <p dir="rtl" className="font-arabic text-xl text-[var(--ink)]">
                  {a.arab}
                </p>
              </div>
              <p className="font-medium text-[var(--heading)] text-sm">{a.latin}</p>
              <p className="text-xs text-[var(--ink-soft)]">{a.arti}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
