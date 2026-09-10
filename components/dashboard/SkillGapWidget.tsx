"use client";

import * as React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Sparkles,
  BookOpen,
  FileCheck,
} from "lucide-react";
import { Card } from "@/components/cards/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface SkillGapStrength {
  name: string;
  sanskrit?: string;
  score: string;
  level?: string;
}

interface SkillGapImprovement {
  name: string;
  sanskrit?: string;
  score?: string;
  gap?: string;
  priority?: string;
}

interface SkillGapWidgetProps {
  onActionClick?: (actionId: string) => void;
  customStrengths?: SkillGapStrength[];
  customImprovements?: SkillGapImprovement[];
}

export function SkillGapWidget({
  onActionClick,
  customStrengths,
  customImprovements,
}: SkillGapWidgetProps) {
  const defaultStrengths: SkillGapStrength[] = [
    {
      name: "Patient Communication",
      sanskrit: "Rogi Sambhashana",
      score: "92%",
      level: "Proficient",
    },
    {
      name: "Ayurveda Fundamentals",
      sanskrit: "Maulika Siddhanta",
      score: "88%",
      level: "Advanced",
    },
  ];

  const defaultImprovements: SkillGapImprovement[] = [
    {
      name: "Clinical Documentation",
      sanskrit: "Rugna Vrittanta",
      score: "45%",
      gap: "-35 pts",
      priority: "Critical",
    },
    {
      name: "Research Documentation",
      sanskrit: "Anusandhana Vidhi",
      score: "52%",
      gap: "-28 pts",
      priority: "Moderate",
    },
  ];

  const strengths = customStrengths && customStrengths.length > 0 ? customStrengths : defaultStrengths;
  const improvements = customImprovements && customImprovements.length > 0 ? customImprovements : defaultImprovements;

  const nextThreeActions = [
    {
      step: "01",
      id: "act-1",
      title: "Complete Case Documentation",
      gain: "+18 pts Readiness",
      time: "25 mins",
      link: "/student/career-dna#action-1",
      cta: "Start Charting",
    },
    {
      step: "02",
      id: "act-2",
      title: "Practice Case Scenario",
      gain: "+15 pts Readiness",
      time: "30 mins",
      link: "/student/career-dna#action-2",
      cta: "Launch Simulation",
    },
    {
      step: "03",
      id: "act-3",
      title: "Apply for matched internship",
      gain: "Direct Placement",
      time: "Instant",
      link: "/student#opportunities",
      cta: "Explore Opp's",
    },
  ];

  return (
    <Card id="skill-gap" variant="default" className="p-6 space-y-5 border-border shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
            <TrendingDown className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground tracking-tight">
              Skill Gap & Bridging Actions
            </h3>
            <p className="text-xs text-muted-foreground">
              Critical, Moderate, and Strong competency triage
            </p>
          </div>
        </div>

        <Link
          href="/student/career-dna"
          className="text-xs font-semibold text-accent hover:underline flex items-center gap-1 shrink-0"
        >
          <span>Deep Dive</span>
          <span>→</span>
        </Link>
      </div>

      {/* 3-Tier Classification Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* Critical Gap */}
        <div className="p-3.5 rounded-2xl bg-rose-500/5 border border-rose-500/25 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-rose-500 flex items-center gap-1">
              <AlertTriangle className="h-3.5 w-3.5" /> Critical
            </span>
            <span className="text-[10px] font-mono text-rose-400 font-bold">-35 pts</span>
          </div>
          <div>
            <p className="font-bold text-foreground">Clinical Documentation</p>
            <p className="text-[10px] text-muted-foreground font-serif italic">Rugna Vrittanta</p>
          </div>
          <p className="text-[11px] text-muted-foreground leading-tight">
            Urgent deficit in inpatient SOAP charting & electronic logbook entries.
          </p>
        </div>

        {/* Moderate Gap */}
        <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/25 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-500 flex items-center gap-1">
              <AlertTriangle className="h-3.5 w-3.5" /> Moderate
            </span>
            <span className="text-[10px] font-mono text-amber-400 font-bold">-28 pts</span>
          </div>
          <div>
            <p className="font-bold text-foreground">Research Documentation</p>
            <p className="text-[10px] text-muted-foreground font-serif italic">Anusandhana Vidhi</p>
          </div>
          <p className="text-[11px] text-muted-foreground leading-tight">
            Recommended focus on CCRAS protocol drafting and GCP ethical forms.
          </p>
        </div>

        {/* Strong Competency */}
        <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/25 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-500 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> Strong
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">92%</span>
          </div>
          <div>
            <p className="font-bold text-foreground">Patient Communication</p>
            <p className="text-[10px] text-muted-foreground font-serif italic">Rogi Sambhashana</p>
          </div>
          <p className="text-[11px] text-muted-foreground leading-tight">
            Validated core strength in bedside manner, empathy, and diagnosis explanation.
          </p>
        </div>
      </div>

      {/* Next 3 Actions */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Next 3 Actions to Bridge Gaps:
          </span>
          <span className="text-[11px] font-mono text-accent">Personalized Pathway</span>
        </div>

        <div className="space-y-2">
          {nextThreeActions.map((act) => (
            <div
              key={act.id}
              className="p-3.5 rounded-xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-accent/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-accent/15 text-accent border border-accent/30 flex items-center justify-center font-mono font-extrabold text-xs shrink-0">
                  {act.step}
                </div>
                <div>
                  <p className="font-bold text-foreground">{act.title}</p>
                  <p className="text-[11px] text-muted-foreground">
                    Estimated: {act.time} • Impact: <strong className="text-accent">{act.gain}</strong>
                  </p>
                </div>
              </div>

              <Link href={act.link} className="shrink-0 self-end sm:self-auto">
                <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-3 w-3" />}>
                  {act.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
