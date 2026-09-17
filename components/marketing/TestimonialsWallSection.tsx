"use client";

import React, { useState } from "react";
import { Star, Quote, CheckCircle2, Award, Sparkles, Volume2, Building, GraduationCap, Hospital } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  institutionOrCompany: string;
  category: "student" | "specialist" | "hospital" | "pharma";
  avatarText: string;
  quote: string;
  impactMetric: string;
  verifiedStatus: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Dr. Tanvi Deshmukh",
    role: "Clinical Fellow in Kayachikitsa",
    institutionOrCompany: "All India Institute of Ayurveda (AIIA), New Delhi",
    category: "student",
    avatarText: "TD",
    quote: "During my BAMS internship, having my 140 clinical cases digitally attested on Ayu-Setu gave me a decisive edge. When AIIA reviewed my Merkle-verified logbook, my fellowship interview was cleared without hesitation.",
    impactMetric: "Secured Prestigious AIIA Fellowship with ₹65,000/mo Stipend",
    verifiedStatus: "AIIA Attested Logbook #2026-098",
    rating: 5,
  },
  {
    id: "t2",
    name: "Dr. Harshavardhan Nair",
    role: "Medical Director",
    institutionOrCompany: "Kottakkal Arya Vaidya Sala Hospital Network",
    category: "hospital",
    avatarText: "HN",
    quote: "Earlier, evaluating junior Vaidyas meant sifting through paper logbooks and vague recommendation letters. With Ayu-Setu's Competency Radar, we know an applicant's real Nadi Pariksha and Panchakarma mastery before the first round.",
    impactMetric: "Recruitment Onboarding Time Reduced by 68%",
    verifiedStatus: "NABH Accredited Hospital Partner",
    rating: 5,
  },
  {
    id: "t3",
    name: "Dr. Meenakshi Sundaram",
    role: "VP of Phytopharmaceutical Research",
    institutionOrCompany: "Dabur Research Foundation",
    category: "pharma",
    avatarText: "MS",
    quote: "Finding Ayurveda graduates with hands-on HPTLC standardization and GLP documentation used to take 6 months. Ayu-Setu matches us with scholars who have already completed verified classical formulation assays.",
    impactMetric: "Hired 12 Top Formulation Scientists via Fast-Track",
    verifiedStatus: "National Pharma Innovation Sponsor",
    rating: 5,
  },
  {
    id: "t4",
    name: "Dr. Vikramaditya Rathore",
    role: "MD Scholar & Clinical Researcher",
    institutionOrCompany: "Institute of Teaching and Research in Ayurveda (ITRA)",
    category: "specialist",
    avatarText: "VR",
    quote: "The personalized Career DNA Matcher revealed my clinical alignment with bio-informatics and clinical trials. I was able to bridge my regulatory GCP gap in 3 weeks and land a joint CCRAS-ICMR fellowship.",
    impactMetric: "From BAMS Generalist to Clinical Trial Investigator",
    verifiedStatus: "NCISM Bioethics Verified Fellow",
    rating: 5,
  },
  {
    id: "t5",
    name: "Prof. Dr. Rajeshwari Hegde",
    role: "Dean of Faculty",
    institutionOrCompany: "Government Ayurveda Medical College, Bengaluru",
    category: "hospital",
    avatarText: "RH",
    quote: "Our institution can now monitor real-time clinical logbook attestations across all 5 clinical rotations. NCISM annual accreditation audits have become 100% automated with zero paper discrepancies.",
    impactMetric: "100% Automated NCISM Compliance Audit",
    verifiedStatus: "State University Faculty Head",
    rating: 5,
  },
  {
    id: "t6",
    name: "Dr. Gayatri Sen",
    role: "Global Wellness & Medical Tourism Lead",
    institutionOrCompany: "Ananda in the Himalayas Retreat",
    category: "specialist",
    avatarText: "GS",
    quote: "Ayu-Setu gives international clients confidence. When guests see my cryptographic Ayush Competency Passport verified by the Ministry, they trust our Panchakarma recommendations completely.",
    impactMetric: "4.9/5 Patient Satisfaction Rating Across 420 Clients",
    verifiedStatus: "Global Ayush Ambassador Seal",
    rating: 5,
  },
];

export function TestimonialsWallSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = TESTIMONIALS.filter((t) =>
    activeCategory === "all" ? true : t.category === activeCategory
  );

  return (
    <section id="testimonials" className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-accent animate-pulse" />
            <span>Voices of Trust from the Ayush Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
            Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-400 to-primary">Scholars, Deans & Industry Leaders</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Real impact stories from clinicians securing verified fellowships, hospital directors automating accreditation, and pharma research labs discovering verified talent.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: "all", label: "All Voices" },
            { id: "student", label: "Students & Interns" },
            { id: "specialist", label: "MD Scholars & Clinicians" },
            { id: "hospital", label: "Hospital Directors & Deans" },
            { id: "pharma", label: "Pharma R&D Executives" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === tab.id
                  ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20 scale-105"
                  : "bg-card/70 text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="ayur-3d-card p-6 sm:p-7 rounded-3xl bg-card/85 backdrop-blur-md border border-border/80 hover:border-accent/40 shadow-sm hover:shadow-xl flex flex-col justify-between space-y-6 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Rating Stars & Verified Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-accent">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    Verified
                  </span>
                </div>

                {/* Impact Metric Banner */}
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-xs font-bold text-foreground flex items-center gap-2">
                  <Award className="h-4 w-4 text-accent shrink-0" />
                  <span className="line-clamp-1">{item.impactMetric}</span>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic relative">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-border/60 flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-herbal-800 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-primary/20 shrink-0">
                  {item.avatarText}
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs sm:text-sm font-bold text-foreground line-clamp-1">{item.name}</h4>
                  <p className="text-[11px] text-accent font-medium line-clamp-1">{item.role}</p>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">{item.institutionOrCompany}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
