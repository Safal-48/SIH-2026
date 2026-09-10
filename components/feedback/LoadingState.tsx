import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface LoadingStateProps {
  message?: string;
  type?: "spinner" | "skeleton-card" | "skeleton-list";
  className?: string;
}

export function LoadingState({
  message = "Loading Ayush intelligence...",
  type = "spinner",
  className,
}: LoadingStateProps) {
  if (type === "skeleton-card") {
    return (
      <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="rounded-2xl border border-border p-6 bg-card space-y-4 animate-pulse"
          >
            <div className="flex justify-between items-center">
              <div className="h-5 w-24 bg-muted rounded-full" />
              <div className="h-5 w-16 bg-muted rounded-md" />
            </div>
            <div className="h-6 w-3/4 bg-muted rounded-md" />
            <div className="h-4 w-1/2 bg-muted rounded-md" />
            <div className="space-y-2 pt-4 border-t border-border">
              <div className="h-3 w-full bg-muted rounded" />
              <div className="h-3 w-5/6 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center space-y-3",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-accent animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-5 w-5 text-primary animate-pulse" />
        </div>
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground animate-pulse">
        {message}
      </p>
    </div>
  );
}

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/80", className)}
      {...props}
    />
  );
}
