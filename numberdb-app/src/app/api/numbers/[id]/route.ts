import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/auth";
import { numberUpdateSchema, sanitizeText } from "@/lib/validators";
import { permissions } from "@/lib/rbac";
import { logActivity } from "@/lib/audit";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const existing = await prisma.whatsAppNumber.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Nomor tidak ditemukan." }, { status: 404 });

  const isOwnEntry = existing.addedById === session.sub;
  const canEditAny = permissions.canEditAnyNumber(session.role);

  if (!isOwnEntry && !canEditAny) {
    return NextResponse.json(
      { error: "Kamu hanya bisa mengedit catatan nomor yang kamu tambahkan sendiri." },
      { status: 403 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body request tidak valid." }, { status: 400 });
  }

  const parsed = numberUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Data tidak valid." }, { status: 400 });
  }

  // Staff editing their own entry can only touch the note + status, not reassign name freely beyond basic edits.
  const data: Record<string, unknown> = {};
  if (parsed.data.note !== undefined) data.note = sanitizeText(parsed.data.note);
  if (parsed.data.status !== undefined) data.status = parsed.data.status;
  if (parsed.data.name !== undefined && (canEditAny || isOwnEntry)) data.name = sanitizeText(parsed.data.name);

  const updated = await prisma.whatsAppNumber.update({ where: { id: params.id }, data });

  await logActivity({
    userId: session.sub,
    username: session.username,
    action: "NUMBER_EDIT",
    targetType: "WhatsAppNumber",
    targetId: updated.id,
    detail: `Mengedit nomor ${updated.number}`,
    sessionId: session.sid,
    request,
  });

  return NextResponse.json({ item: updated });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const existing = await prisma.whatsAppNumber.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Nomor tidak ditemukan." }, { status: 404 });

  const isOwnEntry = existing.addedById === session.sub;
  const canDeleteAny = permissions.canDeleteAnyNumber(session.role);

  if (!isOwnEntry && !canDeleteAny) {
    return NextResponse.json(
      { error: "Kamu hanya bisa menghapus nomor yang kamu tambahkan sendiri." },
      { status: 403 }
    );
  }

  await prisma.whatsAppNumber.delete({ where: { id: params.id } });

  await logActivity({
    userId: session.sub,
    username: session.username,
    action: "NUMBER_DELETE",
    targetType: "WhatsAppNumber",
    targetId: existing.id,
    detail: `Menghapus nomor ${existing.number}`,
    sessionId: session.sid,
    request,
  });

  return NextResponse.json({ ok: true });
}
