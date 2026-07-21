"use client";

import { useMemo, useState } from "react";
import { TAPES, initials } from "@/components/KelasCards";

// Grid guru + search nama ATAU mata pelajaran. Data awal (`teachers`) datang
// dari server (page.js tetap server component) — komponen ini cuma nambah
// interaktivitas cari-cari di browser.
export default function GuruSearch({ teachers }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return teachers;
    return teachers.filter((t) => {
      const subjects = (t.subjects || []).join(" ").toLowerCase();
      const roles = (t.roles || []).join(" ").toLowerCase();
      return (
        t.name?.toLowerCase().includes(q) ||
        subjects.includes(q) ||
        roles.includes(q)
      );
    });
  }, [teachers, query]);

  return (
    <div>
      <div className="relative max-w-sm mx-auto mb-8">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald/40 pointer-events-none"
        >
          <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M14 14L17.5 17.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari nama, jabatan, atau mata pelajaran..."
          className="font-body text-sm bg-white/70 border border-emerald/20 pl-9 pr-8 py-2 w-full focus:bg-white transition-colors"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Hapus pencarian"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full text-emerald/50 hover:text-emerald hover:bg-emerald/10 transition-colors"
          >
            ×
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-ink/40 text-center">
          {teachers.length === 0 ? "Belum ada data guru." : "Tidak ada guru yang cocok."}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-8">
          {filtered.map((t, i) => (
            <div
              key={t.id}
              data-tape={TAPES[i % TAPES.length]}
              className="polaroid relative w-full max-w-[150px] mx-auto"
            >
              <span className="stamp-tape" />
              <div
                className={`w-full bg-parchment2 flex items-center justify-center overflow-hidden relative ${
                  t.photoUrl ? "" : "aspect-square"
                }`}
              >
                {t.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.photoUrl} alt={t.name} className="w-full h-auto block" />
                ) : (
                  <span className="font-stamp text-2xl text-emerald/30">{initials(t.name)}</span>
                )}
                {t.roles && t.roles.length > 0 && (
                  // Sama gayanya kayak badge jabatan di kartu murid: cuma
                  // nampilin jabatan PERTAMA biar gak penuh kalau lebih dari
                  // satu, nempel pojok kiri bawah foto.
                  <span className="absolute bottom-1 left-1 font-stamp text-[7px] uppercase tracking-wide bg-gold text-parchment px-1.5 py-0.5 leading-none shadow-sm">
                    {t.roles[0]}
                  </span>
                )}
              </div>
              <p className="mt-2 text-center font-stamp text-xs uppercase tracking-wide text-ink/70">
                {t.name}
              </p>
              <p className="text-center text-[10px] text-ink/40 mt-0.5 leading-tight">
                {(t.subjects || []).join(", ")}
              </p>
              {t.roles && t.roles.length > 1 && (
                <p className="mt-0.5 text-center text-[8px] uppercase tracking-[0.15em] text-gold/80 leading-snug line-clamp-2 px-1">
                  {t.roles.join(" · ")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
