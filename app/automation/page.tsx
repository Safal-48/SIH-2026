"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Cpu,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Home,
  Layers,
  Zap,
  ShieldCheck,
  Building2,
  GraduationCap,
  Briefcase,
  TrendingUp,
  FileSpreadsheet,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";

import {
  SmartAutomationService,
  PipelineStageInfo,
  SmartEngineDefinition,
  SimulationStepRecord,
} from "@/lib/services/smartAutomationService";

import { SmartAutomationPipelineStepper } from "@/components/automation/SmartAutomationPipelineStepper";
import { SixEnginesOverview } from "@/components/automation/SixEnginesOverview";
import { LivePipelineSimulator } from "@/components/automation/LivePipelineSimulator";

type AutomationTabType = "pipeline" | "engines" | "simulator" | "blueprint";

function AutomationPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const service = React.useMemo(() => new SmartAutomationService(), []);

  const tabParam = searchParams?.get("tab") as AutomationTabType | null;
  const [activeTab, setActiveTab] = React.useState<AutomationTabType>(
    tabParam && ["pipeline", "engines", "simulator", "blueprint"].includes(tabParam)
      ? tabParam
      : "pipeline"
  );

  const [stages, setStages] = React.useState<PipelineStageInfo[]>(service.getPipelineStages());
  const [engines, setEngines] = React.useState<SmartEngineDefinition[]>(service.getEngines());
  const [simulationSteps, setSimulationSteps] = React.useState<SimulationStepRecord[]>(
    service.getLiveSimulationSteps()
  );
  const [selectedStageId, setSelectedStageId] = React.useState<string>("SKILL_GAP");

  // Toast
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleTabChange = (tab: AutomationTabType) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    params.set("tab", tab);
    router.replace(`/automation?${params.toString()}`, { scroll: false });
  };

  const tabs: { id: AutomationTabType; label: string; icon: string; badge?: string }[] = [
    { id: "pipeline", label: "The 10-Stage Pipeline", icon: "🔄", badge: "10 Steps" },
    { id: "engines", label: "The 6 AI Engines", icon: "🤖", badge: "6 Engines" },
    { id: "simulator", label: "Live Interactive Simulator", icon: "▶️", badge: "Run Demo" },
    { id: "blueprint", label: "Architecture Blueprint", icon: "📐" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 p-4 rounded-xl bg-accent text-accent-foreground font-semibold shadow-2xl border border-accent-foreground/20 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="h-5 w-5 text-accent-foreground" />
            <span className="text-xs sm:text-sm">{toastMessage}</span>
          </div>
        )}

        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between pb-3 border-b border-border/70">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" /> Vaidya Setu Hub
            </Link>
            <span className="text-muted-foreground text-xs">/</span>
            <span className="text-xs font-bold text-foreground">Smart Automation Engine</span>
            <Badge variant="verified" size="sm" className="hidden sm:inline-flex text-[10px]">
              Step 17 Master Engine
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden md:inline">
              National Ayush Core Architecture Story
            </span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/15 to-card border border-primary/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-xs font-semibold text-primary">
              <Cpu className="h-3.5 w-3.5" /> End-to-End Predictive Intelligence & Closed-Loop Remediation
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Vaidya Setu Smart Automation Engine
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Connecting raw student assessments to cryptographic competency passports, 1-click recruiter shortlisting, faculty supervisor verifications, institutional curriculum remediation, and national healthcare workforce analytics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleTabChange("simulator")}
              className="text-xs font-bold shadow-md shadow-primary/20"
              leftIcon={<Sparkles className="h-4 w-4" />}
            >
              Launch Live Simulation
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-border/80">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isActive
                          ? "bg-primary-foreground text-primary"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Viewport */}
        <div className="min-h-[500px] space-y-6">
          {activeTab === "pipeline" && (
            <SmartAutomationPipelineStepper
              stages={stages}
              selectedStageId={selectedStageId}
              onSelectStage={(id) => setSelectedStageId(id)}
            />
          )}

          {activeTab === "engines" && <SixEnginesOverview engines={engines} />}

          {activeTab === "simulator" && (
            <LivePipelineSimulator
              stages={stages}
              simulationSteps={simulationSteps}
              showToast={showToast}
            />
          )}

          {activeTab === "blueprint" && (
            <Card variant="default" className="p-6 space-y-6">
              <div className="space-y-1 pb-3 border-b border-border">
                <h3 className="text-base font-bold text-foreground">
                  Smart Automation Architecture & Ecosystem Feedback Loops
                </h3>
                <p className="text-xs text-muted-foreground">
                  How Vaidya Setu connects Scholars, Institutions, Industry, and the Ministry of Ayush
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                    👨‍🎓
                  </div>
                  <h4 className="font-bold text-foreground">1. Student Ecosystem</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Diagnostic evaluation → Skill Profile → Automated gap diagnosis → Personalized learning modules → Cryptographic competency passport.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center font-bold">
                    🏫
                  </div>
                  <h4 className="font-bold text-foreground">2. Institutional Loop</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Cohort Skill Heatmaps → Real-time gap detection (Research Documentation 38%) → Automated recommendation → Faculty remedial workshop commissioned.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center font-bold">
                    🏭
                  </div>
                  <h4 className="font-bold text-foreground">3. Industry Deployment</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Enterprise postings → 1-click candidate shortlisting based on verified hashes → Faculty NOC workflow → Sabbatical & clinical residency hiring.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                    🏛️
                  </div>
                  <h4 className="font-bold text-foreground">4. National Governance</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Industry skill demand matrix → State-wise workforce telemetry → Ayush Grid digital standards → Statutory NCISM curriculum revision directives.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AutomationPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground text-xs">
          Loading Vaidya Setu Smart Automation Engine...
        </div>
      }
    >
      <AutomationPageContent />
    </React.Suspense>
  );
}
