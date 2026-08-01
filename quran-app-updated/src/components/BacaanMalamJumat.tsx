"use client";

import { useState } from "react";
import SurahReader from "./SurahReader";
import type { SurahDetail } from "@/lib/quran-api";

export default function BacaanMalamJumat({
  yasin,
  kahf,
}: {
  yasin: SurahDetail;
  kahf: SurahDetail;
}) {
  const [aktif, setAktif] = useState<"yasin" | "kahf">("yasin");

  return (
    <div>
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setAktif("yasin")}
          className={`flex-1 px-4 py-3 rounded-sm text-sm border transition-colors ${
            aktif === "yasin"
              ? "bg-[var(--teal)] text-[var(--text-on-dark)] border-[var(--teal)]"
              : "border-[var(--parchment-line)] text-[var(--ink-soft)] hover:border-[var(--teal)]"
          }`}
        >
          Surat Yasin &middot; 83 ayat
        </button>
        <button
          onClick={() => setAktif("kahf")}
          className={`flex-1 px-4 py-3 rounded-sm text-sm border transition-colors ${
            aktif === "kahf"
              ? "bg-[var(--teal)] text-[var(--text-on-dark)] border-[var(--teal)]"
              : "border-[var(--parchment-line)] text-[var(--ink-soft)] hover:border-[var(--teal)]"
          }`}
        >
          Surat Al-Kahf &middot; 110 ayat
        </button>
      </div>

      {aktif === "yasin" ? (
        <SurahReader surah={yasin} tampilkanNavigasiSurat={false} />
      ) : (
        <SurahReader surah={kahf} tampilkanNavigasiSurat={false} />
      )}
    </div>
  );
}
