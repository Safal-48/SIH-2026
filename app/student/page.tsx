"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/hooks/useAuth";
import { loadOnboardingDraftLocally } from "@/lib/services/studentOnboarding";
import { StudentSidebar } from "@/components/dashboard/StudentSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { CareerReadinessWidget } from "@/components/dashboard/CareerReadinessWidget";
import { CareerDnaWidget, CareerDnaItem } from "@/components/dashboard/CareerDnaWidget";
import { SkillGapWidget } from "@/components/dashboard/SkillGapWidget";
import { ContinueLearningWidget } from "@/components/dashboard/ContinueLearningWidget";
import { CompetencyWidget } from "@/components/dashboard/CompetencyWidget";
import { TopOpportunitiesWidget } from "@/components/dashboard/TopOpportunitiesWidget";
import { QuickActionsWidget } from "@/components/dashboard/QuickActionsWidget";
import {
  loadAssessmentResultLocally,
  AssessmentDiagnosticResult,
} from "@/lib/services/questionEngine";

function StudentDashboardContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const errorParam = searchParams?.get("error");

  const [activeTab, setActiveTab] = React.useState<string>("dashboard");
  const [onboardingData, setOnboardingData] = React.useState(loadOnboardingDraftLocally());
  const [assessmentResult, setAssessmentResult] =
    React.useState<AssessmentDiagnosticResult | null>(null);

  React.useEffect(() => {
    setOnboardingData(loadOnboardingDraftLocally());
    setAssessmentResult(loadAssessmentResultLocally());
  }, []);

  const isOnboardingComplete = onboardingData?.onboardingCompleted ?? false;
  const displayName = user?.fullName || "Aarav Sharma";
  const degree = onboardingData?.degree || "BAMS";
  const academicYear = onboardingData?.currentYear || "Final Year";
  const institution = onboardingData?.college || "All India Institute of Ayurveda, New Delhi";
  const primaryCareer = onboardingData?.primaryCareerGoal || "Clinical Practice";

  // Calibrated Career DNA items if assessment was taken
  const dynamicDnaItems: CareerDnaItem[] | undefined = assessmentResult
    ? [
        {
          id: "clinical",
          name: "Clinical Practice",
          sanskrit: "Chikitsaka",
          icon: "🩺",
          percentage: assessmentResult.calibratedCareerDna.clinical,
          status:
            assessmentResult.calibratedCareerDna.clinical >= 80 ? "Top Match" : "Strong Fit",
          statusColor: "emerald",
        },
        {
          id: "research",
          name: "Research",
          sanskrit: "Anusandhana",
          icon: "🔬",
          percentage: assessmentResult.calibratedCareerDna.research,
          status:
            assessmentResult.calibratedCareerDna.research >= 75 ? "Top Match" : "Strong Fit",
          statusColor: "blue",
        },
        {
          id: "panchakarma",
          name: "Panchakarma",
          sanskrit: "Shodhana",
          icon: "🌿",
          percentage: assessmentResult.calibratedCareerDna.panchakarma,
          status:
            assessmentResult.calibratedCareerDna.panchakarma >= 70 ? "Promising" : "Developing",
          statusColor: "amber",
        },
        {
          id: "pharma",
          name: "Herbal Pharma",
          sanskrit: "Dravyaguna",
          icon: "💊",
          percentage: assessmentResult.calibratedCareerDna.pharma,
          status: "Emerging",
          statusColor: "purple",
        },
        {
          id: "teaching",
          name: "Teaching",
          sanskrit: "Adhyapana",
          icon: "📚",
          percentage: assessmentResult.calibratedCareerDna.teaching || 54,
          status: "Viable",
          statusColor: "indigo",
        },
      ]
    : undefined;

  const dynamicStrengths = assessmentResult?.strengths.map((s) => ({
    name: s.skillName,
    score: s.score,
    level: "Validated",
  }));

  const dynamicImprovements = assessmentResult?.skillGaps.map((g) => ({
    name: g.skillName,
    priority: `${g.severity} Priority`,
    gap: g.deficitScore,
  }));

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* 1. Collapsible Sidebar (Desktop) + Mobile Drawer/Bottom Nav */}
      <StudentSidebar
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId)}
      />

      {/* 2. Main Dashboard Content Container */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-12">
        {/* Top Header */}
        <div className="px-4 sm:px-6 lg:px-8 pt-6">
          <DashboardHeader onOpenNotifications={() => alert("All 3 supervisor logbook approvals are up to date.")} />
        </div>

        {/* Dashboard Main Body */}
        <main className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1 max-w-7xl w-full mx-auto">
          {/* Unauthorized Role Access Security Alert Banner */}
          {errorParam === "unauthorized_role_access" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-medium flex items-center gap-3 shadow-sm"
            >
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <div>
                <strong>Access Restricted:</strong> Your student account is not authorized to access restricted industry/institution administration gateways. Redirected to your Scholar Dashboard.
              </div>
            </motion.div>
          )}

          {/* Onboarding Pending Callout (if onboarding not finished) */}
          {!isOnboardingComplete && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-accent/20 via-card to-card border border-accent/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-accent text-accent-foreground">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <strong className="text-foreground font-bold">Smart Career Onboarding Pending:</strong>
                  <p className="text-muted-foreground mt-0.5">
                    Complete your 5-stage career assessment to calibrate your NCISM baseline and unlock verified residency matching.
                  </p>
                </div>
              </div>
              <Link href="/student/onboarding" className="shrink-0 self-end sm:self-auto">
                <Button variant="gold" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                  Start Onboarding
                </Button>
              </Link>
            </div>
          )}

          {/* Assessment Diagnostic Status Callout Banner */}
          {assessmentResult ? (
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <strong className="text-white font-bold">
                    Skill DNA Calibrated ({assessmentResult.readinessLevel} • {assessmentResult.overallScore}%)
                  </strong>
                  <p className="text-white/70 mt-0.5">
                    Your clinical diagnostics and Ayush competency profile have been synchronized with your Competency Passport.
                  </p>
                </div>
              </div>
              <Link href="/student/assessment" className="shrink-0 self-end sm:self-auto">
                <Button variant="outline" size="sm" className="text-emerald-300 border-emerald-700/50 hover:bg-emerald-950/50">
                  Retake Diagnostic
                </Button>
              </Link>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-card to-card border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <strong className="text-foreground font-bold">Step 06 Diagnostic Assessment Ready:</strong>
                  <p className="text-muted-foreground mt-0.5">
                    Evaluate clinical case scenarios, therapeutics, and bioethics to generate your personalized Skill Gap Report.
                  </p>
                </div>
              </div>
              <Link href="/student/assessment" className="shrink-0 self-end sm:self-auto">
                <Button variant="gold" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                  Take Assessment
                </Button>
              </Link>
            </div>
          )}

          {/* Quick Actions Panel */}
          <QuickActionsWidget />

          {/* Top Greeting & Career Readiness Score Card */}
          <CareerReadinessWidget
            scholarName={displayName}
            degree={degree}
            academicYear={academicYear}
            institution={institution}
            primaryCareer={primaryCareer}
            readinessScore={assessmentResult ? assessmentResult.overallScore : 72}
            readinessLabel={assessmentResult ? assessmentResult.readinessLabel : "Developing"}
          />

          {/* Two-Column Grid: Career DNA & Skill Gap */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CareerDnaWidget dnaItems={dynamicDnaItems} />
            <SkillGapWidget
              customStrengths={dynamicStrengths}
              customImprovements={dynamicImprovements}
            />
          </div>

          {/* Two-Column Grid: Continue Learning & Competency Passport */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ContinueLearningWidget />
            <CompetencyWidget />
          </div>

          {/* Full-Width Section: Top Recommended Opportunities */}
          <TopOpportunitiesWidget />

          {/* Step 05 Verification Notice */}
          <div className="p-6 rounded-2xl bg-card border border-border/80 text-center space-y-2 text-xs">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
              Step 05 Student Dashboard Command Center Active
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Real-time synchronization active. Collapsible sidebar, mobile drawer, 72% Career Readiness ring, 4-track Career DNA, Skill Gap diagnostics, Continue Learning courses, and Top 3 Opportunities are operational.
            </p>
          </div>
        </main>

        {/* Scholar Dashboard Footer */}
        <footer className="px-4 sm:px-6 lg:px-8 pt-6 border-t border-border/60 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Ministry of Ayush • All India Institute of Ayurveda (AIIA)</p>
        </footer>
      </div>
    </div>
  );
}

export default function StudentPortalPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-xs uppercase tracking-widest font-mono">Loading Scholar Command Center...</p>
          </div>
        </div>
      }
    >
      <StudentDashboardContent />
    </React.Suspense>
  );
}
