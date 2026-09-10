"use client";

import * as React from "react";
import Link from "next/link";
import {
  Briefcase,
  Sparkles,
  Search,
  Filter,
  MapPin,
  Clock,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  SlidersHorizontal,
  X,
  Send,
  Building2,
  GraduationCap,
  FileCheck,
  Check,
  Info,
  ExternalLink,
  Award,
  Layers,
  Fingerprint,
} from "lucide-react";
import { Card } from "@/components/cards/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils/formatters";
import {
  opportunityMatchingEngine,
  OpportunityItem,
  OpportunityCategory,
  OpportunityMatchBreakdown,
  StudentMatchProfile,
  DEFAULT_STUDENT_MATCH_PROFILE,
  CURATED_OPPORTUNITIES,
  applicationService,
  SubmittedApplicationRecord,
} from "@/lib/matching/matchingEngine";

type TabOption = "ALL" | OpportunityCategory | "APPLICATIONS";

export default function OpportunitiesPage() {
  const [profile, setProfile] = React.useState<StudentMatchProfile>(DEFAULT_STUDENT_MATCH_PROFILE);
  const [activeTab, setActiveTab] = React.useState<TabOption>("ALL");
  const [minMatchThreshold, setMinMatchThreshold] = React.useState<number>(0);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [showSimulator, setShowSimulator] = React.useState<boolean>(false);
  
  // Modals state
  const [selectedOppForBreakdown, setSelectedOppForBreakdown] = React.useState<OpportunityMatchBreakdown | null>(null);
  const [selectedOppForApply, setSelectedOppForApply] = React.useState<OpportunityMatchBreakdown | null>(null);
  const [applicationCoverNote, setApplicationCoverNote] = React.useState<string>("");
  const [appliedSuccessId, setAppliedSuccessId] = React.useState<string | null>(null);
  
  // Applications state
  const [submittedApplications, setSubmittedApplications] = React.useState<SubmittedApplicationRecord[]>([]);

  React.useEffect(() => {
    setSubmittedApplications(applicationService.getApplications());
  }, []);

  // Compute matched and ranked opportunities dynamically
  const rankedOpportunities = React.useMemo(() => {
    return opportunityMatchingEngine.rankOpportunities(CURATED_OPPORTUNITIES, profile);
  }, [profile]);

  // Filtered list
  const filteredOpportunities = React.useMemo(() => {
    return rankedOpportunities.filter((item) => {
      // Category tab
      if (activeTab !== "ALL" && activeTab !== "APPLICATIONS" && item.opportunity.category !== activeTab) {
        return false;
      }
      // Match threshold
      if (item.overallMatch < minMatchThreshold) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.opportunity.title.toLowerCase().includes(q);
        const matchesOrg = item.opportunity.organization.toLowerCase().includes(q);
        const matchesSkill = item.opportunity.requiredSkills.some((s) => s.skillName.toLowerCase().includes(q));
        const matchesLocation = item.opportunity.location.toLowerCase().includes(q);
        if (!matchesTitle && !matchesOrg && !matchesSkill && !matchesLocation) {
          return false;
        }
      }
      return true;
    });
  }, [rankedOpportunities, activeTab, minMatchThreshold, searchQuery]);

  // Handle 1-Click Application Submission
  const handleConfirmApplication = () => {
    if (!selectedOppForApply) return;

    const record = applicationService.submitApplication(
      selectedOppForApply.opportunity,
      selectedOppForApply.overallMatch,
      profile,
      applicationCoverNote
    );

    setSubmittedApplications(applicationService.getApplications());
    setAppliedSuccessId(selectedOppForApply.opportunity.id);
    setSelectedOppForApply(null);
    setApplicationCoverNote("");

    setTimeout(() => {
      setAppliedSuccessId(null);
    }, 4000);
  };

  const isAlreadyApplied = (oppId: string) => {
    return submittedApplications.some((a) => a.opportunityId === oppId);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Breadcrumb & Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
          <Link href="/student" className="hover:text-foreground transition-colors">
            Student Command Center
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-primary font-semibold">Smart Opportunity Matching</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2.5">
              <span>Smart Opportunity Matching</span>
              <Badge variant="gold" size="sm" icon={<Sparkles className="h-3 w-3" />}>
                Automated AI Engine
              </Badge>
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl mt-1">
              Automated algorithmic matching pairing your verified skills, Career DNA, eligibility, and location with high-impact clinical residencies, fellowships, and placements.
            </p>
          </div>

          {/* Profile Simulator Toggle */}
          <Button
            variant={showSimulator ? "primary" : "outline"}
            size="sm"
            onClick={() => setShowSimulator(!showSimulator)}
            leftIcon={<SlidersHorizontal className="h-4 w-4" />}
            className="text-xs shrink-0 self-start md:self-auto"
          >
            {showSimulator ? "Close Profile Simulator" : "Simulate Candidate Profile"}
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MATCHING ENGINE VISUAL ARCHITECTURE BANNER                                 */}
      {/* ========================================================================= */}
      <Card variant="default" className="p-6 rounded-3xl border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 shadow-md space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-border/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-primary/15 text-primary border border-primary/25">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase">
                VISIBLE SMART AUTOMATION PIPELINE
              </p>
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                Multi-Dimensional Matching Engine
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs flex-wrap">
            <span className="px-2.5 py-1 rounded-xl bg-muted text-muted-foreground font-mono">
              Candidate: <strong className="text-foreground">{profile.studentName}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-muted text-muted-foreground font-mono">
              Track: <strong className="text-primary">{profile.primaryCareerGoal}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono font-bold border border-emerald-500/25">
              {profile.verifiedClinicalHours} Clinical Hours Logged
            </span>
          </div>
        </div>

        {/* 6-Factor Equation Visualization */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 items-center text-center text-xs">
          <div className="p-2.5 rounded-xl bg-card border border-border/80 space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase font-mono">01. Profile</p>
            <p className="font-bold text-foreground truncate">{profile.degree} (Year 4)</p>
          </div>
          <div className="p-2.5 rounded-xl bg-card border border-border/80 space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase font-mono">02. Skills</p>
            <p className="font-bold text-emerald-600 dark:text-emerald-400">7 Verified</p>
          </div>
          <div className="p-2.5 rounded-xl bg-card border border-border/80 space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase font-mono">03. Career Goal</p>
            <p className="font-bold text-secondary truncate">{profile.primaryCareerGoal}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-card border border-border/80 space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase font-mono">04. Eligibility</p>
            <p className="font-bold text-foreground">100% NCISM</p>
          </div>
          <div className="p-2.5 rounded-xl bg-card border border-border/80 space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase font-mono">05. Location</p>
            <p className="font-bold text-accent truncate">{profile.preferredCity}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-card border border-border/80 space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase font-mono">06. Availability</p>
            <p className="font-bold text-foreground">{profile.availability}</p>
          </div>
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 p-2.5 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 space-y-1">
            <p className="text-[10px] text-primary uppercase font-mono font-bold">Outputs</p>
            <p className="font-extrabold text-foreground">4 Pillars</p>
          </div>
        </div>
      </Card>

      {/* ========================================================================= */}
      {/* INTERACTIVE PROFILE SIMULATOR (COLLAPSIBLE)                                */}
      {/* ========================================================================= */}
      {showSimulator && (
        <Card variant="bordered" className="p-6 rounded-3xl border-accent/40 bg-accent/5 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-accent/20">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-bold text-foreground">Dynamic Matching Simulator</h3>
            </div>
            <span className="text-xs text-muted-foreground">
              Tweak candidate parameters to observe real-time score changes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* 1. Preferred City */}
            <div className="space-y-1.5">
              <label className="font-bold text-foreground block">Preferred City / Commute:</label>
              <select
                value={profile.preferredCity}
                onChange={(e) => setProfile({ ...profile, preferredCity: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-card border border-border text-foreground font-medium"
              >
                <option value="New Delhi">New Delhi (NCR Local)</option>
                <option value="Kottakkal">Kottakkal, Kerala (South Zone)</option>
                <option value="Haridwar">Haridwar, Uttarakhand (North Zone)</option>
                <option value="Mumbai">Mumbai, Maharashtra (West Zone)</option>
              </select>
            </div>

            {/* 2. Primary Career Goal */}
            <div className="space-y-1.5">
              <label className="font-bold text-foreground block">Primary Career Goal:</label>
              <select
                value={profile.primaryCareerGoal}
                onChange={(e) => setProfile({ ...profile, primaryCareerGoal: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-card border border-border text-foreground font-medium"
              >
                <option value="Clinical Practice">Clinical Practice</option>
                <option value="Research">Research & Clinical Trials</option>
                <option value="Panchakarma & Wellness">Panchakarma & Wellness</option>
                <option value="Herbal Pharma">Herbal Pharma & Drug Standardization</option>
              </select>
            </div>

            {/* 3. Availability */}
            <div className="space-y-1.5">
              <label className="font-bold text-foreground block">Student Availability:</label>
              <select
                value={profile.availability}
                onChange={(e) => setProfile({ ...profile, availability: e.target.value as any })}
                className="w-full p-2.5 rounded-xl bg-card border border-border text-foreground font-medium"
              >
                <option value="Full-time">Full-time (4-6 Months)</option>
                <option value="Part-time">Part-time / Hybrid (2-3 Months)</option>
                <option value="Weekends">Weekends Only</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 text-[11px] text-muted-foreground">
            <span>The matching algorithm recalculates Skill, Career, Eligibility, and Location scores instantly.</span>
            <button
              onClick={() => setProfile(DEFAULT_STUDENT_MATCH_PROFILE)}
              className="text-primary hover:underline font-bold"
            >
              Reset to Actual Profile
            </button>
          </div>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* FILTER & SEARCH TOOLBAR                                                    */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        {/* Category Navigation Pills */}
        <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar pb-1 border-b border-border/80">
          <div className="flex items-center gap-1.5 shrink-0">
            {[
              { id: "ALL", label: "All Opportunities", count: rankedOpportunities.length },
              { id: "INTERNSHIP", label: "Internships", count: rankedOpportunities.filter((o) => o.opportunity.category === "INTERNSHIP").length },
              { id: "RESEARCH", label: "Research", count: rankedOpportunities.filter((o) => o.opportunity.category === "RESEARCH").length },
              { id: "JOB", label: "Jobs", count: rankedOpportunities.filter((o) => o.opportunity.category === "JOB").length },
              { id: "PROJECT", label: "Projects", count: rankedOpportunities.filter((o) => o.opportunity.category === "PROJECT").length },
              { id: "APPLICATIONS", label: "My Applications", count: submittedApplications.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabOption)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    activeTab === tab.id ? "bg-white/20 text-white" : "bg-card text-muted-foreground"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Threshold Controls (hidden on Applications tab) */}
        {activeTab !== "APPLICATIONS" && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-sm">
              <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, institute, or required skill..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-card border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Threshold Selector */}
            <div className="flex items-center gap-2 text-xs w-full sm:w-auto justify-end">
              <span className="text-muted-foreground font-medium whitespace-nowrap">Match Fit:</span>
              <select
                value={minMatchThreshold}
                onChange={(e) => setMinMatchThreshold(Number(e.target.value))}
                className="p-2 rounded-xl bg-card border border-border text-xs text-foreground font-medium"
              >
                <option value={0}>All Matches ({rankedOpportunities.length})</option>
                <option value={88}>88%+ High Compatibility</option>
                <option value={80}>80%+ Strong Fit</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Success Toast */}
      {appliedSuccessId && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 text-emerald-800 dark:text-emerald-300 flex items-center justify-between gap-3 text-xs animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span>
              <strong>Application Successfully Submitted!</strong> Competency Passport hash attached with supervisor endorsement.
            </span>
          </div>
          <button onClick={() => setActiveTab("APPLICATIONS")} className="underline font-bold">
            View in Applications Tab
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* OPPORTUNITY CARDS LIST                                                     */}
      {/* ========================================================================= */}
      {activeTab !== "APPLICATIONS" && (
        <div className="space-y-4">
          {filteredOpportunities.length === 0 ? (
            <Card variant="default" className="p-12 text-center space-y-3">
              <AlertTriangle className="h-10 w-10 text-muted-foreground mx-auto" />
              <h3 className="text-base font-bold text-foreground">No matching opportunities found</h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                Try lowering the match threshold or clearing the search query to explore more openings.
              </p>
              <Button variant="outline" size="sm" onClick={() => { setSearchQuery(""); setMinMatchThreshold(0); }} className="text-xs">
                Reset Filters
              </Button>
            </Card>
          ) : (
            filteredOpportunities.map((match) => {
              const { opportunity, overallMatch, skillMatch, careerMatch, eligibilityMatch, locationMatch } = match;
              const alreadyApplied = isAlreadyApplied(opportunity.id);

              return (
                <Card
                  key={opportunity.id}
                  variant="default"
                  className="p-6 rounded-3xl border-border/80 hover:border-primary/50 transition-all space-y-5 shadow-sm"
                >
                  {/* Top Row: Category, Verified Badge, and Prominent Match Ring */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" size="sm" className="font-semibold text-[10px]">
                          {opportunity.categoryLabel}
                        </Badge>
                        {opportunity.verifiedByAIIA && (
                          <Badge variant="verified" size="sm" icon={<ShieldCheck className="h-3 w-3" />}>
                            Ministry of Ayush Verified
                          </Badge>
                        )}
                        {opportunity.isRemote && (
                          <Badge variant="outline" size="sm" className="text-[10px]">
                            Hybrid / Remote
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight">
                        {opportunity.title}
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-accent" />
                        <span>{opportunity.organization}</span>
                      </p>
                    </div>

                    {/* Prominent Overall Match Pill */}
                    <div className="flex items-center gap-3 bg-muted/40 p-3 rounded-2xl border border-border/70 shrink-0 self-start sm:self-auto">
                      <div className="h-12 w-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 flex flex-col items-center justify-center font-mono">
                        <span className="text-base font-extrabold leading-none">{overallMatch}%</span>
                        <span className="text-[9px] uppercase font-bold tracking-tight">Match</span>
                      </div>
                      <div className="text-xs space-y-0.5">
                        <p className="font-bold text-foreground">
                          {overallMatch >= 88 ? "High Compatibility" : "Strong Fit"}
                        </p>
                        <button
                          onClick={() => setSelectedOppForBreakdown(match)}
                          className="text-[11px] text-primary hover:underline font-semibold flex items-center gap-1"
                        >
                          <span>Inspect Match</span>
                          <Info className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                    {opportunity.description}
                  </p>

                  {/* ================================================================= */}
                  {/* VISIBLE 4-PART BREAKDOWN BARS (EXACT USER PROMPT REQUIREMENT)     */}
                  {/* ================================================================= */}
                  <div className="p-4 rounded-2xl bg-card border border-border/80 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono uppercase text-muted-foreground pb-1 border-b border-border/60">
                      <span>Multi-Factor Compatibility Breakdown</span>
                      <span className="text-primary font-bold">Automated Evaluation</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs">
                      {/* 1. Skill Match */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-[11px]">Skill Match</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{skillMatch}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                            style={{ width: `${skillMatch}%` }}
                          />
                        </div>
                      </div>

                      {/* 2. Career Match */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-[11px]">Career Match</span>
                          <span className="font-bold text-secondary font-mono">{careerMatch}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-secondary rounded-full transition-all duration-500"
                            style={{ width: `${careerMatch}%` }}
                          />
                        </div>
                      </div>

                      {/* 3. Eligibility */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-[11px]">Eligibility</span>
                          <span className="font-bold text-foreground font-mono">{eligibilityMatch}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${eligibilityMatch}%` }}
                          />
                        </div>
                      </div>

                      {/* 4. Location */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-[11px]">Location</span>
                          <span className="font-bold text-accent font-mono">{locationMatch}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full transition-all duration-500"
                            style={{ width: `${locationMatch}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills Alignment Tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    <span className="text-[11px] text-muted-foreground mr-1">Required Skills:</span>
                    {match.matchedSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-[11px] font-medium"
                      >
                        <Check className="h-3 w-3" />
                        <span>{sk.skillName}</span>
                      </span>
                    ))}
                    {match.missingSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-400 text-[11px] font-medium"
                      >
                        <AlertTriangle className="h-3 w-3" />
                        <span>{sk.skillName} (Gap)</span>
                      </span>
                    ))}
                  </div>

                  {/* Footer Meta & Application Action */}
                  <div className="pt-4 border-t border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-4 flex-wrap text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-accent" />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        <span>{opportunity.duration}</span>
                      </div>
                      {opportunity.stipendMonthlyInr && (
                        <div className="flex items-center gap-1 font-bold text-foreground">
                          <Banknote className="h-3.5 w-3.5 text-emerald-600" />
                          <span>{formatINR(opportunity.stipendMonthlyInr)}/mo</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2.5 self-end sm:self-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOppForBreakdown(match)}
                        className="text-xs"
                      >
                        Match Details
                      </Button>

                      {alreadyApplied ? (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                          leftIcon={<CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
                          className="text-xs"
                        >
                          Applied
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setSelectedOppForApply(match)}
                          rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                          className="text-xs shadow-sm"
                        >
                          Apply via Setu Passport
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MY APPLICATIONS TAB                                                       */}
      {/* ========================================================================= */}
      {activeTab === "APPLICATIONS" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground">Active & Submitted Applications</h3>
            <span className="text-xs text-muted-foreground font-mono">
              {submittedApplications.length} Recorded
            </span>
          </div>

          <div className="space-y-3">
            {submittedApplications.map((app) => (
              <Card key={app.id} variant="default" className="p-5 rounded-2xl border-border/80 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" size="sm" className="text-[10px]">
                        {app.categoryLabel}
                      </Badge>
                      <span className="text-xs font-mono text-muted-foreground">
                        Applied: {new Date(app.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-foreground">{app.opportunityTitle}</h4>
                    <p className="text-xs text-muted-foreground">{app.organization}</p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-700 dark:text-emerald-400 text-xs font-bold shrink-0 self-start">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{app.status.replace("_", " ")}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted/40 border border-border/60 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-mono block">Match Score</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{app.matchScore}% Compatibility</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-mono block">Clinical Hours Verified</span>
                    <span className="font-bold text-foreground">{app.clinicalHoursShared} Hours</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-mono block">Attached Passport</span>
                    <span className="font-mono text-primary truncate block">{app.passportHashAttached.slice(0, 16)}...</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Link href={`/student/applications/${app.id}`}>
                    <Button variant="primary" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />} className="text-xs">
                      Track 10-Stage Lifecycle & Supervisor OTP Sign-Off
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: MATCH BREAKDOWN INSPECTOR                                           */}
      {/* ========================================================================= */}
      {selectedOppForBreakdown && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-lg w-full bg-card border border-border rounded-3xl p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedOppForBreakdown(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-1">
              <Badge variant="secondary" size="sm">
                Matching Diagnostic
              </Badge>
              <h3 className="text-lg font-bold text-foreground">
                {selectedOppForBreakdown.opportunity.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {selectedOppForBreakdown.opportunity.organization}
              </p>
            </div>

            {/* Big Match Score Header */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-card to-card border border-emerald-500/25 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-foreground">Overall Recommendation Index</p>
                <p className="text-[11px] text-muted-foreground">
                  Computed via weighted multi-dimensional synthesis
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                  {selectedOppForBreakdown.overallMatch}%
                </span>
                <span className="text-[10px] font-bold block text-muted-foreground uppercase">
                  {selectedOppForBreakdown.compatibilityTier}
                </span>
              </div>
            </div>

            {/* Detailed Weight Breakdown Table */}
            <div className="space-y-2.5 text-xs">
              <p className="font-bold text-foreground uppercase tracking-wider text-[11px]">
                Sub-Factor Calculation Weights:
              </p>
              
              <div className="p-3 rounded-xl bg-muted/40 border border-border/70 space-y-2 font-mono">
                <div className="flex items-center justify-between">
                  <span>Skill Match (35% Weight):</span>
                  <strong className="text-emerald-600">{selectedOppForBreakdown.skillMatch}%</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Career DNA Match (25% Weight):</span>
                  <strong className="text-secondary">{selectedOppForBreakdown.careerMatch}%</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Degree & Clinical Eligibility (20% Weight):</span>
                  <strong className="text-foreground">{selectedOppForBreakdown.eligibilityMatch}%</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Location & Distance (10% Weight):</span>
                  <strong className="text-accent">{selectedOppForBreakdown.locationMatch}%</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Availability Schedule (10% Weight):</span>
                  <strong className="text-foreground">{selectedOppForBreakdown.availabilityMatch}%</strong>
                </div>
              </div>
            </div>

            {/* AI Fit Summary */}
            <div className="p-3.5 rounded-xl bg-card border border-border/80 space-y-1 text-xs">
              <p className="font-bold text-foreground flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                <span>AI Algorithmic Fit Analysis</span>
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {selectedOppForBreakdown.aiFitRationale}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedOppForBreakdown(null)} className="text-xs">
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const opp = selectedOppForBreakdown;
                  setSelectedOppForBreakdown(null);
                  setSelectedOppForApply(opp);
                }}
                className="text-xs"
              >
                Proceed to Apply
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: 1-CLICK APPLICATION VIA COMPETENCY PASSPORT                         */}
      {/* ========================================================================= */}
      {selectedOppForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-lg w-full bg-card border border-border rounded-3xl p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedOppForApply(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-secondary" />
                <h3 className="text-lg font-bold text-foreground">Apply via Competency Passport</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Your verified digital portfolio credentials will be securely shared with the admissions / recruitment panel.
              </p>
            </div>

            {/* Target Role Pill */}
            <div className="p-3.5 rounded-2xl bg-muted/40 border border-border text-xs space-y-1">
              <span className="text-[10px] uppercase font-mono text-muted-foreground">Position:</span>
              <p className="font-bold text-foreground">{selectedOppForApply.opportunity.title}</p>
              <p className="text-muted-foreground">{selectedOppForApply.opportunity.organization}</p>
            </div>

            {/* Verified Credentials to Attach */}
            <div className="space-y-2 text-xs">
              <p className="font-bold text-foreground uppercase tracking-wider text-[11px]">
                Credentials Included in Application:
              </p>
              <div className="space-y-1.5 p-3 rounded-xl bg-card border border-border/80">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Competency Passport:</span>
                  <span className="font-mono font-bold text-primary">NCISM-AYU-2023-09418</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Verified Clinical Hours:</span>
                  <span className="font-bold text-emerald-600">{profile.verifiedClinicalHours} Hours Logged</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Attestation Hash:</span>
                  <span className="font-mono text-[10px] text-muted-foreground">{profile.passportHash.slice(0, 18)}...</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Supervisor Endorsement:</span>
                  <span className="font-semibold text-emerald-600">✓ Pre-Attested by AIIA Faculty</span>
                </div>
              </div>
            </div>

            {/* Optional Cover Note */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-foreground block">
                Statement of Interest / Research Objective (Optional):
              </label>
              <textarea
                value={applicationCoverNote}
                onChange={(e) => setApplicationCoverNote(e.target.value)}
                placeholder="Briefly state your clinical motivation or specific interest in this residency / project..."
                rows={3}
                className="w-full p-3 rounded-xl bg-muted/30 border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedOppForApply(null)} className="text-xs">
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmApplication}
                leftIcon={<Send className="h-3.5 w-3.5" />}
                className="text-xs shadow-sm"
              >
                Submit Application
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
