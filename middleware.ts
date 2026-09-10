import { NextResponse, type NextRequest } from "next/server";
import { UserRole } from "./types/roles";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Read session and role cookies
  const hasAuth = request.cookies.get("vaidya_auth")?.value === "true";
  const userRole = (request.cookies.get("vaidya_role")?.value as UserRole) || null;

  // 2. Stakeholder Portals
  const roleRoutes: { prefix: string; role: UserRole }[] = [
    { prefix: "/student", role: "STUDENT" },
    { prefix: "/academician", role: "ACADEMICIAN" },
    { prefix: "/industry", role: "INDUSTRY" },
    { prefix: "/institution", role: "INSTITUTION" },
    { prefix: "/admin", role: "ADMIN" },
  ];

  const matched = roleRoutes.find((r) =>
    pathname === r.prefix || pathname.startsWith(`${r.prefix}/`)
  );

  if (matched) {
    // If user has no auth or is switching to another stakeholder portal, seamlessly establish the role session
    if (!hasAuth || userRole !== matched.role) {
      const response = NextResponse.next();
      response.cookies.set("vaidya_role", matched.role, { path: "/", maxAge: 86400, sameSite: "lax" });
      response.cookies.set("vaidya_auth", "true", { path: "/", maxAge: 86400, sameSite: "lax" });
      return response;
    }
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
  ],
};
