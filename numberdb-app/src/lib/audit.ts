import { prisma } from "./prisma";
import type { NextRequest } from "next/server";

export type AuditAction =
  | "LOGIN"
  | "LOGIN_FAILED"
  | "LOGOUT"
  | "NUMBER_ADD"
  | "NUMBER_EDIT"
  | "NUMBER_DELETE"
  | "DATABASE_EXPORT"
  | "DATABASE_IMPORT"
  | "DATABASE_RESTORE"
  | "DATABASE_BACKUP"
  | "PASSWORD_CHANGE"
  | "ROLE_CHANGE"
  | "USER_CREATE"
  | "USER_EDIT"
  | "USER_DELETE"
  | "USER_SUSPEND"
  | "USER_ACTIVATE"
  | "SETTINGS_UPDATE";

interface LogParams {
  userId?: string | null;
  username: string;
  action: AuditAction;
  targetType?: string;
  targetId?: string;
  detail?: string;
  status?: "SUCCESS" | "FAILED";
  request?: NextRequest;
  sessionId?: string;
}

/** Extract client IP from standard proxy headers (Vercel sets x-forwarded-for). */
function extractIp(request?: NextRequest): string | undefined {
  if (!request) return undefined;
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || undefined;
}

export async function logActivity(params: LogParams) {
  const { userId, username, action, targetType, targetId, detail, status, request, sessionId } =
    params;

  try {
    await prisma.auditLog.create({
      data: {
        userId: userId ?? null,
        username,
        action,
        targetType,
        targetId,
        detail,
        status: status ?? "SUCCESS",
        ipAddress: extractIp(request),
        userAgent: request?.headers.get("user-agent") ?? undefined,
        sessionId,
      },
    });
  } catch (err) {
    // Audit logging must never break the primary request flow.
    console.error("Failed to write audit log:", err);
  }
}
