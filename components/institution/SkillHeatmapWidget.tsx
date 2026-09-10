"use client";

import * as React from "react";
import {
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Info,
  Building2,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/cards/Card";
import { SkillDomainScore } from "@/lib/services/institutionPortalService";

interface SkillHeatmapWidgetProps {
  heatmap: SkillDomainScore[];
}

export function SkillHeatmapWidget({ heatmap }: SkillHeatmapWidgetProps) {
  const [selectedCohort, setSelectedCohort] = React.useState<string>("All Cohorts (320 Scholars)");
  const [expandedDomain, setExpandedDomain] = React.useState<string | null>("Documentation");

  return (
    <Card variant="default" className="p-6 space-y-6">
      {/* Header & Cohort Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
              📊
            </span>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Institutional Cohort Skill Heatmap
              </h3>
              <p className="text-xs text-muted-foreground">
                Aggregated real-time competency telemetry across 320 enrolled BAMS, MD & PhD scholars
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          <select
            value={selectedCohort}
            onChange={(e) => setSelectedCohort(e.target.value)}
            className="text-xs font-semibold p-2 rounded-xl bg-muted/50 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="All Cohorts (320 Scholars)">All Cohorts (320 Scholars)</option>
            <option value="BAMS Final Year (120 Scholars)">BAMS Final Year (120 Scholars)</option>
            <option value="MD Ayurveda 1st Year (60 Scholars)">MD Ayurveda 1st Year (60 Scholars)</option>
            <option value="MD Ayurveda Final Year (80 Scholars)">MD Ayurveda Final Year (80 Scholars)</option>
            <option value="PhD Research Scholars (60 Scholars)">PhD Research Scholars (60 Scholars)</option>
          </select>
        </div>
      </div>

      {/* Main Heatmap Rows */}
      <div className="space-y-4">
        {heatmap.map((item) => {
          const isExpanded = expandedDomain === item.domain;
          const isSurplus = item.deficitPercentage <= 0;

          return (
            <div
              key={item.domain}
              className="p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl shrink-0">{item.badgeEmoji}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-foreground tracking-tight">
                        {item.domain}
                      </h4>
                      <Badge
                        variant={
                          item.status === "HIGH"
                            ? "verified"
                            : item.status === "MODERATE"
                            ? "warning"
                            : "destructive"
                        }
                        size="sm"
                      >
                        {item.status === "HIGH"
                          ? "Industry Ready"
                          : item.status === "MODERATE"
                          ? "Emerging Gap"
                          : "Critical Deficit"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">Cohort Score</span>
                    <p className="text-2xl font-bold" style={{ color: item.colorHex }}>
                      {item.score}%
                    </p>
                  </div>

                  <div className="text-right border-l border-border pl-3">
                    <span className="text-[10px] text-muted-foreground block">Recruiter Standard</span>
                    <span className="text-xs font-semibold text-foreground">
                      {item.industryBenchmark}%
                    </span>
                    <span
                      className={`text-[10px] font-bold block ${
                        isSurplus ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {isSurplus
                        ? `+${Math.abs(item.deficitPercentage)}% Surplus`
                        : `-${item.deficitPercentage}% Deficit`}
                    </span>
                  </div>

                  <button
                    onClick={() => setExpandedDomain(isExpanded ? null : item.domain)}
                    className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Progress Bar with Benchmark Marker */}
              <div className="relative pt-1">
                <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.score}%`,
                      backgroundColor: item.colorHex,
                    }}
                  />
                </div>

                {/* Industry Benchmark Target Marker */}
                <div
                  className="absolute top-0 w-0.5 h-4 bg-foreground/60 -translate-x-1/2"
                  style={{ left: `${item.industryBenchmark}%` }}
                  title={`Industry Recruiter Benchmark: ${item.industryBenchmark}%`}
                />
              </div>

              {/* Expanded Sub-competencies Drilldown */}
              {isExpanded && (
                <div className="pt-3 border-t border-border/80 space-y-2.5 animate-in fade-in">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                    <span>Sub-Competency Practicums</span>
                    <span>Cohort vs Recruiter Minimum</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.subCompetencies.map((sub, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg bg-muted/40 border border-border/60 flex items-center justify-between text-xs"
                      >
                        <span className="font-medium text-foreground">{sub.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold" style={{ color: item.colorHex }}>
                            {sub.score}%
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            / {sub.benchmark}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend & Guide */}
      <div className="pt-2 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span>🟢</span> <strong>High Readiness (&gt;75%)</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <span>🟡</span> <strong>Moderate (60-74%)</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <span>🔴</span> <strong>Critical Deficit (&lt;60%)</strong>
          </span>
        </div>

        <span className="text-[11px] font-mono">
          Threshold benchmarked against NCISM & Top 10 Ayush Employers
        </span>
      </div>
    </Card>
  );
}
