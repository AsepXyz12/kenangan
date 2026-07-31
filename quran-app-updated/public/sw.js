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

const APP_SHELL = ["/", "/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
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
        } catch {
          return cached || Response.error();
        }
      })
    );
    return;
  }

  // Hanya tangani request same-origin selain audio.
  if (url.origin !== self.location.origin) return;

  // Navigasi halaman (buka surat/juz/hadits dll): network-first, fallback ke cache, lalu ke beranda.
  if (isNavigationRequest(request)) {
    event.respondWith(
      fetch(request)
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
          return fallback || Response.error();
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
        } catch {
          const cached = await cache.match(request);
          return cached || Response.error();
        }
      })
    );
  }
});
