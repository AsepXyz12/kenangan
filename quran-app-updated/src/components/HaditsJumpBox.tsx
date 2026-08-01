"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HaditsJumpBox({
  slug,
  totalHadits,
}: {
  slug: string;
  totalHadits: number;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nomor = Number(value);
    if (Number.isInteger(nomor) && nomor >= 1 && nomor <= totalHadits) {
      router.push(`/hadits/${slug}/${nomor}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="number"
        min={1}
        max={totalHadits}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`Lompat ke nomor (1-${totalHadits})`}
        className="flex-1 px-4 py-2.5 rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 text-[var(--ink)] placeholder:text-[var(--ink-soft)] focus:border-[var(--teal)] outline-none text-sm"
      />
      <button
        type="submit"
        className="px-4 py-2.5 rounded-sm bg-[var(--teal)] text-[var(--text-on-dark)] hover:bg-[var(--teal-deep)] transition-colors text-sm shrink-0"
      >
        Buka
      </button>
    </form>
  );
}
