import { register } from "node:module";
import { pathToFileURL, fileURLToPath } from "node:url";
import fs from "node:fs";
import path from "node:path";

register("./loader.mjs", import.meta.url);

const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const SRC = path.join(ROOT, "src");
const OUT_DIR = path.join(SRC, "data", "search");

fs.mkdirSync(OUT_DIR, { recursive: true });

const { default: React } = await import("react");
const { renderToStaticMarkup } = await import("react-dom/server");

// -----------------------------------------------------------------------
// 1) Halaman panduan/statis: di-render server-side (tanpa next build, tanpa
//    font Google) lalu teksnya diekstrak jadi satu dokumen per halaman.
//    Kalau nanti ada halaman baru ditambah, cukup tambah entri di sini.
// -----------------------------------------------------------------------
const GUIDE_PAGES = [
  { href: "/doa-dzikir", title: "Doa & Dzikir Harian", kategori: "Bacaan Utama" },
  { href: "/asmaul-husna", title: "Asmaul Husna", kategori: "Bacaan Utama" },
  { href: "/iqro", title: "Iqro Anak (Jilid 1-6)", kategori: "Bacaan Utama" },
  { href: "/thaharah", title: "Thaharah", kategori: "Panduan Ibadah" },
  { href: "/panduan-sholat", title: "Panduan Sholat Lengkap", kategori: "Panduan Ibadah" },
  { href: "/sholat-khusus", title: "Sholat Khusus", kategori: "Panduan Ibadah" },
  { href: "/panduan-puasa", title: "Panduan Puasa", kategori: "Panduan Ibadah" },
  { href: "/panduan-zakat", title: "Panduan Zakat", kategori: "Panduan Ibadah" },
  { href: "/panduan-haji-umrah", title: "Haji & Umrah", kategori: "Panduan Ibadah" },
  { href: "/rukun-islam", title: "Rukun Islam", kategori: "Ilmu & Akidah" },
  { href: "/rukun-iman", title: "Rukun Iman", kategori: "Ilmu & Akidah" },
  { href: "/aqidah", title: "Aqidah & Tauhid", kategori: "Ilmu & Akidah" },
  { href: "/fiqih-madzhab", title: "Fiqih & Madzhab", kategori: "Ilmu & Akidah" },
  { href: "/hukum-islam", title: "Hukum-Hukum Islam", kategori: "Ilmu & Akidah" },
  { href: "/akhlak-adab", title: "Akhlak & Adab", kategori: "Ilmu & Akidah" },
  { href: "/ilmu-tajwid", title: "Ilmu Tajwid", kategori: "Ilmu & Akidah" },
  { href: "/kisah-nabi", title: "Kisah 25 Nabi dan Rasul", kategori: "Sejarah & Kisah" },
  { href: "/sirah-nabawiyah", title: "Sirah Nabawiyah", kategori: "Sejarah & Kisah" },
  { href: "/sirah-sahabat", title: "Sirah Sahabat", kategori: "Sejarah & Kisah" },
  { href: "/wanita-dalam-islam", title: "Wanita dalam Islam", kategori: "Sejarah & Kisah" },
  { href: "/sejarah-islam", title: "Sejarah Islam", kategori: "Sejarah & Kisah" },
  { href: "/malam-jumat", title: "Amalan Malam Jumat", kategori: "Amalan & Acara" },
  { href: "/tahlil-yasin", title: "Tahlil, Yasin & Acara Lainnya", kategori: "Amalan & Acara" },
];

function htmlToText(html) {
  return html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<\/(p|div|li|h1|h2|h3|h4|h5|h6|section|article|br)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join("\n");
}

const pageDocs = [];

for (const entry of GUIDE_PAGES) {
  const modUrl = pathToFileURL(path.join(SRC, "app", entry.href.slice(1), "page.tsx")).href;
  try {
    const mod = await import(modUrl);
    const Comp = mod.default;
    let element;
    const result = Comp.constructor.name === "AsyncFunction" ? await Comp() : Comp();
    // Komponen server async mengembalikan elemen React langsung (bukan komponen),
    // sedangkan yang sync juga sudah mengembalikan elemen saat dipanggil manual.
    element = result;
    const html = renderToStaticMarkup(element);
    const text = htmlToText(html);
    pageDocs.push({ href: entry.href, title: entry.title, kategori: entry.kategori, text });
    console.log(`[ok] ${entry.href} (${text.length} chars)`);
  } catch (err) {
    console.error(`[gagal] ${entry.href}:`, err.message);
  }
}

fs.writeFileSync(path.join(OUT_DIR, "pages.json"), JSON.stringify(pageDocs), "utf-8");

// -----------------------------------------------------------------------
// 2) Al-Qur'an: flatten semua ayat dari 114 file surat jadi satu index
//    ringkas (tanpa duplikasi field yang tidak dibutuhkan untuk pencarian).
// -----------------------------------------------------------------------
const QURAN_DIR = path.join(SRC, "data", "quran");
const surahList = JSON.parse(fs.readFileSync(path.join(QURAN_DIR, "index.json"), "utf-8"));
const ayatIndex = [];
for (const s of surahList) {
  const detail = JSON.parse(fs.readFileSync(path.join(QURAN_DIR, `${s.nomor}.json`), "utf-8"));
  for (const a of detail.ayat) {
    ayatIndex.push({
      s: s.nomor,
      n: s.namaLatin,
      a: a.nomorAyat,
      t: a.teksIndonesia,
    });
  }
}
fs.writeFileSync(path.join(OUT_DIR, "quran.json"), JSON.stringify(ayatIndex), "utf-8");
console.log(`[ok] quran index: ${ayatIndex.length} ayat`);

// -----------------------------------------------------------------------
// 3) Hadits: bikin index ringan per kitab (nomor + terjemah saja, tanpa
//    teks Arab) supaya ukurannya jauh lebih kecil dari data lengkapnya,
//    disimpan terpisah per kitab supaya bisa di-load on-demand (lazy) oleh
//    API search-nya, bukan sekaligus semua 62 ribu hadits.
// -----------------------------------------------------------------------
const HADITS_DIR = path.join(SRC, "data", "hadits");
const kitabList = JSON.parse(fs.readFileSync(path.join(HADITS_DIR, "index.json"), "utf-8"));
const HADITS_OUT_DIR = path.join(OUT_DIR, "hadits");
fs.mkdirSync(HADITS_OUT_DIR, { recursive: true });

for (const k of kitabList) {
  const items = [];
  for (let c = 0; c < k.totalChunks; c++) {
    const chunk = JSON.parse(fs.readFileSync(path.join(HADITS_DIR, k.slug, `${c}.json`), "utf-8"));
    for (const h of chunk) {
      items.push({ n: h.nomor, t: h.terjemah });
    }
  }
  fs.writeFileSync(path.join(HADITS_OUT_DIR, `${k.slug}.json`), JSON.stringify(items), "utf-8");
  console.log(`[ok] hadits ${k.slug}: ${items.length} item`);
}

fs.writeFileSync(
  path.join(HADITS_OUT_DIR, "index.json"),
  JSON.stringify(kitabList.map((k) => ({ slug: k.slug, nama: k.nama }))),
  "utf-8"
);

console.log("\nSelesai membangun search index.");
