"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Stethoscope,
  Sparkles,
  GraduationCap,
  Building2,
  CheckCircle2,
  Award,
  FileText,
  BookOpen,
  HeartPulse,
  Activity,
  ArrowRight,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { useRouter } from "next/navigation";

interface ClinicalProcedure {
  code: string;
  title: string;
  desc: string;
  level: string;
}

interface ClinicalSpecialization {
  id: string;
  name: string;
  sanskrit: string;
  classicalText: string;
  overview: string;
  benchmarkHours: string;
  placementDemand: string;
  averageStipend: string;
  icon: React.ReactNode;
  procedures: ClinicalProcedure[];
  affiliates: string[];
}

const CLINICAL_DOMAINS: ClinicalSpecialization[] = [
  {
    id: "kayachikitsa",
    name: "Kayachikitsa & Pulse Diagnostics",
    sanskrit: "कायचिकित्सा एवं नाड़ी परीक्षा",
    classicalText: "Charaka Samhita (Chikitsa Sthana)",
    overview:
      "Core internal medicine and systematic diagnostic assessment. Encompasses multi-depth radial pulse palpation (Nadi Pariksha), eight-fold Rogi Pariksha, and holistic metabolic management.",
    benchmarkHours: "480+ Supervised Bedside Hours",
    placementDemand: "96% High Residency Demand",
    averageStipend: "₹48,000 - ₹75,000 / mo",
    icon: <Stethoscope className="h-5 w-5 text-emerald-300" />,
    procedures: [
      {
        code: "NCISM-KC-01",
        title: "Radial Nadi Pariksha & Gati Assessment",
        desc: "Supervised evaluation of Sarpa (Vata), Manduka (Pitta), and Hamsa (Kapha) pulse depth and systemic imbalance.",
        level: "Mastery Required",
      },
      {
        code: "NCISM-KC-02",
        title: "Ashtavidha Rogi Pariksha Protocol",
        desc: "Eight-fold diagnostic audit: Nadi, Mutra, Mala, Jihva, Shabda, Sparsha, Drik, and Akriti documentation.",
        level: "Core Competency",
      },
      {
        code: "NCISM-KC-03",
        title: "Metabolic Rogi Protocol & Pathya Prescription",
        desc: "Formulation of targeted herbal interventions and dietary regimens for metabolic afflictions (Prameha, Amavata).",
        level: "Core Competency",
      },
    ],
    affiliates: [
      "All India Institute of Ayurveda, New Delhi",
      "National Institute of Ayurveda (NIA), Jaipur",
      "Institute of Teaching & Research in Ayurveda (ITRA), Jamnagar",
    ],
  },
  {
    id: "panchakarma",
    name: "Panchakarma & Bio-Purification",
    sanskrit: "पंचकर्म चिकित्सा एवं शोधन",
    classicalText: "Sushruta Samhita & Ashtanga Hridaya",
    overview:
      "Standardized therapeutic detox and cleansing protocols. Focuses on safe administration of Purvakarma (Snehana-Swedana), Pradhanakarma (Vamana, Virechana, Basti), and Paschatkarma diets.",
    benchmarkHours: "520+ Procedure Log Hours",
    placementDemand: "98% Highest Global Demand",
    averageStipend: "₹52,000 - ₹95,000 / mo",
    icon: <Sparkles className="h-5 w-5 text-amber-400" />,
    procedures: [
      {
        code: "NCISM-PK-01",
        title: "Vamana & Virechana Calibration",
        desc: "Physiological assessment of Samyak Snigdha Lakshana and regulated induction of metabolic bio-purification.",
        level: "Mastery Required",
      },
      {
        code: "NCISM-PK-02",
        title: "Basti Administration & Preparation",
        desc: "Formulation and clinical delivery of Niruha and Anuvasana medicated decoctions and therapeutic retention.",
        level: "Mastery Required",
      },
      {
        code: "NCISM-PK-03",
        title: "Para-Surgical Nasya & Jalaukavacharana",
        desc: "Precision Shiro-virechana instillation and medicinal leech therapy for micro-circulatory purification.",
        level: "Core Competency",
      },
    ],
    affiliates: [
      "Kottakkal Arya Vaidya Sala, Kerala",
      "Vaidyaratnam Oushadhasala, Ollur",
      "AIIA Panchakarma Center of Excellence",
    ],
  },
  {
    id: "shalya",
    name: "Shalya Tantra & Ksharsutra",
    sanskrit: "शल्य तंत्र एवं क्षारसूत्र",
    classicalText: "Sushruta Samhita (Sutra & Nidana)",
    overview:
      "Classical Ayurvedic surgery, parasurgical interventions, and minimally invasive anorectal procedures. Internationally recognized for superior clinical outcomes in fistula-in-ano.",
    benchmarkHours: "380+ OT / Procedure Hours",
    placementDemand: "92% Specialized Clinical Demand",
    averageStipend: "₹55,000 - ₹90,000 / mo",
    icon: <HeartPulse className="h-5 w-5 text-emerald-300" />,
    procedures: [
      {
        code: "NCISM-ST-01",
        title: "Ksharsutra Preparation & Fistula Ligation",
        desc: "Preparation of standardized alkaline medicated setons and supervised ambulatory threading in Bhagandara.",
        level: "Mastery Required",
      },
      {
        code: "NCISM-ST-02",
        title: "Agnikarma Pain Management Therapy",
        desc: "Therapeutic thermal application with Panchadhatu Shalaka for chronic musculoskeletal pain syndromes.",
        level: "Core Competency",
      },
      {
        code: "NCISM-ST-03",
        title: "Vrana Shodhana & Ropana Wound Healing",
        desc: "Standardized biological debridement and topical phyto-chemical dressings for chronic diabetic ulcers.",
        level: "Core Competency",
      },
    ],
    affiliates: [
      "Faculty of Ayurveda, IMS BHU, Varanasi",
      "AIIA Department of Shalya Tantra",
      "Government Ayurvedic College & Hospital, Mumbai",
    ],
  },
  {
    id: "dravyaguna",
    name: "Dravyaguna & Phyto-Pharmacology",
    sanskrit: "द्रव्यगुण विज्ञान एवं रसशास्त्र",
    classicalText: "Bhavaprakasha Nighantu & API Standards",
    overview:
      "Herbal drug authentication, pharmacognosy, and pharmaceutical standardization. Merges classical Rasa-Guna-Virya-Vipaka science with modern HPTLC phytochemical fingerprinting.",
    benchmarkHours: "340+ Analytical Lab Hours",
    placementDemand: "89% Pharma & R&D Demand",
    averageStipend: "₹45,000 - ₹82,000 / mo",
    icon: <BookOpen className="h-5 w-5 text-emerald-300" />,
    procedures: [
      {
        code: "NCISM-DG-01",
        title: "Botanical Raw Material Assaying",
        desc: "Microscopic and macroscopic identification of therapeutic herbs and detection of commercial adulterants.",
        level: "Mastery Required",
      },
      {
        code: "NCISM-DG-02",
        title: "HPTLC Phytochemical Fingerprinting",
        desc: "Chromatographic quantification of active bio-markers benchmarked to Ayurvedic Pharmacopoeia of India (API).",
        level: "Advanced Skill",
      },
      {
        code: "NCISM-DG-03",
        title: "Classical Shodhana & Bhasma Safety",
        desc: "Standard operating procedure auditing for mineral purification, incineration cycles, and heavy metal testing.",
        level: "Core Competency",
      },
    ],
    affiliates: [
      "Dabur Research & Development Center",
      "The Himalaya Drug Company Research Hub",
      "Patanjali Research Institute, Haridwar",
    ],
  },
  {
    id: "prasuti",
    name: "Prasuti Tantra & Pediatrics",
    sanskrit: "प्रसूति तंत्र एवं कौमारभृत्य",
    classicalText: "Kashyapa Samhita & Charaka Sharira Sthana",
    overview:
      "Maternal antenatal health, natural obstetric support, and holistic pediatric care. Focuses on Garbha Sanskar, postpartum rejuvenation (Sutika Paricharya), and Suvarna Prashan immunization.",
    benchmarkHours: "360+ Supervised Ward Hours",
    placementDemand: "91% Integrative Maternal Demand",
    averageStipend: "₹46,000 - ₹78,000 / mo",
    icon: <GraduationCap className="h-5 w-5 text-amber-400" />,
    procedures: [
      {
        code: "NCISM-PT-01",
        title: "Garbha Sanskar & Antenatal Protocol",
        desc: "Monthly Ayurvedic maternal nutrition, psycho-emotional balance, and trimester-specific herbal supplements.",
        level: "Core Competency",
      },
      {
        code: "NCISM-PT-02",
        title: "Sutika Paricharya Postpartum Recovery",
        desc: "Lactation optimization, maternal abdominal wrapping, Abhyanga, and restorative medicinal formulations.",
        level: "Mastery Required",
      },
      {
        code: "NCISM-PT-03",
        title: "Suvarna Prashan & Pediatric Care",
        desc: "Standardized preparation and administration of pediatric herbal bio-enhancers for natural immunity.",
        level: "Core Competency",
      },
    ],
    affiliates: [
      "AIIA Department of Kaumarbhritya",
      "SDM College of Ayurveda, Udupi",
      "Government Ayurvedic Medical College, Bengaluru",
    ],
  },
  {
    id: "research",
    name: "Ayush Research & Epidemiology",
    sanskrit: "आयुष शोध एवं साक्ष्य-आधारित चिकित्सा",
    classicalText: "NCISM Guidelines & GCP-Ayush Framework",
    overview:
      "Evidence-based clinical documentation, biostatistics, and integrative clinical trial methodology. Bridges traditional Samhita clinical wisdom with modern biomedical research ethics.",
    benchmarkHours: "300+ Clinical Research Hours",
    placementDemand: "94% Rapid National Growth",
    averageStipend: "₹50,000 - ₹88,000 / mo",
    icon: <Activity className="h-5 w-5 text-emerald-300" />,
    procedures: [
      {
        code: "NCISM-RE-01",
        title: "GCP-Ayush Clinical Trial Protocol",
        desc: "Designing randomized, double-blind clinical trials adhering to Central Council for Research (CCRAS) norms.",
        level: "Advanced Skill",
      },
      {
        code: "NCISM-RE-02",
        title: "Electronic Medical Record (EMR) Auditing",
        desc: "Attestation of standardized ICD-11 / NAMASTE Ayush terminology in computerized hospital management systems.",
        level: "Core Competency",
      },
      {
        code: "NCISM-RE-03",
        title: "Pharmacovigilance & Adverse Event Tracking",
        desc: "Surveillance, causal analysis, and regulatory reporting of herbal drug interactions to national monitoring hubs.",
        level: "Core Competency",
      },
    ],
    affiliates: [
      "Central Council for Research in Ayurvedic Sciences (CCRAS)",
      "WHO Global Traditional Medicine Centre (GTMC), Jamnagar",
      "Clinical Research Cell, AIIA New Delhi",
    ],
  },
];

export function NadiClinicalSimulator() {
  const router = useRouter();
  const [selectedDomainId, setSelectedDomainId] = useState<string>("kayachikitsa");

  const activeDomain =
    CLINICAL_DOMAINS.find((d) => d.id === selectedDomainId) || CLINICAL_DOMAINS[0];

  return (
    <section
      id="clinical-matrix"
      className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* 1. Dignified Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur-md">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
            <span>NCISM Clinical Competency Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15]">
            Standardized Clinical Excellence Across 6 Core Specializations
          </h2>
          <p className="text-base sm:text-lg text-gray-300/85 leading-relaxed font-normal">
            Benchmarked by the All India Institute of Ayurveda and NCISM to align academic procedure logbooks directly with national teaching hospital standards.
          </p>
        </div>

        {/* 2. Interactive Specialization Pill Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-2 justify-start lg:justify-center">
          {CLINICAL_DOMAINS.map((domain) => {
            const isSelected = domain.id === selectedDomainId;
            return (
              <button
                key={domain.id}
                type="button"
                onClick={() => setSelectedDomainId(domain.id)}
                className={cn(
                  "flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all shrink-0 text-left cursor-pointer",
                  isSelected
                    ? "bg-gradient-to-r from-emerald-900/90 to-emerald-950/95 border border-emerald-400/50 text-white shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-500/30 scale-[1.02]"
                    : "bg-[#041d13]/70 border border-emerald-500/20 text-gray-300 hover:text-white hover:border-emerald-500/40 hover:bg-[#041d13]"
                )}
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  {domain.icon}
                </div>
                <div>
                  <span className="block font-bold leading-tight">{domain.name.split("&")[0]}</span>
                  <span className="block text-[10px] text-emerald-300/80 font-serif italic mt-0.5">
                    {domain.sanskrit.split(" ")[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 3. Executive Dossier Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column (7 cols): Procedural Curriculum & Standardized Logbook Rubrics */}
          <div className="lg:col-span-7 rounded-3xl bg-[#041d13]/90 backdrop-blur-xl border border-emerald-500/25 p-7 sm:p-9 shadow-2xl space-y-6 flex flex-col justify-between text-left">
            <div>
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                    {activeDomain.benchmarkHours}
                  </span>
                  <span className="text-xs text-amber-400 font-serif italic">
                    Source: {activeDomain.classicalText}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/25 px-3 py-1 rounded-full">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  NCISM Level 4 Certified
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                {activeDomain.name}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-300/90 font-serif italic mb-4">
                {activeDomain.sanskrit}
              </p>
              <p className="text-sm sm:text-base text-gray-300/85 leading-relaxed mb-6 font-normal">
                {activeDomain.overview}
              </p>

              {/* Procedures List */}
              <div className="space-y-3.5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-400">
                  Attested Procedural Competencies (Hospital Logbook Rubrics):
                </p>
                {activeDomain.procedures.map((proc) => (
                  <div
                    key={proc.code}
                    className="p-4 rounded-2xl bg-[#02140d]/90 border border-emerald-500/20 hover:border-emerald-500/35 transition-all space-y-1.5 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                          {proc.code}
                        </span>
                        <h5 className="text-sm sm:text-base font-bold text-white">
                          {proc.title}
                        </h5>
                      </div>
                      <span className="text-[10px] font-semibold text-amber-300 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded-full shrink-0">
                        {proc.level}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300/80 leading-relaxed font-normal pl-0.5">
                      {proc.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Sign-off Note */}
            <div className="pt-5 border-t border-emerald-500/15 flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5 text-emerald-300 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Cryptographic Faculty Sign-off Enabled
              </span>
              <span className="text-gray-400">AIIA Curriculum Standard v3.2</span>
            </div>
          </div>

          {/* Right Column (5 cols): Teaching Hospitals & Career Placement Intelligence */}
          <div className="lg:col-span-5 rounded-3xl bg-[#041d13]/95 backdrop-blur-2xl border border-emerald-500/30 p-7 sm:p-9 shadow-2xl space-y-6 flex flex-col justify-between text-left">
            <div className="space-y-6">
              {/* Top Intelligence Metrics */}
              <div>
                <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-amber-400 font-bold block mb-1">
                  National Opportunity Intelligence
                </span>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                  Hospital Residency & Placement Fit
                </h4>
              </div>

              {/* Metric Highlights Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-[#02140d]/90 border border-emerald-500/25 space-y-1 shadow-inner">
                  <span className="text-[11px] font-medium text-gray-400 block">National Demand</span>
                  <span className="text-lg sm:text-xl font-black text-emerald-300 block">
                    {activeDomain.placementDemand.split(" ")[0]}
                  </span>
                  <span className="text-[10px] text-gray-400 block">Residency Placement Rate</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#02140d]/90 border border-emerald-500/25 space-y-1 shadow-inner">
                  <span className="text-[11px] font-medium text-gray-400 block">Stipend Potential</span>
                  <span className="text-lg sm:text-xl font-black text-amber-300 block">
                    {activeDomain.averageStipend.split(" ")[0]}
                  </span>
                  <span className="text-[10px] text-gray-400 block">Accredited Monthly Fellowship</span>
                </div>
              </div>

              {/* Top Accredited Hospitals & R&D Network */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-400">
                  Participating Teaching Hospitals & Institutes:
                </p>
                <div className="space-y-2">
                  {activeDomain.affiliates.map((aff, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#02140d]/80 border border-emerald-500/20 flex items-center gap-3 text-xs text-gray-200"
                    >
                      <Building2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span className="font-medium">{aff}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Passport Sync Note */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/25 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Award className="h-4 w-4 text-amber-400" />
                  <span>Direct Competency Passport Attestation</span>
                </div>
                <p className="text-xs text-gray-300/80 leading-relaxed font-normal">
                  Completion of these procedures automatically credits tamper-evident verification badges to your Digital Ayush Passport.
                </p>
              </div>
            </div>

            {/* Direct Action CTAs */}
            <div className="pt-6 border-t border-emerald-500/15 flex flex-col sm:flex-row gap-3">
              <Button
                variant="gold"
                size="md"
                onClick={() => router.push("/role-selection")}
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="w-full justify-center rounded-xl font-bold text-xs sm:text-sm py-3 shadow-lg shadow-amber-500/20"
              >
                Access Skill Passport
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => router.push("/opportunities")}
                leftIcon={<FileText className="h-4 w-4 text-emerald-400" />}
                className="w-full justify-center rounded-xl font-semibold text-xs sm:text-sm py-3 border-emerald-500/30 text-gray-200 hover:text-white"
              >
                View Hospital Openings
              </Button>
            </div>
          </div>
        </div>

        {/* 4. Bottom Clinical Trust Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-7 rounded-3xl bg-[#041d13]/85 backdrop-blur-xl border border-emerald-500/25 shadow-2xl">
          <div className="text-center px-2 sm:px-4 border-r last:border-0 border-emerald-500/20">
            <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">1,250+</p>
            <p className="text-xs font-medium text-emerald-300/80 mt-1">Standardized Hospital Procedures</p>
          </div>
          <div className="text-center px-2 sm:px-4 border-r last:border-0 border-emerald-500/20">
            <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">2.4M+</p>
            <p className="text-xs font-medium text-emerald-300/80 mt-1">Supervised Bedside Hours Logged</p>
          </div>
          <div className="text-center px-2 sm:px-4 border-r last:border-0 border-emerald-500/20">
            <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">320+</p>
            <p className="text-xs font-medium text-emerald-300/80 mt-1">Accredited Teaching Hospitals</p>
          </div>
          <div className="text-center px-2 sm:px-4 last:border-0 border-emerald-500/20">
            <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">99.4%</p>
            <p className="text-xs font-medium text-emerald-300/80 mt-1">Cryptographic Verification Fidelity</p>
          </div>
        </div>
      </div>
    </section>
  );
}
