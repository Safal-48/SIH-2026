import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { checkRateLimit, getClientIp, getRateLimitHeaders } from "@/lib/security/rateLimiter";
import { authenticateApiRequest } from "@/lib/security/apiAuth";
import { validateDocumentMetadata } from "@/lib/security/validation";
import { auditLogService } from "@/lib/services/auditLogService";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

/**
 * Validates file binary header (magic bytes) to prevent MIME spoofing / executable masquerading
 */
function verifyMagicBytes(buffer: Buffer, declaredMime: string): boolean {
  if (buffer.length < 4) return false;

  // PDF check: %PDF (0x25 0x50 0x44 0x46)
  if (declaredMime === "application/pdf") {
    return (
      buffer[0] === 0x25 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x44 &&
      buffer[3] === 0x46
    );
  }

  // JPEG check: 0xFF 0xD8 0xFF
  if (declaredMime === "image/jpeg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  // PNG check: 0x89 0x50 0x4E 0x47
  if (declaredMime === "image/png") {
    return (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47
    );
  }

  return false;
}

export async function POST(request: NextRequest) {
  const ipAddress = getClientIp(request);
  const userAgent = request.headers.get("user-agent") || "unknown";

  // 1. Rate Limiting Check (Max 5 uploads/min)
  const rateLimit = checkRateLimit(ipAddress, "DOCUMENT_UPLOAD");
  const rateLimitHeaders = getRateLimitHeaders(rateLimit);

  if (!rateLimit.allowed) {
    auditLogService.record({
      userId: "unknown",
      userName: `Client ${ipAddress}`,
      userRole: "STUDENT",
      action: "SECURITY_RATE_LIMIT_EXCEEDED",
      resourceType: "DOCUMENT_UPLOAD_API",
      status: "BLOCKED",
      ipAddress,
      userAgent,
      metadata: {
        reason: "Excessive upload attempts within 60-second window",
        retryAfter: rateLimit.retryAfterSeconds,
      },
    });

    return NextResponse.json(
      {
        error: "Too Many Requests",
        message: `Upload rate limit exceeded. Please wait ${rateLimit.retryAfterSeconds} seconds.`,
      },
      { status: 429, headers: rateLimitHeaders }
    );
  }

  // 2. Authentication & RBAC Authorization Check
  const auth = authenticateApiRequest(request, {
    allowedRoles: ["STUDENT", "ACADEMICIAN", "ADMIN"],
    requiredPermission: "DOCUMENT_UPLOAD",
  });

  if (!auth.isAuthenticated || !auth.user) {
    return auth.errorResponse!;
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const documentType = (formData.get("documentType") as string) || "CLINICAL_LOGBOOK";

    if (!file) {
      return NextResponse.json(
        { error: "Bad Request", message: "No file provided in form data" },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    // 3. Metadata Validation
    const metadataValidation = validateDocumentMetadata({
      documentType,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
    });

    if (!metadataValidation.isValid) {
      return NextResponse.json(
        { error: "Validation Failed", details: metadataValidation.errors },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    // 4. Read File Buffer & Validate Binary Magic Bytes
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File Too Large", message: "File exceeds 10MB threshold" },
        { status: 413, headers: rateLimitHeaders }
      );
    }

    const isValidHeader = verifyMagicBytes(buffer, file.type);
    if (!isValidHeader) {
      auditLogService.record({
        userId: auth.user.id,
        userName: auth.user.fullName,
        userRole: auth.user.role,
        action: "DOCUMENT_UPLOAD",
        resourceType: "BINARY_VERIFICATION",
        status: "BLOCKED",
        ipAddress,
        userAgent,
        metadata: {
          fileName: file.name,
          declaredMime: file.type,
          reason: "Binary magic bytes mismatch: potential MIME spoofing",
        },
      });

      return NextResponse.json(
        {
          error: "Security Violation",
          message: "Binary signature does not match declared file extension. Upload aborted.",
        },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    // 5. Compute SHA-256 Checksum for Tamper Evidence
    const sha256Hash = crypto.createHash("sha256").update(buffer).digest("hex");

    // 6. Generate Sanitized Unique Storage Path
    const safeExtension = file.name.split(".").pop()?.toLowerCase() || "pdf";
    const documentId = `doc-${Date.now().toString(36)}-${crypto.randomBytes(4).toString("hex")}`;
    const safeStoragePath = `vault/students/${auth.user.id}/${documentType}/${documentId}.${safeExtension}`;

    // 7. Record Successful Audit Log
    const auditRecord = auditLogService.record({
      userId: auth.user.id,
      userName: auth.user.fullName,
      userRole: auth.user.role,
      action: "DOCUMENT_UPLOAD",
      resourceType: documentType,
      resourceId: documentId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      metadata: {
        fileName: file.name,
        fileSizeBytes: file.size,
        mimeType: file.type,
        checksumSha256: sha256Hash,
        storagePath: safeStoragePath,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Document uploaded and cryptographically hashed successfully",
        document: {
          id: documentId,
          documentType,
          fileName: file.name,
          fileSizeBytes: file.size,
          mimeType: file.type,
          storagePath: safeStoragePath,
          checksumSha256: sha256Hash,
          isVerified: false,
          uploadedAt: auditRecord.timestamp,
        },
      },
      { status: 201, headers: rateLimitHeaders }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Internal Error", message: err.message || "Failed to process upload" },
      { status: 500, headers: rateLimitHeaders }
    );
  }
}
