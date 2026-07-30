export type JuzBoundary = {
  juz: number;
  nama: string;
  start: { surah: number; ayat: number };
  end: { surah: number; ayat: number };
};

export const JUZ_DATA: JuzBoundary[] = [
  { juz: 1, nama: "Alif Lam Mim", start: { surah: 1, ayat: 1 }, end: { surah: 2, ayat: 141 } },
  { juz: 2, nama: "Sayaqul", start: { surah: 2, ayat: 142 }, end: { surah: 2, ayat: 252 } },
  { juz: 3, nama: "Tilkar Rusul", start: { surah: 2, ayat: 253 }, end: { surah: 3, ayat: 92 } },
  { juz: 4, nama: "Lan Tanalu", start: { surah: 3, ayat: 93 }, end: { surah: 4, ayat: 23 } },
  { juz: 5, nama: "Wal Muhsanat", start: { surah: 4, ayat: 24 }, end: { surah: 4, ayat: 147 } },
  { juz: 6, nama: "La Yuhibbullah", start: { surah: 4, ayat: 148 }, end: { surah: 5, ayat: 81 } },
  { juz: 7, nama: "Wa Idza Sami'u", start: { surah: 5, ayat: 82 }, end: { surah: 6, ayat: 110 } },
  { juz: 8, nama: "Wa Lau Annana", start: { surah: 6, ayat: 111 }, end: { surah: 7, ayat: 87 } },
  { juz: 9, nama: "Qalal Mala'u", start: { surah: 7, ayat: 88 }, end: { surah: 8, ayat: 40 } },
  { juz: 10, nama: "Wa A'lamu", start: { surah: 8, ayat: 41 }, end: { surah: 9, ayat: 92 } },
  { juz: 11, nama: "Ya'tadzirun", start: { surah: 9, ayat: 93 }, end: { surah: 11, ayat: 5 } },
  { juz: 12, nama: "Wa Ma Min Dabbah", start: { surah: 11, ayat: 6 }, end: { surah: 12, ayat: 52 } },
  { juz: 13, nama: "Wa Ma Ubarri'u", start: { surah: 12, ayat: 53 }, end: { surah: 14, ayat: 52 } },
  { juz: 14, nama: "Rubama", start: { surah: 15, ayat: 1 }, end: { surah: 16, ayat: 128 } },
  { juz: 15, nama: "Subhanalladzi", start: { surah: 17, ayat: 1 }, end: { surah: 18, ayat: 74 } },
  { juz: 16, nama: "Qal Alam", start: { surah: 18, ayat: 75 }, end: { surah: 20, ayat: 135 } },
  { juz: 17, nama: "Iqtaraba", start: { surah: 21, ayat: 1 }, end: { surah: 22, ayat: 78 } },
  { juz: 18, nama: "Qad Aflaha", start: { surah: 23, ayat: 1 }, end: { surah: 25, ayat: 20 } },
  { juz: 19, nama: "Wa Qalalladzina", start: { surah: 25, ayat: 21 }, end: { surah: 27, ayat: 55 } },
  { juz: 20, nama: "A'man Khalaq", start: { surah: 27, ayat: 56 }, end: { surah: 29, ayat: 45 } },
  { juz: 21, nama: "Utlu Ma Uhiya", start: { surah: 29, ayat: 46 }, end: { surah: 33, ayat: 30 } },
  { juz: 22, nama: "Wa Manyaqnut", start: { surah: 33, ayat: 31 }, end: { surah: 36, ayat: 27 } },
  { juz: 23, nama: "Wa Mali", start: { surah: 36, ayat: 28 }, end: { surah: 39, ayat: 31 } },
  { juz: 24, nama: "Faman Adzlam", start: { surah: 39, ayat: 32 }, end: { surah: 41, ayat: 46 } },
  { juz: 25, nama: "Ilaihi Yuraddu", start: { surah: 41, ayat: 47 }, end: { surah: 45, ayat: 37 } },
  { juz: 26, nama: "Ha Mim", start: { surah: 46, ayat: 1 }, end: { surah: 51, ayat: 30 } },
  { juz: 27, nama: "Qala Fama Khatbukum", start: { surah: 51, ayat: 31 }, end: { surah: 57, ayat: 29 } },
  { juz: 28, nama: "Qad Sami'allah", start: { surah: 58, ayat: 1 }, end: { surah: 66, ayat: 12 } },
  { juz: 29, nama: "Tabarakalladzi", start: { surah: 67, ayat: 1 }, end: { surah: 77, ayat: 50 } },
  { juz: 30, nama: "Amma", start: { surah: 78, ayat: 1 }, end: { surah: 114, ayat: 6 } },
];

export function getJuzBoundary(nomor: number): JuzBoundary | undefined {
  return JUZ_DATA.find((j) => j.juz === nomor);
}

export function surahRangeInJuz(boundary: JuzBoundary): number[] {
  const result: number[] = [];
  for (let s = boundary.start.surah; s <= boundary.end.surah; s++) {
    result.push(s);
  }
  return result;
}
