"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditForm({ photo }) {
  const router = useRouter();
  const [title, setTitle] = useState(photo.title || "");
  const [caption, setCaption] = useState(photo.caption || "");
  const [eventDate, setEventDate] = useState(photo.eventDate || "");
  const [uploader, setUploader] = useState(photo.uploader || "Admin");
  const [status, setStatus] = useState("idle"); // idle | saving | done | error
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("saving");
    setError("");
    try {
      const res = await fetch(`/api/photos/${photo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, caption, eventDate, uploader }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gagal menyimpan perubahan");
      }
      setStatus("done");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border border-line p-5">
      <div>
        <label className="block text-xs uppercase tracking-wide text-ink/60 mono mb-1">
          Judul
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="field"
          required
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide text-ink/60 mono mb-1">
          Cerita singkat
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={3}
          className="field resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wide text-ink/60 mono mb-1">
            Tanggal kenangan
          </label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="field"
            required
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wide text-ink/60 mono mb-1">
            Diunggah oleh
          </label>
          <input
            type="text"
            value={uploader}
            onChange={(e) => setUploader(e.target.value)}
            className="field"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button type="submit" disabled={status === "saving"} className="btn">
          {status === "saving" ? "Menyimpan..." : "Simpan perubahan"}
        </button>
        {status === "done" && <p className="text-xs text-accent mono">Tersimpan.</p>}
      </div>
      {error && <p className="text-xs text-danger mono">{error}</p>}
    </form>
  );
}
