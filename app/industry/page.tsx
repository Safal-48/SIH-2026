"use client";

import * as React from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  LogOut,
  Sparkles,
  Users,
  Briefcase,
  Search,
  Home,
  PlusCircle,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Award,
  FileText,
  Check,
  ChevronRight,
  Calendar,
  MapPin,
  ExternalLink,
  AlertCircle,
  Eye,
  Star,
  GraduationCap,
  X,
  Stethoscope,
  Microscope,
  Flame,
  CheckCircle,
  Activity,
  Layers,
  Send,
  UserCheck,
} from "lucide-react";
import { ROLE_DEFINITIONS } from "@/types/roles";
import { EcosystemRoleSwitcher } from "@/components/layout/EcosystemRoleSwitcher";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import { useAuth } from "@/hooks/useAuth";
import {
  IndustryPortalService,
  IndustryListingItem,
  IndustryCandidateProfile,
  IndustryMentorshipSlot,
  IndustryApplicationItem,
  IndustryOpportunityType,
} from "@/lib/services/industryPortalService";

type ActiveTab = "dashboard" | "post-opportunity" | "candidates" | "applications" | "mentorship" | "analytics";

export default function IndustryPortalPage() {
  const { user, logout } = useAuth();
  const role = ROLE_DEFINITIONS.INDUSTRY;

  const displayName = user?.fullName || "Dr. Rajesh Varma";
  const displayEmail = user?.email || "industry@dabur.com";

  // Service instance
  const service = React.useMemo(() => new IndustryPortalService(), []);

  // State
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("dashboard");
  const [listings, setListings] = React.useState<IndustryListingItem[]>([]);
  const [candidates, setCandidates] = React.useState<IndustryCandidateProfile[]>([]);
  const [applications, setApplications] = React.useState<IndustryApplicationItem[]>([]);
  const [mentorships, setMentorships] = React.useState<IndustryMentorshipSlot[]>([]);
  const [analytics, setAnalytics] = React.useState<ReturnType<typeof service.getAnalytics> | null>(null);

  // Candidate Filter & Search
  const [searchQuery, setSearchQuery] = React.useState("");
  const [domainFilter, setDomainFilter] = React.useState<string>("ALL");
  const [minMatchFilter, setMinMatchFilter] = React.useState<number>(80);
  const [selectedCandidate, setSelectedCandidate] = React.useState<IndustryCandidateProfile | null>(null);

  // Applications Filter
  const [appStageFilter, setAppStageFilter] = React.useState<string>("ALL");

  // Post Opportunity Form State
  const [postingType, setPostingType] = React.useState<IndustryOpportunityType>("INTERNSHIP");
  const [postTitle, setPostTitle] = React.useState("");
  const [postDepartment, setPostDepartment] = React.useState("Clinical Residencies & Inpatient Ward");
  const [postDomain, setPostDomain] = React.useState<IndustryListingItem["domain"]>("Clinical");
  const [postLocation, setPostLocation] = React.useState("Sarita Vihar, New Delhi");
  const [postCompensation, setPostCompensation] = React.useState("₹35,000 / month");
  const [postDuration, setPostDuration] = React.useState("6 Months");
  const [postPositions, setPostPositions] = React.useState(3);
  const [postDeadline, setPostDeadline] = React.useState("2026-11-15");
  const [postSkills, setPostSkills] = React.useState("Clinical Documentation (SOAP EHR), Nadi Pariksha, GCP Protocols");
  const [postDegrees, setPostDegrees] = React.useState("BAMS (Final Year), MD/MS Ayurveda");
  const [postDescription, setPostDescription] = React.useState("");
  const [postSuccessMessage, setPostSuccessMessage] = React.useState<string | null>(null);

  // Mentorship Modal State
  const [showMentorModal, setShowMentorModal] = React.useState(false);
  const [newMentorTitle, setNewMentorTitle] = React.useState("");
  const [newMentorSpecialty, setNewMentorSpecialty] = React.useState("");
  const [newMentorDate, setNewMentorDate] = React.useState("");
  const [newMentorTime, setNewMentorTime] = React.useState("");

  // Structured Feedback Modal State
  const [feedbackApp, setFeedbackApp] = React.useState<IndustryApplicationItem | null>(null);
  const [feedbackForm, setFeedbackForm] = React.useState({
    technicalCompetency: 5,
    communication: 4,
    professionalism: 5,
    problemSolving: 4,
    teamwork: 5,
    domainCompetency: 5,
    overallImpression: "READY" as "OUTSTANDING" | "READY" | "NEEDS_DEVELOPMENT",
    strengths: "Diligent clinical documentation and high diagnostic reasoning under GCP-Ayush standards.",
    improvementAreas: "Continue practicing bio-statistical sample analysis in classical trials.",
    recommendationNote: "Demonstrated strong clinical aptitude and readiness for inpatient care.",
  });
  const [feedbackSuccess, setFeedbackSuccess] = React.useState<string | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Load Initial Data
  const refreshData = React.useCallback(() => {
    setListings(service.getListings());
    setCandidates(service.getCandidates());
    setApplications(service.getApplications());
    setMentorships(service.getMentorships());
    setAnalytics(service.getAnalytics());
  }, [service]);

  React.useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Handle 1-Click Shortlist
  const handleShortlist = (candidateId: string, oppId: string = "ind-opp-01") => {
    const success = service.shortlistCandidate(candidateId, oppId);
    if (success) {
      refreshData();
      const cand = candidates.find((c) => c.id === candidateId);
      showToast(`✓ Shortlisted ${cand?.name || "Candidate"}! Synced with Application Pipeline.`);
    }
  };

  // Handle Application Stage Transition
  const handleAdvanceStage = (appId: string, targetStage: IndustryApplicationItem["stage"]) => {
    service.updateApplicationStage(appId, targetStage);
    refreshData();
    showToast(`✓ Application stage updated to ${targetStage.replace("_", " ")}`);
  };

  // Handle Opportunity Submission
  const handleCreatePosting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim()) {
      showToast("Please enter an opportunity title");
      return;
    }

    const created = service.createListing({
      type: postingType,
      title: postTitle,
      organization: "Dabur Research Foundation & AIIA Industry Partner",
      department: postDepartment,
      domain: postDomain,
      location: postLocation,
      city: postLocation.split(",")[0]?.trim() || "New Delhi",
      isRemote: false,
      compensation: postCompensation,
      duration: postDuration,
      openPositions: Number(postPositions) || 1,
      deadline: postDeadline,
      eligibleDegrees: postDegrees.split(",").map((s) => s.trim()),
      requiredSkills: postSkills.split(",").map((s) => s.trim()),
      description: postDescription || `Exciting opportunity for high-caliber Ayurvedic scholars in ${postDomain}.`,
    });

    refreshData();
    setPostSuccessMessage(`✓ Successfully published "${created.title}" to Ayu-Setu Network!`);
    setPostTitle("");
    setPostDescription("");
    showToast(`Published ${created.type}: ${created.title}`);

    setTimeout(() => {
      setPostSuccessMessage(null);
      setActiveTab("dashboard");
    }, 2000);
  };

  // Handle Mentorship Creation
  const handleCreateMentorship = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMentorTitle.trim()) return;

    service.createMentorshipSlot({
      mentorName: displayName,
      mentorTitle: "Director of Clinical Postings & Residencies",
      organization: "Dabur Research Foundation",
      specialtyDomain: newMentorSpecialty || "Integrative Clinical Protocols",
      sessionTitle: newMentorTitle,
      mode: "Virtual Practicum",
      durationMinutes: 60,
      date: newMentorDate || "Upcoming Thursday",
      timeSlot: newMentorTime || "04:00 PM - 05:00 PM IST",
      capacity: 20,
      topicsCovered: [
        "Bedside Diagnostic Nuances",
        "Formulation Pharmacovigilance",
        "Clinical Research Ethics",
      ],
    });

    refreshData();
    setShowMentorModal(false);
    setNewMentorTitle("");
    setNewMentorSpecialty("");
    showToast("✓ Clinical mentorship session scheduled!");
  };

  // Handle Feedback Submission
  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackApp) return;

    service.submitFeedback({
      applicationId: feedbackApp.id,
      candidateId: feedbackApp.candidateId,
      candidateName: feedbackApp.candidateName,
      organization: "Dabur Research Foundation",
      reviewerName: displayName,
      categories: {
        technicalCompetency: Number(feedbackForm.technicalCompetency),
        communication: Number(feedbackForm.communication),
        professionalism: Number(feedbackForm.professionalism),
        problemSolving: Number(feedbackForm.problemSolving),
        teamwork: Number(feedbackForm.teamwork),
        domainCompetency: Number(feedbackForm.domainCompetency),
      },
      overallImpression: feedbackForm.overallImpression,
      strengths: feedbackForm.strengths.split(",").map((s) => s.trim()).filter(Boolean),
      improvementAreas: feedbackForm.improvementAreas.split(",").map((s) => s.trim()).filter(Boolean),
      recommendationNote: feedbackForm.recommendationNote,
    });

    setFeedbackSuccess(`✓ Structured evaluation recorded for ${feedbackApp.candidateName}! Dispatched to student portfolio.`);
    showToast(`✓ Evaluation dispatched for ${feedbackApp.candidateName}`);

    setTimeout(() => {
      setFeedbackSuccess(null);
      setFeedbackApp(null);
    }, 2000);
  };

  // Filtered Candidates
  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.degree.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = domainFilter === "ALL" || c.primaryDomain === domainFilter;
    const matchesScore = c.overallMatchScore >= minMatchFilter;
    return matchesSearch && matchesDomain && matchesScore;
  });

  // Filtered Applications
  const filteredApplications = applications.filter((app) => {
    if (appStageFilter === "ALL") return true;
    return app.stage === appStageFilter;
  });

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

        {/* Top Portal Navigation Bar */}
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
            <span className="text-xs font-semibold text-accent flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" /> Industry & Hospital Enterprise Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <EcosystemRoleSwitcher />
            <Link href="/student/opportunities">
              <Button variant="ghost" size="sm" className="text-xs hidden sm:inline-flex" leftIcon={<Eye className="h-3.5 w-3.5" />}>
                View Student Board
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout()}
              leftIcon={<LogOut className="h-3.5 w-3.5 text-muted-foreground" />}
              className="text-xs"
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Industry Partner Executive Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-card via-card to-accent/10 border border-border shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-amber-700 text-white font-serif text-3xl font-bold flex items-center justify-center shadow-lg border border-accent/30 shrink-0">
                🏥
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-serif">
                    {displayName}
                  </h1>
                  <Badge variant="verified" size="sm" icon={<ShieldCheck className="h-3 w-3" />}>
                    NCISM & AIIA Industry Partner
                  </Badge>
                  <Badge variant="gold" size="sm">
                    {role.badge}
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {displayEmail} • Dabur Research Foundation & AIIA Inpatient Collaborative Consortium
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1 text-emerald-500 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Verified Enterprise Partner
                  </span>
                  <span>•</span>
                  <span>MOU Active with 4 National Institutes</span>
                  <span>•</span>
                  <span>Authorized Preceptor ID: IND-AIIA-2026</span>
                </div>
              </div>
            </div>

            {/* Quick Summary Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-muted/30 p-3.5 rounded-xl border border-border/80">
              <div className="text-center px-2">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Active Postings</span>
                <span className="text-xl font-bold text-accent">{listings.filter((l) => l.status === "ACTIVE").length}</span>
              </div>
              <div className="text-center px-2 border-l border-border/60">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Scholars Matched</span>
                <span className="text-xl font-bold text-primary">{candidates.length}</span>
              </div>
              <div className="text-center px-2 border-l border-border/60">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Shortlisted</span>
                <span className="text-xl font-bold text-emerald-500">
                  {applications.filter((a) => a.stage === "SHORTLISTED" || a.stage === "SUPERVISOR_ENDORSED").length}
                </span>
              </div>
              <div className="text-center px-2 border-l border-border/60">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Mentorships</span>
                <span className="text-xl font-bold text-secondary">{mentorships.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border/80 scrollbar-none">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "dashboard"
                ? "bg-accent text-accent-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Activity className="h-4 w-4" />
            Dashboard Overview
          </button>

          <button
            onClick={() => setActiveTab("post-opportunity")}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "post-opportunity"
                ? "bg-accent text-accent-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <PlusCircle className="h-4 w-4" />
            Post Opportunity
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-background/30 text-current font-bold">4 Modes</span>
          </button>

          <button
            onClick={() => setActiveTab("candidates")}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "candidates"
                ? "bg-accent text-accent-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Users className="h-4 w-4" />
            View Candidates & Shortlist
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-accent/20 text-accent font-bold">
              {candidates.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("applications")}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "applications"
                ? "bg-accent text-accent-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <FileText className="h-4 w-4" />
            Applications Queue
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-accent/20 text-accent font-bold">
              {applications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("mentorship")}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "mentorship"
                ? "bg-accent text-accent-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <GraduationCap className="h-4 w-4" />
            Mentorship Hub
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "analytics"
                ? "bg-accent text-accent-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            Analytics & Insights
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Quick Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card variant="default" className="p-5 space-y-2 border-l-4 border-l-accent">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-semibold text-muted-foreground">Active Postings</span>
                  <Briefcase className="h-4 w-4 text-accent" />
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {listings.filter((l) => l.status === "ACTIVE").length}
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Across Internships, Jobs, Research & Training
                </p>
              </Card>

              <Card variant="default" className="p-5 space-y-2 border-l-4 border-l-primary">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-semibold text-muted-foreground">Applicant Pool</span>
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">{applications.length} Applicants</div>
                <p className="text-[11px] text-muted-foreground">100% NCISM Registered Scholars</p>
              </Card>

              <Card variant="default" className="p-5 space-y-2 border-l-4 border-l-emerald-500">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-semibold text-muted-foreground">Shortlisted</span>
                  <UserCheck className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="text-3xl font-bold text-emerald-500">
                  {applications.filter((a) => a.stage === "SHORTLISTED" || a.stage === "SUPERVISOR_ENDORSED").length}
                </div>
                <p className="text-[11px] text-muted-foreground">Awaiting supervisor endorsement & signoff</p>
              </Card>

              <Card variant="default" className="p-5 space-y-2 border-l-4 border-l-amber-500">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-semibold text-muted-foreground">Mentee Capacity</span>
                  <GraduationCap className="h-4 w-4 text-amber-500" />
                </div>
                <div className="text-3xl font-bold text-foreground">43 / 50</div>
                <p className="text-[11px] text-muted-foreground">Enrolled in industry clinical practicums</p>
              </Card>
            </div>

            {/* Quick Actions Action Bar */}
            <Card variant="interactive" className="p-5 bg-gradient-to-r from-card via-card to-accent/5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                    Quick Recruitment Actions
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Directly post new openings, discover top-tier BAMS/MD talent, or review scheduled clinical rounds.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <Button
                    variant="gold"
                    size="sm"
                    className="text-xs"
                    onClick={() => setActiveTab("post-opportunity")}
                    leftIcon={<PlusCircle className="h-3.5 w-3.5" />}
                  >
                    Post New Opportunity
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setActiveTab("candidates")}
                    leftIcon={<Search className="h-3.5 w-3.5" />}
                  >
                    Browse Candidates
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => setActiveTab("applications")}
                    leftIcon={<FileText className="h-3.5 w-3.5" />}
                  >
                    Manage Applications
                  </Button>
                </div>
              </div>
            </Card>

            {/* Two Column Grid: Top Matched Candidates & Active Postings */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Top Matched Candidates */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                      <Star className="h-4 w-4 text-accent" />
                      High-Match Candidates (Skill DNA &gt; 85%)
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Verified by institutional supervisors with cryptographic Competency Passports.
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("candidates")}
                    className="text-xs text-accent"
                    rightIcon={<ChevronRight className="h-3.5 w-3.5" />}
                  >
                    View All ({candidates.length})
                  </Button>
                </div>

                <div className="space-y-3">
                  {candidates.slice(0, 3).map((candidate) => (
                    <Card key={candidate.id} variant="default" className="p-4 space-y-3 hover:border-accent/50 transition-all">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent/20 text-accent font-bold text-sm flex items-center justify-center border border-accent/40">
                            {candidate.avatarText}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-foreground">{candidate.name}</span>
                              <Badge variant="verified" size="sm">
                                {candidate.overallMatchScore}% Match
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {candidate.degree} • {candidate.institution}
                            </p>
                          </div>
                        </div>

                        <Badge variant="gold" size="sm">
                          {candidate.primaryDomain}
                        </Badge>
                      </div>

                      {/* Verified Clinical Hours and Passport Hash */}
                      <div className="flex flex-wrap items-center gap-3 text-[11px] bg-muted/40 p-2.5 rounded-lg border border-border/70">
                        <span className="font-semibold text-foreground flex items-center gap-1">
                          <Stethoscope className="h-3 w-3 text-accent" /> {candidate.clinicalHoursVerified} Verified Clinical Hours
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground font-mono truncate max-w-[200px]">
                          Passport: {candidate.passportHash.substring(0, 14)}...
                        </span>
                      </div>

                      {/* Top Verified Competencies */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        {candidate.verifiedCompetencies.slice(0, 3).map((comp, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-card border border-border text-foreground flex items-center gap-1"
                          >
                            <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" />
                            {comp.name} ({comp.score}%)
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-1 border-t border-border/60">
                        <button
                          onClick={() => setSelectedCandidate(candidate)}
                          className="text-xs text-accent hover:underline flex items-center gap-1"
                        >
                          <Eye className="h-3 w-3" /> Inspect Competencies
                        </button>

                        {candidate.shortlistedFor.length > 0 ? (
                          <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                            <CheckCircle className="h-3.5 w-3.5" /> Shortlisted
                          </span>
                        ) : (
                          <Button
                            variant="gold"
                            size="sm"
                            className="text-xs h-7 px-3"
                            onClick={() => handleShortlist(candidate.id, "ind-opp-01")}
                          >
                            1-Click Shortlist
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Right Column: Active Industry Postings */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-accent" />
                      Active Organization Postings
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Managed by Dabur Research Foundation & AIIA
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("post-opportunity")}
                    className="text-xs text-accent"
                  >
                    + Add New
                  </Button>
                </div>

                <div className="space-y-3">
                  {listings.map((item) => (
                    <Card key={item.id} variant="default" className="p-4 space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Badge
                            variant={
                              item.type === "INTERNSHIP"
                                ? "verified"
                                : item.type === "JOB"
                                ? "gold"
                                : item.type === "RESEARCH_PROJECT"
                                ? "secondary"
                                : "outline"
                            }
                            size="sm"
                          >
                            {item.type.replace("_", " ")}
                          </Badge>
                          <h4 className="text-sm font-bold text-foreground mt-1.5 line-clamp-1">{item.title}</h4>
                          <p className="text-xs text-muted-foreground">{item.department}</p>
                        </div>
                        <span className="text-xs font-bold text-accent shrink-0">{item.compensation}</span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border/60">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {item.city} • {item.duration}
                        </span>
                        <span className="font-semibold text-foreground">
                          {item.applicantsCount} Applicants ({item.shortlistedCount} Shortlisted)
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: POST OPPORTUNITY WIZARD */}
        {/* ========================================================================= */}
        {activeTab === "post-opportunity" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-card border border-border">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <PlusCircle className="h-5 w-5 text-accent" />
                  Post an Industry Opportunity
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Reach verified BAMS, MD, and PhD scholars across 120+ accredited Ayurvedic colleges and universities.
                </p>
              </div>

              {/* Sub-Tab Selector for 4 Types */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-muted/60 border border-border self-start sm:self-auto">
                {(["INTERNSHIP", "JOB", "RESEARCH_PROJECT", "TRAINING"] as IndustryOpportunityType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setPostingType(type);
                      if (type === "INTERNSHIP") {
                        setPostTitle("Clinical Residency in Integrative Kayachikitsa");
                        setPostCompensation("₹35,000 / month");
                        setPostDuration("6 Months");
                      } else if (type === "JOB") {
                        setPostTitle("Ayurvedic Medical Officer & Inpatient Ward Lead");
                        setPostCompensation("₹8.0 - 9.5 LPA");
                        setPostDuration("Full-Time");
                      } else if (type === "RESEARCH_PROJECT") {
                        setPostTitle("Standardization of Herbal Extracts for Glycemic Control");
                        setPostCompensation("₹42,000 / month Fellowship");
                        setPostDuration("9 Months");
                      } else {
                        setPostTitle("Masterclass: Panchakarma Emergency Protocols & Shodhana Safety");
                        setPostCompensation("Govt Sponsored / Fully Funded");
                        setPostDuration("4 Weeks");
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      postingType === type
                        ? "bg-accent text-accent-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {type === "INTERNSHIP"
                      ? "Post Internship"
                      : type === "JOB"
                      ? "Post Job"
                      : type === "RESEARCH_PROJECT"
                      ? "Post Research Project"
                      : "Post Training"}
                  </button>
                ))}
              </div>
            </div>

            {postSuccessMessage && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-semibold text-xs sm:text-sm flex items-center gap-2">
                <CheckCircle className="h-5 w-5 shrink-0" />
                {postSuccessMessage}
              </div>
            )}

            {/* Posting Form Card */}
            <Card variant="default" className="p-6">
              <form onSubmit={handleCreatePosting} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Opportunity Title */}
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Opportunity Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      placeholder="e.g. Clinical Research Residency in Panchakarma Therapy"
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  {/* Domain */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Specialization Domain *
                    </label>
                    <select
                      value={postDomain}
                      onChange={(e) => setPostDomain(e.target.value as IndustryListingItem["domain"])}
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent"
                    >
                      <option value="Clinical">Clinical Practice & Hospital Inpatient</option>
                      <option value="Research">Research & Clinical Trials (GCP)</option>
                      <option value="Panchakarma">Panchakarma & Shodhana Therapy</option>
                      <option value="Herbal Pharma">Herbal Formulations & Standardization</option>
                      <option value="Hospital Admin">Hospital Admin & NABH Quality</option>
                    </select>
                  </div>

                  {/* Department */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Department / Wing
                    </label>
                    <input
                      type="text"
                      value={postDepartment}
                      onChange={(e) => setPostDepartment(e.target.value)}
                      placeholder="e.g. Dept of Kayachikitsa & Inpatient Care"
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Location & Campus *
                    </label>
                    <input
                      type="text"
                      value={postLocation}
                      onChange={(e) => setPostLocation(e.target.value)}
                      placeholder="e.g. Sarita Vihar, New Delhi (or Remote / Hybrid)"
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  {/* Compensation */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Stipend / Compensation / Grant *
                    </label>
                    <input
                      type="text"
                      value={postCompensation}
                      onChange={(e) => setPostCompensation(e.target.value)}
                      placeholder="e.g. ₹35,000 / month or ₹8.5 LPA"
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  {/* Duration */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Duration / Engagement Term *
                    </label>
                    <input
                      type="text"
                      value={postDuration}
                      onChange={(e) => setPostDuration(e.target.value)}
                      placeholder="e.g. 6 Months, Full-Time, 4 Weeks"
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  {/* Open Positions & Deadline */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Positions
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={postPositions}
                        onChange={(e) => setPostPositions(Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Deadline
                      </label>
                      <input
                        type="date"
                        value={postDeadline}
                        onChange={(e) => setPostDeadline(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  {/* Required Competencies */}
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Required Competencies (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={postSkills}
                      onChange={(e) => setPostSkills(e.target.value)}
                      placeholder="e.g. Clinical Documentation (SOAP EHR), Nadi Pariksha, Panchakarma Safety"
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent"
                    />
                    <p className="text-[11px] text-muted-foreground">
                      Ayu-Setu will automatically match scholars whose Competency Passports verify these skills.
                    </p>
                  </div>

                  {/* Eligible Degrees */}
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Eligible Degrees (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={postDegrees}
                      onChange={(e) => setPostDegrees(e.target.value)}
                      placeholder="e.g. BAMS (Final Year), MD Kayachikitsa, MD Dravyaguna"
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Scope of Responsibilities & Mentorship Plan
                    </label>
                    <textarea
                      rows={4}
                      value={postDescription}
                      onChange={(e) => setPostDescription(e.target.value)}
                      placeholder="Describe the clinical/research learning outcomes, inpatient rotations, and mentor supervision provided..."
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("dashboard")}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="gold"
                    leftIcon={<Send className="h-3.5 w-3.5" />}
                    className="text-xs"
                  >
                    Publish {postingType.replace("_", " ")} Opportunity
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: VIEW CANDIDATES & SHORTLIST */}
        {/* ========================================================================= */}
        {activeTab === "candidates" && (
          <div className="space-y-6">
            {/* Header & Filter Controls */}
            <div className="p-5 rounded-xl bg-card border border-border space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Users className="h-5 w-5 text-accent" />
                    Ayurveda Scholar Talent Directory
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Browse verified students and postgraduate scholars with tamper-proof Competency Passports.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="verified" size="sm">
                    {filteredCandidates.length} Matched Scholars
                  </Badge>
                </div>
              </div>

              {/* Filters Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
                {/* Search Bar */}
                <div className="sm:col-span-5 relative">
                  <Search className="h-4 w-4 absolute left-3.5 top-3 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by student name, college, or degree..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:border-accent"
                  />
                </div>

                {/* Domain Selector */}
                <div className="sm:col-span-4">
                  <select
                    value={domainFilter}
                    onChange={(e) => setDomainFilter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:border-accent"
                  >
                    <option value="ALL">All Domains (Clinical, Research, Panchakarma, Pharma)</option>
                    <option value="Clinical">Clinical Practice</option>
                    <option value="Research">Research & Clinical Trials</option>
                    <option value="Panchakarma">Panchakarma Therapy</option>
                    <option value="Herbal Pharma">Herbal Formulations & Pharma</option>
                  </select>
                </div>

                {/* Minimum Match Score */}
                <div className="sm:col-span-3">
                  <select
                    value={minMatchFilter}
                    onChange={(e) => setMinMatchFilter(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:border-accent"
                  >
                    <option value={70}>Min Match: 70%+</option>
                    <option value={80}>Min Match: 80%+</option>
                    <option value={85}>Min Match: 85%+</option>
                    <option value={90}>Elite Match: 90%+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Candidates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCandidates.map((candidate) => {
                const isShortlisted = candidate.shortlistedFor.length > 0;

                return (
                  <Card
                    key={candidate.id}
                    variant="default"
                    className="p-5 flex flex-col justify-between space-y-4 hover:border-accent/60 transition-all shadow-sm"
                  >
                    <div className="space-y-3">
                      {/* Top Row: Avatar & Match Badge */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 text-accent font-bold text-base flex items-center justify-center border border-accent/40 shadow-inner">
                            {candidate.avatarText}
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-foreground hover:text-accent transition-colors">
                              {candidate.name}
                            </h3>
                            <p className="text-xs text-muted-foreground line-clamp-1">{candidate.institution}</p>
                            <span className="text-[11px] font-medium text-accent">{candidate.degree}</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-sm font-bold text-emerald-500">{candidate.overallMatchScore}%</span>
                          <span className="block text-[10px] text-muted-foreground uppercase font-semibold">Match</span>
                        </div>
                      </div>

                      {/* Verified Clinical Hours & Passport */}
                      <div className="p-2.5 rounded-lg bg-muted/40 border border-border/70 space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                            <Stethoscope className="h-3 w-3 text-accent" /> Clinical Exposure:
                          </span>
                          <span className="font-bold text-foreground text-[11px]">
                            {candidate.clinicalHoursVerified} Verified Hours
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                            <ShieldCheck className="h-3 w-3 text-emerald-500" /> Digital Passport:
                          </span>
                          <span className="font-mono text-[10px] text-accent">
                            {candidate.passportHash.substring(0, 10)}...
                          </span>
                        </div>
                      </div>

                      {/* Career DNA Bar Meters */}
                      <div className="space-y-1.5 text-[11px]">
                        <span className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px] block">
                          Ayurveda Career DNA
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-0.5">
                            <div className="flex justify-between text-[10px]">
                              <span>Clinical</span>
                              <span className="font-bold">{candidate.careerDnaScores.clinical}%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full bg-accent rounded-full"
                                style={{ width: `${candidate.careerDnaScores.clinical}%` }}
                              />
                            </div>
                          </div>

                          <div className="space-y-0.5">
                            <div className="flex justify-between text-[10px]">
                              <span>Research</span>
                              <span className="font-bold">{candidate.careerDnaScores.research}%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${candidate.careerDnaScores.research}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Verified Competencies Tags */}
                      <div className="space-y-1">
                        <span className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px] block">
                          Verified Competencies
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {candidate.verifiedCompetencies.map((comp, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-card border border-border text-foreground flex items-center gap-1"
                            >
                              <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" />
                              {comp.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-muted-foreground hover:text-foreground"
                        onClick={() => setSelectedCandidate(candidate)}
                        leftIcon={<Eye className="h-3 w-3" />}
                      >
                        Inspect Full Profile
                      </Button>

                      {isShortlisted ? (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                          className="text-xs text-emerald-500 border-emerald-500/30"
                          leftIcon={<Check className="h-3.5 w-3.5" />}
                        >
                          Shortlisted
                        </Button>
                      ) : (
                        <Button
                          variant="gold"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleShortlist(candidate.id, "ind-opp-01")}
                          leftIcon={<UserCheck className="h-3.5 w-3.5" />}
                        >
                          Shortlist
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>

            {filteredCandidates.length === 0 && (
              <div className="p-12 text-center rounded-2xl bg-card border border-border space-y-3">
                <Users className="h-10 w-10 text-muted-foreground mx-auto" />
                <h3 className="text-base font-bold text-foreground">No candidates match your current filter</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Try broadening your search query or decreasing the minimum match score threshold.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setDomainFilter("ALL");
                    setMinMatchFilter(70);
                  }}
                  className="text-xs"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: APPLICATIONS QUEUE */}
        {/* ========================================================================= */}
        {activeTab === "applications" && (
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  Candidate Application & Recruitment Pipeline
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Track candidates across the full lifecycle: Submitted $\rightarrow$ Under Review $\rightarrow$ Shortlisted $\rightarrow$ Supervisor Endorsed $\rightarrow$ Hired.
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto p-1 rounded-xl bg-muted/60 border border-border">
                {["ALL", "SUBMITTED", "UNDER_REVIEW", "SHORTLISTED", "SUPERVISOR_ENDORSED", "HIRED"].map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setAppStageFilter(stage)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      appStageFilter === stage
                        ? "bg-accent text-accent-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {stage === "ALL" ? "All" : stage.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Applications List */}
            <div className="space-y-3">
              {filteredApplications.map((app) => (
                <Card key={app.id} variant="default" className="p-5 space-y-3">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Candidate & Opportunity Info */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-foreground">{app.candidateName}</h3>
                        <Badge variant="outline" size="sm">
                          {app.candidateDegree}
                        </Badge>
                        <Badge
                          variant={
                            app.stage === "SHORTLISTED"
                              ? "gold"
                              : app.stage === "SUPERVISOR_ENDORSED" || app.stage === "HIRED"
                              ? "verified"
                              : "secondary"
                          }
                          size="sm"
                        >
                          {app.stage.replace("_", " ")}
                        </Badge>
                        <span className="text-xs font-bold text-emerald-500">
                          {app.matchScore}% Match
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Applied for: <span className="font-semibold text-foreground">{app.opportunityTitle}</span> ({app.opportunityType.replace("_", " ")})
                      </p>

                      <p className="text-[11px] text-muted-foreground">
                        Institution: {app.institution} • Assigned Supervisor: {app.supervisorName}
                      </p>
                    </div>

                    {/* Stage Action Controls */}
                    <div className="flex flex-wrap items-center gap-2">
                      {app.stage === "SUBMITTED" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleAdvanceStage(app.id, "UNDER_REVIEW")}
                        >
                          Mark Under Review
                        </Button>
                      )}

                      {(app.stage === "SUBMITTED" || app.stage === "UNDER_REVIEW") && (
                        <Button
                          variant="gold"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleAdvanceStage(app.id, "SHORTLISTED")}
                          leftIcon={<Check className="h-3.5 w-3.5" />}
                        >
                          Shortlist Candidate
                        </Button>
                      )}

                      {app.stage === "SHORTLISTED" && (
                        <Button
                          variant="gold"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleAdvanceStage(app.id, "SUPERVISOR_ENDORSED")}
                          leftIcon={<ShieldCheck className="h-3.5 w-3.5" />}
                        >
                          Confirm Supervisor Endorsement
                        </Button>
                      )}

                      {app.stage === "SUPERVISOR_ENDORSED" && (
                        <Button
                          variant="gold"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleAdvanceStage(app.id, "HIRED")}
                          leftIcon={<Award className="h-3.5 w-3.5" />}
                        >
                          Offer & Hire Candidate
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs text-accent border-accent/40 hover:bg-accent/10"
                        onClick={() => setFeedbackApp(app)}
                        leftIcon={<Sparkles className="h-3.5 w-3.5" />}
                      >
                        Preceptor Feedback
                      </Button>

                      <Link href={`/student/applications/app-aiia-clinical-01`}>
                        <Button variant="ghost" size="sm" className="text-xs" rightIcon={<ExternalLink className="h-3 w-3" />}>
                          Full Verification Audit
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {app.notes && (
                    <div className="p-3 rounded-lg bg-muted/40 border border-border/70 text-xs text-muted-foreground flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-accent shrink-0" />
                      <span>{app.notes}</span>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: MENTORSHIP HUB */}
        {/* ========================================================================= */}
        {activeTab === "mentorship" && (
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-accent" />
                  Industry Clinical Preceptorship & Mentorship Hub
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Host certified clinical practicums, hospital rounds, and R&D masterclasses for aspiring scholars.
                </p>
              </div>

              <Button
                variant="gold"
                size="sm"
                className="text-xs shrink-0"
                onClick={() => setShowMentorModal(true)}
                leftIcon={<PlusCircle className="h-3.5 w-3.5" />}
              >
                Schedule New Practicum
              </Button>
            </div>

            {/* Mentorship Offerings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {mentorships.map((slot) => (
                <Card
                  key={slot.id}
                  variant="default"
                  className="p-5 flex flex-col justify-between space-y-4 hover:border-accent/50 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <Badge variant="gold" size="sm">
                        {slot.mode}
                      </Badge>
                      <Badge
                        variant={slot.status === "OPEN" ? "verified" : slot.status === "FULL" ? "secondary" : "outline"}
                        size="sm"
                      >
                        {slot.status === "OPEN" ? `${slot.capacity - slot.enrolledMentees} Seats Left` : slot.status}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-foreground leading-snug">{slot.sessionTitle}</h3>
                      <p className="text-xs text-accent mt-1">{slot.specialtyDomain}</p>
                    </div>

                    {/* Preceptor Card */}
                    <div className="p-3 rounded-xl bg-muted/40 border border-border/70 space-y-1 text-xs">
                      <div className="font-bold text-foreground">{slot.mentorName}</div>
                      <p className="text-muted-foreground text-[11px]">{slot.mentorTitle}</p>
                      <p className="text-muted-foreground text-[11px]">{slot.organization}</p>
                    </div>

                    {/* Date & Time */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1 text-[11px]">
                        <Calendar className="h-3 w-3 text-accent" /> {slot.date}
                      </span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock className="h-3 w-3 text-accent" /> {slot.timeSlot}
                      </span>
                    </div>

                    {/* Topics */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase">Key Practicum Topics</span>
                      <ul className="space-y-1 text-[11px] text-foreground">
                        {slot.topicsCovered.map((topic, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-accent font-bold">•</span>
                            <span className="line-clamp-1">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Enrollment Progress */}
                  <div className="pt-3 border-t border-border space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground">Scholar Enrollment:</span>
                      <span className="font-bold text-foreground">
                        {slot.enrolledMentees} / {slot.capacity} Scholars
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${(slot.enrolledMentees / slot.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: ANALYTICS & INSIGHTS */}
        {/* ========================================================================= */}
        {activeTab === "analytics" && analytics && (
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-card border border-border">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Industry Recruitment & Skill Supply Analytics
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Real-time intelligence on Ayush graduate competency supply vs. industry clinical demand.
              </p>
            </div>

            {/* Top Stat Meters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card variant="default" className="p-5 space-y-1 text-center">
                <span className="text-xs uppercase font-semibold text-muted-foreground">Shortlist Conversion Rate</span>
                <p className="text-3xl font-bold text-accent">{analytics.shortlistConversionRate}%</p>
                <p className="text-xs text-muted-foreground">Applicants successfully passing pre-screening</p>
              </Card>

              <Card variant="default" className="p-5 space-y-1 text-center">
                <span className="text-xs uppercase font-semibold text-muted-foreground">Average Time-to-Shortlist</span>
                <p className="text-3xl font-bold text-primary">1.8 Days</p>
                <p className="text-xs text-muted-foreground">Automated by verified Competency Passport checks</p>
              </Card>

              <Card variant="default" className="p-5 space-y-1 text-center">
                <span className="text-xs uppercase font-semibold text-muted-foreground">Institutional Network</span>
                <p className="text-3xl font-bold text-emerald-500">120+ Colleges</p>
                <p className="text-xs text-muted-foreground">AIIA, NIA Jaipur, ITRA, BHU, GAC Pune</p>
              </Card>
            </div>

            {/* Skill Demand vs Supply Deficit Analysis */}
            <Card variant="default" className="p-6 space-y-5">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Activity className="h-4 w-4 text-accent" />
                  Ayurveda Competency Gap Analysis: Industry Demand vs. Student Supply
                </h3>
                <p className="text-xs text-muted-foreground">
                  Identifies critical skills where enterprise openings outstrip verified student talent.
                </p>
              </div>

              <div className="space-y-4">
                {analytics.topInDemandSkills.map((skill, idx) => (
                  <div key={idx} className="space-y-1.5 p-3.5 rounded-xl bg-muted/30 border border-border/70">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-sm font-bold text-foreground">{skill.skillName}</span>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={skill.gapStatus === "DEFICIT" ? "gold" : skill.gapStatus === "BALANCED" ? "verified" : "secondary"}
                          size="sm"
                        >
                          {skill.gapStatus === "DEFICIT" ? "High Talent Demand" : skill.gapStatus}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-muted-foreground">Industry Openings Requiring Skill:</span>
                          <span className="font-bold text-accent">{skill.industryDemandPct}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-accent rounded-full" style={{ width: `${skill.industryDemandPct}%` }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-muted-foreground">Graduating Scholars with Verified Badge:</span>
                          <span className="font-bold text-emerald-500">{skill.talentPoolSupplyPct}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${skill.talentPoolSupplyPct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Candidate Domain Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="default" className="p-5 space-y-4">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Layers className="h-4 w-4 text-accent" />
                  Candidate Talent Breakdown by Domain
                </h3>
                <div className="space-y-3">
                  {analytics.candidatesByDomain.map((domain, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-foreground">{domain.domain}</span>
                        <span className="text-muted-foreground font-semibold">{domain.percentage}% of pool</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            i === 0 ? "bg-accent" : i === 1 ? "bg-primary" : i === 2 ? "bg-emerald-500" : "bg-amber-500"
                          }`}
                          style={{ width: `${domain.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card variant="default" className="p-5 space-y-4">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  Enterprise Recruitment Compliance
                </h3>
                <div className="space-y-2.5 text-xs text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Every student profile is pre-verified against state NCISM board registration databases.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Clinical posting hours include preceptor and OT superintendent counter-signatures.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Bilateral feedback submitted by your industry preceptors feeds directly into national Ayush skill roadmaps.</span>
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CANDIDATE INSPECTION MODAL */}
        {/* ========================================================================= */}
        {selectedCandidate && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-card border border-border max-w-2xl w-full rounded-2xl shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-accent/20 text-accent font-bold text-xl flex items-center justify-center border border-accent/40">
                    {selectedCandidate.avatarText}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{selectedCandidate.name}</h3>
                    <p className="text-xs text-muted-foreground">{selectedCandidate.institution}</p>
                    <p className="text-xs text-accent font-medium">{selectedCandidate.degree} • {selectedCandidate.currentYear}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Passport Hash & Verification */}
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/70 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" /> Tamper-Proof Competency Passport
                  </span>
                  <Badge variant="verified" size="sm">✓ NCISM Verified</Badge>
                </div>
                <div className="font-mono text-[11px] text-muted-foreground break-all">
                  Hash: {selectedCandidate.passportHash}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  Verified Inpatient Clinical Hours: <strong className="text-foreground">{selectedCandidate.clinicalHoursVerified} Hours</strong>
                </div>
              </div>

              {/* Career DNA */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Ayurveda Career DNA Breakdown
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-card border border-border">
                    <span className="text-muted-foreground block text-[11px]">Clinical Acumen</span>
                    <span className="text-lg font-bold text-foreground">{selectedCandidate.careerDnaScores.clinical}%</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-card border border-border">
                    <span className="text-muted-foreground block text-[11px]">Research & Trials</span>
                    <span className="text-lg font-bold text-foreground">{selectedCandidate.careerDnaScores.research}%</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-card border border-border">
                    <span className="text-muted-foreground block text-[11px]">Panchakarma Safety</span>
                    <span className="text-lg font-bold text-foreground">{selectedCandidate.careerDnaScores.panchakarma}%</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-card border border-border">
                    <span className="text-muted-foreground block text-[11px]">Herbal Pharma</span>
                    <span className="text-lg font-bold text-foreground">{selectedCandidate.careerDnaScores.herbalPharma}%</span>
                  </div>
                </div>
              </div>

              {/* Verified Competencies */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Attested Clinical & Technical Competencies
                </h4>
                <div className="space-y-2">
                  {selectedCandidate.verifiedCompetencies.map((comp, i) => (
                    <div key={i} className="p-3 rounded-lg bg-card border border-border flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground">{comp.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="verified" size="sm">
                          {comp.level} ({comp.score}%)
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explainable Rationale: WHY THIS CANDIDATE MATCHES */}
              <div className="space-y-3 p-4 rounded-xl bg-accent/5 border border-accent/20">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-accent" /> Why This Candidate Matches ({selectedCandidate.overallMatchScore}%)
                  </h4>
                  <Badge variant="gold" size="sm">Deterministic Compatibility</Badge>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-foreground/90">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Direct Skill Verification:</strong> Exceeds minimum benchmarks in {selectedCandidate.verifiedCompetencies.map(c => c.name).join(", ")}.</span>
                  </div>
                  <div className="flex items-start gap-2 text-foreground/90">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Clinical Rigor:</strong> {selectedCandidate.clinicalHoursVerified} verified hospital posting hours counter-signed by institutional faculty preceptors.</span>
                  </div>
                  <div className="flex items-start gap-2 text-foreground/90">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Academic Trajectory:</strong> Standing in {selectedCandidate.degree} at {selectedCandidate.institution} matches high-priority industry criteria.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-background/60 border border-border text-[11px] text-muted-foreground flex items-center gap-2 mt-2">
                    <AlertCircle className="h-3.5 w-3.5 text-accent shrink-0" />
                    <span><strong>Recommended Onboarding Focus:</strong> Provide orientation on corporate standard operating procedures (SOPs) and clinical trial documentation templates.</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCandidate(null)}
                  className="text-xs"
                >
                  Close
                </Button>

                <Button
                  variant="gold"
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    handleShortlist(selectedCandidate.id, "ind-opp-01");
                    setSelectedCandidate(null);
                  }}
                  leftIcon={<UserCheck className="h-3.5 w-3.5" />}
                >
                  Shortlist {selectedCandidate.name}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STRUCTURED PRECEPTOR FEEDBACK MODAL */}
        {/* ========================================================================= */}
        {feedbackApp && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-card border border-border max-w-xl w-full rounded-2xl shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent" />
                    Preceptor Structured Evaluation & Feedback
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    For candidate: <strong>{feedbackApp.candidateName}</strong> ({feedbackApp.candidateDegree}) • Role: {feedbackApp.opportunityTitle}
                  </p>
                </div>
                <button
                  onClick={() => setFeedbackApp(null)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {feedbackSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{feedbackSuccess}</span>
                </div>
              )}

              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                {/* 6 Structured Competency Categories (1-5 scale) */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Competency Dimensions (Rating 1-5)
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-foreground">Technical Competency</label>
                      <select
                        value={feedbackForm.technicalCompetency}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, technicalCompetency: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-foreground text-xs"
                      >
                        <option value={5}>5 - Mastery / Exceptional</option>
                        <option value={4}>4 - Proficient / Above Average</option>
                        <option value={3}>3 - Competent / Standard</option>
                        <option value={2}>2 - Developing / Needs Guidance</option>
                        <option value={1}>1 - Deficient / Unprepared</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-foreground">Domain Competency</label>
                      <select
                        value={feedbackForm.domainCompetency}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, domainCompetency: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-foreground text-xs"
                      >
                        <option value={5}>5 - Mastery / Exceptional</option>
                        <option value={4}>4 - Proficient / Above Average</option>
                        <option value={3}>3 - Competent / Standard</option>
                        <option value={2}>2 - Developing / Needs Guidance</option>
                        <option value={1}>1 - Deficient / Unprepared</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-foreground">Clinical Communication</label>
                      <select
                        value={feedbackForm.communication}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, communication: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-foreground text-xs"
                      >
                        <option value={5}>5 - Clear, Articulate, Empathic</option>
                        <option value={4}>4 - Effective Clinical Dialogue</option>
                        <option value={3}>3 - Adequate Patient Communication</option>
                        <option value={2}>2 - Needs Confidence / Clarity</option>
                        <option value={1}>1 - Hesitant / Unclear</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-foreground">Professionalism & Ethics</label>
                      <select
                        value={feedbackForm.professionalism}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, professionalism: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-foreground text-xs"
                      >
                        <option value={5}>5 - Exemplary Punctuality & Ethics</option>
                        <option value={4}>4 - Highly Professional</option>
                        <option value={3}>3 - Meets Workplace Standards</option>
                        <option value={2}>2 - Occasional Delays / Lapses</option>
                        <option value={1}>1 - Needs Ethics Remediation</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-foreground">Problem Solving</label>
                      <select
                        value={feedbackForm.problemSolving}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, problemSolving: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-foreground text-xs"
                      >
                        <option value={5}>5 - Exceptional Analytical Reasoning</option>
                        <option value={4}>4 - Independent Solution Formulation</option>
                        <option value={3}>3 - Standard Protocol Execution</option>
                        <option value={2}>2 - Requires Continuous Direction</option>
                        <option value={1}>1 - Unable to Synthesize Evidence</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-foreground">Teamwork & Hospital Rounds</label>
                      <select
                        value={feedbackForm.teamwork}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, teamwork: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-foreground text-xs"
                      >
                        <option value={5}>5 - Outstanding Collaboration</option>
                        <option value={4}>4 - Reliable Team Contributor</option>
                        <option value={3}>3 - Participates in Ward Rounds</option>
                        <option value={2}>2 - Isolated / Minimal Sharing</option>
                        <option value={1}>1 - Disruptive / Non-collaborative</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Overall Impression */}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Overall Preceptor Recommendation
                  </label>
                  <select
                    value={feedbackForm.overallImpression}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, overallImpression: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs"
                  >
                    <option value="OUTSTANDING">Outstanding - Fast-Track for Corporate Placement / Fellowship</option>
                    <option value="READY">Ready - Verified Clinical Competence for Direct Inpatient Practice</option>
                    <option value="NEEDS_DEVELOPMENT">Needs Development - Recommend Supplementary Academic Remediation</option>
                  </select>
                </div>

                {/* Strengths & Improvement Areas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Key Strengths Demonstrated</label>
                    <input
                      type="text"
                      value={feedbackForm.strengths}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, strengths: e.target.value })}
                      placeholder="e.g. Nadi Pariksha, Aseptic technique"
                      className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Specific Improvement Areas</label>
                    <input
                      type="text"
                      value={feedbackForm.improvementAreas}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, improvementAreas: e.target.value })}
                      placeholder="e.g. Statistical analysis, NAMASTE EHR coding"
                      className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs"
                    />
                  </div>
                </div>

                {/* Recommendation Note */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Detailed Preceptor Remarks</label>
                  <textarea
                    rows={3}
                    value={feedbackForm.recommendationNote}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, recommendationNote: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFeedbackApp(null)}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="gold"
                    size="sm"
                    className="text-xs"
                    leftIcon={<Send className="h-3.5 w-3.5" />}
                  >
                    Dispatch Feedback to Student Portfolio
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCHEDULE MENTORSHIP PRACTICUM MODAL */}
        {/* ========================================================================= */}
        {showMentorModal && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-card border border-border max-w-lg w-full rounded-2xl shadow-2xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-accent" />
                  Schedule Industry Mentorship Session
                </h3>
                <button
                  onClick={() => setShowMentorModal(false)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreateMentorship} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Session Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMentorTitle}
                    onChange={(e) => setNewMentorTitle(e.target.value)}
                    placeholder="e.g. Clinical Preceptorship in Chronic Diabetes Management"
                    className="w-full px-4 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Specialty Domain
                  </label>
                  <input
                    type="text"
                    value={newMentorSpecialty}
                    onChange={(e) => setNewMentorSpecialty(e.target.value)}
                    placeholder="e.g. Integrative Kayachikitsa & Inpatient Shodhana"
                    className="w-full px-4 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Schedule Date
                    </label>
                    <input
                      type="text"
                      value={newMentorDate}
                      onChange={(e) => setNewMentorDate(e.target.value)}
                      placeholder="e.g. Every Thursday"
                      className="w-full px-4 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Time Slot
                    </label>
                    <input
                      type="text"
                      value={newMentorTime}
                      onChange={(e) => setNewMentorTime(e.target.value)}
                      placeholder="e.g. 05:00 PM IST"
                      className="w-full px-4 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowMentorModal(false)}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="gold" className="text-xs">
                    Confirm & Publish Session
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
