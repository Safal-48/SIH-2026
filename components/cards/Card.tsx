import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive" | "bordered";
}

export function Card({
  className,
  variant = "default",
  children,
  ...props
}: CardProps) {
  const variantClasses = {
    default: "bg-card text-card-foreground border border-border shadow-sm",
    elevated: "bg-card text-card-foreground border border-border shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out",
    interactive: "bg-card text-card-foreground border border-border hover:border-primary/50 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:ring-1 hover:ring-primary/20 transition-all duration-300 ease-out cursor-pointer",
    bordered: "bg-background text-foreground border-2 border-border/80",
  };

  return (
    <div
      className={cn("rounded-2xl p-6 transition-colors", variantClasses[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 mb-4", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg sm:text-xl font-bold tracking-tight text-foreground", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground leading-relaxed", className)} {...props} />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-4", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center justify-between pt-4 mt-4 border-t border-border/60", className)} {...props} />
  );
}
