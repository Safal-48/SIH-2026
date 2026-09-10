/**
 * Vaidya Setu - Smart Automation Architecture Interfaces
 * Defines input/output contracts for AI and rule-based smart engines.
 */

import {
  SkillCategory,
  AssessmentAttempt,
  AssessmentResult,
  CareerPath,
  LearningModule,
  Opportunity,
  Competency,
  CompetencyPassport,
} from "./entities";

// 1. Assessment Engine
export interface IAssessmentEngine {
  evaluateAttempt(attempt: AssessmentAttempt): Promise<AssessmentResult>;
  calculateDomainBreakdown(answers: AssessmentAttempt["answers"]): Record<SkillCategory, number>;
}

// 2. Skill Gap Engine
export interface SkillGapAnalysisInput {
  currentCompetencies: Competency[];
  targetRoleSkillRequirements: {
    skillId: string;
    skillName: string;
    minimumScore: number;
  }[];
}

export interface SkillGapAnalysisOutput {
  overallReadinessPercentage: number;
  criticalGaps: {
    skillId: string;
    skillName: string;
    currentScore: number;
    requiredScore: number;
    delta: number;
    urgency: "HIGH" | "MEDIUM" | "LOW";
  }[];
  strengths: string[];
}

export interface ISkillGapEngine {
  analyzeGap(input: SkillGapAnalysisInput): Promise<SkillGapAnalysisOutput>;
}

// 3. Career Recommendation Engine (Ayurveda Career DNA)
export interface CareerDnaInput {
  assessmentResult: AssessmentResult;
  studentInterests: string[];
  currentDegree: string;
}

export interface CareerRecommendation {
  careerPath: CareerPath;
  affinityScore: number; // 0-100
  rationale: string;
  recommendedCertifications: string[];
}

export interface ICareerRecommendationEngine {
  recommendCareerPaths(input: CareerDnaInput): Promise<CareerRecommendation[]>;
}

// 4. Learning Recommendation Engine
export interface LearningRecommendationInput {
  gapAnalysis: SkillGapAnalysisOutput;
  availableHoursPerWeek: number;
}

export interface ILearningRecommendationEngine {
  generateCurriculum(input: LearningRecommendationInput): Promise<LearningModule[]>;
}

// 5. Smart Opportunity Matching Engine
export interface OpportunityMatchInput {
  studentCompetencies: Competency[];
  studentLocation: { city: string; state: string };
  preferredTypes: Opportunity["opportunityType"][];
  availableOpportunities: Opportunity[];
}

export interface OpportunityMatchResult {
  opportunity: Opportunity;
  compatibilityScore: number; // 0-100
  matchedSkills: string[];
  missingSkills: string[];
  isLocationMatch: boolean;
  aiFitSummary: string;
}

export interface IOpportunityMatchingEngine {
  rankOpportunities(input: OpportunityMatchInput): Promise<OpportunityMatchResult[]>;
}

// 6. Supervisor Verification Service
export interface IVerificationService {
  requestEndorsement(params: {
    applicationId?: string;
    studentId: string;
    supervisorId: string;
    competencyId?: string;
  }): Promise<{ verificationId: string; status: "PENDING" }>;

  attestCompetencyPassport(params: {
    studentId: string;
    supervisorId: string;
    approvedCompetencies: Competency[];
  }): Promise<CompetencyPassport>;
}
