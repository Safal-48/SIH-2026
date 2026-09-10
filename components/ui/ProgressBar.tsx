"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: "herbal" | "saffron" | "gradient";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  variant = "gradient",
  size = "md",
  className,
}: ProgressBarProps) {
  const shouldReduceMotion = useReducedMotion();
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  const fillVariants = {
    herbal: "bg-primary",
    saffron: "bg-accent",
    gradient: "bg-gradient-to-r from-primary via-herbal-500 to-accent",
  };

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs font-medium">
          {label && <span className="text-muted-foreground">{label}</span>}
          {showValue && <span className="text-foreground font-semibold">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div
        className={cn(
          "w-full bg-muted rounded-full overflow-hidden border border-border/40",
          sizeClasses[size]
        )}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {shouldReduceMotion ? (
          <div
            className={cn("h-full rounded-full", fillVariants[variant])}
            style={{ width: `${percentage}%` }}
          />
        ) : (
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${percentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className={cn("h-full rounded-full", fillVariants[variant])}
          />
        )}
      </div>
    </div>
  );
}
