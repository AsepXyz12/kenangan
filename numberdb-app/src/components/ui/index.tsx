"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

export function Card({
  children,
  className = "",
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`glass rounded-2xl p-5 shadow-glass transition-all duration-300 ${
        hover ? "hover:-translate-y-1 hover:border-neon-cyan/30 hover:shadow-glow" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  icon,
  accent = "cyan",
  delay = 0,
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
  accent?: "cyan" | "violet" | "pink" | "amber";
  delay?: number;
}) {
  const accentClass = {
    cyan: "text-neon-cyan bg-neon-cyan/10",
    violet: "text-neon-violet bg-neon-violet/10",
    pink: "text-neon-pink bg-neon-pink/10",
    amber: "text-neon-amber bg-neon-amber/10",
  }[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
    >
      <Card hover>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
            <p className="mt-2 font-display text-2xl font-bold text-white">{value}</p>
          </div>
          <div className={`rounded-xl p-3 ${accentClass}`}>{icon}</div>
        </div>
      </Card>
    </motion.div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-lg ${className}`} />;
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "info" | "danger";
}) {
  const toneClass = {
    neutral: "bg-white/8 text-slate-300 border-white/10",
    success: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30",
    warning: "bg-neon-amber/10 text-neon-amber border-neon-amber/30",
    info: "bg-neon-violet/10 text-neon-violet border-neon-violet/30",
    danger: "bg-neon-pink/10 text-neon-pink border-neon-pink/30",
  }[tone];
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${toneClass}`}>
      {children}
    </span>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-base-950/70 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass-strong relative w-full max-w-lg rounded-2xl p-6 shadow-glass"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose} aria-label="Tutup" className="text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
