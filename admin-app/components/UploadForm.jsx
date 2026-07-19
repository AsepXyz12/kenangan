"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";

const MAX_SIZE_MB = 500; // samakan dengan maximumSizeInBytes di app/api/photos/upload-url

function formatSize(bytes) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

export default function UploadForm() {
  const router = useRouter();
  const fileRef = useRef(null);
  const [files, setFiles] = useState([]); // File[]
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [uploader, setUploader] = useState("Admin");
  const [status, setStatus] = useState("idle"); // idle | uploading | saving | done | error
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState("");

  function handleFileChange() {
    const list = Array.from(fileRef.current?.files || []);
    const tooBig = list.find((f) => f.size > MAX_SIZE_MB * 1024 * 1024);
    if (tooBig) {
      setError(`"${tooBig.name}" terlalu besar (maks ${MAX_SIZE_MB}MB).`);
    } else {
      setError("");
    }
    setFiles(list);
  }

  function removeFile(index) {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    // Sinkronkan input file supaya tidak ke-submit ulang file yang sudah dibuang.
    const dt = new DataTransfer();
    next.forEach((f) => dt.items.add(f));
    if (fileRef.current) fileRef.current.files = dt.files;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (files.length === 0) {
      setError("Pilih minimal satu file media");
      return;
    }
    const tooBig = files.find((f) => f.size > MAX_SIZE_MB * 1024 * 1024);
    if (tooBig) {
      setError(`"${tooBig.name}" terlalu besar (maks ${MAX_SIZE_MB}MB).`);
      return;
    }
    setError("");

    try {
      // 1) Unggah semua file satu-satu langsung dari browser ke Vercel Blob
      // (supaya tidak terbentur batas ukuran request server function).
      setStatus("uploading");
      setProgress({ done: 0, total: files.length });
      const items = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/photos/upload-url",
        });
        items.push({ url: blob.url, contentType: file.type });
        setProgress({ done: i + 1, total: files.length });
      }

      // 2) Simpan metadata (judul, tanggal, dll) sekali untuk seluruh grup.
      setStatus("saving");
      const res = await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, title, caption, eventDate, uploader }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gagal menyimpan data kenangan");
      }

      setTitle("");
      setCaption("");
      setEventDate("");
      setFiles([]);
      if (fileRef.current) fileRef.current.value = "";
      setStatus("done");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  const isBusy = status === "uploading" || status === "saving";
  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <form onSubmit={handleSubmit} className="admin-panel mt-6 space-y-4 border border-line p-5">
      <div>
        <label className="block text-xs uppercase tracking-wide text-ink/60 mono mb-1">
          Media
        </label>
        <label
          htmlFor="photo-file"
          className="admin-dropzone flex flex-col items-center justify-center gap-1 border border-dashed border-line bg-white px-4 py-6 text-center cursor-pointer hover:border-accent/50 transition-colors"
        >
          <span className="text-xs uppercase tracking-wide mono">
            {files.length > 0 ? "Tambah / ganti pilihan" : "Pilih foto, video, atau audio"}
          </span>
          <span className="text-xs text-ink/50">
            {files.length > 0
              ? `${files.length} file dipilih · ${formatSize(totalSize)}`
              : "Bisa pilih banyak sekaligus — semua akan digabung jadi satu kenangan"}
          </span>
        </label>
        <input
          id="photo-file"
          ref={fileRef}
          type="file"
          accept="image/*,video/*,audio/*"
          onChange={handleFileChange}
          className="sr-only"
          multiple
        />
        <p className="text-xs text-ink/40 mt-1.5">
          Mendukung foto, video, dan audio, maks {MAX_SIZE_MB}MB per file. Semua file yang
          dipilih akan tampil sebagai satu kenangan dengan judul & cerita yang sama.
        </p>

        {files.length > 0 && (
          <ul className="admin-chip-list mt-3 space-y-1.5 max-h-48 overflow-y-auto">
            {files.map((f, i) => (
              <li
                key={`${f.name}-${i}`}
                className="admin-chip flex items-center justify-between gap-2 text-xs bg-line/10 px-2.5 py-1.5"
              >
                <span className="truncate text-ink/70">{f.name}</span>
                <span className="shrink-0 flex items-center gap-2">
                  <span className="text-ink/40 mono">{formatSize(f.size)}</span>
                  {!isBusy && (
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="text-danger uppercase mono"
                    >
                      Hapus
                    </button>
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
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
            ? `Mengunggah ${progress.done}/${progress.total}...`
            : status === "saving"
            ? "Menyimpan..."
            : files.length > 1
            ? `Unggah ${files.length} file`
            : "Unggah"}
        </button>
        {status === "done" && (
          <p className="text-xs text-accent mono">Kenangan berhasil ditambahkan.</p>
        )}
      </div>
      {error && <p className="text-xs text-danger mono">{error}</p>}
    </form>
  );
}
