"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ClipboardCheck,
  Dna,
  BookOpen,
  Award,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StoryChapter {
  id: number;
  stageNum: string;
  tag: string;
  sanskrit: string;
  headline: string;
  narrative: string;
  deliverable: string;
  icon: React.ReactNode;
  accentColor: string;
  visualData: {
    title: string;
    metricLabel: string;
    metricValue: string;
    subtext: string;
    badges: string[];
  };
}

const CHAPTERS: StoryChapter[] = [
  {
    id: 1,
    stageNum: "01",
    tag: "Clinical Evaluation",
    sanskrit: "कौशल मूल्यांकन",
    headline: "Diagnostic Vignettes & Pulse Palpation",
    narrative:
      "Dr. Aarav Sharma completes 120 NCISM-benchmarked clinical vignettes, diagnosing metabolic imbalances and interpreting classical Samhita sutras under clinical time limits.",
    deliverable: "Diagnostic Proficiency Score: 84.5%",
    icon: <ClipboardCheck className="h-6 w-6 text-emerald-300" />,
    accentColor: "#34D399",
    visualData: {
      title: "Diagnostic Radar Assessment",
      metricLabel: "Benchmark Score",
      metricValue: "84.5%",
      subtext: "Samhita Interpretation: 91% • Nadi Pariksha: 78%",
      badges: ["NCISM Bloom Level 4", "Adaptive Vignettes", "Case-Based"],
    },
  },
  {
    id: 2,
    stageNum: "02",
    tag: "Affinity Mapping",
    sanskrit: "करियर प्रकृति विश्लेषण",
    headline: "Discovering Ayurveda Career DNA",
    narrative:
      "The engine correlates Aarav's clinical assessment with his Dosha Prakriti and personality attributes, identifying a 92% affinity for Panchakarma Clinical Practice and 78% for Phytomedicine R&D.",
    deliverable: "Primary DNA: Panchakarma Clinical Specialist",
    icon: <Dna className="h-6 w-6 text-amber-400" />,
    accentColor: "#F59E0B",
    visualData: {
      title: "Career DNA Vector Spectrum",
      metricLabel: "Top Specialty Fit",
      metricValue: "92% Fit",
      subtext: "Dominant Prakriti: Pitta-Kapha • High Procedural Precision",
      badges: ["Panchakarma (92%)", "Pharma R&D (78%)", "Public Health (64%)"],
    },
  },
  {
    id: 3,
    stageNum: "03",
    tag: "Targeted Remediation",
    sanskrit: "कौशल अंतर एवं अध्ययन",
    headline: "Bridging the Skill Gap via Micro-Modules",
    narrative:
      "Ayu-Setu detects a -18% deficit in Research Documentation. The Learning Engine immediately assigns NCISM-accredited GCP-Ayush modules and an institutional research workshop.",
    deliverable: "GCP-Ayush Micro-Credential Attained",
    icon: <BookOpen className="h-6 w-6 text-emerald-300" />,
    accentColor: "#10B981",
    visualData: {
      title: "Automated Competency Remediation",
      metricLabel: "Deficit Bridged",
      metricValue: "+24% Lift",
      subtext: "Research Documentation raised from 46% to 70%",
      badges: ["GCP-Ayush Certified", "HPTLC Sim Completed", "Dean Attested"],
    },
  },
  {
    id: 4,
    stageNum: "04",
    tag: "Verification",
    sanskrit: "कौशल पारपत्र",
    headline: "Cryptographic Competency Passport",
    narrative:
      "Every attested inpatient round, pulse palpation log, and procedural milestone is sealed cryptographically by Dr. Sharma's supervising faculty and NCISM institutional nodes.",
    deliverable: "Ayush Grid Tamper-Evident Passport ID #AY-2026-8812",
    icon: <Award className="h-6 w-6 text-emerald-300" />,
    accentColor: "#059669",
    visualData: {
      title: "Verified Competency Passport",
      metricLabel: "Attested Hours",
      metricValue: "480+ Hrs",
      subtext: "28 Verified Inpatient Cases • 6 Supervised Nadi Logs",
      badges: ["AIIA Faculty Signed", "QR Verifiable", "Ayush Grid Synced"],
    },
  },
  {
    id: 5,
    stageNum: "05",
    tag: "Career Placement",
    sanskrit: "व्यावसायिक सफलता",
    headline: "Direct Institutional Match & Residency Offer",
    narrative:
      "The Opportunity Engine matches Aarav's verified passport directly with All India Institute of Ayurveda (AIIA). Recruiter pre-screening is bypassed with a 94.8% fit score.",
    deliverable: "Clinical Fellow Appointment at AIIA New Delhi",
    icon: <TrendingUp className="h-6 w-6 text-amber-400" />,
    accentColor: "#F59E0B",
    visualData: {
      title: "Automated Residency Match",
      metricLabel: "Recruiter Match",
      metricValue: "94.8%",
      subtext: "AIIA New Delhi • Metabolic Inpatient Department",
      badges: ["Direct Offer", "Stipend: ₹35,000/mo", "Zero Resume Screening"],
    },
  },
];

export function PinnedJourneyStorytelling() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const pinTargetRef = React.useRef<HTMLDivElement>(null);
  const [activeChapterIndex, setActiveChapterIndex] = React.useState(0);

  React.useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    let ctx: gsap.Context | null = null;
    try {
      ctx = gsap.context(() => {
        // Pin the visual card on desktop
        if (pinTargetRef.current && window.innerWidth >= 1024) {
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top+=80",
            end: "bottom bottom",
            pin: pinTargetRef.current,
            pinSpacing: false,
          });
        }

        // Track chapters as they scroll through viewport
        const markers = gsap.utils.toArray<HTMLElement>(".story-chapter-marker");
        if (markers && markers.length > 0) {
          markers.forEach((marker, index) => {
            ScrollTrigger.create({
              trigger: marker,
              start: "top 45%",
              end: "bottom 45%",
              onEnter: () => setActiveChapterIndex(index),
              onEnterBack: () => setActiveChapterIndex(index),
            });
          });
        }
      }, containerRef);
    } catch (err) {
      console.warn("PinnedJourneyStorytelling GSAP fallback:", err);
    }

    return () => {
      ctx?.revert();
    };
  }, []);

  const activeChapter = CHAPTERS[activeChapterIndex];

  return (
    <section
      id="career-story"
      ref={containerRef}
      className="py-24 border-b border-border/40 bg-transparent relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Dignified Editorial Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-[0.18em] mb-4 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Pinned Scroll Storytelling</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
            How a Scholar Becomes a Verified Clinician
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-300/85 leading-relaxed font-normal">
            Follow the journey of a student navigating{" "}
            <span className="font-serif font-bold text-white">Ayu-</span>
            <span className="font-serif font-bold text-amber-400">Setu</span>&apos;s autonomous lifecycle — from first diagnostic assessment to institutional signing and clinical appointment.
          </p>
        </div>

        {/* 2. Story Grid: Left Narrative Stream, Right Pinned Interactive Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative min-h-[160vh]">
          {/* Left Column: Narrative Milestones (7 Cols) */}
          <div className="lg:col-span-7 space-y-16 sm:space-y-24 py-4">
            {CHAPTERS.map((chap, idx) => {
              const isCurrent = activeChapterIndex === idx;
              return (
                <div
                  key={chap.id}
                  className={cn(
                    "story-chapter-marker p-7 sm:p-9 rounded-3xl bg-[#041d13]/90 backdrop-blur-xl border transition-all duration-300 shadow-2xl text-left",
                    isCurrent
                      ? "border-emerald-500/55 shadow-[0_12px_40px_rgba(4,30,20,0.85)] ring-1 ring-emerald-500/30 scale-[1.01]"
                      : "border-emerald-500/20 opacity-70 hover:opacity-100 hover:border-emerald-500/35"
                  )}
                >
                  {/* Card Header Row */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center font-black text-xs text-emerald-300 shadow-inner">
                        {chap.stageNum}
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-amber-400 block">
                          {chap.tag}
                        </span>
                        <span className="text-xs text-emerald-300/80 font-serif italic block mt-0.5">
                          {chap.sanskrit}
                        </span>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "px-3.5 py-1 rounded-full text-xs font-semibold transition-colors",
                        isCurrent
                          ? "border border-amber-500/40 bg-amber-950/50 text-amber-300"
                          : "border border-emerald-500/30 bg-emerald-950/60 text-emerald-200"
                      )}
                    >
                      Phase {chap.id} of 5
                    </div>
                  </div>

                  {/* Headline in Serif */}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3 tracking-tight">
                    {chap.headline}
                  </h3>

                  {/* Narrative Body */}
                  <p className="text-sm sm:text-base text-gray-300/85 leading-relaxed mb-6 font-normal">
                    {chap.narrative}
                  </p>

                  {/* Artifact Deliverable Footer */}
                  <div className="pt-4 border-t border-emerald-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <span className="inline-flex items-center gap-2 text-emerald-200">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <strong className="text-white font-bold">Artifact:</strong> {chap.deliverable}
                    </span>
                    {isCurrent && (
                      <span className="text-amber-400 font-bold flex items-center gap-1.5 text-xs tracking-wide shrink-0">
                        Active Stage <ArrowRight className="h-3.5 w-3.5 animate-pulse" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Pinned Dynamic Visual Stage (5 Cols) */}
          <div
            ref={pinTargetRef}
            className="lg:col-span-5 hidden lg:block sticky top-28 space-y-4"
          >
            <div className="p-7 sm:p-8 rounded-3xl bg-[#041d13]/95 backdrop-blur-2xl border border-emerald-500/30 shadow-2xl relative overflow-hidden transition-all duration-300 text-left">
              {/* Subtle background ambient glow */}
              <div
                className="absolute -top-16 -right-16 w-52 h-52 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: activeChapter.accentColor }}
              />

              {/* Header: Telemetry Node & Metric Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl border border-emerald-500/40 bg-emerald-950/80 flex items-center justify-center text-emerald-300 shadow-inner shrink-0">
                    {activeChapter.icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-amber-400 font-bold block mb-0.5">
                      Telemetry Node
                    </span>
                    <h4 className="text-base sm:text-lg font-serif font-bold text-white tracking-tight">
                      {activeChapter.visualData.title}
                    </h4>
                  </div>
                </div>

                <div className="rounded-xl bg-[#02140d]/90 border border-emerald-500/30 p-2.5 px-3.5 text-right shrink-0 shadow-sm">
                  <span className="text-[10px] font-mono font-bold text-emerald-400/80 uppercase tracking-wider block">
                    {activeChapter.visualData.metricLabel}
                  </span>
                  <span
                    className="text-xl sm:text-2xl font-black tracking-tight"
                    style={{ color: activeChapter.accentColor }}
                  >
                    {activeChapter.visualData.metricValue}
                  </span>
                </div>
              </div>

              {/* Progress Bar Timeline */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs text-gray-300/80 font-medium">
                  <span>Transformation Progress</span>
                  <span className="font-mono text-emerald-300 font-bold">{activeChapterIndex * 25}% Completed</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-emerald-950/80 border border-emerald-500/20 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    style={{
                      width: `${(activeChapterIndex + 1) * 20}%`,
                      backgroundColor: activeChapter.accentColor,
                    }}
                  />
                </div>
              </div>

              {/* Dynamic Candidate State Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#02140d]/90 border border-emerald-500/25 space-y-3 mb-5 shadow-inner">
                <div className="flex items-center justify-between text-xs sm:text-[13px]">
                  <span className="text-gray-400 font-medium">Candidate Profile</span>
                  <span className="font-bold text-white">Dr. Aarav Sharma (BAMS)</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-[13px]">
                  <span className="text-gray-400 font-medium">Institute Node</span>
                  <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    All India Institute of Ayurveda
                  </span>
                </div>
                <div className="pt-2.5 border-t border-emerald-500/15 text-xs text-gray-300/80 leading-relaxed font-mono">
                  {activeChapter.visualData.subtext}
                </div>
              </div>

              {/* Live Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {activeChapter.visualData.badges.map((b, i) => (
                  <span
                    key={i}
                    className="text-xs px-3.5 py-1.5 rounded-full bg-[#06291a] border border-emerald-500/30 text-emerald-200 font-medium shadow-xs"
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* Bottom Cryptographic Stamp */}
              <div className="mt-6 pt-4 border-t border-emerald-500/15 flex items-center justify-between text-xs text-gray-400">
                <span className="inline-flex items-center gap-1.5 text-emerald-300 font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  NCISM Standard Attested
                </span>
                <span className="font-mono text-[11px] text-amber-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  SYNC: LIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
