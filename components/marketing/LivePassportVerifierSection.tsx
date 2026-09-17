"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShieldCheck, CheckCircle2, Search, Sparkles, Award, Lock, ExternalLink, QrCode, FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface VerifiedStudentProfile {
  id: string;
  name: string;
  degree: string;
  institution: string;
  batch: string;
  ncismRegNo: string;
  merkleHash: string;
  attestedCases: number;
  specialization: string;
  verifiedDate: string;
  issuer: string;
  competencies: string[];
}

const PROFILES: Record<string, VerifiedStudentProfile> = {
  "AYU-2026-9812": {
    id: "AYU-2026-9812",
    name: "Dr. Aarav Sharma",
    degree: "BAMS (Gold Medalist), MD (Kayachikitsa)",
    institution: "All India Institute of Ayurveda (AIIA), New Delhi",
    batch: "2021–2026",
    ncismRegNo: "NCISM/DL/2026/09812",
    merkleHash: "0x89f4b321ce4d98a00192e4ab",
    attestedCases: 148,
    specialization: "Metabolic & Autoimmune Clinical Therapeutics",
    verifiedDate: "September 04, 2026",
    issuer: "Dean of Clinical Studies, AIIA New Delhi",
    competencies: ["Nadi Pariksha Master (Grade A+)", "Vamana & Virechana Protocols", "NABH Clinical EMR Standards", "GCP Clinical Trials"],
  },
  "AYU-2026-4401": {
    id: "AYU-2026-4401",
    name: "Dr. Ananya Iyer",
    degree: "BAMS, Fellowship in Panchakarma",
    institution: "Kottakkal Arya Vaidya Sala Training Academy, Kerala",
    batch: "2020–2025",
    ncismRegNo: "NCISM/KL/2025/04401",
    merkleHash: "0x7a224ef091bb3288c42a67bc",
    attestedCases: 182,
    specialization: "Advanced Shodhana & Musculoskeletal Rehabilitation",
    verifiedDate: "August 18, 2026",
    issuer: "Chief Medical Officer, Kottakkal AVS",
    competencies: ["Keraleeya Panchakarma Master", "Sneha Kalpana Formulations", "Spine & Joint Marma Therapy", "Patient Safety Protocol"],
  },
  "AYU-2026-7730": {
    id: "AYU-2026-7730",
    name: "Dr. Rohan Joshi",
    degree: "BAMS, M.Sc. Herbal Drug Technology",
    institution: "Institute of Teaching and Research in Ayurveda (ITRA), Jamnagar",
    batch: "2022–2026",
    ncismRegNo: "NCISM/GJ/2026/07730",
    merkleHash: "0x44c9803bf1829e5d629a8820",
    attestedCases: 112,
    specialization: "Dravyaguna Standardization & Phytopharmaceutical R&D",
    verifiedDate: "July 29, 2026",
    issuer: "Director of Research, ITRA Jamnagar",
    competencies: ["HPTLC Herbal Fingerprinting", "Dravyaguna Bio-Assays", "GLP Formulation Stability", "FDA Pharmacovigilance"],
  },
};

export function LivePassportVerifierSection() {
  const [searchId, setSearchId] = useState("AYU-2026-9812");
  const [isScanning, setIsScanning] = useState(false);
  const [activeProfile, setActiveProfile] = useState<VerifiedStudentProfile>(PROFILES["AYU-2026-9812"]);
  const [scanStep, setScanStep] = useState(4);
  const [copied, setCopied] = useState(false);

  const handleVerify = (idToVerify: string) => {
    setSearchId(idToVerify);
    setIsScanning(true);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 250);
    setTimeout(() => setScanStep(3), 500);
    setTimeout(() => {
      setScanStep(4);
      setActiveProfile(PROFILES[idToVerify] || PROFILES["AYU-2026-9812"]);
      setIsScanning(false);
    }, 750);
  };

  const handleCopyHash = () => {
    navigator.clipboard?.writeText(activeProfile.merkleHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="verifier" className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider">
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
          <div className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-card/85 backdrop-blur-md border border-border shadow-md">
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
                className={`text-xs font-mono px-2.5 py-1 rounded-lg border transition-all ${
                  searchId === id
                    ? "bg-accent/20 text-accent border-accent font-bold"
                    : "bg-muted/40 text-muted-foreground border-border hover:text-foreground hover:bg-muted"
                }`}
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* Live Verification Showcase Box */}
        <div className="max-w-4xl mx-auto">
          <div className="ayur-3d-card p-6 sm:p-8 rounded-3xl bg-card/90 backdrop-blur-xl border border-accent/40 shadow-2xl relative overflow-hidden">
            {/* Top Seal & Hash Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
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
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">
                      Digital Competency Passport
                    </h3>
                    <Badge variant="verified" size="sm" className="gap-1 font-bold">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      100% Cryptographically Verified
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Issued under National Ayush Mission & NCISM Competency Framework
                  </p>
                </div>
              </div>

              {/* QR Mockup & Hash Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyHash}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-background/80 border border-border hover:border-accent text-xs font-mono text-muted-foreground hover:text-foreground transition-all"
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
              <div className="py-4 my-2 px-4 rounded-xl bg-primary/15 border border-primary/40 flex items-center justify-between animate-pulse">
                <span className="text-xs font-bold text-primary flex items-center gap-2">
                  <Sparkles className="h-4 w-4 animate-spin" />
                  {scanStep === 1 && "Querying Distributed NCISM Node Ledger..."}
                  {scanStep === 2 && "Validating AIIA Faculty Cryptographic Seal..."}
                  {scanStep === 3 && "Verifying 148 Attested Case Signatures..."}
                  {scanStep === 4 && "Authenticity Confirmed: Valid Passport"}
                </span>
                <span className="text-xs font-mono text-accent">{scanStep}/4 Checks</span>
              </div>
            )}

            {/* Passport Body Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-center">
              {/* Left Student Info */}
              <div className="md:col-span-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Licensed Clinician
                    </span>
                    <p className="text-lg font-extrabold text-foreground">{activeProfile.name}</p>
                    <p className="text-xs text-accent font-semibold">{activeProfile.degree}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Accredited Institution
                    </span>
                    <p className="text-xs font-bold text-foreground mt-0.5">{activeProfile.institution}</p>
                    <p className="text-[11px] text-muted-foreground">Class of {activeProfile.batch}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      National Registration No.
                    </span>
                    <p className="text-xs font-mono font-bold text-foreground mt-0.5">{activeProfile.ncismRegNo}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Clinical Attestation Record
                    </span>
                    <p className="text-xs font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      {activeProfile.attestedCases} Validated Inpatient Cases
                    </p>
                  </div>
                </div>

                {/* Attested Competencies Badges */}
                <div className="pt-2 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-accent" />
                    Individually Endorsed Clinical Competencies
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeProfile.competencies.map((comp, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-background/80 border border-primary/30 text-xs font-medium text-foreground flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Attestation Authority */}
                <div className="pt-3 border-t border-border/60 text-[11px] text-muted-foreground flex flex-wrap items-center justify-between gap-2">
                  <span>Signatory: <strong className="text-foreground">{activeProfile.issuer}</strong></span>
                  <span>Attested On: <strong className="text-foreground">{activeProfile.verifiedDate}</strong></span>
                </div>
              </div>

              {/* Right QR & Verification Hologram Card */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-5 rounded-2xl bg-gradient-to-b from-card to-background border border-accent/40 text-center shadow-lg relative overflow-hidden">
                <div className="w-28 h-28 rounded-xl bg-white p-2.5 shadow-md flex items-center justify-center relative">
                  <QrCode className="w-full h-full text-zinc-900" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-6 h-6 rounded-md bg-accent text-accent-foreground font-black text-[10px] flex items-center justify-center shadow">
                      वै
                    </div>
                  </div>
                </div>

                <span className="text-[11px] font-mono font-bold text-accent mt-3">
                  {activeProfile.id}
                </span>
                <span className="text-[10px] text-muted-foreground mt-0.5">
                  Scan to verify on public NCISM portal
                </span>

                <div className="mt-4 pt-3 border-t border-border/60 w-full flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Valid & In Good Standing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
