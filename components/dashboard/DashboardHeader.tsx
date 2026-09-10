"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, Sparkles, ExternalLink, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface DashboardHeaderProps {
  onOpenNotifications?: () => void;
}

export function DashboardHeader({ onOpenNotifications }: DashboardHeaderProps) {
  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/80">
      {/* Date & Cohort Tracker */}
      <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-card border border-border/80 text-foreground font-medium">
          <Calendar className="h-3.5 w-3.5 text-accent" />
          <span>{currentDate}</span>
        </div>
        <span className="hidden sm:inline text-border">•</span>
        <span className="hidden sm:inline font-mono text-[11px] text-muted-foreground">
          AYUSH / NCISM Cohort 2025–26
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        <Link href="/foundation">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-foreground hidden sm:inline-flex"
            leftIcon={<ExternalLink className="h-3.5 w-3.5 text-primary" />}
          >
            Design System Explorer
          </Button>
        </Link>

        {/* Notifications Button */}
        <button
          type="button"
          onClick={onOpenNotifications}
          aria-label="View notifications"
          className="relative p-2 rounded-xl border border-border bg-card hover:bg-muted/70 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Bell className="h-4 w-4" />
          {/* Notification pulse dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent animate-pulse" />
        </button>
      </div>
    </header>
  );
}
