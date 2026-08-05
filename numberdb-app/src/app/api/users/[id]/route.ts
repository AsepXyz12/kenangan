import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentSession, hashPassword } from "@/lib/auth";
import { permissions, assignableRoles, canManageTargetRole } from "@/lib/rbac";
import { userUpdateSchema, passwordResetSchema, sanitizeText } from "@/lib/validators";
import { logActivity } from "@/lib/audit";

// PATCH /api/users/[id]  — body can include { displayName, role, status } for a normal
// edit, or { resetPassword: true, newPassword } to reset a password.
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!permissions.canManageUsers(session.role)) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  const target = await prisma.user.findUnique({ where: { id: params.id } });
  if (!target) return NextResponse.json({ error: "User tidak ditemukan." }, { status: 404 });
  if (target.role === "OWNER_UTAMA") {
    return NextResponse.json({ error: "Akun Owner Utama tidak dapat diubah." }, { status: 403 });
  }
  if (!canManageTargetRole(session.role, target.role)) {
    return NextResponse.json(
      { error: "Anda tidak punya izin untuk mengubah user dengan role ini." },
      { status: 403 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body request tidak valid." }, { status: 400 });
  }

  // Password reset branch
  if (body.resetPassword) {
    const parsed = passwordResetSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Password tidak valid." }, { status: 400 });
    }
    const passwordHash = await hashPassword(parsed.data.newPassword);
    await prisma.user.update({ where: { id: target.id }, data: { passwordHash } });
    await logActivity({
      userId: session.sub,
      username: session.username,
      action: "PASSWORD_CHANGE",
      targetType: "User",
      targetId: target.id,
      detail: `Reset password untuk ${target.username}`,
      sessionId: session.sid,
      request,
    });
    return NextResponse.json({ ok: true });
  }

  const parsed = userUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Data tidak valid." }, { status: 400 });
  }

  if (parsed.data.role && !assignableRoles(session.role).includes(parsed.data.role)) {
    return NextResponse.json(
      { error: "Anda tidak punya izin untuk memberikan role tersebut." },
      { status: 403 }
    );
  }

  const data: Record<string, unknown> = {};
  if (parsed.data.displayName !== undefined) data.displayName = sanitizeText(parsed.data.displayName);
  if (parsed.data.role !== undefined) data.role = parsed.data.role;
  if (parsed.data.status !== undefined) data.status = parsed.data.status;

  const updated = await prisma.user.update({ where: { id: target.id }, data });

  if (parsed.data.role && parsed.data.role !== target.role) {
    await logActivity({
      userId: session.sub,
      username: session.username,
      action: "ROLE_CHANGE",
      targetType: "User",
      targetId: target.id,
      detail: `Role ${target.username} diubah dari ${target.role} menjadi ${parsed.data.role}`,
      sessionId: session.sid,
      request,
    });
  }
  if (parsed.data.status && parsed.data.status !== target.status) {
    await logActivity({
      userId: session.sub,
      username: session.username,
      action: parsed.data.status === "SUSPENDED" ? "USER_SUSPEND" : "USER_ACTIVATE",
      targetType: "User",
      targetId: target.id,
      detail: `Status ${target.username} diubah menjadi ${parsed.data.status}`,
      sessionId: session.sid,
      request,
    });
  }
  if (parsed.data.displayName) {
    await logActivity({
      userId: session.sub,
      username: session.username,
      action: "USER_EDIT",
      targetType: "User",
      targetId: target.id,
      detail: `Data ${target.username} diperbarui`,
      sessionId: session.sid,
      request,
    });
  }

  return NextResponse.json({
    user: {
      id: updated.id,
      username: updated.username,
      displayName: updated.displayName,
      role: updated.role,
      status: updated.status,
    },
  });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!permissions.canManageUsers(session.role)) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  const target = await prisma.user.findUnique({ where: { id: params.id } });
  if (!target) return NextResponse.json({ error: "User tidak ditemukan." }, { status: 404 });
  if (target.role === "OWNER_UTAMA") {
    return NextResponse.json({ error: "Akun Owner Utama tidak dapat dihapus." }, { status: 403 });
  }
  if (!canManageTargetRole(session.role, target.role)) {
    return NextResponse.json(
      { error: "Anda tidak punya izin untuk menghapus user dengan role ini." },
      { status: 403 }
    );
  }
  if (target.id === session.sub) {
    return NextResponse.json({ error: "Tidak bisa menghapus akun sendiri." }, { status: 400 });
  }

  await prisma.user.delete({ where: { id: target.id } });

  await logActivity({
    userId: session.sub,
    username: session.username,
    action: "USER_DELETE",
    targetType: "User",
    targetId: target.id,
    detail: `Menghapus user ${target.username}`,
    sessionId: session.sid,
    request,
  });

  return NextResponse.json({ ok: true });
}
