"use client";

import ErrorState from "@/components/ErrorState";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorState reset={reset} pesan="Halaman Iqro ini gagal dimuat. Coba muat ulang, atau pindah ke jilid lain dulu." />;
}
