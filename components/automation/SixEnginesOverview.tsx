"use client";

import * as React from "react";
import {
  Cpu,
  Zap,
  Activity,
  CheckCircle2,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/cards/Card";
import { SmartEngineDefinition } from "@/lib/services/smartAutomationService";

interface SixEnginesOverviewProps {
  engines: SmartEngineDefinition[];
}

export function SixEnginesOverview({ engines }: SixEnginesOverviewProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Cpu className="h-4 w-4 text-primary" /> The 6 Smart Automation Engines
          </h3>
          <p className="text-xs text-muted-foreground">
            Distributed micro-engine architecture driving predictive matching, automated remediation, and closed-loop market ingestion
          </p>
        </div>
        <Badge variant="verified" size="sm">
          All 6 Engines Online
        </Badge>
      </div>

      {/* 6 Engines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {engines.map((eng) => (
          <Card
            key={eng.id}
            variant="default"
            className="p-5 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                      {eng.engineNumber}
                    </span>
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                      Engine {eng.engineNumber}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-foreground leading-tight">
                    {eng.name}
                  </h4>
                </div>
                <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                  {eng.telemetry.avgLatencyMs}ms
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">{eng.description}</p>

              {/* Technical Algorithm */}
              <div className="p-2.5 rounded-xl bg-muted/40 border border-border text-xs space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Core Algorithm / Heuristic
                </span>
                <p className="font-semibold text-foreground text-[11px] leading-snug">
                  {eng.algorithm}
                </p>
              </div>

              {/* Input Feeds & Outputs */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Input Feeds
                </span>
                <ul className="space-y-1 text-[11px] text-muted-foreground">
                  {eng.inputFeeds.map((feed, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{feed}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Telemetry Stats */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/80 text-xs">
                <div>
                  <span className="text-[10px] text-muted-foreground">Throughput</span>
                  <p className="font-bold text-foreground">{eng.telemetry.processedCount}</p>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground">Accuracy</span>
                  <p className="font-bold text-emerald-600">{eng.telemetry.accuracyRate}</p>
                </div>
              </div>
            </div>

            {/* Stakeholder Beneficiaries */}
            <div className="pt-2 border-t border-border/80 flex flex-wrap gap-1">
              {eng.stakeholderBeneficiaries.map((stk) => (
                <span
                  key={stk}
                  className="px-2 py-0.5 rounded-md bg-muted text-[10px] text-muted-foreground font-medium"
                >
                  {stk}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
