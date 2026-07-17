import { NextResponse } from "next/server";
import { handleUpload } from "@vercel/blob/client";
import { isAdminAuthed } from "@/lib/auth";

// Endpoint ini TIDAK menerima file secara langsung. Endpoint ini hanya
// menerbitkan "izin unggah" (token) supaya browser admin bisa mengirim foto
// LANGSUNG ke Vercel Blob, tanpa lewat server function kita.
//
// Kenapa ini penting untuk "support semua ukuran foto"?
// Vercel membatasi body request yang masuk ke server function (route API
// biasa) maksimal ~4.5MB. Foto dari HP zaman sekarang sering 5-15MB, jadi
// kalau upload lewat server function biasa, foto besar akan GAGAL diunggah.
// Dengan client upload token seperti ini, batas 4.5MB itu tidak berlaku lagi
// karena file dikirim langsung dari browser ke Blob storage. Batas ukuran di
// bawah (maximumSizeInBytes) yang jadi acuan baru.

export async function POST(request) {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        if (!isAdminAuthed()) {
          throw new Error("Tidak diizinkan. Silakan login admin dulu.");
        }
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "image/heic",
            "image/heif",
            "image/avif",
            "image/*",
          ],
          addRandomSuffix: true,
          // Naikkan/kecilkan sesuai kebutuhan. 100MB sudah lebih dari cukup
          // untuk foto/scan resolusi tinggi sekalipun.
          maximumSizeInBytes: 100 * 1024 * 1024, // 100 MB
          tokenPayload: JSON.stringify({}),
        };
      },
      onUploadCompleted: async () => {
        // Tidak perlu melakukan apa pun di sini. Data foto (judul, tanggal,
        // dll) baru disimpan setelah client memanggil POST /api/photos
        // dengan URL blob yang sudah jadi.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Gagal membuat token unggah" },
      { status: 400 }
    );
  }
}
