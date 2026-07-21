"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ROTATIONS = [-3, 2, -1.5, 3, -2.5, 1, -1, 2.5];
const TAPES = ["gold", "clay", "dusk"];
const BULAN_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];
const POLL_INTERVAL_MS = 10000; // cek foto baru tiap 10 detik, tanpa reload

function parseDateParts(dateStr) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return null;
  return { y, m, d };
}

function formatTime(iso) {
  if (!iso) return "";
  try {
    // Komponen ini "use client", jadi Date & toLocaleTimeString jalan di
    // browser masing-masing user — otomatis ikut timezone HP/device mereka,
    // bukan timezone server.
    return new Date(iso).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export default function Gallery({ photos: initialPhotos, years: initialYears }) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [years, setYears] = useState(initialYears);
  const [hasNew, setHasNew] = useState(false);
  const [year, setYear] = useState("all");
  const [query, setQuery] = useState("");
  const lastIdsRef = useRef(new Set(initialPhotos.map((p) => p.id)));

  // Polling ringan ke endpoint publik: ambil data terbaru dari Blob secara
  // berkala, tanpa perlu user reload halaman. Kalau ada foto baru sejak
  // load terakhir, tampilkan notif kecil supaya galeri tidak "loncat"
  // sendiri saat user lagi baca/scroll.
  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch("/api/photos", { cache: "no-store" });
        if (!res.ok || cancelled) return;
        const data = await res.json();
        const fresh = Array.isArray(data.photos) ? data.photos : [];
        fresh.sort((a, b) => (a.eventDate < b.eventDate ? 1 : -1));

        const freshIds = new Set(fresh.map((p) => p.id));
        const isDifferent =
          freshIds.size !== lastIdsRef.current.size ||
          [...freshIds].some((id) => !lastIdsRef.current.has(id));

        if (isDifferent) {
          const isNewPhoto = [...freshIds].some((id) => !lastIdsRef.current.has(id));
          lastIdsRef.current = freshIds;
          setPhotos(fresh);
          setYears(
            Array.from(new Set(fresh.map((p) => (p.eventDate || "").slice(0, 4)).filter(Boolean))).sort(
              (a, b) => b - a
            )
          );
          if (isNewPhoto) {
            setHasNew(true);
            setTimeout(() => setHasNew(false), 4000);
          }
        }
      } catch {
        // Diam saja kalau gagal — coba lagi di polling berikutnya.
      }
    }

    const id = setInterval(poll, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const filtered = useMemo(() => {
    return photos.filter((p) => {
      const matchesYear = year === "all" || (p.eventDate || "").startsWith(year);
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.title?.toLowerCase().includes(q) ||
        p.caption?.toLowerCase().includes(q) ||
        p.uploader?.toLowerCase().includes(q);
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
      {hasNew && (
        <div className="mb-6 flex items-center gap-2 font-stamp text-xs uppercase tracking-wide text-emerald bg-gold/20 border border-gold/40 px-3 py-2 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
          Ada kenangan baru ditambahkan
        </div>
      )}
      <div className="flex flex-wrap items-center gap-3 mb-10">
        <div className="relative flex-1 min-w-[200px]">
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
            placeholder="Cari nama atau judul kenangan..."
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
                  const items = Array.isArray(photo.items) && photo.items.length > 0
                    ? photo.items
                    : [{ url: photo.url, mediaType: photo.mediaType }];
                  const cover = items[0];
                  const count = items.length;
                  const baseRotation = ROTATIONS[idx % ROTATIONS.length];

                  return (
                    <Link
                      key={photo.id}
                      href={`/photo/${photo.id}`}
                      className="polaroid reveal relative block"
                      data-tape={TAPES[idx % TAPES.length]}
                      style={{
                        transform: `rotate(${baseRotation}deg)`,
                        animationDelay: `${Math.min(idx, 12) * 35}ms`,
                      }}
                    >
                      <span className="stamp-tape" aria-hidden="true" />
                      <div className="relative">
                        {/* Kartu bayangan nempel di area foto aja (bukan judul/caption di
                            bawahnya), biar keliatan jelas numpuknya kalau media > 1. */}
                        {count > 1 && (
                          <>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 aspect-[4/5] bg-parchment2 border border-emerald/20 -z-10"
                              style={{ transform: "rotate(7deg) translate(6px, 5px)" }}
                            />
                            {count > 2 && (
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 aspect-[4/5] bg-parchment2 border border-emerald/20 -z-20"
                                style={{ transform: "rotate(-8deg) translate(-6px, 6px)" }}
                              />
                            )}
                          </>
                        )}
                        <div className="relative aspect-[4/5] bg-emerald/5 overflow-hidden">
                          {cover.mediaType === "video" ? (
                            <video
                              src={cover.url}
                              className="w-full h-full object-cover"
                              muted
                              playsInline
                              preload="metadata"
                            />
                          ) : cover.mediaType === "audio" ? (
                            <div className="w-full h-full flex items-center justify-center text-emerald/40 font-stamp text-xs uppercase">
                              Audio
                            </div>
                          ) : cover.mediaType === "file" ? (
                            <div className="w-full h-full flex items-center justify-center text-emerald/40 font-stamp text-xs uppercase">
                              File
                            </div>
                          ) : (
                            <Image
                              src={cover.url}
                              alt={photo.title}
                              fill
                              sizes="(max-width: 640px) 33vw, 25vw"
                              className="object-cover"
                            />
                          )}
                          {cover.mediaType === "video" && (
                            <span className="absolute bottom-1.5 right-1.5 text-[9px] font-stamp uppercase bg-emerald/80 text-parchment px-1.5 py-0.5">
                              Video
                            </span>
                          )}
                          {count > 1 && (
                            <span className="absolute top-1.5 right-1.5 text-[9px] font-stamp uppercase bg-emerald/85 text-parchment px-1.5 py-0.5 flex items-center gap-1">
                              <span aria-hidden="true">▤</span> {count}
                            </span>
                          )}
                        </div>
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
