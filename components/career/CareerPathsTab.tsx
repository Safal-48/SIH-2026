"use client";

import * as React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Award,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Briefcase,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Target,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/cards/Card";
import {
  calculateCareerPathMatches,
  CareerPathMatch,
  getActiveCareerGoal,
} from "@/lib/services/careerIntelligenceService";
import { formatINR } from "@/lib/utils/formatters";

export function CareerPathsTab() {
  const [matches, setMatches] = React.useState<CareerPathMatch[]>([]);
  const [selectedPathId, setSelectedPathId] = React.useState<string>("");
  const activeGoal = getActiveCareerGoal();

  React.useEffect(() => {
    const calculated = calculateCareerPathMatches();
    setMatches(calculated);
    if (calculated.length > 0) {
      // Prioritize active goal if found
      const activeMatch = calculated.find((m) =>
        m.career.title.toLowerCase().includes(activeGoal.toLowerCase().slice(0, 10))
      );
      setSelectedPathId(activeMatch ? activeMatch.career.id : calculated[0].career.id);
    }
  }, [activeGoal]);

  const selectedPath = matches.find((m) => m.career.id === selectedPathId) || matches[0];

  if (!selectedPath) {
    return (
      <div className="p-12 text-center text-muted-foreground text-sm">
        Loading Ayush Career Trajectories & Skill Matrices...
      </div>
    );
  }

  const { career, overallMatchScore, matchedSkills, missingSkills, strengths, primaryGap, recommendedNextAction } =
    selectedPath;

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-emerald-500/20">
        <div>
          <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2.5">
            <TrendingUp className="h-6 w-6 text-emerald-400" />
            <span>Career Path Skill Matrices & Benchmarks</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-300/80 mt-1">
            Compare your live Skill DNA against verified NCISM and industry competency thresholds across 8 career trajectories.
          </p>
        </div>

        <Link href="/learning">
          <Button variant="outline" size="sm" className="border-emerald-500/40 text-emerald-300 text-xs gap-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Go to Study Planner</span>
          </Button>
        </Link>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Career Selector List (4 Cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold px-1">
            Select Trajectory ({matches.length})
          </span>
          <div className="space-y-2">
            {matches.map((m) => {
              const isSelected = m.career.id === selectedPathId;
              const isUserGoal = m.career.title.toLowerCase().includes(activeGoal.toLowerCase().slice(0, 10));

              return (
                <button
                  key={m.career.id}
                  onClick={() => setSelectedPathId(m.career.id)}
                  className={`w-full p-4 rounded-2xl text-left transition-all border flex items-center justify-between gap-3 ${
                    isSelected
                      ? "bg-[#042417] border-amber-400/80 shadow-md shadow-amber-500/10 ring-1 ring-amber-400/40"
                      : "bg-[#03190f]/70 border-emerald-500/20 hover:border-emerald-500/50 hover:bg-[#031d12]"
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-serif font-bold text-white truncate">
                        {m.career.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-gray-400">
                      <span>{m.career.category}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-bold">{formatINR(m.career.averageStartingCtcInr)}</span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div
                      className={`text-sm font-extrabold ${
                        m.overallMatchScore >= 80
                          ? "text-emerald-400"
                          : m.overallMatchScore >= 65
                          ? "text-amber-400"
                          : "text-rose-400"
                      }`}
                    >
                      {m.overallMatchScore}%
                    </div>
                    <span className="text-[9px] uppercase text-muted-foreground font-semibold">Skill Match</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Path Detail & Skill Breakdown (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Selected Path Hero Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#031a10]/95 border border-emerald-500/30 backdrop-blur-xl space-y-6 shadow-xl">
            {/* Title & Match Badge */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-emerald-500/20">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge variant="gold" size="sm" className="font-mono text-[10px]">
                    {career.category} Trajectory
                  </Badge>
                  {career.sanskritDomain && (
                    <span className="text-xs text-amber-300 font-serif italic">
                      {career.sanskritDomain}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {career.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {career.description}
                </p>
              </div>

              {/* Match Gauge */}
              <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 text-center min-w-[130px] flex-shrink-0">
                <div className="text-3xl font-extrabold text-amber-400 font-mono">
                  {overallMatchScore}%
                </div>
                <span className="text-[10px] uppercase tracking-wider text-gray-300 font-bold block mt-0.5">
                  Current Readiness
                </span>
                <span className="text-[9px] text-emerald-400 block mt-1 font-semibold">
                  {overallMatchScore >= 80 ? "Optimal Candidate" : "Gap In Remediation"}
                </span>
              </div>
            </div>

            {/* Role Overview Metas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-black/30 border border-emerald-500/15 text-xs">
              <div>
                <span className="text-[10px] uppercase text-muted-foreground block">Typical Entry CTC</span>
                <span className="font-bold text-emerald-400 text-sm">{formatINR(career.averageStartingCtcInr)}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-muted-foreground block">Projected Growth</span>
                <span className="font-semibold text-amber-300 text-sm">{career.projectedGrowth}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-muted-foreground block">Key Sample Roles</span>
                <span className="font-medium text-white truncate block">{career.sampleRoles[0]}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-muted-foreground block">Premier Employers</span>
                <span className="font-medium text-white truncate block">{career.keyEmployers[0]}</span>
              </div>
            </div>

            {/* Required Skills vs Student Match Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Target className="h-4 w-4 text-emerald-400" />
                  <span>Required Competency Benchmarks ({matchedSkills.length})</span>
                </h4>
                <span className="text-[11px] text-muted-foreground">Threshold vs Student DNA</span>
              </div>

              <div className="space-y-2.5">
                {matchedSkills.map((sk, idx) => {
                  const meets = sk.studentProficiency >= sk.requiredProficiency;
                  const near = !meets && sk.studentProficiency >= sk.requiredProficiency - 12;

                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          {meets ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                          ) : near ? (
                            <AlertCircle className="h-4 w-4 text-amber-400 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                          )}
                          <span className="font-semibold text-white">{sk.skillName}</span>
                        </div>

                        <div className="flex items-center gap-3 font-mono text-[11px]">
                          <span className="text-gray-400">Req: {sk.requiredProficiency}%</span>
                          <span
                            className={`font-bold ${
                              meets ? "text-emerald-400" : near ? "text-amber-400" : "text-rose-400"
                            }`}
                          >
                            You: {sk.studentProficiency}%
                          </span>
                          <Badge
                            variant={meets ? "verified" : near ? "gold" : "destructive"}
                            size="sm"
                            className="text-[9px]"
                          >
                            {sk.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Progress Bar Dual Layer */}
                      <div className="relative h-2 w-full bg-black/60 rounded-full overflow-hidden border border-white/10">
                        {/* Target Marker */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-10"
                          style={{ left: `${sk.requiredProficiency}%` }}
                        />
                        {/* Current Student Fill */}
                        <div
                          className={`h-full transition-all duration-700 ${
                            meets
                              ? "bg-gradient-to-r from-emerald-600 to-emerald-400"
                              : near
                              ? "bg-gradient-to-r from-amber-600 to-amber-400"
                              : "bg-gradient-to-r from-rose-600 to-rose-400"
                          }`}
                          style={{ width: `${sk.studentProficiency}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Preferred Skills */}
            {career.preferredSkills.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Preferred / Value-Add Skills:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {career.preferredSkills.map((ps, idx) => (
                    <Badge key={idx} variant="outline" size="sm" className="text-[10px] border-emerald-500/30 text-emerald-300">
                      + {ps}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Next Recommended Action Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-[#032416] to-black border border-amber-400/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold text-amber-300">
                  <Award className="h-3.5 w-3.5" />
                  <span>Recommended Next Action to Qualify</span>
                </div>
                <h5 className="text-sm font-bold text-white">
                  {recommendedNextAction}
                </h5>
                <p className="text-[11px] text-gray-300">
                  Primary Skill Deficit to close:{" "}
                  <span className="text-amber-300 font-semibold">{primaryGap}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link href="/learning">
                  <Button variant="gold" size="sm" className="text-xs font-bold gap-1">
                    <span>Remediate in Learning</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
                <Link href="/opportunities">
                  <Button variant="outline" size="sm" className="text-xs border-emerald-500/40 text-emerald-300">
                    View Jobs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
