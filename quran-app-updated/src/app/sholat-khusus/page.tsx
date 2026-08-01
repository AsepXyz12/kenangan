import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Sholat-Sholat Khusus — Mushaf" };

type PoseKey =
  | "berdiri"
  | "takbir"
  | "bersedekap"
  | "ruku"
  | "itidal"
  | "sujud"
  | "duduk-iftirasy"
  | "duduk-tawarruk"
  | "salam";

function AlurGerakan({ steps }: { steps: { pose: PoseKey; label: string }[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-3">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <div className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment)] p-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/gerakan/${s.pose}.png`}
                alt={s.label}
                width={52}
                height={59}
                className="block"
              />
            </div>
            <span className="text-[10px] text-[var(--ink-soft)] text-center max-w-[64px] leading-tight">
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <span className="text-[var(--gold)] text-lg -mt-4">&rarr;</span>
          )}
        </div>
      ))}
    </div>
  );
}

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

function OrderedKartu({ items }: { items: string[] }) {
  return (
    <Kartu>
      <ol className="space-y-2">
        {items.map((s, i) => (
          <li key={s} className="text-sm text-[var(--ink-soft)] flex gap-2">
            <span className="text-[var(--teal-deep)] shrink-0">{i + 1}.</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
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

/* ===== SHOLAT JENAZAH ===== */
const SYARAT_SHOLAT_JENAZAH = [
  "Jenazah beragama Islam",
  "Jenazah telah dimandikan dan dikafani (jika memungkinkan)",
  "Jenazah diletakkan di sebelah kiblat dari orang yang menyalatkan (posisi jenazah melintang di depan)",
  "Sholat jenazah hukumnya fardu kifayah, gugur kewajiban bagi seluruh muslim di suatu wilayah bila telah dilaksanakan oleh sebagian",
];

const NIAT_SHOLAT_JENAZAH_LAKI = {
  arab: "أُصَلِّي عَلَى هَٰذَا الْمَيِّتِ أَرْبَعَ تَكْبِيرَاتٍ فَرْضَ الْكِفَايَةِ إِمَامًا/مَأْمُومًا لِلَّهِ تَعَالَى",
  latin: "Ushallii 'alaa haadzal mayyiti arba'a takbiiraatin fardhal kifaayati (imaaman/ma'muuman) lillaahi ta'aalaa",
  arti: "Aku niat sholat atas jenazah ini empat takbir, fardu kifayah, (sebagai imam/makmum) karena Allah Ta'ala.",
  keterangan: "Untuk jenazah perempuan, kata 'haadzal mayyiti' diganti 'haadzihil mayyitati'.",
};

const URUTAN_SHOLAT_JENAZAH = [
  "Berdiri menghadap kiblat, posisi jenazah melintang di depan",
  "Takbir pertama (Takbiratul Ihram) disertai niat, lalu membaca Al-Fatihah",
  "Takbir kedua, lalu membaca sholawat kepada Nabi Muhammad ﷺ",
  "Takbir ketiga, lalu membaca doa untuk jenazah",
  "Takbir keempat, lalu membaca doa lanjutan/doa untuk yang ditinggalkan",
  "Salam menoleh ke kanan (dan sebagian ulama juga ke kiri)",
];

const DOA_JENAZAH = {
  arab: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ وَأَكْرِمْ نُزُلَهُ وَوَسِّعْ مُدْخَلَهُ",
  latin: "Allaahummaghfir lahu warhamhu wa 'aafihi wa'fu 'anhu wa akrim nuzulahu wa wassi' mudkhalahu",
  arti: "Ya Allah, ampunilah dia, kasihanilah dia, sejahterakanlah dia, maafkanlah dia, muliakanlah tempat tinggalnya, dan luaskanlah kuburnya.",
  keterangan: "Dibaca setelah takbir ketiga. Ganti kata ganti 'hu' (dia laki-laki) dengan 'haa' bila jenazah perempuan.",
};

/* ===== JAMAK QASHAR ===== */
const KETENTUAN_JAMAK_QASHAR = [
  "Diperbolehkan bagi musafir yang menempuh jarak tertentu (kurang lebih 80-90 km, setara safar syar'i) dengan tujuan yang dibenarkan",
  "Qashar hanya berlaku untuk sholat empat rakaat (Zuhur, Ashar, Isya), diringkas menjadi dua rakaat; Maghrib dan Subuh tidak diqashar",
  "Jamak adalah menggabungkan dua sholat dalam satu waktu: Zuhur dengan Ashar, atau Maghrib dengan Isya",
  "Jamak taqdim: mengerjakan dua sholat di waktu sholat yang pertama (misal Ashar dikerjakan di waktu Zuhur)",
  "Jamak ta'khir: mengerjakan dua sholat di waktu sholat yang kedua (misal Zuhur dikerjakan di waktu Ashar)",
  "Jamak dan qashar boleh dilakukan bersamaan atau terpisah, sesuai kebutuhan musafir",
];

const NIAT_JAMAK_QASHAR = {
  arab: "أُصَلِّي فَرْضَ الظُّهْرِ رَكْعَتَيْنِ قَصْرًا جَمْعَ تَقْدِيمٍ لِلَّهِ تَعَالَى",
  latin: "Ushallii fardhazh zhuhri rak'ataini qashran jam'a taqdiimin lillaahi ta'aalaa",
  arti: "Aku niat sholat fardu Zuhur dua rakaat, diqashar, dijamak taqdim dengan Ashar, karena Allah Ta'ala.",
  keterangan: "Contoh niat menjamak-taqdim Zuhur dengan Ashar. Sesuaikan nama sholat dan jenis jamak (taqdim/ta'khir) sesuai keadaan.",
};

/* ===== SUJUD SAHWI ===== */
const SEBAB_SUJUD_SAHWI = [
  "Lupa membaca salah satu sunnah ab'adh dalam sholat, seperti qunut atau tasyahud awal",
  "Ragu-ragu terhadap jumlah rakaat yang telah dikerjakan",
  "Kelebihan atau kekurangan gerakan (rukun fi'li) dalam sholat karena lupa",
];

const TATA_CARA_SUJUD_SAHWI = [
  "Dilakukan setelah tasyahud akhir, sebelum salam",
  "Sujud dua kali sebagaimana sujud biasa dalam sholat, dengan bacaan tasbih khusus di antaranya",
  "Setelah dua sujud, duduk sejenak lalu mengucapkan salam untuk menutup sholat",
];

const BACAAN_SUJUD_SAHWI = {
  arab: "سُبْحَانَ مَنْ لَا يَنَامُ وَلَا يَسْهُو",
  latin: "Subhaana man laa yanaamu wa laa yashuu",
  arti: "Mahasuci Zat yang tidak tidur dan tidak lupa.",
};

/* ===== SHOLAT JUMAT ===== */
const SYARAT_WAJIB_JUMAT = [
  "Laki-laki muslim, baligh, berakal sehat, merdeka, dan mukim (bukan musafir)",
  "Sehat, tidak memiliki uzur seperti sakit berat",
  "Perempuan, anak-anak, musafir, dan orang sakit tidak wajib namun sah bila mengerjakannya (dengan sholat Zuhur biasa, bukan Jumat, bagi yang tidak wajib)",
];

const RANGKAIAN_JUMAT = [
  "Disunnahkan mandi, memakai wangi-wangian, dan pakaian terbaik sebelum berangkat",
  "Dianjurkan datang lebih awal ke masjid dan mengisi waktu dengan sholat sunnah atau membaca Al-Qur'an",
  "Khatib naik mimbar, memberi salam, lalu adzan dikumandangkan",
  "Khutbah pertama, berisi puji-pujian kepada Allah, sholawat, wasiat takwa, dan nasihat",
  "Khatib duduk sejenak di antara dua khutbah",
  "Khutbah kedua, umumnya ditutup dengan doa",
  "Iqamah dikumandangkan, lalu sholat Jumat dua rakaat berjamaah dengan bacaan jahr (nyaring) seperti sholat Subuh",
];

/* ===== SHOLAT ID ===== */
const TATA_CARA_SHOLAT_ID = [
  "Dilaksanakan dua rakaat tanpa adzan dan iqamah, cukup dengan seruan 'ash-shalaatu jaami'ah'",
  "Rakaat pertama: takbiratul ihram, dilanjutkan 7 kali takbir tambahan (takbir zawa'id) sebelum membaca Al-Fatihah",
  "Di antara setiap takbir tambahan disunnahkan membaca tasbih/dzikir singkat",
  "Rakaat kedua: setelah bangkit dari sujud, membaca 5 kali takbir tambahan sebelum membaca Al-Fatihah",
  "Dilanjutkan seperti sholat biasa hingga salam",
  "Setelah sholat, dilanjutkan dua khutbah seperti khutbah Jumat, berisi nasihat sesuai tema hari raya",
];

const BACAAN_TAKBIR_ID = {
  arab: "اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ",
  latin: "Allaahu akbar, Allaahu akbar, Allaahu akbar, laa ilaaha illallaah, wallaahu akbar, Allaahu akbar, wa lillaahil hamd",
  arti: "Allah Maha Besar, Allah Maha Besar, Allah Maha Besar, tiada Tuhan selain Allah, Allah Maha Besar, Allah Maha Besar, segala puji bagi Allah.",
  keterangan: "Takbir hari raya (takbiran), disunnahkan dikumandangkan sejak malam Idulfitri/Iduladha hingga pelaksanaan sholat Id.",
};

/* ===== SHOLAT GERHANA ===== */
const KETENTUAN_GERHANA = [
  "Sholat Kusuf dikerjakan saat gerhana matahari, sholat Khusuf saat gerhana bulan",
  "Hukumnya sunnah muakkad, dikerjakan berjamaah di masjid meski juga sah sendirian",
  "Waktu pelaksanaan sejak gerhana mulai terjadi hingga selesai atau matahari/bulan tampak kembali normal",
  "Tidak ada adzan maupun iqamah, cukup diserukan 'ash-shalaatu jaami'ah'",
];

const TATA_CARA_GERHANA = [
  "Niat dan takbiratul ihram, lalu membaca Al-Fatihah dan surat panjang",
  "Ruku' dengan bacaan tasbih yang panjang",
  "I'tidal, namun tidak langsung sujud — membaca Al-Fatihah dan surat kembali (ini yang membedakan dari sholat biasa)",
  "Ruku' kedua dengan tasbih panjang, lalu i'tidal",
  "Sujud dua kali seperti biasa, lalu berdiri untuk rakaat kedua",
  "Rakaat kedua diulang dengan urutan yang sama: dua kali berdiri-baca surat dan dua kali ruku' sebelum sujud",
  "Salam menutup sholat, dilanjutkan khutbah berisi nasihat, ajakan istighfar, sedekah, dan dzikir",
];

const NIAT_GERHANA = {
  arab: "أُصَلِّي سُنَّةَ الْكُسُوفِ رَكْعَتَيْنِ إِمَامًا/مَأْمُومًا لِلَّهِ تَعَالَى",
  latin: "Ushallii sunnatal kusuufi rak'ataini (imaaman/ma'muuman) lillaahi ta'aalaa",
  arti: "Aku niat sholat sunnah gerhana matahari dua rakaat, (sebagai imam/makmum), karena Allah Ta'ala.",
  keterangan: "Untuk gerhana bulan, kata 'al-kusuufi' diganti 'al-khusuufi'.",
};

/* ===== SHOLAT ISTISQA ===== */
const KETENTUAN_ISTISQA = [
  "Sholat sunnah untuk memohon diturunkan hujan pada masa kemarau panjang atau kekeringan",
  "Dianjurkan mengajak seluruh warga, termasuk anak-anak dan hewan ternak, keluar menuju tanah lapang",
  "Sebelum pelaksanaan, dianjurkan berpuasa, memperbanyak sedekah, dan bertaubat selama beberapa hari",
  "Jamaah disunnahkan memakai pakaian sederhana, tanpa perhiasan, sebagai tanda kerendahan hati",
];

const TATA_CARA_ISTISQA = [
  "Dilaksanakan dua rakaat seperti sholat Id: rakaat pertama 7 takbir tambahan, rakaat kedua 5 takbir tambahan",
  "Setelah sholat, khatib berkhutbah dan memperbanyak istighfar serta doa memohon hujan",
  "Khatib disunnahkan membalik posisi selendang/jubah (dari kanan ke kiri) sebagai simbol harapan perubahan keadaan",
  "Doa dan khutbah dilakukan dengan merendahkan diri, menghadap kiblat sambil mengangkat tangan tinggi",
];

const DOA_ISTISQA = {
  arab: "اللَّهُمَّ اسْقِنَا غَيْثًا مُغِيثًا مَرِيئًا مَرِيعًا نَافِعًا غَيْرَ ضَارٍّ عَاجِلًا غَيْرَ آجِلٍ",
  latin: "Allaahummasqinaa ghaitsan mughiitsan marii'an marii'an naafi'an ghaira dhaarrin 'aajilan ghaira aajil",
  arti: "Ya Allah, turunkanlah kepada kami hujan yang menolong, yang menyegarkan, yang menyuburkan, yang bermanfaat dan tidak berbahaya, segera dan tidak ditunda.",
};

function Seksi({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="font-display text-2xl text-[var(--teal-deep)] mb-2">{title}</h2>
      {desc && <p className="text-sm text-[var(--ink-soft)] mb-4">{desc}</p>}
      {children}
    </section>
  );
}

export default function SholatKhususPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--parchment)]">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-14 w-full">
        <span className="text-xs tracking-widest uppercase text-[var(--ink-soft)]">Fiqih Ibadah</span>
        <h1 className="font-display text-3xl md:text-4xl text-[var(--teal-deep)] mt-1 mb-3">
          Sholat-Sholat Khusus
        </h1>
        <p className="text-[var(--ink-soft)] mb-10 leading-relaxed">
          Panduan sholat jenazah, jamak-qashar bagi musafir, sujud sahwi, sholat Jumat, dan sholat
          Id, mengikuti pendapat mazhab Syafi'i.
        </p>

        <Seksi title="Sholat Jenazah" desc="Hukumnya fardu kifayah bagi jenazah muslim.">
          <h3 className="font-medium text-[var(--ink)] mb-2">Syarat</h3>
          <DaftarKartu items={SYARAT_SHOLAT_JENAZAH} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Niat</h3>
          <BacaanBlok {...NIAT_SHOLAT_JENAZAH_LAKI} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Urutan Pelaksanaan</h3>
          <OrderedKartu items={URUTAN_SHOLAT_JENAZAH} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Alur Empat Takbir</h3>
          <AlurGerakan
            steps={[
              { pose: "takbir", label: "Takbir 1 + Al-Fatihah" },
              { pose: "berdiri", label: "Takbir 2 + Sholawat" },
              { pose: "berdiri", label: "Takbir 3 + Doa Jenazah" },
              { pose: "berdiri", label: "Takbir 4 + Doa" },
              { pose: "salam", label: "Salam" },
            ]}
          />
          <p className="text-xs text-[var(--ink-soft)] mt-2">
            Seluruh takbir dan bacaan dilakukan sambil tetap berdiri, tanpa ruku' maupun sujud.
          </p>
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Doa Setelah Takbir Ketiga</h3>
          <BacaanBlok {...DOA_JENAZAH} />
        </Seksi>

        <Seksi title="Jamak & Qashar" desc="Keringanan sholat bagi musafir.">
          <DaftarKartu items={KETENTUAN_JAMAK_QASHAR} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Contoh Niat</h3>
          <BacaanBlok {...NIAT_JAMAK_QASHAR} />
        </Seksi>

        <Seksi title="Sujud Sahwi" desc="Sujud tambahan karena lupa dalam sholat.">
          <h3 className="font-medium text-[var(--ink)] mb-2">Sebab-Sebab</h3>
          <DaftarKartu items={SEBAB_SUJUD_SAHWI} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Tata Cara</h3>
          <OrderedKartu items={TATA_CARA_SUJUD_SAHWI} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Bacaan Sujud Sahwi</h3>
          <BacaanBlok {...BACAAN_SUJUD_SAHWI} />
        </Seksi>

        <Seksi title="Sholat Jumat" desc="Pengganti Zuhur bagi laki-laki muslim mukim setiap hari Jumat.">
          <h3 className="font-medium text-[var(--ink)] mb-2">Syarat Wajib</h3>
          <DaftarKartu items={SYARAT_WAJIB_JUMAT} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Rangkaian Pelaksanaan</h3>
          <OrderedKartu items={RANGKAIAN_JUMAT} />
        </Seksi>

        <Seksi title="Sholat Idulfitri & Iduladha" desc="Sholat sunnah muakkad dua rakaat di hari raya.">
          <OrderedKartu items={TATA_CARA_SHOLAT_ID} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Alur Takbir Zawa'id</h3>
          <AlurGerakan
            steps={[
              { pose: "takbir", label: "Takbiratul ihram" },
              { pose: "takbir", label: "7x takbir tambahan" },
              { pose: "bersedekap", label: "Al-Fatihah + surat" },
              { pose: "ruku", label: "Ruku'" },
              { pose: "sujud", label: "Sujud" },
              { pose: "takbir", label: "5x takbir tambahan (rakaat 2)" },
              { pose: "bersedekap", label: "Al-Fatihah + surat" },
              { pose: "salam", label: "Lanjut seperti biasa hingga salam" },
            ]}
          />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Bacaan Takbir Hari Raya</h3>
          <BacaanBlok {...BACAAN_TAKBIR_ID} />
        </Seksi>

        <Seksi title="Sholat Gerhana (Kusuf & Khusuf)" desc="Sholat sunnah muakkad ketika terjadi gerhana matahari atau bulan.">
          <h3 className="font-medium text-[var(--ink)] mb-2">Ketentuan</h3>
          <DaftarKartu items={KETENTUAN_GERHANA} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Contoh Niat</h3>
          <BacaanBlok {...NIAT_GERHANA} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Tata Cara Pelaksanaan</h3>
          <OrderedKartu items={TATA_CARA_GERHANA} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Alur Satu Rakaat (Ciri Khasnya: Dua Kali Ruku')</h3>
          <AlurGerakan
            steps={[
              { pose: "takbir", label: "Takbiratul ihram" },
              { pose: "bersedekap", label: "Baca Al-Fatihah + surat (1)" },
              { pose: "ruku", label: "Ruku' (1)" },
              { pose: "itidal", label: "I'tidal, tanpa sujud" },
              { pose: "bersedekap", label: "Baca Al-Fatihah + surat (2)" },
              { pose: "ruku", label: "Ruku' (2)" },
              { pose: "itidal", label: "I'tidal" },
              { pose: "sujud", label: "Sujud 2x seperti biasa" },
            ]}
          />
        </Seksi>

        <Seksi title="Sholat Istisqa" desc="Sholat sunnah memohon hujan pada masa kekeringan.">
          <h3 className="font-medium text-[var(--ink)] mb-2">Ketentuan</h3>
          <DaftarKartu items={KETENTUAN_ISTISQA} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Tata Cara Pelaksanaan</h3>
          <OrderedKartu items={TATA_CARA_ISTISQA} />
          <h3 className="font-medium text-[var(--ink)] mt-6 mb-2">Doa Memohon Hujan</h3>
          <BacaanBlok {...DOA_ISTISQA} />
        </Seksi>

        <p className="text-xs text-[var(--ink-soft)] border-t border-[var(--parchment-line)] pt-6">
          Rincian di halaman ini mengikuti pendapat mazhab Syafi'i yang umum dirujuk di Indonesia.
          Beberapa ketentuan seperti jarak safar dan tata cara sujud sahwi memiliki perbedaan
          pendapat antar ulama; disarankan berkonsultasi dengan ustaz/ustazah setempat untuk kasus spesifik.
        </p>
      </main>
      <Footer />
    </div>
  );
}
