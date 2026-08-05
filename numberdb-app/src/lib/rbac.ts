import type { Role } from "@prisma/client";

/**
 * Centralized permission map. Every route/handler should check permissions
 * through these helpers rather than comparing role strings ad hoc, so the
 * rules stay in one place and are easy to audit.
 */

/** Numeric rank for hierarchy comparisons. Higher = more privileged. */
export const ROLE_RANK: Record<Role, number> = {
  OWNER_UTAMA: 4,
  OWNER_KEDUA: 3,
  OWNER: 2,
  MANAGER: 1,
  STAFF: 0,
};

/** True for any of the three owner-tier roles (full admin-level access). */
export function isOwnerTier(role: Role): boolean {
  return role === "OWNER_UTAMA" || role === "OWNER_KEDUA" || role === "OWNER";
}

/**
 * Which roles a given actor is allowed to ASSIGN — either when creating a
 * new user, or when changing an existing user's role.
 *
 *   OWNER_UTAMA -> OWNER_KEDUA, OWNER, MANAGER, STAFF
 *   OWNER_KEDUA -> OWNER, MANAGER, STAFF               (cannot make more OWNER_KEDUA)
 *   OWNER       -> MANAGER, STAFF                      (cannot make any Owner)
 *   MANAGER/STAFF -> nothing
 */
export function assignableRoles(actorRole: Role): Role[] {
  switch (actorRole) {
    case "OWNER_UTAMA":
      return ["OWNER_KEDUA", "OWNER", "MANAGER", "STAFF"];
    case "OWNER_KEDUA":
      return ["OWNER", "MANAGER", "STAFF"];
    case "OWNER":
      return ["MANAGER", "STAFF"];
    default:
      return [];
  }
}

/**
 * Whether `actorRole` is allowed to manage (edit role/status, reset password,
 * suspend, delete) a user currently holding `targetRole`. OWNER_UTAMA is
 * always locked/untouchable and handled separately by callers.
 */
export function canManageTargetRole(actorRole: Role, targetRole: Role): boolean {
  if (targetRole === "OWNER_UTAMA") return false;
  return ROLE_RANK[actorRole] > ROLE_RANK[targetRole];
}

export const permissions = {
  canAddNumber: (role: Role) => true, // all logged-in roles
  canEditOwnNote: (role: Role) => true,
  canDeleteOwnNumber: (role: Role) => true,
  canDeleteAnyNumber: (role: Role) => role === "MANAGER" || isOwnerTier(role),
  canEditAnyNumber: (role: Role) => role === "MANAGER" || isOwnerTier(role),
  canViewAllLogs: (role: Role) => role === "MANAGER" || isOwnerTier(role),
  canExportDatabase: (role: Role) => role === "MANAGER" || isOwnerTier(role),
  canImportDatabase: (role: Role) => role === "MANAGER" || isOwnerTier(role),
  canRestoreDatabase: (role: Role) => isOwnerTier(role),
  canViewStatistics: (role: Role) => role === "MANAGER" || isOwnerTier(role),
  canManageUsers: (role: Role) => isOwnerTier(role),
  canManageRoles: (role: Role) => isOwnerTier(role),
  canManageSettings: (role: Role) => isOwnerTier(role),
  canViewAdminPages: (role: Role) => role === "MANAGER" || isOwnerTier(role),
};

export function isOwnerAccount(username: string) {
  return username.toLowerCase() === (process.env.OWNER_USERNAME || "asepxyz").toLowerCase();
}
