"use client";

import { useMemo, useState } from "react";
import { StudentCard, TAPES, sortByJurusan } from "@/components/KelasCards";

function StudentGrid({ students }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-8">
      {students.map((s, i) => (
        <StudentCard key={s.id} student={s} tape={TAPES[i % TAPES.length]} />
      ))}
    </div>
  );
}

// Grid murid + search nama di dalam satu kelas. Data awal (`students`) datang
// dari server (page.js tetap server component, fetch tetap di server) —
// komponen ini cuma nambah interaktivitas cari-cari di browser, tanpa
// request ulang ke server tiap ngetik.
//
// Kalau kelasnya sudah displit wali (hasSplitWali true — lihat
// app/kelas/[id]/page.js), hasil pencarian TETAP dikelompokkan per jurusan
// dengan judul + nama wali masing-masing, supaya konsisten dengan tampilan
// non-search di ClassSection (dipakai halaman /alumni).
export default function StudentSearch({
  students,
  hasSplitWali = false,
  waliIpaName,
  waliIpsName,
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) => s.name?.toLowerCase().includes(q));
  }, [students, query]);

  const sorted = sortByJurusan(filtered);
  const ipaStudents = filtered.filter((s) => s.jurusan === "IPA");
  const ipsStudents = filtered.filter((s) => s.jurusan === "IPS");
  const belumJurusan = filtered.filter(
    (s) => s.jurusan !== "IPA" && s.jurusan !== "IPS"
  );

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
          placeholder="Cari nama murid..."
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
          {students.length === 0 ? "Belum ada data murid." : "Tidak ada murid dengan nama itu."}
        </p>
      ) : hasSplitWali ? (
        <div className="space-y-12">
          {ipaStudents.length > 0 && (
            <div>
              <h3 className="font-stamp text-sm uppercase tracking-wide text-emerald">IPA</h3>
              {waliIpaName && (
                <p className="mt-1 font-stamp text-xs uppercase tracking-wide text-ink/50">
                  Wali kelas: {waliIpaName}
                </p>
              )}
              <div className="mt-5">
                <StudentGrid students={ipaStudents} />
              </div>
            </div>
          )}
          {ipsStudents.length > 0 && (
            <div>
              <h3 className="font-stamp text-sm uppercase tracking-wide text-clay">IPS</h3>
              {waliIpsName && (
                <p className="mt-1 font-stamp text-xs uppercase tracking-wide text-ink/50">
                  Wali kelas: {waliIpsName}
                </p>
              )}
              <div className="mt-5">
                <StudentGrid students={ipsStudents} />
              </div>
            </div>
          )}
          {belumJurusan.length > 0 && (
            <div>
              <h3 className="font-stamp text-sm uppercase tracking-wide text-ink/40">
                Belum ada jurusan
              </h3>
              <div className="mt-5">
                <StudentGrid students={belumJurusan} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <StudentGrid students={sorted} />
      )}
    </div>
  );
}
