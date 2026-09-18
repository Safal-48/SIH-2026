"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  Calendar,
  Compass,
  Award,
  Stethoscope,
  CheckCircle2,
  Clock,
  ArrowRight,
  Send,
  UserCheck,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Flame,
  Layers,
  GraduationCap,
  Filter,
  Check,
  Bot,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MarketingNavbar } from "@/components/marketing/MarketingNavbar";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import {
  loadSkillDna,
  getDecisionSupportOverview,
  SkillDnaItem,
  DecisionSupportOverview,
} from "@/lib/services/skillIntelligenceService";
import { cn } from "@/lib/utils/cn";

export type LearningTabType = "assistant" | "planner" | "roadmap" | "recommended" | "practice";

interface StudyTask {
  id: string;
  day: string;
  title: string;
  topic: string;
  skillAddressed: string;
  durationMins: number;
  completed: boolean;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  suggestedAction?: {
    label: string;
    url: string;
  };
}

function LearningHubContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = (searchParams?.get("tab") as LearningTabType) || "assistant";
  const [activeTab, setActiveTab] = React.useState<LearningTabType>(tabParam);

  const [skills, setSkills] = React.useState<SkillDnaItem[]>([]);
  const [overview, setOverview] = React.useState<DecisionSupportOverview | null>(null);

  // 1. Learning Assistant State
  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Namaste Dr. Aarav! I am your Ayush Clinical & Learning Guide. I can explain classical Samhita principles, breakdown pharmacokinetics of Dravyaguna, guide GCP-Ayush trial methodology, or suggest daily study steps to resolve your active skill gaps. What would you like to explore today?",
    },
  ]);
  const [userInput, setUserInput] = React.useState<string>("");
  const [isTyping, setIsTyping] = React.useState<boolean>(false);

  // 2. Study Planner State
  const [studyTasks, setStudyTasks] = React.useState<StudyTask[]>([
    {
      id: "task-1",
      day: "Today (Tuesday)",
      title: "Review Charaka Sutrasthana 13-14 on Snehana-Swedana Dosha Ripening",
      topic: "Panchakarma Safety",
      skillAddressed: "Panchakarma Protocol & Shodhana Safety",
      durationMins: 30,
      completed: true,
    },
    {
      id: "task-2",
      day: "Today (Tuesday)",
      title: "GCP-Ayush Sample Size Calculation Drill (CCRAS Methodology)",
      topic: "Research Methodology",
      skillAddressed: "GCP-Ayush Clinical Trial Methodology",
      durationMins: 35,
      completed: false,
    },
    {
      id: "task-3",
      day: "Tomorrow (Wednesday)",
      title: "HPTLC Marker Assay & API Pharmacopoeia Standard Review",
      topic: "Dravyaguna Pharmacology",
      skillAddressed: "Dravyaguna Pharmacology & Rasa Panchaka",
      durationMins: 40,
      completed: false,
    },
    {
      id: "task-4",
      day: "Thursday",
      title: "Practice 2 Inpatient Nadi Diagnostics Case Scenarios",
      topic: "Clinical Diagnostics",
      skillAddressed: "Nadi Pariksha & Pulse Diagnostics",
      durationMins: 25,
      completed: false,
    },
    {
      id: "task-5",
      day: "Friday",
      title: "Self-Assessment: Clinical Vignette Mock Exam (15 questions)",
      topic: "Comprehensive Diagnostics",
      skillAddressed: "Clinical Case Analysis & Samprapti Ghataka",
      durationMins: 30,
      completed: false,
    },
  ]);

  // 3. Clinical Case Practice State
  const [practiceStep, setPracticeStep] = React.useState<number>(0);
  const [selectedPracticeOption, setSelectedPracticeOption] = React.useState<string | null>(null);
  const [showPracticeRationale, setShowPracticeRationale] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (tabParam && ["assistant", "planner", "roadmap", "recommended", "practice"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  React.useEffect(() => {
    const loaded = loadSkillDna();
    setSkills(loaded);
    setOverview(getDecisionSupportOverview());
  }, []);

  const switchTab = (tab: LearningTabType) => {
    setActiveTab(tab);
    router.push(`/learning?tab=${tab}`);
  };

  const handleToggleTask = (taskId: string) => {
    setStudyTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || userInput;
    if (!query.trim()) return;

    const newMsgs: ChatMessage[] = [...chatMessages, { role: "user", content: query }];
    setChatMessages(newMsgs);
    setUserInput("");
    setIsTyping(true);

    setTimeout(() => {
      let botReply =
        "In classical Ayurvedic clinical practice, this condition requires a nuanced approach balancing Dosha, Dhatu, and Agni. Charaka Samhita emphasizes Deepana and Pachana as mandatory prerequisites before any intensive therapeutics.";
      let suggestedAction: { label: string; url: string } | undefined = undefined;

      const lower = query.toLowerCase();
      if (lower.includes("pitta") || lower.includes("pulse") || lower.includes("nadi")) {
        botReply =
          "Under Nadi Pariksha principles, Pitta pulse exhibits 'Mando-gati' to 'Manduka-gati' (frog-like leaping motion), felt distinctly under the index finger (Vata) and middle finger (Pitta). If aggravated by Ushna/Tikshna Guna, you will perceive sharp bounding beats with increased peripheral heat. Would you like to practice a clinical vignette?";
        suggestedAction = { label: "Practice Clinical Nadi Vignette", url: "/learning?tab=practice" };
      } else if (lower.includes("gcp") || lower.includes("trial") || lower.includes("research")) {
        botReply =
          "GCP-Ayush trials require Schedule Y compliance: IEC ethical clearance, patient bilingual informed consent, and batch GLP certificate of analysis for all classical formulations. Your research skill gap is currently 23 points. Resolving this will unlock AIIA & Dabur fellowship applications.";
        suggestedAction = { label: "Start GCP Trial Simulation Module", url: "/learning?tab=recommended" };
      } else if (lower.includes("dabur") || lower.includes("career") || lower.includes("pharma")) {
        botReply =
          "Dabur Research Foundation requires candidates with verified competence in Dravyaguna HPTLC standardization and GLP documentation. Your Dravyaguna proficiency is currently at 64% against the 85% industry benchmark.";
        suggestedAction = { label: "Take Dravyaguna Assessment", url: "/assess?type=skill" };
      } else {
        botReply =
          "According to Sushruta and Charaka Siddhanta, clinical management must align with Rogi-Roga Pariksha. I recommend reviewing your active study tasks for this week to maintain consistent progress.";
        suggestedAction = { label: "View Weekly Study Planner", url: "/learning?tab=planner" };
      }

      setChatMessages([...newMsgs, { role: "assistant", content: botReply, suggestedAction }]);
      setIsTyping(false);
    }, 700);
  };

  const completedTaskCount = studyTasks.filter((t) => t.completed).length;
  const taskProgressPercent = Math.round((completedTaskCount / studyTasks.length) * 100);

  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* 1. Master Navbar */}
      <MarketingNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-8">
        {/* Section Header */}
        <div className="space-y-3 pb-2 border-b border-border/60">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/home" className="hover:text-foreground transition-colors">
              Scholar Home
            </Link>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">LEARNING HUB</span>
            <span>/</span>
            <span className="text-gray-300 uppercase font-bold">{activeTab}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Ayush <span className="text-amber-400">Learning &amp; Practice Chamber</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-300/85 mt-1 max-w-2xl">
                Personalized study planner, AI conceptual assistant, adaptive roadmap, and clinical cases mapped directly to your active skill deficits.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-amber-300 font-mono bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/30">
                Closed Loop: Learn → Practice → Assess → Verify
              </span>
            </div>
          </div>
        </div>

        {/* 5-Tab Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 rounded-2xl bg-[#03190f]/90 border border-emerald-500/30 backdrop-blur-xl">
          {[
            { id: "assistant", label: "Learning Assistant", icon: <Bot className="h-4 w-4" /> },
            { id: "planner", label: "Study Planner", icon: <Calendar className="h-4 w-4" /> },
            { id: "roadmap", label: "Learning Roadmap", icon: <Compass className="h-4 w-4" /> },
            { id: "recommended", label: "Recommended Learning", icon: <BookOpen className="h-4 w-4" /> },
            { id: "practice", label: "Clinical Case Practice", icon: <Stethoscope className="h-4 w-4" /> },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => switchTab(tab.id as LearningTabType)}
                className={cn(
                  "py-2.5 px-3 rounded-xl text-xs sm:text-[13px] font-bold flex items-center justify-center gap-2 transition-all",
                  isSelected
                    ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                )}
              >
                {tab.icon}
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: LEARNING ASSISTANT (AYUSH AI CONVERSATIONAL GUIDE) */}
        {activeTab === "assistant" && (
          <div className="rounded-3xl border border-emerald-500/30 bg-[#041a10]/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-950 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Ayush Clinical Intelligence Guide</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-white">
                  Ask Anything on Samhita, Pharmacology, Diagnostics or Trials
                </h3>
              </div>
              <Badge variant="gold" size="sm">AIIA Knowledge Base Powered</Badge>
            </div>

            {/* Quick Context Prompt Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400">Suggested Inquiries:</span>
              {[
                "Explain Pitta-Kapha pulse variations in Kayachikitsa",
                "Protocol for Vamana Virechana in metabolic disorders",
                "How to design a Phase II trial under GCP-Ayush?",
                "What skills do I need for Dabur Phytopharmaceutical R&D?",
              ].map((pill) => (
                <button
                  key={pill}
                  onClick={() => handleSendMessage(pill)}
                  className="text-xs px-3 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition-colors"
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Chat Messages Container */}
            <div className="h-96 overflow-y-auto space-y-4 p-4 rounded-2xl bg-[#02130b] border border-emerald-950/80">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex flex-col max-w-2xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2",
                    msg.role === "user"
                      ? "ml-auto bg-amber-400/15 border border-amber-400/40 text-amber-100"
                      : "mr-auto bg-card/70 border border-emerald-500/20 text-gray-200"
                  )}
                >
                  <div className="font-bold text-[11px] uppercase tracking-wider text-emerald-400">
                    {msg.role === "user" ? "You (Ayurveda Scholar)" : "Ayu-Setu AI Assistant"}
                  </div>
                  <div>{msg.content}</div>
                  {msg.suggestedAction && (
                    <div className="pt-2">
                      <Link href={msg.suggestedAction.url}>
                        <Button variant="gold" size="sm" className="text-xs font-bold">
                          {msg.suggestedAction.label} →
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="text-xs text-gray-400 italic flex items-center gap-2">
                  <RefreshCw className="h-3 w-3 animate-spin text-amber-400" />
                  <span>Consulting classical Samhitas and clinical registries...</span>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask a clinical, diagnostic, or pharmacology question..."
                className="flex-1 bg-[#02130b] border border-emerald-500/40 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-gray-500 outline-none focus:border-amber-400"
              />
              <Button
                variant="gold"
                size="md"
                onClick={() => handleSendMessage()}
                rightIcon={<Send className="h-4 w-4" />}
                className="font-bold text-xs px-5 h-11"
              >
                Ask Assistant
              </Button>
            </div>
          </div>
        )}

        {/* TAB 2: PERSONALIZED STUDY PLANNER */}
        {activeTab === "planner" && (
          <div className="rounded-3xl border border-emerald-500/30 bg-[#041a10]/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-950 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Personalized Weekly Learning Schedule</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-white">
                  Dynamic Study Roadmap Driven by Your Active Gaps
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-gray-400">Weekly Completion</div>
                  <div className="text-sm font-mono font-bold text-amber-400">
                    {completedTaskCount} of {studyTasks.length} Completed ({taskProgressPercent}%)
                  </div>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 w-full bg-emerald-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 transition-all duration-300"
                style={{ width: `${taskProgressPercent}%` }}
              />
            </div>

            {/* Task Checklist */}
            <div className="space-y-3">
              {studyTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={cn(
                    "p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4",
                    task.completed
                      ? "bg-emerald-950/30 border-emerald-500/20 opacity-75"
                      : "bg-card/60 border-emerald-500/30 hover:border-emerald-500/60"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5",
                        task.completed
                          ? "bg-emerald-500 border-emerald-500 text-slate-950"
                          : "border-gray-500"
                      )}
                    >
                      {task.completed && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-amber-400">{task.day}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-[11px] text-emerald-300">{task.topic}</span>
                      </div>
                      <div className={cn("text-xs sm:text-sm font-semibold", task.completed ? "line-through text-gray-400" : "text-white")}>
                        {task.title}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        Resolves gap in: <strong className="text-gray-300">{task.skillAddressed}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 text-xs text-gray-400 bg-card/60 px-2.5 py-1 rounded-lg border border-border/60">
                    <Clock className="h-3.5 w-3.5 text-amber-400" />
                    <span>{task.durationMins}m</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-emerald-950 flex items-center justify-between text-xs text-gray-400">
              <span>Tasks automatically re-calibrate when assessment scores improve.</span>
              <Link href="/assess" className="font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1">
                <span>Take Assessment to Validate Progress</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* TAB 3: ADAPTIVE LEARNING ROADMAP */}
        {activeTab === "roadmap" && (
          <div className="rounded-3xl border border-emerald-500/30 bg-[#041a10]/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-8">
            <div className="space-y-1 border-b border-emerald-950 pb-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <Compass className="h-3.5 w-3.5" />
                <span>Career Goal + Skill DNA → Adaptive Trajectory</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-white">
                Personalized Trajectory for Clinical Fellowship &amp; Hospital Residency
              </h3>
              <p className="text-xs text-gray-300">
                This roadmap adapts in real-time as you complete clinical assessments and verify procedural hours.
              </p>
            </div>

            {/* 4 Progressive Milestone Tiers */}
            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Foundational Classical Diagnostics & Samhita Siddhanta",
                  status: "COMPLETED",
                  badge: "100% Calibrated • Assessment Verified",
                  desc: "Comprehensive mastery of Charaka Sutrasthana, Tridosha assessment, and basic Rogi Sambhashana.",
                  skills: ["Samhita & Siddhanta Principles (82%)", "Kriya Sharira (78%)"],
                },
                {
                  step: "02",
                  title: "Inpatient Clinical Diagnostics & Pulse Examination (Nadi)",
                  status: "ACTIVE",
                  badge: "In Progress • 76% Proficiency",
                  desc: "Bedside evaluation of Rogamarga, acute metabolic disorders, and supervised Nadi Pariksha recording.",
                  skills: ["Nadi Pariksha & Pulse Diagnostics (76%)", "Clinical Case Analysis (74%)"],
                },
                {
                  step: "03",
                  title: "Procedural Panchakarma Safety & GCP-Ayush Trial Methodology",
                  status: "CRITICAL_GAP",
                  badge: "High Deficit • Priority Focus",
                  desc: "Clinical trial design, Schedule Y ethics, and inpatient Shodhana emergency protocol verification.",
                  skills: ["GCP Clinical Trial Methodology (52% / 75%)", "Dravyaguna Pharmacology (64% / 85%)"],
                },
                {
                  step: "04",
                  title: "Apex Institutional Residency & Clinical Fellowship Match",
                  status: "UNLOCKED_NEXT",
                  badge: "Target Benchmark",
                  desc: "Direct interview fast-tracking with AIIA New Delhi, Kottakkal AVS, and Dabur R&D centers.",
                  skills: ["Requires Overall Skill Readiness ≥ 80%"],
                },
              ].map((tier, idx) => (
                <div
                  key={tier.step}
                  className={cn(
                    "p-6 rounded-2xl border transition-all space-y-3 relative overflow-hidden",
                    tier.status === "COMPLETED"
                      ? "bg-emerald-950/30 border-emerald-500/40"
                      : tier.status === "ACTIVE"
                      ? "bg-amber-950/30 border-amber-500/40 shadow-lg shadow-amber-500/10"
                      : tier.status === "CRITICAL_GAP"
                      ? "bg-red-950/20 border-red-500/40"
                      : "bg-card/40 border-border/60 opacity-80"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center font-serif font-bold text-amber-400">
                        {tier.step}
                      </span>
                      <h4 className="text-base font-bold text-white">{tier.title}</h4>
                    </div>

                    <Badge
                      variant={
                        tier.status === "COMPLETED"
                          ? "gold"
                          : tier.status === "ACTIVE"
                          ? "gold"
                          : tier.status === "CRITICAL_GAP"
                          ? "destructive"
                          : "outline"
                      }
                      size="sm"
                      className="font-bold text-[11px]"
                    >
                      {tier.badge}
                    </Badge>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 pl-12 leading-relaxed">
                    {tier.desc}
                  </p>

                  <div className="pl-12 flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs text-gray-400">Mapped Competencies:</span>
                    {tier.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-[11px] text-emerald-200 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RECOMMENDED LEARNING */}
        {activeTab === "recommended" && (
          <div className="rounded-3xl border border-emerald-500/30 bg-[#041a10]/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-950 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>NCISM-Accredited Curriculum</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-white">
                  Targeted Micro-Modules &amp; Clinical Certifications
                </h3>
              </div>
              <Badge variant="gold" size="sm">4 Recommended</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: "mod-1",
                  title: "GCP-Ayush Clinical Trial Protocol & Dossier Preparation",
                  provider: "CCRAS & All India Institute of Ayurveda",
                  duration: "45 mins",
                  type: "Simulation Module",
                  skill: "GCP-Ayush Clinical Trial Methodology",
                  desc: "Step-by-step masterclass on designing double-blind protocols, CRF validation, and IEC clearance compliance.",
                },
                {
                  id: "mod-2",
                  title: "Rasa Panchaka & Active Phytochemical Marker Standardization",
                  provider: "Dabur Research Foundation Lab Hub",
                  duration: "35 mins",
                  type: "Lab Interactive",
                  skill: "Dravyaguna Pharmacology",
                  desc: "Hands-on HPTLC virtual assay, fingerprint analysis of botanical raw materials, and API compliance.",
                },
                {
                  id: "mod-3",
                  title: "Inpatient Panchakarma Protocol & Shodhana Emergency Management",
                  provider: "Kottakkal Arya Vaidya Sala Training Academy",
                  duration: "40 mins",
                  type: "Hospital Video Simulation",
                  skill: "Panchakarma Protocol & Safety",
                  desc: "Evaluating Virechana Vegas, pulse changes under Snehana, and immediate management of Atiyoga.",
                },
                {
                  id: "mod-4",
                  title: "EHR Documentation & NAMASTE Portal Morbidity Coding",
                  provider: "National Ayush Mission Informatics Wing",
                  duration: "25 mins",
                  type: "EHR Workshop",
                  skill: "Ayush Hospital EHR & Coding",
                  desc: "Mapping Sanskrit Rogamarga diagnostics to ICD-11 TM2 digital morbidity codes.",
                },
              ].map((course) => (
                <div
                  key={course.id}
                  className="p-5 rounded-2xl bg-card/60 border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30">
                        {course.type}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {course.duration}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white">{course.title}</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{course.desc}</p>
                    <div className="text-[11px] text-emerald-300 font-medium pt-1">
                      Provider: <strong>{course.provider}</strong>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-emerald-950 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Addresses: {course.skill}</span>
                    <Button variant="gold" size="sm" className="text-xs font-bold px-4">
                      Enroll Module
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CLINICAL CASE PRACTICE */}
        {activeTab === "practice" && (
          <div className="rounded-3xl border border-emerald-500/30 bg-[#041a10]/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-950 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Stethoscope className="h-3.5 w-3.5" />
                  <span>Clinical Decision Simulation</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-white">
                  Case 104: Acute Asthimajjagata Presentation vs Sama Amavata
                </h3>
              </div>
              <Badge variant="gold" size="sm">Case 1 of 4</Badge>
            </div>

            {/* Inpatient Vignette Overview */}
            <div className="p-5 rounded-2xl bg-emerald-950/70 border border-amber-500/40 space-y-3">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Stethoscope className="h-4 w-4" />
                <span>Patient Clinical Presentation (OPD Logbook Case #2026-981)</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                A 52-year-old female presents with acute pain and swelling in both knee joints, accompanied by morning heaviness, loss of appetite, and constipation. Nadi examination reveals deep, slow, picchila (slimy) quality. Tongue is coated white (Sama Jihva).
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] text-emerald-200">
                <div><strong>Prakriti:</strong> Kapha-Vata</div>
                <div><strong>Agni:</strong> Mandagni</div>
                <div><strong>Koshta:</strong> Krura</div>
                <div><strong>Duration:</strong> 3 Weeks</div>
              </div>
            </div>

            {/* Decision Question */}
            <div className="space-y-3">
              <h4 className="text-sm sm:text-base font-bold text-white">
                Which immediate intervention is indicated prior to initiating classical Janu Basti?
              </h4>

              <div className="space-y-2.5">
                {[
                  { id: "A", text: "Administer high-potency Ksheerabala Taila Janu Basti immediately", correct: false, rationale: "Snehana in Sama state will block Srotas and exacerbate inflammatory swelling." },
                  { id: "B", text: "Langhana (light diet) and Deepana-Pachana with Shunthi-Guduchi Kwatha until Ama is cleared", correct: true, rationale: "Correct! 'आमे सति न कुर्यात् स्नेहनम्' - Nirama state must be confirmed before unctuous therapies." },
                  { id: "C", text: "Instant Shirodhara with warm sesame oil", correct: false, rationale: "Irrelevant to joint inflammation in the acute Ama stage." },
                  { id: "D", text: "Cold water compress and ice therapy", correct: false, rationale: "Violates Vata-Kapha management and contracts Srotas." },
                ].map((opt) => {
                  const isSelected = selectedPracticeOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSelectedPracticeOption(opt.id);
                        setShowPracticeRationale(true);
                      }}
                      className={cn(
                        "w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3",
                        isSelected
                          ? opt.correct
                            ? "bg-emerald-950/80 border-emerald-400 text-white"
                            : "bg-red-950/80 border-red-400 text-white"
                          : "bg-card/50 border-border hover:bg-emerald-950/40 text-gray-200"
                      )}
                    >
                      <span className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-xs font-bold shrink-0">
                        {opt.id}
                      </span>
                      <div className="space-y-1">
                        <div className="text-xs sm:text-sm font-medium">{opt.text}</div>
                        {showPracticeRationale && isSelected && (
                          <div className="text-xs text-amber-300 font-normal pt-1">
                            <strong>Clinical Rationale:</strong> {opt.rationale}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Practice Footer */}
            <div className="pt-3 border-t border-emerald-950 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                {showPracticeRationale ? "Rationale revealed above." : "Select an option to evaluate diagnostic reasoning."}
              </span>
              <Button
                variant="gold"
                size="sm"
                onClick={() => {
                  setSelectedPracticeOption(null);
                  setShowPracticeRationale(false);
                }}
                className="text-xs font-bold"
              >
                Next Case Scenario →
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <MarketingFooter />
    </div>
  );
}

export default function LearningHubPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading Learning Hub...</div>}>
      <LearningHubContent />
    </React.Suspense>
  );
}

