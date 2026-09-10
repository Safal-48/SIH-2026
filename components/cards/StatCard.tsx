import * as React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card } from "./Card";
import { cn } from "@/lib/utils/cn";

export interface StatCardProps {
  title: string;
  value: string | number;
  delta?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  delta,
  isPositive = true,
  icon,
  subtitle,
  className,
}: StatCardProps) {
  return (
    <Card variant="default" className={cn("p-5 sm:p-6", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {value}
          </div>
        </div>
        {icon && (
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/15 flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
      </div>

      {(delta || subtitle) && (
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/50 text-xs">
          {delta && (
            <span
              className={cn(
                "inline-flex items-center font-semibold rounded-md px-1.5 py-0.5",
                isPositive
                  ? "text-emerald-700 dark:text-emerald-400 bg-emerald-500/10"
                  : "text-rose-700 dark:text-rose-400 bg-rose-500/10"
              )}
            >
              {isPositive ? (
                <ArrowUpRight className="h-3 w-3 mr-0.5" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-0.5" />
              )}
              {delta}
            </span>
          )}
          {subtitle && (
            <span className="text-muted-foreground truncate">{subtitle}</span>
          )}
        </div>
      )}
    </Card>
  );
}
