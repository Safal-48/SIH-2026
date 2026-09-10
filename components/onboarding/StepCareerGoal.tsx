"use client";

import * as React from "react";
import { Target, Star, Check, Sparkles, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import {
  CareerGoalOption,
  StudentOnboardingData,
} from "@/types/entities";
import { CAREER_GOAL_OPTIONS } from "@/lib/services/studentOnboarding";
import { cn } from "@/lib/utils/cn";

interface StepCareerGoalProps {
  data: StudentOnboardingData;
  onChange: (updates: Partial<StudentOnboardingData>) => void;
  errors?: Record<string, string>;
}

export function StepCareerGoal({ data, onChange, errors }: StepCareerGoalProps) {
  const selectedInterests = data.careerInterests || [];
  const primaryGoal = data.primaryCareerGoal || selectedInterests[0] || "Clinical Practice";

  const handleToggleInterest = (id: CareerGoalOption) => {
    let nextInterests: CareerGoalOption[];
    if (selectedInterests.includes(id)) {
      // Don't allow deselecting if it is the only one or if it is the primary goal
      nextInterests = selectedInterests.filter((item) => item !== id);
      if (primaryGoal === id && nextInterests.length > 0) {
        onChange({
          careerInterests: nextInterests,
          primaryCareerGoal: nextInterests[0],
        });
        return;
      }
    } else {
      nextInterests = [...selectedInterests, id];
    }
    onChange({ careerInterests: nextInterests });
  };

  const handleSetPrimary = (e: React.MouseEvent, id: CareerGoalOption) => {
    e.stopPropagation();
    // Ensure it is also in interests
    const nextInterests = selectedInterests.includes(id)
      ? selectedInterests
      : [...selectedInterests, id];

    onChange({
      careerInterests: nextInterests,
      primaryCareerGoal: id,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/15 text-accent font-semibold text-xs">
          <Target className="h-3.5 w-3.5" /> Stage 03: Career Pathways & Ambition
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-sans">
            Where do you see your Ayurvedic journey leading?
          </h2>
          <Badge variant="gold" size="sm">
            {selectedInterests.length} Selected
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Select all career tracks you are interested in. Then click the <strong className="text-foreground">★ Star</strong> to set your <strong>Primary Career Focus</strong>.
        </p>
      </div>

      {/* Primary Goal Spotlight */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-accent/15 via-card to-card border border-accent/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg shadow-sm">
            ★
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-accent font-bold block">
              Your Primary Career Focus
            </span>
            <h4 className="text-sm sm:text-base font-bold text-foreground">
              {primaryGoal}
            </h4>
          </div>
        </div>
        <div className="text-xs text-muted-foreground sm:text-right">
          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
            <TrendingUp className="h-3.5 w-3.5" />
            {CAREER_GOAL_OPTIONS.find((c) => c.id === primaryGoal)?.demandRate}
          </span>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Avg. Starting: {CAREER_GOAL_OPTIONS.find((c) => c.id === primaryGoal)?.startingRange}
          </p>
        </div>
      </div>

      {/* 3D Tilt Career Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CAREER_GOAL_OPTIONS.map((goal) => {
          const isSelected = selectedInterests.includes(goal.id);
          const isPrimary = primaryGoal === goal.id;

          return (
            <div
              key={goal.id}
              onClick={() => handleToggleInterest(goal.id)}
              className={cn(
                "p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 relative flex flex-col justify-between group transform hover:-translate-y-1 hover:shadow-xl",
                isPrimary
                  ? "bg-card border-accent shadow-lg shadow-accent/15 ring-2 ring-accent"
                  : isSelected
                  ? "bg-card border-primary/50 shadow-md ring-1 ring-primary/30"
                  : "bg-card/60 border-border hover:bg-muted/60 hover:border-primary/40"
              )}
            >
              <div>
                {/* Top Badge & Actions */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl p-1 rounded-lg bg-background border border-border/80 group-hover:scale-110 transition-transform">
                      {goal.icon}
                    </span>
                    <div>
                      <Badge variant={isPrimary ? "gold" : "outline"} size="sm">
                        {goal.badge}
                      </Badge>
                    </div>
                  </div>

                  {/* Star Primary Button */}
                  <button
                    type="button"
                    onClick={(e) => handleSetPrimary(e, goal.id)}
                    title={isPrimary ? "Primary Goal" : "Set as Primary Focus"}
                    className={cn(
                      "p-1.5 rounded-lg border transition-all flex items-center gap-1 text-xs font-semibold",
                      isPrimary
                        ? "bg-accent text-accent-foreground border-accent shadow-sm"
                        : "bg-background border-border text-muted-foreground hover:text-accent hover:border-accent"
                    )}
                  >
                    <Star className={cn("h-3.5 w-3.5", isPrimary ? "fill-current" : "")} />
                    <span className="text-[10px] hidden sm:inline">
                      {isPrimary ? "Primary" : "Set"}
                    </span>
                  </button>
                </div>

                {/* Title & Sanskrit */}
                <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  {goal.title}
                </h4>
                <p className="text-[11px] font-serif italic text-accent mt-0.5">
                  {goal.sanskrit}
                </p>

                {/* Description */}
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {goal.description}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">{goal.startingRange}</span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "w-4 h-4 rounded border flex items-center justify-center transition-all",
                      isSelected
                        ? "border-primary bg-primary text-white"
                        : "border-muted-foreground/40 group-hover:border-primary"
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                  </span>
                  <span
                    className={cn(
                      "text-[11px] font-semibold",
                      isSelected ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {isSelected ? "Selected" : "Add"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {errors?.careerInterests && (
        <p className="text-xs text-destructive font-medium">{errors.careerInterests}</p>
      )}
    </div>
  );
}
