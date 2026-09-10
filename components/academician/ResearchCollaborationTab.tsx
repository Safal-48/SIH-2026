"use client";

import * as React from "react";
import {
  FlaskConical,
  PlusCircle,
  FileCheck,
  CheckCircle2,
  Clock,
  Building2,
  DollarSign,
  ChevronRight,
  ShieldCheck,
  Search,
  Users,
  AlertCircle,
  ExternalLink,
  Download,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import { ResearchCollaboration } from "@/lib/services/academicianPortalService";

interface ResearchCollaborationTabProps {
  collaborations: ResearchCollaboration[];
  onCreateCollaboration: (collab: Omit<ResearchCollaboration, "id" | "progress">) => void;
  showToast: (msg: string) => void;
}

export function ResearchCollaborationTab({
  collaborations,
  onCreateCollaboration,
  showToast,
}: ResearchCollaborationTabProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedCollab, setSelectedCollab] = React.useState<ResearchCollaboration | null>(null);

  // Form State
  const [title, setTitle] = React.useState("");
  const [partner, setPartner] = React.useState("Dabur Research Foundation");
  const [partnerType, setPartnerType] = React.useState<ResearchCollaboration["partnerType"]>("Industry Pharma");
  const [budget, setBudget] = React.useState("₹35,00,000");
  const [durationMonths, setDurationMonths] = React.useState(24);
  const [coInvestigators, setCoInvestigators] = React.useState("Dr. Rajesh Varma (Dabur), Dr. Bhavna Dass (AIIA)");
  const [iecStatus, setIecStatus] = React.useState<ResearchCollaboration["ethicsClearanceStatus"]>("CLEARED");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast("Please enter a research project title");
      return;
    }

    onCreateCollaboration({
      projectTitle: title,
      collaboratingPartner: partner,
      partnerType,
      principalInvestigator: "Prof. Dr. Anand Kulkarni (PI, AIIA)",
      coInvestigators: coInvestigators.split(",").map((c) => c.trim()),
      sanctionedBudget: budget,
      utilizedBudget: "₹0",
      durationMonths: Number(durationMonths),
      ethicsClearanceStatus: iecStatus,
      iecApprovalNumber: iecStatus === "CLEARED" ? `IEC/AIIA/2026/${Math.floor(10 + Math.random() * 90)}-R` : undefined,
      mouStatus: "SIGNED",
      currentPhase: "Proposal",
      milestones: [
        { id: "m1", name: "Inception workshop & MoU sign-off", targetDate: "2026-10-31", status: "IN_PROGRESS" },
        { id: "m2", name: "Laboratory sample procurement & validation", targetDate: "2027-02-28", status: "PENDING" },
      ],
      startDate: new Date().toISOString().split("T")[0],
      targetEndDate: "2028-09-30",
    });

    setShowModal(false);
    setTitle("");
    showToast(`✓ Collaborative Research Project "${partner}" initiated!`);
  };

  const totalSanctioned = collaborations.reduce((sum, c) => {
    const val = parseInt(c.sanctionedBudget.replace(/[^0-9]/g, "")) || 0;
    return sum + val;
  }, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-card to-card border border-border">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <FlaskConical className="h-3.5 w-3.5" /> Academia-Industry Collaborative R&D Hub
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Research Collaborations & MoUs
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Multi-centric clinical trials, phytochemistry standardization, and Ayurgenomics projects with national research councils (CCRAS, CSIR, ICMR) and pharma partners.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-muted-foreground">Sanctioned Research Grants</span>
            <p className="text-xl font-bold text-emerald-600">₹{(totalSanctioned / 100000).toFixed(1)} Lakhs</p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowModal(true)}
            leftIcon={<PlusCircle className="h-4 w-4" />}
          >
            Propose Collab (MoU)
          </Button>
        </div>
      </div>

      {/* Collaboration Pipeline Cards */}
      <div className="grid grid-cols-1 gap-4">
        {collaborations.map((collab) => (
          <Card
            key={collab.id}
            variant="default"
            className="p-5 hover:border-primary/40 transition-all space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" size="sm" className="font-semibold text-primary">
                    {collab.partnerType}
                  </Badge>
                  <span className="text-xs font-bold text-muted-foreground">•</span>
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-primary" /> {collab.collaboratingPartner}
                  </span>
                  {collab.ethicsClearanceStatus === "CLEARED" && (
                    <Badge variant="verified" size="sm" icon={<ShieldCheck className="h-3 w-3" />}>
                      IEC Cleared ({collab.iecApprovalNumber})
                    </Badge>
                  )}
                </div>
                <h3 className="text-base font-bold text-foreground leading-snug">
                  {collab.projectTitle}
                </h3>
                <p className="text-xs text-muted-foreground">
                  <strong>PI:</strong> {collab.principalInvestigator} • <strong>Co-PIs:</strong>{" "}
                  {collab.coInvestigators.join("; ")}
                </p>
              </div>

              <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                <Badge
                  variant={
                    collab.currentPhase === "Clinical Validation"
                      ? "gold"
                      : collab.currentPhase === "Data Synthesis"
                      ? "verified"
                      : "secondary"
                  }
                  size="sm"
                >
                  Phase: {collab.currentPhase}
                </Badge>
                <span className="text-xs font-bold text-emerald-600">
                  Grant: {collab.sanctionedBudget}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Utilized: {collab.utilizedBudget}
                </span>
              </div>
            </div>

            {/* Milestones & Progress */}
            <div className="space-y-2 pt-2 border-t border-border">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-muted-foreground">
                  Milestone Progression ({collab.milestones.filter((m) => m.status === "COMPLETED").length} of{" "}
                  {collab.milestones.length} Achieved)
                </span>
                <span className="font-bold text-foreground">{collab.progress}% Completed</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all"
                  style={{ width: `${collab.progress}%` }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-2">
                {collab.milestones.map((m) => (
                  <div
                    key={m.id}
                    className="p-2.5 rounded-xl bg-muted/40 border border-border flex items-start gap-2 text-xs"
                  >
                    {m.status === "COMPLETED" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : m.status === "IN_PROGRESS" ? (
                      <Clock className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-muted-foreground/40 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-0.5">
                      <p className="font-medium text-foreground line-clamp-2 leading-tight">{m.name}</p>
                      <span className="text-[10px] text-muted-foreground block">{m.targetDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Timeline: {collab.startDate} to {collab.targetEndDate} ({collab.durationMonths} Months)
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => showToast(`✓ Exporting MoU Legal Dossier for ${collab.collaboratingPartner}...`)}
                  leftIcon={<Download className="h-3.5 w-3.5" />}
                >
                  Download Signed MoU
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-primary"
                  onClick={() => setSelectedCollab(collab)}
                >
                  View Details <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Propose Collab Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <Card variant="elevated" className="w-full max-w-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <PlusCircle className="h-4 w-4 text-primary" /> Propose Collaborative Research Project
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                ✕
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clinical Pharmacovigilance & Bioassay Standardization of..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Collaborating Organization</label>
                  <input
                    type="text"
                    required
                    value={partner}
                    onChange={(e) => setPartner(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Partner Category</label>
                  <select
                    value={partnerType}
                    onChange={(e) => setPartnerType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Industry Pharma">Industry Pharma</option>
                    <option value="National Research Council">National Research Council (CCRAS/CSIR)</option>
                    <option value="Premier Institute (IIT/AIIMS)">Premier Institute (IIT/AIIMS)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Sanctioned Research Budget</label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Duration (Months)</label>
                  <input
                    type="number"
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Co-Investigators (Comma separated)</label>
                <input
                  type="text"
                  value={coInvestigators}
                  onChange={(e) => setCoInvestigators(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Institutional Ethics Committee (IEC)</label>
                <select
                  value={iecStatus}
                  onChange={(e) => setIecStatus(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="CLEARED">Cleared by AIIA Ethics Committee</option>
                  <option value="UNDER_REVIEW">Under Committee Review</option>
                  <option value="PENDING_SUBMISSION">Pending Submission</option>
                </select>
              </div>

              <div className="pt-3 border-t border-border flex justify-end gap-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Submit Collaboration Proposal
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
