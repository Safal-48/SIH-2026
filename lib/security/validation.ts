/**
 * Vaidya Setu - Server-Side Input Validation & Sanitization
 * Protects platform against XSS, injection vectors, and malformed client payloads.
 */

export interface ValidationResult<T> {
  isValid: boolean;
  data?: T;
  errors?: Record<string, string>;
}

/**
 * Strips dangerous HTML tags, script blocks, and javascript: protocols to prevent XSS.
 */
export function sanitizeString(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/javascript:[^"']*/gi, "")
    .replace(/on\w+="[^"]*"/gi, "")
    .replace(/on\w+='[^']*'/gi, "")
    .trim();
}

/**
 * Validates Email Format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates NCISM / Institutional Student Enrollment Number
 */
export function isValidEnrollmentNumber(enrollment: string): boolean {
  const clean = enrollment.trim();
  return clean.length >= 5 && clean.length <= 25 && /^[a-zA-Z0-9\-_/]+$/.test(clean);
}

/**
 * Validates Phone Number (India 10-digit mobile)
 */
export function isValidIndianPhone(phone: string): boolean {
  const clean = phone.replace(/[\s\-+]/g, "");
  return /^(91)?[6-9]\d{9}$/.test(clean);
}

/**
 * Document Upload Metadata Validation
 */
export interface DocumentMetadataInput {
  documentType: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

const ALLOWED_DOC_TYPES = [
  "DEGREE_CERTIFICATE",
  "NCISM_REGISTRATION",
  "CLINICAL_LOGBOOK",
  "IDENTITY_PROOF",
  "RESEARCH_PAPER",
];

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export function validateDocumentMetadata(input: unknown): ValidationResult<DocumentMetadataInput> {
  const errors: Record<string, string> = {};

  if (!input || typeof input !== "object") {
    return { isValid: false, errors: { payload: "Invalid request payload" } };
  }

  const data = input as Partial<DocumentMetadataInput>;

  if (!data.documentType || !ALLOWED_DOC_TYPES.includes(data.documentType)) {
    errors.documentType = `Document type must be one of: ${ALLOWED_DOC_TYPES.join(", ")}`;
  }

  if (!data.fileName || typeof data.fileName !== "string" || data.fileName.length > 255) {
    errors.fileName = "File name is required and must not exceed 255 characters";
  } else {
    // Check for path traversal attacks
    if (data.fileName.includes("..") || data.fileName.includes("/") || data.fileName.includes("\\")) {
      errors.fileName = "File name contains invalid path traversal characters";
    }
  }

  if (typeof data.fileSize !== "number" || data.fileSize <= 0) {
    errors.fileSize = "File size must be a positive integer";
  } else if (data.fileSize > MAX_FILE_SIZE) {
    errors.fileSize = "File exceeds maximum permitted size of 10 MB";
  }

  if (!data.mimeType || !ALLOWED_MIME_TYPES.includes(data.mimeType)) {
    errors.mimeType = "Only PDF, JPEG, and PNG files are allowed";
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors: isValid ? undefined : errors,
    data: isValid
      ? {
          documentType: data.documentType!,
          fileName: sanitizeString(data.fileName!),
          fileSize: data.fileSize!,
          mimeType: data.mimeType!,
        }
      : undefined,
  };
}

/**
 * Validates Student Profile Update Payload
 */
export interface ProfileUpdateInput {
  fullName: string;
  degree: string;
  specialization?: string;
  currentYear: number;
}

export function validateProfileUpdate(input: unknown): ValidationResult<ProfileUpdateInput> {
  const errors: Record<string, string> = {};

  if (!input || typeof input !== "object") {
    return { isValid: false, errors: { payload: "Invalid request payload" } };
  }

  const data = input as Partial<ProfileUpdateInput>;

  if (!data.fullName || typeof data.fullName !== "string" || data.fullName.trim().length < 2) {
    errors.fullName = "Full name must be at least 2 characters";
  }

  if (!data.degree || typeof data.degree !== "string") {
    errors.degree = "Degree is required (e.g. BAMS, MD, PhD)";
  }

  if (typeof data.currentYear !== "number" || data.currentYear < 1 || data.currentYear > 6) {
    errors.currentYear = "Academic year must be between 1 and 6";
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors: isValid ? undefined : errors,
    data: isValid
      ? {
          fullName: sanitizeString(data.fullName!),
          degree: sanitizeString(data.degree!),
          specialization: data.specialization ? sanitizeString(data.specialization) : undefined,
          currentYear: data.currentYear!,
        }
      : undefined,
  };
}
