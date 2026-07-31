"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, BookmarkCheck } from "lucide-react";
import SurahHeader from "./SurahHeader";
import AyatBlock from "./AyatBlock";
import SurahAudioBar from "./SurahAudioBar";
import FontSizeControl from "./FontSizeControl";
import { setLastRead } from "@/lib/bookmark";
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
  const [tersimpan, setTersimpan] = useState(false);

  const ayatDitampilkan = surah.ayat.filter((a) => {
    if (ayatMulai && a.nomorAyat < ayatMulai) return false;
    if (ayatSelesai && a.nomorAyat > ayatSelesai) return false;
    return true;
  });

  // Tandai surat ini sebagai posisi bacaan terakhir saat halaman dibuka.
  useEffect(() => {
    setLastRead({
      surahNomor: surah.nomor,
      namaLatin: surah.namaLatin,
      ayatNomor: ayatMulai ?? 1,
    });
  }, [surah.nomor, surah.namaLatin, ayatMulai]);

  const handleTandai = () => {
    const ayatTengah = ayatDitampilkan[0]?.nomorAyat ?? 1;
    setLastRead({
      surahNomor: surah.nomor,
      namaLatin: surah.namaLatin,
      ayatNomor: ayatTengah,
    });
    setTersimpan(true);
    setTimeout(() => setTersimpan(false), 1800);
  };

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

      <SurahAudioBar
        surahNomor={surah.nomor}
        namaLatin={surah.namaLatin}
        ayatNomors={ayatDitampilkan.map((a) => a.nomorAyat)}
      />

      <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <FontSizeControl />
          <button
            onClick={handleTandai}
            aria-label="Tandai posisi bacaan di sini"
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[var(--parchment-line)] text-[var(--ink-soft)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
          >
            {tersimpan ? (
              <>
                <BookmarkCheck size={13} /> Tersimpan
              </>
            ) : (
              <>
                <Bookmark size={13} /> Tandai
              </>
            )}
          </button>
        </div>
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
            surahNomor={surah.nomor}
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
