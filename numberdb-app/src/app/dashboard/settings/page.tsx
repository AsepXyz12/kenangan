"use client";

import { useEffect, useState } from "react";
import { Settings as SettingsIcon, Save } from "lucide-react";
import { Card } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

export default function SettingsPage() {
  const { push } = useToast();
  const [siteName, setSiteName] = useState("");
  const [sessionTimeout, setSessionTimeout] = useState("480");
  const [rateLimitMax, setRateLimitMax] = useState("5");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setSiteName(data.settings.site_name);
        setSessionTimeout(data.settings.session_timeout_minutes);
        setRateLimitMax(data.settings.login_rate_limit_max);
      }
      setLoading(false);
    })();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        site_name: siteName,
        session_timeout_minutes: sessionTimeout,
        login_rate_limit_max: rateLimitMax,
      }),
    });
    setSaving(false);
    if (res.ok) {
      push("success", "Pengaturan berhasil disimpan.");
    } else {
      push("error", "Gagal menyimpan pengaturan.");
    }
  }

  if (loading) return null;

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Pengaturan Website</h1>
        <p className="mt-1 text-sm text-slate-400">Kelola konfigurasi umum, session, dan keamanan.</p>
      </div>

      <Card>
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-neon-violet/10 text-neon-violet">
          <SettingsIcon className="h-5 w-5" />
        </div>
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Nama Website" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
          <Input
            label="Session Timeout (menit)"
            type="number"
            min={5}
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(e.target.value)}
          />
          <Input
            label="Batas Percobaan Login per Menit"
            type="number"
            min={1}
            value={rateLimitMax}
            onChange={(e) => setRateLimitMax(e.target.value)}
          />
          <p className="text-xs text-slate-500">
            Catatan: perubahan session timeout dan rate limit login memerlukan variabel environment{" "}
            <code className="text-neon-cyan">SESSION_MAX_AGE</code> /{" "}
            <code className="text-neon-cyan">LOGIN_RATE_LIMIT_MAX</code> untuk diterapkan penuh pada deployment
            berikutnya.
          </p>
          <Button type="submit" loading={saving}>
            <Save className="h-4 w-4" /> Simpan Pengaturan
          </Button>
        </form>
      </Card>
    </div>
  );
}
