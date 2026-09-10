"use client";

import * as React from "react";
import {
  GraduationCap,
  Users,
  CheckCircle2,
  Clock,
  Calendar,
  ShieldCheck,
  FileCheck2,
  FileText,
  Search,
  ChevronRight,
  ExternalLink,
  Award,
  Sparkles,
  Check,
  X,
  Stethoscope,
  Send,
  PlusCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import { MenteeScholar } from "@/lib/services/academicianPortalService";

interface FacultyMentorshipTabProps {
  mentees: MenteeScholar[];
  onVerifyObservation: (menteeId: string, obsId: string) => void;
  showToast: (msg: string) => void;
}

export function FacultyMentorshipTab({
  mentees,
  onVerifyObservation,
  showToast,
}: FacultyMentorshipTabProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedMentee, setSelectedMentee] = React.useState<MenteeScholar | null>(null);
  const [showScheduleModal, setShowScheduleModal] = React.useState(false);
  const [sessionTopic, setSessionTopic] = React.useState("");
  const [sessionDate, setSessionDate] = React.useState("2026-09-18");
  const [sessionTime, setSessionTime] = React.useState("03:30 PM");

  const filtered = mentees.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.degree.toLowerCase().includes(q) ||
      m.thesisTopic.toLowerCase().includes(q)
    );
  });

  const totalPendingVerifications = mentees.reduce(
    (sum, m) => sum + m.pendingVerificationsCount,
    0
  );

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionTopic.trim()) {
      showToast("Please enter a meeting topic");
      return;
    }
    showToast(`✓ Scheduled 1:1 Clinical Guidance with ${selectedMentee?.name || "Mentee"}!`);
    setShowScheduleModal(false);
    setSessionTopic("");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-secondary/15 via-card to-card border border-secondary/25">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary text-xs font-semibold">
            <GraduationCap className="h-3.5 w-3.5" /> NCISM Recognized PG Guide & Clinical Mentorship
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Mentorship & Clinical Competency Attestation
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Supervise MD/PhD thesis dissertations, monitor BAMS rotational clinical postings, audit patient logbooks, and digitally attest student Competency Passports with cryptographic hash verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-muted-foreground">Pending Attestations</span>
            <p className="text-xl font-bold text-accent">{totalPendingVerifications} Cases</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center font-bold text-xl">
            🎓
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search mentees by name, thesis, degree..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-card border border-border focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <span className="text-xs text-muted-foreground font-medium shrink-0">
          {filtered.length} Active Scholars Assigned
        </span>
      </div>

      {/* Mentees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((mentee) => (
          <Card
            key={mentee.id}
            variant="default"
            className="p-5 flex flex-col justify-between space-y-4 hover:border-secondary/40 transition-all"
          >
            <div className="space-y-3">
              {/* Mentee Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-secondary to-earth-800 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                    {mentee.avatarText}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-foreground">{mentee.name}</h3>
                      <Badge variant="outline" size="sm" className="text-[10px]">
                        {mentee.degree}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{mentee.institution}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground block">Competency</span>
                  <span className="text-xs font-bold text-primary">{mentee.overallCompetencyScore}%</span>
                </div>
              </div>

              {/* Thesis / Milestone */}
              <div className="p-3 rounded-xl bg-muted/40 border border-border space-y-1.5 text-xs">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Thesis / Research Project
                </span>
                <p className="font-semibold text-foreground leading-snug line-clamp-2">
                  {mentee.thesisTopic}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground pt-1 border-t border-border/80">
                  <span className="font-medium text-foreground">Current Stage:</span>
                  <span className="text-secondary font-semibold">{mentee.currentMilestone}</span>
                </div>
              </div>

              {/* Pending Observations */}
              {mentee.recentObservations.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Pending Digital Attestation
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {mentee.recentObservations.length} Observation(s)
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {mentee.recentObservations.map((obs) => (
                      <div
                        key={obs.id}
                        className="p-2.5 rounded-lg bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                      >
                        <div className="space-y-0.5">
                          <p className="font-semibold text-foreground">{obs.procedureName}</p>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">{obs.patientContext}</p>
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          className="text-[11px] h-7 px-2.5 self-end sm:self-auto shrink-0"
                          onClick={() => {
                            onVerifyObservation(mentee.id, obs.id);
                            showToast(`✓ Digitally attested ${obs.procedureName} for ${mentee.name}!`);
                          }}
                          leftIcon={<Check className="h-3 w-3" />}
                        >
                          Sign & Attest
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Review Timeline */}
              <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" /> Next Review: {mentee.nextScheduledReview}
                </span>
                <span className="font-mono text-[10px]">Hash: {mentee.passportHash}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setSelectedMentee(mentee);
                  setShowScheduleModal(true);
                }}
                leftIcon={<Calendar className="h-3.5 w-3.5 text-primary" />}
              >
                Schedule 1:1 Review
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-primary"
                onClick={() => setSelectedMentee(mentee)}
              >
                View Full Passport <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Full Passport / Scholar Drawer Modal */}
      {selectedMentee && !showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <Card variant="elevated" className="w-full max-w-xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-secondary text-white font-bold flex items-center justify-center text-base">
                  {selectedMentee.avatarText}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-foreground">{selectedMentee.name}</h3>
                    <Badge variant="verified" size="sm">Verified Scholar</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{selectedMentee.degree} • {selectedMentee.institution}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedMentee(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </Button>
            </div>

            <div className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-2 text-xs">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                Research Thesis Topic
              </span>
              <p className="font-semibold text-foreground">{selectedMentee.thesisTopic}</p>
              <div className="pt-2 border-t border-border flex justify-between">
                <span className="text-muted-foreground">Digital Passport Hash:</span>
                <span className="font-mono text-primary">{selectedMentee.passportHash}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Clinical Observations & Practical Procedures
              </h4>
              {selectedMentee.recentObservations.length === 0 ? (
                <div className="p-4 rounded-xl border border-dashed text-center text-xs text-muted-foreground">
                  All clinical logbook observations for this scholar have been verified!
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedMentee.recentObservations.map((obs) => (
                    <div
                      key={obs.id}
                      className="p-3 rounded-xl border border-border space-y-2 text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-bold text-foreground">{obs.procedureName}</p>
                          <span className="text-[11px] text-muted-foreground">Logged on {obs.date}</span>
                        </div>
                        <Badge variant="warning" size="sm">Pending Sign-off</Badge>
                      </div>
                      <p className="text-muted-foreground">{obs.patientContext}</p>
                      {obs.notes && (
                        <p className="text-xs text-primary font-medium italic">{obs.notes}</p>
                      )}

                      <div className="pt-2 border-t border-border flex justify-end">
                        <Button
                          variant="primary"
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            onVerifyObservation(selectedMentee.id, obs.id);
                            setSelectedMentee(null);
                            showToast(`✓ Digitally attested ${obs.procedureName} for ${selectedMentee.name}!`);
                          }}
                          leftIcon={<ShieldCheck className="h-3.5 w-3.5" />}
                        >
                          Affix NCISM Guide Digital Signature
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setSelectedMentee(null)}>
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Schedule 1:1 Review Modal */}
      {showScheduleModal && selectedMentee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <Card variant="elevated" className="w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" /> Schedule Clinical Guidance Session
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setShowScheduleModal(false)}>
                ✕
              </Button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-3.5 text-xs">
              <div>
                <span className="text-muted-foreground">Mentee:</span>
                <p className="font-bold text-foreground text-sm">{selectedMentee.name}</p>
                <p className="text-[11px] text-muted-foreground">{selectedMentee.degree}</p>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Review Topic / Agenda</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Thesis Chapter 3 Review & Statistical Plan"
                  value={sessionTopic}
                  onChange={(e) => setSessionTopic(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Date</label>
                  <input
                    type="date"
                    value={sessionDate}
                    onChange={(e) => setSessionDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Time Slot</label>
                  <input
                    type="text"
                    value={sessionTime}
                    onChange={(e) => setSessionTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-border flex justify-end gap-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowScheduleModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Confirm Meeting Slot
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
