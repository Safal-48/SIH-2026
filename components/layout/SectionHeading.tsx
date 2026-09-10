import * as React from "react";
import { Badge } from "../ui/Badge";
import { cn } from "@/lib/utils/cn";

export interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-2 mb-8 sm:mb-10",
        align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-3xl",
        className
      )}
    >
      {badge && (
        <Badge variant="gold" size="sm" className="mb-2 uppercase tracking-widest font-semibold">
          {badge}
        </Badge>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground font-sans">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
