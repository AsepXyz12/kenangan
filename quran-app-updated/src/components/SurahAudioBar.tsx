"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, Square, Volume2 } from "lucide-react";
import { useAudioPlayer } from "./AudioPlayerContext";
import { RECITER_NAME } from "@/lib/audio";

function formatWaktu(detik: number): string {
  if (!Number.isFinite(detik) || detik < 0) return "0:00";
  const m = Math.floor(detik / 60);
  const s = Math.floor(detik % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// Progress bar geser ala YouTube: klik di mana saja langsung lompat ke situ,
// dan bisa di-drag (mouse maupun jari di HP) sambil pause otomatis biar
// audio nggak "kejar-kejaran" sama posisi jari, lalu lanjut dari titik itu.
function SeekBar({
  progress,
  onSeekStart,
  onSeekPreview,
  onSeekCommit,
}: {
  progress: number;
  onSeekStart: () => void;
  onSeekPreview: (ratio: number) => void;
  onSeekCommit: (ratio: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [previewRatio, setPreviewRatio] = useState<number | null>(null);

  const ratioFromEvent = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    if (rect.width === 0) return 0;
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    wasPlayingRef.current = isPlaying;
    setDragging(true);
    onSeekStart();
    const ratio = ratioFromEvent(e.clientX);
    setPreviewRatio(ratio);
    onSeekPreview(ratio);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const ratio = ratioFromEvent(e.clientX);
    setPreviewRatio(ratio);
    onSeekPreview(ratio);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    const ratio = ratioFromEvent(e.clientX);
    setDragging(false);
    setPreviewRatio(null);
    onSeekCommit(ratio);
  };

  const shown = dragging && previewRatio !== null ? previewRatio : progress;

  return (
    <div
      ref={trackRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role="slider"
      aria-label="Posisi audio"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(shown * 100)}
      className="relative w-full h-4 flex items-center cursor-pointer group/seek touch-none select-none"
    >
      <div className="relative w-full h-[3px] rounded-full bg-[var(--parchment-line)] overflow-visible">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[var(--teal)]"
          style={{ width: `${shown * 100}%` }}
        />
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--teal)] shadow transition-transform ${
            dragging ? "scale-125" : "scale-0 group-hover/seek:scale-100"
          }`}
          style={{ left: `${shown * 100}%` }}
        />
      </div>
    </div>
  );
}

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
  const {
    current,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    progress,
    playSurah,
    pause,
    resume,
    stop,
    seekTo,
  } = useAudioPlayer();
  const lastScrolledRef = useRef<number | null>(null);
  // Simpen status "lagi main" SEBELUM mulai geser, biar pas dilepas kita tahu
  // harus lanjut muter lagi atau tetap diam (kalau tadinya emang lagi dijeda).
  const wasPlayingBeforeSeekRef = useRef(false);

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
          className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--teal)] text-[var(--text-on-dark)] hover:bg-[var(--teal-deep)] transition-colors shrink-0"
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

      {/* Progress bar geser ala YouTube -- cuma muncul kalau lagi ada audio
          aktif buat surat ini, biar nggak makan tempat pas belum diputar. */}
      {sedangDiSurahIni && (
        <div className="flex items-center gap-2 rounded-full border border-[var(--parchment-line)] bg-[var(--parchment)]/95 backdrop-blur px-4 py-1.5 mt-1.5 shadow-sm">
          <span className="text-[10px] tabular-nums text-[var(--ink-soft)] w-8 shrink-0">
            {formatWaktu(currentTime)}
          </span>
          <SeekBar
            progress={progress}
            onSeekStart={() => {
              wasPlayingBeforeSeekRef.current = isPlaying;
              if (isPlaying) pause();
            }}
            onSeekPreview={() => {
              // Cuma buat gerakin thumb & isian secara visual saat drag,
              // audio-nya sendiri baru dipindah pas dilepas (onSeekCommit)
              // biar nggak "berisik" muter potongan-potongan pas jari geser.
            }}
            onSeekCommit={(ratio) => {
              seekTo(ratio);
              if (wasPlayingBeforeSeekRef.current) resume();
            }}
          />
          <span className="text-[10px] tabular-nums text-[var(--ink-soft)] w-8 shrink-0 text-right">
            {formatWaktu(duration)}
          </span>
        </div>
      )}
    </div>
  );
}
