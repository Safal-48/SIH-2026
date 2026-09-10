"use client";

import * as React from "react";
import {
  Award,
  CheckCircle2,
  Clock,
  MapPin,
  Download,
  BookOpen,
  Filter,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  FlaskConical,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import { IndustrialTraining } from "@/lib/services/academicianPortalService";

interface IndustrialTrainingTabProps {
  trainings: IndustrialTraining[];
  onEnroll: (trainingId: string) => void;
  showToast: (msg: string) => void;
}

export function IndustrialTrainingTab({
  trainings,
  onEnroll,
  showToast,
}: IndustrialTrainingTabProps) {
  const [domainFilter, setDomainFilter] = React.useState<string>("ALL");
  const [selectedTraining, setSelectedTraining] = React.useState<IndustrialTraining | null>(null);

  const totalCpeCredits = trainings
    .filter((t) => t.status === "COMPLETED")
    .reduce((sum, t) => sum + t.cpeCredits, 0);

  const filteredTrainings = trainings.filter((t) => {
    if (domainFilter === "ALL") return true;
    return t.domain === domainFilter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner & CPE Credit Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-r from-blue-600/10 via-card to-card border border-blue-500/20 space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <Award className="h-3.5 w-3.5" /> NCISM Continuing Professional Education (CPE) Scheme
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Faculty Industrial & Laboratory Trainings
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Hands-on technical certifications in high-performance chromatography (HPTLC/LC-MS), Schedule Y clinical trials (GCP), industrial GMP formulation cleanrooms, and Ayush bioinformatics.
          </p>
        </div>

        <Card variant="default" className="p-5 flex flex-col justify-center space-y-2 border-blue-500/30 bg-blue-500/5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Accumulated CPE Credit Bank
          </span>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-foreground">{totalCpeCredits}</p>
            <span className="text-xs text-muted-foreground">/ 50 Required Triennial Credits</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all"
              style={{ width: `${Math.min(100, (totalCpeCredits / 50) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-muted-foreground flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> NCISM Triennial Faculty Renewal Compliant
          </p>
        </Card>
      </div>

      {/* Domain Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          "ALL",
          "Analytical Lab",
          "Clinical GCP",
          "GMP Manufacturing",
          "AI & Informatics",
        ].map((dom) => (
          <button
            key={dom}
            onClick={() => setDomainFilter(dom)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all ${
              domainFilter === dom
                ? "bg-blue-600 text-white font-semibold shadow-sm"
                : "bg-muted/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            {dom === "ALL" ? "All Domains" : dom}
          </button>
        ))}
      </div>

      {/* Training Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTrainings.map((prog) => {
          const isCompleted = prog.status === "COMPLETED";
          const isInProgress = prog.status === "IN_PROGRESS";
          const isEnrolled = prog.status === "ENROLLED";
          const isUpcoming = prog.status === "UPCOMING";

          return (
            <Card
              key={prog.id}
              variant="default"
              className="p-5 flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                      <FlaskConical className="h-3.5 w-3.5" /> {prog.domain} • {prog.modality}
                    </span>
                    <h3 className="text-sm font-bold text-foreground leading-snug">
                      {prog.programTitle}
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium">{prog.provider}</p>
                  </div>
                  <Badge
                    variant={
                      isCompleted
                        ? "verified"
                        : isInProgress
                        ? "warning"
                        : isEnrolled
                        ? "gold"
                        : "secondary"
                    }
                    size="sm"
                    className="shrink-0"
                  >
                    {prog.status.replace("_", " ")}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-muted-foreground pt-1">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" /> {prog.durationHours} Hours
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-blue-500" /> {prog.cpeCredits} CPE Credits
                  </span>
                  <span className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> {prog.location}
                  </span>
                </div>

                {/* Progress Bar if active or completed */}
                {(isInProgress || isCompleted) && (
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground">Curriculum Completion</span>
                      <span className="font-bold text-foreground">{prog.progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isCompleted ? "bg-emerald-500" : "bg-blue-600"
                        }`}
                        style={{ width: `${prog.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Skills Acquired Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {prog.skillsAcquired.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-muted text-[10px] text-muted-foreground font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-foreground p-0 h-auto"
                  onClick={() => setSelectedTraining(prog)}
                >
                  View Modules & Syllabus <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </Button>

                {isCompleted && prog.certificateUrl ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/10"
                    onClick={() => showToast(`✓ Downloading digital certificate (${prog.certificateHash})...`)}
                    leftIcon={<Download className="h-3.5 w-3.5" />}
                  >
                    Download Certificate
                  </Button>
                ) : isUpcoming ? (
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-xs bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => {
                      onEnroll(prog.id);
                      showToast(`✓ Enrolled in ${prog.programTitle}!`);
                    }}
                  >
                    Enroll ({prog.cpeCredits} CPE)
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="text-xs" disabled>
                    In Progress ({prog.progressPercentage}%)
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Syllabus Modal */}
      {selectedTraining && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <Card variant="elevated" className="w-full max-w-xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {selectedTraining.provider}
                </span>
                <h3 className="text-base font-bold text-foreground mt-1">
                  {selectedTraining.programTitle}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTraining(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </Button>
            </div>

            <div className="p-3 rounded-xl bg-muted/40 border border-border grid grid-cols-3 gap-2 text-xs text-center">
              <div>
                <span className="text-muted-foreground">Total Hours</span>
                <p className="font-bold text-foreground">{selectedTraining.durationHours} hrs</p>
              </div>
              <div>
                <span className="text-muted-foreground">CPE Credits</span>
                <p className="font-bold text-blue-600">{selectedTraining.cpeCredits} Points</p>
              </div>
              <div>
                <span className="text-muted-foreground">Modality</span>
                <p className="font-bold text-foreground">{selectedTraining.modality}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Modular Curriculum Breakdown
              </h4>
              <div className="space-y-2">
                {selectedTraining.modules.map((mod, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl border border-border flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      {mod.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-muted-foreground/40 shrink-0" />
                      )}
                      <span className={mod.completed ? "text-foreground font-medium" : "text-muted-foreground"}>
                        {mod.title}
                      </span>
                    </div>
                    <span className="text-[11px] text-muted-foreground shrink-0">{mod.hours} hrs</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-border flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedTraining(null)}>
                Close
              </Button>
              {selectedTraining.status === "UPCOMING" && (
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    onEnroll(selectedTraining.id);
                    setSelectedTraining(null);
                    showToast(`✓ Enrolled in ${selectedTraining.programTitle}!`);
                  }}
                >
                  Confirm Registration
                </Button>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
