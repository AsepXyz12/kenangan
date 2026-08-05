import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/auth";
import { permissions } from "@/lib/rbac";

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!permissions.canViewStatistics(session.role)) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  const today = startOfDay(new Date());
  const last14Start = new Date(today);
  last14Start.setDate(last14Start.getDate() - 13);
  const last6MonthsStart = new Date(today);
  last6MonthsStart.setMonth(last6MonthsStart.getMonth() - 5);
  last6MonthsStart.setDate(1);

  const [
    totalNumbers,
    activeNumbers,
    totalUsers,
    totalManagers,
    totalStaff,
    todayAdds,
    recentActivity,
    numbersLast14Days,
    logsLast14Days,
    topContributorsRaw,
  ] = await Promise.all([
    prisma.whatsAppNumber.count(),
    prisma.whatsAppNumber.count({ where: { status: "ACTIVE" } }),
    prisma.user.count(),
    prisma.user.count({ where: { role: "MANAGER" } }),
    prisma.user.count({ where: { role: "STAFF" } }),
    prisma.whatsAppNumber.count({ where: { createdAt: { gte: today } } }),
    prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
    prisma.whatsAppNumber.findMany({
      where: { createdAt: { gte: last14Start } },
      select: { createdAt: true },
    }),
    prisma.auditLog.findMany({
      where: { createdAt: { gte: last14Start }, action: "NUMBER_DELETE" },
      select: { createdAt: true },
    }),
    prisma.whatsAppNumber.groupBy({
      by: ["addedById"],
      _count: { addedById: true },
      orderBy: { _count: { addedById: "desc" } },
      take: 5,
    }),
  ]);

  // Build a 14-day daily chart of adds vs deletes
  const dayBuckets: Record<string, { date: string; adds: number; deletes: number }> = {};
  for (let i = 0; i < 14; i++) {
    const d = new Date(last14Start);
    d.setDate(d.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    dayBuckets[key] = { date: key, adds: 0, deletes: 0 };
  }
  for (const n of numbersLast14Days) {
    const key = n.createdAt.toISOString().slice(0, 10);
    if (dayBuckets[key]) dayBuckets[key].adds++;
  }
  for (const l of logsLast14Days) {
    const key = l.createdAt.toISOString().slice(0, 10);
    if (dayBuckets[key]) dayBuckets[key].deletes++;
  }

  const todayDeletes = await prisma.auditLog.count({
    where: { action: "NUMBER_DELETE", createdAt: { gte: today } },
  });

  const contributorIds = topContributorsRaw.map((c) => c.addedById);
  const contributorUsers = await prisma.user.findMany({
    where: { id: { in: contributorIds } },
    select: { id: true, username: true, displayName: true },
  });
  const topContributors = topContributorsRaw.map((c) => {
    const u = contributorUsers.find((x) => x.id === c.addedById);
    return { username: u?.username || "unknown", displayName: u?.displayName || "Unknown", count: c._count.addedById };
  });

  return NextResponse.json({
    cards: {
      totalNumbers,
      activeNumbers,
      inactiveNumbers: totalNumbers - activeNumbers,
      totalUsers,
      totalManagers,
      totalStaff,
      todayAdds,
      todayDeletes,
    },
    dailyChart: Object.values(dayBuckets),
    recentActivity,
    topContributors,
  });
}
