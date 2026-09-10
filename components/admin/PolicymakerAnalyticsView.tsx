"use client";

import * as React from "react";
import {
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  MapPin,
  FileCheck2,
  Award,
  AlertTriangle,
  Download,
  ExternalLink,
  ChevronRight,
  Server,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import { AdminAnalyticsService } from "@/lib/services/adminAnalyticsService";

interface PolicymakerAnalyticsViewProps {
  analytics: ReturnType<AdminAnalyticsService["getPolicymakerAnalytics"]>;
  showToast: (msg: string) => void;
}

export function PolicymakerAnalyticsView({ analytics, showToast }: PolicymakerAnalyticsViewProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Policy Top KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card variant="default" className="p-4 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
            AYUSH Grid EHR Adoption
          </span>
          <p className="text-2xl font-bold text-primary">{analytics.nationalAyushGridAdoption}%</p>
          <span className="text-[10px] text-emerald-600 font-medium">SNOMED / ICD-11 Standardized</span>
        </Card>

        <Card variant="default" className="p-4 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
            Annual Ayush Graduates
          </span>
          <p className="text-2xl font-bold text-foreground">
            {analytics.totalAyushWorkforceEmployedAnnual.toLocaleString()}
          </p>
          <span className="text-[10px] text-muted-foreground">Certified Practitioners</span>
        </Card>

        <Card variant="default" className="p-4 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
            Research Grants Disbursed
          </span>
          <p className="text-2xl font-bold text-emerald-600">
            {analytics.nationalResearchGrantDisbursed}
          </p>
          <span className="text-[10px] text-muted-foreground">ICMR, CCRAS & MoA Funds</span>
        </Card>

        <Card variant="default" className="p-4 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
            Patent Yield
          </span>
          <p className="text-2xl font-bold text-secondary">
            {analytics.nationalPatentYieldCount} Patents
          </p>
          <span className="text-[10px] text-muted-foreground">Formulations & AI Diagnostic IP</span>
        </Card>
      </div>

      {/* State-Wise Ayush Workforce Readiness Telemetry */}
      <Card variant="default" className="p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
          <div>
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> State-wise Healthcare Workforce Readiness Index
            </h4>
            <p className="text-xs text-muted-foreground">
              Real-time telemetry across premier state Ayurvedic educational ecosystems
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="text-xs shrink-0"
            onClick={() => showToast("Exporting National State-wise Workforce Telemetry...")}
            leftIcon={<Download className="h-3.5 w-3.5" />}
          >
            Export National Map
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {analytics.stateWorkforceDistribution.map((state) => (
            <div
              key={state.state}
              className="p-3.5 rounded-xl border border-border bg-card space-y-2.5 hover:border-primary/40 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-bold text-foreground text-sm">{state.state}</h5>
                  <span className="text-[10px] text-muted-foreground">
                    {state.totalInstitutions} Colleges • {state.graduatingScholars.toLocaleString()} Scholars
                  </span>
                </div>
                <Badge
                  variant={
                    state.readinessIndex >= 88
                      ? "verified"
                      : state.readinessIndex >= 84
                      ? "gold"
                      : "warning"
                  }
                  size="sm"
                >
                  {state.readinessIndex}% Readiness
                </Badge>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted-foreground">Ayush Grid Adoption</span>
                  <span className="font-semibold text-foreground">{state.ayushGridCompliance}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: `${state.ayushGridCompliance}%` }}
                  />
                </div>
              </div>

              <div className="text-[11px] text-muted-foreground pt-1 border-t border-border/80">
                Dominant Sector: <strong>{state.dominantSector}</strong>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Statutory Policy & Curriculum Directives */}
      <Card variant="default" className="p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div>
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-rose-500" /> Statutory Curriculum Directives & Policy Early-Warning System
            </h4>
            <p className="text-xs text-muted-foreground">
              Automated policy interventions generated by national skill supply-demand disparities
            </p>
          </div>
          <Badge variant="destructive" size="sm">
            {analytics.statutoryCurriculumAlerts.length} Action Items
          </Badge>
        </div>

        <div className="space-y-3">
          {analytics.statutoryCurriculumAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={alert.severity === "URGENT" ? "destructive" : "warning"}
                      size="sm"
                    >
                      {alert.severity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs font-semibold text-primary">
                      Directive for: {alert.statutoryTarget}
                    </span>
                  </div>
                  <h5 className="text-sm font-bold text-foreground">{alert.title}</h5>
                </div>

                <span className="text-xs text-muted-foreground shrink-0">
                  Affects: <strong>{alert.affectedScholarsCount.toLocaleString()} Scholars</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg bg-muted/40 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">
                    Empirical Ground Evidence
                  </span>
                  <p className="text-muted-foreground leading-relaxed">{alert.evidence}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-0.5">
                    Proposed Statutory Mandate
                  </span>
                  <p className="text-foreground font-medium leading-relaxed">
                    {alert.proposedIntervention}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => showToast(`✓ Dispatched policy brief to ${alert.statutoryTarget}`)}
                >
                  Issue Ministry Gazetted Directive
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
