"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  TrendingDown,
  Sparkles,
  Award,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Clock,
  UserCheck,
  CheckSquare,
  FileText,
  ShieldCheck,
  ChevronRight,
  RotateCcw,
  Check,
  HelpCircle,
  ExternalLink,
  Flame,
  Activity,
  Layers,
  Calendar,
  Building,
  QrCode,
  Briefcase,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/cards/Card";
import { StudentSidebar } from "@/components/dashboard/StudentSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import {
  getLearningModuleById,
  LearningPipelineModule,
  PipelineStage,
  ModuleProgressState,
  loadModuleProgressLocally,
  saveModuleProgressLocally,
  PIPELINE_STAGE_METADATA,
} from "@/lib/services/learningService";
import { cn } from "@/lib/utils/cn";

function ModuleRunnerContent() {
  const params = useParams();
  const router = useRouter();
  const moduleId = (params?.moduleId as string) || "case-documentation";

  const moduleData = getLearningModuleById(moduleId);

  const [progress, setProgress] = React.useState<ModuleProgressState>(() =>
    loadModuleProgressLocally(moduleId)
  );

  // Temporary local form states
  const [selectedAnswers, setSelectedAnswers] = React.useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = React.useState<boolean>(false);
  const [microTaskForm, setMicroTaskForm] = React.useState<Record<string, string>>({});
  const [selectedMentor, setSelectedMentor] = React.useState<string | null>(null);
  const [selectedWorkshop, setSelectedWorkshop] = React.useState<string | null>(null);
  const [isVerifying, setIsVerifying] = React.useState<boolean>(false);

  React.useEffect(() => {
    const saved = loadModuleProgressLocally(moduleId);
    setProgress(saved);
    if (saved.quizAnswers) setSelectedAnswers(saved.quizAnswers);
    if (saved.microTaskSubmission) setMicroTaskForm(saved.microTaskSubmission);
    if (saved.selectedMentorId) setSelectedMentor(saved.selectedMentorId);
    if (saved.selectedWorkshopId) setSelectedWorkshop(saved.selectedWorkshopId);
  }, [moduleId]);

  if (!moduleData) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
        <h2 className="text-xl font-bold text-foreground">Module Not Found</h2>
        <p className="text-xs text-muted-foreground mt-2 max-w-md">
          The requested learning module does not exist in the active NCISM registry.
        </p>
        <Button
          variant="gold"
          size="sm"
          onClick={() => router.push("/student/learning")}
          className="mt-6"
        >
          Return to Learning Hub
        </Button>
      </div>
    );
  }

  const currentStage = progress.currentStage;

  const updateStage = (newStage: PipelineStage) => {
    const updated: ModuleProgressState = {
      ...progress,
      currentStage: newStage,
      isStageCompleted: {
        ...progress.isStageCompleted,
        [progress.currentStage]: true,
      },
    };
    setProgress(updated);
    saveModuleProgressLocally(moduleId, updated);
  };

  // Stage 3 Quiz Submit Handler
  const handleQuizSubmit = () => {
    let score = 0;
    moduleData.quiz.forEach((q) => {
      const chosen = selectedAnswers[q.id];
      const opt = q.options.find((o) => o.id === chosen);
      if (opt?.isCorrect) score += 1;
    });

    setQuizSubmitted(true);
    const updated: ModuleProgressState = {
      ...progress,
      quizAnswers: selectedAnswers,
      quizScore: score,
      isStageCompleted: {
        ...progress.isStageCompleted,
        3: score >= 2,
      },
    };
    setProgress(updated);
    saveModuleProgressLocally(moduleId, updated);
  };

  // Stage 4 Micro Task Submit Handler
  const handleMicroTaskSubmit = () => {
    const updated: ModuleProgressState = {
      ...progress,
      microTaskSubmission: microTaskForm,
      isStageCompleted: {
        ...progress.isStageCompleted,
        4: true,
      },
      currentStage: 5,
    };
    setProgress(updated);
    saveModuleProgressLocally(moduleId, updated);
  };

  const handlePreFillMicroTask = () => {
    setMicroTaskForm(moduleData.microTask.sampleGoodSubmission);
  };

  // Stage 5 Mentor / Workshop Sign-off Handler
  const handleRequestSignOff = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const updated: ModuleProgressState = {
        ...progress,
        selectedMentorId: selectedMentor || moduleData.mentors[0]?.id,
        selectedWorkshopId: selectedWorkshop || moduleData.workshops[0]?.id,
        mentorSignOffStatus: "APPROVED",
        competencyGranted: true,
        completedAt: new Date().toISOString(),
        isStageCompleted: {
          ...progress.isStageCompleted,
          5: true,
          6: true,
        },
        currentStage: 6,
      };
      setProgress(updated);
      saveModuleProgressLocally(moduleId, updated);
    }, 1500);
  };

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

        {/* Pipeline Runner Main Chamber */}
        <main className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1 max-w-5xl w-full mx-auto">
          {/* Breadcrumb & Top Exit */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border/60">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Link href="/student/learning" className="hover:text-foreground transition-colors">
                Guided Learning
              </Link>
              <span>/</span>
              <span className="text-foreground font-semibold truncate max-w-xs sm:max-w-md">
                {moduleData.title}
              </span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/student/learning")}
              className="text-xs text-muted-foreground hover:text-foreground self-start sm:self-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              Exit to Learning Hub
            </Button>
          </div>

          {/* 6-STAGE PIPELINE PROGRESS STEPPER */}
          <div className="p-4 sm:p-5 rounded-3xl bg-card border border-border shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-mono uppercase font-bold text-accent">
                  Stage 0{currentStage} of 06
                </span>
                <h3 className="font-extrabold text-sm sm:text-base text-foreground mt-0.5">
                  {PIPELINE_STAGE_METADATA[currentStage].label}
                </h3>
              </div>
              <span className="text-muted-foreground text-[11px] font-mono">
                {PIPELINE_STAGE_METADATA[currentStage].description}
              </span>
            </div>

            {/* Stepper Dots & Labels */}
            <div className="grid grid-cols-6 gap-2">
              {([1, 2, 3, 4, 5, 6] as PipelineStage[]).map((stepNum) => {
                const isCurrent = currentStage === stepNum;
                const isDone = progress.isStageCompleted[stepNum];
                const meta = PIPELINE_STAGE_METADATA[stepNum];

                return (
                  <button
                    key={stepNum}
                    onClick={() => {
                      // Allow jumping to steps already visited or unlocked
                      if (stepNum <= currentStage || isDone) {
                        setProgress((prev) => ({ ...prev, currentStage: stepNum }));
                      }
                    }}
                    disabled={stepNum > currentStage && !isDone}
                    className={cn(
                      "p-2 rounded-2xl border text-left transition-all relative flex flex-col justify-between h-16 disabled:opacity-40 disabled:cursor-not-allowed",
                      isCurrent
                        ? "bg-primary/10 border-primary shadow-sm"
                        : isDone
                        ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-400"
                        : "bg-muted/30 border-border/60 text-muted-foreground"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold">0{stepNum}</span>
                      {isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : isCurrent ? (
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      ) : null}
                    </div>
                    <span className="text-[10px] font-semibold truncate block leading-tight">
                      {meta.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STAGE 1: SKILL GAP ORIGIN */}
          {/* ========================================================================= */}
          {currentStage === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-md space-y-6"
            >
              <div className="flex items-center gap-2 text-rose-500 font-extrabold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Diagnostic Origin: {moduleData.gapSource.severity} Skill Gap</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  Identified Gap: {moduleData.gapSource.skillName}
                </h2>
                <p className="text-xs font-serif italic text-accent">
                  Classical Ayush Terminology: {moduleData.gapSource.sanskrit}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-1">
                  <span className="text-[11px] text-muted-foreground uppercase font-bold">
                    Deficit Score
                  </span>
                  <p className="text-2xl font-mono font-extrabold text-rose-400">
                    {moduleData.gapSource.deficitScore}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Below NCISM hospital baseline</p>
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 border border-border sm:col-span-2 space-y-1">
                  <span className="text-[11px] text-muted-foreground uppercase font-bold">
                    Clinical Impact & Consequence
                  </span>
                  <p className="text-xs text-foreground leading-relaxed pt-0.5">
                    {moduleData.gapSource.clinicalConsequence}
                  </p>
                </div>
              </div>

              {/* Pedagogy Callout */}
              <div className="p-4 rounded-2xl bg-accent/10 border border-accent/25 text-xs text-foreground space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-accent">
                  <Sparkles className="w-4 h-4" />
                  <span>Closed-Loop Bridging Mission:</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Completing this module will bridge your deficit through high-yield clinical SOPs, a 3-question conceptual validation quiz, an applied inpatient micro-task, and verified faculty sign-off, granting you{" "}
                  <strong className="text-foreground">
                    +{moduleData.competencyOutcome.readinessPointsBonus} Readiness Points
                  </strong>{" "}
                  and an institutional competency badge.
                </p>
              </div>

              <div className="pt-4 border-t border-border flex justify-end">
                <Button
                  variant="gold"
                  size="md"
                  onClick={() => updateStage(2)}
                  className="shadow-md px-6"
                >
                  <span>Acknowledge Gap & Open Clinical SOP</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 2: LEARNING MODULE CONTENT */}
          {/* ========================================================================= */}
          {currentStage === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-md space-y-6"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Stage 02: High-Yield Clinical Lesson
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-1">
                    {moduleData.title}
                  </h2>
                </div>
                <Badge variant="gold" size="sm" icon={<Clock className="w-3 h-3" />}>
                  {moduleData.estimatedMinutes} Mins Read
                </Badge>
              </div>

              {/* Classical Reference Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-card to-card border-l-4 border-primary border-y border-r border-border/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Classical Foundation</span>
                  <span className="font-serif italic">{moduleData.lessonContent.classicalReference.treatise}</span>
                </div>
                <p className="text-base font-serif text-foreground font-semibold italic">
                  &ldquo;{moduleData.lessonContent.classicalReference.verse}&rdquo;
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Translation: {moduleData.lessonContent.classicalReference.translation}
                </p>
              </div>

              {/* Core Principle */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-foreground">Core Clinical Guideline:</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {moduleData.lessonContent.corePrinciple}
                </p>
              </div>

              {/* Clinical Guide List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Clinical Architecture & Documentation Rules:
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {moduleData.lessonContent.clinicalGuide.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-muted/30 border border-border/70 text-xs text-foreground/90 flex items-start gap-2.5"
                    >
                      <span className="font-mono font-bold text-accent shrink-0">#{idx + 1}</span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SOP Steps */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Layers className="w-4 h-4 text-accent" />
                  Standard Operating Procedure (SOP):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {moduleData.lessonContent.standardOperatingProcedure.map((sop, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-card border border-border text-xs text-muted-foreground space-y-1"
                    >
                      <strong className="text-foreground block">{sop.split(":")[0]}</strong>
                      <p className="leading-relaxed">{sop.split(":")[1] || sop}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inpatient Pitfalls */}
              <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-xs space-y-2">
                <span className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Inpatient Documentation Pitfalls to Avoid:
                </span>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {moduleData.lessonContent.inpatientPitfallsToAvoid.map((pit, idx) => (
                    <li key={idx} className="leading-relaxed">{pit}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={() => updateStage(1)}>
                  <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                  Previous: Skill Gap
                </Button>
                <Button variant="primary" size="md" onClick={() => updateStage(3)}>
                  <span>Mark Lesson Read & Begin 3-Q Quiz</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 3: 3-QUESTION QUIZ */}
          {/* ========================================================================= */}
          {currentStage === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-md space-y-6"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">
                    Stage 03: 3-Question Diagnostic Quiz
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-1">
                    Conceptual Knowledge Checkpoint
                  </h2>
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  Passing Threshold: 2 of 3 Correct
                </span>
              </div>

              <div className="space-y-6">
                {moduleData.quiz.map((q, idx) => {
                  const selectedId = selectedAnswers[q.id];

                  return (
                    <div
                      key={q.id}
                      className="p-5 rounded-2xl bg-muted/20 border border-border/80 space-y-3.5"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-md bg-primary/20 text-primary font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          0{idx + 1}
                        </span>
                        <p className="text-sm font-semibold text-foreground leading-snug">
                          {q.prompt}
                        </p>
                      </div>

                      <div className="space-y-2 pt-1 pl-8">
                        {q.options.map((opt) => {
                          const isSelected = selectedId === opt.id;
                          const showCorrect = quizSubmitted && opt.isCorrect;
                          const showWrong = quizSubmitted && isSelected && !opt.isCorrect;

                          return (
                            <button
                              key={opt.id}
                              onClick={() => {
                                if (!quizSubmitted) {
                                  setSelectedAnswers({ ...selectedAnswers, [q.id]: opt.id });
                                }
                              }}
                              className={cn(
                                "w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5",
                                isSelected
                                  ? "bg-primary/15 border-primary text-foreground font-semibold"
                                  : "bg-card border-border/70 text-muted-foreground hover:bg-muted/40",
                                showCorrect && "border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold",
                                showWrong && "border-rose-500 bg-rose-950/40 text-rose-300"
                              )}
                            >
                              <span className="font-mono uppercase font-bold shrink-0">
                                {opt.id}.
                              </span>
                              <span className="flex-1">{opt.text}</span>
                              {showCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="ml-8 p-3 rounded-xl bg-card border border-border/70 text-xs text-muted-foreground space-y-1">
                          <span className="font-bold text-foreground block">Clinical Rationale:</span>
                          <p className="leading-relaxed">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={() => updateStage(2)}>
                  <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                  Previous: SOP Lesson
                </Button>

                {!quizSubmitted ? (
                  <Button
                    variant="gold"
                    size="md"
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(selectedAnswers).length < 3}
                    className="shadow-md px-6"
                  >
                    <span>Submit 3-Question Quiz</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      Score: {progress.quizScore}/3 Correct
                    </span>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => updateStage(4)}
                      className="shadow-md px-6"
                    >
                      <span>Proceed to Micro Task</span>
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 4: APPLIED CLINICAL MICRO TASK */}
          {/* ========================================================================= */}
          {currentStage === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-md space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                    Stage 04: Applied Clinical Micro Task
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-1">
                    {moduleData.microTask.title}
                  </h2>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreFillMicroTask}
                  className="text-xs text-accent border-accent/40 hover:bg-accent/10"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  Pre-fill Guided Case Observations
                </Button>
              </div>

              {/* Patient Profile Context Card */}
              {moduleData.microTask.patientProfile && (
                <div className="p-4 rounded-2xl bg-muted/40 border border-border text-xs space-y-2.5">
                  <div className="flex items-center justify-between font-semibold uppercase tracking-wider text-primary text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" /> Hospital Ward Clinical Profile
                    </span>
                    <span className="font-mono text-muted-foreground">Inpatient Bed #14</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-2.5 rounded-xl bg-card border border-border/80">
                      <span className="text-[10px] text-muted-foreground block">Patient</span>
                      <strong className="text-foreground">{moduleData.microTask.patientProfile.ageGender}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-card border border-border/80">
                      <span className="text-[10px] text-muted-foreground block">Constitution</span>
                      <strong className="text-accent">{moduleData.microTask.patientProfile.prakriti}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-card border border-border/80">
                      <span className="text-[10px] text-muted-foreground block">Pulse (Nadi)</span>
                      <strong className="text-foreground">{moduleData.microTask.patientProfile.nadiPulse}</strong>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-card border border-border/80">
                    <span className="text-[10px] text-muted-foreground block">Chief Complaints</span>
                    <p className="text-foreground font-medium pt-0.5">{moduleData.microTask.patientProfile.chiefComplaint}</p>
                  </div>
                </div>
              )}

              {/* Dynamic Form Fields */}
              <div className="space-y-4">
                {moduleData.microTask.requiredFields.map((field) => (
                  <div key={field.key} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-bold text-foreground">{field.label}</label>
                      <span className="text-[10px] text-muted-foreground">{field.hint}</span>
                    </div>
                    <textarea
                      value={microTaskForm[field.key] || ""}
                      onChange={(e) =>
                        setMicroTaskForm({ ...microTaskForm, [field.key]: e.target.value })
                      }
                      placeholder={field.placeholder}
                      rows={3}
                      className="w-full p-3 rounded-2xl bg-card border border-border text-xs focus:border-primary focus:outline-none leading-relaxed"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={() => updateStage(3)}>
                  <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                  Previous: Quiz
                </Button>

                <Button
                  variant="gold"
                  size="md"
                  onClick={handleMicroTaskSubmit}
                  className="shadow-md px-6"
                >
                  <span>Submit Task for Academic Review</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 5: MENTOR / WORKSHOP VERIFICATION */}
          {/* ========================================================================= */}
          {currentStage === 5 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-md space-y-6"
            >
              <div className="border-b border-border/60 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                  Stage 05: Academic Verification
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-1">
                  Faculty Sign-off & Clinical Workshop Practicum
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Connect your completed micro-task with an accredited AIIA supervisor or register for the live simulation practicum.
                </p>
              </div>

              {/* Option 1: Select Faculty Mentor */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-primary" />
                  Option A: Assigned Institutional Mentors (Digital Verification):
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {moduleData.mentors.map((mentor) => {
                    const isSelected = (selectedMentor || moduleData.mentors[0]?.id) === mentor.id;

                    return (
                      <button
                        key={mentor.id}
                        onClick={() => setSelectedMentor(mentor.id)}
                        className={cn(
                          "p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3",
                          isSelected
                            ? "bg-primary/15 border-primary shadow-sm"
                            : "bg-card border-border/80 hover:bg-muted/40"
                        )}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-sm text-foreground">{mentor.name}</h5>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-primary" />}
                          </div>
                          <p className="text-xs text-accent font-medium">{mentor.title}</p>
                          <p className="text-[11px] text-muted-foreground">{mentor.department}</p>
                        </div>

                        <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                          <span>Review Window:</span>
                          <span className="text-foreground font-semibold">{mentor.availableSlot}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Option 2: Live Workshop Reservation */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-accent" />
                  Option B: Weekly Clinical Simulation Practicum:
                </h4>

                <div className="space-y-2">
                  {moduleData.workshops.map((ws) => (
                    <div
                      key={ws.id}
                      className="p-4 rounded-2xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-foreground">{ws.title}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-accent/20 text-accent border border-accent/40">
                            {ws.mode}
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          Instructor: <strong className="text-foreground">{ws.instructor}</strong> • {ws.date} ({ws.time})
                        </p>
                      </div>

                      <span className="text-xs font-mono text-emerald-400 font-bold shrink-0">
                        {ws.seatsRemaining} Seats Available
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={() => updateStage(4)}>
                  <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                  Previous: Micro Task
                </Button>

                <Button
                  variant="gold"
                  size="md"
                  onClick={handleRequestSignOff}
                  disabled={isVerifying}
                  className="shadow-md px-8"
                >
                  {isVerifying ? (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                      <span>Validating with Supervisor Registry...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <span>Request Supervisor Sign-off & Grant Badge</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 6: VERIFIED COMPETENCY UNLOCKED */}
          {/* ========================================================================= */}
          {currentStage === 6 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-card via-card to-emerald-950/20 border-2 border-emerald-500/50 shadow-2xl space-y-6 text-center sm:text-left"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    <Award className="w-4 h-4" /> Stage 06: Verified Competency Conferred
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
                    Competency Passport Updated!
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Your closed-loop journey from <strong>{moduleData.gapSource.skillName}</strong> has been officially closed and verified by AIIA supervisors.
                  </p>
                </div>

                <div className="w-16 h-16 rounded-3xl bg-emerald-500 text-black flex items-center justify-center shadow-xl shadow-emerald-500/20 shrink-0 mx-auto sm:mx-0">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                </div>
              </div>

              {/* Digital Passport Badge Certificate Box */}
              <div className="p-6 rounded-3xl bg-black/40 border border-emerald-500/40 space-y-4 shadow-inner">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">
                      Conferred Competency Badge
                    </span>
                    <h3 className="text-xl font-extrabold text-white">
                      {moduleData.competencyOutcome.badgeName}
                    </h3>
                    <p className="text-xs font-serif italic text-amber-300">
                      {moduleData.competencyOutcome.sanskrit} • {moduleData.competencyOutcome.level}
                    </p>
                  </div>

                  <div className="text-right sm:border-l sm:border-white/10 sm:pl-6 font-mono">
                    <span className="text-[10px] text-white/50 block">Readiness Boost</span>
                    <span className="text-2xl font-extrabold text-emerald-400">
                      +{moduleData.competencyOutcome.readinessPointsBonus} pts
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs border-t border-white/10">
                  <div>
                    <span className="text-white/50 block text-[10px]">Certifying Authority:</span>
                    <strong className="text-white/90">{moduleData.competencyOutcome.certifyingBody}</strong>
                  </div>
                  <div>
                    <span className="text-white/50 block text-[10px]">Institutional Hash:</span>
                    <span className="font-mono text-white/70">{moduleData.competencyOutcome.verificationHash}</span>
                  </div>
                </div>
              </div>

              {/* Unlocked Opportunities Note */}
              <div className="p-4 rounded-2xl bg-card border border-border flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-accent" />
                  <span>
                    This verified badge satisfies prerequisite criteria for <strong className="text-foreground">4 Inpatient Residencies</strong>.
                  </span>
                </div>
                <Link
                  href="/student#opportunities"
                  className="text-xs font-bold text-accent hover:underline shrink-0"
                >
                  View Opportunities →
                </Link>
              </div>

              {/* Final Actions */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
                <Link href="/student/learning" className="w-full sm:w-auto">
                  <Button variant="outline" size="md" className="w-full sm:w-auto">
                    Return to Learning Hub
                  </Button>
                </Link>

                <Link href="/student" className="w-full sm:w-auto">
                  <Button variant="gold" size="md" className="w-full sm:w-auto shadow-lg shadow-accent/20">
                    <span>Back to Scholar Command Center</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function LearningModuleRunnerPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-xs uppercase tracking-widest font-mono">Loading Learning Pipeline...</p>
          </div>
        </div>
      }
    >
      <ModuleRunnerContent />
    </React.Suspense>
  );
}
