// Data ringkas metode Iqro (mengikuti alur klasik Iqro karya KH As'ad Humam:
// jilid 1 huruf tunggal berharakat fathah, jilid 2 huruf sambung + mad thobii,
// jilid 3 kasroh/dhommah, jilid 4 tanwin/sukun/qalqalah, jilid 5 alif-lam &
// nun/mim mati, jilid 6 ghunnah & tanda waqaf). Disusun ulang & disederhanakan
// supaya cocok dibaca langsung di layar HP oleh anak-anak, bukan scan buku asli.

export type IqroContoh = {
  id: string;
  arab: string;
  latin: string;
  keterangan?: string;
};

export type IqroHalaman = {
  id: string;
  judul: string;
  penjelasan: string;
  contoh: IqroContoh[];
};

export type IqroJilid = {
  jilid: number;
  judul: string;
  warna: "teal" | "gold" | "maroon";
  ringkasan: string;
  tujuan: string[];
  halaman: IqroHalaman[];
};

function buatContoh(items: [string, string][], prefix: string): IqroContoh[] {
  return items.map(([arab, latin], i) => ({
    id: `${prefix}-${i + 1}`,
    arab,
    latin,
  }));
}

export const IQRO_DATA: IqroJilid[] = [
  {
    jilid: 1,
    judul: "Jilid 1 — Mengenal Huruf Hijaiyah",
    warna: "teal",
    ringkasan:
      "Fokus mengenalkan bentuk 28 huruf hijaiyah satu per satu dengan harakat fathah (bunyi 'a'), dibaca pendek dan tegas tanpa mengeja panjang.",
    tujuan: [
      "Anak hafal bentuk & bunyi setiap huruf hijaiyah tunggal",
      "Membaca langsung tanpa dieja (a-ba-ta, bukan a, ba, a-ba)",
      "Membedakan huruf yang bentuknya mirip, misalnya ب ت ث",
    ],
    halaman: [
      {
        id: "1-1",
        judul: "Huruf ا sampai ذ berharakat fathah",
        penjelasan:
          "Baca setiap huruf dengan bunyi 'a' pendek, cepat dan tidak mendayu-dayu.",
        contoh: buatContoh(
          [
            ["أَ", "a"],
            ["بَ", "ba"],
            ["تَ", "ta"],
            ["ثَ", "tsa"],
            ["جَ", "ja"],
            ["حَ", "ha"],
            ["خَ", "kha"],
            ["دَ", "da"],
            ["ذَ", "dza"],
          ],
          "j1h1"
        ),
      },
      {
        id: "1-2",
        judul: "Huruf ر sampai ص berharakat fathah",
        penjelasan: "Lanjutan huruf hijaiyah, perhatikan huruf yang mirip seperti ر dan ز.",
        contoh: buatContoh(
          [
            ["رَ", "ra"],
            ["زَ", "za"],
            ["سَ", "sa"],
            ["شَ", "sya"],
            ["صَ", "sha"],
            ["ضَ", "dha"],
            ["طَ", "tha"],
            ["ظَ", "zha"],
          ],
          "j1h2"
        ),
      },
      {
        id: "1-3",
        judul: "Huruf ع sampai ي berharakat fathah",
        penjelasan: "Huruf terakhir. ع dan غ keluar dari tenggorokan, latih pelan-pelan.",
        contoh: buatContoh(
          [
            ["عَ", "'a"],
            ["غَ", "gha"],
            ["فَ", "fa"],
            ["قَ", "qa"],
            ["كَ", "ka"],
            ["لَ", "la"],
            ["مَ", "ma"],
            ["نَ", "na"],
            ["وَ", "wa"],
            ["هَ", "ha"],
            ["يَ", "ya"],
          ],
          "j1h3"
        ),
      },
      {
        id: "1-4",
        judul: "Latihan rangkai 2 huruf",
        penjelasan: "Gabungkan dua huruf berharakat fathah, dibaca langsung menyatu.",
        contoh: buatContoh(
          [
            ["بَتَ", "bata"],
            ["جَدَ", "jada"],
            ["رَسَ", "rasa"],
            ["كَتَبَ", "kataba"],
            ["فَتَحَ", "fataha"],
            ["نَظَرَ", "nazhara"],
          ],
          "j1h4"
        ),
      },
      {
        id: "1-5",
        judul: "Latihan rangkai 3 huruf",
        penjelasan: "Kata 3 huruf berharakat fathah, tetap dibaca langsung tanpa dieja.",
        contoh: buatContoh(
          [
            ["جَلَسَ", "jalasa"],
            ["ذَهَبَ", "dzahaba"],
            ["خَرَجَ", "kharaja"],
            ["دَخَلَ", "dakhala"],
            ["حَمَلَ", "hamala"],
            ["طَلَبَ", "thalaba"],
            ["سَأَلَ", "sa-ala"],
            ["عَمَلَ", "'amala"],
          ],
          "j1h5"
        ),
      },
      {
        id: "1-6",
        judul: "Evaluasi — kenali huruf secara acak",
        penjelasan:
          "Huruf-huruf berikut sengaja diacak, bukan berurutan seperti halaman 1-3. Kalau semua sudah lancar dibaca tanpa mikir lama, siap lanjut ke Jilid 2.",
        contoh: buatContoh(
          [
            ["ثَ", "tsa"],
            ["ضَ", "dha"],
            ["مَ", "ma"],
            ["خَ", "kha"],
            ["طَ", "tha"],
            ["غَ", "gha"],
            ["زَ", "za"],
            ["قَ", "qa"],
            ["ظَ", "zha"],
            ["نَ", "na"],
          ],
          "j1h6"
        ),
      },
      {
        id: "1-7",
        judul: "Latihan huruf yang bentuknya mirip",
        penjelasan:
          "Kelompok huruf ini sering tertukar kalau tidak teliti. Bandingkan titiknya: di atas, di bawah, atau tanpa titik.",
        contoh: buatContoh(
          [
            ["بَ", "ba"],
            ["تَ", "ta"],
            ["ثَ", "tsa"],
            ["جَ", "ja"],
            ["حَ", "ha"],
            ["خَ", "kha"],
            ["دَ", "da"],
            ["ذَ", "dza"],
            ["رَ", "ra"],
            ["زَ", "za"],
            ["سَ", "sa"],
            ["شَ", "sya"],
          ],
          "j1h7"
        ),
      },
      {
        id: "1-8",
        judul: "Evaluasi akhir jilid 1 — semua huruf diacak",
        penjelasan:
          "Halaman penutup jilid 1. Semua 28 huruf hijaiyah berharakat fathah diacak total. Kalau lancar dibaca tanpa berpikir lama, lanjut ke Jilid 2.",
        contoh: buatContoh(
          [
            ["حَ", "ha"],
            ["ذَ", "dza"],
            ["فَ", "fa"],
            ["يَ", "ya"],
            ["صَ", "sha"],
            ["لَ", "la"],
            ["أَ", "a"],
            ["ظَ", "zha"],
            ["مَ", "ma"],
            ["شَ", "sya"],
            ["وَ", "wa"],
            ["ثَ", "tsa"],
            ["كَ", "ka"],
            ["ضَ", "dha"],
          ],
          "j1h8"
        ),
      },
      {
        id: "1-9",
        judul: "Latihan huruf tunggal — urutan terbalik",
        penjelasan:
          "Baca huruf dari ي mundur ke ا. Kalau anak sudah lancar walau urutannya dibalik, artinya bukan hafalan urutan, tapi memang sudah kenal bentuknya.",
        contoh: buatContoh(
          [
            ["يَ", "ya"],
            ["وَ", "wa"],
            ["هَ", "ha"],
            ["نَ", "na"],
            ["مَ", "ma"],
            ["لَ", "la"],
            ["كَ", "ka"],
            ["قَ", "qa"],
            ["فَ", "fa"],
            ["غَ", "gha"],
            ["عَ", "'a"],
          ],
          "j1h9"
        ),
      },
      {
        id: "1-10",
        judul: "Latihan rangkai 2 huruf — kelompok baru",
        penjelasan: "Gabungan 2 huruf berharakat fathah, kelompok huruf yang belum dipakai di halaman rangkai sebelumnya.",
        contoh: buatContoh(
          [
            ["حَلَ", "hala"],
            ["خَرَ", "khara"],
            ["ذَهَ", "dzaha"],
            ["رَقَ", "raqa"],
            ["سَطَ", "satha"],
            ["شَغَ", "syagha"],
            ["صَفَ", "shafa"],
            ["ضَقَ", "dhaqa"],
          ],
          "j1h10"
        ),
      },
      {
        id: "1-11",
        judul: "Latihan rangkai 3 huruf — kelompok baru",
        penjelasan: "Kata 3 huruf berharakat fathah lanjutan, kata-kata baru yang belum muncul di halaman 1-5.",
        contoh: buatContoh(
          [
            ["سَكَنَ", "sakana"],
            ["وَقَفَ", "waqafa"],
            ["ذَكَرَ", "dzakara"],
            ["نَصَحَ", "nashaha"],
            ["قَصَدَ", "qashada"],
            ["رَفَعَ", "rafa'a"],
            ["مَنَعَ", "mana'a"],
          ],
          "j1h11"
        ),
      },
      {
        id: "1-12",
        judul: "Evaluasi akhir — 28 huruf hijaiyah urut satu baris",
        penjelasan:
          "Halaman penutup jilid 1. Semua 28 huruf hijaiyah berurutan dari ا sampai ي dalam satu tarikan bacaan, sebagai tolok ukur akhir sebelum naik ke Jilid 2.",
        contoh: buatContoh(
          [
            ["أَ", "a"],
            ["بَ", "ba"],
            ["تَ", "ta"],
            ["ثَ", "tsa"],
            ["جَ", "ja"],
            ["حَ", "ha"],
            ["خَ", "kha"],
            ["دَ", "da"],
            ["ذَ", "dza"],
            ["رَ", "ra"],
            ["زَ", "za"],
            ["سَ", "sa"],
            ["شَ", "sya"],
            ["صَ", "sha"],
            ["ضَ", "dha"],
            ["طَ", "tha"],
            ["ظَ", "zha"],
            ["عَ", "'a"],
            ["غَ", "gha"],
            ["فَ", "fa"],
            ["قَ", "qa"],
            ["كَ", "ka"],
            ["لَ", "la"],
            ["مَ", "ma"],
            ["نَ", "na"],
            ["وَ", "wa"],
            ["هَ", "ha"],
            ["يَ", "ya"],
          ],
          "j1h12"
        ),
      },
    ],
  },
  {
    jilid: 2,
    judul: "Jilid 2 — Huruf Bersambung & Mad Thobii Alif",
    warna: "gold",
    ringkasan:
      "Mengenal bentuk huruf ketika bersambung (di awal, tengah, akhir kata) serta bacaan panjang dua harakat karena huruf ا setelah fathah.",
    tujuan: [
      "Mengenali huruf hijaiyah dalam bentuk sambung, bukan hanya bentuk tunggal",
      "Membaca mad thobii sederhana: fathah bertemu alif dibaca panjang",
      "Lancar membaca kata 3-4 huruf bersambung",
    ],
    halaman: [
      {
        id: "2-1",
        judul: "Huruf sambung di awal & tengah kata",
        penjelasan: "Perhatikan bentuk huruf berubah saat disambung dengan huruf lain.",
        contoh: buatContoh(
          [
            ["بَتَبَ", "batab"],
            ["تَجَدَ", "tajada"],
            ["سَمَعَ", "sama'a"],
            ["كَبَرَ", "kabara"],
            ["نَصَرَ", "nashara"],
          ],
          "j2h1"
        ),
      },
      {
        id: "2-2",
        judul: "Mad Thobii — fathah bertemu ا",
        penjelasan:
          "Kalau ada huruf berharakat fathah lalu diikuti ا, dibaca panjang 2 harakat: 'aa'.",
        contoh: buatContoh(
          [
            ["بَا", "baa"],
            ["جَاءَ", "jaa-a"],
            ["قَالَ", "qaala"],
            ["كَانَ", "kaana"],
            ["رَجَا", "rajaa"],
          ],
          "j2h2"
        ),
      },
      {
        id: "2-3",
        judul: "Latihan kata 4 huruf bersambung",
        penjelasan: "Gabungan huruf sambung biasa dan mad thobii dalam satu kata.",
        contoh: buatContoh(
          [
            ["كَاتَبَ", "kaataba"],
            ["سَافَرَ", "saafara"],
            ["حَاوَلَ", "haawala"],
            ["بَارَكَ", "baaraka"],
          ],
          "j2h3"
        ),
      },
      {
        id: "2-4",
        judul: "Latihan bacaan pendek",
        penjelasan: "Baca dengan lancar, tidak putus-putus di tengah kata.",
        contoh: buatContoh(
          [
            ["ذَهَبَ بَابَا", "dzahaba baabaa"],
            ["قَامَ وَالِدِي", "qaama waalidii"],
            ["كَتَبَ هَادِي", "kataba haadii"],
          ],
          "j2h4"
        ),
      },
      {
        id: "2-5",
        judul: "Mad Thobii dalam kata sehari-hari",
        penjelasan: "Perbanyak latihan mad alif supaya panjangnya konsisten 2 harakat, tidak kurang tidak lebih.",
        contoh: buatContoh(
          [
            ["نَجَا", "najaa"],
            ["دَعَا", "da'aa"],
            ["عَصَا", "'ashaa"],
            ["مَاتَ", "maata"],
            ["طَابَ", "thaaba"],
            ["حَاجَ", "haaja"],
          ],
          "j2h5"
        ),
      },
      {
        id: "2-6",
        judul: "Latihan kalimat lanjutan",
        penjelasan: "Gabungkan huruf sambung biasa dan mad thobii dalam kalimat yang lebih panjang.",
        contoh: buatContoh(
          [
            ["جَاءَ بَابَا وَ مَامَا", "jaa-a baabaa wa maamaa"],
            ["قَالَ حَامِدٌ صَادِقٌ", "qaala haamidun shaadiqun"],
            ["سَافَرَ حَاتِمٌ وَ نَاصِرٌ", "saafara haatimun wa naashirun"],
          ],
          "j2h6"
        ),
      },
      {
        id: "2-7",
        judul: "Bedakan huruf sambung vs huruf berdiri sendiri",
        penjelasan:
          "Beberapa huruf (ا د ذ ر ز و) tidak bisa disambung ke huruf sesudahnya — perhatikan bentuknya tetap sama walau ada di tengah kata.",
        contoh: buatContoh(
          [
            ["دَارَ", "daara"],
            ["زَارَ", "zaara"],
            ["وَرَدَ", "warada"],
            ["أَرَادَ", "araada"],
            ["وَجَدَ", "wajada"],
          ],
          "j2h7"
        ),
      },
      {
        id: "2-8",
        judul: "Evaluasi akhir jilid 2",
        penjelasan:
          "Gabungan huruf sambung dan mad thobii alif dalam kalimat penutup jilid 2. Baca lancar tanpa terputus-putus sebelum lanjut ke Jilid 3.",
        contoh: buatContoh(
          [
            ["جَاءَ حَامِدٌ وَ سَافَرَ خَالِدٌ", "jaa-a haamidun wa saafara khaalidun"],
            ["قَامَتْ هَادِيَةُ وَ قَالَتْ نَادِيَةُ", "qaamat haadiyatu wa qaalat naadiyatu"],
          ],
          "j2h8"
        ),
      },
      {
        id: "2-9",
        judul: "Huruf sambung — posisi awal, tengah, akhir",
        penjelasan: "Perhatikan huruf yang sama bisa berubah bentuk tergantung posisinya di kata: awal, tengah, atau akhir.",
        contoh: buatContoh(
          [
            ["كَتَبَ", "kataba"],
            ["سَمِعَ", "sami'a"],
            ["جَلَسَا", "jalasaa"],
            ["ذَهَبَا", "dzahabaa"],
            ["تَبَادَلَا", "tabaadalaa"],
          ],
          "j2h9"
        ),
      },
      {
        id: "2-10",
        judul: "Mad Thobii alif lanjutan — kata baru",
        penjelasan: "Perbanyak lagi kata dengan mad thobii alif, kelompok kata yang belum dipakai sebelumnya.",
        contoh: buatContoh(
          [
            ["زَارَ", "zaara"],
            ["فَازَ", "faaza"],
            ["دَعَاهَا", "da'aahaa"],
            ["تَابَ", "taaba"],
            ["أَرَادَ", "araada"],
          ],
          "j2h10"
        ),
      },
      {
        id: "2-11",
        judul: "Latihan kalimat pendek lanjutan",
        penjelasan: "Rangkaian 2-3 kata bersambung dengan mad thobii, dibaca menyatu tanpa jeda di tengah kata.",
        contoh: buatContoh(
          [
            ["زَارَ خَالِدٌ وَ حَامِدٌ", "zaara khaalidun wa haamidun"],
            ["قَامَ نَاصِرٌ وَ سَافَرَ هَادِي", "qaama naashirun wa saafara haadii"],
          ],
          "j2h11"
        ),
      },
      {
        id: "2-12",
        judul: "Evaluasi akhir jilid 2 — bacaan lebih panjang",
        penjelasan: "Kalimat penutup jilid 2, gabungan seluruh huruf sambung dan mad thobii alif. Pastikan lancar sebelum lanjut ke Jilid 3.",
        contoh: buatContoh(
          [
            ["جَاءَ حَامِدٌ وَ سَافَرَ خَالِدٌ وَ نَاصِرٌ", "jaa-a haamidun wa saafara khaalidun wa naashirun"],
          ],
          "j2h12"
        ),
      },
    ],
  },
  {
    jilid: 3,
    judul: "Jilid 3 — Kasroh, Dhommah & Mad Thobii Ya/Wau",
    warna: "teal",
    ringkasan:
      "Mengenal harakat kasroh (bunyi 'i') dan dhommah (bunyi 'u'), termasuk bacaan panjangnya.",
    tujuan: [
      "Membaca huruf berharakat kasroh dan dhommah dengan tepat",
      "Mengenal mad thobii ya (kasroh + ي) dan mad thobii wau (dhommah + و)",
      "Tidak tertukar antara i pendek/panjang dan u pendek/panjang",
    ],
    halaman: [
      {
        id: "3-1",
        judul: "Huruf berharakat kasroh",
        penjelasan: "Baca dengan bunyi 'i' pendek dan jelas.",
        contoh: buatContoh(
          [
            ["بِ", "bi"],
            ["تِ", "ti"],
            ["جِ", "ji"],
            ["سِ", "si"],
            ["مِ", "mi"],
            ["نِ", "ni"],
          ],
          "j3h1"
        ),
      },
      {
        id: "3-2",
        judul: "Huruf berharakat dhommah",
        penjelasan: "Baca dengan bunyi 'u' pendek dan jelas.",
        contoh: buatContoh(
          [
            ["بُ", "bu"],
            ["تُ", "tu"],
            ["جُ", "ju"],
            ["سُ", "su"],
            ["مُ", "mu"],
            ["نُ", "nu"],
          ],
          "j3h2"
        ),
      },
      {
        id: "3-3",
        judul: "Mad Thobii — kasroh + ي, dhommah + و",
        penjelasan: "Dibaca panjang 2 harakat: 'ii' untuk kasroh-ya, 'uu' untuk dhommah-wau.",
        contoh: buatContoh(
          [
            ["بِي", "bii"],
            ["فِي", "fii"],
            ["يَقُولُ", "yaquulu"],
            ["نُورٌ", "nuurun"],
            ["مِسْكِينٌ", "miskiinun"],
          ],
          "j3h3"
        ),
      },
      {
        id: "3-4",
        judul: "Latihan campuran fathah, kasroh, dhommah",
        penjelasan: "Perhatikan pergantian bunyi a-i-u dalam satu kata.",
        contoh: buatContoh(
          [
            ["كَبِيرٌ", "kabiirun"],
            ["جَمِيلٌ", "jamiilun"],
            ["رَحِيمٌ", "rahiimun"],
            ["غَفُورٌ", "ghafuurun"],
          ],
          "j3h4"
        ),
      },
      {
        id: "3-5",
        judul: "Latihan kata berharakat kasroh & dhommah lanjutan",
        penjelasan: "Perbanyak latihan supaya bunyi 'i' dan 'u' tidak tertukar.",
        contoh: buatContoh(
          [
            ["عِلْمٌ", "'ilmun"],
            ["حِلْمٌ", "hilmun"],
            ["كُتُبٌ", "kutubun"],
            ["رُسُلٌ", "rusulun"],
            ["سِرَاجٌ", "siraajun"],
            ["نُذُرٌ", "nudzurun"],
          ],
          "j3h5"
        ),
      },
      {
        id: "3-6",
        judul: "Evaluasi jilid 3 — tiga harakat dalam satu kalimat",
        penjelasan: "Baca perlahan, perhatikan tiap huruf: apakah fathah, kasroh, atau dhommah.",
        contoh: buatContoh(
          [
            ["رَبُّنَا كَرِيمٌ", "rabbunaa kariimun"],
            ["هُوَ عَلِيمٌ حَكِيمٌ", "huwa 'aliimun hakiimun"],
          ],
          "j3h6"
        ),
      },
      {
        id: "3-7",
        judul: "Mad Thobii ya & wau lanjutan",
        penjelasan: "Perbanyak latihan supaya panjang 'ii' dan 'uu' konsisten 2 harakat, tidak kurang tidak lebih.",
        contoh: buatContoh(
          [
            ["طَوِيلٌ", "thawiilun"],
            ["جَدِيدٌ", "jadiidun"],
            ["مَشْكُورٌ", "masykuurun"],
            ["مَوْجُودٌ", "mawjuudun"],
            ["صَغِيرٌ", "shaghiirun"],
            ["كَبِيرٌ", "kabiirun"],
          ],
          "j3h7"
        ),
      },
      {
        id: "3-8",
        judul: "Evaluasi akhir jilid 3",
        penjelasan:
          "Kalimat penutup jilid 3, gabungan fathah, kasroh, dhommah, dan mad thobii. Baca dengan tenang, tidak perlu terburu-buru.",
        contoh: buatContoh(
          [
            ["رَبُّنَا رَحِيمٌ وَ غَفُورٌ", "rabbunaa rahiimun wa ghafuurun"],
            ["هَذَا كِتَابٌ مُفِيدٌ", "haadzaa kitaabun mufiidun"],
          ],
          "j3h8"
        ),
      },
      {
        id: "3-9",
        judul: "Kasroh & dhommah — kelompok huruf baru",
        penjelasan: "Lanjutan latihan bunyi 'i' dan 'u' pendek pada huruf-huruf yang belum banyak dipakai di halaman sebelumnya.",
        contoh: buatContoh(
          [
            ["دِ", "di"],
            ["ذِ", "dzi"],
            ["رِ", "ri"],
            ["زِ", "zi"],
            ["دُ", "du"],
            ["ذُ", "dzu"],
            ["رُ", "ru"],
            ["زُ", "zu"],
          ],
          "j3h9"
        ),
      },
      {
        id: "3-10",
        judul: "Mad Thobii ya & wau — kata baru",
        penjelasan: "Perbanyak lagi kosakata dengan mad thobii ya (kasroh + ي) dan mad thobii wau (dhommah + و).",
        contoh: buatContoh(
          [
            ["سَعِيدٌ", "sa'iidun"],
            ["حَكِيمٌ", "hakiimun"],
            ["قُلُوبٌ", "quluubun"],
            ["عُيُونٌ", "'uyuunun"],
            ["جُنُودٌ", "junuudun"],
          ],
          "j3h10"
        ),
      },
      {
        id: "3-11",
        judul: "Latihan campuran tiga harakat — kata baru",
        penjelasan: "Kata dengan fathah, kasroh, dan dhommah bercampur dalam satu kata, kelompok kata baru.",
        contoh: buatContoh(
          [
            ["سَلِيمٌ", "saliimun"],
            ["كَثِيرٌ", "katsiirun"],
            ["قَرِيبٌ", "qariibun"],
            ["شَكُورٌ", "syakuurun"],
            ["وَدُودٌ", "waduudun"],
          ],
          "j3h11"
        ),
      },
      {
        id: "3-12",
        judul: "Evaluasi akhir jilid 3 — kalimat lebih panjang",
        penjelasan: "Kalimat penutup jilid 3, gabungan fathah, kasroh, dhommah, dan mad thobii ya/wau. Pastikan lancar sebelum lanjut ke Jilid 4.",
        contoh: buatContoh(
          [
            ["رَبُّنَا سَمِيعٌ قَرِيبٌ وَدُودٌ", "rabbunaa samii'un qariibun waduudun"],
          ],
          "j3h12"
        ),
      },
    ],
  },
  {
    jilid: 4,
    judul: "Jilid 4 — Tanwin, Sukun & Qalqalah",
    warna: "gold",
    ringkasan:
      "Mengenal tanda baca tanwin (bunyi akhiran -n), huruf mati (sukun), dan huruf qalqalah yang dipantulkan.",
    tujuan: [
      "Membaca tanwin: fathatain, kasrotain, dhommatain",
      "Membaca huruf sukun (mati) dengan tepat, tidak dipanjangkan",
      "Mengenal 5 huruf qalqalah: ق ط ب ج د dan cara memantulkannya",
    ],
    halaman: [
      {
        id: "4-1",
        judul: "Tanwin — fathatain, kasrotain, dhommatain",
        penjelasan: "Tanwin dibaca seperti huruf + n di akhir kata.",
        contoh: buatContoh(
          [
            ["كِتَابًا", "kitaaban"],
            ["رَجُلٍ", "rajulin"],
            ["كِتَابٌ", "kitaabun"],
            ["عَلِيمًا", "'aliiman"],
          ],
          "j4h1"
        ),
      },
      {
        id: "4-2",
        judul: "Huruf sukun (mati)",
        penjelasan: "Huruf bertanda sukun dibaca mati/pendek, langsung digabung ke huruf sebelumnya.",
        contoh: buatContoh(
          [
            ["يَكْتُبُ", "yaktubu"],
            ["اَلْحَمْدُ", "alhamdu"],
            ["مِنْ", "min"],
            ["عَنْ", "'an"],
          ],
          "j4h2"
        ),
      },
      {
        id: "4-3",
        judul: "Huruf Qalqalah: ق ط ب ج د",
        penjelasan:
          "Kalau lima huruf ini sukun/berhenti di akhir bacaan, dipantulkan sedikit, tidak dibaca datar.",
        contoh: buatContoh(
          [
            ["يَقْطَعُ", "yaqtha'u"],
            ["أَحَدْ", "ahad"],
            ["يَجْعَلُ", "yaj'alu"],
            ["قُلْ هُوَ اللَّهُ أَحَدٌ", "qul huwallaahu ahad"],
          ],
          "j4h3"
        ),
      },
      {
        id: "4-4",
        judul: "Latihan campuran tanwin & sukun",
        penjelasan: "Baca perlahan, perhatikan mana yang tanwin dan mana yang sukun.",
        contoh: buatContoh(
          [
            ["مِنْ شَرِّ مَا خَلَقَ", "min syarri maa khalaq"],
            ["رَبًّا رَحِيمًا", "rabban rahiiman"],
          ],
          "j4h4"
        ),
      },
      {
        id: "4-5",
        judul: "Latihan tanwin lanjutan",
        penjelasan: "Ketiga jenis tanwin dicampur, baca satu-satu dengan tenang dulu sebelum lanjut.",
        contoh: buatContoh(
          [
            ["عَظِيمٌ", "'azhiimun"],
            ["عَظِيمًا", "'azhiiman"],
            ["عَظِيمٍ", "'azhiimin"],
            ["سَلَامٌ", "salaamun"],
            ["سَلَامًا", "salaaman"],
          ],
          "j4h5"
        ),
      },
      {
        id: "4-6",
        judul: "Latihan qalqalah lanjutan",
        penjelasan: "Lima huruf qalqalah (ق ط ب ج د) saat sukun di tengah atau berhenti di akhir kata, dipantulkan ringan.",
        contoh: buatContoh(
          [
            ["يَدْخُلُونَ", "yadkhuluun"],
            ["نَبْتَغِي", "nabtaghii"],
            ["أَبْصَارُهُمْ", "abshaaruhum"],
            ["الْفَلَقْ", "al-falaq"],
          ],
          "j4h6"
        ),
      },
      {
        id: "4-7",
        judul: "Evaluasi jilid 4",
        penjelasan: "Kalimat gabungan tanwin, sukun, dan qalqalah — bekal siap ke Jilid 5.",
        contoh: buatContoh(
          [
            ["وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ", "walam yakul lahuu kufuwan ahad"],
          ],
          "j4h7"
        ),
      },
      {
        id: "4-8",
        judul: "Latihan tambahan sebelum lanjut ke jilid 5",
        penjelasan: "Kalimat gabungan tanwin, sukun, dan qalqalah yang lebih panjang. Pastikan lancar sebelum pindah jilid.",
        contoh: buatContoh(
          [
            ["إِنَّا أَعْطَيْنَاكَ الْكَوْثَرْ", "innaa a'thainaakal kautsar"],
            ["مِنْ خَيْرٍ وَ بَرَكَاتٍ", "min khairin wa barakaatin"],
          ],
          "j4h8"
        ),
      },
      {
        id: "4-9",
        judul: "Tanwin lanjutan — kata baru",
        penjelasan: "Tiga jenis tanwin (fathatain, kasrotain, dhommatain) pada kata-kata yang belum dipakai di halaman sebelumnya.",
        contoh: buatContoh(
          [
            ["كَبِيرًا", "kabiiran"],
            ["كَبِيرٍ", "kabiirin"],
            ["كَبِيرٌ", "kabiirun"],
            ["جَمِيلًا", "jamiilan"],
            ["جَمِيلٍ", "jamiilin"],
            ["جَمِيلٌ", "jamiilun"],
          ],
          "j4h9"
        ),
      },
      {
        id: "4-10",
        judul: "Sukun lanjutan — kata baru",
        penjelasan: "Huruf sukun (mati) pada kata-kata baru, dibaca pendek langsung tanpa dipanjangkan.",
        contoh: buatContoh(
          [
            ["يَشْرَبُ", "yasyrabu"],
            ["يَذْهَبُ", "yadzhabu"],
            ["عِنْدَ", "'inda"],
            ["بَعْدَ", "ba'da"],
            ["قَبْلَ", "qabla"],
          ],
          "j4h10"
        ),
      },
      {
        id: "4-11",
        judul: "Qalqalah lanjutan — kata baru",
        penjelasan: "Lima huruf qalqalah (ق ط ب ج د) pada kata baru, dipantulkan ringan saat sukun/berhenti.",
        contoh: buatContoh(
          [
            ["يَطْبَعُ", "yathba'u"],
            ["أَبْدَعَ", "abda'a"],
            ["يَجْتَهِدُ", "yajtahidu"],
            ["مَجْدٌ", "majdun"],
            ["قُلْ هُوَ اللَّهُ أَحَدْ", "qul huwallaahu ahad"],
          ],
          "j4h11"
        ),
      },
      {
        id: "4-12",
        judul: "Evaluasi akhir jilid 4 — bacaan lebih panjang",
        penjelasan: "Kalimat penutup jilid 4, gabungan tanwin, sukun, dan qalqalah dalam satu bacaan. Pastikan lancar sebelum lanjut ke Jilid 5.",
        contoh: buatContoh(
          [
            ["وَبَشِّرِ الصَّابِرِينَ", "wa basysyiris shaabiriin"],
          ],
          "j4h12"
        ),
      },
    ],
  },
  {
    jilid: 5,
    judul: "Jilid 5 — Alif Lam & Nun/Mim Mati",
    warna: "maroon",
    ringkasan:
      "Mengenal alif lam qamariyah dan syamsiyah, serta bacaan nun mati/tanwin bertemu huruf lain (idzhar, ikhfa sederhana).",
    tujuan: [
      "Membedakan alif lam qamariyah (lam dibaca jelas) dan syamsiyah (lam melebur)",
      "Mengenal bacaan nun mati/tanwin secara sederhana",
      "Membaca kalimat pendek dengan lancar tanpa terbata-bata",
    ],
    halaman: [
      {
        id: "5-1",
        judul: "Alif Lam Qamariyah",
        penjelasan: "Huruf lam (ال) dibaca jelas ketika bertemu 14 huruf qamariyah, contoh ق ب ح.",
        contoh: buatContoh(
          [
            ["اَلْقَمَرُ", "al-qamaru"],
            ["اَلْبَيْتُ", "al-baitu"],
            ["اَلْحَمْدُ", "al-hamdu"],
            ["اَلْكِتَابُ", "al-kitaabu"],
          ],
          "j5h1"
        ),
      },
      {
        id: "5-2",
        judul: "Alif Lam Syamsiyah",
        penjelasan: "Huruf lam melebur (tidak dibaca) ketika bertemu 14 huruf syamsiyah, contoh ش ر س.",
        contoh: buatContoh(
          [
            ["اَلشَّمْسُ", "asy-syamsu"],
            ["اَلرَّحْمَنُ", "ar-rahmaanu"],
            ["اَلسَّمَاءُ", "as-samaa-u"],
            ["اَلنَّاسُ", "an-naasu"],
          ],
          "j5h2"
        ),
      },
      {
        id: "5-3",
        judul: "Nun mati / tanwin bertemu huruf lain",
        penjelasan: "Pengenalan awal saja — pembahasan lengkap hukum nun mati ada di Ilmu Tajwid.",
        contoh: buatContoh(
          [
            ["مِنْ رَبِّهِمْ", "mir rabbihim"],
            ["مَنْ يَعْمَلْ", "may ya'mal"],
            ["عَذَابٌ أَلِيمٌ", "'adzaabun aliim"],
          ],
          "j5h3"
        ),
      },
      {
        id: "5-4",
        judul: "Latihan kalimat pendek",
        penjelasan: "Rangkaikan semua yang sudah dipelajari, baca dengan tenang dan jelas.",
        contoh: buatContoh(
          [
            ["اَلْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", "alhamdu lillaahi rabbil 'aalamiin"],
            ["بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ", "bismillaahir rahmaanir rahiim"],
          ],
          "j5h4"
        ),
      },
      {
        id: "5-5",
        judul: "Latihan alif lam campuran",
        penjelasan: "Bedakan lagi qamariyah (lam jelas) dan syamsiyah (lam melebur, huruf sesudahnya ditasydidkan).",
        contoh: buatContoh(
          [
            ["اَلْعَلِيمُ", "al-'aliimu"],
            ["اَلْغَفُورُ", "al-ghafuuru"],
            ["اَلرَّحِيمُ", "ar-rahiimu"],
            ["اَلتَّوَّابُ", "at-tawwaabu"],
            ["اَلْمَلِكُ", "al-maliku"],
            ["اَلضَّالِّينَ", "adh-dhaalliin"],
          ],
          "j5h5"
        ),
      },
      {
        id: "5-6",
        judul: "Latihan nun mati/tanwin lanjutan",
        penjelasan: "Masih pengenalan awal saja, tetap dibaca hati-hati dan jangan tergesa.",
        contoh: buatContoh(
          [
            ["مِنْ نِعْمَةٍ", "min ni'matin"],
            ["مِنْ بَعْدِ", "mim ba'di"],
            ["غَفُورٌ رَحِيمٌ", "ghafuurur rahiim"],
            ["سَمِيعٌ بَصِيرٌ", "samii'um bashiir"],
          ],
          "j5h6"
        ),
      },
      {
        id: "5-7",
        judul: "Evaluasi jilid 5",
        penjelasan: "Kalimat lebih panjang, gabungan seluruh materi jilid 5. Baca dengan tartil, tidak perlu buru-buru.",
        contoh: buatContoh(
          [
            ["مَالِكِ يَوْمِ الدِّينِ", "maaliki yawmid diin"],
            ["إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", "iyyaaka na'budu wa iyyaaka nasta'iin"],
          ],
          "j5h7"
        ),
      },
      {
        id: "5-8",
        judul: "Latihan lanjutan alif lam dalam ayat pendek",
        penjelasan: "Terapkan qamariyah & syamsiyah langsung dalam potongan ayat pendek yang sudah dikenal.",
        contoh: buatContoh(
          [
            ["اَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ", "alam tara kaifa fa'ala rabbuka"],
            ["قُلْ أَعُوذُ بِرَبِّ النَّاسِ", "qul a'uudzu birabbin naas"],
          ],
          "j5h8"
        ),
      },
      {
        id: "5-9",
        judul: "Alif Lam Qamariyah — kata baru",
        penjelasan: "Lanjutan latihan alif lam qamariyah (lam dibaca jelas) dengan kata-kata yang belum dipakai sebelumnya.",
        contoh: buatContoh(
          [
            ["اَلْعَلِيمُ", "al-'aliimu"],
            ["اَلْخَبِيرُ", "al-khabiiru"],
            ["اَلْوَاحِدُ", "al-waahidu"],
            ["اَلْيَوْمُ", "al-yawmu"],
            ["اَلْهُدَى", "al-hudaa"],
          ],
          "j5h9"
        ),
      },
      {
        id: "5-10",
        judul: "Alif Lam Syamsiyah — kata baru",
        penjelasan: "Lanjutan latihan alif lam syamsiyah (lam melebur) dengan kata-kata yang belum dipakai sebelumnya.",
        contoh: buatContoh(
          [
            ["اَلطَّرِيقُ", "ath-thariiqu"],
            ["اَلدُّنْيَا", "ad-dunyaa"],
            ["اَلظَّالِمُونَ", "azh-zhaalimuun"],
            ["اَلتَّوْبَةُ", "at-taubatu"],
            ["اَلضُّحَى", "adh-dhuhaa"],
          ],
          "j5h10"
        ),
      },
      {
        id: "5-11",
        judul: "Nun mati / tanwin bertemu huruf lain — lanjutan",
        penjelasan: "Masih pengenalan awal, contoh tambahan supaya lebih terbiasa mendengar perubahan bunyinya.",
        contoh: buatContoh(
          [
            ["مِنْ وَلِيٍّ", "miw waliyyin"],
            ["خَيْرٌ لَكُمْ", "khairul lakum"],
            ["مِنْ مَالِ اللَّهِ", "mim maalillaah"],
          ],
          "j5h11"
        ),
      },
      {
        id: "5-12",
        judul: "Evaluasi akhir jilid 5 — bacaan lebih panjang",
        penjelasan: "Kalimat penutup jilid 5, gabungan alif lam qamariyah/syamsiyah dan nun mati/tanwin. Pastikan lancar sebelum lanjut ke Jilid 6.",
        contoh: buatContoh(
          [
            ["اَلْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ الرَّحْمَنِ الرَّحِيمِ", "alhamdu lillaahi rabbil 'aalamiinar rahmaanir rahiim"],
          ],
          "j5h12"
        ),
      },
    ],
  },
  {
    jilid: 6,
    judul: "Jilid 6 — Ghunnah & Tanda Waqaf",
    warna: "teal",
    ringkasan:
      "Jilid terakhir: bacaan dengung (ghunnah), mad far'i sederhana, dan tanda-tanda waqaf (berhenti) di mushaf agar siap naik ke Al-Qur'an.",
    tujuan: [
      "Membaca huruf bertasydid dengan tepat, termasuk ghunnah pada نّ dan مّ",
      "Mengenal tanda waqaf umum: mim (م), lam-alif (لا), qif (قف)",
      "Siap melanjutkan ke bacaan Al-Qur'an 30 juz dengan tajwid dasar",
    ],
    halaman: [
      {
        id: "6-1",
        judul: "Huruf bertasydid & Ghunnah",
        penjelasan:
          "Tasydid (ّ) dibaca ganda/ditekan. Khusus نّ dan مّ didengungkan sekitar 2 harakat.",
        contoh: buatContoh(
          [
            ["إِنَّ", "inna"],
            ["ثُمَّ", "tsumma"],
            ["اَلْجَنَّةُ", "al-jannatu"],
            ["مُحَمَّدٌ", "muhammadun"],
          ],
          "j6h1"
        ),
      },
      {
        id: "6-2",
        judul: "Mad far'i sederhana",
        penjelasan: "Bacaan panjang lebih dari 2 harakat karena bertemu hamzah atau sukun.",
        contoh: buatContoh(
          [
            ["جَاءَ", "jaa-a"],
            ["السَّمَاءِ", "as-samaa-i"],
            ["يَشَاءُ", "yasyaa-u"],
          ],
          "j6h2"
        ),
      },
      {
        id: "6-3",
        judul: "Tanda Waqaf (berhenti)",
        penjelasan:
          "م = wajib berhenti. لا = jangan berhenti. قف = lebih baik berhenti. ج = boleh berhenti/lanjut.",
        contoh: buatContoh(
          [
            ["... يَعْمَلُونَ ۝ ", "... ya'maluun (waqaf)"],
            ["... وَلَا ﻻ يَحْزَنُونَ", "... walaa yahzanuun (lanjut, jangan berhenti)"],
          ],
          "j6h3"
        ),
      },
      {
        id: "6-4",
        judul: "Ghunnah lanjutan — mim & nun bertasydid",
        penjelasan: "Perbanyak latihan dengung supaya panjangnya konsisten sekitar 2 harakat setiap ketemu نّ atau مّ.",
        contoh: buatContoh(
          [
            ["اَلنَّاسِ", "an-naasi"],
            ["اَلْجَنَّةِ", "al-jannati"],
            ["ثَمَّ", "tsamma"],
            ["عَمَّ", "'amma"],
            ["هُنَّ", "hunna"],
          ],
          "j6h4"
        ),
      },
      {
        id: "6-5",
        judul: "Mim mati bertemu huruf lain",
        penjelasan: "Mim sukun (مْ) yang bertemu huruf lain dibaca jelas seperti biasa (idzhar syafawi), kecuali bertemu ب yang berdengung.",
        contoh: buatContoh(
          [
            ["هُمْ فِيهَا", "hum fiihaa"],
            ["أَنْتُمْ تَعْلَمُونَ", "antum ta'lamuun"],
            ["تَرْمِيهِمْ بِحِجَارَةٍ", "tarmiihim bihijaaratin"],
          ],
          "j6h5"
        ),
      },
      {
        id: "6-6",
        judul: "Latihan tanda waqaf dalam kalimat",
        penjelasan: "Berhenti dan lanjutkan sesuai tanda: م berhenti, لا jangan berhenti, ج boleh pilih.",
        contoh: buatContoh(
          [
            ["وَاللَّهُ غَفُورٌ رَحِيمٌ ۜ", "wallaahu ghafuurur rahiim (boleh berhenti/lanjut)"],
            ["وَمَا هُمْ بِمُؤْمِنِينَ ۝", "wa maa hum bimu'miniin (berhenti)"],
          ],
          "j6h6"
        ),
      },
      {
        id: "6-7",
        judul: "Latihan potongan surat pendek",
        penjelasan: "Gabungan seluruh kaidah jilid 1-6 dalam potongan surat-surat pendek juz 30 yang sudah dikenal.",
        contoh: buatContoh(
          [
            ["قُلْ هُوَ اللَّهُ أَحَدٌ", "qul huwallaahu ahad"],
            ["اللَّهُ الصَّمَدُ", "allaahush shamad"],
            ["إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", "innaa a'thainaakal kautsar"],
            ["فَصَلِّ لِرَبِّكَ وَانْحَرْ", "fashalli lirabbika wanhar"],
          ],
          "j6h7"
        ),
      },
      {
        id: "6-8",
        judul: "Evaluasi akhir — siap lanjut ke Al-Qur'an 30 Juz",
        penjelasan:
          "Kalau halaman ini sudah lancar dibaca tanpa mengeja dan tanda waqaf sudah dipahami, artinya sudah tamat Iqro 1-6. Langkah selanjutnya: lanjut membaca Al-Qur'an 30 juz di menu utama, didampingi orang tua/ustadz untuk koreksi tajwid yang lebih detail.",
        contoh: buatContoh(
          [
            ["بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ", "bismillaahir rahmaanir rahiim"],
            ["اَلْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", "alhamdu lillaahi rabbil 'aalamiin"],
            ["وَاللَّهُ أَعْلَمُ بِالصَّوَابِ", "wallaahu a'lamu bish shawaab"],
          ],
          "j6h8"
        ),
      },
      {
        id: "6-9",
        judul: "Ghunnah lanjutan — kata baru",
        penjelasan: "Latihan tambahan dengung pada نّ dan مّ dengan kata-kata yang belum dipakai sebelumnya.",
        contoh: buatContoh(
          [
            ["إِنَّمَا", "innamaa"],
            ["أَنَّهُ", "annahu"],
            ["ثَمَّةَ", "tsammata"],
            ["عَمَّنْ", "'amman"],
            ["مِمَّا", "mimmaa"],
          ],
          "j6h9"
        ),
      },
      {
        id: "6-10",
        judul: "Mad far'i lanjutan — kata baru",
        penjelasan: "Latihan tambahan mad far'i (lebih dari 2 harakat) karena bertemu hamzah atau sukun.",
        contoh: buatContoh(
          [
            ["أُولَئِكَ", "ulaa-ika"],
            ["السَّمَاوَاتِ", "as-samaawaati"],
            ["يَشَاءُونَ", "yasyaa-uun"],
            ["الْمُؤْمِنُونَ", "al-mu'minuun"],
          ],
          "j6h10"
        ),
      },
      {
        id: "6-11",
        judul: "Tanda waqaf lanjutan",
        penjelasan: "Latihan tambahan mengenali tanda waqaf: صلي (lebih baik lanjut), ص (boleh berhenti), ق (lebih baik berhenti).",
        contoh: buatContoh(
          [
            ["... وَاللَّهُ بِكُلِّ شَيْءٍ عَلِيمٌ ۝", "... wallaahu bikulli syai-in 'aliim (berhenti)"],
            ["... إِنَّهُ هُوَ التَّوَّابُ الرَّحِيمُ ۝", "... innahu huwat tawwaabur rahiim (berhenti)"],
          ],
          "j6h11"
        ),
      },
      {
        id: "6-12",
        judul: "Evaluasi akhir jilid 6 — siap khatam ke Al-Qur'an 30 Juz",
        penjelasan:
          "Halaman penutup seluruh metode Iqro 1-6. Kalau bacaan berikut sudah lancar dengan tajwid dasar yang benar, artinya sudah siap melanjutkan ke Al-Qur'an 30 juz didampingi guru mengaji.",
        contoh: buatContoh(
          [
            ["قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", "qul a'uudzu birabbil falaq"],
            ["مِنْ شَرِّ مَا خَلَقَ", "min syarri maa khalaq"],
            ["وَاللَّهُ الْمُسْتَعَانُ", "wallaahul musta'aan"],
          ],
          "j6h12"
        ),
      },
    ],
  },
];

export function getIqroJilid(nomor: number): IqroJilid | undefined {
  return IQRO_DATA.find((j) => j.jilid === nomor);
}
