// Service worker Mushaf — dibuat sesederhana mungkin agar mudah dirawat.
// Strategi:
//  - App shell (halaman, JS, CSS, font, ikon) -> network-first, fallback ke cache (biar nggak nyangkut ke build lama pas deploy baru)
//  - Audio murottal (mp3 dari everyayah.com) -> cache-first, sekali didengar tersimpan untuk offline
//  - Navigasi saat offline & belum pernah dibuka -> fallback ke halaman beranda dari cache
//
// PENTING: BUILD_ID di bawah ini WAJIB diganti setiap kali deploy versi baru
// (lihat script "postbuild" di package.json yang otomatis melakukan ini).
// Kalau BUILD_ID tidak berubah, browser lama akan terus pakai cache SW lama
// yang mereferensikan file JS/CSS build lama yang sudah tidak ada di server
// -> muncul "This page couldn't load".
const BUILD_ID = "__BUILD_ID__";
const VERSION = `mushaf-${BUILD_ID}`;
const SHELL_CACHE = `${VERSION}-shell`;
const AUDIO_CACHE = `${VERSION}-audio`;
const PAGE_CACHE = `${VERSION}-pages`;

// Precache seluruh menu utama (samain sama NAV_ITEMS di Navbar.tsx) supaya
// begitu app dibuka pertama kali (online), semua menu ini langsung tersedia
// offline — nggak perlu nunggu user buka satu-satu dulu baru ke-cache.
const APP_SHELL = [
  "/",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/quran",
  "/hadits",
  "/thaharah",
  "/panduan-sholat",
  "/doa-dzikir",
  "/panduan-puasa",
  "/panduan-zakat",
  "/panduan-haji-umrah",
  "/sholat-khusus",
  "/asmaul-husna",
  "/kisah-nabi",
  "/sirah-nabawiyah",
  "/rukun-islam",
  "/rukun-iman",
  "/aqidah",
  "/fiqih-madzhab",
  "/akhlak-adab",
  "/ilmu-tajwid",
  "/sirah-sahabat",
  "/wanita-dalam-islam",
  "/sejarah-islam",
  "/malam-jumat",
];

// Halaman fallback paling terakhir kalau semuanya gagal (network mati & cache
// kosong). Di-inline langsung di sini (bukan file terpisah) supaya nggak
// tergantung ke fetch lain yang juga bisa gagal. Dulu di kondisi ini SW
// balikin Response.error() mentah -> browser nampilin "This page couldn't
// load" yang bikin panik. Sekarang minimal user lihat pesan yang jelas +
// tombol coba lagi.
const OFFLINE_HTML = `<!DOCTYPE html>
<html lang="id"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Mushaf — Tidak ada koneksi</title>
<style>
  body{font-family:system-ui,sans-serif;background:#f5efe3;color:#2b2b28;
    display:flex;min-height:100vh;align-items:center;justify-content:center;
    text-align:center;padding:24px;margin:0}
  div{max-width:360px}
  h1{font-size:20px;margin-bottom:8px}
  p{font-size:15px;color:#5c574d;line-height:1.5}
  button{margin-top:16px;padding:10px 20px;border-radius:999px;border:none;
    background:#0f6c66;color:#fff;font-size:15px}
</style></head>
<body><div>
  <h1>Koneksi terputus</h1>
  <p>Halaman ini gagal dimuat karena koneksi internet kamu terputus atau tidak stabil. Coba periksa WiFi/data seluler, lalu muat ulang.</p>
  <button onclick="location.reload()">Muat ulang</button>
</div></body></html>`;

function offlineResponse() {
  return new Response(OFFLINE_HTML, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) =>
      // Precache tiap file SATU-SATU, bukan pakai addAll().
      // addAll() itu atomik: kalau 1 dari 4 file gagal di-fetch (mis. koneksi
      // lemot pas install), SEMUA batal disimpan & cache jadi kosong selamanya.
      // Dengan Promise.allSettled, file yang berhasil tetap kesimpan walau ada
      // yang gagal — dan kegagalannya kelihatan di console, nggak ditelan diam-diam.
      Promise.allSettled(
        APP_SHELL.map((url) =>
          cache.add(url).catch((err) => {
            console.error("[sw] gagal precache", url, err);
          })
        )
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith("mushaf-") && !key.startsWith(VERSION))
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

function isAudioRequest(url) {
  return url.hostname === "everyayah.com";
}

function isNavigationRequest(request) {
  return request.mode === "navigate";
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Audio murottal: cache-first, simpan permanen supaya bisa didengar offline setelah pernah diputar.
  if (isAudioRequest(url)) {
    event.respondWith(
      caches.open(AUDIO_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const response = await fetch(request);
          if (response.ok) cache.put(request, response.clone());
          return response;
        } catch (err) {
          if (cached) return cached;
          throw err;
        }
      })
    );
    return;
  }

  // Hanya tangani request same-origin selain audio.
  if (url.origin !== self.location.origin) return;

  // Navigasi halaman (buka surat/juz/hadits dll): network-first, dengan 1x
  // percobaan ulang (WiFi lemah sering cuma "kedip" sebentar, bukan mati total),
  // fallback ke cache, lalu ke beranda dari cache, dan kalau semua gagal
  // baru tampilkan halaman offline yang jelas (bukan network error mentah).
  if (isNavigationRequest(request)) {
    event.respondWith(
      fetch(request)
        .catch(() => fetch(request)) // retry sekali
        .then((response) => {
          const clone = response.clone();
          caches.open(PAGE_CACHE).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(async () => {
          const cache = await caches.open(PAGE_CACHE);
          const cached = await cache.match(request);
          if (cached) return cached;
          const shellCache = await caches.open(SHELL_CACHE);
          const fallback = await shellCache.match("/");
          return fallback || offlineResponse();
        })
    );
    return;
  }

  // Transisi client-side Next.js (klik <Link>, bukan reload penuh) itu bentuknya
  // fetch RSC payload, bukan request "navigate". Ditangani terpisah di sini
  // supaya pindah halaman yang sudah pernah dibuka tetap mulus pas offline,
  // nggak nunggu gagal dulu baru Next.js fallback ke reload penuh.
  const isRSCTransition =
    request.method === "GET" &&
    !url.pathname.startsWith("/api/") &&
    (request.headers.get("RSC") === "1" || url.searchParams.has("_rsc"));

  if (isRSCTransition) {
    event.respondWith(
      caches.open(PAGE_CACHE).then(async (cache) => {
        try {
          const response = await fetch(request);
          if (response.ok) cache.put(request, response.clone());
          return response;
        } catch (err) {
          const cached = await cache.match(request);
          if (cached) return cached;
          throw err;
        }
      })
    );
    return;
  }

  // Aset statis (JS/CSS/font/gambar Next.js): network-first, fallback ke cache.
  // Dulu pakai stale-while-revalidate (langsung balikin cache lama sebelum cek network),
  // itu penyebab utama chunk build lama nyangkut terus setelah deploy baru.
  if (
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "font" ||
    request.destination === "image"
  ) {
    event.respondWith(
      caches.open(SHELL_CACHE).then(async (cache) => {
        try {
          const response = await fetch(request);
          if (response.ok) cache.put(request, response.clone());
          return response;
        } catch (err) {
          const cached = await cache.match(request);
          if (cached) return cached;
          // Nggak ada di cache & network gagal -> biarin error asli dari fetch
          // yang naik ke browser (browser lebih tahu cara nampilin & retry
          // request gambar/font/script yang gagal), jangan bikin error baru
          // pakai Response.error() yang malah numbulin "This page couldn't load".
          throw err;
        }
      })
    );
  }
});
