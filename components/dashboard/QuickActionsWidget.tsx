"use client";

import * as React from "react";
import Link from "next/link";
import {
  ClipboardCheck,
  BookOpen,
  Briefcase,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";

interface QuickActionsWidgetProps {
  onOpenPassport?: () => void;
}

export function QuickActionsWidget({ onOpenPassport }: QuickActionsWidgetProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Card variant="default" className="p-6 space-y-4 border-border shadow-sm">
      <div className="flex items-center justify-between pb-2 border-b border-border/60">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent" />
          Scholar Quick Actions
        </h3>
        <span className="text-[11px] text-muted-foreground">Direct Shortcuts</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* 1. Take Assessment */}
        <Link href="/student/assessment" className="block">
          <div className="p-4 rounded-2xl bg-accent/15 border border-accent/40 hover:bg-accent/25 transition-all group flex flex-col justify-between h-full cursor-pointer shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-accent text-accent-foreground">
                <ClipboardCheck className="h-5 w-5" />
              </div>
              <span className="text-[10px] uppercase font-bold text-accent">Stage 02</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                Skill Assessment
              </h4>
              <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                Personalized clinical cases & gap diagnostic.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-accent/20 flex items-center justify-between text-xs font-semibold text-accent">
              <span>Start Assessment</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* 2. Continue Learning */}
        <Link href="/student/learning" className="block">
          <div className="text-left p-4 rounded-2xl bg-card border border-border hover:border-primary/50 hover:bg-muted/50 transition-all group flex flex-col justify-between h-full cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-secondary/15 text-secondary">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-[10px] uppercase font-bold text-secondary">3 Active</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                Continue Learning
              </h4>
              <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                Closed-loop pipeline: Case Doc & Safety modules.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary">
              <span>Resume Pipeline</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* 3. View Opportunities */}
        <Link href="/student/opportunities" className="block">
          <div className="text-left p-4 rounded-2xl bg-card border border-border hover:border-primary/50 hover:bg-muted/50 transition-all group flex flex-col justify-between h-full cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-primary/15 text-primary">
                <Briefcase className="h-5 w-5" />
              </div>
              <span className="text-[10px] uppercase font-bold text-primary">6 Matches</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                Smart Opportunities
              </h4>
              <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                Automated matching for AIIA, CCRAS, and AVS residencies.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary">
              <span>Explore Matches</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* 4. Open Passport */}
        <Link href="/student/passport" className="block">
          <div className="text-left p-4 rounded-2xl bg-card border border-border hover:border-secondary/50 hover:bg-muted/50 transition-all group flex flex-col justify-between h-full cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-secondary/15 text-secondary">
                <Award className="h-5 w-5" />
              </div>
              <span className="text-[10px] uppercase font-bold text-secondary">7 Verified</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground group-hover:text-secondary transition-colors">
                Competency Passport
              </h4>
              <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                Verified digital portfolio with clinical credentials & QR verification.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-secondary">
              <span>View Full Passport</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </div>
    </Card>
  );
}
