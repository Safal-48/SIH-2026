"use client";

import * as React from "react";
import {
  Stethoscope,
  Sparkles,
  FlaskConical,
  Microscope,
  GraduationCap,
  Scale,
  Rocket,
  ArrowUpRight,
  Compass,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { formatINR } from "@/lib/utils/formatters";
import { CareerDetailModal, CareerDetailModalData } from "./CareerDetailModal";
import { Card3DTilt } from "@/components/animations/Card3DTilt";
import { cn } from "@/lib/utils/cn";

interface CareerPathData extends CareerDetailModalData {
  id: string;
  icon: React.ReactNode;
  tagColor: string;
}

export function CareerPathsSection() {
  const [selectedCareer, setSelectedCareer] = React.useState<CareerDetailModalData | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const careerList: CareerPathData[] = [
    {
      id: "clinical-practice",
      title: "Clinical Practice Specialist",
      domain: "Kayachikitsa & Super-Specialty OPD",
      description: "Master classical differential diagnosis, Ashtavidha Pariksha, and integrative treatment for chronic metabolic and autoimmune disorders.",
      projectedGrowth: "+34% 5-Yr Growth",
      averageStartingInr: 920000,
      specialization: "Kayachikitsa / Roganidana",
      sampleRoles: ["Chief Vaidya", "Consultant Physician", "Integrative Clinician"],
      keyCompetencies: ["Nadi Pariksha Assessment", "Samhita Differential Diagnosis", "Pharmacovigilance"],
      topPartners: ["All India Institute of Ayurveda", "Arya Vaidya Sala Kottakkal", "Patanjali Yogpeeth"],
      icon: <Stethoscope className="h-6 w-6 text-primary" />,
      tagColor: "text-primary bg-primary/10 border-primary/20",
    },
    {
      id: "panchakarma-wellness",
      title: "Panchakarma & Wellness Director",
      domain: "Clinical Purification & Longevity Medicine",
      description: "Lead comprehensive Panchakarma hospital units, design authentic Kerala shodhana regimens, and manage luxury wellness sanctuaries.",
      projectedGrowth: "+42% 5-Yr Growth",
      averageStartingInr: 1050000,
      specialization: "Panchakarma",
      sampleRoles: ["Panchakarma Medical Director", "Clinical Resident", "Ayush Wellness Head"],
      keyCompetencies: ["Panchakarma Protocol Execution", "Emergency Purvakarma Management", "Snehana/Swedana Supervision"],
      topPartners: ["Arya Vaidya Sala Kottakkal", "Somatheeram Health Resort", "AIIA Tertiary Hospital"],
      icon: <Sparkles className="h-6 w-6 text-accent" />,
      tagColor: "text-accent bg-accent/10 border-accent/30",
    },
    {
      id: "herbal-pharma",
      title: "Herbal Pharma & Formulation Lead",
      domain: "Phytomedicine R&D & Quality Control",
      description: "Oversee botanical raw material standardization, HPTLC marker compound quantification, and international GMP/export dossier compliance.",
      projectedGrowth: "+48% 5-Yr Growth",
      averageStartingInr: 1180000,
      specialization: "Dravyaguna / Rasashastra",
      sampleRoles: ["Formulation Scientist", "Phytochemistry QA Manager", "Regulatory Affairs Lead"],
      keyCompetencies: ["Herbal Drug Standardization", "HPTLC Fingerprinting", "Heavy Metal Analysis"],
      topPartners: ["Dabur Research Foundation", "Himalaya Wellness", "Charak Pharma"],
      icon: <FlaskConical className="h-6 w-6 text-secondary" />,
      tagColor: "text-secondary bg-secondary/10 border-secondary/20",
    },
    {
      id: "ayush-research",
      title: "Ayush Clinical Research Investigator",
      domain: "Translational & Evidence-Based Science",
      description: "Design and coordinate multi-centric randomized controlled trials combining ancient Ayurvedic pharmacology with modern molecular biomarker endpoints.",
      projectedGrowth: "+52% 5-Yr Growth",
      averageStartingInr: 1250000,
      specialization: "Clinical Epidemiology & Research",
      sampleRoles: ["Scientist-B (CCRAS)", "Clinical Research Associate", "Integrative Biostatistician"],
      keyCompetencies: ["GCP-Ayush Clinical Trials", "CTRI Protocol Registration", "Bioethical Compliance"],
      topPartners: ["Central Council for Research in Ayurvedic Sciences", "AIIA New Delhi", "ICMR"],
      icon: <Microscope className="h-6 w-6 text-primary" />,
      tagColor: "text-primary bg-primary/10 border-primary/20",
    },
    {
      id: "ayurveda-teaching",
      title: "Ayurveda Medical Faculty & Scholar",
      domain: "Higher Education & Samhita Pedagogy",
      description: "Educate future generations of Vaidyas, author classical commentaries, and direct academic departments in NCISM accredited universities.",
      projectedGrowth: "+26% 5-Yr Growth",
      averageStartingInr: 880000,
      specialization: "Samhita & Siddhanta / Medical Education",
      sampleRoles: ["Assistant Professor", "HOD Department", "Ayush Curriculum Developer"],
      keyCompetencies: ["Pedagogical Design", "Samhita Textual Hermeneutics", "Institutional Accreditation"],
      topPartners: ["National Institute of Ayurveda Jaipur", "ITRA Jamnagar", "BHU Faculty of Ayurveda"],
      icon: <GraduationCap className="h-6 w-6 text-secondary" />,
      tagColor: "text-secondary bg-secondary/10 border-secondary/20",
    },
    {
      id: "ayush-government",
      title: "Ayush Public Health Officer",
      domain: "National Health Mission & Governance",
      description: "Formulate public wellness policies, implement national health programs, inspect accredited hospital facilities, and govern drug licensing.",
      projectedGrowth: "+30% 5-Yr Growth",
      averageStartingInr: 960000,
      specialization: "Swasthavritta / Public Health Administration",
      sampleRoles: ["Medical Officer (State Ayush)", "Drug Licensing Inspector", "District Ayush Coordinator"],
      keyCompetencies: ["National Health Mission Protocols", "NABH Ayush Hospital Standards", "NAMASTE Coding"],
      topPartners: ["Ministry of Ayush", "National Ayush Mission", "State Health Departments"],
      icon: <Scale className="h-6 w-6 text-accent" />,
      tagColor: "text-accent bg-accent/10 border-accent/30",
    },
    {
      id: "ayush-entrepreneurship",
      title: "Ayush HealthTech & Wellness Founder",
      domain: "Digital Healthcare & Direct-to-Consumer",
      description: "Launch innovative Ayurvedic clinics, digital telemedicine platforms, AI-driven prakriti diagnostics, and standardized herbal wellness brands.",
      projectedGrowth: "+65% 5-Yr Growth",
      averageStartingInr: 1400000,
      specialization: "HealthTech & Integrative Ventures",
      sampleRoles: ["Co-Founder / CEO", "Chief Ayurvedic Officer", "HealthTech Product Lead"],
      keyCompetencies: ["Digital Tele-Ayurveda", "Product Formulation", "Venture Scaling"],
      topPartners: ["Ayush Startup Hub", "AIIA Incubation Center", "Invest India"],
      icon: <Rocket className="h-6 w-6 text-primary" />,
      tagColor: "text-primary bg-primary/10 border-primary/20",
    },
  ];

  const handleOpenDetail = (career: CareerPathData) => {
    setSelectedCareer(career);
    setModalOpen(true);
  };

  return (
    <section id="career-paths" className="py-24 border-b border-border/40 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Ayurveda Career DNA"
          title="7 High-Growth Ayurveda Career Pathways"
          subtitle="Discover tailored professional avenues across clinical practice, pharmaceutical formulation, scientific research, and healthtech entrepreneurship."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {careerList.map((career, idx) => (
            <RevealOnScroll key={career.id} delay={idx * 0.05}>
              <Card3DTilt maxTilt={6} glareColor="gold" className="h-full">
                <div
                  onClick={() => handleOpenDetail(career)}
                  className="group relative h-full rounded-2xl border border-border/80 bg-card/90 backdrop-blur-md p-6 shadow-sm transition-all duration-300 hover:shadow-2xl hover:border-accent/40 cursor-pointer flex flex-col justify-between ayur-3d-card"
                >
                  {/* Subtle hover gradient glow */}
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/25 to-secondary/20 opacity-0 blur transition duration-300 group-hover:opacity-100 -z-10" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-2xl bg-background border border-border shadow-sm group-hover:scale-105 transition-transform">
                        {career.icon}
                      </div>
                      <Badge variant="gold" size="sm">
                        {career.projectedGrowth}
                      </Badge>
                    </div>

                    <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {career.title}
                    </h4>
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wider mt-0.5 mb-2.5">
                      {career.domain}
                    </p>

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-5">
                      {career.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/60 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Starting Package:</span>
                      <span className="font-bold text-foreground">
                        {formatINR(career.averageStartingInr)} / yr
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-semibold text-primary pt-1">
                      <span className="flex items-center gap-1">
                        <Compass className="h-3.5 w-3.5 text-accent" />
                        View Roadmap & Skills
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Card3DTilt>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      <CareerDetailModal
        career={selectedCareer}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelectPath={(c) => {
          alert(`Selected: ${c.title}. Ready for Step 03 Assessment!`);
        }}
      />
    </section>
  );
}
