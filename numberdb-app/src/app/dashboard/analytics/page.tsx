"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { Card, Skeleton, StatCard } from "@/components/ui";
import { Phone, Users, TrendingUp } from "lucide-react";

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
  topContributors: { username: string; displayName: string; count: number }[];
}

const PIE_COLORS = ["#38f2e0", "#8b6bff", "#ff5fa2"];

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/analytics");
      if (res.ok) setData(await res.json());
    })();
  }, []);

  if (!data) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </div>
    );
  }

  const statusPie = [
    { name: "Aktif", value: data.cards.activeNumbers },
    { name: "Tidak Aktif", value: data.cards.inactiveNumbers },
  ];

  const rolePie = [
    { name: "Owner", value: 1 },
    { name: "Manager", value: data.cards.totalManagers },
    { name: "Staff", value: data.cards.totalStaff },
  ];

  const contributorBar = data.topContributors.map((c) => ({ name: c.displayName, total: c.count }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Analytics</h1>
        <p className="mt-1 text-sm text-slate-400">Statistik mendalam tentang database dan aktivitas pengguna.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Nomor" value={data.cards.totalNumbers} icon={<Phone className="h-5 w-5" />} accent="cyan" />
        <StatCard label="Total User" value={data.cards.totalUsers} icon={<Users className="h-5 w-5" />} accent="violet" />
        <StatCard label="Penambahan Hari Ini" value={data.cards.todayAdds} icon={<TrendingUp className="h-5 w-5" />} accent="pink" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 font-display text-base font-semibold text-white">Chart Daily (Add vs Delete)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data.dailyChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="date" tick={{ fill: "#8b93b0", fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
              <YAxis tick={{ fill: "#8b93b0", fontSize: 11 }} allowDecimals={false} />
              <Tooltip contentStyle={{ background: "#0e1220", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="adds" name="Ditambahkan" stroke="#38f2e0" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="deletes" name="Dihapus" stroke="#ff5fa2" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="mb-4 font-display text-base font-semibold text-white">Chart Number (Status)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={statusPie} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}>
                {statusPie.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} stroke="none" />
                ))}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 12, color: "#8b93b0" }} />
              <Tooltip contentStyle={{ background: "#0e1220", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="mb-4 font-display text-base font-semibold text-white">Chart User (Role Distribution)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={rolePie} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}>
                {rolePie.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} stroke="none" />
                ))}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 12, color: "#8b93b0" }} />
              <Tooltip contentStyle={{ background: "#0e1220", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="mb-4 font-display text-base font-semibold text-white">Chart Activity (Top Contributor)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={contributorBar}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" tick={{ fill: "#8b93b0", fontSize: 11 }} />
              <YAxis tick={{ fill: "#8b93b0", fontSize: 11 }} allowDecimals={false} />
              <Tooltip contentStyle={{ background: "#0e1220", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
              <Bar dataKey="total" fill="#8b6bff" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
