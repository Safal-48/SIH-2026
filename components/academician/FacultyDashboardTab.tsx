"use client";

import * as React from "react";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  FlaskConical,
  Award,
  Users,
  Briefcase,
  Layers,
  GraduationCap,
  Calendar,
  DollarSign,
  Mic,
  Presentation,
  Check,
  X,
  ChevronRight,
  FileCheck2,
  ExternalLink,
  Flame,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import {
  SupervisorVerificationItem,
  ResearchCollaboration,
  FacultyLiveProject,
  MenteeScholar,
  GuestLecture,
} from "@/lib/services/academicianPortalService";

interface FacultyDashboardTabProps {
  analytics: {
    activeCollabsCount: number;
    activeMenteesCount: number;
    liveProjectsCount: number;
    completedFDPsCount: number;
    activeConsultingVolume: string;
    totalEarnedCredits: number;
    pendingQueueCount: number;
    totalLecturesDelivered: number;
    totalWorkshopsConducted: number;
    trainingsCount: number;
  };
  queue: SupervisorVerificationItem[];
  onResolveQueue: (queueId: string, isApproved: boolean) => void;
  onNavigateTab: (tab: any) => void;
  collabs: ResearchCollaboration[];
  liveProjects: FacultyLiveProject[];
  mentees: MenteeScholar[];
  lectures: GuestLecture[];
}

export function FacultyDashboardTab({
  analytics,
  queue,
  onResolveQueue,
  onNavigateTab,
  collabs,
  liveProjects,
  mentees,
  lectures,
}: FacultyDashboardTabProps) {
  const upcomingLecture = lectures.find((l) => l.status === "ACCEPTED");

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner: Academic Guide Credential Status */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/15 via-accent/10 to-card border border-primary/20 p-6 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-xs font-semibold text-primary">
              <ShieldCheck className="h-3.5 w-3.5" /> NCISM Authorized Post-Graduate Research Guide
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Welcome back, Prof. Dr. Anand Kulkarni
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Chair of Institutional Ethics Committee • Department of Dravyaguna Vijnana & Clinical Pharmacology, All India Institute of Ayurveda. You have{" "}
              <strong className="text-accent">{queue.length} pending student attestations</strong> and 4 active industry collaborations awaiting updates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigateTab("mentorship")}
              leftIcon={<GraduationCap className="h-4 w-4 text-primary" />}
            >
              Mentee Roster ({mentees.length})
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigateTab("research")}
              leftIcon={<FlaskConical className="h-4 w-4" />}
            >
              Propose Collab (MoU)
            </Button>
          </div>
        </div>
      </div>

      {/* 8-Point High Density Metrics Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <Card
          variant="interactive"
          className="p-3.5 space-y-1 text-center cursor-pointer hover:border-primary/50 transition-all"
          onClick={() => onNavigateTab("research")}
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto mb-1">
            <FlaskConical className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block truncate">
            Research Collabs
          </span>
          <p className="text-xl font-bold text-foreground">{analytics.activeCollabsCount}</p>
          <span className="text-[10px] text-emerald-600 font-medium flex items-center justify-center gap-0.5">
            4 Active MoUs
          </span>
        </Card>

        <Card
          variant="interactive"
          className="p-3.5 space-y-1 text-center cursor-pointer hover:border-secondary/50 transition-all"
          onClick={() => onNavigateTab("mentorship")}
        >
          <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-1">
            <Users className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block truncate">
            Active Mentees
          </span>
          <p className="text-xl font-bold text-foreground">{analytics.activeMenteesCount}</p>
          <span className="text-[10px] text-secondary font-medium">PG & BAMS Scholars</span>
        </Card>

        <Card
          variant="interactive"
          className="p-3.5 space-y-1 text-center cursor-pointer hover:border-accent/50 transition-all"
          onClick={() => onNavigateTab("live-projects")}
        >
          <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center mx-auto mb-1">
            <Layers className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block truncate">
            Live Projects
          </span>
          <p className="text-xl font-bold text-foreground">{analytics.liveProjectsCount}</p>
          <span className="text-[10px] text-accent font-medium">Supervised Teams</span>
        </Card>

        <Card
          variant="interactive"
          className="p-3.5 space-y-1 text-center cursor-pointer hover:border-emerald-500/50 transition-all"
          onClick={() => onNavigateTab("consultancy")}
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-1">
            <DollarSign className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block truncate">
            Consulting Volume
          </span>
          <p className="text-xl font-bold text-foreground">{analytics.activeConsultingVolume}</p>
          <span className="text-[10px] text-emerald-600 font-medium">70/30 Faculty Share</span>
        </Card>

        <Card
          variant="interactive"
          className="p-3.5 space-y-1 text-center cursor-pointer hover:border-purple-500/50 transition-all"
          onClick={() => onNavigateTab("fdp")}
        >
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center mx-auto mb-1">
            <BookOpen className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block truncate">
            FDP Programs
          </span>
          <p className="text-xl font-bold text-foreground">{analytics.completedFDPsCount}</p>
          <span className="text-[10px] text-purple-600 font-medium">NCISM Sanctioned</span>
        </Card>

        <Card
          variant="interactive"
          className="p-3.5 space-y-1 text-center cursor-pointer hover:border-blue-500/50 transition-all"
          onClick={() => onNavigateTab("industrial-training")}
        >
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center mx-auto mb-1">
            <Award className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block truncate">
            CPE Credits
          </span>
          <p className="text-xl font-bold text-foreground">{analytics.totalEarnedCredits}</p>
          <span className="text-[10px] text-blue-600 font-medium">NCISM Points</span>
        </Card>

        <Card
          variant="interactive"
          className="p-3.5 space-y-1 text-center cursor-pointer hover:border-amber-500/50 transition-all"
          onClick={() => onNavigateTab("guest-lectures")}
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto mb-1">
            <Mic className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block truncate">
            Guest Lectures
          </span>
          <p className="text-xl font-bold text-foreground">{analytics.totalLecturesDelivered}</p>
          <span className="text-[10px] text-amber-600 font-medium">Keynotes & CMEs</span>
        </Card>

        <Card
          variant="interactive"
          className="p-3.5 space-y-1 text-center cursor-pointer hover:border-rose-500/50 transition-all"
          onClick={() => onNavigateTab("workshops")}
        >
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto mb-1">
            <Presentation className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block truncate">
            Workshops
          </span>
          <p className="text-xl font-bold text-foreground">{analytics.totalWorkshopsConducted}</p>
          <span className="text-[10px] text-rose-600 font-medium">Masterclasses</span>
        </Card>
      </div>

      {/* Main Grid: Pending Attestations Queue + Quick Action Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Supervisor Verification & Attestation Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                <FileCheck2 className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Supervisor Attestation Queue
                </h3>
                <p className="text-xs text-muted-foreground">
                  Verify student clinical observations, digital logbooks, and institutional NOCs
                </p>
              </div>
            </div>

            <Badge variant={queue.length > 0 ? "gold" : "outline"} size="sm">
              {queue.length} Pending
            </Badge>
          </div>

          {queue.length === 0 ? (
            <Card variant="default" className="p-8 text-center space-y-3 bg-muted/20 border-dashed">
              <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
              <h4 className="text-sm font-bold text-foreground">All Student Cases Verified!</h4>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                No pending clinical logbooks or internship endorsements in your queue. New submissions from your mentees will appear here automatically.
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {queue.map((item) => (
                <Card
                  key={item.id}
                  variant="default"
                  className="p-4 border-border/80 hover:border-accent/40 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-foreground">{item.menteeName}</span>
                        <Badge variant="outline" size="sm" className="text-[10px]">
                          {item.degree}
                        </Badge>
                        <Badge variant="secondary" size="sm" className="text-[10px]">
                          {item.competencyDomain}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">
                          Submitted {item.submittedDate}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-foreground">{item.evidenceTitle}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.notes}</p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs text-rose-600 hover:bg-rose-500/10 border-rose-200"
                        onClick={() => onResolveQueue(item.id, false)}
                      >
                        <X className="h-3.5 w-3.5 mr-1" /> Revise
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="text-xs"
                        onClick={() => onResolveQueue(item.id, true)}
                      >
                        <Check className="h-3.5 w-3.5 mr-1" /> Verify & Endorse
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Active Collaborative Research Highlights */}
          <Card variant="default" className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-bold text-foreground">Featured Research Collaborations</h4>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-primary"
                onClick={() => onNavigateTab("research")}
              >
                View All ({collabs.length}) <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>

            <div className="space-y-2.5">
              {collabs.slice(0, 2).map((collab) => (
                <div
                  key={collab.id}
                  className="p-3.5 rounded-xl bg-muted/40 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground line-clamp-1">
                        {collab.projectTitle}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-[11px]">
                      Partner: <strong className="text-foreground">{collab.collaboratingPartner}</strong> • Budget:{" "}
                      <span className="text-emerald-600 font-semibold">{collab.sanctionedBudget}</span> • Phase:{" "}
                      <span className="font-medium text-primary">{collab.currentPhase}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] text-muted-foreground">Progress</span>
                      <p className="font-bold text-foreground">{collab.progress}%</p>
                    </div>
                    <div className="w-12 bg-muted rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${collab.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Quick Launchpad + Upcoming Schedule */}
        <div className="space-y-6">
          {/* Quick Launchpad */}
          <Card variant="default" className="p-5 space-y-4">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              Quick Faculty Action Hub
            </h4>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => onNavigateTab("internship")}
                className="w-full text-left p-2.5 rounded-xl border border-border hover:bg-muted/50 hover:border-primary/30 transition-all flex items-center justify-between text-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                    🏛️
                  </span>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      Faculty Sabbatical Immersion
                    </p>
                    <p className="text-[11px] text-muted-foreground">Apply for industry sabbaticals</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => onNavigateTab("industrial-training")}
                className="w-full text-left p-2.5 rounded-xl border border-border hover:bg-muted/50 hover:border-blue-500/30 transition-all flex items-center justify-between text-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                    🔬
                  </span>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                      Industrial Laboratory Training
                    </p>
                    <p className="text-[11px] text-muted-foreground">HPTLC, GCP, WHO-GMP protocols</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => onNavigateTab("consultancy")}
                className="w-full text-left p-2.5 rounded-xl border border-border hover:bg-muted/50 hover:border-emerald-500/30 transition-all flex items-center justify-between text-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                    💼
                  </span>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-emerald-600 transition-colors">
                      Industry Advisory & Consultancy
                    </p>
                    <p className="text-[11px] text-muted-foreground">70/30 Institutional Split</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => onNavigateTab("workshops")}
                className="w-full text-left p-2.5 rounded-xl border border-border hover:bg-muted/50 hover:border-rose-500/30 transition-all flex items-center justify-between text-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold">
                    🎯
                  </span>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-rose-600 transition-colors">
                      Host Hands-on Workshop
                    </p>
                    <p className="text-[11px] text-muted-foreground">Nadi Pariksha & Pharmacognosy</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-rose-600 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => onNavigateTab("live-projects")}
                className="w-full text-left p-2.5 rounded-xl border border-border hover:bg-muted/50 hover:border-accent/30 transition-all flex items-center justify-between text-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold">
                    📊
                  </span>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      Supervise Live Project
                    </p>
                    <p className="text-[11px] text-muted-foreground">Kanban tracker & Student teams</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </Card>

          {/* Upcoming Academic Engagement */}
          {upcomingLecture && (
            <Card variant="default" className="p-5 space-y-3 bg-gradient-to-br from-card via-card to-amber-500/5 border-amber-500/20">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> Upcoming Keynote
                </span>
                <Badge variant="outline" size="sm" className="text-[10px] border-amber-500/30 text-amber-700 dark:text-amber-300">
                  {upcomingLecture.date}
                </Badge>
              </div>
              <h5 className="text-xs font-bold text-foreground line-clamp-2">
                {upcomingLecture.topicTitle}
              </h5>
              <p className="text-[11px] text-muted-foreground">
                {upcomingLecture.invitingOrganization} • {upcomingLecture.location}
              </p>
              <div className="pt-2 border-t border-border flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Audience: ~{upcomingLecture.estimatedAudience}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-amber-600 p-0 h-auto"
                  onClick={() => onNavigateTab("guest-lectures")}
                >
                  Manage Lecture <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </Card>
          )}

          {/* Faculty Accreditation Notice */}
          <div className="p-4 rounded-xl bg-muted/40 border border-border text-xs space-y-2">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>NCISM & NAAC Criterion III Ready</span>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              All collaborative MoUs, consultancy revenue receipts, FDP certificates, and student live project guidance records are digitally signed and exportable for institutional SSR filing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
