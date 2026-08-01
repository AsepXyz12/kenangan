import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = { title: "Thaharah — Panduan Bersuci — Mushaf" };

type Langkah = {
  nomor: number;
  judul: string;
  penjelasan: string;
};

const RUKUN_WUDHU: Langkah[] = [
  { nomor: 1, judul: "Niat", penjelasan: "Niat dalam hati untuk berwudhu ketika membasuh wajah. Niat tidak wajib dilafalkan, cukup di dalam hati, namun boleh dilafalkan untuk membantu menghadirkan niat." },
  { nomor: 2, judul: "Membasuh Wajah", penjelasan: "Membasuh seluruh wajah, dari batas tumbuhnya rambut kepala bagian atas hingga bawah dagu, dan dari telinga kanan hingga telinga kiri." },
  { nomor: 3, judul: "Membasuh Kedua Tangan hingga Siku", penjelasan: "Membasuh tangan kanan lalu tangan kiri, mulai dari ujung jari hingga melewati siku, dilakukan secara merata." },
  { nomor: 4, judul: "Mengusap Sebagian Kepala", penjelasan: "Mengusap kepala dengan tangan yang basah, minimal sebagian kepala. Mazhab Syafi'i membolehkan mengusap sebagian kecil rambut/kepala, sementara mazhab lain ada yang mensyaratkan seluruh kepala." },
  { nomor: 5, judul: "Membasuh Kedua Kaki hingga Mata Kaki", penjelasan: "Membasuh kaki kanan lalu kiri, dari ujung jari hingga melewati kedua mata kaki." },
  { nomor: 6, judul: "Tertib (Berurutan)", penjelasan: "Mengerjakan rukun-rukun di atas sesuai urutan, tidak boleh dibolak-balik, menurut mazhab Syafi'i." },
];

const SUNNAH_WUDHU: string[] = [
  "Membaca basmalah sebelum memulai wudhu",
  "Bersiwak atau menggosok gigi",
  "Membasuh kedua telapak tangan tiga kali sebelum memasukkannya ke dalam bejana air",
  "Berkumur-kumur (madhmadhah)",
  "Memasukkan air ke hidung dan mengeluarkannya lagi (istinsyaq dan istintsar)",
  "Membasuh anggota wudhu sebanyak tiga kali",
  "Mendahulukan anggota kanan sebelum kiri",
  "Mengusap seluruh kepala, bukan hanya sebagian",
  "Mengusap kedua telinga bagian luar dan dalam",
  "Menyela-nyela jari tangan dan kaki",
  "Membasuh secara berturut-turut tanpa jeda lama (muwalah)",
  "Berdoa setelah wudhu selesai",
];

const PEMBATAL_WUDHU: string[] = [
  "Keluarnya sesuatu dari qubul atau dubur, seperti air kencing, tinja, madzi, atau kentut",
  "Hilang akal karena tidur nyenyak, pingsan, mabuk, atau gila",
  "Bersentuhan kulit laki-laki dan perempuan dewasa yang bukan mahram tanpa penghalang (menurut mazhab Syafi'i)",
  "Menyentuh kemaluan dengan telapak tangan tanpa penghalang",
];

const NIAT_WUDHU = {
  arab: "نَوَيْتُ الْوُضُوءَ لِرَفْعِ الْحَدَثِ الْأَصْغَرِ فَرْضًا لِلَّهِ تَعَالَى",
  latin: "Nawaitul wudhuu-a liraf'il hadatsil ashghari fardhal lillaahi ta'aalaa",
  arti: "Aku niat berwudhu untuk menghilangkan hadas kecil, fardu karena Allah Ta'ala.",
};

const DOA_SETELAH_WUDHU = {
  arab: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
  latin:
    "Asyhadu an laa ilaaha illallaahu wahdahu laa syariika lahu, wa asyhadu anna Muhammadan 'abduhu wa rasuuluh. Allaahummaj'alnii minat tawwaabiina waj'alnii minal mutathahhiriin",
  arti:
    "Aku bersaksi bahwa tiada Tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya, dan aku bersaksi bahwa Muhammad adalah hamba dan utusan-Nya. Ya Allah, jadikanlah aku termasuk orang-orang yang bertobat dan termasuk orang-orang yang menyucikan diri.",
};

const HADAS_BESAR: { judul: string; penyebab: string }[] = [
  { judul: "Junub", penyebab: "Keluar air mani baik karena mimpi basah, hubungan suami istri, maupun sebab lain, serta bertemunya dua kemaluan (jima') meski tanpa keluar mani." },
  { judul: "Haid", penyebab: "Darah yang keluar dari rahim perempuan pada waktu tertentu setiap bulan secara alami, bukan karena sakit atau melahirkan." },
  { judul: "Nifas", penyebab: "Darah yang keluar dari rahim perempuan setelah melahirkan." },
  { judul: "Wiladah", penyebab: "Proses melahirkan itu sendiri, meski tanpa keluar darah." },
];

const RUKUN_MANDI_WAJIB: Langkah[] = [
  { nomor: 1, judul: "Niat", penjelasan: "Niat dalam hati untuk menghilangkan hadas besar bersamaan dengan mulai membasuh tubuh." },
  { nomor: 2, judul: "Meratakan Air ke Seluruh Tubuh", penjelasan: "Membasuh seluruh permukaan kulit dan rambut luar-dalam hingga air merata, termasuk sela-sela yang tersembunyi seperti pusar, sela jari, dan lipatan kulit." },
];

const TATA_CARA_MANDI_WAJIB: string[] = [
  "Membaca basmalah dan berniat menghilangkan hadas besar",
  "Mencuci kedua tangan terlebih dahulu",
  "Membersihkan kemaluan dan area yang terkena najis",
  "Berwudhu secara sempurna seperti wudhu untuk sholat",
  "Menyiram kepala tiga kali sambil menyela-nyela pangkal rambut hingga air merata ke kulit kepala",
  "Menyiram seluruh tubuh dimulai dari sisi kanan lalu sisi kiri, hingga merata ke seluruh permukaan kulit",
];

const NIAT_MANDI_JUNUB = {
  arab: "نَوَيْتُ الْغُسْلَ لِرَفْعِ الْحَدَثِ الْأَكْبَرِ فَرْضًا لِلَّهِ تَعَالَى",
  latin: "Nawaitul ghusla liraf'il hadatsil akbari fardhal lillaahi ta'aalaa",
  arti: "Aku niat mandi untuk menghilangkan hadas besar, fardu karena Allah Ta'ala.",
};

const SEBAB_TAYAMUM: string[] = [
  "Tidak ditemukan air sama sekali, atau air yang ada tidak mencukupi",
  "Sakit yang jika terkena air dapat memperparah kondisi atau menghambat kesembuhan, berdasarkan keterangan medis atau perkiraan yang kuat",
  "Air yang tersedia hanya cukup untuk kebutuhan minum mendesak (diri sendiri atau orang/hewan lain)",
  "Kesulitan mengakses air karena jauh, berbahaya, atau sebab lain yang menyulitkan menurut syariat",
];

const TATA_CARA_TAYAMUM: string[] = [
  "Niat dalam hati untuk diperbolehkan melaksanakan sholat (istibahatush shalah)",
  "Menepukkan kedua telapak tangan ke permukaan tanah/debu suci sekali tepukan",
  "Mengusapkan kedua telapak tangan tersebut ke seluruh wajah",
  "Menepukkan kembali kedua telapak tangan ke tanah/debu untuk tepukan kedua",
  "Mengusapkan kedua telapak tangan ke kedua lengan hingga siku, tangan kanan dahulu lalu kiri",
];

const NIAT_TAYAMUM = {
  arab: "نَوَيْتُ التَّيَمُّمَ لِاسْتِبَاحَةِ الصَّلَاةِ فَرْضًا لِلَّهِ تَعَالَى",
  latin: "Nawaitut tayammuma listibaahatish shalaati fardhal lillaahi ta'aalaa",
  arti: "Aku niat bertayamum agar diperbolehkan melaksanakan sholat, fardu karena Allah Ta'ala.",
};

const AIR_SUCI: { kategori: string; penjelasan: string }[] = [
  { kategori: "Air Suci dan Menyucikan (Thahur)", penjelasan: "Air yang masih murni dan boleh digunakan untuk bersuci, seperti air hujan, air sumur, air sungai, air laut, dan air salju/es yang mencair." },
  { kategori: "Air Suci tapi Tidak Menyucikan", penjelasan: "Air yang telah berubah salah satu sifatnya (warna, rasa, atau bau) karena bercampur benda suci lain, seperti air kelapa, air teh, atau air yang telah digunakan bersuci sebelumnya (musta'mal) menurut sebagian ulama." },
  { kategori: "Air Mutanajis (Terkena Najis)", penjelasan: "Air yang kurang dari dua qullah (sekitar 216 liter) yang kejatuhan najis meski tidak berubah sifatnya, atau air dalam jumlah berapa pun yang berubah warna, rasa, atau baunya karena najis." },
];

function Kartu({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--parchment-line)] bg-[var(--parchment)] p-5 md:p-6">
      {children}
    </div>
  );
}

function BacaanBlok({ arab, latin, arti }: { arab: string; latin: string; arti: string }) {
  return (
    <div className="mt-3 rounded-xl bg-[var(--parchment-deep)]/60 p-4 md:p-5 space-y-2">
      <p dir="rtl" className="font-arabic text-xl md:text-2xl leading-loose text-[var(--ink)]">
        {arab}
      </p>
      <p className="text-sm italic text-[var(--ink-soft)]">{latin}</p>
      <p className="text-sm text-[var(--ink-soft)]">&ldquo;{arti}&rdquo;</p>
    </div>
  );
}

export default function ThaharahPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--parchment)]">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-14 w-full">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs tracking-widest uppercase text-[var(--ink-soft)]">Fiqih Ibadah</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl text-[var(--heading)] mb-3">
          Thaharah — Panduan Bersuci
        </h1>
        <p className="text-[var(--ink-soft)] mb-10 leading-relaxed">
          Thaharah (bersuci) adalah syarat sah sholat. Ada dua jenis hadas yang harus disucikan:
          hadas kecil disucikan dengan wudhu atau tayamum, dan hadas besar disucikan dengan mandi
          wajib atau tayamum. Panduan mengikuti pendapat mazhab Syafi'i yang umum diikuti di
          Indonesia; sebagian rincian dapat berbeda menurut mazhab lain.
        </p>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--heading)] mb-4">Macam-Macam Air</h2>
          <div className="space-y-3">
            {AIR_SUCI.map((a) => (
              <Kartu key={a.kategori}>
                <h3 className="font-medium text-[var(--ink)] mb-1">{a.kategori}</h3>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{a.penjelasan}</p>
              </Kartu>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--heading)] mb-2">Wudhu</h2>
          <p className="text-sm text-[var(--ink-soft)] mb-4">
            Bersuci dari hadas kecil, wajib sebelum sholat jika belum dalam keadaan berwudhu.
          </p>

          <h3 className="font-medium text-[var(--ink)] mb-2">Niat Wudhu</h3>
          <BacaanBlok {...NIAT_WUDHU} />

          <h3 className="font-medium text-[var(--ink)] mt-6 mb-3">Rukun Wudhu (Wajib Dikerjakan)</h3>
          <div className="space-y-3">
            {RUKUN_WUDHU.map((r) => (
              <Kartu key={r.nomor}>
                <div className="flex items-baseline gap-3">
                  <span className="text-[var(--heading)] font-display text-lg">{r.nomor}.</span>
                  <div>
                    <h4 className="font-medium text-[var(--ink)]">{r.judul}</h4>
                    <p className="text-sm text-[var(--ink-soft)] leading-relaxed mt-1">{r.penjelasan}</p>
                  </div>
                </div>
              </Kartu>
            ))}
          </div>

          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Doa Setelah Wudhu</h3>
          <BacaanBlok {...DOA_SETELAH_WUDHU} />

          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Sunnah-Sunnah Wudhu</h3>
          <Kartu>
            <ul className="space-y-2">
              {SUNNAH_WUDHU.map((s) => (
                <li key={s} className="text-sm text-[var(--ink-soft)] flex gap-2">
                  <span className="text-[var(--heading)]">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Kartu>

          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Hal-Hal yang Membatalkan Wudhu</h3>
          <Kartu>
            <ul className="space-y-2">
              {PEMBATAL_WUDHU.map((s) => (
                <li key={s} className="text-sm text-[var(--ink-soft)] flex gap-2">
                  <span className="text-[var(--heading)]">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Kartu>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--heading)] mb-2">Mandi Wajib (Ghusl)</h2>
          <p className="text-sm text-[var(--ink-soft)] mb-4">
            Bersuci dari hadas besar. Wajib dilakukan sebelum sholat bila mengalami salah satu sebab berikut.
          </p>

          <h3 className="font-medium text-[var(--ink)] mb-3">Penyebab Wajib Mandi</h3>
          <div className="space-y-3 mb-6">
            {HADAS_BESAR.map((h) => (
              <Kartu key={h.judul}>
                <h4 className="font-medium text-[var(--ink)] mb-1">{h.judul}</h4>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{h.penyebab}</p>
              </Kartu>
            ))}
          </div>

          <h3 className="font-medium text-[var(--ink)] mb-2">Niat Mandi Wajib</h3>
          <BacaanBlok {...NIAT_MANDI_JUNUB} />

          <h3 className="font-medium text-[var(--ink)] mt-6 mb-3">Rukun Mandi Wajib</h3>
          <div className="space-y-3">
            {RUKUN_MANDI_WAJIB.map((r) => (
              <Kartu key={r.nomor}>
                <div className="flex items-baseline gap-3">
                  <span className="text-[var(--heading)] font-display text-lg">{r.nomor}.</span>
                  <div>
                    <h4 className="font-medium text-[var(--ink)]">{r.judul}</h4>
                    <p className="text-sm text-[var(--ink-soft)] leading-relaxed mt-1">{r.penjelasan}</p>
                  </div>
                </div>
              </Kartu>
            ))}
          </div>

          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Tata Cara Mandi Wajib (Sesuai Sunnah)</h3>
          <Kartu>
            <ol className="space-y-2">
              {TATA_CARA_MANDI_WAJIB.map((s, i) => (
                <li key={s} className="text-sm text-[var(--ink-soft)] flex gap-2">
                  <span className="text-[var(--heading)] shrink-0">{i + 1}.</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </Kartu>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--heading)] mb-2">Tayamum</h2>
          <p className="text-sm text-[var(--ink-soft)] mb-4">
            Pengganti wudhu atau mandi wajib menggunakan debu suci, dilakukan pada kondisi tertentu
            saat air tidak dapat digunakan.
          </p>

          <h3 className="font-medium text-[var(--ink)] mb-3">Sebab-Sebab Diperbolehkan Tayamum</h3>
          <Kartu>
            <ul className="space-y-2">
              {SEBAB_TAYAMUM.map((s) => (
                <li key={s} className="text-sm text-[var(--ink-soft)] flex gap-2">
                  <span className="text-[var(--heading)]">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Kartu>

          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Niat Tayamum</h3>
          <BacaanBlok {...NIAT_TAYAMUM} />

          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Tata Cara Tayamum</h3>
          <Kartu>
            <ol className="space-y-2">
              {TATA_CARA_TAYAMUM.map((s, i) => (
                <li key={s} className="text-sm text-[var(--ink-soft)] flex gap-2">
                  <span className="text-[var(--heading)] shrink-0">{i + 1}.</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </Kartu>
          <p className="text-xs text-[var(--ink-soft)] mt-3 italic">
            Catatan: satu kali tayamum berlaku untuk satu kali sholat fardu; jika masuk waktu sholat
            berikutnya dan sebab tayamum masih berlaku, tayamum diulang. Ini mengikuti pendapat mazhab Syafi'i.
          </p>
        </section>

        <p className="text-xs text-[var(--ink-soft)] border-t border-[var(--parchment-line)] pt-6">
          Rincian hukum di halaman ini disusun mengikuti pendapat mazhab Syafi'i yang umum dirujuk di
          Indonesia. Untuk kondisi khusus (sakit, safar, kondisi darurat), disarankan berkonsultasi
          dengan ustaz/ustazah atau ulama setempat.
        </p>
      </main>
      <Footer />
    </div>
  );
}
