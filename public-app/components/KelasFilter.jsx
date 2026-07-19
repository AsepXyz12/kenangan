"use client";

import { useState } from "react";
import { ClassSection } from "@/components/KelasCards";

// Filter kelas aktif (X/XI/XII, dst) — sama polanya kayak filter tahun di
// dashboard kenangan (lihat Gallery.jsx: pilihan "Semua tahun" + tiap
// tahun). Di sini pilihannya "Semua" + tiap kelas aktif, jadi kalau
// kelasnya udah banyak, gak perlu scroll ngelewatin semua kelas cuma buat
// nyari satu kelas tertentu.
export default function KelasFilter({ classes, teachers }) {
  const [active, setActive] = useState("all");

  const shown = active === "all" ? classes : classes.filter((c) => c.id === active);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-10">
        <button
          type="button"
          onClick={() => setActive("all")}
          className={`font-stamp text-xs uppercase tracking-wide px-3 py-1.5 border transition-colors ${
            active === "all"
              ? "bg-emerald text-parchment border-emerald"
              : "bg-white/70 border-emerald/20 text-emerald hover:bg-emerald/10"
          }`}
        >
          Semua
        </button>
        {classes.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(c.id)}
            className={`font-stamp text-xs uppercase tracking-wide px-3 py-1.5 border transition-colors ${
              active === c.id
                ? "bg-emerald text-parchment border-emerald"
                : "bg-white/70 border-emerald/20 text-emerald hover:bg-emerald/10"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {shown.map((kelas) => (
        <ClassSection key={kelas.id} kelas={kelas} teachers={teachers} />
      ))}
    </div>
  );
}
