// Tafsir Ringkas Kemenag RI — data statis, TIDAK memanggil API eksternal apa
// pun saat runtime. File JSON sumbernya ada di src/data/tafsir/*.json.
// Sumber asli: Al-Qur'an Kemenag (https://quran.kemenag.go.id), didapat lewat
// dataset open-source (MIT) renomureza/quran-api-id lalu diproses jadi format
// per-surah yang lebih sederhana.
//
// PENTING: dulu ke-114 file tafsir (~3.4MB) di-import statis semua di sini,
// padahal modul ini cuma dipakai 1 halaman (/quran/tafsir/[nomor]) yang
// jelas-jelas cuma butuh SATU surat per kunjungan. Sama seperti quran-api.ts,
// itu bikin bundle function server-nya bengkak tanpa perlu. Sekarang dibaca
// lazy per file via fs, di-cache di memori per-instance server.

import fs from "node:fs";
import path from "node:path";

export type TafsirAyat = { ayat: number; teks: string };
export type TafsirSurah = { nomor: number; sumber: string; tafsir: TafsirAyat[] };

const DATA_DIR = path.join(process.cwd(), "src/data/tafsir");
const tafsirCache = new Map<number, TafsirSurah>();

export function getTafsirSurah(nomor: number): TafsirSurah {
  const cached = tafsirCache.get(nomor);
  if (cached) return cached;

  const filePath = path.join(DATA_DIR, `${nomor}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Tafsir surat ${nomor} tidak ditemukan`);
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(raw) as TafsirSurah;
  tafsirCache.set(nomor, parsed);
  return parsed;
}
