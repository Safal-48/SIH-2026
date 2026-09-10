import * as React from "react";
import { TrendingUp, Sparkles, Compass } from "lucide-react";
import { CareerPath } from "@/types/entities";
import { Card } from "./Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { formatINR } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils/cn";

export interface CareerCardProps {
  career: CareerPath;
  affinityScore?: number; // 0-100
  onExplore?: (career: CareerPath) => void;
  className?: string;
}

export function CareerCard({
  career,
  affinityScore,
  onExplore,
  className,
}: CareerCardProps) {
  return (
    <Card variant="interactive" className={cn("p-6 flex flex-col justify-between h-full", className)}>
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <Badge variant="gold" size="sm" icon={<TrendingUp className="h-3 w-3" />}>
            {career.projectedGrowth}
          </Badge>
          {affinityScore !== undefined && (
            <div className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              <Sparkles className="h-3 w-3 text-accent" />
              {affinityScore}% DNA Fit
            </div>
          )}
        </div>

        <h4 className="text-lg font-bold text-foreground line-clamp-1">
          {career.title}
        </h4>
        <p className="text-xs font-semibold text-secondary uppercase tracking-wider mt-0.5 mb-2">
          {career.domain}
        </p>

        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
          {career.description}
        </p>

        <div className="bg-muted/50 rounded-xl p-3 mb-4 space-y-2 border border-border/40">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium">Avg. Starting Package</span>
            <span className="font-bold text-foreground">
              {formatINR(career.averageStartingInr)} / yr
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium">Target Ayush Specialty</span>
            <span className="font-semibold text-primary">{career.ayurvedaSpecialization}</span>
          </div>
        </div>

        {/* Required Skills list */}
        <div className="space-y-1.5 mb-4">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Critical Competencies
          </p>
          <div className="flex flex-wrap gap-1">
            {career.requiredSkills.map((req) => (
              <span
                key={req.skillId}
                className="text-[11px] px-2 py-0.5 rounded bg-background border border-border font-medium text-foreground"
              >
                {req.skillName}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-border/50">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-center gap-1.5"
          onClick={() => onExplore?.(career)}
        >
          <Compass className="h-3.5 w-3.5 text-accent" />
          Explore Career Roadmap
        </Button>
      </div>
    </Card>
  );
}
