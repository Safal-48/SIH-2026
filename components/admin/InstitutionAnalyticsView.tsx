"use client";

import * as React from "react";
import {
  Building2,
  Award,
  Clock,
  CheckCircle2,
  TrendingUp,
  Download,
  Search,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import { AdminAnalyticsService } from "@/lib/services/adminAnalyticsService";

interface InstitutionAnalyticsViewProps {
  analytics: ReturnType<AdminAnalyticsService["getInstitutionAnalytics"]>;
  showToast: (msg: string) => void;
}

export function InstitutionAnalyticsView({ analytics, showToast }: InstitutionAnalyticsViewProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredColleges = analytics.interCollegeLeaderboard.filter((col) =>
    col.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    col.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner & Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card variant="default" className="p-4 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
            Accredited Colleges
          </span>
          <p className="text-2xl font-bold text-foreground">
            {analytics.totalAccreditedColleges}
          </p>
          <span className="text-[10px] text-emerald-600 font-medium">Pan-India NCISM Network</span>
        </Card>

        <Card variant="default" className="p-4 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
            Grade A / A+ / A++ Colleges
          </span>
          <p className="text-2xl font-bold text-primary">
            {analytics.gradeADistributionPercentage}%
          </p>
          <span className="text-[10px] text-muted-foreground">High Quality Tier</span>
        </Card>

        <Card variant="default" className="p-4 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
            Avg Attestation Turnaround
          </span>
          <p className="text-2xl font-bold text-secondary">
            {analytics.averageAttestationTurnaroundDays} Days
          </p>
          <span className="text-[10px] text-muted-foreground">Digital Logbook Signing</span>
        </Card>

        <Card variant="default" className="p-4 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
            Feedback Loop Adoption
          </span>
          <p className="text-2xl font-bold text-emerald-600">
            {analytics.remedialFeedbackLoopAdoption}%
          </p>
          <span className="text-[10px] text-muted-foreground">Remedial Workshops Commissioned</span>
        </Card>
      </div>

      {/* Accreditation Distribution & Inter-College Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Accreditation Distribution Breakdown */}
        <Card variant="default" className="p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" /> NCISM Accreditation Ratings
            </h4>
            <span className="text-xs text-muted-foreground font-mono">540 Total</span>
          </div>

          <div className="space-y-3">
            {analytics.accreditationDistribution.map((item) => (
              <div key={item.grade} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-foreground">{item.grade}</span>
                  <span className="text-muted-foreground font-medium">
                    {item.count} Institutes ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: `${item.percentage * 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-border text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Accreditation Mandate:</span> All institutes must maintain digital competency passports to qualify for AYUSH Center of Excellence grants.
          </div>
        </Card>

        {/* Right 2 Cols: Inter-College National Benchmark Leaderboard */}
        <Card variant="default" className="lg:col-span-2 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
            <div>
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Building2 className="h-4 w-4 text-secondary" /> National Institutional Leaderboard
              </h4>
              <p className="text-xs text-muted-foreground">
                Ranked by NCISM accreditation score, scholar placement rate, and research output
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="text-xs shrink-0"
              onClick={() => showToast("Exporting National Institutional Leaderboard...")}
              leftIcon={<Download className="h-3.5 w-3.5" />}
            >
              Export CSV
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2.5 px-3 font-semibold">Institute</th>
                  <th className="py-2.5 px-3 font-semibold">NCISM Rating</th>
                  <th className="py-2.5 px-3 font-semibold">Enrolled</th>
                  <th className="py-2.5 px-3 font-semibold">Attestation Speed</th>
                  <th className="py-2.5 px-3 font-semibold">Placement Rate</th>
                  <th className="py-2.5 px-3 font-semibold">R&D Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredColleges.map((col, idx) => (
                  <tr key={col.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold text-[10px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <span className="font-bold text-foreground block line-clamp-1">{col.name}</span>
                          <span className="text-[10px] text-muted-foreground">{col.state}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant="verified" size="sm">
                        {col.ncismRating}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 font-medium text-foreground">{col.enrolledScholars}</td>
                    <td className="py-3 px-3 text-muted-foreground">{col.attestationSpeedDays} days</td>
                    <td className="py-3 px-3 font-bold text-emerald-600">{col.placementRate}%</td>
                    <td className="py-3 px-3 font-bold text-primary">{col.researchOutputScore}/100</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
