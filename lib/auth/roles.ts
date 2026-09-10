/**
 * Vaidya Setu - Role Guards and Authorization Utilities
 */

import { UserRole, ROLE_DEFINITIONS } from "@/types/roles";

export function isRoleAllowed(userRole: UserRole, targetRoute: string): boolean {
  if (userRole === "ADMIN") return true; // System Admin can inspect all views

  const config = ROLE_DEFINITIONS[userRole];
  if (!config) return false;

  return targetRoute.startsWith(config.baseRoute);
}

export function hasCapability(userRole: UserRole, capability: string): boolean {
  if (userRole === "ADMIN") return true;
  const config = ROLE_DEFINITIONS[userRole];
  return config?.allowedCapabilities.includes(capability) ?? false;
}

export function getRoleBadge(role: UserRole): string {
  return ROLE_DEFINITIONS[role]?.badge || role;
}
