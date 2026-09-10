"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Building2,
  Calendar,
  UserCheck,
  FileText,
  KeyRound,
  Star,
  Award,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Sparkles,
  QrCode,
  Check,
  RefreshCw,
  Eye,
  Lock,
  FileCheck,
} from "lucide-react";
import { Card } from "@/components/cards/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  internshipLifecycleService,
  InternshipApplicationLifecycle,
  LifecycleStage,
  LIFECYCLE_STAGES_METADATA,
} from "@/lib/services/internshipLifecycleService";
import { formatINR } from "@/lib/utils/formatters";

type StakeholderRole = "STUDENT" | "INDUSTRY" | "SUPERVISOR";

export default function ApplicationLifecyclePage() {
  const params = useParams();
  const router = useRouter();

  const [app, setApp] = React.useState<InternshipApplicationLifecycle | null>(null);
  const [activePersona, setActivePersona] = React.useState<StakeholderRole>("STUDENT");
  const [otpInput, setOtpInput] = React.useState<string>("");
  const [otpError, setOtpError] = React.useState<string | null>(null);
  const [feedbackRating, setFeedbackRating] = React.useState<number>(5);
  const [feedbackComments, setFeedbackComments] = React.useState<string>(
    "Scholar Aarav Sharma demonstrated exceptional diagnostic acumen in Nadi Pariksha and meticulous inpatient documentation. Protocol compliance was 100%."
  );

  React.useEffect(() => {
    const data = internshipLifecycleService.getApplication();
    setApp(data);
  }, []);

  if (!app) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentStageMeta = LIFECYCLE_STAGES_METADATA.find((s) => s.stage === app.currentStage) || LIFECYCLE_STAGES_METADATA[0];

  const handleAdvanceStage = (nextStage: LifecycleStage) => {
    const updated = internshipLifecycleService.advanceToStage(nextStage);
    setApp({ ...updated });
  };

  const handleVerifyOtp = () => {
    if (!otpInput) {
      setOtpError("Please enter the 6-digit OTP");
      return;
    }
    const success = internshipLifecycleService.verifyOTP(otpInput);
    if (success) {
      setOtpError(null);
      const updated = internshipLifecycleService.getApplication();
      setApp({ ...updated });
    } else {
      setOtpError("Invalid verification code. Enter '894215' or supervisor code.");
    }
  };

  const handleSubmitFeedback = () => {
    const updated = internshipLifecycleService.submitFeedback({
      industryRating: feedbackRating,
      clinicalAcumenRating: feedbackRating,
      bedsideConductRating: feedbackRating,
      preceptorComments: feedbackComments,
      studentExperienceRating: 5,
      studentReflection: "Invaluable clinical immersion with exposure to over 120 metabolic disorder inpatients and rigorous Shodhana protocols.",
      submittedAt: new Date().toISOString(),
    });
    setApp({ ...updated });
  };

  const handleResetDemo = () => {
    const fresh = internshipLifecycleService.resetDemo();
    setApp({ ...fresh });
    setOtpInput("");
    setOtpError(null);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Breadcrumb & Title */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
          <Link href="/student" className="hover:text-foreground transition-colors">
            Student Command Center
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/student/opportunities" className="hover:text-foreground transition-colors">
            Opportunities
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-primary font-semibold">Application Lifecycle</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2.5">
              <span>Internship & Verification Lifecycle</span>
              <Badge variant="verified" size="sm" icon={<ShieldCheck className="h-3 w-3" />}>
                End-to-End Collaboration
              </Badge>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Official 10-stage progression tracking student application, hospital shortlisting, faculty supervisor endorsement, bedside OTP verification, and passport minting.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleResetDemo}
            leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
            className="text-xs shrink-0 self-start sm:self-auto"
          >
            Reset Demo Flow
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MULTI-STAKEHOLDER ROLE SWITCHER                                            */}
      {/* ========================================================================= */}
      <Card variant="bordered" className="p-4 rounded-2xl bg-muted/40 border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-primary" />
          <span className="font-bold text-foreground">Interactive Evaluator Perspective:</span>
          <span className="text-muted-foreground hidden md:inline">Switch views to simulate all 3 stakeholders</span>
        </div>

        <div className="flex items-center gap-1.5 bg-card p-1 rounded-xl border border-border/80 shrink-0">
          <button
            onClick={() => setActivePersona("STUDENT")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activePersona === "STUDENT" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            🎓 Student (Aarav)
          </button>
          <button
            onClick={() => setActivePersona("INDUSTRY")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activePersona === "INDUSTRY" ? "bg-accent text-accent-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            🏥 Industry (AIIA Hospital)
          </button>
          <button
            onClick={() => setActivePersona("SUPERVISOR")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activePersona === "SUPERVISOR" ? "bg-secondary text-secondary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            👨‍🏫 Supervisor (Faculty)
          </button>
        </div>
      </Card>

      {/* ========================================================================= */}
      {/* 10-STAGE VISUAL TIMELINE STEPPER                                          */}
      {/* ========================================================================= */}
      <Card variant="default" className="p-6 rounded-3xl border-border/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-border/70">
          <div>
            <p className="text-[10px] font-mono uppercase font-bold text-primary tracking-widest">
              STEP-BY-STEP ACADEMIA-INDUSTRY LIFECYCLE
            </p>
            <h2 className="text-base font-bold text-foreground">
              Current Stage {currentStageMeta.number} of 9: {currentStageMeta.label}
            </h2>
          </div>
          <Badge variant="gold" size="sm" icon={<Sparkles className="h-3 w-3" />}>
            Active Actor: {currentStageMeta.actor}
          </Badge>
        </div>

        {/* Horizontal Timeline Scroller */}
        <div className="overflow-x-auto no-scrollbar pb-2">
          <div className="flex items-center min-w-[780px] justify-between relative">
            {/* Background connecting track */}
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-border -z-0" />

            {LIFECYCLE_STAGES_METADATA.map((stageItem, idx) => {
              const isPast = stageItem.number < currentStageMeta.number;
              const isCurrent = stageItem.stage === app.currentStage;
              const isUpcoming = stageItem.number > currentStageMeta.number;

              return (
                <div key={stageItem.stage} className="flex flex-col items-center text-center space-y-1.5 z-10 px-2 min-w-[85px]">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all ${
                      isPast
                        ? "bg-emerald-600 text-white shadow-xs"
                        : isCurrent
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/25 scale-110 shadow-sm"
                        : "bg-card border-2 border-border text-muted-foreground"
                    }`}
                  >
                    {isPast ? <Check className="h-4 w-4" /> : stageItem.number}
                  </div>
                  <span
                    className={`text-[11px] font-bold leading-tight ${
                      isCurrent ? "text-primary" : isPast ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {stageItem.label}
                  </span>
                  <span className="text-[9px] font-mono text-muted-foreground uppercase">
                    {stageItem.actor}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* ========================================================================= */}
      {/* ACTIVE STAGE INTERACTIVE ACTION CENTER                                     */}
      {/* ========================================================================= */}
      <Card variant="elevated" className="p-6 sm:p-8 rounded-3xl border-primary/30 shadow-md space-y-6">
        {/* Opportunity Context Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-border/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" size="sm">
                {app.categoryLabel}
              </Badge>
              <Badge variant="verified" size="sm">
                {app.matchScore}% Skill Match
              </Badge>
            </div>
            <h3 className="text-xl font-extrabold text-foreground">{app.opportunityTitle}</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-accent" />
              <span>{app.organization}</span> • <span>{app.location}</span>
            </p>
          </div>

          <div className="text-right text-xs shrink-0 bg-muted/40 p-3 rounded-2xl border border-border/70">
            <span className="text-muted-foreground text-[10px] uppercase font-mono block">Stipend Accredited</span>
            <span className="text-base font-extrabold text-foreground">{formatINR(app.stipendMonthlyInr)}/mo</span>
            <span className="text-[10px] text-muted-foreground block">{app.duration}</span>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* STAGE 1: APPLIED                                                        */}
        {/* ----------------------------------------------------------------------- */}
        {app.currentStage === "APPLIED" && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 space-y-2 text-xs">
              <p className="font-bold text-foreground text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Application Submitted via Setu Passport</span>
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Candidate <strong>{app.studentName}</strong> ({app.degree}) submitted credentials. Attached Competency Passport Hash: <code className="font-mono text-primary">{app.attachedPassportHash.slice(0, 16)}...</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border space-y-2 text-xs">
              <p className="font-bold text-foreground">Next Action: Industry Recruiter Review</p>
              <p className="text-muted-foreground">
                Hospital review committee evaluates candidate match score, verified clinical hours (450 hrs), and competency credentials.
              </p>
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAdvanceStage("INDUSTRY_REVIEW")}
                  rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                  className="text-xs"
                >
                  Simulate: Hospital Commences Review
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* STAGE 2: INDUSTRY REVIEW                                                */}
        {/* ----------------------------------------------------------------------- */}
        {app.currentStage === "INDUSTRY_REVIEW" && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20 space-y-2 text-xs">
              <p className="font-bold text-foreground text-sm flex items-center gap-2">
                <Building2 className="h-4 w-4 text-accent" />
                <span>Industry Preceptor Review in Progress</span>
              </p>
              <p className="text-muted-foreground">
                Reviewer: <strong>{app.industryReviewerName}</strong> ({app.industryReviewerTitle}).
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                <div>Skill Compatibility: <strong className="text-emerald-600">92% Match</strong></div>
                <div>Clinical Hours Verified: <strong className="text-foreground">450 Hours Logged</strong></div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="gold"
                size="sm"
                onClick={() => handleAdvanceStage("SHORTLISTED")}
                rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                className="text-xs"
              >
                Accept & Shortlist Candidate
              </Button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* STAGE 3: SHORTLISTED                                                    */}
        {/* ----------------------------------------------------------------------- */}
        {app.currentStage === "SHORTLISTED" && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2 text-xs">
              <p className="font-bold text-foreground text-sm flex items-center gap-2">
                <Award className="h-4 w-4 text-emerald-600" />
                <span>Candidate Shortlisted by AIIA Hospital!</span>
              </p>
              <p className="text-muted-foreground">
                Official residency posting invitation issued to scholar. Under NCISM regulations, this clinical placement now requires institutional academic endorsement from the candidate&apos;s faculty supervisor.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border space-y-2 text-xs">
              <p className="font-bold text-foreground">Supervisor Endorsement Required</p>
              <p className="text-muted-foreground">
                Supervisor: <strong>{app.facultySupervisorName}</strong> ({app.facultySupervisorTitle}, {app.facultyInstitution}).
              </p>
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAdvanceStage("SUPERVISOR_ENDORSED")}
                  rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                  className="text-xs"
                >
                  Supervisor Grants Institutional Endorsement (NOC)
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* STAGE 4: SUPERVISOR ENDORSED                                            */}
        {/* ----------------------------------------------------------------------- */}
        {app.currentStage === "SUPERVISOR_ENDORSED" && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/25 space-y-2 text-xs">
              <p className="font-bold text-foreground text-sm flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-secondary" />
                <span>Institutional Endorsement Granted</span>
              </p>
              <p className="text-muted-foreground">
                Prof. Dr. Meera Nambiar verified academic standing (Final Year BAMS, 0 academic backlog, 450 verified clinical hours). Digital Signature Hash: <code className="font-mono text-secondary">{app.supervisorDigitalSignature}</code>.
              </p>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleAdvanceStage("ACTIVE_INTERNSHIP")}
                rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                className="text-xs"
              >
                Commence Clinical Residency (Start Internship)
              </Button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* STAGE 5: ACTIVE INTERNSHIP                                              */}
        {/* ----------------------------------------------------------------------- */}
        {app.currentStage === "ACTIVE_INTERNSHIP" && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/25 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Clinical Residency Active in AIIA Wards</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 font-mono font-bold text-[10px]">
                  ROTATION ACTIVE
                </span>
              </div>
              <p className="text-muted-foreground">
                Scholar is conducting inpatient bedside rounds, Rogi Pariksha case logbooks, and standardized SOAP entries.
              </p>
            </div>

            {/* Task Progress Checklist */}
            <div className="space-y-2 text-xs">
              <p className="font-bold text-foreground uppercase tracking-wider text-[11px]">
                Inpatient Deliverables & Milestones:
              </p>
              <div className="space-y-2">
                {app.tasks.map((task) => (
                  <div key={task.id} className="p-3 rounded-xl bg-card border border-border flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <p className="font-bold text-foreground">{task.title}</p>
                      <p className="text-[11px] text-accent font-serif italic">{task.sanskrit}</p>
                      <p className="text-muted-foreground text-[11px]">{task.description}</p>
                    </div>
                    <Badge variant="verified" size="sm" className="shrink-0 text-[10px]">
                      {task.completedCount}/{task.targetCount} Logged
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleAdvanceStage("TASKS_COMPLETED")}
                rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                className="text-xs"
              >
                Submit All Clinical Task Logs for Final Sign-off
              </Button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* STAGE 6: TASKS COMPLETED                                                */}
        {/* ----------------------------------------------------------------------- */}
        {app.currentStage === "TASKS_COMPLETED" && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2 text-xs">
              <p className="font-bold text-foreground text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>All 3 Inpatient Tasks Successfully Completed!</span>
              </p>
              <p className="text-muted-foreground">
                120 patient examinations, 25 SOAP notes, and 15 Shodhana safety procedures logged in hospital records.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border space-y-2 text-xs">
              <p className="font-bold text-foreground">Proceed to Dual-Factor Verification</p>
              <p className="text-muted-foreground">
                Supervisor and hospital preceptor authenticate completion using mobile OTP or QR scanning at bedside.
              </p>
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAdvanceStage("OTP_QR_VERIFIED")}
                  rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                  className="text-xs"
                >
                  Proceed to OTP / QR Sign-Off
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* STAGE 7: OTP / QR VERIFICATION (EXACT USER PROMPT REQUIREMENT)           */}
        {/* ----------------------------------------------------------------------- */}
        {app.currentStage === "OTP_QR_VERIFIED" && !app.otpVerifiedAt && (
          <div className="space-y-6">
            <div className="text-center space-y-1.5 pb-2">
              <div className="h-12 w-12 rounded-2xl bg-secondary/15 text-secondary border border-secondary/30 flex items-center justify-center mx-auto">
                <KeyRound className="h-6 w-6" />
              </div>
              <h4 className="text-base font-bold text-foreground">Dual-Factor Clinical OTP / QR Verification</h4>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                Official Ministry of Ayush protocol: The institutional faculty supervisor confirms task logbook integrity using the preceptor verification token.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Option A: Enter 6-Digit OTP */}
              <div className="p-5 rounded-2xl bg-card border border-border/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <Lock className="h-4 w-4 text-primary" />
                  <span>Method A: Enter Ayush Supervisor OTP</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  A 6-digit cryptographic verification code has been dispatched to Faculty Supervisor <strong>Prof. Dr. Meera Nambiar</strong>.
                </p>

                <div className="p-2.5 rounded-xl bg-muted/40 font-mono text-center text-xs border border-border">
                  Supervisor Token: <strong className="text-primary tracking-widest text-sm">{app.otpCode}</strong>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={otpInput}
                    onChange={(e) => { setOtpInput(e.target.value); setOtpError(null); }}
                    placeholder="Enter 6-digit OTP (894215)"
                    className="w-full p-2.5 rounded-xl bg-muted/30 border border-border text-center font-mono text-base font-bold tracking-widest text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {otpError && <p className="text-[11px] text-destructive font-semibold text-center">{otpError}</p>}
                  <Button variant="primary" size="sm" onClick={handleVerifyOtp} className="w-full text-xs">
                    Verify & Attest Clinical Log
                  </Button>
                </div>
              </div>

              {/* Option B: Ward Bedside QR Scan */}
              <div className="p-5 rounded-2xl bg-card border border-border/80 space-y-3 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <QrCode className="h-4 w-4 text-accent" />
                    <span>Method B: Bedside QR Code Attestation</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Hospital department terminal generates an immutable cryptographic verification hash.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-border/80 flex items-center justify-center space-x-3 text-slate-800">
                  <div className="h-20 w-20 border-2 border-slate-800 rounded-lg p-1 bg-slate-50 flex items-center justify-center">
                    <QrCode className="h-14 w-14 text-slate-800" />
                  </div>
                  <div className="text-[10px] font-mono text-slate-600">
                    <p className="font-bold">AIIA WARD SCANNER</p>
                    <p>Hash: {app.qrVerificationHash.slice(0, 12)}...</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setOtpInput("894215");
                    internshipLifecycleService.verifyOTP("894215");
                    setApp({ ...internshipLifecycleService.getApplication() });
                  }}
                  className="w-full text-xs"
                >
                  Simulate Bedside QR Attestation
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* STAGE 8: BILATERAL FEEDBACK                                             */}
        {/* ----------------------------------------------------------------------- */}
        {app.currentStage === "OTP_QR_VERIFIED" && app.otpVerifiedAt && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-1 text-xs">
              <p className="font-bold text-foreground text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>OTP Authenticated Successfully! (Code: 894215)</span>
              </p>
              <p className="text-muted-foreground">
                Task completion verified by Prof. Dr. Meera Nambiar. Now proceeding to bilateral feedback.
              </p>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleAdvanceStage("FEEDBACK_SUBMITTED")}
                rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                className="text-xs"
              >
                Complete Bilateral 360° Feedback
              </Button>
            </div>
          </div>
        )}

        {app.currentStage === "FEEDBACK_SUBMITTED" && !app.passportMintedAt && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-foreground">Bilateral 360° Feedback & Performance Evaluation</h4>
                <p className="text-xs text-muted-foreground">
                  Industry preceptors grade clinical acumen, bedside ethics, and institutional punctuality.
                </p>
              </div>
              <Badge variant="secondary" size="sm">
                Evaluation Pending Sign-Off
              </Badge>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border/80 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">Preceptor Overall Rating:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      onClick={() => setFeedbackRating(star)}
                      className={`h-5 w-5 cursor-pointer ${
                        star <= feedbackRating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="font-bold font-mono ml-2 text-foreground">{feedbackRating}.0 / 5.0</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-foreground block">Clinical Preceptor Remarks:</label>
                <textarea
                  value={feedbackComments}
                  onChange={(e) => setFeedbackComments(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-xl bg-muted/40 border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="gold"
                size="sm"
                onClick={() => {
                  handleSubmitFeedback();
                  handleAdvanceStage("PASSPORT_MINTED");
                }}
                rightIcon={<Award className="h-3.5 w-3.5" />}
                className="text-xs"
              >
                Submit Feedback & Mint to Competency Passport
              </Button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* STAGE 9: PASSPORT MINTED (FINAL OUTCOME)                                */}
        {/* ----------------------------------------------------------------------- */}
        {app.currentStage === "PASSPORT_MINTED" && (
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/15 via-card to-card border-2 border-emerald-500/40 space-y-5 text-center">
            <div className="h-16 w-16 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-sm">
              <Award className="h-8 w-8" />
            </div>

            <div className="space-y-1">
              <Badge variant="verified" size="sm" icon={<Check className="h-3.5 w-3.5" />}>
                Internship Verified & Officially Minted
              </Badge>
              <h3 className="text-xl sm:text-2xl font-extrabold text-foreground font-serif">
                Credential Added to Competency Passport
              </h3>
              <p className="text-xs text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Full 10-stage lifecycle completed! Scholar <strong>{app.studentName}</strong> has been credited with <strong>+{app.creditedClinicalHours} Verified Clinical Hours</strong> and the accredited title: <em>&ldquo;{app.mintedCompetencyBadgeName}&rdquo;</em>.
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 rounded-2xl bg-card border border-border/80 text-xs text-left space-y-2 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Attached Passport ID:</span>
                <span className="font-bold text-foreground">NCISM-AYU-2023-09418</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Preceptor Signature:</span>
                <span className="text-emerald-600 font-bold">{app.supervisorDigitalSignature}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">OTP Validation Stamp:</span>
                <span className="text-foreground">Ayush-OTP #{app.otpCode} (Verified)</span>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <Link href="/student/passport">
                <Button variant="primary" size="sm" rightIcon={<ExternalLink className="h-3.5 w-3.5" />} className="text-xs">
                  View Updated Competency Passport
                </Button>
              </Link>
              <Link href="/student/opportunities">
                <Button variant="outline" size="sm" className="text-xs">
                  Back to Opportunities
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
