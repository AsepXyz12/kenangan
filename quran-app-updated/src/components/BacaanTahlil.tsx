"use client";

import { useState } from "react";
import AyatBlock from "./AyatBlock";
import SurahReader from "./SurahReader";
import { KALIMAT_TAHLIL, DOA_TAHLIL, type Bacaan } from "@/data/tahlil-yasin";
import type { SurahDetail } from "@/lib/quran-api";

function BacaanCard({ b }: { b: Bacaan }) {
  return (
    <div className="rounded-2xl border border-[var(--parchment-line)] bg-[var(--parchment)] p-5 md:p-6">
      <div className="flex items-center justify-between gap-3 mb-2">
        <h3 className="font-medium text-[var(--ink)]">{b.judul}</h3>
        {b.ulangan && (
          <span className="shrink-0 text-xs px-2.5 py-1 rounded-full bg-[var(--parchment-deep)] text-[var(--teal-deep)]">
            {b.ulangan}
          </span>
        )}
      </div>
      <p dir="rtl" className="font-arabic text-xl md:text-2xl leading-loose text-[var(--ink)]">
        {b.arab}
      </p>
      <p className="text-sm italic text-[var(--ink-soft)] mt-2">{b.latin}</p>
      <p className="text-sm text-[var(--ink-soft)] mt-1">&ldquo;{b.arti}&rdquo;</p>
      {b.keterangan && (
        <p className="text-xs text-[var(--ink-soft)] mt-2 border-t border-[var(--parchment-line)] pt-2">
          {b.keterangan}
        </p>
      )}
    </div>
  );
}

function Langkah({
  nomor,
  judul,
  keterangan,
  children,
}: {
  nomor: number;
  judul: string;
  keterangan?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-display text-lg text-[var(--gold)] shrink-0">{nomor}.</span>
        <div>
          <h3 className="font-display text-lg text-[var(--ink)]">{judul}</h3>
          {keterangan && (
            <p className="text-xs text-[var(--ink-soft)] mt-0.5">{keterangan}</p>
          )}
        </div>
      </div>
      <div className="pl-7">{children}</div>
    </div>
  );
}

export default function BacaanTahlil({
  fatihah,
  ikhlas,
  falaq,
  nas,
  baqarah,
  yasin,
}: {
  fatihah: SurahDetail;
  ikhlas: SurahDetail;
  falaq: SurahDetail;
  nas: SurahDetail;
  baqarah: SurahDetail;
  yasin: SurahDetail;
}) {
  const [aktif, setAktif] = useState<"tahlil" | "yasin">("tahlil");

  const baqarahAwal = baqarah.ayat.filter((a) => a.nomorAyat <= 5);
  const ayatKursi = baqarah.ayat.filter((a) => a.nomorAyat === 255);
  const baqarahAkhir = baqarah.ayat.filter((a) => a.nomorAyat >= 284);

  return (
    <div>
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setAktif("tahlil")}
          className={`flex-1 px-4 py-3 rounded-sm text-sm border transition-colors ${
            aktif === "tahlil"
              ? "bg-[var(--teal)] text-[var(--parchment)] border-[var(--teal)]"
              : "border-[var(--parchment-line)] text-[var(--ink-soft)] hover:border-[var(--teal)]"
          }`}
        >
          Susunan Tahlil
        </button>
        <button
          onClick={() => setAktif("yasin")}
          className={`flex-1 px-4 py-3 rounded-sm text-sm border transition-colors ${
            aktif === "yasin"
              ? "bg-[var(--teal)] text-[var(--parchment)] border-[var(--teal)]"
              : "border-[var(--parchment-line)] text-[var(--ink-soft)] hover:border-[var(--teal)]"
          }`}
        >
          Surat Yasin &middot; 83 ayat
        </button>
      </div>

      {aktif === "yasin" ? (
        <SurahReader surah={yasin} tampilkanNavigasiSurat={false} />
      ) : (
        <div>
          <Langkah nomor={1} judul="Tawasul & Al-Fatihah" keterangan="Pahala bacaan dihadiahkan kepada Nabi ﷺ, keluarga, sahabat, para nabi, ulama, kedua orang tua, dan yang dihajatkan">
            {fatihah.ayat.map((a) => (
              <AyatBlock
                key={a.nomorAyat}
                surahNomor={fatihah.nomor}
                nomorAyat={a.nomorAyat}
                teksArab={a.teksArab}
                teksLatin={a.teksLatin}
                teksIndonesia={a.teksIndonesia}
                tampilkanLatin={true}
              />
            ))}
          </Langkah>

          <Langkah nomor={2} judul="Surat Al-Ikhlas" keterangan="Dibaca 3 kali">
            {ikhlas.ayat.map((a) => (
              <AyatBlock
                key={a.nomorAyat}
                surahNomor={ikhlas.nomor}
                nomorAyat={a.nomorAyat}
                teksArab={a.teksArab}
                teksLatin={a.teksLatin}
                teksIndonesia={a.teksIndonesia}
                tampilkanLatin={true}
              />
            ))}
          </Langkah>

          <Langkah nomor={3} judul="Surat Al-Falaq">
            {falaq.ayat.map((a) => (
              <AyatBlock
                key={a.nomorAyat}
                surahNomor={falaq.nomor}
                nomorAyat={a.nomorAyat}
                teksArab={a.teksArab}
                teksLatin={a.teksLatin}
                teksIndonesia={a.teksIndonesia}
                tampilkanLatin={true}
              />
            ))}
          </Langkah>

          <Langkah nomor={4} judul="Surat An-Nas">
            {nas.ayat.map((a) => (
              <AyatBlock
                key={a.nomorAyat}
                surahNomor={nas.nomor}
                nomorAyat={a.nomorAyat}
                teksArab={a.teksArab}
                teksLatin={a.teksLatin}
                teksIndonesia={a.teksIndonesia}
                tampilkanLatin={true}
              />
            ))}
          </Langkah>

          <Langkah nomor={5} judul="Al-Fatihah" keterangan="Diulang, sebagai pembuka bacaan Al-Baqarah">
            {fatihah.ayat.map((a) => (
              <AyatBlock
                key={`f2-${a.nomorAyat}`}
                surahNomor={fatihah.nomor}
                nomorAyat={a.nomorAyat}
                teksArab={a.teksArab}
                teksLatin={a.teksLatin}
                teksIndonesia={a.teksIndonesia}
                tampilkanLatin={true}
              />
            ))}
          </Langkah>

          <Langkah nomor={6} judul="Awal Surat Al-Baqarah" keterangan="Ayat 1–5">
            {baqarahAwal.map((a) => (
              <AyatBlock
                key={a.nomorAyat}
                surahNomor={baqarah.nomor}
                nomorAyat={a.nomorAyat}
                teksArab={a.teksArab}
                teksLatin={a.teksLatin}
                teksIndonesia={a.teksIndonesia}
                tampilkanLatin={true}
              />
            ))}
          </Langkah>

          <Langkah nomor={7} judul="Ayat Kursi" keterangan="Al-Baqarah: 255">
            {ayatKursi.map((a) => (
              <AyatBlock
                key={a.nomorAyat}
                surahNomor={baqarah.nomor}
                nomorAyat={a.nomorAyat}
                teksArab={a.teksArab}
                teksLatin={a.teksLatin}
                teksIndonesia={a.teksIndonesia}
                tampilkanLatin={true}
              />
            ))}
          </Langkah>

          <Langkah nomor={8} judul="Akhir Surat Al-Baqarah" keterangan="Ayat 284–286">
            {baqarahAkhir.map((a) => (
              <AyatBlock
                key={a.nomorAyat}
                surahNomor={baqarah.nomor}
                nomorAyat={a.nomorAyat}
                teksArab={a.teksArab}
                teksLatin={a.teksLatin}
                teksIndonesia={a.teksIndonesia}
                tampilkanLatin={true}
              />
            ))}
          </Langkah>

          <Langkah nomor={9} judul="Kalimat Thayyibah">
            <div className="space-y-3">
              {KALIMAT_TAHLIL.map((b) => (
                <BacaanCard key={b.judul} b={b} />
              ))}
            </div>
          </Langkah>

          <Langkah nomor={10} judul="Doa Tahlil (Penutup)">
            <div className="space-y-3">
              {DOA_TAHLIL.map((b) => (
                <BacaanCard key={b.judul} b={b} />
              ))}
            </div>
          </Langkah>
        </div>
      )}
    </div>
  );
}
