import { NextResponse } from "next/server";
import { readPhotos } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const photos = await readPhotos();
  photos.sort((a, b) => (a.eventDate < b.eventDate ? 1 : -1));
  return NextResponse.json({ photos });
}
