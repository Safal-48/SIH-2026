import { NextRequest, NextResponse } from "next/server";
import { authenticateApiRequest } from "@/lib/security/apiAuth";
import { checkRateLimit, getClientIp, getRateLimitHeaders } from "@/lib/security/rateLimiter";
import { auditLogService } from "@/lib/services/auditLogService";
import { UserRole } from "@/types/roles";

export async function GET(request: NextRequest) {
  const ipAddress = getClientIp(request);

  // 1. Rate Limiting Check
  const rateLimit = checkRateLimit(ipAddress, "GENERAL_API");
  const rateLimitHeaders = getRateLimitHeaders(rateLimit);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too Many Requests", message: "Rate limit exceeded" },
      { status: 429, headers: rateLimitHeaders }
    );
  }

  // 2. Authentication & Authorization Check
  const auth = authenticateApiRequest(request);
  if (!auth.isAuthenticated || !auth.user) {
    return auth.errorResponse!;
  }

  const { searchParams } = new URL(request.url);
  const requestedRole = searchParams.get("role") as UserRole | undefined;
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : 50;

  // Admins can see all logs; non-admins can only see their own logs
  let logs = auditLogService.getLogs({
    userRole: auth.user.role === "ADMIN" ? requestedRole : auth.user.role,
    limit,
  });

  if (auth.user.role !== "ADMIN") {
    logs = logs.filter((l) => l.userId === auth.user!.id || l.userRole === auth.user!.role);
  }

  const summary = auditLogService.getSecuritySummary();

  return NextResponse.json(
    {
      success: true,
      data: {
        logs,
        summary,
      },
    },
    { status: 200, headers: rateLimitHeaders }
  );
}
