"use client";

import { Play, Pause, Loader2 } from "lucide-react";
import Roundel from "./Roundel";
import { useAudioPlayer } from "./AudioPlayerContext";
import { useFontSize } from "./FontSizeContext";

type AyatBlockProps = {
  surahNomor: number;
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  tampilkanLatin: boolean;
};

export default function AyatBlock({
  surahNomor,
  nomorAyat,
  teksArab,
  teksLatin,
  teksIndonesia,
  tampilkanLatin,
}: AyatBlockProps) {
  const { isActiveAyat, isPlaying, isLoading, playAyat, pause } = useAudioPlayer();
  const { classes } = useFontSize();

  const aktif = isActiveAyat(surahNomor, nomorAyat);
  const sedangMuat = aktif && isLoading;
  const sedangPutar = aktif && isPlaying;

  const handleTogglePlay = () => {
    if (aktif && isPlaying) {
      pause();
    } else {
      playAyat(surahNomor, nomorAyat);
    }
  };

  return (
    <div
      id={`ayat-${nomorAyat}`}
      data-ayat-nomor={nomorAyat}
      className={`py-7 border-b border-[var(--parchment-line)] scroll-mt-36 transition-colors rounded-sm ${
        aktif ? "bg-[var(--gold)]/10 -mx-3 px-3 md:-mx-4 md:px-4" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-4 mb-4">
        <Roundel number={nomorAyat} variant={aktif ? "teal" : "gold"} size={34} />
        <button
          onClick={handleTogglePlay}
          aria-label={sedangPutar ? `Jeda ayat ${nomorAyat}` : `Putar ayat ${nomorAyat}`}
          className={`flex items-center justify-center w-9 h-9 rounded-full border transition-colors shrink-0 ${
            aktif
              ? "border-[var(--teal)] bg-[var(--teal)] text-[var(--text-on-dark)]"
              : "border-[var(--parchment-line)] text-[var(--ink-soft)] hover:border-[var(--teal)] hover:text-[var(--heading)]"
          }`}
        >
          {sedangMuat ? (
            <Loader2 size={16} className="animate-spin" />
          ) : sedangPutar ? (
            <Pause size={16} fill="currentColor" />
          ) : (
            <Play size={16} fill="currentColor" className="ml-0.5" />
          )}
        </button>
      </div>
      <p className={`ayat-arabic ${classes.arabic} text-[var(--ink)]`}>{teksArab}</p>
      {tampilkanLatin && (
        <p className={`font-body italic text-[var(--ink-soft)] ${classes.latin} mt-4 leading-relaxed`}>
          {teksLatin}
        </p>
      )}
      <p className={`font-body text-[var(--ink)] ${classes.terjemah} mt-3 leading-relaxed`}>
        {teksIndonesia}
      </p>
    </div>
  );
}
