"use client";

import { useEffect, useRef } from "react";
import { Play, Pause, Square, Volume2 } from "lucide-react";
import { useAudioPlayer } from "./AudioPlayerContext";
import { RECITER_NAME } from "@/lib/audio";

type SurahAudioBarProps = {
  surahNomor: number;
  namaLatin: string;
  ayatNomors: number[];
  autoScroll?: boolean;
};

export default function SurahAudioBar({
  surahNomor,
  namaLatin,
  ayatNomors,
  autoScroll = true,
}: SurahAudioBarProps) {
  const { current, isPlaying, isLoading, playSurah, pause, stop } = useAudioPlayer();
  const lastScrolledRef = useRef<number | null>(null);

  const sedangDiSurahIni = current?.surahNomor === surahNomor;
  const sedangMemutarSurahIni = sedangDiSurahIni && isPlaying;

  useEffect(() => {
    if (!autoScroll) return;
    if (!sedangDiSurahIni || !current) return;
    if (lastScrolledRef.current === current.ayatNomor) return;
    lastScrolledRef.current = current.ayatNomor;

    const el = document.getElementById(`ayat-${current.ayatNomor}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [current, sedangDiSurahIni, autoScroll]);

  const handleToggle = () => {
    if (sedangMemutarSurahIni) {
      pause();
    } else if (sedangDiSurahIni && current) {
      // lanjutkan dari ayat terakhir yang aktif
      playSurah(surahNomor, ayatNomors.filter((n) => n >= current.ayatNomor));
    } else {
      playSurah(surahNomor, ayatNomors);
    }
  };

  return (
    <div className="sticky top-16 z-30 mb-6">
      <div className="flex items-center gap-3 rounded-full border border-[var(--parchment-line)] bg-[var(--parchment)]/95 backdrop-blur px-4 py-2.5 shadow-sm">
        <button
          onClick={handleToggle}
          aria-label={sedangMemutarSurahIni ? "Jeda murottal" : `Putar murottal ${namaLatin}`}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--teal)] text-[var(--parchment)] hover:bg-[var(--teal-deep)] transition-colors shrink-0"
        >
          {sedangMemutarSurahIni ? (
            <Pause size={16} fill="currentColor" />
          ) : (
            <Play size={16} fill="currentColor" className="ml-0.5" />
          )}
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-[var(--ink)] truncate">
            {sedangDiSurahIni && current
              ? `${namaLatin} · ayat ${current.ayatNomor}${isLoading ? " · memuat..." : ""}`
              : `Putar murottal ${namaLatin}`}
          </p>
          <p className="text-[11px] text-[var(--ink-soft)] flex items-center gap-1">
            <Volume2 size={11} /> {RECITER_NAME}
          </p>
        </div>
        {sedangDiSurahIni && (
          <button
            onClick={stop}
            aria-label="Berhenti"
            className="flex items-center justify-center w-8 h-8 rounded-full text-[var(--ink-soft)] hover:text-[var(--maroon)] transition-colors shrink-0"
          >
            <Square size={14} fill="currentColor" />
          </button>
        )}
      </div>
    </div>
  );
}
