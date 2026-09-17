"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  ShieldCheck,
  QrCode,
  CheckCircle2,
  Share2,
  Printer,
  ExternalLink,
  Lock,
  FileCheck,
  Building2,
  Calendar,
  Clock,
  Briefcase,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Download,
  Copy,
  Check,
  X,
  FileText,
  Search,
  BookOpen,
  ArrowRight,
  AlertCircle,
  Activity,
  Layers,
  Fingerprint,
} from "lucide-react";
import { Card } from "@/components/cards/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SecureDocumentUploadModal } from "@/components/security/SecureDocumentUploadModal";
import {
  passportService,
  StudentPassportData,
  VerifiedSkillItem,
  PortfolioCertification,
  PortfolioProject,
  PortfolioInternship,
  PortfolioAchievement,
} from "@/lib/services/passportService";

type PortfolioTab = "overview" | "skills" | "certifications" | "projects" | "internships" | "achievements";

export default function CompetencyPassportPage() {
  const [passport, setPassport] = React.useState<StudentPassportData | null>(null);
  const [activeTab, setActiveTab] = React.useState<PortfolioTab>("overview");
  const [showQrModal, setShowQrModal] = React.useState(false);
  const [showLedgerModal, setShowLedgerModal] = React.useState(false);
  const [showUploadModal, setShowUploadModal] = React.useState(false);
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [copiedHash, setCopiedHash] = React.useState(false);

  React.useEffect(() => {
    const data = passportService.getPassportData();
    setPassport(data);
  }, []);

  if (!passport) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Loading verified competency credentials...</p>
        </div>
      </div>
    );
  }

  const { corePassportSkills } = passport;

  const handleCopyLink = () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/verify/${passport.passportId}` : passport.qrVerificationUrl;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(passport.cryptographicHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2500);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-8 pb-16 print:p-0 print:space-y-4">
      {/* Top Breadcrumb & Print Exclude Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
            <Link href="/student" className="hover:text-foreground transition-colors">
              Student Command Center
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-primary font-semibold">Competency Passport</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2.5">
            <span>Competency Passport</span>
            <Badge variant="verified" size="sm" icon={<ShieldCheck className="h-3 w-3" />}>
              Official NCISM Portfolio
            </Badge>
          </h1>
          <p className="text-sm text-muted-foreground max-w-3xl">
            Cryptographically stamped digital portfolio unifying verified clinical skills, accredited certifications,
            applied projects, hospital internships, and academic achievements.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Printer className="h-4 w-4" />}
            className="text-xs"
          >
            Export / Print PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowQrModal(true)}
            leftIcon={<QrCode className="h-4 w-4" />}
            className="text-xs"
          >
            QR Verification
          </Button>
          <Button
            variant="gold"
            size="sm"
            onClick={() => setShowUploadModal(true)}
            leftIcon={<Lock className="h-4 w-4" />}
            className="text-xs"
          >
            Upload to Vault
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleCopyLink}
            leftIcon={copiedLink ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
            className="text-xs"
          >
            {copiedLink ? "Link Copied!" : "Share Portfolio"}
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* OFFICIAL PASSPORT BANNER & STUDENT IDENTITY HEADER                         */}
      {/* ========================================================================= */}
      <Card
        variant="default"
        className="p-6 sm:p-8 rounded-3xl border-primary/25 bg-gradient-to-br from-card via-card to-primary/5 shadow-md relative overflow-hidden"
      >
        {/* Subtle Watermark Emblem */}
        <div className="absolute -right-8 -bottom-8 pointer-events-none opacity-5 dark:opacity-10">
          <Award className="h-80 w-80 text-primary" />
        </div>

        {/* National Ayush Crest Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border/70">
          <div className="flex items-center gap-3.5">
            <div className="relative h-11 w-11 rounded-2xl overflow-hidden ring-2 ring-amber-400/60 bg-[#efe1c8] flex items-center justify-center shrink-0 shadow-md">
              <Image
                src="/images/ayu-setu-emblem.png"
                alt="Ayu-Setu Emblem"
                width={44}
                height={44}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-primary uppercase">
                  MINISTRY OF AYUSH • ALL INDIA INSTITUTE OF AYURVEDA
                </span>
                <span className="hidden sm:inline text-muted-foreground">•</span>
                <span className="text-[10px] font-mono text-muted-foreground">NCISM SEC. 18 COMPLIANT</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground font-serif">
                AYU-SETU COMPETENCY PASSPORT
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setShowLedgerModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted/60 hover:bg-muted text-xs font-mono text-muted-foreground border border-border/80 transition-colors"
              title="Inspect Cryptographic Ledger Proof"
            >
              <Lock className="h-3.5 w-3.5 text-primary" />
              <span>Block #{passport.ledgerBlockNumber}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </button>
          </div>
        </div>

        {/* Student Credential Profile Row */}
        <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Identity Info */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary/25 via-secondary/20 to-accent/20 border-2 border-primary/40 flex items-center justify-center text-2xl font-bold font-serif text-primary shadow-sm">
                AS
              </div>
              <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-background border border-border text-emerald-500 shadow-sm">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">{passport.studentName}</h3>
                <Badge variant="verified" size="sm" icon={<ShieldCheck className="h-3 w-3" />}>
                  Verified Ayush Scholar
                </Badge>
                <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                  {passport.enrollmentNumber}
                </Badge>
              </div>

              <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                {passport.degree} • <span className="text-foreground">{passport.currentYear}</span>
              </p>

              <p className="text-xs text-accent font-medium flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" />
                <span>{passport.institution}</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="lg:col-span-4 grid grid-cols-3 gap-2.5 bg-card/60 p-3.5 rounded-2xl border border-border/80 text-center">
            <div className="space-y-0.5">
              <p className="text-lg sm:text-xl font-extrabold text-primary">{passport.totalVerifiedSkills}</p>
              <p className="text-[10px] font-medium text-muted-foreground uppercase">Skills Verified</p>
            </div>
            <div className="space-y-0.5 border-x border-border/60">
              <p className="text-lg sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {passport.totalClinicalHours}
              </p>
              <p className="text-[10px] font-medium text-muted-foreground uppercase">Clinical Hours</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-lg sm:text-xl font-extrabold text-secondary">{passport.readinessScore}%</p>
              <p className="text-[10px] font-medium text-muted-foreground uppercase">Career Readiness</p>
            </div>
          </div>
        </div>

        {/* Cryptographic Hash Bar */}
        <div className="mt-6 pt-4 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground font-mono">
            <Fingerprint className="h-4 w-4 text-primary shrink-0" />
            <span className="truncate">Attestation Hash: {passport.cryptographicHash}</span>
          </div>
          <button
            onClick={handleCopyHash}
            className="text-[11px] text-primary hover:underline font-mono inline-flex items-center gap-1 self-start sm:self-auto"
          >
            {copiedHash ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            {copiedHash ? "Hash Copied" : "Copy Hash"}
          </button>
        </div>
      </Card>

      {/* ========================================================================= */}
      {/* EXACT USER PROMPT CARD: VAIDYA SETU COMPETENCY PASSPORT                    */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary font-mono flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>CORE CREDENTIAL EMBLEM</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Directly verified foundational competencies certified by institutional faculty heads
            </p>
          </div>
          <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
            4 / 4 Attested
          </span>
        </div>

        {/* Golden Bordered Core Passport Box */}
        <Card
          variant="elevated"
          className="p-6 sm:p-8 rounded-3xl border-2 border-secondary/40 bg-gradient-to-b from-card via-card to-secondary/5 shadow-lg relative overflow-hidden"
        >
          {/* Header Title inside Passport Box */}
          <div className="text-center pb-6 border-b border-border/80 space-y-2">
            <div className="flex justify-center mb-1">
              <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-amber-400/60 shadow-xl bg-[#efe1c8] flex items-center justify-center">
                <Image
                  src="/images/ayu-setu-emblem.png"
                  alt="Ayu-Setu Emblem"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <p className="text-xs sm:text-sm font-mono tracking-widest text-muted-foreground font-bold uppercase">
              AYU-SETU
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-serif">
              COMPETENCY PASSPORT
            </h2>
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="h-1 w-8 bg-secondary/60 rounded-full" />
              <ShieldCheck className="h-4 w-4 text-secondary" />
              <span className="h-1 w-8 bg-secondary/60 rounded-full" />
            </div>
          </div>

          {/* 4 Core Verified Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {/* 1. Clinical Documentation */}
            <div className="p-5 rounded-2xl bg-card border-2 border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-200 shadow-sm flex flex-col justify-between space-y-4 group">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-700 dark:text-emerald-400 text-xs font-bold tracking-tight">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>✓ Verified</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-extrabold text-foreground group-hover:text-primary transition-colors">
                    {corePassportSkills.clinicalDocumentation.name}
                  </h4>
                  <p className="text-[11px] text-accent font-serif italic mt-0.5">
                    {corePassportSkills.clinicalDocumentation.sanskrit}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {corePassportSkills.clinicalDocumentation.evidenceDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-border/70 space-y-1 text-[11px] text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Proficiency:</span>
                  <span className="font-bold text-foreground">
                    {corePassportSkills.clinicalDocumentation.proficiencyScore}% ({corePassportSkills.clinicalDocumentation.level})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Attested by:</span>
                  <span className="font-medium text-foreground truncate max-w-[120px]">
                    {corePassportSkills.clinicalDocumentation.verifiedBy}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Case History */}
            <div className="p-5 rounded-2xl bg-card border-2 border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-200 shadow-sm flex flex-col justify-between space-y-4 group">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="p-2 rounded-xl bg-secondary/15 text-secondary border border-secondary/30">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-700 dark:text-emerald-400 text-xs font-bold tracking-tight">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>✓ Verified</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-extrabold text-foreground group-hover:text-secondary transition-colors">
                    {corePassportSkills.caseHistory.name}
                  </h4>
                  <p className="text-[11px] text-accent font-serif italic mt-0.5">
                    {corePassportSkills.caseHistory.sanskrit}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {corePassportSkills.caseHistory.evidenceDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-border/70 space-y-1 text-[11px] text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Proficiency:</span>
                  <span className="font-bold text-foreground">
                    {corePassportSkills.caseHistory.proficiencyScore}% ({corePassportSkills.caseHistory.level})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Attested by:</span>
                  <span className="font-medium text-foreground truncate max-w-[120px]">
                    {corePassportSkills.caseHistory.verifiedBy}
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Panchakarma Safety */}
            <div className="p-5 rounded-2xl bg-card border-2 border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-200 shadow-sm flex flex-col justify-between space-y-4 group">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="p-2 rounded-xl bg-accent/15 text-accent border border-accent/30">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-700 dark:text-emerald-400 text-xs font-bold tracking-tight">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>✓ Verified</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-extrabold text-foreground group-hover:text-accent transition-colors">
                    {corePassportSkills.panchakarmaSafety.name}
                  </h4>
                  <p className="text-[11px] text-accent font-serif italic mt-0.5">
                    {corePassportSkills.panchakarmaSafety.sanskrit}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {corePassportSkills.panchakarmaSafety.evidenceDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-border/70 space-y-1 text-[11px] text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Proficiency:</span>
                  <span className="font-bold text-foreground">
                    {corePassportSkills.panchakarmaSafety.proficiencyScore}% ({corePassportSkills.panchakarmaSafety.level})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Attested by:</span>
                  <span className="font-medium text-foreground truncate max-w-[120px]">
                    {corePassportSkills.panchakarmaSafety.verifiedBy}
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Research Project */}
            <div className="p-5 rounded-2xl bg-card border-2 border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-200 shadow-sm flex flex-col justify-between space-y-4 group">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-700 dark:text-emerald-400 text-xs font-bold tracking-tight">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>✓ Verified</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-extrabold text-foreground group-hover:text-primary transition-colors">
                    {corePassportSkills.researchProject.name}
                  </h4>
                  <p className="text-[11px] text-accent font-serif italic mt-0.5">
                    {corePassportSkills.researchProject.sanskrit}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {corePassportSkills.researchProject.evidenceDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-border/70 space-y-1 text-[11px] text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Proficiency:</span>
                  <span className="font-bold text-foreground">
                    {corePassportSkills.researchProject.proficiencyScore}% ({corePassportSkills.researchProject.level})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Attested by:</span>
                  <span className="font-medium text-foreground truncate max-w-[120px]">
                    {corePassportSkills.researchProject.verifiedBy}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* ========================================================================= */}
      {/* 5-PART DIGITAL PORTFOLIO NAVIGATION TABS                                   */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        <div className="border-b border-border/80 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 print:hidden">
          {[
            { id: "overview", label: "Executive Overview", count: null },
            { id: "skills", label: "Verified Skills", count: passport.verifiedSkills.length },
            { id: "certifications", label: "Certifications", count: passport.certifications.length },
            { id: "projects", label: "Projects", count: passport.projects.length },
            { id: "internships", label: "Internships", count: passport.internships.length },
            { id: "achievements", label: "Achievements", count: passport.achievements.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as PortfolioTab)}
              className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl transition-all whitespace-nowrap border-b-2 flex items-center gap-2 ${
                activeTab === tab.id
                  ? "border-primary text-primary bg-primary/5 font-bold"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    activeTab === tab.id
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* TAB 1: EXECUTIVE OVERVIEW                                               */}
        {/* ----------------------------------------------------------------------- */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Portfolio Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card variant="default" className="p-5 space-y-2 border-border/80">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-semibold uppercase font-mono">Skills Attested</span>
                  <Award className="h-4 w-4 text-primary" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-foreground">{passport.verifiedSkills.length}</span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">100% Verified</span>
                </div>
                <p className="text-[11px] text-muted-foreground">Clinical, Panchakarma & Research competencies</p>
              </Card>

              <Card variant="default" className="p-5 space-y-2 border-border/80">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-semibold uppercase font-mono">Clinical Postings</span>
                  <Clock className="h-4 w-4 text-secondary" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-foreground">{passport.totalClinicalHours}</span>
                  <span className="text-xs text-muted-foreground">Hours</span>
                </div>
                <p className="text-[11px] text-muted-foreground">Across AIIA Hospital & CCRAS research wards</p>
              </Card>

              <Card variant="default" className="p-5 space-y-2 border-border/80">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-semibold uppercase font-mono">National Certs</span>
                  <ShieldCheck className="h-4 w-4 text-accent" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-foreground">{passport.certifications.length}</span>
                  <span className="text-xs text-muted-foreground">Credentials</span>
                </div>
                <p className="text-[11px] text-muted-foreground">Accredited by NCISM, AIIA, CCRAS & NABH</p>
              </Card>

              <Card variant="default" className="p-5 space-y-2 border-border/80">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-semibold uppercase font-mono">Distinctions</span>
                  <Sparkles className="h-4 w-4 text-secondary" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-foreground">{passport.achievements.length}</span>
                  <span className="text-xs text-secondary font-semibold">1st Rank Gold</span>
                </div>
                <p className="text-[11px] text-muted-foreground">National Olympiad & JAIM publication</p>
              </Card>
            </div>

            {/* Quick Glimpse into Other Tracks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Latest Certifications Preview */}
              <Card variant="default" className="p-5 space-y-4 border-border/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-bold text-foreground">Accredited Certifications</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab("certifications")}
                    className="text-xs text-primary hover:underline font-semibold"
                  >
                    View All ({passport.certifications.length})
                  </button>
                </div>
                <div className="space-y-2.5">
                  {passport.certifications.slice(0, 3).map((cert) => (
                    <div
                      key={cert.id}
                      className="p-3 rounded-xl bg-card border border-border/70 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <p className="font-bold text-foreground">{cert.title}</p>
                        <p className="text-[11px] text-muted-foreground">{cert.issuingAuthority}</p>
                      </div>
                      <Badge variant="outline" size="sm" className="shrink-0 font-mono text-[10px]">
                        {cert.certificateNumber}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Latest Applied Projects Preview */}
              <Card variant="default" className="p-5 space-y-4 border-border/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-secondary" />
                    <h3 className="text-sm font-bold text-foreground">Applied Projects & Research</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab("projects")}
                    className="text-xs text-secondary hover:underline font-semibold"
                  >
                    View All ({passport.projects.length})
                  </button>
                </div>
                <div className="space-y-2.5">
                  {passport.projects.slice(0, 3).map((proj) => (
                    <div
                      key={proj.id}
                      className="p-3 rounded-xl bg-card border border-border/70 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <p className="font-bold text-foreground">{proj.title}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {proj.role} • {proj.organization}
                        </p>
                      </div>
                      <Badge variant="verified" size="sm" className="shrink-0 text-[10px]">
                        ✓ Verified
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* TAB 2: VERIFIED SKILLS                                                  */}
        {/* ----------------------------------------------------------------------- */}
        {activeTab === "skills" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-foreground">All Verified Skills & Competencies</h3>
                <p className="text-xs text-muted-foreground">
                  Each skill has been rigorously tested via practical exam, EHR log audit, or case viva by senior AYUSH faculty.
                </p>
              </div>
              <Badge variant="verified" size="sm" icon={<CheckCircle2 className="h-3 w-3" />}>
                {passport.verifiedSkills.length} Attested Skills
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {passport.verifiedSkills.map((skill) => (
                <Card
                  key={skill.id}
                  variant="default"
                  className="p-5 rounded-2xl border-border/80 space-y-3 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold text-foreground">{skill.name}</h4>
                      <p className="text-xs text-accent font-serif italic">{skill.sanskrit}</p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold shrink-0">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>✓ Verified</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {skill.evidenceDescription}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] p-2.5 rounded-xl bg-muted/40 border border-border/60">
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase">Proficiency</span>
                      <span className="font-bold text-foreground">{skill.proficiencyScore}% ({skill.level})</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase">Applied Hours</span>
                      <span className="font-bold text-foreground">{skill.clinicalHoursApplied} Hours</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase">Supervisor</span>
                      <span className="font-medium text-foreground truncate block">{skill.verifiedBy}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase">Date Attested</span>
                      <span className="font-mono text-foreground">{skill.verifiedDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1">
                    <span className="font-mono truncate max-w-[200px]">Sig: {skill.digitalSignatureHash}</span>
                    <span className="text-primary font-semibold">{skill.institution}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* TAB 3: CERTIFICATIONS                                                   */}
        {/* ----------------------------------------------------------------------- */}
        {activeTab === "certifications" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-foreground">Accredited AYUSH Certifications</h3>
                <p className="text-xs text-muted-foreground">
                  Official certificates issued by statutory national bodies including NCISM, CCRAS, and AIIA.
                </p>
              </div>
              <Badge variant="verified" size="sm">
                {passport.certifications.length} Active Certificates
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {passport.certifications.map((cert) => (
                <Card
                  key={cert.id}
                  variant="default"
                  className="p-5 rounded-2xl border-border/80 space-y-4 hover:border-secondary/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <Badge variant="secondary" size="sm" className="font-mono text-[10px]">
                        {cert.accreditationBody} Accredited
                      </Badge>
                      <h4 className="text-sm font-bold text-foreground">{cert.title}</h4>
                      <p className="text-xs text-muted-foreground">{cert.issuingAuthority}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-secondary/15 text-secondary border border-secondary/30 shrink-0">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Credential ID:</span>
                      <span className="font-mono font-bold text-foreground">{cert.certificateNumber}</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Issued Date:</span>
                      <span className="font-mono text-foreground">{cert.issueDate}</span>
                    </div>
                    {cert.grade && (
                      <div className="flex items-center justify-between text-muted-foreground">
                        <span>Evaluation Distinction:</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">{cert.grade}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
                      <Lock className="h-3.5 w-3.5 text-primary" />
                      <span>Seal: {cert.digitalSealHash.slice(0, 10)}...</span>
                    </div>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-semibold inline-flex items-center gap-1 text-[11px]"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* TAB 4: PROJECTS                                                         */}
        {/* ----------------------------------------------------------------------- */}
        {activeTab === "projects" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-foreground">Applied Projects & Clinical Audits</h3>
                <p className="text-xs text-muted-foreground">
                  Applied research initiatives, clinical SOP documentation audits, and laboratory extractions.
                </p>
              </div>
              <Badge variant="verified" size="sm">
                {passport.projects.length} Verified Projects
              </Badge>
            </div>

            <div className="space-y-4">
              {passport.projects.map((project) => (
                <Card
                  key={project.id}
                  variant="default"
                  className="p-6 rounded-2xl border-border/80 space-y-4 hover:border-primary/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" size="sm" className="text-[10px] font-mono">
                          {project.category.replace("_", " ")}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{project.duration}</span>
                      </div>
                      <h4 className="text-base font-bold text-foreground">{project.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {project.role} • <span className="text-foreground font-medium">{project.organization}</span>
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-700 dark:text-emerald-400 text-xs font-bold shrink-0 self-start">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>✓ Supervisor Approved</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-xs space-y-1.5">
                    <p className="text-muted-foreground font-mono uppercase text-[10px]">Verified Deliverable Metric</p>
                    <p className="font-semibold text-emerald-700 dark:text-emerald-400">
                      {project.deliverableMetric}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="text-muted-foreground text-[11px]">
                      <span>Supervisor: </span>
                      <span className="font-semibold text-foreground">{project.supervisorName}</span> ({project.supervisorTitle})
                    </div>
                    <div className="flex items-center gap-2">
                      {project.artifacts.map((art, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-card border border-border text-[11px] font-mono text-muted-foreground"
                        >
                          <FileText className="h-3 w-3 text-primary" />
                          <span>{art.name}</span>
                          <span className="text-[9px] opacity-70">({art.size})</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* TAB 5: INTERNSHIPS                                                      */}
        {/* ----------------------------------------------------------------------- */}
        {activeTab === "internships" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-foreground">Verified Internships & Clinical Postings</h3>
                <p className="text-xs text-muted-foreground">
                  Hands-on hospital ward rotations, inpatient rounds, and clinical trial monitoring postings.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                <Clock className="h-3.5 w-3.5" />
                <span>{passport.totalClinicalHours} Hours Logged</span>
              </div>
            </div>

            <div className="space-y-4">
              {passport.internships.map((internship) => (
                <Card
                  key={internship.id}
                  variant="default"
                  className="p-6 rounded-2xl border-border/80 space-y-4 hover:border-secondary/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" size="sm">
                          {internship.duration}
                        </Badge>
                        <span className="text-xs font-mono text-muted-foreground">{internship.period}</span>
                      </div>
                      <h4 className="text-base font-bold text-foreground">{internship.role}</h4>
                      <p className="text-xs text-muted-foreground">
                        {internship.department} • <span className="text-foreground font-medium">{internship.hospitalOrOrg}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{internship.location}</p>
                    </div>

                    <div className="text-right shrink-0 bg-card p-3 rounded-xl border border-border/70">
                      <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-end gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>{internship.status}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Rating: <span className="font-bold text-foreground">{internship.evaluationRating} / 5.0</span>
                      </div>
                    </div>
                  </div>

                  {/* Hours and Encounters Count */}
                  <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-muted/40 border border-border/60 text-xs">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-mono block">Clinical Hours Verified</span>
                      <span className="text-base font-extrabold text-foreground">{internship.verifiedClinicalHours} Hours</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-mono block">Patient Encounters Logged</span>
                      <span className="text-base font-extrabold text-foreground">{internship.patientEncountersLogged} Patients</span>
                    </div>
                  </div>

                  {/* Supervisor Remarks */}
                  <div className="p-3.5 rounded-xl bg-card border border-border/80 space-y-1">
                    <p className="text-[10px] font-mono text-muted-foreground uppercase">
                      Supervisor Endorsement • {internship.supervisorName} ({internship.supervisorDesignation})
                    </p>
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                      &ldquo;{internship.supervisorRemarks}&rdquo;
                    </p>
                  </div>

                  {/* Competencies Practiced */}
                  <div className="pt-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-muted-foreground mr-1">Competencies Practiced:</span>
                    {internship.competenciesPracticed.map((comp, idx) => (
                      <Badge key={idx} variant="outline" size="sm" className="text-[10px]">
                        {comp}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* TAB 6: ACHIEVEMENTS                                                     */}
        {/* ----------------------------------------------------------------------- */}
        {activeTab === "achievements" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-foreground">Honors, Distinctions & Awards</h3>
                <p className="text-xs text-muted-foreground">
                  Competitive academic achievements, peer-reviewed publications, and national clinical honors.
                </p>
              </div>
              <Badge variant="verified" size="sm">
                {passport.achievements.length} Distinctions
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {passport.achievements.map((ach) => (
                <Card
                  key={ach.id}
                  variant="default"
                  className="p-5 rounded-2xl border-border/80 space-y-3 hover:border-secondary/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <Badge
                        variant={ach.badgeLevel === "GOLD" || ach.badgeLevel === "PRANA_EXCELLENCE" ? "secondary" : "outline"}
                        size="sm"
                        className="text-[10px] font-bold"
                      >
                        {ach.rankOrDistinction}
                      </Badge>
                      <h4 className="text-sm font-bold text-foreground">{ach.title}</h4>
                      <p className="text-xs text-muted-foreground">{ach.awardingBody}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-secondary/15 text-secondary border border-secondary/30 shrink-0">
                      <Award className="h-5 w-5" />
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {ach.description}
                  </p>

                  <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="font-mono">{ach.date}</span>
                    {ach.citationUrl && (
                      <a
                        href={ach.citationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
                      >
                        <span>View Publication / Award</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: QR CODE & PUBLIC VERIFICATION MODAL                                */}
      {/* ========================================================================= */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-md w-full bg-card border border-border rounded-3xl p-6 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="text-center space-y-1.5">
              <div className="h-12 w-12 rounded-2xl bg-primary/15 text-primary border border-primary/25 flex items-center justify-center mx-auto">
                <QrCode className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Cryptographic Verification QR</h3>
              <p className="text-xs text-muted-foreground">
                Recruiters, hospitals, and licensing authorities can scan this QR to verify authenticity directly against the Ayush Ledger.
              </p>
            </div>

            {/* Mock High-Res QR Visual */}
            <div className="p-6 bg-white rounded-2xl border border-border flex flex-col items-center justify-center space-y-3 text-slate-900">
              <div className="h-44 w-44 border-4 border-slate-900 p-2 rounded-xl flex items-center justify-center relative bg-slate-50">
                <div className="grid grid-cols-6 gap-1 w-full h-full opacity-85">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${
                        (i % 2 === 0 && i % 3 === 0) || i === 0 || i === 5 || i === 30 || i === 35
                          ? "bg-slate-900"
                          : i % 5 === 0
                          ? "bg-emerald-600"
                          : "bg-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-0.5 rounded-full bg-[#efe1c8] border border-amber-400/60 shadow-lg flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/ayu-setu-emblem.png"
                      alt="Ayu-Setu"
                      width={28}
                      height={28}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <p className="text-[11px] font-mono font-bold text-slate-700">
                AYU-SETU • {passport.ncismRegistrationNumber}
              </p>
            </div>

            <div className="space-y-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleCopyLink}
                leftIcon={copiedLink ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                className="w-full text-xs"
              >
                {copiedLink ? "Verification Link Copied!" : "Copy Public Verification URL"}
              </Button>
              <Link href={`/verify/${passport.passportId}`} target="_blank" className="block">
                <Button variant="outline" size="sm" rightIcon={<ExternalLink className="h-3.5 w-3.5" />} className="w-full text-xs">
                  Open Public Verification Page
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CRYPTOGRAPHIC LEDGER INSPECTOR                                      */}
      {/* ========================================================================= */}
      {showLedgerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-lg w-full bg-card border border-border rounded-3xl p-6 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setShowLedgerModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Ayush Distributed Ledger Attestation</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Tamper-evident Merkle root proof verified across national Ayurvedic institutions.
              </p>
            </div>

            <div className="space-y-3 text-xs bg-muted/40 p-4 rounded-2xl border border-border/80 font-mono">
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase">Ledger Block Number</span>
                <span className="text-foreground font-bold">#{passport.ledgerBlockNumber}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase">Merkle Root Hash</span>
                <span className="text-primary break-all">{passport.merkleRootHash}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase">Signature Standard</span>
                <span className="text-foreground font-bold">Ed25519 Elliptic Curve Signature</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase">Root Attestation Node</span>
                <span className="text-foreground font-semibold">AIIA-DELHI-VALIDATOR-01 (Ministry of Ayush)</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase">Timestamp</span>
                <span className="text-muted-foreground">{new Date().toISOString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs">
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                <span>Zero Tampering Detected • Integrity Valid</span>
              </span>
              <Button variant="outline" size="sm" onClick={() => setShowLedgerModal(false)} className="text-xs">
                Close Inspector
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Secure Document Vault Upload Modal */}
      <SecureDocumentUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadSuccess={(doc) => {
          // document saved
        }}
      />
    </div>
  );
}
