"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, ScrollText, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, Skeleton, Badge } from "@/components/ui";
import { Select } from "@/components/ui/Input";

interface LogItem {
  id: string;
  username: string;
  action: string;
  detail: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  status: string;
  createdAt: string;
}

const ACTION_LABEL: Record<string, string> = {
  LOGIN: "Login",
  LOGIN_FAILED: "Login Gagal",
  LOGOUT: "Logout",
  NUMBER_ADD: "Tambah Nomor",
  NUMBER_EDIT: "Edit Nomor",
  NUMBER_DELETE: "Hapus Nomor",
  DATABASE_EXPORT: "Export Database",
  DATABASE_IMPORT: "Import Database",
  DATABASE_RESTORE: "Restore Database",
  DATABASE_BACKUP: "Backup Database",
  PASSWORD_CHANGE: "Ubah Password",
  ROLE_CHANGE: "Ubah Role",
  USER_CREATE: "Buat User",
  USER_EDIT: "Edit User",
  USER_DELETE: "Hapus User",
  USER_SUSPEND: "Suspend User",
  USER_ACTIVATE: "Aktifkan User",
  SETTINGS_UPDATE: "Update Settings",
};

export default function LogsPage() {
  const [items, setItems] = useState<LogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState("");
  const [username, setUsername] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), pageSize: "20" });
    if (action) params.set("action", action);
    if (username) params.set("username", username);
    const res = await fetch(`/api/logs?${params}`);
    if (res.ok) {
      const data = await res.json();
      setItems(data.items);
      setTotalPages(data.pagination.totalPages || 1);
    }
    setLoading(false);
  }, [page, action, username]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const t = setTimeout(() => setPage(1), 300);
    return () => clearTimeout(t);
  }, [username, action]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Audit Log</h1>
        <p className="mt-1 text-sm text-slate-400">Riwayat seluruh aktivitas pengguna untuk keperluan audit keamanan.</p>
      </div>

      <Card>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Cari berdasarkan username..."
              className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-3.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-neon-cyan/50"
            />
          </div>
          <Select value={action} onChange={(e) => setAction(e.target.value)} className="sm:w-56">
            <option value="">Semua Aksi</option>
            {Object.entries(ACTION_LABEL).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </Select>
        </div>

        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center py-14 text-center">
            <ScrollText className="mb-3 h-10 w-10 text-slate-600" />
            <p className="text-sm text-slate-400">Belum ada log yang cocok.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-3 py-2.5">Waktu</th>
                  <th className="px-3 py-2.5">User</th>
                  <th className="px-3 py-2.5">Aksi</th>
                  <th className="px-3 py-2.5">Detail</th>
                  <th className="px-3 py-2.5">IP</th>
                  <th className="px-3 py-2.5">Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map((log) => (
                  <tr key={log.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                    <td className="whitespace-nowrap px-3 py-3 text-slate-400">
                      {new Date(log.createdAt).toLocaleString("id-ID")}
                    </td>
                    <td className="px-3 py-3 font-medium text-slate-200">{log.username}</td>
                    <td className="px-3 py-3 text-slate-300">{ACTION_LABEL[log.action] || log.action}</td>
                    <td className="max-w-[280px] truncate px-3 py-3 text-slate-400">{log.detail || "—"}</td>
                    <td className="px-3 py-3 font-mono text-xs text-slate-500">{log.ipAddress || "—"}</td>
                    <td className="px-3 py-3">
                      <Badge tone={log.status === "SUCCESS" ? "success" : "danger"}>{log.status}</Badge>
                    </td>
                  </tr>
                ))}
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
    </div>
  );
}
