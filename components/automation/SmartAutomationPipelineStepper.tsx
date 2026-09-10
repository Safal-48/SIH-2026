"use client";

import * as React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Cpu,
  Layers,
  Database,
  Code2,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import { PipelineStageInfo } from "@/lib/services/smartAutomationService";

interface SmartAutomationPipelineStepperProps {
  stages: PipelineStageInfo[];
  selectedStageId: string;
  onSelectStage: (stageId: string) => void;
}

export function SmartAutomationPipelineStepper({
  stages,
  selectedStageId,
  onSelectStage,
}: SmartAutomationPipelineStepperProps) {
  const currentStage = stages.find((s) => s.id === selectedStageId) || stages[0];

  const actorBadges: Record<string, { label: string; emoji: string }> = {
    STUDENT: { label: "Scholar Action", emoji: "👨‍🎓" },
    AI_ENGINE: { label: "AI Smart Engine", emoji: "🤖" },
    FACULTY: { label: "Academic Guide", emoji: "👨‍🏫" },
    INDUSTRY: { label: "Industry Recruiter", emoji: "🏭" },
    INSTITUTION: { label: "College Directorate", emoji: "🏫" },
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 10-Stage Horizontal Stepper Bar */}
      <div className="overflow-x-auto no-scrollbar pb-2">
        <div className="flex items-center gap-1.5 min-w-[980px]">
          {stages.map((stage, idx) => {
            const isSelected = stage.id === selectedStageId;
            const isPast = stage.stepNumber < currentStage.stepNumber;

            return (
              <React.Fragment key={stage.id}>
                <button
                  onClick={() => onSelectStage(stage.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/25 ring-2 ring-primary/40"
                      : isPast
                      ? "bg-muted/80 text-foreground border-border hover:border-primary/40"
                      : "bg-card text-muted-foreground border-border hover:border-border/80 hover:text-foreground"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-primary-foreground text-primary"
                        : isPast
                        ? "bg-emerald-500 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isPast ? "✓" : stage.stepNumber}
                  </span>
                  <span>{stage.shortLabel}</span>
                </button>

                {idx < stages.length - 1 && (
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Deep-Dive Inspection Card */}
      <Card
        variant="default"
        className="p-6 border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-border">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold font-mono text-primary uppercase tracking-wider">
                Stage {currentStage.stepNumber} of 10
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <Badge variant="verified" size="sm">
                {actorBadges[currentStage.actor]?.emoji} {actorBadges[currentStage.actor]?.label}
              </Badge>
              <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                {currentStage.engineUsed}
              </Badge>
            </div>
            <h3 className="text-xl font-bold text-foreground mt-1">{currentStage.name}</h3>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link href={currentStage.deepLinkRoute}>
              <Button variant="primary" size="sm" className="text-xs shrink-0" rightIcon={<ExternalLink className="h-3.5 w-3.5" />}>
                {currentStage.deepLinkLabel}
              </Button>
            </Link>
          </div>
        </div>

        {/* 3-Column Architecture Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* 1. Input Feed */}
          <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5 text-primary" /> Input Data Feed
            </span>
            <p className="font-medium text-foreground leading-relaxed">{currentStage.inputData}</p>
          </div>

          {/* 2. Transformation Algorithm */}
          <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-secondary" /> Engine Transformation Logic
            </span>
            <p className="font-medium text-foreground leading-relaxed">{currentStage.transformationLogic}</p>
          </div>

          {/* 3. Output Artifact */}
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Output Artifact Generated
            </span>
            <p className="font-bold text-foreground leading-relaxed">{currentStage.outputArtifact}</p>
          </div>
        </div>

        {/* Live Payload Inspector (JSON) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Code2 className="h-3.5 w-3.5" /> Live Data Payload Snapshot (Stage {currentStage.stepNumber})
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">JSON Schema Verified</span>
          </div>

          <pre className="p-4 rounded-xl bg-muted/70 text-foreground font-mono text-[11px] overflow-x-auto border border-border">
            {JSON.stringify(currentStage.samplePayload, null, 2)}
          </pre>
        </div>
      </Card>
    </div>
  );
}
