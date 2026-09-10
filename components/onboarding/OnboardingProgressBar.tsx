"use client";

import * as React from "react";
import { Check, GraduationCap, Briefcase, Target, Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface OnboardingStepMeta {
  number: string;
  key: string;
  title: string;
  shortTitle: string;
  icon: React.ReactNode;
}

export const ONBOARDING_STEPS: OnboardingStepMeta[] = [
  {
    number: "01",
    key: "academic",
    title: "Academic Path",
    shortTitle: "Academic",
    icon: <GraduationCap className="h-4 w-4" />,
  },
  {
    number: "02",
    key: "experience",
    title: "Prior Experience",
    shortTitle: "Experience",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    number: "03",
    key: "career-goal",
    title: "Career Goals",
    shortTitle: "Career Goal",
    icon: <Target className="h-4 w-4" />,
  },
  {
    number: "04",
    key: "availability",
    title: "Availability & Locale",
    shortTitle: "Availability",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    number: "05",
    key: "complete",
    title: "Career DNA Ready",
    shortTitle: "Complete",
    icon: <Sparkles className="h-4 w-4" />,
  },
];

interface OnboardingProgressBarProps {
  currentStep: number; // 1 to 5
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export function OnboardingProgressBar({
  currentStep,
  onStepClick,
  className,
}: OnboardingProgressBarProps) {
  const percentage = Math.round(((currentStep - 1) / (ONBOARDING_STEPS.length - 1)) * 100);

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Top Status Header */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-mono uppercase tracking-widest text-[11px] text-accent font-semibold">
            Stage {currentStep} of {ONBOARDING_STEPS.length}
          </span>
          <span className="text-border">•</span>
          <span className="font-medium text-foreground">
            {ONBOARDING_STEPS[currentStep - 1]?.title}
          </span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[11px] font-semibold text-primary">
          <span>{percentage}%</span>
          <span className="text-muted-foreground font-normal">Completed</span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="relative w-full h-2 rounded-full bg-muted overflow-hidden border border-border/60">
        <div
          className="h-full bg-gradient-to-r from-primary via-herbal-500 to-accent transition-all duration-500 ease-out rounded-full shadow-sm shadow-accent/20"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Milestone Step Nodes (Desktop / Tablet) */}
      <div className="hidden sm:grid grid-cols-5 gap-2 pt-1">
        {ONBOARDING_STEPS.map((step, idx) => {
          const stepIndex = idx + 1;
          const isPassed = currentStep > stepIndex;
          const isCurrent = currentStep === stepIndex;
          const isClickable = onStepClick && isPassed;

          return (
            <button
              key={step.key}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onStepClick(stepIndex)}
              className={cn(
                "flex items-center gap-2.5 p-2 rounded-xl text-left transition-all text-xs group",
                isCurrent && "bg-card border border-accent/40 shadow-sm shadow-accent/10",
                isPassed && "hover:bg-muted/60 cursor-pointer",
                !isPassed && !isCurrent && "opacity-50 cursor-not-allowed"
              )}
            >
              {/* Step Circle */}
              <div
                className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-all font-mono",
                  isPassed && "bg-primary text-white shadow-sm",
                  isCurrent && "bg-accent text-accent-foreground ring-2 ring-accent/30 scale-105",
                  !isPassed && !isCurrent && "bg-muted text-muted-foreground border border-border"
                )}
              >
                {isPassed ? <Check className="h-3.5 w-3.5" /> : step.number}
              </div>

              {/* Step Text */}
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "text-[11px] font-bold truncate leading-tight",
                    isCurrent && "text-accent",
                    isPassed && "text-foreground",
                    !isPassed && !isCurrent && "text-muted-foreground"
                  )}
                >
                  {step.shortTitle}
                </p>
                <p className="text-[10px] text-muted-foreground truncate capitalize">
                  {isPassed ? "Completed" : isCurrent ? "In Progress" : "Pending"}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
