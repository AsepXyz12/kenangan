import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    select: { displayName: true, username: true, role: true, status: true },
  });

  if (!user || user.status !== "ACTIVE") redirect("/login");

  return (
    <DashboardShell role={user.role} displayName={user.displayName} username={user.username}>
      {children}
    </DashboardShell>
  );
}
