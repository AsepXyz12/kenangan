import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Panduan Haji & Umrah — Mushaf" };

function Kartu({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--parchment-line)] bg-[var(--parchment)] p-5 md:p-6">
      {children}
    </div>
  );
}

function DaftarKartu({ items }: { items: string[] }) {
  return (
    <Kartu>
      <ul className="space-y-2">
        {items.map((s) => (
          <li key={s} className="text-sm text-[var(--ink-soft)] flex gap-2">
            <span className="text-[var(--teal-deep)]">•</span>
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </Kartu>
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

const SYARAT_WAJIB_HAJI = [
  "Beragama Islam",
  "Baligh",
  "Berakal sehat",
  "Merdeka (bukan budak, konteks historis)",
  "Mampu (istitha'ah): sehat fisik, memiliki bekal perjalanan dan biaya hidup keluarga yang ditinggalkan, serta aman dalam perjalanan",
];

const RUKUN_HAJI = [
  "Ihram disertai niat haji",
  "Wukuf di Arafah, pada tanggal 9 Dzulhijjah",
  "Thawaf Ifadhah, mengelilingi Ka'bah tujuh kali",
  "Sa'i, berjalan antara bukit Shafa dan Marwah tujuh kali",
  "Tahallul, mencukur atau memendekkan rambut",
  "Tertib, dilakukan sesuai urutan",
];

const WAJIB_HAJI = [
  "Ihram dari miqat yang telah ditentukan",
  "Mabit (bermalam) di Muzdalifah setelah wukuf",
  "Melontar jumrah Aqabah pada 10 Dzulhijjah",
  "Mabit di Mina pada hari-hari tasyrik (11, 12, dan/atau 13 Dzulhijjah)",
  "Melontar tiga jumrah (Ula, Wustha, Aqabah) pada hari-hari tasyrik",
  "Tidak melakukan larangan-larangan ihram",
  "Thawaf Wada' (perpisahan) sebelum meninggalkan Makkah",
];

const RUKUN_UMRAH = [
  "Ihram disertai niat umrah",
  "Thawaf, mengelilingi Ka'bah tujuh kali",
  "Sa'i antara Shafa dan Marwah tujuh kali",
  "Tahallul, mencukur atau memendekkan rambut",
  "Tertib, dilakukan sesuai urutan",
];

const LARANGAN_IHRAM_UMUM = [
  "Memotong atau mencabut rambut dan kuku",
  "Memakai wangi-wangian pada badan atau pakaian ihram",
  "Berburu atau membunuh binatang buruan darat",
  "Menikah, melamar, atau menikahkan orang lain",
  "Bercumbu atau berhubungan suami istri",
  "Bertengkar, berkata kotor, atau berbuat maksiat",
];

const LARANGAN_IHRAM_LAKI = [
  "Memakai pakaian berjahit yang membentuk tubuh (harus memakai dua lembar kain ihram)",
  "Menutup kepala secara langsung menempel, seperti peci atau topi",
  "Memakai alas kaki yang menutupi mata kaki (dianjurkan sandal terbuka)",
];

const LARANGAN_IHRAM_PEREMPUAN = [
  "Menutup wajah dengan cadar/niqab (tetap wajib menutup aurat, namun wajah dan telapak tangan tidak boleh sengaja ditutup dengan kain yang menempel langsung)",
  "Memakai sarung tangan",
];

const MIQAT: { nama: string; keterangan: string }[] = [
  { nama: "Dzul Hulaifah (Bir Ali)", keterangan: "Miqat bagi jamaah yang datang dari arah Madinah." },
  { nama: "Juhfah / Rabigh", keterangan: "Miqat bagi jamaah yang datang dari arah Syam, Mesir, dan Maroko." },
  { nama: "Yalamlam", keterangan: "Miqat bagi jamaah yang datang dari arah Yaman dan Indonesia (jamaah gelombang tertentu via udara mengikuti ketentuan miqat yang disesuaikan otoritas setempat)." },
  { nama: "Qarnul Manazil (As-Sail)", keterangan: "Miqat bagi jamaah yang datang dari arah Najd." },
  { nama: "Dzatu 'Irq", keterangan: "Miqat bagi jamaah yang datang dari arah Irak." },
];

const NIAT_UMRAH = {
  arab: "لَبَّيْكَ اللَّهُمَّ عُمْرَةً",
  latin: "Labbaika Allaahumma 'umrah",
  arti: "Aku penuhi panggilan-Mu ya Allah, untuk berumrah.",
};

const NIAT_HAJI = {
  arab: "لَبَّيْكَ اللَّهُمَّ حَجًّا",
  latin: "Labbaika Allaahumma hajjaa",
  arti: "Aku penuhi panggilan-Mu ya Allah, untuk berhaji.",
};

const TALBIYAH = {
  arab: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ",
  latin: "Labbaika Allaahumma labbaik, labbaika laa syariika laka labbaik, innal hamda wan ni'mata laka wal mulk, laa syariika lak",
  arti: "Aku penuhi panggilan-Mu ya Allah, aku penuhi panggilan-Mu. Aku penuhi panggilan-Mu, tiada sekutu bagi-Mu, aku penuhi panggilan-Mu. Sesungguhnya segala puji, nikmat, dan kerajaan adalah milik-Mu, tiada sekutu bagi-Mu.",
};

const URUTAN_UMRAH = [
  "Mandi sunnah dan memakai pakaian ihram sebelum melewati miqat",
  "Berniat umrah di miqat sambil melafalkan talbiyah",
  "Memperbanyak membaca talbiyah dalam perjalanan menuju Makkah",
  "Thawaf mengelilingi Ka'bah tujuh kali dimulai dan diakhiri di Hajar Aswad, Ka'bah berada di sisi kiri tubuh",
  "Sholat sunnah dua rakaat di belakang Maqam Ibrahim (atau di area masjid bila padat)",
  "Minum air Zamzam",
  "Sa'i antara bukit Shafa dan Marwah sebanyak tujuh kali, dimulai dari Shafa",
  "Tahallul dengan mencukur habis (halq) atau memendekkan rambut (taqshir), bagi laki-laki disunnahkan mencukur habis",
];

const URUTAN_HAJI = [
  "Ihram dari miqat pada tanggal 8 Dzulhijjah (hari Tarwiyah) dengan niat haji",
  "Menuju Mina, bermalam (mabit) di sana",
  "Pada 9 Dzulhijjah menuju Arafah untuk wukuf, dimulai sejak tergelincir matahari hingga terbenam, momen puncak ibadah haji",
  "Setelah Maghrib menuju Muzdalifah untuk mabit dan mengambil kerikil untuk melontar jumrah",
  "Pada 10 Dzulhijjah (hari Nahr/Idul Adha) menuju Mina untuk melontar Jumrah Aqabah, lalu tahallul awal (mencukur/memendekkan rambut) yang membolehkan sebagian larangan ihram",
  "Melakukan Thawaf Ifadhah dan Sa'i (bila belum sa'i saat umrah dalam haji tamattu'), lalu tahallul tsani (sempurna)",
  "Kembali ke Mina untuk mabit pada hari-hari tasyrik (11, 12, dan 13 Dzulhijjah)",
  "Melontar tiga jumrah (Ula, Wustha, Aqabah) setiap hari selama di Mina",
  "Kembali ke Makkah untuk Thawaf Wada' sebelum meninggalkan kota Makkah",
];

const JENIS_HAJI: { nama: string; keterangan: string }[] = [
  { nama: "Tamattu'", keterangan: "Melaksanakan umrah terlebih dahulu di bulan-bulan haji, tahallul, lalu berihram kembali untuk haji pada waktunya. Jenis ini wajib membayar dam (denda berupa penyembelihan hewan)." },
  { nama: "Ifrad", keterangan: "Melaksanakan haji saja tanpa umrah dalam satu rangkaian ihram, atau melaksanakan haji lalu umrah setelahnya secara terpisah. Tidak wajib dam." },
  { nama: "Qiran", keterangan: "Melaksanakan haji dan umrah sekaligus dalam satu niat dan satu kali ihram. Wajib membayar dam." },
];

export default function PanduanHajiUmrahPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--parchment)]">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-14 w-full">
        <span className="text-xs tracking-widest uppercase text-[var(--ink-soft)]">Fiqih Ibadah</span>
        <h1 className="font-display text-3xl md:text-4xl text-[var(--teal-deep)] mt-1 mb-3">
          Panduan Haji & Umrah
        </h1>
        <p className="text-[var(--ink-soft)] mb-10 leading-relaxed">
          Haji adalah rukun Islam kelima, wajib sekali seumur hidup bagi yang mampu. Umrah adalah
          ibadah sunnah muakkad yang tata caranya mirip haji namun lebih ringkas. Panduan ini
          mengikuti pendapat mazhab Syafi'i.
        </p>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--teal-deep)] mb-3">Syarat Wajib Haji</h2>
          <DaftarKartu items={SYARAT_WAJIB_HAJI} />
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--teal-deep)] mb-3">Tiga Jenis Pelaksanaan Haji</h2>
          <div className="space-y-3">
            {JENIS_HAJI.map((j) => (
              <Kartu key={j.nama}>
                <h3 className="font-medium text-[var(--ink)] mb-1">{j.nama}</h3>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{j.keterangan}</p>
              </Kartu>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--teal-deep)] mb-3">Miqat (Batas Memulai Ihram)</h2>
          <div className="space-y-3">
            {MIQAT.map((m) => (
              <Kartu key={m.nama}>
                <h3 className="font-medium text-[var(--ink)] mb-1">{m.nama}</h3>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{m.keterangan}</p>
              </Kartu>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--teal-deep)] mb-3">Niat & Talbiyah</h2>
          <h3 className="font-medium text-[var(--ink)] mb-2">Niat Umrah</h3>
          <BacaanBlok {...NIAT_UMRAH} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Niat Haji</h3>
          <BacaanBlok {...NIAT_HAJI} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Bacaan Talbiyah</h3>
          <BacaanBlok {...TALBIYAH} />
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--teal-deep)] mb-3">Rukun Umrah</h2>
          <DaftarKartu items={RUKUN_UMRAH} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Urutan Pelaksanaan Umrah</h3>
          <Kartu>
            <ol className="space-y-2">
              {URUTAN_UMRAH.map((s, i) => (
                <li key={s} className="text-sm text-[var(--ink-soft)] flex gap-2">
                  <span className="text-[var(--teal-deep)] shrink-0">{i + 1}.</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </Kartu>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--teal-deep)] mb-3">Rukun Haji</h2>
          <DaftarKartu items={RUKUN_HAJI} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Wajib Haji</h3>
          <p className="text-sm text-[var(--ink-soft)] mb-3">
            Berbeda dari rukun, wajib haji jika ditinggalkan dapat diganti dengan membayar dam
            (denda), namun hajinya tetap sah.
          </p>
          <DaftarKartu items={WAJIB_HAJI} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Urutan Pelaksanaan Haji</h3>
          <Kartu>
            <ol className="space-y-2">
              {URUTAN_HAJI.map((s, i) => (
                <li key={s} className="text-sm text-[var(--ink-soft)] flex gap-2">
                  <span className="text-[var(--teal-deep)] shrink-0">{i + 1}.</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </Kartu>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--teal-deep)] mb-3">Larangan Selama Ihram</h2>
          <h3 className="font-medium text-[var(--ink)] mb-2">Larangan Umum (Laki-laki & Perempuan)</h3>
          <DaftarKartu items={LARANGAN_IHRAM_UMUM} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Khusus Laki-laki</h3>
          <DaftarKartu items={LARANGAN_IHRAM_LAKI} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Khusus Perempuan</h3>
          <DaftarKartu items={LARANGAN_IHRAM_PEREMPUAN} />
        </section>

        <p className="text-xs text-[var(--ink-soft)] border-t border-[var(--parchment-line)] pt-6">
          Rincian manasik dapat sedikit berbeda mengikuti kondisi lapangan dan kebijakan
          penyelenggara haji/umrah di Arab Saudi. Disarankan mengikuti bimbingan resmi dari
          pembimbing manasik dan Kementerian Agama/travel resmi saat pelaksanaan sesungguhnya.
        </p>
      </main>
      <Footer />
    </div>
  );
}
