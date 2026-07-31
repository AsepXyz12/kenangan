"use client";

import { useEffect, useState } from "react";

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);
  // Biar banner "kembali online" sempat kelihatan sebentar, bukan langsung
  // menghilang tiba-tiba.
  const [justReconnected, setJustReconnected] = useState(false);

  useEffect(() => {
    setIsOffline(!navigator.onLine);

    const handleOffline = () => {
      setIsOffline(true);
      setJustReconnected(false);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setJustReconnected(true);
      const timeout = setTimeout(() => setJustReconnected(false), 2500);
      return () => clearTimeout(timeout);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isOffline && !justReconnected) return null;

  return (
    <div
      role="status"
      className={`fixed top-0 inset-x-0 z-50 text-center text-sm py-1.5 font-medium transition-colors ${
        isOffline ? "bg-amber-600 text-white" : "bg-emerald-600 text-white"
      }`}
    >
      {isOffline
        ? "Kamu sedang offline — halaman yang sudah pernah dibuka tetap bisa dibaca"
        : "Koneksi tersambung lagi"}
    </div>
  );
}
