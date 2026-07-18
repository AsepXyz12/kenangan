"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import Image from "next/image";

export default function LogoSettings({ initialSettings }) {
  const router = useRouter();
  const fileRef = useRef(null);
  const [logoUrl, setLogoUrl] = useState(initialSettings.logoUrl || "");
  const [siteName, setSiteName] = useState(initialSettings.siteName || "Galeri Kenangan MA");
  const [status, setStatus] = useState("idle"); // idle | uploading | saving | done | error
  const [error, setError] = useState("");

  async function saveSettings(patch) {
    setStatus("saving");
    setError("");
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error("Gagal menyimpan pengaturan");
      setStatus("done");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  async function handleLogoChange() {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setStatus("uploading");
    setError("");
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/photos/upload-url",
      });
      setLogoUrl(blob.url);
      await saveSettings({ logoUrl: blob.url });
    } catch (err) {
      setError(err.message || "Gagal mengunggah logo");
      setStatus("error");
    } finally {
      fileRef.current.value = "";
    }
  }

  async function handleNameSubmit(e) {
    e.preventDefault();
    await saveSettings({ siteName });
  }

  const isBusy = status === "uploading" || status === "saving";

  return (
    <div className="border border-line p-5 space-y-5">
      <div>
        <label className="block text-xs uppercase tracking-wide text-ink/60 mono mb-2">
          Logo situs
        </label>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 shrink-0 bg-line/20 border border-line overflow-hidden flex items-center justify-center">
            {logoUrl ? (
              <Image src={logoUrl} alt="Logo" fill sizes="64px" className="object-contain" />
            ) : (
              <span className="text-[10px] text-ink/30 mono">Belum ada</span>
            )}
          </div>
          <label
            htmlFor="logo-file"
            className="text-xs uppercase mono text-accent cursor-pointer underline"
          >
            {logoUrl ? "Ganti logo" : "Unggah logo"}
          </label>
          <input
            id="logo-file"
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="sr-only"
          />
        </div>
        <p className="text-xs text-ink/40 mt-1.5">
          Logo ini akan tampil di halaman publik. Format gambar apa saja (PNG transparan disarankan).
        </p>
      </div>

      <form onSubmit={handleNameSubmit} className="pt-1 border-t border-line/60">
        <label className="block text-xs uppercase tracking-wide text-ink/60 mono mb-1 mt-4">
          Nama situs
        </label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="field flex-1"
          />
          <button type="submit" disabled={isBusy} className="btn shrink-0">
            Simpan
          </button>
        </div>
      </form>

      {status === "uploading" && <p className="text-xs text-ink/50 mono">Mengunggah logo...</p>}
      {status === "done" && <p className="text-xs text-accent mono">Pengaturan tersimpan.</p>}
      {error && <p className="text-xs text-danger mono">{error}</p>}
    </div>
  );
}
