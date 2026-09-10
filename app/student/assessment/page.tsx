"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { loadOnboardingDraftLocally } from "@/lib/services/studentOnboarding";
import {
  DiagnosticQuestion,
  AssessmentDiagnosticResult,
  AssessmentAnswerRecord,
  generatePersonalizedAssessment,
  evaluateAssessmentAttempt,
  saveAssessmentResultLocally,
  loadAssessmentResultLocally,
  syncAssessmentResultToSupabase,
} from "@/lib/services/questionEngine";
import { AssessmentHeader } from "@/components/assessment/AssessmentHeader";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { AssessmentResultsView } from "@/components/assessment/AssessmentResultsView";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import {
  X,
  CheckCircle2,
  Bookmark,
  AlertCircle,
  HelpCircle,
  Stethoscope,
  Sparkles,
} from "lucide-react";

function SkillAssessmentContent() {
  const router = useRouter();
  const { user } = useAuth();

  // Onboarding data & questions state
  const [questions, setQuestions] = React.useState<DiagnosticQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [bookmarkedIds, setBookmarkedIds] = React.useState<string[]>([]);
  const [timeElapsedSeconds, setTimeElapsedSeconds] = React.useState<number>(0);

  // Flow states
  const [isCompleted, setIsCompleted] = React.useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] =
    React.useState<AssessmentDiagnosticResult | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [showExitModal, setShowExitModal] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  // Initialize questions
  React.useEffect(() => {
    const onboarding = loadOnboardingDraftLocally();
    const generated = generatePersonalizedAssessment(onboarding);
    setQuestions(generated);

    // Check if there was already an evaluation result to resume/inspect
    const existing = loadAssessmentResultLocally();
    if (existing && existing.overallScore) {
      // Keep existing as fallback option
    }

    setIsLoading(false);
  }, []);

  // Timer interval
  React.useEffect(() => {
    if (isCompleted || isLoading) return;
    const interval = setInterval(() => {
      setTimeElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted, isLoading]);

  // Current question helpers
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;

  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleToggleBookmark = () => {
    if (!currentQuestion) return;
    setBookmarkedIds((prev) =>
      prev.includes(currentQuestion.id)
        ? prev.filter((id) => id !== currentQuestion.id)
        : [...prev, currentQuestion.id]
    );
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentIndex(index);
    setIsDrawerOpen(false);
  };

  const handleSubmitAssessment = async () => {
    if (questions.length === 0) return;
    setIsSubmitting(true);

    try {
      const result = evaluateAssessmentAttempt(answers, questions);
      saveAssessmentResultLocally(result);

      if (user?.id) {
        await syncAssessmentResultToSupabase(user.id, result);
      }

      setEvaluationResult(result);
      setIsCompleted(true);
    } catch (err) {
      console.error("Failed to finalize assessment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetake = () => {
    const onboarding = loadOnboardingDraftLocally();
    const fresh = generatePersonalizedAssessment(onboarding);
    setQuestions(fresh);
    setAnswers({});
    setBookmarkedIds([]);
    setCurrentIndex(0);
    setTimeElapsedSeconds(0);
    setEvaluationResult(null);
    setIsCompleted(false);
  };

  const handleApplyToDashboard = () => {
    router.push("/student");
  };

  if (isLoading || questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#070E0A] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest font-mono text-emerald-400">
            Calibrating Diagnostic Engine...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070E0A] text-foreground flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[350px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex-1 flex flex-col">
        {!isCompleted ? (
          <>
            {/* Top Interactive Header */}
            <AssessmentHeader
              currentIndex={currentIndex}
              totalQuestions={totalQuestions}
              domain={currentQuestion.domain}
              sanskritTopic={currentQuestion.sanskritTopic}
              isBookmarked={bookmarkedIds.includes(currentQuestion.id)}
              onToggleBookmark={handleToggleBookmark}
              onOpenQuestionDrawer={() => setIsDrawerOpen(true)}
              onExit={() => setShowExitModal(true)}
              answeredCount={answeredCount}
              timeElapsedSeconds={timeElapsedSeconds}
            />

            {/* Assessment Question Chamber */}
            <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="w-full"
                >
                  <QuestionCard
                    question={currentQuestion}
                    selectedOptionId={answers[currentQuestion.id] || null}
                    onSelectOption={handleSelectOption}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    isFirst={currentIndex === 0}
                    isLast={currentIndex === totalQuestions - 1}
                    onSubmitAssessment={handleSubmitAssessment}
                    isSubmitting={isSubmitting}
                  />
                </motion.div>
              </AnimatePresence>
            </main>
          </>
        ) : (
          /* Assessment Results View */
          evaluationResult && (
            <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-10">
              <AssessmentResultsView
                result={evaluationResult}
                onApplyToDashboard={handleApplyToDashboard}
                onRetake={handleRetake}
              />
            </main>
          )
        )}
      </div>

      {/* QUESTION GRID DRAWER / MODAL */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0B1510] border border-white/15 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Diagnostic Question Map</h3>
                <p className="text-xs text-white/60">
                  {answeredCount} of {totalQuestions} answered
                </p>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/70 py-1">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded border border-emerald-400" />
                <span>Current</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500/50" />
                <span>Flagged</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-white/10" />
                <span>Unanswered</span>
              </div>
            </div>

            {/* Grid Buttons */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 pt-2">
              {questions.map((q, qIdx) => {
                const isAnswered = !!answers[q.id];
                const isCurrent = qIdx === currentIndex;
                const isFlagged = bookmarkedIds.includes(q.id);

                return (
                  <button
                    key={q.id}
                    onClick={() => handleJumpToQuestion(qIdx)}
                    className={cn(
                      "h-12 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-sm relative transition-all",
                      isCurrent
                        ? "ring-2 ring-emerald-400 bg-emerald-950/60 text-white"
                        : isAnswered
                        ? "bg-emerald-600/80 text-black hover:bg-emerald-500"
                        : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10",
                      isFlagged && "border-amber-400/80"
                    )}
                  >
                    <span>{qIdx + 1}</span>
                    {isFlagged && (
                      <Bookmark className="w-2.5 h-2.5 text-amber-300 fill-amber-300 absolute top-1 right-1" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDrawerOpen(false)}
                className="text-white border-white/20"
              >
                Close Map
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* EXIT CONFIRMATION MODAL */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0B1510] border border-white/15 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Exit Skill Assessment?</h3>
                <p className="text-xs text-white/60">
                  Your selected responses are saved locally on this browser.
                </p>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
              You can return anytime to complete the diagnostic and generate your updated
              Ayurveda Career DNA & Gap Report.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExitModal(false)}
                className="text-white/70 hover:text-white"
              >
                Resume Assessment
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => router.push("/student")}
                className="bg-rose-600 hover:bg-rose-500 text-white"
              >
                Exit to Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Compact Minimal Footer */}
      <footer className="relative z-10 py-4 px-6 border-t border-white/5 text-center text-xs text-white/40">
        <p>Vaidya Setu • Ministry of Ayush • All India Institute of Ayurveda</p>
      </footer>
    </div>
  );
}

export default function SkillAssessmentPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#070E0A] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-emerald-400">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs uppercase tracking-widest font-mono">
              Loading Skill Assessment...
            </p>
          </div>
        </div>
      }
    >
      <SkillAssessmentContent />
    </React.Suspense>
  );
}
