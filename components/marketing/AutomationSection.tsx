"use client";

import * as React from "react";
import {
  BrainCircuit,
  ArrowDown,
  User,
  ClipboardCheck,
  Compass,
  Award,
  MapPin,
  BookOpen,
  Building,
  Microscope,
  Briefcase,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Card } from "@/components/cards/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { SkillFlowCanvas } from "./SkillFlowCanvas";

export function AutomationSection() {
  const inputNodes = [
    { label: "Student Profile", icon: <User className="h-4 w-4 text-primary" />, desc: "BAMS/MD Credentials" },
    { label: "Assessment Results", icon: <ClipboardCheck className="h-4 w-4 text-accent" />, desc: "120 Diagnostic Vignettes" },
    { label: "Career Interest", icon: <Compass className="h-4 w-4 text-secondary" />, desc: "Clinical, R&D, or Pharma" },
    { label: "Attested Skills", icon: <Award className="h-4 w-4 text-primary" />, desc: "Nadi & Panchakarma" },
    { label: "Target Location", icon: <MapPin className="h-4 w-4 text-accent" />, desc: "Delhi, Kerala, All-India" },
  ];

  const outputNodes = [
    {
      title: "Targeted Guided Learning",
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      desc: "Instant NCISM-aligned modules to bridge exact competency delta points.",
      metric: "18 Adaptive Modules",
    },
    {
      title: "Clinical Residency Placement",
      icon: <Building className="h-5 w-5 text-accent" />,
      desc: "Supervised tertiary Panchakarma residencies matching attested skills.",
      metric: "86%+ Fit Score",
    },
    {
      title: "Funded Research Fellowships",
      icon: <Microscope className="h-5 w-5 text-secondary" />,
      desc: "Translational research trials at AIIA, CCRAS, and university labs.",
      metric: "GCP-Ayush Certified",
    },
    {
      title: "Hospital & Pharma Careers",
      icon: <Briefcase className="h-5 w-5 text-primary" />,
      desc: "Direct employment offers verified by the student's Competency Passport.",
      metric: "Transparent Hiring",
    },
  ];

  return (
    <section id="automation" className="py-24 border-b border-border/60 bg-muted/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Smart Automation Engine"
          title="From Skill Gap to Opportunity — Automatically."
          subtitle="Our multi-parameter matching pipeline converts complex clinical evaluations and student aspirations into high-precision learning and career matches."
          align="center"
        />

        <div className="mt-16 space-y-8 max-w-5xl mx-auto">
          {/* Tier 1: Multimodal Candidate Inputs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Step 1: Multimodal Candidate Inputs
              </span>
              <Badge variant="outline" size="sm">5 Core Parameters</Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {inputNodes.map((inp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-border bg-card text-center space-y-1.5 shadow-sm hover:border-primary/40 transition-colors"
                >
                  <div className="w-8 h-8 mx-auto rounded-lg bg-muted flex items-center justify-center">
                    {inp.icon}
                  </div>
                  <h5 className="text-xs font-bold text-foreground">{inp.label}</h5>
                  <p className="text-[11px] text-muted-foreground">{inp.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Animated Connecting Flow: SkillFlowCanvas */}
          <div className="py-2">
            <SkillFlowCanvas />
          </div>

          {/* Tier 2: Smart Matching Engine Core */}
          <RevealOnScroll direction="up">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/15 to-secondary/10 border-2 border-primary/30 shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
                    <BrainCircuit className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <h4 className="text-xl font-bold text-foreground">
                        Vaidya Setu Smart Automation Engine
                      </h4>
                      <Badge variant="gold" size="sm">Ayush Core</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Runs real-time weighted vector scoring across clinical competencies, geographical mobility, and industry skill demand.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-background font-mono font-bold text-primary border border-border">
                    Gap Analysis: Active
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-background font-mono font-bold text-accent border border-border">
                    Matching: 0.14s
                  </span>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Animated Connecting Flow Arrow */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-1 text-accent">
              <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center animate-bounce">
                <ArrowDown className="h-4 w-4 text-accent" />
              </div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                Automated Outcomes
              </span>
            </div>
          </div>

          {/* Tier 3: Quadruple Output Recommendations */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Step 3: Personalized Opportunity & Learning Output
              </span>
              <Badge variant="verified" size="sm">Synchronized Output</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {outputNodes.map((out, idx) => (
                <Card
                  key={idx}
                  variant="interactive"
                  className="p-5 flex flex-col justify-between border-border/80"
                >
                  <div>
                    <div className="p-2.5 w-fit rounded-xl bg-background border border-border mb-3 shadow-sm">
                      {out.icon}
                    </div>
                    <h5 className="text-sm font-bold text-foreground mb-1">
                      {out.title}
                    </h5>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      {out.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/50 flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Benchmark:</span>
                    <span className="font-semibold text-primary">{out.metric}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA to Full Smart Automation Console */}
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-card border border-primary/20 text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" /> Step 17 Architecture Story Live
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-foreground">
              Experience the Complete 10-Stage Automation Engine
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
              Inspect all 6 AI engines (Skill Gap, Career DNA, Learning, Matching, Shortlisting, Demand) and simulate raw assessment data transforming into verified residency placements.
            </p>
            <div className="pt-2">
              <a href="/automation" className="inline-block">
                <Button variant="primary" size="md" className="font-bold text-xs shadow-md shadow-primary/20">
                  Launch Smart Automation Console →
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
