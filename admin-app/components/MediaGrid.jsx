"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { upload } from "@vercel/blob/client";

const MAX_SIZE_MB = 500; // samakan dengan maximumSizeInBytes di app/api/photos/upload-url

function formatSize(bytes) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

export default function MediaGrid({ photoId, items }) {
  const router = useRouter();
  const fileRef = useRef(null);
  const [removingIndex, setRemovingIndex] = useState(null);

  // ---------- Tambah media baru ke kenangan ini ----------
  //
  // Sebelumnya MediaGrid cuma bisa HAPUS media satu-satu — gak ada cara
  // nambah media baru selain hapus seluruh kenangan & upload ulang semuanya
  // dari nol. Sekarang bisa pilih banyak file sekaligus di sini, langsung
  // menyatu ke kenangan yang sama, jadi kalau salah upload atau kurang satu
  // foto, tinggal tambah/hapus di tempat ini tanpa bolak-balik.
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | uploading | saving | error
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState("");

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

  function handleFileChange() {
    const list = Array.from(fileRef.current?.files || []);
    const tooBig = list.find((f) => f.size > MAX_SIZE_MB * 1024 * 1024);
    setError(tooBig ? `"${tooBig.name}" terlalu besar (maks ${MAX_SIZE_MB}MB).` : "");
    setFiles(list);
  }

  function removeStagedFile(index) {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    // Sinkronkan input file supaya tidak ke-submit ulang file yang sudah dibuang.
    const dt = new DataTransfer();
    next.forEach((f) => dt.items.add(f));
    if (fileRef.current) fileRef.current.files = dt.files;
  }

  async function handleAddMedia() {
    if (files.length === 0) return;
    const tooBig = files.find((f) => f.size > MAX_SIZE_MB * 1024 * 1024);
    if (tooBig) {
      setError(`"${tooBig.name}" terlalu besar (maks ${MAX_SIZE_MB}MB).`);
      return;
    }
    setError("");
    try {
      setStatus("uploading");
      setProgress({ done: 0, total: files.length });
      const newItems = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/photos/upload-url",
        });
        newItems.push({ url: blob.url, contentType: file.type });
        setProgress({ done: i + 1, total: files.length });
      }

      setStatus("saving");
      const res = await fetch(`/api/photos/${photoId}/media`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: newItems }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gagal menyimpan media baru");
      }

      setFiles([]);
      if (fileRef.current) fileRef.current.value = "";
      setStatus("idle");
      router.refresh();
    } catch (err) {
      setError(err.message || "Gagal menambah media.");
      setStatus("error");
    }
  }

  const isBusy = status === "uploading" || status === "saving";
  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-ink/50 mono mb-2">
        Media dalam kenangan ini ({items.length})
      </p>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {items.map((item, i) => (
          <div
            key={`${item.url}-${i}`}
            className="admin-thumb relative aspect-square bg-line/30 border border-line overflow-hidden group"
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

      <div className="mt-4 border border-dashed border-line p-3">
        <label
          htmlFor="add-media-file"
          className="admin-dropzone flex flex-col items-center justify-center gap-1 border border-dashed border-line bg-white px-4 py-4 text-center cursor-pointer hover:border-accent/50 transition-colors"
        >
          <span className="text-xs uppercase tracking-wide mono">
            {files.length > 0 ? "Tambah / ganti pilihan" : "+ Tambah foto, video, atau audio"}
          </span>
          <span className="text-xs text-ink/50">
            {files.length > 0
              ? `${files.length} file dipilih · ${formatSize(totalSize)}`
              : "Bisa pilih banyak sekaligus, langsung nyatu ke kenangan ini — gak perlu hapus & upload ulang"}
          </span>
        </label>
        <input
          id="add-media-file"
          ref={fileRef}
          type="file"
          accept="image/*,video/*,audio/*"
          onChange={handleFileChange}
          className="sr-only"
          multiple
        />

        {files.length > 0 && (
          <ul className="admin-chip-list mt-3 space-y-1.5 max-h-40 overflow-y-auto">
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
                      onClick={() => removeStagedFile(i)}
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

        <div className="flex items-center gap-3 mt-3">
          <button
            type="button"
            onClick={handleAddMedia}
            disabled={isBusy || files.length === 0}
            className="btn text-[11px] uppercase mono px-3 py-1.5 disabled:opacity-50 inline-flex items-center gap-2"
          >
            {isBusy && (
              <span className="w-3 h-3 border-2 border-paper/40 border-t-paper rounded-full animate-spin" />
            )}
            {status === "uploading"
              ? `Mengunggah ${progress.done}/${progress.total}...`
              : status === "saving"
              ? "Menyimpan..."
              : files.length > 1
              ? `Tambahkan ${files.length} file`
              : "Tambahkan ke kenangan ini"}
          </button>
        </div>
        {error && <p className="text-xs text-danger mono mt-2">{error}</p>}
      </div>
    </div>
  );
}
