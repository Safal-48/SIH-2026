/**
 * Vaidya Setu - Role-Based Access Control (RBAC) Architecture
 * Implements strict principle-of-least-privilege permissions across all 5 stakeholder tiers.
 */

import { UserRole } from "@/types/roles";

export type Permission =
  | "PROFILE_READ"
  | "PROFILE_WRITE"
  | "DOCUMENT_UPLOAD"
  | "DOCUMENT_DELETE"
  | "DOCUMENT_VERIFY"
  | "LOGBOOK_ATTEST"
  | "COMPETENCY_EVALUATE"
  | "OPPORTUNITY_CREATE"
  | "OPPORTUNITY_APPLY"
  | "APPLICANT_REVIEW"
  | "INSTITUTION_MOU_MANAGE"
  | "AUDIT_LOG_VIEW"
  | "NATIONAL_ANALYTICS_VIEW"
  | "SYSTEM_ADMIN";

export interface RolePermissionConfig {
  role: UserRole;
  description: string;
  permissions: readonly Permission[];
}

/**
 * Master Role-Permission Matrix
 */
export const ROLE_PERMISSIONS: Record<UserRole, readonly Permission[]> = {
  STUDENT: [
    "PROFILE_READ",
    "PROFILE_WRITE",
    "DOCUMENT_UPLOAD",
    "DOCUMENT_DELETE",
    "OPPORTUNITY_APPLY",
  ],
  ACADEMICIAN: [
    "PROFILE_READ",
    "PROFILE_WRITE",
    "DOCUMENT_VERIFY",
    "LOGBOOK_ATTEST",
    "COMPETENCY_EVALUATE",
  ],
  INDUSTRY: [
    "PROFILE_READ",
    "OPPORTUNITY_CREATE",
    "APPLICANT_REVIEW",
  ],
  INSTITUTION: [
    "PROFILE_READ",
    "PROFILE_WRITE",
    "DOCUMENT_VERIFY",
    "INSTITUTION_MOU_MANAGE",
    "COMPETENCY_EVALUATE",
  ],
  ADMIN: [
    "PROFILE_READ",
    "PROFILE_WRITE",
    "DOCUMENT_UPLOAD",
    "DOCUMENT_DELETE",
    "DOCUMENT_VERIFY",
    "LOGBOOK_ATTEST",
    "COMPETENCY_EVALUATE",
    "OPPORTUNITY_CREATE",
    "OPPORTUNITY_APPLY",
    "APPLICANT_REVIEW",
    "INSTITUTION_MOU_MANAGE",
    "AUDIT_LOG_VIEW",
    "NATIONAL_ANALYTICS_VIEW",
    "SYSTEM_ADMIN",
  ],
};

/**
 * Checks whether a given role holds a specific permission.
 */
export function hasPermission(role: UserRole | null | undefined, permission: Permission): boolean {
  if (!role) return false;
  const perms = ROLE_PERMISSIONS[role];
  return perms ? perms.includes(permission) : false;
}

/**
 * Throws an authorization error if the role does not have the specified permission.
 */
export function assertPermission(role: UserRole | null | undefined, permission: Permission): void {
  if (!hasPermission(role, permission)) {
    throw new Error(`Access Denied: Role '${role || "ANONYMOUS"}' lacks required permission '${permission}'`);
  }
}

/**
 * Returns list of roles that hold a particular permission.
 */
export function getAllowedRolesForPermission(permission: Permission): UserRole[] {
  const roles: UserRole[] = ["STUDENT", "ACADEMICIAN", "INDUSTRY", "INSTITUTION", "ADMIN"];
  return roles.filter((r) => ROLE_PERMISSIONS[r].includes(permission));
}
