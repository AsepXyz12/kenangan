"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { push } = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, remember }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login gagal.");
        push("error", data.error || "Login gagal.");
        return;
      }
      push("success", `Selamat datang, ${data.user.displayName}!`);
      router.push(params.get("next") || "/dashboard");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan jaringan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-neon-violet/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-neon-cyan/20 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-strong relative w-full max-w-md rounded-2xl p-8 shadow-glass"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-violet shadow-glow">
            <ShieldCheck className="h-7 w-7 text-base-950" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">AsepXyz</h1>
          <p className="mt-1 text-sm text-slate-400">Number Database Manager</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-[38px] h-4 w-4 text-slate-500" />
            <Input
              id="username"
              label="Username"
              autoComplete="username"
              placeholder="Masukkan username"
              className="pl-10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-[38px] h-4 w-4 text-slate-500" />
            <Input
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Masukkan password"
              className="pl-10 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              className="absolute right-3.5 top-[38px] text-slate-500 hover:text-slate-300"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-400">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-white/5 accent-[#38f2e0]"
            />
            Ingat saya selama 30 hari
          </label>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg border border-neon-pink/30 bg-neon-pink/10 px-3 py-2 text-sm text-neon-pink"
            >
              {error}
            </motion.p>
          )}

          <Button type="submit" loading={loading} className="w-full">
            Masuk
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Akses dikelola oleh Owner. Hubungi admin jika belum memiliki akun.
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
