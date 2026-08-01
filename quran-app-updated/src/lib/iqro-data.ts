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
        judul: "Latihan akhir — siap ke Al-Qur'an",
        penjelasan: "Ini gabungan semua pelajaran jilid 1-6. Kalau sudah lancar, lanjutkan ke Al-Qur'an 30 Juz.",
        contoh: buatContoh(
          [
            ["قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ", "qul huwallaahu ahad, allaahush shamad"],
            ["إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", "innaa a'thainaakal kautsar"],
          ],
          "j6h4"
        ),
      },
    ],
  },
];

export function getIqroJilid(nomor: number): IqroJilid | undefined {
  return IQRO_DATA.find((j) => j.jilid === nomor);
}
