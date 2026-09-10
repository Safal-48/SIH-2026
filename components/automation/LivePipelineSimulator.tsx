"use client";

import * as React from "react";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Terminal,
  ShieldCheck,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import {
  PipelineStageInfo,
  SimulationStepRecord,
} from "@/lib/services/smartAutomationService";

interface LivePipelineSimulatorProps {
  stages: PipelineStageInfo[];
  simulationSteps: SimulationStepRecord[];
  showToast: (msg: string) => void;
}

export function LivePipelineSimulator({
  stages,
  simulationSteps: initialSteps,
  showToast,
}: LivePipelineSimulatorProps) {
  const [isRunning, setIsRunning] = React.useState(false);
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(0);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);
  const [logs, setLogs] = React.useState<string[]>([]);

  // Simulation timer runner
  React.useEffect(() => {
    let timer: any;
    if (isRunning && currentStepIndex < stages.length) {
      timer = setTimeout(() => {
        const stage = stages[currentStepIndex];
        setCompletedSteps((prev) => [...prev, currentStepIndex]);
        setLogs((prev) => [
          `[T+${(currentStepIndex + 1) * 1.2}s] STAGE ${stage.stepNumber}: ${stage.name.toUpperCase()} -> ${stage.outputArtifact}`,
          ...prev,
        ]);

        if (currentStepIndex + 1 < stages.length) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsRunning(false);
          showToast("✓ End-to-End Smart Automation Pipeline Completed! Scholar Placed.");
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentStepIndex, stages, showToast]);

  const handleStartSimulation = () => {
    setCompletedSteps([]);
    setCurrentStepIndex(0);
    setLogs(["[T+0.0s] PIPELINE INITIALIZED: Loading Dr. Aarav Sharma (MD Ayurveda) Profile..."]);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCompletedSteps([]);
    setCurrentStepIndex(0);
    setLogs([]);
  };

  const progressPercentage = Math.round(((completedSteps.length) / stages.length) * 100);

  return (
    <Card variant="default" className="p-6 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-600 flex items-center justify-center font-bold text-sm">
              ▶️
            </span>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Live End-to-End Pipeline Simulator
              </h3>
              <p className="text-xs text-muted-foreground">
                Watch raw assessment data flow through all 6 engines to final career residency placement
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isRunning ? (
            <Button variant="outline" size="sm" className="text-xs" disabled>
              <Clock className="h-3.5 w-3.5 mr-1 animate-spin" /> Executing Pipeline ({progressPercentage}%)
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              className="text-xs font-bold"
              onClick={handleStartSimulation}
              leftIcon={<Play className="h-3.5 w-3.5 fill-current" />}
            >
              {completedSteps.length > 0 ? "Re-Run Pipeline Simulation" : "Run End-to-End Automation Pipeline"}
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={handleReset}
            disabled={isRunning || completedSteps.length === 0}
            leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-muted-foreground">End-to-End Automation Trajectory</span>
          <span className="font-mono text-primary">{progressPercentage}% Completed</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary via-secondary to-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* 10-Stage Visual Tracker */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {stages.map((stg, i) => {
          const isDone = completedSteps.includes(i);
          const isCurrent = isRunning && currentStepIndex === i;

          return (
            <div
              key={stg.id}
              className={`p-3 rounded-xl border text-xs space-y-1.5 transition-all ${
                isDone
                  ? "bg-emerald-500/10 border-emerald-500/30 text-foreground"
                  : isCurrent
                  ? "bg-primary/10 border-primary ring-1 ring-primary text-foreground animate-pulse"
                  : "bg-card border-border text-muted-foreground"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold">
                  {stg.stepNumber}. {stg.shortLabel}
                </span>
                {isDone ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                ) : isCurrent ? (
                  <Clock className="h-3.5 w-3.5 text-primary animate-spin" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                )}
              </div>
              <p className="text-[10px] line-clamp-1 font-semibold">{stg.name}</p>
            </div>
          );
        })}
      </div>

      {/* Live Console Output Terminal */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5" /> Pipeline Live Execution Log
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">
            {logs.length} events logged
          </span>
        </div>

        <div className="p-4 rounded-xl bg-muted/80 text-foreground font-mono text-[11px] h-48 overflow-y-auto border border-border space-y-1.5 flex flex-col-reverse">
          {logs.length === 0 ? (
            <span className="text-muted-foreground">
              Ready. Click &quot;Run End-to-End Automation Pipeline&quot; above to start live simulation.
            </span>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold shrink-0">❯</span>
                <span className={index === 0 ? "text-primary font-bold" : "text-muted-foreground"}>
                  {log}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}
