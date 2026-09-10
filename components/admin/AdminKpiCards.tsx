"use client";

import * as React from "react";
import {
  Users,
  Building2,
  Briefcase,
  FlaskConical,
  Award,
  CheckCircle2,
  TrendingUp,
  GraduationCap,
  Layers,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/cards/Card";
import { AdminKpiMetrics } from "@/lib/services/adminAnalyticsService";

interface AdminKpiCardsProps {
  metrics: AdminKpiMetrics;
  onFilterClick?: (metricKey: string) => void;
}

export function AdminKpiCards({ metrics, onFilterClick }: AdminKpiCardsProps) {
  const cards = [
    {
      key: "students",
      label: "Total Students",
      value: metrics.totalStudents.toLocaleString(),
      subtext: "BAMS, MD & PhD Scholars",
      growth: "+14.2% YoY",
      icon: <GraduationCap className="h-4 w-4" />,
      colorClass: "text-primary bg-primary/10 border-primary/20",
    },
    {
      key: "institutions",
      label: "Total Institutions",
      value: metrics.totalInstitutions.toLocaleString(),
      subtext: "NCISM / NCH Accredited",
      growth: "+8.6% YoY",
      icon: <Building2 className="h-4 w-4" />,
      colorClass: "text-secondary bg-secondary/10 border-secondary/20",
    },
    {
      key: "industry",
      label: "Industry Partners",
      value: metrics.industryPartners.toLocaleString(),
      subtext: "Pharma, Hospitals & R&D",
      growth: "+22.4% YoY",
      icon: <Briefcase className="h-4 w-4" />,
      colorClass: "text-accent bg-accent/10 border-accent/20",
    },
    {
      key: "internships",
      label: "Internships",
      value: metrics.internships.toLocaleString(),
      subtext: "Clinical & Sabbaticals",
      growth: "+19.1% YoY",
      icon: <Layers className="h-4 w-4" />,
      colorClass: "text-blue-600 bg-blue-500/10 border-blue-500/20",
    },
    {
      key: "research",
      label: "Research Projects",
      value: metrics.researchProjects.toLocaleString(),
      subtext: "Joint MoUs & Live Grants",
      growth: "+31.5% YoY",
      icon: <FlaskConical className="h-4 w-4" />,
      colorClass: "text-purple-600 bg-purple-500/10 border-purple-500/20",
    },
    {
      key: "jobs",
      label: "Jobs",
      value: metrics.jobs.toLocaleString(),
      subtext: "Verified Ayush Vacancies",
      growth: "+16.8% YoY",
      icon: <Award className="h-4 w-4" />,
      colorClass: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      key: "competencies",
      label: "Verified Competencies",
      value: metrics.verifiedCompetencies.toLocaleString(),
      subtext: "Digital Logbook Passports",
      growth: "+44.0% YoY",
      icon: <ShieldCheck className="h-4 w-4" />,
      colorClass: "text-amber-600 bg-amber-500/10 border-amber-500/20",
    },
    {
      key: "placements",
      label: "Placement Outcomes",
      value: `${metrics.placementOutcomes}%`,
      subtext: "Residency & Hiring Rate",
      growth: "+6.2% YoY",
      icon: <TrendingUp className="h-4 w-4" />,
      colorClass: "text-rose-600 bg-rose-500/10 border-rose-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 animate-in fade-in duration-300">
      {cards.map((card) => (
        <Card
          key={card.key}
          variant="interactive"
          className="p-3.5 space-y-1 text-center cursor-pointer hover:border-primary/50 transition-all flex flex-col justify-between"
          onClick={() => onFilterClick && onFilterClick(card.key)}
        >
          <div>
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-1.5 border ${card.colorClass}`}
            >
              {card.icon}
            </div>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block truncate">
              {card.label}
            </span>
            <p className="text-xl font-bold text-foreground mt-0.5">{card.value}</p>
          </div>

          <div className="pt-1 border-t border-border/60">
            <span className="text-[10px] text-emerald-600 font-medium block">
              {card.growth}
            </span>
            <span className="text-[9px] text-muted-foreground truncate block">
              {card.subtext}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
