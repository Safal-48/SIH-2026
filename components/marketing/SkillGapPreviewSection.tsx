"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  BookOpen,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Card } from "@/components/cards/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { cn } from "@/lib/utils/cn";

export function SkillGapPreviewSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const careerFits = [
    { label: "Clinical Practice (Super-Specialty)", value: 84, color: "from-primary to-herbal-500" },
    { label: "Integrative Clinical Research", value: 71, color: "from-accent to-saffron-600" },
    { label: "Panchakarma & Wellness Lead", value: 68, color: "from-primary to-accent" },
    { label: "Herbal Pharma & Formulation R&D", value: 62, color: "from-secondary to-earth-600" },
  ];

  const strengths = [
    { name: "Nadi Pariksha (Radial Pulse Palpation)", score: 92, verified: true },
    { name: "Panchakarma Protocol Supervision", score: 88, verified: true },
    { name: "Samhita Differential Roganidana", score: 85, verified: false },
  ];

  const criticalGaps = [
    {
      skill: "HPTLC Fingerprinting & Phytochemistry",
      current: 52,
      target: 78,
      delta: -26,
      urgency: "HIGH",
    },
    {
      skill: "GCP-Ayush Clinical Trial Documentation",
      current: 60,
      target: 80,
      delta: -20,
      urgency: "HIGH",
    },
    {
      skill: "NABH Hospital Accreditation Compliance",
      current: 68,
      target: 80,
      delta: -12,
      urgency: "MEDIUM",
    },
  ];

  const nextActions = [
    {
      title: "Complete Module: HPTLC Spectral Analysis in Dravyaguna",
      duration: "4.5 hrs",
      type: "Virtual Simulation",
      impact: "+14 pts in Herbal Pharma",
    },
    {
      title: "Document 5 Supervised Basti Procedures in OPD Logbook",
      duration: "6.0 hrs",
      type: "Clinical Practice",
      impact: "+8 pts in Panchakarma Director",
    },
    {
      title: "Submit AYUSH-GCP Ethics Case Vignette for Faculty Review",
      duration: "2.0 hrs",
      type: "Assessment",
      impact: "+12 pts in Research Track",
    },
  ];

  return (
    <section id="skill-gap" className="py-24 border-b border-border/60 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Product Intelligence Preview"
          title="Ayurveda Career DNA & Skill Gap Report"
          subtitle="Real-time automated analytics benchmarked against NCISM guidelines. Pinpoint exact competency deltas and targeted corrective actions."
          align="center"
        />

        {/* Realistic Dashboard Mockup Window */}
        <div
          ref={containerRef}
          className="mt-12 rounded-2xl border border-border/80 bg-card shadow-2xl overflow-hidden max-w-5xl mx-auto"
        >
          {/* Top Window Bar */}
          <div className="bg-muted/80 px-4 py-3 border-b border-border flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-muted-foreground text-[11px] hidden sm:inline">
                vaidyasetu.ayush.gov.in/student/career-dna
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="verified" size="sm" icon={<ShieldCheck className="h-3 w-3" />}>
                NCISM Verified Scholar
              </Badge>
            </div>
          </div>

          {/* Dashboard Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Candidate Summary Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-herbal-800 text-white font-bold flex items-center justify-center text-base shadow-sm">
                  AS
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground">
                    Aarav Sharma <span className="text-xs font-normal text-muted-foreground font-mono">(AIIA/BAMS/2023)</span>
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    BAMS Scholar • All India Institute of Ayurveda, New Delhi
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-muted-foreground uppercase font-semibold">Overall Readiness</span>
                  <p className="text-2xl font-extrabold text-foreground">84%</p>
                </div>
                <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <BrainCircuit className="h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Grid Content: Career Fit & Gaps */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Career Fit Bars & Strengths (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      <TrendingUp className="h-4 w-4 text-accent" />
                      Predicted Career Pathway Fit
                    </h5>
                    <span className="text-xs text-muted-foreground">Based on 120 Vignettes</span>
                  </div>

                  {/* Animated Fit Gauges */}
                  <div className="space-y-3.5">
                    {careerFits.map((fit, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-foreground/90">{fit.label}</span>
                          <span className="font-bold text-foreground">{fit.value}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: isInView ? `${fit.value}%` : 0 }}
                            transition={{ duration: 1, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
                            className={cn("h-full rounded-full bg-gradient-to-r", fit.color)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Validated Strengths */}
                <div className="pt-4 border-t border-border/60">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Validated Competency Strengths
                  </h5>
                  <div className="space-y-2">
                    {strengths.map((str, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border/50 text-xs"
                      >
                        <span className="flex items-center gap-2 font-medium text-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          {str.name}
                        </span>
                        <Badge variant="verified" size="sm">
                          {str.score}% Mastery
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Missing Skills & Next 3 Actions (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Critical Gaps */}
                <div>
                  <h5 className="text-sm font-bold text-foreground flex items-center gap-1.5 mb-3">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Identified Knowledge Gaps
                  </h5>
                  <div className="space-y-2.5">
                    {criticalGaps.map((gap, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1"
                      >
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-foreground">{gap.skill}</span>
                          <span className="text-amber-600 font-bold">{gap.delta} pts</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-muted-foreground">
                          <span>Current: {gap.current}%</span>
                          <span>Target: {gap.target}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next 3 Actions */}
                <div className="pt-2">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-accent" />
                    Automated Next 3 Actions
                  </h5>
                  <div className="space-y-2">
                    {nextActions.map((action, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-background border border-border space-y-1.5 text-xs shadow-sm hover:border-primary/40 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-foreground leading-snug">
                            {action.title}
                          </p>
                          <span className="text-[10px] font-mono text-accent bg-accent/10 px-1.5 py-0.5 rounded shrink-0">
                            {action.impact}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {action.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3 text-primary" />
                            {action.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
