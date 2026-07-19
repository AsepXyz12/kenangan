import Link from "next/link";

const TAPES = ["gold", "clay", "dusk"];

function initials(name) {
  return (
    (name || "?")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "?"
  );
}

// Satu kelas = satu "folder": cover-nya foto bersama (kalau admin sudah
// unggah), isinya foto satuan tiap murid — dibuka dengan klik ke halaman
// /kelas/[id]. Sengaja dibikin polaroid juga, senada sama StudentCard, biar
// nyambung gaya visualnya waktu folder ini dibuka. Satu kelas = satu baris
// penuh (bukan grid berdampingan), dan kotak fotonya rasio 9:16 (potret) —
// biar pas buat foto bersama hasil selfie/HP yang biasanya vertikal.
export default function KelasFolders({ classes, teachers }) {
  if (classes.length === 0) return null;

  return (
    <div className="space-y-10">
      {classes.map((kelas, i) => {
        const wali = (kelas.waliKelasIds || [])
          .map((id) => teachers.find((t) => t.id === id))
          .filter(Boolean);

        return (
          <Link
            key={kelas.id}
            href={`/kelas/${kelas.id}`}
            data-tape={TAPES[i % TAPES.length]}
            className="polaroid relative block w-full max-w-sm mx-auto"
          >
            <span className="stamp-tape" />
            <div className="aspect-[9/16] w-full bg-parchment2 flex items-center justify-center overflow-hidden relative">
              {kelas.groupPhotoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={kelas.groupPhotoUrl}
                  alt={kelas.name}
                  className={`w-full h-full ${
                    kelas.groupPhotoFit === "contain" ? "object-contain" : "object-cover"
                  }`}
                />
              ) : (
                <span className="font-stamp text-5xl text-emerald/30">
                  {initials(kelas.name)}
                </span>
              )}
              <span className="absolute bottom-2 right-2 font-stamp text-[10px] uppercase tracking-wide bg-emerald/85 text-parchment px-2 py-1">
                {kelas.students.length} murid
              </span>
            </div>
            <p className="mt-3 text-center font-display italic text-2xl text-emerald truncate">
              {kelas.name}
            </p>
            {wali.length > 0 && (
              <p className="text-center font-stamp text-xs uppercase tracking-wide text-ink/50 mt-1 truncate">
                Wali: {wali.map((w) => w.name).join(" & ")}
              </p>
            )}
          </Link>
        );
      })}
    </div>
  );
}
