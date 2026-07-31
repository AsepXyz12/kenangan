"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

export type FontSize = "sedang" | "besar" | "sangat-besar";

const SIZE_MAP: Record<FontSize, { arabic: string; latin: string; terjemah: string }> = {
  sedang: { arabic: "text-2xl md:text-[2rem]", latin: "text-[15px] md:text-base", terjemah: "text-[15px] md:text-base" },
  besar: { arabic: "text-3xl md:text-[2.5rem]", latin: "text-base md:text-lg", terjemah: "text-base md:text-lg" },
  "sangat-besar": { arabic: "text-4xl md:text-[3rem]", latin: "text-lg md:text-xl", terjemah: "text-lg md:text-xl" },
};

type FontSizeState = {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  classes: { arabic: string; latin: string; terjemah: string };
};

const STORAGE_KEY = "mushaf:font-size";
const CHANGE_EVENT = "mushaf:font-size-change";

function readStoredFontSize(): FontSize {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY) as FontSize | null;
    return saved && SIZE_MAP[saved] ? saved : "sedang";
  } catch {
    return "sedang";
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

// useSyncExternalStore membaca localStorage secara sinkron di client tanpa
// perlu setState di dalam useEffect, dan tetap SSR-safe lewat getServerSnapshot.
function useStoredFontSize(): FontSize {
  return useSyncExternalStore(subscribe, readStoredFontSize, () => "sedang");
}

const FontSizeCtx = createContext<FontSizeState | null>(null);

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const fontSize = useStoredFontSize();

  const setFontSize = (size: FontSize) => {
    try {
      localStorage.setItem(STORAGE_KEY, size);
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {
      // abaikan jika localStorage tidak tersedia
    }
  };

  return (
    <FontSizeCtx.Provider value={{ fontSize, setFontSize, classes: SIZE_MAP[fontSize] }}>
      {children}
    </FontSizeCtx.Provider>
  );
}

export function useFontSize(): FontSizeState {
  const ctx = useContext(FontSizeCtx);
  if (!ctx) {
    throw new Error("useFontSize harus dipakai di dalam FontSizeProvider");
  }
  return ctx;
}
