import indexData from "@/data/quran/index.json";
import s1 from "@/data/quran/1.json";
import s2 from "@/data/quran/2.json";
import s3 from "@/data/quran/3.json";
import s4 from "@/data/quran/4.json";
import s5 from "@/data/quran/5.json";
import s6 from "@/data/quran/6.json";
import s7 from "@/data/quran/7.json";
import s8 from "@/data/quran/8.json";
import s9 from "@/data/quran/9.json";
import s10 from "@/data/quran/10.json";
import s11 from "@/data/quran/11.json";
import s12 from "@/data/quran/12.json";
import s13 from "@/data/quran/13.json";
import s14 from "@/data/quran/14.json";
import s15 from "@/data/quran/15.json";
import s16 from "@/data/quran/16.json";
import s17 from "@/data/quran/17.json";
import s18 from "@/data/quran/18.json";
import s19 from "@/data/quran/19.json";
import s20 from "@/data/quran/20.json";
import s21 from "@/data/quran/21.json";
import s22 from "@/data/quran/22.json";
import s23 from "@/data/quran/23.json";
import s24 from "@/data/quran/24.json";
import s25 from "@/data/quran/25.json";
import s26 from "@/data/quran/26.json";
import s27 from "@/data/quran/27.json";
import s28 from "@/data/quran/28.json";
import s29 from "@/data/quran/29.json";
import s30 from "@/data/quran/30.json";
import s31 from "@/data/quran/31.json";
import s32 from "@/data/quran/32.json";
import s33 from "@/data/quran/33.json";
import s34 from "@/data/quran/34.json";
import s35 from "@/data/quran/35.json";
import s36 from "@/data/quran/36.json";
import s37 from "@/data/quran/37.json";
import s38 from "@/data/quran/38.json";
import s39 from "@/data/quran/39.json";
import s40 from "@/data/quran/40.json";
import s41 from "@/data/quran/41.json";
import s42 from "@/data/quran/42.json";
import s43 from "@/data/quran/43.json";
import s44 from "@/data/quran/44.json";
import s45 from "@/data/quran/45.json";
import s46 from "@/data/quran/46.json";
import s47 from "@/data/quran/47.json";
import s48 from "@/data/quran/48.json";
import s49 from "@/data/quran/49.json";
import s50 from "@/data/quran/50.json";
import s51 from "@/data/quran/51.json";
import s52 from "@/data/quran/52.json";
import s53 from "@/data/quran/53.json";
import s54 from "@/data/quran/54.json";
import s55 from "@/data/quran/55.json";
import s56 from "@/data/quran/56.json";
import s57 from "@/data/quran/57.json";
import s58 from "@/data/quran/58.json";
import s59 from "@/data/quran/59.json";
import s60 from "@/data/quran/60.json";
import s61 from "@/data/quran/61.json";
import s62 from "@/data/quran/62.json";
import s63 from "@/data/quran/63.json";
import s64 from "@/data/quran/64.json";
import s65 from "@/data/quran/65.json";
import s66 from "@/data/quran/66.json";
import s67 from "@/data/quran/67.json";
import s68 from "@/data/quran/68.json";
import s69 from "@/data/quran/69.json";
import s70 from "@/data/quran/70.json";
import s71 from "@/data/quran/71.json";
import s72 from "@/data/quran/72.json";
import s73 from "@/data/quran/73.json";
import s74 from "@/data/quran/74.json";
import s75 from "@/data/quran/75.json";
import s76 from "@/data/quran/76.json";
import s77 from "@/data/quran/77.json";
import s78 from "@/data/quran/78.json";
import s79 from "@/data/quran/79.json";
import s80 from "@/data/quran/80.json";
import s81 from "@/data/quran/81.json";
import s82 from "@/data/quran/82.json";
import s83 from "@/data/quran/83.json";
import s84 from "@/data/quran/84.json";
import s85 from "@/data/quran/85.json";
import s86 from "@/data/quran/86.json";
import s87 from "@/data/quran/87.json";
import s88 from "@/data/quran/88.json";
import s89 from "@/data/quran/89.json";
import s90 from "@/data/quran/90.json";
import s91 from "@/data/quran/91.json";
import s92 from "@/data/quran/92.json";
import s93 from "@/data/quran/93.json";
import s94 from "@/data/quran/94.json";
import s95 from "@/data/quran/95.json";
import s96 from "@/data/quran/96.json";
import s97 from "@/data/quran/97.json";
import s98 from "@/data/quran/98.json";
import s99 from "@/data/quran/99.json";
import s100 from "@/data/quran/100.json";
import s101 from "@/data/quran/101.json";
import s102 from "@/data/quran/102.json";
import s103 from "@/data/quran/103.json";
import s104 from "@/data/quran/104.json";
import s105 from "@/data/quran/105.json";
import s106 from "@/data/quran/106.json";
import s107 from "@/data/quran/107.json";
import s108 from "@/data/quran/108.json";
import s109 from "@/data/quran/109.json";
import s110 from "@/data/quran/110.json";
import s111 from "@/data/quran/111.json";
import s112 from "@/data/quran/112.json";
import s113 from "@/data/quran/113.json";
import s114 from "@/data/quran/114.json";

export type Ayat = {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
};

export type SurahListItem = {
  nomor: number;
  nama: string;
  namaLatin: string;
  arti: string;
  tempatTurun: string;
  jumlahAyat: number;
};

export type SurahDetail = SurahListItem & {
  ayat: Ayat[];
  suratSelanjutnya: false | { nomor: number; nama: string; namaLatin: string; jumlahAyat: number };
  suratSebelumnya: false | { nomor: number; nama: string; namaLatin: string; jumlahAyat: number };
};

const SURAH_MAP: Record<number, SurahListItem & { ayat: Ayat[] }> = {
  1: s1,
  2: s2,
  3: s3,
  4: s4,
  5: s5,
  6: s6,
  7: s7,
  8: s8,
  9: s9,
  10: s10,
  11: s11,
  12: s12,
  13: s13,
  14: s14,
  15: s15,
  16: s16,
  17: s17,
  18: s18,
  19: s19,
  20: s20,
  21: s21,
  22: s22,
  23: s23,
  24: s24,
  25: s25,
  26: s26,
  27: s27,
  28: s28,
  29: s29,
  30: s30,
  31: s31,
  32: s32,
  33: s33,
  34: s34,
  35: s35,
  36: s36,
  37: s37,
  38: s38,
  39: s39,
  40: s40,
  41: s41,
  42: s42,
  43: s43,
  44: s44,
  45: s45,
  46: s46,
  47: s47,
  48: s48,
  49: s49,
  50: s50,
  51: s51,
  52: s52,
  53: s53,
  54: s54,
  55: s55,
  56: s56,
  57: s57,
  58: s58,
  59: s59,
  60: s60,
  61: s61,
  62: s62,
  63: s63,
  64: s64,
  65: s65,
  66: s66,
  67: s67,
  68: s68,
  69: s69,
  70: s70,
  71: s71,
  72: s72,
  73: s73,
  74: s74,
  75: s75,
  76: s76,
  77: s77,
  78: s78,
  79: s79,
  80: s80,
  81: s81,
  82: s82,
  83: s83,
  84: s84,
  85: s85,
  86: s86,
  87: s87,
  88: s88,
  89: s89,
  90: s90,
  91: s91,
  92: s92,
  93: s93,
  94: s94,
  95: s95,
  96: s96,
  97: s97,
  98: s98,
  99: s99,
  100: s100,
  101: s101,
  102: s102,
  103: s103,
  104: s104,
  105: s105,
  106: s106,
  107: s107,
  108: s108,
  109: s109,
  110: s110,
  111: s111,
  112: s112,
  113: s113,
  114: s114,
};

const SURAH_LIST: SurahListItem[] = indexData;

export async function getSurahList(): Promise<SurahListItem[]> {
  return SURAH_LIST;
}

export async function getSurahDetail(nomor: number): Promise<SurahDetail> {
  const surah = SURAH_MAP[nomor];
  if (!surah) {
    throw new Error(`Surat nomor ${nomor} tidak ditemukan`);
  }
  const sebelumnya = SURAH_LIST.find((s) => s.nomor === nomor - 1);
  const selanjutnya = SURAH_LIST.find((s) => s.nomor === nomor + 1);
  return {
    ...surah,
    suratSebelumnya: sebelumnya
      ? { nomor: sebelumnya.nomor, nama: sebelumnya.nama, namaLatin: sebelumnya.namaLatin, jumlahAyat: sebelumnya.jumlahAyat }
      : false,
    suratSelanjutnya: selanjutnya
      ? { nomor: selanjutnya.nomor, nama: selanjutnya.nama, namaLatin: selanjutnya.namaLatin, jumlahAyat: selanjutnya.jumlahAyat }
      : false,
  };
}

export const TIDAK_ADA_BASMALAH = new Set([1, 9]);

export type AyatHarian = {
  ayat: Ayat;
  surahNomor: number;
  namaLatin: string;
  tema: string;
};

const AYAT_PILIHAN: { surah: number; ayat: number; tema: string }[] = [
  { surah: 94, ayat: 5, tema: "Kemudahan" },
  { surah: 2, ayat: 153, tema: "Sabar" },
  { surah: 2, ayat: 186, tema: "Dikabulkannya Doa" },
  { surah: 3, ayat: 139, tema: "Jangan Lemah" },
  { surah: 13, ayat: 28, tema: "Ketenangan Hati" },
  { surah: 16, ayat: 97, tema: "Kehidupan yang Baik" },
  { surah: 39, ayat: 53, tema: "Jangan Berputus Asa" },
  { surah: 65, ayat: 3, tema: "Tawakal" },
  { surah: 2, ayat: 216, tema: "Kebaikan di Balik Takdir" },
  { surah: 3, ayat: 159, tema: "Lemah Lembut" },
  { surah: 49, ayat: 13, tema: "Persaudaraan" },
  { surah: 17, ayat: 23, tema: "Berbakti pada Orang Tua" },
  { surah: 31, ayat: 14, tema: "Ibu dan Bapak" },
  { surah: 9, ayat: 40, tema: "Jangan Bersedih" },
  { surah: 2, ayat: 45, tema: "Sabar dan Sholat" },
  { surah: 3, ayat: 200, tema: "Kesabaran" },
  { surah: 55, ayat: 13, tema: "Nikmat Allah" },
];

export async function getAyatHariIni(): Promise<AyatHarian> {
  const now = new Date();
  const start = Date.UTC(now.getUTCFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start) / 86400000);
  const pilihan = AYAT_PILIHAN[dayOfYear % AYAT_PILIHAN.length];
  const surah = SURAH_MAP[pilihan.surah];
  const ayat = surah.ayat.find((a) => a.nomorAyat === pilihan.ayat)!;
  return {
    ayat,
    surahNomor: pilihan.surah,
    namaLatin: surah.namaLatin,
    tema: pilihan.tema,
  };
}
