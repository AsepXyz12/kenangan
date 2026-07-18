import { NextResponse } from "next/server";
import { handleUpload } from "@vercel/blob/client";
import { isAdminAuthed } from "@/lib/auth";

// Endpoint ini TIDAK menerima file secara langsung. Endpoint ini hanya
// menerbitkan "izin unggah" (token) supaya browser admin bisa mengirim foto
// LANGSUNG ke Vercel Blob, tanpa lewat server function kita — sehingga foto
// besar (5-15MB dari HP) tidak terbentur batas ~4.5MB milik server function.

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
            "image/*",
            "video/*",
            "audio/*",
            "application/pdf",
          ],
          addRandomSuffix: true,
          maximumSizeInBytes: 500 * 1024 * 1024, // 500 MB, cukup buat video HP
          tokenPayload: JSON.stringify({}),
        };
      },
      onUploadCompleted: async () => {
        // Metadata foto (judul, tanggal, dll) baru disimpan setelah client
        // memanggil POST /api/photos dengan URL blob yang sudah jadi.
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
