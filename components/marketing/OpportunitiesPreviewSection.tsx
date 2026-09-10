"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import {
  MapPin,
  Clock,
  ShieldCheck,
  Banknote,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { formatINR } from "@/lib/utils/formatters";
import { CanvasFallback } from "../three/CanvasFallback";
import { cn } from "@/lib/utils/cn";

const OpportunityConnection3D = dynamic(
  () => import("../three/OpportunityConnection3D").then((m) => m.OpportunityConnection3D),
  {
    ssr: false,
    loading: () => <CanvasFallback title="Initializing Opportunity Match Stream..." />,
  }
);

interface OpportunityItem {
  id: string;
  title: string;
  organization: string;
  type: string;
  location: string;
  duration: string;
  stipendMonthly: number;
  matchScore: number;
  eligibility: string;
  skills: string[];
  isVerified: boolean;
}

export function OpportunitiesPreviewSection({
  onApply,
}: {
  onApply?: (opp: OpportunityItem) => void;
}) {
  const [showVisualizer, setShowVisualizer] = React.useState(true);
  const opportunities: OpportunityItem[] = [
    {
      id: "opp-1",
      title: "Clinical Research Residency in Metabolic Disorders",
      organization: "All India Institute of Ayurveda (AIIA), New Delhi",
      type: "Clinical Residency",
      location: "Sarita Vihar, New Delhi",
      duration: "6 Months",
      stipendMonthly: 35000,
      matchScore: 86,
      eligibility: "BAMS / MD (Ayurveda)",
      skills: ["Nadi Pariksha", "Panchakarma Execution", "GCP-Ayush"],
      isVerified: true,
    },
    {
      id: "opp-2",
      title: "Junior Clinical Trial Monitoring Fellowship",
      organization: "Central Council for Research in Ayurvedic Sciences (CCRAS)",
      type: "Research Fellowship",
      location: "Janakpuri, New Delhi",
      duration: "12 Months",
      stipendMonthly: 42000,
      matchScore: 92,
      eligibility: "MD / MS (Ayurveda)",
      skills: ["Clinical Trial Protocol", "Bioethics", "Data Analysis"],
      isVerified: true,
    },
    {
      id: "opp-3",
      title: "Traditional Panchakarma Clinical Immersion",
      organization: "Arya Vaidya Sala (AVS), Kottakkal",
      type: "Panchakarma Immersion",
      location: "Malappuram, Kerala",
      duration: "6 Months",
      stipendMonthly: 32000,
      matchScore: 90,
      eligibility: "BAMS Final Year / MD",
      skills: ["Sirodhara Protocol", "Pizhichil", "Samana Therapy"],
      isVerified: true,
    },
    {
      id: "opp-4",
      title: "Phytochemistry & Botanical QA Trainee",
      organization: "Dabur Research & Development Centre",
      type: "Herbal Pharma Traineeship",
      location: "Sahibabad, Uttar Pradesh",
      duration: "4 Months",
      stipendMonthly: 28000,
      matchScore: 78,
      eligibility: "BAMS / Dravyaguna / Pharma",
      skills: ["HPTLC Profiling", "Heavy Metal Testing", "Phytopharmacology"],
      isVerified: true,
    },
    {
      id: "opp-5",
      title: "National Ayush Public Health Fellowship",
      organization: "National Institute of Ayurveda (NIA), Jaipur",
      type: "Wellness & Public Health",
      location: "Jaipur, Rajasthan",
      duration: "6 Months",
      stipendMonthly: 30000,
      matchScore: 84,
      eligibility: "BAMS / Swasthavritta",
      skills: ["Epidemiology", "Community Health", "NABH Guidelines"],
      isVerified: true,
    },
  ];

  return (
    <section id="opportunities" className="py-24 border-b border-border/60 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Verified Ayush Listings"
          title="Direct Academia–Industry Opportunity Matches"
          subtitle="Opportunities algorithmically filtered by your Competency Passport. No generic job boards — verified clinical fellowships, research trials, and pharma postings."
          align="center"
        />

        {/* 3D Match Stream Toggle & Visualization */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowVisualizer(!showVisualizer)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-xs font-semibold text-foreground hover:border-primary/50 shadow-sm transition-all"
          >
            <Activity className="h-3.5 w-3.5 text-accent animate-pulse" />
            <span>{showVisualizer ? "Hide 3D Match Stream" : "Inspect 3D Competency-to-Industry Stream"}</span>
          </button>
        </div>

        {showVisualizer && (
          <div className="mt-6">
            <OpportunityConnection3D />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {opportunities.map((opp, idx) => (
            <RevealOnScroll key={opp.id} delay={idx * 0.05}>
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between h-full group">
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="default" size="sm">
                      {opp.type}
                    </Badge>

                    {/* Animated Match Percentage */}
                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      <Sparkles className="h-3 w-3 text-accent" />
                      <span>{opp.matchScore}% Skill Match</span>
                    </div>
                  </div>

                  {/* Title & Organization */}
                  <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {opp.title}
                  </h4>
                  <p className="text-xs font-medium text-muted-foreground mt-1 mb-4 flex items-center gap-1">
                    {opp.organization}
                    {opp.isVerified && (
                      <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                    )}
                  </p>

                  {/* Attributes */}
                  <div className="space-y-2 py-3 border-y border-border/50 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {opp.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-accent" />
                        {opp.duration}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 font-medium text-foreground">
                        <Banknote className="h-3.5 w-3.5 text-secondary" />
                        {formatINR(opp.stipendMonthly)} / mo
                      </span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" />
                        {opp.eligibility}
                      </span>
                    </div>
                  </div>

                  {/* Required Competencies */}
                  <div className="mt-4 flex flex-wrap gap-1 mb-5">
                    {opp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="pt-3 border-t border-border/50">
                  <Button
                    variant="gold"
                    size="sm"
                    className="w-full justify-between group/btn"
                    onClick={() => onApply?.(opp)}
                  >
                    <span>Apply with Passport</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
