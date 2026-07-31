import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Roundel from "@/components/Roundel";

export const metadata = { title: "Kisah 25 Nabi dan Rasul — Mushaf" };

type Nabi = {
  nomor: number;
  nama: string;
  arab: string;
  gelar?: string;
  kaum?: string;
  kisah: string;
  hikmah: string;
  dalil?: string;
};

const NABI: Nabi[] = [
  {
    nomor: 1,
    nama: "Adam",
    arab: "آدَم",
    gelar: "Abul Basyar (Bapak Manusia)",
    kisah:
      "Allah mengabarkan kepada para malaikat bahwa Dia hendak menjadikan khalifah di bumi. Adam diciptakan dari tanah, lalu Allah mengajarkan kepadanya nama-nama segala sesuatu — ilmu yang tidak dimiliki para malaikat. Ketika Allah memerintahkan malaikat sujud penghormatan kepada Adam, seluruhnya patuh kecuali Iblis yang menolak karena merasa lebih mulia sebab diciptakan dari api, sehingga ia diusir dari rahmat Allah dan bersumpah akan menyesatkan keturunan Adam. Adam kemudian ditempatkan di surga bersama istrinya, Hawa, dengan larangan mendekati satu pohon tertentu. Iblis membujuk keduanya dengan bisikan bahwa buah itu akan membuat mereka kekal dan menjadi seperti malaikat, hingga akhirnya keduanya memakannya dan menyadari aurat mereka terbuka. Karena kesalahan itu, Allah menurunkan Adam dan Hawa ke bumi. Namun Adam segera menerima kalimat-kalimat dari Allah yang ia gunakan untuk bertobat, dan Allah menerima taubatnya. Di bumi, Adam menjadi manusia dan nabi pertama, mengajarkan tauhid kepada anak-cucunya, termasuk mengalami duka ketika salah satu putranya, Qabil, membunuh saudaranya sendiri, Habil, karena iri hati — pembunuhan pertama dalam sejarah manusia.",
    hikmah:
      "Kesalahan yang diikuti dengan penyesalan dan tobat yang sungguh-sungguh akan diampuni Allah; kesombongan Iblis mengajarkan bahaya merasa lebih baik dari sesama makhluk, dan kisah Qabil-Habil mengingatkan bahaya iri hati yang dibiarkan menguasai diri.",
    dalil: "QS. Al-Baqarah: 30–37",
  },
  {
    nomor: 2,
    nama: "Idris",
    arab: "إِدْرِيس",
    kisah:
      "Idris dikenal sebagai salah satu nabi paling awal yang diberi hikmah dan ilmu, disebut dalam Al-Qur'an sebagai orang yang sangat sabar dan diangkat ke tempat yang tinggi (kedudukan mulia) oleh Allah. Ia dikenal tekun beribadah dan mengajarkan kebaikan kepada kaumnya.",
    hikmah: "Ketekunan dalam ilmu dan ibadah mengangkat derajat seseorang di sisi Allah.",
    dalil: "QS. Maryam: 56–57",
  },
  {
    nomor: 3,
    nama: "Nuh",
    arab: "نُوح",
    gelar: "Najiyullah (yang diselamatkan Allah)",
    kaum: "Kaum Nuh",
    kisah:
      "Nuh diutus kepada kaumnya yang telah menyimpang jauh, menyembah berhala-berhala seperti Wadd, Suwa', Yaghuts, Ya'uq, dan Nasr. Ia berdakwah siang dan malam, secara sembunyi maupun terang-terangan, mengajak kaumnya kembali bertauhid dan beribadah hanya kepada Allah, namun mayoritas kaumnya justru menutup telinga dan mengejeknya, sementara para pemuka kaum menghina para pengikut Nuh yang umumnya berasal dari kalangan lemah. Setelah berdakwah selama kurang lebih 950 tahun dengan hasil yang sangat sedikit, Nuh berdoa memohon agar Allah tidak menyisakan seorang pun dari kaumnya yang ingkar di muka bumi. Allah memerintahkannya membangun bahtera besar di tempat yang jauh dari air, yang ditertawakan oleh kaumnya karena dianggap pekerjaan sia-sia. Ketika air mulai menyembur dari tanur (oven) sebagai tanda dimulainya azab, hujan turun deras dan seluruh permukaan bumi tergenang banjir besar. Nuh mengajak keluarganya naik ke bahtera bersama sepasang-sepasang dari setiap jenis makhluk dan orang-orang yang beriman, namun salah satu putranya, Kan'an, menolak ikut dan memilih berlindung di gunung, sehingga ia pun ikut tenggelam bersama kaum yang ingkar. Setelah air surut, bahtera berlabuh di atas Gunung Judi, dan Nuh beserta pengikutnya yang selamat memulai kehidupan baru di bumi.",
    hikmah:
      "Dakwah membutuhkan kesabaran luar biasa meski hasilnya sedikit; pertolongan Allah datang bagi siapa yang teguh di jalan kebenaran, sekalipun harus berpisah dari keluarga yang ingkar — sebab ikatan keimanan lebih utama daripada ikatan darah.",
    dalil: "QS. Hud: 25–49, QS. Nuh: 1–28",
  },
  {
    nomor: 4,
    nama: "Hud",
    arab: "هُود",
    kaum: "Kaum 'Ad",
    kisah:
      "Hud diutus kepada kaum 'Ad yang dikenal kuat secara fisik dan mendirikan bangunan-bangunan megah, namun menyembah berhala dan berlaku sombong. Setelah mereka terus menolak dakwahnya, Allah menurunkan azab berupa angin topan dahsyat selama tujuh malam delapan hari yang membinasakan mereka, sementara Hud dan pengikutnya yang beriman diselamatkan.",
    hikmah: "Kekuatan dan kemegahan duniawi tidak dapat menyelamatkan seseorang dari azab Allah jika terus dalam kesombongan dan pengingkaran.",
    dalil: "QS. Al-A'raf: 65–72, QS. Al-Haqqah: 6–8",
  },
  {
    nomor: 5,
    nama: "Shalih",
    arab: "صَالِح",
    kaum: "Kaum Tsamud",
    kisah:
      "Shalih diutus kepada kaum Tsamud yang mahir memahat gunung menjadi rumah. Sebagai bukti kenabiannya, Allah mengeluarkan seekor unta betina dari batu sebagai mukjizat, dengan syarat kaum itu tidak menyakitinya. Namun sebagian mereka membunuh unta tersebut, sehingga Allah menurunkan azab berupa suara keras (petir) yang membinasakan mereka dalam tiga hari.",
    hikmah: "Mengingkari janji dan melanggar larangan Allah, meski terlihat sepele, dapat mendatangkan akibat yang sangat besar.",
    dalil: "QS. Al-A'raf: 73–79, QS. Asy-Syams: 11–14",
  },
  {
    nomor: 6,
    nama: "Ibrahim",
    arab: "إِبْرَاهِيم",
    gelar: "Khalilullah (Kekasih Allah)",
    kaum: "Kaum Babilonia (kaum Raja Namrud)",
    kisah:
      "Sejak muda, Ibrahim mempertanyakan kepercayaan ayahnya, Azar, yang seorang pembuat dan penyembah berhala. Ia merenungkan bintang, bulan, dan matahari sebagai kemungkinan Tuhan, namun menyadari semuanya terbenam dan lenyap, sehingga ia yakin bahwa hanya Allah, Pencipta langit dan bumi, yang layak disembah. Untuk membuktikan kepada kaumnya bahwa berhala tidak berdaya, Ibrahim menghancurkan seluruh berhala di kuil kecuali yang paling besar, lalu mengalungkan kapak ke leher berhala besar itu. Ketika kaumnya menuduhnya, ia menjawab dengan sindiran agar mereka bertanya kepada berhala besar itu sendiri — jawaban yang membungkam mereka namun membuat mereka murka dan memutuskan membakarnya hidup-hidup. Ibrahim dilemparkan ke dalam kobaran api besar, namun Allah memerintahkan api itu menjadi dingin dan penuh keselamatan baginya, sehingga ia keluar tanpa cedera sedikit pun. Ibrahim kemudian berhijrah, menikahi Sarah, dan kemudian memiliki putra dari Hajar bernama Ismail. Atas perintah Allah, ia membawa Hajar dan Ismail yang masih bayi ke lembah tandus Makkah dan meninggalkan mereka di sana; dari kepanikan Hajar mencari air muncul mata air Zamzam yang mengalir hingga kini. Ujian terbesar Ibrahim datang lewat mimpi berulang yang memerintahkannya menyembelih Ismail; ketika keduanya pasrah dan bersiap melaksanakan perintah itu, Allah menggantinya dengan seekor domba sembelihan — peristiwa yang diperingati umat Islam setiap Iduladha. Bersama Ismail yang telah dewasa, Ibrahim membangun kembali Ka'bah sebagai rumah ibadah pertama untuk menyembah Allah semata, sekaligus mendoakan agar keturunannya kelak diutus seorang rasul dari kalangan mereka sendiri.",
    hikmah: "Keyakinan tauhid yang kokoh dan ketaatan penuh kepada Allah akan mendatangkan pertolongan-Nya, sekalipun ujiannya sangat berat; kepasrahan Ibrahim dan Ismail mengajarkan bahwa cinta kepada Allah harus melampaui cinta kepada apa pun, termasuk anak yang paling disayangi.",
    dalil: "QS. Al-Anbiya: 51–70, QS. As-Saffat: 100–107",
  },
  {
    nomor: 7,
    nama: "Luth",
    arab: "لُوط",
    kaum: "Kaum Sadum (Sodom)",
    kisah:
      "Luth, keponakan Nabi Ibrahim, diutus kepada kaum Sadum yang melakukan perbuatan keji yang belum pernah dilakukan umat sebelumnya. Setelah mereka terus menolak dakwahnya, Allah membinasakan negeri itu dengan membalikkan tanahnya dan menghujani mereka dengan batu, sementara Luth dan keluarganya yang beriman—kecuali istrinya yang ingkar—diselamatkan.",
    hikmah: "Perbuatan keji yang dilakukan terang-terangan dan tanpa rasa malu mengundang murka Allah; iman seseorang tidak menjamin keselamatan pasangannya jika ia sendiri memilih ingkar.",
    dalil: "QS. Al-A'raf: 80–84, QS. Hud: 77–83",
  },
  {
    nomor: 8,
    nama: "Ismail",
    arab: "إِسْمَاعِيل",
    kisah:
      "Ismail adalah putra Nabi Ibrahim dari Siti Hajar. Semasa bayi, ia dan ibunya ditinggalkan di lembah tandus Makkah atas perintah Allah, hingga munculnya mata air Zamzam dari hentakan kakinya. Ismail tumbuh menjadi anak yang taat, rela disembelih demi menjalankan perintah Allah kepada ayahnya, dan bersama Ibrahim membangun kembali Ka'bah.",
    hikmah: "Ketaatan dan kesabaran seorang anak kepada perintah Allah, sebagaimana ditunjukkan Ismail, menjadi teladan keikhlasan tertinggi.",
    dalil: "QS. As-Saffat: 102, QS. Maryam: 54–55",
  },
  {
    nomor: 9,
    nama: "Ishaq",
    arab: "إِسْحَاق",
    kisah:
      "Ishaq adalah putra Nabi Ibrahim dari Sarah, lahir sebagai kabar gembira yang disampaikan malaikat kepada Ibrahim dan Sarah di usia senja mereka. Ishaq kemudian menjadi nabi yang meneruskan dakwah tauhid dan menjadi ayah dari Nabi Ya'qub.",
    hikmah: "Kabar gembira dari Allah bisa datang di saat yang tidak terduga bagi hamba yang sabar dan terus berharap kepada-Nya.",
    dalil: "QS. Hud: 71–73",
  },
  {
    nomor: 10,
    nama: "Ya'qub",
    arab: "يَعْقُوب",
    kisah:
      "Ya'qub, putra Nabi Ishaq, memiliki dua belas putra yang menurunkan Bani Israil. Ia sangat mencintai putranya, Yusuf, dan bersedih hingga matanya memutih karena menangis saat kehilangan Yusuf selama bertahun-tahun, namun tetap sabar dan tidak pernah putus asa dari rahmat Allah hingga akhirnya dipertemukan kembali dengan Yusuf.",
    hikmah: "Kesabaran yang indah (sabar jamil) mengajarkan untuk terus berbaik sangka kepada Allah dalam ujian yang panjang sekalipun.",
    dalil: "QS. Yusuf: 84–87",
  },
  {
    nomor: 11,
    nama: "Yusuf",
    arab: "يُوسُف",
    kisah:
      "Sejak kecil, Yusuf bermimpi melihat sebelas bintang, matahari, dan bulan bersujud kepadanya — mimpi yang oleh ayahnya, Nabi Ya'qub, dipesankan agar tidak diceritakan kepada saudara-saudaranya karena dikhawatirkan menimbulkan iri hati. Kekhawatiran itu terbukti: saudara-saudaranya yang cemburu karena Yusuf lebih disayang ayahnya membujuknya ikut bermain, lalu melemparkannya ke dalam sumur tua dan pulang berbohong bahwa ia dimakan serigala. Yusuf ditemukan oleh sebuah kafilah dan dijual sebagai budak di Mesir kepada seorang pembesar istana (Al-Aziz). Ia tumbuh menjadi pemuda yang tampan dan berakhlak mulia, hingga istri Al-Aziz berusaha menggodanya; Yusuf menolak tegas demi menjaga kesuciannya, meski akibatnya ia difitnah dan dipenjarakan selama bertahun-tahun meski terbukti tidak bersalah. Di dalam penjara, Yusuf menakwilkan mimpi dua tahanan lain dengan tepat, dan kemudian menakwilkan mimpi Raja Mesir tentang tujuh sapi gemuk dan kurus — sebuah pertanda tujuh tahun subur diikuti tujuh tahun paceklik. Berkat ketepatan takwilnya serta strategi yang ia usulkan, Yusuf dibebaskan dan diangkat menjadi pejabat tinggi yang mengurus lumbung pangan Mesir. Ketika masa paceklik tiba, saudara-saudaranya datang ke Mesir mencari bahan makanan tanpa mengenali Yusuf, hingga akhirnya ia mengungkapkan jati dirinya, memaafkan seluruh perbuatan mereka di masa lalu, dan mengundang ayah serta seluruh keluarganya untuk tinggal bersamanya di Mesir — mewujudkan mimpi masa kecilnya ketika seluruh keluarganya bersujud memberi hormat kepadanya.",
    hikmah: "Kesabaran atas kezaliman, menjaga kehormatan diri dari godaan, dan memaafkan kesalahan orang lain—bahkan saudara sendiri yang pernah mencelakai—akan berbuah kemuliaan dan pertemuan indah di kemudian hari.",
    dalil: "Surat Yusuf (seluruh surat)",
  },
  {
    nomor: 12,
    nama: "Ayyub",
    arab: "أَيُّوب",
    kisah:
      "Ayyub adalah hamba yang kaya raya dan sangat taat, lalu diuji Allah dengan kehilangan harta, anak-anak, dan penyakit berat selama bertahun-tahun. Meski demikian, ia tetap bersabar dan tidak pernah berhenti bersyukur dan berdoa, hingga Allah menyembuhkannya dan mengembalikan keluarga serta hartanya berlipat ganda.",
    hikmah: "Kesabaran dalam menghadapi ujian yang bertubi-tubi, disertai doa yang tulus, akan berbuah kelapangan dari Allah.",
    dalil: "QS. Al-Anbiya: 83–84, QS. Sad: 41–44",
  },
  {
    nomor: 13,
    nama: "Syu'aib",
    arab: "شُعَيْب",
    kaum: "Kaum Madyan",
    kisah:
      "Syu'aib diutus kepada penduduk Madyan yang terbiasa mengurangi takaran dan timbangan dalam berdagang. Ia mengajak mereka bertauhid dan berlaku jujur dalam muamalah, namun banyak yang menolak dan mengancamnya. Kaum yang ingkar akhirnya dibinasakan dengan gempa dan suara keras yang mengguncang negeri mereka.",
    hikmah: "Kejujuran dalam perdagangan dan muamalah adalah bagian dari ketakwaan; kecurangan ekonomi termasuk dosa besar di sisi Allah.",
    dalil: "QS. Al-A'raf: 85–93, QS. Hud: 84–95",
  },
  {
    nomor: 14,
    nama: "Musa",
    arab: "مُوسَى",
    gelar: "Kalimullah (yang diajak bicara Allah)",
    kaum: "Bani Israil, Fir'aun dan kaumnya",
    kisah:
      "Musa lahir pada masa Fir'aun memerintahkan pembantaian setiap bayi laki-laki Bani Israil karena mimpi buruk tentang kekuasaannya yang akan direbut. Ibunya, atas ilham dari Allah, menghanyutkan Musa dalam sebuah peti di Sungai Nil, yang kemudian ditemukan dan dipungut oleh keluarga Fir'aun sendiri, sehingga Musa tumbuh besar di istana orang yang kelak menjadi musuh utamanya — sementara ibunya diam-diam tetap menyusuinya sebagai pengasuh yang direkomendasikan oleh saudara perempuan Musa. Setelah dewasa, Musa tanpa sengaja menyebabkan kematian seorang warga Mesir saat melerai perkelahian, sehingga ia melarikan diri ke Madyan, bekerja pada Nabi Syu'aib, dan menikahi salah satu putrinya. Dalam perjalanan pulang ke Mesir bersama keluarganya, Musa melihat api di lereng Bukit Tur (Sinai) dan di sanalah Allah berbicara langsung kepadanya, mengangkatnya menjadi rasul serta memberinya dua mukjizat: tongkat yang berubah menjadi ular, dan tangan yang bersinar terang ketika dimasukkan ke saku bajunya. Musa diutus kembali ke Mesir bersama saudaranya, Harun, untuk menyeru Fir'aun agar beriman kepada Allah dan membebaskan Bani Israil, namun Fir'aun yang mengaku sebagai tuhan menolak dengan sombong dan mengumpulkan para penyihir untuk mengalahkan Musa — yang justru berbalik menjadi keimanan para penyihir tersebut setelah melihat mukjizat tongkat Musa mengalahkan sihir mereka. Setelah serangkaian azab seperti banjir, belalang, dan wabah tidak juga meluluhkan hati Fir'aun, Musa diperintahkan membawa Bani Israil keluar dari Mesir pada malam hari. Fir'aun beserta bala tentaranya mengejar hingga ke tepi Laut Merah; atas perintah Allah, Musa memukulkan tongkatnya dan laut pun terbelah menjadi jalan kering bagi Bani Israil, lalu kembali menyatu dan menenggelamkan Fir'aun beserta pasukannya ketika mereka mencoba mengejar. Di Bukit Tur, Musa menerima kitab Taurat sebagai pedoman bagi Bani Israil, meski dalam perjalanan dakwahnya ia juga harus menghadapi berbagai pembangkangan kaumnya sendiri, termasuk penyembahan anak sapi emas saat ia sedang munajat kepada Allah.",
    hikmah: "Allah mampu menyelamatkan hamba-Nya bahkan dari tengah kekuasaan yang paling zalim; kekuasaan yang sombong seperti Fir'aun pada akhirnya ditenggelamkan Allah, dan pertolongan-Nya sering datang lewat jalan yang tidak terduga—termasuk lewat tangan musuh sekalipun.",
    dalil: "QS. Al-Qasas: 1–43, QS. Ta-Ha: 9–98",
  },
  {
    nomor: 15,
    nama: "Harun",
    arab: "هَارُون",
    kisah:
      "Harun adalah saudara Nabi Musa yang diutus mendampinginya berdakwah kepada Fir'aun, atas permohonan Musa kepada Allah karena Harun lebih fasih berbicara. Harun berperan besar membantu Musa memimpin Bani Israil, termasuk saat menjaga kaumnya ketika Musa munajat ke Bukit Tur.",
    hikmah: "Kerja sama dan saling membantu antar-saudara dalam kebaikan dan dakwah adalah teladan penting dari kisah Musa dan Harun.",
    dalil: "QS. Ta-Ha: 29–36",
  },
  {
    nomor: 16,
    nama: "Dzulkifli",
    arab: "ذُو الْكِفْل",
    kisah:
      "Dzulkifli disebut Al-Qur'an sebagai hamba yang sabar dan termasuk golongan orang-orang saleh. Ia dikenal teguh memegang janji dan konsisten menegakkan keadilan serta ibadah di tengah kaumnya.",
    hikmah: "Konsistensi dalam kebaikan dan menepati janji adalah sifat mulia yang dipuji Allah dalam Al-Qur'an.",
    dalil: "QS. Al-Anbiya: 85–86, QS. Sad: 48",
  },
  {
    nomor: 17,
    nama: "Daud",
    arab: "دَاوُود",
    kaum: "Bani Israil",
    kisah:
      "Daud mengalahkan raksasa Jalut (Goliath) semasa muda dan kemudian diangkat menjadi raja sekaligus nabi Bani Israil. Allah menganugerahkannya kitab Zabur, suara merdu saat melantunkan pujian sehingga gunung dan burung ikut bertasbih bersamanya, serta kemampuan melunakkan besi untuk membuat baju besi.",
    hikmah: "Kekuasaan dan karunia besar hendaknya digunakan untuk terus bertasbih dan berbuat adil, bukan untuk kesombongan.",
    dalil: "QS. Sad: 17–26, QS. Al-Anbiya: 79–80",
  },
  {
    nomor: 18,
    nama: "Sulaiman",
    arab: "سُلَيْمَان",
    kaum: "Bani Israil",
    kisah:
      "Sulaiman, putra Nabi Daud, dianugerahi kerajaan yang sangat besar serta kemampuan memahami bahasa hewan dan menundukkan angin serta jin. Kisahnya bersama Ratu Balqis dari negeri Saba menunjukkan kebijaksanaannya dalam berdakwah mengajak sang ratu dan kaumnya kepada tauhid tanpa peperangan.",
    hikmah: "Kekuasaan besar yang dianugerahkan Allah kepada Sulaiman tidak membuatnya lupa diri, melainkan selalu disyukuri dan digunakan di jalan dakwah.",
    dalil: "QS. An-Naml: 15–44, QS. Sad: 30–40",
  },
  {
    nomor: 19,
    nama: "Ilyas",
    arab: "إِلْيَاس",
    kaum: "Bani Israil (penyembah berhala Ba'al)",
    kisah:
      "Ilyas diutus kepada kaumnya yang menyembah berhala bernama Ba'al. Ia mengajak mereka kembali kepada tauhid, namun sebagian besar menolak dan tetap dalam kesyirikan meski telah diperingatkan berulang kali.",
    hikmah: "Dakwah tauhid harus terus disuarakan meski banyak yang enggan menerimanya, karena tugas seorang nabi adalah menyampaikan, bukan memaksa hidayah.",
    dalil: "QS. As-Saffat: 123–132",
  },
  {
    nomor: 20,
    nama: "Ilyasa",
    arab: "الْيَسَع",
    kisah:
      "Ilyasa adalah penerus dakwah Nabi Ilyas, disebut Al-Qur'an sebagai hamba yang saleh dan termasuk golongan orang-orang pilihan. Ia melanjutkan tugas mengajak kaumnya kepada jalan kebenaran.",
    hikmah: "Estafet dakwah kebaikan perlu diteruskan generasi berikutnya agar cahaya kebenaran tidak terputus.",
    dalil: "QS. Al-An'am: 86, QS. Sad: 48",
  },
  {
    nomor: 21,
    nama: "Yunus",
    arab: "يُونُس",
    gelar: "Dzun Nun (yang ditelan ikan)",
    kaum: "Penduduk Ninawa (Niniveh)",
    kisah:
      "Yunus meninggalkan kaumnya di Ninawa karena putus asa saat dakwahnya tidak kunjung diterima, lalu naik kapal yang kemudian dilemparkan ke laut. Ia ditelan ikan besar dan berdoa memohon ampun dalam kegelapan perut ikan hingga Allah menyelamatkannya. Sepeninggalnya, kaum Ninawa ternyata beriman seluruhnya dan diselamatkan dari azab.",
    hikmah: "Doa Nabi Yunus dalam kesulitan mengajarkan pentingnya kesabaran menghadapi dakwah yang berat dan tidak tergesa-gesa berputus asa.",
    dalil: "QS. As-Saffat: 139–148, QS. Al-Anbiya: 87–88",
  },
  {
    nomor: 22,
    nama: "Zakariya",
    arab: "زَكَرِيَّا",
    kisah:
      "Zakariya adalah nabi yang mengasuh Maryam di Baitul Maqdis dan senantiasa mendapati rezeki yang tak terduga di sisinya. Terinspirasi hal itu, ia berdoa memohon keturunan meski telah tua dan istrinya mandul, lalu Allah mengabulkan dengan lahirnya Nabi Yahya.",
    hikmah: "Tidak ada yang mustahil bagi Allah; doa yang tulus di usia dan keadaan apa pun tetap layak dipanjatkan dengan penuh harap.",
    dalil: "QS. Maryam: 2–11, QS. Ali 'Imran: 37–41",
  },
  {
    nomor: 23,
    nama: "Yahya",
    arab: "يَحْيَى",
    kisah:
      "Yahya adalah putra Nabi Zakariya yang diberi hikmah dan kenabian sejak kecil. Ia dikenal sangat taat, penuh kasih sayang, dan menjaga kesucian dirinya. Al-Qur'an menyebutnya sebagai sosok yang taat kepada kedua orang tuanya dan tidak sombong maupun durhaka.",
    hikmah: "Kesungguhan beribadah sejak usia muda dan berbakti kepada orang tua adalah sifat mulia yang dipuji Allah.",
    dalil: "QS. Maryam: 12–15",
  },
  {
    nomor: 24,
    nama: "Isa",
    arab: "عِيسَى",
    gelar: "Ruhullah (Ruh dari Allah), Al-Masih",
    kaum: "Bani Israil",
    kisah:
      "Isa dilahirkan secara mukjizat oleh Maryam tanpa ayah, atas kehendak Allah. Sejak bayi ia sudah bisa berbicara membela kesucian ibunya. Sebagai rasul, ia diberi mukjizat menyembuhkan orang buta dan berpenyakit kusta serta menghidupkan burung dari tanah liat dengan izin Allah. Al-Qur'an menegaskan Isa bukan disalib maupun mati, melainkan diangkat oleh Allah ke sisi-Nya.",
    hikmah: "Kelahiran dan mukjizat Isa menunjukkan kekuasaan mutlak Allah atas segala hukum sebab-akibat di alam semesta.",
    dalil: "QS. Maryam: 16–34, QS. An-Nisa: 157–158",
  },
  {
    nomor: 25,
    nama: "Muhammad",
    arab: "مُحَمَّد",
    gelar: "Habibullah (Kekasih Allah), Khataman Nabiyyin (Penutup Para Nabi)",
    kaum: "Seluruh umat manusia",
    kisah:
      "Muhammad ﷺ lahir di Makkah dan diangkat menjadi rasul pada usia 40 tahun melalui wahyu pertama di Gua Hira. Beliau berdakwah tauhid di tengah masyarakat Arab jahiliah yang menyembah berhala, menghadapi penolakan dan penyiksaan berat hingga hijrah ke Madinah. Di sana beliau membangun masyarakat Islam yang berkeadilan, hingga akhirnya Makkah ditaklukkan tanpa pertumpahan darah dan Islam tersebar ke seluruh Jazirah Arab. Beliau adalah penutup seluruh nabi dan rasul, dengan Al-Qur'an sebagai mukjizat abadi yang terjaga hingga akhir zaman.",
    hikmah: "Muhammad ﷺ adalah teladan sempurna (uswah hasanah) dalam seluruh aspek kehidupan: ibadah, akhlak, kepemimpinan, dan kesabaran dalam dakwah.",
    dalil: "QS. Al-Ahzab: 21, 40",
  },
];

export default function KisahNabiPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
            Teladan Umat
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-4">
            Kisah 25 Nabi dan Rasul
          </h1>
          <p className="text-[var(--ink-soft)] leading-relaxed">
            Dua puluh lima nabi dan rasul yang wajib diketahui umat Islam,
            disebutkan namanya secara jelas di dalam Al-Qur&apos;an, lengkap
            dengan ringkasan kisah, hikmah, dan rujukan ayat.
          </p>
        </div>

        <div className="space-y-6">
          {NABI.map((n) => (
            <div
              key={n.nomor}
              className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-6 md:p-7"
            >
              <div className="flex items-start gap-3 mb-3">
                <Roundel number={n.nomor} variant="teal" size={40} />
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h2 className="font-display text-xl text-[var(--ink)]">
                      Nabi {n.nama}
                      <span className="text-[var(--gold)]"> &#39;alaihissalam</span>
                    </h2>
                    <span className="ayat-arabic text-lg text-[var(--ink-soft)]" dir="rtl">
                      {n.arab}
                    </span>
                  </div>
                  {n.gelar && (
                    <p className="text-xs text-[var(--teal-deep)] mt-1">Gelar: {n.gelar}</p>
                  )}
                  {n.kaum && (
                    <p className="text-xs text-[var(--ink-soft)] mt-0.5">Diutus kepada: {n.kaum}</p>
                  )}
                </div>
              </div>

              <p className="text-sm text-[var(--ink)] leading-relaxed mb-3">{n.kisah}</p>

              <div className="border-t border-[var(--parchment-line)] pt-3 mt-3">
                <p className="text-xs uppercase tracking-wide text-[var(--gold)] mb-1">Hikmah</p>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{n.hikmah}</p>
              </div>

              {n.dalil && (
                <p className="text-xs text-[var(--ink-soft)] italic mt-3">Rujukan: {n.dalil}</p>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
