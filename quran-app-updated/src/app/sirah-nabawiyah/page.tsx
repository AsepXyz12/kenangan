import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Sirah Nabawiyah — Sejarah Nabi Muhammad ﷺ — Mushaf" };

type Peristiwa = {
  judul: string;
  tahun?: string;
  deskripsi: string;
};

type Era = {
  nomor: number;
  judul: string;
  rentang: string;
  ringkasan: string;
  peristiwa: Peristiwa[];
};

const ERA: Era[] = [
  {
    nomor: 1,
    judul: "Jazirah Arab Sebelum Islam",
    rentang: "Sebelum 570 M",
    ringkasan:
      "Masa yang dikenal sebagai zaman Jahiliyah, ketika mayoritas bangsa Arab menyembah berhala di sekitar Ka'bah, meski secara turun-temurun mereka masih mengakui Ka'bah sebagai bangunan yang dibangun Nabi Ibrahim dan Ismail.",
    peristiwa: [
      {
        judul: "Kondisi sosial dan kepercayaan",
        deskripsi:
          "Masyarakat Arab terpecah dalam suku-suku dengan sistem kesukuan yang kuat. Perbudakan, perang antar-suku, dan penguburan bayi perempuan hidup-hidup menjadi praktik yang lazim. Ka'bah di Makkah dipenuhi ratusan berhala, meski kota ini tetap menjadi pusat ziarah dan perdagangan tahunan.",
      },
      {
        judul: "Tahun Gajah",
        tahun: "sekitar 570 M",
        deskripsi:
          "Raja Abrahah dari Yaman menyerang Makkah dengan pasukan bergajah untuk menghancurkan Ka'bah, namun pasukannya dibinasakan Allah dengan kawanan burung Ababil yang melempari mereka batu dari tanah liat, sebagaimana diabadikan dalam Surat Al-Fil. Peristiwa ini terjadi pada tahun kelahiran Nabi Muhammad ﷺ.",
      },
    ],
  },
  {
    nomor: 2,
    judul: "Kelahiran dan Masa Kecil",
    rentang: "570–610 M",
    ringkasan:
      "Muhammad ﷺ lahir dalam keadaan yatim dan tumbuh sebagai anak yang jujur serta terpercaya, dikenal masyarakat Makkah dengan gelar Al-Amin.",
    peristiwa: [
      {
        judul: "Kelahiran di Makkah",
        tahun: "12 Rabiul Awal, sekitar 570 M",
        deskripsi:
          "Muhammad ﷺ lahir di Makkah dari pasangan Abdullah bin Abdul Muthalib dan Aminah binti Wahab, dari suku Quraisy. Ayahnya, Abdullah, wafat sebelum beliau lahir.",
      },
      {
        judul: "Disusui Halimah as-Sa'diyah",
        deskripsi:
          "Sesuai tradisi bangsawan Quraisy, bayi Muhammad disusukan kepada Halimah dari suku Bani Sa'ad di pedalaman, agar tumbuh sehat dan fasih berbahasa Arab.",
      },
      {
        judul: "Menjadi yatim piatu",
        deskripsi:
          "Ibunya, Aminah, wafat ketika Muhammad berusia 6 tahun. Ia lalu diasuh kakeknya, Abdul Muthalib, hingga sang kakek wafat dua tahun kemudian, dan pengasuhannya diteruskan pamannya, Abu Thalib.",
      },
      {
        judul: "Menikah dengan Khadijah",
        tahun: "usia 25 tahun",
        deskripsi:
          "Setelah dikenal jujur dalam berniaga membawa dagangan Khadijah ke Syam, Muhammad ﷺ menikahi Khadijah binti Khuwailid, saudagar terpandang Makkah yang berusia 40 tahun. Khadijah menjadi istri pertama dan pendukung utama dakwah beliau kelak.",
      },
    ],
  },
  {
    nomor: 3,
    judul: "Kenabian dan Dakwah di Makkah",
    rentang: "610–622 M",
    ringkasan:
      "Wahyu pertama turun ketika Muhammad ﷺ berusia 40 tahun, menandai awal kenabian dan dakwah tauhid selama tiga belas tahun di Makkah, penuh dengan penolakan dan penyiksaan dari kaum Quraisy.",
    peristiwa: [
      {
        judul: "Wahyu pertama di Gua Hira",
        tahun: "17 Ramadan, 610 M",
        deskripsi:
          "Malaikat Jibril menyampaikan lima ayat pertama Surat Al-'Alaq kepada Muhammad ﷺ saat beliau menyendiri di Gua Hira. Peristiwa ini menandai awal kenabian dan turunnya Al-Qur'an.",
      },
      {
        judul: "Dakwah secara sembunyi-sembunyi",
        tahun: "610–613 M",
        deskripsi:
          "Selama tiga tahun pertama, dakwah dilakukan secara diam-diam kepada orang-orang terdekat. Khadijah menjadi orang pertama yang beriman, disusul Ali bin Abi Thalib, Abu Bakar Ash-Shiddiq, dan Zaid bin Haritsah.",
      },
      {
        judul: "Dakwah secara terang-terangan",
        tahun: "613 M",
        deskripsi:
          "Setelah turun perintah Allah, Nabi ﷺ mulai berdakwah terbuka kepada seluruh penduduk Makkah, yang direspons dengan penolakan keras, ejekan, dan penyiksaan terhadap Nabi ﷺ dan para pengikutnya, terutama dari kalangan budak seperti Bilal bin Rabah.",
      },
      {
        judul: "Hijrah ke Habasyah",
        tahun: "615 M",
        deskripsi:
          "Untuk melindungi kaum muslimin dari penyiksaan Quraisy, sebagian sahabat diperintahkan hijrah ke Habasyah (Ethiopia) di bawah perlindungan Raja Najasyi yang dikenal adil.",
      },
      {
        judul: "Pemboikotan Bani Hasyim",
        tahun: "616–619 M",
        deskripsi:
          "Kaum Quraisy memboikot total Bani Hasyim dan Bani Muthalib—termasuk yang belum masuk Islam—dalam hal perdagangan, pernikahan, dan interaksi sosial selama sekitar tiga tahun, memaksa mereka bertahan hidup di lembah terpencil.",
      },
      {
        judul: "Tahun Kesedihan",
        tahun: "619 M",
        deskripsi:
          "Disebut 'Amul Huzn karena dalam tahun yang sama, Khadijah dan Abu Thalib—dua pendukung terdekat Nabi ﷺ—wafat, sehingga tekanan dari Quraisy semakin meningkat.",
      },
      {
        judul: "Isra Mi'raj",
        tahun: "621 M",
        deskripsi:
          "Nabi ﷺ diperjalankan Allah dalam semalam dari Masjidil Haram di Makkah ke Masjidil Aqsa di Yerusalem (Isra), lalu dinaikkan ke langit (Mi'raj) untuk menerima perintah sholat lima waktu.",
      },
      {
        judul: "Bai'at Aqabah",
        tahun: "620–622 M",
        deskripsi:
          "Rombongan penduduk Yatsrib (kelak Madinah) yang berhaji ke Makkah berbai'at kepada Nabi ﷺ dalam dua tahap di Bukit Aqabah, berjanji melindungi dan mendukung dakwah Islam, membuka jalan bagi hijrah.",
      },
    ],
  },
  {
    nomor: 4,
    judul: "Hijrah ke Madinah",
    rentang: "622 M",
    ringkasan:
      "Hijrah menjadi titik balik sejarah Islam, dari fase dakwah yang tertekan di Makkah menuju berdirinya masyarakat Islam pertama di Madinah, yang kemudian ditetapkan sebagai awal penanggalan Hijriah.",
    peristiwa: [
      {
        judul: "Perintah hijrah",
        deskripsi:
          "Setelah rencana pembunuhan Nabi ﷺ oleh para pemuka Quraisy dari berbagai suku secara bersama-sama, Allah memerintahkan hijrah. Ali bin Abi Thalib menggantikan posisi tidur Nabi ﷺ untuk mengelabui para pengepung.",
      },
      {
        judul: "Persembunyian di Gua Tsur",
        deskripsi:
          "Nabi ﷺ bersama Abu Bakar bersembunyi tiga hari di Gua Tsur sebelum melanjutkan perjalanan ke Yatsrib, sementara pengejar Quraisy sempat sampai di mulut gua tanpa menyadari keberadaan mereka.",
      },
      {
        judul: "Tiba di Yatsrib (Madinah)",
        deskripsi:
          "Penduduk Yatsrib menyambut kedatangan Nabi ﷺ dengan penuh suka cita. Kota ini kemudian berganti nama menjadi Madinah, dan peristiwa hijrah ditetapkan Khalifah Umar bin Khattab sebagai awal tahun Hijriah.",
      },
    ],
  },
  {
    nomor: 5,
    judul: "Membangun Masyarakat Madinah",
    rentang: "622–630 M",
    ringkasan:
      "Di Madinah, Nabi ﷺ membangun fondasi masyarakat Islam: masjid sebagai pusat kegiatan, persaudaraan antara Muhajirin dan Anshar, serta piagam yang mengatur hidup berdampingan antar-kelompok.",
    peristiwa: [
      {
        judul: "Pembangunan Masjid Nabawi",
        deskripsi:
          "Salah satu hal pertama yang dilakukan Nabi ﷺ di Madinah adalah membangun masjid yang menjadi pusat ibadah, pendidikan, dan pemerintahan umat Islam.",
      },
      {
        judul: "Mempersaudarakan Muhajirin dan Anshar",
        deskripsi:
          "Nabi ﷺ mempersaudarakan kaum Muhajirin (yang hijrah dari Makkah) dengan kaum Anshar (penduduk asli Madinah) sehingga tercipta solidaritas sosial yang kuat.",
      },
      {
        judul: "Piagam Madinah",
        deskripsi:
          "Nabi ﷺ menyusun perjanjian tertulis yang mengatur hak dan kewajiban seluruh penduduk Madinah, termasuk kaum muslimin, Yahudi, dan kelompok lain, sebagai dasar hidup berdampingan dan pertahanan bersama kota.",
      },
      {
        judul: "Perang Badar",
        tahun: "2 H / 624 M",
        deskripsi:
          "Pertempuran besar pertama antara sekitar 313 kaum muslimin melawan lebih dari 1000 pasukan Quraisy. Kaum muslimin meraih kemenangan gemilang yang menjadi tonggak penting kekuatan umat Islam di Madinah.",
      },
      {
        judul: "Perang Uhud",
        tahun: "3 H / 625 M",
        deskripsi:
          "Pertempuran di dekat Bukit Uhud yang sempat unggul bagi kaum muslimin, namun berbalik karena sebagian pasukan pemanah meninggalkan pos demi harta rampasan, menyebabkan Nabi ﷺ terluka dan sejumlah sahabat gugur, termasuk Hamzah bin Abdul Muthalib.",
      },
      {
        judul: "Perang Khandaq (Ahzab)",
        tahun: "5 H / 627 M",
        deskripsi:
          "Koalisi besar suku-suku Arab dan Yahudi mengepung Madinah. Atas usul Salman Al-Farisi, kaum muslimin menggali parit (khandaq) di sekeliling kota sebagai strategi pertahanan yang belum dikenal bangsa Arab, memaksa pasukan musuh mundur tanpa pertempuran besar.",
      },
      {
        judul: "Perjanjian Hudaibiyah",
        tahun: "6 H / 628 M",
        deskripsi:
          "Nabi ﷺ dan kaum muslimin hendak melaksanakan umrah namun dihalangi Quraisy. Tercapai perjanjian damai sepuluh tahun yang meski tampak merugikan di permukaan, justru membuka jalan lebih luas bagi penyebaran dakwah Islam, sebagaimana disebut sebagai 'kemenangan yang nyata' dalam Al-Qur'an.",
      },
      {
        judul: "Penaklukan Khaibar",
        tahun: "7 H / 628 M",
        deskripsi:
          "Benteng-benteng Yahudi di Khaibar yang kerap memusuhi Madinah berhasil ditaklukkan, mengamankan wilayah utara Madinah dari ancaman.",
      },
    ],
  },
  {
    nomor: 6,
    judul: "Penaklukan Makkah dan Akhir Hayat",
    rentang: "630–632 M",
    ringkasan:
      "Islam menyebar ke seluruh Jazirah Arab tanpa peperangan besar setelah Makkah ditaklukkan secara damai, hingga Nabi ﷺ wafat setelah menyampaikan pesan terakhirnya di Haji Wada.",
    peristiwa: [
      {
        judul: "Fathu Makkah (Penaklukan Makkah)",
        tahun: "8 H / 630 M",
        deskripsi:
          "Setelah Quraisy melanggar Perjanjian Hudaibiyah, Nabi ﷺ memimpin sekitar 10.000 pasukan menuju Makkah. Kota itu ditaklukkan nyaris tanpa perlawanan, dan Nabi ﷺ memberi pengampunan umum kepada penduduk Makkah, termasuk mereka yang dahulu menyiksanya. Ka'bah dibersihkan dari 360 berhala.",
      },
      {
        judul: "Perang Hunain dan Tabuk",
        tahun: "8–9 H / 630–631 M",
        deskripsi:
          "Setelah Fathu Makkah, kaum muslimin menghadapi suku Hawazin di Hunain dan meraih kemenangan. Ekspedisi Tabuk ke utara pada tahun berikutnya memperluas pengaruh Islam hingga perbatasan Romawi tanpa terjadi pertempuran besar.",
      },
      {
        judul: "Tahun Delegasi (Amul Wufud)",
        tahun: "9 H / 631 M",
        deskripsi:
          "Berbagai suku dari seluruh Jazirah Arab mengirim utusan ke Madinah untuk menyatakan keislaman mereka, menandai penyebaran Islam yang meluas ke seluruh Arab.",
      },
      {
        judul: "Haji Wada (Haji Perpisahan)",
        tahun: "10 H / 632 M",
        deskripsi:
          "Nabi ﷺ melaksanakan haji terakhirnya bersama puluhan ribu kaum muslimin, menyampaikan khutbah agung yang menekankan persamaan derajat manusia, larangan riba, hak-hak perempuan, dan wasiat untuk berpegang teguh pada Al-Qur'an dan Sunnah.",
      },
      {
        judul: "Wafatnya Rasulullah ﷺ",
        tahun: "12 Rabiul Awal, 11 H / 632 M",
        deskripsi:
          "Nabi Muhammad ﷺ wafat di Madinah dalam usia 63 tahun, di rumah istrinya Aisyah, setelah menuntaskan seluruh risalah yang diamanahkan Allah. Beliau dimakamkan di tempat wafatnya, yang kini berada di dalam kompleks Masjid Nabawi.",
      },
    ],
  },
  {
    nomor: 7,
    judul: "Masa Khulafaur Rasyidin",
    rentang: "632–661 M",
    ringkasan:
      "Setelah Nabi ﷺ wafat, kepemimpinan umat dilanjutkan empat sahabat utama yang dikenal sebagai Khulafaur Rasyidin (khalifah yang mendapat petunjuk): Abu Bakar, Umar, Utsman, dan Ali. Masa ini menjadi fondasi penting penyebaran dan pembukuan Islam.",
    peristiwa: [
      {
        judul: "Pengangkatan Abu Bakar ash-Shiddiq",
        tahun: "11 H / 632 M",
        deskripsi:
          "Sepeninggal Nabi ﷺ, kaum muslimin berkumpul di Saqifah Bani Sa'idah dan sepakat membaiat Abu Bakar sebagai khalifah pertama, sahabat terdekat Nabi yang dikenal jujur dan menemani beliau hijrah ke Madinah.",
      },
      {
        judul: "Perang Riddah",
        tahun: "11–12 H / 632–633 M",
        deskripsi:
          "Abu Bakar memadamkan pemberontakan suku-suku yang murtad dan menolak membayar zakat sepeninggal Nabi ﷺ, termasuk melawan nabi-nabi palsu seperti Musailamah al-Kadzab, sehingga persatuan umat Islam di Jazirah Arab terjaga.",
      },
      {
        judul: "Pengumpulan Mushaf Al-Qur'an",
        tahun: "12 H / 633 M",
        deskripsi:
          "Atas usul Umar bin Khattab, khawatir banyaknya penghafal Al-Qur'an yang gugur di Perang Yamamah, Abu Bakar memerintahkan Zaid bin Tsabit mengumpulkan seluruh ayat Al-Qur'an yang tercecer menjadi satu mushaf.",
      },
      {
        judul: "Kekhalifahan Umar bin Khattab",
        tahun: "13–23 H / 634–644 M",
        deskripsi:
          "Umar dikenal sebagai khalifah yang tegas dan sederhana. Pada masanya, wilayah Islam meluas pesat hingga membebaskan Yerusalem, Syam, Mesir, dan sebagian besar wilayah Persia. Ia juga membentuk sistem administrasi negara, kalender Hijriah, dan lembaga baitul mal.",
      },
      {
        judul: "Wafatnya Umar",
        tahun: "23 H / 644 M",
        deskripsi:
          "Umar wafat akibat ditikam oleh Abu Lu'lu'ah, seorang budak Persia, saat mengimami sholat Subuh di Masjid Nabawi. Sebelum wafat, ia membentuk dewan syura beranggotakan enam sahabat untuk memilih penggantinya.",
      },
      {
        judul: "Kekhalifahan Utsman bin Affan",
        tahun: "23–35 H / 644–656 M",
        deskripsi:
          "Utsman melanjutkan perluasan wilayah Islam hingga ke Afrika Utara dan sebagian Asia Tengah. Kontribusi terbesarnya adalah membakukan satu standar bacaan dan penulisan Al-Qur'an (mushaf Utsmani) yang digandakan dan dikirim ke berbagai wilayah untuk menyatukan bacaan umat Islam.",
      },
      {
        judul: "Fitnah dan Wafatnya Utsman",
        tahun: "35 H / 656 M",
        deskripsi:
          "Menjelang akhir masa jabatannya, muncul gejolak politik dan tuduhan nepotisme terhadap Utsman. Ia dikepung dan dibunuh oleh kelompok pemberontak di rumahnya sendiri saat sedang membaca Al-Qur'an, memicu perpecahan politik yang berkepanjangan di tubuh umat Islam.",
      },
      {
        judul: "Kekhalifahan Ali bin Abi Thalib",
        tahun: "35–40 H / 656–661 M",
        deskripsi:
          "Ali, menantu sekaligus sepupu Nabi ﷺ, menghadapi masa penuh gejolak internal, termasuk Perang Jamal melawan pasukan yang dipimpin Aisyah, Thalhah, dan Zubair, serta Perang Shiffin melawan Muawiyah bin Abi Sufyan terkait tuntutan qisas atas kematian Utsman.",
      },
      {
        judul: "Peristiwa Tahkim dan Akhir Era Khulafaur Rasyidin",
        tahun: "37–40 H / 658–661 M",
        deskripsi:
          "Perang Shiffin berakhir dengan arbitrase (tahkim) yang kontroversial, memunculkan kelompok Khawarij yang keluar dari barisan Ali. Ali akhirnya wafat dibunuh oleh salah seorang Khawarij, menandai berakhirnya era Khulafaur Rasyidin dan dimulainya era Dinasti Umayyah di bawah Muawiyah bin Abi Sufyan.",
      },
    ],
  },
];

export default function SirahNabawiyahPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
            Perjalanan Risalah
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-4">
            Sirah Nabawiyah
          </h1>
          <p className="text-[var(--ink-soft)] leading-relaxed">
            Perjalanan hidup Nabi Muhammad ﷺ dan awal mula Islam, dari kondisi
            Jazirah Arab sebelum kenabian, wafatnya beliau, hingga masa
            Khulafaur Rasyidin, disusun secara kronologis per periode.
          </p>
        </div>

        <div className="space-y-10">
          {ERA.map((e) => (
            <section key={e.nomor}>
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-display text-sm text-[var(--gold)] tracking-widest">
                    {String(e.nomor).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-2xl text-[var(--ink)]">{e.judul}</h2>
                </div>
                <p className="text-xs uppercase tracking-wide text-[var(--heading)] mb-2">
                  {e.rentang}
                </p>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{e.ringkasan}</p>
              </div>

              <div className="space-y-4 border-l-2 border-[var(--parchment-line)] pl-5 ml-1">
                {e.peristiwa.map((p, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
                    <p className="text-sm font-semibold text-[var(--ink)]">
                      {p.judul}
                      {p.tahun && (
                        <span className="font-normal text-xs text-[var(--ink-soft)]"> &middot; {p.tahun}</span>
                      )}
                    </p>
                    <p className="text-sm text-[var(--ink-soft)] leading-relaxed mt-1">
                      {p.deskripsi}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
