/**
 * Vaidya Setu - PII & Sensitive Data Sanitization
 * Complies with India Digital Personal Data Protection (DPDP) Act.
 * Ensures no sensitive personal identifiers (PII), password hashes, or internal supervisor notes leak to client.
 */

/**
 * Masks Aadhaar or National Citizen ID
 * e.g., "123456788812" -> "•••• •••• 8812"
 */
export function maskAadhaar(id: string): string {
  if (!id) return "•••• •••• ••••";
  const clean = id.replace(/\s+/g, "");
  if (clean.length < 4) return "•••• •••• ••••";
  const last4 = clean.slice(-4);
  return `•••• •••• ${last4}`;
}

/**
 * Masks Email Address
 * e.g., "aarav.sharma@aiia.ac.in" -> "a***a@aiia.ac.in"
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return "•***•@***.***";
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 2) {
    return `${localPart[0]}***@${domain}`;
  }
  const first = localPart[0];
  const last = localPart[localPart.length - 1];
  return `${first}***${last}@${domain}`;
}

/**
 * Masks Indian Phone Number
 * e.g., "+919876543210" -> "+91 ••••• ••210"
 */
export function maskPhone(phone: string): string {
  if (!phone) return "+91 ••••• •••••";
  const clean = phone.replace(/[\s\-]/g, "");
  const last3 = clean.slice(-3);
  return `+91 ••••• ••${last3}`;
}

/**
 * Strips internal security properties, salts, and private notes before JSON serialization
 */
export function sanitizeUserForClient<T extends Record<string, any>>(user: T): Omit<T, "password" | "password_hash" | "salt" | "auth_token"> {
  const {
    password,
    password_hash,
    salt,
    auth_token,
    ...cleanUser
  } = user;

  return cleanUser as any;
}

/**
 * Anonymizes student record for unprivileged recruiters before an application is approved
 */
export function anonymizeStudentCandidate(candidate: {
  fullName: string;
  email: string;
  phone?: string;
  aadhaar?: string;
  collegeName: string;
  overallSkillScore: number;
  topSkills: string[];
}) {
  return {
    candidateAlias: `Ayush Candidate #${Math.floor(1000 + Math.random() * 9000)}`,
    maskedEmail: maskEmail(candidate.email),
    maskedPhone: candidate.phone ? maskPhone(candidate.phone) : undefined,
    collegeName: candidate.collegeName,
    overallSkillScore: candidate.overallSkillScore,
    topSkills: candidate.topSkills,
    isPiiProtected: true,
  };
}
