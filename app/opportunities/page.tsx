"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Briefcase, Building2, Sparkles, ChevronRight } from "lucide-react";
import { MarketingNavbar } from "@/components/marketing/MarketingNavbar";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { OpportunityMarketplace } from "@/components/opportunities/OpportunityMarketplace";

export default function OpportunitiesPage() {
  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* 1. Master Navbar */}
      <MarketingNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-8">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground pb-2 border-b border-border/60">
          <Link href="/home" className="hover:text-foreground transition-colors">
            Scholar Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
          <span className="text-emerald-400 font-semibold">OPPORTUNITY MARKETPLACE</span>
          <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
          <span className="text-gray-300 uppercase font-bold">Verified Openings</span>
        </div>

        {/* Opportunity Marketplace Component */}
        <OpportunityMarketplace />
      </main>

      {/* Footer */}
      <MarketingFooter />
    </div>
  );
}
