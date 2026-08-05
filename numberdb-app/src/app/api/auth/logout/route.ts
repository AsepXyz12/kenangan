import { NextRequest, NextResponse } from "next/server";
import { getCurrentSession, clearSessionCookie } from "@/lib/auth";
import { logActivity } from "@/lib/audit";

export async function POST(request: NextRequest) {
  const session = await getCurrentSession();

  if (session) {
    await logActivity({
      userId: session.sub,
      username: session.username,
      action: "LOGOUT",
      sessionId: session.sid,
      request,
    });
  }

  clearSessionCookie();
  return NextResponse.json({ ok: true });
}
