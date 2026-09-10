"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ArrowRight, Sparkles, ShieldCheck, Compass, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { siteConfig } from "@/config/site";
import { CanvasFallback } from "../three/CanvasFallback";

// Dynamically import 3D Hero scene with SSR disabled
const HeroThreeScene = dynamic(
  () => import("../three/HeroThreeScene").then((mod) => mod.HeroThreeScene),
  {
    ssr: false,
    loading: () => <CanvasFallback title="Loading Ayurveda Knowledge Core..." />,
  }
);

interface HeroSectionProps {
  onStartJourney: () => void;
  onExploreOpportunities: () => void;
}

export function HeroSection({
  onStartJourney,
  onExploreOpportunities,
}: HeroSectionProps) {
  const heroRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (typeof window === "undefined" || !heroRef.current) return;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    let ctx: gsap.Context | null = null;
    try {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-pill", {
          opacity: 0,
          y: -16,
          duration: 0.6,
        })
          .from(
            ".hero-headline",
            {
              opacity: 0,
              y: 28,
              duration: 0.8,
            },
            "-=0.3"
          )
          .from(
            ".hero-subtext",
            {
              opacity: 0,
              y: 20,
              duration: 0.6,
            },
            "-=0.4"
          )
          .from(
            ".hero-ctas",
            {
              opacity: 0,
              y: 16,
              duration: 0.5,
            },
            "-=0.3"
          )
          .from(
            ".hero-trust",
            {
              opacity: 0,
              y: 12,
              duration: 0.5,
            },
            "-=0.2"
          )
          .from(
            ".hero-3d-wrapper",
            {
              opacity: 0,
              scale: 0.94,
              duration: 1.0,
              ease: "power2.out",
            },
            "-=0.8"
          )
          .from(
            ".hero-stat-card",
            {
              opacity: 0,
              y: 24,
              stagger: 0.08,
              duration: 0.6,
            },
            "-=0.5"
          );
      }, heroRef);
    } catch (err) {
      console.warn("HeroSection animation safe fallback:", err);
    }

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-gradient-to-b from-background via-herbal-950/5 to-background border-b border-border/60"
    >
      {/* Ambient background glow elements */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full py-8">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-left z-10">
            {/* Category Pill */}
            <div className="hero-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent-foreground text-xs font-semibold uppercase tracking-wider shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-accent animate-pulse" />
              <span>National Ayush Mission • Ministry of Ayush</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="hero-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground font-sans leading-[1.12] mt-4">
              Your Ayurveda Skills.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-herbal-600 to-accent">
                Your Career. Connected.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="hero-subtext mt-5 text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl font-normal">
              Assess your clinical skills, discover your personalized career DNA, build attested competencies, and unlock verified fellowships and pharma roles across the Ayush ecosystem.
            </p>

            {/* Dual Action CTAs */}
            <div className="hero-ctas mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton>
                <Button
                  variant="gold"
                  size="lg"
                  onClick={onStartJourney}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="shadow-lg shadow-accent/20"
                >
                  Start Your Journey
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onExploreOpportunities}
                  leftIcon={<Compass className="h-4 w-4 text-accent" />}
                >
                  Explore Opportunities
                </Button>
              </MagneticButton>
            </div>

            {/* Dedicated Stakeholder Portals Quick Jump */}
            <div className="pt-2 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-accent animate-spin-slow" />
                <span>Direct Stakeholder Portals (Live & Functional):</span>
              </span>
              <div className="flex flex-wrap gap-2">
                <a
                  href="/student"
                  className="px-3.5 py-2 rounded-xl bg-card/90 hover:bg-card border border-primary/40 hover:border-primary text-xs font-semibold text-foreground flex items-center gap-2 shadow-sm hover:scale-105 hover:shadow-md transition-all ayur-3d-card"
                >
                  <span>🎓</span>
                  <span>For Students</span>
                </a>
                <a
                  href="/industry"
                  className="px-3.5 py-2 rounded-xl bg-card/90 hover:bg-card border border-accent/40 hover:border-accent text-xs font-semibold text-foreground flex items-center gap-2 shadow-sm hover:scale-105 hover:shadow-md transition-all ayur-3d-card"
                >
                  <span>🏥</span>
                  <span>For Industry & Pharma</span>
                </a>
                <a
                  href="/institution"
                  className="px-3.5 py-2 rounded-xl bg-card/90 hover:bg-card border border-emerald-500/40 hover:border-emerald-500 text-xs font-semibold text-foreground flex items-center gap-2 shadow-sm hover:scale-105 hover:shadow-md transition-all ayur-3d-card"
                >
                  <span>🏫</span>
                  <span>For Institutions</span>
                </a>
                <a
                  href="/academician"
                  className="px-3.5 py-2 rounded-xl bg-card/90 hover:bg-card border border-secondary/40 hover:border-secondary text-xs font-semibold text-foreground flex items-center gap-2 shadow-sm hover:scale-105 hover:shadow-md transition-all ayur-3d-card"
                >
                  <span>👨‍🏫</span>
                  <span>For Faculty</span>
                </a>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="hero-trust pt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-muted-foreground border-t border-border/50">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" />
                All India Institute of Ayurveda Verified
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                NCISM Curriculum Standards
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                Tamper-Evident Passport
              </span>
            </div>
          </div>

          {/* Right Hero Column: 3D Scene */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="hero-3d-wrapper relative w-full h-[480px] sm:h-[520px] lg:h-[580px] max-w-[540px] mx-auto flex items-center justify-center">
              {/* 3D Radiant Ambient Aura */}
              <div className="absolute inset-4 bg-gradient-to-tr from-accent/25 via-primary/20 to-transparent rounded-full blur-3xl -z-10 animate-pulse-subtle" />

              <HeroThreeScene className="w-full h-full" />

              {/* Floating Accent Badge 1 */}
              <div className="ayur-3d-card ayur-glow absolute top-4 -right-1 sm:right-2 p-3 rounded-2xl bg-card/90 backdrop-blur-md border border-accent/40 shadow-xl text-xs font-semibold flex items-center gap-2.5 z-20">
                <div className="w-8 h-8 rounded-xl bg-accent/20 text-accent flex items-center justify-center font-bold">
                  🌿
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Pulse & Logbook</span>
                  <span className="text-foreground font-bold">Nadi Pariksha Endorsed</span>
                </div>
              </div>

              {/* Floating Accent Badge 2 */}
              <div className="ayur-3d-card emerald-glow absolute bottom-4 -left-1 sm:left-2 p-3 rounded-2xl bg-card/90 backdrop-blur-md border border-primary/40 shadow-xl text-xs font-semibold flex items-center gap-2.5 z-20">
                <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold">
                  ✦
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Smart Matching</span>
                  <span className="text-foreground font-bold">86% Skill Match with AIIA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom KPI Stat Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 rounded-2xl bg-card/70 backdrop-blur-md border border-border shadow-sm">
          {siteConfig.stats.map((stat, i) => (
            <div key={i} className="hero-stat-card text-center sm:text-left sm:px-4 border-r last:border-0 border-border/60">
              <p className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs font-medium text-muted-foreground mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
