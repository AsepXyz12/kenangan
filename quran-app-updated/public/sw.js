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
  "/perbaiki",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/quran",
  "/iqro",
  "/iqro/1",
  "/iqro/2",
  "/iqro/3",
  "/iqro/4",
  "/iqro/5",
  "/iqro/6",
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
  "/hukum-islam",
  "/akhlak-adab",
  "/ilmu-tajwid",
  "/sirah-sahabat",
  "/wanita-dalam-islam",
  "/sejarah-islam",
  "/malam-jumat",
  "/tahlil-yasin",
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

// PENTING (fix "This page couldn't load" setelah navigasi dalam/banyak):
// cache.put() sebelumnya dipanggil TANPA await & TANPA .catch() di beberapa
// tempat ("fire and forget"). Kalau gagal (paling sering QuotaExceededError
// karena storage HP penuh setelah banyak halaman/audio ke-cache dalam satu
// sesi), itu jadi unhandled promise rejection di dalam service worker.
// Browser bisa mematikan/me-restart SW yang lagi banyak unhandled rejection,
// dan begitu itu kejadian PAS di tengah request navigasi, hasilnya request
// itu gagal total dengan error mentah dari Chrome ("This page couldn't
// load"), bukan fallback offline custom kita. Fix: SELALU await + tangkap
// errornya lewat helper ini, jangan biarkan cache.put() gagal diam-diam.
async function safePut(cache, request, response) {
  try {
    await cache.put(request, response);
  } catch (err) {
    console.error("[sw] gagal simpan ke cache (kemungkinan quota penuh)", err);
  }
}

// PENTING: PAGE_CACHE & AUDIO_CACHE dulu boleh membesar TANPA BATAS selama
// versi build yang sama (baru dibersihkan pas ganti versi/deploy baru).
// Kalau user buka banyak surat/juz/hadits/audio berturut-turut dalam satu
// sesi (persis skenario "klik terlalu dalam"), cache ini bisa kepenuhan
// storage quota browser -> lihat catatan di safePut() di atas. Fungsi ini
// membuang entri PALING LAMA setiap kali cache sudah melebihi batas, supaya
// ukurannya tetap terkendali walau dipakai baca lama tanpa reload.
async function trimCache(cacheName, maxEntries) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length <= maxEntries) return;
    const toDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(toDelete.map((key) => cache.delete(key)));
  } catch (err) {
    console.error("[sw] gagal trim cache", cacheName, err);
  }
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
          if (response.ok) {
            await safePut(cache, request, response.clone());
            trimCache(AUDIO_CACHE, 80);
          }
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
  //
  // PENTING: request.clone() dipakai di SETIAP pemanggilan fetch(). Request
  // yang sama tidak boleh dipakai fetch() dua kali (misalnya untuk retry) —
  // browser akan throw error "already used" yang tidak ketangkep .catch()
  // biasa, dan itu bikin respondWith() reject mentah-mentah sehingga browser
  // nampilin halaman error bawaannya sendiri ("This page couldn't load"),
  // BUKAN halaman offline custom kita. Makanya seluruh langkah di bawah ini
  // dibungkus try/catch berlapis supaya respondWith() dijamin selalu resolve
  // ke sebuah Response, apa pun yang terjadi.
  if (isNavigationRequest(request)) {
    event.respondWith(
      (async () => {
        // Percobaan 1 & 2 (retry sekali kalau gagal)
        for (let attempt = 0; attempt < 2; attempt++) {
          try {
            const response = await fetch(request.clone());
            // PENTING: hanya simpan response yang BENAR-BENAR OK (status 200-299).
            // Sebelumnya semua response disimpan tanpa dicek -> kalau server sempat
            // membalas error (404/500, mis. race condition saat deploy baru lagi
            // berjalan), error itu ikut kesimpan permanen di cache dengan key URL
            // itu. Akibatnya: begitu user balik ke halaman itu (mis. klik "Mushaf"
            // atau kembali ke dashboard) lalu request berikutnya kena kondisi apa
            // pun yang bikin fallback ke cache, yang muncul ya halaman rusak itu
            // lagi dan lagi, walau situsnya sendiri sebenarnya sudah normal.
            if (response.ok) {
              try {
                const cache = await caches.open(PAGE_CACHE);
                await safePut(cache, request, response.clone());
                trimCache(PAGE_CACHE, 60);
              } catch (err) {
                console.error("[sw] gagal simpan cache halaman", err);
              }
              return response;
            }
            // Response gagal (4xx/5xx) tapi bukan karena network putus -> jangan
            // simpan ke cache, langsung balikin apa adanya (biar Next.js error.tsx
            // / not-found.tsx yang nangani, bukan disamarkan jadi masalah offline).
            return response;
          } catch {
            // lanjut ke percobaan berikutnya, atau ke fallback di bawah
          }
        }

        // Network gagal 2x -> cari di cache halaman yang pernah dibuka
        try {
          const cache = await caches.open(PAGE_CACHE);
          const cached = await cache.match(request);
          if (cached) return cached;
        } catch (err) {
          console.error("[sw] gagal baca cache halaman", err);
        }

        // Tidak ada di cache -> fallback ke beranda dari precache
        try {
          const shellCache = await caches.open(SHELL_CACHE);
          const fallback = await shellCache.match("/");
          if (fallback) return fallback;
        } catch (err) {
          console.error("[sw] gagal baca shell cache", err);
        }

        // Semua gagal -> halaman offline custom (bukan error bawaan browser)
        return offlineResponse();
      })()
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
          if (response.ok) {
            await safePut(cache, request, response.clone());
            trimCache(PAGE_CACHE, 60);
          }
          return response;
        } catch (err) {
          // Nggak ada di network -> coba cache dulu (kalau ada, walau URL
          // persis beda-beda tiap request karena token _rsc), lalu coba
          // SEKALI LAGI ke network alih-alih langsung nyerah -> lebih tahan
          // koneksi jelek.
          const cached = await cache.match(request);
          if (cached) return cached;
          try {
            return await fetch(request);
          } catch (err2) {
            // PENTING: dulu di titik ini kita balikin Response 503 buatan
            // sendiri (bukan throw). Niatnya baik (biar Next.js router
            // "nangkep" sebagai fetch gagal biasa), tapi efeknya JUSTRU
            // sebaliknya: fetch() dari sisi Next.js jadi RESOLVE (bukan
            // reject) dengan status gagal, jadi router mengira itu response
            // beneran lalu render error.tsx segment TUJUAN. Karena error.tsx
            // waktu itu tidak punya Navbar sama sekali (lihat ErrorState.tsx),
            // pengguna kejebak di halaman "Terjadi kesalahan" tanpa jalan
            // keluar begitu pindah dari "Ayat pilihan hari ini" ke
            // Mushaf/Beranda saat koneksi sempat kedip.
            //
            // Fix: throw lagi (reject promise-nya). Next.js router memang
            // sudah didesain untuk fallback ke HARD NAVIGATION (reload
            // penuh) kalau fetch RSC-nya reject, bukan resolve dengan
            // status error -- itu jauh lebih tangguh daripada kita akali
            // sendiri di sini.
            throw err2;
          }
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
          if (response.ok) await safePut(cache, request, response.clone());
          return response;
        } catch (err) {
          const cached = await cache.match(request);
          if (cached) return cached;
          // Nggak ada di cache & network gagal -> dulu di-throw lagi, yang di
          // koneksi super lemot bisa berujung "This page couldn't load".
          // Sekarang balikin Response gagal yang rapi supaya browser/Next.js
          // yang nangani (retry/placeholder), bukan rejection mentah.
          return new Response(null, { status: 503, statusText: "Offline" });
        }
      })
    );
  }
});
