"use client";

import * as React from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Compass,
  Brain,
  GraduationCap,
  ShieldCheck,
  Handshake,
  Building2,
  ClipboardCheck,
  Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { StaggeredLetters } from "@/components/animations/StaggeredLetters";

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
          duration: 0.5,
        })
          .from(
            ".hero-subtext",
            {
              opacity: 0,
              y: 20,
              duration: 0.6,
            },
            "+=0.45"
          )
          .from(
            ".hero-ctas",
            {
              opacity: 0,
              y: 16,
              duration: 0.5,
            },
            "-=0.2"
          )
          .from(
            ".hero-feature-pill",
            {
              opacity: 0,
              y: 16,
              stagger: 0.08,
              duration: 0.5,
            },
            "-=0.2"
          )
          .from(
            ".hero-stat-card",
            {
              opacity: 0,
              y: 24,
              stagger: 0.08,
              duration: 0.6,
            },
            "-=0.3"
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
      className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden bg-transparent border-b border-border/40 w-full"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center text-center my-auto">
        <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto">
          {/* 1. Category Pill with Official Ayu-Setu Emblem & Motto */}
          <div className="hero-pill inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-950/60 border border-amber-500/40 backdrop-blur-md shadow-lg shadow-emerald-950/40 hover:border-amber-400/60 transition-all">
            <img
              src="/images/ayu-setu-emblem.png"
              alt="Ayu-Setu Emblem"
              className="h-6 w-6 object-cover rounded-full ring-1 ring-amber-400/60 bg-[#efe1c8] shadow-sm shrink-0"
            />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.18em] text-amber-300 uppercase">
              AYU-SETU <span className="text-amber-400/60 mx-1.5">•</span> LEARN • GROW • HEAL • BUILD
            </span>
          </div>

          {/* 2. Bold Editorial Headline with Kinetic Stagger Text Rise (Originkit) */}
          <div className="w-full max-w-5xl mx-auto">
            <StaggeredLetters
              text="Empowering Ayurveda"
              font={{
                fontSize: "clamp(34px, 6.2vw, 76px)",
                fontWeight: 900,
                lineHeight: 1.1,
                textAlign: "center",
                fontFamily: "var(--font-sans, 'Plus Jakarta Sans', sans-serif)",
                letterSpacing: "-0.03em",
              }}
              color="#FFFFFF"
              y={45}
              startOpacity={0}
              staggerMs={20}
              delay={0.1}
              tag="h1"
            />

            <div className="mt-1 sm:mt-2">
              <StaggeredLetters
                text="Through Skills & Opportunity."
                font={{
                  fontSize: "clamp(34px, 6.2vw, 76px)",
                  fontWeight: 900,
                  lineHeight: 1.1,
                  textAlign: "center",
                  fontFamily: "var(--font-sans, 'Plus Jakarta Sans', sans-serif)",
                  letterSpacing: "-0.03em",
                }}
                color="#34D399"
                highlightWords={["Opportunity."]}
                highlightColor="#F59E0B"
                y={45}
                startOpacity={0}
                staggerMs={20}
                delay={0.42}
                tag="h2"
              />
            </div>
          </div>

          {/* 3. Subtext matching 1st image */}
          <p className="hero-subtext text-base sm:text-lg md:text-xl text-emerald-100/80 leading-relaxed max-w-3xl mx-auto font-normal">
            Assess your clinical competencies, identify skill gaps, earn verified credentials, and discover personalized learning and career opportunities across the AYUSH ecosystem.
          </p>

          {/* 4. Dual Action CTAs matching 1st image */}
          <div className="hero-ctas pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <MagneticButton>
              <Button
                variant="gold"
                size="lg"
                onClick={onStartJourney}
                rightIcon={<ArrowRight className="h-5 w-5" />}
                className="rounded-full shadow-xl shadow-amber-500/25 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold px-8 sm:px-10 py-4 text-sm sm:text-base tracking-wide hover:scale-105 transition-all"
              >
                Explore Your Career Path
              </Button>
            </MagneticButton>

            <MagneticButton>
              <Button
                variant="outline"
                size="lg"
                onClick={onExploreOpportunities}
                leftIcon={<Compass className="h-5 w-5 text-amber-400" />}
                className="rounded-full font-semibold px-7 sm:px-9 py-4 text-sm sm:text-base border-amber-500/50 hover:border-amber-400 bg-black/40 hover:bg-white/5 text-amber-200 hover:text-white backdrop-blur-md hover:scale-105 transition-all"
              >
                Explore Opportunities
              </Button>
            </MagneticButton>
          </div>

          {/* 5. 4 Circular Feature / Trust Badges matching 1st image */}
          <div className="pt-6 sm:pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {/* Badge 1 */}
            <div className="hero-feature-pill flex items-center gap-3 text-left">
              <div className="w-12 h-12 rounded-full border border-emerald-500/40 bg-emerald-950/70 flex items-center justify-center text-emerald-300 shadow-sm shrink-0">
                <Brain className="h-6 w-6 text-emerald-300" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white leading-tight">AI-Powered</p>
                <p className="text-[11px] sm:text-xs font-medium text-emerald-200/80 leading-tight">Skill Assessment</p>
              </div>
            </div>

            {/* Badge 2 */}
            <div className="hero-feature-pill flex items-center gap-3 text-left">
              <div className="w-12 h-12 rounded-full border border-emerald-500/40 bg-emerald-950/70 flex items-center justify-center text-emerald-300 shadow-sm shrink-0">
                <GraduationCap className="h-6 w-6 text-emerald-300" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white leading-tight">Personalized</p>
                <p className="text-[11px] sm:text-xs font-medium text-emerald-200/80 leading-tight">Learning Paths</p>
              </div>
            </div>

            {/* Badge 3 */}
            <div className="hero-feature-pill flex items-center gap-3 text-left">
              <div className="w-12 h-12 rounded-full border border-emerald-500/40 bg-emerald-950/70 flex items-center justify-center text-emerald-300 shadow-sm shrink-0">
                <ShieldCheck className="h-6 w-6 text-emerald-300" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white leading-tight">Verified</p>
                <p className="text-[11px] sm:text-xs font-medium text-emerald-200/80 leading-tight">Credentials</p>
              </div>
            </div>

            {/* Badge 4 */}
            <div className="hero-feature-pill flex items-center gap-3 text-left">
              <div className="w-12 h-12 rounded-full border border-emerald-500/40 bg-emerald-950/70 flex items-center justify-center text-emerald-300 shadow-sm shrink-0">
                <Handshake className="h-6 w-6 text-emerald-300" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white leading-tight">Industry &amp; Institution</p>
                <p className="text-[11px] sm:text-xs font-medium text-emerald-200/80 leading-tight">Connect</p>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Bottom KPI Stat Bar matching 1st image: Rounded emerald container with circular icon badges */}
        <div className="w-full max-w-6xl mx-auto mt-12 sm:mt-16">
          <div className="rounded-3xl bg-[#041e14]/90 backdrop-blur-xl border border-emerald-500/30 p-6 sm:p-7 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Stat 1: Active AYUSH Students */}
              <div className="hero-stat-card flex items-center gap-4 text-left">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border border-emerald-500/40 bg-emerald-950/80 flex items-center justify-center text-emerald-300 shrink-0 shadow-inner">
                  <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-300" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">12,400+</p>
                  <p className="text-xs sm:text-[13px] font-medium text-emerald-300/85 mt-0.5">Active AYUSH Students</p>
                </div>
              </div>

              {/* Stat 2: Verified Industry Partners */}
              <div className="hero-stat-card flex items-center gap-4 text-left">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border border-emerald-500/40 bg-emerald-950/80 flex items-center justify-center text-emerald-300 shrink-0 shadow-inner">
                  <Building2 className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-300" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">350+</p>
                  <p className="text-xs sm:text-[13px] font-medium text-emerald-300/85 mt-0.5">Verified Industry Partners</p>
                </div>
              </div>

              {/* Stat 3: Clinical Skills Assessed */}
              <div className="hero-stat-card flex items-center gap-4 text-left">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border border-emerald-500/40 bg-emerald-950/80 flex items-center justify-center text-emerald-300 shrink-0 shadow-inner">
                  <ClipboardCheck className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-300" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">48,000+</p>
                  <p className="text-xs sm:text-[13px] font-medium text-emerald-300/85 mt-0.5">Clinical Skills Assessed</p>
                </div>
              </div>

              {/* Stat 4: AYUSH Institutions */}
              <div className="hero-stat-card flex items-center gap-4 text-left">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border border-emerald-500/40 bg-emerald-950/80 flex items-center justify-center text-emerald-300 shrink-0 shadow-inner">
                  <Landmark className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-300" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">85+</p>
                  <p className="text-xs sm:text-[13px] font-medium text-emerald-300/85 mt-0.5">AYUSH Institutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
