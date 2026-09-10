"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BookOpen,
  TrendingDown,
  Sparkles,
  Award,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Clock,
  UserCheck,
  CheckSquare,
  FileText,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Flame,
  Layers,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/cards/Card";
import { StudentSidebar } from "@/components/dashboard/StudentSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import {
  LEARNING_MODULES_BANK,
  LearningPipelineModule,
  loadModuleProgressLocally,
  PIPELINE_STAGE_METADATA,
  PipelineStage,
} from "@/lib/services/learningService";
import { cn } from "@/lib/utils/cn";

export default function GuidedLearningHubPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [filter, setFilter] = React.useState<"ALL" | "CRITICAL" | "MODERATE">("ALL");

  // Track module progress
  const [modulesProgress, setModulesProgress] = React.useState<
    Record<string, { currentStage: PipelineStage; competencyGranted: boolean }>
  >({});

  React.useEffect(() => {
    const progressMap: Record<
      string,
      { currentStage: PipelineStage; competencyGranted: boolean }
    > = {};
    LEARNING_MODULES_BANK.forEach((mod) => {
      const state = loadModuleProgressLocally(mod.id);
      progressMap[mod.id] = {
        currentStage: state.currentStage,
        competencyGranted: state.competencyGranted,
      };
    });
    setModulesProgress(progressMap);
  }, []);

  const filteredModules = LEARNING_MODULES_BANK.filter((mod) => {
    if (filter === "CRITICAL") return mod.gapSource.severity === "CRITICAL";
    if (filter === "MODERATE") return mod.gapSource.severity === "MODERATE";
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row selection:bg-emerald-500 selection:text-black">
      {/* 1. Collapsible Sidebar */}
      <StudentSidebar activeTab="learning" />

      {/* 2. Main Body Container */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-12">
        {/* Top Header */}
        <div className="px-4 sm:px-6 lg:px-8 pt-6">
          <DashboardHeader />
        </div>

        {/* Guided Learning Main Chamber */}
        <main className="px-4 sm:px-6 lg:px-8 py-6 space-y-8 flex-1 max-w-7xl w-full mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/student" className="hover:text-foreground transition-colors">
              Scholar Portal
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Guided Learning Pipeline</span>
          </div>

          {/* HERO BANNER: Architecture Mandate */}
          <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card to-primary/10 p-6 sm:p-8 shadow-xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="gold" size="sm" icon={<Sparkles className="w-3 h-3" />}>
                  Closed-Loop Pedagogy
                </Badge>
                <Badge variant="verified" size="sm" icon={<ShieldCheck className="w-3 h-3" />}>
                  NCISM Competency Model
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground font-sans">
                Skill Gap to Verified Competency Pipeline
              </h1>

              <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed">
                Vaidya Setu does not provide generic libraries of 100 random videos. Every learning
                journey is directly engineered to resolve your specific diagnostic skill gaps
                through applied clinical micro-tasks and verified faculty review.
              </p>

              {/* 6-Stage Visual Stepper Infographic */}
              <div className="pt-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
                  {[
                    { step: "01", label: "Skill Gap", sub: "Deficit Origin", icon: AlertTriangle, color: "text-rose-400" },
                    { step: "02", label: "Learning Module", sub: "Clinical SOP", icon: BookOpen, color: "text-emerald-400" },
                    { step: "03", label: "3-Q Quiz", sub: "Knowledge Check", icon: CheckSquare, color: "text-blue-400" },
                    { step: "04", label: "Micro Task", sub: "Applied Charting", icon: FileText, color: "text-amber-400" },
                    { step: "05", label: "Mentor / WS", sub: "AIIA Sign-off", icon: UserCheck, color: "text-purple-400" },
                    { step: "06", label: "Competency", sub: "Passport Stamp", icon: Award, color: "text-teal-400" },
                  ].map((s, idx) => {
                    const StepIcon = s.icon;
                    return (
                      <div
                        key={s.step}
                        className="p-3 rounded-2xl bg-muted/40 border border-border/80 flex flex-col justify-between space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] font-bold text-muted-foreground">
                            {s.step}
                          </span>
                          <StepIcon className={cn("w-3.5 h-3.5", s.color)} />
                        </div>
                        <div>
                          <p className="font-bold text-xs text-foreground leading-tight">{s.label}</p>
                          <p className="text-[10px] text-muted-foreground">{s.sub}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Module Filter & Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                Active Gap-Bridging Modules
              </h2>
              <p className="text-xs text-muted-foreground">
                Targeted clinical curricula designed to elevate your Competency Passport and residency eligibility.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {(["ALL", "CRITICAL", "MODERATE"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFilter(mode)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border",
                    filter === mode
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card border-border hover:bg-muted text-muted-foreground"
                  )}
                >
                  {mode === "ALL" ? "All Gaps" : mode === "CRITICAL" ? "🔴 Critical Gaps First" : "🟡 Moderate Gaps"}
                </button>
              ))}
            </div>
          </div>

          {/* MODULES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => {
              const progress = modulesProgress[module.id] || {
                currentStage: 1,
                competencyGranted: false,
              };
              const stageMeta = PIPELINE_STAGE_METADATA[progress.currentStage];
              const isCritical = module.gapSource.severity === "CRITICAL";

              return (
                <Card
                  key={module.id}
                  variant="default"
                  className={cn(
                    "p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-5 hover:shadow-xl group",
                    isCritical ? "border-rose-500/30 hover:border-rose-500/60" : "border-border hover:border-primary/40"
                  )}
                >
                  <div className="space-y-4">
                    {/* Top Tag & Gap Origin Pill */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border flex items-center gap-1",
                          isCritical
                            ? "bg-rose-500/10 text-rose-500 border-rose-500/30"
                            : "bg-amber-500/10 text-amber-500 border-amber-500/30"
                        )}
                      >
                        <AlertTriangle className="w-3 h-3" />
                        Bridges {module.gapSource.severity}: {module.gapSource.skillName}
                      </span>

                      <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {module.estimatedMinutes} mins
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {module.title}
                      </h3>
                      <p className="text-xs font-serif italic text-accent mt-0.5">
                        {module.sanskrit}
                      </p>
                    </div>

                    {/* Gap Consequence Callout */}
                    <div className="p-3 rounded-2xl bg-muted/40 border border-border/70 text-xs text-muted-foreground space-y-1">
                      <div className="flex items-center justify-between font-mono text-[11px]">
                        <span className="font-semibold text-foreground">Deficit Impact:</span>
                        <span className={isCritical ? "text-rose-400 font-bold" : "text-amber-400 font-bold"}>
                          {module.gapSource.deficitScore}
                        </span>
                      </div>
                      <p className="line-clamp-2 text-[11px] leading-relaxed">
                        {module.gapSource.clinicalConsequence}
                      </p>
                    </div>

                    {/* Active Stage Stepper Meter */}
                    <div className="space-y-2 pt-1 border-t border-border/50">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground font-medium">
                          Current Stage ({progress.currentStage}/6):
                        </span>
                        <span className="font-bold text-primary font-mono">
                          {stageMeta.label}
                        </span>
                      </div>

                      {/* Mini Stepper Dots */}
                      <div className="grid grid-cols-6 gap-1.5 h-2">
                        {[1, 2, 3, 4, 5, 6].map((st) => (
                          <div
                            key={st}
                            className={cn(
                              "rounded-full transition-all duration-300",
                              st < progress.currentStage
                                ? "bg-emerald-500"
                                : st === progress.currentStage
                                ? "bg-accent animate-pulse"
                                : "bg-muted"
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Outcome preview */}
                    <div className="p-2.5 rounded-xl bg-card border border-border/80 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-accent" /> Outcome:
                      </span>
                      <strong className="text-emerald-500">
                        +{module.competencyOutcome.readinessPointsBonus} pts Readiness
                      </strong>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <Link href={`/student/learning/${module.id}`} className="block pt-2">
                    <Button
                      variant={isCritical ? "gold" : "primary"}
                      size="md"
                      className="w-full justify-center shadow-md group-hover:brightness-105"
                    >
                      <span>
                        {progress.competencyGranted
                          ? "Review Completed Module"
                          : progress.currentStage > 1
                          ? `Resume Stage ${progress.currentStage}`
                          : "Start Learning Pipeline"}
                      </span>
                      <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>

          {/* Notice */}
          <div className="p-6 rounded-3xl bg-card border border-border text-center space-y-2 text-xs">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
              NCISM Continuous Competency Assurance
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every completed module submits verified micro-task records directly to your institutional supervisor.
              Approved competencies are cryptographically signed to your permanent digital Competency Passport.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
