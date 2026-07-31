// Menyimpan posisi bacaan terakhir & daftar surat favorit di localStorage.
// Semua fungsi aman dipanggil di server (no-op) maupun browser.

const LAST_READ_KEY = "mushaf:terakhir-dibaca";
const FAVORITES_KEY = "mushaf:favorit";
export const LAST_READ_CHANGE_EVENT = "mushaf:terakhir-dibaca-change";

export type LastRead = {
  surahNomor: number;
  namaLatin: string;
  ayatNomor: number;
  waktu: number; // epoch ms
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function getLastRead(): LastRead | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(LAST_READ_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LastRead;
  } catch {
    return null;
  }
}

export function setLastRead(data: Omit<LastRead, "waktu">): void {
  if (!isBrowser()) return;
  try {
    const payload: LastRead = { ...data, waktu: Date.now() };
    localStorage.setItem(LAST_READ_KEY, JSON.stringify(payload));
    window.dispatchEvent(new Event(LAST_READ_CHANGE_EVENT));
  } catch {
    // abaikan
  }
}

export function clearLastRead(): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(LAST_READ_KEY);
  } catch {
    // abaikan
  }
}

export function getFavorites(): number[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(surahNomor: number): number[] {
  const current = getFavorites();
  const next = current.includes(surahNomor)
    ? current.filter((n) => n !== surahNomor)
    : [...current, surahNomor];
  if (isBrowser()) {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    } catch {
      // abaikan
    }
  }
  return next;
}

export function isFavorite(surahNomor: number): boolean {
  return getFavorites().includes(surahNomor);
}
