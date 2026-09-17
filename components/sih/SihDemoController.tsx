"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  X,
  Play,
  ArrowRight,
  ShieldCheck,
  Building2,
  GraduationCap,
  Briefcase,
  Layers,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { loadSkillDna, saveSkillDna } from "@/lib/services/skillIntelligenceService";
import { NotificationService } from "@/lib/services/notificationService";

export interface DemoStep {
  step: number;
  title: string;
  actor: "INDUSTRY" | "SYSTEM" | "STUDENT" | "FACULTY" | "INSTITUTION";
  targetRoute: string;
  description: string;
  actionText: string;
  autoExecute?: () => void;
}

export function SihDemoController() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(1);

  const demoSteps: DemoStep[] = [
    {
      step: 1,
      title: "Industry Posts Data Analyst Opening",
      actor: "INDUSTRY",
      targetRoute: "/industry",
      description: "Dabur R&D / Ayush Grid posts 'Ayush Healthcare Data & Analytics Apprentice' requiring SQL, Python, Power BI, Statistics.",
      actionText: "Launch Industry Portal",
    },
    {
      step: 2,
      title: "Live in Opportunity Marketplace",
      actor: "SYSTEM",
      targetRoute: "/opportunities",
      description: "The opportunity appears in the national marketplace with NCISM & Ministry verification badges.",
      actionText: "View Marketplace",
    },
    {
      step: 3,
      title: "Skill DNA Comparison Engine",
      actor: "SYSTEM",
      targetRoute: "/opportunities",
      description: "Platform evaluates candidate Skill DNA against required competencies (SQL, Python, Power BI, Statistics).",
      actionText: "Inspect Compatibility",
    },
    {
      step: 4,
      title: "Candidate Sees 82% Compatibility & Gaps",
      actor: "STUDENT",
      targetRoute: "/opportunities",
      description: "Transparent explainability: SQL (Strong), Python (Strong), Statistics (Good), Power BI (Critical Gap).",
      actionText: "View 'Why You Match'",
    },
    {
      step: 5,
      title: "System Recommends Remediation Module",
      actor: "SYSTEM",
      targetRoute: "/learning",
      description: "System identifies Power BI deficit and recommends targeted practice module in LEARNING Hub.",
      actionText: "Open Learning Hub",
    },
    {
      step: 6,
      title: "Scholar Completes Study & Practice",
      actor: "STUDENT",
      targetRoute: "/learning",
      description: "Scholar engages with interactive clinical cases and diagnostic simulation.",
      actionText: "Verify Learning Modules",
    },
    {
      step: 7,
      title: "Take Assessment & Elevate Skill DNA",
      actor: "STUDENT",
      targetRoute: "/assess",
      description: "Scholar passes assessment with 85% score, upgrading skill from Self Declared to Assessment Verified ✓.",
      actionText: "Go to ASSESS Hub",
      autoExecute: () => {
        const skills = loadSkillDna();
        const updated = skills.map((s) =>
          s.name.includes("Biostatistics") || s.name.includes("Digital")
            ? { ...s, currentProficiency: 88, verificationStatus: "Assessment Verified" as const }
            : s
        );
        saveSkillDna(updated);
        NotificationService.addNotification({
          title: "Skill DNA Recalibrated: Power BI (+24 Pts)",
          message: "Assessment verified score recorded. Opportunity compatibility elevated.",
          category: "SKILL_GAP",
          priority: "HIGH",
        });
      },
    },
    {
      step: 8,
      title: "Opportunity Compatibility Improves to 94%",
      actor: "SYSTEM",
      targetRoute: "/opportunities",
      description: "Closed-loop recalculates: Compatibility surges from 82% to 94% with zero remaining critical deficits.",
      actionText: "Check Upgraded Match",
    },
    {
      step: 9,
      title: "1-Click Apply with Competency Passport",
      actor: "STUDENT",
      targetRoute: "/opportunities",
      description: "Scholar submits verified SHA-256 passport hash and 450 verified clinical hours to hospital recruiter.",
      actionText: "View Application Tracking",
    },
    {
      step: 10,
      title: "Industry Recruiter Shortlists Candidate",
      actor: "INDUSTRY",
      targetRoute: "/industry",
      description: "Recruiter reviews verified credentials, inspects 'Why This Candidate Matches', and advances stage to Shortlisted.",
      actionText: "Inspect Recruiter Pipeline",
    },
    {
      step: 11,
      title: "AI Mock Interview & Viva Preparation",
      actor: "STUDENT",
      targetRoute: "/career?tab=interview",
      description: "Scholar practices under live client-side webcam, Web Speech API transcription, and 4-warning focus guard.",
      actionText: "Launch AI Mock Interview",
    },
    {
      step: 12,
      title: "Final Selection & Placement Offer",
      actor: "INDUSTRY",
      targetRoute: "/opportunities",
      description: "Candidate is officially selected and receives institutional placement credential.",
      actionText: "Verify Selection Status",
    },
    {
      step: 13,
      title: "Structured 6-Dimension Industry Feedback",
      actor: "INDUSTRY",
      targetRoute: "/institution",
      description: "Preceptor submits structured rating (Technical, Communication, Professionalism, Problem Solving, Teamwork, Domain).",
      actionText: "View Feedback Loop",
    },
    {
      step: 14,
      title: "Verified Experience Minted in Portfolio",
      actor: "STUDENT",
      targetRoute: "/portfolio",
      description: "Experience appears permanently in Digital Competency Portfolio under 'Industry Verified ✓'.",
      actionText: "Inspect Official Portfolio",
    },
    {
      step: 15,
      title: "Institution Dashboard Reflects Ecosystem Growth",
      actor: "INSTITUTION",
      targetRoute: "/institution",
      description: "Leadership dashboard records closed demand-supply gap, higher cohort readiness, and active industry placement.",
      actionText: "View Institutional Impact",
    },
  ];

  const current = demoSteps[currentStep - 1] || demoSteps[0];

  const handleGoToStep = (stepNumber: number) => {
    setCurrentStep(stepNumber);
    const target = demoSteps[stepNumber - 1];
    if (target) {
      if (target.autoExecute) target.autoExecute();
      router.push(target.targetRoute);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 print:hidden font-sans">
      {/* Minimized Floating Controller Pill */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2.5 pr-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-bold shadow-2xl hover:scale-105 transition-all flex items-center gap-2.5 border-2 border-amber-300 ring-4 ring-amber-500/20 group"
          title="Open SIH 2026 Demo Walkthrough Controller"
        >
          <div className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-slate-950/40 bg-[#efe1c8] shrink-0">
            <Image
              src="/images/ayu-setu-emblem.png"
              alt="Ayu-Setu"
              width={28}
              height={28}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs font-serif font-extrabold uppercase tracking-wider">
            SIH Tour
          </span>
          <span className="px-1.5 py-0.5 rounded-full bg-slate-950 text-amber-300 text-[10px] font-mono font-bold">
            Step {currentStep}/15
          </span>
        </button>
      )}

      {/* Expanded Walkthrough Modal / Card */}
      {isOpen && (
        <div className="w-[360px] sm:w-[440px] rounded-3xl bg-[#02140c]/98 border border-amber-400/60 backdrop-blur-2xl shadow-2xl p-5 space-y-4 animate-in fade-in slide-in-from-bottom-3 text-xs">
          {/* Header */}
          <div className="flex items-start justify-between pb-3 border-b border-emerald-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-amber-400/60 bg-[#efe1c8] shrink-0 shadow-md">
                <Image
                  src="/images/ayu-setu-emblem.png"
                  alt="Ayu-Setu"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Badge variant="gold" size="sm" className="font-mono text-[9px] uppercase">
                    Smart India Hackathon 2026
                  </Badge>
                  <span className="text-[10px] text-emerald-400 font-bold">Ayu-Setu Story</span>
                </div>
                <h4 className="text-base font-serif font-bold text-white">
                  Step {current.step} of 15: {current.title}
                </h4>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Actor & Description Card */}
          <div className="p-3.5 rounded-2xl bg-black/50 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-gray-400">Actor / Chamber:</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                {current.actor}
              </span>
            </div>
            <p className="text-gray-200 leading-relaxed text-xs">
              {current.description}
            </p>
          </div>

          {/* Action Button to execute current step */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <Button
              onClick={() => handleGoToStep(current.step)}
              variant="gold"
              size="sm"
              className="w-full text-xs font-bold gap-1.5 shadow-md justify-center"
            >
              <span>{current.actionText}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Step Navigation & Direct Picker */}
          <div className="flex items-center justify-between pt-2 border-t border-emerald-500/20 text-[11px] text-gray-300">
            <button
              onClick={() => handleGoToStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="disabled:opacity-30 hover:text-white flex items-center gap-1 transition-colors font-semibold"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Prev</span>
            </button>

            {/* Quick Step Selector */}
            <select
              value={currentStep}
              onChange={(e) => handleGoToStep(Number(e.target.value))}
              className="px-2 py-1 rounded-lg bg-black/60 border border-emerald-500/30 text-amber-300 text-[11px] font-mono font-bold focus:outline-none"
            >
              {demoSteps.map((s) => (
                <option key={s.step} value={s.step}>
                  Step {s.step}: {s.title.slice(0, 22)}...
                </option>
              ))}
            </select>

            <button
              onClick={() => handleGoToStep(Math.min(15, currentStep + 1))}
              disabled={currentStep === 15}
              className="disabled:opacity-30 hover:text-white flex items-center gap-1 transition-colors font-semibold"
            >
              <span>Next</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
