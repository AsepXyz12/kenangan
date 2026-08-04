import { NextRequest, NextResponse } from "next/server";
import { getKitabMeta, searchHaditsInKitab } from "@/lib/hadits-api";

// Search di SATU kitab hadits saja (scoped, bukan lintas kitab), dipanggil
// dari HaditsSearchBox.tsx di halaman /hadits/[kitab]. Server route dipakai
// (bukan filter langsung di client) karena isi kitab bisa sampai puluhan
// ribu hadits -- terlalu besar buat dikirim semua ke browser.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const kitab = searchParams.get("kitab") ?? "";
  const q = searchParams.get("q") ?? "";

  const meta = getKitabMeta(kitab);
  if (!meta) {
    return NextResponse.json({ error: "Kitab tidak ditemukan" }, { status: 404 });
  }

  if (!q.trim()) {
    return NextResponse.json({ items: [] });
  }

  const items = searchHaditsInKitab(kitab, q, 40);
  return NextResponse.json({ items });
}
