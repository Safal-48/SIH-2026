"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Building2,
  Landmark,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { UserRole } from "@/types/roles";
import { cn } from "@/lib/utils/cn";

interface RoleCardOption {
  role: UserRole;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  colorBorder: string;
  iconBg: string;
}

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = React.useState<UserRole>("STUDENT");

  const roles: RoleCardOption[] = [
    {
      role: "STUDENT",
      emoji: "🎓",
      title: "Student",
      subtitle: "BAMS / MD / Ayush Scholar",
      description: "Build skills and discover opportunities.",
      benefits: [
        "Clinical diagnostic assessments",
        "Personalized Career DNA matrix",
        "AIIA & Dabur internship matches",
      ],
      colorBorder: "border-primary/40 group-hover:border-primary",
      iconBg: "bg-primary/10 text-primary",
    },
    {
      role: "ACADEMICIAN",
      emoji: "👨‍🏫",
      title: "Academician",
      subtitle: "Faculty / Clinical Guide",
      description: "Connect with industry, research and professional development.",
      benefits: [
        "Attest student clinical logbooks",
        "Digital signature endorsement",
        "Funded pharmaceutical research",
      ],
      colorBorder: "border-secondary/40 group-hover:border-secondary",
      iconBg: "bg-secondary/10 text-secondary",
    },
    {
      role: "INDUSTRY",
      emoji: "🏥",
      title: "Industry",
      subtitle: "Hospitals / Herbal Pharma",
      description: "Discover skilled talent and collaborate with academia.",
      benefits: [
        "Filter talent by verified skill scores",
        "Post clinical & R&D fellowships",
        "Direct MOU management",
      ],
      colorBorder: "border-accent/40 group-hover:border-accent",
      iconBg: "bg-accent/15 text-accent",
    },
    {
      role: "INSTITUTION",
      emoji: "🏫",
      title: "Institution",
      subtitle: "Ayurveda Colleges & Universities",
      description: "Monitor skills, internships and career outcomes.",
      benefits: [
        "NCISM accreditation analytics",
        "Automated placement reporting",
        "Institutional cohort telemetry",
      ],
      colorBorder: "border-primary/40 group-hover:border-primary",
      iconBg: "bg-primary/10 text-primary",
    },
  ];

  const handleContinue = () => {
    router.push(`/register?role=${selectedRole}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/10 via-accent/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Portal Home
        </Link>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Already registered?</span>
          <Link href="/login" className="font-bold text-primary hover:underline">
            Sign In
          </Link>
        </div>
      </div>

      {/* Main Role Selection Area */}
      <div className="max-w-5xl mx-auto w-full my-8 z-10 space-y-10 text-center">
        <div className="space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent-foreground text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Step 1 of 3: Stakeholder Role
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground font-sans">
            Choose Your Gateway
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Select your role in the Ayush academia–industry ecosystem to personalize your onboarding, skill taxonomy, and verified dashboard.
          </p>
        </div>

        {/* 4 Premium Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {roles.map((item) => {
            const isSelected = selectedRole === item.role;

            return (
              <motion.div
                key={item.role}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={() => setSelectedRole(item.role)}
                className={cn(
                  "relative rounded-2xl p-6 bg-card border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-sm group",
                  isSelected
                    ? "border-accent ring-4 ring-accent/20 shadow-xl bg-card"
                    : "border-border/80 hover:border-primary/40 hover:shadow-md"
                )}
              >
                {/* Active Gold Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground shadow-sm">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{item.emoji}</span>
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[11px] font-medium text-muted-foreground">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Core Description Quote */}
                  <p className="text-xs font-semibold text-foreground/90 italic bg-muted/40 p-2.5 rounded-lg border border-border/50 mb-4">
                    &ldquo;{item.description}&rdquo;
                  </p>

                  {/* Feature Bullets */}
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {item.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                        <span className="leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-6 border-t border-border/50 flex items-center justify-between text-xs font-semibold">
                  <span className={isSelected ? "text-accent font-bold" : "text-muted-foreground"}>
                    {isSelected ? "Selected Gateway" : "Click to select"}
                  </span>
                  <ArrowRight
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isSelected ? "text-accent translate-x-1" : "text-muted-foreground"
                    )}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="gold"
            size="lg"
            onClick={handleContinue}
            rightIcon={<ArrowRight className="h-4 w-4" />}
            className="w-full sm:w-auto px-8 shadow-lg shadow-accent/20"
          >
            Continue as {roles.find((r) => r.role === selectedRole)?.title}
          </Button>
        </div>
      </div>

      {/* Bottom Ministry Reference */}
      <div className="max-w-6xl mx-auto w-full text-center text-xs text-muted-foreground z-10 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>Ministry of Ayush & All India Institute of Ayurveda Authorized Platform</span>
        <Link href="/admin" className="hover:text-primary underline">
          National Governance Console Access
        </Link>
      </div>
    </div>
  );
}
