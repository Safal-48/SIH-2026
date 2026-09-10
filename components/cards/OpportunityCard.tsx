import * as React from "react";
import { MapPin, Clock, ShieldCheck, Banknote } from "lucide-react";
import { Opportunity } from "@/types/entities";
import { Card } from "./Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { formatINR } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils/cn";

export interface OpportunityCardProps {
  opportunity: Opportunity;
  onApply?: (opp: Opportunity) => void;
  className?: string;
}

export function OpportunityCard({
  opportunity,
  onApply,
  className,
}: OpportunityCardProps) {
  const typeLabels: Record<Opportunity["opportunityType"], string> = {
    CLINICAL_INTERNSHIP: "Clinical Residency",
    R_AND_D_FELLOWSHIP: "Research Fellowship",
    HERBAL_PHARMA_TRAINEESHIP: "Pharma Traineeship",
    PANCHAKARMA_RESIDENCY: "Panchakarma Immersion",
    AYUSH_PUBLIC_HEALTH: "Public Health",
    FULL_TIME_ROLE: "Full-Time Placement",
  };

  return (
    <Card variant="interactive" className={cn("flex flex-col justify-between h-full p-6", className)}>
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" size="sm">
              {typeLabels[opportunity.opportunityType] || opportunity.opportunityType}
            </Badge>
            {opportunity.verifiedByAIIA && (
              <Badge variant="verified" size="sm" icon={<ShieldCheck className="h-3 w-3" />}>
                AIIA Verified
              </Badge>
            )}
          </div>
          {opportunity.stipendMonthlyInr ? (
            <div className="text-right shrink-0">
              <span className="text-sm font-bold text-foreground">
                {formatINR(opportunity.stipendMonthlyInr)}
              </span>
              <span className="text-[10px] text-muted-foreground block -mt-0.5">/ month</span>
            </div>
          ) : (
            <span className="text-xs text-muted-foreground font-medium">Honorary</span>
          )}
        </div>

        {/* Title & Organization */}
        <h4 className="text-base sm:text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {opportunity.title}
        </h4>
        <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-1 mb-3 line-clamp-1">
          {opportunity.organizationName}
        </p>

        {/* Description */}
        <p className="text-xs text-muted-foreground/90 line-clamp-2 mb-4 leading-relaxed">
          {opportunity.description}
        </p>

        {/* Key Attributes */}
        <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-muted-foreground mb-4 pt-3 border-t border-border/50">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {opportunity.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-accent" />
            {opportunity.durationMonths} Months
          </span>
          {opportunity.stipendMonthlyInr && (
            <span className="inline-flex items-center gap-1">
              <Banknote className="h-3.5 w-3.5 text-secondary" />
              Stipendiary
            </span>
          )}
        </div>

        {/* Required Skills Chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {opportunity.requiredSkills.map((req) => (
            <span
              key={req.skillId}
              className="text-[11px] px-2 py-0.5 rounded-md bg-muted font-medium text-muted-foreground"
            >
              {req.skillName} ({req.minimumProficiency}%+)
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-border/50 flex items-center justify-between gap-3">
        <span className="text-[11px] text-muted-foreground">
          Deadline: {opportunity.deadline}
        </span>
        <Button
          size="sm"
          variant="gold"
          onClick={() => onApply?.(opportunity)}
        >
          Apply with Passport
        </Button>
      </div>
    </Card>
  );
}
