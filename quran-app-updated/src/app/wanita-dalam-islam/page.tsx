import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Roundel from "@/components/Roundel";

export const metadata = { title: "Wanita dalam Islam — Mushaf" };

const KEDUDUKAN = [
  {
    judul: "Kesetaraan Nilai di Sisi Allah",
    isi: "Laki-laki dan perempuan dinilai setara dalam hal keimanan, amal saleh, dan balasan pahala di sisi Allah — tidak ada keutamaan berdasarkan jenis kelamin, melainkan berdasarkan ketakwaan.",
    dalilArab: "مَنْ عَمِلَ صَالِحًا مِنْ ذَكَرٍ أَوْ أُنْثَىٰ وَهُوَ مُؤْمِنٌ فَلَنُحْيِيَنَّهُ حَيَاةً طَيِّبَةً",
    dalilArti:
      "\"Barang siapa mengerjakan kebajikan, baik laki-laki maupun perempuan, dalam keadaan beriman, maka akan Kami berikan kehidupan yang baik.\" (QS. An-Nahl: 97)",
  },
  {
    judul: "Sebelum Islam Datang",
    isi: "Pada masa Jahiliyah, sebagian bangsa Arab menganggap kelahiran anak perempuan sebagai aib, bahkan mengubur bayi perempuan hidup-hidup. Al-Qur'an secara tegas mengecam praktik ini, dan Islam datang mengangkat derajat perempuan sebagai manusia yang mulia dan setara di hadapan Allah.",
    dalilArab: "وَإِذَا الْمَوْءُودَةُ سُئِلَتْ بِأَيِّ ذَنْبٍ قُتِلَتْ",
    dalilArti:
      "\"Dan apabila bayi perempuan yang dikubur hidup-hidup itu ditanya, karena dosa apa ia dibunuh.\" (QS. At-Takwir: 8–9)",
  },
];

const HAK = [
  "Hak menerima warisan sesuai bagian yang ditetapkan syariat, di masa ketika perempuan Arab pra-Islam umumnya sama sekali tidak mendapat warisan.",
  "Hak memiliki dan mengelola harta sendiri secara mandiri, termasuk hasil usaha dan mahar pernikahan yang sepenuhnya menjadi miliknya.",
  "Hak menerima mahar dari calon suami sebagai bentuk penghormatan, bukan sebagai 'harga' yang diperjualbelikan.",
  "Hak menuntut ilmu, sebagaimana kewajiban menuntut ilmu berlaku sama bagi laki-laki dan perempuan.",
  "Hak memilih dan menyetujui pasangan hidup, tidak boleh dinikahkan secara paksa tanpa persetujuannya.",
  "Hak mendapat nafkah lahir dan batin dari suami setelah menikah, termasuk perlakuan yang baik dan lembut.",
  "Hak menceraikan diri (khulu') jika terdapat alasan yang dibenarkan syariat dan pernikahan sudah tidak dapat dipertahankan.",
  "Hak bersuara dan berpendapat, termasuk dalam urusan sosial dan bermasyarakat, sebagaimana dicontohkan banyak sahabiyah pada masa Nabi ﷺ.",
];

const TOKOH = [
  {
    nama: "Khadijah binti Khuwailid",
    ket:
      "Istri pertama Nabi ﷺ dan wanita pertama yang memeluk Islam. Seorang saudagar sukses dan mandiri yang menjadi penopang utama dakwah Nabi ﷺ di masa-masa tersulit, baik secara moral maupun material. Nabi ﷺ menyebutnya sebagai salah satu wanita paling mulia sepanjang masa.",
  },
  {
    nama: "Aisyah binti Abu Bakar",
    ket:
      "Istri Nabi ﷺ yang dikenal sangat cerdas dan menjadi salah satu periwayat hadits terbanyak dalam sejarah Islam. Banyak sahabat, termasuk para sahabat senior, merujuk kepadanya untuk memahami berbagai persoalan agama, khususnya yang berkaitan dengan kehidupan rumah tangga Nabi ﷺ.",
  },
  {
    nama: "Fatimah az-Zahra",
    ket:
      "Putri bungsu Nabi ﷺ dari pernikahan dengan Khadijah, dikenal sangat dekat dengan ayahnya dan diberi gelar Az-Zahra (yang bercahaya) karena keteguhan dan kesalehannya. Ia menikah dengan Ali bin Abi Thalib dan menurunkan garis keturunan Nabi ﷺ melalui putra-putranya, Hasan dan Husain.",
  },
  {
    nama: "Asiyah binti Muzahim",
    ket:
      "Istri Fir'aun yang tetap beriman kepada Allah secara diam-diam meski tinggal di istana penguasa paling zalim pada masanya. Al-Qur'an mengabadikan doanya memohon rumah di surga, dan Nabi ﷺ menyebutnya sebagai salah satu wanita paling sempurna imannya.",
  },
  {
    nama: "Maryam binti Imran",
    ket:
      "Ibu dari Nabi Isa 'alaihissalam, wanita yang dipilih Allah untuk melahirkan seorang nabi secara mukjizat tanpa suami. Al-Qur'an memuji kesuciannya dan bahkan satu surat penuh (Surat Maryam) dinamai untuk mengenangnya.",
  },
  {
    nama: "Sumayyah binti Khayyat",
    ket:
      "Dikenal sebagai syahidah pertama dalam sejarah Islam, wafat karena disiksa kaum Quraisy akibat keteguhannya mempertahankan keimanan pada masa-masa awal dakwah Nabi ﷺ di Makkah.",
  },
];

export default function WanitaDalamIslamPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
            Kemuliaan &amp; Hak
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-4">
            Wanita dalam Islam
          </h1>
          <p className="text-[var(--ink-soft)] leading-relaxed">
            Islam datang mengangkat derajat perempuan di tengah masyarakat
            Arab Jahiliyah yang kerap memandang rendah kelahiran anak
            perempuan, dan menetapkan berbagai hak yang pada masanya
            terbilang revolusioner.
          </p>
        </div>

        <div className="space-y-5 mb-12">
          {KEDUDUKAN.map((k) => (
            <div
              key={k.judul}
              className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-6 md:p-7"
            >
              <h2 className="font-display text-lg text-[var(--ink)] mb-3">{k.judul}</h2>
              <p className="ayat-arabic text-lg text-[var(--ink)] mb-2" dir="rtl">
                {k.dalilArab}
              </p>
              <p className="text-xs text-[var(--ink-soft)] italic mb-3">{k.dalilArti}</p>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{k.isi}</p>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="font-display text-xl text-[var(--ink)] mb-4">
            Hak-hak Wanita dalam Islam
          </h2>
          <div className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-6 md:p-7">
            <ul className="space-y-2.5 text-sm text-[var(--ink-soft)]">
              {HAK.map((h, i) => (
                <li key={i} className="leading-relaxed">
                  • {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl text-[var(--ink)] mb-4">
            Tokoh Muslimah Teladan
          </h2>
          <div className="space-y-4">
            {TOKOH.map((t, i) => (
              <div
                key={t.nama}
                className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-5 md:p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Roundel number={i + 1} variant="gold" size={34} />
                  <p className="font-display text-base text-[var(--ink)]">{t.nama}</p>
                </div>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{t.ket}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
