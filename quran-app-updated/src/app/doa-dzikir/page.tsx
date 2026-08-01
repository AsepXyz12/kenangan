import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Doa & Dzikir Harian — Mushaf" };

type Doa = {
  judul: string;
  arab: string;
  latin: string;
  arti: string;
  keterangan?: string;
};

function Kartu({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--parchment-line)] bg-[var(--parchment)] p-5 md:p-6">
      {children}
    </div>
  );
}

function DoaCard({ d }: { d: Doa }) {
  return (
    <Kartu>
      <h3 className="font-medium text-[var(--ink)] mb-2">{d.judul}</h3>
      <p dir="rtl" className="font-arabic text-xl md:text-2xl leading-loose text-[var(--ink)]">
        {d.arab}
      </p>
      <p className="text-sm italic text-[var(--ink-soft)] mt-2">{d.latin}</p>
      <p className="text-sm text-[var(--ink-soft)] mt-1">&ldquo;{d.arti}&rdquo;</p>
      {d.keterangan && (
        <p className="text-xs text-[var(--ink-soft)] mt-2 border-t border-[var(--parchment-line)] pt-2">
          {d.keterangan}
        </p>
      )}
    </Kartu>
  );
}

const DOA_BANGUN_TIDUR: Doa = {
  judul: "Doa Bangun Tidur",
  arab: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
  latin: "Alhamdulillaahil ladzii ahyaanaa ba'da maa amaatanaa wa ilaihin nusyuur",
  arti: "Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami (tidur), dan hanya kepada-Nya kami kembali.",
};

const DOA_SEBELUM_TIDUR: Doa = {
  judul: "Doa Sebelum Tidur",
  arab: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
  latin: "Bismika Allaahumma amuutu wa ahyaa",
  arti: "Dengan nama-Mu ya Allah, aku mati (tidur) dan aku hidup (bangun).",
};

const DOA_MASUK_KAMAR_MANDI: Doa = {
  judul: "Doa Masuk Kamar Mandi/WC",
  arab: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
  latin: "Allaahumma innii a'uudzu bika minal khubutsi wal khabaa-its",
  arti: "Ya Allah, sesungguhnya aku berlindung kepada-Mu dari godaan setan laki-laki dan setan perempuan.",
};

const DOA_KELUAR_KAMAR_MANDI: Doa = {
  judul: "Doa Keluar Kamar Mandi/WC",
  arab: "غُفْرَانَكَ",
  latin: "Ghufraanak",
  arti: "Aku memohon ampunan-Mu.",
};

const DOA_SEBELUM_MAKAN: Doa = {
  judul: "Doa Sebelum Makan",
  arab: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
  latin: "Allaahumma baarik lanaa fiimaa razaqtanaa wa qinaa 'adzaaban naar",
  arti: "Ya Allah, berkahilah kami pada rezeki yang Engkau berikan kepada kami, dan peliharalah kami dari azab neraka.",
};

const DOA_SETELAH_MAKAN: Doa = {
  judul: "Doa Setelah Makan",
  arab: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
  latin: "Alhamdulillaahil ladzii ath'amanaa wa saqaanaa wa ja'alanaa muslimiin",
  arti: "Segala puji bagi Allah yang telah memberi kami makan dan minum, serta menjadikan kami sebagai orang-orang muslim.",
};

const DOA_KELUAR_RUMAH: Doa = {
  judul: "Doa Keluar Rumah",
  arab: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
  latin: "Bismillaahi tawakkaltu 'alallaahi wa laa hawla wa laa quwwata illaa billaah",
  arti: "Dengan nama Allah, aku bertawakal kepada Allah, tiada daya dan kekuatan kecuali dengan pertolongan Allah.",
};

const DOA_MASUK_RUMAH: Doa = {
  judul: "Doa Masuk Rumah",
  arab: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ وَخَيْرَ الْمَخْرَجِ، بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
  latin: "Allaahumma innii as-aluka khairal maulaji wa khairal makhraji, bismillaahi walajnaa wa bismillaahi kharajnaa wa 'alallaahi rabbinaa tawakkalnaa",
  arti: "Ya Allah, aku memohon kepada-Mu kebaikan saat masuk dan kebaikan saat keluar. Dengan nama Allah kami masuk, dengan nama Allah kami keluar, dan hanya kepada Allah Tuhan kami, kami bertawakal.",
};

const DOA_MASUK_MASJID: Doa = {
  judul: "Doa Masuk Masjid",
  arab: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
  latin: "Allaahummaftah lii abwaaba rahmatik",
  arti: "Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.",
};

const DOA_KELUAR_MASJID: Doa = {
  judul: "Doa Keluar Masjid",
  arab: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
  latin: "Allaahumma innii as-aluka min fadhlik",
  arti: "Ya Allah, sesungguhnya aku memohon kepada-Mu dari karunia-Mu.",
};

const DOA_BEPERGIAN: Doa = {
  judul: "Doa Naik Kendaraan / Bepergian",
  arab: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ",
  latin: "Subhaanal ladzii sakhkhara lanaa haadzaa wa maa kunnaa lahuu muqriniin, wa innaa ilaa rabbinaa lamunqalibuun",
  arti: "Mahasuci Allah yang telah menundukkan semua ini bagi kami, padahal kami sebelumnya tidak mampu menguasainya. Dan sesungguhnya kami akan kembali kepada Tuhan kami.",
  keterangan: "QS. Az-Zukhruf: 13-14",
};

const DOA_UNTUK_ORANG_TUA: Doa = {
  judul: "Doa untuk Kedua Orang Tua",
  arab: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
  latin: "Rabbir hamhumaa kamaa rabbayaanii shaghiiraa",
  arti: "Ya Tuhanku, kasihilah keduanya sebagaimana mereka telah mendidikku sewaktu kecil.",
  keterangan: "QS. Al-Isra: 24",
};

const DOA_PENUTUP_MAJELIS: Doa = {
  judul: "Doa Kafaratul Majelis (Penutup Majelis)",
  arab: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا أَنْتَ أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
  latin: "Subhaanaka Allaahumma wa bihamdika asyhadu allaa ilaaha illaa anta astaghfiruka wa atuubu ilaik",
  arti: "Mahasuci Engkau ya Allah, dan dengan memuji-Mu aku bersaksi bahwa tiada Tuhan selain Engkau, aku memohon ampun dan bertobat kepada-Mu.",
};

const DZIKIR_SETELAH_SHOLAT: Doa[] = [
  {
    judul: "Istighfar (3x)",
    arab: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ",
    latin: "Astaghfirullaahal 'azhiim",
    arti: "Aku memohon ampun kepada Allah Yang Maha Agung.",
  },
  {
    judul: "Doa Setelah Istighfar",
    arab: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
    latin: "Allaahumma antas salaam wa minkas salaam tabaarakta yaa dzal jalaali wal ikraam",
    arti: "Ya Allah, Engkaulah Zat Yang Maha Sejahtera, dan dari-Mu segala kesejahteraan. Mahasuci Engkau, wahai Zat Yang memiliki keagungan dan kemuliaan.",
  },
  {
    judul: "Tasbih, Tahmid, Takbir (33x-33x-33x, disempurnakan 100 dengan Tahlil)",
    arab: "سُبْحَانَ اللَّهِ (33x) الْحَمْدُ لِلَّهِ (33x) اللَّهُ أَكْبَرُ (33x) لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    latin: "Subhaanallaah (33x), Alhamdulillaah (33x), Allaahu akbar (33x), Laa ilaaha illallaahu wahdahu laa syariika lah, lahul mulku wa lahul hamdu wa huwa 'alaa kulli syai-in qadiir",
    arti: "Mahasuci Allah (33x), Segala puji bagi Allah (33x), Allah Maha Besar (33x), Tiada Tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya, milik-Nya segala kerajaan dan pujian, dan Dia Maha Kuasa atas segala sesuatu.",
  },
  {
    judul: "Ayat Kursi",
    arab: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
    latin: "Allaahu laa ilaaha illaa huwal hayyul qayyuum, laa ta'khudzuhuu sinatuw wa laa nauum...",
    arti: "Allah, tiada Tuhan selain Dia, Yang Maha Hidup, Yang terus-menerus mengurus makhluk-Nya, tidak mengantuk dan tidak tidur... (QS. Al-Baqarah: 255, dibaca lengkap satu ayat).",
    keterangan: "Dibaca lengkap satu ayat penuh setelah sholat fardu, salah satu dzikir paling utama.",
  },
  {
    judul: "Doa Memohon Keselamatan",
    arab:
      "اللَّهُمَّ إِنِّي أَسْأَلُكَ سَلَامَةً فِي الدِّينِ، وَعَافِيَةً فِي الْجَسَدِ، وَزِيَادَةً فِي الْعِلْمِ، وَبَرَكَةً فِي الرِّزْقِ، وَتَوْبَةً قَبْلَ الْمَوْتِ، وَرَحْمَةً عِنْدَ الْمَوْتِ، وَمَغْفِرَةً بَعْدَ الْمَوْتِ، اللَّهُمَّ هَوِّنْ عَلَيْنَا فِي سَكَرَاتِ الْمَوْتِ، وَالنَّجَاةَ مِنَ النَّارِ، وَالْعَفْوَ عِنْدَ الْحِسَابِ",
    latin:
      "Allaahumma innii as-aluka salaamatan fid-diin, wa 'aafiyatan fil jasad, wa ziyaadatan fil 'ilmi, wa barakatan fir rizqi, wa taubatan qablal maut, wa rahmatan 'indal maut, wa maghfiratan ba'dal maut. Allaahumma hawwin 'alainaa fii sakaraatil maut, wan najaata minan naar, wal 'afwa 'indal hisaab",
    arti:
      "Ya Allah, sesungguhnya aku memohon kepada-Mu keselamatan dalam agama, kesehatan pada jasad, bertambahnya ilmu, keberkahan rezeki, taubat sebelum mati, rahmat ketika mati, dan ampunan setelah mati. Ya Allah, mudahkanlah bagi kami sakaratul maut, keselamatan dari api neraka, dan ampunan saat hisab.",
    keterangan:
      "Doa yang populer dibaca setelah dzikir sholat maupun di majelis-majelis. Sanadnya dinilai lemah (da'if) oleh sebagian ahli hadits, namun kandungan maknanya — memohon keselamatan agama, kesehatan, ilmu, rezeki, dan husnul khatimah — sejalan dengan doa-doa yang shahih, sehingga tetap banyak diamalkan.",
  },
];

const DZIKIR_PAGI: Doa[] = [
  {
    judul: "Sayyidul Istighfar",
    arab: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    latin: "Allaahumma anta rabbii laa ilaaha illaa anta khalaqtanii wa ana 'abduka wa ana 'alaa 'ahdika wa wa'dika mastatha'tu, a'uudzu bika min syarri maa shana'tu, abuu-u laka bini'matika 'alayya wa abuu-u bidzanbii faghfirlii fa-innahu laa yaghfirudz dzunuuba illaa anta",
    arti: "Ya Allah, Engkau adalah Tuhanku, tiada Tuhan selain Engkau. Engkau menciptakanku dan aku adalah hamba-Mu. Aku akan setia pada perjanjian dan janjiku pada-Mu semampuku. Aku berlindung kepada-Mu dari keburukan yang aku perbuat. Aku mengakui nikmat-Mu padaku dan aku mengakui dosaku, maka ampunilah aku, sesungguhnya tiada yang mengampuni dosa selain Engkau.",
    keterangan: "Dibaca sekali di pagi hari, dianjurkan juga di petang hari.",
  },
  {
    judul: "Dzikir Pagi (Perlindungan Harian)",
    arab: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    latin: "Ashbahnaa wa ashbahal mulku lillaah, walhamdu lillaah, laa ilaaha illallaahu wahdahu laa syariika lah",
    arti: "Kami memasuki waktu pagi dan kerajaan hanya milik Allah, segala puji bagi Allah, tiada Tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya.",
    keterangan: "Dibaca di pagi hari; untuk petang diganti kata 'Ashbahnaa' menjadi 'Amsainaa' (kami memasuki waktu petang).",
  },
  {
    judul: "Ta'awwudz Perlindungan (3x pagi & petang)",
    arab: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    latin: "A'uudzu bikalimaatillaahit taammaati min syarri maa khalaq",
    arti: "Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk yang Dia ciptakan.",
  },
];

const TIGA_QUL = {
  judul: "Al-Ikhlas, Al-Falaq, An-Nas (dibaca 3x pagi & petang)",
  keterangan: "Membaca surah Al-Ikhlas, Al-Falaq, dan An-Nas masing-masing tiga kali adalah sunnah rutin dzikir pagi dan petang untuk memohon perlindungan Allah. Teks lengkap ketiga surah dapat dibaca di halaman Al-Qur'an.",
};

const DOA_BERSIN: Doa = {
  judul: "Doa Ketika Bersin & Menjawabnya",
  arab: "الْحَمْدُ لِلَّهِ",
  latin: "Alhamdulillaah",
  arti: "Segala puji bagi Allah.",
  keterangan:
    "Diucapkan orang yang bersin. Orang yang mendengarnya menjawab 'Yarhamukallaah' (semoga Allah merahmatimu), lalu yang bersin membalas 'Yahdiikumullaahu wa yushlihu baalakum' (semoga Allah memberi petunjuk dan memperbaiki keadaanmu).",
};

const DOA_HUJAN_TURUN: Doa = {
  judul: "Doa Ketika Hujan Turun",
  arab: "اللَّهُمَّ صَيِّبًا نَافِعًا",
  latin: "Allaahumma shayyiban naafi'aa",
  arti: "Ya Allah, jadikanlah hujan ini yang bermanfaat.",
};

const DOA_MUSIBAH: Doa = {
  judul: "Doa Ketika Tertimpa Musibah (Istirja')",
  arab: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا",
  latin: "Innaa lillaahi wa innaa ilaihi raaji'uun. Allaahumma'jurnii fii mushiibatii wa akhlif lii khairan minhaa",
  arti: "Sesungguhnya kami milik Allah dan kepada-Nya kami kembali. Ya Allah, berilah aku pahala atas musibahku ini dan gantilah untukku dengan yang lebih baik darinya.",
};

const DOA_PAKAIAN_BARU: Doa = {
  judul: "Doa Memakai Pakaian Baru",
  arab: "اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ",
  latin: "Allaahumma lakal hamdu anta kasawtaniih, as-aluka min khairihi wa khairi maa shuni'a lah, wa a'uudzu bika min syarrihi wa syarri maa shuni'a lah",
  arti: "Ya Allah, bagi-Mu segala puji, Engkau yang telah memberiku pakaian ini. Aku memohon kepada-Mu kebaikannya dan kebaikan tujuannya dibuat, dan aku berlindung kepada-Mu dari keburukannya dan keburukan tujuannya dibuat.",
};

const DOA_ZIARAH_KUBUR: Doa = {
  judul: "Doa Ziarah Kubur",
  arab: "السَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ، وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَاحِقُونَ، أَسْأَلُ اللَّهَ لَنَا وَلَكُمُ الْعَافِيَةَ",
  latin: "Assalaamu 'alaikum ahlad diyaari minal mu'miniina wal muslimiin, wa innaa insyaa-allaahu bikum laahiquun, as-alullaaha lanaa wa lakumul 'aafiyah",
  arti: "Semoga keselamatan tercurah kepada kalian wahai penghuni kubur dari kalangan mukmin dan muslim. Sesungguhnya kami insyaallah akan menyusul kalian. Aku memohon kepada Allah keselamatan untuk kami dan kalian.",
};

function Seksi({ title, desc, items }: { title: string; desc?: string; items: Doa[] }) {
  return (
    <section className="mb-12">
      <h2 className="font-display text-2xl text-[var(--teal-deep)] mb-2">{title}</h2>
      {desc && <p className="text-sm text-[var(--ink-soft)] mb-4">{desc}</p>}
      <div className="space-y-3">
        {items.map((d) => (
          <DoaCard key={d.judul} d={d} />
        ))}
      </div>
    </section>
  );
}

export default function DoaDzikirPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--parchment)]">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-14 w-full">
        <span className="text-xs tracking-widest uppercase text-[var(--ink-soft)]">Amalan Harian</span>
        <h1 className="font-display text-3xl md:text-4xl text-[var(--teal-deep)] mt-1 mb-3">
          Doa & Dzikir Harian
        </h1>
        <p className="text-[var(--ink-soft)] mb-10 leading-relaxed">
          Kumpulan doa dan dzikir yang diajarkan dalam sunnah Rasulullah ﷺ untuk diamalkan dalam
          aktivitas sehari-hari, sebagai bentuk mengingat Allah dalam setiap keadaan.
        </p>

        <Seksi title="Doa Bangun & Tidur" items={[DOA_BANGUN_TIDUR, DOA_SEBELUM_TIDUR]} />
        <Seksi title="Doa Kamar Mandi" items={[DOA_MASUK_KAMAR_MANDI, DOA_KELUAR_KAMAR_MANDI]} />
        <Seksi title="Doa Makan" items={[DOA_SEBELUM_MAKAN, DOA_SETELAH_MAKAN]} />
        <Seksi
          title="Doa Rumah & Bepergian"
          items={[DOA_KELUAR_RUMAH, DOA_MASUK_RUMAH, DOA_BEPERGIAN]}
        />
        <Seksi title="Doa Masjid" items={[DOA_MASUK_MASJID, DOA_KELUAR_MASJID]} />
        <Seksi title="Doa Lainnya" items={[DOA_UNTUK_ORANG_TUA, DOA_PENUTUP_MAJELIS]} />
        <Seksi
          title="Doa dalam Berbagai Keadaan"
          items={[DOA_BERSIN, DOA_HUJAN_TURUN, DOA_MUSIBAH, DOA_PAKAIAN_BARU, DOA_ZIARAH_KUBUR]}
        />

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--teal-deep)] mb-2">Dzikir Setelah Sholat Fardu</h2>
          <p className="text-sm text-[var(--ink-soft)] mb-4">
            Rangkaian dzikir yang dianjurkan dibaca setelah salam pada setiap sholat wajib.
          </p>
          <div className="space-y-3">
            {DZIKIR_SETELAH_SHOLAT.map((d) => (
              <DoaCard key={d.judul} d={d} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--teal-deep)] mb-2">Dzikir Pagi & Petang</h2>
          <p className="text-sm text-[var(--ink-soft)] mb-4">
            Dzikir pagi dibaca setelah Subuh hingga terbit matahari, dzikir petang dibaca setelah
            Ashar hingga Maghrib.
          </p>
          <div className="space-y-3">
            {DZIKIR_PAGI.map((d) => (
              <DoaCard key={d.judul} d={d} />
            ))}
            <Kartu>
              <h3 className="font-medium text-[var(--ink)] mb-2">{TIGA_QUL.judul}</h3>
              <p className="text-sm text-[var(--ink-soft)]">{TIGA_QUL.keterangan}</p>
            </Kartu>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
