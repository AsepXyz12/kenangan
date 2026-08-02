"use client";

// PENTING: file ini nangkep error yang terjadi di ROOT LAYOUT itu sendiri
// (mis. salah satu Provider di layout.tsx crash) -- kasus yang sebelumnya
// TIDAK punya jalan keluar sama sekali, karena error.tsx biasa cuma
// membungkus children DI DALAM layout, jadi kalau layout-nya sendiri yang
// rusak, error.tsx pun ikut tidak pernah ke-render.
//
// Next.js mewajibkan global-error.tsx punya <html>/<body> sendiri (karena
// dia menggantikan root layout sepenuhnya saat aktif). Sengaja SEDERHANA
// dan TIDAK import Navbar/Provider/komponen app lain -- kalau penyebab
// crash-nya ada di salah satu dari itu, meng-import ulang di sini cuma
// bikin halaman ini ikut crash juga. resetTotal() dari lib/reset-total juga
// sengaja dependency-free (fetch API browser bawaan saja), jadi aman dipakai
// di sini.
import { useState } from "react";
import { resetTotal } from "@/lib/reset-total";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [memperbaiki, setMemperbaiki] = useState(false);

  const handlePerbaikiTotal = () => {
    setMemperbaiki(true);
    resetTotal();
  };

  return (
    <html lang="id">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          background: "#f5efe3",
          color: "#2b2b28",
        }}
      >
        <div style={{ maxWidth: 380, textAlign: "center" }}>
          <p style={{ fontSize: 40, color: "#b8860b", marginBottom: 8 }} dir="rtl">
            عَفْوًا
          </p>
          <h1 style={{ fontSize: 20, marginBottom: 8, fontWeight: 700 }}>
            Aplikasi mengalami masalah
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "#5c574d",
              lineHeight: 1.6,
              marginBottom: 20,
            }}
          >
            Ada bagian dari aplikasi yang gagal dimuat dengan sempurna. Ini
            biasanya karena versi lama yang tersimpan di HP kamu bentrok
            dengan versi terbaru. Pencet tombol di bawah — ini otomatis
            membersihkan semuanya dan memuat ulang dari awal.
          </p>
          <button
            onClick={handlePerbaikiTotal}
            disabled={memperbaiki}
            style={{
              width: "100%",
              padding: "14px 20px",
              borderRadius: 999,
              border: "none",
              background: "#0f6c66",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              opacity: memperbaiki ? 0.7 : 1,
              marginBottom: 10,
            }}
          >
            {memperbaiki ? "Sedang memperbaiki..." : "Perbaiki & Muat Ulang"}
          </button>
          <p style={{ fontSize: 12, color: "#8a8477", marginBottom: 18 }}>
            Aman dipencet, tidak menghapus data bacaan/progress kamu.
          </p>
          <button
            onClick={() => reset()}
            style={{
              background: "none",
              border: "none",
              color: "#5c574d",
              fontSize: 13,
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Coba cara yang lebih ringan dulu
          </button>
        </div>
      </body>
    </html>
  );
}
