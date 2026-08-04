import fs from "node:fs";
import path from "node:path";

export type HaditsItem = {
  nomor: number;
  arab: string;
  terjemah: string;
};

export type KitabMeta = {
  slug: string;
  nama: string;
  totalHadits: number;
  chunkSize: number;
  totalChunks: number;
};

const DATA_DIR = path.join(process.cwd(), "src/data/hadits");

let cachedIndex: KitabMeta[] | null = null;

export function getKitabList(): KitabMeta[] {
  if (cachedIndex) return cachedIndex;
  const raw = fs.readFileSync(path.join(DATA_DIR, "index.json"), "utf-8");
  cachedIndex = JSON.parse(raw);
  return cachedIndex as KitabMeta[];
}

export function getKitabMeta(slug: string): KitabMeta | undefined {
  return getKitabList().find((k) => k.slug === slug);
}

function readChunk(slug: string, chunkIndex: number): HaditsItem[] {
  const filePath = path.join(DATA_DIR, slug, `${chunkIndex}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export function getHaditsDetail(slug: string, nomor: number): HaditsItem | undefined {
  const meta = getKitabMeta(slug);
  if (!meta || nomor < 1 || nomor > meta.totalHadits) return undefined;
  const chunkIndex = Math.floor((nomor - 1) / meta.chunkSize);
  const chunk = readChunk(slug, chunkIndex);
  return chunk[(nomor - 1) % meta.chunkSize];
}

export type HaditsListResult = {
  meta: KitabMeta;
  items: HaditsItem[];
  page: number;
  pageSize: number;
  totalPages: number;
};

// Cache seluruh isi 1 kitab (semua chunk digabung) di memory, dipakai khusus
// buat fitur cari teks (searchHaditsInKitab di bawah). Di-load MALAS (baru
// dibaca dari disk pas pertama kali ada yang cari di kitab itu), bukan pas
// module ini pertama di-import, biar startup app tetap ringan.
const fullKitabCache = new Map<string, HaditsItem[]>();

function getFullKitab(slug: string): HaditsItem[] {
  const cached = fullKitabCache.get(slug);
  if (cached) return cached;

  const meta = getKitabMeta(slug);
  if (!meta) return [];

  let all: HaditsItem[] = [];
  for (let ci = 0; ci < meta.totalChunks; ci++) {
    all = all.concat(readChunk(slug, ci));
  }
  fullKitabCache.set(slug, all);
  return all;
}

export type HaditsSearchResult = { nomor: number; cuplikan: string };

// Cari teks di DALAM SATU KITAB SAJA (bukan lintas kitab / lintas halaman
// lain di situs) -- persis kayak search di daftar Surat yang cuma nyaring
// data yang memang ada di halaman itu. cuplikan dipotong di sekitar kata
// yang cocok biar user lihat konteksnya, bukan cuma nomor hadits doang.
export function searchHaditsInKitab(
  slug: string,
  query: string,
  limit = 40
): HaditsSearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const all = getFullKitab(slug);
  const hasil: HaditsSearchResult[] = [];

  for (const h of all) {
    const lower = h.terjemah.toLowerCase();
    const idx = lower.indexOf(q);
    if (idx === -1) continue;

    const mulai = Math.max(0, idx - 60);
    const akhir = Math.min(h.terjemah.length, idx + q.length + 60);
    let cuplikan = h.terjemah.slice(mulai, akhir).trim();
    if (mulai > 0) cuplikan = "…" + cuplikan;
    if (akhir < h.terjemah.length) cuplikan = cuplikan + "…";

    hasil.push({ nomor: h.nomor, cuplikan });
    if (hasil.length >= limit) break;
  }

  return hasil;
}

export function getHaditsList(
  slug: string,
  page: number,
  pageSize = 20
): HaditsListResult | undefined {
  const meta = getKitabMeta(slug);
  if (!meta) return undefined;

  const totalPages = Math.max(1, Math.ceil(meta.totalHadits / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const startNomor = (safePage - 1) * pageSize + 1;
  const endNomor = Math.min(safePage * pageSize, meta.totalHadits);

  const firstChunk = Math.floor((startNomor - 1) / meta.chunkSize);
  const lastChunk = Math.floor((endNomor - 1) / meta.chunkSize);

  let pool: HaditsItem[] = [];
  for (let ci = firstChunk; ci <= lastChunk; ci++) {
    pool = pool.concat(readChunk(slug, ci));
  }

  const items = pool.filter((h) => h.nomor >= startNomor && h.nomor <= endNomor);

  return { meta, items, page: safePage, pageSize, totalPages };
}
