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
  UserCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
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
    icon: <ClipboardCheck className="h-6 w-6 text-primary" />,
    accentColor: "#4FA87D",
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
    icon: <Dna className="h-6 w-6 text-secondary" />,
    accentColor: "#C26D30",
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
      "Vaidya Setu detects a -18% deficit in Research Documentation. The Learning Engine immediately assigns NCISM-accredited GCP-Ayush modules and an institutional research workshop.",
    deliverable: "GCP-Ayush Micro-Credential Attained",
    icon: <BookOpen className="h-6 w-6 text-accent" />,
    accentColor: "#E5A93B",
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
    icon: <Award className="h-6 w-6 text-primary" />,
    accentColor: "#216849",
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
    icon: <TrendingUp className="h-6 w-6 text-accent" />,
    accentColor: "#E5A93B",
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
    if (typeof window === "undefined" || !containerRef.current || !pinTargetRef.current) return;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Pin the visual card while scrolling through narrative markers
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top+=80",
        end: "bottom bottom",
        pin: pinTargetRef.current,
        pinSpacing: false,
      });

      // Track chapters as they scroll through viewport
      const markers = gsap.utils.toArray<HTMLElement>(".story-chapter-marker");
      markers.forEach((marker, index) => {
        ScrollTrigger.create({
          trigger: marker,
          start: "top 45%",
          end: "bottom 45%",
          onEnter: () => setActiveChapterIndex(index),
          onEnterBack: () => setActiveChapterIndex(index),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeChapter = CHAPTERS[activeChapterIndex];

  return (
    <section
      id="career-story"
      ref={containerRef}
      className="py-24 border-b border-border/60 bg-muted/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Pinned Scroll Storytelling</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            How a Scholar Becomes a Verified Clinician
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Follow the journey of a student navigating Vaidya Setu&apos;s autonomous lifecycle — from first diagnostic assessment to institutional signing and clinical appointment.
          </p>
        </div>

        {/* Story Grid: Left Narrative Stream, Right Pinned Interactive Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative min-h-[160vh]">
          {/* Left Column: Narrative Milestones (7 Cols) */}
          <div className="lg:col-span-7 space-y-28 py-6">
            {CHAPTERS.map((chap, idx) => {
              const isCurrent = activeChapterIndex === idx;
              return (
                <div
                  key={chap.id}
                  className={cn(
                    "story-chapter-marker p-6 sm:p-8 rounded-3xl border transition-all duration-300",
                    isCurrent
                      ? "bg-card border-primary/40 shadow-xl ring-1 ring-primary/20 scale-[1.01]"
                      : "bg-card/50 border-border/60 opacity-60"
                  )}
                >
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-muted border border-border flex items-center justify-center font-bold text-xs text-primary shadow-sm">
                        {chap.stageNum}
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-accent block">
                          {chap.tag}
                        </span>
                        <span className="text-[11px] text-primary/80 font-serif">
                          {chap.sanskrit}
                        </span>
                      </div>
                    </div>
                    <Badge variant={isCurrent ? "gold" : "outline"} size="sm">
                      Phase {chap.id} of 5
                    </Badge>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                    {chap.headline}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {chap.narrative}
                  </p>

                  <div className="pt-4 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <strong className="text-foreground">Artifact:</strong> {chap.deliverable}
                    </span>
                    {isCurrent && (
                      <span className="text-primary font-bold flex items-center gap-1">
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
            <div className="p-7 rounded-3xl bg-gradient-to-br from-card via-background to-muted/30 border-2 border-border shadow-2xl relative overflow-hidden transition-all duration-300">
              {/* Subtle background ambient glow */}
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: activeChapter.accentColor }}
              />

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="p-2.5 rounded-2xl bg-card border border-border shadow-sm">
                    {activeChapter.icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground block font-bold">
                      Telemetry Node
                    </span>
                    <h4 className="text-sm font-bold text-foreground">
                      {activeChapter.visualData.title}
                    </h4>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-muted-foreground block">
                    {activeChapter.visualData.metricLabel}
                  </span>
                  <span
                    className="text-2xl font-black tracking-tight"
                    style={{ color: activeChapter.accentColor }}
                  >
                    {activeChapter.visualData.metricValue}
                  </span>
                </div>
              </div>

              {/* Progress Bar Timeline */}
              <div className="space-y-1.5 mb-6">
                <div className="flex justify-between text-[11px] text-muted-foreground font-medium">
                  <span>Transformation Progress</span>
                  <span>{activeChapterIndex * 25}% Completed</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${(activeChapterIndex + 1) * 20}%`,
                      backgroundColor: activeChapter.accentColor,
                    }}
                  />
                </div>
              </div>

              {/* Dynamic Candidate State Card */}
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/70 space-y-3 mb-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Candidate Profile</span>
                  <span className="font-bold text-foreground">Dr. Aarav Sharma (BAMS)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Institute Node</span>
                  <span className="font-semibold text-primary">All India Institute of Ayurveda</span>
                </div>
                <div className="pt-2 border-t border-border/50 text-[11px] text-muted-foreground leading-relaxed">
                  {activeChapter.visualData.subtext}
                </div>
              </div>

              {/* Live Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {activeChapter.visualData.badges.map((b, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-card border border-border text-foreground/90 font-medium shadow-sm"
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* Bottom Cryptographic Stamp */}
              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1 text-primary">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  NCISM Standard Attested
                </span>
                <span className="font-mono text-[10px]">SYNC: LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
