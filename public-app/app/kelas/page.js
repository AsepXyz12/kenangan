import { readKelas } from "@/lib/kelas-store";
import { readSettings } from "@/lib/store";
import KelasFolders from "@/components/KelasFolders";

export const dynamic = "force-dynamic";

export default async function KelasPage() {
  const { teachers, classes, guruFolder: guruFolderRaw } = await readKelas();
  const settings = await readSettings();
  const siteName = settings.siteName || "Galeri Kenangan MA";

  // Halaman ini KHUSUS kelas yang masih aktif. Kelas yang sudah jadi alumni
  // (dikelompokkan per angkatan) ada di halaman terpisah: /alumni.
  const active = [...classes]
    .filter((c) => !c.isAlumni)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  const alumniCount = classes.filter((c) => c.isAlumni).length;
  const guruFolder = { photoFit: "cover", ...(guruFolderRaw || {}) };

  return (
    <main>
      <header className="max-w-5xl mx-auto px-6 pt-14 pb-4">
        <p className="font-stamp text-xs tracking-[0.25em] uppercase text-emerald-light">
          {siteName}
        </p>
        <h1 className="font-display italic text-5xl sm:text-6xl mt-3 text-emerald leading-[1.05]">
          Profil Kelas
        </h1>
        <p className="mt-4 max-w-xl text-ink/70 leading-relaxed">
          Wali kelas, guru mata pelajaran, dan wajah-wajah setiap kelas yang
          masih aktif — dikumpulkan sedikit demi sedikit sampai lengkap.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href="/"
            className="font-stamp text-xs uppercase tracking-wide text-emerald underline"
          >
            &larr; Kembali ke galeri
          </a>
          {alumniCount > 0 && (
            <a
              href="/alumni"
              className="font-stamp text-xs uppercase tracking-wide text-clay underline"
            >
              Lihat Alumni &amp; Angkatan &rarr;
            </a>
          )}
        </div>
        <hr className="thread mt-8" />
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {classes.length === 0 && (
          <p className="text-ink/50 text-sm">Belum ada data kelas.</p>
        )}
        {classes.length > 0 && active.length === 0 && (
          <p className="text-ink/50 text-sm mb-10">
            Belum ada kelas aktif saat ini.
          </p>
        )}

        {active.length > 0 && <KelasFolders classes={active} teachers={teachers} />}

        {teachers.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display italic text-3xl sm:text-4xl text-emerald">
              Guru & Mata Pelajaran
            </h2>
            <hr className="thread mt-5 mb-7" />
            <a
              href="/kelas/guru"
              className="folder-card relative block w-full max-w-md ml-auto mr-4 rotate-[-1.5deg]"
            >
              <div className="folder-tab">
                <span className="font-stamp text-[10px] leading-tight uppercase tracking-wide text-emerald/70 break-words">
                  Guru & Mapel
                </span>
              </div>
              <div className="folder-body aspect-[4/3] w-full bg-parchment2 flex items-center justify-center overflow-hidden">
                {guruFolder.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={guruFolder.photoUrl}
                    alt="Guru & Mata Pelajaran"
                    className={`w-full h-full ${
                      guruFolder.photoFit === "contain" ? "object-contain" : "object-cover"
                    }`}
                  />
                ) : (
                  <span className="font-stamp text-2xl text-emerald/30">GR</span>
                )}
                <span className="absolute bottom-1 right-1 font-stamp text-[8px] uppercase tracking-wide bg-emerald/85 text-parchment px-1.5 py-0.5">
                  {teachers.length} guru
                </span>
              </div>
              <p className="mt-2 text-center font-display italic text-base text-emerald truncate">
                Guru & Mapel
              </p>
            </a>
          </section>
        )}

        {alumniCount > 0 && (
          <a
            href="/alumni"
            className="block border border-dashed border-clay/40 px-6 py-8 text-center hover:bg-clay/5 transition-colors"
          >
            <p className="font-stamp text-xs tracking-[0.25em] uppercase text-clay mb-2">
              Arsip
            </p>
            <p className="font-display italic text-2xl text-emerald">
              Lihat {alumniCount} kelas alumni, dikelompokkan per angkatan &rarr;
            </p>
          </a>
        )}
      </div>

      <footer className="max-w-5xl mx-auto px-6 py-10 text-center">
        <hr className="thread mb-6" />
        <p className="font-stamp text-xs text-ink/40">{siteName} · Madrasah Aliyah</p>
      </footer>
    </main>
  );
}
