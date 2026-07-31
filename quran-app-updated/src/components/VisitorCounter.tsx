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
    <p className="flex items-center gap-1.5 text-xs text-[var(--ink-soft)]">
      <Users size={13} strokeWidth={2} />
      {count.toLocaleString("id-ID")} pengunjung
    </p>
  );
}
