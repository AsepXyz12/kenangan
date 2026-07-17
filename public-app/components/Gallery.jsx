"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ROTATIONS = [-3, 2, -1.5, 3, -2.5, 1, -1, 2.5];
const TAPES = ["gold", "clay", "dusk"];
const BULAN_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function parseDateParts(dateStr) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return null;
  return { y, m, d };
}

function formatTime(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export default function Gallery({ photos, years }) {
  const [year, setYear] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return photos.filter((p) => {
      const matchesYear = year === "all" || (p.eventDate || "").startsWith(year);
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.title?.toLowerCase().includes(q) ||
        p.caption?.toLowerCase().includes(q);
      return matchesYear && matchesQuery;
    });
  }, [photos, year, query]);

  // Kelompokkan foto per hari/bulan/tahun kejadian (eventDate), berurutan
  // sesuai urutan `filtered` (terbaru dulu). Setiap kali tanggalnya beda,
  // kartu tanggal besar (gaya kalender) ditampilkan sekali di atas grup itu.
  const groups = useMemo(() => {
    const result = [];
    let current = null;
    for (const photo of filtered) {
      const key = photo.eventDate || "";
      if (!current || current.key !== key) {
        current = { key, date: parseDateParts(key), items: [] };
        result.push(current);
      }
      current.items.push(photo);
    }
    return result;
  }, [filtered]);

  let globalIndex = 0;

  return (
    <section className="max-w-5xl mx-auto px-6 pb-20">
      <div className="flex flex-wrap items-center gap-3 mb-10">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari judul kenangan..."
          className="font-body text-sm bg-white/70 border border-emerald/20 px-3 py-2 flex-1 min-w-[200px] focus:bg-white transition-colors"
        />
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="font-stamp text-xs uppercase bg-white/70 border border-emerald/20 px-3 py-2"
        >
          <option value="all">Semua tahun</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-emerald/20">
          <p className="font-display italic text-2xl text-emerald/60">
            {photos.length === 0 ? "Album ini masih kosong" : "Tidak ada yang cocok"}
          </p>
          <p className="mt-2 text-sm text-ink/50">
            {photos.length === 0
              ? "Belum ada foto yang diunggah ke album ini."
              : "Coba kata kunci atau tahun yang lain."}
          </p>
        </div>
      ) : (
        <div className="space-y-14">
          {groups.map((group) => (
            <div key={group.key || "tanpa-tanggal"}>
              {group.date ? (
                <div className="flex items-end gap-3 sm:gap-4 mb-6">
                  <div className="font-display text-6xl sm:text-7xl leading-none text-emerald">
                    {String(group.date.d).padStart(2, "0")}
                  </div>
                  <div className="pb-1.5">
                    <div className="font-stamp text-sm sm:text-base uppercase tracking-wider text-emerald-light">
                      {BULAN_ID[group.date.m - 1]}
                    </div>
                    <div className="font-stamp text-xs text-ink/50">{group.date.y}</div>
                  </div>
                  <div className="flex-1 border-b border-emerald/15 ml-1 sm:ml-2" />
                </div>
              ) : (
                <div className="mb-6 border-b border-emerald/15 pb-2">
                  <p className="font-stamp text-xs uppercase tracking-wide text-ink/40">
                    Tanpa tanggal
                  </p>
                </div>
              )}

              <div className="grid grid-cols-3 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12">
                {group.items.map((photo) => {
                  const idx = globalIndex++;
                  return (
                    <Link
                      key={photo.id}
                      href={`/photo/${photo.id}`}
                      className="polaroid reveal relative block"
                      data-tape={TAPES[idx % TAPES.length]}
                      style={{
                        transform: `rotate(${ROTATIONS[idx % ROTATIONS.length]}deg)`,
                        animationDelay: `${Math.min(idx, 12) * 35}ms`,
                      }}
                    >
                      <span className="stamp-tape" aria-hidden="true" />
                      <div className="relative aspect-[4/5] bg-emerald/5 overflow-hidden">
                        <Image
                          src={photo.url}
                          alt={photo.title}
                          fill
                          sizes="(max-width: 640px) 33vw, 25vw"
                          className="object-cover"
                        />
                      </div>
                      <p className="font-stamp text-[10px] sm:text-[11px] text-emerald/70 mt-3">
                        {formatTime(photo.uploadedAt)}
                      </p>
                      <p className="font-display text-xs sm:text-sm mt-0.5 text-ink line-clamp-2">
                        {photo.title}
                      </p>
                      {photo.caption && (
                        <p className="font-body text-[11px] text-ink/50 mt-1 line-clamp-2">
                          {photo.caption}
                        </p>
                      )}
                      <div className="mt-1.5 flex items-center gap-2 text-[10px] text-ink/40">
                        <span className="font-stamp">
                          {photo.uploader || "Admin"}
                        </span>
                        {photo.comments?.length > 0 && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-ink/20" />
                            <span>{photo.comments.length} komentar</span>
                          </>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
