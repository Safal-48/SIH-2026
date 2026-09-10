"use client";

import * as React from "react";
import {
  Mic,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Users,
  Download,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Check,
  X,
  RotateCcw,
  Presentation,
  DollarSign,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import { GuestLecture } from "@/lib/services/academicianPortalService";

interface GuestLecturesTabProps {
  lectures: GuestLecture[];
  onRespondLecture: (lectureId: string, action: "ACCEPTED" | "RESCHEDULED") => void;
  showToast: (msg: string) => void;
}

export function GuestLecturesTab({
  lectures,
  onRespondLecture,
  showToast,
}: GuestLecturesTabProps) {
  const [filter, setFilter] = React.useState<string>("ALL");

  const filtered = lectures.filter((l) => {
    if (filter === "ALL") return true;
    return l.status === filter;
  });

  const pendingInvitations = lectures.filter((l) => l.status === "INVITATION_RECEIVED");

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-card to-card border border-amber-500/20">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-semibold">
            <Mic className="h-3.5 w-3.5" /> Keynote Speaker & CME Faculty Registry
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Guest Lectures & Scientific Keynotes
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Manage academic symposium invitations, Continuing Medical Education (CME) addresses, international webcasts, honorarium disbursements, and slide repositories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-muted-foreground">Speaker Rating</span>
            <p className="text-xl font-bold text-amber-600 flex items-center justify-end gap-1">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" /> 4.9 / 5.0
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center font-bold text-xl">
            🎙️
          </div>
        </div>
      </div>

      {/* Pending Invitations Alert Banner */}
      {pendingInvitations.length > 0 && (
        <Card variant="default" className="p-4 border-amber-500/30 bg-amber-500/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" /> Action Required: {pendingInvitations.length} Pending Lecture Invitation
            </span>
            <Badge variant="warning" size="sm">New Request</Badge>
          </div>

          {pendingInvitations.map((inv) => (
            <div
              key={inv.id}
              className="p-3.5 rounded-xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <p className="font-bold text-foreground">{inv.topicTitle}</p>
                <p className="text-muted-foreground">
                  Invited by: <strong>{inv.invitingOrganization}</strong> • {inv.date} ({inv.timeSlot})
                </p>
                <p className="text-amber-600 dark:text-amber-400 font-semibold">
                  Honorarium: {inv.honorarium} • Audience: ~{inv.estimatedAudience}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    onRespondLecture(inv.id, "RESCHEDULED");
                    showToast("Requested date reschedule from host committee");
                  }}
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reschedule
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="text-xs bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={() => {
                    onRespondLecture(inv.id, "ACCEPTED");
                    showToast("✓ Accepted lecture invitation! Added to academic calendar.");
                  }}
                >
                  <Check className="h-3.5 w-3.5 mr-1" /> Accept Keynote
                </Button>
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {["ALL", "ACCEPTED", "COMPLETED", "INVITATION_RECEIVED"].map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all ${
              filter === st
                ? "bg-amber-600 text-white font-semibold shadow-sm"
                : "bg-muted/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            {st === "ALL" ? "All Engagements" : st.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Lectures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((lec) => {
          const isCompleted = lec.status === "COMPLETED";
          const isAccepted = lec.status === "ACCEPTED";

          return (
            <Card
              key={lec.id}
              variant="default"
              className="p-5 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Presentation className="h-3.5 w-3.5" /> {lec.mode}
                    </span>
                    <h3 className="text-sm font-bold text-foreground leading-snug">{lec.topicTitle}</h3>
                    <p className="text-xs text-muted-foreground font-medium">{lec.eventTitle}</p>
                  </div>
                  <Badge
                    variant={
                      isCompleted
                        ? "verified"
                        : isAccepted
                        ? "gold"
                        : "secondary"
                    }
                    size="sm"
                    className="shrink-0"
                  >
                    {lec.status.replace("_", " ")}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground pt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" /> {lec.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" /> {lec.timeSlot}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> {lec.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" /> ~{lec.estimatedAudience} Delegates
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-muted/40 border border-border flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Honorarium Package:</span>
                  <span className="font-bold text-emerald-600">{lec.honorarium}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                {isCompleted && lec.feedbackScore && (
                  <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> {lec.feedbackScore} Delegate Rating
                  </span>
                )}

                <div className="flex items-center gap-2 ml-auto">
                  {lec.slidesDeckUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => showToast("Downloading Master Keynote Deck (PDF)...")}
                      leftIcon={<Download className="h-3.5 w-3.5" />}
                    >
                      Slides Deck
                    </Button>
                  )}
                  {lec.recordingUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-primary"
                      onClick={() => showToast("Opening CME Webcast Recording...")}
                      leftIcon={<ExternalLink className="h-3.5 w-3.5" />}
                    >
                      Recording
                    </Button>
                  )}
                  {isAccepted && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs text-emerald-600 border-emerald-500/30"
                      disabled
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Confirmed On Calendar
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
