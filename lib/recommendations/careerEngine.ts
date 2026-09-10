/**
 * Vaidya Setu - Career Recommendation Engine Stub (Ayurveda Career DNA)
 */

import {
  ICareerRecommendationEngine,
  CareerDnaInput,
  CareerRecommendation,
} from "@/types/automation";
import { MOCK_CAREER_PATHS } from "@/data/mock-ayurveda";

export class CareerRecommendationEngine implements ICareerRecommendationEngine {
  async recommendCareerPaths(): Promise<CareerRecommendation[]> {
    return MOCK_CAREER_PATHS.map((career, idx) => ({
      careerPath: career,
      affinityScore: 95 - idx * 7,
      rationale: `Strong alignment in ${career.ayurvedaSpecialization} with verified clinical competencies.`,
      recommendedCertifications: [
        "NABH Ayush Hospital Assessor Certification",
        "CCRAS GCP-Ayush Investigator Credential",
      ],
    }));
  }
}

export const careerRecommendationEngine = new CareerRecommendationEngine();
