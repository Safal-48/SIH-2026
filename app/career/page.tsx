"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Compass,
  TrendingUp,
  Sparkles,
  FileText,
  UserCheck,
  Award,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { MarketingNavbar } from "@/components/marketing/MarketingNavbar";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

// Specialized Tab Components
import { CareerGoalsTab } from "@/components/career/CareerGoalsTab";
import { CareerPathsTab } from "@/components/career/CareerPathsTab";
import { CareerRecommendationsTab } from "@/components/career/CareerRecommendationsTab";
import { ResumeProfileTab } from "@/components/career/ResumeProfileTab";
import { AiMockInterviewTab } from "@/components/career/AiMockInterviewTab";
import { PlacementReadinessTab } from "@/components/career/PlacementReadinessTab";

export default function CareerHubPage() {
  const searchParams = useSearchParams();
  const tabParam = searchParams?.get("tab") || "goals";
  const [activeTab, setActiveTab] = React.useState<string>(tabParam);

  React.useEffect(() => {
    if (tabParam) setActiveTab(tabParam);
  }, [tabParam]);

  const tabs = [
    { id: "goals", label: "Career Goals", icon: <Compass className="h-4 w-4" /> },
    { id: "paths", label: "Career Paths", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "recommendations", label: "Recommendations", icon: <Sparkles className="h-4 w-4" /> },
    { id: "resume", label: "Resume & Profile", icon: <FileText className="h-4 w-4" /> },
    { id: "interview", label: "AI Mock Interview", icon: <UserCheck className="h-4 w-4" /> },
    { id: "placement", label: "Placement Readiness", icon: <Award className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* 1. Master Navbar */}
      <MarketingNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-8">
        {/* Header Breadcrumb & Title */}
        <div className="space-y-3 pb-2 border-b border-border/60">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/home" className="hover:text-foreground transition-colors">
              Scholar Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-emerald-400 font-semibold">CAREER INTELLIGENCE</span>
            <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-gray-300 uppercase font-bold">
              {tabs.find((t) => t.id === activeTab)?.label || activeTab}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                National Ayush <span className="text-amber-400">Career Ecosystem</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-300/85 mt-1 max-w-2xl">
                Define your clinical, research, or pharma trajectory. Access explainable match analytics, ATS resume tools, viva simulations, and verified placement readiness.
              </p>
            </div>
            <Badge variant="gold" size="sm" className="font-mono text-xs">
              NCISM &amp; Ministry of Ayush Accredited
            </Badge>
          </div>
        </div>

        {/* 6 Sub-Tab Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 p-1.5 rounded-2xl bg-[#03190f]/90 border border-emerald-500/30 backdrop-blur-xl shadow-lg">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={cn(
                "py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all",
                activeTab === t.id
                  ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 ring-1 ring-amber-500/50"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              )}
            >
              {t.icon}
              <span className="truncate">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Interactive Tab Views */}
        <div className="pt-2">
          {activeTab === "goals" && <CareerGoalsTab />}
          {activeTab === "paths" && <CareerPathsTab />}
          {activeTab === "recommendations" && <CareerRecommendationsTab />}
          {activeTab === "resume" && <ResumeProfileTab />}
          {activeTab === "interview" && <AiMockInterviewTab />}
          {activeTab === "placement" && <PlacementReadinessTab />}
        </div>
      </main>

      {/* Footer */}
      <MarketingFooter />
    </div>
  );
}
