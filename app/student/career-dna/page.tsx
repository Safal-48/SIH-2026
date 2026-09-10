"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Dna,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Download,
  RotateCcw,
  BookOpen,
  Briefcase,
  Award,
  Stethoscope,
  FlaskConical,
  Activity,
  ShieldCheck,
  ChevronRight,
  Clock,
  Layers,
  FileText,
  UserCheck,
  ExternalLink,
  Flame,
  Check,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/cards/Card";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { StudentSidebar } from "@/components/dashboard/StudentSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import {
  loadAssessmentResultLocally,
  AssessmentDiagnosticResult,
} from "@/lib/services/questionEngine";
import { loadOnboardingDraftLocally } from "@/lib/services/studentOnboarding";
import { cn } from "@/lib/utils/cn";

interface CareerTrack {
  id: string;
  name: string;
  sanskrit: string;
  icon: string;
  percentage: number;
  blockVisual: string;
  status: string;
  statusColor: string;
  colorHex: string;
  primaryRole: string;
  matchedInstitutes: string[];
  keyCompetencies: string[];
}

function CareerDnaPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams?.get("tab") === "skill-gap" ? "gap" : "dna";

  const { user } = useAuth();
  const [activeTab, setActiveTab] = React.useState<"dna" | "gap" | "actions">(initialTab);
  const [assessmentResult, setAssessmentResult] =
    React.useState<AssessmentDiagnosticResult | null>(null);
  const [onboardingData, setOnboardingData] = React.useState(loadOnboardingDraftLocally());

  // Interactive Action Simulator State
  const [completedActions, setCompletedActions] = React.useState<string[]>([]);
  const [activeModalAction, setActiveModalAction] = React.useState<string | null>(null);
  const [soapNotes, setSoapNotes] = React.useState({
    subjective: "Patient reports chronic bilateral knee pain, morning stiffness > 45 mins, and heaviness in abdomen (Alasya).",
    objective: "Swelling in bilateral Janusandhi with mild local temperature. Nadi: Mandam, Kaphaja with Ama lakshana. Agni: Mandagni.",
    assessment: "Amavata (Madhyama Rogamarga) secondary to Jataragni and Dhatwagni mandya.",
    plan: "Deepana-Pachana with Shunthi-Dhanyaka Kwatha, followed by Valuka Sweda. Avoid dadhi and sheeta ahara.",
  });
  const [caseScenarioAnswer, setCaseScenarioAnswer] = React.useState<string | null>(null);
  const [caseScenarioSolved, setCaseScenarioSolved] = React.useState<boolean>(false);

  React.useEffect(() => {
    setOnboardingData(loadOnboardingDraftLocally());
    setAssessmentResult(loadAssessmentResultLocally());
  }, []);

  const displayName = user?.fullName || "Aarav Sharma";
  const degree = onboardingData?.degree || "BAMS";
  const academicYear = onboardingData?.currentYear || "Final Year";
  const institution = onboardingData?.college || "All India Institute of Ayurveda, New Delhi";

  // Calibrated Career DNA Values
  const dnaScores = assessmentResult?.calibratedCareerDna || {
    clinical: 84,
    research: 71,
    panchakarma: 68,
    pharma: 62,
    teaching: 54,
  };

  const careerTracks: CareerTrack[] = [
    {
      id: "clinical",
      name: "Clinical",
      sanskrit: "Chikitsaka",
      icon: "🩺",
      percentage: dnaScores.clinical,
      blockVisual: "█████████",
      status: "Top Match",
      statusColor: "text-emerald-400 bg-emerald-950/40 border-emerald-800/60",
      colorHex: "#10b981",
      primaryRole: "Hospital Resident / Inpatient Kayachikitsa Specialist",
      matchedInstitutes: ["AIIA New Delhi", "National Institute of Ayurveda Jaipur"],
      keyCompetencies: ["Roga Nidana", "Ashtavidha Pariksha", "Differential Diagnosis", "Chikitsa Sutra"],
    },
    {
      id: "research",
      name: "Research",
      sanskrit: "Anusandhana",
      icon: "🔬",
      percentage: dnaScores.research,
      blockVisual: "███████",
      status: "Strong Fit",
      statusColor: "text-blue-400 bg-blue-950/40 border-blue-800/60",
      colorHex: "#3b82f6",
      primaryRole: "Clinical Research Associate / CCRAS Research Fellow",
      matchedInstitutes: ["CCRAS Headquarters", "CSIR-TKDL", "ICMR-NIMS"],
      keyCompetencies: ["GCP-Ayush Compliance", "Evidence Protocol Design", "CTRI Trials", "Data Analysis"],
    },
    {
      id: "panchakarma",
      name: "Panchakarma",
      sanskrit: "Shodhana",
      icon: "🌿",
      percentage: dnaScores.panchakarma,
      blockVisual: "██████",
      status: "Promising",
      statusColor: "text-amber-400 bg-amber-950/40 border-amber-800/60",
      colorHex: "#f59e0b",
      primaryRole: "NABH Panchakarma Physician / Shodhana Unit Lead",
      matchedInstitutes: ["Arya Vaidya Sala Kottakkal", "Kottakkal Arya Vaidya Sala Hospital"],
      keyCompetencies: ["Snehapana Dosing", "Snehavyapat Triage", "Pradhana Karma", "Pashchat Karma"],
    },
    {
      id: "pharma",
      name: "Herbal Pharma",
      sanskrit: "Dravyaguna",
      icon: "💊",
      percentage: dnaScores.pharma,
      blockVisual: "█████",
      status: "Emerging",
      statusColor: "text-purple-400 bg-purple-950/40 border-purple-800/60",
      colorHex: "#a855f7",
      primaryRole: "Phytomedicine Formulation Analyst / QA Scientist",
      matchedInstitutes: ["Dabur Research Foundation", "Himalaya Wellness R&D"],
      keyCompetencies: ["HPTLC Standardization", "Pharmacopoeia Compliance", "Adulterant Testing"],
    },
    {
      id: "teaching",
      name: "Teaching",
      sanskrit: "Adhyapana",
      icon: "📚",
      percentage: dnaScores.teaching,
      blockVisual: "████",
      status: "Viable",
      statusColor: "text-rose-400 bg-rose-950/40 border-rose-800/60",
      colorHex: "#f43f5e",
      primaryRole: "Assistant Lecturer / Academic Clinical Preceptor",
      matchedInstitutes: ["NCISM Accredited Colleges", "State Ayurveda Universities"],
      keyCompetencies: ["Pedagogical Instruction", "Samhita Recitation", "Student Mentorship"],
    },
  ];

  const overallReadiness = assessmentResult?.overallScore || 78;
  const readinessLabel = assessmentResult?.readinessLabel || "Developing";

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  const handleCompleteCaseDoc = () => {
    setCompletedActions((prev) => [...prev, "act-1"]);
    setActiveModalAction(null);
  };

  const handleSolveScenario = () => {
    if (caseScenarioAnswer === "B") {
      setCaseScenarioSolved(true);
      setCompletedActions((prev) => [...prev, "act-2"]);
      setTimeout(() => setActiveModalAction(null), 1200);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row selection:bg-emerald-500 selection:text-black">
      {/* 1. Collapsible Sidebar */}
      <StudentSidebar activeTab="career-dna" />

      {/* 2. Main Body Container */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-12">
        {/* Top Header */}
        <div className="px-4 sm:px-6 lg:px-8 pt-6">
          <DashboardHeader />
        </div>

        {/* Career DNA Command Center */}
        <main className="px-4 sm:px-6 lg:px-8 py-6 space-y-8 flex-1 max-w-7xl w-full mx-auto">
          {/* Breadcrumb & Top Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Link href="/student" className="hover:text-foreground transition-colors">
                Scholar Portal
              </Link>
              <span>/</span>
              <span className="text-foreground font-semibold">Career DNA & Skill Gap</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/student/assessment")}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                Retake Diagnostic
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="text-xs"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Export Career Passport PDF
              </Button>
            </div>
          </div>

          {/* HERO BANNER: Post-Assessment Intelligence Overview */}
          <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card to-primary/10 p-6 sm:p-8 shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="gold" size="sm" icon={<Sparkles className="w-3 h-3" />}>
                    NCISM Calibrated
                  </Badge>
                  <Badge variant="verified" size="sm" icon={<ShieldCheck className="w-3 h-3" />}>
                    Stage 03: Career DNA & Skill Gap
                  </Badge>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground font-sans">
                  Ayurveda Career DNA & Gap Intelligence
                </h1>

                <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
                  Scholar: <strong className="text-foreground">{displayName}</strong> • {degree} ({academicYear}) • {institution}
                  <br />
                  Evaluated through classical case vignettes, pharmacology scenarios, and bioethics protocols.
                </p>

                {/* Tab Navigation Pill Bar */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setActiveTab("dna")}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border",
                      activeTab === "dna"
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : "bg-card border-border hover:bg-muted text-muted-foreground"
                    )}
                  >
                    <Dna className="w-4 h-4" />
                    <span>YOUR AYURVEDA CAREER DNA</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("gap")}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border",
                      activeTab === "gap"
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : "bg-card border-border hover:bg-muted text-muted-foreground"
                    )}
                  >
                    <TrendingDown className="w-4 h-4" />
                    <span>Skill Gap Triage</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("actions")}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border",
                      activeTab === "actions"
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : "bg-card border-border hover:bg-muted text-muted-foreground"
                    )}
                  >
                    <Activity className="w-4 h-4" />
                    <span>Next 3 Actions ({completedActions.length}/3)</span>
                  </button>
                </div>
              </div>

              {/* Progress Ring Card */}
              <div className="shrink-0 flex flex-col items-center justify-center p-5 rounded-2xl bg-card/80 border border-border shadow-lg">
                <ProgressRing
                  value={overallReadiness}
                  size={125}
                  strokeWidth={9}
                  label="Readiness"
                  sublabel={readinessLabel}
                />
                <span className="text-[11px] font-semibold text-muted-foreground mt-2 uppercase tracking-wider">
                  Clinical Aptitude Index
                </span>
              </div>
            </div>
          </div>

          {/* TAB 1: YOUR AYURVEDA CAREER DNA */}
          {(activeTab === "dna" || activeTab === "actions") && (
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                    <Dna className="w-5 h-5 text-accent" />
                    YOUR AYURVEDA CAREER DNA
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Algorithmic multi-track aptitude calibration across 5 core Ayush professional pathways.
                  </p>
                </div>

                <div className="font-mono text-xs text-muted-foreground bg-card px-3 py-1.5 rounded-xl border border-border">
                  Primary Match: <strong className="text-emerald-500">Clinical (84%)</strong>
                </div>
              </div>

              {/* ASCII Block Visual + Progress Meter Table */}
              <div className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-6">
                <div className="space-y-4">
                  {careerTracks.map((track) => (
                    <div
                      key={track.id}
                      className="p-4 rounded-2xl bg-muted/20 border border-border/70 hover:border-primary/40 transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{track.icon}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-base text-foreground">
                                {track.name}
                              </span>
                              <span className="text-xs font-serif italic text-accent">
                                ({track.sanskrit})
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {track.primaryRole}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {/* Block representation requested by user */}
                          <div className="hidden md:flex items-center gap-2 font-mono text-xs px-3 py-1 rounded-lg bg-black/40 text-primary border border-white/5">
                            <span className="tracking-widest font-extrabold">{track.blockVisual}</span>
                          </div>

                          <div className="text-right">
                            <span className="text-xl font-mono font-extrabold text-foreground">
                              {track.percentage}%
                            </span>
                            <span
                              className={cn(
                                "block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border mt-0.5",
                                track.statusColor
                              )}
                            >
                              {track.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Progress Meter Bar */}
                      <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden border border-border/40">
                        <div
                          className="h-full bg-gradient-to-r from-primary via-herbal-500 to-accent rounded-full transition-all duration-700 shadow-sm"
                          style={{ width: `${track.percentage}%` }}
                        />
                      </div>

                      {/* Matched Institutes & Competencies */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-muted-foreground border-t border-border/40">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-foreground">Matched Institutes:</span>
                          <span>{track.matchedInstitutes.join(" • ")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-accent font-semibold">Core:</span>
                          <span>{track.keyCompetencies.slice(0, 3).join(", ")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* TAB 2: SKILL GAP (Critical, Moderate, Strong) */}
          {(activeTab === "gap" || activeTab === "dna") && (
            <section className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-accent" />
                    Skill Gap Triage
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Direct comparison against NCISM residency entrance and AYUSH clinical benchmarks.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="text-muted-foreground">Critical</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ml-2" />
                  <span className="text-muted-foreground">Moderate</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ml-2" />
                  <span className="text-muted-foreground">Strong</span>
                </div>
              </div>

              {/* 3 Explicit Tiers: Critical, Moderate, Strong */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. CRITICAL: Clinical Documentation */}
                <div className="p-6 rounded-3xl bg-card border-2 border-rose-500/40 shadow-lg space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-500 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> Critical
                    </span>
                    <span className="font-mono text-xs font-bold text-rose-400">-35 pts deficit</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-foreground">Clinical Documentation</h3>
                    <p className="text-xs font-serif italic text-rose-400">Rugna Vrittanta</p>
                  </div>

                  <div className="p-3 rounded-xl bg-muted/40 border border-border text-xs text-muted-foreground space-y-1.5">
                    <strong className="text-foreground block">Clinical Diagnosis:</strong>
                    <p className="leading-relaxed">
                      Hesitation in electronic SOAP records, in-patient handover summaries, and Rogamarga classification during hospital rounds.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-medium">Bridging Requirement:</span>
                    <Button
                      variant="gold"
                      size="sm"
                      onClick={() => setActiveModalAction("act-1")}
                      className="text-xs py-1 h-8"
                    >
                      Action 01: Practice SOAP
                    </Button>
                  </div>
                </div>

                {/* 2. MODERATE: Research Documentation */}
                <div className="p-6 rounded-3xl bg-card border-2 border-amber-500/40 shadow-lg space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-500 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> Moderate
                    </span>
                    <span className="font-mono text-xs font-bold text-amber-400">-28 pts deficit</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-foreground">Research Documentation</h3>
                    <p className="text-xs font-serif italic text-amber-400">Anusandhana Vidhi</p>
                  </div>

                  <div className="p-3 rounded-xl bg-muted/40 border border-border text-xs text-muted-foreground space-y-1.5">
                    <strong className="text-foreground block">Research Diagnosis:</strong>
                    <p className="leading-relaxed">
                      Need for deeper familiarity with ICMR-CCRAS trial protocol submissions, CTRI prospective registry formats, and ethics clearances.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-medium">Bridging Requirement:</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveModalAction("act-2")}
                      className="text-xs py-1 h-8 text-amber-400 border-amber-500/40"
                    >
                      Action 02: Case Puzzle
                    </Button>
                  </div>
                </div>

                {/* 3. STRONG: Patient Communication */}
                <div className="p-6 rounded-3xl bg-card border-2 border-emerald-500/40 shadow-lg space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Strong
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-400">92% Mastery</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-foreground">Patient Communication</h3>
                    <p className="text-xs font-serif italic text-emerald-400">Rogi Sambhashana</p>
                  </div>

                  <div className="p-3 rounded-xl bg-muted/40 border border-border text-xs text-muted-foreground space-y-1.5">
                    <strong className="text-foreground block">Competency Assessment:</strong>
                    <p className="leading-relaxed">
                      High patient rapport, empathetic bedside manner, clear prognosis communication, and classical Nidana clarification. Ready for OPD duties.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-medium">Verified Status:</span>
                    <span className="text-xs font-bold text-emerald-400">Residency Ready ✓</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB 3: NEXT 3 ACTIONS (01, 02, 03) */}
          <section id="actions" className="space-y-6 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  Next 3 Actions
                </h2>
                <p className="text-xs text-muted-foreground">
                  Personalized execution roadmap designed to immediately bridge identified gaps and unlock matched postings.
                </p>
              </div>

              <span className="text-xs font-mono text-accent bg-accent/10 px-3 py-1.5 rounded-xl border border-accent/20">
                {completedActions.length} of 3 Milestones Completed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* ACTION 01 */}
              <div
                className={cn(
                  "p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-4 relative",
                  completedActions.includes("act-1")
                    ? "bg-emerald-950/20 border-emerald-500/50 shadow-md"
                    : "bg-card border-border hover:border-accent/40 shadow-sm"
                )}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-accent text-accent-foreground font-mono font-extrabold text-base flex items-center justify-center shadow-md">
                      01
                    </div>
                    {completedActions.includes("act-1") ? (
                      <Badge variant="verified" size="sm" icon={<Check className="w-3 h-3" />}>
                        Completed
                      </Badge>
                    ) : (
                      <Badge variant="gold" size="sm">
                        High Impact
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-foreground">
                    Complete Case Documentation
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Practice writing structured electronic inpatient SOAP records for complex Kayachikitsa admissions.
                  </p>

                  <div className="p-3 rounded-xl bg-muted/30 border border-border/60 text-xs space-y-1 font-mono">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Target Competency:</span>
                      <strong className="text-foreground">Rugna Vrittanta</strong>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Readiness Gain:</span>
                      <strong className="text-accent">+18 pts</strong>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Estimated Time:</span>
                      <span>25 mins</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant={completedActions.includes("act-1") ? "outline" : "gold"}
                  size="md"
                  onClick={() => setActiveModalAction("act-1")}
                  className="w-full justify-center"
                >
                  {completedActions.includes("act-1") ? "Review Documentation" : "Launch Charting Tool"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* ACTION 02 */}
              <div
                className={cn(
                  "p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-4 relative",
                  completedActions.includes("act-2")
                    ? "bg-emerald-950/20 border-emerald-500/50 shadow-md"
                    : "bg-card border-border hover:border-accent/40 shadow-sm"
                )}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground font-mono font-extrabold text-base flex items-center justify-center shadow-md">
                      02
                    </div>
                    {completedActions.includes("act-2") ? (
                      <Badge variant="verified" size="sm" icon={<Check className="w-3 h-3" />}>
                        Completed
                      </Badge>
                    ) : (
                      <Badge variant="secondary" size="sm">
                        Simulation
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-foreground">
                    Practice Case Scenario
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Interactive clinical emergency puzzle resolving Snehavyapat complications during Shodhana therapy.
                  </p>

                  <div className="p-3 rounded-xl bg-muted/30 border border-border/60 text-xs space-y-1 font-mono">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Target Competency:</span>
                      <strong className="text-foreground">Snehavyapat Triage</strong>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Readiness Gain:</span>
                      <strong className="text-accent">+15 pts</strong>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Estimated Time:</span>
                      <span>30 mins</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant={completedActions.includes("act-2") ? "outline" : "primary"}
                  size="md"
                  onClick={() => setActiveModalAction("act-2")}
                  className="w-full justify-center"
                >
                  {completedActions.includes("act-2") ? "Review Solution" : "Start Case Puzzle"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* ACTION 03 */}
              <div className="p-6 rounded-3xl bg-card border border-border hover:border-primary/40 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-secondary text-secondary-foreground font-mono font-extrabold text-base flex items-center justify-center shadow-md">
                      03
                    </div>
                    <Badge variant="verified" size="sm">
                      84% Clinical Fit
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-foreground">
                    Apply for matched internship
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Direct bridge connecting your 84% Clinical DNA with verified inpatient postings at AIIA and CCRAS.
                  </p>

                  <div className="p-3 rounded-xl bg-muted/30 border border-border/60 text-xs space-y-1 font-mono">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Top Match:</span>
                      <strong className="text-foreground">AIIA Inpatient Kayachikitsa</strong>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Stipend:</span>
                      <strong className="text-emerald-500 font-bold">₹35,000 / mo</strong>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Eligibility:</span>
                      <span className="text-emerald-400 font-semibold">Matched (86%)</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="gold"
                  size="md"
                  onClick={() => router.push("/student#opportunities")}
                  className="w-full justify-center shadow-md"
                >
                  <span>Explore 3 Matched Postings</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* MODAL 1: ACTION 01 CASE DOCUMENTATION TOOL */}
      {activeModalAction === "act-1" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0B1510] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-5 text-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-accent text-black font-mono font-bold flex items-center justify-center">
                  01
                </div>
                <div>
                  <h3 className="text-lg font-bold">Inpatient Case Charting (SOAP Format)</h3>
                  <p className="text-xs text-white/60">Competency Bridge: Rugna Vrittanta Documentation</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalAction(null)}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            {/* Case Background */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
              <span className="text-emerald-400 font-semibold uppercase tracking-wider block">Patient Presentation:</span>
              <p className="text-white/80 leading-relaxed">
                48-year-old male admitted with severe morning stiffness (Stambha) in bilateral knees and ankles, anorexia (Aruchi), and sluggish digestion.
              </p>
            </div>

            {/* SOAP Interactive Inputs */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-white/90 block mb-1">
                  S — Subjective Symptoms (Patient Complaints):
                </label>
                <textarea
                  value={soapNotes.subjective}
                  onChange={(e) => setSoapNotes({ ...soapNotes, subjective: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white focus:border-emerald-500 focus:outline-none"
                  rows={2}
                />
              </div>

              <div>
                <label className="font-bold text-white/90 block mb-1">
                  O — Objective Examination (Roga / Rogi Pariksha, Nadi, Agni):
                </label>
                <textarea
                  value={soapNotes.objective}
                  onChange={(e) => setSoapNotes({ ...soapNotes, objective: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white focus:border-emerald-500 focus:outline-none"
                  rows={2}
                />
              </div>

              <div>
                <label className="font-bold text-white/90 block mb-1">
                  A — Assessment & Differential Diagnosis (Amavata vs Sandhigata Vata):
                </label>
                <textarea
                  value={soapNotes.assessment}
                  onChange={(e) => setSoapNotes({ ...soapNotes, assessment: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white focus:border-emerald-500 focus:outline-none"
                  rows={2}
                />
              </div>

              <div>
                <label className="font-bold text-white/90 block mb-1">
                  P — Treatment Plan (Deepana, Pachana, Sweda, Ahara):
                </label>
                <textarea
                  value={soapNotes.plan}
                  onChange={(e) => setSoapNotes({ ...soapNotes, plan: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white focus:border-emerald-500 focus:outline-none"
                  rows={2}
                />
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-amber-400 font-mono">+18 pts Clinical Readiness</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveModalAction(null)}
                  className="text-white/70"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleCompleteCaseDoc}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Sign & Save Case Record
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ACTION 02 PRACTICE CASE SCENARIO */}
      {activeModalAction === "act-2" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0B1510] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary text-black font-mono font-bold flex items-center justify-center">
                  02
                </div>
                <div>
                  <h3 className="text-lg font-bold">Clinical Case Scenario Simulation</h3>
                  <p className="text-xs text-white/60">Competency Bridge: Snehavyapat Emergency Triage</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalAction(null)}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            {/* Scenario prompt */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs space-y-2">
              <strong className="text-amber-400 block font-bold">Scenario Dilemma:</strong>
              <p className="text-white/90 leading-relaxed italic">
                &ldquo;On Day 4 of Arohana Snehapana (150 ml Mahatiktaka Ghrita), an in-patient reports sudden severe colicky epigastric pain, vomiting of undigested sneha, severe thirst (Trishna), and tachycardia. How do you immediately triage this patient?&rdquo;
              </p>
            </div>

            {/* Radio options */}
            <div className="space-y-2.5 text-xs">
              {[
                { id: "A", text: "Administer next scheduled sneha dose with lukewarm water." },
                { id: "B", text: "Immediately withhold sneha, administer sips of Ushnodaka (warm water), evaluate Agni, and prepare Deepana Kwatha." },
                { id: "C", text: "Immediately induce Vamana using Madanaphala Yoga." },
                { id: "D", text: "Discharge patient with oral analgesics." },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setCaseScenarioAnswer(opt.id)}
                  className={cn(
                    "w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3",
                    caseScenarioAnswer === opt.id
                      ? "bg-emerald-950/60 border-emerald-500 text-white"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                  )}
                >
                  <span className="w-6 h-6 rounded-md bg-white/10 font-bold flex items-center justify-center shrink-0">
                    {opt.id}
                  </span>
                  <span className="pt-0.5">{opt.text}</span>
                </button>
              ))}
            </div>

            {caseScenarioSolved && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Correct! Classical protocol for acute Snehavyapat successfully deployed. +15 pts Readiness!</span>
              </div>
            )}

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-mono">+15 pts Readiness</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveModalAction(null)}
                  className="text-white/70"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSolveScenario}
                  disabled={!caseScenarioAnswer}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Submit Triage
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CareerDnaPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-xs uppercase tracking-widest font-mono">Loading Career DNA & Skill Gap...</p>
          </div>
        </div>
      }
    >
      <CareerDnaPageContent />
    </React.Suspense>
  );
}
