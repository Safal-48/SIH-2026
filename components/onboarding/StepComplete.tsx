"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Target,
  Clock,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/cards/Card";
import { StudentOnboardingData } from "@/types/entities";
import { CAREER_GOAL_OPTIONS } from "@/lib/services/studentOnboarding";

interface StepCompleteProps {
  data: StudentOnboardingData;
  studentName?: string;
  studentEmail?: string;
  onStartAssessment: () => void;
}

export function StepComplete({
  data,
  studentName = "Aarav Sharma",
  studentEmail = "student@aiia.gov.in",
  onStartAssessment,
}: StepCompleteProps) {
  const primaryCareer = CAREER_GOAL_OPTIONS.find(
    (c) => c.id === data.primaryCareerGoal
  ) || CAREER_GOAL_OPTIONS[0];

  return (
    <div className="space-y-8 animate-fade-in text-center max-w-2xl mx-auto">
      {/* Celebration Icon */}
      <div className="relative inline-flex items-center justify-center">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary via-herbal-700 to-accent text-white flex items-center justify-center shadow-xl shadow-accent/20 animate-pulse-glow">
          <Sparkles className="h-10 w-10 text-accent" />
        </div>
      </div>

      {/* Main Announcement */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <CheckCircle2 className="h-3.5 w-3.5" /> Stage 05: Profile Calibration Complete
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-sans">
          Your Ayurveda career profile is ready.
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Our Smart Automation engine has mapped your initial <strong>Ayurveda Career DNA</strong> baseline. You are now prepared to launch the diagnostic skill assessment.
        </p>
      </div>

      {/* Calibrated Profile Preview Card */}
      <Card variant="elevated" className="p-6 text-left space-y-5 border-border shadow-xl">
        {/* Scholar Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-herbal-900 text-white font-serif text-xl font-bold flex items-center justify-center shadow-md">
              🎓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-foreground">{studentName}</h3>
                <Badge variant="verified" size="sm" icon={<ShieldCheck className="h-3 w-3" />}>
                  AIIA Baseline
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{studentEmail}</p>
            </div>
          </div>
          <Badge variant="gold" className="self-start sm:self-auto">
            {data.degree} • {data.currentYear}
          </Badge>
        </div>

        {/* 4 Quadrants Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Institution */}
          <div className="p-3 rounded-xl bg-card border border-border/60 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1">
              <GraduationCap className="h-3.5 w-3.5 text-primary" /> Institution & Branch
            </span>
            <p className="font-bold text-foreground truncate">{data.college}</p>
            <p className="text-[11px] text-muted-foreground">
              {data.specialization || "Classical Ayurveda Curriculum"}
            </p>
          </div>

          {/* Primary Trajectory */}
          <div className="p-3 rounded-xl bg-card border border-accent/40 space-y-1 ring-1 ring-accent/20">
            <span className="text-[10px] uppercase tracking-wider text-accent font-semibold flex items-center gap-1">
              <Target className="h-3.5 w-3.5" /> Primary Career Track
            </span>
            <p className="font-bold text-foreground flex items-center gap-1.5">
              <span>{primaryCareer.icon}</span> {primaryCareer.title}
            </p>
            <p className="text-[11px] text-accent font-serif italic">
              {primaryCareer.sanskrit} • {primaryCareer.demandRate}
            </p>
          </div>

          {/* Clinical Exposure */}
          <div className="p-3 rounded-xl bg-card border border-border/60 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1">
              <Briefcase className="h-3.5 w-3.5 text-secondary" /> Prior Exposures
            </span>
            <p className="font-bold text-foreground">
              {data.previousExposures.length > 0
                ? `${data.previousExposures.length} Practical Domains Logged`
                : "Fresher Pathway Configured"}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              {data.previousExposures.slice(0, 3).join(", ") || "Foundational Theory"}
            </p>
          </div>

          {/* Availability & Languages */}
          <div className="p-3 rounded-xl bg-card border border-border/60 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-primary" /> Posting Mobility
            </span>
            <p className="font-bold text-foreground">{data.preferredCity || "National"}</p>
            <p className="text-[11px] text-muted-foreground">
              {data.availability} • {data.languages.join(", ")}
            </p>
          </div>
        </div>

        {/* Readiness Prompt */}
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-xs text-foreground flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-accent shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Next Milestone: Personalized Diagnostic Assessment</p>
            <p className="text-muted-foreground mt-0.5 leading-relaxed">
              We have customized 120 NCISM diagnostic vignettes calibrated to your {data.degree} standing and ambition in {primaryCareer.title}.
            </p>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          variant="gold"
          size="lg"
          onClick={onStartAssessment}
          rightIcon={<ArrowRight className="h-4 w-4" />}
          className="w-full sm:w-auto shadow-lg shadow-accent/25 px-8"
        >
          Start Skill Assessment
        </Button>

        <Link href="/student" className="w-full sm:w-auto">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Go to Scholar Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
