import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/auth";
import { permissions } from "@/lib/rbac";
import { sanitizeText } from "@/lib/validators";
import { logActivity } from "@/lib/audit";

const ALLOWED_KEYS = ["site_name", "session_timeout_minutes", "login_rate_limit_max"];

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!permissions.canManageSettings(session.role)) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  const settings = await prisma.setting.findMany({ where: { key: { in: ALLOWED_KEYS } } });
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  return NextResponse.json({
    settings: {
      site_name: map.site_name || "AsepXyz Number Database Manager",
      session_timeout_minutes: map.session_timeout_minutes || "480",
      login_rate_limit_max: map.login_rate_limit_max || "5",
    },
  });
}

export async function PATCH(request: NextRequest) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!permissions.canManageSettings(session.role)) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body request tidak valid." }, { status: 400 });
  }

  const updates = Object.entries(body).filter(([key]) => ALLOWED_KEYS.includes(key));
  for (const [key, value] of updates) {
    await prisma.setting.upsert({
      where: { key },
      update: { value: sanitizeText(String(value)) },
      create: { key, value: sanitizeText(String(value)) },
    });
  }

  await logActivity({
    userId: session.sub,
    username: session.username,
    action: "SETTINGS_UPDATE",
    detail: `Memperbarui pengaturan: ${updates.map(([k]) => k).join(", ")}`,
    sessionId: session.sid,
    request,
  });

  return NextResponse.json({ ok: true });
}
