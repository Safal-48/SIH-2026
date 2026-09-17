"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Home,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  Building2,
  GraduationCap,
  TrendingUp,
  Award,
  Sparkles,
  Users,
  Layers,
  FileText,
  Clock,
  ExternalLink,
  ChevronRight,
  Download,
  AlertTriangle,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import { useAuth } from "@/hooks/useAuth";
import { ROLE_DEFINITIONS } from "@/types/roles";
import { EcosystemRoleSwitcher } from "@/components/layout/EcosystemRoleSwitcher";

import {
  InstitutionPortalService,
  SkillDomainScore,
  InstitutionProfile,
  IndustryMoUItem,
  CohortScholarItem,
  RemedialWorkshopItem,
  FeedbackLoopStage,
} from "@/lib/services/institutionPortalService";

import { SkillHeatmapWidget } from "@/components/institution/SkillHeatmapWidget";
import { SkillGapRecommendationWidget } from "@/components/institution/SkillGapRecommendationWidget";
import { AcademiaIndustryFeedbackLoop } from "@/components/institution/AcademiaIndustryFeedbackLoop";
import { CreateResearchWorkshopModal } from "@/components/institution/CreateResearchWorkshopModal";
import { SkillDemandService } from "@/lib/services/skillDemandService";

type InstitutionTabType = "heatmap" | "cohort" | "mous" | "interventions" | "accreditation";

function InstitutionPortalContent() {
  const { user, logout } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const service = React.useMemo(() => new InstitutionPortalService(), []);

  // Current tab from URL or fallback to heatmap
  const tabParam = searchParams?.get("tab") as InstitutionTabType | null;
  const [activeTab, setActiveTab] = React.useState<InstitutionTabType>(
    tabParam && ["heatmap", "cohort", "mous", "interventions", "accreditation"].includes(tabParam)
      ? tabParam
      : "heatmap"
  );

  React.useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [tabParam, activeTab]);

  const handleTabChange = (tab: InstitutionTabType) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    params.set("tab", tab);
    router.replace(`/institution?${params.toString()}`, { scroll: false });
  };

  // State
  const [profile, setProfile] = React.useState<InstitutionProfile>(service.getProfile());
  const [heatmap, setHeatmap] = React.useState<SkillDomainScore[]>(service.getSkillHeatmap());
  const [topSkillGap, setTopSkillGap] = React.useState(service.getTopSkillGap());
  const [feedbackStages, setFeedbackStages] = React.useState<FeedbackLoopStage[]>(service.getFeedbackLoopStages());
  const [mous, setMous] = React.useState<IndustryMoUItem[]>(service.getIndustryMoUs());
  const [scholars, setScholars] = React.useState<CohortScholarItem[]>(service.getCohortScholars());
  const [workshops, setWorkshops] = React.useState<RemedialWorkshopItem[]>(service.getRemedialWorkshops());

  // Modal State
  const [showWorkshopModal, setShowWorkshopModal] = React.useState(false);

  // Toast State
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const refreshData = React.useCallback(() => {
    setProfile(service.getProfile());
    setHeatmap(service.getSkillHeatmap());
    setTopSkillGap(service.getTopSkillGap());
    setFeedbackStages(service.getFeedbackLoopStages());
    setMous(service.getIndustryMoUs());
    setScholars(service.getCohortScholars());
    setWorkshops(service.getRemedialWorkshops());
  }, [service]);

  React.useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Handle Create Workshop Callback (Completes Feedback Loop!)
  const handleCommissionWorkshop = (workshopData: {
    title: string;
    leadFacultyGuide: string;
    scheduledDate: string;
    durationHours: number;
    venue: string;
    targetCohortSize: number;
    modules: string[];
  }) => {
    service.createResearchWorkshop(workshopData);
    refreshData();
    setShowWorkshopModal(false);
    showToast(
      `✓ Feedback Loop Triggered! "${workshopData.title}" dispatched to Faculty Suite & 48 scholars notified.`
    );
  };

  const role = ROLE_DEFINITIONS.INSTITUTION;
  const displayName = user?.fullName || profile.directorName;
  const displayEmail = user?.email || profile.email;

  const navigationTabs: {
    id: InstitutionTabType;
    label: string;
    icon: string;
    badgeCount?: number;
  }[] = [
    { id: "heatmap", label: "Executive Heatmap & Loop", icon: "📊" },
    { id: "cohort", label: "Cohort Roster & Sub-Skills", icon: "🎓", badgeCount: profile.totalEnrolledScholars },
    { id: "mous", label: "Industry MoUs & Placements", icon: "🤝", badgeCount: profile.activeIndustryMoUs },
    { id: "interventions", label: "Remedial Workshops", icon: "🎯", badgeCount: workshops.length },
    { id: "accreditation", label: "NCISM Accreditation", icon: "🏛️" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 p-4 rounded-xl bg-accent text-accent-foreground font-semibold shadow-2xl border border-accent-foreground/20 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="h-5 w-5 text-accent-foreground" />
            <span className="text-xs sm:text-sm">{toastMessage}</span>
          </div>
        )}

        {/* Top Breadcrumb & User Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-border/70">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
            >
              <img
                src="/images/ayu-setu-emblem.png"
                alt="Ayu-Setu"
                className="h-5 w-5 rounded-full object-cover bg-[#efe1c8] ring-1 ring-amber-400/50 group-hover:scale-105 transition-transform shrink-0"
              />
              <span>Ayu-Setu Hub</span>
            </Link>
            <span className="text-muted-foreground text-xs">/</span>
            <span className="text-xs font-bold text-foreground">Institution Dashboard</span>
            <Badge variant="verified" size="sm" className="hidden sm:inline-flex text-[10px]">
              Step 15 Intelligence Suite
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <EcosystemRoleSwitcher />
            <span className="text-xs text-muted-foreground hidden md:inline">
              Institute Code: <strong className="font-mono text-foreground">{profile.code}</strong>
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout()}
              leftIcon={<LogOut className="h-3.5 w-3.5 text-muted-foreground" />}
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Institution Director Header Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/15 via-card to-card border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-herbal-900 text-white font-serif text-2xl font-bold flex items-center justify-center shadow-md">
              🏫
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  {profile.name}
                </h1>
                <Badge variant="verified" size="sm" icon={<ShieldCheck className="h-3 w-3" />}>
                  {profile.ncismAccreditationRating}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {displayName} ({profile.directorTitle}) • {profile.affiliation}
              </p>
              <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                {displayEmail} • {profile.phone}
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 self-start sm:self-auto">
            <Badge variant="default" className="text-xs font-semibold">
              {role.badge}
            </Badge>
            <span className="text-[11px] text-muted-foreground">
              NCISM Criterion Compliance:{" "}
              <strong className="text-emerald-600 font-bold">{profile.ncismCriterionCompliance}%</strong>
            </span>
          </div>
        </div>

        {/* 5-Metric Quick Telemetry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <Card variant="default" className="p-3.5 text-center space-y-0.5">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
              Enrolled Scholars
            </span>
            <p className="text-xl font-bold text-primary">{profile.totalEnrolledScholars}</p>
            <span className="text-[10px] text-muted-foreground">BAMS, MD & PhD</span>
          </Card>

          <Card variant="default" className="p-3.5 text-center space-y-0.5">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
              Faculty Guides
            </span>
            <p className="text-xl font-bold text-secondary">{profile.facultyGuidesCount}</p>
            <span className="text-[10px] text-muted-foreground">NCISM Recognized</span>
          </Card>

          <Card variant="default" className="p-3.5 text-center space-y-0.5">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
              Active MoUs
            </span>
            <p className="text-xl font-bold text-foreground">{profile.activeIndustryMoUs}</p>
            <span className="text-[10px] text-emerald-600 font-medium">Industry Partners</span>
          </Card>

          <Card variant="default" className="p-3.5 text-center space-y-0.5">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
              Placement Conversion
            </span>
            <p className="text-xl font-bold text-emerald-600">{profile.placementConversionRate}%</p>
            <span className="text-[10px] text-muted-foreground">Ayush Residencies</span>
          </Card>

          <Card variant="default" className="p-3.5 text-center space-y-0.5 col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
              Active Interventions
            </span>
            <p className="text-xl font-bold text-accent">{workshops.length}</p>
            <span className="text-[10px] text-accent font-medium">Remedial Workshops</span>
          </Card>
        </div>

        {/* Tab Navigation Bar */}
        <div className="border-b border-border/80">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2">
            {navigationTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.badgeCount !== undefined && tab.badgeCount > 0 && (
                    <span
                      className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isActive
                          ? "bg-primary-foreground text-primary"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {tab.badgeCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Viewport */}
        <div className="min-h-[500px] space-y-6">
          {activeTab === "heatmap" && (
            <>
              {/* 1. The Requested Skill Heatmap (Clinical 82%, Communication 79%, Panchakarma 64%, Research 42%, Documentation 38%) */}
              <SkillHeatmapWidget heatmap={heatmap} />

              {/* 2. Top Skill Gap Detection + Automated Recommendation Card */}
              <SkillGapRecommendationWidget
                topSkillGap={topSkillGap}
                onOpenWorkshopModal={() => setShowWorkshopModal(true)}
              />

              {/* 2.5 Industry Demand vs Student Skill Supply Telemetry Table (SIH Major Differentiator) */}
              <Card variant="default" className="p-6 space-y-4 border-border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500 font-bold">📊</span>
                      <h3 className="text-base font-bold text-foreground">
                        Industry Demand vs. Student Skill Supply Telemetry
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Decision-support engine mapping real-time corporate Ayush demand benchmarks against cohort mastery to prescribe institutional interventions.
                    </p>
                  </div>
                  <Badge variant="gold" size="sm" className="font-mono">
                    NCISM Criterion IV Telemetry
                  </Badge>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground">
                        <th className="py-2.5 px-3 font-semibold">Competency Domain</th>
                        <th className="py-2.5 px-3 font-semibold">Industry Demand</th>
                        <th className="py-2.5 px-3 font-semibold">Student Supply</th>
                        <th className="py-2.5 px-3 font-semibold">Deficit Gap</th>
                        <th className="py-2.5 px-3 font-semibold">YoY Growth</th>
                        <th className="py-2.5 px-3 font-semibold">Recommended Institutional Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {SkillDemandService.getDemandVsSupplyData().map((item) => (
                        <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-3">
                            <span className="font-bold text-foreground block">{item.skillName}</span>
                            <span className="text-[10px] text-muted-foreground">{item.category}</span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-bold text-foreground font-mono">{item.industryDemandPercent}%</span>
                            <span className="text-[10px] text-muted-foreground block truncate max-w-[140px]">
                              {item.topDemandingEmployers[0]}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-bold text-primary font-mono">{item.studentSupplyPercent}%</span>
                            <span className="text-[10px] text-muted-foreground block">Cohort Average</span>
                          </td>
                          <td className="py-3 px-3">
                            <Badge
                              variant={item.gapPercent > 30 ? "destructive" : "gold"}
                              size="sm"
                              className="font-mono"
                            >
                              -{item.gapPercent}% Gap
                            </Badge>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-emerald-500 font-bold font-mono">+{item.yoyGrowthPercent}%</span>
                            <span className="text-[10px] text-muted-foreground block">YoY Demand</span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="space-y-1">
                              <p className="text-xs text-foreground font-medium">
                                {item.recommendedInstitutionalAction}
                              </p>
                              <button
                                onClick={() => setShowWorkshopModal(true)}
                                className="text-[11px] font-bold text-accent hover:underline flex items-center gap-1"
                              >
                                <span>Schedule {item.interventionType}</span>
                                <span>→</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* 3. The Academia ↔ Industry Feedback Loop Visualization */}
              <AcademiaIndustryFeedbackLoop stages={feedbackStages} />
            </>
          )}

          {activeTab === "cohort" && (
            <Card variant="default" className="p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    Enrolled Scholar Competency Audit
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Detailed per-scholar competency telemetry across Clinical, Research, and Documentation
                  </p>
                </div>
                <Badge variant="outline" size="sm">
                  {scholars.length} Active Roster
                </Badge>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="py-2.5 px-3 font-semibold">Scholar Name</th>
                      <th className="py-2.5 px-3 font-semibold">Degree / Reg No</th>
                      <th className="py-2.5 px-3 font-semibold">Clinical</th>
                      <th className="py-2.5 px-3 font-semibold">Communication</th>
                      <th className="py-2.5 px-3 font-semibold">Panchakarma</th>
                      <th className="py-2.5 px-3 font-semibold">Research</th>
                      <th className="py-2.5 px-3 font-semibold">Documentation</th>
                      <th className="py-2.5 px-3 font-semibold">Remedial Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {scholars.map((sch) => (
                      <tr key={sch.id} className="hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-3">
                          <span className="font-bold text-foreground block">{sch.name}</span>
                          <span className="text-[10px] text-muted-foreground">
                            Guide: {sch.assignedFacultyGuide}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-medium text-foreground block">{sch.degree}</span>
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {sch.registrationNo}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-bold text-emerald-600">{sch.clinicalScore}%</td>
                        <td className="py-3 px-3 font-bold text-emerald-600">{sch.communicationScore}%</td>
                        <td className="py-3 px-3 font-bold text-amber-600">{sch.panchakarmaScore}%</td>
                        <td className="py-3 px-3 font-bold text-rose-600">{sch.researchScore}%</td>
                        <td className="py-3 px-3 font-bold text-rose-600">{sch.documentationScore}%</td>
                        <td className="py-3 px-3">
                          {sch.needsResearchDocumentationWorkshop ? (
                            <Badge variant="destructive" size="sm">
                              Enrolled in Workshop
                            </Badge>
                          ) : (
                            <Badge variant="verified" size="sm">
                              Competent
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeTab === "mous" && (
            <Card variant="default" className="p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    Active Industry MoUs & Corporate Residencies
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Institutional partnerships governing research sabbaticals, live projects, and placement pathways
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => showToast("Downloading Institutional MoU Master Registry...")}
                  leftIcon={<Download className="h-3.5 w-3.5" />}
                >
                  Export MoUs
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mous.map((mou) => (
                  <div
                    key={mou.id}
                    className="p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                          {mou.partnerType}
                        </span>
                        <h4 className="text-sm font-bold text-foreground mt-0.5">
                          {mou.partnerName}
                        </h4>
                      </div>
                      <Badge variant={mou.status === "ACTIVE" ? "verified" : "warning"} size="sm">
                        {mou.status.replace("_", " ")}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-muted/40 text-xs">
                      <div>
                        <span className="text-[10px] text-muted-foreground">Scholars Hired</span>
                        <p className="font-bold text-foreground">{mou.recruitedScholarsCount}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground">Joint R&D</span>
                        <p className="font-bold text-primary">{mou.activeJointProjects} Projects</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground">Annual Stipend</span>
                        <p className="font-bold text-emerald-600">{mou.annualStipendBudget}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border/70">
                      <span>
                        Top Demanded: <strong>{mou.topDemandedSkill}</strong>
                      </span>
                      <span>Valid until {mou.expiryDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === "interventions" && (
            <Card variant="default" className="p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    Remedial Interventions & Workshops
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Curriculum remediation masterclasses commissioned in response to cohort skill gaps
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowWorkshopModal(true)}
                  className="text-xs"
                >
                  Commission New Workshop
                </Button>
              </div>

              <div className="space-y-3">
                {workshops.map((ws) => (
                  <div
                    key={ws.id}
                    className="p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive" size="sm">
                            Target Gap: {ws.targetSkillGap}
                          </Badge>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs font-semibold text-primary">
                            Lead Guide: {ws.leadFacultyGuide}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-foreground">{ws.title}</h4>
                      </div>

                      <div className="text-right shrink-0">
                        <Badge variant="verified" size="sm">
                          {ws.status}
                        </Badge>
                        <span className="text-[11px] font-bold text-emerald-600 block mt-0.5">
                          Projected Lift: +{ws.projectedSkillLift}%
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-muted-foreground">
                      <span>Date: {ws.scheduledDate} ({ws.durationHours} Hours)</span>
                      <span>Venue: {ws.venue}</span>
                      <span>Enrolled Cohort: {ws.enrolledScholarsCount} / {ws.targetCohortSize} Scholars</span>
                    </div>

                    <div className="pt-2 border-t border-border/80">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                        Syllabus Modules
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {ws.modules.map((m, i) => (
                          <div key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                            <span className="line-clamp-1">{m}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === "accreditation" && (
            <Card variant="default" className="p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    NCISM & NAAC Criterion Accreditation Readiness
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Digital competency passport logs formatted for institutional Self Study Report (SSR) filing
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  className="text-xs"
                  onClick={() => showToast("✓ Generating NAAC Criterion III Digital Evidence Dossier...")}
                  leftIcon={<Download className="h-3.5 w-3.5" />}
                >
                  Download SSR Audit
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-foreground">
                      Criterion II: Teaching-Learning & Evaluation
                    </h4>
                    <span className="text-sm font-bold text-emerald-600">96.4%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Continuous student competency passport logging, mini-CEX evaluations, and rotational clinical posting attendance tracked via tamper-proof hashes.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-foreground">
                      Criterion III: Research, Innovations & Extension
                    </h4>
                    <span className="text-sm font-bold text-emerald-600">92.1%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Active industry MoUs with Dabur and CCRAS, collaborative clinical trials, institutional consultancy revenue sharing (70/30), and remedial workshops.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Workshop Commissioning Modal (Completes Feedback Loop) */}
      <CreateResearchWorkshopModal
        isOpen={showWorkshopModal}
        onClose={() => setShowWorkshopModal(false)}
        onSubmit={handleCommissionWorkshop}
      />
    </div>
  );
}

export default function InstitutionPortalPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground text-xs">
          Loading Ayu-Setu Institution Dashboard...
        </div>
      }
    >
      <InstitutionPortalContent />
    </React.Suspense>
  );
}
