import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import type { Role } from "@prisma/client";

const SESSION_COOKIE = "asepxyz_session";

function getSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "JWT_SECRET is missing or too short. Set a strong random value in your environment variables."
    );
  }
  return new TextEncoder().encode(secret);
}

export interface SessionPayload {
  sub: string; // user id
  username: string;
  role: Role;
  sid: string; // session id, for audit correlation + per-session invalidation
  [key: string]: unknown;
}

const DEFAULT_MAX_AGE = Number(process.env.SESSION_MAX_AGE || 28800); // 8h
const REMEMBER_MAX_AGE = Number(process.env.SESSION_REMEMBER_MAX_AGE || 2592000); // 30d

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export async function createSessionToken(
  payload: Omit<SessionPayload, "sid">,
  remember: boolean
): Promise<{ token: string; sessionId: string; maxAge: number }> {
  const sessionId = crypto.randomUUID();
  const maxAge = remember ? REMEMBER_MAX_AGE : DEFAULT_MAX_AGE;

  const token = await new SignJWT({ ...payload, sid: sessionId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + maxAge)
    .sign(getSecretKey());

  return { token, sessionId, maxAge };
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/** Set the session cookie (httpOnly, secure, sameSite=lax). */
export function setSessionCookie(token: string, maxAge: number) {
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

export function clearSessionCookie() {
  cookies().set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function getSessionCookieName() {
  return SESSION_COOKIE;
}

/** Read + verify the current session from the request cookies (Server Components / Route Handlers). */
export async function getCurrentSession(): Promise<SessionPayload | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

/** Role hierarchy: OWNER_UTAMA > OWNER_KEDUA > OWNER > MANAGER > STAFF */
const ROLE_RANK: Record<Role, number> = {
  OWNER_UTAMA: 4,
  OWNER_KEDUA: 3,
  OWNER: 2,
  MANAGER: 1,
  STAFF: 0,
};

export function roleAtLeast(role: Role, min: Role): boolean {
  return ROLE_RANK[role] >= ROLE_RANK[min];
}
