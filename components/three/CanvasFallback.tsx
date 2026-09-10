import React from "react";
import { cn } from "@/lib/utils/cn";

interface CanvasFallbackProps {
  className?: string;
  title?: string;
}

export function CanvasFallback({
  className,
  title = "Vaidya Setu Botanical Network",
}: CanvasFallbackProps) {
  return (
    <div
      className={cn(
        "relative w-full h-full min-h-[300px] flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-b from-herbal-900/10 via-background to-background border border-herbal-700/10",
        className
      )}
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="text-accent" />
          <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
        </svg>
      </div>
      <div className="text-center z-10 p-6">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-accent">
          🌿
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Intelligent Ayurveda Knowledge Graph
        </p>
      </div>
    </div>
  );
}
