"use client";

import Link from "next/link";
import type { SearchResults } from "@/lib/use-site-search";

export default function SearchResultsList({
  results,
  loading,
  query,
  onNavigate,
}: {
  results: SearchResults;
  loading: boolean;
  query: string;
  onNavigate?: () => void;
}) {
  const q = query.trim();
  const totalHasil = results.quran.length + results.hadits.length + results.pages.length;

  if (q.length < 2) {
    return (
      <p className="text-sm text-[var(--ink-soft)] text-center py-10">
        Ketik minimal 2 huruf untuk mulai mencari — ayat, hadits, doa, panduan ibadah, dan
        lainnya.
      </p>
    );
  }

  if (loading && totalHasil === 0) {
    return <p className="text-sm text-[var(--ink-soft)] text-center py-10">Mencari…</p>;
  }

  if (totalHasil === 0) {
    return (
      <p className="text-sm text-[var(--ink-soft)] text-center py-10">
        Tidak ada hasil untuk &ldquo;{q}&rdquo;.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {results.quran.length > 0 && (
        <section>
          <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--gold)] mb-3">
            Al-Qur&apos;an
          </p>
          <div className="flex flex-col gap-2">
            {results.quran.map((r) => (
              <Link
                key={`${r.surah}-${r.ayat}`}
                href={r.href}
                onClick={onNavigate}
                className="block rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-3.5 hover:border-[var(--gold)] transition-colors"
              >
                <p className="text-xs text-[var(--heading)] font-medium mb-1">
                  QS. {r.namaLatin} : {r.ayat}
                </p>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed line-clamp-2">
                  {r.teksIndonesia}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {results.hadits.length > 0 && (
        <section>
          <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--gold)] mb-3">
            Hadits
          </p>
          <div className="flex flex-col gap-2">
            {results.hadits.map((r) => (
              <Link
                key={`${r.kitab}-${r.nomor}`}
                href={r.href}
                onClick={onNavigate}
                className="block rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-3.5 hover:border-[var(--gold)] transition-colors"
              >
                <p className="text-xs text-[var(--heading)] font-medium mb-1">
                  {r.nama} No. {r.nomor}
                </p>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed line-clamp-2">
                  {r.terjemah}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {results.pages.length > 0 && (
        <section>
          <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--gold)] mb-3">
            Panduan &amp; Bacaan
          </p>
          <div className="flex flex-col gap-2">
            {results.pages.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                onClick={onNavigate}
                className="block rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-3.5 hover:border-[var(--gold)] transition-colors"
              >
                <p className="text-xs text-[var(--heading)] font-medium mb-1">
                  {r.title} <span className="text-[var(--ink-soft)]">· {r.kategori}</span>
                </p>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed line-clamp-2">
                  {r.snippet}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
