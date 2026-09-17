"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Stethoscope,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Building2,
  TrendingUp,
  CheckCircle2,
  Compass,
  FileText,
  UserCheck,
  Settings,
  Link2,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Sacred Lotus Blossom Icon matching 1st mockup
const SacredLotusIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3c-1.5 3-4 6-8 8 3 1.5 6 1.5 8-1 2 2.5 5 2.5 8 1-4-2-6.5-5-8-8z" />
    <path d="M12 10c-1.5 2.5-3.5 5-6 6 2.5 1 5 1 6-0.5 1 1.5 3.5 1.5 6 0.5-2.5-1-4.5-3.5-6-6z" />
    <path d="M12 15.5c-1 1.5-2 3-4 3.5 1.5 0.5 3 0.5 4 0 1 0.5 2.5 0.5 4 0-2-0.5-3-2-4-3.5z" />
  </svg>
);

interface StepItem {
  number: string;
  title: string;
  headline: string;
  description: string;
  phaseIcon: React.ReactNode;
  badgeIcon: React.ReactNode;
  navIcon: React.ReactNode;
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
      phaseIcon: <Stethoscope className="h-6 w-6 text-emerald-300" />,
      badgeIcon: <FileText className="h-6 w-6 text-emerald-300" />,
      navIcon: <UserCheck className="h-4 w-4" />,
      tags: ["Clinical Diagnostics", "Nadi Pariksha", "Bloom Taxonomy"],
      sampleMetric: "120 Vignettes",
      metricLabel: "SCIENTIFICALLY CURATED",
    },
    {
      number: "02",
      title: "Discover",
      headline: "Ayurveda Career DNA & Gap Report",
      description:
        "Understand your clinical inclinations, specialty strengths, and exact knowledge deficits across clinical practice, Panchakarma, R&D, and regulatory affairs.",
      phaseIcon: <SacredLotusIcon className="h-6 w-6 text-amber-400" />,
      badgeIcon: <SacredLotusIcon className="h-6 w-6 text-amber-400" />,
      navIcon: <BookOpen className="h-4 w-4" />,
      tags: ["Affinity Modelling", "Gap Analysis", "Domain Readiness"],
      sampleMetric: "84% Affinity",
      metricLabel: "PERSONALIZED • CLINICAL • LEAD",
    },
    {
      number: "03",
      title: "Learn",
      headline: "Guided Learning & Micro-Modules",
      description:
        "Bridge identified gaps with curated interactive modules, classical commentaries, virtual pharmacology simulations, and research paper reviews.",
      phaseIcon: <GraduationCap className="h-6 w-6 text-emerald-300" />,
      badgeIcon: <BookOpen className="h-6 w-6 text-emerald-300" />,
      navIcon: <GraduationCap className="h-4 w-4" />,
      tags: ["NCISM Certified", "HPTLC Simulations", "Self-Paced"],
      sampleMetric: "18 Modules",
      metricLabel: "TARGETED MICRO-CURRICULA",
    },
    {
      number: "04",
      title: "Build",
      headline: "Clinical Logbook & Competency Passport",
      description:
        "Document inpatient/outpatient cases and procedural safety hours. Supervised faculty endorse your achievements with cryptographic digital signatures.",
      phaseIcon: <ShieldCheck className="h-6 w-6 text-emerald-300" />,
      badgeIcon: <ShieldCheck className="h-6 w-6 text-emerald-300" />,
      navIcon: <Settings className="h-4 w-4" />,
      tags: ["Tamper-Evident", "QR Verification", "Supervisor Signed"],
      sampleMetric: "450+ Hours",
      metricLabel: "VERIFIED PATIENT LOGBOOK",
    },
    {
      number: "05",
      title: "Match",
      headline: "Smart Opportunity Matching",
      description:
        "Our matching engine pairs your verified competencies directly with clinical residencies, pharma traineeships, and research fellowships from AIIA, Dabur, and Kottakkal.",
      phaseIcon: <Building2 className="h-6 w-6 text-amber-400" />,
      badgeIcon: <Building2 className="h-6 w-6 text-amber-400" />,
      navIcon: <Link2 className="h-4 w-4" />,
      tags: ["AIIA Verified", "Stipendiary", "Direct Institutional Apply"],
      sampleMetric: "92% Match",
      metricLabel: "TOP CLINICAL FIT",
    },
    {
      number: "06",
      title: "Grow",
      headline: "Career Outcome & National Placement",
      description:
        "Transition seamlessly into accredited clinical fellowships, pharmaceutical R&D careers, Ayush public health administration, or your own Ayurvedic practice.",
      phaseIcon: <TrendingUp className="h-6 w-6 text-emerald-300" />,
      badgeIcon: <TrendingUp className="h-6 w-6 text-emerald-300" />,
      navIcon: <TrendingUp className="h-4 w-4" />,
      tags: ["Placement Track", "Accredited Residency", "Lifelong Passport"],
      sampleMetric: "₹9.6 - 14L",
      metricLabel: "STARTING PACKAGE POTENTIAL",
    },
  ];

  React.useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    let ctx: gsap.Context | null = null;
    try {
      ctx = gsap.context(() => {
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
            { opacity: 0.4, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              scrollTrigger: {
                trigger: card,
                start: "top 75%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });
      }, containerRef);
    } catch (err) {
      console.warn("HowItWorksSection GSAP fallback:", err);
    }

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="py-24 border-b border-border/40 bg-transparent relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Dignified Editorial Heading matching 1st picture */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
            How Ayu-Setu Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-300/85 leading-relaxed font-normal">
            From initial clinical self-assessment to verified supervisor endorsement and industry placement — an automated, transparent journey.
          </p>
        </div>

        {/* 2. Main Content Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Fixed Progress Tracker (Desktop) matching 1st picture */}
          <div className="lg:col-span-4 sticky top-28 hidden lg:block space-y-4">
            <div className="rounded-2xl bg-[#041d13]/90 backdrop-blur-xl border border-emerald-500/25 p-6 sm:p-7 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Workflow Navigation
                  </span>
                </div>
                <div className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/60 text-xs font-semibold text-emerald-200">
                  Step {activeStepIndex + 1} of {steps.length}
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-4 mb-2">
                {steps[activeStepIndex].headline}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300/80 leading-relaxed mb-6 font-normal">
                {steps[activeStepIndex].description}
              </p>

              {/* Progress Milestones list matching 1st picture */}
              <div className="space-y-2 pt-5 border-t border-emerald-500/15">
                {steps.map((step, idx) => {
                  const isActive = activeStepIndex === idx;

                  return (
                    <button
                      key={step.number}
                      type="button"
                      onClick={() => {
                        setActiveStepIndex(idx);
                        const el = document.getElementById(`how-it-works-step-${step.number}`);
                        el?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className={cn(
                        "w-full flex items-center justify-between p-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left group",
                        isActive
                          ? "bg-emerald-800/40 border border-emerald-500/40 text-white shadow-sm"
                          : "text-gray-300 hover:text-white hover:bg-emerald-950/40"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center transition-colors",
                            isActive ? "text-emerald-300" : "text-gray-400 group-hover:text-emerald-300"
                          )}
                        >
                          {step.navIcon}
                        </div>
                        <span className="tracking-wide">{step.title}</span>
                      </div>
                      {isActive && <ChevronRight className="h-4 w-4 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Step Cards with Connecting Timeline */}
          <div className="lg:col-span-8 relative pl-6 sm:pl-12 space-y-10">
            {/* Background connecting track */}
            <div className="absolute left-2.5 sm:left-5 top-8 bottom-12 w-[2px] bg-emerald-950/80 rounded-full" />
            {/* Animated foreground progress line */}
            <div
              ref={lineRef}
              className="absolute left-2.5 sm:left-5 top-8 w-[2px] bg-gradient-to-b from-amber-400 via-emerald-400 to-amber-500 rounded-full h-0 transition-all shadow-[0_0_8px_rgba(245,158,11,0.5)]"
            />

            {steps.map((step, index) => (
              <div
                id={`how-it-works-step-${step.number}`}
                key={step.number}
                className="how-it-works-step relative group"
              >
                {/* Milestone Node on Line matching 1st picture */}
                <div
                  className={cn(
                    "absolute -left-6 sm:-left-12 top-7 w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all shadow-md z-10",
                    activeStepIndex === index
                      ? "border-amber-400 bg-[#041a11] text-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.5)] scale-110 ring-4 ring-amber-500/20"
                      : "border-emerald-500/50 bg-[#041a11] text-emerald-300"
                  )}
                >
                  {step.number}
                </div>

                {/* Card Container matching 1st picture */}
                <div
                  className={cn(
                    "p-6 sm:p-8 rounded-2xl bg-[#041d13]/90 backdrop-blur-xl border transition-all duration-300 shadow-2xl text-left",
                    activeStepIndex === index
                      ? "border-emerald-500/50 shadow-[0_10px_35px_rgba(4,30,20,0.8)] ring-1 ring-emerald-500/20"
                      : "border-emerald-500/20 hover:border-emerald-500/35"
                  )}
                >
                  {/* Top Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                    {/* Left: Phase Icon + Tag + Headline */}
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-emerald-500/40 bg-emerald-950/70 flex items-center justify-center shrink-0 shadow-inner">
                        {step.phaseIcon}
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400 block mb-0.5">
                          Phase {step.number}
                        </span>
                        <h4 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                          {step.headline}
                        </h4>
                      </div>
                    </div>

                    {/* Right: Metric Badge matching 1st picture */}
                    <div className="rounded-xl bg-[#02140d]/90 border border-emerald-500/30 p-3 px-4 flex items-center gap-3.5 shrink-0 self-start sm:self-auto shadow-sm">
                      <div className="text-emerald-300 shrink-0">
                        {step.badgeIcon}
                      </div>
                      <div className="text-left">
                        <span className="text-base sm:text-lg font-extrabold text-white block leading-tight">
                          {step.sampleMetric}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-300/80 uppercase tracking-wider block mt-0.5">
                          {step.metricLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-300/85 leading-relaxed my-5 font-normal">
                    {step.description}
                  </p>

                  {/* Highlights Row with Pill Checkmarks matching 1st picture */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-emerald-500/15">
                    <span className="text-xs sm:text-[13px] font-semibold text-gray-300 mr-1.5">
                      Key Highlights:
                    </span>
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#06291a] border border-emerald-500/30 text-xs font-medium text-emerald-200 shadow-xs"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
