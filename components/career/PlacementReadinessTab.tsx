"use client";

import * as React from "react";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Target,
  FileCheck,
  Briefcase,
  Sparkles,
  Zap,
  Activity,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/cards/Card";
import {
  calculatePlacementReadiness,
  PlacementReadinessReport,
} from "@/lib/services/careerIntelligenceService";

export function PlacementReadinessTab() {
  const [report, setReport] = React.useState<PlacementReadinessReport | null>(null);

  React.useEffect(() => {
    setReport(calculatePlacementReadiness());
  }, []);

  if (!report) {
    return (
      <div className="p-12 text-center text-xs text-muted-foreground">
        Calculating Consolidated Placement Readiness...
      </div>
    );
  }

  const { overallPlacementScore, placementTier, pillars, top3Actions } = report;

  return (
    <div className="space-y-8">
      {/* 1. Master Consolidated Placement Readiness Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/85 via-[#032015] to-slate-950 border border-emerald-500/35 backdrop-blur-xl shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-emerald-500/20">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Consolidated National Placement Index</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Institutional Placement Readiness
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              A single authoritative metric combining your verified clinical skills, target career alignment, mock interview fluency, ATS resume completeness, and opportunity compatibility.
            </p>
          </div>

          {/* Master Placement Score Gauge */}
          <div className="p-5 rounded-3xl bg-black/50 border border-emerald-500/40 text-center min-w-[160px] flex-shrink-0 shadow-xl">
            <div className="text-4xl sm:text-5xl font-extrabold text-amber-400 font-mono">
              {overallPlacementScore}%
            </div>
            <span className="text-[11px] uppercase tracking-wider text-gray-200 font-bold block mt-1">
              Readiness Score
            </span>
            <Badge
              variant={placementTier === "JOB_READY" ? "verified" : "gold"}
              size="sm"
              className="mt-2 text-[10px] font-mono uppercase"
            >
              {placementTier.replace("_", " ")}
            </Badge>
          </div>
        </div>

        {/* 2. The 5 Foundational Pillars */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-wider text-gray-400">
              The 5 Foundational Pillars (Consolidated Weights)
            </span>
            <span className="text-muted-foreground font-mono text-[11px]">100% Weighted Total</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Pillar 1: Skill Readiness */}
            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Skill Readiness</span>
                <span className="text-emerald-400 font-bold font-mono">{pillars.skillReadiness.score}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full"
                  style={{ width: `${pillars.skillReadiness.score}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>Weight: {pillars.skillReadiness.weight}%</span>
                <span className="text-emerald-300 font-semibold">{pillars.skillReadiness.status}</span>
              </div>
            </div>

            {/* Pillar 2: Career Fit */}
            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Career Fit</span>
                <span className="text-amber-400 font-bold font-mono">{pillars.careerFit.score}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${pillars.careerFit.score}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>Weight: {pillars.careerFit.weight}%</span>
                <span className="text-amber-300 font-semibold">{pillars.careerFit.status}</span>
              </div>
            </div>

            {/* Pillar 3: Interview Readiness */}
            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Interview Readiness</span>
                <span className="text-sky-400 font-bold font-mono">{pillars.interviewReadiness.score}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-400 rounded-full"
                  style={{ width: `${pillars.interviewReadiness.score}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>Weight: {pillars.interviewReadiness.weight}%</span>
                <span className="text-sky-300 font-semibold">{pillars.interviewReadiness.status}</span>
              </div>
            </div>

            {/* Pillar 4: Resume Readiness */}
            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Resume Readiness</span>
                <span className="text-purple-400 font-bold font-mono">{pillars.resumeReadiness.score}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-400 rounded-full"
                  style={{ width: `${pillars.resumeReadiness.score}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>Weight: {pillars.resumeReadiness.weight}%</span>
                <span className="text-purple-300 font-semibold">{pillars.resumeReadiness.status}</span>
              </div>
            </div>

            {/* Pillar 5: Opportunity Compatibility */}
            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Market Fit</span>
                <span className="text-emerald-400 font-bold font-mono">{pillars.opportunityCompatibility.score}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full"
                  style={{ width: `${pillars.opportunityCompatibility.score}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>Weight: {pillars.opportunityCompatibility.weight}%</span>
                <span className="text-emerald-300 font-semibold">{pillars.opportunityCompatibility.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Top 3 Actions to Improve Placement Readiness */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-400" />
              <span>Top 3 Actions to Maximize Placement Readiness</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Targeted high-yield tasks prioritized to close your critical qualification gaps.
            </p>
          </div>
          <Badge variant="gold" size="sm" className="text-xs font-mono">
            Direct Remediation
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {top3Actions.map((act, idx) => (
            <div
              key={act.id}
              className="p-5 rounded-2xl bg-[#03190f]/90 border border-emerald-500/30 backdrop-blur-xl flex flex-col justify-between space-y-4 hover:border-emerald-500/60 transition-all shadow-lg"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-bold font-mono">Action #{idx + 1}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-[10px]">
                    +{act.potentialScoreIncrease}% Impact
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white leading-snug">
                  {act.actionTitle}
                </h4>

                <p className="text-xs text-gray-300/85 leading-relaxed">
                  {act.description}
                </p>
              </div>

              <div className="pt-3 border-t border-emerald-500/20">
                <Link href={act.targetModuleUrl}>
                  <Button variant="gold" size="sm" className="w-full text-xs font-bold gap-1.5">
                    <span>Execute Action</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
