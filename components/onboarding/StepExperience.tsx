"use client";

import * as React from "react";
import { Briefcase, Check, Sparkles, CheckCheck, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  StudentExposureOption,
  StudentOnboardingData,
} from "@/types/entities";
import { EXPOSURE_OPTIONS } from "@/lib/services/studentOnboarding";
import { cn } from "@/lib/utils/cn";

interface StepExperienceProps {
  data: StudentOnboardingData;
  onChange: (updates: Partial<StudentOnboardingData>) => void;
  errors?: Record<string, string>;
}

export function StepExperience({ data, onChange, errors }: StepExperienceProps) {
  const selectedExposures = data.previousExposures || [];

  const handleToggle = (id: StudentExposureOption) => {
    if (selectedExposures.includes(id)) {
      onChange({
        previousExposures: selectedExposures.filter((item) => item !== id),
      });
    } else {
      onChange({
        previousExposures: [...selectedExposures, id],
      });
    }
  };

  const handleSelectAll = () => {
    onChange({
      previousExposures: EXPOSURE_OPTIONS.map((o) => o.id),
    });
  };

  const handleClearAll = () => {
    onChange({
      previousExposures: [],
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">
          <Briefcase className="h-3.5 w-3.5" /> Stage 02: Previous Exposure & Practical Training
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-sans">
            Which Ayurvedic environments have you experienced?
          </h2>
          <Badge variant="gold" size="sm">
            {selectedExposures.length} of {EXPOSURE_OPTIONS.length} Selected
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Select all that apply. Your hands-on background guides which competency levels you can attest and match with top residencies.
        </p>
      </div>

      {/* Action Utilities */}
      <div className="flex items-center justify-end gap-2 text-xs">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleSelectAll}
          leftIcon={<CheckCheck className="h-3.5 w-3.5 text-primary" />}
        >
          Select All
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          leftIcon={<RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />}
        >
          Clear
        </Button>
      </div>

      {/* Grid of Exposure Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {EXPOSURE_OPTIONS.map((exp) => {
          const isSelected = selectedExposures.includes(exp.id);

          return (
            <div
              key={exp.id}
              onClick={() => handleToggle(exp.id)}
              className={cn(
                "p-4 rounded-2xl border text-left cursor-pointer transition-all relative flex flex-col justify-between group",
                isSelected
                  ? "bg-card border-accent/60 shadow-lg shadow-accent/10 ring-2 ring-accent/30"
                  : "bg-card/60 border-border hover:bg-muted/60 hover:border-primary/40"
              )}
            >
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{exp.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {exp.title}
                    </h4>
                    <span className="text-[10px] font-medium font-serif italic text-accent">
                      {exp.sanskrit}
                    </span>
                  </div>
                </div>

                <div
                  className={cn(
                    "w-5 h-5 rounded-lg border flex items-center justify-center transition-all shrink-0",
                    isSelected
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-muted-foreground/40 group-hover:border-primary"
                  )}
                >
                  {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {exp.description}
              </p>
            </div>
          );
        })}
      </div>

      {errors?.previousExposures && (
        <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium">
          {errors.previousExposures}
        </div>
      )}

      {/* Fresher note */}
      <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 text-xs text-muted-foreground flex items-center justify-between">
        <span>Are you a 1st or 2nd year student with no hospital rotations yet?</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onChange({ previousExposures: [] })}
          className="text-xs shrink-0 ml-2"
        >
          Proceed as Fresher
        </Button>
      </div>
    </div>
  );
}
