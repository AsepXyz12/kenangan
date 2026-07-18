"use client";

// Client component supaya Date/toLocaleDateString dieksekusi di browser
// masing-masing pengunjung, mengikuti timezone HP/device mereka sendiri —
// bukan timezone server Vercel.
export default function PhotoDate({ dateStr }) {
  if (!dateStr) return null;
  let formatted = "";
  try {
    const d = new Date(dateStr + "T00:00:00");
    formatted = d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    formatted = dateStr;
  }
  return <p className="font-stamp text-xs text-emerald/70">{formatted}</p>;
}
