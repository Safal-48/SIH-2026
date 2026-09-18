"use client";

import * as React from "react";
import {
  Check,
  X,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Stethoscope,
  ChevronRight,
  ChevronDown,
  LayoutGrid,
  Sparkles,
  Award,
  HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { QuestionReviewItem } from "@/lib/services/skillIntelligenceService";
import { cn } from "@/lib/utils/cn";

export interface AssessmentQuestionReviewProps {
  reviews: QuestionReviewItem[];
  className?: string;
  defaultFilter?: "wrong" | "all" | "correct" | "unanswered";
}

export function AssessmentQuestionReview({
  reviews,
  className,
  defaultFilter,
}: AssessmentQuestionReviewProps) {
  const wrongCount = reviews.filter((r) => !r.isCorrect && !r.isUnanswered).length;
  const unansweredCount = reviews.filter((r) => r.isUnanswered).length;
  const correctCount = reviews.filter((r) => r.isCorrect).length;

  // Default to "wrong" if user has any wrong or unanswered answers, else "all"
  const initialFilter =
    defaultFilter || (wrongCount + unansweredCount > 0 ? "wrong" : "all");

  const [activeFilter, setActiveFilter] = React.useState<
    "wrong" | "all" | "correct" | "unanswered"
  >(initialFilter);
  const [expandedIds, setExpandedIds] = React.useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setExpandedIds(reviews.map((r) => r.questionId));
  };

  const collapseAll = () => {
    setExpandedIds([]);
  };

  const displayedQuestions = React.useMemo(() => {
    switch (activeFilter) {
      case "wrong":
        return reviews.filter((r) => !r.isCorrect); // includes wrong + unanswered
      case "correct":
        return reviews.filter((r) => r.isCorrect);
      case "unanswered":
        return reviews.filter((r) => r.isUnanswered);
      case "all":
      default:
        return reviews;
    }
  }, [reviews, activeFilter]);

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* 1. SECTION HEADER & TAB CONTROLS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-400">
            <BookOpen className="h-5 w-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-heading font-extrabold text-white tracking-wide">
              Question Review &amp; Clinical Explanations
            </h3>
          </div>
          <p className="text-xs text-gray-300">
            Review your incorrect answers, verified correct solutions, and authentic NCISM Samhita rationales.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveFilter("wrong")}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border",
              activeFilter === "wrong"
                ? "bg-rose-500/25 text-rose-300 border-rose-500/60 shadow-lg shadow-rose-950/50 ring-1 ring-rose-500/40"
                : "bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10"
            )}
          >
            <X className="h-3.5 w-3.5 text-rose-400 shrink-0" />
            <span>Wrong Answers ({wrongCount + unansweredCount})</span>
          </button>

          <button
            onClick={() => setActiveFilter("all")}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border",
              activeFilter === "all"
                ? "bg-amber-500/25 text-amber-300 border-amber-500/60 shadow-lg shadow-amber-950/50 ring-1 ring-amber-500/40"
                : "bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10"
            )}
          >
            <LayoutGrid className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span>All Questions ({reviews.length})</span>
          </button>

          <button
            onClick={() => setActiveFilter("correct")}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border",
              activeFilter === "correct"
                ? "bg-emerald-500/25 text-emerald-300 border-emerald-500/60 shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-500/40"
                : "bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10"
            )}
          >
            <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>Correct ({correctCount})</span>
          </button>

          {unansweredCount > 0 && (
            <button
              onClick={() => setActiveFilter("unanswered")}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border",
                activeFilter === "unanswered"
                  ? "bg-amber-500/25 text-amber-300 border-amber-500/60 shadow-lg shadow-amber-950/50 ring-1 ring-amber-500/40"
                  : "bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10"
              )}
            >
              <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span>Unanswered ({unansweredCount})</span>
            </button>
          )}

          <div className="h-4 w-px bg-white/15 mx-1 hidden sm:block" />

          <button
            onClick={expandedIds.length === reviews.length ? collapseAll : expandAll}
            className="text-[11px] text-gray-400 hover:text-emerald-300 font-medium underline-offset-2 hover:underline transition-colors px-1"
          >
            {expandedIds.length === reviews.length ? "Collapse Details" : "Expand All Details"}
          </button>
        </div>
      </div>

      {/* 2. QUESTION CARDS LIST */}
      <div className="space-y-6">
        {displayedQuestions.length === 0 ? (
          <div className="p-10 text-center rounded-3xl bg-white/[0.02] border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-white">No questions in this filter</h4>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              {activeFilter === "wrong"
                ? "Perfect score! You answered all questions correctly in this section."
                : "No questions match your currently selected filter."}
            </p>
          </div>
        ) : (
          displayedQuestions.map((item) => {
            const isExpanded = expandedIds.includes(item.questionId);

            return (
              <div
                key={item.questionId}
                className={cn(
                  "rounded-3xl border p-5 sm:p-7 backdrop-blur-xl transition-all shadow-xl space-y-5",
                  item.isCorrect
                    ? "bg-gradient-to-b from-[#052115]/90 via-[#03180e]/95 to-[#021008] border-emerald-500/35 hover:border-emerald-500/50"
                    : item.isUnanswered
                    ? "bg-gradient-to-b from-[#211a09]/90 via-[#181206]/95 to-[#0e0903] border-amber-500/40 hover:border-amber-500/55"
                    : "bg-gradient-to-b from-[#260c0c]/90 via-[#1a0707]/95 to-[#100303] border-rose-500/45 hover:border-rose-500/60"
                )}
              >
                {/* Header: Question Number, Topic Badge, Result Status */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-xl bg-white/10 text-white font-mono font-bold text-xs border border-white/10">
                      Question {item.questionNumber}
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold text-xs">
                      {item.topic}
                    </span>
                    <span className="text-[11px] text-gray-400 font-mono hidden sm:inline">
                      • {item.category}
                    </span>
                  </div>

                  <Badge
                    variant={
                      item.isCorrect
                        ? "verified"
                        : item.isUnanswered
                        ? "warning"
                        : "destructive"
                    }
                    size="sm"
                    className="font-mono text-xs font-bold px-3 py-1 flex items-center gap-1.5"
                  >
                    {item.isCorrect ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Correct (+1)
                      </>
                    ) : item.isUnanswered ? (
                      <>
                        <AlertTriangle className="h-3.5 w-3.5" /> Unanswered (0)
                      </>
                    ) : (
                      <>
                        <X className="h-3.5 w-3.5" /> Incorrect (-1)
                      </>
                    )}
                  </Badge>
                </div>

                {/* Case Vignette (if available) */}
                {item.vignette && (
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                      <Stethoscope className="h-3.5 w-3.5" />
                      <span>Inpatient Clinical Scenario</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300">
                      <div>
                        <span className="text-gray-400 font-semibold">Patient: </span>
                        {item.vignette.patientProfile}
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold">Complaint: </span>
                        {item.vignette.chiefComplaint}
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold">Nadi (Pulse): </span>
                        {item.vignette.nadiPulse}
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold">Agni / Koshta: </span>
                        {item.vignette.agniStatus}
                      </div>
                    </div>
                  </div>
                )}

                {/* Question Prompt */}
                <div className="text-sm sm:text-base font-heading font-bold text-white leading-relaxed">
                  {item.prompt}
                </div>

                {/* Answer Diagnostics Section */}
                <div className="space-y-3.5 pt-1">
                  {/* ❌ 1. USER'S WRONG ANSWER & WHY IT WAS WRONG */}
                  {!item.isCorrect && !item.isUnanswered && (
                    <div className="rounded-2xl border border-rose-500/50 bg-rose-950/30 p-4 sm:p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
                          <div className="h-5 w-5 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                            <X className="h-3.5 w-3.5" />
                          </div>
                          <span>Your Selected Answer (Incorrect)</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-rose-400 px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/30">
                          -1 Point
                        </span>
                      </div>

                      <div className="text-sm font-semibold text-rose-100 pl-7 leading-relaxed">
                        {item.userSelectedText || "No answer text available"}
                      </div>

                      {item.userSelectedRationale && (
                        <div className="ml-7 p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/35 text-xs text-rose-200/90 leading-relaxed space-y-1">
                          <span className="font-bold text-rose-300 flex items-center gap-1.5 text-xs">
                            <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-400" />
                            Why this selection is incorrect:
                          </span>
                          <p className="text-gray-300">{item.userSelectedRationale}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ⚠️ 2. UNANSWERED NOTICE */}
                  {item.isUnanswered && (
                    <div className="rounded-2xl border border-amber-500/40 bg-amber-950/25 p-4 space-y-1.5 text-xs text-amber-200">
                      <div className="flex items-center gap-2 font-bold text-amber-300 uppercase tracking-wider">
                        <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                        <span>Question Unanswered</span>
                      </div>
                      <p className="text-gray-300 pl-6 leading-relaxed">
                        You did not select an option for this question before the assessment was submitted.
                      </p>
                    </div>
                  )}

                  {/* ✅ 3. CORRECT ANSWER & COMPREHENSIVE CLINICAL EXPLANATION */}
                  <div className="rounded-2xl border border-emerald-500/60 bg-emerald-950/45 p-4 sm:p-5 space-y-3 shadow-lg shadow-emerald-950/40">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider">
                        <div className="h-5 w-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span>
                          {item.isCorrect
                            ? "Your Selection (Correct! 🎉)"
                            : "Correct Answer (Classical NCISM Key)"}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                        Official Key
                      </span>
                    </div>

                    <div className="text-sm font-bold text-emerald-100 pl-7 leading-relaxed">
                      {item.correctOptionText}
                    </div>

                    {item.correctOptionRationale && (
                      <div className="ml-7 p-3.5 sm:p-4 rounded-xl bg-[#02180e]/90 border border-emerald-500/40 text-xs text-emerald-100/95 leading-relaxed space-y-1.5 shadow-sm">
                        <span className="font-bold text-emerald-300 flex items-center gap-1.5 text-xs">
                          <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                          Clinical Explanation &amp; Samhita Rationale:
                        </span>
                        <p className="text-gray-200">{item.correctOptionRationale}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. OPTIONAL COLLAPSIBLE: ALL 4 CHOICES & DISTRACTORS */}
                <div className="pt-1">
                  <button
                    onClick={() => toggleExpand(item.questionId)}
                    className="text-xs font-semibold text-gray-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors group"
                  >
                    <span>
                      {isExpanded
                        ? "Hide all 4 option rationales"
                        : "Explore all 4 option rationales & distractors"}
                    </span>
                    <ChevronRight
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200 text-gray-400 group-hover:text-emerald-300",
                        isExpanded && "rotate-90"
                      )}
                    />
                  </button>

                  {isExpanded && (
                    <div className="mt-3.5 space-y-2.5 pt-3 border-t border-white/10 animate-in fade-in duration-200">
                      <div className="text-[11px] font-mono text-gray-400 pb-1">
                        Detailed Distractor Analysis for All Choices:
                      </div>
                      {item.allOptions.map((opt, oIdx) => {
                        const isChosenByUser = opt.id === item.userSelectedOptionId;
                        return (
                          <div
                            key={opt.id}
                            className={cn(
                              "p-3 sm:p-3.5 rounded-xl border text-xs space-y-1 transition-all",
                              opt.isCorrect
                                ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
                                : isChosenByUser
                                ? "bg-rose-950/35 border-rose-500/45 text-rose-200"
                                : "bg-white/[0.02] border-white/5 text-gray-300"
                            )}
                          >
                            <div className="flex items-start justify-between gap-2 font-semibold">
                              <div className="flex items-start gap-2">
                                {opt.isCorrect ? (
                                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                                ) : isChosenByUser ? (
                                  <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                                ) : (
                                  <span className="w-4 h-4 rounded-full bg-white/10 text-center text-gray-400 font-mono text-[10px] shrink-0 mt-0.5 flex items-center justify-center">
                                    {String.fromCharCode(65 + oIdx)}
                                  </span>
                                )}
                                <span className={opt.isCorrect ? "text-emerald-300 font-bold" : isChosenByUser ? "text-rose-300 font-bold" : "text-gray-300"}>
                                  {opt.text}
                                </span>
                              </div>

                              <div className="shrink-0 flex items-center gap-1.5">
                                {opt.isCorrect && (
                                  <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30">
                                    ✓ Correct Key
                                  </span>
                                )}
                                {!opt.isCorrect && isChosenByUser && (
                                  <span className="text-[10px] font-bold text-rose-400 uppercase font-mono px-2 py-0.5 rounded bg-rose-500/15 border border-rose-500/30">
                                    ✗ Your Choice
                                  </span>
                                )}
                              </div>
                            </div>

                            <p className="text-[11px] text-gray-400 pl-6 leading-relaxed pt-0.5">
                              {opt.clinicalRationale}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
