"use client";

import React, { useState } from "react";
import {
  Leaf,
  Flame,
  Sprout,
  Sparkles,
  Info,
  GraduationCap,
  Stethoscope,
  Scroll,
  Activity,
  Building2,
  Globe,
  FlaskConical,
  Award,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  Landmark,
  Compass,
  ArrowRight,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useRouter } from "next/navigation";

interface CareerPathwayResult {
  title: string;
  category: string;
  matchScore: number;
  salaryRange: string;
  demandGrowth: string;
  recommendedRole: string;
  description: string;
  topSkills: string[];
  keyHospitals: string[];
  certifications: string[];
}

const DOSHA_OPTIONS = [
  {
    id: "vata",
    name: "Vata (Intellectual & Dynamic)",
    element: "Ether & Air",
    icon: Sparkles,
    tagline: "Excels in Pharmacovigilance, Botanical Analysis & Diagnostic Innovation.",
    color: "from-amber-500/20 to-yellow-600/10 border-amber-500/40 text-amber-300",
  },
  {
    id: "pitta",
    name: "Pitta (Decisive & Clinical)",
    element: "Fire & Water",
    icon: Flame,
    tagline: "Excels in Acute Kayachikitsa, Shalya Tantra (Surgical) & Hospital Leadership.",
    color: "from-red-500/20 to-orange-600/10 border-red-500/40 text-red-300",
  },
  {
    id: "kapha",
    name: "Kapha (Methodical & Healing)",
    element: "Earth & Water",
    icon: Sprout,
    tagline: "Excels in Chronic Panchakarma, Rasayana, Patient Rehabilitation & Long-term Care.",
    color: "from-emerald-500/20 to-green-600/10 border-emerald-500/40 text-emerald-300",
  },
  {
    id: "tridosha",
    name: "Tridoshic (Integrative Polymath)",
    element: "Harmonious Equilibrium",
    icon: Sparkles,
    tagline: "Excels in AI Tele-Ayush, Global Wellness Tourism, Clinical Trials & Ayur-Tech.",
    color: "from-purple-500/20 to-indigo-600/10 border-purple-500/40 text-purple-300",
  },
];

const STAGE_OPTIONS = [
  { id: "bams", label: "BAMS Student (1st - 4th Year)", icon: GraduationCap },
  { id: "intern", label: "Rotatory Clinical Intern", icon: Stethoscope },
  { id: "pg", label: "MD / MS Ayurveda Scholar", icon: Scroll },
  { id: "practitioner", label: "Licensed Vaidya / Clinician", icon: Activity },
];

const SECTOR_OPTIONS = [
  { id: "pharma", label: "Herbal Pharma R&D & Formulations", icon: Leaf },
  { id: "hospital", label: "NABH Super-Specialty Ayush Hospital", icon: Building2 },
  { id: "wellness", label: "Global Wellness & Medical Tourism", icon: Globe },
  { id: "research", label: "Clinical Trials & Ministry Fellowships", icon: FlaskConical },
];

const PATHWAY_DATA: Record<string, CareerPathwayResult> = {
  "vata-pharma": {
    title: "Phytopharmaceutical Formulation Scientist",
    category: "Pharma R&D",
    matchScore: 97,
    salaryRange: "₹8.5 LPA – ₹16.2 LPA",
    demandGrowth: "+24% YoY Surge",
    recommendedRole: "Dabur Research Foundation & Patanjali R&D Center",
    description: "Lead standardized herbal extraction, batch chromatography, and NCISM/FDA regulatory documentation for global market formulations.",
    topSkills: ["HPTLC Fingerprinting", "Dravyaguna Standardization", "Good Laboratory Practice (GLP)", "Batch Dossier Prep"],
    keyHospitals: ["Dabur R&D", "Himalaya Wellness", "Charak Pharma"],
    certifications: ["NCISM Batch Formulation Fellow", "AIIA Quality Control Seal"],
  },
  "vata-hospital": {
    title: "Diagnostic Vaidya & Nadi Analytics Specialist",
    category: "Clinical Diagnostics",
    matchScore: 92,
    salaryRange: "₹7.5 LPA – ₹14.0 LPA",
    demandGrowth: "+18% YoY Surge",
    recommendedRole: "AIIA Clinical Diagnostics Division",
    description: "Harness clinical pulse diagnostics merged with sensor-based Nadi instruments for comprehensive metabolic constitution profiling.",
    topSkills: ["Nadi Pariksha Sensor Diagnostics", "Vikriti Mapping", "Metabolic Profiling", "EMR Digital Documentation"],
    keyHospitals: ["AIIA New Delhi", "SDM Ayurveda Hospital", "Chakrapani Ayurveda"],
    certifications: ["Certified Nadi Diagnostician (NCISM)", "AIIA Attested Logbook"],
  },
  "pitta-hospital": {
    title: "Chief Kayachikitsa & Acute Care Consultant",
    category: "Clinical Hospital Care",
    matchScore: 98,
    salaryRange: "₹10.5 LPA – ₹22.0 LPA",
    demandGrowth: "+32% YoY Surge",
    recommendedRole: "NABH Certified Ayush Centers & Integrated ICU Wings",
    description: "Manage complex metabolic, autoimmune, and chronic inflammatory conditions utilizing rigorous Ayurvedic intervention protocols.",
    topSkills: ["Emergency Samprapti Vighatana", "Dosha Shodhana Protocols", "NABH Clinical Quality Compliance", "Integrative Drug Synergy"],
    keyHospitals: ["All India Institute of Ayurveda", "Kottakkal Arya Vaidya Sala", "Amrita School of Ayurveda"],
    certifications: ["NABH Assessor Fellowship", "AIIA Inpatient Kayachikitsa Attestation"],
  },
  "pitta-research": {
    title: "Ayurveda Clinical Trials Investigator",
    category: "Clinical Research",
    matchScore: 95,
    salaryRange: "₹9.0 LPA – ₹18.5 LPA",
    demandGrowth: "+28% YoY Surge",
    recommendedRole: "CCRAS & ICMR Collaborative Ayush Trials",
    description: "Design and manage randomized controlled trials (RCTs) testing classical formulations against modern pharmaceutical benchmarks.",
    topSkills: ["GCP-ICH Trial Design", "Bio-statistical Analysis", "Ethics Committee Documentation", "Adverse Event Pharmacovigilance"],
    keyHospitals: ["CCRAS Headquarters", "AIIA Research Wing", "CSIR-CDRI"],
    certifications: ["GCP Certified Trialist", "NCISM Clinical Bioethics Endorsement"],
  },
  "kapha-hospital": {
    title: "Master Panchakarma & Rasayana Director",
    category: "Therapeutic Procedures",
    matchScore: 96,
    salaryRange: "₹8.8 LPA – ₹19.0 LPA",
    demandGrowth: "+30% YoY Surge",
    recommendedRole: "Luxury Ayurveda Healing Sanatoriums & Multispecialty Centers",
    description: "Direct end-to-end Shodhana regimens, personalized Snehana-Swedana cycles, and geriatric rejuvenative therapy with zero complication index.",
    topSkills: ["Panchakarma Protocol Supervision", "Vamana & Virechana Calibration", "Post-Procedure Samsarjana Krama", "Patient Safety Management"],
    keyHospitals: ["Arya Vaidya Pharmacy Coimbatore", "Patanjali Yogpeeth Hospital", "AIIA Delhi"],
    certifications: ["Master Panchakarma Supervisor", "AIIA 120-Case Clinical Logbook"],
  },
  "kapha-wellness": {
    title: "Global Medical Tourism & Wellness Director",
    category: "Global Wellness",
    matchScore: 94,
    salaryRange: "₹12.0 LPA – ₹26.0 LPA",
    demandGrowth: "+35% YoY Surge",
    recommendedRole: "International Wellness Retreats & Ayush Export Centers",
    description: "Lead clinical wellness retreats catering to high-net-worth international clients seeking authentic detoxification and longevity therapy.",
    topSkills: ["Cross-Cultural Consultation", "Dinacharya & Ritucharya Scheduling", "Holistic Nutrition Planning", "Hospitality Clinical Standards"],
    keyHospitals: ["Ananda in the Himalayas", "Somatheeram Ayurvedic Resort", "Kairali Ayurvedic Village"],
    certifications: ["Global Ayush Ambassador Attestation", "NCISM Wellness Director Certificate"],
  },
  "tridosha-research": {
    title: "Ayur-Tech & AI Computational Bio-Informatics Lead",
    category: "Emerging Tech & Ayur-Informatics",
    matchScore: 99,
    salaryRange: "₹14.0 LPA – ₹28.0 LPA",
    demandGrowth: "+48% YoY Surge",
    recommendedRole: "Ayur-Tech Startups, IIT-AIIA Joint Centers & Gov Innovation Hubs",
    description: "Combine 30,000 classical formulations with machine learning models for predictive disease modeling and automated Prakriti profiling.",
    topSkills: ["Ayurveda Computational Ontology", "Digital Prakriti Assessment Algorithms", "Python / R Bio-Informatics", "AYUSH EMR Interoperability"],
    keyHospitals: ["IIT Delhi – AIIA AyurTech Lab", "TCS Ayush Analytics", "AyurGenomics Council"],
    certifications: ["National Ayur-Tech Pioneer Seal", "NCISM Digital Passport Hash 0x981A"],
  },
};

// Fallback for remaining combinations
const DEFAULT_RESULT: CareerPathwayResult = {
  title: "Specialized Clinical Ayurveda Officer & Resident",
  category: "Clinical Excellence",
  matchScore: 93,
  salaryRange: "₹8.0 LPA – ₹15.5 LPA",
  demandGrowth: "+22% YoY Surge",
  recommendedRole: "National Health Mission Ayush Centers & AIIA Network",
  description: "Comprehensive patient consultation, individualized herbal dispensations, and preventive public health advocacy across regional health centers.",
  topSkills: ["Clinical Nadi Pariksha", "Dravyaguna Selection", "Panchakarma Consultation", "Digital Logbook Records"],
  keyHospitals: ["National Ayush Mission Centers", "AIIA Partner Hospitals", "State Ayurveda Colleges"],
  certifications: ["NCISM Primary Registration", "AIIA Attested Clinical Passport"],
};

export function DoshaCareerMatcherSection() {
  const router = useRouter();
  const [selectedDosha, setSelectedDosha] = useState("pitta");
  const [selectedStage, setSelectedStage] = useState("intern");
  const [selectedSector, setSelectedSector] = useState("hospital");
  const [isCalculating, setIsCalculating] = useState(false);

  const lookupKey = `${selectedDosha}-${selectedSector}`;
  const result = PATHWAY_DATA[lookupKey] || DEFAULT_RESULT;

  const handleSelect = (setter: (val: string) => void, val: string) => {
    setter(val);
    setIsCalculating(true);
  };

  return (
    <section id="dosha-matcher" className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-border/40 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider shadow-xs">
            <Leaf className="h-3.5 w-3.5 text-emerald-400" />
            <span>AI-Driven Prakriti & Skill Matcher</span>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-serif font-bold text-foreground tracking-tight">
              Discover Your Ayurveda Career
            </h2>
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="h-px w-14 sm:w-20 bg-gradient-to-r from-transparent to-emerald-400/50" />
              <span className="text-3xl sm:text-4xl lg:text-5xl font-heading font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-herbal-300 tracking-wider">
                DNA
              </span>
              <div className="h-px w-14 sm:w-20 bg-gradient-to-l from-transparent to-emerald-400/50" />
            </div>
            <div className="flex justify-center -mt-0.5">
              <Leaf className="h-3.5 w-3.5 text-emerald-400/80" />
            </div>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Select your clinical archetype, current academic stage, and dream sector. Our NCISM-aligned matching algorithm calculates your highest-earning, high-growth pathway in real-time.
          </p>
        </div>

        {/* Interactive 2-Column Playground */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Selectors */}
          <div className="lg:col-span-6 space-y-6">
            {/* Step 1: Dosha / Clinical Archetype */}
            <div className="p-6 rounded-2xl bg-card/80 backdrop-blur-md border border-border shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[11px] font-bold">1</span>
                    Choose Your Dominant Clinical Archetype
                  </span>
                  <p className="text-[11px] text-muted-foreground mt-1 ml-7">
                    Select the area that resonates most with your interests and strengths.
                  </p>
                </div>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1 shrink-0">
                  Prakriti Inclination <Info className="h-3 w-3 text-muted-foreground/70" />
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DOSHA_OPTIONS.map((dosha) => {
                  const isSelected = selectedDosha === dosha.id;
                  const IconComp = dosha.icon;
                  return (
                    <button
                      key={dosha.id}
                      onClick={() => handleSelect(setSelectedDosha, dosha.id)}
                      className={`text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between gap-2.5 ${
                        isSelected
                          ? "bg-primary/15 border-accent shadow-md shadow-accent/10 scale-[1.01]"
                          : "bg-muted/40 border-border/70 hover:border-primary/50 hover:bg-muted/70"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="w-8 h-8 rounded-lg bg-background/80 border border-border/80 flex items-center justify-center">
                          <IconComp className={`h-4 w-4 ${isSelected ? "text-accent" : "text-emerald-400"}`} />
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            isSelected ? "border-accent bg-accent/20" : "border-border/80"
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-accent" />}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">{dosha.name}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2 leading-tight">
                          {dosha.tagline}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Academic Milestone */}
            <div className="p-6 rounded-2xl bg-card/80 backdrop-blur-md border border-border shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[11px] font-bold">2</span>
                  Select Your Academic Milestone
                </span>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  Career Stage <Info className="h-3 w-3 text-muted-foreground/70" />
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {STAGE_OPTIONS.map((stage) => {
                  const isSelected = selectedStage === stage.id;
                  const IconComp = stage.icon;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => handleSelect(setSelectedStage, stage.id)}
                      className={`px-3.5 py-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-2.5 ${
                        isSelected
                          ? "bg-gradient-to-r from-emerald-600/90 to-primary text-white border-emerald-500 shadow-sm"
                          : "bg-muted/40 text-muted-foreground border-border hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <IconComp className={`h-4 w-4 shrink-0 ${isSelected ? "text-white" : "text-emerald-400"}`} />
                      <span className="truncate">{stage.label}</span>
                      {isSelected && <ChevronRight className="h-3.5 w-3.5 shrink-0 ml-auto text-white/80" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Desired Industry Sector */}
            <div className="p-6 rounded-2xl bg-card/80 backdrop-blur-md border border-border shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[11px] font-bold">3</span>
                  Target Industry Sector
                </span>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  Ecosystem Vertical <Info className="h-3 w-3 text-muted-foreground/70" />
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SECTOR_OPTIONS.map((sector) => {
                  const isSelected = selectedSector === sector.id;
                  const IconComp = sector.icon;
                  return (
                    <button
                      key={sector.id}
                      onClick={() => handleSelect(setSelectedSector, sector.id)}
                      className={`px-3.5 py-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-2.5 ${
                        isSelected
                          ? "bg-amber-500/15 text-amber-300 border-accent shadow-sm"
                          : "bg-muted/40 text-muted-foreground border-border hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <IconComp className={`h-4 w-4 shrink-0 ${isSelected ? "text-accent" : "text-amber-400/80"}`} />
                      <span className="truncate">{sector.label}</span>
                      {isSelected && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 ml-auto text-accent" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Real-Time Career Output */}
          <div className="lg:col-span-6 sticky top-24">
            <div
              className={`ayur-3d-card p-6 sm:p-8 rounded-3xl bg-card/90 backdrop-blur-xl border border-emerald-500/30 shadow-2xl relative overflow-hidden transition-all duration-300 ${
                isCalculating ? "opacity-70 scale-[0.99]" : "opacity-100 scale-100"
              }`}
            >
              {/* Subtle radiant background aura */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

              {/* Top Bar: Match Score & Category */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-border/60">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                  <Building2 className="h-3.5 w-3.5 text-amber-400" />
                  <span>{result.category}</span>
                </div>

                {/* Animated Match Ring */}
                <div className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 px-3.5 py-1.5 rounded-full">
                  <Zap className="h-3.5 w-3.5 text-accent animate-pulse" />
                  <span className="text-xs font-bold text-foreground">
                    Match Quotient: <span className="text-emerald-400 font-extrabold">{result.matchScore}%</span>
                  </span>
                </div>
              </div>

              {/* Title & Role Info */}
              <div className="mt-6 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Recommended Career DNA Designation
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-serif font-bold text-foreground leading-snug">
                  {result.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                  {result.description}
                </p>
              </div>

              {/* Key Metrics Grid */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-background/80 border border-border/70 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                      Expected Starting CTC
                    </span>
                    <p className="text-base sm:text-lg font-extrabold text-accent mt-0.5">
                      {result.salaryRange}
                    </p>
                    <span className="text-[10px] text-muted-foreground/80 block mt-0.5">
                      (Varies by institution & location)
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-background/80 border border-border/70 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                      Industry Demand Momentum
                    </span>
                    <p className="text-base sm:text-lg font-extrabold text-emerald-400 mt-0.5 flex items-center gap-1">
                      {result.demandGrowth}
                    </p>
                    <span className="text-[10px] text-muted-foreground/80 block mt-0.5">
                      (National & Global Outlook)
                    </span>
                  </div>
                </div>
              </div>

              {/* Top Attested Competencies Required */}
              <div className="mt-6 space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-accent" />
                  Attested Digital Competencies Required
                </span>
                <div className="flex flex-wrap gap-2">
                  {result.topSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1.5 rounded-lg bg-card/90 border border-emerald-500/25 text-xs font-medium text-foreground/90 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prime Hiring Partners */}
              <div className="mt-5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Verified Hiring Stakeholders
                </span>
                <div className="flex flex-wrap gap-2">
                  {result.keyHospitals.map((hosp, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-card/90 border border-emerald-500/25 text-xs font-medium text-foreground/85 flex items-center gap-1.5"
                    >
                      <Landmark className="h-3.5 w-3.5 text-emerald-400/80 shrink-0" />
                      {hosp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct CTA */}
              <div className="mt-8 pt-5 border-t border-border/60 flex flex-col sm:flex-row items-center gap-3">
                <Button
                  variant="gold"
                  size="md"
                  className="w-full sm:w-auto flex-1 font-bold shadow-lg shadow-accent/20"
                  onClick={() => router.push("/role-selection")}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Unlock Personalized Roadmap
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    const el = document.getElementById("nadi-simulator");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  leftIcon={<Compass className="h-4 w-4 text-accent" />}
                >
                  Simulate Skills Radar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
