"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function formatShort(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default function PhotoList({ photos }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);

  async function handleDelete(id, title) {
    if (!confirm(`Hapus foto "${title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/photos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      alert("Gagal menghapus foto. Coba lagi.");
    } finally {
      setDeletingId(null);
    }
  }

  if (photos.length === 0) {
    return (
      <p className="text-sm text-ink/40 border border-dashed border-line py-8 text-center">
        Belum ada foto yang diunggah.
      </p>
    );
  }

  return (
    <ul className="admin-panel-list divide-y divide-line border border-line">
      {photos.map((p) => (
        <li key={p.id} className="p-3 flex items-center gap-3">
          <div className="relative w-14 h-14 shrink-0 bg-line/30 overflow-hidden flex items-center justify-center">
            {p.mediaType === "video" ? (
              <video src={p.url} className="w-full h-full object-cover" muted />
            ) : p.mediaType === "audio" ? (
              <span className="text-[10px] text-ink/40 mono">AUDIO</span>
            ) : p.mediaType === "file" ? (
              <span className="text-[10px] text-ink/40 mono">FILE</span>
            ) : (
              <Image src={p.url} alt={p.title} fill sizes="56px" className="object-cover" />
            )}
            {p.items?.length > 1 && (
              <span className="absolute bottom-0 right-0 text-[9px] mono bg-accent text-paper px-1">
                ×{p.items.length}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm truncate">{p.title}</p>
            <p className="text-xs text-ink/40 mono">
              {formatShort(p.eventDate)} · {p.uploader || "Admin"}
              {p.items?.length > 1 && ` · ${p.items.length} media`}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link href={`/edit/${p.id}`} className="text-xs uppercase mono text-accent">
              Edit
            </Link>
            <button
              onClick={() => handleDelete(p.id, p.title)}
              disabled={deletingId === p.id}
              className="text-xs uppercase mono text-danger disabled:opacity-50"
            >
              {deletingId === p.id ? "Menghapus..." : "Hapus"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
