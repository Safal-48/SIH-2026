"use client";

import * as React from "react";
import {
  UserCheck,
  GraduationCap,
  Building2,
  Landmark,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Handshake,
  Award,
  TrendingUp,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { useRouter } from "next/navigation";

interface SynergyPillar {
  id: string;
  title: string;
  badge: string;
  icon: React.ReactNode;
  headline: string;
  overview: string;
  capabilities: {
    title: string;
    desc: string;
  }[];
  caseStudy: string;
}

const SYNERGY_PILLARS: SynergyPillar[] = [
  {
    id: "scholars-industry",
    title: "Scholars ↔ Industry",
    badge: "Direct Placement & Residencies",
    icon: <UserCheck className="h-5 w-5 text-emerald-300" />,
    headline: "Zero-Resume Competency Hiring for Ayurveda Talent",
    overview:
      "Bypasses generic resume screening. Ayurvedic teaching hospitals, research centers, and herbal pharma recruit students based directly on verified clinical procedure hours, diagnostic scores, and supervisor attestations.",
    capabilities: [
      {
        title: "Tamper-Proof Competency Passport",
        desc: "Recruiters evaluate attested inpatient procedural hours and pulse diagnostics rather than subjective CV claims.",
      },
      {
        title: "Direct Pre-Screening Exemption",
        desc: "High-readiness scholars with 85%+ NCISM benchmark ratings unlock fast-track residency interview invitations.",
      },
      {
        title: "Standardized Stipendiary Fellowships",
        desc: "Transparent stipend scales ranging from ₹45,000 to ₹95,000 / month across apex teaching hospitals.",
      },
    ],
    caseStudy:
      "Over 1,840+ scholars directly matched to clinical fellowships across AIIA, Kottakkal Arya Vaidya Sala, and Dabur R&D hubs.",
  },
  {
    id: "faculty-industry",
    title: "Faculty ↔ Industry",
    badge: "Funded Research & Clinical Trials",
    icon: <Building2 className="h-5 w-5 text-amber-400" />,
    headline: "GCP-Ayush Collaborative Clinical Trials & Drug Assays",
    overview:
      "Connects senior Ayurvedic academic faculty with pharmaceutical enterprises to lead funded phytomedicine efficacy trials, HPTLC standardization assays, and peer-reviewed clinical research.",
    capabilities: [
      {
        title: "Sponsored R&D Grant Management",
        desc: "Direct institutional contracting for university-led clinical validation of proprietary herbal formulations.",
      },
      {
        title: "Multi-Centric Trial Coordination",
        desc: "Standardized patient cohort management across multiple AYUSH teaching hospitals adhering to GCP-Ayush norms.",
      },
      {
        title: "Co-Authored IP & Clinical Publications",
        desc: "Joint intellectual property filing, clinical monograph publication, and evidence-based pharmacovigilance.",
      },
    ],
    caseStudy:
      "₹14.8 Cr+ in collaborative research grants mobilized across 28 sponsored multicentric trials.",
  },
  {
    id: "institutions-industry",
    title: "Institutions ↔ Industry",
    badge: "Automated MOUs & Cohort Telemetry",
    icon: <Landmark className="h-5 w-5 text-emerald-300" />,
    headline: "Automated Academic MOUs & Accreditation Compliance",
    overview:
      "Enables Ayurvedic universities and affiliated colleges to establish automated institutional MOUs with hospital chains, stream student cohort telemetry, and maintain NCISM accreditation compliance.",
    capabilities: [
      {
        title: "Digital Institutional MOUs",
        desc: "Standardized legal and academic memorandums executed in minutes with cryptographic digital signatures.",
      },
      {
        title: "Real-Time Placement Telemetry",
        desc: "Institutional dean dashboards track student residency offer rates, average packages, and specialty distribution.",
      },
      {
        title: "NCISM Accreditation Audit Readiness",
        desc: "Automated generation of verified faculty-student procedural logbook records for annual council inspections.",
      },
    ],
    caseStudy:
      "85+ bilateral institutional MOUs executed with zero bureaucratic delay across 320+ colleges.",
  },
  {
    id: "faculty-scholars",
    title: "Faculty ↔ Scholars",
    badge: "Digital Logbook Attestation",
    icon: <GraduationCap className="h-5 w-5 text-emerald-300" />,
    headline: "Cryptographic Supervisor Sign-Off & Procedural Mentorship",
    overview:
      "Replaces vulnerable paper logbooks with an immutable digital sign-off portal. Faculty mentors inspect real-time clinical case entries, review diagnostic pulse notes, and digitally seal student competency passports.",
    capabilities: [
      {
        title: "Instant Mobile Clinical Endorsement",
        desc: "Supervising doctors review inpatient round summaries and sign off on bed-side procedural safety directly via mobile.",
      },
      {
        title: "Objective Diagnostic Rubrics",
        desc: "Faculty grade student Nadi Pariksha accuracy and Rogi Pariksha vignettes using standardized NCISM scoring keys.",
      },
      {
        title: "Personalized Remediation Triggers",
        desc: "The system flags diagnostic skill deficits, prompting faculty to assign targeted micro-modules and clinical workshops.",
      },
    ],
    caseStudy:
      "Over 48,000+ clinical procedure hours digitally attested by 1,200+ verified faculty guides.",
  },
];

const ACCREDITED_PARTNERS = [
  {
    name: "All India Institute of Ayurveda (AIIA)",
    location: "New Delhi",
    role: "Apex Academic & Hospital Partner",
    seats: "140+ Fellowship Seats",
    icon: <Landmark className="h-5 w-5 text-emerald-300" />,
  },
  {
    name: "Kottakkal Arya Vaidya Sala",
    location: "Kerala",
    role: "Panchakarma Clinical Center",
    seats: "50+ Traineeships",
    icon: <Building2 className="h-5 w-5 text-amber-400" />,
  },
  {
    name: "Dabur Research & Development",
    location: "Ghaziabad",
    role: "Pharma R&D Partner",
    seats: "22 Sponsored Grants",
    icon: <Sparkles className="h-5 w-5 text-emerald-300" />,
  },
  {
    name: "National Institute of Ayurveda (NIA)",
    location: "Jaipur",
    role: "Institutional Apex Node",
    seats: "90+ Attested Faculty",
    icon: <Award className="h-5 w-5 text-amber-400" />,
  },
  {
    name: "The Himalaya Drug Company",
    location: "Bengaluru",
    role: "Formulation Standardization Partner",
    seats: "Active Placement Drive",
    icon: <TrendingUp className="h-5 w-5 text-emerald-300" />,
  },
  {
    name: "Patanjali Research Institute",
    location: "Haridwar",
    role: "Integrative Clinical Studies Partner",
    seats: "14 Co-Authored Trials",
    icon: <ShieldCheck className="h-5 w-5 text-emerald-300" />,
  },
];

export function NetworkSection() {
  const router = useRouter();
  const [activePillarId, setActivePillarId] = React.useState<string>("scholars-industry");

  const activePillar =
    SYNERGY_PILLARS.find((p) => p.id === activePillarId) || SYNERGY_PILLARS[0];

  return (
    <section
      id="network"
      className="py-24 border-b border-border/40 bg-transparent relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. Dignified Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur-md">
            <Handshake className="h-3.5 w-3.5 text-amber-400" />
            <span>National Academia–Industry Exchange</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
            Bridging the Academia–Industry Divide
          </h2>
          <p className="text-base sm:text-lg text-gray-300/85 leading-relaxed font-normal">
            A unified institutional ecosystem connecting 320+ colleges, premier clinical teaching hospitals, and leading pharmaceutical enterprises through verified talent pipelines and funded collaborative research.
          </p>
        </div>

        {/* 2. Interactive 4-Pillar Synergy Selector (Clean Executive Tabs) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {SYNERGY_PILLARS.map((pillar) => {
            const isSelected = pillar.id === activePillarId;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActivePillarId(pillar.id)}
                className={cn(
                  "p-4 sm:p-5 rounded-2xl border transition-all text-left flex flex-col justify-between gap-3 cursor-pointer shadow-md",
                  isSelected
                    ? "bg-gradient-to-br from-emerald-900/90 to-emerald-950/95 border-emerald-400/50 text-white shadow-xl shadow-emerald-950/50 ring-1 ring-emerald-500/30 scale-[1.02]"
                    : "bg-[#041d13]/70 border-emerald-500/20 text-gray-300 hover:text-white hover:border-emerald-500/40 hover:bg-[#041d13]/90"
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-inner">
                    {pillar.icon}
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border",
                      isSelected
                        ? "bg-amber-950/60 border-amber-500/40 text-amber-300"
                        : "bg-emerald-950/60 border-emerald-500/20 text-emerald-300/80"
                    )}
                  >
                    {isSelected ? "Active Track" : "Track"}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {pillar.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-emerald-300/80 mt-0.5 font-medium leading-tight">
                    {pillar.badge}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* 3. Executive Collaborative Exchange Console (Double Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Panel (7 cols): Functional Capabilities & Real-World Case Study */}
          <div className="lg:col-span-7 rounded-3xl bg-[#041d13]/90 backdrop-blur-xl border border-emerald-500/25 p-7 sm:p-9 shadow-2xl space-y-6 flex flex-col justify-between text-left">
            <div>
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-2">
                <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                  {activePillar.badge}
                </span>
                <span className="text-xs text-amber-400 font-serif italic">
                  Autonomous Protocol v2.4
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
                {activePillar.headline}
              </h3>
              <p className="text-sm sm:text-base text-gray-300/85 leading-relaxed mb-6 font-normal">
                {activePillar.overview}
              </p>

              {/* 3 Capabilities */}
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-400">
                  Key Institutional Capabilities:
                </p>
                {activePillar.capabilities.map((cap, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-[#02140d]/90 border border-emerald-500/20 hover:border-emerald-500/35 transition-all space-y-1 shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <h5 className="text-sm sm:text-base font-bold text-white">
                        {cap.title}
                      </h5>
                    </div>
                    <p className="text-xs text-gray-300/80 leading-relaxed pl-6 font-normal">
                      {cap.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Footnote */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/25 flex items-start gap-3">
              <Award className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-white block">Proven National Impact:</span>
                <p className="text-xs text-gray-300/85 mt-0.5 font-normal leading-relaxed">
                  {activePillar.caseStudy}
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel (5 cols): Accredited Participating Organizations */}
          <div className="lg:col-span-5 rounded-3xl bg-[#041d13]/95 backdrop-blur-2xl border border-emerald-500/30 p-7 sm:p-9 shadow-2xl space-y-6 flex flex-col justify-between text-left">
            <div className="space-y-5">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-amber-400 font-bold block mb-1">
                  Verified Institutional Node Network
                </span>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                  Accredited Industry & Hospital Partners
                </h4>
              </div>

              {/* Partners Cards */}
              <div className="space-y-2.5">
                {ACCREDITED_PARTNERS.map((partner, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-[#02140d]/90 border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-inner">
                        {partner.icon}
                      </div>
                      <div>
                        <h6 className="text-xs sm:text-sm font-bold text-white leading-tight">
                          {partner.name}
                        </h6>
                        <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">
                          {partner.location} •{" "}
                          <span className="text-emerald-300 font-medium">{partner.role}</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-full shrink-0">
                      {partner.seats}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-5 border-t border-emerald-500/15 flex flex-col sm:flex-row gap-3">
              <Button
                variant="gold"
                size="md"
                onClick={() => router.push("/role-selection")}
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="w-full justify-center rounded-xl font-bold text-xs sm:text-sm py-3 shadow-lg shadow-amber-500/20"
              >
                Join Institutional Network
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => router.push("/opportunities")}
                leftIcon={<FileText className="h-4 w-4 text-emerald-400" />}
                className="w-full justify-center rounded-xl font-semibold text-xs sm:text-sm py-3 border-emerald-500/30 text-gray-200 hover:text-white"
              >
                Explore Active MOUs
              </Button>
            </div>
          </div>
        </div>

        {/* 4. Bottom National Telemetry Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-7 rounded-3xl bg-[#041d13]/85 backdrop-blur-xl border border-emerald-500/25 shadow-2xl">
          <div className="text-center px-2 sm:px-4 border-r last:border-0 border-emerald-500/20">
            <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">₹14.8 Cr+</p>
            <p className="text-xs font-medium text-emerald-300/80 mt-1">Funded Collaborative Grants</p>
          </div>
          <div className="text-center px-2 sm:px-4 border-r last:border-0 border-emerald-500/20">
            <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">1,840+</p>
            <p className="text-xs font-medium text-emerald-300/80 mt-1">Direct Residencies Offered</p>
          </div>
          <div className="text-center px-2 sm:px-4 border-r last:border-0 border-emerald-500/20">
            <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">320+</p>
            <p className="text-xs font-medium text-emerald-300/80 mt-1">Affiliated Medical Colleges</p>
          </div>
          <div className="text-center px-2 sm:px-4 last:border-0 border-emerald-500/20">
            <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">85+</p>
            <p className="text-xs font-medium text-emerald-300/80 mt-1">Bilateral Institutional MOUs</p>
          </div>
        </div>
      </div>
    </section>
  );
}
