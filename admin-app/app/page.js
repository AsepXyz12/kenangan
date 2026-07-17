import { isAdminAuthed } from "@/lib/auth";
import { readPhotos } from "@/lib/store";
import LoginForm from "@/components/LoginForm";
import UploadForm from "@/components/UploadForm";
import LogoutButton from "@/components/LogoutButton";
import PhotoList from "@/components/PhotoList";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = isAdminAuthed();
  const photos = authed ? await readPhotos() : [];
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
        {authed && <LogoutButton />}
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
              Unggah foto baru
            </h2>
            <UploadForm />
          </section>

          <section className="mt-10">
            <h2 className="text-xs uppercase tracking-wide text-ink/50 mono mb-3">
              Semua foto ({photos.length})
            </h2>
            <PhotoList photos={photos} />
          </section>
        </>
      )}
    </main>
  );
}
