"use client";

import { useState } from "react";
import { DatabaseBackup, Download, Upload, AlertTriangle } from "lucide-react";
import { Card, Modal } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function BackupPage() {
  const { push } = useToast();
  const [downloading, setDownloading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [confirmFile, setConfirmFile] = useState<File | null>(null);

  async function handleBackup() {
    setDownloading(true);
    const res = await fetch("/api/backup");
    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "asepxyz-backup.json";
      a.click();
      URL.revokeObjectURL(url);
      push("success", "Backup berhasil dibuat dan diunduh.");
    } else {
      push("error", "Gagal membuat backup.");
    }
    setDownloading(false);
  }

  async function handleRestore() {
    if (!confirmFile) return;
    setRestoring(true);
    try {
      const content = JSON.parse(await confirmFile.text());
      const res = await fetch("/api/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numbers: content.numbers }),
      });
      const data = await res.json();
      if (res.ok) {
        push("success", `Restore selesai: ${data.restored} nomor dipulihkan.`);
      } else {
        push("error", data.error || "Gagal melakukan restore.");
      }
    } catch {
      push("error", "File backup tidak valid.");
    }
    setRestoring(false);
    setConfirmFile(null);
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Backup & Restore</h1>
        <p className="mt-1 text-sm text-slate-400">Amankan database nomor dengan backup berkala.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-neon-cyan/10 text-neon-cyan">
            <Download className="h-5 w-5" />
          </div>
          <h2 className="font-display text-base font-semibold text-white">Backup Database</h2>
          <p className="mt-2 text-sm text-slate-400">
            Unduh snapshot lengkap seluruh nomor dan daftar user (tanpa password) dalam format JSON.
          </p>
          <Button onClick={handleBackup} loading={downloading} className="mt-4">
            <DatabaseBackup className="h-4 w-4" /> Buat Backup Sekarang
          </Button>
        </Card>

        <Card>
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-neon-pink/10 text-neon-pink">
            <Upload className="h-5 w-5" />
          </div>
          <h2 className="font-display text-base font-semibold text-white">Restore Database</h2>
          <p className="mt-2 text-sm text-slate-400">
            Pulihkan data nomor dari file backup JSON. Nomor yang sudah ada akan diperbarui, nomor baru akan ditambahkan.
          </p>
          <label className="mt-4 inline-block cursor-pointer">
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && setConfirmFile(e.target.files[0])}
            />
            <span className="inline-flex items-center gap-2 rounded-lg glass px-4 py-2.5 text-sm text-slate-100 hover:border-neon-cyan/40">
              <Upload className="h-4 w-4" /> Pilih File Backup
            </span>
          </label>
        </Card>
      </div>

      <Modal open={!!confirmFile} onClose={() => setConfirmFile(null)} title="Konfirmasi Restore">
        <div className="flex items-start gap-3 rounded-lg border border-neon-amber/30 bg-neon-amber/10 p-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-neon-amber" />
          <p className="text-sm text-slate-300">
            Restore akan menimpa data nomor yang cocok pada file <strong>{confirmFile?.name}</strong>. Pastikan file ini
            berasal dari backup AsepXyz yang valid.
          </p>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirmFile(null)}>
            Batal
          </Button>
          <Button variant="danger" loading={restoring} onClick={handleRestore}>
            Ya, Restore Sekarang
          </Button>
        </div>
      </Modal>
    </div>
  );
}
