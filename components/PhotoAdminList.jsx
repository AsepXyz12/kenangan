"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PhotoAdminList({ photos }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  async function handleDelete(id, title) {
    const confirmed = window.confirm(`Hapus foto "${title}"? Tindakan ini tidak bisa dibatalkan.`);
    if (!confirmed) return;

    setDeletingId(id);
    setError("");
    try {
      const res = await fetch(`/api/photos/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gagal menghapus foto");
      }
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  if (photos.length === 0) {
    return <p className="text-sm text-ink/50">Belum ada foto yang diunggah.</p>;
  }

  return (
    <div>
      {error && <p className="text-xs text-clay mb-3">{error}</p>}
      <ul className="divide-y divide-emerald/10">
        {photos.map((p) => (
          <li key={p.id} className="py-2 flex items-center justify-between text-sm gap-3">
            <div className="min-w-0">
              <span className="font-body block truncate">{p.title}</span>
              <span className="font-stamp text-xs text-ink/40">{p.eventDate}</span>
            </div>
            <button
              type="button"
              onClick={() => handleDelete(p.id, p.title)}
              disabled={deletingId === p.id}
              className="font-stamp text-xs uppercase tracking-wide text-clay hover:underline disabled:opacity-50 shrink-0"
            >
              {deletingId === p.id ? "Menghapus..." : "Hapus"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
