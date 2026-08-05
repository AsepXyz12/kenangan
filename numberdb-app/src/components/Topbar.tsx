"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, LogOut, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";

const ROLE_LABEL: Record<string, string> = {
  OWNER_UTAMA: "Owner Utama",
  OWNER_KEDUA: "Owner Kedua",
  OWNER: "Owner",
  MANAGER: "Database Manager",
  STAFF: "Database Staff",
};

const ROLE_TONE: Record<string, "info" | "success" | "neutral"> = {
  OWNER_UTAMA: "info",
  OWNER_KEDUA: "info",
  OWNER: "info",
  MANAGER: "success",
  STAFF: "neutral",
};

export function Topbar({
  displayName,
  username,
  role,
  onMenuClick,
}: {
  displayName: string;
  username: string;
  role: string;
  onMenuClick: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { push } = useToast();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    push("info", "Kamu telah logout.");
    router.push("/login");
    router.refresh();
  }

  const initials = displayName
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="glass sticky top-0 z-30 flex items-center justify-between border-b border-white/10 px-4 py-3.5 sm:px-6">
      <button onClick={onMenuClick} className="text-slate-300 hover:text-white lg:hidden" aria-label="Buka menu">
        <Menu className="h-6 w-6" />
      </button>
      <div className="hidden lg:block" />

      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-white/5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-violet text-xs font-bold text-base-950">
            {initials}
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium leading-none text-slate-100">{displayName}</p>
            <p className="mt-1 text-xs text-slate-500">@{username}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="glass-strong absolute right-0 mt-2 w-56 rounded-xl p-2 shadow-glass"
            >
              <div className="px-3 py-2">
                <Badge tone={ROLE_TONE[role] || "neutral"}>{ROLE_LABEL[role] || role}</Badge>
              </div>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-neon-pink hover:bg-neon-pink/10"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
