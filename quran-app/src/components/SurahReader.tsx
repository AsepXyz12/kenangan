"use client";

import { useState } from "react";
import Link from "next/link";
import SurahHeader from "./SurahHeader";
import AyatBlock from "./AyatBlock";
import type { SurahDetail } from "@/lib/quran-api";

type SurahReaderProps = {
  surah: SurahDetail;
  ayatMulai?: number;
  ayatSelesai?: number;
  tampilkanNavigasiSurat?: boolean;
};

export default function SurahReader({
  surah,
  ayatMulai,
  ayatSelesai,
  tampilkanNavigasiSurat = true,
}: SurahReaderProps) {
  const [tampilkanLatin, setTampilkanLatin] = useState(true);

  const ayatDitampilkan = surah.ayat.filter((a) => {
    if (ayatMulai && a.nomorAyat < ayatMulai) return false;
    if (ayatSelesai && a.nomorAyat > ayatSelesai) return false;
    return true;
  });

  return (
    <div>
      {(!ayatMulai || ayatMulai === 1) && (
        <SurahHeader
          nomor={surah.nomor}
          nama={surah.nama}
          namaLatin={surah.namaLatin}
          arti={surah.arti}
          tempatTurun={surah.tempatTurun}
          jumlahAyat={surah.jumlahAyat}
        />
      )}
      {(ayatMulai ?? 1) > 1 && (
        <p className="text-center text-sm text-[var(--ink-soft)] mb-6">
          {surah.namaLatin} &middot; lanjutan dari ayat {ayatMulai}
        </p>
      )}

      <div className="flex justify-end mb-2">
        <button
          onClick={() => setTampilkanLatin((v) => !v)}
          className="text-xs px-3 py-1.5 rounded-full border border-[var(--parchment-line)] text-[var(--ink-soft)] hover:border-[var(--teal)] hover:text-[var(--teal-deep)] transition-colors"
        >
          {tampilkanLatin ? "Sembunyikan transliterasi" : "Tampilkan transliterasi"}
        </button>
      </div>

      <div>
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

      {tampilkanNavigasiSurat && (
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-[var(--parchment-line)]">
          {surah.suratSebelumnya ? (
            <Link
              href={`/quran/surah/${surah.suratSebelumnya.nomor}`}
              className="text-sm text-[var(--teal-deep)] hover:underline"
            >
              ← {surah.suratSebelumnya.namaLatin}
            </Link>
          ) : (
            <span />
          )}
          {surah.suratSelanjutnya ? (
            <Link
              href={`/quran/surah/${surah.suratSelanjutnya.nomor}`}
              className="text-sm text-[var(--teal-deep)] hover:underline"
            >
              {surah.suratSelanjutnya.namaLatin} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      )}
    </div>
  );
}
