"use client";

import * as React from "react";
import Link from "next/link";
import {
  Briefcase,
  Building2,
  MapPin,
  Clock,
  Search,
  Filter,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Send,
  Plus,
  X,
  ExternalLink,
  BookOpen,
  Calendar,
  Layers,
  FileCheck,
  UserCheck,
  Award,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/cards/Card";
import { loadSkillDna, SkillDnaItem } from "@/lib/services/skillIntelligenceService";
import { getActiveCareerGoal } from "@/lib/services/careerIntelligenceService";
import { NotificationService } from "@/lib/services/notificationService";
import { formatINR } from "@/lib/utils/formatters";

export interface OpportunityListing {
  id: string;
  title: string;
  organization: string;
  organizationLogoText: string;
  opportunityType: "Internship" | "Research Project" | "Job" | "Apprenticeship" | "Industry Project";
  description: string;
  location: string;
  city: string;
  isRemote: boolean;
  duration: string;
  stipendOrCtc: string;
  applicationDeadline: string;
  status: "ACTIVE" | "CLOSING_SOON" | "APPLIED";
  verificationStatus: "AIIA Accredited" | "NCISM Partner" | "Ministry Verified" | "Industry Verified";
  targetCareerDomain: string;
  eligibility: string[];
  requiredSkills: {
    skillName: string;
    minimumProficiency: number;
  }[];
  preferredSkills: string[];
}

export type ApplicationStage = "Applied" | "Under Review" | "Shortlisted" | "Interview" | "Selected" | "Rejected";

export interface StudentApplicationRecord {
  opportunityId: string;
  opportunityTitle: string;
  organization: string;
  appliedDate: string;
  status: ApplicationStage;
  matchScore: number;
  deadline: string;
  nextAction: string;
  nextActionUrl: string;
  interviewDetails?: string;
}

// Initial Curated Opportunities
const DEFAULT_OPPORTUNITIES: OpportunityListing[] = [
  {
    id: "opp-1",
    title: "Post-Graduate Fellow in Advanced Kayachikitsa",
    organization: "All India Institute of Ayurveda (AIIA)",
    organizationLogoText: "AIIA",
    opportunityType: "Internship",
    description: "Supervise tertiary Panchakarma inpatient therapies, manage metabolic syndrome cohorts, and conduct electronic SOAP ward documentation under senior faculty.",
    location: "New Delhi (Sarita Vihar)",
    city: "New Delhi",
    isRemote: false,
    duration: "6 Months",
    stipendOrCtc: "₹65,000 / month",
    applicationDeadline: "15 Oct 2026",
    status: "ACTIVE",
    verificationStatus: "AIIA Accredited",
    targetCareerDomain: "Clinical",
    eligibility: ["Final Year BAMS", "MD (Ayu) Scholars", "Provisional Registration"],
    requiredSkills: [
      { skillName: "Nadi Pariksha & Ashtavidha Pariksha", minimumProficiency: 80 },
      { skillName: "Clinical Documentation (SOAP Notes)", minimumProficiency: 80 },
      { skillName: "Panchakarma Protocol Supervision", minimumProficiency: 85 },
    ],
    preferredSkills: ["Swasthavritta Consultation", "Marma Therapy"],
  },
  {
    id: "opp-2",
    title: "Phytopharmaceutical Formulation Scientist",
    organization: "Dabur Research Foundation (DRF)",
    organizationLogoText: "DABUR",
    opportunityType: "Job",
    description: "Lead standardization of classical polyherbal formulations using HPTLC, marker compound quantification, and prepare regulatory dossiers for global exports.",
    location: "Ghaziabad / NCR Lab Hub",
    city: "Ghaziabad",
    isRemote: false,
    duration: "Full-Time",
    stipendOrCtc: "₹9.2 LPA – ₹14.5 LPA",
    applicationDeadline: "30 Oct 2026",
    status: "ACTIVE",
    verificationStatus: "Industry Verified",
    targetCareerDomain: "Industry",
    eligibility: ["BAMS / B.Pharm (Ayur)", "MD Dravyaguna / Rasashastra"],
    requiredSkills: [
      { skillName: "Evidence-Based Classical Formulation", minimumProficiency: 85 },
      { skillName: "Rasashastra & Bhasma Standardization", minimumProficiency: 80 },
      { skillName: "Schedule E-1 & Toxicological Profiling", minimumProficiency: 75 },
    ],
    preferredSkills: ["HPTLC Fingerprinting", "ICP-MS Heavy Metal Testing"],
  },
  {
    id: "opp-3",
    title: "Clinical Trials Protocol Associate (GCP-Ayush)",
    organization: "Himalaya Wellness Company",
    organizationLogoText: "HIMALAYA",
    opportunityType: "Research Project",
    description: "Coordinate Phase II/III randomized clinical efficacy trials for proprietary herbal therapeutics, verify informed consent, and conduct CTRI monitoring.",
    location: "Bengaluru Innovation Center",
    city: "Bengaluru",
    isRemote: true,
    duration: "12 Months",
    stipendOrCtc: "₹45,000 / month",
    applicationDeadline: "20 Oct 2026",
    status: "ACTIVE",
    verificationStatus: "Ministry Verified",
    targetCareerDomain: "Research",
    eligibility: ["Final Year BAMS", "MSc Clinical Research", "BAMS Interns"],
    requiredSkills: [
      { skillName: "GCP-Ayush Clinical Trials & Bioethics", minimumProficiency: 85 },
      { skillName: "Biostatistics & Ayurvedic Informatics", minimumProficiency: 75 },
      { skillName: "Clinical Documentation (SOAP Notes)", minimumProficiency: 80 },
    ],
    preferredSkills: ["Schedule Y Compliance", "Medical Writing for Herbal Trials"],
  },
  {
    id: "opp-4",
    title: "Resident Panchakarma Physician & Shodhana Preceptor",
    organization: "Kottakkal Arya Vaidya Sala (AVS)",
    organizationLogoText: "AVS",
    opportunityType: "Job",
    description: "Deliver classical Kerala Panchakarma therapies (Pizhichil, Navarakkizhi, Shirodhara), monitor Samsarjana Krama dietary regimens, and supervise therapist teams.",
    location: "Kottakkal, Malappuram, Kerala",
    city: "Kottakkal",
    isRemote: false,
    duration: "Full-Time",
    stipendOrCtc: "₹8.5 LPA – ₹13.0 LPA",
    applicationDeadline: "12 Nov 2026",
    status: "ACTIVE",
    verificationStatus: "NCISM Partner",
    targetCareerDomain: "Clinical",
    eligibility: ["BAMS Graduate", "Panchakarma Certification"],
    requiredSkills: [
      { skillName: "Panchakarma Protocol Supervision", minimumProficiency: 85 },
      { skillName: "Nadi Pariksha & Ashtavidha Pariksha", minimumProficiency: 75 },
      { skillName: "Clinical Documentation (SOAP Notes)", minimumProficiency: 75 },
    ],
    preferredSkills: ["Keraleeya Chikitsa Mastery", "Fluent English & Malayalam"],
  },
  {
    id: "opp-5",
    title: "Ayush Healthcare Data & ABDM Informatics Apprentice",
    organization: "National Digital Health Mission / Ayush Grid Hub",
    organizationLogoText: "GRID",
    opportunityType: "Apprenticeship",
    description: "Standardize NAMASTE Portal diagnostic nomenclature across 100+ teaching hospitals and build interoperable FHIR Ayush EHR clinical record templates.",
    location: "New Delhi / Hybrid",
    city: "New Delhi",
    isRemote: true,
    duration: "6 Months",
    stipendOrCtc: "₹38,000 / month",
    applicationDeadline: "05 Nov 2026",
    status: "ACTIVE",
    verificationStatus: "Ministry Verified",
    targetCareerDomain: "Data & Tech",
    eligibility: ["BAMS Students with Health Informatics Interest"],
    requiredSkills: [
      { skillName: "AYUSH EHR & ABDM Standards", minimumProficiency: 80 },
      { skillName: "Biostatistics & Ayurvedic Informatics", minimumProficiency: 75 },
    ],
    preferredSkills: ["Python / SQL Basics", "NAMASTE Portal Standard Terminology"],
  },
  {
    id: "opp-6",
    title: "Collaborative Classical Drug Standardization Project",
    organization: "CCRAS Central Council for Research in Ayurvedic Sciences",
    organizationLogoText: "CCRAS",
    opportunityType: "Industry Project",
    description: "Multi-centric verification of Ayurvedic Pharmacopoeia of India (API) monographs for vulnerable Himalayan medicinal species.",
    location: "Jaipur / Remote Lab",
    city: "Jaipur",
    isRemote: true,
    duration: "4 Months",
    stipendOrCtc: "₹28,000 / month Stipend",
    applicationDeadline: "25 Oct 2026",
    status: "ACTIVE",
    verificationStatus: "AIIA Accredited",
    targetCareerDomain: "Research",
    eligibility: ["BAMS Final Year & PG Scholars"],
    requiredSkills: [
      { skillName: "Evidence-Based Classical Formulation", minimumProficiency: 80 },
      { skillName: "Rasashastra & Bhasma Standardization", minimumProficiency: 75 },
    ],
    preferredSkills: ["Herbarium Specimen Preservation", "Phytochemistry"],
  },
];

const DEFAULT_APPLICATIONS: StudentApplicationRecord[] = [
  {
    opportunityId: "opp-2",
    opportunityTitle: "Phytopharmaceutical Formulation Scientist",
    organization: "Dabur Research Foundation (DRF)",
    appliedDate: "2026-09-12",
    status: "Shortlisted",
    matchScore: 91,
    deadline: "30 Oct 2026",
    nextAction: "Practice AI Mock Interview for Formulation Science",
    nextActionUrl: "/career?tab=interview",
    interviewDetails: "Virtual Technical Viva scheduled for 22 Oct 2026 at 11:00 AM IST",
  },
  {
    opportunityId: "opp-1",
    opportunityTitle: "Post-Graduate Fellow in Advanced Kayachikitsa",
    organization: "All India Institute of Ayurveda (AIIA)",
    appliedDate: "2026-09-14",
    status: "Under Review",
    matchScore: 92,
    deadline: "15 Oct 2026",
    nextAction: "Faculty preceptor reviewing inpatient SOAP documentation",
    nextActionUrl: "/portfolio",
  },
];

const APPLICATIONS_STORAGE_KEY = "vaidya_setu_student_applications_v2";
const POSTED_OPPS_STORAGE_KEY = "vaidya_setu_posted_opportunities_v2";

export function OpportunityMarketplace() {
  const [viewMode, setViewMode] = React.useState<"marketplace" | "applications">("marketplace");
  const [opportunities, setOpportunities] = React.useState<OpportunityListing[]>(DEFAULT_OPPORTUNITIES);
  const [activeTypeFilter, setActiveTypeFilter] = React.useState<string>("All");
  const [searchQuery, setSearchQuery] = React.useState<string>("" );
  const [remoteOnly, setRemoteOnly] = React.useState<boolean>(false);
  const [selectedDomain, setSelectedDomain] = React.useState<string>("All");

  // Detail Drawer
  const [detailOpp, setDetailOpp] = React.useState<OpportunityListing | null>(null);

  // Application Modal state
  const [applyOpp, setApplyOpp] = React.useState<OpportunityListing | null>(null);
  const [applicationSuccess, setApplicationSuccess] = React.useState<boolean>(false);
  const [userApplications, setUserApplications] = React.useState<StudentApplicationRecord[]>(DEFAULT_APPLICATIONS);

  // Industry Employer Mode Drawer
  const [showEmployerModal, setShowEmployerModal] = React.useState<boolean>(false);
  const [employerTitle, setEmployerTitle] = React.useState("");
  const [employerOrg, setEmployerOrg] = React.useState("");
  const [employerType, setEmployerType] = React.useState<OpportunityListing["opportunityType"]>("Internship");
  const [employerLocation, setEmployerLocation] = React.useState("");
  const [employerStipend, setEmployerStipend] = React.useState("");
  const [employerSkills, setEmployerSkills] = React.useState("Clinical Documentation, GCP-Ayush");

  // Skill DNA & Active Goal
  const skills = loadSkillDna();
  const activeGoal = getActiveCareerGoal();

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) setUserApplications(parsed);
      } else {
        localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(DEFAULT_APPLICATIONS));
      }
    } catch {}

    try {
      const custom = localStorage.getItem(POSTED_OPPS_STORAGE_KEY);
      if (custom) {
        const parsed = JSON.parse(custom);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOpportunities([...parsed, ...DEFAULT_OPPORTUNITIES]);
        }
      }
    } catch {}
  }, []);

  // Deterministic Skill Match Formula
  const calculateDeterministicMatch = (opp: OpportunityListing) => {
    let skillSum = 0;
    const skillBreakdown: { name: string; studentProf: number; reqProf: number; status: "Strong" | "Good" | "Deficient" }[] = [];
    const gaps: { name: string; gap: number }[] = [];

    opp.requiredSkills.forEach((req) => {
      const found = skills.find(
        (s) =>
          s.name.toLowerCase().includes(req.skillName.toLowerCase().split(" ")[0]) ||
          req.skillName.toLowerCase().includes(s.name.toLowerCase().split(" ")[0])
      );
      const studentProf = found ? found.currentProficiency : 55;
      const ratio = Math.min(1.2, studentProf / req.minimumProficiency);
      skillSum += ratio * 100;

      let status: "Strong" | "Good" | "Deficient" = "Deficient";
      if (studentProf >= req.minimumProficiency + 5) status = "Strong";
      else if (studentProf >= req.minimumProficiency) status = "Good";
      else {
        gaps.push({ name: req.skillName, gap: req.minimumProficiency - studentProf });
      }

      skillBreakdown.push({
        name: req.skillName,
        studentProf,
        reqProf: req.minimumProficiency,
        status,
      });
    });

    const skillScore = Math.min(100, Math.round(skillSum / Math.max(1, opp.requiredSkills.length)));
    const eligibilityScore = 95;
    const verifiedCount = skills.filter((s) => s.verificationStatus !== "Self Declared").length;
    const assessmentScore = Math.min(100, Math.round((verifiedCount / skills.length) * 100) + 15);
    const isGoalAligned =
      opp.title.toLowerCase().includes(activeGoal.toLowerCase().slice(0, 8)) ||
      opp.targetCareerDomain.toLowerCase().includes(activeGoal.toLowerCase().slice(0, 6));
    const careerScore = isGoalAligned ? 95 : 78;
    const experienceScore = 88;

    const overallMatch = Math.min(
      98,
      Math.round(
        skillScore * 0.4 +
        eligibilityScore * 0.2 +
        assessmentScore * 0.15 +
        careerScore * 0.15 +
        experienceScore * 0.1
      )
    );

    return {
      overallMatch,
      skillScore,
      eligibilityScore,
      assessmentScore,
      careerScore,
      experienceScore,
      skillBreakdown,
      gaps,
    };
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesType =
      activeTypeFilter === "All" ||
      opp.opportunityType.toLowerCase() === activeTypeFilter.toLowerCase();

    const matchesDomain =
      selectedDomain === "All" ||
      opp.targetCareerDomain.toLowerCase() === selectedDomain.toLowerCase();

    const matchesRemote = !remoteOnly || opp.isRemote;

    const query = searchQuery.toLowerCase();
    const matchesQuery =
      !query ||
      opp.title.toLowerCase().includes(query) ||
      opp.organization.toLowerCase().includes(query) ||
      opp.location.toLowerCase().includes(query) ||
      opp.requiredSkills.some((s) => s.skillName.toLowerCase().includes(query));

    return matchesType && matchesDomain && matchesRemote && matchesQuery;
  });

  const handleApplyToOpportunity = (opp: OpportunityListing) => {
    const match = calculateDeterministicMatch(opp);
    const newApp: StudentApplicationRecord = {
      opportunityId: opp.id,
      opportunityTitle: opp.title,
      organization: opp.organization,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Applied",
      matchScore: match.overallMatch,
      deadline: opp.applicationDeadline,
      nextAction: "Application submitted. Hospital preceptor verifying clinical hours.",
      nextActionUrl: "/portfolio",
    };

    const updated = [newApp, ...userApplications.filter((a) => a.opportunityId !== opp.id)];
    setUserApplications(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(updated));
    }

    // Trigger Notification
    NotificationService.addNotification({
      title: `Application Sent: ${opp.organization}`,
      message: `Your verified Competency Passport hash has been transmitted to ${opp.organization} for ${opp.title}.`,
      category: "APPLICATION",
      priority: "INFO",
      actionUrl: "/opportunities",
      actionLabel: "Track Application",
    });

    setApplicationSuccess(true);
    setTimeout(() => {
      setApplicationSuccess(false);
      setApplyOpp(null);
    }, 2500);
  };

  // Demo helper to advance application stage
  const handleAdvanceStage = (appId: string) => {
    const stages: ApplicationStage[] = ["Applied", "Under Review", "Shortlisted", "Interview", "Selected"];
    const updated = userApplications.map((a) => {
      if (a.opportunityId === appId) {
        const currentIdx = stages.indexOf(a.status);
        const nextStage = stages[(currentIdx + 1) % stages.length];

        let nextAction = "Application submitted.";
        let nextUrl = "/portfolio";
        if (nextStage === "Shortlisted") {
          nextAction = "Shortlisted! Prepare for Clinical Viva in AI Mock Interview Chamber.";
          nextUrl = "/career?tab=interview";
          NotificationService.addNotification({
            title: `Shortlisted by ${a.organization}!`,
            message: `Congratulations! ${a.organization} has shortlisted you for ${a.opportunityTitle}.`,
            category: "APPLICATION",
            priority: "HIGH",
            actionUrl: "/career?tab=interview",
            actionLabel: "Prepare Viva",
          });
        } else if (nextStage === "Selected") {
          nextAction = "Offer accepted! Clinical rotation orientation starting soon.";
          nextUrl = "/portfolio";
        }

        return {
          ...a,
          status: nextStage,
          nextAction,
          nextActionUrl: nextUrl,
        };
      }
      return a;
    });

    setUserApplications(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const handlePostEmployerOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employerTitle.trim() || !employerOrg.trim()) return;

    const reqSkills = employerSkills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((skillName) => ({
        skillName,
        minimumProficiency: 80,
      }));

    const newListing: OpportunityListing = {
      id: `opp-employer-${Date.now()}`,
      title: employerTitle.trim(),
      organization: employerOrg.trim(),
      organizationLogoText: employerOrg.slice(0, 4).toUpperCase(),
      opportunityType: employerType,
      description: "Direct industry opening registered through Employer Portal.",
      location: employerLocation.trim() || "National / On-Site",
      city: employerLocation.split(",")[0] || "NCR",
      isRemote: employerLocation.toLowerCase().includes("remote"),
      duration: "6 Months",
      stipendOrCtc: employerStipend.trim() || "₹35,000 / month",
      applicationDeadline: "30 Nov 2026",
      status: "ACTIVE",
      verificationStatus: "Industry Verified",
      targetCareerDomain: "Clinical",
      eligibility: ["BAMS Graduate / Final Year"],
      requiredSkills: reqSkills.length > 0 ? reqSkills : [{ skillName: "Clinical Documentation (SOAP Notes)", minimumProficiency: 80 }],
      preferredSkills: ["Accredited Hospital Experience"],
    };

    const updated = [newListing, ...opportunities];
    setOpportunities(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(POSTED_OPPS_STORAGE_KEY, JSON.stringify([newListing]));
    }

    setShowEmployerModal(false);
    setEmployerTitle("");
    setEmployerOrg("");
    alert(`Opportunity "${newListing.title}" posted successfully! Visible in Marketplace.`);
  };

  const stagesList: ApplicationStage[] = ["Applied", "Under Review", "Shortlisted", "Interview", "Selected"];

  return (
    <div className="space-y-8">
      {/* 1. Master Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-[#032015] to-slate-950 border border-emerald-500/30 backdrop-blur-xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Briefcase className="h-3.5 w-3.5 text-emerald-400" />
            <span>National Ayush Opportunity Marketplace &amp; Tracker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {viewMode === "marketplace" ? "Verified Clinical & Pharma Placements" : "My Tracked Applications"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            {viewMode === "marketplace"
              ? "All openings feature deterministic Skill DNA compatibility scoring. Explore fellowships at AIIA, R&D scientist positions at Dabur and Himalaya, and hospital residencies."
              : "Track your real-time application progression across the 6 recruitment stages from initial submission to final institutional selection."}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => setShowEmployerModal(true)}
            variant="outline"
            size="sm"
            className="border-emerald-500/40 text-emerald-300 text-xs font-bold gap-1.5 hover:bg-emerald-950/50"
          >
            <Building2 className="h-3.5 w-3.5" />
            <span>Post Opportunity (Industry)</span>
          </Button>

          {/* View Mode Toggle */}
          <div className="p-1 rounded-2xl bg-black/60 border border-emerald-500/30 flex items-center gap-1 text-xs">
            <button
              onClick={() => setViewMode("marketplace")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                viewMode === "marketplace"
                  ? "bg-amber-400 text-slate-950 shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Browse ({filteredOpportunities.length})
            </button>
            <button
              onClick={() => setViewMode("applications")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                viewMode === "applications"
                  ? "bg-amber-400 text-slate-950 shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <span>Tracked</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                {userApplications.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: MARKETPLACE */}
      {viewMode === "marketplace" && (
        <div className="space-y-6 animate-in fade-in">
          {/* Category Filters Bar */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#03190f]/90 border border-emerald-500/30 backdrop-blur-xl text-xs">
              {["All", "Internship", "Research Project", "Job", "Apprenticeship", "Industry Project"].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveTypeFilter(type)}
                  className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
                    activeTypeFilter === type
                      ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Search & Facets Row */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-6 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title, organization (AIIA, Dabur), skill, or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-emerald-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="sm:col-span-3">
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-black/50 border border-emerald-500/30 text-gray-200 text-xs focus:outline-none focus:border-amber-400"
                >
                  <option value="All">All Domains</option>
                  <option value="Clinical">Clinical Practice</option>
                  <option value="Research">Research &amp; Trials</option>
                  <option value="Industry">Pharma &amp; Industry</option>
                  <option value="Data & Tech">Data &amp; Ayush EHR</option>
                </select>
              </div>

              <div className="sm:col-span-3 flex items-center justify-end">
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-black/30 border border-emerald-500/20 text-xs text-gray-300 w-full justify-between">
                  <span>Remote / Hybrid Only</span>
                  <input
                    type="checkbox"
                    checked={remoteOnly}
                    onChange={(e) => setRemoteOnly(e.target.checked)}
                    className="rounded text-amber-400 focus:ring-0 h-4 w-4"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOpportunities.map((opp) => {
              const match = calculateDeterministicMatch(opp);
              const hasApplied = userApplications.some((a) => a.opportunityId === opp.id);

              return (
                <div
                  key={opp.id}
                  className="rounded-3xl bg-[#03190f]/90 border border-emerald-500/30 backdrop-blur-xl p-6 flex flex-col justify-between space-y-5 hover:border-emerald-500/60 transition-all shadow-xl"
                >
                  <div className="space-y-4">
                    {/* Top Metas */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-2xl bg-black/60 border border-emerald-500/30 flex items-center justify-center font-serif font-extrabold text-amber-400 text-sm flex-shrink-0 shadow-md">
                          {opp.organizationLogoText}
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <h4 className="text-base font-serif font-bold text-white truncate leading-snug">
                            {opp.title}
                          </h4>
                          <p className="text-xs text-gray-300 flex items-center gap-1.5 truncate">
                            <Building2 className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                            <span>{opp.organization}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="text-xl font-extrabold text-amber-400 font-mono">
                          {match.overallMatch}%
                        </div>
                        <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block">
                          Compatibility
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-300/85 leading-relaxed line-clamp-2">
                      {opp.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-gray-300 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-emerald-400" />
                        <span>{opp.location}</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-gray-300 flex items-center gap-1">
                        <Clock className="h-3 w-3 text-amber-400" />
                        <span>{opp.duration}</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-bold">
                        {opp.stipendOrCtc}
                      </span>
                      <Badge variant="outline" size="sm" className="text-[10px] border-emerald-500/30 text-emerald-300 font-mono">
                        {opp.verificationStatus}
                      </Badge>
                    </div>

                    <div className="p-3 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-gray-400 font-semibold">Match Breakdown:</span>
                        <span className="font-mono text-emerald-400">
                          Skills: {match.skillScore}% • Eligibility: {match.eligibilityScore}% • Goal: {match.careerScore}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden flex">
                        <div className="bg-emerald-400 h-full" style={{ width: `${match.skillScore * 0.4}%` }} />
                        <div className="bg-amber-400 h-full" style={{ width: `${match.eligibilityScore * 0.2}%` }} />
                        <div className="bg-sky-400 h-full" style={{ width: `${match.careerScore * 0.15}%` }} />
                        <div className="bg-purple-400 h-full" style={{ width: `${match.assessmentScore * 0.15}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-emerald-500/20 flex items-center justify-between gap-3">
                    <Button
                      onClick={() => setDetailOpp(opp)}
                      variant="outline"
                      size="sm"
                      className="text-xs border-emerald-500/30 text-emerald-300 gap-1"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      <span>Why You Match?</span>
                    </Button>

                    <div className="flex items-center gap-2">
                      {hasApplied ? (
                        <button
                          onClick={() => setViewMode("applications")}
                          className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold hover:bg-emerald-900 transition-colors flex items-center gap-1"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Track Application</span>
                        </button>
                      ) : (
                        <Button
                          onClick={() => setApplyOpp(opp)}
                          variant="gold"
                          size="sm"
                          className="text-xs font-bold gap-1.5 shadow-md"
                        >
                          <span>1-Click Apply</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: APPLICATION TRACKER */}
      {viewMode === "applications" && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-emerald-400" />
              <span>Active Placement Pipeline ({userApplications.length})</span>
            </h3>
            <span className="text-xs text-muted-foreground">
              Direct telemetry from hospital &amp; pharma recruiter dashboards
            </span>
          </div>

          <div className="space-y-4">
            {userApplications.map((app) => (
              <div
                key={app.opportunityId}
                className="p-6 rounded-3xl bg-[#03190f]/95 border border-emerald-500/35 backdrop-blur-xl space-y-6 shadow-xl"
              >
                {/* Application Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-500/20">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="gold" size="sm" className="font-mono text-[10px]">
                        Candidate Match: {app.matchScore}%
                      </Badge>
                      <span className="text-xs text-muted-foreground">Applied: {app.appliedDate}</span>
                    </div>
                    <h4 className="text-xl font-serif font-bold text-white">
                      {app.opportunityTitle}
                    </h4>
                    <p className="text-xs text-gray-300 flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{app.organization}</span>
                      <span>•</span>
                      <span>Deadline: {app.deadline}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        app.status === "Selected"
                          ? "verified"
                          : app.status === "Shortlisted"
                          ? "gold"
                          : "outline"
                      }
                      size="sm"
                      className="text-xs font-mono py-1 px-3"
                    >
                      Stage: {app.status}
                    </Badge>
                    <button
                      onClick={() => handleAdvanceStage(app.opportunityId)}
                      title="Simulate Next Stage Progression for SIH Demonstration"
                      className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-amber-400 transition-colors text-[10px] flex items-center gap-1"
                    >
                      <RefreshCw className="h-3 w-3" />
                      <span>Simulate Next Stage</span>
                    </button>
                  </div>
                </div>

                {/* 6-Stage Progress Indicator Bar */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                    Recruitment Stage Pipeline:
                  </span>
                  <div className="grid grid-cols-5 gap-2">
                    {stagesList.map((stg, sIdx) => {
                      const currentIdx = stagesList.indexOf(app.status);
                      const isComplete = currentIdx >= sIdx;
                      const isCurrent = currentIdx === sIdx;

                      return (
                        <div key={stg} className="space-y-1 text-center">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              isComplete ? "bg-emerald-400 shadow-sm shadow-emerald-500/30" : "bg-white/10"
                            }`}
                          />
                          <span
                            className={`text-[10px] block truncate font-semibold ${
                              isCurrent
                                ? "text-amber-300 font-bold"
                                : isComplete
                                ? "text-emerald-400"
                                : "text-gray-500"
                            }`}
                          >
                            {stg}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Next Action & Viva Information Box */}
                <div className="p-4 rounded-2xl bg-black/50 border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">
                      Current Action Required:
                    </span>
                    <p className="text-white font-medium">{app.nextAction}</p>
                    {app.interviewDetails && (
                      <p className="text-amber-300 text-[11px] font-mono">
                        {app.interviewDetails}
                      </p>
                    )}
                  </div>

                  <Link href={app.nextActionUrl}>
                    <Button variant="gold" size="sm" className="text-xs font-bold gap-1.5 flex-shrink-0 shadow-md">
                      <span>Take Action</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* "WHY THIS OPPORTUNITY?" Modal */}
      {detailOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#031a10] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl">
            <div className="flex items-start justify-between pb-3 border-b border-emerald-500/20">
              <div className="space-y-1">
                <Badge variant="gold" size="sm" className="font-mono text-[10px]">
                  Transparent Match Diagnostics
                </Badge>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Why You Match: {detailOpp.title}
                </h3>
                <p className="text-xs text-muted-foreground">{detailOpp.organization}</p>
              </div>
              <button onClick={() => setDetailOpp(null)} className="text-gray-400 hover:text-white p-1">
                <X className="h-5 w-5" />
              </button>
            </div>

            {(() => {
              const match = calculateDeterministicMatch(detailOpp);
              return (
                <div className="space-y-5 text-xs">
                  <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
                    <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span>Why You Match (Strong Competencies)</span>
                    </h4>
                    <div className="space-y-1.5">
                      {match.skillBreakdown
                        .filter((s) => s.status !== "Deficient")
                        .map((s, idx) => (
                          <div key={idx} className="flex items-center justify-between text-gray-200">
                            <span>• {s.name}</span>
                            <span className="font-mono text-emerald-400 font-bold">
                              {s.studentProf}% (Req: {s.reqProf}%) — {s.status}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2">
                    <h4 className="font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4 text-amber-400" />
                      <span>Identified Skill Gaps (Needs Improvement)</span>
                    </h4>
                    {match.gaps.length > 0 ? (
                      <div className="space-y-1.5">
                        {match.gaps.map((g, idx) => (
                          <div key={idx} className="flex items-center justify-between text-gray-200">
                            <span>• {g.name}</span>
                            <span className="font-mono text-amber-400 font-bold">
                              Deficit: -{g.gap} Pts below threshold
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-emerald-300">
                        Zero critical deficits. You fulfill 100% of required clinical benchmarks!
                      </p>
                    )}
                  </div>

                  <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold block">
                        Recommended Next Action
                      </span>
                      <span className="font-semibold text-white">
                        {match.gaps.length > 0
                          ? `Complete the ${match.gaps[0].name.split(" ")[0]} practice lab in LEARNING Hub`
                          : "Submit application with your verified Competency Passport"}
                      </span>
                    </div>

                    <Link href="/learning">
                      <Button variant="gold" size="sm" className="text-xs font-bold gap-1">
                        <span>Go to Learning</span>
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* 1-CLICK APPLICATION MODAL */}
      {applyOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#031a10] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
              <div className="space-y-0.5">
                <h3 className="text-xl font-serif font-bold text-white">
                  Confirm Verified Application
                </h3>
                <p className="text-xs text-muted-foreground">{applyOpp.title} • {applyOpp.organization}</p>
              </div>
              <button onClick={() => setApplyOpp(null)} className="text-gray-400 hover:text-white p-1">
                <X className="h-5 w-5" />
              </button>
            </div>

            {applicationSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-serif font-bold text-white">Application Dispatched!</h4>
                <p className="text-xs text-gray-300">
                  Your verified Competency Passport hash (0x7e8b...9c02) and clinical logbook have been forwarded to {applyOpp.organization}.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-2">
                  <span className="font-bold text-gray-300 uppercase tracking-wider block text-[11px]">
                    Credentials Attached to Application:
                  </span>
                  <div className="space-y-1 text-gray-300">
                    <div className="flex items-center justify-between">
                      <span>• Digital Competency Passport</span>
                      <span className="text-emerald-400 font-mono">0x7e8b92a4...</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• NCISM Student Registration</span>
                      <span className="text-emerald-400 font-mono">NCISM-AYU-2023</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Inpatient Clinical Hours</span>
                      <span className="text-emerald-400 font-mono">450 Hours Logged</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  By clicking submit, your verified Skill DNA will be submitted to the hospital selection committee. No paper transcripts required.
                </p>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button onClick={() => setApplyOpp(null)} variant="outline" size="sm" className="text-xs border-emerald-500/30">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleApplyToOpportunity(applyOpp)}
                    variant="gold"
                    size="sm"
                    className="text-xs font-bold gap-1.5 shadow-md"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Submit Official Application</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* INDUSTRY EMPLOYER MODAL */}
      {showEmployerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#031a10] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
              <div className="space-y-0.5">
                <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-amber-400" />
                  Post an Opportunity (Industry Partner)
                </h3>
                <p className="text-xs text-muted-foreground">
                  Connect directly with NCISM verified Ayush scholars and fellows.
                </p>
              </div>
              <button onClick={() => setShowEmployerModal(false)} className="text-gray-400 hover:text-white p-1">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handlePostEmployerOpportunity} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-gray-300 font-semibold">Position Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clinical Research Fellow / Resident Panchakarma Vaidya"
                  value={employerTitle}
                  onChange={(e) => setEmployerTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-500/30 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-gray-300 font-semibold">Organization Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dabur India / Patanjali Hospital"
                    value={employerOrg}
                    onChange={(e) => setEmployerOrg(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-500/30 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-300 font-semibold">Opportunity Type *</label>
                  <select
                    value={employerType}
                    onChange={(e) => setEmployerType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-500/30 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Research Project">Research Project</option>
                    <option value="Job">Job</option>
                    <option value="Apprenticeship">Apprenticeship</option>
                    <option value="Industry Project">Industry Project</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-gray-300 font-semibold">Location / Remote *</label>
                  <input
                    type="text"
                    placeholder="e.g. New Delhi / Remote"
                    value={employerLocation}
                    onChange={(e) => setEmployerLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-500/30 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-300 font-semibold">Stipend or CTC</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹40,000 / month or ₹8 LPA"
                    value={employerStipend}
                    onChange={(e) => setEmployerStipend(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-500/30 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-semibold">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Clinical Documentation, Nadi Pariksha, GCP-Ayush"
                  value={employerSkills}
                  onChange={(e) => setEmployerSkills(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-500/30 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-3 border-t border-emerald-500/20 flex items-center justify-end gap-2">
                <Button type="button" onClick={() => setShowEmployerModal(false)} variant="outline" size="sm" className="text-xs border-emerald-500/30">
                  Cancel
                </Button>
                <Button type="submit" variant="gold" size="sm" className="text-xs font-bold">
                  Post to Marketplace
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
