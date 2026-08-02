import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

const SEARCH_DIR = path.join(process.cwd(), "src/data/search");
const HADITS_DIR = path.join(SEARCH_DIR, "hadits");

type PageDoc = { href: string; title: string; kategori: string; text: string };
type AyatDoc = { s: number; n: string; a: number; t: string };
type HaditsDoc = { n: number; t: string };
type KitabRef = { slug: string; nama: string };

let pagesCache: PageDoc[] | null = null;
let quranCache: AyatDoc[] | null = null;
let kitabListCache: KitabRef[] | null = null;
const haditsCache = new Map<string, HaditsDoc[]>();

function getPages(): PageDoc[] {
  if (!pagesCache) {
    pagesCache = JSON.parse(fs.readFileSync(path.join(SEARCH_DIR, "pages.json"), "utf-8"));
  }
  return pagesCache!;
}

function getQuran(): AyatDoc[] {
  if (!quranCache) {
    quranCache = JSON.parse(fs.readFileSync(path.join(SEARCH_DIR, "quran.json"), "utf-8"));
  }
  return quranCache!;
}

function getKitabList(): KitabRef[] {
  if (!kitabListCache) {
    kitabListCache = JSON.parse(fs.readFileSync(path.join(HADITS_DIR, "index.json"), "utf-8"));
  }
  return kitabListCache!;
}

function getHaditsKitab(slug: string): HaditsDoc[] {
  const cached = haditsCache.get(slug);
  if (cached) return cached;
  const data: HaditsDoc[] = JSON.parse(
    fs.readFileSync(path.join(HADITS_DIR, `${slug}.json`), "utf-8")
  );
  haditsCache.set(slug, data);
  return data;
}

function normalisasi(s: string): string {
  return s.toLowerCase().trim();
}

function buatSnippet(text: string, query: string, radius = 70): string {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query);
  if (idx === -1) return text.slice(0, radius * 2).trim() + "…";
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + query.length + radius);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";
  return prefix + text.slice(start, end).trim() + suffix;
}

// Mendeteksi format rujukan ayat langsung, mis. "2:255" atau "2 255".
function cariRujukanAyat(q: string): { surah: number; ayat: number } | null {
  const m = q.match(/^(\d{1,3})\s*[:.\s]\s*(\d{1,3})$/);
  if (!m) return null;
  return { surah: Number(m[1]), ayat: Number(m[2]) };
}

export async function GET(req: NextRequest) {
  const qRaw = req.nextUrl.searchParams.get("q") ?? "";
  const q = normalisasi(qRaw);

  if (q.length < 2) {
    return NextResponse.json({ quran: [], hadits: [], pages: [] });
  }

  // --- Al-Qur'an -----------------------------------------------------
  const quranResults: {
    surah: number;
    namaLatin: string;
    ayat: number;
    teksIndonesia: string;
    href: string;
  }[] = [];

  const rujukan = cariRujukanAyat(qRaw.trim());
  const ayatData = getQuran();

  if (rujukan) {
    const target = ayatData.find((a) => a.s === rujukan.surah && a.a === rujukan.ayat);
    if (target) {
      quranResults.push({
        surah: target.s,
        namaLatin: target.n,
        ayat: target.a,
        teksIndonesia: target.t,
        href: `/quran/surah/${target.s}#ayat-${target.a}`,
      });
    }
  } else {
    for (const a of ayatData) {
      if (quranResults.length >= 10) break;
      if (a.n.toLowerCase().includes(q) || a.t.toLowerCase().includes(q)) {
        quranResults.push({
          surah: a.s,
          namaLatin: a.n,
          ayat: a.a,
          teksIndonesia: a.t,
          href: `/quran/surah/${a.s}#ayat-${a.a}`,
        });
      }
    }
  }

  // --- Hadits ----------------------------------------------------------
  const haditsResults: {
    kitab: string;
    nama: string;
    nomor: number;
    terjemah: string;
    href: string;
  }[] = [];

  const kitabList = getKitabList();
  for (const k of kitabList) {
    if (haditsResults.length >= 12) break;
    const items = getHaditsKitab(k.slug);
    for (const h of items) {
      if (haditsResults.length >= 12) break;
      if (h.t.toLowerCase().includes(q)) {
        haditsResults.push({
          kitab: k.slug,
          nama: k.nama,
          nomor: h.n,
          terjemah: buatSnippet(h.t, q),
          href: `/hadits/${k.slug}/${h.n}`,
        });
      }
    }
  }

  // --- Halaman panduan ---------------------------------------------------
  const pageResults: {
    href: string;
    title: string;
    kategori: string;
    snippet: string;
  }[] = [];

  for (const p of getPages()) {
    if (pageResults.length >= 10) break;
    const lowerText = p.text.toLowerCase();
    const cocokJudul = p.title.toLowerCase().includes(q);
    const cocokIsi = lowerText.includes(q);
    if (cocokJudul || cocokIsi) {
      pageResults.push({
        href: p.href,
        title: p.title,
        kategori: p.kategori,
        snippet: cocokIsi ? buatSnippet(p.text, q) : p.text.slice(0, 140).trim() + "…",
      });
    }
  }

  return NextResponse.json({ quran: quranResults, hadits: haditsResults, pages: pageResults });
}
