"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { getLastRead, LAST_READ_CHANGE_EVENT, type LastRead } from "@/lib/bookmark";

function subscribe(callback: () => void) {
  window.addEventListener(LAST_READ_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(LAST_READ_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getServerSnapshot(): LastRead | null {
  return null;
}

export default function ContinueReadingCard() {
  const lastRead = useSyncExternalStore(subscribe, getLastRead, getServerSnapshot);

  if (!lastRead) return null;

  return (
    <section className="max-w-3xl mx-auto px-5 md:px-8 pb-8 animate-fade-up">
      <Link
        href={`/quran/surah/${lastRead.surahNomor}#ayat-${lastRead.ayatNomor}`}
        className="group flex items-center gap-4 rounded-sm border border-[var(--gold)]/50 bg-[var(--gold)]/[0.07] px-5 py-4 transition-colors hover:bg-[var(--gold)]/[0.13]"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--teal)] text-[var(--parchment)] shrink-0">
          <BookOpen size={17} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wider text-[var(--gold)]">
            Lanjutkan Bacaan
          </p>
          <p className="text-sm text-[var(--ink)] mt-0.5">
            {lastRead.namaLatin} &middot; ayat {lastRead.ayatNomor}
          </p>
        </div>
        <span className="text-[var(--teal-deep)] group-hover:translate-x-1 transition-transform shrink-0">
          →
        </span>
      </Link>
    </section>
  );
}
