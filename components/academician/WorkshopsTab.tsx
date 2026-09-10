"use client";

import * as React from "react";
import {
  Presentation,
  PlusCircle,
  Users,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Award,
  Download,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  DollarSign,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import { FacultyWorkshop } from "@/lib/services/academicianPortalService";

interface WorkshopsTabProps {
  workshops: FacultyWorkshop[];
  onCreateWorkshop: (ws: Omit<FacultyWorkshop, "id" | "registeredAttendeesCount" | "attendeesList">) => void;
  showToast: (msg: string) => void;
}

export function WorkshopsTab({
  workshops,
  onCreateWorkshop,
  showToast,
}: WorkshopsTabProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = React.useState<FacultyWorkshop | null>(null);

  // Form State
  const [title, setTitle] = React.useState("");
  const [department, setDepartment] = React.useState("Department of Dravyaguna Vijnana & Clinical Pharmacology");
  const [venue, setVenue] = React.useState("AIIA Clinical Skills Simulation Lab, Sarita Vihar");
  const [mode, setMode] = React.useState<FacultyWorkshop["mode"]>("In-Person Hands-On");
  const [date, setDate] = React.useState("2026-11-25");
  const [durationHours, setDurationHours] = React.useState(8);
  const [seats, setSeats] = React.useState(25);
  const [fee, setFee] = React.useState("₹2,500");
  const [objectivesText, setObjectivesText] = React.useState(
    "Standardized botanical solvent extraction, TLC Rf calculation, Heavy metal screening with AAS"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast("Please enter workshop title");
      return;
    }

    const objs = objectivesText.split(",").map((o) => o.trim());

    onCreateWorkshop({
      workshopTitle: title,
      department,
      venue,
      mode,
      date,
      durationHours: Number(durationHours),
      maxSeats: Number(seats),
      registrationFee: fee,
      status: "UPCOMING",
      learningObjectives: objs,
    });

    setShowModal(false);
    setTitle("");
    showToast(`✓ Workshop "${title}" announced on Vaidya Setu!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-rose-500/10 via-card to-card border border-rose-500/20">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold">
            <Presentation className="h-3.5 w-3.5" /> Hands-on Clinical & Laboratory Masterclasses
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Faculty-Led Workshops
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Organize intensive practicums in Nadi Pariksha digital biosensors, chromatographic standardization, and classical surgical procedures (Ksharasutra). Track delegate rosters and automate certificate delivery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            className="bg-rose-600 hover:bg-rose-700 text-white"
            onClick={() => setShowModal(true)}
            leftIcon={<PlusCircle className="h-4 w-4" />}
          >
            Host New Workshop
          </Button>
        </div>
      </div>

      {/* Workshop Cards */}
      <div className="grid grid-cols-1 gap-4">
        {workshops.map((ws) => (
          <Card
            key={ws.id}
            variant="default"
            className="p-5 hover:border-rose-500/40 transition-all space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                    {ws.mode}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground font-medium">{ws.department}</span>
                </div>
                <h3 className="text-base font-bold text-foreground leading-snug">{ws.workshopTitle}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span>{ws.venue}</span>
                </p>
              </div>

              <div className="flex flex-col sm:items-end gap-1 shrink-0">
                <Badge
                  variant={
                    ws.status === "COMPLETED"
                      ? "verified"
                      : ws.status === "LIVE_TODAY"
                      ? "warning"
                      : "gold"
                  }
                  size="sm"
                >
                  {ws.status.replace("_", " ")}
                </Badge>
                <span className="text-xs font-bold text-emerald-600">Fee: {ws.registrationFee}</span>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-muted/40 border border-border text-xs">
              <div>
                <span className="text-muted-foreground text-[10px]">Date</span>
                <p className="font-semibold text-foreground flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" /> {ws.date}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground text-[10px]">Duration</span>
                <p className="font-semibold text-foreground flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" /> {ws.durationHours} Hours
                </p>
              </div>
              <div>
                <span className="text-muted-foreground text-[10px]">Registrations</span>
                <p className="font-bold text-rose-600">
                  {ws.registeredAttendeesCount} / {ws.maxSeats} Delegates
                </p>
              </div>
              <div>
                <span className="text-muted-foreground text-[10px]">Capacity Status</span>
                <p className="font-semibold text-foreground">
                  {ws.registeredAttendeesCount >= ws.maxSeats ? "Full Capacity" : "Seats Open"}
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Hands-on Objectives
              </span>
              <ul className="space-y-1">
                {ws.learningObjectives.map((obj, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Verified NCISM Accredited Practical Masterclass
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => showToast(`✓ Downloading Workshop SOP Kit & Laboratory Handouts...`)}
                  leftIcon={<Download className="h-3.5 w-3.5" />}
                >
                  SOP Handouts
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="text-xs bg-rose-600 hover:bg-rose-700 text-white"
                  onClick={() => setSelectedWorkshop(ws)}
                  leftIcon={<Users className="h-3.5 w-3.5" />}
                >
                  Delegate Roster ({ws.attendeesList.length})
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Attendee Roster Modal */}
      {selectedWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <Card variant="elevated" className="w-full max-w-xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                  Delegate Attendance & Certification
                </span>
                <h3 className="text-base font-bold text-foreground mt-1">
                  {selectedWorkshop.workshopTitle}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedWorkshop(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </Button>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Enrolled Delegates ({selectedWorkshop.attendeesList.length})
              </h4>
              {selectedWorkshop.attendeesList.length === 0 ? (
                <p className="text-xs text-muted-foreground">No delegates registered yet.</p>
              ) : (
                <div className="space-y-2">
                  {selectedWorkshop.attendeesList.map((att) => (
                    <div
                      key={att.id}
                      className="p-3 rounded-xl border border-border flex items-center justify-between text-xs"
                    >
                      <div className="space-y-0.5">
                        <p className="font-bold text-foreground">{att.name}</p>
                        <p className="text-muted-foreground text-[11px]">
                          {att.role} • {att.institution}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant={att.checkedIn ? "verified" : "outline"} size="sm">
                          {att.checkedIn ? "Attended" : "Registered"}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-[11px] h-7 px-2"
                          onClick={() => showToast(`✓ Issued digital Certificate of Completion to ${att.name}`)}
                        >
                          Issue E-Cert
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setSelectedWorkshop(null)}>
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Host New Workshop Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <Card variant="elevated" className="w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <PlusCircle className="h-4 w-4 text-rose-600" /> Announce Faculty Workshop
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                ✕
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Workshop Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clinical Simulation: Panchakarma Complication Management"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Department / Facility</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Mode</label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="In-Person Hands-On">In-Person Hands-On</option>
                    <option value="Hybrid Clinical Simulation">Hybrid Clinical Simulation</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Venue</label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Duration (Hours)</label>
                  <input
                    type="number"
                    value={durationHours}
                    onChange={(e) => setDurationHours(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Max Seats</label>
                  <input
                    type="number"
                    value={seats}
                    onChange={(e) => setSeats(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Registration Fee</label>
                <input
                  type="text"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Learning Objectives (Comma separated)</label>
                <textarea
                  rows={2}
                  value={objectivesText}
                  onChange={(e) => setObjectivesText(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="pt-3 border-t border-border flex justify-end gap-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" className="bg-rose-600 hover:bg-rose-700 text-white">
                  Publish Workshop
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
