"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { UserCheck, GraduationCap, Building2, Landmark, Sparkles, Box, Compass } from "lucide-react";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { CanvasFallback } from "../three/CanvasFallback";
import { cn } from "@/lib/utils/cn";

const AyushKnowledgeNetwork3D = dynamic(
  () => import("../three/AyushKnowledgeNetwork3D").then((m) => m.AyushKnowledgeNetwork3D),
  {
    ssr: false,
    loading: () => <CanvasFallback title="Loading 3D Ayush Knowledge Network..." />,
  }
);

export function NetworkSection() {
  const [viewMode, setViewMode] = React.useState<"3D" | "STAKEHOLDER">("3D");

  const connections = [
    {
      title: "Students ↔ Industry",
      subtitle: "Verified Clinical & R&D Placements",
      desc: "Scholars apply directly with attested Competency Passports; hospitals and pharma hire talent with zero guesswork.",
    },
    {
      title: "Academicians ↔ Industry",
      subtitle: "Funded Research & Clinical Trials",
      desc: "Pharma sponsors university-led standardization and multi-centric trials under GCP-Ayush guidelines.",
    },
    {
      title: "Institutions ↔ Industry",
      subtitle: "Automated MOUs & Cohort Telemetry",
      desc: "Colleges streamline placement metrics and track accreditation compliance with institutional partners.",
    },
    {
      title: "Faculty ↔ Students",
      subtitle: "Digital Logbook Attestation",
      desc: "Supervisors inspect patient cases, evaluate pulse palpation logs, and endorse competencies with digital signatures.",
    },
  ];

  return (
    <section id="network" className="py-24 border-b border-border/60 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Multi-Stakeholder Synergy"
          title="Bridging the Academia–Industry Divide"
          subtitle="Vaidya Setu connects students, clinical faculty, accredited institutions, and leading Ayurvedic pharma into one unified digital ecosystem."
          align="center"
        />

        {/* View Mode Switcher */}
        <div className="flex items-center justify-center gap-2 mt-8 mb-10">
          <button
            onClick={() => setViewMode("3D")}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2",
              viewMode === "3D"
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105"
                : "bg-muted text-muted-foreground hover:text-foreground border border-border"
            )}
          >
            <Box className="h-3.5 w-3.5" />
            <span>Interactive 3D Knowledge Network</span>
          </button>
          <button
            onClick={() => setViewMode("STAKEHOLDER")}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2",
              viewMode === "STAKEHOLDER"
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105"
                : "bg-muted text-muted-foreground hover:text-foreground border border-border"
            )}
          >
            <Compass className="h-3.5 w-3.5" />
            <span>2D Stakeholder Matrix</span>
          </button>
        </div>

        {viewMode === "3D" ? (
          /* 3D Knowledge Constellation View */
          <div className="mt-6">
            <AyushKnowledgeNetwork3D />
          </div>
        ) : (
          /* 2D Multi-Stakeholder Matrix View */
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Animated SVG Network Graph (6 Cols) */}
            <div className="lg:col-span-6 relative flex items-center justify-center p-4">
              <RevealOnScroll direction="none">
                <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
                  {/* SVG Animated Connecting Web */}
                  <svg className="absolute inset-0 w-full h-full text-border/70" viewBox="0 0 400 400" fill="none">
                    <line x1="200" y1="50" x2="350" y2="200" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="text-primary/40" />
                    <line x1="350" y1="200" x2="200" y2="350" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="text-accent/40" />
                    <line x1="200" y1="350" x2="50" y2="200" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="text-secondary/40" />
                    <line x1="50" y1="200" x2="200" y2="50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="text-primary/40" />

                    <line x1="200" y1="50" x2="200" y2="200" stroke="currentColor" strokeWidth="2" className="text-primary/50" />
                    <line x1="350" y1="200" x2="200" y2="200" stroke="currentColor" strokeWidth="2" className="text-accent/50" />
                    <line x1="200" y1="350" x2="200" y2="200" stroke="currentColor" strokeWidth="2" className="text-secondary/50" />
                    <line x1="50" y1="200" x2="200" y2="200" stroke="currentColor" strokeWidth="2" className="text-primary/50" />

                    <circle cx="200" cy="200" r="85" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="text-accent/30 animate-spin-slow" />
                  </svg>

                  {/* Central Core Node: Vaidya Setu */}
                  <div className="absolute z-10 w-24 h-24 rounded-full bg-gradient-to-br from-primary via-herbal-800 to-herbal-950 text-white flex flex-col items-center justify-center p-2 text-center shadow-xl border-4 border-background ring-4 ring-primary/20">
                    <span className="font-serif font-bold text-xl">वै</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-accent leading-tight">
                      Vaidya Setu Core
                    </span>
                  </div>

                  {/* Top Node: Students */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                    <div className="w-14 h-14 rounded-2xl bg-card border-2 border-primary/40 shadow-lg flex items-center justify-center text-primary group hover:scale-110 transition-transform">
                      <UserCheck className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold text-foreground mt-1.5 bg-background/80 px-2 py-0.5 rounded shadow-sm">
                      Students
                    </span>
                  </div>

                  {/* Right Node: Industry */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                    <div className="w-14 h-14 rounded-2xl bg-card border-2 border-accent/40 shadow-lg flex items-center justify-center text-accent group hover:scale-110 transition-transform">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold text-foreground mt-1.5 bg-background/80 px-2 py-0.5 rounded shadow-sm">
                      Industry
                    </span>
                  </div>

                  {/* Bottom Node: Institutions */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                    <div className="w-14 h-14 rounded-2xl bg-card border-2 border-secondary/40 shadow-lg flex items-center justify-center text-secondary group hover:scale-110 transition-transform">
                      <Landmark className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold text-foreground mt-1.5 bg-background/80 px-2 py-0.5 rounded shadow-sm">
                      Institutions
                    </span>
                  </div>

                  {/* Left Node: Academicians */}
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                    <div className="w-14 h-14 rounded-2xl bg-card border-2 border-primary/40 shadow-lg flex items-center justify-center text-primary group hover:scale-110 transition-transform">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold text-foreground mt-1.5 bg-background/80 px-2 py-0.5 rounded shadow-sm">
                      Faculty
                    </span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right Column: Connection Highlights (6 Cols) */}
            <div className="lg:col-span-6 space-y-4">
              {connections.map((conn, idx) => (
                <RevealOnScroll key={idx} delay={idx * 0.08}>
                  <div className="p-4 rounded-xl border border-border bg-card/60 hover:bg-muted/40 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-accent" />
                        {conn.title}
                      </h5>
                      <Badge variant="outline" size="sm">
                        {conn.subtitle}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {conn.desc}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
