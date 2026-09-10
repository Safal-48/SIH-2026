import * as React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils/cn";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-dashed border-border bg-card/40 max-w-lg mx-auto",
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mb-4 text-2xl shadow-sm">
        {icon || <Sparkles className="h-6 w-6 text-accent" />}
      </div>
      <h4 className="text-lg font-bold text-foreground mb-1.5">{title}</h4>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
