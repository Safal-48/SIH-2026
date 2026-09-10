"use client";

import * as React from "react";
import {
  RotateCcw,
  Building2,
  GraduationCap,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Briefcase,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/cards/Card";
import { FeedbackLoopStage } from "@/lib/services/institutionPortalService";

interface AcademiaIndustryFeedbackLoopProps {
  stages: FeedbackLoopStage[];
}

export function AcademiaIndustryFeedbackLoop({ stages }: AcademiaIndustryFeedbackLoopProps) {
  const [activeStage, setActiveStage] = React.useState<number>(3); // Stage 3 (Institutional Heatmap) is default active

  const stageIcons: Record<string, string> = {
    INDUSTRY: "🏭",
    STUDENTS: "📜",
    INSTITUTION: "📊",
    FACULTY: "👨‍🏫",
    OUTCOME: "🚀",
  };

  return (
    <Card variant="default" className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-sm">
              🔄
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-foreground">
                  The Academia ↔ Industry Feedback Loop
                </h3>
                <Badge variant="verified" size="sm">
                  Active Continuous Loop
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                How real-time recruiter demand signals automatically trigger college curriculum interventions and drive placement outcomes
              </p>
            </div>
          </div>
        </div>

        <span className="text-xs font-mono text-muted-foreground self-start sm:self-auto">
          Feedback Latency: &lt; 24 Hours
        </span>
      </div>

      {/* 5-Step Horizontal Cyclical Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
        {stages.map((stg) => {
          const isSelected = activeStage === stg.stage;
          const isCompleted = stg.status === "COMPLETED";
          const isActive = stg.status === "ACTIVE";

          return (
            <div
              key={stg.stage}
              onClick={() => setActiveStage(stg.stage)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/10 ring-1 ring-primary"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{stageIcons[stg.actor]}</span>
                  <Badge
                    variant={isCompleted ? "verified" : isActive ? "gold" : "outline"}
                    size="sm"
                    className="text-[10px]"
                  >
                    Stage {stg.stage}
                  </Badge>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    {stg.actor}
                  </span>
                  <h4 className="text-xs font-bold text-foreground leading-snug">
                    {stg.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground line-clamp-1">{stg.subtitle}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-border/80">
                <span className="text-[10px] font-bold text-primary block truncate">
                  {stg.metric}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Stage Detailed Breakdown Banner */}
      {stages.find((s) => s.stage === activeStage) && (
        <div className="p-4 rounded-xl bg-muted/40 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs animate-in fade-in">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {stageIcons[stages.find((s) => s.stage === activeStage)!.actor]}
              </span>
              <h5 className="font-bold text-foreground">
                Stage {activeStage}: {stages.find((s) => s.stage === activeStage)!.title} —{" "}
                {stages.find((s) => s.stage === activeStage)!.subtitle}
              </h5>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {stages.find((s) => s.stage === activeStage)!.description}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-card border border-border text-center shrink-0 self-start sm:self-center">
            <span className="text-[10px] font-semibold text-muted-foreground block uppercase tracking-wider">
              Loop Stage Telemetry
            </span>
            <span className="text-xs font-bold text-foreground">
              {stages.find((s) => s.stage === activeStage)!.metric}
            </span>
          </div>
        </div>
      )}

      {/* Summary Narrative */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-muted-foreground pt-1">
        <div className="p-3 rounded-lg border border-border bg-muted/20 space-y-1">
          <span className="font-bold text-foreground flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-primary" /> 1. Real Recruiter Signals
          </span>
          <p className="text-[11px] leading-relaxed">
            Curriculum updates are not based on speculation; they respond directly to active job and internship competencies posted by Dabur, CCRAS, and hospital partners.
          </p>
        </div>

        <div className="p-3 rounded-lg border border-border bg-muted/20 space-y-1">
          <span className="font-bold text-foreground flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5 text-secondary" /> 2. Targeted Remediation
          </span>
          <p className="text-[11px] leading-relaxed">
            Rather than generic lectures, the institution commissions hands-on clinical and research workshops assigned directly to accredited faculty guides.
          </p>
        </div>

        <div className="p-3 rounded-lg border border-border bg-muted/20 space-y-1">
          <span className="font-bold text-foreground flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5 text-emerald-600" /> 3. Verified Competency Lift
          </span>
          <p className="text-[11px] leading-relaxed">
            Scholars complete the workshop, pass practical evaluations, and automatically update their Competency Passports with cryptographically verified hashes.
          </p>
        </div>
      </div>
    </Card>
  );
}
