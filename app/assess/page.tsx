"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Award,
  ShieldCheck,
  Stethoscope,
  Microscope,
  FileText,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  FlaskConical,
  Bookmark,
  BookmarkCheck,
  Flag,
  LayoutGrid,
  Timer,
  Check,
  X,
  Flame,
  Activity,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MarketingNavbar } from "@/components/marketing/MarketingNavbar";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import {
  loadSkillDna,
  loadAssessmentHistory,
  saveAssessmentRecord,
  updateSkillDnaFromAssessment,
  AssessmentRecord,
  AssessmentIntegrityEvent,
  QuestionReviewItem,
  SkillDnaItem,
} from "@/lib/services/skillIntelligenceService";
import {
  AssessmentIntegrityMonitor,
  HeadDirection,
} from "@/components/assessment/AssessmentIntegrityMonitor";
import { AssessmentQuestionReview } from "@/components/assessment/AssessmentQuestionReview";
import {
  QUESTIONS_BANK,
  QuestionItem,
} from "@/lib/assessment/assessmentQuestionsBank";
import { cn } from "@/lib/utils/cn";

export type AssessmentTabType =
  | "skill"
  | "clinical"
  | "panchakarma"
  | "pharma"
  | "research"
  | "history";

// 🏛️ Section Metadata & Configuration
const SECTION_METADATA: Record<
  "skill" | "clinical" | "panchakarma" | "pharma" | "research",
  {
    title: string;
    subtitle: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    recordType: "SKILL" | "CLINICAL" | "PANCHAKARMA" | "PHARMA" | "RESEARCH";
  }
> = {
  skill: {
    title: "Comprehensive Samhita & Ayush Knowledge Challenge",
    subtitle: "Ayurvedic Knowledge & Samhita",
    description: "Siddhanta, Dravyaguna Pharmacology, Rasashastra, Agni mechanics and fundamental classical literature.",
    icon: BookOpen,
    accentColor: "from-emerald-600 to-teal-500",
    recordType: "SKILL",
  },
  clinical: {
    title: "Inpatient Clinical Vignette & Nadi Diagnostics Assessment",
    subtitle: "Clinical Diagnostics & Nadi",
    description: "Authentic inpatient vignettes, pulse velocity (Gati), differential diagnosis and acute emergency triage.",
    icon: Stethoscope,
    accentColor: "from-amber-500 to-orange-500",
    recordType: "CLINICAL",
  },
  panchakarma: {
    title: "Panchakarma Protocols, Shodhana Safety & NABH Compliance",
    subtitle: "Panchakarma & Shodhana",
    description: "Purvakarma oleation markers, Pradhana Shodhana complication management and NABH hospital hygiene.",
    icon: Sparkles,
    accentColor: "from-cyan-500 to-blue-500",
    recordType: "PANCHAKARMA",
  },
  pharma: {
    title: "ASU-GMP, Dravyaguna Standardization & Pharmacovigilance",
    subtitle: "Dravyaguna & ASU-GMP",
    description: "API botanical identity, HPTLC adulterant detection, Schedule T manufacturing and WHO-GMP export limits.",
    icon: FlaskConical,
    accentColor: "from-yellow-500 to-amber-600",
    recordType: "PHARMA",
  },
  research: {
    title: "GCP-Ayush, Trial Methodology & Bioethics Assessment",
    subtitle: "Research & GCP-Ayush",
    description: "ICMR bioethics, CTRI prospective registration, blinding herbal decoctions, ITT analysis and TKDL defense.",
    icon: Microscope,
    accentColor: "from-purple-500 to-indigo-500",
    recordType: "RESEARCH",
  },
};

const SECTION_TIME_LIMIT_SECONDS = 600; // Exactly 10 minutes (600s) for 15 questions

function AssessHubContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = (searchParams?.get("type") as AssessmentTabType) || "skill";
  const [activeTab, setActiveTab] = React.useState<AssessmentTabType>(tabParam);

  // Active Assessment State
  const [activeQuestions, setActiveQuestions] = React.useState<QuestionItem[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [userAnswers, setUserAnswers] = React.useState<Record<string, string>>({});
  const [bookmarkedIds, setBookmarkedIds] = React.useState<string[]>([]);
  const [isEvaluating, setIsEvaluating] = React.useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = React.useState<AssessmentRecord | null>(null);

  // Modals
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = React.useState<boolean>(false);
  const [showTimeExpiredModal, setShowTimeExpiredModal] = React.useState<boolean>(false);

  // 10-Minute Countdown Timer & Telemetry State
  const [timeRemainingSeconds, setTimeRemainingSeconds] = React.useState<number>(SECTION_TIME_LIMIT_SECONDS);
  const [timeElapsedSeconds, setTimeElapsedSeconds] = React.useState<number>(0);
  const [warningCount, setWarningCount] = React.useState<number>(0);
  const [isFrozen, setIsFrozen] = React.useState<boolean>(false);
  const [integrityEvents, setIntegrityEvents] = React.useState<AssessmentIntegrityEvent[]>([]);
  const [assessmentAttemptId, setAssessmentAttemptId] = React.useState<string>(() => `assess-${Date.now()}`);

  // History State
  const [historyRecords, setHistoryRecords] = React.useState<AssessmentRecord[]>([]);

  // Sync tab with URL
  React.useEffect(() => {
    if (
      tabParam &&
      ["skill", "clinical", "panchakarma", "pharma", "research", "history"].includes(tabParam)
    ) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  React.useEffect(() => {
    setHistoryRecords(loadAssessmentHistory());
  }, []);

  // 10-MINUTE COUNTDOWN TIMER EFFECT
  React.useEffect(() => {
    if (activeTab === "history" || evaluationResult || isFrozen || isEvaluating) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Automatic submission on timeout
          handleFinishAssessment("SUBMITTED_TIME_EXPIRED");
          setShowTimeExpiredModal(true);
          return 0;
        }
        return prev - 1;
      });
      setTimeElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTab, evaluationResult, isFrozen, isEvaluating]);

  // Reset when Tab Changes or New Section Starts
  React.useEffect(() => {
    if (activeTab === "history") return;

    const sectionQuestions =
      QUESTIONS_BANK[activeTab as keyof typeof QUESTIONS_BANK] || QUESTIONS_BANK.skill;

    setActiveQuestions(sectionQuestions);
    setCurrentIndex(0);
    setUserAnswers({});
    setBookmarkedIds([]);
    setEvaluationResult(null);
    setWarningCount(0);
    setIsFrozen(false);
    setTimeRemainingSeconds(SECTION_TIME_LIMIT_SECONDS);
    setTimeElapsedSeconds(0);
    setShowSubmitConfirmModal(false);
    setShowTimeExpiredModal(false);
    setIntegrityEvents([]);
    setAssessmentAttemptId(`assess-${activeTab}-${Date.now()}`);
  }, [activeTab]);

  const currentQ = activeQuestions[currentIndex];
  const totalQ = activeQuestions.length || 15;
  const answeredCount = Object.keys(userAnswers).length;

  const handleSelectAnswer = (qId: string, optId: string) => {
    if (isFrozen) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optId }));
  };

  const handleToggleBookmark = (qId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(qId) ? prev.filter((id) => id !== qId) : [...prev, qId]
    );
  };

  const handleWarning = (
    newCount: number,
    direction: HeadDirection,
    event: AssessmentIntegrityEvent
  ) => {
    setWarningCount(newCount);
    setIntegrityEvents((prev) => [event, ...prev]);
  };

  const handleFreeze = () => {
    setIsFrozen(true);
  };

  const handleFinishAssessment = (
    statusOverride?: "SUBMITTED_AFTER_INTEGRITY_FREEZE" | "SUBMITTED_TIME_EXPIRED"
  ) => {
    setShowSubmitConfirmModal(false);
    setIsEvaluating(true);

    let correctCount = 0;
    const topicScores: Record<string, { total: number; correct: number }> = {};
    const strengths: string[] = [];
    const weakAreas: string[] = [];
    const questionReviews: QuestionReviewItem[] = [];

    activeQuestions.forEach((q, idx) => {
      const selectedOptId = userAnswers[q.id];
      const selected = q.options.find((o) => o.id === selectedOptId);
      const isCorrect = selected?.isCorrect ?? false;
      const isUnanswered = !selectedOptId;
      const correctOpt = q.options.find((o) => o.isCorrect) || q.options[0];

      if (!topicScores[q.topic]) {
        topicScores[q.topic] = { total: 0, correct: 0 };
      }
      topicScores[q.topic].total += 1;

      if (isCorrect) {
        correctCount += 1;
        topicScores[q.topic].correct += 1;
        strengths.push(`${q.topic} Competency`);
      } else {
        weakAreas.push(`${q.topic} Protocol Deficit`);
      }

      questionReviews.push({
        questionId: q.id,
        questionNumber: idx + 1,
        topic: q.topic,
        category: q.category,
        questionType: q.questionType,
        prompt: q.prompt,
        vignette: q.vignette,
        userSelectedOptionId: selected?.id,
        userSelectedText: selected?.text,
        userSelectedRationale: selected?.clinicalRationale,
        isCorrect,
        isUnanswered,
        correctOptionId: correctOpt.id,
        correctOptionText: correctOpt.text,
        correctOptionRationale: correctOpt.clinicalRationale,
        allOptions: q.options.map((o) => ({
          id: o.id,
          text: o.text,
          isCorrect: o.isCorrect,
          clinicalRationale: o.clinicalRationale,
        })),
      });
    });

    const calculatedPercentage = Math.round((correctCount / totalQ) * 100);
    const breakdown: Record<string, number> = {};
    for (const [topic, val] of Object.entries(topicScores)) {
      breakdown[topic] = Math.round((val.correct / val.total) * 100);
    }

    const currentMeta =
      SECTION_METADATA[activeTab as keyof typeof SECTION_METADATA] || SECTION_METADATA.skill;

    const isFreezeSubmission = isFrozen || statusOverride === "SUBMITTED_AFTER_INTEGRITY_FREEZE";
    const isTimeoutSubmission = statusOverride === "SUBMITTED_TIME_EXPIRED";

    const record: AssessmentRecord = {
      id: `att-${Date.now()}`,
      type: currentMeta.recordType,
      title: currentMeta.title,
      completedAt: new Date().toISOString(),
      score: calculatedPercentage,
      totalQuestions: totalQ,
      correctAnswers: correctCount,
      topicBreakdown: breakdown,
      strengths: Array.from(new Set(strengths)),
      weakAreas: Array.from(new Set(weakAreas)),
      verificationGranted: calculatedPercentage >= 70,
      status: isFreezeSubmission
        ? "SUBMITTED_AFTER_INTEGRITY_FREEZE"
        : isTimeoutSubmission
        ? "SUBMITTED_TIME_EXPIRED"
        : "NORMAL",
      integrityWarningsCount: warningCount,
      timeUsedSeconds: Math.min(SECTION_TIME_LIMIT_SECONDS, timeElapsedSeconds),
      integrityEvents: integrityEvents,
      questionReviews,
    };

    // Save locally and update Skill DNA
    saveAssessmentRecord(record);
    updateSkillDnaFromAssessment(record);
    setHistoryRecords(loadAssessmentHistory());

    setTimeout(() => {
      setEvaluationResult(record);
      setIsEvaluating(false);
      if (isTimeoutSubmission) {
        setShowTimeExpiredModal(true);
      }
    }, 500);
  };

  const switchTab = (tab: AssessmentTabType) => {
    setActiveTab(tab);
    router.push(`/assess?type=${tab}`);
  };

  // Timer Formatting
  const remMinutes = Math.floor(timeRemainingSeconds / 60);
  const remSeconds = timeRemainingSeconds % 60;
  const formattedCountdown = `${String(remMinutes).padStart(2, "0")}:${String(remSeconds).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* 1. Master Navbar */}
      <MarketingNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-8">
        {/* Breadcrumb & Section Header */}
        <div className="space-y-3 pb-2 border-b border-border/60">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/home" className="hover:text-foreground transition-colors">
              Scholar Home
            </Link>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">ASSESS HUB</span>
            <span>/</span>
            <span className="text-gray-300 uppercase font-bold">{activeTab}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
                Ayush Clinical &amp; Skill <span className="text-amber-400">Assessment Engine</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-300/85 mt-1 max-w-2xl font-sans">
                Benchmarked against NCISM Competency-Based Dynamic Curriculum. Exactly{" "}
                <strong className="text-amber-400 font-semibold">15 questions per section</strong> with a{" "}
                <strong className="text-emerald-400 font-semibold">10-minute countdown timer</strong>.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-emerald-300 font-medium bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-emerald-500/30 shadow-sm">
                NCISM CBDC Standards • All India Institute of Ayurveda
              </span>
            </div>
          </div>
        </div>

        {/* 6 MODE TABS SWITCHER (Responsive 6-column grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-1.5 rounded-2xl bg-[#03190f]/90 border border-emerald-500/30 backdrop-blur-xl shadow-xl">
          {[
            {
              id: "skill",
              label: "Samhita & Knowledge",
              sub: "15 Que • 10m",
              icon: <BookOpen className="h-4 w-4" />,
            },
            {
              id: "clinical",
              label: "Clinical & Nadi",
              sub: "15 Que • 10m",
              icon: <Stethoscope className="h-4 w-4" />,
            },
            {
              id: "panchakarma",
              label: "Panchakarma & Shodhana",
              sub: "15 Que • 10m",
              icon: <Sparkles className="h-4 w-4" />,
            },
            {
              id: "pharma",
              label: "Herbal Pharma & GMP",
              sub: "15 Que • 10m",
              icon: <FlaskConical className="h-4 w-4" />,
            },
            {
              id: "research",
              label: "Research & GCP",
              sub: "15 Que • 10m",
              icon: <Microscope className="h-4 w-4" />,
            },
            {
              id: "history",
              label: "Attempt Registry",
              sub: "Seals & Audit",
              icon: <Clock className="h-4 w-4" />,
            },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => switchTab(tab.id as AssessmentTabType)}
                className={cn(
                  "py-2.5 px-2.5 rounded-xl text-left sm:text-center flex flex-col items-center justify-center gap-1 transition-all",
                  isSelected
                    ? "bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/25 font-bold border border-amber-300/40"
                    : "text-gray-300 hover:text-white hover:bg-white/[0.06] border border-transparent"
                )}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  {tab.icon}
                  <span className="truncate">{tab.label}</span>
                </div>
                <span
                  className={cn(
                    "text-[10px] tracking-wide",
                    isSelected ? "text-slate-900 font-semibold" : "text-emerald-400/80 font-medium"
                  )}
                >
                  {tab.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* TAB 6: ASSESSMENT HISTORY VIEW */}
        {activeTab === "history" ? (
          <div className="space-y-6">
            <div className="rounded-3xl border border-emerald-500/30 bg-[#041a10]/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-heading font-bold text-white">
                    Verified Assessment Registry &amp; Attempt History
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    Every completed 10-minute assessment permanently calibrates your Skill DNA and earns cryptographic competence verification.
                  </p>
                </div>
                <Badge variant="gold" size="sm" className="font-bold">
                  {historyRecords.length} Completed Sessions
                </Badge>
              </div>

              {historyRecords.length === 0 ? (
                <div className="text-center py-12 space-y-3 bg-white/5 rounded-2xl border border-white/5">
                  <Award className="h-10 w-10 text-amber-400/60 mx-auto" />
                  <p className="text-sm text-gray-300 font-medium">No assessment records found yet.</p>
                  <p className="text-xs text-gray-500">
                    Select any of the 5 sections above to take your first 15-question, 10-minute diagnostic.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {historyRecords.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-card/60 border border-emerald-500/25 hover:border-emerald-500/50 transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-400/40 flex items-center justify-center text-xs font-bold text-amber-400">
                            {item.type[0]}
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-white">{item.title}</h4>
                            <div className="text-[11px] text-gray-400">
                              {new Date(item.completedAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}{" "}
                              • {item.correctAnswers} / {item.totalQuestions} Correct •{" "}
                              {String(Math.floor((item.timeUsedSeconds || 0) / 60)).padStart(2, "0")}:
                              {String((item.timeUsedSeconds || 0) % 60).padStart(2, "0")} Mins
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-xl font-heading font-black text-amber-400 tabular-nums">
                              {item.score}%
                            </div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                              Score
                            </div>
                          </div>
                          {item.verificationGranted ? (
                            <Badge variant="gold" size="sm" className="flex items-center gap-1">
                              <ShieldCheck className="h-3 w-3" />
                              <span>Assessment Verified</span>
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              size="sm"
                              className="border-red-500/40 text-red-300"
                            >
                              Developing
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Topic Breakdown Bar */}
                      <div className="pt-2 border-t border-emerald-950/60 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        {Object.entries(item.topicBreakdown).map(([t, s]) => (
                          <div key={t} className="p-2 rounded-xl bg-emerald-950/40">
                            <div className="text-[10px] text-gray-400 truncate">{t}</div>
                            <div className="font-bold text-white">{s}%</div>
                          </div>
                        ))}
                      </div>

                      {/* Strengths & Weak Areas tags */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                        <span className="text-gray-400">Strengths:</span>
                        {item.strengths.slice(0, 2).map((st) => (
                          <span
                            key={st}
                            className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                          >
                            ✓ {st}
                          </span>
                        ))}
                        {item.weakAreas.length > 0 && (
                          <>
                            <span className="text-gray-400 ml-2">Weak Areas:</span>
                            {item.weakAreas.slice(0, 2).map((wa) => (
                              <span
                                key={wa}
                                className="px-2 py-0.5 rounded-md bg-red-500/15 text-red-300 border border-red-500/30"
                              >
                                ⚠ {wa}
                              </span>
                            ))}
                          </>
                        )}
                      </div>

                      {/* Review Questions Button for this attempt */}
                      {item.questionReviews && item.questionReviews.length > 0 && (
                        <div className="pt-2 flex justify-end border-t border-emerald-950/60">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEvaluationResult(item)}
                            className="text-xs border-amber-500/40 text-amber-300 hover:bg-amber-500/10 font-medium"
                            leftIcon={<BookOpen className="h-3.5 w-3.5 text-amber-400" />}
                          >
                            Review Questions &amp; Explanations
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : evaluationResult ? (
          /* EVALUATION RESULTS VIEW - Professional Modern Executive Dashboard */
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#052416]/90 via-[#03190e]/95 to-[#021008] p-6 sm:p-10 shadow-2xl space-y-8 backdrop-blur-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-semibold tracking-wide">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Assessment Completed &amp; Synced to Skill DNA</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white tracking-tight leading-tight">
                    {evaluationResult.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-300/80 max-w-xl">
                    Evaluation completed under standard NCISM criteria. Topic proficiencies have been calibrated into your permanent competency radar.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-emerald-950/90 via-black/80 to-emerald-950/60 border border-amber-500/40 shadow-xl shadow-amber-500/10 flex flex-col items-center justify-center min-w-[150px] text-center">
                    <div className="text-4xl sm:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 tracking-tight tabular-nums">
                      {evaluationResult.score}%
                    </div>
                    <div className="text-[11px] text-amber-200/90 uppercase tracking-widest font-bold mt-1.5">
                      Calibrated Score
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              <div
                className={cn(
                  "p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-md shadow-lg transition-all",
                  evaluationResult.status === "SUBMITTED_TIME_EXPIRED"
                    ? "bg-amber-950/40 border-amber-500/40 text-amber-200"
                    : evaluationResult.status === "SUBMITTED_AFTER_INTEGRITY_FREEZE"
                    ? "bg-rose-950/40 border-rose-500/40 text-rose-200"
                    : evaluationResult.verificationGranted
                    ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                    : "bg-amber-950/40 border-amber-500/40 text-amber-200"
                )}
              >
                <div className="flex items-center gap-3.5">
                  {evaluationResult.status === "SUBMITTED_TIME_EXPIRED" ? (
                    <Clock className="h-6 w-6 text-amber-400 shrink-0" />
                  ) : evaluationResult.status === "SUBMITTED_AFTER_INTEGRITY_FREEZE" ? (
                    <AlertTriangle className="h-6 w-6 text-rose-400 shrink-0" />
                  ) : (
                    <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0" />
                  )}
                  <div className="space-y-0.5">
                    <div className="font-heading font-bold text-sm sm:text-base text-white tracking-wide">
                      {evaluationResult.status === "SUBMITTED_TIME_EXPIRED"
                        ? "Assessment Status: Automatically Submitted (10-Minute Limit Reached)"
                        : evaluationResult.status === "SUBMITTED_AFTER_INTEGRITY_FREEZE"
                        ? "Assessment Status: Submitted after Integrity Freeze"
                        : "Assessment Status: Verified Attempt Completed"}
                    </div>
                    <div className="text-xs text-gray-300 leading-relaxed">
                      {evaluationResult.status === "SUBMITTED_TIME_EXPIRED"
                        ? "Your 10-minute section time elapsed. All answered questions were compiled and your score has been recorded without penalty."
                        : evaluationResult.status === "SUBMITTED_AFTER_INTEGRITY_FREEZE"
                        ? "Assessment was locked due to exceeding integrity warnings. Answers and academic score have been compiled without deduction."
                        : evaluationResult.verificationGranted
                        ? "Congratulations! Your score exceeded the 70% benchmark. Relevant competencies in your Skill DNA have been upgraded to 'Assessment Verified'."
                        : "Developing performance. Your Skill DNA has been updated with these baseline points. Review weak areas in the Learning Hub to prepare for re-assessment."}
                    </div>
                  </div>
                </div>
                <Badge
                  variant={
                    evaluationResult.status === "SUBMITTED_AFTER_INTEGRITY_FREEZE"
                      ? "destructive"
                      : evaluationResult.verificationGranted
                      ? "gold"
                      : "outline"
                  }
                  className="shrink-0 font-sans text-xs font-bold px-3 py-1 uppercase tracking-wider"
                >
                  {evaluationResult.status === "SUBMITTED_TIME_EXPIRED"
                    ? "TIMED SUBMISSION"
                    : evaluationResult.status === "SUBMITTED_AFTER_INTEGRITY_FREEZE"
                    ? "INTEGRITY FROZEN"
                    : evaluationResult.verificationGranted
                    ? "SEAL GRANTED"
                    : "NEEDS PRACTICE"}
                </Badge>
              </div>

              {/* Integrity & Diagnostics Telemetry Meta (4 Sleek Modern KPI Cards) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all space-y-1 shadow-sm">
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Time Duration</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-tight tabular-nums">
                    {String(Math.floor((evaluationResult.timeUsedSeconds || 0) / 60)).padStart(2, "0")}:
                    {String((evaluationResult.timeUsedSeconds || 0) % 60).padStart(2, "0")} <span className="text-xs font-normal text-gray-400 font-sans">/ 10:00</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all space-y-1 shadow-sm">
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Integrity Warnings</span>
                  </div>
                  <div
                    className={cn(
                      "text-xl sm:text-2xl font-heading font-extrabold tracking-tight",
                      (evaluationResult.integrityWarningsCount || 0) >= 4
                        ? "text-rose-400"
                        : "text-emerald-400"
                    )}
                  >
                    {evaluationResult.integrityWarningsCount || 0} <span className="text-xs font-normal text-gray-400 font-sans">Warnings</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all space-y-1 shadow-sm">
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Questions Answered</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-tight tabular-nums">
                    {evaluationResult.correctAnswers} <span className="text-xs font-normal text-gray-400 font-sans">/ {evaluationResult.totalQuestions} Correct</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all space-y-1 shadow-sm">
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Skill DNA Sync</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-heading font-extrabold text-amber-400 tracking-tight flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> Calibrated
                  </div>
                </div>
              </div>

              {/* Topic Breakdown Grid (Clean Modern Cards with Gradient Bars) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-amber-400" />
                    <h3 className="text-sm sm:text-base font-heading font-bold text-white uppercase tracking-wider">
                      Topic-Level Diagnostic Breakdown
                    </h3>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">
                    NCISM CBDC Calibrated Taxonomy
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {Object.entries(evaluationResult.topicBreakdown).map(([t, sc]) => (
                    <div
                      key={t}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.06] transition-all space-y-2.5 shadow-sm group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors line-clamp-2">
                          {t}
                        </span>
                        <span className="text-xl font-heading font-black text-amber-400 tabular-nums shrink-0">
                          {sc}%
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(3, sc)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                          <span>Proficiency</span>
                          <span className={sc >= 70 ? "text-emerald-400" : sc >= 50 ? "text-amber-400" : "text-gray-400"}>
                            {sc >= 70 ? "Proficient" : sc >= 50 ? "Developing" : "Needs Review"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 🏛️ DETAILED QUESTION DIAGNOSTICS, WRONG ANSWERS & CLINICAL EXPLANATIONS */}
              {evaluationResult.questionReviews && evaluationResult.questionReviews.length > 0 && (
                <div className="pt-6 border-t border-white/10">
                  <AssessmentQuestionReview reviews={evaluationResult.questionReviews} />
                </div>
              )}

              {/* Action Buttons: Next steps */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEvaluationResult(null);
                    setUserAnswers({});
                    setBookmarkedIds([]);
                    setCurrentIndex(0);
                    setTimeRemainingSeconds(SECTION_TIME_LIMIT_SECONDS);
                    setTimeElapsedSeconds(0);
                  }}
                  leftIcon={<RotateCcw className="h-4 w-4" />}
                  className="w-full sm:w-auto text-xs font-semibold"
                >
                  Retake This Section (10 Mins)
                </Button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link href="/learning" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="w-full text-xs font-semibold border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10"
                    >
                      View Adaptive Roadmap
                    </Button>
                  </Link>
                  <Link href="/home" className="w-full sm:w-auto">
                    <Button
                      variant="gold"
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                      className="w-full text-xs font-bold shadow-lg shadow-amber-500/20"
                    >
                      Return to Home Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ACTIVE ASSESSMENT QUESTION RUNNER */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT 8 COLS: Question Runner */}
            <div className="lg:col-span-8 space-y-6">
              {/* Question Progress Tracker & Live 10-Minute Timer */}
              <div className="flex flex-wrap items-center justify-between text-xs text-gray-300 gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-semibold">
                    Question <strong className="text-amber-400">{currentIndex + 1}</strong> of {totalQ}
                  </span>
                  <span>•</span>
                  <span>
                    Answered:{" "}
                    <strong className="text-emerald-400">
                      {answeredCount} / {totalQ}
                    </strong>
                  </span>
                  {bookmarkedIds.length > 0 && (
                    <>
                      <span>•</span>
                      <span className="text-amber-300 flex items-center gap-1 font-mono">
                        <Bookmark className="w-3 h-3 fill-amber-300" />
                        {bookmarkedIds.length} Flagged
                      </span>
                    </>
                  )}
                </div>

                {/* Live 10-Minute Countdown Clock */}
                <div
                  className={cn(
                    "flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs border transition-all shadow-sm",
                    timeRemainingSeconds <= 60
                      ? "bg-rose-950/90 border-rose-500 text-rose-200 animate-pulse font-extrabold shadow-rose-900/50"
                      : timeRemainingSeconds <= 180
                      ? "bg-amber-950/80 border-amber-500/60 text-amber-300"
                      : "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                  )}
                >
                  <Timer className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>Remaining: </span>
                  <strong className="text-white text-sm font-black tracking-wider">
                    {formattedCountdown}
                  </strong>
                  {timeRemainingSeconds <= 60 && (
                    <span className="text-rose-400 text-[10px] font-bold uppercase tracking-wider ml-1">
                      ⚠️ Final Min
                    </span>
                  )}
                  {isFrozen && (
                    <span className="text-rose-400 font-bold ml-1 text-[10px] uppercase tracking-wider">
                      (Frozen)
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bars: Questions Progress + Time Remaining */}
              <div className="space-y-1">
                <div className="h-1.5 w-full rounded-full bg-emerald-950 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / totalQ) * 100}%` }}
                  />
                </div>
              </div>

              {/* Urgent Warning Banner when < 60s */}
              {timeRemainingSeconds <= 60 && !isFrozen && (
                <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/60 text-rose-200 text-xs flex items-center justify-between animate-pulse">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
                    <span>
                      <strong>Warning:</strong> Only <strong>{timeRemainingSeconds} seconds</strong>{" "}
                      left in this 10-minute section! Your answers will be automatically submitted at 00:00.
                    </span>
                  </div>
                  <Button
                    variant="gold"
                    size="sm"
                    onClick={() => handleFinishAssessment()}
                    className="h-7 text-[11px] px-2.5 font-bold"
                  >
                    Submit Now
                  </Button>
                </div>
              )}

              {/* INTERACTIVE 1-15 QUESTION MATRIX PALETTE */}
              <div className="rounded-2xl border border-emerald-500/25 bg-[#041a10]/80 backdrop-blur-md p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <LayoutGrid className="h-3.5 w-3.5 text-amber-400" />
                    Question Palette (15 Questions)
                  </span>
                  <span className="text-[11px] text-gray-400">Click any number to jump</span>
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-15 gap-1.5">
                  {activeQuestions.map((q, idx) => {
                    const isAnswered = !!userAnswers[q.id];
                    const isCurrent = idx === currentIndex;
                    const isFlagged = bookmarkedIds.includes(q.id);

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIndex(idx)}
                        disabled={isFrozen}
                        className={cn(
                          "h-8 rounded-lg font-mono text-xs font-bold transition-all relative flex items-center justify-center",
                          isCurrent
                            ? "ring-2 ring-amber-400 bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/20"
                            : isAnswered
                            ? "bg-emerald-600/90 text-white hover:bg-emerald-500"
                            : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white",
                          isFlagged &&
                            !isCurrent &&
                            "border-amber-400 text-amber-300 ring-1 ring-amber-400/50"
                        )}
                        title={`Question ${idx + 1}: ${
                          isAnswered ? "Answered" : "Not Answered"
                        }${isFlagged ? " (Flagged)" : ""}`}
                      >
                        <span>{idx + 1}</span>
                        {isFlagged && (
                          <Bookmark className="w-2 h-2 text-amber-300 fill-amber-300 absolute -top-0.5 -right-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-3 pt-1 text-[10px] text-gray-400 border-t border-emerald-950/60">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-600" />
                    <span>Answered ({answeredCount})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-amber-400" />
                    <span>Current</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded border border-amber-400 bg-amber-400/20" />
                    <span>Flagged ({bookmarkedIds.length})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-white/10 border border-white/10" />
                    <span>Unanswered ({totalQ - answeredCount})</span>
                  </div>
                </div>
              </div>

              {/* Question Card */}
              {currentQ && (
                <div className="rounded-3xl border border-emerald-500/30 bg-[#041a10]/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
                  {/* Meta Badges + Flag Button */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-950 pb-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="gold" size="sm" className="text-[10px]">
                        {currentQ.topic}
                      </Badge>
                      <Badge
                        variant="outline"
                        size="sm"
                        className="text-[10px] border-emerald-500/40 text-emerald-300"
                      >
                        {currentQ.category}
                      </Badge>
                      <span className="text-xs text-gray-400 font-mono">
                        Item {currentIndex + 1} of 15
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Flag/Bookmark Toggle */}
                      <button
                        onClick={() => handleToggleBookmark(currentQ.id)}
                        className={cn(
                          "flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition-all font-semibold",
                          bookmarkedIds.includes(currentQ.id)
                            ? "bg-amber-400/20 border-amber-400 text-amber-300"
                            : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                        )}
                        title="Bookmark to review before submitting"
                      >
                        <Bookmark
                          className={cn(
                            "w-3.5 h-3.5",
                            bookmarkedIds.includes(currentQ.id) && "fill-amber-300"
                          )}
                        />
                        <span>
                          {bookmarkedIds.includes(currentQ.id) ? "Flagged" : "Flag for Review"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Patient Vignette Box (If present) */}
                  {currentQ.vignette && (
                    <div className="p-4 rounded-2xl bg-emerald-950/70 border border-amber-500/30 space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Activity className="h-3.5 w-3.5" />
                        <span>Inpatient Clinical Case Data</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-200">
                        <div>
                          <strong>Patient:</strong> {currentQ.vignette.patientProfile}
                        </div>
                        <div>
                          <strong>Nadi:</strong> {currentQ.vignette.nadiPulse}
                        </div>
                        <div>
                          <strong>Agni:</strong> {currentQ.vignette.agniStatus}
                        </div>
                        <div>
                          <strong>Complaints:</strong> {currentQ.vignette.chiefComplaint}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Question Prompt */}
                  <h3 className="text-base sm:text-lg font-heading font-bold text-white leading-relaxed tracking-tight">
                    {currentQ.prompt}
                  </h3>

                  {/* Options List */}
                  <div className="space-y-3">
                    {currentQ.options.map((opt, oIdx) => {
                      const isSelected = userAnswers[currentQ.id] === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectAnswer(currentQ.id, opt.id)}
                          disabled={isFrozen}
                          className={cn(
                            "w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 group",
                            isFrozen && "cursor-not-allowed opacity-60",
                            isSelected
                              ? "bg-amber-400/15 border-amber-400/90 text-white shadow-lg shadow-amber-400/10 ring-1 ring-amber-400/40"
                              : "bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-emerald-500/40 text-gray-200"
                          )}
                        >
                          <span
                            className={cn(
                              "w-7 h-7 rounded-xl border flex items-center justify-center text-xs font-heading font-bold shrink-0 mt-0.5 transition-colors",
                              isSelected
                                ? "bg-amber-400 border-amber-400 text-slate-950 shadow-sm"
                                : "border-white/20 bg-white/5 text-gray-300 group-hover:border-white/40"
                            )}
                          >
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="text-xs sm:text-sm font-sans font-medium leading-relaxed pt-0.5">
                            {opt.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation Footbar (Unblocked Next/Prev + Submit Option) */}
                  <div className="pt-4 border-t border-emerald-950/80 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                        disabled={currentIndex === 0 || isFrozen}
                        className="text-xs"
                      >
                        Previous
                      </Button>

                      {userAnswers[currentQ.id] && (
                        <button
                          onClick={() => {
                            const copy = { ...userAnswers };
                            delete copy[currentQ.id];
                            setUserAnswers(copy);
                          }}
                          className="text-[11px] text-gray-400 hover:text-rose-400 underline px-2"
                        >
                          Clear Selection
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {currentIndex < totalQ - 1 ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentIndex((prev) => prev + 1)}
                          disabled={isFrozen}
                          rightIcon={<ArrowRight className="h-4 w-4" />}
                          className="text-xs border-emerald-500/40 text-emerald-300"
                        >
                          Next Question
                        </Button>
                      ) : null}

                      <Button
                        variant="gold"
                        size="sm"
                        onClick={() => {
                          if (answeredCount < totalQ) {
                            setShowSubmitConfirmModal(true);
                          } else {
                            handleFinishAssessment();
                          }
                        }}
                        disabled={isEvaluating || isFrozen}
                        isLoading={isEvaluating}
                        className="text-xs font-bold px-5 shadow-md shadow-accent/25"
                      >
                        {currentIndex === totalQ - 1
                          ? "Submit Assessment"
                          : `Finish & Submit (${answeredCount}/${totalQ})`}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT 4 COLS: Dedicated AI Proctoring Sidebar (Camera + Badges + Warnings + Audit) */}
            <div className="lg:col-span-4 space-y-4">
              <AssessmentIntegrityMonitor
                isActive={!evaluationResult}
                assessmentId={assessmentAttemptId}
                warningCount={warningCount}
                isFrozen={isFrozen}
                onWarning={handleWarning}
                onFreeze={handleFreeze}
                onSubmitFrozen={() =>
                  handleFinishAssessment("SUBMITTED_AFTER_INTEGRITY_FREEZE")
                }
              />
            </div>
          </div>
        )}
      </main>

      {/* CONFIRMATION MODAL ON MANUAL SUBMIT WITH UNANSWERED QUESTIONS */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0B1510] border border-amber-500/40 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Ready to Submit?</h3>
                <p className="text-xs text-gray-400">
                  You have answered <strong className="text-emerald-400">{answeredCount}</strong> of{" "}
                  <strong>{totalQ}</strong> questions.
                </p>
              </div>
            </div>

            {totalQ - answeredCount > 0 ? (
              <p className="text-xs text-amber-200/90 leading-relaxed bg-amber-950/40 p-3.5 rounded-xl border border-amber-500/30">
                ⚠️ You have <strong>{totalQ - answeredCount} unanswered questions</strong>. You still
                have <strong>{formattedCountdown} remaining</strong> on the timer. Unanswered questions
                will be scored as 0 marks.
              </p>
            ) : (
              <p className="text-xs text-emerald-200/90 leading-relaxed bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-500/30">
                ✓ Great job! All 15 questions answered with <strong>{formattedCountdown}</strong> to spare.
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSubmitConfirmModal(false)}
                className="text-xs text-gray-300"
              >
                Keep Answering
              </Button>
              <Button
                variant="gold"
                size="sm"
                onClick={() => handleFinishAssessment()}
                className="text-xs font-bold px-4"
              >
                Confirm &amp; Grade
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* TIME EXPIRED MODAL */}
      {showTimeExpiredModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0B1510] border border-rose-500/50 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">10-Minute Time Expired!</h3>
                <p className="text-xs text-gray-400">
                  Section time limit has concluded.
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/10">
              Your 10-minute section limit has ended. All your recorded answers (
              <strong className="text-emerald-400">{answeredCount} of 15</strong>) have been
              automatically evaluated and synced to your permanent Skill DNA.
            </p>

            <div className="flex justify-end pt-2">
              <Button
                variant="gold"
                size="sm"
                onClick={() => setShowTimeExpiredModal(false)}
                className="text-xs font-bold px-5"
              >
                View Diagnostic Report
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <MarketingFooter />
    </div>
  );
}

export default function AssessHubPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#070E0A] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-emerald-400">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs uppercase tracking-widest font-mono">
              Calibrating Ayush Assessment Engine...
            </p>
          </div>
        </div>
      }
    >
      <AssessHubContent />
    </React.Suspense>
  );
}
