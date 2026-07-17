"use client";

import { useState } from "react";

export default function CommentSection({ photoId, initialComments }) {
  const [comments, setComments] = useState(initialComments);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch(`/api/photos/${photoId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setComments(data.photo.comments || []);
      setMessage("");
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mt-10">
      <hr className="thread mb-8" />
      <h2 className="font-stamp text-xs uppercase tracking-wide text-emerald/70 mb-4">
        Komentar ({comments.length})
      </h2>

      <ul className="space-y-4 mb-8">
        {comments.length === 0 && (
          <li className="text-sm text-ink/50">Jadi yang pertama berkomentar di foto ini.</li>
        )}
        {comments.map((c) => (
          <li key={c.id} className="border-l-2 border-gold/50 pl-4">
            <p className="font-display text-sm text-emerald">{c.name}</p>
            <p className="text-sm text-ink/80 mt-0.5">{c.message}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="space-y-3 bg-white/60 border border-emerald/10 p-4">
        <input
          type="text"
          placeholder="Nama kamu"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full text-sm border border-emerald/20 px-3 py-2 bg-white"
          maxLength={60}
          required
        />
        <textarea
          placeholder="Tulis kenangan atau komentarmu..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full text-sm border border-emerald/20 px-3 py-2 bg-white"
          rows={3}
          maxLength={500}
          required
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="font-stamp text-xs uppercase tracking-wide bg-emerald text-parchment px-4 py-2 hover:bg-emerald-light transition-colors disabled:opacity-50"
        >
          {status === "sending" ? "Mengirim..." : "Kirim komentar"}
        </button>
        {status === "error" && (
          <p className="text-xs text-clay">Gagal mengirim komentar. Coba lagi.</p>
        )}
      </form>
    </section>
  );
}
