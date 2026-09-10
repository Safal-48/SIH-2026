"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, TrendingUp, Award, Clock } from "lucide-react";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";

interface CareerReadinessWidgetProps {
  scholarName?: string;
  degree?: string;
  academicYear?: string;
  institution?: string;
  primaryCareer?: string;
  readinessScore?: number;
  readinessLabel?: string;
}

export function CareerReadinessWidget({
  scholarName = "Aarav Sharma",
  degree = "BAMS",
  academicYear = "Final Year",
  institution = "All India Institute of Ayurveda, New Delhi",
  primaryCareer = "Clinical Practice",
  readinessScore = 72,
  readinessLabel = "Developing",
}: CareerReadinessWidgetProps) {
  return (
    <Card
      variant="default"
      className="p-6 sm:p-7 relative overflow-hidden bg-gradient-to-r from-card via-card to-primary/5 border-border shadow-md"
    >
      {/* Decorative subtle background aura */}
      <div className="absolute right-0 top-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Scholar Greeting & Academic Context */}
        <div className="space-y-3 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="gold" size="sm">
              Ayurveda Scholar
            </Badge>
            <Badge variant="verified" size="sm" icon={<ShieldCheck className="h-3 w-3" />}>
              AIIA Verified
            </Badge>
            <span className="text-xs text-accent font-semibold font-serif italic">
              ★ Focus: {primaryCareer}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-sans">
              Welcome back, {scholarName}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {degree} Scholar • {academicYear} • {institution}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />
              <span><strong>450 hrs</strong> Supervised Inpatient/OPD</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-secondary" />
              <span><strong>7 Verified</strong> Competencies Attested</span>
            </div>
          </div>
        </div>

        {/* Right: Circular Progress Ring & Readiness Score */}
        <div className="flex items-center gap-5 p-4 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/80 shadow-sm shrink-0">
          <div className="relative">
            <ProgressRing
              value={readinessScore}
              size={105}
              strokeWidth={8}
            />
            {/* Center percentage label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-extrabold text-foreground font-sans tracking-tight">
                {readinessScore}%
              </span>
              <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">
                Score
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold block">
              Career Readiness
            </span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-accent-foreground text-xs font-bold">
              <Sparkles className="h-3 w-3 text-accent" />
              <span>{readinessLabel}</span>
            </div>
            <p className="text-[11px] text-muted-foreground max-w-[160px] leading-snug">
              NCISM Benchmark: Level 3 of 5. Complete pending case logbooks to reach 85%.
            </p>
            <div className="flex flex-col gap-1 pt-1">
              <Link
                href="/student/roadmap"
                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
              >
                <span>View Career Roadmap</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/student/assessment-prep"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent hover:underline"
              >
                <span>Boost Readiness Score</span>
                <ArrowRight className="h-2.5 w-2.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
