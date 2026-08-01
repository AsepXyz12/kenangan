"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "0.0.0.0" ||
      window.location.hostname.endsWith(".local");

    // PENTING: SW cuma boleh nyala di production (hasil `next build`).
    // Di dev (`next dev`), sw.js belum pernah di-stamp (BUILD_ID masih
    // literal "__BUILD_ID__"), sementara Fast Refresh terus-terusan ganti
    // isi JS/RSC payload. Versi cache SW nggak ikut berubah -> SW ngasih
    // balik halaman/RSC lama yang nggak nyambung sama chunk yang lagi
    // jalan -> React crash begitu pindah halaman (nyangkut di error.tsx).
    // Makanya di dev/localhost kita malah aktif-aktif bersihin SW & cache
    // lama (jaga-jaga ada sisa dari testing sebelumnya), bukan register baru.
    if (process.env.NODE_ENV !== "production" || isLocalhost) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((reg) => reg.unregister());
      });
      if (typeof caches !== "undefined") {
        caches.keys().then((keys) => {
          keys.filter((k) => k.startsWith("mushaf-")).forEach((k) => caches.delete(k));
        });
      }
      return;
    }

    // Jaga-jaga supaya kita cuma reload sekali, nggak infinite loop reload.
    let hasReloaded = false;
    const reloadOnce = () => {
      if (hasReloaded) return;
      hasReloaded = true;
      window.location.reload();
    };

    // Kalau tab ini sebelumnya dikontrol SW lain (build lama) lalu berganti
    // controller (SW baru aktif), reload sekali supaya user dapat JS/CSS terbaru.
    navigator.serviceWorker.addEventListener("controllerchange", reloadOnce);

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          // Kalau ada worker baru yang lagi nunggu (sudah kedetect sebelum listener
          // ini terpasang), langsung suruh dia ambil alih.
          if (registration.waiting) {
            registration.waiting.postMessage("SKIP_WAITING");
          }

          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (!newWorker) return;
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                // Ada versi baru siap dipakai -> aktifkan sekarang, jangan tunggu
                // semua tab lama ditutup dulu (skipWaiting di sw.js juga bantu ini).
                newWorker.postMessage("SKIP_WAITING");
              }
            });
          });

          // Cek update tiap kali tab kembali aktif/fokus, biar user yang sudah
          // lama nggak nutup tab tetap kebagian versi terbaru.
          document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") {
              registration.update().catch(() => {});
            }
          });
        })
        .catch(() => {
          // Gagal daftar service worker (mis. dev server tanpa https) — abaikan diam-diam.
        });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register);
      return () => window.removeEventListener("load", register);
    }
  }, []);

  return null;
}
