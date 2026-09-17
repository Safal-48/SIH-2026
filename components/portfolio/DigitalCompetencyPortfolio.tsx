"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Sparkles,
  QrCode,
  FileCheck,
  Building2,
  ExternalLink,
  CheckCircle2,
  Lock,
  ChevronRight,
  ArrowRight,
  Filter,
  Copy,
  Printer,
  Calendar,
  Layers,
  Activity,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/cards/Card";
import { loadSkillDna, SkillDnaItem, VerificationStatus } from "@/lib/services/skillIntelligenceService";
import {
  passportService,
  StudentPassportData,
} from "@/lib/services/passportService";
import { PassportShowcaseSection } from "@/components/marketing/PassportShowcaseSection";
import { LivePassportVerifierSection } from "@/components/marketing/LivePassportVerifierSection";

export function DigitalCompetencyPortfolio() {
  const [passportData, setPassportData] = React.useState<StudentPassportData | null>(null);
  const [skills, setSkills] = React.useState<SkillDnaItem[]>([]);
  const [activeSection, setActiveSection] = React.useState<string>("passport");
  const [verificationFilter, setVerificationFilter] = React.useState<string>("All");
  const [copiedHash, setCopiedHash] = React.useState<boolean>(false);

  React.useEffect(() => {
    setPassportData(passportService.getPassportData());
    setSkills(loadSkillDna());
  }, []);

  if (!passportData) {
    return (
      <div className="p-12 text-center text-xs text-muted-foreground">
        Loading Digital Competency Portfolio...
      </div>
    );
  }

  const { corePassportSkills, certifications, projects, internships, achievements } = passportData;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(passportData.cryptographicHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2500);
  };

  // Filter skills by verification status
  const filteredSkills = skills.filter((s) => {
    if (verificationFilter === "All") return true;
    return s.verificationStatus === verificationFilter;
  });

  const portfolioNavItems = [
    { id: "passport", label: "Competency Passport", icon: <ShieldCheck className="h-4 w-4" /> },
    { id: "dna", label: "My Skill DNA", icon: <Activity className="h-4 w-4" /> },
    { id: "skills", label: "Verified Skills", icon: <CheckCircle2 className="h-4 w-4" /> },
    { id: "projects", label: "Projects", icon: <Layers className="h-4 w-4" /> },
    { id: "certifications", label: "Certifications", icon: <Award className="h-4 w-4" /> },
    { id: "experience", label: "Internships & Experience", icon: <Briefcase className="h-4 w-4" /> },
    { id: "achievements", label: "Achievements", icon: <Sparkles className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Header & Official NCISM Credentials Stamped Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/85 via-[#032014] to-slate-950 border border-emerald-500/35 backdrop-blur-xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-amber-400/60 bg-[#efe1c8] shadow-lg shrink-0 flex items-center justify-center mt-0.5">
            <Image
              src="/images/ayu-setu-emblem.png"
              alt="Ayu-Setu Seal"
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Official NCISM Digital Portfolio &amp; Passport</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Proof of Clinical Competency
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              Proof of what you can actually demonstrate in the hospital and laboratory. Cryptographically signed clinical hours, procedural SOAP logs, and supervisor attestations verifiable in under 1 second.
            </p>
          </div>
        </div>

        {/* Cryptographic Hash Badge & Copy */}
        <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-1 text-center min-w-[170px] flex-shrink-0">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">SHA-256 Ledger Hash</span>
          <div className="font-mono text-xs text-amber-400 font-bold truncate max-w-[150px]">
            {passportData.cryptographicHash.slice(0, 14)}...
          </div>
          <button
            onClick={handleCopyHash}
            className="text-[10px] text-emerald-400 hover:text-white font-semibold inline-flex items-center gap-1 transition-colors mt-1"
          >
            <Copy className="h-3 w-3" />
            <span>{copiedHash ? "Copied to Clipboard!" : "Copy Verification Hash"}</span>
          </button>
        </div>
      </div>

      {/* 2. Closed-Loop Career Journey Visualizer */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-emerald-500/20 text-xs space-y-2">
        <span className="font-bold uppercase tracking-wider text-amber-400 block text-[10px]">
          The Closed-Loop Skillora Journey:
        </span>
        <div className="flex flex-wrap items-center gap-2 text-gray-300 font-medium">
          <span className="text-white font-bold">Career Goal</span>
          <ChevronRight className="h-3 w-3 text-emerald-400" />
          <span>Career Recommendation</span>
          <ChevronRight className="h-3 w-3 text-emerald-400" />
          <span>Skill Gap</span>
          <ChevronRight className="h-3 w-3 text-emerald-400" />
          <span>Learning Recommendation</span>
          <ChevronRight className="h-3 w-3 text-emerald-400" />
          <span>Opportunity Match</span>
          <ChevronRight className="h-3 w-3 text-emerald-400" />
          <span>Participation</span>
          <ChevronRight className="h-3 w-3 text-emerald-400" />
          <span>Supervisor Verification</span>
          <ChevronRight className="h-3 w-3 text-amber-400" />
          <span className="text-amber-400 font-bold">Digital Portfolio ✓</span>
        </div>
      </div>

      {/* 3. Section Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 p-1.5 rounded-2xl bg-[#03190f]/90 border border-emerald-500/30 backdrop-blur-xl text-xs">
        {portfolioNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`py-2 px-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeSection === item.id
                ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
                : "text-gray-300 hover:text-white hover:bg-white/5"
            }`}
          >
            {item.icon}
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </div>

      {/* 4. Section Content Renderers */}

      {/* SECTION 1: COMPETENCY PASSPORT & 3D SHOWCASE */}
      {activeSection === "passport" && (
        <div className="space-y-8 animate-in fade-in">
          {/* 3D Holographic Passport Showcase Component */}
          <PassportShowcaseSection />

          {/* Live Public Verifier Sandbox */}
          <LivePassportVerifierSection />
        </div>
      )}

      {/* SECTION 2: MY SKILL DNA */}
      {activeSection === "dna" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#03190f]/90 border border-emerald-500/30 backdrop-blur-xl space-y-6 shadow-xl animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-500/20">
            <div>
              <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-400" />
                <span>My Skill DNA Competency Distribution</span>
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Evaluated against All India Institute of Ayurveda and NCISM National Benchmarks.
              </p>
            </div>
            <Link href="/assess">
              <Button variant="gold" size="sm" className="text-xs font-bold gap-1.5">
                <span>Calibrate in ASSESS</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((s) => (
              <div
                key={s.id}
                className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-3"
              >
                <div className="flex items-start justify-between gap-2 text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">{s.name}</span>
                    {s.sanskritName && (
                      <span className="text-[11px] text-amber-300/80 font-serif italic block">
                        {s.sanskritName}
                      </span>
                    )}
                    <span className="text-[10px] text-muted-foreground block">{s.category}</span>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <Badge
                      variant={
                        s.verificationStatus === "Industry Verified"
                          ? "gold"
                          : s.verificationStatus === "Institution Verified"
                          ? "secondary"
                          : s.verificationStatus === "Assessment Verified"
                          ? "verified"
                          : "outline"
                      }
                      size="sm"
                      className="text-[9px] font-mono"
                    >
                      {s.verificationStatus}
                    </Badge>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-gray-400">Current: {s.currentProficiency}%</span>
                    <span className="text-amber-400 font-bold">Benchmark: {s.benchmark}%</span>
                  </div>
                  <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-white/10">
                    <div
                      className={`h-full ${
                        s.currentProficiency >= s.benchmark
                          ? "bg-emerald-400"
                          : s.currentProficiency >= s.benchmark - 15
                          ? "bg-amber-400"
                          : "bg-rose-400"
                      }`}
                      style={{ width: `${s.currentProficiency}%` }}
                    />
                  </div>
                </div>

                {s.clinicalImpactNotes && (
                  <p className="text-[11px] text-gray-400 italic">
                    {s.clinicalImpactNotes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: VERIFIED SKILLS GRID WITH 4 TIERS */}
      {activeSection === "skills" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#03190f]/90 border border-emerald-500/30 backdrop-blur-xl space-y-6 shadow-xl animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-500/20">
            <div>
              <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span>4-Tier Verified Competencies ({filteredSkills.length})</span>
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Every verified seal is tied to an assessment diagnostic, faculty sign-off, or industry practicum.
              </p>
            </div>

            {/* Verification Filter Pills */}
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-black/40 border border-emerald-500/20 text-xs">
              {["All", "Assessment Verified", "Institution Verified", "Industry Verified", "Self Declared"].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setVerificationFilter(tier)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    verificationFilter === tier
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((s) => (
              <div
                key={s.id}
                className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-white text-xs block leading-snug">
                      {s.name}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 flex-shrink-0">
                      {s.currentProficiency}%
                    </span>
                  </div>

                  <span className="text-[10px] text-muted-foreground block">{s.category}</span>

                  <div className="pt-2 border-t border-emerald-500/15 text-[11px] space-y-1">
                    <div className="flex items-center justify-between text-gray-300">
                      <span>Verification Level:</span>
                      <span className={`font-bold ${
                        s.verificationStatus === "Industry Verified"
                          ? "text-amber-400"
                          : s.verificationStatus === "Institution Verified"
                          ? "text-sky-400"
                          : s.verificationStatus === "Assessment Verified"
                          ? "text-emerald-400"
                          : "text-zinc-400"
                      }`}>
                        {s.verificationStatus} {s.verificationStatus !== "Self Declared" && "✓"}
                      </span>
                    </div>

                    {s.verifiedBy && (
                      <div className="text-[10px] text-muted-foreground truncate">
                        Attested by: {s.verifiedBy}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-400">
                  <span>Assessed: {s.lastAssessedDate || "Recent"}</span>
                  <span className="font-mono">Evidence Count: {s.evidenceCount || 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: PROJECTS */}
      {activeSection === "projects" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#03190f]/90 border border-emerald-500/30 backdrop-blur-xl space-y-6 shadow-xl animate-in fade-in">
          <div className="pb-3 border-b border-emerald-500/20">
            <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-sky-400" />
              <span>Applied Projects &amp; Clinical Audits ({projects.length})</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Evidence-based formulation trials, clinical retrospective audits, and epidemiological field studies.
            </p>
          </div>

          <div className="space-y-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-amber-300 font-medium">
                      {proj.organization} • Role: {proj.role}
                    </p>
                  </div>
                  <Badge variant="verified" size="sm" className="font-mono text-[10px] self-start sm:self-center">
                    Institution Verified ✓
                  </Badge>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {proj.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-black/50 border border-white/5 text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-muted-foreground block">Methodology</span>
                    <span className="text-gray-200 font-medium">{proj.methodology}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-muted-foreground block">Deliverable Metric</span>
                    <span className="text-emerald-400 font-bold">{proj.deliverableMetric}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-muted-foreground block">Supervisor Sign-Off</span>
                    <span className="text-gray-200 font-medium">{proj.supervisorName} ({proj.supervisorTitle})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: CERTIFICATIONS */}
      {activeSection === "certifications" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#03190f]/90 border border-emerald-500/30 backdrop-blur-xl space-y-6 shadow-xl animate-in fade-in">
          <div className="pb-3 border-b border-emerald-500/20">
            <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-400" />
              <span>Accredited Certifications ({certifications.length})</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Accredited credentials issued by NCISM, AIIA, and Ministry of AYUSH.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-5 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant="gold" size="sm" className="font-mono text-[9px]">
                      {cert.accreditationBody}
                    </Badge>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      {cert.status} ✓
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white leading-snug">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-gray-300">{cert.issuingAuthority}</p>

                  <div className="pt-2 border-t border-emerald-500/15 text-[11px] space-y-1">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Cert #:</span>
                      <span className="font-mono text-gray-200 font-bold">{cert.certificateNumber}</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Issued Date:</span>
                      <span className="text-gray-200">{cert.issueDate}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-400">
                  <span>Seal: {cert.digitalSealHash.slice(0, 12)}...</span>
                  <span className="text-emerald-400 font-semibold">Verified on Chain</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 6: INTERNSHIPS & EXPERIENCE */}
      {activeSection === "experience" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#03190f]/90 border border-emerald-500/30 backdrop-blur-xl space-y-6 shadow-xl animate-in fade-in">
          <div className="pb-3 border-b border-emerald-500/20">
            <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-emerald-400" />
              <span>Inpatient Internships &amp; Clinical Hours ({internships.length})</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Verified clinical hours logged in the NCISM electronic medical record system.
            </p>
          </div>

          <div className="space-y-4">
            {internships.map((int) => (
              <div
                key={int.id}
                className="p-5 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <h4 className="text-sm sm:text-base font-bold text-white">{int.role}</h4>
                    <p className="text-xs text-gray-300">
                      {int.hospitalOrOrg} • Department: {int.department}
                    </p>
                  </div>
                  <Badge variant="verified" size="sm" className="font-mono text-[10px] self-start sm:self-center">
                    {int.status} ✓
                  </Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-black/50 border border-white/5 text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-muted-foreground block">Verified Clinical Hours</span>
                    <span className="font-bold text-emerald-400 text-sm font-mono">{int.verifiedClinicalHours} Hours</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-muted-foreground block">Patient Encounters Logged</span>
                    <span className="font-bold text-amber-300 text-sm font-mono">{int.patientEncountersLogged} Patients</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-muted-foreground block">Evaluation Rating</span>
                    <span className="font-bold text-sky-400 text-sm font-mono">{int.evaluationRating} / 5.0</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-muted-foreground block">Clinical Preceptor</span>
                    <span className="font-medium text-white truncate block">{int.supervisorName}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-gray-300">
                  <strong>Preceptor Remarks:</strong> {int.supervisorRemarks}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 7: ACHIEVEMENTS & HONORS */}
      {activeSection === "achievements" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#03190f]/90 border border-emerald-500/30 backdrop-blur-xl space-y-6 shadow-xl animate-in fade-in">
          <div className="pb-3 border-b border-emerald-500/20">
            <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-300" />
              <span>National Honors &amp; Distinctions ({achievements.length})</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Awards and research distinctions recognized by NCISM and the Ministry of AYUSH.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="p-5 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant="gold" size="sm" className="font-mono text-[9px]">
                      {ach.badgeLevel.replace("_", " ")}
                    </Badge>
                    <span className="text-[10px] text-gray-400">{ach.date}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white leading-snug">{ach.title}</h4>
                  <p className="text-xs text-amber-300 font-semibold">{ach.rankOrDistinction}</p>
                  <p className="text-xs text-gray-300 leading-relaxed">{ach.description}</p>
                </div>

                <div className="pt-2 border-t border-white/5 text-[11px] text-muted-foreground">
                  Awarded by: <span className="text-white font-medium">{ach.awardingBody}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
