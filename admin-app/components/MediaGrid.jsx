"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function MediaGrid({ photoId, items }) {
  const router = useRouter();
  const [removingIndex, setRemovingIndex] = useState(null);

  async function handleRemove(index) {
    if (items.length <= 1) {
      alert("Tidak bisa menghapus media terakhir. Hapus seluruh kenangan ini kalau memang sudah tidak dibutuhkan.");
      return;
    }
    if (!confirm("Hapus media ini dari kenangan?")) return;
    setRemovingIndex(index);
    try {
      const res = await fetch(`/api/photos/${photoId}/media/${index}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      alert("Gagal menghapus media. Coba lagi.");
    } finally {
      setRemovingIndex(null);
    }
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-ink/50 mono mb-2">
        Media dalam kenangan ini ({items.length})
      </p>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {items.map((item, i) => (
          <div
            key={`${item.url}-${i}`}
            className="relative aspect-square bg-line/30 border border-line overflow-hidden group"
          >
            {item.mediaType === "video" ? (
              <video src={item.url} className="w-full h-full object-cover" muted />
            ) : item.mediaType === "audio" ? (
              <div className="w-full h-full flex items-center justify-center text-[9px] text-ink/40 mono">
                AUDIO
              </div>
            ) : item.mediaType === "file" ? (
              <div className="w-full h-full flex items-center justify-center text-[9px] text-ink/40 mono">
                FILE
              </div>
            ) : (
              <Image src={item.url} alt="" fill sizes="80px" className="object-cover" />
            )}
            <button
              type="button"
              onClick={() => handleRemove(i)}
              disabled={removingIndex === i}
              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] uppercase mono text-white disabled:opacity-100"
            >
              {removingIndex === i ? "..." : "Hapus"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
