"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Play, Pause, Volume2, VolumeX, PlayCircle } from "lucide-react";
import type { IqroJilid } from "@/lib/iqro-data";
import { isSpeechSupported, speakArabic, speakSequence, stopSpeaking } from "@/lib/iqro-audio";

const VARIANT_TEXT: Record<string, string> = {
  teal: "text-[var(--heading)]",
  gold: "text-[var(--gold)]",
  maroon: "text-[var(--maroon)]",
};

const VARIANT_BG: Record<string, string> = {
  teal: "bg-[var(--teal)]",
  gold: "bg-[var(--gold)]",
  maroon: "bg-[var(--maroon)]",
};

export default function IqroReader({ jilid }: { jilid: IqroJilid }) {
  const [halamanAktif, setHalamanAktif] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [playingAll, setPlayingAll] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(isSpeechSupported());
    return () => stopSpeaking();
  }, []);

  useEffect(() => {
    // Berhenti bicara kalau pindah halaman biar nggak numpuk suara.
    stopSpeaking();
    setPlayingId(null);
    setPlayingAll(false);
  }, [halamanAktif]);

  const halaman = jilid.halaman[halamanAktif];
  const warnaText = VARIANT_TEXT[jilid.warna];
  const warnaBg = VARIANT_BG[jilid.warna];

  const handlePlaySatu = (id: string, arab: string) => {
    if (!supported) return;
    if (playingId === id) {
      stopSpeaking();
      setPlayingId(null);
      return;
    }
    setPlayingAll(false);
    speakArabic(arab, {
      onStart: () => setPlayingId(id),
      onEnd: () => setPlayingId((cur) => (cur === id ? null : cur)),
    });
  };

  const handlePlaySemua = () => {
    if (!supported) return;
    if (playingAll) {
      stopSpeaking();
      setPlayingAll(false);
      setPlayingId(null);
      return;
    }
    setPlayingAll(true);
    speakSequence(
      halaman.contoh.map((c) => c.arab),
      {
        onItemStart: (i) => setPlayingId(halaman.contoh[i].id),
        onAllDone: () => {
          setPlayingAll(false);
          setPlayingId(null);
        },
      }
    );
  };

  return (
    <div>
      {/* Navigasi antar halaman jilid — pakai chip, bukan geser panjang */}
      <div className="flex flex-wrap gap-2 mb-6">
        {jilid.halaman.map((h, i) => (
          <button
            key={h.id}
            onClick={() => setHalamanAktif(i)}
            className={`px-3.5 py-1.5 rounded-full text-xs border transition-colors ${
              i === halamanAktif
                ? `${warnaBg} text-[var(--text-on-dark)] border-transparent`
                : "border-[var(--parchment-line)] text-[var(--ink-soft)] hover:border-[var(--gold)]"
            }`}
          >
            Halaman {i + 1}
          </button>
        ))}
      </div>

      <div className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-5 md:p-7">
        <h2 className={`font-display text-xl mb-2 ${warnaText}`}>{halaman.judul}</h2>
        <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-6">{halaman.penjelasan}</p>

        {!supported && (
          <p className="text-xs text-[var(--maroon)] bg-[var(--maroon)]/10 border border-[var(--maroon)]/30 rounded-sm px-3 py-2 mb-5">
            Perangkat/browser ini belum mendukung suara otomatis. Tampilan huruf tetap bisa
            dipakai untuk belajar bersama orang tua/ustadz.
          </p>
        )}

        <button
          onClick={handlePlaySemua}
          disabled={!supported}
          className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm text-[var(--text-on-dark)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${warnaBg} hover:opacity-90`}
        >
          <PlayCircle size={16} />
          {playingAll ? "Berhenti" : "Dengarkan semua di halaman ini"}
        </button>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {halaman.contoh.map((c) => {
            const aktif = playingId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => handlePlaySatu(c.id, c.arab)}
                disabled={!supported}
                className={`group relative rounded-sm border px-3 py-4 text-center transition-colors disabled:cursor-not-allowed ${
                  aktif
                    ? "border-[var(--gold)] bg-[var(--gold)]/10"
                    : "border-[var(--parchment-line)] bg-[var(--parchment)]/70 hover:border-[var(--gold)]"
                }`}
              >
                <p className="ayat-arabic text-2xl md:text-3xl text-[var(--ink)] mb-2" dir="rtl">
                  {c.arab}
                </p>
                <p className="text-xs text-[var(--ink-soft)] mb-2">{c.latin}</p>
                <span
                  className={`inline-flex items-center justify-center w-7 h-7 rounded-full transition-colors ${
                    aktif ? warnaBg : "bg-[var(--parchment-line)]/60"
                  } ${aktif ? "text-[var(--text-on-dark)]" : "text-[var(--ink-soft)]"}`}
                >
                  {!supported ? (
                    <VolumeX size={13} />
                  ) : aktif ? (
                    <Pause size={12} fill="currentColor" />
                  ) : (
                    <Play size={12} fill="currentColor" className="ml-0.5" />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {supported && (
          <p className="flex items-center gap-1.5 text-[11px] text-[var(--ink-soft)] mt-5">
            <Volume2 size={12} /> Suara memakai text-to-speech bawaan perangkat, bukan rekaman
            ustadz — cocok untuk latihan mandiri, tetap dampingi saat belajar.
          </p>
        )}
      </div>

      {/* Navigasi antar jilid */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--parchment-line)] text-sm">
        {jilid.jilid > 1 ? (
          <Link href={`/iqro/${jilid.jilid - 1}`} className="text-[var(--heading)] hover:underline">
            ← Jilid {jilid.jilid - 1}
          </Link>
        ) : (
          <span />
        )}
        {jilid.jilid < 6 ? (
          <Link href={`/iqro/${jilid.jilid + 1}`} className="text-[var(--heading)] hover:underline">
            Jilid {jilid.jilid + 1} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
