"use client";

import * as React from "react";
import {
  UserCheck,
  ClipboardCheck,
  Dna,
  BarChart3,
  BookOpen,
  Award,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  ArrowDown,
} from "lucide-react";
import { Card } from "@/components/cards/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { cn } from "@/lib/utils/cn";

interface JourneyStage {
  id: number;
  title: string;
  sanskritSub: string;
  category: "ASSESSMENT" | "LEARNING" | "VERIFICATION" | "OUTCOME";
  description: string;
  outputArtifact: string;
  icon: React.ReactNode;
}

export function StudentJourneySection() {
  const [activeCategory, setActiveCategory] = React.useState<string>("ALL");

  const stages: JourneyStage[] = [
    {
      id: 1,
      title: "Smart Onboarding",
      sanskritSub: "प्रवेश एवं नामांकन",
      category: "ASSESSMENT",
      description: "Seamless credential import with NCISM student registration and institutional verification.",
      outputArtifact: "Verified Scholar Profile",
      icon: <UserCheck className="h-5 w-5 text-primary" />,
    },
    {
      id: 2,
      title: "Personalized Skill Assessment",
      sanskritSub: "कौशल मूल्यांकन",
      category: "ASSESSMENT",
      description: "Adaptive diagnostic vignettes, pulse palpation simulation, and classical Samhita case evaluations.",
      outputArtifact: "Domain Proficiency Score",
      icon: <ClipboardCheck className="h-5 w-5 text-accent" />,
    },
    {
      id: 3,
      title: "Ayurveda Career DNA",
      sanskritSub: "करियर प्रकृति विश्लेषण",
      category: "ASSESSMENT",
      description: "Algorithmic affinity mapping across Clinical Practice, Panchakarma, Herbal R&D, and Teaching.",
      outputArtifact: "Career DNA Matrix",
      icon: <Dna className="h-5 w-5 text-secondary" />,
    },
    {
      id: 4,
      title: "Skill Gap Report",
      sanskritSub: "कौशल अंतर विवरण",
      category: "ASSESSMENT",
      description: "Granular breakdown of delta points between current student abilities and industry job requisites.",
      outputArtifact: "Competency Delta Audit",
      icon: <BarChart3 className="h-5 w-5 text-primary" />,
    },
    {
      id: 5,
      title: "Guided Learning & Practice",
      sanskritSub: "मार्गदर्शित अध्ययन एवं अभ्यास",
      category: "LEARNING",
      description: "Curated micro-modules, HPTLC laboratory simulations, and supervised inpatient clinical rounds.",
      outputArtifact: "NCISM Micro-Certificates",
      icon: <BookOpen className="h-5 w-5 text-accent" />,
    },
    {
      id: 6,
      title: "Competency Passport",
      sanskritSub: "कौशल पारपत्र",
      category: "VERIFICATION",
      description: "Tamper-evident digital passport documenting attested procedures, OPD case hours, and clinical badges.",
      outputArtifact: "Verified Digital Passport",
      icon: <Award className="h-5 w-5 text-secondary" />,
    },
    {
      id: 7,
      title: "Smart Opportunity Matching",
      sanskritSub: "स्मार्ट अवसर मिलान",
      category: "OUTCOME",
      description: "Direct algorithmic pairing with premier clinical residencies, pharma traineeships, and research posts.",
      outputArtifact: "Tailored Opportunity Feed",
      icon: <Sparkles className="h-5 w-5 text-accent" />,
    },
    {
      id: 8,
      title: "Supervisor Verification",
      sanskritSub: "पर्यवेक्षक प्रमाणीकरण",
      category: "VERIFICATION",
      description: "Official institutional sign-off by AIIA/University faculty with cryptographic digital signatures.",
      outputArtifact: "Faculty Digital Endorsement",
      icon: <ShieldCheck className="h-5 w-5 text-primary" />,
    },
    {
      id: 9,
      title: "Career Outcome",
      sanskritSub: "व्यावसायिक सफलता",
      category: "OUTCOME",
      description: "Accredited clinical fellowship placement, R&D pharmaceutical role, or independent Ayush clinic launch.",
      outputArtifact: "Verified Career Placement",
      icon: <TrendingUp className="h-5 w-5 text-secondary" />,
    },
  ];

  const filteredStages =
    activeCategory === "ALL"
      ? stages
      : stages.filter((s) => s.category === activeCategory);

  return (
    <section id="student-journey" className="py-24 border-b border-border/60 bg-muted/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Complete Student Lifecycle"
          title="The Ayurveda Scholar Journey"
          subtitle="Not just an internship portal. A complete 9-stage competency transformation engine from enrollment to verified career outcomes."
          align="center"
        />

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 mb-14">
          {[
            { id: "ALL", label: "Full 9-Stage Lifecycle" },
            { id: "ASSESSMENT", label: "1. Assessment & DNA" },
            { id: "LEARNING", label: "2. Guided Learning" },
            { id: "VERIFICATION", label: "3. Supervisor Verification" },
            { id: "OUTCOME", label: "4. Career Outcome" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-background border border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Journey Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStages.map((stage, idx) => (
            <RevealOnScroll key={stage.id} delay={idx * 0.05}>
              <Card
                variant="interactive"
                className="p-6 h-full flex flex-col justify-between border-border/80 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-full bg-accent/15 text-accent font-bold text-xs flex items-center justify-center border border-accent/25">
                      0{stage.id}
                    </div>
                    <Badge variant="outline" size="sm">
                      {stage.category}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="p-2 rounded-xl bg-background border border-border shrink-0">
                      {stage.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                        {stage.title}
                      </h4>
                      <p className="text-[11px] text-primary/80 font-medium">
                        {stage.sanskritSub}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mt-3 mb-4">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/50 flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Deliverable:</span>
                  <span className="font-semibold text-foreground bg-muted px-2 py-0.5 rounded">
                    {stage.outputArtifact}
                  </span>
                </div>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
