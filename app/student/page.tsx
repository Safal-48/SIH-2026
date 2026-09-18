"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Compass,
  BookOpen,
  Building2,
  Clock,
  Target,
  Zap,
  TrendingUp,
  Award,
  ChevronRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MarketingNavbar } from "@/components/marketing/MarketingNavbar";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { useAuth } from "@/hooks/useAuth";
import {
  getDecisionSupportOverview,
  loadSkillDna,
  DecisionSupportOverview,
  SkillDnaItem,
} from "@/lib/services/skillIntelligenceService";
import { loadOnboardingDraftLocally } from "@/lib/services/studentOnboarding";
import { cn } from "@/lib/utils/cn";

export default function StudentDecisionDashboard() {
  const router = useRouter();
  const { user } = useAuth();

  const [selectedGoal, setSelectedGoal] = React.useState<string>("Clinical Practice (Kayachikitsa)");
  const [overview, setOverview] = React.useState<DecisionSupportOverview | null>(null);
  const [goalModalOpen, setGoalModalOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const onboarding = loadOnboardingDraftLocally();
    const initialGoal = onboarding?.primaryCareerGoal
      ? `${onboarding.primaryCareerGoal} (Ayurveda)`
      : "Clinical Practice (Kayachikitsa)";
    setSelectedGoal(initialGoal);
    setOverview(getDecisionSupportOverview(initialGoal));
  }, []);

  const handleSelectGoal = (goal: string) => {
    setSelectedGoal(goal);
    setOverview(getDecisionSupportOverview(goal));
    setGoalModalOpen(false);
  };

  if (!overview) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-foreground">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Sparkles className="h-5 w-5 text-accent animate-spin" />
          <span>Calibrating Ayush Skill Intelligence...</span>
        </div>
      </div>
    );
  }

  const { overallReadiness, readinessLabel, readinessExplanation, topStrengths, topSkillGaps, nextBestAction, careerGoal, recommendedOpportunity } = overview;

  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* 1. Master Top Navigation */}
      <MarketingNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-8">
        {/* Scholar Identity & Decision Support Mission Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
              <span className="font-semibold text-emerald-400">AYUSH SCHOLAR PORTAL</span>
              <span>/</span>
              <span>DECISION SUPPORT SYSTEM</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-amber-400">Dr. {user?.fullName || "Aarav Sharma"}</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-300/80 mt-1">
              BAMS Final Year • All India Institute of Ayurveda (AIIA), New Delhi • NCISM Reg #DL/2026/09812
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setGoalModalOpen(true)}
              leftIcon={<Compass className="h-4 w-4 text-accent" />}
              className="text-xs border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/60"
            >
              Goal: {careerGoal.title}
            </Button>
            <Link href="/assess">
              <Button variant="gold" size="sm" className="text-xs font-bold shadow-md shadow-accent/20">
                Run Assessment
              </Button>
            </Link>
          </div>
        </div>

        {/* SECTION F: NEXT BEST ACTION (Prominent Decision Support Banner) */}
        <div className="relative overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-r from-[#032014] via-[#06301e] to-[#0d2a1c] p-6 sm:p-7 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400 animate-pulse" />
                <span>Next Best Action Recommendation</span>
                <span className="text-amber-200/60">•</span>
                <span className="text-emerald-300">{nextBestAction.impactScore}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
                {nextBestAction.title}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-normal">
                {nextBestAction.description}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-950/80 px-3 py-2 rounded-xl border border-emerald-500/30">
                <Clock className="h-4 w-4 text-emerald-400" />
                <span>~{nextBestAction.estimatedMinutes} mins</span>
              </div>
              <Link href={nextBestAction.actionUrl}>
                <Button
                  variant="gold"
                  size="md"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="font-bold text-xs sm:text-sm px-6 shadow-lg shadow-amber-500/20"
                >
                  {nextBestAction.actionLabel}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* PRIMARY 2-COLUMN DECISION GRID: Left: Position & Goal | Right: Gaps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT 6 COLS: SECTION A (Skill Readiness) + SECTION C (Career Goal) */}
          <div className="lg:col-span-6 space-y-6">
            {/* SECTION A: Skill Readiness */}
            <div className="rounded-3xl border border-emerald-500/30 bg-[#041a10]/85 backdrop-blur-xl p-6 sm:p-7 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-[11px] uppercase font-bold tracking-wider text-emerald-400">
                    A. Current Competency Position
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white tracking-tight">
                    Overall Skill Readiness
                  </h3>
                </div>
                <Badge
                  variant={overallReadiness >= 75 ? "gold" : "outline"}
                  size="sm"
                  className="font-bold text-xs"
                >
                  {readinessLabel}
                </Badge>
              </div>

              {/* Indicator & Explanation */}
              <div className="flex items-center gap-6 p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/20">
                <div className="relative w-20 h-20 shrink-0 flex items-center justify-center rounded-2xl bg-emerald-900/60 border border-emerald-400/40 text-2xl font-heading font-black text-amber-400 shadow-inner tabular-nums">
                  {overallReadiness}%
                  <div className="absolute -bottom-1 text-[9px] font-sans font-bold uppercase tracking-wider text-emerald-300">
                    Index
                  </div>
                </div>
                <p className="text-xs sm:text-[13px] text-gray-300 leading-relaxed">
                  {readinessExplanation}
                </p>
              </div>

              {/* Current Verified Strengths */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-emerald-400" />
                  <span>Verified Anchor Strengths (≥75% Benchmark)</span>
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {topStrengths.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-card/60 border border-emerald-500/20"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-white">
                            {skill.name}
                          </div>
                          <div className="text-[10px] text-emerald-300/80">
                            {skill.category} • {skill.verificationStatus}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {skill.currentProficiency}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION C: Career Goal */}
            <div className="rounded-3xl border border-emerald-500/30 bg-[#041a10]/85 backdrop-blur-xl p-6 sm:p-7 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-[11px] uppercase font-bold tracking-wider text-amber-400">
                    C. Target Destination
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white tracking-tight">
                    Selected Career Goal
                  </h3>
                </div>
                <button
                  onClick={() => setGoalModalOpen(true)}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4"
                >
                  Change Goal
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-amber-500/30 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs text-gray-400">Primary Track</div>
                  <div className="text-base font-heading font-bold text-white">
                    {careerGoal.title}
                  </div>
                  <div className="text-xs text-emerald-300">
                    {careerGoal.targetRole}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-2xl font-heading font-black text-amber-400 tabular-nums">
                    {careerGoal.alignmentPercentage}%
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                    Role Fit
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 6 COLS: SECTION B (Top 3 Skill Gaps) */}
          <div className="lg:col-span-6">
            <div className="h-full rounded-3xl border border-emerald-500/30 bg-[#041a10]/85 backdrop-blur-xl p-6 sm:p-7 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] uppercase font-bold tracking-wider text-red-400">
                    B. Priority Skill Gaps (Top 3 Deficits)
                  </div>
                  <span className="text-xs text-muted-foreground">Against NCISM Standard</span>
                </div>
                <h3 className="text-xl font-heading font-bold text-white tracking-tight">
                  Actionable Competency Deficits
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  These represent your highest-impact bottlenecks. Resolving them directly elevates your clinical placement suitability.
                </p>
              </div>

              {/* Top 3 Gaps Cards */}
              <div className="space-y-3.5 my-2">
                {topSkillGaps.map((gap, index) => {
                  const isCritical = gap.severity === "CRITICAL";
                  return (
                    <div
                      key={gap.skillId}
                      className={cn(
                        "p-4 rounded-2xl border transition-all space-y-2.5",
                        isCritical
                          ? "bg-red-950/25 border-red-500/30 hover:border-red-500/50"
                          : "bg-amber-950/20 border-amber-500/30 hover:border-amber-500/50"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-card flex items-center justify-center text-[10px] font-bold text-gray-300">
                              #{index + 1}
                            </span>
                            <span className="text-sm font-semibold text-white">
                              {gap.skillName}
                            </span>
                          </div>
                          <div className="text-[11px] text-gray-400 pl-7">
                            {gap.category}
                          </div>
                        </div>

                        <Badge
                          variant={isCritical ? "destructive" : "gold"}
                          size="sm"
                          className="text-[10px] font-bold uppercase tracking-wider shrink-0"
                        >
                          {gap.severity} (-{gap.deficit} pts)
                        </Badge>
                      </div>

                      {/* Progress comparison */}
                      <div className="pl-7 space-y-1">
                        <div className="flex justify-between text-[11px] text-gray-300">
                          <span>Current: <strong className="text-amber-400">{gap.currentScore}%</strong></span>
                          <span>Target: <strong className="text-emerald-400">{gap.targetBenchmark}%</strong></span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-emerald-950/80 overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              isCritical ? "bg-red-400" : "bg-amber-400"
                            )}
                            style={{ width: `${(gap.currentScore / gap.targetBenchmark) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Recommended Action */}
                      <div className="pl-7 pt-1 flex items-center justify-between gap-2">
                        <span className="text-[11px] text-emerald-200/90 font-medium">
                          👉 {gap.recommendedAction}
                        </span>
                        <Link
                          href={`/learning?tab=recommended&focus=${gap.skillId}`}
                          className="text-[11px] font-bold text-amber-400 hover:text-amber-300 shrink-0 flex items-center gap-0.5"
                        >
                          <span>Remediate</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-emerald-900/40 flex items-center justify-between text-xs">
                <span className="text-gray-400">Want to see all competency metrics?</span>
                <Link href="/assess" className="font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                  <span>Explore Full Skill DNA</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM 2-COLUMN SECTION: Left: SECTION D (Recommended Learning) | Right: SECTION E (Recommended Opportunity) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* SECTION D: Recommended Learning (2-3 items) */}
          <div className="lg:col-span-6 rounded-3xl border border-emerald-500/30 bg-[#041a10]/85 backdrop-blur-xl p-6 sm:p-7 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-[11px] uppercase font-bold tracking-wider text-emerald-400">
                  D. Personalized Curriculum
                </div>
                <h3 className="text-xl font-heading font-bold text-white tracking-tight">
                  Recommended Learning for Gaps
                </h3>
              </div>
              <Link href="/learning" className="text-xs font-bold text-amber-400 hover:text-amber-300">
                View All Modules →
              </Link>
            </div>

            <div className="space-y-3">
              {/* Module 1 */}
              <div className="p-4 rounded-2xl bg-card/60 border border-emerald-500/20 hover:border-emerald-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <Badge variant="gold" size="sm" className="text-[10px] mb-1">
                    Directly Addresses: GCP Clinical Trials
                  </Badge>
                  <h4 className="text-sm font-semibold text-white">
                    GCP-Ayush Clinical Trial Protocol & Ethical Clearances
                  </h4>
                  <p className="text-xs text-gray-400">
                    CCRAS-Accredited • 45 mins • Practical Dossier Simulation
                  </p>
                </div>
                <Link href="/learning?tab=recommended" className="shrink-0">
                  <Button variant="outline" size="sm" className="text-xs w-full sm:w-auto">
                    Start Learning
                  </Button>
                </Link>
              </div>

              {/* Module 2 */}
              <div className="p-4 rounded-2xl bg-card/60 border border-emerald-500/20 hover:border-emerald-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <Badge variant="outline" size="sm" className="text-[10px] mb-1 border-emerald-500/40 text-emerald-300">
                    Directly Addresses: Dravyaguna Standardization
                  </Badge>
                  <h4 className="text-sm font-semibold text-white">
                    Phytochemical Markers & Rasa Panchaka Pharmacology
                  </h4>
                  <p className="text-xs text-gray-400">
                    AIIA Faculty Lab • 30 mins • HPTLC Interactive Simulation
                  </p>
                </div>
                <Link href="/learning?tab=recommended" className="shrink-0">
                  <Button variant="outline" size="sm" className="text-xs w-full sm:w-auto">
                    Start Learning
                  </Button>
                </Link>
              </div>

              {/* Module 3 */}
              <div className="p-4 rounded-2xl bg-card/60 border border-emerald-500/20 hover:border-emerald-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <Badge variant="outline" size="sm" className="text-[10px] mb-1 border-emerald-500/40 text-emerald-300">
                    Directly Addresses: Inpatient Diagnostics
                  </Badge>
                  <h4 className="text-sm font-semibold text-white">
                    Complex Rogamarga & Ashtavidha Clinical Case Interpretation
                  </h4>
                  <p className="text-xs text-gray-400">
                    NCISM CBDC Standards • 25 mins • 4 Patient Vignettes
                  </p>
                </div>
                <Link href="/learning?tab=practice" className="shrink-0">
                  <Button variant="outline" size="sm" className="text-xs w-full sm:w-auto">
                    Practice Cases
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* SECTION E: Recommended Opportunity (Single verified example + why relevant) */}
          <div className="lg:col-span-6 rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#052818] to-[#02180e] p-6 sm:p-7 shadow-xl flex flex-col justify-between space-y-5">
            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold tracking-wider text-amber-400">
                  E. Top Matched Opportunity
                </span>
                <Badge variant="gold" size="sm" className="text-xs font-bold">
                  {recommendedOpportunity.matchScore}% Match
                </Badge>
              </div>
              <h3 className="text-xl font-heading font-bold text-white tracking-tight">
                Apex Fellowship Benchmark
              </h3>
            </div>

            <div className="p-5 rounded-2xl bg-card/75 border border-amber-500/30 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-white">
                    {recommendedOpportunity.title}
                  </h4>
                  <div className="text-xs font-semibold text-emerald-400">
                    {recommendedOpportunity.organization}
                  </div>
                  <div className="text-xs text-gray-400">
                    {recommendedOpportunity.location} • {recommendedOpportunity.stipend}
                  </div>
                </div>
                <Building2 className="h-6 w-6 text-amber-400 shrink-0" />
              </div>

              {/* WHY THIS IS RELEVANT CALLOUT */}
              <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-xs text-emerald-100/90 leading-relaxed">
                <strong className="text-amber-300 font-bold block mb-1">
                  💡 Why this is relevant to you:
                </strong>
                {recommendedOpportunity.whyRelevant}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Link href="/opportunities" className="text-xs text-gray-400 hover:text-white">
                Explore 350+ Other Openings
              </Link>
              <Link href="/opportunities">
                <Button variant="gold" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />} className="text-xs font-bold">
                  Review & Apply
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Career Goal Switcher Modal */}
      {goalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-[#03190f] border border-emerald-500/40 p-6 sm:p-7 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-emerald-900/50 pb-3">
              <div>
                <h3 className="text-lg font-heading font-bold text-white">Select Career Track</h3>
                <p className="text-xs text-gray-300">Calibrates your benchmark thresholds and opportunity matching.</p>
              </div>
              <button onClick={() => setGoalModalOpen(false)} className="text-gray-400 hover:text-white text-sm">✕</button>
            </div>

            <div className="space-y-2.5">
              {[
                { title: "Clinical Practice (Kayachikitsa)", role: "Hospital Resident & Inpatient Vaidya" },
                { title: "Panchakarma & Wellness Management", role: "Specialized Shodhana Center Lead" },
                { title: "Herbal Pharmaceutical R&D", role: "Formulation Scientist & Drug Standardization" },
                { title: "Ayush Research & Clinical Trials", role: "CCRAS / WHO Protocol Investigator" },
                { title: "Academician & Teaching Faculty", role: "Assistant Professor & Clinical Guide" },
              ].map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleSelectGoal(item.title)}
                  className={cn(
                    "w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between",
                    selectedGoal === item.title
                      ? "bg-amber-500/20 border-amber-500 text-white font-bold"
                      : "bg-card/50 border-border hover:bg-emerald-950/60 text-gray-200"
                  )}
                >
                  <div>
                    <div className="text-xs sm:text-sm font-semibold">{item.title}</div>
                    <div className="text-[11px] text-gray-400">{item.role}</div>
                  </div>
                  {selectedGoal === item.title && <Check className="h-4 w-4 text-amber-400" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <MarketingFooter />
    </div>
  );
}
