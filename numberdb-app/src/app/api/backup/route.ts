import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentSession, hashPassword } from "@/lib/auth";
import { permissions } from "@/lib/rbac";
import { logActivity } from "@/lib/audit";

// GET /api/backup — full JSON snapshot of numbers + users (without password hashes)
export async function GET(request: NextRequest) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!permissions.canRestoreDatabase(session.role)) {
    return NextResponse.json({ error: "Hanya Owner yang bisa melakukan backup." }, { status: 403 });
  }

  const [numbers, users] = await Promise.all([
    prisma.whatsAppNumber.findMany(),
    prisma.user.findMany({
      select: { id: true, username: true, displayName: true, role: true, status: true, avatarSeed: true },
    }),
  ]);

  const snapshot = {
    version: 1,
    generatedAt: new Date().toISOString(),
    numbers,
    users,
  };

  await logActivity({
    userId: session.sub,
    username: session.username,
    action: "DATABASE_BACKUP",
    detail: `Backup dibuat: ${numbers.length} nomor, ${users.length} user`,
    sessionId: session.sid,
    request,
  });

  return new NextResponse(JSON.stringify(snapshot, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="asepxyz-backup-${Date.now()}.json"`,
    },
  });
}

// POST /api/backup — restore numbers from a previously generated snapshot.
// Only restores the `numbers` collection; user accounts are intentionally
// left untouched to avoid accidentally locking out active operators.
export async function POST(request: NextRequest) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!permissions.canRestoreDatabase(session.role)) {
    return NextResponse.json({ error: "Hanya Owner yang bisa melakukan restore." }, { status: 403 });
  }

  let body: { numbers?: unknown[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "File backup tidak valid." }, { status: 400 });
  }

  if (!Array.isArray(body.numbers)) {
    return NextResponse.json({ error: "Format backup tidak dikenali." }, { status: 400 });
  }

  let restored = 0;
  for (const raw of body.numbers as Record<string, unknown>[]) {
    const number = String(raw.number || "");
    const name = String(raw.name || "");
    if (!number || !name) continue;
    try {
      await prisma.whatsAppNumber.upsert({
        where: { number },
        update: {
          name,
          note: (raw.note as string) ?? null,
          status: raw.status === "INACTIVE" ? "INACTIVE" : "ACTIVE",
        },
        create: {
          number,
          name,
          note: (raw.note as string) ?? null,
          status: raw.status === "INACTIVE" ? "INACTIVE" : "ACTIVE",
          addedById: session.sub,
        },
      });
      restored++;
    } catch {
      // skip malformed row
    }
  }

  await logActivity({
    userId: session.sub,
    username: session.username,
    action: "DATABASE_RESTORE",
    detail: `Restore ${restored} nomor dari file backup`,
    sessionId: session.sid,
    request,
  });

  return NextResponse.json({ restored });
}
