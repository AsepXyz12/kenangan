// Sumber audio murottal per-ayat: EveryAyah.com (statis, gratis, CORS-friendly)
// Qari: Mishary Rashid Alafasy — jernih, tempo sedang, cocok untuk anak-anak.
const BASE_URL = "https://everyayah.com/data/Alafasy_128kbps";

function pad3(n: number): string {
  return String(n).padStart(3, "0");
}

export function getAyatAudioUrl(nomorSurah: number, nomorAyat: number): string {
  return `${BASE_URL}/${pad3(nomorSurah)}${pad3(nomorAyat)}.mp3`;
}

export const RECITER_NAME = "Mishary Rashid Alafasy";
