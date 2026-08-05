"use client";

import { useState } from "react";
import type { Role } from "@prisma/client";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

export function DashboardShell({
  role,
  displayName,
  username,
  children,
}: {
  role: Role;
  displayName: string;
  username: string;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          displayName={displayName}
          username={username}
          role={role}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
