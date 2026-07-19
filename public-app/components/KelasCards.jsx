import Link from "next/link";

export const TAPES = ["gold", "clay", "dusk"];

export function initials(name) {
  return (
    (name || "?")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "?"
  );
}

export function StudentCard({ student, tape }) {
  return (
    <Link
      href={`/murid/${student.id}`}
      data-tape={tape}
      className="polaroid relative block w-full max-w-[150px] mx-auto rotate-[var(--r)]"
      style={{ "--r": `${((student.name?.length || 0) % 5) - 2}deg` }}
    >
      <span className="stamp-tape" />
      <div className="aspect-square w-full bg-parchment2 flex items-center justify-center overflow-hidden">
        {student.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={student.photoUrl}
            alt={student.name}
            // object-cover + object-top: tetap ngisi penuh kotak (rapi),
            // tapi crop-nya diprioritasin motong bagian bawah/pinggir foto
            // dulu, bukan dari tengah — soalnya muka biasanya ada di bagian
            // atas foto (selfie/portrait), jadi mukanya gak ikut kepotong.
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <span className="font-stamp text-2xl text-emerald/30">
            {initials(student.name)}
          </span>
        )}
      </div>
      <p className="mt-2 text-center font-stamp text-xs uppercase tracking-wide text-ink/70 truncate">
        {student.name}
      </p>
      {student.hobby && (
        // Format "Hobi: ..." nempel satu baris kayak biasa. Kalau kepanjangan,
        // otomatis wrap turun ke baris ke-2 (bukan dipotong "..."), dibatasi
        // line-clamp-2 aja biar kartu gak jadi tinggi banget kalau ada yang
        // isi hobinya kepanjangan banget.
        <p className="mt-1 text-center text-[8px] uppercase tracking-[0.15em] text-gold/80 leading-snug line-clamp-2 px-1">
          Hobi: {student.hobby}
        </p>
      )}
    </Link>
  );
}

export function ClassSection({ kelas, teachers }) {
  const wali = (kelas.waliKelasIds || [])
    .map((id) => teachers.find((t) => t.id === id))
    .filter(Boolean);

  return (
    <section className="mb-16">
      <h2 className="font-display italic text-3xl sm:text-4xl text-emerald">
        {kelas.name}
      </h2>
      {wali.length > 0 && (
        <p className="mt-2 font-stamp text-xs uppercase tracking-wide text-ink/50">
          Wali kelas: {wali.map((w) => w.name).join(" & ")}
        </p>
      )}
      <hr className="thread mt-5 mb-7" />
      {kelas.students.length === 0 ? (
        <p className="text-sm text-ink/40">Belum ada data murid.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-8">
          {kelas.students.map((s, i) => (
            <StudentCard key={s.id} student={s} tape={TAPES[i % TAPES.length]} />
          ))}
        </div>
      )}
    </section>
  );
}
