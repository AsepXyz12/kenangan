import { isAdminAuthed } from "@/lib/auth";
import { readPhotos } from "@/lib/store";
import LoginForm from "@/components/LoginForm";
import UploadForm from "@/components/UploadForm";
import LogoutButton from "@/components/LogoutButton";
import PhotoAdminList from "@/components/PhotoAdminList";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = isAdminAuthed();
  const photos = authed ? await readPhotos() : [];

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between">
        <Link href="/" className="font-stamp text-xs uppercase tracking-wide text-emerald-light">
          ← Kembali ke album
        </Link>
        {authed && <LogoutButton />}
      </div>

      <h1 className="font-display italic text-4xl mt-4 text-emerald">Panel Admin</h1>

      {!authed ? (
        <>
          <p className="mt-2 text-ink/60 text-sm">
            Masuk untuk mengunggah foto kenangan baru.
          </p>
          <LoginForm />
        </>
      ) : (
        <>
          <p className="mt-2 text-ink/60 text-sm">
            Unggah foto, atur judul, cerita singkat, dan tanggal kenangannya.
          </p>
          <UploadForm />

          <div className="mt-12">
            <h2 className="font-stamp text-xs uppercase tracking-wide text-emerald/70 mb-4">
              Riwayat unggahan ({photos.length})
            </h2>
            <PhotoAdminList photos={photos} />
          </div>
        </>
      )}
    </main>
  );
}
