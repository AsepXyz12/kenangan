import { getPhoto } from "@/lib/store";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PhotoDate from "@/components/PhotoDate";

export const dynamic = "force-dynamic";

const TAPES = ["gold", "clay", "dusk"];
const SUBTLE_ROTATIONS = [-1, 0.8, -0.6, 1.2, -0.9, 0.5];

export default async function PhotoPage({ params }) {
  const photo = await getPhoto(params.id);
  if (!photo) notFound();

  const items = Array.isArray(photo.items) && photo.items.length > 0
    ? photo.items
    : [{ url: photo.url, mediaType: photo.mediaType }];

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <Link href="/" className="font-stamp text-xs uppercase tracking-wide text-emerald-light">
        ← Kembali ke album
      </Link>

      <div className="mt-6">
        <PhotoDate dateStr={photo.eventDate} />
        <h1 className="font-display italic text-3xl mt-1 text-emerald">{photo.title}</h1>
        {photo.caption && (
          <p className="mt-2 text-ink/70 leading-relaxed">{photo.caption}</p>
        )}
        <div className="mt-3 flex items-center gap-2 font-stamp text-[11px] text-ink/40">
          <span>Diunggah oleh {photo.uploader || "Admin"}</span>
          {items.length > 1 && (
            <>
              <span className="w-1 h-1 rounded-full bg-ink/20" />
              <span>{items.length} media</span>
            </>
          )}
        </div>
      </div>

      {/* Feed media: satu kolom rapi, dengan jarak antar item yang lega supaya
          scroll halaman biasa terasa seperti "gulir" per foto. Sengaja TIDAK
          dibikin area scroll sendiri (overflow-y-auto + vh) karena itu bikin
          bug di HP: address bar browser naik-turun bikin satuan vh salah
          hitung, jadinya scroll suka mentok sebelum sampai bawah. Scroll
          halaman biasa (bawaan browser) tidak kena masalah itu. */}
      <div className={items.length > 1 ? "mt-8 space-y-10" : "mt-8"}>
        {items.map((item, i) => (
          <div key={`${item.url}-${i}`}>
            <div
              className="polaroid"
              data-tape={TAPES[i % TAPES.length]}
              style={{ transform: `rotate(${SUBTLE_ROTATIONS[i % SUBTLE_ROTATIONS.length]}deg)` }}
            >
              <span className="stamp-tape" aria-hidden="true" />
              <div className="relative w-full max-h-[70vh] min-h-[240px] bg-emerald/5 overflow-hidden flex items-center justify-center">
                {item.mediaType === "video" ? (
                  <video
                    src={item.url}
                    className="w-full max-h-[70vh] object-contain"
                    controls
                    playsInline
                  />
                ) : item.mediaType === "audio" ? (
                  <div className="w-full py-16 px-6">
                    <audio src={item.url} className="w-full" controls />
                  </div>
                ) : item.mediaType === "file" ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-stamp text-sm text-emerald underline py-16 px-6"
                  >
                    Buka file
                  </a>
                ) : (
                  <Image
                    src={item.url}
                    alt={photo.title}
                    width={1600}
                    height={1600}
                    sizes="768px"
                    className="w-full h-auto max-h-[70vh] object-contain"
                    priority={i === 0}
                  />
                )}
              </div>
              {items.length > 1 && (
                <p className="pt-2.5 font-stamp text-[10px] text-emerald/50 uppercase tracking-wide text-center">
                  {i + 1} dari {items.length}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
