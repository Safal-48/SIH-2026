/**
 * Vaidya Setu - Assessment Engine Stub
 * Evaluates candidate responses across Ayurvedic clinical vignettes and pharmacology.
 */

import {
  AssessmentAttempt,
  AssessmentResult,
  SkillCategory,
} from "@/types/entities";
import { IAssessmentEngine } from "@/types/automation";

export class AssessmentEngine implements IAssessmentEngine {
  async evaluateAttempt(attempt: AssessmentAttempt): Promise<AssessmentResult> {
    const total = attempt.answers.length;
    const correct = attempt.answers.filter((a) => a.isCorrect).length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;

    const domainScores = this.calculateDomainBreakdown(attempt.answers);

    return {
      id: `result-${Date.now()}`,
      attemptId: attempt.id,
      studentId: attempt.studentId,
      overallScore: score,
      domainScores,
      strengths: ["Panchakarma Procedures", "Nadi Pariksha"],
      skillGaps: [
        {
          skillId: "skill-herbal-pharma",
          skillName: "Herbal Drug Standardization & Phytochemistry",
          currentScore: 58,
          requiredScore: 80,
          gapSeverity: "MODERATE",
        },
      ],
      generatedCareerDna: "Panchakarma Clinical Director & Integrative Vaidya",
    };
  }

  calculateDomainBreakdown(_answers?: AssessmentAttempt["answers"]): Record<SkillCategory, number> {
    return {
      CLINICAL_DIAGNOSTICS: 84,
      PANCHAKARMA_PROCEDURES: 92,
      DRAVYAGUNA_PHARMACOLOGY: 68,
      RASASHASTRA_FORMULATION: 74,
      RESEARCH_METHODOLOGY: 80,
      DIGITAL_AYUSH_STANDARDS: 88,
      HOSPITAL_NABH_PROTOCOLS: 82,
    };
  }
}

export const assessmentEngine = new AssessmentEngine();
