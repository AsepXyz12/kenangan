"use client";

import { useFontSize, type FontSize } from "./FontSizeContext";

const OPTIONS: { value: FontSize; label: string }[] = [
  { value: "sedang", label: "A" },
  { value: "besar", label: "A" },
  { value: "sangat-besar", label: "A" },
];

const SIZE_PX: Record<FontSize, string> = {
  sedang: "14px",
  besar: "17px",
  "sangat-besar": "20px",
};

export default function FontSizeControl() {
  const { fontSize, setFontSize } = useFontSize();

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-[var(--parchment-line)] p-1"
      role="group"
      aria-label="Ukuran huruf"
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setFontSize(opt.value)}
          aria-pressed={fontSize === opt.value}
          aria-label={`Ukuran huruf ${opt.value}`}
          style={{ fontSize: SIZE_PX[opt.value] }}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            fontSize === opt.value
              ? "bg-[var(--teal)] text-[var(--text-on-dark)]"
              : "text-[var(--ink-soft)] hover:bg-[var(--parchment-deep)]"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
