import { NextResponse, type NextRequest } from "next/server";
import { UserRole, ROLE_DEFINITIONS } from "./types/roles";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Read session and role cookies
  const hasAuth = request.cookies.get("vaidya_auth")?.value === "true";
  const userRole = (request.cookies.get("vaidya_role")?.value as UserRole) || null;

  // 2. Protected Stakeholder Route Prefixes
  const protectedRoutes: { prefix: string; allowedRoles: UserRole[] }[] = [
    { prefix: "/student", allowedRoles: ["STUDENT", "ADMIN"] },
    { prefix: "/academician", allowedRoles: ["ACADEMICIAN", "ADMIN"] },
    { prefix: "/industry", allowedRoles: ["INDUSTRY", "ADMIN"] },
    { prefix: "/institution", allowedRoles: ["INSTITUTION", "ADMIN"] },
    { prefix: "/admin", allowedRoles: ["ADMIN"] },
  ];

  // Check if current route is protected
  const matchedProtection = protectedRoutes.find((r) =>
    pathname === r.prefix || pathname.startsWith(`${r.prefix}/`)
  );

  if (matchedProtection) {
    // Unauthenticated user -> redirect to login with return target
    if (!hasAuth || !userRole) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Authenticated user with mismatched role (e.g. STUDENT trying to open /industry or /admin)
    if (!matchedProtection.allowedRoles.includes(userRole)) {
      const authorizedBase = ROLE_DEFINITIONS[userRole]?.baseRoute || "/student";
      const redirectUrl = new URL(authorizedBase, request.url);
      redirectUrl.searchParams.set("error", "unauthorized_role_access");
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 3. Prevent logged-in users from seeing /login or /register again
  const authOnlyRoutes = ["/login", "/register", "/role-selection"];
  if (hasAuth && userRole && authOnlyRoutes.includes(pathname)) {
    const userBase = ROLE_DEFINITIONS[userRole]?.baseRoute || "/student";
    return NextResponse.redirect(new URL(userBase, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student/:path*",
    "/academician/:path*",
    "/industry/:path*",
    "/institution/:path*",
    "/admin/:path*",
    "/login",
    "/register",
    "/role-selection",
  ],
};
