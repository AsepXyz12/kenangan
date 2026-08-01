"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

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
