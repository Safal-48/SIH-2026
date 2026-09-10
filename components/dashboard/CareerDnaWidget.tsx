"use client";

import * as React from "react";
import Link from "next/link";
import { Dna, Sparkles, TrendingUp, Info } from "lucide-react";
import { Card } from "@/components/cards/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

export interface CareerDnaItem {
  id: string;
  name: string;
  sanskrit: string;
  icon: string;
  percentage: number;
  status: string;
  statusColor: "emerald" | "blue" | "amber" | "purple" | "indigo";
}

export const DEFAULT_CAREER_DNA: CareerDnaItem[] = [
  {
    id: "clinical",
    name: "Clinical",
    sanskrit: "Chikitsaka",
    icon: "🩺",
    percentage: 84,
    status: "Top Match",
    statusColor: "emerald",
  },
  {
    id: "research",
    name: "Research",
    sanskrit: "Anusandhana",
    icon: "🔬",
    percentage: 71,
    status: "Strong Fit",
    statusColor: "blue",
  },
  {
    id: "panchakarma",
    name: "Panchakarma",
    sanskrit: "Shodhana",
    icon: "🌿",
    percentage: 68,
    status: "Promising",
    statusColor: "amber",
  },
  {
    id: "pharma",
    name: "Herbal Pharma",
    sanskrit: "Dravyaguna",
    icon: "💊",
    percentage: 62,
    status: "Emerging",
    statusColor: "purple",
  },
  {
    id: "teaching",
    name: "Teaching",
    sanskrit: "Adhyapana",
    icon: "📚",
    percentage: 54,
    status: "Viable",
    statusColor: "indigo",
  },
];

interface CareerDnaWidgetProps {
  dnaItems?: CareerDnaItem[];
}

export function CareerDnaWidget({ dnaItems = DEFAULT_CAREER_DNA }: CareerDnaWidgetProps) {
  return (
    <Card id="career-dna" variant="default" className="p-6 space-y-5 border-border shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-accent/15 text-accent border border-accent/30">
            <Dna className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground tracking-tight">
              YOUR AYURVEDA CAREER DNA
            </h3>
            <p className="text-xs text-muted-foreground">
              Algorithmic affinity across 5 core professional tracks
            </p>
          </div>
        </div>

        <Link
          href="/student/career-dna"
          className="text-xs font-semibold text-accent hover:underline flex items-center gap-1 shrink-0"
        >
          <span>Full Report</span>
          <span>→</span>
        </Link>
      </div>

      {/* 5 Tracks Progress List with Block Representation */}
      <div className="space-y-3.5">
        {dnaItems.map((item) => {
          const blockCount = Math.round((item.percentage / 100) * 12);
          const blocks = "█".repeat(blockCount);

          return (
            <div key={item.id} className="space-y-1.5 group">
              {/* Top row: Icon, Name, Sanskrit, and Percentage */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base">{item.icon}</span>
                  <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[11px] font-serif italic text-accent hidden sm:inline">
                    ({item.sanskrit})
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0 font-mono">
                  <span className="text-primary/70 tracking-tighter text-xs hidden sm:inline">
                    {blocks}
                  </span>
                  <span className="font-extrabold text-sm text-foreground">
                    {item.percentage}%
                  </span>
                </div>
              </div>

              {/* Horizontal Animated Progress Bar */}
              <div className="relative w-full h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary via-herbal-500 to-accent rounded-full transition-all duration-700 ease-out shadow-sm shadow-accent/20 group-hover:brightness-110"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Insight */}
      <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-xs text-muted-foreground flex items-center justify-between gap-2">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-accent shrink-0 mt-0.5" />
          <span>
            Highest match: <strong className="text-foreground">Clinical (84%)</strong>. Clinical rotations prioritize Kayachikitsa.
          </span>
        </div>
        <Link
          href="/student/career-dna"
          className="text-xs font-bold text-primary hover:underline shrink-0 hidden sm:inline"
        >
          View DNA Breakdown
        </Link>
      </div>
    </Card>
  );
}
