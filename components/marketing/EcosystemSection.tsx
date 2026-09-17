"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  GraduationCap,
  UserCheck,
  Building2,
  Landmark,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

interface EcosystemCardData {
  roleKey: string;
  titleWhite: string;
  titleHighlight: string;
  titleText: string;
  description: string;
  bulletPoints: string[];
  route: string;
  icon: React.ReactNode;
}

// Official National Emblem of India + Ministry of AYUSH Typography
function MinistryAyushLogo() {
  return (
    <div className="flex items-center gap-3.5">
      {/* Official Ayu-Setu Emblem */}
      <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-amber-400/60 bg-[#efe1c8] shrink-0 shadow-lg">
        <Image
          src="/images/ayu-setu-emblem.png"
          alt="Ayu-Setu Emblem"
          width={48}
          height={48}
          className="w-full h-full object-cover"
        />
      </div>

      {/* State Emblem of India (Ashoka Lion Capital) Vector */}
      <svg
        viewBox="0 0 100 120"
        className="h-12 w-auto fill-current text-white/95 shrink-0 drop-shadow-md"
        aria-label="State Emblem of India"
      >
        <g fill="currentColor">
          {/* Central Lion Head */}
          <path d="M43 22c0-5 3-10 7-10s7 5 7 10c0 3-1 6-3 8h-8c-2-2-3-5-3-8z" />
          <path d="M38 30c-1-5 2-9 6-11 1 3 3 5 6 5s5-2 6-5c4 2 7 6 6 11-1 4-4 7-9 7s-8-3-9-7z" />
          {/* Left Lion Profile */}
          <path d="M28 26c-3 1-6 4-6 8 0 5 4 8 8 8 2 0 4-1 5-2-2-4-2-9-1-12-2-1-4-2-6-2z" />
          <path d="M22 34c-2 2-3 5-2 8 2 3 5 4 8 3 0-3 1-6 3-8-4 0-7-1-9-3z" />
          {/* Right Lion Profile */}
          <path d="M72 26c3 1 6 4 6 8 0 5-4 8-8 8-2 0-4-1-5-2 2-4 2-9 1-12 2-1 4-2 6-2z" />
          <path d="M78 34c2 2 3 5 2 8-2 3-5 4-8 3 0-3-1-6-3-8 4 0 7-1 9-3z" />
          {/* Torso & Mane */}
          <path d="M35 38c-3 4-5 9-4 15 2 7 7 12 14 13h10c7-1 12-6 14-13 1-6-1-11-4-15h-30z" />
          <path d="M40 54c-1 5 1 10 5 13h10c4-3 6-8 5-13H40z" />
          {/* Abacus / Pedestal */}
          <path d="M25 70h50v5H25z" />
          {/* Ashoka Chakra */}
          <circle cx="50" cy="79" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="79" r="1.5" fill="currentColor" />
          {/* Base Platform */}
          <path d="M20 87h60v4H20z" />
          {/* Bell Base */}
          <path d="M28 93c4 5 12 8 22 8s18-3 22-8H28z" />
          {/* Satyameva Jayate Banner */}
          <text
            x="50"
            y="114"
            textAnchor="middle"
            fontSize="10"
            fontWeight="bold"
            fontFamily="sans-serif"
            letterSpacing="0.5"
            fill="currentColor"
          >
            सत्यमेव जयते
          </text>
        </g>
      </svg>

      <div className="text-left border-l border-emerald-500/40 pl-3">
        <div className="text-sm font-serif font-bold text-white tracking-tight leading-tight">
          Ministry of AYUSH
        </div>
        <div className="text-[11px] text-emerald-200/80 font-medium tracking-wide">
          Government of India
        </div>
      </div>
    </div>
  );
}

export function EcosystemSection() {
  const ecosystemRoles: EcosystemCardData[] = [
    {
      roleKey: "STUDENT",
      titleWhite: "Ayurveda",
      titleHighlight: "Scholars",
      titleText: "Ayurveda Scholars",
      description:
        "Take AI-guided clinical vignettes, discover your unique Ayurveda Career DNA, map skill gaps, and unlock verified internships.",
      bulletPoints: [
        "Personalized Diagnostic Assessments",
        "Clinical Logbook & Skill Passport",
        "Direct AIIA/Pharma Matching",
      ],
      route: "/student",
      icon: <GraduationCap className="h-6 w-6 text-white" />,
    },
    {
      roleKey: "ACADEMICIAN",
      titleWhite: "Faculty &",
      titleHighlight: "Guides",
      titleText: "Faculty & Guides",
      description:
        "Supervise student clinical procedures, attest procedural logbooks with digital signatures, and lead funded collaborative research.",
      bulletPoints: [
        "Digital Procedure Verification",
        "Competency Pass-port Sign-off",
        "Industry-Funded R&D Collabs",
      ],
      route: "/academician",
      icon: <UserCheck className="h-6 w-6 text-white" />,
    },
    {
      roleKey: "INDUSTRY",
      titleWhite: "Hospitals &",
      titleHighlight: "Pharma",
      titleText: "Hospitals & Pharma",
      description:
        "Access verified Ayurveda talent with transparent competency ratings, post specialized fellowships, and sponsor phytomedicine trials.",
      bulletPoints: [
        "Skill DNA Filtered Candidate Search",
        "Pan-Registrars & Clinical Residencies",
        "Standardized Formulation Sponsorship",
      ],
      route: "/industry",
      icon: <Building2 className="h-6 w-6 text-white" />,
    },
    {
      roleKey: "INSTITUTION",
      titleWhite: "Colleges &",
      titleHighlight: "Universities",
      titleText: "Colleges & Universities",
      description:
        "Monitor institutional learning outcomes, automate NCISM compliance reporting, and strengthen campus industry partnerships.",
      bulletPoints: [
        "Institutional Cohort Telemetry",
        "Placement Cell Automation",
        "Accreditation & MOU tracking",
      ],
      route: "/institution",
      icon: <Landmark className="h-6 w-6 text-white" />,
    },
  ];

  return (
    <section id="ecosystem" className="py-24 border-b border-border/40 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header Grid: Center Titles + Right Official Emblem Logo */}
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          {/* Center Main Headings */}
          <div className="flex-1 text-center lg:text-center space-y-2">
            {/* Top Pill / Subtitle Line */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-emerald-400/60" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-emerald-300 uppercase flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                A UNIFIED DIGITAL ECOSYSTEM
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-emerald-400/60" />
            </div>

            {/* Serif Editorial Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
              Explore Our Integrated{" "}
              <span className="text-emerald-400 font-serif font-bold">AYUSH</span>{" "}
              Ecosystem
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-emerald-100/75 leading-relaxed max-w-2xl mx-auto font-normal">
              Bridging institutions, experts and opportunities to build a stronger future for Ayurveda.
            </p>

            {/* Keywords Meta */}
            <div className="flex items-center justify-center gap-2 pt-1 text-xs sm:text-[13px] text-emerald-300 font-medium">
              <span>Collaborate</span>
              <span className="text-emerald-500">•</span>
              <span>Learn</span>
              <span className="text-emerald-500">•</span>
              <span>Grow</span>
            </div>
          </div>

          {/* Top-Right Government Logo (Absolute on Desktop to preserve exact center alignment) */}
          <div className="flex justify-center lg:absolute lg:right-0 lg:top-2">
            <MinistryAyushLogo />
          </div>
        </div>

        {/* 4 Cards Grid matching Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-6">
          {ecosystemRoles.map((role, idx) => (
            <RevealOnScroll key={role.roleKey} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="h-full"
              >
                <div className="p-6 h-full flex flex-col justify-between rounded-[28px] bg-gradient-to-b from-[#06331f]/90 via-[#032214]/85 to-[#02130c]/95 border border-emerald-500/40 backdrop-blur-xl shadow-[0_12px_40px_rgba(2,30,17,0.7)] hover:border-emerald-300/80 hover:shadow-[0_18px_50px_rgba(16,185,129,0.25)] transition-all duration-300 group relative overflow-hidden">
                  {/* Top Ambient Glow */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-400/25 transition-all" />

                  <div>
                    {/* Illuminated Circular Icon Badge */}
                    <div className="w-12 h-12 rounded-full border border-emerald-400/60 bg-gradient-to-br from-emerald-500/40 to-emerald-950/80 flex items-center justify-center text-white shadow-[0_0_18px_rgba(52,211,153,0.35)] mb-5 group-hover:scale-105 transition-transform">
                      {role.icon}
                    </div>

                    {/* Card Title */}
                    <h3 className="text-2xl font-serif font-bold text-white mb-2 tracking-tight">
                      {role.titleWhite}{" "}
                      <span className="text-emerald-400 font-serif font-bold">
                        {role.titleHighlight}
                      </span>
                    </h3>

                    {/* Card Description */}
                    <p className="text-xs sm:text-[13px] text-emerald-100/75 leading-relaxed mb-5 font-normal">
                      {role.description}
                    </p>

                    {/* Bullet Points */}
                    <ul className="space-y-2.5 mb-5 text-xs">
                      {role.bulletPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-emerald-50/90 font-medium leading-snug">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-emerald-900/30 mt-auto">
                    {/* Pill Action Button matching Image 2 */}
                    <Link
                      href={role.route}
                      className="w-full rounded-full border border-emerald-500/50 bg-[#021c10]/80 hover:bg-emerald-900/80 py-2.5 px-4 flex items-center justify-between transition-all group/btn shadow-inner backdrop-blur-md"
                    >
                      <span className="text-xs text-white font-medium">
                        Explore{" "}
                        <span className="text-emerald-400 font-bold ml-0.5 mr-0.5">
                          {role.titleText}
                        </span>{" "}
                        Portal
                      </span>
                      <span className="w-7 h-7 rounded-full border border-emerald-400/60 bg-emerald-950 flex items-center justify-center text-emerald-300 group-hover/btn:bg-emerald-400 group-hover/btn:text-emerald-950 group-hover/btn:border-emerald-300 transition-all duration-200 shadow-[0_0_8px_rgba(52,211,153,0.3)]">
                        <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Bottom Sacred Lotus / Leaf Divider with Motto matching Image 2 */}
        <div className="mt-16 text-center space-y-3">
          <div className="flex items-center justify-center gap-4 max-w-lg mx-auto">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-emerald-400" />
            <div className="p-1 rounded-full text-emerald-400">
              <svg
                className="w-6 h-6"
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
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-emerald-500/50 to-emerald-400" />
          </div>

          <div className="text-[10px] sm:text-xs tracking-[0.25em] text-emerald-400/80 font-mono font-medium uppercase">
            TRADITION &nbsp;/&nbsp; RESEARCH &nbsp;/&nbsp; INNOVATION &nbsp;/&nbsp; HEALTHIER TOMORROW
          </div>
        </div>
      </div>
    </section>
  );
}

