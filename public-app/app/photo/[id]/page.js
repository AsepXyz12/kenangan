import { getPhoto } from "@/lib/store";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PhotoDate from "@/components/PhotoDate";

export const dynamic = "force-dynamic";

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
          {photo.mediaType === "video" ? (
            <video
              src={photo.url}
              className="w-full max-h-[80vh] object-contain"
              controls
              playsInline
            />
          ) : photo.mediaType === "audio" ? (
            <div className="w-full py-16 px-6">
              <audio src={photo.url} className="w-full" controls />
            </div>
          ) : photo.mediaType === "file" ? (
            <a
              href={photo.url}
              target="_blank"
              rel="noreferrer"
              className="font-stamp text-sm text-emerald underline py-16 px-6"
            >
              Buka file
            </a>
          ) : (
            <Image
              src={photo.url}
              alt={photo.title}
              width={1600}
              height={1600}
              sizes="768px"
              className="w-full h-auto max-h-[80vh] object-contain"
              priority
            />
          )}
        </div>
        <div className="pt-3">
          <PhotoDate dateStr={photo.eventDate} />
          <h1 className="font-display italic text-3xl mt-1 text-emerald">{photo.title}</h1>
          {photo.caption && (
            <p className="mt-2 text-ink/70 leading-relaxed">{photo.caption}</p>
          )}
          <p className="mt-3 font-stamp text-[11px] text-ink/40">
            Diunggah oleh {photo.uploader || "Admin"}
          </p>
        </div>
      </div>
    </main>
  );
}
