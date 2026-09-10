"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserCheck, GraduationCap, Building2, Landmark, ArrowRight, ShieldCheck } from "lucide-react";
import { Card } from "@/components/cards/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

interface EcosystemCardData {
  roleKey: string;
  title: string;
  badge: string;
  description: string;
  bulletPoints: string[];
  route: string;
  icon: React.ReactNode;
  accentClass: string;
}

export function EcosystemSection() {
  const ecosystemRoles: EcosystemCardData[] = [
    {
      roleKey: "STUDENT",
      title: "Ayurveda Scholars",
      badge: "BAMS / MD / PhD",
      description: "Take AI-guided clinical vignettes, discover your unique Ayurveda Career DNA, map skill gaps, and unlock verified internships.",
      bulletPoints: [
        "Personalized Diagnostic Assessments",
        "Clinical Logbook & Skill Passport",
        "Direct AIIA & Pharma Matching",
      ],
      route: "/student",
      icon: <UserCheck className="h-6 w-6 text-primary" />,
      accentClass: "hover:border-primary/50 group-hover:bg-primary/5",
    },
    {
      roleKey: "ACADEMICIAN",
      title: "Faculty & Guides",
      badge: "Clinical Supervisors",
      description: "Supervise student clinical procedures, attest procedural logbooks with digital signatures, and lead funded collaborative research.",
      bulletPoints: [
        "Digital Procedure Verification",
        "Competency Passport Sign-off",
        "Industry-Funded R&D Collabs",
      ],
      route: "/academician",
      icon: <GraduationCap className="h-6 w-6 text-secondary" />,
      accentClass: "hover:border-secondary/50 group-hover:bg-secondary/5",
    },
    {
      roleKey: "INDUSTRY",
      title: "Hospitals & Pharma",
      badge: "Clinical & R&D Partners",
      description: "Access verified Ayurvedic talent with transparent competency ratings, post specialized fellowships, and sponsor phytomedicine trials.",
      bulletPoints: [
        "Skill DNA Filtered Candidate Search",
        "Panchakarma & Clinical Residencies",
        "Standardized Formulation Sponsorship",
      ],
      route: "/industry",
      icon: <Building2 className="h-6 w-6 text-accent" />,
      accentClass: "hover:border-accent/50 group-hover:bg-accent/5",
    },
    {
      roleKey: "INSTITUTION",
      title: "Colleges & Universities",
      badge: "NCISM / AIIA Affiliated",
      description: "Monitor institutional learning outcomes, automate NCISM compliance reporting, and streamline campus industry partnerships.",
      bulletPoints: [
        "Institutional Cohort Telemetry",
        "Placement Cell Automation",
        "Accreditation & MOU Tracking",
      ],
      route: "/institution",
      icon: <Landmark className="h-6 w-6 text-primary" />,
      accentClass: "hover:border-primary/50 group-hover:bg-primary/5",
    },
  ];

  return (
    <section id="ecosystem" className="py-24 border-b border-border/60 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Unified Ayush Ecosystem"
          title="One ecosystem. Every Ayurveda career path."
          subtitle="Connecting academia, clinical hospitals, research laboratories, and regulatory bodies into an intelligent collaborative framework."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {ecosystemRoles.map((role, idx) => (
            <RevealOnScroll key={role.roleKey} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="h-full"
              >
                <Card
                  variant="interactive"
                  className="p-6 h-full flex flex-col justify-between border-border/80 group transition-all"
                >
                  <div>
                    {/* Icon & Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-2xl bg-background border border-border shadow-sm group-hover:scale-105 transition-transform">
                        {role.icon}
                      </div>
                      <Badge variant="gold" size="sm">
                        {role.badge}
                      </Badge>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                      {role.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-6 pt-3 border-t border-border/50 text-xs text-muted-foreground">
                      {role.bulletPoints.map((point, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span className="text-foreground/90 font-medium">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Route Link */}
                  <Link
                    href={role.route}
                    className="pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-primary group-hover:text-herbal-800 transition-colors"
                  >
                    <span>Explore {role.title} Portal</span>
                    <ArrowRight className="h-3.5 w-3.5 text-accent group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </Card>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
