import { z } from "zod";

/** Strips characters commonly used in stored-XSS payloads from free-text fields. */
export function sanitizeText(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim();
}

export const loginSchema = z.object({
  username: z.string().min(3).max(64),
  password: z.string().min(6).max(200),
  remember: z.boolean().optional().default(false),
});

export const numberCreateSchema = z.object({
  number: z
    .string()
    .min(8)
    .max(20)
    .regex(/^\+?[0-9]{8,20}$/, "Nomor harus berupa angka (boleh diawali +)"),
  name: z.string().min(1).max(120),
  note: z.string().max(500).optional().default(""),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional().default("ACTIVE"),
});

export const numberUpdateSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  note: z.string().max(500).optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export const userCreateSchema = z.object({
  username: z.string().min(3).max(64).regex(/^[a-zA-Z0-9_.-]+$/, "Username tidak valid"),
  password: z.string().min(8).max(200),
  displayName: z.string().min(1).max(120),
  // Which of these an actor may actually assign is enforced in the route
  // handler via assignableRoles(session.role) — OWNER_UTAMA is intentionally
  // excluded here since it's a singleton seeded account, never created via API.
  role: z.enum(["OWNER_KEDUA", "OWNER", "MANAGER", "STAFF"]),
});

export const userUpdateSchema = z.object({
  displayName: z.string().min(1).max(120).optional(),
  // OWNER_UTAMA excluded — that account stays locked from role changes via this endpoint.
  // Whether the acting user may actually set a given role is enforced in the route handler.
  role: z.enum(["OWNER_KEDUA", "OWNER", "MANAGER", "STAFF"]).optional(),
  status: z.enum(["ACTIVE", "SUSPENDED"]).optional(),
});

export const passwordResetSchema = z.object({
  newPassword: z.string().min(8).max(200),
});
