"use client";

import * as React from "react";
import {
  Briefcase,
  Building2,
  TrendingUp,
  Clock,
  DollarSign,
  Award,
  Users,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import { AdminAnalyticsService } from "@/lib/services/adminAnalyticsService";

interface IndustryAnalyticsViewProps {
  analytics: ReturnType<AdminAnalyticsService["getIndustryAnalytics"]>;
  showToast: (msg: string) => void;
}

export function IndustryAnalyticsView({ analytics, showToast }: IndustryAnalyticsViewProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card variant="default" className="p-4 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
            Avg Time-To-Hire
          </span>
          <p className="text-2xl font-bold text-foreground">
            {analytics.averageTimeToHireDays} Days
          </p>
          <span className="text-[10px] text-emerald-600 font-medium">-40% vs Traditional Portals</span>
        </Card>

        <Card variant="default" className="p-4 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
            Shortlist-to-Offer Ratio
          </span>
          <p className="text-2xl font-bold text-primary">{analytics.shortlistToOfferRatio}</p>
          <span className="text-[10px] text-muted-foreground">High Skill Match Accuracy</span>
        </Card>

        <Card variant="default" className="p-4 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
            Active Corporate MoUs
          </span>
          <p className="text-2xl font-bold text-accent">{analytics.totalActiveCorporateMoUs}</p>
          <span className="text-[10px] text-muted-foreground">Pharma & Hospital Chains</span>
        </Card>

        <Card variant="default" className="p-4 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
            Sponsorship Volume
          </span>
          <p className="text-2xl font-bold text-emerald-600">
            {analytics.corporateSponsorshipVolume}
          </p>
          <span className="text-[10px] text-muted-foreground">Stipends & Research Grants</span>
        </Card>
      </div>

      {/* Sector Breakdown & Top Hiring Leaders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Industry Sector Breakdown */}
        <Card variant="default" className="p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" /> Sector-wise Demand Distribution
              </h4>
              <p className="text-xs text-muted-foreground">
                Where verified Ayurvedic talent is being deployed
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {analytics.industrySectors.map((sec) => (
              <div
                key={sec.sector}
                className="p-3.5 rounded-xl border border-border bg-card space-y-2"
              >
                <div className="flex justify-between items-start text-xs">
                  <div>
                    <h5 className="font-bold text-foreground">{sec.sector}</h5>
                    <span className="text-[11px] text-muted-foreground">
                      Top Demanded: <strong>{sec.topSkillDemanded}</strong>
                    </span>
                  </div>
                  <Badge variant="verified" size="sm">
                    {sec.percentage}% of Hiring
                  </Badge>
                </div>

                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all"
                    style={{ width: `${sec.percentage * 2}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-muted-foreground pt-1">
                  <span>{sec.activePostings} Open Vacancies</span>
                  <span className="font-semibold text-foreground">
                    Avg Monthly Stipend: {sec.avgStipendMonthly}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Recruiter Leaderboard */}
        <Card variant="default" className="p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-secondary" /> Top Ayush Recruiter Roster
                </h4>
                <p className="text-xs text-muted-foreground">
                  Leading enterprises actively hiring via Ayu-Setu Competency Passports
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {analytics.topHiringEnterprises.map((emp, i) => (
                <div
                  key={emp.name}
                  className="p-3 rounded-xl border border-border bg-muted/30 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <span className="font-bold text-foreground block">{emp.name}</span>
                      <span className="text-[10px] text-muted-foreground">
                        Candidate Satisfaction: {emp.rating}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-emerald-600 block">
                      {emp.activeHires} Hires
                    </span>
                    <span className="text-[10px] text-muted-foreground">This Academic Year</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-muted-foreground flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>
              All recruiter credentials, GSTIN, and Schedule Y compliance verified by Ministry of Ayush.
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
