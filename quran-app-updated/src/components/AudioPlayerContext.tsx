"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getAyatAudioUrl } from "@/lib/audio";

type PlaybackTarget = {
  surahNomor: number;
  ayatNomor: number;
};

type QueueInfo = {
  surahNomor: number;
  ayatNomors: number[];
} | null;

type AudioPlayerState = {
  current: PlaybackTarget | null;
  isPlaying: boolean;
  isLoading: boolean;
  playAyat: (surahNomor: number, ayatNomor: number) => void;
  playSurah: (surahNomor: number, ayatNomors: number[]) => void;
  pause: () => void;
  stop: () => void;
  isActiveAyat: (surahNomor: number, ayatNomor: number) => boolean;
};

const AudioPlayerCtx = createContext<AudioPlayerState | null>(null);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const queueRef = useRef<QueueInfo>(null);
  // Menyimpan target yang sedang diputar dalam ref (dibaca oleh handler "ended"
  // yang didaftarkan sekali saja) agar tidak perlu effect kedua untuk sinkronisasi.
  const currentRef = useRef<PlaybackTarget | null>(null);
  const [current, setCurrent] = useState<PlaybackTarget | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // playInternal ditaruh di ref supaya handler "ended" (didaftarkan sekali di
  // effect setup) selalu memanggil versi terbaru tanpa perlu re-attach listener.
  const playInternalRef = useRef<(surahNomor: number, ayatNomor: number) => void>(() => {});

  const playInternal = useCallback((surahNomor: number, ayatNomor: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    setIsLoading(true);
    audio.src = getAyatAudioUrl(surahNomor, ayatNomor);
    currentRef.current = { surahNomor, ayatNomor };
    setCurrent({ surahNomor, ayatNomor });
    audio.play().catch(() => {
      setIsLoading(false);
      setIsPlaying(false);
    });
  }, []);

  useEffect(() => {
    playInternalRef.current = playInternal;
  }, [playInternal]);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => setIsLoading(true);
    const onPlaying = () => setIsLoading(false);
    const onEnded = () => {
      const queue = queueRef.current;
      const cur = currentRef.current;
      if (queue && cur) {
        const idx = queue.ayatNomors.indexOf(cur.ayatNomor);
        const next = queue.ayatNomors[idx + 1];
        if (idx !== -1 && next !== undefined) {
          playInternalRef.current(queue.surahNomor, next);
          return;
        }
      }
      setIsPlaying(false);
      setCurrent(null);
      currentRef.current = null;
      queueRef.current = null;
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
    };
  }, []);

  const playAyat = useCallback(
    (surahNomor: number, ayatNomor: number) => {
      queueRef.current = null;
      playInternal(surahNomor, ayatNomor);
    },
    [playInternal]
  );

  const playSurah = useCallback(
    (surahNomor: number, ayatNomors: number[]) => {
      if (ayatNomors.length === 0) return;
      queueRef.current = { surahNomor, ayatNomors };
      playInternal(surahNomor, ayatNomors[0]);
    },
    [playInternal]
  );

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }
    queueRef.current = null;
    currentRef.current = null;
    setCurrent(null);
    setIsPlaying(false);
    setIsLoading(false);
  }, []);

  const isActiveAyat = useCallback(
    (surahNomor: number, ayatNomor: number) =>
      current?.surahNomor === surahNomor && current?.ayatNomor === ayatNomor,
    [current]
  );

  return (
    <AudioPlayerCtx.Provider
      value={{ current, isPlaying, isLoading, playAyat, playSurah, pause, stop, isActiveAyat }}
    >
      {children}
    </AudioPlayerCtx.Provider>
  );
}

export function useAudioPlayer(): AudioPlayerState {
  const ctx = useContext(AudioPlayerCtx);
  if (!ctx) {
    throw new Error("useAudioPlayer harus dipakai di dalam AudioPlayerProvider");
  }
  return ctx;
}
