"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Home,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  FlaskConical,
  Award,
  BookOpen,
  Briefcase,
  Mic,
  Presentation,
  Users,
  Layers,
  Sparkles,
  LayoutDashboard,
  Building2,
  DollarSign,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import { useAuth } from "@/hooks/useAuth";
import { ROLE_DEFINITIONS } from "@/types/roles";

import {
  AcademicianPortalService,
  SupervisorVerificationItem,
  FacultyInternship,
  IndustrialTraining,
  FacultyFDP,
  ResearchCollaboration,
  ConsultancyProject,
  GuestLecture,
  FacultyWorkshop,
  MenteeScholar,
  FacultyLiveProject,
} from "@/lib/services/academicianPortalService";

import { FacultyDashboardTab } from "@/components/academician/FacultyDashboardTab";
import { FacultyInternshipTab } from "@/components/academician/FacultyInternshipTab";
import { IndustrialTrainingTab } from "@/components/academician/IndustrialTrainingTab";
import { FacultyFDPTab } from "@/components/academician/FacultyFDPTab";
import { ResearchCollaborationTab } from "@/components/academician/ResearchCollaborationTab";
import { ConsultancyTab } from "@/components/academician/ConsultancyTab";
import { GuestLecturesTab } from "@/components/academician/GuestLecturesTab";
import { WorkshopsTab } from "@/components/academician/WorkshopsTab";
import { FacultyMentorshipTab } from "@/components/academician/FacultyMentorshipTab";
import { LiveProjectsTab } from "@/components/academician/LiveProjectsTab";

type AcademicianTabType =
  | "dashboard"
  | "internship"
  | "industrial-training"
  | "fdp"
  | "research"
  | "consultancy"
  | "guest-lectures"
  | "workshops"
  | "mentorship"
  | "live-projects";

function AcademicianPortalContent() {
  const { user, logout } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const service = React.useMemo(() => new AcademicianPortalService(), []);

  // Current tab from URL or fallback to dashboard
  const tabParam = searchParams?.get("tab") as AcademicianTabType | null;
  const [activeTab, setActiveTab] = React.useState<AcademicianTabType>(
    tabParam && [
      "dashboard",
      "internship",
      "industrial-training",
      "fdp",
      "research",
      "consultancy",
      "guest-lectures",
      "workshops",
      "mentorship",
      "live-projects",
    ].includes(tabParam)
      ? tabParam
      : "dashboard"
  );

  // Sync state if URL changes
  React.useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [tabParam, activeTab]);

  const handleTabChange = (tab: AcademicianTabType) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    params.set("tab", tab);
    router.replace(`/academician?${params.toString()}`, { scroll: false });
  };

  // State
  const [profile, setProfile] = React.useState(service.getProfile());
  const [queue, setQueue] = React.useState<SupervisorVerificationItem[]>([]);
  const [internships, setInternships] = React.useState<FacultyInternship[]>([]);
  const [trainings, setTrainings] = React.useState<IndustrialTraining[]>([]);
  const [fdps, setFdps] = React.useState<FacultyFDP[]>([]);
  const [collabs, setCollabs] = React.useState<ResearchCollaboration[]>([]);
  const [consultancies, setConsultancies] = React.useState<ConsultancyProject[]>([]);
  const [lectures, setLectures] = React.useState<GuestLecture[]>([]);
  const [workshops, setWorkshops] = React.useState<FacultyWorkshop[]>([]);
  const [mentees, setMentees] = React.useState<MenteeScholar[]>([]);
  const [liveProjects, setLiveProjects] = React.useState<FacultyLiveProject[]>([]);
  const [analytics, setAnalytics] = React.useState(service.getAnalytics());

  // Toast Notification
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const refreshData = React.useCallback(() => {
    setProfile(service.getProfile());
    setQueue(service.getVerificationQueue());
    setInternships(service.getInternships());
    setTrainings(service.getIndustrialTrainings());
    setFdps(service.getFDPs());
    setCollabs(service.getResearchCollaborations());
    setConsultancies(service.getConsultancies());
    setLectures(service.getGuestLectures());
    setWorkshops(service.getWorkshops());
    setMentees(service.getMentees());
    setLiveProjects(service.getLiveProjects());
    setAnalytics(service.getAnalytics());
  }, [service]);

  React.useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Actions
  const handleResolveQueue = (queueId: string, isApproved: boolean) => {
    service.resolveVerification(queueId, isApproved);
    refreshData();
    showToast(
      isApproved
        ? "✓ Verified & Digitally Attested Student Competency Passport!"
        : "Returned case to student for documentation revision"
    );
  };

  const handleApplyInternship = (internshipId: string) => {
    service.applyInternship(internshipId);
    refreshData();
  };

  const handleEnrollTraining = (trainingId: string) => {
    service.enrollIndustrialTraining(trainingId);
    refreshData();
  };

  const handleEnrollFDP = (fdpId: string) => {
    service.enrollFDP(fdpId);
    refreshData();
  };

  const handleCreateCollaboration = (newCollab: Omit<ResearchCollaboration, "id" | "progress">) => {
    service.createResearchCollaboration(newCollab);
    refreshData();
  };

  const handleCreateConsultancy = (newCon: Omit<ConsultancyProject, "id" | "invoices">) => {
    service.createConsultancy(newCon);
    refreshData();
  };

  const handleRespondLecture = (lectureId: string, action: "ACCEPTED" | "RESCHEDULED") => {
    service.respondGuestLecture(lectureId, action);
    refreshData();
  };

  const handleCreateWorkshop = (newWs: Omit<FacultyWorkshop, "id" | "registeredAttendeesCount" | "attendeesList">) => {
    service.createWorkshop(newWs);
    refreshData();
  };

  const handleVerifyObservation = (menteeId: string, obsId: string) => {
    service.verifyMenteeObservation(menteeId, obsId);
    refreshData();
  };

  const handleCreateLiveProject = (newProject: Omit<FacultyLiveProject, "id" | "progressPercentage">) => {
    service.createLiveProject(newProject);
    refreshData();
  };

  const role = ROLE_DEFINITIONS.ACADEMICIAN;
  const displayName = user?.fullName || profile.fullName;
  const displayEmail = user?.email || profile.email;

  // Tab definitions with icons & counts
  const navigationTabs: {
    id: AcademicianTabType;
    label: string;
    icon: React.ReactNode;
    badgeCount?: number;
  }[] = [
    {
      id: "dashboard",
      label: "Faculty Dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
      badgeCount: queue.length > 0 ? queue.length : undefined,
    },
    {
      id: "internship",
      label: "Faculty Internship",
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      id: "industrial-training",
      label: "Industrial Training",
      icon: <Award className="h-4 w-4" />,
    },
    {
      id: "fdp",
      label: "FDP",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: "research",
      label: "Research Collaboration",
      icon: <FlaskConical className="h-4 w-4" />,
    },
    {
      id: "consultancy",
      label: "Consultancy",
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      id: "guest-lectures",
      label: "Guest Lectures",
      icon: <Mic className="h-4 w-4" />,
    },
    {
      id: "workshops",
      label: "Workshops",
      icon: <Presentation className="h-4 w-4" />,
    },
    {
      id: "mentorship",
      label: "Mentorship",
      icon: <GraduationCap className="h-4 w-4" />,
      badgeCount: mentees.reduce((sum, m) => sum + m.pendingVerificationsCount, 0),
    },
    {
      id: "live-projects",
      label: "Live Projects",
      icon: <Layers className="h-4 w-4" />,
    },
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

        {/* Top Breadcrumb & User Sign Out Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-border/70">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" /> Vaidya Setu Hub
            </Link>
            <span className="text-muted-foreground text-xs">/</span>
            <span className="text-xs font-bold text-foreground">Academician Portal</span>
            <Badge variant="verified" size="sm" className="hidden sm:inline-flex text-[10px]">
              Step 14 Faculty Suite
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden md:inline">
              Guide ID: <strong className="font-mono text-foreground">{profile.ncismGuideId}</strong>
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

        {/* Faculty Header Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-secondary/15 via-card to-card border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-earth-800 text-white font-serif text-2xl font-bold flex items-center justify-center shadow-md">
              👨‍🏫
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  {displayName}
                </h1>
                <Badge variant="verified" size="sm" icon={<ShieldCheck className="h-3 w-3" />}>
                  NCISM Guide
                </Badge>
                <Badge variant="secondary" size="sm" className="hidden md:inline-flex">
                  IEC Chair
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {profile.designation} • {profile.department}, {profile.institution}
              </p>
              <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                {displayEmail} • ORCID: {profile.orcidId} • Scopus ID: {profile.scopusId}
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 self-start sm:self-auto">
            <Badge variant="secondary" className="text-xs font-semibold">
              {role.badge}
            </Badge>
            <span className="text-[11px] text-muted-foreground">
              Verified Student Passports:{" "}
              <strong className="text-foreground">{profile.verifiedStudentPassports}</strong>
            </span>
          </div>
        </div>

        {/* 10-Tab Navigation Bar */}
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
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.badgeCount !== undefined && tab.badgeCount > 0 && (
                    <span
                      className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isActive
                          ? "bg-primary-foreground text-primary"
                          : "bg-accent text-accent-foreground"
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
        <div className="min-h-[500px]">
          {activeTab === "dashboard" && (
            <FacultyDashboardTab
              analytics={analytics}
              queue={queue}
              onResolveQueue={handleResolveQueue}
              onNavigateTab={(tab) => handleTabChange(tab)}
              collabs={collabs}
              liveProjects={liveProjects}
              mentees={mentees}
              lectures={lectures}
            />
          )}

          {activeTab === "internship" && (
            <FacultyInternshipTab
              internships={internships}
              onApply={handleApplyInternship}
              showToast={showToast}
            />
          )}

          {activeTab === "industrial-training" && (
            <IndustrialTrainingTab
              trainings={trainings}
              onEnroll={handleEnrollTraining}
              showToast={showToast}
            />
          )}

          {activeTab === "fdp" && (
            <FacultyFDPTab
              fdps={fdps}
              onEnroll={handleEnrollFDP}
              showToast={showToast}
            />
          )}

          {activeTab === "research" && (
            <ResearchCollaborationTab
              collaborations={collabs}
              onCreateCollaboration={handleCreateCollaboration}
              showToast={showToast}
            />
          )}

          {activeTab === "consultancy" && (
            <ConsultancyTab
              consultancies={consultancies}
              onCreateConsultancy={handleCreateConsultancy}
              showToast={showToast}
            />
          )}

          {activeTab === "guest-lectures" && (
            <GuestLecturesTab
              lectures={lectures}
              onRespondLecture={handleRespondLecture}
              showToast={showToast}
            />
          )}

          {activeTab === "workshops" && (
            <WorkshopsTab
              workshops={workshops}
              onCreateWorkshop={handleCreateWorkshop}
              showToast={showToast}
            />
          )}

          {activeTab === "mentorship" && (
            <FacultyMentorshipTab
              mentees={mentees}
              onVerifyObservation={handleVerifyObservation}
              showToast={showToast}
            />
          )}

          {activeTab === "live-projects" && (
            <LiveProjectsTab
              liveProjects={liveProjects}
              onCreateLiveProject={handleCreateLiveProject}
              showToast={showToast}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function AcademicianPortalPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground text-xs">
          Loading Vaidya Setu Academician Portal...
        </div>
      }
    >
      <AcademicianPortalContent />
    </React.Suspense>
  );
}
