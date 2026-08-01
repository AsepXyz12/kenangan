"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/visitors")
      .then((res) => res.json())
      .then((data: { count: number; configured: boolean }) => {
        if (!cancelled && data.configured) setCount(data.count);
      })
      .catch(() => {
        // diam-diam gagal, gak perlu ganggu tampilan
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--gold)]/40 bg-[var(--parchment-deep)]/60 px-5 py-2.5">
      <Users size={18} strokeWidth={2} className="text-[var(--gold-bright)]" />
      <span className="font-display text-lg md:text-xl text-[var(--teal-deep)] tabular-nums">
        {count.toLocaleString("id-ID")}
      </span>
      <span className="text-sm text-[var(--ink-soft)]">
        orang telah membuka Mushaf ini
      </span>
    </div>
  );
}
