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
      // 1) Unggah file langsung dari browser ke Vercel Blob, supaya tidak
      // terbentur batas ukuran request server function (~4.5MB).
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
          eventDate,
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

  const isBusy = status === "uploading" || status === "saving";

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 border border-line p-5">
      <div>
        <label className="block text-xs uppercase tracking-wide text-ink/60 mono mb-1">
          Foto
        </label>
        <label
          htmlFor="photo-file"
          className="flex flex-col items-center justify-center gap-1 border border-dashed border-line bg-white px-4 py-6 text-center cursor-pointer hover:border-accent/50 transition-colors"
        >
          <span className="text-xs uppercase tracking-wide mono">
            {fileInfo ? "Ganti file" : "Pilih file foto"}
          </span>
          <span className="text-xs text-ink/50">
            {fileInfo || "Klik untuk memilih foto dari perangkat"}
          </span>
        </label>
        <input
          id="photo-file"
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="sr-only"
          required
        />
        <p className="text-xs text-ink/40 mt-1.5">
          Semua ukuran & orientasi foto didukung, maks {MAX_SIZE_MB}MB per foto.
        </p>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide text-ink/60 mono mb-1">
          Judul
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Contoh: Perpisahan Kelas XII IPA 1"
          className="field"
          required
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide text-ink/60 mono mb-1">
          Cerita singkat (opsional)
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={3}
          placeholder="Contoh: Ini pas kita telat upacara gara-gara nunggu bus..."
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
        <button type="submit" disabled={isBusy} className="btn inline-flex items-center gap-2">
          {isBusy && (
            <span className="w-3 h-3 border-2 border-paper/40 border-t-paper rounded-full animate-spin" />
          )}
          {status === "uploading"
            ? "Mengunggah foto..."
            : status === "saving"
            ? "Menyimpan..."
            : "Unggah foto"}
        </button>
        {status === "done" && (
          <p className="text-xs text-accent mono">Foto berhasil ditambahkan.</p>
        )}
      </div>
      {error && <p className="text-xs text-danger mono">{error}</p>}
    </form>
  );
}
