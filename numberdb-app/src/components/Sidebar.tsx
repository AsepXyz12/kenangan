"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Phone,
  ScrollText,
  Users,
  Settings,
  BarChart3,
  DatabaseBackup,
  ShieldCheck,
  X,
} from "lucide-react";
import type { Role } from "@prisma/client";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  minRole?: Role;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/numbers", label: "Database Nomor", icon: Phone },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3, minRole: "MANAGER" },
  { href: "/dashboard/logs", label: "Audit Log", icon: ScrollText, minRole: "MANAGER" },
  { href: "/dashboard/users", label: "Users", icon: Users, minRole: "OWNER" },
  { href: "/dashboard/backup", label: "Backup & Restore", icon: DatabaseBackup, minRole: "OWNER" },
  { href: "/dashboard/settings", label: "Settings", icon: Settings, minRole: "OWNER" },
];

const RANK: Record<Role, number> = {
  OWNER_UTAMA: 4,
  OWNER_KEDUA: 3,
  OWNER: 2,
  MANAGER: 1,
  STAFF: 0,
};

export function Sidebar({
  role,
  open,
  onClose,
}: {
  role: Role;
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const items = NAV_ITEMS.filter((item) => !item.minRole || RANK[role] >= RANK[item.minRole]);

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-base-950/70 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`glass-strong fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-neon-cyan to-neon-violet shadow-glow">
              <ShieldCheck className="h-5 w-5 text-base-950" />
            </div>
            <div>
              <p className="font-display text-sm font-bold leading-none text-white">AsepXyz</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">Number DB Manager</p>
            </div>
          </Link>
          <button onClick={onClose} className="text-slate-400 hover:text-white lg:hidden" aria-label="Tutup menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {items.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  active ? "text-white" : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-cyan/15 to-neon-violet/15 ring-1 ring-neon-cyan/30"
                  />
                )}
                <Icon className="relative z-10 h-4 w-4" />
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-6 py-4">
          <p className="text-[11px] text-slate-500">AsepXyz &copy; {new Date().getFullYear()}</p>
        </div>
      </aside>
    </>
  );
}
