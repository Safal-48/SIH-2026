"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  status?: "online" | "verified" | "offline";
}

export function Avatar({
  src,
  name,
  size = "md",
  status,
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-xl",
  };

  const statusDotSizes = {
    sm: "h-2 w-2",
    md: "h-2.5 w-2.5",
    lg: "h-3 w-3",
    xl: "h-3.5 w-3.5",
  };

  return (
    <div className={cn("relative inline-flex shrink-0", className)} {...props}>
      <div
        className={cn(
          "rounded-full overflow-hidden flex items-center justify-center font-bold tracking-wider select-none border border-border shadow-sm",
          sizeClasses[size],
          src && !imageError
            ? "bg-muted"
            : "bg-gradient-to-br from-primary to-herbal-800 text-primary-foreground"
        )}
      >
        {src && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={name}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-background",
            statusDotSizes[size],
            status === "online" && "bg-emerald-500",
            status === "verified" && "bg-accent",
            status === "offline" && "bg-muted-foreground"
          )}
        />
      )}
    </div>
  );
}
