"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CommentModeration({ photoId, initialComments }) {
  const router = useRouter();
  const [comments, setComments] = useState(initialComments);
  const [deletingId, setDeletingId] = useState(null);

  async function handleDelete(commentId) {
    if (!confirm("Hapus komentar ini?")) return;
    setDeletingId(commentId);
    try {
      const res = await fetch(`/api/photos/${photoId}/comment/${commentId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setComments(data.photo.comments || []);
      router.refresh();
    } catch {
      alert("Gagal menghapus komentar. Coba lagi.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-xs uppercase tracking-wide text-ink/60 mono mb-3">
        Komentar ({comments.length})
      </h2>
      {comments.length === 0 ? (
        <p className="text-sm text-ink/40 border border-dashed border-line py-6 text-center">
          Belum ada komentar di foto ini.
        </p>
      ) : (
        <ul className="admin-panel-list divide-y divide-line border border-line">
          {comments.map((c) => (
            <li key={c.id} className="p-3 flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-sm text-ink/70 mt-0.5">{c.message}</p>
              </div>
              <button
                onClick={() => handleDelete(c.id)}
                disabled={deletingId === c.id}
                className="text-xs uppercase mono text-danger shrink-0 disabled:opacity-50"
              >
                {deletingId === c.id ? "Menghapus..." : "Hapus"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
