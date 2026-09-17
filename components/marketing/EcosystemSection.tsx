"use client";

import * as React from "react";
import Link from "next/link";
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
        {/* Top Header: Center Titles */}
        <div className="text-center space-y-2 mb-12 max-w-4xl mx-auto">
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

