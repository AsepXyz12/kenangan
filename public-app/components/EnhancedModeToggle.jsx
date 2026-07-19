"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "kenangan-enhanced-mode";

/**
 * Tombol mengambang untuk toggle "Mode Bagus" — menambah/menghapus class
 * `enhanced` di <html>. Semua styling tambahan (rounded, shadow, gradient,
 * transisi) hidup di globals.css lewat selector `html.enhanced ...`, jadi
 * komponen ini TIDAK menyentuh tampilan asli sama sekali. Klik lagi = balik
 * ke tampilan default persis seperti semula.
 */
export default function EnhancedModeToggle() {
  const [enhanced, setEnhanced] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) === "1";
    setEnhanced(saved);
    document.documentElement.classList.toggle("enhanced", saved);
    setReady(true);
  }, []);

  function toggle() {
    const next = !enhanced;
    setEnhanced(next);
    document.documentElement.classList.toggle("enhanced", next);
    window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enhanced}
      title={enhanced ? "Kembalikan ke tampilan klasik" : "Aktifkan tampilan modern"}
      className={`enhanced-toggle-btn fixed bottom-5 right-5 z-[999] flex items-center gap-2 font-stamp text-[11px] uppercase tracking-wide px-4 py-2.5 border transition-all duration-300 ${
        ready ? "opacity-100" : "opacity-0"
      } ${
        enhanced
          ? "bg-emerald text-parchment border-emerald shadow-lg"
          : "bg-white/90 text-emerald border-emerald/30 shadow"
      }`}
      style={{ backdropFilter: "blur(6px)" }}
    >
      <span aria-hidden="true">{enhanced ? "✨" : "🪄"}</span>
      {enhanced ? "Mode Bagus: ON" : "Mode Bagus"}
    </button>
  );
}
