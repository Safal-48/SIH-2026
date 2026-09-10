"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Clock,
  Award,
  AlertCircle,
  Home,
  BrainCircuit,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/cards/Card";
import { useAuth } from "@/hooks/useAuth";
import { loadOnboardingDraftLocally } from "@/lib/services/studentOnboarding";

function AssessmentPrepContent() {
  const { user } = useAuth();
  const [onboardingData, setOnboardingData] = React.useState(loadOnboardingDraftLocally());

  React.useEffect(() => {
    setOnboardingData(loadOnboardingDraftLocally());
  }, []);

  const primaryCareer = onboardingData?.primaryCareerGoal || "Clinical Practice";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between pb-6 border-b border-border/70 z-10">
        <Link
          href="/student"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>Scholar Portal</span>
        </Link>
        <Badge variant="verified" size="sm" icon={<ShieldCheck className="h-3 w-3" />}>
          NCISM Diagnostic Module
        </Badge>
      </div>

      {/* Main Chamber */}
      <main className="max-w-3xl mx-auto w-full my-8 z-10 space-y-8">
        {/* Title */}
        <div className="text-center space-y-2.5">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-primary via-herbal-700 to-accent text-white flex items-center justify-center shadow-xl shadow-accent/20">
            <BrainCircuit className="h-8 w-8 text-accent" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" /> Stage 02 of Student Journey: Skill Diagnostic
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-sans">
            Personalized Skill Assessment Preparation
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Welcome, <strong>{user?.fullName || "Scholar"}</strong>. Your profile has been calibrated for{" "}
            <strong className="text-accent">{primaryCareer}</strong>. Before launching your diagnostic, review the assessment parameters below.
          </p>
        </div>

        {/* Diagnostic Parameters Card */}
        <Card variant="default" className="p-6 space-y-6 border-border shadow-xl">
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Compass className="h-4 w-4 text-accent" />
            Assessment Blueprint & Guidelines
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-card border border-border/80 space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
                <BookOpen className="h-4 w-4 text-primary" /> Questions
              </div>
              <p className="text-2xl font-bold text-foreground">120 Vignettes</p>
              <p className="text-[11px] text-muted-foreground">Scenario-based clinical & pharmacological puzzles</p>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border/80 space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
                <Clock className="h-4 w-4 text-accent" /> Pacing
              </div>
              <p className="text-2xl font-bold text-foreground">35–45 Mins</p>
              <p className="text-[11px] text-muted-foreground">Untimed adaptive pace; pause & resume supported</p>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border/80 space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
                <Award className="h-4 w-4 text-secondary" /> Outcome
              </div>
              <p className="text-2xl font-bold text-foreground">Career DNA</p>
              <p className="text-[11px] text-muted-foreground">Instant Skill Gap report & Residency matching</p>
            </div>
          </div>

          {/* Calibrated Pillars */}
          <div className="space-y-2 pt-2 border-t border-border/60">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              Tested Competency Domains:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-muted/40 border border-border/60 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>Roga Nidana & Classical Pulse Interpretation</span>
              </div>
              <div className="p-2.5 rounded-lg bg-muted/40 border border-border/60 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>Dravyaguna Phytochemistry & Formulation Safety</span>
              </div>
              <div className="p-2.5 rounded-lg bg-muted/40 border border-border/60 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>Panchakarma Protocol Planning & Bio-purification</span>
              </div>
              <div className="p-2.5 rounded-lg bg-muted/40 border border-border/60 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>Good Clinical Practice (GCP) & Evidence Trials</span>
              </div>
            </div>
          </div>

          {/* Notice */}
          <div className="p-4 rounded-xl bg-accent/10 border border-accent/25 text-xs text-foreground flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
            <div>
              <strong>Step 04 Ready:</strong> Your onboarding profile has been registered in the database.
              In <strong>STEP 06</strong>, your dynamic question set has been calibrated based on your BAMS year, track, and exposure.
            </div>
          </div>
        </Card>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/student/assessment" className="w-full sm:w-auto">
            <Button
              variant="gold"
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
              className="w-full sm:w-auto shadow-lg shadow-accent/20 px-8"
            >
              Launch Diagnostic Engine
            </Button>
          </Link>

          <Link href="/student" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Return to Scholar Dashboard
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-3xl mx-auto w-full text-center text-xs text-muted-foreground pt-6 border-t border-border/40 z-10">
        <p>© {new Date().getFullYear()} Ministry of Ayush • All India Institute of Ayurveda</p>
      </footer>
    </div>
  );
}

export default function AssessmentPrepPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-xs uppercase tracking-widest font-mono">Loading Assessment Preparation...</p>
          </div>
        </div>
      }
    >
      <AssessmentPrepContent />
    </React.Suspense>
  );
}
