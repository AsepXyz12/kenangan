import { getPhoto } from "@/lib/store";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import CommentSection from "@/components/CommentSection";

export const dynamic = "force-dynamic";

function formatLong(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PhotoPage({ params }) {
  const photo = await getPhoto(params.id);
  if (!photo) notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <Link href="/" className="font-stamp text-xs uppercase tracking-wide text-emerald-light">
        ← Kembali ke album
      </Link>

      <div className="mt-6 polaroid" data-tape="gold" style={{ transform: "rotate(-0.5deg)" }}>
        <span className="stamp-tape" aria-hidden="true" />
        <div className="relative w-full max-h-[80vh] min-h-[240px] bg-emerald/5 overflow-hidden flex items-center justify-center">
          <Image
            src={photo.url}
            alt={photo.title}
            width={1600}
            height={1600}
            sizes="768px"
            className="w-full h-auto max-h-[80vh] object-contain"
            priority
          />
        </div>
        <div className="pt-3">
          <p className="font-stamp text-xs text-emerald/70">{formatLong(photo.eventDate)}</p>
          <h1 className="font-display italic text-3xl mt-1 text-emerald">{photo.title}</h1>
          {photo.caption && (
            <p className="mt-2 text-ink/70 leading-relaxed">{photo.caption}</p>
          )}
          <p className="mt-3 font-stamp text-[11px] text-ink/40">
            Diunggah oleh {photo.uploader || "Admin"}
          </p>
        </div>
      </div>

      <CommentSection photoId={photo.id} initialComments={photo.comments || []} />
    </main>
  );
}
