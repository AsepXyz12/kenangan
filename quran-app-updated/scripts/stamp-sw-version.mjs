// Dijalankan otomatis setelah "next build" (lihat script "postbuild" di package.json).
// Tujuannya: nyuntik ID unik (beda tiap build) ke public/sw.js supaya nama cache
// service worker ikut berubah setiap deploy. Ini bikin browser lama otomatis
// buang cache lama dan ambil JS/CSS build terbaru, alih-alih nyangkut ke build
// lama yang filenya sudah tidak ada di server (penyebab "This page couldn't load").

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const swPath = path.join(__dirname, "..", "public", "sw.js");

// Pakai VERCEL_GIT_COMMIT_SHA kalau ada (di Vercel), fallback ke timestamp.
const buildId = process.env.VERCEL_GIT_COMMIT_SHA || String(Date.now());

const original = readFileSync(swPath, "utf8");
const stamped = original.replace(/__BUILD_ID__/g, buildId.slice(0, 12));
writeFileSync(swPath, stamped, "utf8");

console.log(`[stamp-sw-version] sw.js cache version di-set ke: ${buildId.slice(0, 12)}`);
