"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Award,
  ArrowRight,
  Eye,
  Activity,
  CheckCircle2,
  Stethoscope,
  BrainCircuit,
  Boxes,
  Palette,
  Layers,
  ArrowLeft,
} from "lucide-react";

import { ROLE_DEFINITIONS } from "@/types/roles";
import {
  MOCK_AYURVEDA_SKILLS,
  MOCK_CAREER_PATHS,
  MOCK_OPPORTUNITIES,
} from "@/data/mock-ayurveda";

// UI Components
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { Tabs } from "@/components/ui/Tabs";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Avatar } from "@/components/ui/Avatar";
import { Tooltip } from "@/components/ui/Tooltip";

// Cards
import { Card } from "@/components/cards/Card";
import { GlassCard } from "@/components/cards/GlassCard";
import { StatCard } from "@/components/cards/StatCard";
import { OpportunityCard } from "@/components/cards/OpportunityCard";
import { SkillCard } from "@/components/cards/SkillCard";
import { CareerCard } from "@/components/cards/CareerCard";

// Layout & Feedback
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Timeline, TimelineStep } from "@/components/feedback/Timeline";
import { EmptyState } from "@/components/feedback/EmptyState";
import { LoadingState } from "@/components/feedback/LoadingState";

// Animations & 3D
import { AnimatedText } from "@/components/animations/AnimatedText";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ThreeScene } from "@/components/three/ThreeScene";

export default function FoundationExplorerPage() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("components");

  const studentJourneySteps: TimelineStep[] = [
    { id: 1, title: "1. Smart Onboarding", description: "BAMS/MD candidate enrollment verification with NCISM data", status: "completed" },
    { id: 2, title: "2. Personalized Assessment", description: "Diagnostic case scenarios & botanical identification", status: "completed" },
    { id: 3, title: "3. Ayurveda Career DNA", description: "Automated skill gap report & affinity modeling", status: "completed" },
    { id: 4, title: "4. Guided Learning", description: "Targeted clinical modules & classical Samhita review", status: "current" },
    { id: 5, title: "5. Practical Immersion", description: "OPD/IPD patient case logbook documentation", status: "upcoming" },
    { id: 6, title: "6. Supervisor Verification", description: "Faculty sign-off & digital signature attestation", status: "upcoming" },
    { id: 7, title: "7. Competency Passport", description: "Tamper-evident verifiable Ayush skills passport", status: "upcoming" },
    { id: 8, title: "8. Smart Opportunity Matching", description: "Algorithmic matching with AIIA verified internships", status: "upcoming" },
    { id: 9, title: "9. Application & Verification", description: "Direct apply with supervisor endorsement", status: "upcoming" },
    { id: 10, title: "10. Career Outcome", description: "Clinical residency, R&D placement, or Ayush venture", status: "upcoming" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <div className="bg-primary/10 border-b border-primary/20 py-3 px-4 text-xs font-semibold flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-1.5 text-primary hover:text-herbal-800">
          <ArrowLeft className="h-4 w-4" /> Back to Official Landing Page
        </Link>
        <span className="text-muted-foreground">Step 01 Architecture Archive</span>
      </div>

      <section className="relative overflow-hidden pt-12 pb-16 border-b border-border/80 bg-gradient-to-b from-herbal-950/10 via-background to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Step 01 Foundation • Architecture • Design System
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground font-sans max-w-4xl leading-tight">
              <AnimatedText text="Vaidya Setu Foundation Explorer" />
            </h1>

            <p className="mt-4 text-base sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Official architecture foundation for the Ministry of Ayush and All India Institute of Ayurveda (AIIA). This page verifies the design tokens, 24+ accessible components, 3D visual graph, and role gateways.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton>
                <a href="#design-system">
                  <Button variant="primary" leftIcon={<Palette className="h-4 w-4" />}>
                    Design Tokens
                  </Button>
                </a>
              </MagneticButton>

              <MagneticButton>
                <a href="#components">
                  <Button variant="gold" leftIcon={<Boxes className="h-4 w-4" />}>
                    Component System
                  </Button>
                </a>
              </MagneticButton>

              <MagneticButton>
                <a href="#3d-graph">
                  <Button variant="outline" leftIcon={<Eye className="h-4 w-4 text-accent" />}>
                    Interactive 3D Graph
                  </Button>
                </a>
              </MagneticButton>

              <MagneticButton>
                <a href="#roles">
                  <Button variant="secondary" leftIcon={<Layers className="h-4 w-4" />}>
                    Role Gateways
                  </Button>
                </a>
              </MagneticButton>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-24">
        {/* Color Tokens */}
        <section id="design-system">
          <SectionHeading
            badge="Visual Language"
            title="Ayurveda Meets Intelligent Automation"
            subtitle="Curated, accessible palette reflecting deep herbal greens, sandalwood earthy tones, warm saffron gold, and serene ivory surfaces."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="bordered" className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-foreground">Primary: Deep Herbal Green</h4>
                <span className="text-xs font-mono text-muted-foreground">#133E2B</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 pt-2">
                <div className="h-10 rounded bg-primary/20 flex items-center justify-center text-[10px] font-mono">100</div>
                <div className="h-10 rounded bg-primary/40 flex items-center justify-center text-[10px] font-mono">300</div>
                <div className="h-10 rounded bg-primary text-white flex items-center justify-center text-[10px] font-mono font-bold">500</div>
                <div className="h-10 rounded bg-herbal-800 text-white flex items-center justify-center text-[10px] font-mono font-bold">700</div>
                <div className="h-10 rounded bg-herbal-950 text-white flex items-center justify-center text-[10px] font-mono font-bold">950</div>
              </div>
            </Card>

            <Card variant="bordered" className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-foreground">Secondary: Ayurvedic Earth</h4>
                <span className="text-xs font-mono text-muted-foreground">#C26D30</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 pt-2">
                <div className="h-10 rounded bg-secondary/20 flex items-center justify-center text-[10px] font-mono">100</div>
                <div className="h-10 rounded bg-secondary/40 flex items-center justify-center text-[10px] font-mono">300</div>
                <div className="h-10 rounded bg-secondary text-white flex items-center justify-center text-[10px] font-mono font-bold">500</div>
                <div className="h-10 rounded bg-earth-700 text-white flex items-center justify-center text-[10px] font-mono font-bold">700</div>
                <div className="h-10 rounded bg-earth-900 text-white flex items-center justify-center text-[10px] font-mono font-bold">900</div>
              </div>
            </Card>

            <Card variant="bordered" className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-foreground">Accent: Warm Saffron Gold</h4>
                <span className="text-xs font-mono text-muted-foreground">#E5A93B</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 pt-2">
                <div className="h-10 rounded bg-accent/20 flex items-center justify-center text-[10px] font-mono">100</div>
                <div className="h-10 rounded bg-accent/40 flex items-center justify-center text-[10px] font-mono">300</div>
                <div className="h-10 rounded bg-accent text-accent-foreground flex items-center justify-center text-[10px] font-mono font-bold">500</div>
                <div className="h-10 rounded bg-saffron-700 text-white flex items-center justify-center text-[10px] font-mono font-bold">700</div>
                <div className="h-10 rounded bg-saffron-900 text-white flex items-center justify-center text-[10px] font-mono font-bold">900</div>
              </div>
            </Card>
          </div>
        </section>

        {/* 3D Visual Graph */}
        <section id="3d-graph">
          <SectionHeading
            badge="Three.js & React Three Fiber"
            title="Interactive Ayush Knowledge & Botanical Graph"
            subtitle="Lightweight, procedural 3D network with golden prana particles and discipline nodes. Fully decoupled with WebGL detection and graceful 2D fallback."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2">
              <ThreeScene />
            </div>

            <div className="space-y-4">
              <GlassCard glow>
                <div className="flex items-center gap-2 mb-2">
                  <BrainCircuit className="h-5 w-5 text-accent" />
                  <h4 className="text-sm font-bold text-foreground">Knowledge Graph Architecture</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Interactive procedural nodes represent core Ayurvedic branches (Kayachikitsa, Dravyaguna, Panchakarma, Rasashastra, and Ayush GCP Research).
                </p>
              </GlassCard>

              <StatCard
                title="Curated Ayush Competencies"
                value="48,000+"
                delta="+24% this cycle"
                subtitle="Indexed against NCISM curriculum"
                icon={<Activity className="h-5 w-5 text-primary" />}
              />
            </div>
          </div>
        </section>

        {/* Component Showcase Tabs */}
        <section id="components">
          <SectionHeading
            badge="Component System"
            title="Production-Grade Reusable UI Library"
            subtitle="Tested for keyboard navigation, visible focus rings, ARIA landmarks, and responsiveness across all form factors."
          />

          <div className="mb-8">
            <Tabs
              tabs={[
                { id: "components", label: "Core Controls & Inputs" },
                { id: "cards", label: "Ayush Domain Cards" },
                { id: "journey", label: "Student 10-Step Journey" },
                { id: "feedback", label: "Feedback & Skeletons" },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </div>

          {activeTab === "components" && (
            <div className="space-y-8">
              <Card variant="default" className="p-6 space-y-4">
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                  Button Hierarchy & Variants
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">Primary Herbal</Button>
                  <Button variant="secondary">Secondary Earth</Button>
                  <Button variant="gold" leftIcon={<Sparkles className="h-4 w-4" />}>
                    Warm Saffron Gold
                  </Button>
                  <Button variant="outline">Outline Border</Button>
                  <Button variant="ghost">Ghost Action</Button>
                  <Button variant="glass">Glass Surface</Button>
                </div>
              </Card>

              <Card variant="default" className="p-6 space-y-4">
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                  Badges & Competency Tiers
                </h4>
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="default">Herbal 500</Badge>
                  <Badge variant="secondary">Sandalwood Earth</Badge>
                  <Badge variant="gold" icon={<Award className="h-3 w-3" />}>
                    Prana Excellence
                  </Badge>
                  <Badge variant="verified" icon={<ShieldCheck className="h-3 w-3" />}>
                    AIIA Endorsed
                  </Badge>
                  <Badge variant="outline">Bloom Level: Apply</Badge>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card variant="default" className="p-6 space-y-4">
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Accessible Input Fields
                  </h4>
                  <Input
                    label="Candidate Enrollment No."
                    placeholder="e.g. AIIA/BAMS/2023/042"
                    helperText="Enter your official NCISM or University enrollment"
                  />
                  <Input
                    label="Ayush Specialty"
                    placeholder="e.g. Panchakarma or Dravyaguna"
                    leftIcon={<Stethoscope className="h-4 w-4" />}
                  />
                </Card>

                <Card variant="default" className="p-6 space-y-4">
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Accessible Select & Modal Trigger
                  </h4>
                  <Select
                    label="Target Degree Level"
                    placeholder="Select qualification"
                    options={[
                      { value: "bams", label: "BAMS (Bachelor of Ayurvedic Medicine & Surgery)" },
                      { value: "md", label: "MD / MS Ayurveda" },
                      { value: "phd", label: "PhD in Ayush Sciences" },
                    ]}
                  />

                  <div className="pt-2">
                    <Button
                      variant="gold"
                      onClick={() => setModalOpen(true)}
                      className="w-full justify-center"
                    >
                      Open Accessible Verification Modal
                    </Button>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <Card variant="default" className="p-6 space-y-5">
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Progress Indicators
                  </h4>
                  <ProgressBar value={84} label="Overall Ayurvedic Skill DNA Score" showValue variant="gradient" />
                  <ProgressBar value={62} label="Clinical Logbook Hours Verified" showValue variant="saffron" />
                  <ProgressBar value={92} label="Institutional Accreditation Score" showValue variant="herbal" />
                </Card>

                <Card variant="default" className="p-6 flex items-center justify-around">
                  <div className="text-center space-y-2">
                    <ProgressRing value={88} label="88%" sublabel="Clinical" />
                    <p className="text-xs font-semibold text-muted-foreground">Clinical Diagnostic</p>
                  </div>

                  <div className="space-y-3 text-center">
                    <div className="flex items-center gap-2 justify-center">
                      <Tooltip content="BAMS Final Year Scholar • Verified">
                        <Avatar name="Aarav Sharma" status="verified" size="lg" />
                      </Tooltip>
                      <Tooltip content="AIIA Faculty Supervisor">
                        <Avatar name="Dr. Vaidya Kulkarni" status="online" size="lg" />
                      </Tooltip>
                    </div>
                    <p className="text-xs font-semibold text-muted-foreground">User Avatars & Tooltips</p>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "cards" && (
            <div className="space-y-10">
              <div>
                <h4 className="text-base font-bold text-foreground mb-4">
                  1. OpportunityCard Preview (Verified Ayush Postings)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {MOCK_OPPORTUNITIES.slice(0, 2).map((opp) => (
                    <OpportunityCard key={opp.id} opportunity={opp} />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-foreground mb-4">
                  2. SkillCard Preview (Ayurvedic Clinical Competencies)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {MOCK_AYURVEDA_SKILLS.slice(0, 3).map((skill, idx) => (
                    <SkillCard
                      key={skill.id}
                      skill={skill}
                      currentProficiency={idx === 0 ? 82 : idx === 1 ? 88 : 74}
                      isVerified={idx < 2}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-foreground mb-4">
                  3. CareerCard Preview (Ayurveda Career DNA Roadmaps)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {MOCK_CAREER_PATHS.slice(0, 2).map((career, idx) => (
                    <CareerCard key={career.id} career={career} affinityScore={idx === 0 ? 94 : 88} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "journey" && (
            <Card variant="bordered" className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-foreground">
                    10-Stage Core Student Journey Framework
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Modeled after the complete lifecycle: Assess → Map → Gap → Learn → Practice → Verify → Match → Apply → Experience → Career
                  </p>
                </div>
                <Badge variant="gold">National Ayush Core Flow</Badge>
              </div>

              <Timeline steps={studentJourneySteps} orientation="vertical" />
            </Card>
          )}

          {activeTab === "feedback" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="default" className="p-6">
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                  Empty State Component
                </h4>
                <EmptyState
                  title="No Pending Verifications"
                  description="All candidate clinical procedures have been attested by supervising AIIA faculty."
                  actionLabel="View Historical Logbooks"
                  onAction={() => alert("Ready for Step 02+ Logbooks")}
                />
              </Card>

              <Card variant="default" className="p-6 space-y-6">
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                  Loading State & Skeletons
                </h4>
                <LoadingState message="Connecting to AIIA Knowledge Core..." />
                <div className="pt-4 border-t border-border">
                  <LoadingState type="skeleton-card" />
                </div>
              </Card>
            </div>
          )}
        </section>

        {/* Roles Section */}
        <section id="roles">
          <SectionHeading
            badge="Multi-Stakeholder Portals"
            title="Role-Based Gateway Architecture"
            subtitle="Direct role routes prepared for Students, Academicians, Industry Partners, Institutions, and Ministry Administrators."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(ROLE_DEFINITIONS).map((role) => (
              <Card key={role.role} variant="interactive" className="p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="gold" size="sm">{role.badge}</Badge>
                    <span className="text-xs font-mono text-muted-foreground">{role.baseRoute}</span>
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-1">{role.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {role.description}
                  </p>
                  <div className="text-[11px] text-muted-foreground space-y-1 mb-6">
                    <p className="font-semibold text-foreground uppercase tracking-wider text-[10px]">Capabilities:</p>
                    {role.allowedCapabilities.slice(0, 3).map((cap) => (
                      <p key={cap} className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                        <code className="text-foreground">{cap}</code>
                      </p>
                    ))}
                  </div>
                </div>

                <Link href={role.baseRoute}>
                  <Button variant="outline" size="sm" className="w-full justify-between group">
                    <span>Inspect {role.role} Gateway</span>
                    <ArrowRight className="h-3.5 w-3.5 text-accent group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Supervisor Competency Attestation"
        description="Verify candidate pulse diagnosis and Panchakarma clinical logbook records."
      >
        <div className="space-y-4 text-sm">
          <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span>Candidate: Aarav Sharma</span>
              <span className="text-primary">AIIA/BAMS/2023/042</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Procedure: Nadi Pariksha Assessment (120 clinical observations)
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
            <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="gold"
              size="sm"
              leftIcon={<CheckCircle2 className="h-4 w-4" />}
              onClick={() => {
                alert("Competency Endorsed & Passport Updated (Mock)");
                setModalOpen(false);
              }}
            >
              Sign & Attest Passport
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
