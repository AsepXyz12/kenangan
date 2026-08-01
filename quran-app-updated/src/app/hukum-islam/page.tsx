import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Hukum-Hukum dalam Islam — Mushaf" };

const HUKUM_TAKLIFI = [
  {
    nama: "Wajib (Fardhu)",
    arti: "Harus dikerjakan. Berpahala jika dikerjakan, berdosa jika ditinggalkan.",
    contoh: "Shalat 5 waktu, puasa Ramadhan, zakat, jujur, menutup aurat.",
  },
  {
    nama: "Sunnah (Mandub)",
    arti: "Dianjurkan. Berpahala jika dikerjakan, tidak berdosa jika ditinggalkan.",
    contoh: "Shalat rawatib, puasa Senin-Kamis, sedekah di luar zakat, bersiwak.",
  },
  {
    nama: "Mubah",
    arti: "Boleh dikerjakan atau ditinggalkan, tidak ada pahala maupun dosa selama tidak melanggar batas lain.",
    contoh: "Memilih warna baju, jenis makanan halal yang disukai, hobi yang tidak melalaikan.",
  },
  {
    nama: "Makruh",
    arti: "Dianjurkan untuk ditinggalkan. Tidak berdosa jika dikerjakan, namun berpahala jika ditinggalkan karena Allah.",
    contoh: "Makan/minum sambil berdiri, berlebihan dalam hal mubah, memotong kuku dengan gigi.",
  },
  {
    nama: "Haram",
    arti: "Harus ditinggalkan. Berdosa jika dikerjakan, berpahala jika ditinggalkan karena Allah.",
    contoh: "Zina, riba, mencuri, membunuh tanpa hak, mengonsumsi khamr/narkoba.",
  },
];

type Hukum = {
  judul: string;
  ringkasan: string;
  dalil?: string;
  poin: string[];
  catatan?: string;
};

const HUKUM_PERGAULAN: Hukum[] = [
  {
    judul: "Pacaran (hubungan tanpa ikatan pernikahan)",
    ringkasan:
      "Mayoritas ulama menilai pacaran — dalam bentuk berduaan (khalwat), bersentuhan, atau berkomunikasi intens penuh kata-kata cinta antara laki-laki dan perempuan yang bukan mahram tanpa ikatan pernikahan — hukumnya haram, karena membuka pintu menuju zina dan pelanggaran batas pandangan/sentuhan.",
    dalil:
      "QS. Al-Isra: 32 (larangan mendekati zina), dan hadits riwayat Ahmad tentang larangan berkhalwat (berduaan) laki-laki dan perempuan bukan mahram tanpa disertai mahram.",
    poin: [
      "Berduaan (khalwat) tanpa mahram — dilarang, karena 'yang ketiga adalah setan' (HR. Ahmad, Tirmidzi).",
      "Bersentuhan fisik (berpegangan tangan, berpelukan, dsb.) dengan bukan mahram — dilarang.",
      "Menahan pandangan (ghadhul bashar) — diperintahkan bagi laki-laki maupun perempuan (QS. An-Nur: 30-31).",
      "Komunikasi untuk keperluan yang jelas (misalnya sekadar mengenal calon pasangan lewat perantara keluarga/proses taaruf, atau kepentingan pekerjaan/pendidikan) dibedakan ulama dari pacaran yang berisi ungkapan kasih sayang romantis di luar nikah.",
    ],
    catatan:
      "Sebagai alternatif, Islam mengenal konsep taaruf (saling mengenal dengan tujuan serius menuju pernikahan, biasanya didampingi wali/keluarga) dan khitbah (peminangan resmi), yang menjaga batas syar'i sambil tetap memberi ruang untuk saling mengenal calon pasangan.",
  },
  {
    judul: "Menundukkan pandangan & menutup aurat",
    ringkasan:
      "Wajib bagi laki-laki dan perempuan untuk menjaga pandangan dari lawan jenis bukan mahram, dan menutup aurat sesuai batasnya masing-masing.",
    dalil: "QS. An-Nur: 30-31, QS. Al-Ahzab: 59.",
    poin: [
      "Aurat laki-laki: pusar hingga lutut (dalam pandangan mayoritas ulama).",
      "Aurat perempuan di hadapan bukan mahram: seluruh tubuh kecuali wajah dan telapak tangan (pendapat jumhur); sebagian ulama mewajibkan menutup wajah juga (khilafiyah).",
      "Di hadapan mahram/sesama jenis, batas aurat lebih longgar sesuai rincian fiqih masing-masing madzhab.",
    ],
  },
  {
    judul: "Zina",
    ringkasan:
      "Hubungan badan di luar pernikahan yang sah adalah salah satu dosa besar dalam Islam, dengan ancaman hukuman berat dalam syariat.",
    dalil: "QS. Al-Isra: 32, QS. An-Nur: 2.",
    poin: [
      "Termasuk dosa besar (kabair) yang disebutkan tegas larangannya dalam Al-Qur'an.",
      "Islam memerintahkan untuk 'tidak mendekati' zina — mencakup segala perantara yang mengarah padanya, bukan hanya perbuatannya saja.",
      "Solusi yang dianjurkan syariat bagi yang mampu dan siap secara lahir-batin adalah menyegerakan pernikahan; bagi yang belum mampu, dianjurkan berpuasa untuk meredam syahwat (HR. Bukhari-Muslim).",
    ],
  },
  {
    judul: "Pernikahan beda agama",
    ringkasan:
      "Mayoritas ulama Indonesia (MUI dan jumhur ulama klasik) berpendapat pernikahan muslim/muslimah dengan non-muslim tidak sah, kecuali dalam rincian tertentu yang diperselisihkan.",
    dalil: "QS. Al-Baqarah: 221, QS. Al-Mumtahanah: 10.",
    poin: [
      "Laki-laki muslim menikahi perempuan non-muslim: jumhur ulama klasik membolehkan khusus untuk perempuan Ahli Kitab (Yahudi/Nasrani) dengan syarat tertentu, namun MUI dan banyak ulama kontemporer memfatwakan haram karena mudharat yang ditimbulkan di masa sekarang.",
      "Perempuan muslimah menikahi laki-laki non-muslim (dalam bentuk apa pun): disepakati (ijma') ulama tidak sah/haram.",
    ],
  },
];

const HUKUM_MUAMALAH: Hukum[] = [
  {
    judul: "Riba",
    ringkasan:
      "Tambahan yang disyaratkan dalam transaksi utang-piutang atau pertukaran barang ribawi tertentu, hukumnya haram dan termasuk dosa besar.",
    dalil: "QS. Al-Baqarah: 275-279, QS. Ali Imran: 130.",
    poin: [
      "Riba nasi'ah: tambahan karena penundaan waktu pembayaran utang (misalnya bunga pinjaman/kartu kredit yang mengandung unsur riba).",
      "Riba fadhl: tambahan pada pertukaran barang sejenis yang tidak seimbang takaran/timbangannya (misalnya tukar emas dengan emas beda kadar tanpa penyetaraan nilai).",
      "Lembaga keuangan syariah dikembangkan sebagai alternatif yang menghindari akad berbasis bunga, menggantinya dengan akad seperti mudharabah, murabahah, dan ijarah.",
    ],
  },
  {
    judul: "Judi (Maisir)",
    ringkasan: "Segala bentuk taruhan yang untung-ruginya bergantung pada spekulasi/untung-untungan, hukumnya haram.",
    dalil: "QS. Al-Ma'idah: 90-91.",
    poin: [
      "Termasuk kategori ini: taruhan olahraga, kartu berbayar, lotre, dan sejenisnya.",
      "Disebutkan sejajar dengan khamr sebagai 'perbuatan keji termasuk perbuatan setan'.",
    ],
  },
  {
    judul: "Khamr & Narkoba",
    ringkasan: "Segala sesuatu yang memabukkan atau merusak akal, baik minuman maupun zat lain, hukumnya haram.",
    dalil: "QS. Al-Ma'idah: 90, dan hadits 'setiap yang memabukkan adalah khamr, dan setiap khamr adalah haram' (HR. Muslim).",
    poin: [
      "Berlaku untuk minuman keras maupun narkotika/zat psikoaktif lain yang merusak akal dan kesehatan, dengan illat hukum yang sama (memabukkan/merusak akal).",
      "Termasuk haram juga memproduksi, menjual, mengantarkan, atau membantu prosesnya (HR. Abu Dawud, tentang 10 pihak yang dilaknat terkait khamr).",
    ],
  },
  {
    judul: "Jual beli & akad terlarang",
    ringkasan: "Islam mengatur syarat sah jual beli agar adil dan bebas dari unsur merugikan salah satu pihak.",
    poin: [
      "Gharar: jual beli dengan ketidakjelasan objek/harga yang berlebihan (misalnya menjual ikan yang masih di kolam tanpa kejelasan jumlah) — dilarang.",
      "Menimbun barang kebutuhan pokok untuk menaikkan harga (ihtikar) — dilarang.",
      "Curang dalam takaran/timbangan — dilarang tegas (QS. Al-Muthaffifin: 1-3).",
    ],
  },
];

const HUKUM_MAKANAN = [
  {
    judul: "Makanan & sembelihan",
    poin: [
      "Daging babi, bangkai (kecuali ikan & belalang), darah yang mengalir — haram (QS. Al-Ma'idah: 3).",
      "Hewan sembelihan wajib disembelih atas nama Allah oleh muslim/Ahli Kitab dengan cara yang syar'i agar halal dikonsumsi.",
      "Hewan buas bertaring dan burung berkuku tajam pemangsa — haram menurut mayoritas ulama (HR. Muslim).",
    ],
  },
];

function Bagian({ h }: { h: Hukum }) {
  return (
    <div className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-5 md:p-6">
      <h3 className="font-display text-base text-[var(--ink)] mb-2">{h.judul}</h3>
      <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-3">{h.ringkasan}</p>
      <ul className="space-y-1.5 text-sm text-[var(--ink-soft)] mb-2">
        {h.poin.map((p, i) => (
          <li key={i} className="leading-relaxed">
            • {p}
          </li>
        ))}
      </ul>
      {h.dalil && (
        <p className="text-xs text-[var(--gold)] mt-2">Dalil: {h.dalil}</p>
      )}
      {h.catatan && (
        <p className="text-xs text-[var(--ink-soft)] mt-2 border-t border-[var(--parchment-line)] pt-2 italic">
          {h.catatan}
        </p>
      )}
    </div>
  );
}

export default function HukumIslamPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
            Fiqih
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-4">
            Hukum-Hukum dalam Islam
          </h1>
          <p className="text-[var(--ink-soft)] leading-relaxed">
            Ringkasan hukum syariat untuk berbagai persoalan yang sering
            ditanyakan, disusun berdasarkan pandangan mayoritas ulama
            (jumhur). Pada isu yang termasuk ranah <em>khilafiyah</em>
            (perbedaan ijtihad), perbedaan pendapat disebutkan apa adanya.
            Untuk keputusan pada kasus pribadi, tetap dianjurkan berkonsultasi
            langsung dengan ustadz/ulama tepercaya.
          </p>
        </div>

        <section className="mb-14">
          <h2 className="font-display text-lg text-[var(--ink)] mb-4">
            Lima Hukum Taklifi (Dasar Klasifikasi Hukum)
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {HUKUM_TAKLIFI.map((h) => (
              <div
                key={h.nama}
                className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-5"
              >
                <h3 className="font-display text-base text-[var(--heading)] mb-1">{h.nama}</h3>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-2">{h.arti}</p>
                <p className="text-xs text-[var(--ink-soft)]">
                  <span className="font-medium">Contoh:</span> {h.contoh}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="font-display text-lg text-[var(--ink)] mb-2">
            Pergaulan, Pernikahan & Batas Aurat
          </h2>
          <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-6">
            Termasuk isu yang paling banyak ditanyakan oleh remaja dan anak
            muda, terutama seputar hubungan sebelum menikah.
          </p>
          <div className="space-y-5">
            {HUKUM_PERGAULAN.map((h) => (
              <Bagian key={h.judul} h={h} />
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="font-display text-lg text-[var(--ink)] mb-2">
            Muamalah (Ekonomi & Transaksi)
          </h2>
          <div className="space-y-5">
            {HUKUM_MUAMALAH.map((h) => (
              <Bagian key={h.judul} h={h} />
            ))}
          </div>
        </section>

        <section className="mb-4">
          <h2 className="font-display text-lg text-[var(--ink)] mb-2">
            Makanan & Sembelihan
          </h2>
          <div className="space-y-5">
            {HUKUM_MAKANAN.map((h) => (
              <div
                key={h.judul}
                className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-5 md:p-6"
              >
                <h3 className="font-display text-base text-[var(--ink)] mb-3">{h.judul}</h3>
                <ul className="space-y-1.5 text-sm text-[var(--ink-soft)]">
                  {h.poin.map((p, i) => (
                    <li key={i} className="leading-relaxed">
                      • {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
