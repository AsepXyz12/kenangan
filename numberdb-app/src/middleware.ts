import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Edge-safe minimal verification (mirrors src/lib/auth.ts, kept separate
// because middleware runs on the Edge runtime and cannot import Prisma).
type EdgeRole = "OWNER_UTAMA" | "OWNER_KEDUA" | "OWNER" | "MANAGER" | "STAFF";

const OWNER_TIER: EdgeRole[] = ["OWNER_UTAMA", "OWNER_KEDUA", "OWNER"];

async function verifyEdgeToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload as { sub: string; username: string; role: EdgeRole };
  } catch {
    return null;
  }
}

const MANAGER_ONLY_PREFIXES = ["/dashboard/logs", "/dashboard/analytics"];
const OWNER_ONLY_PREFIXES = ["/dashboard/users", "/dashboard/settings", "/dashboard/backup"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isProtectedApi =
    pathname.startsWith("/api/numbers") ||
    pathname.startsWith("/api/users") ||
    pathname.startsWith("/api/logs") ||
    pathname.startsWith("/api/analytics") ||
    pathname.startsWith("/api/backup") ||
    pathname.startsWith("/api/settings");

  if (!isDashboardRoute && !isProtectedApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get("asepxyz_session")?.value;
  const session = token ? await verifyEdgeToken(token) : null;

  if (!session) {
    if (isProtectedApi) {
      return NextResponse.json({ error: "Sesi tidak valid, silakan login kembali." }, { status: 401 });
    }
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role gating for MANAGER+ pages
  if (MANAGER_ONLY_PREFIXES.some((p) => pathname.startsWith(p))) {
    if (session.role !== "MANAGER" && !OWNER_TIER.includes(session.role)) {
      return NextResponse.redirect(new URL("/dashboard?denied=1", request.url));
    }
  }

  // Role gating for owner-tier-only pages (OWNER_UTAMA, OWNER_KEDUA, OWNER)
  if (OWNER_ONLY_PREFIXES.some((p) => pathname.startsWith(p))) {
    if (!OWNER_TIER.includes(session.role)) {
      return NextResponse.redirect(new URL("/dashboard?denied=1", request.url));
    }
  }

  const response = NextResponse.next();
  response.headers.set("x-user-id", session.sub);
  response.headers.set("x-user-role", session.role);
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/numbers/:path*", "/api/users/:path*", "/api/logs/:path*", "/api/analytics/:path*", "/api/backup/:path*", "/api/settings/:path*"],
};
