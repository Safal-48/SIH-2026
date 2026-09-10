/**
 * Vaidya Setu - Supervisor Verification & Endorsement Service Stub
 */

import { IVerificationService } from "@/types/automation";
import { Competency, CompetencyPassport } from "@/types/entities";
import { MOCK_BADGES } from "@/data/mock-ayurveda";

export class VerificationService implements IVerificationService {
  async requestEndorsement(params: {
    applicationId?: string;
    studentId: string;
    supervisorId: string;
    competencyId?: string;
  }): Promise<{ verificationId: string; status: "PENDING" }> {
    return {
      verificationId: `verif-${Date.now()}-${params.studentId.slice(0, 4)}`,
      status: "PENDING",
    };
  }

  async attestCompetencyPassport(params: {
    studentId: string;
    supervisorId: string;
    approvedCompetencies: Competency[];
  }): Promise<CompetencyPassport> {
    const hash = `ayur-attest-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    return {
      id: `passport-${params.studentId}`,
      studentId: params.studentId,
      passportHash: hash,
      issuedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      verifiedCompetencies: params.approvedCompetencies,
      badges: MOCK_BADGES,
      clinicalHoursVerified: 450,
      qrVerificationUrl: `https://vaidyasetu.ayush.gov.in/verify/${hash}`,
    };
  }
}

export const verificationService = new VerificationService();
