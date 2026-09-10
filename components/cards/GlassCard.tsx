import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function GlassCard({
  className,
  glow = false,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-surface rounded-2xl p-6 relative overflow-hidden transition-all duration-300",
        glow && "ayur-glow border-accent/30",
        className
      )}
      {...props}
    >
      {/* Gentle ambient herbal shimmer highlight at top-left */}
      <div className="absolute -top-16 -left-16 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
