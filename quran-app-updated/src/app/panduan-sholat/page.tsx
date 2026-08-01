import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Roundel from "@/components/Roundel";
import BackButton from "@/components/BackButton";

export const metadata = { title: "Panduan Sholat Lengkap — Mushaf" };

type Bacaan = {
  arab: string;
  latin: string;
  arti: string;
  catatan?: string;
};

type Gerakan = {
  nomor: number;
  judul: string;
  pose:
    | "berdiri"
    | "takbir"
    | "bersedekap"
    | "ruku"
    | "itidal"
    | "sujud"
    | "duduk-iftirasy"
    | "duduk-tawarruk"
    | "salam";
  deskripsiGerakan: string;
  bacaan?: Bacaan[];
};

const SYARAT_WAJIB = [
  "Beragama Islam",
  "Baligh dan berakal sehat",
  "Suci dari hadas besar dan hadas kecil",
];

const SYARAT_SAH = [
  "Suci badan, pakaian, dan tempat sholat dari najis",
  "Menutup aurat (laki-laki pusar hingga lutut, perempuan seluruh tubuh kecuali wajah dan telapak tangan)",
  "Telah masuk waktu sholat",
  "Menghadap kiblat (arah Ka'bah di Makkah)",
  "Mengetahui tata cara sholat, termasuk rukun dan yang membatalkan",
];

const NIAT_SHOLAT = [
  {
    nama: "Subuh",
    rakaat: 2,
    arab: "أُصَلِّي فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
    latin: "Ushallii fardhash shubhi rak'ataini mustaqbilal qiblati adaa'an lillaahi ta'aalaa",
    arti: "Aku niat sholat fardu Subuh dua rakaat menghadap kiblat, tunai, karena Allah Ta'ala.",
  },
  {
    nama: "Zuhur",
    rakaat: 4,
    arab: "أُصَلِّي فَرْضَ الظُّهْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
    latin: "Ushallii fardhazh zhuhri arba'a raka'aatin mustaqbilal qiblati adaa'an lillaahi ta'aalaa",
    arti: "Aku niat sholat fardu Zuhur empat rakaat menghadap kiblat, tunai, karena Allah Ta'ala.",
  },
  {
    nama: "Ashar",
    rakaat: 4,
    arab: "أُصَلِّي فَرْضَ الْعَصْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
    latin: "Ushallii fardhal 'ashri arba'a raka'aatin mustaqbilal qiblati adaa'an lillaahi ta'aalaa",
    arti: "Aku niat sholat fardu Ashar empat rakaat menghadap kiblat, tunai, karena Allah Ta'ala.",
  },
  {
    nama: "Maghrib",
    rakaat: 3,
    arab: "أُصَلِّي فَرْضَ الْمَغْرِبِ ثَلَاثَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
    latin: "Ushallii fardhal maghribi tsalaatsa raka'aatin mustaqbilal qiblati adaa'an lillaahi ta'aalaa",
    arti: "Aku niat sholat fardu Maghrib tiga rakaat menghadap kiblat, tunai, karena Allah Ta'ala.",
  },
  {
    nama: "Isya",
    rakaat: 4,
    arab: "أُصَلِّي فَرْضَ الْعِشَاءِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
    latin: "Ushallii fardhal 'isyaa'i arba'a raka'aatin mustaqbilal qiblati adaa'an lillaahi ta'aalaa",
    arti: "Aku niat sholat fardu Isya empat rakaat menghadap kiblat, tunai, karena Allah Ta'ala.",
  },
];

const GERAKAN: Gerakan[] = [
  {
    nomor: 1,
    judul: "Berdiri Tegak Menghadap Kiblat",
    pose: "berdiri",
    deskripsiGerakan:
      "Berdiri tegak bagi yang mampu, pandangan ke arah tempat sujud, badan menghadap kiblat. Niat sholat dilafalkan dalam hati sesuai sholat yang akan dikerjakan.",
  },
  {
    nomor: 2,
    judul: "Takbiratul Ihram",
    pose: "takbir",
    deskripsiGerakan:
      "Mengangkat kedua tangan sejajar telinga atau bahu, telapak tangan menghadap kiblat, sambil mengucapkan takbir. Sejak takbir ini, sholat dimulai dan segala perkara duniawi tertinggal.",
    bacaan: [
      { arab: "اللَّهُ أَكْبَرُ", latin: "Allaahu akbar", arti: "Allah Maha Besar." },
    ],
  },
  {
    nomor: 3,
    judul: "Bersedekap (Tangan di Dada)",
    pose: "bersedekap",
    deskripsiGerakan:
      "Tangan kanan diletakkan di atas pergelangan tangan kiri, keduanya diletakkan di dada. Lalu membaca doa iftitah, dilanjutkan Surat Al-Fatihah.",
    bacaan: [
      {
        arab:
          "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اللَّهُمَّ نَقِّنِي مِنَ الْخَطَايَا كَمَا يُنَقَّى الثَّوْبُ الْأَبْيَضُ مِنَ الدَّنَسِ، اللَّهُمَّ اغْسِلْنِي مِنْ خَطَايَايَ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ",
        latin:
          "Allaahumma baa'id bainii wa baina khathaayaaya kamaa baa'adta bainal masyriqi wal maghrib. Allaahumma naqqinii minal khathaayaa kamaa yunaqqats tsaubul abyadhu minad danas. Allaahummaghsilnii min khathaayaaya bil maa'i wats tsalji wal barad",
        arti:
          "Ya Allah, jauhkanlah antara aku dan kesalahan-kesalahanku sebagaimana Engkau menjauhkan antara timur dan barat. Ya Allah, bersihkanlah aku dari kesalahan sebagaimana kain putih dibersihkan dari kotoran. Ya Allah, cucilah aku dari kesalahan-kesalahanku dengan air, salju, dan embun.",
        catatan: "Doa iftitah — dibaca setelah takbiratul ihram, sebelum Al-Fatihah. Ada beberapa lafaz iftitah lain yang juga diajarkan Rasulullah ﷺ.",
      },
      {
        arab:
          "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ الرَّحْمَٰنِ الرَّحِيمِ مَالِكِ يَوْمِ الدِّينِ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        latin:
          "Bismillaahir rahmaanir rahiim. Alhamdu lillaahi rabbil 'aalamiin. Ar rahmaanir rahiim. Maaliki yaumid diin. Iyyaaka na'budu wa iyyaaka nasta'iin. Ihdinash shiraathal mustaqiim. Shiraathal ladziina an'amta 'alaihim ghairil maghdhuubi 'alaihim wa ladh dhaalliin",
        arti:
          "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang. Segala puji bagi Allah, Tuhan seluruh alam. Yang Maha Pengasih, Maha Penyayang. Pemilik hari pembalasan. Hanya kepada-Mu kami menyembah dan hanya kepada-Mu kami memohon pertolongan. Tunjukilah kami jalan yang lurus, (yaitu) jalan orang-orang yang telah Engkau beri nikmat, bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) mereka yang sesat.",
        catatan: "Surat Al-Fatihah — wajib dibaca setiap rakaat, menjadi rukun sholat.",
      },
      {
        arab: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
        latin: "Qul huwallaahu ahad. Allaahush shamad. Lam yalid wa lam yuulad. Wa lam yakun lahuu kufuwan ahad",
        arti: "Katakanlah, Dialah Allah Yang Maha Esa. Allah tempat meminta segala sesuatu. Dia tiada beranak dan tiada pula diperanakkan. Dan tidak ada seorang pun yang setara dengan Dia.",
        catatan: "Contoh surat pendek (QS. Al-Ikhlas) yang dibaca setelah Al-Fatihah pada rakaat pertama dan kedua; boleh diganti surat pendek lain yang dihafal.",
      },
    ],
  },
  {
    nomor: 4,
    judul: "Ruku'",
    pose: "ruku",
    deskripsiGerakan:
      "Mengangkat kedua tangan sambil bertakbir, lalu membungkukkan badan hingga punggung dan kepala rata (sejajar), kedua tangan memegang lutut dengan jari-jari terbuka, pandangan ke tempat sujud.",
    bacaan: [
      { arab: "اللَّهُ أَكْبَرُ", latin: "Allaahu akbar", arti: "Allah Maha Besar.", catatan: "Diucapkan saat turun ke ruku'." },
      {
        arab: "سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ",
        latin: "Subhaana rabbiyal 'azhiimi wa bihamdih",
        arti: "Mahasuci Tuhanku Yang Mahaagung, dan segala puji bagi-Nya.",
        catatan: "Dibaca tiga kali (atau lebih, ganjil) saat ruku'.",
      },
    ],
  },
  {
    nomor: 5,
    judul: "I'tidal (Bangkit dari Ruku')",
    pose: "itidal",
    deskripsiGerakan:
      "Bangkit dari ruku' hingga berdiri tegak kembali, mengangkat kedua tangan sejajar telinga, lalu tangan diturunkan lurus di samping badan.",
    bacaan: [
      { arab: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ", latin: "Sami'allaahu liman hamidah", arti: "Allah Maha Mendengar orang yang memuji-Nya.", catatan: "Diucapkan saat mulai bangkit dari ruku'." },
      {
        arab: "رَبَّنَا لَكَ الْحَمْدُ مِلْءَ السَّمَاوَاتِ وَمِلْءَ الْأَرْضِ وَمِلْءَ مَا شِئْتَ مِنْ شَيْءٍ بَعْدُ",
        latin: "Rabbanaa lakal hamdu mil'as samaawaati wa mil'al ardhi wa mil'a maa syi'ta min syai'in ba'du",
        arti: "Ya Tuhan kami, bagi-Mu segala puji, sepenuh langit dan sepenuh bumi, dan sepenuh apa saja yang Engkau kehendaki setelah itu.",
        catatan: "Dibaca setelah berdiri tegak i'tidal.",
      },
    ],
  },
  {
    nomor: 6,
    judul: "Sujud Pertama",
    pose: "sujud",
    deskripsiGerakan:
      "Turun ke posisi sujud sambil bertakbir: dahi, hidung, kedua telapak tangan, kedua lutut, dan ujung jari kedua kaki menempel di tempat sholat. Jari-jari tangan dan kaki menghadap kiblat.",
    bacaan: [
      { arab: "اللَّهُ أَكْبَرُ", latin: "Allaahu akbar", arti: "Allah Maha Besar.", catatan: "Diucapkan saat turun sujud." },
      {
        arab: "سُبْحَانَ رَبِّيَ الْأَعْلَى وَبِحَمْدِهِ",
        latin: "Subhaana rabbiyal a'laa wa bihamdih",
        arti: "Mahasuci Tuhanku Yang Mahatinggi, dan segala puji bagi-Nya.",
        catatan: "Dibaca tiga kali (atau lebih, ganjil) saat sujud.",
      },
    ],
  },
  {
    nomor: 7,
    judul: "Duduk di Antara Dua Sujud",
    pose: "duduk-iftirasy",
    deskripsiGerakan:
      "Bangkit dari sujud sambil bertakbir, duduk iftirasy: pantat di atas kaki kiri yang dilipat, kaki kanan ditegakkan, kedua tangan di atas paha.",
    bacaan: [
      { arab: "اللَّهُ أَكْبَرُ", latin: "Allaahu akbar", arti: "Allah Maha Besar.", catatan: "Diucapkan saat bangkit dari sujud." },
      {
        arab: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَارْفَعْنِي وَارْزُقْنِي وَاهْدِنِي وَعَافِنِي وَاعْفُ عَنِّي",
        latin: "Rabbighfir lii warhamnii wajburnii warfa'nii warzuqnii wahdinii wa 'aafinii wa'fu 'annii",
        arti: "Ya Tuhanku, ampunilah aku, sayangilah aku, cukupkanlah kekuranganku, angkatlah derajatku, berilah aku rezeki, berilah aku petunjuk, berilah aku kesehatan, dan maafkanlah aku.",
      },
    ],
  },
  {
    nomor: 8,
    judul: "Sujud Kedua",
    pose: "sujud",
    deskripsiGerakan:
      "Kembali sujud dengan tata cara yang sama seperti sujud pertama, sambil bertakbir saat turun.",
    bacaan: [
      { arab: "اللَّهُ أَكْبَرُ", latin: "Allaahu akbar", arti: "Allah Maha Besar." },
      {
        arab: "سُبْحَانَ رَبِّيَ الْأَعْلَى وَبِحَمْدِهِ",
        latin: "Subhaana rabbiyal a'laa wa bihamdih",
        arti: "Mahasuci Tuhanku Yang Mahatinggi, dan segala puji bagi-Nya.",
        catatan: "Dibaca tiga kali, sama seperti sujud pertama. Setelah ini, bangkit ke rakaat berikutnya (tanpa duduk) atau duduk tasyahud jika ini rakaat kedua/terakhir.",
      },
    ],
  },
  {
    nomor: 9,
    judul: "Duduk Tasyahud Awal",
    pose: "duduk-iftirasy",
    deskripsiGerakan:
      "Dilakukan pada rakaat kedua sholat yang berjumlah tiga atau empat rakaat. Duduk iftirasy, jari telunjuk kanan diangkat sedikit saat mengucap 'illallah' sebagai isyarat tauhid.",
    bacaan: [
      {
        arab:
          "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ",
        latin:
          "Attahiyyaatu lillaahi wash shalawaatu wath thayyibaat. Assalaamu 'alaika ayyuhan nabiyyu wa rahmatullaahi wa barakaatuh. Assalaamu 'alainaa wa 'alaa 'ibaadillaahish shaalihiin. Asyhadu an laa ilaaha illallaah, wa asyhadu anna Muhammadar rasuulullaah",
        arti:
          "Segala penghormatan, doa, dan kebaikan adalah bagi Allah. Semoga kesejahteraan, rahmat Allah, dan berkah-Nya tercurah kepadamu wahai Nabi. Semoga kesejahteraan tercurah kepada kami dan hamba-hamba Allah yang saleh. Aku bersaksi tiada Tuhan selain Allah, dan aku bersaksi bahwa Muhammad adalah utusan Allah.",
        catatan: "Setelah tasyahud awal, langsung bangkit (takbir) menuju rakaat berikutnya tanpa membaca sholawat.",
      },
    ],
  },
  {
    nomor: 10,
    judul: "Duduk Tasyahud Akhir",
    pose: "duduk-tawarruk",
    deskripsiGerakan:
      "Dilakukan pada rakaat terakhir. Duduk tawarruk: pantat menyentuh lantai, kaki kiri diselipkan di bawah kaki kanan, kaki kanan tegak, ujung jari menghadap kiblat.",
    bacaan: [
      {
        arab:
          "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ",
        latin:
          "Attahiyyaatu lillaahi wash shalawaatu wath thayyibaat. Assalaamu 'alaika ayyuhan nabiyyu wa rahmatullaahi wa barakaatuh. Assalaamu 'alainaa wa 'alaa 'ibaadillaahish shaalihiin. Asyhadu an laa ilaaha illallaah, wa asyhadu anna Muhammadar rasuulullaah",
        arti:
          "Segala penghormatan, doa, dan kebaikan adalah bagi Allah. Semoga kesejahteraan, rahmat Allah, dan berkah-Nya tercurah kepadamu wahai Nabi. Semoga kesejahteraan tercurah kepada kami dan hamba-hamba Allah yang saleh. Aku bersaksi tiada Tuhan selain Allah, dan aku bersaksi bahwa Muhammad adalah utusan Allah.",
      },
      {
        arab:
          "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ",
        latin:
          "Allaahumma shalli 'alaa Muhammad, wa 'alaa aali Muhammad, kamaa shallaita 'alaa Ibraahiima wa 'alaa aali Ibraahiim, innaka hamiidum majiid. Allaahumma baarik 'alaa Muhammad, wa 'alaa aali Muhammad, kamaa baarakta 'alaa Ibraahiima wa 'alaa aali Ibraahiim, innaka hamiidum majiid",
        arti:
          "Ya Allah, limpahkanlah rahmat kepada Nabi Muhammad dan keluarga Nabi Muhammad, sebagaimana Engkau telah melimpahkan rahmat kepada Nabi Ibrahim dan keluarga Nabi Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Mahamulia. Ya Allah, limpahkanlah berkah kepada Nabi Muhammad dan keluarga Nabi Muhammad, sebagaimana Engkau telah melimpahkan berkah kepada Nabi Ibrahim dan keluarga Nabi Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Mahamulia.",
        catatan: "Sholawat Ibrahimiyah — dibaca setelah tasyahud pada tasyahud akhir saja.",
      },
      {
        arab:
          "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ، وَمِنْ عَذَابِ الْقَبْرِ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ",
        latin:
          "Allaahumma innii a'uudzu bika min 'adzaabi jahannam, wa min 'adzaabil qabri, wa min fitnatil mahyaa wal mamaati, wa min syarri fitnatil masiihid dajjaal",
        arti:
          "Ya Allah, sesungguhnya aku berlindung kepada-Mu dari siksa neraka Jahanam, dari siksa kubur, dari fitnah kehidupan dan kematian, dan dari keburukan fitnah Al-Masih Dajjal.",
        catatan: "Doa perlindungan yang dianjurkan dibaca sebelum salam.",
      },
    ],
  },
  {
    nomor: 11,
    judul: "Salam",
    pose: "salam",
    deskripsiGerakan:
      "Menoleh ke kanan hingga pipi kanan terlihat dari belakang, mengucap salam, lalu menoleh ke kiri dengan bacaan yang sama. Salam menandai berakhirnya sholat.",
    bacaan: [
      {
        arab: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
        latin: "Assalaamu 'alaikum wa rahmatullaah",
        arti: "Semoga keselamatan dan rahmat Allah tercurah kepada kalian.",
        catatan: "Diucapkan dua kali: menoleh ke kanan, lalu ke kiri.",
      },
    ],
  },
];

type ButirJamaah = {
  judul: string;
  keterangan: string;
  bacaan?: { peran: string; arab: string; latin: string; arti: string }[];
};

const BACAAN_JAMAAH: ButirJamaah[] = [
  {
    judul: "Amin setelah Al-Fatihah",
    keterangan:
      "Imam membaca Al-Fatihah sampai selesai (pada sholat jahr, dibaca keras agar terdengar makmum). Begitu imam sampai di ujung ayat terakhir, imam dan makmum sama-sama mengucapkan \"Amin\". Pada sholat yang bacaannya dikeraskan (Subuh, dua rakaat pertama Maghrib & Isya, Jumat), amin ini juga dikeraskan bersama-sama, bukan hanya imam saja; pada sholat sirr (Dzuhur, Ashar), amin cukup dilirihkan seperti bacaan lainnya.",
    bacaan: [
      {
        peran: "Imam membaca (ayat terakhir Al-Fatihah)",
        arab: "غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        latin: "Ghairil maghdhuubi 'alaihim wa ladh dhaalliin",
        arti: "Bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.",
      },
      {
        peran: "Imam & makmum bersama",
        arab: "آمِينَ",
        latin: "Aamiin",
        arti: "Ya Allah, kabulkanlah (doa kami).",
      },
    ],
  },
  {
    judul: "Sami'allahu Liman Hamidah & Jawaban Makmum",
    keterangan:
      "Saat bangkit dari ruku', yang mengucapkan \"Sami'allaahu liman hamidah\" adalah imam dan orang yang sholat sendirian (munfarid). Makmum yang bermakmum di belakang imam cukup menjawabnya dengan \"Rabbanaa wa lakal hamd\" tanpa perlu mengucapkan \"Sami'allaahu liman hamidah\" terlebih dahulu (HR. Bukhari & Muslim). Munfarid mengucapkan keduanya sekaligus, sama seperti pada gerakan i'tidal di atas.",
    bacaan: [
      {
        peran: "Imam & munfarid",
        arab: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ",
        latin: "Sami'allaahu liman hamidah",
        arti: "Allah Maha Mendengar orang yang memuji-Nya.",
      },
      {
        peran: "Makmum",
        arab: "رَبَّنَا وَلَكَ الْحَمْدُ",
        latin: "Rabbanaa wa lakal hamd",
        arti: "Ya Tuhan kami, bagi-Mu segala puji.",
      },
    ],
  },
  {
    judul: "Bacaan Keras (Jahr) & Pelan (Sirr)",
    keterangan:
      "Imam mengeraskan bacaan Al-Fatihah dan surat pendek pada: seluruh rakaat sholat Subuh, dua rakaat pertama Maghrib dan Isya, serta sholat Jumat. Selain itu (Dzuhur, Ashar, dan rakaat ketiga/keempat Maghrib-Isya), bacaan dilirihkan (sirr), baik oleh imam maupun saat sholat sendirian.",
  },
  {
    judul: "Bacaan Makmum saat Imam Mengeraskan Suara",
    keterangan:
      "Ini termasuk masalah khilafiyah. Sebagian ulama (di antaranya mazhab Hanafi) berpendapat makmum cukup mendengarkan bacaan imam dan tidak membaca Al-Fatihah sendiri saat imam mengeraskan suara, berdalil dengan ayat \"apabila dibacakan Al-Qur'an maka dengarkanlah\" (QS. Al-A'raf: 204). Mazhab Syafi'i berpendapat makmum tetap wajib membaca Al-Fatihah secara lirih untuk dirinya sendiri, baik pada sholat jahr maupun sirr, karena Al-Fatihah adalah rukun sholat bagi setiap orang yang sholat.",
  },
  {
    judul: "Mengingatkan Imam yang Lupa",
    keterangan:
      "Bila imam tampak ragu, salah bacaan, atau lupa jumlah rakaat, makmum laki-laki mengingatkan dengan mengucapkan tasbih, sedangkan makmum perempuan mengingatkan dengan menepukkan punggung telapak tangan kanan ke telapak tangan kiri, bukan dengan berbicara.",
    bacaan: [
      {
        peran: "Makmum laki-laki",
        arab: "سُبْحَانَ اللَّهِ",
        latin: "Subhaanallaah",
        arti: "Mahasuci Allah.",
      },
    ],
  },
  {
    judul: "Takbir Intiqal (Perpindahan Gerakan)",
    keterangan:
      "Di setiap perpindahan gerakan, imam mengucapkan takbir (\"Allaahu akbar\") dengan suara cukup terdengar oleh seluruh makmum, kecuali saat bangkit dari ruku' yang menggunakan \"Sami'allaahu liman hamidah\", agar makmum tidak mendahului atau tertinggal jauh dari gerakan imam.",
  },
];

const JUMLAH_RAKAAT = [
  { waktu: "Subuh", rakaat: "2 rakaat", tasyahud: "1 kali tasyahud (langsung tasyahud akhir di rakaat ke-2)" },
  { waktu: "Zuhur", rakaat: "4 rakaat", tasyahud: "2 kali tasyahud (awal di rakaat ke-2, akhir di rakaat ke-4)" },
  { waktu: "Ashar", rakaat: "4 rakaat", tasyahud: "2 kali tasyahud (awal di rakaat ke-2, akhir di rakaat ke-4)" },
  { waktu: "Maghrib", rakaat: "3 rakaat", tasyahud: "2 kali tasyahud (awal di rakaat ke-2, akhir di rakaat ke-3)" },
  { waktu: "Isya", rakaat: "4 rakaat", tasyahud: "2 kali tasyahud (awal di rakaat ke-2, akhir di rakaat ke-4)" },
];

const SHOLAT_SUNNAH = [
  { nama: "Rawatib Qabliyah & Ba'diyah", keterangan: "Sholat sunnah sebelum/sesudah sholat wajib, misal 2 rakaat sebelum Subuh, 2 rakaat sebelum/sesudah Zuhur, 2 rakaat sesudah Maghrib dan Isya." },
  { nama: "Tahajud", keterangan: "Dikerjakan pada sepertiga malam terakhir setelah tidur, minimal 2 rakaat, dianjurkan diakhiri witir." },
  { nama: "Witir", keterangan: "Penutup sholat malam dengan jumlah rakaat ganjil (1, 3, 5, 7, dst), dikerjakan setelah Isya hingga sebelum Subuh." },
  { nama: "Dhuha", keterangan: "Dikerjakan di waktu pagi setelah matahari naik sepenggalah hingga menjelang Zuhur, minimal 2 rakaat." },
  { nama: "Tahiyatul Masjid", keterangan: "2 rakaat yang dikerjakan setiap kali masuk masjid, sebelum duduk." },
  { nama: "Istikharah", keterangan: "Dikerjakan saat membutuhkan petunjuk dalam mengambil keputusan, 2 rakaat diikuti doa istikharah." },
];

const DOA_QUNUT = {
  arab:
    "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِي وَلَا يُقْضَى عَلَيْكَ، وَإِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ، وَلَا يَعِزُّ مَنْ عَادَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ، فَلَكَ الْحَمْدُ عَلَى مَا قَضَيْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ، وَصَلَّى اللَّهُ عَلَى سَيِّدِنَا مُحَمَّدٍ النَّبِيِّ الْأُمِّيِّ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلَّمَ",
  latin:
    "Allaahummahdinii fiiman hadaiit, wa 'aafinii fiiman 'aafaiit, wa tawallanii fiiman tawallaiit, wa baarik lii fiimaa a'thaiit, wa qinii syarra maa qadhaiit, fa innaka taqdhii wa laa yuqdhaa 'alaiik, wa innahu laa yadzillu man waalaiit, wa laa ya'izzu man 'aadaiit, tabaarakta rabbanaa wa ta'aalaiit, falakal hamdu 'alaa maa qadhaiit, astaghfiruka wa atuubu ilaiik, wa shallallaahu 'alaa sayyidinaa Muhammadinin nabiyyil ummiyyi wa 'alaa aalihi wa shahbihi wa sallam",
  arti:
    "Ya Allah, tunjukilah aku sebagaimana orang yang telah Engkau tunjuki. Berilah aku kesehatan sebagaimana orang yang telah Engkau beri kesehatan. Peliharalah aku sebagaimana orang yang telah Engkau pelihara. Berkahilah untukku pada apa yang telah Engkau berikan. Peliharalah aku dari keburukan yang telah Engkau tetapkan, karena sesungguhnya Engkaulah yang menetapkan dan tidak ada yang menetapkan atas-Mu. Sesungguhnya tidak akan hina orang yang Engkau tolong, dan tidak akan mulia orang yang Engkau musuhi. Mahasuci Engkau, Ya Tuhan kami, dan Mahatinggi Engkau. Maka bagi-Mu segala puji atas apa yang telah Engkau tetapkan. Aku memohon ampun dan bertaubat kepada-Mu. Semoga Allah melimpahkan rahmat kepada junjungan kami Nabi Muhammad yang ummi beserta keluarga dan sahabatnya.",
};

const SUJUD_SAHWI = {
  penyebab: [
    "Lupa jumlah rakaat (kurang atau lebih) dan baru teringat setelah salam atau di tengah sholat",
    "Lupa membaca tasyahud awal dan sudah terlanjur berdiri",
    "Ragu jumlah rakaat yang telah dikerjakan dan tidak bisa memastikan mana yang lebih kuat",
    "Meninggalkan salah satu sunnah ab'adh dalam sholat (misalnya qunut atau tasyahud awal)",
  ],
  tataCara:
    "Dilakukan dengan dua kali sujud seperti sujud biasa, sebelum atau sesudah salam. Jika lupa karena kurang rakaat, sujud sahwi dilakukan sebelum salam; jika karena kelebihan rakaat, dilakukan setelah salam. Bacaan dalam sujud sahwi sama seperti bacaan sujud pada umumnya, dan boleh ditambah bacaan berikut.",
  bacaan: {
    arab: "سُبْحَانَ مَنْ لَا يَنَامُ وَلَا يَسْهُو",
    latin: "Subhaana man laa yanaamu wa laa yashuu",
    arti: "Mahasuci Zat yang tidak tidur dan tidak lupa.",
  },
};

const NIAT_SHOLAT_SUNNAH: { nama: string; arab: string; latin: string; arti: string }[] = [
  {
    nama: "Qabliyah Subuh (2 rakaat)",
    arab: "أُصَلِّي سُنَّةَ الصُّبْحِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
    latin: "Ushallii sunnatash shubhi rak'ataini lillaahi ta'aalaa",
    arti: "Aku niat sholat sunnah Subuh dua rakaat karena Allah Ta'ala.",
  },
  {
    nama: "Qabliyah Zuhur (2 rakaat)",
    arab: "أُصَلِّي سُنَّةَ الظُّهْرِ رَكْعَتَيْنِ قَبْلِيَّةً لِلَّهِ تَعَالَى",
    latin: "Ushallii sunnatazh zhuhri rak'ataini qabliyyatan lillaahi ta'aalaa",
    arti: "Aku niat sholat sunnah sebelum Zuhur dua rakaat karena Allah Ta'ala.",
  },
  {
    nama: "Ba'diyah Zuhur (2 rakaat)",
    arab: "أُصَلِّي سُنَّةَ الظُّهْرِ رَكْعَتَيْنِ بَعْدِيَّةً لِلَّهِ تَعَالَى",
    latin: "Ushallii sunnatazh zhuhri rak'ataini ba'diyyatan lillaahi ta'aalaa",
    arti: "Aku niat sholat sunnah sesudah Zuhur dua rakaat karena Allah Ta'ala.",
  },
  {
    nama: "Ba'diyah Maghrib (2 rakaat)",
    arab: "أُصَلِّي سُنَّةَ الْمَغْرِبِ رَكْعَتَيْنِ بَعْدِيَّةً لِلَّهِ تَعَالَى",
    latin: "Ushallii sunnatal maghribi rak'ataini ba'diyyatan lillaahi ta'aalaa",
    arti: "Aku niat sholat sunnah sesudah Maghrib dua rakaat karena Allah Ta'ala.",
  },
  {
    nama: "Ba'diyah Isya (2 rakaat)",
    arab: "أُصَلِّي سُنَّةَ الْعِشَاءِ رَكْعَتَيْنِ بَعْدِيَّةً لِلَّهِ تَعَالَى",
    latin: "Ushallii sunnatal 'isyaa-i rak'ataini ba'diyyatan lillaahi ta'aalaa",
    arti: "Aku niat sholat sunnah sesudah Isya dua rakaat karena Allah Ta'ala.",
  },
  {
    nama: "Tahajud",
    arab: "أُصَلِّي سُنَّةَ التَّهَجُّدِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
    latin: "Ushallii sunnatat tahajjudi rak'ataini lillaahi ta'aalaa",
    arti: "Aku niat sholat sunnah Tahajud dua rakaat karena Allah Ta'ala.",
  },
  {
    nama: "Witir (1 rakaat penutup)",
    arab: "أُصَلِّي سُنَّةَ الْوِتْرِ رَكْعَةً لِلَّهِ تَعَالَى",
    latin: "Ushallii sunnatal witri rak'atan lillaahi ta'aalaa",
    arti: "Aku niat sholat sunnah Witir satu rakaat karena Allah Ta'ala.",
  },
  {
    nama: "Dhuha (2 rakaat)",
    arab: "أُصَلِّي سُنَّةَ الضُّحَى رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
    latin: "Ushallii sunnatadh dhuhaa rak'ataini lillaahi ta'aalaa",
    arti: "Aku niat sholat sunnah Dhuha dua rakaat karena Allah Ta'ala.",
  },
  {
    nama: "Tahiyatul Masjid (2 rakaat)",
    arab: "أُصَلِّي سُنَّةَ تَحِيَّةِ الْمَسْجِدِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
    latin: "Ushallii sunnata tahiyyatil masjidi rak'ataini lillaahi ta'aalaa",
    arti: "Aku niat sholat sunnah Tahiyatul Masjid dua rakaat karena Allah Ta'ala.",
  },
  {
    nama: "Istikharah (2 rakaat)",
    arab: "أُصَلِّي سُنَّةَ الِاسْتِخَارَةِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
    latin: "Ushallii sunnatal istikhaarati rak'ataini lillaahi ta'aalaa",
    arti: "Aku niat sholat sunnah Istikharah dua rakaat karena Allah Ta'ala.",
  },
  {
    nama: "Qabliyah Ashar (2 rakaat)",
    arab: "أُصَلِّي سُنَّةَ الْعَصْرِ رَكْعَتَيْنِ قَبْلِيَّةً لِلَّهِ تَعَالَى",
    latin: "Ushallii sunnatal 'ashri rak'ataini qabliyyatan lillaahi ta'aalaa",
    arti: "Aku niat sholat sunnah sebelum Ashar dua rakaat karena Allah Ta'ala.",
  },
  {
    nama: "Qabliyah Isya (2 rakaat)",
    arab: "أُصَلِّي سُنَّةَ الْعِشَاءِ رَكْعَتَيْنِ قَبْلِيَّةً لِلَّهِ تَعَالَى",
    latin: "Ushallii sunnatal 'isyaa-i rak'ataini qabliyyatan lillaahi ta'aalaa",
    arti: "Aku niat sholat sunnah sebelum Isya dua rakaat karena Allah Ta'ala.",
  },
  {
    nama: "Tarawih (2 rakaat)",
    arab: "أُصَلِّي سُنَّةَ التَّرَاوِيحِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
    latin: "Ushallii sunnatat taraawiihi rak'ataini lillaahi ta'aalaa",
    arti: "Aku niat sholat sunnah Tarawih dua rakaat karena Allah Ta'ala.",
  },
  {
    nama: "Taubat (2 rakaat)",
    arab: "أُصَلِّي سُنَّةَ التَّوْبَةِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
    latin: "Ushallii sunnatat taubati rak'ataini lillaahi ta'aalaa",
    arti: "Aku niat sholat sunnah Taubat dua rakaat karena Allah Ta'ala.",
  },
  {
    nama: "Hajat (2 rakaat)",
    arab: "أُصَلِّي سُنَّةَ الْحَاجَةِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
    latin: "Ushallii sunnatal haajati rak'ataini lillaahi ta'aalaa",
    arti: "Aku niat sholat sunnah Hajat dua rakaat karena Allah Ta'ala.",
  },
  {
    nama: "Idul Fitri (2 rakaat)",
    arab: "أُصَلِّي سُنَّةَ عِيدِ الْفِطْرِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
    latin: "Ushallii sunnata 'iidil fithri rak'ataini lillaahi ta'aalaa",
    arti: "Aku niat sholat sunnah Idul Fitri dua rakaat karena Allah Ta'ala.",
  },
  {
    nama: "Idul Adha (2 rakaat)",
    arab: "أُصَلِّي سُنَّةَ عِيدِ الْأَضْحَى رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
    latin: "Ushallii sunnata 'iidil adhaa rak'ataini lillaahi ta'aalaa",
    arti: "Aku niat sholat sunnah Idul Adha dua rakaat karena Allah Ta'ala.",
  },
  {
    nama: "Mutlak (sholat sunnah tanpa sebab khusus, 2 rakaat)",
    arab: "أُصَلِّي سُنَّةً رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
    latin: "Ushallii sunnatan rak'ataini lillaahi ta'aalaa",
    arti: "Aku niat sholat sunnah dua rakaat karena Allah Ta'ala.",
  },
];

const PEMBATAL_SHOLAT = [
  "Berbicara dengan sengaja di luar bacaan sholat",
  "Makan atau minum dengan sengaja",
  "Bergerak berlebihan di luar gerakan sholat (tiga gerakan besar berturut-turut)",
  "Meninggalkan salah satu rukun sholat dengan sengaja",
  "Berhadas, baik hadas kecil maupun besar",
  "Terkena najis yang tidak segera dibersihkan",
  "Terbuka aurat dengan sengaja",
  "Tertawa terbahak-bahak hingga bersuara",
  "Murtad, keluar dari Islam",
];

export default function PanduanSholatPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <BackButton href="/" label="Beranda" />
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
            Tiang Agama
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-4">
            Panduan Sholat Lengkap
          </h1>
          <p className="text-[var(--ink-soft)] leading-relaxed">
            Tata cara sholat fardu lima waktu secara berurutan, mulai dari niat
            hingga salam, lengkap dengan bacaan Arab, transliterasi Latin, dan
            terjemahan Indonesia pada setiap gerakan.
          </p>
        </div>

        {/* Syarat */}
        <section className="mb-10">
          <h2 className="font-display text-xl text-[var(--ink)] mb-4">
            Syarat Wajib &amp; Syarat Sah Sholat
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-5">
              <h3 className="text-sm font-semibold text-[var(--heading)] mb-3">
                Syarat Wajib
              </h3>
              <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
                {SYARAT_WAJIB.map((s) => (
                  <li key={s} className="flex gap-2">
                    <span className="text-[var(--gold)]">&bull;</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-5">
              <h3 className="text-sm font-semibold text-[var(--heading)] mb-3">
                Syarat Sah
              </h3>
              <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
                {SYARAT_SAH.map((s) => (
                  <li key={s} className="flex gap-2">
                    <span className="text-[var(--gold)]">&bull;</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Jumlah rakaat */}
        <section className="mb-10">
          <h2 className="font-display text-xl text-[var(--ink)] mb-4">
            Jumlah Rakaat Sholat Fardu
          </h2>
          <div className="rounded-sm border border-[var(--parchment-line)] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[var(--parchment-deep)]">
                <tr>
                  <th className="text-left p-3 text-[var(--ink)]">Waktu</th>
                  <th className="text-left p-3 text-[var(--ink)]">Rakaat</th>
                  <th className="text-left p-3 text-[var(--ink)]">Tasyahud</th>
                </tr>
              </thead>
              <tbody>
                {JUMLAH_RAKAAT.map((j, i) => (
                  <tr
                    key={j.waktu}
                    className={i % 2 === 0 ? "bg-[var(--parchment)]" : "bg-[var(--parchment-deep)]/40"}
                  >
                    <td className="p-3 text-[var(--ink)] font-medium">{j.waktu}</td>
                    <td className="p-3 text-[var(--ink-soft)]">{j.rakaat}</td>
                    <td className="p-3 text-[var(--ink-soft)]">{j.tasyahud}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Niat */}
        <section className="mb-10">
          <h2 className="font-display text-xl text-[var(--ink)] mb-4">
            Niat Sholat Lima Waktu
          </h2>
          <div className="space-y-4">
            {NIAT_SHOLAT.map((n) => (
              <div
                key={n.nama}
                className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-5"
              >
                <p className="text-sm font-semibold text-[var(--heading)] mb-2">
                  Niat Sholat {n.nama} ({n.rakaat} Rakaat)
                </p>
                <p className="ayat-arabic text-xl md:text-2xl text-[var(--ink)] mb-2" dir="rtl">
                  {n.arab}
                </p>
                <p className="italic text-sm text-[var(--ink-soft)] mb-2">{n.latin}</p>
                <p className="text-sm text-[var(--ink)]">&ldquo;{n.arti}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gerakan */}
        <section className="mb-10">
          <h2 className="font-display text-xl text-[var(--ink)] mb-4">
            Tata Cara &amp; Bacaan Sholat, Langkah demi Langkah
          </h2>
          <div className="space-y-6">
            {GERAKAN.map((g) => (
              <div
                key={g.nomor}
                className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Roundel number={g.nomor} variant="teal" size={36} />
                  <h3 className="font-display text-lg text-[var(--ink)]">{g.judul}</h3>
                </div>
                <div className="flex gap-4 items-start mb-4">
                  <div className="shrink-0 rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment)] p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/gerakan/${g.pose}.png`}
                      alt={g.judul}
                      width={84}
                      height={96}
                      className="block"
                    />
                  </div>
                  <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                    {g.deskripsiGerakan}
                  </p>
                </div>
                {g.bacaan?.map((b, idx) => (
                  <div
                    key={idx}
                    className="border-t border-[var(--parchment-line)] pt-4 mt-4 first:border-t-0 first:pt-0 first:mt-0"
                  >
                    {b.catatan && (
                      <p className="text-xs uppercase tracking-wide text-[var(--gold)] mb-2">
                        {b.catatan}
                      </p>
                    )}
                    <p className="ayat-arabic text-xl md:text-2xl text-[var(--ink)] mb-2 leading-loose" dir="rtl">
                      {b.arab}
                    </p>
                    <p className="italic text-sm text-[var(--ink-soft)] mb-2">{b.latin}</p>
                    <p className="text-sm text-[var(--ink)]">&ldquo;{b.arti}&rdquo;</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Bacaan khusus imam & makmum */}
        <section className="mb-10">
          <h2 className="font-display text-xl text-[var(--ink)] mb-2">
            Bacaan Khusus Sholat Berjamaah (Imam &amp; Makmum)
          </h2>
          <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-4">
            Beberapa bacaan di atas sedikit berbeda perannya antara imam,
            makmum, dan orang yang sholat sendirian (munfarid). Berikut
            rinciannya.
          </p>
          <div className="space-y-5">
            {BACAAN_JAMAAH.map((j) => (
              <div
                key={j.judul}
                className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-6"
              >
                <h3 className="font-display text-lg text-[var(--ink)] mb-2">{j.judul}</h3>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-4">
                  {j.keterangan}
                </p>
                {j.bacaan?.map((b, idx) => (
                  <div
                    key={idx}
                    className="border-t border-[var(--parchment-line)] pt-4 mt-4 first:border-t-0 first:pt-0 first:mt-0"
                  >
                    <p className="text-xs uppercase tracking-wide text-[var(--gold)] mb-2">
                      {b.peran}
                    </p>
                    <p className="ayat-arabic text-xl md:text-2xl text-[var(--ink)] mb-2 leading-loose" dir="rtl">
                      {b.arab}
                    </p>
                    <p className="italic text-sm text-[var(--ink-soft)] mb-2">{b.latin}</p>
                    <p className="text-sm text-[var(--ink)]">&ldquo;{b.arti}&rdquo;</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Sholat sunnah */}
        <section className="mb-10">
          <h2 className="font-display text-xl text-[var(--ink)] mb-4">
            Sholat Sunnah yang Dianjurkan
          </h2>
          <div className="space-y-3">
            {SHOLAT_SUNNAH.map((s) => (
              <div
                key={s.nama}
                className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-4"
              >
                <p className="text-sm font-semibold text-[var(--heading)] mb-1">{s.nama}</p>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{s.keterangan}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Niat sholat sunnah */}
        <section className="mb-10">
          <h2 className="font-display text-xl text-[var(--ink)] mb-4">
            Niat Sholat Sunnah
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {NIAT_SHOLAT_SUNNAH.map((n) => (
              <div
                key={n.nama}
                className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-5"
              >
                <p className="text-sm font-semibold text-[var(--heading)] mb-2">{n.nama}</p>
                <p className="ayat-arabic text-lg md:text-xl text-[var(--ink)] mb-2" dir="rtl">
                  {n.arab}
                </p>
                <p className="italic text-xs text-[var(--ink-soft)] mb-2">{n.latin}</p>
                <p className="text-sm text-[var(--ink)]">&ldquo;{n.arti}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>

        {/* Doa Qunut */}
        <section className="mb-10">
          <h2 className="font-display text-xl text-[var(--ink)] mb-4">
            Doa Qunut Subuh
          </h2>
          <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-4">
            Dibaca pada i&apos;tidal rakaat kedua sholat Subuh, sebelum sujud.
            Menurut mazhab Syafi&apos;i, qunut Subuh hukumnya sunnah ab&apos;adh
            sehingga bila tertinggal disunnahkan menggantinya dengan sujud sahwi.
          </p>
          <div className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-6">
            <p className="ayat-arabic text-xl md:text-2xl text-[var(--ink)] mb-2 leading-loose" dir="rtl">
              {DOA_QUNUT.arab}
            </p>
            <p className="italic text-sm text-[var(--ink-soft)] mb-2">{DOA_QUNUT.latin}</p>
            <p className="text-sm text-[var(--ink)]">&ldquo;{DOA_QUNUT.arti}&rdquo;</p>
          </div>
        </section>

        {/* Sujud Sahwi */}
        <section className="mb-10">
          <h2 className="font-display text-xl text-[var(--ink)] mb-4">
            Sujud Sahwi
          </h2>
          <div className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-6">
            <h3 className="text-sm font-semibold text-[var(--heading)] mb-3">
              Penyebab Disunnahkannya Sujud Sahwi
            </h3>
            <ul className="space-y-2 text-sm text-[var(--ink-soft)] mb-4">
              {SUJUD_SAHWI.penyebab.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-[var(--gold)]">&bull;</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-4">
              {SUJUD_SAHWI.tataCara}
            </p>
            <div className="border-t border-[var(--parchment-line)] pt-4">
              <p className="ayat-arabic text-xl md:text-2xl text-[var(--ink)] mb-2 leading-loose" dir="rtl">
                {SUJUD_SAHWI.bacaan.arab}
              </p>
              <p className="italic text-sm text-[var(--ink-soft)] mb-2">{SUJUD_SAHWI.bacaan.latin}</p>
              <p className="text-sm text-[var(--ink)]">&ldquo;{SUJUD_SAHWI.bacaan.arti}&rdquo;</p>
            </div>
          </div>
        </section>

        {/* Pembatal */}
        <section>
          <h2 className="font-display text-xl text-[var(--ink)] mb-4">
            Hal-Hal yang Membatalkan Sholat
          </h2>
          <div className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-5">
            <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
              {PEMBATAL_SHOLAT.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-[var(--gold)]">&bull;</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
