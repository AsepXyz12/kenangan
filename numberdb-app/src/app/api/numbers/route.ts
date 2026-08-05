import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/auth";
import { numberCreateSchema, sanitizeText } from "@/lib/validators";
import { logActivity } from "@/lib/audit";

// GET /api/numbers?query=&status=&user=&sort=createdAt:desc&page=1&pageSize=20
export async function GET(request: NextRequest) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim();
  const status = searchParams.get("status"); // ACTIVE | INACTIVE
  const userId = searchParams.get("user");
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");
  const [sortField, sortDir] = (searchParams.get("sort") || "createdAt:desc").split(":");
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const pageSize = Math.min(100, Math.max(5, Number(searchParams.get("pageSize") || 20)));

  const where: Record<string, unknown> = {};
  if (query) {
    where.OR = [
      { number: { contains: query, mode: "insensitive" } },
      { name: { contains: query, mode: "insensitive" } },
      { note: { contains: query, mode: "insensitive" } },
    ];
  }
  if (status === "ACTIVE" || status === "INACTIVE") where.status = status;
  if (userId) where.addedById = userId;
  if (dateFrom || dateTo) {
    where.createdAt = {
      ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
      ...(dateTo ? { lte: new Date(dateTo) } : {}),
    };
  }

  const allowedSortFields = ["createdAt", "name", "number", "status"];
  const orderBy = {
    [allowedSortFields.includes(sortField) ? sortField : "createdAt"]:
      sortDir === "asc" ? "asc" : "desc",
  };

  const [items, total] = await Promise.all([
    prisma.whatsAppNumber.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { addedBy: { select: { id: true, username: true, displayName: true } } },
    }),
    prisma.whatsAppNumber.count({ where }),
  ]);

  return NextResponse.json({
    items,
    pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
  });
}

// POST /api/numbers — add a new number (all roles)
export async function POST(request: NextRequest) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body request tidak valid." }, { status: 400 });
  }

  const parsed = numberCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Data tidak valid." }, { status: 400 });
  }
  const { number, name, note, status } = parsed.data;

  const existing = await prisma.whatsAppNumber.findUnique({ where: { number } });
  if (existing) {
    return NextResponse.json({ error: "Nomor ini sudah ada di database." }, { status: 409 });
  }

  const created = await prisma.whatsAppNumber.create({
    data: {
      number,
      name: sanitizeText(name),
      note: note ? sanitizeText(note) : null,
      status,
      addedById: session.sub,
    },
  });

  await logActivity({
    userId: session.sub,
    username: session.username,
    action: "NUMBER_ADD",
    targetType: "WhatsAppNumber",
    targetId: created.id,
    detail: `Menambahkan nomor ${created.number}`,
    sessionId: session.sid,
    request,
  });

  return NextResponse.json({ item: created }, { status: 201 });
}
