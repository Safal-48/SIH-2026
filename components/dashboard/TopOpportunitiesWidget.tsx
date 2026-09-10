"use client";

import * as React from "react";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Banknote,
  ExternalLink,
} from "lucide-react";
import { Card } from "@/components/cards/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils/formatters";

export interface RecommendedOpportunity {
  id: string;
  title: string;
  organization: string;
  overallMatch: number;
  skillMatch: number;
  careerMatch: number;
  eligibilityMatch: number;
  locationMatch: number;
  location: string;
  duration: string;
  stipendMonthly: number;
  type: string;
  verified: boolean;
  requiredSkills: string[];
}

export const TOP_3_OPPORTUNITIES: RecommendedOpportunity[] = [
  {
    id: "opp-aiia-clinical",
    title: "Clinical Research Residency in Metabolic Disorders",
    organization: "All India Institute of Ayurveda (AIIA), New Delhi",
    overallMatch: 89,
    skillMatch: 92,
    careerMatch: 88,
    eligibilityMatch: 100,
    locationMatch: 80,
    location: "Sarita Vihar, New Delhi",
    duration: "6 Months",
    stipendMonthly: 35000,
    type: "Clinical Internship",
    verified: true,
    requiredSkills: ["Clinical Documentation", "Case History", "Panchakarma Safety"],
  },
  {
    id: "opp-ccras-trial",
    title: "Evidence-Based Clinical Trial Fellowship",
    organization: "Central Council for Research in Ayurvedic Sciences (CCRAS)",
    overallMatch: 92,
    skillMatch: 90,
    careerMatch: 94,
    eligibilityMatch: 100,
    locationMatch: 85,
    location: "Janakpuri, New Delhi",
    duration: "12 Months",
    stipendMonthly: 42000,
    type: "R&D Fellowship",
    verified: true,
    requiredSkills: ["Research Project", "Clinical Documentation", "GCP-Ayush"],
  },
  {
    id: "opp-kottakkal-panchakarma",
    title: "Classical Kerala Panchakarma & Shodhana Immersion",
    organization: "Arya Vaidya Sala (AVS), Kottakkal",
    overallMatch: 90,
    skillMatch: 94,
    careerMatch: 92,
    eligibilityMatch: 100,
    locationMatch: 75,
    location: "Kottakkal, Kerala",
    duration: "4 Months",
    stipendMonthly: 32000,
    type: "Panchakarma Residency",
    verified: true,
    requiredSkills: ["Panchakarma Safety", "Case History", "Shodhana Protocols"],
  },
];

interface TopOpportunitiesWidgetProps {
  opportunities?: RecommendedOpportunity[];
  onApply?: (opp: RecommendedOpportunity) => void;
}

export function TopOpportunitiesWidget({
  opportunities = TOP_3_OPPORTUNITIES,
  onApply,
}: TopOpportunitiesWidgetProps) {
  return (
    <Card id="opportunities" variant="default" className="p-6 space-y-5 border-border shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-accent/15 text-accent border border-accent/30">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground tracking-tight">
              Top Recommended Opportunities
            </h3>
            <p className="text-xs text-muted-foreground">
              Direct matches filtered by your Career DNA, clinical hours, and verified competencies
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="gold" size="sm" icon={<Sparkles className="h-3 w-3" />}>
            Smart Matched
          </Badge>
          <Link href="/student/opportunities">
            <Button variant="outline" size="sm" rightIcon={<ExternalLink className="h-3.5 w-3.5" />} className="text-xs">
              View All (6)
            </Button>
          </Link>
        </div>
      </div>

      {/* 3 Opportunity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="p-5 rounded-2xl bg-card border border-border flex flex-col justify-between space-y-4 hover:border-primary/50 hover:shadow-lg transition-all group"
          >
            <div className="space-y-3">
              {/* Top Badges: Type, Verified, and Match % */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant="outline" size="sm" className="text-[10px]">
                    {opp.type}
                  </Badge>
                  {opp.verified && (
                    <Badge variant="verified" size="sm" icon={<ShieldCheck className="h-3 w-3" />}>
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-mono font-bold text-xs shrink-0">
                  {opp.overallMatch}% Match
                </div>
              </div>

              {/* Title & Organization */}
              <div>
                <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {opp.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {opp.organization}
                </p>
              </div>

              {/* Visible 4-part Breakdown Bars (Prompt requirement) */}
              <div className="p-2.5 rounded-xl bg-muted/40 border border-border/70 space-y-1.5 text-[11px]">
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-[10px]">Skill:</span>
                    <span className="font-bold text-emerald-600 font-mono">{opp.skillMatch}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-[10px]">Career:</span>
                    <span className="font-bold text-secondary font-mono">{opp.careerMatch}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-[10px]">Eligible:</span>
                    <span className="font-bold text-foreground font-mono">{opp.eligibilityMatch}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-[10px]">Location:</span>
                    <span className="font-bold text-accent font-mono">{opp.locationMatch}%</span>
                  </div>
                </div>
              </div>

              {/* Meta: Location, Duration, Stipend */}
              <div className="space-y-1 text-xs text-muted-foreground pt-1 border-t border-border/40">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span className="truncate">{opp.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>{opp.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-foreground">
                    <Banknote className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{formatINR(opp.stipendMonthly)}/mo</span>
                  </div>
                </div>
              </div>

              {/* Required Skills Chips */}
              <div className="flex flex-wrap gap-1 pt-1">
                {opp.requiredSkills.map((sk) => (
                  <span
                    key={sk}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Action Button linking to /student/opportunities */}
            <Link href="/student/opportunities">
              <Button
                type="button"
                variant="gold"
                size="sm"
                rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                className="w-full justify-center text-xs shadow-sm shadow-accent/15"
              >
                Apply via Setu Passport
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </Card>
  );
}
