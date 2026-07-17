import { cookies } from "next/headers";

const COOKIE_NAME = "ma_admin_session";

export function isAdminAuthed() {
  const cookieStore = cookies();
  const val = cookieStore.get(COOKIE_NAME)?.value;
  return val === process.env.ADMIN_PASSWORD;
}

export function adminCookieOptions() {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
  };
}

export { COOKIE_NAME };
