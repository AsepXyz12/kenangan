import { NextRequest, NextResponse } from "next/server";
import Papa from "papaparse";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/auth";
import { permissions } from "@/lib/rbac";
import { sanitizeText } from "@/lib/validators";
import { logActivity } from "@/lib/audit";

interface ImportRow {
  number: string;
  name: string;
  note?: string;
  status?: string;
}

// POST /api/numbers/import — body: { format: "csv"|"json", content: string }
export async function POST(request: NextRequest) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!permissions.canImportDatabase(session.role)) {
    return NextResponse.json({ error: "Kamu tidak punya akses untuk import database." }, { status: 403 });
  }

  let body: { format?: string; content?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body request tidak valid." }, { status: 400 });
  }

  if (!body.content || (body.format !== "csv" && body.format !== "json")) {
    return NextResponse.json({ error: "Format import tidak valid." }, { status: 400 });
  }

  let rows: ImportRow[] = [];
  try {
    if (body.format === "json") {
      const parsed = JSON.parse(body.content);
      rows = Array.isArray(parsed) ? parsed : [];
    } else {
      const parsed = Papa.parse<ImportRow>(body.content, { header: true, skipEmptyLines: true });
      rows = parsed.data;
    }
  } catch {
    return NextResponse.json({ error: "Gagal membaca file. Pastikan format sudah benar." }, { status: 400 });
  }

  // Cap batch size to avoid overload on a single request.
  if (rows.length > 5000) {
    return NextResponse.json({ error: "Maksimal 5000 baris per import." }, { status: 400 });
  }

  let imported = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const row of rows) {
    const number = String(row.number || "").trim();
    const name = String(row.name || "").trim();
    if (!number || !name || !/^\+?[0-9]{8,20}$/.test(number)) {
      skipped++;
      continue;
    }
    try {
      await prisma.whatsAppNumber.upsert({
        where: { number },
        update: {}, // Skip existing numbers rather than overwrite silently
        create: {
          number,
          name: sanitizeText(name),
          note: row.note ? sanitizeText(String(row.note)) : null,
          status: row.status === "INACTIVE" ? "INACTIVE" : "ACTIVE",
          addedById: session.sub,
        },
      });
      imported++;
    } catch (err) {
      skipped++;
      errors.push(`Baris nomor ${number} gagal diproses.`);
    }
  }

  await logActivity({
    userId: session.sub,
    username: session.username,
    action: "DATABASE_IMPORT",
    detail: `Import ${imported} nomor (${skipped} dilewati) dari file ${body.format?.toUpperCase()}`,
    sessionId: session.sid,
    request,
  });

  return NextResponse.json({ imported, skipped, errors: errors.slice(0, 10) });
}
