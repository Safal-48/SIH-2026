"use client";

import * as React from "react";
import {
  AlertTriangle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Users,
  Building2,
  CheckCircle2,
  TrendingUp,
  FileSpreadsheet,
  PlusCircle,
  Presentation,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";

interface SkillGapRecommendationWidgetProps {
  topSkillGap: {
    gapName: string;
    compositeScore: number;
    severity: string;
    industryDemandBenchmark: number;
    cohortDeficitPercentage: number;
    affectedScholarsCount: number;
    industryContext: string;
    actionRecommendation: {
      title: string;
      proposedTopic: string;
      suggestedFacultyLead: string;
      targetCohort: string;
      projectedCompetencyLift: string;
    };
  };
  onOpenWorkshopModal: () => void;
}

export function SkillGapRecommendationWidget({
  topSkillGap,
  onOpenWorkshopModal,
}: SkillGapRecommendationWidgetProps) {
  const { actionRecommendation } = topSkillGap;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-300">
      {/* Left Card: Top Skill Gap Detection */}
      <Card
        variant="default"
        className="p-6 border-rose-500/30 bg-gradient-to-br from-rose-500/5 via-card to-card space-y-4"
      >
        <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              ⚠️
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Institutional Diagnostic Alert
              </span>
              <h3 className="text-base font-bold text-foreground">
                Top Skill Gap: {topSkillGap.gapName}
              </h3>
            </div>
          </div>
          <Badge variant="destructive" size="sm">
            Critical Deficit (-{topSkillGap.cohortDeficitPercentage}%)
          </Badge>
        </div>

        {/* Severity Metrics */}
        <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-muted/40 border border-border text-xs">
          <div>
            <span className="text-muted-foreground text-[10px]">Cohort Avg</span>
            <p className="text-xl font-bold text-rose-600">{topSkillGap.compositeScore}%</p>
            <span className="text-[10px] text-muted-foreground">Research 42% • Doc 38%</span>
          </div>
          <div>
            <span className="text-muted-foreground text-[10px]">Industry Demand</span>
            <p className="text-xl font-bold text-foreground">{topSkillGap.industryDemandBenchmark}%</p>
            <span className="text-[10px] text-emerald-600 font-medium">Recruiter Standard</span>
          </div>
          <div>
            <span className="text-muted-foreground text-[10px]">Priority Scholars</span>
            <p className="text-xl font-bold text-accent">{topSkillGap.affectedScholarsCount}</p>
            <span className="text-[10px] text-muted-foreground">Score &lt; 50%</span>
          </div>
        </div>

        {/* Industry Consequence Explanation */}
        <p className="text-xs text-muted-foreground leading-relaxed">
          {topSkillGap.industryContext}
        </p>

        <div className="pt-2 border-t border-border/80 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-rose-500" />
            Impacts MoUs with Dabur, CCRAS & Himalaya
          </span>
          <span className="font-semibold text-rose-600">Urgent Intervention Recommended</span>
        </div>
      </Card>

      {/* Right Card: Automated Recommendation -> Create Research Workshop */}
      <Card
        variant="default"
        className="p-6 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card space-y-4 flex flex-col justify-between"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-primary/20">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center font-bold">
                🎯
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  AI-Generated Recommendation
                </span>
                <h3 className="text-base font-bold text-foreground">
                  Recommendation: {actionRecommendation.title}
                </h3>
              </div>
            </div>
            <Badge variant="gold" size="sm">
              High Impact
            </Badge>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-card border border-border space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Proposed Remedial Intervention
              </span>
              <p className="font-bold text-foreground leading-snug">
                {actionRecommendation.proposedTopic}
              </p>
              <div className="pt-2 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-muted-foreground">
                <span>
                  <strong>Lead Faculty Guide:</strong> {actionRecommendation.suggestedFacultyLead}
                </span>
                <span className="text-emerald-600 font-semibold">
                  {actionRecommendation.projectedCompetencyLift}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-muted/30 border border-border/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary shrink-0" />
                <span className="text-muted-foreground">
                  Target Group: <strong>{actionRecommendation.targetCohort}</strong>
                </span>
              </div>
              <Badge variant="outline" size="sm" className="text-[10px]">
                Auto-Enrolled
              </Badge>
            </div>
          </div>
        </div>

        {/* 1-Click Action Button */}
        <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-[11px] text-muted-foreground">
            Dispatches to Faculty Workshop Roster & notifies 48 scholars
          </span>

          <Button
            variant="primary"
            size="md"
            className="text-xs shrink-0 shadow-md shadow-primary/20 font-bold"
            onClick={onOpenWorkshopModal}
            leftIcon={<PlusCircle className="h-4 w-4" />}
          >
            Create Research Workshop
          </Button>
        </div>
      </Card>
    </div>
  );
}
