import { isAdminAuthed } from "@/lib/auth";
import { getPhoto } from "@/lib/store";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import EditForm from "@/components/EditForm";

export const dynamic = "force-dynamic";

export default async function EditPage({ params }) {
  if (!isAdminAuthed()) redirect("/");

  const photo = await getPhoto(params.id);
  if (!photo) notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <Link href="/" className="text-xs uppercase tracking-wide mono text-accent">
        ← Kembali ke panel
      </Link>

      <h1 className="text-2xl font-semibold mt-4">Edit foto</h1>

      <div className="mt-6 flex gap-4 items-start">
        <div className="relative w-28 h-28 shrink-0 bg-line/30 overflow-hidden border border-line flex items-center justify-center">
          {photo.mediaType === "video" ? (
            <video src={photo.url} className="w-full h-full object-cover" controls muted />
          ) : photo.mediaType === "audio" ? (
            <span className="text-[10px] text-ink/40 mono">AUDIO</span>
          ) : photo.mediaType === "file" ? (
            <span className="text-[10px] text-ink/40 mono">FILE</span>
          ) : (
            <Image src={photo.url} alt={photo.title} fill sizes="112px" className="object-cover" />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-sm text-ink/60">
            ID: <span className="mono text-xs break-all">{photo.id}</span>
          </p>
          <p className="text-sm text-ink/60 mt-1 break-all">
            <a href={photo.url} target="_blank" rel="noreferrer" className="text-accent underline">
              Buka file asli
            </a>
          </p>
        </div>
      </div>

      <div className="mt-6">
        <EditForm photo={photo} />
      </div>
    </main>
  );
}
