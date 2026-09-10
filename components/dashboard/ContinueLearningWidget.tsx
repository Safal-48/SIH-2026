"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpen, Play, Clock, CheckCircle2, Award, Sparkles, ArrowRight, AlertTriangle } from "lucide-react";
import { Card } from "@/components/cards/Card";
import { Card3DTilt } from "@/components/animations/Card3DTilt";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

export interface LearningModule {
  id: string;
  title: string;
  sanskrit: string;
  category: string;
  gapBridges: string;
  currentStageNumber: number;
  currentStageLabel: string;
  progress: number; // 0-100
  estimatedRemainingTime: string;
}

export const ACTIVE_LEARNING_MODULES: LearningModule[] = [
  {
    id: "case-documentation",
    title: "Case Documentation",
    sanskrit: "Rugna Vrittanta Nirmana",
    category: "Clinical Documentation",
    gapBridges: "Critical: Clinical Documentation",
    currentStageNumber: 2,
    currentStageLabel: "Learning Module (SOP)",
    progress: 45,
    estimatedRemainingTime: "18 mins remaining",
  },
  {
    id: "panchakarma-safety",
    title: "Panchakarma Safety",
    sanskrit: "Shodhana Suraksha Vidhi",
    category: "Panchakarma Safety",
    gapBridges: "Procedure: Snehavyapat Triage",
    currentStageNumber: 3,
    currentStageLabel: "3-Question Quiz Check",
    progress: 50,
    estimatedRemainingTime: "15 mins remaining",
  },
  {
    id: "research-protocols",
    title: "Research Protocols",
    sanskrit: "Anusandhana Vidhi",
    category: "Research & Bioethics",
    gapBridges: "Moderate: Research Documentation",
    currentStageNumber: 1,
    currentStageLabel: "Skill Gap Origin",
    progress: 20,
    estimatedRemainingTime: "20 mins remaining",
  },
];

interface ContinueLearningWidgetProps {
  modules?: LearningModule[];
  onResume?: (moduleId: string) => void;
}

export function ContinueLearningWidget({
  modules = ACTIVE_LEARNING_MODULES,
  onResume,
}: ContinueLearningWidgetProps) {
  return (
    <Card id="learning" variant="default" className="p-6 space-y-5 border-border shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-secondary/15 text-secondary border border-secondary/30">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground tracking-tight">
              Guided Learning Pipeline
            </h3>
            <p className="text-xs text-muted-foreground">
              Skill Gap → Learning → 3-Q Quiz → Micro Task → Mentor → Competency
            </p>
          </div>
        </div>

        <Link
          href="/student/learning"
          className="text-xs font-semibold text-accent hover:underline flex items-center gap-1 shrink-0"
        >
          <span>All Modules</span>
          <span>→</span>
        </Link>
      </div>

      {/* 3 Module Cards with 3D Tilt */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modules.map((mod) => (
          <Card3DTilt key={mod.id} glareColor="gold" maxTilt={6} scale={1.02} className="h-full">
            <div className="p-4 rounded-2xl bg-card/90 backdrop-blur-md border border-border flex flex-col justify-between h-full space-y-3 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all group ayur-3d-card">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-rose-500 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/25 truncate shadow-sm">
                    {mod.gapBridges}
                  </span>
                  <span className="text-xs font-mono font-bold text-accent shrink-0 px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20">
                    {mod.progress}%
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                    <span>{mod.title}</span>
                  </h4>
                  <p className="text-[10px] text-accent font-serif italic tracking-wide">
                    {mod.sanskrit}
                  </p>
                </div>

                {/* Progress Bar with glowing Ayurvedic gradient */}
                <div className="space-y-1.5 pt-1">
                  <ProgressBar value={mod.progress} variant="gradient" size="sm" />
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span className="font-semibold text-foreground flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Stage {mod.currentStageNumber}/6: {mod.currentStageLabel}
                    </span>
                    <span>{mod.estimatedRemainingTime}</span>
                  </div>
                </div>

                {/* Stage Snapshot */}
                <div className="p-2.5 rounded-xl bg-muted/40 border border-border/60 text-xs flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground font-mono">
                    Closed-Loop Stage 0{mod.currentStageNumber}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Active Pipeline
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <Link href={`/student/learning/${mod.id}`} className="block pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  rightIcon={<ArrowRight className="h-3 w-3 text-accent group-hover:translate-x-1 transition-transform" />}
                  className="w-full justify-center group-hover:border-accent group-hover:bg-accent/5 text-xs font-semibold"
                >
                  Launch Pipeline
                </Button>
              </Link>
            </div>
          </Card3DTilt>
        ))}
      </div>
    </Card>
  );
}
