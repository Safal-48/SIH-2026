"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Briefcase,
  HelpCircle,
  Award,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  getExplainableRecommendations,
  ExplainableCareerRecommendation,
  setActiveCareerGoal,
} from "@/lib/services/careerIntelligenceService";

export function CareerRecommendationsTab() {
  const [recommendations, setRecommendations] = React.useState<ExplainableCareerRecommendation[]>([]);

  React.useEffect(() => {
    setRecommendations(getExplainableRecommendations());
  }, []);

  return (
    <div className="space-y-8">
      {/* Intro Explanatory Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-[#041d13] to-slate-950 border border-emerald-500/30 backdrop-blur-xl shadow-lg space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
          <span>Explainable AI Career Matching Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
          Transparent Career Fit &amp; Gap Diagnostics
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-3xl">
          Unlike opaque algorithms, every compatibility percentage is mathematically derived from your live verified Skill DNA, NCISM clinical logbook hours, and assessment results.
        </p>
      </div>

      {/* Grid of Explainable Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((rec) => (
          <div
            key={rec.careerId}
            className="rounded-3xl bg-[#031a10]/90 border border-emerald-500/30 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl hover:border-emerald-500/60 transition-all group"
          >
            <div className="space-y-4">
              {/* Header Title & Match Badge */}
              <div className="flex items-start justify-between gap-4 pb-3 border-b border-emerald-500/20">
                <div className="space-y-1">
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                    {rec.careerTitle}
                  </h3>
                  <span className="text-[11px] text-muted-foreground block">
                    {rec.relatedOpportunityCount} Active Openings at AIIA, Dabur &amp; CCRAS
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 border border-emerald-500/40 text-center min-w-[90px] flex-shrink-0">
                  <div className="text-2xl font-extrabold text-amber-400 font-mono">
                    {rec.fitScore}%
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-gray-300 font-bold block">
                    Fit Score
                  </span>
                </div>
              </div>

              {/* WHY YOU MATCH (Strengths) */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/25">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Why This Trajectory Matches You:</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-200">
                  {rec.whyReasons.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* NEEDS IMPROVEMENT (Gaps) */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/25">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <span>Needs Targeted Improvement:</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-200">
                  {rec.needsImprovement.map((gap, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* NEXT ACTION (Remediation) */}
              <div className="p-3 rounded-2xl bg-black/50 border border-emerald-500/20 text-xs flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold block">
                    Recommended Next Action
                  </span>
                  <span className="font-semibold text-white">{rec.nextAction}</span>
                </div>
                <Zap className="h-4 w-4 text-amber-400 flex-shrink-0" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
              <Button
                onClick={() => {
                  setActiveCareerGoal(rec.careerTitle);
                  alert(`Target goal updated to: ${rec.careerTitle}. Your Skill DNA benchmarks have re-calibrated.`);
                }}
                variant="outline"
                size="sm"
                className="text-xs border-emerald-500/30 text-emerald-300 hover:text-white"
              >
                Set as Primary Target
              </Button>

              <div className="flex items-center gap-2">
                <Link href="/learning">
                  <Button variant="gold" size="sm" className="text-xs font-bold gap-1">
                    <span>Remediate Gaps</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
                <Link href="/opportunities">
                  <Button variant="outline" size="sm" className="text-xs border-emerald-500/30 text-gray-300">
                    Browse Jobs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
