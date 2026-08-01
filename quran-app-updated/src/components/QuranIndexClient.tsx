"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Roundel from "./Roundel";
import { JUZ_DATA } from "@/lib/juz-data";
import type { SurahListItem } from "@/lib/quran-api";

export default function QuranIndexClient({ surahList }: { surahList: SurahListItem[] }) {
  const [tab, setTab] = useState<"juz" | "surat">("juz");
  const [query, setQuery] = useState("");

  const filteredSurah = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return surahList;
    return surahList.filter(
      (s) =>
        s.namaLatin.toLowerCase().includes(q) ||
        s.arti.toLowerCase().includes(q) ||
        String(s.nomor) === q
    );
  }, [query, surahList]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-8">
        <button
          onClick={() => setTab("juz")}
          className={`px-4 py-2 rounded-full text-sm border transition-colors ${
            tab === "juz"
              ? "bg-[var(--teal)] text-[var(--parchment)] border-[var(--teal)]"
              : "border-[var(--parchment-line)] text-[var(--ink-soft)] hover:border-[var(--teal)]"
          }`}
        >
          Per Juz
        </button>
        <button
          onClick={() => setTab("surat")}
          className={`px-4 py-2 rounded-full text-sm border transition-colors ${
            tab === "surat"
              ? "bg-[var(--teal)] text-[var(--parchment)] border-[var(--teal)]"
              : "border-[var(--parchment-line)] text-[var(--ink-soft)] hover:border-[var(--teal)]"
          }`}
        >
          Per Surat
        </button>
      </div>

      {tab === "juz" && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
          {JUZ_DATA.map((j) => (
            <Link
              key={j.juz}
              href={`/quran/juz/${j.juz}`}
              className="flex flex-col items-center gap-2 rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/50 py-5 hover:border-[var(--gold)] transition-colors"
            >
              <Roundel number={j.juz} variant="gold" size={44} />
              <span className="text-xs text-[var(--ink-soft)] text-center px-1">{j.nama}</span>
            </Link>
          ))}
        </div>
      )}

      {tab === "surat" && (
        <div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama surat, arti, atau nomor..."
            className="w-full mb-6 px-4 py-3 rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 text-[var(--ink)] placeholder:text-[var(--ink-soft)] focus:border-[var(--teal)] outline-none"
          />
          <div className="divide-y divide-[var(--parchment-line)] border-t border-b border-[var(--parchment-line)]">
            {filteredSurah.map((s) => (
              <Link
                key={s.nomor}
                href={`/quran/surah/${s.nomor}`}
                className="flex items-center gap-4 py-4 hover:bg-[var(--parchment-deep)]/40 transition-colors px-2"
              >
                <Roundel number={s.nomor} variant="teal" size={34} />
                <div className="flex-1 min-w-0">
                  <p className="font-display text-[var(--ink)]">{s.namaLatin}</p>
                  <p className="text-xs text-[var(--ink-soft)]">
                    {s.arti} &middot; {s.tempatTurun} &middot; {s.jumlahAyat} ayat
                  </p>
                </div>
                <p className="font-arabic text-xl text-[var(--ink)] shrink-0" dir="rtl">
                  {s.nama}
                </p>
              </Link>
            ))}
            {filteredSurah.length === 0 && (
              <p className="py-8 text-center text-sm text-[var(--ink-soft)]">
                Surat tidak ditemukan.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
