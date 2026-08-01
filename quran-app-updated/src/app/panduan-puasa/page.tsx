import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

export const metadata = { title: "Panduan Puasa — Mushaf" };

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
            <span className="text-[var(--heading)]">•</span>
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </Kartu>
  );
}

function BacaanBlok({ arab, latin, arti, keterangan }: { arab: string; latin: string; arti: string; keterangan?: string }) {
  return (
    <div className="mt-3 rounded-xl bg-[var(--parchment-deep)]/60 p-4 md:p-5 space-y-2">
      <p dir="rtl" className="font-arabic text-xl md:text-2xl leading-loose text-[var(--ink)]">
        {arab}
      </p>
      <p className="text-sm italic text-[var(--ink-soft)]">{latin}</p>
      <p className="text-sm text-[var(--ink-soft)]">&ldquo;{arti}&rdquo;</p>
      {keterangan && <p className="text-xs text-[var(--ink-soft)]">{keterangan}</p>}
    </div>
  );
}

const SYARAT_WAJIB = [
  "Beragama Islam",
  "Baligh (telah mencapai usia dewasa secara syariat)",
  "Berakal sehat (tidak gila)",
  "Mampu secara fisik untuk berpuasa",
  "Mengetahui masuknya bulan Ramadhan",
];

const RUKUN_PUASA = [
  "Niat, dilakukan pada malam hari sebelum terbit fajar untuk puasa wajib seperti Ramadhan",
  "Menahan diri dari segala hal yang membatalkan puasa, mulai terbit fajar (masuk waktu Subuh) hingga terbenam matahari (Maghrib)",
];

const PEMBATAL_PUASA = [
  "Makan dan minum dengan sengaja",
  "Muntah dengan sengaja (memasukkan jari atau sejenisnya untuk memancing muntah)",
  "Berhubungan suami istri di siang hari saat berpuasa",
  "Keluar mani karena sengaja (misalnya onani/masturbasi)",
  "Haid atau nifas, meski datang beberapa saat sebelum Maghrib",
  "Gila yang datang di tengah hari",
  "Murtad (keluar dari Islam)",
  "Memasukkan sesuatu secara sengaja ke dalam lubang tubuh yang menembus ke rongga dalam (mulut, hidung, telinga, dan sejenisnya) dengan sengaja",
];

const TIDAK_BATAL = [
  "Makan atau minum karena lupa, dan segera berhenti begitu ingat sedang berpuasa",
  "Tidak sengaja tertelan air saat berkumur/istinsyaq wudhu",
  "Mimpi basah di siang hari",
  "Suntikan yang bukan untuk nutrisi (obat, vaksin), menurut pendapat yang lebih kuat",
  "Mencicipi makanan tanpa menelannya, selama tidak sampai tenggorokan",
];

const SUNNAH_PUASA = [
  "Makan sahur, walau hanya sedikit, mendekati waktu Subuh",
  "Menyegerakan berbuka ketika waktu Maghrib tiba",
  "Berbuka dengan yang manis atau kurma, lalu air putih",
  "Membaca doa berbuka puasa",
  "Memperbanyak sedekah dan membaca Al-Qur'an",
  "Menjaga lisan dari perkataan sia-sia, dusta, dan pertengkaran",
  "Memperbanyak doa, terutama menjelang berbuka",
];

const NIAT_RAMADHAN = {
  arab: "نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هَٰذِهِ السَّنَةِ لِلَّهِ تَعَالَى",
  latin: "Nawaitu shauma ghadin 'an adaa-i fardhi syahri ramadhaana haadzihis sanati lillaahi ta'aalaa",
  arti: "Aku niat berpuasa esok hari untuk menunaikan fardu bulan Ramadhan tahun ini karena Allah Ta'ala.",
  keterangan: "Niat puasa Ramadhan wajib dilakukan tiap malam sebelum fajar, menurut mazhab Syafi'i.",
};

const DOA_BUKA_PUASA = {
  arab: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
  latin: "Dzahabazh zhama-u wabtallatil 'uruuqu wa tsabatal ajru insyaa Allaah",
  arti: "Telah hilang dahaga, telah basah kerongkongan, dan telah tetap pahala insyaAllah.",
};

const PUASA_SUNNAH: { nama: string; keterangan: string }[] = [
  { nama: "Senin & Kamis", keterangan: "Puasa sunnah rutin setiap hari Senin dan Kamis, hari-hari amal diangkat kepada Allah." },
  { nama: "Ayyamul Bidh", keterangan: "Puasa tanggal 13, 14, 15 setiap bulan Hijriah (tanggal purnama)." },
  { nama: "Puasa Syawal", keterangan: "Puasa 6 hari di bulan Syawal setelah Idulfitri, pahalanya seperti puasa setahun penuh jika digabung dengan puasa Ramadhan." },
  { nama: "Puasa Arafah", keterangan: "Puasa tanggal 9 Dzulhijjah bagi yang tidak berhaji, menghapus dosa setahun sebelum dan sesudahnya." },
  { nama: "Puasa Tasu'a & Asyura", keterangan: "Puasa tanggal 9 dan 10 Muharram, menghapus dosa setahun sebelumnya." },
  { nama: "Puasa Dawud", keterangan: "Puasa selang-seling, sehari puasa sehari tidak, dikenal sebagai puasa paling utama menurut sunnah." },
];

const GOLONGAN_KHUSUS: { golongan: string; keterangan: string }[] = [
  { golongan: "Musafir (dalam perjalanan jauh)", keterangan: "Boleh tidak berpuasa dan mengqadha (mengganti) di hari lain sejumlah hari yang ditinggalkan." },
  { golongan: "Sakit yang menghalangi puasa", keterangan: "Boleh tidak berpuasa dan mengqadha di hari lain setelah sembuh." },
  { golongan: "Perempuan haid atau nifas", keterangan: "Wajib tidak berpuasa saat haid/nifas, dan wajib mengqadha di hari lain di luar Ramadhan." },
  { golongan: "Hamil atau menyusui yang khawatir pada diri/bayinya", keterangan: "Boleh tidak berpuasa, wajib mengqadha; sebagian ulama menambahkan kewajiban fidyah bila kekhawatiran hanya pada bayi." },
  { golongan: "Orang tua renta atau sakit menahun tanpa harapan sembuh", keterangan: "Tidak wajib puasa dan tidak wajib qadha, namun wajib membayar fidyah, yaitu memberi makan satu orang miskin untuk tiap hari yang ditinggalkan." },
];

export default function PanduanPuasaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--parchment)]">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-14 w-full">
        <BackButton href="/" label="Beranda" />
        <span className="text-xs tracking-widest uppercase text-[var(--ink-soft)]">Fiqih Ibadah</span>
        <h1 className="font-display text-3xl md:text-4xl text-[var(--heading)] mt-1 mb-3">
          Panduan Puasa
        </h1>
        <p className="text-[var(--ink-soft)] mb-10 leading-relaxed">
          Puasa (shaum) adalah menahan diri dari makan, minum, dan segala hal yang membatalkannya
          mulai terbit fajar hingga terbenam matahari, disertai niat. Panduan ini mengikuti pendapat
          mazhab Syafi'i.
        </p>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--heading)] mb-3">Syarat Wajib Puasa</h2>
          <DaftarKartu items={SYARAT_WAJIB} />
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--heading)] mb-3">Rukun Puasa</h2>
          <DaftarKartu items={RUKUN_PUASA} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Niat Puasa Ramadhan</h3>
          <BacaanBlok {...NIAT_RAMADHAN} />
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--heading)] mb-3">Sunnah-Sunnah Puasa</h2>
          <DaftarKartu items={SUNNAH_PUASA} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Doa Berbuka Puasa</h3>
          <BacaanBlok {...DOA_BUKA_PUASA} />
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--heading)] mb-3">Hal-Hal yang Membatalkan Puasa</h2>
          <DaftarKartu items={PEMBATAL_PUASA} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Yang Tidak Membatalkan Puasa</h3>
          <DaftarKartu items={TIDAK_BATAL} />
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--heading)] mb-3">
            Keringanan bagi Golongan Tertentu
          </h2>
          <div className="space-y-3">
            {GOLONGAN_KHUSUS.map((g) => (
              <Kartu key={g.golongan}>
                <h3 className="font-medium text-[var(--ink)] mb-1">{g.golongan}</h3>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{g.keterangan}</p>
              </Kartu>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--heading)] mb-3">Puasa-Puasa Sunnah</h2>
          <div className="space-y-3">
            {PUASA_SUNNAH.map((p) => (
              <Kartu key={p.nama}>
                <h3 className="font-medium text-[var(--ink)] mb-1">{p.nama}</h3>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{p.keterangan}</p>
              </Kartu>
            ))}
          </div>
        </section>

        <p className="text-xs text-[var(--ink-soft)] border-t border-[var(--parchment-line)] pt-6">
          Rincian di halaman ini mengikuti pendapat mazhab Syafi'i. Untuk kondisi khusus, seperti
          kehamilan, penyakit kronis, atau situasi darurat lainnya, disarankan berkonsultasi dengan
          ustaz/ustazah atau tenaga medis serta ulama setempat.
        </p>
      </main>
      <Footer />
    </div>
  );
}
