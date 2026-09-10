"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { SkillAssessmentDomain } from "@/lib/services/questionEngine";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Bookmark,
  BookmarkCheck,
  LayoutGrid,
  ArrowLeft,
  Clock,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  FlaskConical,
  Activity,
  HeartHandshake,
} from "lucide-react";

interface AssessmentHeaderProps {
  currentIndex: number;
  totalQuestions: number;
  domain: SkillAssessmentDomain;
  sanskritTopic?: string;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onOpenQuestionDrawer: () => void;
  onExit: () => void;
  answeredCount: number;
  timeElapsedSeconds: number;
}

const DOMAIN_METADATA: Record<
  SkillAssessmentDomain,
  { label: string; sanskrit: string; icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  DIAGNOSTICS: {
    label: "Clinical Diagnostics",
    sanskrit: "Roga Nidana & Nadi Pariksha",
    icon: Stethoscope,
    color: "text-emerald-400 bg-emerald-950/40 border-emerald-800/60",
  },
  THERAPEUTICS: {
    label: "Therapeutics & Pharmacology",
    sanskrit: "Kayachikitsa & Dravyaguna",
    icon: Sparkles,
    color: "text-amber-400 bg-amber-950/40 border-amber-800/60",
  },
  PATIENT_SAFETY: {
    label: "Patient Safety & Procedures",
    sanskrit: "Panchakarma & Clinical Protocols",
    icon: ShieldCheck,
    color: "text-blue-400 bg-blue-950/40 border-blue-800/60",
  },
  RESEARCH_ETHICS: {
    label: "Research & GCP Bioethics",
    sanskrit: "Anusandhana & Scientific Methodology",
    icon: FlaskConical,
    color: "text-purple-400 bg-purple-950/40 border-purple-800/60",
  },
  COMMUNICATION: {
    label: "Patient Communication",
    sanskrit: "Rogi Sambhashana & Bedside Soft Skills",
    icon: HeartHandshake,
    color: "text-rose-400 bg-rose-950/40 border-rose-800/60",
  },
};

export function AssessmentHeader({
  currentIndex,
  totalQuestions,
  domain,
  sanskritTopic,
  isBookmarked,
  onToggleBookmark,
  onOpenQuestionDrawer,
  onExit,
  answeredCount,
  timeElapsedSeconds,
}: AssessmentHeaderProps) {
  const currentDomain = DOMAIN_METADATA[domain] || DOMAIN_METADATA.DIAGNOSTICS;
  const DomainIcon = currentDomain.icon;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Format timer
  const minutes = Math.floor(timeElapsedSeconds / 60);
  const seconds = timeElapsedSeconds % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0B1510]/85 backdrop-blur-xl shadow-lg transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-3">
          {/* Left: Exit + Assessment branding */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onExit}
              className="text-white/70 hover:text-white hover:bg-white/5 gap-1.5 px-2.5 h-9"
              title="Return to Student Dashboard (Progress is saved)"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline font-medium text-xs">Exit Diagnostic</span>
            </Button>

            <div className="hidden md:flex items-center gap-2 border-l border-white/10 pl-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-wider text-emerald-300 uppercase">
                Skill DNA Diagnostic
              </span>
            </div>
          </div>

          {/* Center: Domain & Category Pill */}
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium shadow-sm transition-colors",
                currentDomain.color
              )}
            >
              <DomainIcon className="w-3.5 h-3.5 shrink-0" />
              <div className="flex items-center gap-1.5">
                <span className="font-semibold">{currentDomain.label}</span>
                {sanskritTopic && (
                  <span className="hidden lg:inline text-white/50 border-l border-white/20 pl-1.5 font-serif italic text-[11px]">
                    {sanskritTopic}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Actions (Timer, Bookmark, Grid Drawer) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Timer */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/80">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{formattedTime}</span>
            </div>

            {/* Bookmark button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleBookmark}
              className={cn(
                "h-9 px-2.5 rounded-lg border transition-all text-xs gap-1.5",
                isBookmarked
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm"
                  : "bg-white/5 text-white/60 border-white/10 hover:text-white hover:bg-white/10"
              )}
              title={isBookmarked ? "Flagged for review" : "Flag this question for review"}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400/30" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">{isBookmarked ? "Flagged" : "Flag"}</span>
            </Button>

            {/* Question Map / Drawer Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenQuestionDrawer}
              className="h-9 px-3 gap-1.5 text-xs bg-white/5 border-emerald-700/50 hover:bg-emerald-950/40 text-emerald-200"
            >
              <LayoutGrid className="w-4 h-4 text-emerald-400" />
              <span className="font-medium">
                {answeredCount}/{totalQuestions}
              </span>
            </Button>
          </div>
        </div>

        {/* Dynamic Progress Bar Bar */}
        <div className="mt-3.5">
          <div className="flex items-center justify-between text-[11px] font-medium text-white/60 mb-1.5">
            <span className="text-emerald-400 font-semibold">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="font-mono text-white/70">
              {progressPercent}% Evaluated ({answeredCount} answered)
            </span>
          </div>
          <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/10 relative">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
