"use client";

import { useState } from "react";

export default function ChangePasswordForm() {
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password baru tidak cocok.");
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Gagal mengganti password.");
        return;
      }
      setSuccess(true);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Gagal mengganti password (koneksi bermasalah).");
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-xs uppercase mono text-accent underline"
      >
        Ganti Password
      </button>
    );
  }

  return (
    <div className="w-full max-w-sm border border-line p-4 rounded-lg space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink">Ganti Password Admin</h3>
        <button
          onClick={() => setOpen(false)}
          aria-label="Tutup"
          className="text-ink/40 hover:text-ink text-sm"
        >
          ×
        </button>
      </div>
      <form onSubmit={submit} className="space-y-2">
        <input
          type="password"
          placeholder="Password lama"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="field w-full"
          required
        />
        <input
          type="password"
          placeholder="Password baru (min. 6 karakter)"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="field w-full"
          required
          minLength={6}
        />
        <input
          type="password"
          placeholder="Ulangi password baru"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="field w-full"
          required
          minLength={6}
        />
        <button disabled={busy} className="btn text-xs uppercase mono w-full">
          {busy ? "Menyimpan..." : "Simpan password baru"}
        </button>
        {error && <p className="text-xs text-danger mono">{error}</p>}
        {success && (
          <p className="text-xs text-accent mono">
            Password berhasil diganti. Gunakan password baru untuk login berikutnya.
          </p>
        )}
      </form>
    </div>
  );
}
