"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";

const MAX_SIZE_MB = 100; // samakan dengan maximumSizeInBytes di app/api/photos/upload-url

function formatSize(bytes) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

export default function UploadForm() {
  const router = useRouter();
  const fileRef = useRef(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [uploader, setUploader] = useState("Admin");
  const [status, setStatus] = useState("idle"); // idle | uploading | saving | done | error
  const [error, setError] = useState("");
  const [fileInfo, setFileInfo] = useState("");

  function handleFileChange() {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setFileInfo("");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Ukuran foto terlalu besar (maks ${MAX_SIZE_MB}MB). File ini ${formatSize(file.size)}.`);
    } else {
      setError("");
    }
    setFileInfo(`${file.name} · ${formatSize(file.size)}`);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("Pilih file foto terlebih dahulu");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Ukuran foto terlalu besar (maks ${MAX_SIZE_MB}MB).`);
      return;
    }
    setError("");

    try {
      // 1) Unggah file langsung dari browser ke Vercel Blob.
      // Ini mendukung foto ukuran & resolusi berapa pun (potret, lanskap,
      // persegi, file besar dari kamera/HP) karena tidak lewat batas ukuran
      // request server function Vercel (~4.5MB).
      setStatus("uploading");
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/photos/upload-url",
      });

      // 2) Simpan metadata foto (judul, tanggal, dll) + URL blob ke server.
      setStatus("saving");
      const res = await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: blob.url,
          title,
          caption,
          eventDate, // hari/bulan/tahun dari <input type="date">
          uploader,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gagal menyimpan data foto");
      }

      setTitle("");
      setCaption("");
      setEventDate("");
      setFileInfo("");
      fileRef.current.value = "";
      setStatus("done");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 bg-white/60 border border-emerald/10 p-5">
      <div>
        <label className="font-stamp text-xs uppercase tracking-wide text-emerald/70">
          Foto
        </label>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm mt-1"
          required
        />
        {fileInfo && <p className="text-[11px] text-ink/40 mt-1">{fileInfo}</p>}
        <p className="text-[11px] text-ink/40 mt-1">
          Semua ukuran & orientasi foto didukung (potret, lanskap, persegi), maks {MAX_SIZE_MB}MB per foto.
        </p>
      </div>

      <div>
        <label className="font-stamp text-xs uppercase tracking-wide text-emerald/70">
          Judul
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Contoh: Perpisahan Kelas XII IPA 1"
          className="w-full text-sm border border-emerald/20 px-3 py-2 bg-white mt-1"
          required
        />
      </div>

      <div>
        <label className="font-stamp text-xs uppercase tracking-wide text-emerald/70">
          Cerita singkat (opsional)
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={2}
          className="w-full text-sm border border-emerald/20 px-3 py-2 bg-white mt-1"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-stamp text-xs uppercase tracking-wide text-emerald/70">
            Tanggal kenangan
          </label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full text-sm border border-emerald/20 px-3 py-2 bg-white mt-1"
            required
          />
          <p className="text-[11px] text-ink/40 mt-1">Pilih hari, bulan, dan tahun kejadiannya.</p>
        </div>
        <div>
          <label className="font-stamp text-xs uppercase tracking-wide text-emerald/70">
            Diunggah oleh
          </label>
          <input
            type="text"
            value={uploader}
            onChange={(e) => setUploader(e.target.value)}
            className="w-full text-sm border border-emerald/20 px-3 py-2 bg-white mt-1"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "uploading" || status === "saving"}
        className="font-stamp text-xs uppercase tracking-wide bg-emerald text-parchment px-4 py-2.5 hover:bg-emerald-light transition-colors disabled:opacity-50"
      >
        {status === "uploading"
          ? "Mengunggah foto..."
          : status === "saving"
          ? "Menyimpan..."
          : "Unggah foto"}
      </button>
      {status === "done" && <p className="text-xs text-emerald-light">Foto berhasil ditambahkan.</p>}
      {error && <p className="text-xs text-clay">{error}</p>}
    </form>
  );
}
