import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20",
        secondary:
          "bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20",
        gold:
          "bg-accent/15 text-saffron-700 dark:text-accent border border-accent/30 hover:bg-accent/25",
        outline:
          "text-foreground border border-border hover:bg-muted",
        verified:
          "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30",
        warning:
          "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30",
        destructive:
          "bg-destructive/10 text-destructive border border-destructive/20",
      },
      size: {
        sm: "text-[11px] px-2 py-0.2",
        md: "text-xs px-2.5 py-0.5",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

export function Badge({
  className,
  variant,
  size,
  icon,
  children,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {icon && <span className="mr-1 inline-flex shrink-0">{icon}</span>}
      {children}
    </div>
  );
}
