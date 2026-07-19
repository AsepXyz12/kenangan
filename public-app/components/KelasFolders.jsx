import Link from "next/link";

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
// /kelas/[id]. Kartunya digambar sebagai map dokumen sungguhan: ada tab
// kecil di kiri atas (isinya nama kelas), badannya landscape (4:3) —
// bukan potret 9:16 kayak polaroid, biar kesannya folder, bukan foto.
export default function KelasFolders({ classes, teachers }) {
  if (classes.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-12">
      {classes.map((kelas) => {
        const wali = (kelas.waliKelasIds || [])
          .map((id) => teachers.find((t) => t.id === id))
          .filter(Boolean);

        return (
          <Link
            key={kelas.id}
            href={`/kelas/${kelas.id}`}
            className="folder-card relative block w-full max-w-[200px] mx-auto rotate-[var(--r)]"
            style={{ "--r": `${((kelas.name?.length || 0) % 5) - 2}deg` }}
          >
            <div className="folder-tab">
              <span className="font-stamp text-[9px] uppercase tracking-wide text-emerald/70 truncate px-2">
                {kelas.name}
              </span>
            </div>
            <div className="folder-body aspect-[4/3] w-full bg-parchment2 flex items-center justify-center overflow-hidden">
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
                <span className="font-stamp text-2xl text-emerald/30">
                  {initials(kelas.name)}
                </span>
              )}
              <span className="absolute bottom-1 right-1 font-stamp text-[8px] uppercase tracking-wide bg-emerald/85 text-parchment px-1.5 py-0.5">
                {kelas.students.length} murid
              </span>
            </div>
            <p className="mt-2 text-center font-display italic text-base text-emerald truncate">
              {kelas.name}
            </p>
            {wali.length > 0 && (
              <p className="text-center font-stamp text-[9px] uppercase tracking-wide text-ink/50 mt-0.5 truncate">
                Wali: {wali.map((w) => w.name).join(" & ")}
              </p>
            )}
          </Link>
        );
      })}
    </div>
  );
}
