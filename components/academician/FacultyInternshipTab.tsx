"use client";

import * as React from "react";
import {
  Building2,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Send,
  Download,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Award,
  AlertCircle,
  Briefcase,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import { FacultyInternship } from "@/lib/services/academicianPortalService";

interface FacultyInternshipTabProps {
  internships: FacultyInternship[];
  onApply: (internshipId: string) => void;
  showToast: (msg: string) => void;
}

export function FacultyInternshipTab({ internships, onApply, showToast }: FacultyInternshipTabProps) {
  const [filter, setFilter] = React.useState<string>("ALL");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectedInternship, setSelectedInternship] = React.useState<FacultyInternship | null>(null);

  const filtered = internships.filter((item) => {
    const matchesFilter = filter === "ALL" || item.status === filter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const activeSabbatical = internships.find((i) => i.status === "IN_PROGRESS");

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-card to-card border border-border">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Briefcase className="h-3.5 w-3.5" /> NCISM Faculty Industry Sabbatical Scheme
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Faculty Sabbaticals & Industry Immersion
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Immerse in premier Ayush pharmaceutical manufacturing, analytical laboratories, and clinical epidemiology centers. Bridge classical pedagogy with modern regulatory standards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-muted-foreground">Sabbatical Leave Quota</span>
            <p className="text-lg font-bold text-foreground">6 Months / Triennium</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
            🏛️
          </div>
        </div>
      </div>

      {/* Active Sabbatical Card if currently running */}
      {activeSabbatical && (
        <Card variant="default" className="p-6 border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center font-bold">
                🏭
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Active Industry Sabbatical</span>
                  <Badge variant="verified" size="sm">NOC Approved</Badge>
                </div>
                <h3 className="text-base font-bold text-foreground mt-0.5">{activeSabbatical.title}</h3>
              </div>
            </div>
            <Badge variant="secondary" className="self-start sm:self-auto">
              {activeSabbatical.status.replace("_", " ")}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-muted-foreground">Host Organization</span>
              <p className="font-semibold text-foreground">{activeSabbatical.organization}</p>
              <p className="text-muted-foreground text-[11px]">{activeSabbatical.location}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Host Scientist / Guide</span>
              <p className="font-semibold text-foreground">{activeSabbatical.hostMentor.name}</p>
              <p className="text-muted-foreground text-[11px]">{activeSabbatical.hostMentor.designation}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Duration & Period</span>
              <p className="font-semibold text-foreground">{activeSabbatical.duration}</p>
              <p className="text-muted-foreground text-[11px]">{activeSabbatical.startDate} to {activeSabbatical.endDate}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Sabbatical Grant</span>
              <p className="font-bold text-emerald-600">{activeSabbatical.stipend}</p>
              <p className="text-muted-foreground text-[11px]">{activeSabbatical.logbookEntriesCount} Logbook Submissions</p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border/80">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Institutional Deputation Order #AIIA/HR/SABB-2026/04 issued with full salary protection.</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => showToast("Downloading Sabbatical Interim Progress Report...")}
                leftIcon={<Download className="h-3.5 w-3.5" />}
              >
                Interim Report
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="text-xs"
                onClick={() => setSelectedInternship(activeSabbatical)}
                leftIcon={<FileText className="h-3.5 w-3.5" />}
              >
                View Logbook & Objectives
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search organizations, domains..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-card border border-border focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {["ALL", "OFFERED", "APPROVED", "IN_PROGRESS"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === st
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-muted/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {st === "ALL" ? "All Programs" : st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Internships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const isApplied = item.status === "NOC_PENDING" || item.status === "APPROVED" || item.status === "IN_PROGRESS";
          return (
            <Card
              key={item.id}
              variant="default"
              className="p-5 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5" /> {item.organization}
                    </span>
                    <h3 className="text-sm font-bold text-foreground leading-snug">{item.title}</h3>
                  </div>
                  <Badge
                    variant={
                      item.status === "IN_PROGRESS"
                        ? "verified"
                        : item.status === "APPROVED"
                        ? "gold"
                        : item.status === "NOC_PENDING"
                        ? "warning"
                        : "secondary"
                    }
                    size="sm"
                    className="shrink-0"
                  >
                    {item.status.replace("_", " ")}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground pt-1">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> {item.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" /> {item.duration}
                  </span>
                  <span className="col-span-2 font-semibold text-emerald-600 dark:text-emerald-400">
                    Stipend: {item.stipend}
                  </span>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Key Objectives
                  </span>
                  <ul className="space-y-1">
                    {item.objectives.slice(0, 2).map((obj, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <span className="text-primary mt-0.5">•</span>
                        <span className="line-clamp-1">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-foreground p-0 h-auto"
                  onClick={() => setSelectedInternship(item)}
                >
                  View Details & Host Mentor <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </Button>

                {isApplied ? (
                  <Button variant="outline" size="sm" className="text-xs" disabled>
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-emerald-500" /> Deputation Logged
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      onApply(item.id);
                      showToast(`✓ Deputation & NOC request submitted for ${item.organization}!`);
                    }}
                    leftIcon={<Send className="h-3.5 w-3.5" />}
                  >
                    Apply for Sabbatical
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedInternship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <Card variant="elevated" className="w-full max-w-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {selectedInternship.organization} • {selectedInternship.department}
                </span>
                <h3 className="text-lg font-bold text-foreground mt-1">
                  {selectedInternship.title}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedInternship(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-muted/40 border border-border text-xs">
              <div>
                <span className="text-muted-foreground">Location</span>
                <p className="font-semibold text-foreground">{selectedInternship.location}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Duration</span>
                <p className="font-semibold text-foreground">{selectedInternship.duration}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Industry Stipend</span>
                <p className="font-bold text-emerald-600">{selectedInternship.stipend}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Host Scientist & Mentor
              </h4>
              <div className="p-3 rounded-xl border border-border flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-foreground">{selectedInternship.hostMentor.name}</p>
                  <p className="text-muted-foreground">{selectedInternship.hostMentor.designation}</p>
                </div>
                <span className="text-xs text-primary font-mono">{selectedInternship.hostMentor.email}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Full Sabbatical Research Objectives
              </h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {selectedInternship.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] shrink-0 font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Faculty Eligibility & Prerequisites
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedInternship.prerequisites.map((p, i) => (
                  <Badge key={i} variant="outline" size="sm">
                    {p}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedInternship(null)}>
                Close
              </Button>
              {selectedInternship.status === "OFFERED" && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    onApply(selectedInternship.id);
                    setSelectedInternship(null);
                    showToast(`✓ Deputation & NOC request submitted for ${selectedInternship.organization}!`);
                  }}
                >
                  Submit Institutional Deputation Request
                </Button>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
