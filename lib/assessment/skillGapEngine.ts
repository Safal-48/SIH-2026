/**
 * Vaidya Setu - Skill Gap Analysis Engine Stub
 * Identifies deltas between student competencies and target Ayush industry requirements.
 */

import {
  ISkillGapEngine,
  SkillGapAnalysisInput,
  SkillGapAnalysisOutput,
} from "@/types/automation";

export class SkillGapEngine implements ISkillGapEngine {
  async analyzeGap(input: SkillGapAnalysisInput): Promise<SkillGapAnalysisOutput> {
    const { currentCompetencies, targetRoleSkillRequirements } = input;
    const gaps: SkillGapAnalysisOutput["criticalGaps"] = [];
    const strengths: string[] = [];
    let totalDelta = 0;

    for (const req of targetRoleSkillRequirements) {
      const match = currentCompetencies.find((c) => c.skillId === req.skillId);
      const currentScore = match ? match.proficiencyScore : 0;
      const delta = req.minimumScore - currentScore;

      if (delta > 0) {
        gaps.push({
          skillId: req.skillId,
          skillName: req.skillName,
          currentScore,
          requiredScore: req.minimumScore,
          delta,
          urgency: delta > 25 ? "HIGH" : delta > 10 ? "MEDIUM" : "LOW",
        });
        totalDelta += delta;
      } else {
        strengths.push(req.skillName);
      }
    }

    const readiness = Math.max(0, Math.min(100, Math.round(100 - totalDelta / (targetRoleSkillRequirements.length || 1))));

    return {
      overallReadinessPercentage: readiness,
      criticalGaps: gaps,
      strengths,
    };
  }
}

export const skillGapEngine = new SkillGapEngine();
