"use client";

import * as React from "react";
import {
  DollarSign,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  PlusCircle,
  FileText,
  ShieldCheck,
  Download,
  Send,
  PieChart,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import { ConsultancyProject } from "@/lib/services/academicianPortalService";

interface ConsultancyTabProps {
  consultancies: ConsultancyProject[];
  onCreateConsultancy: (con: Omit<ConsultancyProject, "id" | "invoices">) => void;
  showToast: (msg: string) => void;
}

export function ConsultancyTab({
  consultancies,
  onCreateConsultancy,
  showToast,
}: ConsultancyTabProps) {
  const [showModal, setShowModal] = React.useState(false);

  // Form State
  const [clientName, setClientName] = React.useState("");
  const [clientCategory, setClientCategory] = React.useState<ConsultancyProject["clientCategory"]>("Ayush Pharma");
  const [scope, setScope] = React.useState("");
  const [fee, setFee] = React.useState(500000);
  const [deadline, setDeadline] = React.useState("2026-12-31");
  const [deliverablesText, setDeliverablesText] = React.useState("Pre-clinical toxicological review, Accelerated stability testing protocol");

  const totalFee = consultancies.reduce((acc, c) => acc + c.totalConsultancyFee, 0);
  const facultyEarnings = consultancies.reduce(
    (acc, c) => acc + (c.totalConsultancyFee * (c.facultySharePercentage / 100)),
    0
  );
  const institutionalCorpus = totalFee - facultyEarnings;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !scope.trim()) {
      showToast("Please fill in client name and project scope");
      return;
    }

    const delivs = deliverablesText.split(",").map((d, i) => ({
      name: d.trim(),
      dueDate: deadline,
      isDelivered: false,
    }));

    onCreateConsultancy({
      clientName,
      clientCategory,
      projectScope: scope,
      totalConsultancyFee: Number(fee),
      facultySharePercentage: 70,
      institutionalCorpusSharePercentage: 30,
      ndaSigned: true,
      status: "ACTIVE",
      startDate: new Date().toISOString().split("T")[0],
      deliveryDeadline: deadline,
      deliverables: delivs,
    });

    setShowModal(false);
    setClientName("");
    setScope("");
    showToast(`✓ Consultancy contract registered for ${clientName}!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner & 70/30 Revenue Split Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-r from-emerald-600/10 via-card to-card border border-emerald-500/20 space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <DollarSign className="h-3.5 w-3.5" /> Institutional Consultancy & Advisory Framework
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Industry Advisory & Consultancy
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Faculty-driven expert advisory services for Ayurvedic formulations, US-FDA regulatory dossiers, stability optimization, and venture capital due diligence under institutional revenue sharing guidelines.
          </p>
        </div>

        {/* 70/30 Split Card */}
        <Card variant="default" className="p-5 flex flex-col justify-center space-y-2 border-emerald-500/30 bg-emerald-500/5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Total Consultancy Volume
            </span>
            <Badge variant="verified" size="sm">
              70/30 Split Rule
            </Badge>
          </div>
          <p className="text-2xl font-bold text-foreground">₹{(totalFee / 100000).toFixed(2)} Lakhs</p>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/80 text-xs">
            <div>
              <span className="text-muted-foreground text-[10px] block">Faculty Investigator (70%)</span>
              <p className="font-bold text-emerald-600">₹{(facultyEarnings / 100000).toFixed(2)} L</p>
            </div>
            <div>
              <span className="text-muted-foreground text-[10px] block">AIIA Corpus (30%)</span>
              <p className="font-bold text-foreground">₹{(institutionalCorpus / 100000).toFixed(2)} L</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Action Bar */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-emerald-600" /> Active & Archived Consultancy Portfolios
        </h3>
        <Button
          variant="primary"
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
          onClick={() => setShowModal(true)}
          leftIcon={<PlusCircle className="h-4 w-4" />}
        >
          New Consultancy Contract
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {consultancies.map((con) => (
          <Card
            key={con.id}
            variant="default"
            className="p-5 flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">
                      {con.clientCategory}
                    </span>
                    {con.ndaSigned && (
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-muted text-muted-foreground font-mono flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3 text-emerald-500" /> NDA Signed
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-foreground">{con.clientName}</h3>
                </div>
                <Badge
                  variant={
                    con.status === "COMPLETED"
                      ? "verified"
                      : con.status === "ACTIVE"
                      ? "gold"
                      : "secondary"
                  }
                  size="sm"
                >
                  {con.status.replace("_", " ")}
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">{con.projectScope}</p>

              <div className="p-3 rounded-xl bg-muted/40 border border-border grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground text-[10px]">Total Contract</span>
                  <p className="font-bold text-foreground">₹{(con.totalConsultancyFee / 100000).toFixed(2)}L</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px]">Faculty (70%)</span>
                  <p className="font-bold text-emerald-600">
                    ₹{((con.totalConsultancyFee * 0.7) / 100000).toFixed(2)}L
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px]">Deadline</span>
                  <p className="font-medium text-foreground">{con.deliveryDeadline}</p>
                </div>
              </div>

              {/* Deliverables */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Contract Deliverables ({con.deliverables.filter((d) => d.isDelivered).length} /{" "}
                  {con.deliverables.length})
                </span>
                <div className="space-y-1">
                  {con.deliverables.map((del, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-lg bg-card border border-border flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        {del.isDelivered ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        ) : (
                          <Clock className="h-3.5 w-3.5 text-accent shrink-0" />
                        )}
                        <span className={del.isDelivered ? "text-foreground" : "text-muted-foreground"}>
                          {del.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground shrink-0">{del.dueDate}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
              <span className="text-[11px] text-muted-foreground">
                Invoices: {con.invoices.filter((i) => i.status === "PAID").length} Paid •{" "}
                {con.invoices.filter((i) => i.status === "PENDING").length} Pending
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => showToast(`✓ Generating GST Invoicing Statement for ${con.clientName}...`)}
                  leftIcon={<Download className="h-3.5 w-3.5" />}
                >
                  Invoicing Dossier
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* New Consultancy Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <Card variant="elevated" className="w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <PlusCircle className="h-4 w-4 text-emerald-600" /> New Industry Advisory Contract
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                ✕
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Client / Organization Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zandu Ayurveda / Arya Vaidya Pharmacy"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Industry Category</label>
                  <select
                    value={clientCategory}
                    onChange={(e) => setClientCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Ayush Pharma">Ayush Pharma</option>
                    <option value="Wellness Resort Chain">Wellness Resort Chain</option>
                    <option value="HealthTech Startup">HealthTech Startup</option>
                    <option value="Nutraceutical">Nutraceutical</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Total Advisory Fee (₹ INR)</label>
                  <input
                    type="number"
                    value={fee}
                    onChange={(e) => setFee(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex justify-between items-center">
                <span>Faculty Consultant (70%): <strong className="text-emerald-700 dark:text-emerald-300">₹{Math.round(fee * 0.7).toLocaleString()}</strong></span>
                <span>AIIA Institute (30%): <strong className="text-foreground">₹{Math.round(fee * 0.3).toLocaleString()}</strong></span>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Project Scope & Technical Deliverables</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe technical advisory scope, analytical tests, formulations or clinical evaluations..."
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Deliverables (Comma separated)</label>
                  <input
                    type="text"
                    value={deliverablesText}
                    onChange={(e) => setDeliverablesText(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Target Deadline</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-border flex justify-end gap-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Register Contract
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
