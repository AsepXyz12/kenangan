import Link from "next/link";

export const TAPES = ["gold", "clay", "dusk"];

// Urutan tampil: anak IPA dikelompokkan di ATAS, IPS di BAWAH, yang belum
// diisi jurusan ada di tengah — biar publik gampang bedain tanpa harus buka
// tiap kartu satu-satu. Di dalam satu kelompok jurusan, urutan aslinya tetap
// dipertahankan (itu yang jaga posisi laki-laki di atas / perempuan di bawah
// dari fitur tambah murid).
const JURUSAN_RANK = { IPA: 0, IPS: 2 };
export function sortByJurusan(students) {
  return [...students]
    .map((s, i) => ({ s, i }))
    .sort((a, b) => {
      const ra = JURUSAN_RANK[a.s.jurusan] ?? 1;
      const rb = JURUSAN_RANK[b.s.jurusan] ?? 1;
      return ra !== rb ? ra - rb : a.i - b.i;
    })
    .map(({ s }) => s);
}

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
      <div
        className={`w-full bg-parchment2 flex items-center justify-center overflow-hidden relative ${
          student.photoUrl ? "" : "aspect-square"
        }`}
      >
        {student.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={student.photoUrl}
            alt={student.name}
            // Foto yang diupload sekarang udah dalam rasio asli/pilihan
            // admin sendiri (lihat PhotoCropModal), jadi di sini tinggal
            // ditampilin apa adanya (w-full, height ngikutin) — gak perlu
            // dipaksa persegi atau di-cover lagi, biar apapun bentuk/ukuran
            // fotonya tetap pas, gak ada bagian kepotong & gak ada sisa
            // warna background yang keliatan.
            className="w-full h-auto block"
          />
        ) : (
          <span className="font-stamp text-2xl text-emerald/30">
            {initials(student.name)}
          </span>
        )}
        {student.roles && student.roles.length > 0 && (
          // Badge cuma nampilin jabatan PERTAMA (biar gak penuh kalau ada
          // beberapa peran sekaligus) — daftar lengkapnya ada di halaman
          // detail murid. Nempel di pojok kiri bawah foto, gaya label kecil.
          <span className="absolute bottom-1 left-1 font-stamp text-[7px] uppercase tracking-wide bg-gold text-parchment px-1.5 py-0.5 leading-none shadow-sm">
            {student.roles[0]}
          </span>
        )}
        {(student.jurusan === "IPA" || student.jurusan === "IPS") && (
          // Label jurusan MURID (bukan kelas) — nempel di pojok kanan atas,
          // dibuat besar & kontras biar publik langsung lihat siapa IPA
          // siapa IPS walau satu kelas isinya campuran.
          <span
            className={`absolute top-1 right-1 font-display italic font-bold text-sm leading-none px-2 py-1 rounded shadow-sm ${
              student.jurusan === "IPA"
                ? "bg-emerald text-parchment"
                : "bg-clay text-parchment"
            }`}
          >
            {student.jurusan}
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
      {student.favoriteSubject && (
        // Sama persis gaya "Hobi" di atas (biar konsisten & gak norak),
        // cuma dibedakan warnanya jadi emerald supaya sekilas bisa dibedakan
        // dari baris hobi kalau dua-duanya keisi.
        <p className="mt-0.5 text-center text-[8px] uppercase tracking-[0.15em] text-emerald/70 leading-snug line-clamp-2 px-1">
          Suka: {student.favoriteSubject}
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
          {sortByJurusan(kelas.students).map((s, i) => (
            <StudentCard key={s.id} student={s} tape={TAPES[i % TAPES.length]} />
          ))}
        </div>
      )}
    </section>
  );
}
