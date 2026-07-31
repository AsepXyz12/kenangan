"use client";

import { useEffect, useState } from "react";
import { Sparkle } from "lucide-react";
import { toHijri } from "@/lib/hijri";

type ClockZone = {
  label: string;
  tz: string;
};

const ZONES: ClockZone[] = [
  { label: "WIB", tz: "Asia/Jakarta" },
  { label: "WITA", tz: "Asia/Makassar" },
  { label: "WIT", tz: "Asia/Jayapura" },
  { label: "Makkah", tz: "Asia/Riyadh" },
];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

// Detik hingga tengah malam Jumat berikutnya, dihitung dari waktu WIB.
function getJumatCountdown(now: Date) {
  const wibString = now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
  const wib = new Date(wibString);
  const day = wib.getDay(); // 0=Minggu ... 5=Jumat ... 6=Sabtu

  const isJumat = day === 5;

  let daysUntil = (5 - day + 7) % 7;
  if (isJumat) daysUntil = 0;

  const target = new Date(wib);
  target.setHours(24 * daysUntil, 0, 0, 0);
  // Jika sudah Jumat tapi lewat tengah malam menuju Sabtu, target = 0 (hari ini berakhir tengah malam)
  if (isJumat) {
    target.setDate(wib.getDate() + 1);
    target.setHours(0, 0, 0, 0);
  }

  const diffMs = target.getTime() - wib.getTime();
  const totalSec = Math.max(0, Math.floor(diffMs / 1000));

  const hh = Math.floor(totalSec / 3600);
  const days = Math.floor(hh / 24);
  const hours = hh % 24;
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  return { isJumat, days, hours, minutes, seconds };
}

export default function LiveStrip() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    // Hindari mismatch hydration: render placeholder senyap di server.
    return (
      <section className="max-w-4xl mx-auto px-5 md:px-8 pb-10">
        <div className="ornament-border rounded-sm bg-[var(--parchment-deep)]/50 px-6 py-6 md:px-8 h-[140px]" />
      </section>
    );
  }

  const hijri = toHijri(now).label;
  const masehi = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  const { isJumat, days, hours, minutes, seconds } = getJumatCountdown(now);

  return (
    <section className="max-w-4xl mx-auto px-5 md:px-8 pb-10 animate-fade-up" style={{ animationDelay: "0.36s" }}>
      <div className="ornament-border rounded-sm bg-[var(--parchment-deep)]/50 px-6 py-6 md:px-8">
        <div className="relative flex items-center gap-2 mb-5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--gold)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--gold)]" />
          </span>
          <span className="text-xs tracking-[0.25em] uppercase text-[var(--gold)]">
            Live &middot; {masehi} M &middot; {hijri} H
          </span>
          <Sparkle
            size={12}
            className="text-[var(--gold-bright)] animate-twinkle"
            style={{ animationDelay: "0s" }}
            fill="currentColor"
          />
          <Sparkle
            size={9}
            className="text-[var(--gold)] animate-twinkle hidden sm:inline-block"
            style={{ animationDelay: "0.9s" }}
            fill="currentColor"
          />
          <Sparkle
            size={10}
            className="text-[var(--gold-bright)] animate-twinkle hidden md:inline-block"
            style={{ animationDelay: "1.6s" }}
            fill="currentColor"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {ZONES.map((z) => {
            const time = new Intl.DateTimeFormat("id-ID", {
              timeZone: z.tz,
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            }).format(now);
            return (
              <div key={z.tz} className="text-center">
                <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--ink-soft)] mb-1">
                  {z.label}
                </p>
                <p className="font-display text-lg md:text-xl text-[var(--ink)] tabular-nums">
                  {time}
                </p>
              </div>
            );
          })}
        </div>

        <div className="h-px bg-[var(--parchment-line)] mb-5" />

        <div className="text-center">
          {isJumat ? (
            <p className="font-display italic text-lg md:text-xl text-[var(--teal-deep)]">
              Selamat hari Jumat &mdash; perbanyak selawat dan baca Surat
              Al-Kahf hari ini.
            </p>
          ) : (
            <>
              <p className="text-xs tracking-[0.2em] uppercase text-[var(--ink-soft)] mb-2">
                Menuju hari Jumat (WIB)
              </p>
              <div className="flex items-center justify-center gap-3 md:gap-5 font-display text-2xl md:text-3xl text-[var(--teal-deep)] tabular-nums">
                <span>
                  {pad(days)}
                  <span className="block text-[10px] tracking-widest uppercase text-[var(--ink-soft)] font-body not-italic mt-1">
                    hari
                  </span>
                </span>
                <span className="text-[var(--gold)]">:</span>
                <span>
                  {pad(hours)}
                  <span className="block text-[10px] tracking-widest uppercase text-[var(--ink-soft)] font-body not-italic mt-1">
                    jam
                  </span>
                </span>
                <span className="text-[var(--gold)]">:</span>
                <span>
                  {pad(minutes)}
                  <span className="block text-[10px] tracking-widest uppercase text-[var(--ink-soft)] font-body not-italic mt-1">
                    menit
                  </span>
                </span>
                <span className="text-[var(--gold)]">:</span>
                <span>
                  {pad(seconds)}
                  <span className="block text-[10px] tracking-widest uppercase text-[var(--ink-soft)] font-body not-italic mt-1">
                    detik
                  </span>
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
