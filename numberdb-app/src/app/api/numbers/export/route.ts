import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/auth";
import { permissions } from "@/lib/rbac";
import { logActivity } from "@/lib/audit";

// GET /api/numbers/export?format=csv|json
export async function GET(request: NextRequest) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!permissions.canExportDatabase(session.role)) {
    return NextResponse.json({ error: "Kamu tidak punya akses untuk export database." }, { status: 403 });
  }

  const format = new URL(request.url).searchParams.get("format") === "csv" ? "csv" : "json";

  const numbers = await prisma.whatsAppNumber.findMany({
    orderBy: { createdAt: "desc" },
    include: { addedBy: { select: { username: true, displayName: true } } },
  });

  await logActivity({
    userId: session.sub,
    username: session.username,
    action: "DATABASE_EXPORT",
    detail: `Export ${numbers.length} nomor sebagai ${format.toUpperCase()}`,
    sessionId: session.sid,
    request,
  });

  if (format === "json") {
    return new NextResponse(JSON.stringify(numbers, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="asepxyz-numbers-${Date.now()}.json"`,
      },
    });
  }

  const header = ["number", "name", "status", "note", "addedBy", "createdAt"];
  const rows = numbers.map((n) =>
    [
      n.number,
      n.name,
      n.status,
      (n.note || "").replace(/"/g, '""'),
      n.addedBy.username,
      n.createdAt.toISOString(),
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(",")
  );
  const csv = [header.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="asepxyz-numbers-${Date.now()}.csv"`,
    },
  });
}
