import { isAdminAuthed } from "@/lib/auth";
import { readPhotos, readSettings } from "@/lib/store";
import LoginForm from "@/components/LoginForm";
import UploadForm from "@/components/UploadForm";
import LogoutButton from "@/components/LogoutButton";
import PhotoList from "@/components/PhotoList";
import LogoSettings from "@/components/LogoSettings";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = isAdminAuthed();
  const photos = authed ? await readPhotos() : [];
  const settings = authed ? await readSettings() : {};
  if (authed) photos.sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1));

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-ink/50 mono">
            Galeri Kenangan MA
          </p>
          <h1 className="text-2xl font-semibold mt-1">Panel Admin</h1>
        </div>
        {authed && (
          <div className="flex items-center gap-4">
            <a href="/kelas" className="text-xs uppercase mono text-accent underline">
              Profil Kelas
            </a>
            <a href="/cetak" className="text-xs uppercase mono text-accent underline">
              Cetak / Unduh PDF
            </a>
            <LogoutButton />
          </div>
        )}
      </div>

      {!authed ? (
        <>
          <p className="mt-3 text-sm text-ink/60">
            Masuk untuk mengunggah dan mengelola foto kenangan.
          </p>
          <LoginForm />
        </>
      ) : (
        <>
          <section className="mt-8">
            <h2 className="text-xs uppercase tracking-wide text-ink/50 mono mb-2">
              Pengaturan situs
            </h2>
            <LogoSettings initialSettings={settings} />
          </section>

          <section className="mt-8">
            <h2 className="text-xs uppercase tracking-wide text-ink/50 mono mb-2">
              Unggah media baru
            </h2>
            <UploadForm />
          </section>

          <section className="mt-10">
            <h2 className="text-xs uppercase tracking-wide text-ink/50 mono mb-3">
              Semua media ({photos.length})
            </h2>
            <PhotoList photos={photos} />
          </section>
        </>
      )}
    </main>
  );
}
