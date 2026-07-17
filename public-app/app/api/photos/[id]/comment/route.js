import { NextResponse } from "next/server";
import { addComment } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req, { params }) {
  const body = await req.json().catch(() => ({}));
  const name = (body.name || "").toString().trim().slice(0, 60);
  const message = (body.message || "").toString().trim().slice(0, 500);

  if (!name || !message) {
    return NextResponse.json({ error: "Nama dan komentar wajib diisi" }, { status: 400 });
  }

  const comment = {
    id: crypto.randomUUID(),
    name,
    message,
    createdAt: new Date().toISOString(),
  };

  const photo = await addComment(params.id, comment);
  if (!photo) {
    return NextResponse.json({ error: "Foto tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ photo }, { status: 201 });
}
