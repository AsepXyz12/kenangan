import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

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
  konsekuensi?: string;
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
    konsekuensi:
      "Karena tergolong haram, pacaran (dengan bentuk-bentuk yang disebut di atas) berdosa jika dijalani — apa pun alasannya. Yang membedakan besar-kecilnya beban dosa di sisi Allah adalah TAHU atau TIDAK TAHU hukumnya: (1) Kalau seseorang mengerjakannya sebelum tahu status hukumnya (jahil/belum sampai ilmunya), ulama umumnya memandang ia belum berdosa atas ketidaktahuannya, TAPI begitu ia sudah tahu dan tetap melanjutkan, hukum haram itu berlaku penuh dan dicatat sebagai dosa; ketidaktahuan bukan izin untuk sengaja tidak mencari tahu. (2) Kalau dikerjakan dengan sadar-tahu, itu dosa yang harus ditaubati. Islam TIDAK mengajarkan bahwa satu dosa tertentu otomatis memastikan seseorang masuk 'lapisan neraka' tertentu — itu perkara gaib, hak Allah semata (lihat bagian 'Soal Neraka' di bawah). Yang diajarkan justru pintu keluarnya: taubat nasuha (berhenti total, menyesal, dan bertekad tidak mengulang) menghapus dosa itu, insyaAllah, seberapa pun besarnya (QS. Az-Zumar: 53).",
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
    konsekuensi:
      "Zina termasuk dosa besar (kabair) dengan ancaman tegas dalam Al-Qur'an dan hadits. Sekali lagi, faktor tahu/tidak tahu menentukan beban dosanya: yang benar-benar belum tahu status haramnya (kasus yang sangat jarang, karena keharaman zina termasuk hal yang ma'lum minad-din bidh-dharurah/diketahui otomatis oleh siapa pun yang mengaku muslim) berbeda posisinya dari yang tahu tapi tetap melakukan. Dalam akidah Ahlus Sunnah, pelaku dosa besar dari kalangan mukmin (selama tidak menghalalkannya/menganggapnya bukan dosa) TIDAK dianggap keluar dari Islam dan TIDAK dipastikan kekal di neraka — statusnya diserahkan pada kehendak Allah: bisa disiksa sesuai kadar dosanya lalu tetap masuk surga, atau langsung diampuni. Jalan keluarnya adalah taubat nasuha sesegera mungkin, bukan menunda-nunda.",
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
  {
    judul: "Hubungan sesama jenis (liwath/LGBT)",
    ringkasan:
      "Seluruh madzhab fiqih sepakat (ijma') bahwa hubungan seksual sesama jenis hukumnya haram dan termasuk dosa besar, bahkan disebutkan dengan ancaman yang sangat keras dalam Al-Qur'an lewat kisah kaum Nabi Luth.",
    dalil: "QS. Al-A'raf: 80-84, QS. Asy-Syu'ara: 165-173, QS. An-Naml: 54-58.",
    poin: [
      "Larangan ini berlaku pada perbuatannya (hubungan seksual sesama jenis), bukan status/label sebagai izin untuk merendahkan atau menyakiti seseorang secara pribadi — akhlak Islam tetap melarang perundungan, kekerasan, atau ujaran kebencian terhadap siapa pun.",
      "Sebagaimana dosa besar lainnya, ulama membedakan antara kecenderungan/dorongan yang dirasakan seseorang (bukan pilihan, dan tidak berdosa selama tidak diperturutkan) dengan perbuatannya (yang menjadi objek hukum haram).",
    ],
    konsekuensi:
      "Berlaku prinsip yang sama seperti dosa besar lain di halaman ini: dosa dicatat kalau perbuatannya dilakukan dalam keadaan tahu hukumnya, dan taubat nasuha tetap membuka pintu ampunan. Kalau kamu atau orang di sekitarmu sedang bergumul dengan hal ini, cara paling baik dan dianjurkan adalah bicara dengan ustadz/pembimbing agama yang bisa dipercaya secara pribadi, bukan menghakimi diri sendiri sendirian.",
  },
  {
    judul: "Aborsi",
    ringkasan:
      "Menggugurkan kandungan tanpa alasan medis yang mendesak hukumnya haram, dengan rincian yang berbeda tergantung usia kehamilan menurut sebagian besar ulama.",
    dalil: "QS. Al-Isra: 31, QS. Al-An'am: 151.",
    poin: [
      "Setelah peniupan ruh (mayoritas ulama menghitung sekitar 120 hari/4 bulan kehamilan), aborsi disepakati haram kecuali darurat nyawa ibu terancam (fatwa medis).",
      "Sebelum peniupan ruh, ulama berbeda pendapat (khilafiyah) — sebagian tetap mengharamkan, sebagian membolehkan hanya untuk alasan darurat yang kuat (mis. kondisi medis serius), bukan alasan ekonomi/sosial semata.",
      "Kasus kehamilan akibat perkosaan adalah ranah ijtihad kontemporer yang diperselisihkan ulama — sebaiknya dikonsultasikan langsung dengan lembaga fatwa/ulama tepercaya karena melibatkan banyak pertimbangan syar'i dan medis sekaligus.",
    ],
  },
];

const HUKUM_IBADAH: Hukum[] = [
  {
    judul: "Meninggalkan shalat 5 waktu",
    ringkasan:
      "Shalat adalah rukun Islam kedua dan tiang agama. Meninggalkannya dengan sengaja (bukan karena lupa/uzur syar'i seperti sakit berat, haid, atau tertidur) adalah dosa besar terberat setelah syirik.",
    dalil:
      "HR. Muslim: 'Batas antara seseorang dengan kesyirikan dan kekufuran adalah meninggalkan shalat.' QS. Maryam: 59.",
    poin: [
      "Ulama sepakat meninggalkan shalat karena malas (masih meyakini wajib) adalah dosa besar, bukan kekafiran — wajib segera diqadha/dikerjakan begitu ingat/mampu, tidak dianggap gugur.",
      "Sebagian ulama (mis. sebagian riwayat dari madzhab Hanbali) berpendapat meninggalkan shalat secara total dan terus-menerus tanpa uzur bisa mengeluarkan seseorang dari Islam — pendapat ini diperselisihkan (khilafiyah), jumhur (Hanafi, Maliki, sebagian Syafi'i) tidak sampai pada kekafiran selama masih meyakini kewajibannya.",
      "Yang disepakati semua madzhab: mengingkari kewajiban shalat itu sendiri (menganggap tidak wajib) adalah kekafiran.",
    ],
    konsekuensi:
      "Tidak ada 'pengganti' pahala untuk shalat yang ditinggalkan sengaja — beda dengan puasa/zakat yang bisa diganti dengan cara lain, ulama sepakat qadha shalat yang sengaja ditinggalkan tetap wajib namun tidak menghapus dosa meninggalkannya di waktu itu; yang menghapus dosa tetaplah taubat nasuha disertai bertekad tidak mengulang dan mulai menjaga shalat sejak saat ini.",
  },
  {
    judul: "Tidak membayar zakat (bagi yang wajib)",
    ringkasan:
      "Zakat wajib bagi muslim yang hartanya mencapai nishab (batas minimal) dan haul (genap 1 tahun). Menahannya dengan sengaja padahal mampu adalah dosa besar.",
    dalil: "QS. At-Taubah: 34-35, dan hadits ancaman bagi penimbun harta yang tidak berzakat (HR. Bukhari-Muslim).",
    poin: [
      "Berbeda dengan sedekah (sunnah), zakat adalah kewajiban dengan syarat & perhitungan yang jelas (2,5% untuk zakat maal pada umumnya, dengan rincian berbeda untuk zakat pertanian/peternakan/perdagangan).",
      "Mengingkari kewajiban zakat (menganggap tidak wajib) adalah kekafiran menurut ijma' ulama; menahannya karena kikir/lalai padahal meyakini wajib adalah dosa besar, bukan kekafiran.",
      "Di masa Khalifah Abu Bakar, orang yang menolak membayar zakat diperangi — menunjukkan betapa seriusnya kewajiban ini dipandang generasi sahabat.",
    ],
  },
  {
    judul: "Sengaja tidak berpuasa Ramadhan (tanpa uzur)",
    ringkasan:
      "Puasa Ramadhan wajib bagi muslim yang baligh, berakal, dan mampu. Membatalkannya dengan sengaja tanpa uzur syar'i (bukan sakit, safar/bepergian jauh, haid, hamil/menyusui yang punya keringanan) adalah dosa besar.",
    dalil: "QS. Al-Baqarah: 183-185.",
    poin: [
      "Yang punya uzur syar'i (sakit, musafir, haid, dsb.) wajib mengqadha di hari lain, dan itu bukan dosa — ini keringanan (rukhshah) dari Allah, bukan pelanggaran.",
      "Sengaja membatalkan puasa tanpa uzur (misalnya makan/minum/berhubungan suami-istri di siang hari Ramadhan tanpa alasan syar'i) selain wajib qadha, sebagian pelanggaran (khususnya jima'/hubungan badan) juga mewajibkan kafarat (denda) yang berat menurut hadits shahih.",
    ],
  },
  {
    judul: "Tidak berhaji padahal mampu (istitha'ah)",
    ringkasan:
      "Haji wajib sekali seumur hidup bagi muslim yang mampu secara fisik, finansial, dan keamanan perjalanan (istitha'ah). Menunda-nunda tanpa alasan padahal mampu dipandang serius oleh ulama.",
    dalil: "QS. Ali Imran: 97.",
    poin: [
      "Sebagian ulama (mis. Imam Ahmad dalam salah satu riwayat) berpendapat menunda haji padahal sudah mampu dan tidak kunjung berangkat hingga wafat adalah dosa besar.",
      "Kewajiban ini hanya berlaku SEKALI bagi yang mampu; tidak wajib bagi yang secara finansial/fisik/keamanan tidak mampu — dalam hal ini gugur, bukan berdosa.",
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
  {
    judul: "Pinjaman online (pinjol) berbunga",
    ringkasan:
      "Pinjol/fintech lending yang mengenakan bunga atas keterlambatan atau bunga pinjaman pada dasarnya termasuk riba nasi'ah, hukumnya haram — sama seperti bunga bank konvensional.",
    poin: [
      "Yang membedakan halal/haram bukan platformnya (online/offline), tapi ada-tidaknya unsur bunga/denda tambahan dari pokok pinjaman.",
      "Fintech syariah (tanpa bunga, berbasis akad qardh/murabahah yang sesuai kaidah fiqih) adalah alternatif yang perlu dicek betul kepatuhan syariahnya, bukan sekadar labelnya.",
      "Terjebak dalam pinjol berbunga (riba) karena kondisi darurat/kesulitan finansial: dosanya lebih ringan daripada sengaja mencari-cari, tapi tetap wajib berusaha melunasi dan tidak mengulanginya begitu kondisi membaik.",
    ],
  },
  {
    judul: "Asuransi konvensional",
    ringkasan:
      "Mayoritas ulama kontemporer (termasuk fatwa MUI) memandang asuransi konvensional mengandung unsur gharar (ketidakjelasan), maisir (untung-untungan), dan riba pada pengelolaan dananya — sehingga hukumnya haram atau makruh mendekati haram.",
    poin: [
      "Asuransi syariah (takaful) dikembangkan sebagai alternatif, berbasis akad tolong-menolong (ta'awun) dan pengelolaan dana bebas riba/gharar yang berlebihan.",
      "Sebagian ulama kontemporer memberi keringanan untuk jenis asuransi yang sifatnya wajib dari negara/pekerjaan (mis. BPJS/asuransi kendaraan wajib) karena unsur darurat & maslahat, dengan syarat tidak ada alternatif syariah yang setara.",
    ],
  },
  {
    judul: "MLM/skema piramida & investasi bodong",
    ringkasan:
      "Skema yang keuntungannya bergantung dominan pada perekrutan anggota baru (bukan penjualan produk riil) mengandung unsur gharar dan maisir, hukumnya haram.",
    poin: [
      "Ciri yang perlu diwaspadai: janji keuntungan tetap/pasti tanpa risiko, keuntungan utama dari komisi rekrut (bukan margin penjualan wajar), dan struktur yang matematisnya mustahil berkelanjutan (member baru pasti habis).",
      "MLM yang produknya riil, harga wajar, dan komisi murni dari penjualan produk (bukan dari merekrut) — ada ulama yang membolehkan dengan syarat ketat; tetap perlu dicek detail skemanya kasus per kasus.",
    ],
  },
  {
    judul: "Suap (risywah) & korupsi",
    ringkasan:
      "Memberi atau menerima sesuatu untuk melancarkan urusan yang batil, atau menggelapkan harta/hak yang bukan miliknya (korupsi), adalah dosa besar yang dilaknat secara khusus dalam hadits.",
    dalil: "HR. Abu Dawud, Tirmidzi: Rasulullah melaknat penyuap dan penerima suap.",
    poin: [
      "Berbeda dengan hadiah biasa yang diberikan tanpa maksud melancarkan sesuatu yang batil — suap punya ciri khas: ada 'kepentingan' yang ingin dilancarkan secara tidak sah/curang.",
      "Korupsi (mengambil hak/harta publik yang bukan haknya) termasuk kategori memakan harta secara batil (QS. An-Nisa: 29) sekaligus mengkhianati amanah — dua dosa besar sekaligus.",
    ],
  },
];

const HUKUM_DOSA_BESAR: Hukum[] = [
  {
    judul: "Durhaka kepada orang tua",
    ringkasan:
      "Berbakti pada orang tua disebutkan Al-Qur'an langsung setelah perintah tauhid, menjadikannya salah satu kewajiban sosial paling ditekankan; durhaka (uququl walidain) termasuk dosa besar.",
    dalil: "QS. Al-Isra: 23-24, dan hadits Rasulullah yang menyebut durhaka pada orang tua sebagai salah satu dosa paling besar setelah syirik (HR. Bukhari-Muslim).",
    poin: [
      "Mencakup: membentak, menyakiti hati, mengabaikan kebutuhan mereka saat mampu membantu, hingga bentuk paling ringan seperti berkata 'ah' (QS. Al-Isra: 23).",
      "Kewajiban berbakti tetap berlaku meski orang tua berbeda agama, selama tidak diperintah untuk berbuat syirik/maksiat (QS. Luqman: 15).",
      "Ridha Allah bergantung pada ridha orang tua (dalam hal yang tidak bertentangan syariat) — hadits riwayat Tirmidzi.",
    ],
  },
  {
    judul: "Sihir & perdukunan",
    ringkasan:
      "Mempelajari, mempraktikkan, atau mendatangi dukun/paranormal untuk ramalan gaib hukumnya haram; sihir bahkan disebut sejajar dengan dosa besar terberat.",
    dalil: "HR. Bukhari-Muslim: sihir disebut dalam tujuh dosa yang membinasakan (bersama syirik, membunuh, riba, dsb.). HR. Muslim: shalat 40 hari tidak diterima bagi yang mendatangi dukun dan mempercayai ucapannya.",
    poin: [
      "Mendatangi 'orang pintar'/paranormal sekadar iseng tanpa mempercayai — shalatnya tidak diterima 40 hari (hadits di atas).",
      "Mendatangi dan MEMPERCAYAI ucapannya (mis. soal jodoh, rezeki gaib) — sebagian ulama memandang ini bisa jatuh pada kekafiran karena meyakini ada yang mengetahui hal gaib selain Allah.",
      "Mempelajari/mempraktikkan sihir untuk mencelakai/memisahkan orang — sebagian ulama (Hanbali) bahkan memandangnya sebagai kekafiran karena umumnya melibatkan kerja sama dengan jin/setan.",
    ],
  },
  {
    judul: "Menyakiti diri sendiri / bunuh diri",
    ringkasan:
      "Islam memandang nyawa sebagai amanah dari Allah yang tidak boleh diakhiri sendiri; bunuh diri termasuk dosa besar dengan ancaman keras dalam hadits shahih.",
    dalil: "QS. An-Nisa: 29-30, dan hadits Rasulullah tentang ancaman bagi yang mengakhiri hidupnya sendiri (HR. Bukhari-Muslim).",
    poin: [
      "Ancaman keras dalam hadits ini dipahami ulama sebagai peringatan (tahdid) yang menunjukkan besarnya dosa, bukan berarti otomatis kekal di neraka — status akhir seseorang tetap kembali pada kehendak dan rahmat Allah, sebagaimana dijelaskan di bagian 'Soal Neraka' di atas.",
      "Islam sangat menekankan pentingnya menjaga kesehatan jiwa dan mencari pertolongan saat kesulitan — bukan menghakimi orang yang sedang berjuang dengan pikiran seperti ini.",
    ],
    catatan:
      "Kalau kamu atau orang terdekatmu sedang punya pikiran untuk mengakhiri hidup, itu tanda untuk segera bicara dengan orang yang bisa dipercaya atau tenaga profesional (psikolog/psikiater) — bukan sesuatu yang harus dihadapi sendirian. Islam juga mendorong ikhtiar mencari pertolongan (HR. Muslim: 'Berobatlah, karena Allah tidak menurunkan penyakit kecuali menurunkan pula obatnya').",
  },
];

const HUKUM_KONTEMPORER: Hukum[] = [
  {
    judul: "Judi online & taruhan skor pertandingan",
    ringkasan:
      "Sama seperti judi konvensional, judi online (slot, taruhan olahraga, kasino digital, dsb.) hukumnya haram — medium digital tidak mengubah hakikat maisir di dalamnya.",
    dalil: "QS. Al-Ma'idah: 90-91.",
    poin: [
      "Termasuk kategori ini: slot online, taruhan skor bola, kartu online berbayar, dan aplikasi 'prediksi' berhadiah uang yang hakikatnya untung-untungan.",
      "Beberapa game gratis dengan sistem 'gacha'/loot box berbayar yang hasilnya acak juga masuk area yang diperselisihkan ulama kontemporer (khilafiyah) — sebagian menyamakannya dengan maisir jika melibatkan uang sungguhan dan hasil acak yang bernilai.",
    ],
  },
  {
    judul: "Konten pornografi",
    ringkasan:
      "Mengakses, menyimpan, atau menyebarkan konten pornografi hukumnya haram, termasuk dalam cakupan perintah menahan pandangan dan menjaga kemaluan.",
    dalil: "QS. An-Nur: 30-31, QS. Al-Mu'minun: 5-7.",
    poin: [
      "Dipandang sebagai salah satu 'perantara menuju zina' yang dilarang, sejalan dengan prinsip 'tidak mendekati zina' (QS. Al-Isra: 32).",
      "Islam mendorong penyaluran syahwat yang sah lewat pernikahan, dan bagi yang belum mampu, dianjurkan berpuasa untuk meredamnya (HR. Bukhari-Muslim) — bukan penyaluran lewat konten semacam ini.",
    ],
    konsekuensi:
      "Sama seperti dosa lain di halaman ini: kalau kamu pernah/masih terjebak, itu bukan alasan untuk putus asa — taubat nasuha (berhenti, menyesal, bertekad tidak mengulang) tetap membuka ampunan Allah, sebesar apa pun dosanya sebelumnya (QS. Az-Zumar: 53).",
  },
  {
    judul: "Ghibah, fitnah & ujaran kebencian di media sosial",
    ringkasan:
      "Membicarakan keburukan orang lain (ghibah) yang benar adanya, apalagi menyebarkan tuduhan yang tidak benar (fitnah/qadzaf), tetap haram meski dilakukan lewat teks/media sosial.",
    dalil: "QS. Al-Hujurat: 12 (ghibah diumpamakan memakan daging saudara sendiri yang sudah mati).",
    poin: [
      "Ghibah: menyebut keburukan seseorang yang benar-benar ada padanya di belakangnya, tanpa keperluan syar'i (mis. peringatan bahaya, kesaksian hukum) — haram.",
      "Fitnah/qadzaf: menuduh sesuatu yang tidak benar — dosanya lebih berat lagi karena mengandung kebohongan sekaligus pencemaran nama baik.",
      "Screenshot, repost, atau menyebarkan ulang konten ghibah/fitnah orang lain juga ikut menanggung dosa penyebarannya, bukan cuma pembuat aslinya.",
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
      "Gelatin, lemak, atau enzim yang berasal dari babi (sering tersembunyi dalam produk olahan, obat kapsul, permen kenyal) — haram, sertifikasi halal MUI/BPJPH ada untuk membantu memastikan kandungan produk.",
      "Alkohol sebagai bahan campuran makanan/minuman: jumhur ulama mengharamkan jika berasal dari khamr dan dalam kadar yang memabukkan; alkohol sintetis non-khamr untuk keperluan tertentu (mis. pelarut di industri makanan dalam kadar sangat kecil) adalah area khilafiyah kontemporer.",
    ],
  },
  {
    judul: "Rokok",
    poin: [
      "Tidak disebutkan eksplisit di zaman Nabi (belum ada saat itu), sehingga hukumnya termasuk ijtihad kontemporer (khilafiyah) — bukan konsensus.",
      "Mayoritas ulama kontemporer (termasuk fatwa Majelis Ulama, Al-Azhar, dan lembaga fatwa lain) condong pada haram atau minimal makruh keras, berdasarkan kaidah 'tidak boleh membahayakan diri sendiri/orang lain' (HR. Ibnu Majah) dan bukti medis bahaya kesehatannya.",
      "Sebagian ulama klasik/tradisional hanya memakruhkannya, belum sampai mengharamkan — karena itu status finalnya tetap diperselisihkan, meski tren fatwa kontemporer semakin condong ke haram.",
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
      {h.konsekuensi && (
        <div className="mt-3 border-t border-[var(--parchment-line)] pt-3">
          <p className="text-xs font-medium text-[var(--heading)] mb-1">
            Kalau tetap dilakukan — tahu atau tidak tahu:
          </p>
          <p className="text-xs text-[var(--ink-soft)] leading-relaxed">{h.konsekuensi}</p>
        </div>
      )}
    </div>
  );
}

export default function HukumIslamPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <BackButton href="/" label="Beranda" />
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
            Ibadah Wajib & Konsekuensi Meninggalkannya
          </h2>
          <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-6">
            Empat kewajiban inti setelah syahadat — shalat, zakat, puasa, dan
            haji bagi yang mampu — beserta status hukumnya kalau ditinggalkan.
          </p>
          <div className="space-y-5">
            {HUKUM_IBADAH.map((h) => (
              <Bagian key={h.judul} h={h} />
            ))}
          </div>
        </section>

        <section className="mb-14 rounded-sm border border-[var(--gold)]/40 bg-[var(--parchment-deep)]/40 p-5 md:p-6">
          <h2 className="font-display text-lg text-[var(--ink)] mb-3">
            Soal Neraka: Kenapa Halaman Ini Tidak Memetakan &quot;Dosa Ini =
            Lapisan Neraka Itu&quot;
          </h2>
          <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-3">
            Al-Qur&apos;an (QS. Al-Hijr: 43-44) menyebut Jahannam punya tujuh
            pintu/tingkatan. Dalam tafsir klasik (mis. Ibnu Katsir,
            Al-Qurthubi), ketujuh nama itu — <em>Jahannam, Ladza, Huthamah,
            Sa&apos;ir, Saqar, Jahim, Hawiyah</em> — umumnya dipahami sebagai
            penggolongan menurut <strong>kelompok</strong> penghuninya
            (misalnya orang musyrik, munafik, dsb.), <strong>bukan</strong>{" "}
            daftar &quot;kalau berbuat dosa A maka masuk lapisan B&quot; untuk
            setiap dosa yang dilakukan seorang muslim.
          </p>
          <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-3">
            Dalam akidah Ahlus Sunnah wal Jama&apos;ah, seorang mukmin yang
            melakukan dosa besar (selama ia tidak menghalalkannya / tidak
            mengingkari bahwa itu dosa, dan tidak keluar dari keimanan)
            statusnya di akhirat diserahkan sepenuhnya pada kehendak dan
            keadilan Allah — bisa disiksa dahulu sesuai kadar dosanya lalu
            tetap dimasukkan ke surga, atau langsung diampuni. Ini beda jauh
            dengan status orang kafir yang kekal di neraka. Karena itu, tidak
            ada dalil yang membenarkan klaim pasti &quot;pacaran/dosa X pasti
            membuatmu masuk neraka lapisan Y&quot; — itu perkara gaib, bukan
            wilayah manusia untuk memastikan.
          </p>
          <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
            Yang jelas diajarkan dan berlaku praktis untuk setiap hukum haram
            di halaman ini:
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--ink-soft)]">
            <li>
              • <strong>Tidak tahu (jahil), lalu berhenti setelah tahu:</strong>{" "}
              umumnya tidak dibebani dosa atas masa sebelum ia tahu, tapi wajib
              berhenti begitu tahu — ketidaktahuan bukan alasan untuk terus
              melanjutkan.
            </li>
            <li>
              • <strong>Tahu tapi tetap dilakukan:</strong> tercatat sebagai
              dosa (kecil atau besar tergantung jenis perbuatannya), dan wajib
              ditaubati.
            </li>
            <li>
              • <strong>Taubat nasuha</strong> (berhenti, menyesal sungguh-sungguh,
              bertekad tidak mengulang, dan mengembalikan hak orang lain jika
              ada yang dirugikan) menghapus dosa — sebesar apa pun — selama
              dilakukan sebelum ajal atau sebelum matahari terbit dari barat
              (QS. Az-Zumar: 53; HR. Muslim).
            </li>
          </ul>
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

        <section className="mb-14">
          <h2 className="font-display text-lg text-[var(--ink)] mb-2">
            Dosa Besar Lainnya
          </h2>
          <div className="space-y-5">
            {HUKUM_DOSA_BESAR.map((h) => (
              <Bagian key={h.judul} h={h} />
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="font-display text-lg text-[var(--ink)] mb-2">
            Isu Kontemporer & Media Sosial
          </h2>
          <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-6">
            Persoalan yang tidak ada di zaman Nabi secara literal, tapi
            hukumnya bisa diturunkan dari kaidah fiqih yang sudah ada
            (qiyas/ijtihad kontemporer).
          </p>
          <div className="space-y-5">
            {HUKUM_KONTEMPORER.map((h) => (
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
