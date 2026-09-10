import * as React from "react";
import { CheckCircle2, Flame, Award } from "lucide-react";
import { Skill } from "@/types/entities";
import { Card } from "./Card";
import { Badge } from "../ui/Badge";
import { ProgressBar } from "../ui/ProgressBar";
import { cn } from "@/lib/utils/cn";

export interface SkillCardProps {
  skill: Skill;
  currentProficiency?: number; // 0-100
  isVerified?: boolean;
  className?: string;
  onAssess?: (skill: Skill) => void;
}

export function SkillCard({
  skill,
  currentProficiency,
  isVerified = false,
  className,
  onAssess,
}: SkillCardProps) {
  const categoryLabels: Record<string, string> = {
    CLINICAL_DIAGNOSTICS: "Clinical Diagnostics",
    PANCHAKARMA_PROCEDURES: "Panchakarma",
    DRAVYAGUNA_PHARMACOLOGY: "Pharmacology",
    RASASHASTRA_FORMULATION: "Rasashastra",
    RESEARCH_METHODOLOGY: "Research & GCP",
    DIGITAL_AYUSH_STANDARDS: "Digital Ayush",
    HOSPITAL_NABH_PROTOCOLS: "NABH Standards",
  };

  return (
    <Card variant="interactive" className={cn("p-5 flex flex-col justify-between h-full", className)}>
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant="outline" size="sm">
            {categoryLabels[skill.category] || skill.category}
          </Badge>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center text-[11px] font-bold text-amber-600 dark:text-amber-400 gap-0.5">
              <Flame className="h-3 w-3" />
              {skill.industryDemandScore}% Demand
            </span>
          </div>
        </div>

        <h4 className="text-base font-bold text-foreground line-clamp-1">
          {skill.name}
        </h4>
        {skill.sanskritName && (
          <p className="text-xs text-primary/80 font-medium tracking-wide mb-2">
            {skill.sanskritName}
          </p>
        )}

        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
          {skill.description}
        </p>

        {currentProficiency !== undefined ? (
          <div className="space-y-1 pt-2 border-t border-border/50">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Candidate Competency</span>
              <span className="font-bold text-foreground">{currentProficiency}%</span>
            </div>
            <ProgressBar value={currentProficiency} variant="gradient" size="sm" />
          </div>
        ) : (
          <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
            <span>Bloom Level:</span>
            <span className="font-semibold text-foreground uppercase text-[10px] tracking-wider bg-muted px-2 py-0.5 rounded">
              {skill.bloomLevel}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
        {isVerified ? (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Supervisor Endorsed
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Award className="h-3.5 w-3.5 text-accent" />
            Passport Candidate
          </span>
        )}

        {onAssess && (
          <button
            onClick={() => onAssess(skill)}
            className="text-xs font-semibold text-primary hover:text-herbal-800 underline underline-offset-4"
          >
            Assess Skill
          </button>
        )}
      </div>
    </Card>
  );
}
