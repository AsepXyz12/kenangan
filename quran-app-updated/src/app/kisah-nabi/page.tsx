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
      "Idris hidup beberapa generasi setelah Nabi Adam dan Nabi Syits, pada masa manusia mulai banyak berselisih dan menyimpang. Ia dikenal sebagai orang pertama yang diberi kepandaian menulis dengan pena serta memiliki wawasan luas tentang perbintangan dan perhitungan, sehingga sebagian ulama menyebutnya guru bagi banyak ilmu di zamannya. Al-Qur'an menegaskan Idris sebagai sosok yang sangat jujur (shiddiq) dan sabar dalam berdakwah menyeru kaumnya kepada tauhid serta mengingatkan mereka agar menghentikan kezaliman dan kemaksiatan yang merajalela. Karena keteguhan ibadah dan ketaatannya, Allah menceritakannya sebagai hamba yang diangkat ke kedudukan yang tinggi dan mulia — sebuah kemuliaan istimewa yang disebutkan langsung dalam Al-Qur'an.",
    hikmah: "Ketekunan dalam menuntut ilmu, kejujuran yang konsisten, dan kesabaran dalam berdakwah dapat mengangkat derajat seorang hamba ke kedudukan yang sangat mulia di sisi Allah.",
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
      "Ishaq adalah putra Nabi Ibrahim dari Sarah, lahir sebagai kabar gembira yang disampaikan oleh para malaikat yang singgah bertamu kepada Ibrahim dalam perjalanan menuju kaum Luth. Sarah yang mendengar kabar itu awalnya tertawa keheranan karena ia dan Ibrahim sudah lanjut usia dan selama ini tidak dikaruniai anak, namun para malaikat menegaskan bahwa hal itu tidaklah sulit bagi Allah. Ishaq lahir dan tumbuh menjadi nabi yang saleh, mewarisi dakwah tauhid ayahnya di tanah Kan'an (Syam), menikah, dan dikaruniai putra kembar bernama Ya'qub dan Ishaw. Melalui Ya'qub, keturunan Ishaq kelak menurunkan Bani Israil serta banyak nabi setelahnya, menjadikannya mata rantai penting dalam silsilah kenabian.",
    hikmah: "Kabar gembira dan karunia dari Allah bisa datang di saat yang tidak terduga bagi hamba yang sabar dan terus berharap kepada-Nya, sekalipun akal manusia memandangnya mustahil.",
    dalil: "QS. Hud: 71–73",
  },
  {
    nomor: 10,
    nama: "Ya'qub",
    arab: "يَعْقُوب",
    kisah:
      "Ya'qub, putra Nabi Ishaq, juga dikenal dengan nama Israil, dan memiliki dua belas putra yang kelak menurunkan dua belas suku Bani Israil. Ia sangat mencintai Yusuf, putra kesayangannya, melebihi saudara-saudaranya yang lain, sehingga menimbulkan kecemburuan di antara mereka hingga akhirnya Yusuf disingkirkan dan dikabarkan mati dimakan serigala. Ya'qub tidak sepenuhnya percaya kabar itu dan memilih bersabar dengan kesabaran yang indah (sabar jamil), meski kesedihannya begitu mendalam hingga matanya memutih karena terus-menerus menangis memikirkan Yusuf selama puluhan tahun. Ia tetap yakin dan berharap kepada rahmat Allah, bahkan mencium aroma Yusuf dari gamisnya yang dibawa dari Mesir jauh sebelum kabar itu sampai kepadanya secara resmi. Pada akhirnya Allah mempertemukan kembali Ya'qub dengan Yusuf di Mesir, dan seluruh keluarganya pun bersujud memberi hormat kepada Yusuf, sesuai dengan mimpi yang pernah diceritakan Yusuf semasa kecil.",
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
      "Ayyub adalah hamba Allah yang kaya raya, memiliki banyak ternak dan lahan yang subur, tetapi tetap rendah hati, dermawan, dan sangat taat beribadah. Untuk mengangkat derajatnya, Allah mengujinya secara bertahap dan bertubi-tubi: seluruh hartanya musnah, anak-anaknya meninggal dunia, dan tubuhnya diserang penyakit kulit yang parah hingga bertahun-tahun lamanya, sampai orang-orang di sekitarnya menjauhinya kecuali istrinya yang setia merawatnya. Meski demikian, Ayyub tidak pernah mengeluh kepada manusia maupun berburuk sangka kepada Allah; ia tetap bersabar dan terus berzikir dalam kondisi paling berat sekalipun. Ketika kesabarannya telah mencapai puncaknya, ia memanjatkan doa dengan penuh kerendahan hati, mengadukan penderitaannya hanya kepada Allah semata. Allah pun mengabulkan doanya dengan memerintahkannya menghentakkan kaki hingga memancar mata air untuk mandi dan minum, yang menyembuhkan penyakitnya secara total, serta mengembalikan keluarga dan hartanya dengan jumlah yang berlipat ganda dari sebelumnya sebagai balasan atas kesabarannya.",
    hikmah: "Kesabaran dalam menghadapi ujian yang bertubi-tubi, disertai doa yang tulus, akan berbuah kelapangan dari Allah.",
    dalil: "QS. Al-Anbiya: 83–84, QS. Sad: 41–44",
  },
  {
    nomor: 13,
    nama: "Syu'aib",
    arab: "شُعَيْب",
    kaum: "Kaum Madyan",
    kisah:
      "Syu'aib diutus kepada penduduk Madyan, sebuah kaum pedagang yang terbiasa mengurangi takaran dan timbangan serta merugikan orang lain dalam jual beli, di samping juga menyembah selain Allah. Ia mengajak mereka kembali bertauhid dan menegakkan kejujuran dalam muamalah, mengingatkan bahwa harta yang halal dari timbangan yang adil jauh lebih baik daripada keuntungan curang. Para pembesar kaumnya justru mengancam akan mengusirnya dan pengikutnya dari negeri itu, bahkan mengejeknya dengan mengatakan bahwa ibadahnyalah yang menyuruhnya meninggalkan sesembahan nenek moyang mereka. Syu'aib tetap bersabar dan mengingatkan bahwa ia tidak bermaksud mendatangkan kerusakan, melainkan hanya ingin memperbaiki keadaan semampunya. Karena mereka tetap ingkar dan menentang, Allah membinasakan kaum Madyan dengan gempa dahsyat disertai suara keras yang menggelegar, sehingga mereka bergelimpangan mati di rumah masing-masing, sementara Syu'aib dan pengikutnya yang beriman diselamatkan.",
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
      "Harun adalah saudara kandung Nabi Musa, diangkat menjadi nabi atas permohonan Musa sendiri kepada Allah agar diberi pendamping yang dapat menguatkan dakwahnya, karena Harun dikenal lebih fasih berbicara. Bersama-sama, keduanya diutus menghadap Fir'aun yang mengaku sebagai tuhan, menyampaikan seruan tauhid dengan lemah lembut meski penuh risiko, hingga akhirnya berhasil membawa Bani Israil keluar dari perbudakan Mesir. Ketika Musa naik ke Bukit Tur untuk bermunajat kepada Allah selama empat puluh malam, Harun ditinggalkan sebagai pemimpin dan penjaga Bani Israil. Namun dalam masa kepergian Musa itu, sebagian besar kaumnya tergoda oleh Samiri yang membuat patung anak sapi dari emas dan menyembahnya. Harun telah memperingatkan dan melarang mereka dengan tegas, tetapi kaumnya tetap bersikeras menyembah patung tersebut hingga Musa kembali dan sangat marah menyaksikan penyimpangan itu.",
    hikmah: "Kerja sama dan saling membantu antar-saudara dalam kebaikan dan dakwah adalah teladan penting dari kisah Musa dan Harun.",
    dalil: "QS. Ta-Ha: 29–36",
  },
  {
    nomor: 16,
    nama: "Dzulkifli",
    arab: "ذُو الْكِفْل",
    kisah:
      "Dzulkifli disebut dalam Al-Qur'an berdampingan dengan Nabi Ismail dan Nabi Idris sebagai hamba yang sabar dan termasuk golongan orang-orang pilihan yang saleh. Menurut penjelasan sebagian ulama tafsir, ia dijuluki Dzulkifli karena pernah berjanji untuk senantiasa berpuasa di siang hari, menegakkan salat malam, dan tidak pernah marah dalam memutuskan perkara di antara manusia, lalu ia benar-benar menepati janji tersebut secara konsisten sepanjang hidupnya. Karena keteguhan menjaga janji, ketekunan ibadah, dan keadilannya dalam memimpin serta menyelesaikan sengketa kaumnya, Allah mengangkatnya sebagai nabi dan menyebutnya dalam deretan hamba-hamba pilihan-Nya.",
    hikmah: "Konsistensi dalam kebaikan dan menepati janji adalah sifat mulia yang dipuji Allah dalam Al-Qur'an.",
    dalil: "QS. Al-Anbiya: 85–86, QS. Sad: 48",
  },
  {
    nomor: 17,
    nama: "Daud",
    arab: "دَاوُود",
    kaum: "Bani Israil",
    kisah:
      "Daud, semasa muda, bergabung dalam pasukan Bani Israil yang dipimpin Thalut untuk melawan pasukan Jalut (Goliath) yang gagah perkasa dan ditakuti. Ketika para prajurit lain gentar, Daud yang masih belia maju dengan gagah berani menggunakan umban (ketapel batu) dan berhasil membunuh Jalut dengan izin Allah, sebuah kemenangan yang mengangkat namanya di tengah kaumnya. Setelahnya, Allah menganugerahkan kepadanya kerajaan sekaligus kenabian, kitab Zabur sebagai pedoman, serta suara yang sangat merdu ketika melantunkan tasbih sehingga gunung-gunung dan burung-burung ikut bertasbih bersamanya. Ia juga dianugerahi kemampuan istimewa melunakkan besi tanpa perlu ditempa dengan api, yang ia gunakan untuk membuat baju besi rantai — teknologi yang bermanfaat besar bagi kaumnya. Sebagai raja dan hakim, Daud dikenal sangat adil dan senantiasa berhati-hati dalam memutuskan setiap perkara, serta banyak beribadah termasuk berpuasa selang-seling sehari puasa sehari tidak, sebuah amalan puasa yang kelak disebut sebagai yang paling dicintai Allah.",
    hikmah: "Kekuasaan dan karunia besar hendaknya digunakan untuk terus bertasbih dan berbuat adil, bukan untuk kesombongan.",
    dalil: "QS. Sad: 17–26, QS. Al-Anbiya: 79–80",
  },
  {
    nomor: 18,
    nama: "Sulaiman",
    arab: "سُلَيْمَان",
    kaum: "Bani Israil",
    kisah:
      "Sulaiman, putra Nabi Daud, mewarisi kenabian dan kerajaan ayahnya, lalu berdoa memohon kepada Allah agar dianugerahi kerajaan yang tidak dimiliki siapa pun setelahnya. Allah mengabulkan doanya dengan menundukkan angin agar berhembus sesuai perintahnya, mengizinkannya memahami bahasa burung dan hewan-hewan lain, serta menundukkan bangsa jin untuk bekerja di bawah kekuasaannya, termasuk membangun bangunan-bangunan megah dan menyelam mencari mutiara. Suatu hari, burung Hud-hud dalam pasukannya melaporkan keberadaan sebuah negeri bernama Saba yang dipimpin seorang ratu bernama Balqis, namun rakyatnya menyembah matahari alih-alih Allah. Sulaiman mengirimkan surat ajakan kepada Balqis untuk bertauhid, dan setelah pertukaran hadiah yang ditolaknya, ia memerintahkan salah seorang pembantunya yang memiliki ilmu untuk memindahkan singgasana Balqis ke istananya dalam sekejap mata sebagai bukti mukjizat. Ketika Balqis tiba dan menyaksikan kebesaran kerajaan Sulaiman serta istana berlantai kaca yang disangkanya genangan air, hatinya pun luluh dan ia menyatakan keislamannya kepada Allah, Tuhan semesta alam, tanpa terjadi peperangan sedikit pun.",
    hikmah: "Kekuasaan besar yang dianugerahkan Allah kepada Sulaiman tidak membuatnya lupa diri, melainkan selalu disyukuri dan digunakan di jalan dakwah.",
    dalil: "QS. An-Naml: 15–44, QS. Sad: 30–40",
  },
  {
    nomor: 19,
    nama: "Ilyas",
    arab: "إِلْيَاس",
    kaum: "Bani Israil (penyembah berhala Ba'al)",
    kisah:
      "Ilyas diutus kepada kaumnya di negeri Ba'labak (wilayah Syam) yang telah meninggalkan ajaran tauhid dan menyembah berhala besar bernama Ba'al sebagai sesembahan utama mereka. Ilyas mengingatkan kaumnya dengan tegas, mempertanyakan mengapa mereka menyembah berhala buatan tangan sendiri dan meninggalkan Allah, Pencipta mereka dan nenek moyang mereka terdahulu. Ia mengajak mereka kembali kepada tauhid dengan penuh kesabaran, namun mayoritas kaumnya mendustakannya dan tetap bertahan dalam kesyirikan meski telah diperingatkan berulang kali, sehingga hanya sedikit dari mereka yang beriman dan diselamatkan, sementara sisanya dibinasakan atas keingkaran mereka.",
    hikmah: "Dakwah tauhid harus terus disuarakan meski banyak yang enggan menerimanya, karena tugas seorang nabi adalah menyampaikan, bukan memaksa hidayah.",
    dalil: "QS. As-Saffat: 123–132",
  },
  {
    nomor: 20,
    nama: "Ilyasa",
    arab: "الْيَسَع",
    kisah:
      "Ilyasa adalah murid sekaligus penerus dakwah Nabi Ilyas setelah wafatnya, melanjutkan tugas menyeru kaum Bani Israil yang telah menyimpang agar kembali kepada jalan tauhid. Al-Qur'an menyebutnya berdampingan dengan para nabi lain sebagai hamba yang saleh dan termasuk golongan orang-orang pilihan yang diberi keutamaan di atas seluruh umat manusia pada zamannya. Ia dikenal gigih dan konsisten meneruskan estafet perjuangan dakwah, memastikan cahaya kebenaran yang telah dirintis pendahulunya tidak terputus di tengah kaumnya.",
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
      "Zakariya adalah nabi yang diberi amanah mengasuh dan menjaga Maryam sejak kecil di Baitul Maqdis, setelah ibunya menazarkan Maryam untuk berkhidmat di tempat suci itu. Setiap kali Zakariya masuk ke mihrab tempat Maryam beribadah, ia mendapati makanan di sisinya, padahal bukan musimnya, dan ketika ditanya dari mana asalnya, Maryam menjawab bahwa itu adalah rezeki langsung dari Allah. Peristiwa itu menggugah hati Zakariya, sehingga ia pun berdoa memohon keturunan yang saleh kepada Allah, meski usianya sudah sangat lanjut, tulangnya lemah, rambutnya telah memutih, dan istrinya dikenal mandul sepanjang usia pernikahan mereka. Allah mengabulkan doanya dengan memberi kabar gembira melalui malaikat bahwa ia akan dikaruniai seorang putra bernama Yahya, sebuah nama yang belum pernah disandang siapa pun sebelumnya, sebagai tanda kekuasaan Allah yang tidak terbatas oleh sebab-sebab lahiriah.",
    hikmah: "Tidak ada yang mustahil bagi Allah; doa yang tulus di usia dan keadaan apa pun tetap layak dipanjatkan dengan penuh harap.",
    dalil: "QS. Maryam: 2–11, QS. Ali 'Imran: 37–41",
  },
  {
    nomor: 23,
    nama: "Yahya",
    arab: "يَحْيَى",
    kisah:
      "Yahya adalah putra Nabi Zakariya yang lahir sebagai jawaban atas doa ayahnya di usia senja, dan Allah menganugerahkannya hikmah serta pemahaman agama sejak ia masih kanak-kanak. Ia diperintahkan untuk berpegang teguh pada kitab (Taurat) dengan sungguh-sungguh, dan Allah melimpahkan kepadanya kasih sayang serta kesucian jiwa yang luar biasa sehingga ia dikenal sangat menjaga diri dari dosa dan syahwat dunia. Yahya tumbuh menjadi sosok yang penuh kelembutan, sangat berbakti kepada kedua orang tuanya, dan tidak pernah bersikap sombong maupun durhaka. Al-Qur'an secara khusus mengabadikan salam sejahtera baginya pada tiga momen penting dalam hidup seorang manusia: hari kelahirannya, hari kematiannya, dan hari ia dibangkitkan kembali kelak.",
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
      "Isa dilahirkan secara mukjizat oleh Maryam tanpa perantaraan ayah, semata-mata atas kehendak dan kalimat 'Kun' (Jadilah) dari Allah, sebagaimana Allah menciptakan Adam dari tanah tanpa ayah maupun ibu. Ketika Maryam pulang membawa bayinya dan dituduh kaumnya berbuat serong, ia hanya menunjuk kepada sang bayi, dan atas izin Allah, Isa yang masih dalam buaian berbicara membela kesucian ibunya serta menjelaskan bahwa dirinya adalah hamba Allah yang akan diberi kitab dan diangkat menjadi nabi. Setelah dewasa, Isa diutus kepada Bani Israil dengan membawa kitab Injil dan berbagai mukjizat luar biasa atas izin Allah: menyembuhkan orang buta sejak lahir dan penderita kusta, menghidupkan orang mati, serta membentuk burung dari tanah liat lalu meniupnya hingga menjadi burung sungguhan yang hidup. Ketika sebagian Bani Israil justru berencana membunuhnya karena menolak dakwahnya, Allah menyelamatkan Isa dengan mengangkatnya ke langit, sementara orang yang menyerupainyalah yang tertangkap dan disalib. Al-Qur'an menegaskan dengan jelas bahwa Isa tidak dibunuh dan tidak pula disalib, melainkan diangkat Allah ke sisi-Nya, dan kelak ia akan turun kembali ke bumi menjelang akhir zaman.",
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
                    <p className="text-xs text-[var(--heading)] mt-1">Gelar: {n.gelar}</p>
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
