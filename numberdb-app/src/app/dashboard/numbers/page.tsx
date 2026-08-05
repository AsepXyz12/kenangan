"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Download,
  Upload,
  Trash2,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Phone,
} from "lucide-react";
import { Card, Skeleton, Badge, Modal } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { Input, TextArea, Select } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

interface NumberItem {
  id: string;
  number: string;
  name: string;
  note: string | null;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  addedBy: { id: string; username: string; displayName: string };
}

export default function NumbersPage() {
  const { push } = useToast();
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [items, setItems] = useState<NumberItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("createdAt:desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<NumberItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<NumberItem | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), pageSize: "10", sort });
    if (query) params.set("query", query);
    if (status) params.set("status", status);
    const res = await fetch(`/api/numbers?${params}`);
    if (res.ok) {
      const data = await res.json();
      setItems(data.items);
      setTotalPages(data.pagination.totalPages || 1);
      setTotal(data.pagination.total);
    }
    setLoading(false);
  }, [page, sort, query, status]);

  useEffect(() => {
    (async () => {
      const meRes = await fetch("/api/auth/me");
      const me = await meRes.json();
      setRole(me.user?.role || null);
      setUserId(me.user?.id || null);
    })();
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const t = setTimeout(() => setPage(1), 300);
    return () => clearTimeout(t);
  }, [query, status]);

  const canManageAny = role === "MANAGER" || role === "OWNER_UTAMA" || role === "OWNER_KEDUA" || role === "OWNER";

  async function handleDelete() {
    if (!deleteItem) return;
    const res = await fetch(`/api/numbers/${deleteItem.id}`, { method: "DELETE" });
    if (res.ok) {
      push("success", `Nomor ${deleteItem.number} berhasil dihapus.`);
      setDeleteItem(null);
      load();
    } else {
      const data = await res.json();
      push("error", data.error || "Gagal menghapus nomor.");
    }
  }

  async function handleExport(format: "csv" | "json") {
    const res = await fetch(`/api/numbers/export?format=${format}`);
    if (!res.ok) {
      push("error", "Gagal export database.");
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `asepxyz-numbers.${format}`;
    a.click();
    URL.revokeObjectURL(url);
    push("success", `Database berhasil di-export sebagai ${format.toUpperCase()}.`);
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const format = file.name.endsWith(".json") ? "json" : "csv";
    const content = await file.text();
    const res = await fetch("/api/numbers/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ format, content }),
    });
    const data = await res.json();
    if (res.ok) {
      push("success", `Import selesai: ${data.imported} nomor ditambahkan, ${data.skipped} dilewati.`);
      load();
    } else {
      push("error", data.error || "Gagal import database.");
    }
    e.target.value = "";
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Database Nomor</h1>
          <p className="mt-1 text-sm text-slate-400">{total} nomor terdaftar di database.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {canManageAny && (
            <>
              <label className="cursor-pointer">
                <input type="file" accept=".csv,.json" className="hidden" onChange={handleImport} />
                <span className="inline-flex items-center gap-2 rounded-lg glass px-4 py-2.5 text-sm text-slate-100 hover:border-neon-cyan/40">
                  <Upload className="h-4 w-4" /> Import
                </span>
              </label>
              <Button variant="secondary" onClick={() => handleExport("csv")}>
                <Download className="h-4 w-4" /> Export CSV
              </Button>
              <Button variant="secondary" onClick={() => handleExport("json")}>
                <Download className="h-4 w-4" /> Export JSON
              </Button>
            </>
          )}
          <Button onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4" /> Tambah Nomor
          </Button>
        </div>
      </div>

      <Card>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nomor, nama, atau catatan..."
              className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-3.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-neon-cyan/50"
            />
          </div>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} className="sm:w-40">
            <option value="">Semua Status</option>
            <option value="ACTIVE">Aktif</option>
            <option value="INACTIVE">Tidak Aktif</option>
          </Select>
          <Select value={sort} onChange={(e) => setSort(e.target.value)} className="sm:w-48">
            <option value="createdAt:desc">Terbaru</option>
            <option value="createdAt:asc">Terlama</option>
            <option value="name:asc">Nama A-Z</option>
            <option value="name:desc">Nama Z-A</option>
          </Select>
        </div>

        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center py-14 text-center">
            <Phone className="mb-3 h-10 w-10 text-slate-600" />
            <p className="text-sm text-slate-400">Belum ada nomor yang cocok dengan pencarian.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-3 py-2.5">Nomor</th>
                  <th className="px-3 py-2.5">Nama</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-3 py-2.5">Catatan</th>
                  <th className="px-3 py-2.5">Ditambahkan Oleh</th>
                  <th className="px-3 py-2.5">Tanggal</th>
                  <th className="px-3 py-2.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const isOwn = item.addedBy.id === userId;
                  const canEdit = canManageAny || isOwn;
                  return (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-white/5 hover:bg-white/[0.03]"
                    >
                      <td className="px-3 py-3 font-mono text-slate-100">{item.number}</td>
                      <td className="px-3 py-3 text-slate-200">{item.name}</td>
                      <td className="px-3 py-3">
                        <Badge tone={item.status === "ACTIVE" ? "success" : "neutral"}>
                          {item.status === "ACTIVE" ? "Aktif" : "Tidak Aktif"}
                        </Badge>
                      </td>
                      <td className="max-w-[200px] truncate px-3 py-3 text-slate-400">{item.note || "—"}</td>
                      <td className="px-3 py-3 text-slate-400">{item.addedBy.displayName}</td>
                      <td className="px-3 py-3 text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex justify-end gap-1.5">
                          {canEdit && (
                            <button
                              onClick={() => setEditItem(item)}
                              className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-neon-cyan"
                              aria-label="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                          )}
                          {canEdit && (
                            <button
                              onClick={() => setDeleteItem(item)}
                              className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-neon-pink"
                              aria-label="Hapus"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Halaman {page} dari {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-lg p-2 text-slate-400 hover:bg-white/5 disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-lg p-2 text-slate-400 hover:bg-white/5 disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </Card>

      <AddNumberModal open={addOpen} onClose={() => setAddOpen(false)} onSaved={load} />
      <EditNumberModal
        item={editItem}
        canEditName={canManageAny}
        onClose={() => setEditItem(null)}
        onSaved={load}
      />

      <Modal open={!!deleteItem} onClose={() => setDeleteItem(null)} title="Hapus Nomor?">
        <p className="text-sm text-slate-300">
          Yakin ingin menghapus nomor <strong className="text-white">{deleteItem?.number}</strong> (
          {deleteItem?.name})? Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setDeleteItem(null)}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Hapus
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function AddNumberModal({
  open,
  onClose,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { push } = useToast();
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await fetch("/api/numbers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number, name, note, status }),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok) {
      push("success", "Nomor berhasil ditambahkan.");
      setNumber("");
      setName("");
      setNote("");
      setStatus("ACTIVE");
      onClose();
      onSaved();
    } else {
      setError(data.error || "Gagal menambahkan nomor.");
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Tambah Nomor Baru">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nomor WhatsApp"
          placeholder="628123456789"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
        <Input label="Nama" placeholder="Nama bot / pemilik nomor" value={name} onChange={(e) => setName(e.target.value)} required />
        <TextArea label="Catatan" placeholder="Catatan tambahan (opsional)" value={note} onChange={(e) => setNote(e.target.value)} />
        <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="ACTIVE">Aktif</option>
          <option value="INACTIVE">Tidak Aktif</option>
        </Select>
        {error && <p className="text-sm text-neon-pink">{error}</p>}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" loading={saving}>
            Simpan
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function EditNumberModal({
  item,
  canEditName,
  onClose,
  onSaved,
}: {
  item: NumberItem | null;
  canEditName: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { push } = useToast();
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setNote(item.note || "");
      setStatus(item.status);
    }
  }, [item]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!item) return;
    setSaving(true);
    setError(null);
    const res = await fetch(`/api/numbers/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, note, status }),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok) {
      push("success", "Perubahan disimpan.");
      onClose();
      onSaved();
    } else {
      setError(data.error || "Gagal menyimpan perubahan.");
    }
  }

  return (
    <Modal open={!!item} onClose={onClose} title={`Edit Nomor ${item?.number ?? ""}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Nama" value={name} onChange={(e) => setName(e.target.value)} disabled={!canEditName} />
        <TextArea label="Catatan" value={note} onChange={(e) => setNote(e.target.value)} />
        <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="ACTIVE">Aktif</option>
          <option value="INACTIVE">Tidak Aktif</option>
        </Select>
        {error && <p className="text-sm text-neon-pink">{error}</p>}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" loading={saving}>
            Simpan
          </Button>
        </div>
      </form>
    </Modal>
  );
}
