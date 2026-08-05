"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Phone, Users, ShieldCheck, UserCog, PlusCircle, MinusCircle, Trophy, Activity } from "lucide-react";
import { StatCard, Card, Skeleton, Badge } from "@/components/ui";

interface AnalyticsData {
  cards: {
    totalNumbers: number;
    activeNumbers: number;
    inactiveNumbers: number;
    totalUsers: number;
    totalManagers: number;
    totalStaff: number;
    todayAdds: number;
    todayDeletes: number;
  };
  dailyChart: { date: string; adds: number; deletes: number }[];
  recentActivity: { id: string; username: string; action: string; detail: string | null; createdAt: string }[];
  topContributors: { username: string; displayName: string; count: number }[];
}

interface BasicStats {
  totalNumbers: number;
  activeToday: number;
}

export default function DashboardHome() {
  const [role, setRole] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [basicCount, setBasicCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const meRes = await fetch("/api/auth/me");
      const me = await meRes.json();
      setRole(me.user?.role || null);

      const ownerTier = ["OWNER_UTAMA", "OWNER_KEDUA", "OWNER"];
      if (me.user?.role === "MANAGER" || ownerTier.includes(me.user?.role)) {
        const res = await fetch("/api/analytics");
        if (res.ok) setAnalytics(await res.json());
      } else {
        const res = await fetch("/api/numbers?page=1&pageSize=1");
        if (res.ok) {
          const data = await res.json();
          setBasicCount(data.pagination.total);
        }
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
    );
  }

  if (role === "STAFF") {
    return (
      <div>
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display text-2xl font-bold text-white">
          Selamat datang kembali 👋
        </motion.h1>
        <p className="mt-1 text-sm text-slate-400">Ringkasan database nomor WhatsApp Bot.</p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StatCard label="Total Nomor di Database" value={basicCount ?? 0} icon={<Phone className="h-5 w-5" />} accent="cyan" />
          <Card>
            <p className="text-sm text-slate-300">
              Kamu login sebagai <strong className="text-white">Database Staff</strong>. Kamu bisa menambah nomor baru,
              mencari, dan mengelola catatan pada nomor yang kamu tambahkan sendiri lewat menu{" "}
              <span className="text-neon-cyan">Database Nomor</span>.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  if (!analytics) return null;
  const { cards, dailyChart, recentActivity, topContributors } = analytics;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">Ringkasan aktivitas dan statistik database.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Number" value={cards.totalNumbers} icon={<Phone className="h-5 w-5" />} accent="cyan" delay={0} />
        <StatCard label="Total User" value={cards.totalUsers} icon={<Users className="h-5 w-5" />} accent="violet" delay={0.05} />
        <StatCard label="Total Manager" value={cards.totalManagers} icon={<ShieldCheck className="h-5 w-5" />} accent="pink" delay={0.1} />
        <StatCard label="Total Staff" value={cards.totalStaff} icon={<UserCog className="h-5 w-5" />} accent="amber" delay={0.15} />
        <StatCard label="Today's Add" value={cards.todayAdds} icon={<PlusCircle className="h-5 w-5" />} accent="cyan" delay={0.2} />
        <StatCard label="Today's Delete" value={cards.todayDeletes} icon={<MinusCircle className="h-5 w-5" />} accent="pink" delay={0.25} />
        <StatCard label="Nomor Aktif" value={cards.activeNumbers} icon={<Activity className="h-5 w-5" />} accent="violet" delay={0.3} />
        <StatCard label="Nomor Nonaktif" value={cards.inactiveNumbers} icon={<Activity className="h-5 w-5" />} accent="amber" delay={0.35} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="mb-4 font-display text-base font-semibold text-white">Aktivitas 14 Hari Terakhir</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={dailyChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#8b93b0", fontSize: 11 }}
                tickFormatter={(v) => v.slice(5)}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              />
              <YAxis tick={{ fill: "#8b93b0", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  background: "#0e1220",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
              <Line type="monotone" dataKey="adds" name="Ditambahkan" stroke="#38f2e0" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="deletes" name="Dihapus" stroke="#ff5fa2" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-white">
            <Trophy className="h-4 w-4 text-neon-amber" /> Top Contributor
          </h2>
          <div className="space-y-3">
            {topContributors.length === 0 && <p className="text-sm text-slate-500">Belum ada data.</p>}
            {topContributors.map((c, i) => (
              <div key={c.username} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-xs font-semibold text-slate-300">
                    {i + 1}
                  </span>
                  <span className="text-sm text-slate-200">{c.displayName}</span>
                </div>
                <Badge tone="success">{c.count} nomor</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="mb-4 font-display text-base font-semibold text-white">Recent Activity</h2>
        <div className="space-y-2">
          {recentActivity.map((log) => (
            <div key={log.id} className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-white/[0.03]">
              <div>
                <p className="text-sm text-slate-200">
                  <span className="font-medium text-white">{log.username}</span> — {log.detail || log.action}
                </p>
              </div>
              <span className="text-xs text-slate-500">{new Date(log.createdAt).toLocaleString("id-ID")}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
