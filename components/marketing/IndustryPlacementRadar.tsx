"use client";

import React, { useState, useMemo } from "react";
import { Building2, MapPin, Briefcase, Sparkles, CheckCircle2, ArrowRight, Filter, Search, X, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useRouter } from "next/navigation";

interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  logoText: string;
  category: "fellowship" | "pharma" | "hospital" | "tech";
  location: string;
  stipendOrCtc: string;
  type: "Full-Time" | "Fellowship" | "Research Internship";
  matchRate: number;
  openings: number;
  deadline: string;
  tags: string[];
  requiredSkills: string[];
  description: string;
}

const OPPORTUNITIES: JobOpportunity[] = [
  {
    id: "opp-1",
    title: "Post-Graduate Fellow in Advanced Kayachikitsa",
    company: "All India Institute of Ayurveda (AIIA)",
    logoText: "AIIA",
    category: "fellowship",
    location: "New Delhi (On-Campus IPD)",
    stipendOrCtc: "₹65,000 / month Stipend",
    type: "Fellowship",
    matchRate: 96,
    openings: 8,
    deadline: "14 Days Remaining",
    tags: ["Ministry of Ayush", "NABH Accredited", "Full Inpatient Rotation"],
    requiredSkills: ["BAMS Degree", "Nadi Pariksha Certified", "100+ Attested Cases in Passport"],
    description: "Join AIIA's flagship inpatient fellowship. Supervise specialized Panchakarma therapies, manage complex clinical cases, and collaborate on CCRAS-funded clinical trial protocols.",
  },
  {
    id: "opp-2",
    title: "Phytopharmaceutical Formulation Scientist",
    company: "Dabur Research Foundation (DRF)",
    logoText: "DABUR",
    category: "pharma",
    location: "Ghaziabad / NCR Lab Hub",
    stipendOrCtc: "₹9.2 LPA – ₹14.5 LPA",
    type: "Full-Time",
    matchRate: 91,
    openings: 5,
    deadline: "Actively Reviewing",
    tags: ["Formulation R&D", "HPTLC Lab", "Patent Filing"],
    requiredSkills: ["Dravyaguna Standardization", "GLP Good Laboratory Practice", "Classical Polyherbal Compounding"],
    description: "Lead new product formulations for Dabur's classical & proprietary portfolio. Conduct active marker phytochemical testing, batch stability analysis, and FDA/NCISM dossier preparation.",
  },
  {
    id: "opp-3",
    title: "Resident Panchakarma Physician",
    company: "Kottakkal Arya Vaidya Sala",
    logoText: "AVS",
    category: "hospital",
    location: "Kottakkal / Kochi, Kerala",
    stipendOrCtc: "₹8.5 LPA – ₹13.0 LPA",
    type: "Full-Time",
    matchRate: 94,
    openings: 4,
    deadline: "8 Days Remaining",
    tags: ["Keraleeya Chikitsa", "Luxury Sanatorium", "NABH Inpatient"],
    requiredSkills: ["Classical Panchakarma Mastery", "Marma Therapy Experience", "Patient Consultation Fluency"],
    description: "Deliver world-renowned Keraleeya Panchakarma treatments. Guide personalized Snehana and Swedana protocols, monitor Samsarjana Krama diets, and supervise certified therapists.",
  },
  {
    id: "opp-4",
    title: "Ayurveda Clinical Trials Protocol Specialist",
    company: "Himalaya Wellness Company",
    logoText: "HIMALAYA",
    category: "pharma",
    location: "Bengaluru Innovation Center",
    stipendOrCtc: "₹10.5 LPA – ₹16.8 LPA",
    type: "Full-Time",
    matchRate: 88,
    openings: 3,
    deadline: "Actively Reviewing",
    tags: ["GCP Trials", "Evidence-Based", "Global Exports"],
    requiredSkills: ["ICH-GCP Guidelines", "Bio-statistical Analysis", "Medical Writing for Herbal Trials"],
    description: "Design and coordinate Phase II/III clinical efficacy trials for Himalaya's therapeutics division across collaborative teaching hospitals in India and Europe.",
  },
  {
    id: "opp-5",
    title: "Ayur-Tech & AI Prakriti Algorithm Specialist",
    company: "AyurGenomics Informatics Hub",
    logoText: "AYUR-AI",
    category: "tech",
    location: "Bengaluru / Hybrid",
    stipendOrCtc: "₹12.0 LPA – ₹20.0 LPA",
    type: "Full-Time",
    matchRate: 98,
    openings: 6,
    deadline: "Immediate Joiner",
    tags: ["Digital Health", "AI & ML", "Tele-Ayush"],
    requiredSkills: ["Classical Diagnostic Mapping", "EMR Standards", "Computational Ontology"],
    description: "Bridge 5,000 years of clinical Sanskrit texts with modern deep learning models to power automated Prakriti phenotyping and clinical decision support engines.",
  },
  {
    id: "opp-6",
    title: "Senior Herbal Pharmacognosy Investigator",
    company: "Patanjali Research Institute",
    logoText: "PATANJALI",
    category: "pharma",
    location: "Haridwar R&D Headquarters",
    stipendOrCtc: "₹8.0 LPA – ₹13.5 LPA",
    type: "Full-Time",
    matchRate: 89,
    openings: 7,
    deadline: "18 Days Remaining",
    tags: ["Herbal Extraction", "Pharmacopeia Standards", "GLP Certified"],
    requiredSkills: ["Crude Drug Assay", "Chromatography", "Ayurvedic Pharmacopoeia of India (API)"],
    description: "Conduct authenticity assays for raw botanical materials sourced across the Himalayan belt. Establish quality control benchmarks matching WHO and NCISM standards.",
  },
];

export function IndustryPlacementRadar() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeJobModal, setActiveJobModal] = useState<JobOpportunity | null>(null);

  const filteredJobs = useMemo(() => {
    return OPPORTUNITIES.filter((job) => {
      const matchesCat = selectedCategory === "all" || job.category === selectedCategory;
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="opportunities" className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider">
            <Building2 className="h-3.5 w-3.5 text-primary" />
            <span>National Ayush Placement & Fellowship Radar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
            Direct Career Openings from <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-accent">Premier Ayush Employers</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Apply directly using your Attested Digital Competency Passport. Zero redundant CV screening. Employers review your verified clinical logbook and issue fast-track fellowship offers.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-card/80 backdrop-blur-md border border-border shadow-sm">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: "all", label: "All Openings" },
              { id: "fellowship", label: "Clinical Fellowships" },
              { id: "pharma", label: "Pharma R&D" },
              { id: "hospital", label: "NABH Hospitals" },
              { id: "tech", label: "Ayur-Tech & AI" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === tab.id
                    ? "bg-accent text-accent-foreground font-bold shadow-sm shadow-accent/20"
                    : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-background/80 border border-border w-full md:w-72">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search roles, cities, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-foreground outline-none w-full placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-muted-foreground hover:text-foreground">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="ayur-3d-card p-6 rounded-3xl bg-card/85 backdrop-blur-md border border-border/80 hover:border-accent/50 shadow-md hover:shadow-xl flex flex-col justify-between transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Header: Company Logo & Match Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-border/80 flex items-center justify-center font-bold text-xs text-foreground tracking-tight shadow-sm">
                      {job.logoText}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground line-clamp-1">{job.company}</p>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-primary shrink-0" />
                        <span className="line-clamp-1">{job.location}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-emerald-400" />
                    {job.matchRate}% Match
                  </span>
                </div>

                {/* Job Title */}
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-foreground group-hover:text-accent transition-colors leading-snug">
                    {job.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {job.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-muted/60 text-[10px] font-semibold text-muted-foreground border border-border/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stipend / CTC & Openings Bar */}
                <div className="p-3 rounded-xl bg-background/80 border border-border/70 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">Compensation</span>
                    <span className="font-extrabold text-accent">{job.stipendOrCtc}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">Status</span>
                    <span className="font-semibold text-emerald-400">{job.deadline}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-5 border-t border-border/60 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveJobModal(job)}
                  className="flex-1 text-xs"
                >
                  View Details
                </Button>
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => router.push("/role-selection")}
                  className="flex-1 text-xs font-bold shadow-sm shadow-accent/20"
                  rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                >
                  Apply with Passport
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16 p-6 rounded-3xl bg-card/50 border border-border space-y-3">
            <p className="text-sm font-semibold text-foreground">No openings found matching &ldquo;{searchQuery}&rdquo;</p>
            <p className="text-xs text-muted-foreground">Try clearing your search term or switching to &ldquo;All Openings&rdquo;.</p>
            <Button variant="outline" size="sm" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Interactive Detail Modal */}
      {activeJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="max-w-xl w-full p-6 sm:p-8 rounded-3xl bg-card border border-accent/40 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setActiveJobModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 text-accent font-extrabold flex items-center justify-center text-sm border border-accent/40">
                {activeJobModal.logoText}
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{activeJobModal.title}</h3>
                <p className="text-xs text-muted-foreground">{activeJobModal.company} • {activeJobModal.location}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-muted/40 border border-border text-xs flex justify-between">
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold block">Package</span>
                <span className="font-bold text-accent">{activeJobModal.stipendOrCtc}</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold block">Availability</span>
                <span className="font-bold text-foreground">{activeJobModal.openings} Verified Positions</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground block">
                Required Competency Passport Credentials:
              </span>
              <div className="space-y-1.5">
                {activeJobModal.requiredSkills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {activeJobModal.description}
            </p>

            <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => setActiveJobModal(null)}>
                Close
              </Button>
              <Button
                variant="gold"
                size="sm"
                onClick={() => {
                  setActiveJobModal(null);
                  router.push("/role-selection");
                }}
                className="font-bold shadow-md shadow-accent/20"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Instant 1-Click Passport Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
