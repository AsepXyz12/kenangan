import fs from "node:fs";
import path from "node:path";

// PENTING (dulu jadi salah satu penyebab app terasa berat & lambat, apalagi
// di koneksi lemot): file ini SEBELUMNYA meng-import ke-114 file JSON surat
// (total ~3.6MB) secara statis di atas, SEKALIGUS, tiap kali modul ini
// dipakai -- padahal hampir semua pemanggil cuma butuh SATU surat (mis.
// buka Surat Al-Fatihah cuma butuh 1.json, bukan semua 114 file).
//
// Efeknya: SETIAP route/serverless function yang menyentuh modul ini (Beranda,
// index /quran, halaman per-surat, tafsir, dst) ikut membawa seluruh 3.6MB
// data ke dalam bundle function-nya masing-masing di server -> cold start
// lebih lambat, dan di skenario tertentu bikin respons pertama telat cukup
// lama sehingga di koneksi mobile yang lemot terasa seperti gagal total.
//
// Fix: baca file JSON-nya LAZY (cuma pas dibutuhkan) via fs, sama seperti
// pola yang sudah dipakai di hadits-api.ts. Hasilnya di-cache di memori
// per-instance server supaya surat yang sama nggak dibaca ulang dari disk
// tiap request.
const DATA_DIR = path.join(process.cwd(), "src/data/quran");

const surahCache = new Map<number, SurahListItem & { ayat: Ayat[] }>();

function readSurahFile(nomor: number): (SurahListItem & { ayat: Ayat[] }) | undefined {
  const cached = surahCache.get(nomor);
  if (cached) return cached;
  const filePath = path.join(DATA_DIR, `${nomor}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(raw) as SurahListItem & { ayat: Ayat[] };
  surahCache.set(nomor, parsed);
  return parsed;
}

let cachedSurahList: SurahListItem[] | null = null;

function readSurahList(): SurahListItem[] {
  if (cachedSurahList) return cachedSurahList;
  const raw = fs.readFileSync(path.join(DATA_DIR, "index.json"), "utf-8");
  cachedSurahList = JSON.parse(raw) as SurahListItem[];
  return cachedSurahList;
}

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



export async function getSurahList(): Promise<SurahListItem[]> {
  return readSurahList();
}

export async function getSurahDetail(nomor: number): Promise<SurahDetail> {
  const surah = readSurahFile(nomor);
  if (!surah) {
    throw new Error(`Surat nomor ${nomor} tidak ditemukan`);
  }
  const surahList = readSurahList();
  const sebelumnya = surahList.find((s) => s.nomor === nomor - 1);
  const selanjutnya = surahList.find((s) => s.nomor === nomor + 1);
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
  const surah = readSurahFile(pilihan.surah);
  const ayat = surah?.ayat.find((a) => a.nomorAyat === pilihan.ayat);
  // Jaga-jaga: kalau data ternyata gak ketemu (mis. file rusak/hilang), jangan
  // sampai seluruh Beranda ikut gagal render cuma gara-gara kartu "Ayat
  // Pilihan Hari Ini" -- fallback ke ayat pertama daftar pilihan yang
  // datanya kita tahu selalu ada (Al-Insyirah ayat 5).
  if (!surah || !ayat) {
    const fallbackSurah = readSurahFile(94)!;
    const fallbackAyat = fallbackSurah.ayat.find((a) => a.nomorAyat === 5)!;
    return {
      ayat: fallbackAyat,
      surahNomor: 94,
      namaLatin: fallbackSurah.namaLatin,
      tema: "Kemudahan",
    };
  }
  return {
    ayat,
    surahNomor: pilihan.surah,
    namaLatin: surah.namaLatin,
    tema: pilihan.tema,
  };
}
