"use client";

import * as React from "react";
import {
  BookOpen,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import { FacultyFDP } from "@/lib/services/academicianPortalService";

interface FacultyFDPTabProps {
  fdps: FacultyFDP[];
  onEnroll: (fdpId: string) => void;
  showToast: (msg: string) => void;
}

export function FacultyFDPTab({ fdps, onEnroll, showToast }: FacultyFDPTabProps) {
  const [selectedBody, setSelectedBody] = React.useState<string>("ALL");
  const [selectedFdp, setSelectedFdp] = React.useState<FacultyFDP | null>(null);

  const completedFdps = fdps.filter((f) => f.status === "COMPLETED");
  const totalFdpPoints = completedFdps.reduce((acc, f) => acc + f.creditPoints, 0);

  const filtered = fdps.filter((f) => {
    if (selectedBody === "ALL") return true;
    return f.sanctioningBody === selectedBody;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Credit Point Bank */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-r from-purple-600/10 via-card to-card border border-purple-500/20 space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold">
            <GraduationCap className="h-3.5 w-3.5" /> NCISM & AICTE National Faculty Development Portal
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Faculty Development Programs (FDP)
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            National pedagogical advancements, Competency-Based Medical Education (CBME), Digital Health & AI diagnostics, and high-impact biomedical publishing sanctioned by statutory bodies.
          </p>
        </div>

        <Card variant="default" className="p-5 flex flex-col justify-center space-y-2 border-purple-500/30 bg-purple-500/5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            FDP Academic Credit Bank
          </span>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-foreground">{totalFdpPoints}</p>
            <span className="text-xs text-muted-foreground">/ 30 NCISM Promotion Points</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-purple-600 h-full rounded-full transition-all"
              style={{ width: `${Math.min(100, (totalFdpPoints / 30) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-muted-foreground flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> CAS Level-4 Professorial Threshold Met
          </p>
        </Card>
      </div>

      {/* Sanctioning Body Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {["ALL", "NCISM", "AICTE", "Ministry of Ayush", "UGC-HRDC"].map((b) => (
          <button
            key={b}
            onClick={() => setSelectedBody(b)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all ${
              selectedBody === b
                ? "bg-purple-600 text-white font-semibold shadow-sm"
                : "bg-muted/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            {b === "ALL" ? "All Statutory Bodies" : b}
          </button>
        ))}
      </div>

      {/* FDP Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const isCompleted = item.status === "COMPLETED";
          const isActive = item.status === "ACTIVE";
          const isEnrolled = item.status === "ENROLLED";
          const isRecommended = item.status === "RECOMMENDED";

          return (
            <Card
              key={item.id}
              variant="default"
              className="p-5 flex flex-col justify-between space-y-4 hover:border-purple-500/40 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5" /> {item.sanctioningBody} Sanctioned • {item.mode}
                    </span>
                    <h3 className="text-sm font-bold text-foreground leading-snug">{item.title}</h3>
                    <p className="text-xs text-muted-foreground font-medium">{item.hostingInstitute}</p>
                  </div>
                  <Badge
                    variant={
                      isCompleted
                        ? "verified"
                        : isActive
                        ? "gold"
                        : isEnrolled
                        ? "warning"
                        : "secondary"
                    }
                    size="sm"
                    className="shrink-0"
                  >
                    {item.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[11px] text-muted-foreground pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" /> {item.durationDays} Days
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="h-3.5 w-3.5 text-purple-500" /> {item.creditPoints} Points
                  </span>
                  <span className="truncate">Coord: {item.coordinator.split("(")[0]}</span>
                </div>

                {/* Progress / Assignments if Active */}
                {isActive && (
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground">Assignments Completed</span>
                      <span className="font-bold text-foreground">
                        {item.completedAssignments} / {item.assignmentsCount}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-purple-600 h-full rounded-full transition-all"
                        style={{
                          width: `${(item.completedAssignments / item.assignmentsCount) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Themes */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Core Themes
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.themes.slice(0, 3).map((theme, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-muted text-[10px] text-muted-foreground font-medium"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-foreground p-0 h-auto"
                  onClick={() => setSelectedFdp(item)}
                >
                  View Syllabus & Faculty <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </Button>

                {isCompleted && item.certificateIssued ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/10"
                    onClick={() => showToast(`✓ Downloading digital FDP certificate (${item.certificateId})...`)}
                    leftIcon={<Download className="h-3.5 w-3.5" />}
                  >
                    Certificate ({item.creditPoints} Pts)
                  </Button>
                ) : isRecommended ? (
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-xs bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => {
                      onEnroll(item.id);
                      showToast(`✓ Registered for ${item.title}!`);
                    }}
                  >
                    Deputation Enrollment
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="text-xs" disabled>
                    Active Participant
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedFdp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <Card variant="elevated" className="w-full max-w-xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  {selectedFdp.sanctioningBody} • {selectedFdp.hostingInstitute}
                </span>
                <h3 className="text-base font-bold text-foreground mt-1">{selectedFdp.title}</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFdp(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </Button>
            </div>

            <div className="p-3 rounded-xl bg-muted/40 border border-border grid grid-cols-3 gap-2 text-xs text-center">
              <div>
                <span className="text-muted-foreground">Duration</span>
                <p className="font-bold text-foreground">{selectedFdp.durationDays} Days</p>
              </div>
              <div>
                <span className="text-muted-foreground">Credit Points</span>
                <p className="font-bold text-purple-600">{selectedFdp.creditPoints} Points</p>
              </div>
              <div>
                <span className="text-muted-foreground">Mode</span>
                <p className="font-bold text-foreground">{selectedFdp.mode}</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="text-muted-foreground font-semibold">Course Director / Coordinator:</span>
              <p className="font-bold text-foreground">{selectedFdp.coordinator}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Full Curriculum Modules
              </h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {selectedFdp.themes.map((t, i) => (
                  <li key={i} className="flex items-center gap-2 p-2 rounded-lg bg-card border border-border">
                    <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-border flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedFdp(null)}>
                Close
              </Button>
              {selectedFdp.status === "RECOMMENDED" && (
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => {
                    onEnroll(selectedFdp.id);
                    setSelectedFdp(null);
                    showToast(`✓ Deputation approved for ${selectedFdp.title}!`);
                  }}
                >
                  Confirm Deputation
                </Button>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
