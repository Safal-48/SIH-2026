"use client";

import * as React from "react";
import Link from "next/link";
import {
  Map,
  Compass,
  CheckCircle2,
  Clock,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Printer,
  ShieldCheck,
  TrendingUp,
  Award,
  Layers,
  Banknote,
  Building2,
  ExternalLink,
  Target,
  Rocket,
  FlaskConical,
  Check,
  AlertCircle,
  HelpCircle,
  FileCheck,
} from "lucide-react";
import { Card } from "@/components/cards/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  careerRoadmapService,
  StudentCareerRoadmapData,
  OutcomePathwayCategory,
  CareerOutcomePathway,
} from "@/lib/services/careerRoadmapService";

export default function CareerRoadmapPage() {
  const [data, setData] = React.useState<StudentCareerRoadmapData | null>(null);
  const [selectedPathway, setSelectedPathway] = React.useState<OutcomePathwayCategory | "ALL">("ALL");
  const [showComparator, setShowComparator] = React.useState<boolean>(false);

  React.useEffect(() => {
    const roadmap = careerRoadmapService.getRoadmapData();
    setData(roadmap);
  }, []);

  if (!data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const filteredPathways = selectedPathway === "ALL"
    ? data.pathways
    : data.pathways.filter((p) => p.id === selectedPathway);

  return (
    <div className="space-y-8 pb-16 print:p-0 print:space-y-4">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
            <Link href="/student" className="hover:text-foreground transition-colors">
              Student Command Center
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-primary font-semibold">Career Roadmap</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2.5">
            <span>Your Career Roadmap</span>
            <Badge variant="gold" size="sm" icon={<Sparkles className="h-3 w-3" />}>
              End-to-End Trajectory
            </Badge>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl">
            From classroom to clinical leadership: Connecting your baseline diagnostic gaps and practical experience to verified competencies and premier Ayurvedic career outcomes.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Printer className="h-4 w-4" />}
            className="text-xs"
          >
            Export Blueprint PDF
          </Button>
          <Link href="/student/opportunities">
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              className="text-xs shadow-sm"
            >
              Explore Opportunities
            </Button>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* EXECUTIVE ROADMAP BANNER                                                   */}
      {/* ========================================================================= */}
      <Card
        variant="default"
        className="p-6 sm:p-8 rounded-3xl border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 shadow-md relative overflow-hidden"
      >
        <div className="absolute -right-8 -bottom-8 pointer-events-none opacity-5 dark:opacity-10">
          <Compass className="h-80 w-80 text-primary" />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border/70">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-secondary/15 text-secondary border border-secondary/30 flex items-center justify-center shrink-0">
              <Compass className="h-7 w-7" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase">
                MINISTRY OF AYUSH • ACADEMIA-TO-INDUSTRY PIPELINE
              </p>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-serif">
                YOUR AYURVEDIC CAREER BLUEPRINT
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {data.degree} • {data.currentYear} • {data.institution}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 bg-muted/40 p-3 sm:p-4 rounded-2xl border border-border/80 text-center shrink-0">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-mono text-muted-foreground block">Readiness Index</span>
              <span className="text-lg sm:text-2xl font-extrabold text-foreground">{data.overallReadinessScore}%</span>
            </div>
            <div className="space-y-0.5 border-x border-border/60">
              <span className="text-[10px] uppercase font-mono text-muted-foreground block">Clinical Hours</span>
              <span className="text-lg sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {data.clinicalHoursLogged} Hrs
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-mono text-muted-foreground block">Primary Track</span>
              <span className="text-xs sm:text-sm font-extrabold text-primary truncate block mt-1">
                Clinical (84%)
              </span>
            </div>
          </div>
        </div>

        {/* 7-Stage Trajectory Breadcrumb Bar */}
        <div className="pt-6">
          <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-bold mb-3">
            The 7-Stage Competency Progression:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
            {data.stages.map((st) => (
              <div
                key={st.id}
                className="p-3 rounded-xl bg-card border border-border/80 flex flex-col justify-between space-y-1 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-primary">0{st.id}</span>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                </div>
                <p className="font-bold text-foreground truncate text-[11px]">{st.title.replace(/^\d+\.\s*/, "")}</p>
                <span className="text-[9px] font-mono text-muted-foreground">{st.badgeText}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* ========================================================================= */}
      {/* SECTION 1: THE 7-STAGE TRAJECTORY (EXACT USER PROMPT SPECIFICATION)         */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <span>The 7-Stage Career Progression Architecture</span>
            </h2>
            <p className="text-xs text-muted-foreground">
              Sequential milestones verifying academic rigor, bedside experience, and institutional attestations.
            </p>
          </div>
          <Badge variant="verified" size="sm" icon={<ShieldCheck className="h-3 w-3" />}>
            7 / 7 Stages Active & Verified
          </Badge>
        </div>

        {/* 7 Interactive Stage Cards in Vertical / Grid Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.stages.map((stage) => (
            <Card
              key={stage.id}
              variant="default"
              className="p-5 rounded-2xl border-border/80 flex flex-col justify-between space-y-4 hover:border-primary/50 hover:shadow-md transition-all group"
            >
              <div className="space-y-2.5">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="h-7 w-7 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-mono font-bold text-xs">
                    0{stage.id}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold font-mono">
                    <Check className="h-3 w-3" />
                    <span>{stage.badgeText}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-foreground group-hover:text-primary transition-colors">
                    {stage.title}
                  </h3>
                  <p className="text-[11px] text-accent font-serif italic mt-0.5">
                    {stage.sanskrit}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {stage.summary}
                </p>

                {/* Evidence Metrics */}
                <div className="p-2.5 rounded-xl bg-muted/40 border border-border/60 space-y-1 text-[11px]">
                  {stage.keyMetrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-foreground/85">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span className="truncate">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-2 border-t border-border/60">
                <Link href={stage.actionUrl}>
                  <Button
                    variant="outline"
                    size="sm"
                    rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                    className="w-full justify-between text-xs"
                  >
                    <span>{stage.actionLabel}</span>
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: THE 5 POTENTIAL OUTCOME PATHWAYS (EXACT USER PROMPT SPEC)       */}
      {/* ========================================================================= */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <Rocket className="h-5 w-5 text-secondary" />
              <span>Potential Career Outcomes</span>
            </h2>
            <p className="text-xs text-muted-foreground">
              Direct pathways calibrated to your verified Competency Passport and Career DNA: Internship, Job, PG, Research, and Entrepreneurship.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowComparator(!showComparator)}
            className="text-xs shrink-0 self-start sm:self-auto print:hidden"
          >
            {showComparator ? "Hide Comparison Table" : "Compare All 5 Pathways"}
          </Button>
        </div>

        {/* Pathway Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-border/80 print:hidden">
          {[
            { id: "ALL", label: "All Pathways (5)" },
            { id: "INTERNSHIP", label: "🎓 Internship (91%)" },
            { id: "JOB", label: "💼 Job (86%)" },
            { id: "PG", label: "📚 PG / MD-MS (84%)" },
            { id: "RESEARCH", label: "🔬 Research (88%)" },
            { id: "ENTREPRENEURSHIP", label: "🚀 Entrepreneurship (76%)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedPathway(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedPathway === tab.id
                  ? "bg-secondary text-secondary-foreground shadow-sm"
                  : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pathways Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPathways.map((pathway) => (
            <Card
              key={pathway.id}
              variant="default"
              className="p-6 sm:p-7 rounded-3xl border-border/80 hover:border-secondary/50 transition-all space-y-5 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header: Badge, Compatibility, and Title */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <Badge variant="secondary" size="sm">
                      {pathway.categoryLabel}
                    </Badge>
                    <h3 className="text-lg sm:text-xl font-extrabold text-foreground">
                      {pathway.title}
                    </h3>
                    <p className="text-[11px] text-accent font-serif italic">
                      {pathway.sanskritTitle}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-right shrink-0">
                    <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono block">
                      {pathway.compatibilityScore}%
                    </span>
                    <span className="text-[9px] uppercase font-bold text-muted-foreground font-mono">
                      Match Fit
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                  {pathway.tagline}
                </p>

                {/* Key Facts Row: Compensation & Duration */}
                <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-muted/40 border border-border/70 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-muted-foreground block">
                      Starting Package / Stipend
                    </span>
                    <span className="font-bold text-foreground text-xs sm:text-sm">{pathway.startingCompensation}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-muted-foreground block">
                      Timeline / Commitment
                    </span>
                    <span className="font-bold text-foreground">{pathway.durationOrTimeline}</span>
                  </div>
                </div>

                {/* Top Destinations */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                    Top Destination Institutions & Employers:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {pathway.topDestinations.map((dest, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-card border border-border text-[11px] font-medium text-foreground flex items-center gap-1"
                      >
                        <Building2 className="h-3 w-3 text-primary" />
                        <span>{dest}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Prerequisites Check */}
                <div className="space-y-2 text-xs pt-1">
                  <span className="text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                    Prerequisites Alignment:
                  </span>
                  <div className="space-y-1">
                    {pathway.prerequisitesMet.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 text-[11px]">
                        <Check className="h-3.5 w-3.5 shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                    {pathway.prerequisitesRemaining.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-[11px]">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>Next Step: {req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3-Year Growth Milestones */}
                <div className="p-3.5 rounded-2xl bg-card border border-border/80 space-y-1.5 text-xs">
                  <span className="text-[10px] font-mono uppercase font-bold text-secondary tracking-wider block">
                    3-Year Clinical Career Ladder:
                  </span>
                  {pathway.growthMilestones.map((milestone, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                      <strong className="text-foreground shrink-0 font-mono">{milestone.year}:</strong>
                      <span>{milestone.milestone}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-border/70 flex items-center justify-between gap-3 text-xs">
                <span className="text-[11px] text-muted-foreground">
                  Accredited by Ministry of Ayush
                </span>

                <Link
                  href={
                    pathway.id === "INTERNSHIP" || pathway.id === "JOB" || pathway.id === "RESEARCH"
                      ? "/student/opportunities"
                      : pathway.id === "PG"
                      ? "/student/learning"
                      : "/student/passport"
                  }
                >
                  <Button
                    variant={pathway.compatibilityScore >= 88 ? "primary" : "outline"}
                    size="sm"
                    rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                    className="text-xs"
                  >
                    {pathway.id === "INTERNSHIP"
                      ? "Apply to Residencies"
                      : pathway.id === "JOB"
                      ? "Browse Job Openings"
                      : pathway.id === "PG"
                      ? "Prepare for AIAPGET"
                      : pathway.id === "RESEARCH"
                      ? "View CCRAS Grants"
                      : "Explore Startup Support"}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: PATHWAY COMPARISON MATRIX (TABLE)                               */}
      {/* ========================================================================= */}
      {showComparator && (
        <Card variant="default" className="p-6 rounded-3xl border-border/80 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-border/70">
            <div>
              <h3 className="text-base font-bold text-foreground">5-Pathway Comparative Synthesis</h3>
              <p className="text-xs text-muted-foreground">
                Compare timelines, compensation, institutions, and entry criteria.
              </p>
            </div>
            <Badge variant="outline" size="sm">Side-by-Side Analysis</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-border/80 text-muted-foreground font-mono uppercase text-[10px]">
                  <th className="py-2.5 px-3">Career Pathway</th>
                  <th className="py-2.5 px-3">Fit Index</th>
                  <th className="py-2.5 px-3">Duration</th>
                  <th className="py-2.5 px-3">Expected Compensation</th>
                  <th className="py-2.5 px-3">Key Focus Area</th>
                  <th className="py-2.5 px-3">Top Anchor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {data.pathways.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-3 font-bold text-foreground">{p.title}</td>
                    <td className="py-3 px-3">
                      <span className="font-mono font-bold text-emerald-600">{p.compatibilityScore}%</span>
                    </td>
                    <td className="py-3 px-3 text-muted-foreground">{p.durationOrTimeline}</td>
                    <td className="py-3 px-3 font-semibold text-foreground">{p.startingCompensation}</td>
                    <td className="py-3 px-3 text-muted-foreground">{p.sampleRoles[0]}</td>
                    <td className="py-3 px-3 text-primary">{p.topDestinations[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
