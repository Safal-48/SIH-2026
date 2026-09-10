"use client";

import * as React from "react";
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Building2,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/cards/Card";
import { IndustrySkillDemandMetric } from "@/lib/services/adminAnalyticsService";

interface IndustrySkillDemandWidgetProps {
  skillsDemand: IndustrySkillDemandMetric[];
}

export function IndustrySkillDemandWidget({ skillsDemand }: IndustrySkillDemandWidgetProps) {
  return (
    <Card variant="default" className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center font-bold text-sm">
              📈
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-foreground">
                  Industry Skill Demand vs National Scholar Readiness
                </h3>
                <Badge variant="verified" size="sm">
                  Top Recruiter Telemetry
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Aggregated from 1,420 active Ayush pharmaceutical, hospital, and clinical research postings
              </p>
            </div>
          </div>
        </div>

        <span className="text-xs font-mono text-muted-foreground self-start sm:self-auto">
          Sample: 3,890 Active Vacancies
        </span>
      </div>

      {/* 4 Core Skill Demands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillsDemand.map((skill) => {
          const isCritical = skill.urgencyLevel === "CRITICAL";

          return (
            <div
              key={skill.skillName}
              className="p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-foreground">{skill.skillName}</h4>
                  <span className="text-[11px] text-muted-foreground">
                    Demanded by {skill.topEmployersRequiring.join(", ")}
                  </span>
                </div>

                <Badge
                  variant={
                    skill.urgencyLevel === "CRITICAL"
                      ? "destructive"
                      : skill.urgencyLevel === "MODERATE"
                      ? "warning"
                      : "verified"
                  }
                  size="sm"
                  className="shrink-0"
                >
                  {skill.urgencyLevel === "CRITICAL"
                    ? `Gap Deficit: -${skill.gapDelta}%`
                    : `Balanced (${skill.gapDelta}% Delta)`}
                </Badge>
              </div>

              {/* Comparative Dual Progress Bars */}
              <div className="space-y-2 pt-1">
                {/* Industry Demand Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <Building2 className="h-3 w-3 text-primary" /> Recruiter Demand
                    </span>
                    <span className="font-bold text-primary text-sm">{skill.industryDemand}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${skill.industryDemand}%` }}
                    />
                  </div>
                </div>

                {/* Student Supply Readiness Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <CheckCircle2 className="h-3 w-3 text-muted-foreground" /> Student Supply Readiness
                    </span>
                    <span
                      className={`font-semibold text-xs ${
                        isCritical ? "text-rose-600" : "text-foreground"
                      }`}
                    >
                      {skill.studentSupply}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCritical ? "bg-rose-500" : "bg-emerald-500"
                      }`}
                      style={{ width: `${skill.studentSupply}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Statutory Policy Recommendation */}
              <div className="pt-2 border-t border-border/80 text-xs">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">
                  Ministry / NCISM Recommendation
                </span>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {skill.recommendedPolicyAction}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="p-3.5 rounded-xl bg-muted/30 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-foreground font-semibold">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <span>National Policy Takeaway:</span>
          <span className="text-muted-foreground font-normal">
            Critical bottlenecks center on <strong>Clinical Documentation (82%)</strong> and <strong>Research (64%)</strong>. Immediate BAMS & MD curriculum alignment recommended.
          </span>
        </div>
      </div>
    </Card>
  );
}
