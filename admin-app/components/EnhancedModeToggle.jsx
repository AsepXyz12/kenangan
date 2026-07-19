"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "kenangan-admin-enhanced-mode";

/**
 * Tombol mengambang untuk toggle "Mode Bagus" di panel admin — menambah
 * class `enhanced` ke <html>. Semua styling tambahan hidup di globals.css
 * lewat selector `html.enhanced ...`, jadi tampilan default (polos & cepat)
 * tidak tersentuh sama sekali. Klik lagi = balik seperti semula.
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
      title={enhanced ? "Kembalikan ke tampilan standar" : "Aktifkan tampilan modern"}
      className={`enhanced-toggle-btn fixed bottom-5 right-5 z-[999] flex items-center gap-2 text-[11px] uppercase tracking-wide mono px-4 py-2.5 border transition-all duration-300 ${
        ready ? "opacity-100" : "opacity-0"
      } ${
        enhanced
          ? "bg-accent text-paper border-accent shadow-lg"
          : "bg-white text-accent border-accent/40 shadow"
      }`}
    >
      <span aria-hidden="true">{enhanced ? "✨" : "🪄"}</span>
      {enhanced ? "Mode Bagus: ON" : "Mode Bagus"}
    </button>
  );
}
