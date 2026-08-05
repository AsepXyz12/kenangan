"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, KeyRound, UserX, UserCheck, Trash2, Users as UsersIcon, Lock } from "lucide-react";
import { Card, Skeleton, Badge, Modal } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

type RoleName = "OWNER_UTAMA" | "OWNER_KEDUA" | "OWNER" | "MANAGER" | "STAFF";

interface UserItem {
  id: string;
  username: string;
  displayName: string;
  role: RoleName;
  status: "ACTIVE" | "SUSPENDED";
  createdAt: string;
  lastLoginAt: string | null;
  _count: { numbersAdded: number };
}

const ROLE_LABEL: Record<string, string> = {
  OWNER_UTAMA: "Owner Utama",
  OWNER_KEDUA: "Owner Kedua",
  OWNER: "Owner",
  MANAGER: "Database Manager",
  STAFF: "Database Staff",
};

const ROLE_RANK: Record<RoleName, number> = {
  OWNER_UTAMA: 4,
  OWNER_KEDUA: 3,
  OWNER: 2,
  MANAGER: 1,
  STAFF: 0,
};

/** Mirrors src/lib/rbac.ts assignableRoles() so the UI only offers roles the
 * logged-in user is actually allowed to hand out. Server still enforces this. */
function assignableRoles(actorRole: RoleName | null): RoleName[] {
  switch (actorRole) {
    case "OWNER_UTAMA":
      return ["OWNER_KEDUA", "OWNER", "MANAGER", "STAFF"];
    case "OWNER_KEDUA":
      return ["OWNER", "MANAGER", "STAFF"];
    case "OWNER":
      return ["MANAGER", "STAFF"];
    default:
      return [];
  }
}

function canManageTarget(actorRole: RoleName | null, targetRole: RoleName): boolean {
  if (!actorRole) return false;
  if (targetRole === "OWNER_UTAMA") return false;
  return ROLE_RANK[actorRole] > ROLE_RANK[targetRole];
}

export default function UsersPage() {
  const { push } = useToast();
  const [myRole, setMyRole] = useState<RoleName | null>(null);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [resetTarget, setResetTarget] = useState<UserItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<UserItem | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [meRes, res] = await Promise.all([fetch("/api/auth/me"), fetch("/api/users")]);
    if (meRes.ok) {
      const me = await meRes.json();
      setMyRole(me.user?.role || null);
    }
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const myAssignableRoles = assignableRoles(myRole);

  async function toggleSuspend(user: UserItem) {
    const newStatus = user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    const res = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      push("success", `${user.displayName} berhasil ${newStatus === "SUSPENDED" ? "disuspend" : "diaktifkan kembali"}.`);
      load();
    } else {
      push("error", "Gagal mengubah status user.");
    }
  }

  async function changeRole(user: UserItem, role: string) {
    const res = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    if (res.ok) {
      push("success", `Role ${user.displayName} diubah menjadi ${ROLE_LABEL[role]}.`);
      load();
    } else {
      const data = await res.json().catch(() => ({}));
      push("error", data.error || "Gagal mengubah role.");
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const res = await fetch(`/api/users/${deleteTarget.id}`, { method: "DELETE" });
    if (res.ok) {
      push("success", `User ${deleteTarget.username} berhasil dihapus.`);
      setDeleteTarget(null);
      load();
    } else {
      const data = await res.json();
      push("error", data.error || "Gagal menghapus user.");
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Manajemen User</h1>
          <p className="mt-1 text-sm text-slate-400">Kelola akun, role, dan akses tim database.</p>
        </div>
        {myAssignableRoles.length > 0 && (
          <Button onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4" /> Tambah User
          </Button>
        )}
      </div>

      <Card>
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-3 py-2.5">User</th>
                  <th className="px-3 py-2.5">Role</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-3 py-2.5">Nomor Ditambahkan</th>
                  <th className="px-3 py-2.5">Login Terakhir</th>
                  <th className="px-3 py-2.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const manageable = canManageTarget(myRole, user.role);
                  // Roles this actor may switch THIS user into, plus keep their current role visible.
                  const roleOptions = Array.from(new Set([...myAssignableRoles, user.role]));
                  return (
                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                      <td className="px-3 py-3">
                        <p className="font-medium text-slate-100">{user.displayName}</p>
                        <p className="text-xs text-slate-500">@{user.username}</p>
                      </td>
                      <td className="px-3 py-3">
                        {manageable ? (
                          <Select
                            value={user.role}
                            onChange={(e) => changeRole(user, e.target.value)}
                            className="!w-auto py-1.5 text-xs"
                          >
                            {roleOptions.map((r) => (
                              <option key={r} value={r}>
                                {ROLE_LABEL[r]}
                              </option>
                            ))}
                          </Select>
                        ) : (
                          <Badge tone="info">{ROLE_LABEL[user.role] || user.role}</Badge>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        <Badge tone={user.status === "ACTIVE" ? "success" : "danger"}>
                          {user.status === "ACTIVE" ? "Aktif" : "Suspend"}
                        </Badge>
                      </td>
                      <td className="px-3 py-3 text-slate-400">{user._count.numbersAdded}</td>
                      <td className="px-3 py-3 text-slate-500">
                        {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString("id-ID") : "Belum pernah"}
                      </td>
                      <td className="px-3 py-3">
                        {manageable ? (
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => setResetTarget(user)}
                              className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-neon-cyan"
                              aria-label="Reset password"
                            >
                              <KeyRound className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => toggleSuspend(user)}
                              className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-neon-amber"
                              aria-label={user.status === "ACTIVE" ? "Suspend" : "Aktifkan"}
                            >
                              {user.status === "ACTIVE" ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                            </button>
                            <button
                              onClick={() => setDeleteTarget(user)}
                              className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-neon-pink"
                              aria-label="Hapus"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end pr-1 text-slate-600" title="Tidak punya izin mengelola user ini">
                            <Lock className="h-4 w-4" />
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {users.length === 0 && (
              <div className="flex flex-col items-center py-14 text-center">
                <UsersIcon className="mb-3 h-10 w-10 text-slate-600" />
                <p className="text-sm text-slate-400">Belum ada user.</p>
              </div>
            )}
          </div>
        )}
      </Card>

      <AddUserModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSaved={load}
        assignableRoles={myAssignableRoles}
      />
      <ResetPasswordModal user={resetTarget} onClose={() => setResetTarget(null)} />

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Hapus User?">
        <p className="text-sm text-slate-300">
          Yakin ingin menghapus user <strong className="text-white">{deleteTarget?.displayName}</strong> (@
          {deleteTarget?.username})? Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setDeleteTarget(null)}>
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

function AddUserModal({
  open,
  onClose,
  onSaved,
  assignableRoles,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  assignableRoles: RoleName[];
}) {
  const { push } = useToast();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const defaultRole = assignableRoles.includes("STAFF") ? "STAFF" : assignableRoles[0] || "STAFF";
  const [role, setRole] = useState(defaultRole);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) setRole(defaultRole);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const isOwnerTierRole = role === "OWNER_KEDUA" || role === "OWNER";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, displayName, password, role }),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok) {
      push("success", `User ${displayName} berhasil dibuat.`);
      setUsername("");
      setDisplayName("");
      setPassword("");
      setRole(defaultRole);
      onClose();
      onSaved();
    } else {
      setError(data.error || "Gagal membuat user.");
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Tambah User Baru">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <Input label="Nama Lengkap" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />
        <Select label="Role" value={role} onChange={(e) => setRole(e.target.value as RoleName)}>
          {assignableRoles.map((r) => (
            <option key={r} value={r}>
              {ROLE_LABEL[r]}
            </option>
          ))}
        </Select>
        {isOwnerTierRole && (
          <p className="rounded-lg border border-neon-amber/30 bg-neon-amber/10 px-3 py-2 text-xs text-neon-amber">
            Akun {ROLE_LABEL[role]} punya akses admin ke sistem. {role === "OWNER_KEDUA"
              ? "Owner Kedua bisa bikin Owner biasa, Manager, dan Staff."
              : "Owner biasa cuma bisa bikin Manager dan Staff — tidak bisa bikin Owner lain."}
          </p>
        )}
        {error && <p className="text-sm text-neon-pink">{error}</p>}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" loading={saving}>
            Buat User
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function ResetPasswordModal({ user, onClose }: { user: UserItem | null; onClose: () => void }) {
  const { push } = useToast();
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError(null);
    const res = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resetPassword: true, newPassword }),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok) {
      push("success", `Password ${user.displayName} berhasil direset.`);
      setNewPassword("");
      onClose();
    } else {
      setError(data.error || "Gagal reset password.");
    }
  }

  return (
    <Modal open={!!user} onClose={onClose} title={`Reset Password: ${user?.displayName ?? ""}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Password Baru"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          minLength={8}
          required
        />
        {error && <p className="text-sm text-neon-pink">{error}</p>}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" loading={saving}>
            Reset Password
          </Button>
        </div>
      </form>
    </Modal>
  );
}
