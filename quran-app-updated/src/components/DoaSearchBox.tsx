"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { DoaCard, type Doa } from "./DoaCard";

export type DoaEntry = { kategori: string; d: Doa };

// Sama seperti search di halaman daftar Surat (QuranIndexClient): filter
// LANGSUNG di halaman ini pakai data yang sudah ada di sini, jadi hasilnya
// pasti cuma dari Doa & Dzikir yang ada di halaman ini -- bukan nyari ke
// seluruh situs.
export default function DoaSearchBox({
  items,
  children,
}: {
  items: DoaEntry[];
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const hasil = useMemo(() => {
    if (!q) return [];
    return items.filter(
      ({ d }) =>
        d.judul.toLowerCase().includes(q) ||
        d.arti.toLowerCase().includes(q) ||
        d.latin.toLowerCase().includes(q)
    );
  }, [q, items]);

  return (
    <div>
      <div className="relative mb-8">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-soft)]"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari doa atau dzikir di halaman ini... (mis. qunut, makan, bepergian)"
          className="w-full pl-11 pr-10 py-3 rounded-full border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 text-[var(--ink)] placeholder:text-[var(--ink-soft)] focus:border-[var(--teal)] outline-none text-sm"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Hapus pencarian"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-[var(--ink-soft)] hover:text-[var(--heading)]"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {q ? (
        <div className="mb-12">
          <p className="text-xs text-[var(--ink-soft)] mb-4">
            {hasil.length > 0
              ? `${hasil.length} hasil untuk "${query}"`
              : `Tidak ada doa/dzikir yang cocok dengan "${query}" di halaman ini.`}
          </p>
          <div className="space-y-3">
            {hasil.map(({ kategori, d }) => (
              <div key={`${kategori}-${d.judul}`}>
                <p className="text-[11px] tracking-wider uppercase text-[var(--gold)] mb-1.5">
                  {kategori}
                </p>
                <DoaCard d={d} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
