export type Bacaan = {
  judul: string;
  arab: string;
  latin: string;
  arti: string;
  ulangan?: string;
  keterangan?: string;
};

// Kalimat thayyibah yang dibaca setelah rangkaian ayat dalam susunan tahlil.
export const KALIMAT_TAHLIL: Bacaan[] = [
  {
    judul: "Istighfar",
    arab: "أَسْتَغْفِرُ اللهَ الْعَظِيمَ",
    latin: "Astaghfirullaahal 'azhiim",
    arti: "Aku memohon ampun kepada Allah Yang Maha Agung.",
    ulangan: "3× atau lebih",
  },
  {
    judul: "Sholawat Nabi",
    arab: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ",
    latin: "Allaahumma shalli 'alaa sayyidinaa Muhammad wa 'alaa aali sayyidinaa Muhammad",
    arti: "Ya Allah, limpahkanlah shalawat kepada junjungan kami Nabi Muhammad dan kepada keluarga junjungan kami Nabi Muhammad.",
  },
  {
    judul: "Tahlil",
    arab: "لَا إِلَٰهَ إِلَّا اللَّهُ",
    latin: "Laa ilaaha illallaah",
    arti: "Tiada Tuhan selain Allah.",
    ulangan: "33× atau 100×",
  },
  {
    judul: "Tasbih, Tahmid & Takbir",
    arab: "سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَاللَّهُ أَكْبَرُ",
    latin: "Subhaanallaah, walhamdulillaah, wallaahu akbar",
    arti: "Maha Suci Allah, segala puji bagi Allah, dan Allah Maha Besar.",
    ulangan: "33× masing-masing",
  },
  {
    judul: "Tahlil Penutup & Hawqalah",
    arab: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ",
    latin: "Laa ilaaha illallaahu wahdahu laa syariika lah, lahul mulku wa lahul hamdu yuhyii wa yumiitu wa huwa 'alaa kulli syai-in qadiir, wa laa hawla wa laa quwwata illaa billaahil 'aliyyil 'azhiim",
    arti: "Tiada Tuhan selain Allah semata, tiada sekutu bagi-Nya, milik-Nya segala kerajaan dan pujian, Dia yang menghidupkan dan mematikan, dan Dia Maha Kuasa atas segala sesuatu. Tiada daya dan kekuatan kecuali dengan pertolongan Allah Yang Mahatinggi lagi Mahaagung.",
  },
];

// Doa penutup rangkaian tahlil (doa arwah / doa tahlil).
export const DOA_TAHLIL: Bacaan[] = [
  {
    judul: "Doa untuk yang Diniatkan",
    arab: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ",
    latin: "Allaahummaghfir lahu warhamhu wa 'aafihi wa'fu 'anhu",
    arti: "Ya Allah, ampunilah dia, rahmatilah dia, sejahterakanlah dia, dan maafkanlah dia.",
    keterangan:
      "Diambil dari doa jenazah yang diriwayatkan dalam Shahih Muslim; kata ganti dapat diubah sesuai jumlah dan jenis kelamin yang didoakan.",
  },
  {
    judul: "Doa untuk Seluruh Kaum Muslimin",
    arab: "اللَّهُمَّ اغْفِرْ لِلْمُسْلِمِينَ وَالْمُسْلِمَاتِ وَالْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ الْأَحْيَاءِ مِنْهُمْ وَالْأَمْوَاتِ",
    latin: "Allaahummaghfir lil muslimiina wal muslimaati wal mu'miniina wal mu'minaati, al-ahyaa-i minhum wal amwaat",
    arti: "Ya Allah, ampunilah kaum muslimin dan muslimat, orang-orang mukmin dan mukminat, baik yang masih hidup maupun yang telah wafat.",
  },
  {
    judul: "Doa Kebaikan Dunia Akhirat",
    arab: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    latin: "Rabbanaa aatinaa fid-dunyaa hasanah, wa fil aakhirati hasanah, wa qinaa 'adzaaban naar",
    arti: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan peliharalah kami dari siksa neraka. (QS. Al-Baqarah: 201)",
  },
];

export type AcaraLainnya = {
  slug: string;
  nama: string;
  kapan: string;
  penjelasan: string;
  bacaan: string[];
  catatan?: string;
};

// Panduan ringkas untuk berbagai acara/majelis yang umum dijumpai dalam
// tradisi masyarakat muslim Indonesia. Sebagian merupakan praktik budaya
// (bukan ritual baku syariat) sehingga dicantumkan catatan khilafiyah
// bila ada perbedaan pandangan ulama tentangnya.
export const ACARA_LAINNYA: AcaraLainnya[] = [
  {
    slug: "tahlilan-kematian",
    nama: "Tahlilan / Kenduri Kematian",
    kapan: "Umumnya malam ke-1 s.d. 7, hari ke-40, ke-100, ke-1000, dan haul (peringatan tahunan)",
    penjelasan:
      "Kumpulan keluarga, tetangga, dan kerabat untuk mendoakan seseorang yang telah wafat, biasanya diakhiri dengan sedekah makanan dari tuan rumah.",
    bacaan: [
      "Susunan tahlil lengkap (lihat di atas)",
      "Surat Yasin",
      "Doa arwah / doa tahlil",
    ],
    catatan:
      "Praktik ini populer di kalangan Nahdlatul Ulama dan sebagian besar masyarakat muslim Indonesia, dengan dalil umum tentang pahala sedekah dan doa yang sampai kepada mayit. Sebagian ulama, termasuk sebagian kalangan Muhammadiyah dan Salafi, memandang berkumpul khusus di rumah duka dengan jadwal tertentu (3, 7, 40, 100 hari) tidak dicontohkan Nabi ﷺ dan lebih dekat pada kebiasaan (adat), sehingga tetap membolehkan mendoakan mayit tanpa terikat jadwal tersebut.",
  },
  {
    slug: "yasinan",
    nama: "Yasinan",
    kapan: "Malam Jumat, atau majelis mingguan/bulanan warga",
    penjelasan:
      "Membaca Surat Yasin secara berjamaah, sering digabung dengan tahlil dan doa bersama sebagai bentuk dzikir dan silaturahmi warga.",
    bacaan: ["Surat Yasin", "Kalimat thayyibah", "Doa bersama"],
    catatan:
      "Lihat juga halaman Amalan Malam Jumat untuk penjelasan dalil tentang keutamaan membaca Yasin di malam Jumat.",
  },
  {
    slug: "maulid-nabi",
    nama: "Maulid Nabi (Muludan)",
    kapan: "12 Rabiul Awal, atau sepanjang bulan Rabiul Awal",
    penjelasan:
      "Memperingati kelahiran Nabi Muhammad ﷺ dengan membaca riwayat hidup dan sifat-sifat mulia beliau, biasanya diiringi sholawat.",
    bacaan: [
      "Syair Al-Barzanji, Ad-Diba'i, atau Simtud Durar (riwayat kelahiran Nabi ﷺ)",
      "Sholawat Nabi secara berjamaah",
      "Ceramah tentang akhlak dan sirah Nabi ﷺ",
    ],
    catatan:
      "Peringatan Maulid tidak dilakukan pada masa Nabi ﷺ maupun tiga generasi awal, sehingga sebagian ulama menilainya bid'ah yang perlu dihindari, sementara ulama lain (termasuk sebagian ulama Syafi'iyah) membolehkannya selama isinya berupa sholawat, kisah Nabi ﷺ, dan kebaikan, tanpa unsur yang menyalahi syariat.",
  },
  {
    slug: "isra-miraj",
    nama: "Isra Mi'raj",
    kapan: "27 Rajab",
    penjelasan:
      "Memperingati perjalanan malam Nabi Muhammad ﷺ dari Masjidil Haram ke Masjidil Aqsa lalu naik ke langit, peristiwa turunnya perintah sholat lima waktu.",
    bacaan: [
      "Kisah Isra Mi'raj (bisa dibaca di halaman Sirah Nabawiyah)",
      "Sholawat Nabi",
      "Doa dan ceramah tentang hikmah sholat",
    ],
  },
  {
    slug: "nuzulul-quran",
    nama: "Nuzulul Qur'an",
    kapan: "17 Ramadhan",
    penjelasan:
      "Memperingati turunnya wahyu pertama Al-Qur'an kepada Nabi Muhammad ﷺ, biasa diisi dengan tadarus dan tausiyah.",
    bacaan: [
      "Tadarus/khataman Al-Qur'an",
      "Doa khatam Qur'an",
      "Ceramah tentang keutamaan Al-Qur'an",
    ],
  },
  {
    slug: "rajaban",
    nama: "Rajaban",
    kapan: "Sepanjang bulan Rajab, khususnya awal dan pertengahan bulan",
    penjelasan:
      "Majelis dzikir dan doa menyambut bulan Rajab sebagai salah satu dari empat bulan haram, sekaligus persiapan menyambut Ramadhan.",
    bacaan: [
      "Doa awal, pertengahan, dan akhir Rajab",
      "Kalimat thayyibah dan istighfar",
      "Puasa sunnah (bagi yang ingin mengamalkan)",
    ],
    catatan:
      "Hadits yang secara khusus menyebut keutamaan doa atau amalan tertentu di bulan Rajab banyak dinilai lemah oleh ahli hadits, meski keutamaan Rajab sebagai bulan haram disebut dalam Al-Qur'an (QS. At-Taubah: 36).",
  },
  {
    slug: "nisfu-syaban",
    nama: "Nisfu Sya'ban",
    kapan: "Malam 15 Sya'ban",
    penjelasan:
      "Malam pertengahan bulan Sya'ban yang oleh sebagian masyarakat diisi dengan membaca Surat Yasin tiga kali dengan niat berbeda-beda, dilanjutkan doa khusus.",
    bacaan: [
      "Surat Yasin 3× (niat panjang umur dalam ketaatan, ditolak bala, dan kecukupan rezeki dengan hati tidak bergantung selain Allah)",
      "Doa Nisfu Sya'ban",
      "Istighfar dan sholawat",
    ],
    catatan:
      "Praktik membaca Yasin tiga kali dengan niat khusus di malam ini adalah tradisi lokal tanpa dalil khusus yang shahih, sehingga sebagian ulama tidak menganjurkannya, sementara keutamaan bulan Sya'ban secara umum (memperbanyak puasa sunnah dan amal) disebutkan dalam beberapa hadits.",
  },
  {
    slug: "khataman-quran",
    nama: "Khataman Al-Qur'an",
    kapan: "Setelah menyelesaikan bacaan 30 juz, sering diadakan di penghujung Ramadhan",
    penjelasan:
      "Majelis syukuran setelah selesai membaca Al-Qur'an 30 juz secara pribadi atau berjamaah (tadarus).",
    bacaan: [
      "Doa khatam Qur'an",
      "Sholawat Nabi",
      "Sedekah/syukuran (jika diadakan)",
    ],
  },
  {
    slug: "akikah",
    nama: "Akikah",
    kapan: "Idealnya hari ke-7 setelah kelahiran anak",
    penjelasan:
      "Penyembelihan hewan (2 ekor kambing untuk anak laki-laki, 1 ekor untuk anak perempuan) sebagai bentuk syukur atas kelahiran, biasanya disertai pemberian nama dan cukur rambut bayi.",
    bacaan: [
      "Doa akikah saat penyembelihan",
      "Sholawat Nabi",
      "Doa untuk bayi dan orang tua",
    ],
  },
  {
    slug: "walimah",
    nama: "Walimah (Syukuran Pernikahan)",
    kapan: "Setelah akad nikah",
    penjelasan:
      "Jamuan yang dianjurkan Nabi ﷺ untuk mengumumkan dan mensyukuri pernikahan.",
    bacaan: [
      "Doa untuk pengantin: Baarakallaahu laka wa baaraka 'alaika wa jama'a bainakumaa fii khair",
      "Sholawat Nabi",
      "Nasihat pernikahan (mau'izhah)",
    ],
  },
  {
    slug: "tasyakuran",
    nama: "Tasyakuran / Syukuran",
    kapan: "Rumah baru, kelulusan, kesembuhan, atau nikmat lain",
    penjelasan:
      "Ungkapan syukur atas nikmat tertentu, biasa diisi doa bersama dan sedekah makanan kepada tetangga atau kerabat.",
    bacaan: [
      "Doa syukur dan doa masuk rumah (untuk rumah baru)",
      "Kalimat thayyibah",
      "Doa selamat dunia akhirat",
    ],
  },
];
