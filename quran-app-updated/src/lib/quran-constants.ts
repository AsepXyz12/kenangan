// Konstanta murni (tanpa dependensi node:fs/path) supaya AMAN diimport dari
// client component. JANGAN taruh apa pun yang butuh baca file di sini.
//
// Sebelumnya TIDAK_ADA_BASMALAH ada di quran-api.ts, yang di baris paling
// atasnya import "node:fs" (untuk baca file JSON surat per-request). Karena
// SurahHeader.tsx (client component) ikut import TIDAK_ADA_BASMALAH dari
// sana, Turbopack ikut menyeret seluruh modul quran-api.ts -- termasuk
// node:fs -- ke bundle browser, dan build gagal keras:
// "the chunking context (unknown) does not support external modules
// (request: node:fs)".
//
// Nomor surat yang TIDAK diawali bacaan Basmalah: Al-Fatihah (1, karena
// Basmalah adalah ayat pertamanya sendiri) dan At-Taubah (9).
export const TIDAK_ADA_BASMALAH = new Set([1, 9]);
