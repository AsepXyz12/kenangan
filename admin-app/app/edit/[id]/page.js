import { isAdminAuthed } from "@/lib/auth";
import { getPhoto } from "@/lib/store";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import EditForm from "@/components/EditForm";
import MediaGrid from "@/components/MediaGrid";

export const dynamic = "force-dynamic";

export default async function EditPage({ params }) {
  if (!isAdminAuthed()) redirect("/");

  const photo = await getPhoto(params.id);
  if (!photo) notFound();
  const items = Array.isArray(photo.items) ? photo.items : [];

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <Link href="/" className="text-xs uppercase tracking-wide mono text-accent">
        ← Kembali ke panel
      </Link>

      <h1 className="text-2xl font-semibold mt-4">Edit kenangan</h1>
      <p className="text-sm text-ink/60 mt-1">
        ID: <span className="mono text-xs break-all">{photo.id}</span>
      </p>

      <div className="mt-6">
        <MediaGrid photoId={photo.id} items={items} />
      </div>

      <div className="mt-6">
        <EditForm photo={photo} />
      </div>
    </main>
  );
}
