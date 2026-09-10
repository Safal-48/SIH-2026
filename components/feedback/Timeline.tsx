import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface TimelineStep {
  id: string | number;
  title: string;
  description?: string;
  status: "completed" | "current" | "upcoming";
  date?: string;
  icon?: React.ReactNode;
}

export interface TimelineProps {
  steps: TimelineStep[];
  className?: string;
  orientation?: "vertical" | "horizontal";
}

export function Timeline({
  steps,
  className,
  orientation = "vertical",
}: TimelineProps) {
  if (orientation === "horizontal") {
    return (
      <div className={cn("w-full overflow-x-auto pb-4", className)}>
        <div className="flex items-start min-w-[700px] justify-between relative">
          <div className="absolute top-4 left-6 right-6 h-0.5 bg-border -z-0" />
          {steps.map((step, idx) => (
            <div key={step.id} className="flex flex-col items-center text-center relative z-10 flex-1 px-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ring-4 ring-background",
                  step.status === "completed" && "bg-primary text-primary-foreground",
                  step.status === "current" && "bg-accent text-accent-foreground ring-accent/30 animate-pulse",
                  step.status === "upcoming" && "bg-muted text-muted-foreground border border-border"
                )}
              >
                {step.status === "completed" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  step.icon || idx + 1
                )}
              </div>
              <h5 className="text-xs font-bold text-foreground mt-2">
                {step.title}
              </h5>
              {step.description && (
                <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                  {step.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border", className)}>
      {steps.map((step, idx) => (
        <div key={step.id} className="relative group">
          {/* Node dot */}
          <div
            className={cn(
              "absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ring-4 ring-background transition-colors",
              step.status === "completed" && "bg-primary text-primary-foreground",
              step.status === "current" && "bg-accent text-accent-foreground ring-accent/20",
              step.status === "upcoming" && "bg-muted text-muted-foreground border border-border"
            )}
          >
            {step.status === "completed" ? (
              <Check className="h-3 w-3" />
            ) : (
              step.icon || idx + 1
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h5 className="text-sm font-bold text-foreground">{step.title}</h5>
              {step.date && (
                <span className="text-[11px] text-muted-foreground font-medium">
                  • {step.date}
                </span>
              )}
            </div>
            {step.description && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
