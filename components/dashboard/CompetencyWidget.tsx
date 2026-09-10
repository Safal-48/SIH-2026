"use client";

import * as React from "react";
import Link from "next/link";
import { Award, ShieldCheck, QrCode, CheckCircle2, FileCheck, ExternalLink } from "lucide-react";
import { Card } from "@/components/cards/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface CompetencyItem {
  id: string;
  name: string;
  sanskrit: string;
  level: string;
  verifiedBy: string;
  date: string;
}

export const VERIFIED_SKILLS_LIST: CompetencyItem[] = [
  {
    id: "clin-doc",
    name: "Clinical Documentation",
    sanskrit: "Rogi Patrika Lekhana",
    level: "SOAP Audit Verified",
    verifiedBy: "Prof. Dr. Meera Nambiar (AIIA)",
    date: "Aug 2026",
  },
  {
    id: "case-hist",
    name: "Case History",
    sanskrit: "Ashtavidha Rogi Pariksha",
    level: "120 Patients Logged",
    verifiedBy: "Dr. Anand Kulkarni (HOD)",
    date: "Jul 2026",
  },
  {
    id: "pk-safety",
    name: "Panchakarma Safety",
    sanskrit: "Shodhana Vyapad Nivaran",
    level: "Protocol Certified",
    verifiedBy: "Dr. Rajesh Varma",
    date: "Aug 2026",
  },
  {
    id: "res-proj",
    name: "Research Project",
    sanskrit: "Anusandhana Karyakrama",
    level: "GCP-Ayush Certified",
    verifiedBy: "CCRAS Joint Faculty",
    date: "Jun 2026",
  },
  {
    id: "nadi",
    name: "Classical Nadi Pariksha Assessment",
    sanskrit: "Nadi Vignana",
    level: "Level 3 Clinical",
    verifiedBy: "Prof. Dr. Anand Kulkarni",
    date: "Aug 2026",
  },
  {
    id: "swasthavritta",
    name: "Swasthavritta Diet & Lifestyle Consultation",
    sanskrit: "Dinacharya & Ahara",
    level: "Preventive Medicine",
    verifiedBy: "Faculty of Ayurveda",
    date: "May 2026",
  },
  {
    id: "dravyaguna",
    name: "Dravyaguna Botanical Identification",
    sanskrit: "Dravya Jnana",
    level: "50 Classical Herbs",
    verifiedBy: "AIIA Herbal Garden",
    date: "May 2026",
  },
  {
    id: "inpatient-monitoring",
    name: "AYUSH Inpatient Monitoring & Daily Vitals",
    sanskrit: "Upasthana",
    level: "Ward Rounds Verified",
    verifiedBy: "Senior Resident Vaidya",
    date: "Apr 2026",
  },
];

interface CompetencyWidgetProps {
  onOpenPassport?: () => void;
}

export function CompetencyWidget({ onOpenPassport }: CompetencyWidgetProps) {
  return (
    <Card id="passport" variant="default" className="p-6 space-y-5 border-border shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-secondary/15 text-secondary border border-secondary/30">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-foreground tracking-tight">
                Competency Passport
              </h3>
              <Badge variant="verified" size="sm" icon={<ShieldCheck className="h-3 w-3" />}>
                NCISM Certified
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Cryptographically stamped and supervisor-attested clinical credentials
            </p>
          </div>
        </div>

        {/* Big Count Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 self-start sm:self-auto">
          <CheckCircle2 className="h-4 w-4" />
          <span className="font-extrabold text-sm tracking-tight">
            7 Verified Skills
          </span>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {VERIFIED_SKILLS_LIST.map((skill) => (
          <div
            key={skill.id}
            className="p-3 rounded-xl bg-card border border-border/80 flex items-start justify-between gap-2 text-xs hover:border-accent/40 transition-colors"
          >
            <div className="space-y-0.5 min-w-0">
              <p className="font-bold text-foreground truncate">{skill.name}</p>
              <p className="text-[10px] text-accent font-serif italic">{skill.sanskrit}</p>
              <p className="text-[10px] text-muted-foreground">
                Attested by {skill.verifiedBy}
              </p>
            </div>
            <Badge variant="outline" size="sm" className="shrink-0 text-[10px]">
              {skill.level}
            </Badge>
          </div>
        ))}
      </div>

      {/* Passport Preview & QR Trigger Footer */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-muted/60 via-card to-card border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-background border border-border text-foreground">
            <QrCode className="h-6 w-6 text-primary" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-foreground">Tamper-Evident Digital Passport Active</p>
            <p className="text-[11px] text-muted-foreground font-mono">
              Hash: 0x7e8b...4f19 • AIIA National Network
            </p>
          </div>
        </div>

        {onOpenPassport ? (
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenPassport}
            rightIcon={<ExternalLink className="h-3.5 w-3.5" />}
            className="text-xs shrink-0 self-end sm:self-auto"
          >
            View Full Passport
          </Button>
        ) : (
          <Link href="/student/passport">
            <Button
              variant="outline"
              size="sm"
              rightIcon={<ExternalLink className="h-3.5 w-3.5" />}
              className="text-xs shrink-0 self-end sm:self-auto"
            >
              View Full Passport
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
}
