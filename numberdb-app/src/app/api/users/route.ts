import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentSession, hashPassword } from "@/lib/auth";
import { permissions, assignableRoles } from "@/lib/rbac";
import { userCreateSchema, sanitizeText } from "@/lib/validators";
import { logActivity } from "@/lib/audit";

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!permissions.canManageUsers(session.role)) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      username: true,
      displayName: true,
      role: true,
      status: true,
      avatarSeed: true,
      createdAt: true,
      lastLoginAt: true,
      _count: { select: { numbersAdded: true } },
    },
  });

  return NextResponse.json({ users });
}

export async function POST(request: NextRequest) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!permissions.canManageUsers(session.role)) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body request tidak valid." }, { status: 400 });
  }

  const parsed = userCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Data tidak valid." }, { status: 400 });
  }

  // Enforce the creation hierarchy: an actor can only hand out roles at or
  // below what assignableRoles() allows for their own role.
  if (!assignableRoles(session.role).includes(parsed.data.role)) {
    return NextResponse.json(
      { error: "Anda tidak punya izin untuk membuat user dengan role tersebut." },
      { status: 403 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { username: parsed.data.username } });
  if (existing) {
    return NextResponse.json({ error: "Username sudah digunakan." }, { status: 409 });
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const created = await prisma.user.create({
    data: {
      username: parsed.data.username,
      passwordHash,
      displayName: sanitizeText(parsed.data.displayName),
      role: parsed.data.role,
    },
    select: { id: true, username: true, displayName: true, role: true, status: true, createdAt: true },
  });

  await logActivity({
    userId: session.sub,
    username: session.username,
    action: "USER_CREATE",
    targetType: "User",
    targetId: created.id,
    detail: `Membuat user ${created.username} dengan role ${created.role}`,
    sessionId: session.sid,
    request,
  });

  return NextResponse.json({ user: created }, { status: 201 });
}
