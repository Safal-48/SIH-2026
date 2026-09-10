"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SkillFlowCanvas({ className }: { className?: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const particle1Ref = React.useRef<SVGCircleElement>(null);
  const particle2Ref = React.useRef<SVGCircleElement>(null);
  const particle3Ref = React.useRef<SVGCircleElement>(null);

  React.useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate flowing pulses along the path
      const tl = gsap.timeline({ repeat: -1 });

      tl.to([particle1Ref.current, particle2Ref.current, particle3Ref.current], {
        duration: 2.2,
        ease: "power1.inOut",
        stagger: 0.4,
        motionPath: undefined, // using keyframes for SVG cx/cy or strokeDashoffset
      });

      // SVG path line dash flow
      gsap.to(".skill-flow-path", {
        strokeDashoffset: -60,
        duration: 3,
        repeat: -1,
        ease: "linear",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full py-6 px-4 rounded-2xl bg-card/60 border border-primary/20 backdrop-blur-sm overflow-hidden",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-accent/20 text-accent flex items-center justify-center font-bold text-xs">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-foreground">
              Autonomous Skill Flow Simulation
            </span>
            <span className="text-[10px] text-muted-foreground block">
              Live algorithmic data packets streaming from Assessment to Industry
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Throughput: 4,820 Vectors/Sec</span>
        </div>
      </div>

      {/* SVG Flow Schematic */}
      <div className="relative w-full h-24 sm:h-28 flex items-center justify-center">
        <svg
          className="w-full h-full text-border/60"
          viewBox="0 0 800 100"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4FA87D" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#E5A93B" stopOpacity="1" />
              <stop offset="100%" stopColor="#216849" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Path 1: Top Stream (Clinical Assessment -> Engine -> Residency) */}
          <path
            d="M 50 30 C 250 30, 250 50, 400 50 C 550 50, 550 30, 750 30"
            stroke="url(#flowGrad1)"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            className="skill-flow-path"
          />

          {/* Path 2: Center Straight Stream (Career DNA -> Engine -> Passport) */}
          <line
            x1="50"
            y1="50"
            x2="750"
            y2="50"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="text-muted-foreground/40 skill-flow-path"
          />

          {/* Path 3: Bottom Stream (Attested Logbook -> Engine -> Pharma R&D) */}
          <path
            d="M 50 70 C 250 70, 250 50, 400 50 C 550 50, 550 70, 750 70"
            stroke="url(#flowGrad1)"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            className="skill-flow-path"
          />

          {/* Node 1: Origin Candidate */}
          <circle cx="50" cy="50" r="14" fill="#4FA87D" fillOpacity="0.2" stroke="#4FA87D" strokeWidth="2" />
          <circle cx="50" cy="50" r="6" fill="#4FA87D" />

          {/* Node 2: Central AI Automation Core */}
          <circle cx="400" cy="50" r="20" fill="#E5A93B" fillOpacity="0.25" stroke="#E5A93B" strokeWidth="2.5" />
          <circle cx="400" cy="50" r="8" fill="#E5A93B" />

          {/* Node 3: Target Outcome */}
          <circle cx="750" cy="50" r="14" fill="#216849" fillOpacity="0.2" stroke="#216849" strokeWidth="2" />
          <circle cx="750" cy="50" r="6" fill="#216849" />
        </svg>

        {/* Labels over the 3 nodes */}
        <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-foreground bg-card/90 px-2 py-0.5 rounded border border-border shadow-sm">
          Assessment
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-accent bg-card/90 px-2.5 py-0.5 rounded border border-accent/40 shadow-sm">
          Matching Core
        </div>
        <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-foreground bg-card/90 px-2 py-0.5 rounded border border-border shadow-sm">
          Placement
        </div>
      </div>
    </div>
  );
}
