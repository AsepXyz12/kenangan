"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "splashShown";
const VISIBLE_MS = 1800; // berapa lama splash full terlihat sebelum mulai fade
const FADE_MS = 600; // durasi animasi fade out

// Splash screen full-layar yang muncul SEKALI per sesi browser (pakai
// sessionStorage, bukan localStorage — supaya splash muncul lagi tiap buka
// tab/sesi browser baru, tapi tidak berulang tiap pindah halaman dalam sesi
// yang sama). Kalau logo belum diset admin, splash tetap tampil dengan nama
// situs saja (tanpa gambar).
export default function SplashScreen({ siteName, logoUrl }) {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // sessionStorage tidak tersedia (mode privat ketat dst) — anggap
      // belum pernah tampil, splash tetap jalan sekali untuk load ini.
    }

    if (alreadyShown) return;

    setVisible(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Diamkan — kalaupun gagal disimpan, splash cuma akan muncul lagi di
      // load berikutnya, bukan masalah besar.
    }

    const fadeTimer = setTimeout(() => setFading(true), VISIBLE_MS);
    const removeTimer = setTimeout(() => setVisible(false), VISIBLE_MS + FADE_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Belum mounted (render pertama di server) atau splash tidak perlu tampil
  // -> tidak render apa-apa, supaya tidak flash konten kosong.
  if (!mounted || !visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-emerald transition-opacity"
      style={{
        opacity: fading ? 0 : 1,
        transitionDuration: `${FADE_MS}ms`,
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <div
        className="flex flex-col items-center px-6 text-center"
        style={{
          animation: "splash-rise 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
        }}
      >
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt={siteName}
            className="h-20 sm:h-24 w-auto max-w-[220px] object-contain mb-6 drop-shadow-lg"
          />
        ) : (
          <div className="w-16 h-16 rounded-full border-2 border-parchment/40 mb-6" />
        )}
        <p className="font-stamp text-[10px] sm:text-xs tracking-[0.3em] uppercase text-parchment/60">
          Selamat Datang di Website
        </p>
        <h1 className="font-display italic text-3xl sm:text-4xl mt-2 text-parchment leading-tight">
          {siteName}
        </h1>
      </div>

      <style>{`
        @keyframes splash-rise {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
