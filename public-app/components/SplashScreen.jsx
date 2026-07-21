"use client";

import { useEffect, useState } from "react";

const VISIBLE_MS = 1600; // berapa lama splash terlihat sebelum mulai fade
const FADE_MS = 500; // durasi animasi fade out

// Splash card kecil di tengah layar (bukan full-screen — sisa layar di
// belakangnya tetap terlihat, cuma diredupkan tipis) yang muncul tiap kali
// komponen ini di-mount, yaitu tiap kali halaman yang memakainya (home,
// kelas, alumni) di-load/dibuka. Tidak pakai sessionStorage sama sekali,
// supaya konsisten muncul tiap pindah/refresh halaman, bukan cuma sekali per
// sesi browser.
export default function SplashScreen({ siteName, logoUrl }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), VISIBLE_MS);
    const removeTimer = setTimeout(() => setVisible(false), VISIBLE_MS + FADE_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/30 backdrop-blur-[2px] transition-opacity"
      style={{
        opacity: fading ? 0 : 1,
        transitionDuration: `${FADE_MS}ms`,
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <div
        className="flex flex-col items-center px-8 py-9 mx-6 bg-emerald shadow-2xl"
        style={{
          animation: "splash-rise 550ms cubic-bezier(0.22, 1, 0.36, 1) both",
        }}
      >
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt={siteName}
            className="h-16 sm:h-20 w-auto max-w-[180px] object-contain mb-5 drop-shadow-lg"
          />
        ) : (
          <div className="w-14 h-14 rounded-full border-2 border-parchment/40 mb-5" />
        )}
        <p className="font-stamp text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-parchment/60">
          Selamat Datang di Website
        </p>
        <h1 className="font-display italic text-2xl sm:text-3xl mt-2 text-parchment leading-tight text-center">
          {siteName}
        </h1>
      </div>

      <style>{`
        @keyframes splash-rise {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
