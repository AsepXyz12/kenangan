"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gagal masuk");
      }
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-sm space-y-3">
      <input
        type="password"
        placeholder="Password admin"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full text-sm border border-emerald/20 px-3 py-2 bg-white"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="font-stamp text-xs uppercase tracking-wide bg-emerald text-parchment px-4 py-2 hover:bg-emerald-light transition-colors disabled:opacity-50"
      >
        {loading ? "Memeriksa..." : "Masuk"}
      </button>
      {error && <p className="text-xs text-clay">{error}</p>}
    </form>
  );
}
