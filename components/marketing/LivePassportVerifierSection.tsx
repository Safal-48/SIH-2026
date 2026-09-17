"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  CheckCircle2,
  Search,
  Sparkles,
  Award,
  Lock,
  ExternalLink,
  QrCode,
  FileText,
  Check,
  Copy,
  Building2,
  Stethoscope,
  Calendar,
  Clock,
  Activity,
  UserCheck,
  Shield,
  Download,
  Share2,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface DoctorCompetency {
  code: string;
  name: string;
  level: string;
  cases: string;
}

interface VerifiedDoctorProfile {
  id: string;
  name: string;
  avatar: string;
  designation: string;
  degree: string;
  institution: string;
  department: string;
  batch: string;
  ncismRegNo: string;
  stateCouncilReg: string;
  ayushGridId: string;
  merkleHash: string;
  blockHeight: string;
  metrics: {
    inpatientCases: number;
    clinicalHours: string;
    proceduralCycles: number;
    auditCompliance: string;
  };
  specialization: string;
  verifiedDate: string;
  issuer: {
    name: string;
    designation: string;
    institutionalNode: string;
    pkiSignature: string;
  };
  competencies: DoctorCompetency[];
}

const PROFILES: Record<string, VerifiedDoctorProfile> = {
  "AYU-2026-9812": {
    id: "AYU-2026-9812",
    name: "Dr. Aarav Sharma",
    avatar: "/images/doctor-aarav.jpg",
    designation: "Senior Clinical Resident & Metabolic Specialist",
    degree: "BAMS (Gold Medalist), MD (Kayachikitsa)",
    institution: "All India Institute of Ayurveda (AIIA), New Delhi",
    department: "Department of Kayachikitsa & Inpatient Metabolic Research",
    batch: "2021–2026",
    ncismRegNo: "NCISM/DL/2026/09812",
    stateCouncilReg: "Delhi Bharatiya Chikitsa Parishad (DBCP-8921)",
    ayushGridId: "ABHA-AYU-8821-9012",
    merkleHash: "0x89f4b321ce4d98a00192e4ab",
    blockHeight: "Block #1,849,203",
    metrics: {
      inpatientCases: 148,
      clinicalHours: "1,640 hrs",
      proceduralCycles: 68,
      auditCompliance: "99.4%",
    },
    specialization: "Metabolic & Autoimmune Clinical Therapeutics",
    verifiedDate: "September 04, 2026",
    issuer: {
      name: "Prof. Dr. Anand Kulkarni",
      designation: "Dean of Clinical Studies & HOD Kayachikitsa, AIIA",
      institutionalNode: "AIIA-DELHI-VALIDATOR-01 (Statutory Ayush Node)",
      pkiSignature: "SHA256:ECDSA_SECP256K1_0x89F4B321CE4D",
    },
    competencies: [
      { code: "NCISM-CP-01", name: "Nadi Pariksha Master", level: "Grade A+ (Distinction)", cases: "148 Validated Logs" },
      { code: "NCISM-CP-07", name: "Vamana & Virechana Protocols", level: "Faculty Attested", cases: "42 Inpatient Cycles" },
      { code: "NABH-EMR-04", name: "NABH Clinical EMR Standards", level: "100% Audit Compliance", cases: "148 Patient Charts" },
      { code: "CCRAS-GCP-02", name: "GCP Clinical Trials (Schedule Y)", level: "IEC Clearance Certified", cases: "3 Clinical Studies" },
    ],
  },
  "AYU-2026-4401": {
    id: "AYU-2026-4401",
    name: "Dr. Ananya Iyer",
    avatar: "/images/doctor-ananya.jpg",
    designation: "Resident Panchakarma Physician & Shodhana Lead",
    degree: "BAMS, Fellowship in Keraleeya Panchakarma",
    institution: "Kottakkal Arya Vaidya Sala Training Academy, Kerala",
    department: "Center of Excellence in Neurological & Musculoskeletal Rehab",
    batch: "2020–2025",
    ncismRegNo: "NCISM/KL/2025/04401",
    stateCouncilReg: "Travancore-Cochin Medical Council (TCMC-Ayur-4401)",
    ayushGridId: "ABHA-AYU-4401-2025",
    merkleHash: "0x7a224ef091bb3288c42a67bc",
    blockHeight: "Block #1,821,419",
    metrics: {
      inpatientCases: 182,
      clinicalHours: "1,890 hrs",
      proceduralCycles: 114,
      auditCompliance: "99.8%",
    },
    specialization: "Advanced Shodhana & Musculoskeletal Rehabilitation",
    verifiedDate: "August 18, 2026",
    issuer: {
      name: "Dr. P. Madhavan Kutty",
      designation: "Chief Medical Officer & Academic Director, Kottakkal AVS",
      institutionalNode: "AVS-KOTTAKKAL-VALIDATOR-02",
      pkiSignature: "SHA256:ECDSA_SECP256K1_0x7A224EF091BB",
    },
    competencies: [
      { code: "AVS-SH-01", name: "Keraleeya Panchakarma Master", level: "Master Attestation", cases: "114 Supervised Cycles" },
      { code: "AVS-SH-05", name: "Sneha Kalpana & Basti Protocols", level: "Advanced Fellow", cases: "98 Inpatient Encounters" },
      { code: "NCISM-CP-09", name: "Spine & Joint Marma Therapy", level: "Certified Specialist", cases: "64 Clinical Procedures" },
      { code: "NABH-PS-01", name: "Inpatient Clinical Safety Protocol", level: "NABH Zero-Error Seal", cases: "182 Logbook Records" },
    ],
  },
  "AYU-2026-7730": {
    id: "AYU-2026-7730",
    name: "Dr. Rohan Joshi",
    avatar: "/images/doctor-rohan.jpg",
    designation: "Phytopharmaceutical R&D Specialist & Pharmacognosist",
    degree: "BAMS, M.Sc. Herbal Drug Technology & Pharmacognosy",
    institution: "Institute of Teaching and Research in Ayurveda (ITRA), Jamnagar",
    department: "Department of Dravyaguna & Phytopharmaceutical Quality Control",
    batch: "2022–2026",
    ncismRegNo: "NCISM/GJ/2026/07730",
    stateCouncilReg: "Gujarat Board of Ayurvedic Systems (GBAS-7730)",
    ayushGridId: "ABHA-AYU-7730-1092",
    merkleHash: "0x44c9803bf1829e5d629a8820",
    blockHeight: "Block #1,798,044",
    metrics: {
      inpatientCases: 112,
      clinicalHours: "1,420 hrs",
      proceduralCycles: 54,
      auditCompliance: "99.1%",
    },
    specialization: "Dravyaguna Standardization & Botanical Marker Profiling",
    verifiedDate: "July 29, 2026",
    issuer: {
      name: "Prof. Dr. Hitendra Patel",
      designation: "Director of Research & Head of Dravyaguna, ITRA Jamnagar",
      institutionalNode: "ITRA-JAMNAGAR-VALIDATOR-04",
      pkiSignature: "SHA256:ECDSA_SECP256K1_0x44C9803BF182",
    },
    competencies: [
      { code: "ITRA-DG-01", name: "HPTLC Herbal Fingerprinting", level: "GLP Level 3 Certified", cases: "76 Botanical Assays" },
      { code: "ITRA-DG-03", name: "Dravyaguna Bio-Assays", level: "Senior Investigator", cases: "54 Batch Validations" },
      { code: "API-QC-08", name: "GLP Polyherbal Stability Testing", level: "Pharmacopoeia Compliant", cases: "38 Finished Formulations" },
      { code: "FDA-PV-02", name: "Pharmacovigilance & Safety Dossier", level: "NCISM Attested", cases: "112 Clinical Dossiers" },
    ],
  },
};

export function LivePassportVerifierSection() {
  const [searchId, setSearchId] = useState("AYU-2026-9812");
  const [isScanning, setIsScanning] = useState(false);
  const [activeProfile, setActiveProfile] = useState<VerifiedDoctorProfile>(PROFILES["AYU-2026-9812"]);
  const [scanStep, setScanStep] = useState(4);
  const [copied, setCopied] = useState(false);
  const [qrCopied, setQrCopied] = useState(false);

  const handleVerify = (idToVerify: string) => {
    const cleanId = idToVerify.trim().toUpperCase();
    setSearchId(cleanId);
    setIsScanning(true);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 220);
    setTimeout(() => setScanStep(3), 440);
    setTimeout(() => {
      setScanStep(4);
      setActiveProfile(PROFILES[cleanId] || PROFILES["AYU-2026-9812"]);
      setIsScanning(false);
    }, 700);
  };

  const handleCopyHash = () => {
    navigator.clipboard?.writeText(activeProfile.merkleHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyVerificationLink = () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/verify/${activeProfile.id}` : `https://ayusetu.gov.in/verify/${activeProfile.id}`;
    navigator.clipboard?.writeText(url);
    setQrCopied(true);
    setTimeout(() => setQrCopied(false), 2000);
  };

  return (
    <section id="verifier" className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Lock className="h-3.5 w-3.5 text-accent" />
            <span>Public Credential Verification Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
            Instant <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-400 to-primary">Tamper-Proof Passport</span> Verification
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Eliminate credential fraud and fake paper certificates. Test our cryptographic verification engine used by premier hospitals like AIIA and pharma leaders to validate clinical logbooks in under 1 second.
          </p>
        </div>

        {/* Interactive Search Bar & Sample Presets */}
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-card/90 backdrop-blur-md border border-border shadow-md">
            <div className="flex items-center gap-2 px-3 w-full sm:w-auto flex-1">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value.toUpperCase())}
                placeholder="Enter Ayush ID e.g. AYU-2026-9812"
                className="bg-transparent border-none outline-none text-xs sm:text-sm font-mono font-bold text-foreground w-full placeholder:text-muted-foreground placeholder:font-normal"
              />
            </div>
            <Button
              variant="gold"
              size="sm"
              onClick={() => handleVerify(searchId)}
              isLoading={isScanning}
              className="w-full sm:w-auto font-bold shadow-md shadow-accent/20 text-xs px-5"
            >
              Verify Credential
            </Button>
          </div>

          {/* Quick preset selector buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="text-xs text-muted-foreground">Test Sample Credentials:</span>
            {Object.keys(PROFILES).map((id) => (
              <button
                key={id}
                onClick={() => handleVerify(id)}
                className={`text-xs font-mono px-3 py-1 rounded-lg border transition-all ${
                  searchId === id
                    ? "bg-accent/20 text-accent border-accent font-bold shadow-sm"
                    : "bg-muted/40 text-muted-foreground border-border hover:text-foreground hover:bg-muted"
                }`}
              >
                {id} • {PROFILES[id].name.split(" ")[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Live Verification Showcase Box */}
        <div className="max-w-5xl mx-auto">
          <div className="ayur-3d-card p-6 sm:p-9 rounded-3xl bg-card/95 backdrop-blur-2xl border border-accent/40 shadow-2xl relative overflow-hidden space-y-7">
            {/* Top Seal & Cryptographic Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-border/70">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-amber-400/60 bg-[#efe1c8] flex items-center justify-center shadow-md shrink-0">
                  <Image
                    src="/images/ayu-setu-emblem.png"
                    alt="Ayu-Setu Seal"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">
                      Digital Competency Passport
                    </h3>
                    <Badge variant="verified" size="sm" className="gap-1 font-bold">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      100% Cryptographically Verified
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Ministry of Ayush • NCISM National Competency Registry • Statutory Verification
                  </p>
                </div>
              </div>

              {/* Merkle Hash & Block Height */}
              <div className="flex items-center gap-2.5">
                <span className="hidden sm:inline-flex text-[11px] font-mono text-muted-foreground px-2 py-1 rounded-md bg-muted/50 border border-border/60">
                  {activeProfile.blockHeight}
                </span>
                <button
                  onClick={handleCopyHash}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-background/90 border border-border hover:border-accent text-xs font-mono text-muted-foreground hover:text-foreground transition-all shadow-sm"
                  title="Copy SHA-256 Merkle Root"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Hash Copied!</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-3.5 w-3.5 text-accent" />
                      <span>{activeProfile.merkleHash}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Scanning Steps Simulation Indicator */}
            {isScanning && (
              <div className="py-3.5 px-4 rounded-xl bg-primary/15 border border-primary/40 flex items-center justify-between animate-pulse">
                <span className="text-xs font-bold text-primary flex items-center gap-2">
                  <Sparkles className="h-4 w-4 animate-spin text-accent" />
                  {scanStep === 1 && "Querying Distributed NCISM Node Ledger..."}
                  {scanStep === 2 && "Validating Institutional PKI Signature Seal..."}
                  {scanStep === 3 && `Verifying ${activeProfile.metrics.inpatientCases} Attested Case Signatures...`}
                  {scanStep === 4 && "Authenticity Confirmed: Valid Passport in Good Standing"}
                </span>
                <span className="text-xs font-mono text-accent font-bold">{scanStep}/4 Checks</span>
              </div>
            )}

            {/* Doctor Identity Header with Authentic Portrait */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-background/90 via-card to-card border border-border/80 shadow-sm">
              <div className="flex items-center gap-4">
                {/* Doctor Avatar Image */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-2 ring-emerald-500/50 shadow-lg shrink-0 bg-slate-900">
                  <Image
                    src={activeProfile.avatar}
                    alt={activeProfile.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-emerald-950/80 backdrop-blur-xs py-0.5 text-center">
                    <span className="text-[9px] font-bold text-emerald-300 tracking-wider uppercase">Verified</span>
                  </div>
                </div>

                {/* Identity & Degrees */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                      {activeProfile.name}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                      <ShieldCheck className="h-3 w-3" />
                      Active Licensed Clinician
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-accent">
                    {activeProfile.degree}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 line-clamp-1">
                    <Building2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>{activeProfile.institution}</span>
                    <span className="text-muted-foreground/60">•</span>
                    <span>Class of {activeProfile.batch}</span>
                  </p>
                </div>
              </div>

              {/* Department & Specialty Pill */}
              <div className="w-full md:w-auto flex flex-col sm:items-end gap-1.5 pt-2 md:pt-0 border-t md:border-t-0 border-border/50">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                  Clinical Specialty Division
                </span>
                <span className="text-xs font-bold text-foreground px-3 py-1 rounded-xl bg-muted/60 border border-border/80 text-right">
                  {activeProfile.specialization}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {activeProfile.department}
                </span>
              </div>
            </div>

            {/* Official Statutory Identifiers Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-background/80 border border-border/70 text-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                  <FileText className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold block truncate">
                    NCISM National Reg.
                  </span>
                  <span className="font-mono font-bold text-foreground truncate block">
                    {activeProfile.ncismRegNo}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0">
                  <Shield className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold block truncate">
                    State Council Accreditation
                  </span>
                  <span className="font-bold text-foreground truncate block">
                    {activeProfile.stateCouncilReg}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                  <Activity className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold block truncate">
                    Ayush Grid Health ID
                  </span>
                  <span className="font-mono font-bold text-foreground truncate block">
                    {activeProfile.ayushGridId}
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Clean Clinical KPI Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="p-3.5 rounded-2xl bg-card border border-border/80 shadow-sm space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  Validated IPD Cases
                </span>
                <p className="text-2xl font-extrabold text-foreground font-mono">
                  {activeProfile.metrics.inpatientCases}
                </p>
                <p className="text-[10px] text-emerald-400 font-semibold">100% Attested by Mentor</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-card border border-border/80 shadow-sm space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3 text-accent" />
                  Ward Residency
                </span>
                <p className="text-2xl font-extrabold text-foreground font-mono">
                  {activeProfile.metrics.clinicalHours}
                </p>
                <p className="text-[10px] text-muted-foreground font-medium">Inpatient Rotations</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-card border border-border/80 shadow-sm space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <Stethoscope className="h-3 w-3 text-primary" />
                  Procedural Cycles
                </span>
                <p className="text-2xl font-extrabold text-foreground font-mono">
                  {activeProfile.metrics.proceduralCycles}
                </p>
                <p className="text-[10px] text-primary font-semibold">Attested Clinical Encounters</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-card border border-border/80 shadow-sm space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <Award className="h-3 w-3 text-accent" />
                  Audit Compliance
                </span>
                <p className="text-2xl font-extrabold text-accent font-mono">
                  {activeProfile.metrics.auditCompliance}
                </p>
                <p className="text-[10px] text-muted-foreground font-medium">Zero-Discrepancy Record</p>
              </div>
            </div>

            {/* Main Details: Competencies (Left) & High-Tech Verification QR (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Endorsed Competencies & Signatory */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-accent" />
                      Individually Endorsed Clinical Competencies
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      4 Accredited Seals
                    </span>
                  </div>

                  <div className="space-y-2">
                    {activeProfile.competencies.map((comp) => (
                      <div
                        key={comp.code}
                        className="p-3 rounded-xl bg-background/80 border border-border/80 flex items-center justify-between gap-3 hover:border-accent/40 transition-colors"
                      >
                        <div className="flex items-start gap-2.5 min-w-0">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-foreground truncate">
                              {comp.name}
                            </p>
                            <span className="text-[10px] font-mono text-muted-foreground">
                              {comp.code} • {comp.cases}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-accent/15 border border-accent/30 text-accent shrink-0">
                          {comp.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Statutory Signatory Seal Card */}
                <div className="p-3.5 rounded-xl bg-muted/40 border border-border/70 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[10px] uppercase tracking-wider font-bold">Attestation Authority:</span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <Lock className="h-3 w-3" /> PKI Verified
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-extrabold text-foreground text-xs">{activeProfile.issuer.name}</p>
                      <p className="text-[11px] text-muted-foreground">{activeProfile.issuer.designation}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-muted-foreground block">Attested On</span>
                      <span className="font-bold text-foreground text-xs">{activeProfile.verifiedDate}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border/50 text-[10px] font-mono text-muted-foreground flex flex-wrap items-center justify-between gap-1">
                    <span>Node: <strong className="text-foreground">{activeProfile.issuer.institutionalNode}</strong></span>
                    <span className="truncate">{activeProfile.issuer.pkiSignature.slice(0, 24)}...</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Authentic Government High-Tech QR Station */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-b from-[#081f15] via-[#05170f] to-[#020b07] border-2 border-accent/40 shadow-xl relative overflow-hidden group">
                {/* Background glow ambiance */}
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

                {/* Header status */}
                <div className="w-full flex items-center justify-between mb-4 text-[10px] font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    LIVE MERKLE LEAF
                  </span>
                  <span className="text-muted-foreground uppercase">ISO/IEC 18004</span>
                </div>

                {/* Authentic High-Resolution QR with High-Tech Viewfinder */}
                <div className="relative p-4 rounded-2xl bg-white shadow-2xl border border-slate-200 w-52 h-52 flex items-center justify-center">
                  {/* Viewfinder Metallic Gold Corner Brackets */}
                  <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-amber-400" />
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-amber-400" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-amber-400" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-amber-400" />

                  {/* High Density Geometric SVG QR Code */}
                  <svg
                    viewBox="0 0 160 160"
                    className="w-full h-full text-slate-950"
                    fill="currentColor"
                  >
                    {/* Top-Left Finder */}
                    <rect x="8" y="8" width="40" height="40" rx="6" fill="#0f172a" />
                    <rect x="14" y="14" width="28" height="28" rx="3" fill="#ffffff" />
                    <rect x="20" y="20" width="16" height="16" rx="2" fill="#0f172a" />

                    {/* Top-Right Finder */}
                    <rect x="112" y="8" width="40" height="40" rx="6" fill="#0f172a" />
                    <rect x="118" y="14" width="28" height="28" rx="3" fill="#ffffff" />
                    <rect x="124" y="20" width="16" height="16" rx="2" fill="#0f172a" />

                    {/* Bottom-Left Finder */}
                    <rect x="8" y="112" width="40" height="40" rx="6" fill="#0f172a" />
                    <rect x="14" y="118" width="28" height="28" rx="3" fill="#ffffff" />
                    <rect x="20" y="124" width="16" height="16" rx="2" fill="#0f172a" />

                    {/* Small Alignment Pattern Bottom-Right */}
                    <rect x="120" y="120" width="22" height="22" rx="4" fill="#0f172a" />
                    <rect x="125" y="125" width="12" height="12" rx="2" fill="#ffffff" />
                    <rect x="129" y="129" width="4" height="4" fill="#0f172a" />

                    {/* Timing Patterns */}
                    <rect x="52" y="18" width="6" height="6" fill="#0f172a" />
                    <rect x="64" y="18" width="6" height="6" fill="#0f172a" />
                    <rect x="76" y="18" width="6" height="6" fill="#0f172a" />
                    <rect x="88" y="18" width="6" height="6" fill="#0f172a" />
                    <rect x="100" y="18" width="6" height="6" fill="#0f172a" />

                    <rect x="18" y="52" width="6" height="6" fill="#0f172a" />
                    <rect x="18" y="64" width="6" height="6" fill="#0f172a" />
                    <rect x="18" y="76" width="6" height="6" fill="#0f172a" />
                    <rect x="18" y="88" width="6" height="6" fill="#0f172a" />
                    <rect x="18" y="100" width="6" height="6" fill="#0f172a" />

                    {/* Authentic Cryptographic Data Blocks */}
                    <rect x="52" y="30" width="6" height="6" fill="#0f172a" />
                    <rect x="64" y="30" width="12" height="6" fill="#0f172a" />
                    <rect x="82" y="30" width="6" height="6" fill="#0f172a" />
                    <rect x="94" y="30" width="12" height="6" fill="#0f172a" />

                    <rect x="52" y="42" width="12" height="6" fill="#0f172a" />
                    <rect x="70" y="42" width="6" height="6" fill="#0f172a" />
                    <rect x="82" y="42" width="12" height="6" fill="#0f172a" />
                    <rect x="100" y="42" width="6" height="6" fill="#0f172a" />

                    <rect x="30" y="54" width="6" height="6" fill="#0f172a" />
                    <rect x="42" y="54" width="18" height="6" fill="#0f172a" />
                    <rect x="94" y="54" width="6" height="6" fill="#0f172a" />
                    <rect x="106" y="54" width="18" height="6" fill="#0f172a" />
                    <rect x="130" y="54" width="12" height="6" fill="#0f172a" />

                    <rect x="30" y="66" width="18" height="6" fill="#0f172a" />
                    <rect x="94" y="66" width="12" height="6" fill="#0f172a" />
                    <rect x="112" y="66" width="6" height="6" fill="#0f172a" />
                    <rect x="124" y="66" width="18" height="6" fill="#0f172a" />

                    <rect x="30" y="78" width="6" height="6" fill="#0f172a" />
                    <rect x="42" y="78" width="12" height="6" fill="#0f172a" />
                    <rect x="94" y="78" width="18" height="6" fill="#0f172a" />
                    <rect x="118" y="78" width="6" height="6" fill="#0f172a" />
                    <rect x="130" y="78" width="12" height="6" fill="#0f172a" />

                    <rect x="30" y="90" width="12" height="6" fill="#0f172a" />
                    <rect x="48" y="90" width="6" height="6" fill="#0f172a" />
                    <rect x="94" y="90" width="6" height="6" fill="#0f172a" />
                    <rect x="106" y="90" width="12" height="6" fill="#0f172a" />
                    <rect x="124" y="90" width="18" height="6" fill="#0f172a" />

                    <rect x="52" y="102" width="18" height="6" fill="#0f172a" />
                    <rect x="76" y="102" width="6" height="6" fill="#0f172a" />
                    <rect x="88" y="102" width="18" height="6" fill="#0f172a" />

                    <rect x="52" y="114" width="6" height="6" fill="#0f172a" />
                    <rect x="64" y="114" width="12" height="6" fill="#0f172a" />
                    <rect x="82" y="114" width="6" height="6" fill="#0f172a" />
                    <rect x="94" y="114" width="18" height="6" fill="#0f172a" />

                    <rect x="52" y="126" width="18" height="6" fill="#0f172a" />
                    <rect x="76" y="126" width="12" height="6" fill="#0f172a" />
                    <rect x="94" y="126" width="6" height="6" fill="#0f172a" />
                    <rect x="106" y="126" width="8" height="6" fill="#0f172a" />

                    <rect x="52" y="138" width="6" height="6" fill="#0f172a" />
                    <rect x="64" y="138" width="18" height="6" fill="#0f172a" />
                    <rect x="88" y="138" width="12" height="6" fill="#0f172a" />
                    <rect x="106" y="138" width="8" height="6" fill="#0f172a" />
                  </svg>

                  {/* Center High-Prestige Official Ayu-Setu Golden Seal */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-11 h-11 rounded-full bg-[#efe1c8] ring-2 ring-amber-400 p-0.5 shadow-xl flex items-center justify-center overflow-hidden">
                      <Image
                        src="/images/ayu-setu-emblem.png"
                        alt="Ayu-Setu Crest"
                        width={38}
                        height={38}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* High-Tech Animated Laser Scan Line */}
                  <div className="absolute inset-x-3 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent pointer-events-none animate-pulse top-1/2 -translate-y-1/2 shadow-sm shadow-emerald-400/80" />
                </div>

                {/* Ayush ID in bold font-mono */}
                <span className="text-xs font-mono font-extrabold text-accent mt-3 tracking-wider">
                  {activeProfile.id}
                </span>
                <span className="text-[10px] text-gray-400 mt-0.5">
                  Scan to verify on public NCISM node
                </span>

                {/* Status Indicator */}
                <div className="mt-3.5 pt-3 border-t border-emerald-500/30 w-full flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-bold">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Valid & In Good Standing</span>
                </div>

                {/* Interactive Action Buttons */}
                <div className="mt-3 grid grid-cols-2 gap-2 w-full">
                  <button
                    onClick={handleCopyVerificationLink}
                    className="px-2.5 py-1.5 rounded-xl bg-card/80 border border-border/80 hover:border-accent text-[11px] font-semibold text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 transition-all"
                  >
                    {qrCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="h-3.5 w-3.5 text-accent" />
                        <span>Share Pass</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleVerify(activeProfile.id)}
                    className="px-2.5 py-1.5 rounded-xl bg-accent/20 border border-accent/40 text-[11px] font-bold text-accent hover:bg-accent/30 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Live Audit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
