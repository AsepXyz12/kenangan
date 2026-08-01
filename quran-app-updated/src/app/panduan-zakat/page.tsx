import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Panduan Zakat — Mushaf" };

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

const NIAT_ZAKAT_FITRAH_DIRI = {
  arab: "نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنْ نَفْسِي فَرْضًا لِلَّهِ تَعَالَى",
  latin: "Nawaitu an ukhrija zakaatal fitri 'an nafsii fardhal lillaahi ta'aalaa",
  arti: "Aku niat mengeluarkan zakat fitrah untuk diriku sendiri, fardu karena Allah Ta'ala.",
};

const NIAT_ZAKAT_FITRAH_KELUARGA = {
  arab: "نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنِّي وَعَنْ جَمِيعِ مَنْ تَلْزَمُنِي نَفَقَتُهُمْ فَرْضًا لِلَّهِ تَعَالَى",
  latin: "Nawaitu an ukhrija zakaatal fitri 'annii wa 'an jamii'i man talzamunii nafaqatuhum fardhal lillaahi ta'aalaa",
  arti: "Aku niat mengeluarkan zakat fitrah untukku dan untuk semua orang yang menjadi tanggunganku, fardu karena Allah Ta'ala.",
};

const KETENTUAN_ZAKAT_FITRAH = [
  "Wajib bagi setiap muslim, baik laki-laki, perempuan, anak-anak, maupun dewasa, yang memiliki kelebihan makanan pokok pada malam dan hari raya Idulfitri",
  "Besarnya 1 sha' (sekitar 2,5 kg hingga 3 liter) makanan pokok yang berlaku di daerah setempat, seperti beras",
  "Boleh juga ditunaikan dalam bentuk uang senilai makanan pokok tersebut, menurut sebagian ulama kontemporer, meskipun mazhab Syafi'i berpendapat harus dalam bentuk makanan",
  "Waktu wajib dimulai sejak terbenam matahari akhir Ramadhan, dan waktu paling utama dibayarkan adalah pada pagi hari sebelum sholat Id",
  "Batas akhir yang diperbolehkan adalah sebelum sholat Id; jika ditunda hingga setelah sholat Id tanpa uzur, statusnya menjadi sedekah biasa bukan zakat fitrah",
];

const NISAB_ZAKAT_MAL: { jenis: string; ketentuan: string }[] = [
  {
    jenis: "Emas",
    ketentuan: "Nisab 85 gram emas murni, dikeluarkan 2,5% dari total emas yang telah dimiliki selama satu tahun (haul) jika mencapai atau melebihi nisab.",
  },
  {
    jenis: "Perak",
    ketentuan: "Nisab 595 gram perak, dikeluarkan 2,5% dari total perak yang dimiliki selama satu tahun.",
  },
  {
    jenis: "Uang & Tabungan",
    ketentuan: "Nisab disetarakan dengan nilai 85 gram emas saat ini, dikeluarkan 2,5% dari total simpanan yang mengendap selama satu tahun penuh (haul) di atas nisab.",
  },
  {
    jenis: "Perniagaan (Zakat Tijarah)",
    ketentuan: "Nisab setara 85 gram emas, dihitung dari modal dagang dan keuntungan pada akhir haul, dikeluarkan 2,5%.",
  },
  {
    jenis: "Pertanian",
    ketentuan: "Nisab 5 wasq (sekitar 653 kg gabah/hasil panen), dikeluarkan 10% jika diairi tanpa biaya (hujan/sungai alami) atau 5% jika menggunakan biaya irigasi, dikeluarkan setiap kali panen tanpa syarat haul.",
  },
  {
    jenis: "Peternakan",
    ketentuan: "Berlaku untuk unta, sapi/kerbau, dan kambing/domba dengan nisab dan kadar tersendiri menurut jumlah ekor, dikeluarkan setiap tahun (haul) bagi hewan yang digembalakan (bukan untuk kerja/produksi susu komersial semata).",
  },
  {
    jenis: "Zakat Penghasilan/Profesi",
    ketentuan: "Ini adalah bentuk zakat kontemporer yang dianalogikan dari zakat pertanian atau zakat mal, dikeluarkan 2,5% dari penghasilan yang telah mencapai nisab setara 85 gram emas per tahun (atau dihitung per bulan). Ini merupakan masalah khilafiyah (perbedaan pendapat ulama) mengenai dasar hukum dan cara hitungnya, sehingga disarankan berkonsultasi dengan lembaga zakat resmi atau ulama setempat.",
  },
];

const DELAPAN_ASNAF: { nama: string; keterangan: string }[] = [
  { nama: "Fakir", keterangan: "Orang yang tidak memiliki harta atau penghasilan yang mencukupi kebutuhan pokoknya sama sekali." },
  { nama: "Miskin", keterangan: "Orang yang memiliki harta atau penghasilan namun tidak mencukupi kebutuhan pokoknya secara layak." },
  { nama: "Amil Zakat", keterangan: "Orang atau lembaga yang bertugas mengelola, mengumpulkan, dan menyalurkan zakat." },
  { nama: "Muallaf", keterangan: "Orang yang baru masuk Islam atau yang hatinya perlu dikuatkan/dilunakkan keimanannya kepada Islam." },
  { nama: "Riqab (Memerdekakan Budak)", keterangan: "Digunakan untuk membebaskan budak/hamba sahaya; dalam konteks modern beberapa ulama memperluas maknanya untuk membebaskan orang dari perbudakan modern." },
  { nama: "Gharim (Orang Berutang)", keterangan: "Orang yang memiliki utang untuk kebutuhan yang dibenarkan syariat dan tidak mampu melunasinya." },
  { nama: "Fisabilillah", keterangan: "Orang atau kegiatan yang berjuang di jalan Allah, seperti dakwah, jihad, dan kepentingan umum yang menegakkan syiar Islam." },
  { nama: "Ibnu Sabil", keterangan: "Musafir yang kehabisan bekal dalam perjalanan yang dibenarkan syariat, meskipun ia mampu di kampung halamannya." },
];

export default function PanduanZakatPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--parchment)]">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-14 w-full">
        <span className="text-xs tracking-widest uppercase text-[var(--ink-soft)]">Fiqih Ibadah</span>
        <h1 className="font-display text-3xl md:text-4xl text-[var(--heading)] mt-1 mb-3">
          Panduan Zakat
        </h1>
        <p className="text-[var(--ink-soft)] mb-10 leading-relaxed">
          Zakat adalah rukun Islam ketiga, berupa kewajiban mengeluarkan sebagian harta tertentu
          kepada golongan yang berhak menerimanya. Ada dua jenis utama: zakat fitrah dan zakat mal.
        </p>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--heading)] mb-3">Zakat Fitrah</h2>
          <Kartu>
            <ul className="space-y-2">
              {KETENTUAN_ZAKAT_FITRAH.map((k) => (
                <li key={k} className="text-sm text-[var(--ink-soft)] flex gap-2">
                  <span className="text-[var(--heading)]">•</span>
                  <span>{k}</span>
                </li>
              ))}
            </ul>
          </Kartu>
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Niat Zakat Fitrah untuk Diri Sendiri</h3>
          <BacaanBlok {...NIAT_ZAKAT_FITRAH_DIRI} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">
            Niat Zakat Fitrah untuk Diri Sendiri & Tanggungan
          </h3>
          <BacaanBlok {...NIAT_ZAKAT_FITRAH_KELUARGA} />
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--heading)] mb-3">
            Zakat Mal — Nisab & Kadar per Jenis Harta
          </h2>
          <div className="space-y-3">
            {NISAB_ZAKAT_MAL.map((n) => (
              <Kartu key={n.jenis}>
                <h3 className="font-medium text-[var(--ink)] mb-1">{n.jenis}</h3>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{n.ketentuan}</p>
              </Kartu>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--heading)] mb-3">
            8 Golongan Penerima Zakat (Asnaf)
          </h2>
          <p className="text-sm text-[var(--ink-soft)] mb-4">
            Berdasarkan QS. At-Taubah: 60, zakat hanya boleh disalurkan kepada delapan golongan berikut.
          </p>
          <div className="space-y-3">
            {DELAPAN_ASNAF.map((a, i) => (
              <Kartu key={a.nama}>
                <div className="flex items-baseline gap-3">
                  <span className="text-[var(--heading)] font-display text-lg">{i + 1}.</span>
                  <div>
                    <h4 className="font-medium text-[var(--ink)]">{a.nama}</h4>
                    <p className="text-sm text-[var(--ink-soft)] leading-relaxed mt-1">{a.keterangan}</p>
                  </div>
                </div>
              </Kartu>
            ))}
          </div>
        </section>

        <p className="text-xs text-[var(--ink-soft)] border-t border-[var(--parchment-line)] pt-6">
          Nilai nisab dalam bentuk rupiah berubah mengikuti harga emas terkini sehingga tidak
          dicantumkan sebagai angka tetap di sini. Untuk perhitungan zakat yang tepat, khususnya
          zakat penghasilan/profesi yang masih menjadi wilayah khilafiyah, disarankan berkonsultasi
          dengan lembaga amil zakat resmi atau ulama setempat.
        </p>
      </main>
      <Footer />
    </div>
  );
}
