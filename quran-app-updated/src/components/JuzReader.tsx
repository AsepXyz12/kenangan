"use client";

import { useState } from "react";
import SurahHeader from "./SurahHeader";
import AyatBlock from "./AyatBlock";
import type { SurahDetail } from "@/lib/quran-api";

export type JuzSegment = {
  surah: SurahDetail;
  ayatMulai: number;
  ayatSelesai: number;
};

export default function JuzReader({ segments }: { segments: JuzSegment[] }) {
  const [tampilkanLatin, setTampilkanLatin] = useState(true);

  return (
    <div>
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setTampilkanLatin((v) => !v)}
          className="text-xs px-3 py-1.5 rounded-full border border-[var(--parchment-line)] text-[var(--ink-soft)] hover:border-[var(--teal)] hover:text-[var(--teal-deep)] transition-colors"
        >
          {tampilkanLatin ? "Sembunyikan transliterasi" : "Tampilkan transliterasi"}
        </button>
      </div>

      {segments.map(({ surah, ayatMulai, ayatSelesai }) => {
        const ayatDitampilkan = surah.ayat.filter(
          (a) => a.nomorAyat >= ayatMulai && a.nomorAyat <= ayatSelesai
        );
        return (
          <div key={surah.nomor} className="mb-4">
            {ayatMulai === 1 ? (
              <SurahHeader
                nomor={surah.nomor}
                nama={surah.nama}
                namaLatin={surah.namaLatin}
                arti={surah.arti}
                tempatTurun={surah.tempatTurun}
                jumlahAyat={surah.jumlahAyat}
              />
            ) : (
              <p className="text-center text-sm text-[var(--ink-soft)] mb-6 mt-10">
                {surah.namaLatin} &middot; lanjutan dari ayat {ayatMulai}
              </p>
            )}
            {ayatDitampilkan.map((a) => (
              <AyatBlock
                key={a.nomorAyat}
                nomorAyat={a.nomorAyat}
                teksArab={a.teksArab}
                teksLatin={a.teksLatin}
                teksIndonesia={a.teksIndonesia}
                tampilkanLatin={tampilkanLatin}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
