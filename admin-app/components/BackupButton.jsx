"use client";

import { useState } from "react";

export default function BackupButton() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function download() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/backup");
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gagal membuat backup.");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `backup-kenangan-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || "Gagal mengunduh backup.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button onClick={download} disabled={busy} className="btn btn-outline text-xs uppercase mono">
        {busy ? "Menyiapkan..." : "Unduh Backup Data"}
      </button>
      {error && <p className="text-xs text-danger mono mt-1">{error}</p>}
    </div>
  );
}
