"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useSiteSearch } from "@/lib/use-site-search";
import SearchResultsList from "./SearchResultsList";

export default function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { results, loading } = useSiteSearch(query, open);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(t);
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function tutup() {
    setOpen(false);
    setQuery("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Cari di seluruh situs"
        className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--gold)]/40 bg-[var(--teal-deep)] text-[var(--gold-bright)] hover:border-[var(--gold)] hover:bg-[var(--teal)] active:scale-90 transition-all duration-200 shadow-[0_6px_18px_-8px_rgba(17,38,32,0.7)]"
      >
        <Search size={17} />
      </button>

      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] bg-[var(--teal-deep)]/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={tutup}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Pencarian"
        className={`fixed inset-x-0 top-0 z-[60] mx-auto max-w-2xl px-4 pt-4 md:pt-10 transition-all duration-300 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-[var(--parchment)] rounded-2xl border border-[var(--parchment-line)] shadow-2xl max-h-[85vh] flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 p-4 border-b border-[var(--parchment-line)] shrink-0">
            <Search size={18} className="text-[var(--ink-soft)] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari ayat, hadits, doa, panduan…"
              className="flex-1 bg-transparent outline-none text-[var(--ink)] placeholder:text-[var(--ink-soft)] text-sm md:text-base"
            />
            <button
              type="button"
              onClick={tutup}
              aria-label="Tutup pencarian"
              className="p-1.5 rounded-full hover:bg-[var(--parchment-deep)] transition-colors shrink-0"
            >
              <X size={18} className="text-[var(--ink-soft)]" />
            </button>
          </div>
          <div className="overflow-y-auto p-4">
            <SearchResultsList results={results} loading={loading} query={query} onNavigate={tutup} />
          </div>
        </div>
      </div>
    </>
  );
}
