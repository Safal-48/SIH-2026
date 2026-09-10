"use client";

import * as React from "react";
import {
  Presentation,
  PlusCircle,
  Users,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";

interface CreateResearchWorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (workshopData: {
    title: string;
    leadFacultyGuide: string;
    scheduledDate: string;
    durationHours: number;
    venue: string;
    targetCohortSize: number;
    modules: string[];
  }) => void;
}

export function CreateResearchWorkshopModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateResearchWorkshopModalProps) {
  const [title, setTitle] = React.useState(
    "Hands-on Workshop: Electronic Research Documentation & GCP Protocols in Clinical Ayurveda"
  );
  const [leadFaculty, setLeadFaculty] = React.useState("Prof. Dr. Anand Kulkarni");
  const [date, setDate] = React.useState("2026-09-24");
  const [duration, setDuration] = React.useState(16);
  const [venue, setVenue] = React.useState("AIIA Clinical Simulation Lab & Telemedicine Suites");
  const [cohortSize, setCohortSize] = React.useState(48);
  const [modulesText, setModulesText] = React.useState(
    "Electronic Health Record SOAP Notes & Ayush ICD-11 Coding, e-CRF Data Logging & CTRI Registry Protocols, Pharmacovigilance (PvPI) Adverse Event Reporting, CONSORT-Ayush Structured Manuscript Drafting"
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const modules = modulesText.split(",").map((m) => m.trim());
    onSubmit({
      title,
      leadFacultyGuide: leadFaculty,
      scheduledDate: date,
      durationHours: Number(duration),
      venue,
      targetCohortSize: Number(cohortSize),
      modules,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
      <Card
        variant="elevated"
        className="w-full max-w-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto border-primary/30"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center font-bold">
              🎓
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                Academia ↔ Industry Feedback Loop Intervention
              </span>
              <h3 className="text-base font-bold text-foreground">
                Commission Remedial Research Workshop
              </h3>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-muted-foreground">
            ✕
          </Button>
        </div>

        {/* Diagnostic Context Alert */}
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs flex items-center justify-between">
          <span className="text-rose-700 dark:text-rose-300">
            <strong>Target Skill Gap:</strong> Research Documentation (Cohort Avg: 40% vs Industry 78%)
          </span>
          <Badge variant="destructive" size="sm">
            48 Scholars Flagged
          </Badge>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Workshop Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Lead Faculty Guide</label>
              <select
                value={leadFaculty}
                onChange={(e) => setLeadFaculty(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="Prof. Dr. Anand Kulkarni">Prof. Dr. Anand Kulkarni (HOD Dravyaguna)</option>
                <option value="Dr. Bhavna Dass">Dr. Bhavna Dass (Clinical Pharmacology)</option>
                <option value="Prof. Dr. Tanuja Nesari">Prof. Dr. Tanuja Nesari (Kayachikitsa)</option>
                <option value="Dr. Sulochana Rao">Dr. Sulochana Rao (CCRAS Senior Scientist)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-foreground">Target Cohort Quota</label>
              <input
                type="number"
                value={cohortSize}
                onChange={(e) => setCohortSize(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Scheduled Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-foreground">Total Hours (CPE Accredited)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-foreground">Venue & Simulation Facility</label>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-foreground">Remedial Modules (Comma separated)</label>
            <textarea
              rows={3}
              value={modulesText}
              onChange={(e) => setModulesText(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="p-3 rounded-xl bg-muted/40 border border-border text-xs space-y-1">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Automated Closed-Loop Sync
            </span>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Upon commissioning, this workshop will immediately appear in <strong>Prof. Dr. Anand Kulkarni’s Faculty Suite (`/academician?tab=workshops`)</strong> and auto-notify the 48 scholars with Research Documentation gaps on their Student Portal dashboards.
            </p>
          </div>

          <div className="pt-3 border-t border-border flex justify-end gap-2">
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="font-bold">
              Confirm & Launch Workshop
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
