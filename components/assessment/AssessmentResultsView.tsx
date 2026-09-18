"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import {
  AssessmentDiagnosticResult,
  SkillAssessmentDomain,
} from "@/lib/services/questionEngine";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Download,
  Sparkles,
  TrendingUp,
  ShieldAlert,
  BookOpen,
  Award,
  Stethoscope,
  Activity,
  Layers,
  ChevronRight,
  Check,
} from "lucide-react";
import { AssessmentQuestionReview } from "@/components/assessment/AssessmentQuestionReview";

interface AssessmentResultsViewProps {
  result: AssessmentDiagnosticResult;
  onApplyToDashboard: () => void;
  onRetake: () => void;
  isApplying?: boolean;
}

export function AssessmentResultsView({
  result,
  onApplyToDashboard,
  onRetake,
  isApplying = false,
}: AssessmentResultsViewProps) {
  const [copied, setCopied] = React.useState(false);

  const handleShareOrPrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* 1. HERO EVALUATION BANNER */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#0D2016] via-[#0B1711] to-[#08120D] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Diagnostic Assessment Complete</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ayurveda Skill DNA & Gap Analysis
            </h1>

            <p className="text-sm sm:text-base text-white/70 max-w-xl leading-relaxed">
              Assessment evaluated across clinical case-taking, therapeutics, Panchakarma protocols,
              and bioethics. Your technical profile has been calibrated against Ayush industry
              standards.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Level: </span>
                <strong className="text-white font-semibold">
                  {result.readinessLevel} ({result.readinessLabel})
                </strong>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Calibrated Competency: </span>
                <strong className="text-emerald-300 font-semibold">{result.overallScore}%</strong>
              </div>
            </div>
          </div>

          {/* Progress Ring Card */}
          <div className="shrink-0 flex flex-col items-center justify-center p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md shadow-xl">
            <ProgressRing
              value={result.overallScore}
              size={140}
              strokeWidth={10}
              label="Readiness"
              sublabel={result.readinessLabel}
            />
            <span className="text-[11px] text-white/50 mt-3 uppercase tracking-wider font-semibold">
              AI Competency Index
            </span>
          </div>
        </div>
      </div>

      {/* 2. CAREER DNA RE-CALIBRATION */}
      <div className="rounded-3xl border border-white/10 bg-[#0B1510]/80 p-6 sm:p-8 backdrop-blur-md shadow-xl">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Calibrated Career DNA</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
              Multi-Track Aptitude Distribution
            </h2>
          </div>
          <span className="text-xs text-white/50 hidden sm:inline">
            Post-Diagnostic Recalibration
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/70 font-medium">Clinical</span>
              <span className="text-emerald-400 font-bold font-mono">
                {result.calibratedCareerDna.clinical}%
              </span>
            </div>
            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${result.calibratedCareerDna.clinical}%` }}
              />
            </div>
            <span className="text-[11px] text-white/40 block">Roga Nidana & Chikitsa</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/70 font-medium">Research</span>
              <span className="text-blue-400 font-bold font-mono">
                {result.calibratedCareerDna.research}%
              </span>
            </div>
            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${result.calibratedCareerDna.research}%` }}
              />
            </div>
            <span className="text-[11px] text-white/40 block">GCP Trials & Evidence</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/70 font-medium">Panchakarma</span>
              <span className="text-amber-400 font-bold font-mono">
                {result.calibratedCareerDna.panchakarma}%
              </span>
            </div>
            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${result.calibratedCareerDna.panchakarma}%` }}
              />
            </div>
            <span className="text-[11px] text-white/40 block">Shodhana & NABH Safety</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/70 font-medium">Herbal Pharma</span>
              <span className="text-purple-400 font-bold font-mono">
                {result.calibratedCareerDna.pharma}%
              </span>
            </div>
            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-purple-500 rounded-full"
                style={{ width: `${result.calibratedCareerDna.pharma}%` }}
              />
            </div>
            <span className="text-[11px] text-white/40 block">Dravyaguna & Quality</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/70 font-medium">Teaching</span>
              <span className="text-rose-400 font-bold font-mono">
                {result.calibratedCareerDna.teaching || 54}%
              </span>
            </div>
            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-rose-500 rounded-full"
                style={{ width: `${result.calibratedCareerDna.teaching || 54}%` }}
              />
            </div>
            <span className="text-[11px] text-white/40 block">Adhyapana & Pedagogy</span>
          </div>
        </div>
      </div>

      {/* 3. DOMAIN-BY-DOMAIN COMPETENCY SUMMARY */}
      <div className="rounded-3xl border border-white/10 bg-[#0B1510]/80 p-6 sm:p-8 backdrop-blur-md shadow-xl">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
          Domain Competency Breakdown
        </h2>
        <p className="text-xs sm:text-sm text-white/60 mb-6">
          Evaluates classical Ayurveda methodologies alongside contemporary evidence protocols.
        </p>

        <div className="space-y-4">
          {result.domainScores.map((domainItem) => {
            const statusConfig = {
              Mastery: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
              Proficient: "bg-teal-500/20 text-teal-300 border-teal-500/30",
              Developing: "bg-amber-500/20 text-amber-300 border-amber-500/30",
              "Critical Gap": "bg-rose-500/20 text-rose-300 border-rose-500/30",
            }[domainItem.status];

            return (
              <div
                key={domainItem.domain}
                className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm sm:text-base text-white">
                      {domainItem.label}
                    </span>
                    <span className="text-xs font-serif italic text-white/40">
                      ({domainItem.sanskrit})
                    </span>
                  </div>
                  <span className="text-xs text-white/50 block">
                    {domainItem.questionsCount} diagnostic scenario(s) tested
                  </span>
                </div>

                <div className="flex items-center gap-4 sm:w-1/2">
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-white/60">Competency</span>
                      <span className="text-white font-semibold">{domainItem.scorePercentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/10">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          domainItem.scorePercentage >= 75
                            ? "bg-emerald-500"
                            : domainItem.scorePercentage >= 50
                            ? "bg-amber-500"
                            : "bg-rose-500"
                        )}
                        style={{ width: `${domainItem.scorePercentage}%` }}
                      />
                    </div>
                  </div>

                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-semibold border shrink-0",
                      statusConfig
                    )}
                  >
                    {domainItem.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. STRENGTHS & IDENTIFIED SKILL GAPS (SIDE BY SIDE) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Validated Strengths */}
        <div className="rounded-3xl border border-emerald-900/40 bg-[#071710]/90 p-6 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
            <CheckCircle2 className="w-5 h-5" />
            <h3>Validated Strengths</h3>
          </div>
          <p className="text-xs text-white/60">
            Competencies demonstrated at high industry proficiency during this evaluation.
          </p>

          <div className="space-y-3 pt-2">
            {result.strengths.map((str, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 space-y-1"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-200">{str.skillName}</span>
                  <span className="font-mono text-emerald-400 font-semibold">{str.score}</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">{str.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Skill Gaps */}
        <div className="rounded-3xl border border-amber-900/40 bg-[#171107]/90 p-6 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <ShieldAlert className="w-5 h-5" />
            <h3>Actionable Skill Gaps</h3>
          </div>
          <p className="text-xs text-white/60">
            Identified areas of clinical hesitation or protocol knowledge deficit.
          </p>

          <div className="space-y-3 pt-2">
            {result.skillGaps.map((gap, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-amber-200">{gap.skillName}</span>
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border",
                      gap.severity === "HIGH"
                        ? "bg-rose-950/60 text-rose-300 border-rose-800/60"
                        : "bg-amber-950/60 text-amber-300 border-amber-800/60"
                    )}
                  >
                    {gap.severity} Priority
                  </span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">{gap.clinicalImpact}</p>
                <div className="flex items-center gap-1.5 pt-1 text-[11px] text-amber-300/80 font-medium">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Bridge With: {gap.recommendedCourse}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. RECOMMENDED BRIDGE ROADMAP */}
      <div className="rounded-3xl border border-white/10 bg-[#0B1510]/80 p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-white">
          Curated Skill Gap Bridge Actions
        </h2>
        <p className="text-xs sm:text-sm text-white/60">
          Targeted micro-learning simulations designed to elevate your Competency Passport.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {result.recommendedActions.map((action) => (
            <div
              key={action.id}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/50 border border-emerald-800/40">
                  {action.type}
                </span>
                <h4 className="font-semibold text-xs sm:text-sm text-white mt-2 leading-snug">
                  {action.title}
                </h4>
              </div>
              <div className="flex items-center justify-between text-xs text-white/50 border-t border-white/5 pt-2 font-mono">
                <span>{action.duration}</span>
                <span className="text-amber-400 font-bold">{action.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5.5 DETAILED QUESTION REVIEWS, WRONG ANSWERS & CLINICAL EXPLANATIONS */}
      {result.questionReviews && result.questionReviews.length > 0 && (
        <div className="rounded-3xl border border-white/10 bg-[#0B1510]/80 p-6 sm:p-8 backdrop-blur-md shadow-xl">
          <AssessmentQuestionReview reviews={result.questionReviews} />
        </div>
      )}

      {/* 6. BOTTOM ACTION BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="ghost"
            size="md"
            onClick={onRetake}
            className="w-full sm:w-auto text-white/70 hover:text-white hover:bg-white/5 border border-white/10 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Retake Diagnostic
          </Button>

          <Button
            variant="ghost"
            size="md"
            onClick={handleShareOrPrint}
            className="w-full sm:w-auto text-white/70 hover:text-white hover:bg-white/5 border border-white/10 text-xs"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export Summary
          </Button>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={onApplyToDashboard}
          disabled={isApplying}
          className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 hover:from-emerald-500 hover:to-teal-400 text-white font-bold shadow-xl shadow-emerald-950/50 px-8"
        >
          {isApplying ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
              <span>Syncing Competency Passport...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>Apply to Scholar Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
