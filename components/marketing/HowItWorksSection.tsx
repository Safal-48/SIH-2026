"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Stethoscope,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Building,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/cards/Card";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { cn } from "@/lib/utils/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StepItem {
  number: string;
  title: string;
  headline: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  sampleMetric: string;
  metricLabel: string;
}

export function HowItWorksSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const lineRef = React.useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);

  const steps: StepItem[] = [
    {
      number: "01",
      title: "Assess",
      headline: "Personalized Skill Assessment",
      description:
        "Take AI-guided clinical vignettes, diagnostic pulse identification questions, and Samhita knowledge challenges benchmarked to NCISM criteria.",
      icon: <Stethoscope className="h-6 w-6 text-primary" />,
      tags: ["Clinical Diagnostics", "Nadi Pariksha", "Bloom Taxonomy"],
      sampleMetric: "120 Vignettes",
      metricLabel: "Adaptive Question Bank",
    },
    {
      number: "02",
      title: "Discover",
      headline: "Ayurveda Career DNA & Gap Report",
      description:
        "Understand your clinical inclinations, specialty strengths, and exact knowledge deltas across clinical practice, Panchakarma, R&D, and regulatory affairs.",
      icon: <Sparkles className="h-6 w-6 text-accent" />,
      tags: ["Affinity Modeling", "Gap Analysis", "Domain Readiness"],
      sampleMetric: "84% Affinity",
      metricLabel: "Panchakarma Clinical Lead",
    },
    {
      number: "03",
      title: "Learn",
      headline: "Guided Learning & Micro-Modules",
      description:
        "Bridge identified gaps with curated interactive modules, classical commentaries, virtual pharmacology simulations, and research paper reviews.",
      icon: <BookOpen className="h-6 w-6 text-secondary" />,
      tags: ["NCISM Certified", "HPTLC Simulations", "Self-Paced"],
      sampleMetric: "18 Modules",
      metricLabel: "Targeted Micro-Curricula",
    },
    {
      number: "04",
      title: "Build",
      headline: "Clinical Logbook & Competency Passport",
      description:
        "Document inpatient/outpatient cases and procedural safety hours. Supervised faculty endorse your achievements with cryptographic digital signatures.",
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      tags: ["Tamper-Evident", "QR Verification", "Supervisor Signed"],
      sampleMetric: "450+ Hours",
      metricLabel: "Verified Patient Logbook",
    },
    {
      number: "05",
      title: "Match",
      headline: "Smart Opportunity Matching",
      description:
        "Our matching engine pairs your verified competencies directly with clinical residencies, pharma traineeships, and research fellowships from AIIA, Dabur, and Kottakkal.",
      icon: <Building className="h-6 w-6 text-accent" />,
      tags: ["AIIA Verified", "Stipendiary", "Direct Institutional Apply"],
      sampleMetric: "92% Match",
      metricLabel: "Top Clinical Fit",
    },
    {
      number: "06",
      title: "Grow",
      headline: "Career Outcome & National Placement",
      description:
        "Transition seamlessly into accredited clinical fellowships, pharmaceutical R&D careers, Ayush public health administration, or your own Ayurvedic practice.",
      icon: <TrendingUp className="h-6 w-6 text-secondary" />,
      tags: ["Placement Track", "Accredited Residency", "Lifelong Passport"],
      sampleMetric: "₹9.6 - 14L",
      metricLabel: "Starting Package Potential",
    },
  ];

  React.useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate line progress as user scrolls through section
      if (lineRef.current) {
        gsap.to(lineRef.current, {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 85%",
            scrub: 0.5,
          },
        });
      }

      // Step cards trigger active step updates
      const stepCards = gsap.utils.toArray<HTMLElement>(".how-it-works-step");
      stepCards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 60%",
          end: "bottom 60%",
          onEnter: () => setActiveStepIndex(index),
          onEnterBack: () => setActiveStepIndex(index),
        });

        gsap.fromTo(
          card,
          { opacity: 0.35, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={containerRef} className="py-24 border-b border-border/60 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Cinematic Lifecycle"
          title="How Vaidya Setu Works"
          subtitle="From initial clinical self-assessment to verified supervisor endorsement and industry placement — an automated, transparent journey."
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Fixed Progress Tracker (Desktop) */}
          <div className="lg:col-span-4 sticky top-28 hidden lg:block space-y-4">
            <Card variant="default" className="p-6 border-border/80 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Workflow Navigation
                </span>
                <Badge variant="gold" size="sm">
                  Step {steps[activeStepIndex].number} of 06
                </Badge>
              </div>

              <h4 className="text-lg font-bold text-foreground">
                {steps[activeStepIndex].headline}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed mt-2 mb-6">
                {steps[activeStepIndex].description}
              </p>

              {/* Progress Milestones list */}
              <div className="space-y-2 pt-4 border-t border-border/60">
                {steps.map((step, idx) => {
                  const isActive = activeStepIndex === idx;
                  const isDone = activeStepIndex > idx;

                  return (
                    <div
                      key={step.number}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-lg text-xs font-semibold transition-colors",
                        isActive && "bg-primary/10 text-primary",
                        isDone && "text-muted-foreground line-through opacity-70",
                        !isActive && !isDone && "text-muted-foreground/60"
                      )}
                    >
                      <span
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                          isActive && "bg-primary text-white",
                          isDone && "bg-muted text-foreground",
                          !isActive && !isDone && "border border-border text-muted-foreground"
                        )}
                      >
                        {isDone ? "✓" : step.number}
                      </span>
                      <span>{step.title}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Right Column: Step Cards with Connecting Line */}
          <div className="lg:col-span-8 relative pl-6 sm:pl-10 space-y-12">
            {/* Background connecting track */}
            <div className="absolute left-2.5 sm:left-4 top-4 bottom-8 w-1 bg-muted rounded-full" />
            {/* Animated foreground progress line */}
            <div
              ref={lineRef}
              className="absolute left-2.5 sm:left-4 top-4 w-1 bg-gradient-to-b from-primary via-accent to-secondary rounded-full h-0 transition-all"
            />

            {steps.map((step, index) => (
              <div
                key={step.number}
                className="how-it-works-step relative group"
              >
                {/* Milestone Node on Line */}
                <div
                  className={cn(
                    "absolute -left-6 sm:-left-10 top-6 w-8 h-8 rounded-full border-4 border-background flex items-center justify-center text-xs font-bold transition-all shadow-md",
                    activeStepIndex === index
                      ? "bg-accent text-accent-foreground ring-4 ring-accent/30 scale-110"
                      : "bg-card text-muted-foreground border-border"
                  )}
                >
                  {step.number}
                </div>

                {/* Content Card */}
                <Card
                  variant="interactive"
                  className={cn(
                    "p-6 sm:p-8 transition-all border-border/80",
                    activeStepIndex === index && "border-accent/40 shadow-lg"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-background border border-border shadow-sm">
                        {step.icon}
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-accent block">
                          Phase {step.number}
                        </span>
                        <h4 className="text-xl sm:text-2xl font-bold text-foreground">
                          {step.headline}
                        </h4>
                      </div>
                    </div>

                    <div className="text-left sm:text-right bg-muted/40 p-3 rounded-xl border border-border/50 shrink-0">
                      <span className="text-base font-bold text-foreground block">
                        {step.sampleMetric}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        {step.metricLabel}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {step.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border/50">
                    <span className="text-xs font-semibold text-foreground/80 mr-1">
                      Key Highlights:
                    </span>
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-medium"
                      >
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
