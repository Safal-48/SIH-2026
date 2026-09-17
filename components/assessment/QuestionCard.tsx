"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import {
  DiagnosticQuestion,
  QuestionArchetype,
  DiagnosticOption,
} from "@/lib/services/questionEngine";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Stethoscope,
  BookOpen,
  FlaskConical,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Activity,
  Flame,
  UserCheck,
  Zap,
} from "lucide-react";

interface QuestionCardProps {
  question: DiagnosticQuestion;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  onSubmitAssessment: () => void;
  isSubmitting?: boolean;
}

const ARCHETYPE_CONFIG: Record<
  QuestionArchetype,
  { label: string; icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  CASE_VIGNETTE: {
    label: "Inpatient Clinical Vignette",
    icon: Stethoscope,
    color: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  },
  SCENARIO: {
    label: "Practical Scenario Simulation",
    icon: FlaskConical,
    color: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  },
  MCQ: {
    label: "Core Conceptual Diagnostic",
    icon: BookOpen,
    color: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  },
};

export function QuestionCard({
  question,
  selectedOptionId,
  onSelectOption,
  onNext,
  onPrev,
  isFirst,
  isLast,
  onSubmitAssessment,
  isSubmitting = false,
}: QuestionCardProps) {
  const archetypeInfo = ARCHETYPE_CONFIG[question.archetype] || ARCHETYPE_CONFIG.MCQ;
  const ArchetypeIcon = archetypeInfo.icon;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-[#0B1510]/80 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 backdrop-blur-xl shadow-2xl transition-all">
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border",
                archetypeInfo.color
              )}
            >
              <ArchetypeIcon className="w-3.5 h-3.5" />
              {archetypeInfo.label}
            </span>

            <span className="text-xs text-white/50 px-2 py-0.5 rounded bg-white/5 border border-white/5">
              Target Competency:{" "}
              <strong className="text-white/80 font-medium">{question.relatedSkillName}</strong>
            </span>
          </div>

          <div className="text-xs text-emerald-400/90 font-mono flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Multi-level Competency Item</span>
          </div>
        </div>

        {/* Title */}
        <div className="mt-5 mb-4">
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-tight leading-snug">
            {question.title}
          </h2>
        </div>

        {/* Clinical Vitals Box (if present for Case Vignettes) */}
        {question.patientVitals && (
          <div className="my-5 p-4 rounded-xl sm:rounded-2xl bg-black/40 border border-emerald-900/40 shadow-inner">
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <Activity className="w-3.5 h-3.5" />
              <span>Inpatient Clinical Chart & Vitals</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-white/50 block text-[11px] mb-0.5">Patient Profile</span>
                <span className="font-semibold text-white/90">
                  {question.patientVitals.ageGender}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-white/50 block text-[11px] mb-0.5">Prakriti</span>
                <span className="font-semibold text-amber-300">
                  {question.patientVitals.prakriti}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-white/50 block text-[11px] mb-0.5">Chief Complaint</span>
                <span className="font-semibold text-rose-300">
                  {question.patientVitals.chiefComplaint}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-white/50 block text-[11px] mb-0.5">Nadi Pariksha</span>
                <span className="font-semibold text-white/90">
                  {question.patientVitals.nadiPulse}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 sm:col-span-2">
                <span className="text-white/50 block text-[11px] mb-0.5 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400" /> Agni / Digestive State
                </span>
                <span className="font-semibold text-white/90">
                  {question.patientVitals.agniDigestiveState}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Narrative / Scenario text */}
        {question.caseScenario && (
          <div className="my-5 p-4 rounded-xl bg-gradient-to-r from-emerald-950/20 via-black/30 to-amber-950/10 border-l-4 border-emerald-500 border-y border-r border-white/5 text-sm sm:text-base text-white/85 leading-relaxed font-sans">
            &ldquo;{question.caseScenario}&rdquo;
          </div>
        )}

        {/* Question Prompt */}
        <div className="mt-6 mb-5">
          <p className="text-base sm:text-lg font-medium text-white/95 leading-relaxed">
            {question.questionPrompt}
          </p>
        </div>

        {/* Options List */}
        <div className="space-y-3.5 my-6">
          {question.options.map((option, optIdx) => {
            const isSelected = selectedOptionId === option.id;
            const letterLabel = String.fromCharCode(65 + optIdx); // A, B, C, D

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelectOption(option.id)}
                className={cn(
                  "w-full text-left p-4 sm:p-4.5 rounded-xl sm:rounded-2xl border transition-all duration-200 flex items-start gap-3.5 relative group",
                  isSelected
                    ? "bg-gradient-to-r from-emerald-950/60 to-emerald-900/30 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/50"
                    : "bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/20 text-white/80"
                )}
              >
                {/* Option Letter Indicator */}
                <div
                  className={cn(
                    "w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-all",
                    isSelected
                      ? "bg-emerald-500 text-black shadow-md"
                      : "bg-white/10 text-white/70 group-hover:bg-white/15 group-hover:text-white"
                  )}
                >
                  {letterLabel}
                </div>

                {/* Option Text */}
                <div className="flex-1 pt-0.5">
                  <span
                    className={cn(
                      "text-sm sm:text-base leading-snug transition-colors",
                      isSelected ? "text-white font-semibold" : "text-white/80"
                    )}
                  >
                    {option.text}
                  </span>
                </div>

                {/* Checkmark Indicator */}
                <div className="pt-0.5">
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                      isSelected
                        ? "border-emerald-400 bg-emerald-500 text-black"
                        : "border-white/20 group-hover:border-white/40"
                    )}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Card Navigation Footer */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/10 mt-6">
          <Button
            variant="ghost"
            size="md"
            onClick={onPrev}
            disabled={isFirst}
            className="w-full sm:w-auto text-white/70 hover:text-white hover:bg-white/5 border border-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Previous
          </Button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isLast ? (
              <Button
                variant="primary"
                size="md"
                onClick={onSubmitAssessment}
                disabled={isSubmitting || !selectedOptionId}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold shadow-lg shadow-emerald-900/30 px-6 py-2.5"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    <span>Analyzing Career DNA...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Generate Skill Gap Report</span>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </div>
                )}
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={onNext}
                disabled={!selectedOptionId}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-900/20 px-6"
              >
                <span>Save & Continue</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
