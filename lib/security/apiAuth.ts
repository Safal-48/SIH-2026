/**
 * Vaidya Setu - API Authorization Guard
 * Enforces role-based assertions and session authentication across Next.js Route Handlers.
 */

import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "@/types/roles";
import { Permission, hasPermission } from "@/lib/auth/rbac";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  institutionId?: string;
}

export interface ApiAuthOptions {
  allowedRoles?: UserRole[];
  requiredPermission?: Permission;
}

export interface ApiAuthResult {
  isAuthenticated: boolean;
  user?: AuthenticatedUser;
  errorResponse?: NextResponse;
}

/**
 * Validates request authentication and RBAC permissions.
 */
export function authenticateApiRequest(
  request: NextRequest,
  options: ApiAuthOptions = {}
): ApiAuthResult {
  // 1. Inspect cookies & Authorization header
  const authCookie = request.cookies.get("vaidya_auth")?.value;
  const roleCookie = (request.cookies.get("vaidya_role")?.value as UserRole) || null;
  const userEmailCookie = request.cookies.get("vaidya_user_email")?.value;
  const userIdCookie = request.cookies.get("vaidya_user_id")?.value || "usr-current-session";

  // Check Bearer token as secondary transport
  const authHeader = request.headers.get("authorization");
  const isBearer = authHeader && authHeader.startsWith("Bearer ");

  const hasSession = authCookie === "true" || isBearer;

  if (!hasSession || !roleCookie) {
    return {
      isAuthenticated: false,
      errorResponse: NextResponse.json(
        {
          type: "https://vaidyasetu.gov.in/errors/unauthorized",
          title: "Unauthorized Access",
          status: 401,
          detail: "A valid authenticated session or API token is required to access this resource.",
        },
        { status: 401 }
      ),
    };
  }

  const currentUser: AuthenticatedUser = {
    id: userIdCookie,
    email: userEmailCookie || "scholar@vaidyasetu.gov.in",
    role: roleCookie,
    fullName: "Authenticated Ayush Stakeholder",
  };

  // 2. Role Restriction Check
  if (options.allowedRoles && options.allowedRoles.length > 0) {
    if (!options.allowedRoles.includes(currentUser.role)) {
      return {
        isAuthenticated: false,
        errorResponse: NextResponse.json(
          {
            type: "https://vaidyasetu.gov.in/errors/forbidden-role",
            title: "Forbidden Stakeholder Role",
            status: 403,
            detail: `Role '${currentUser.role}' is not authorized. Allowed: [${options.allowedRoles.join(", ")}]`,
          },
          { status: 403 }
        ),
      };
    }
  }

  // 3. Granular Permission Check
  if (options.requiredPermission) {
    if (!hasPermission(currentUser.role, options.requiredPermission)) {
      return {
        isAuthenticated: false,
        errorResponse: NextResponse.json(
          {
            type: "https://vaidyasetu.gov.in/errors/forbidden-permission",
            title: "Forbidden Permission",
            status: 403,
            detail: `Role '${currentUser.role}' lacks the required '${options.requiredPermission}' capability.`,
          },
          { status: 403 }
        ),
      };
    }
  }

  return {
    isAuthenticated: true,
    user: currentUser,
  };
}
