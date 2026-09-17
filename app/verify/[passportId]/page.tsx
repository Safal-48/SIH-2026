"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Calendar,
  Building2,
  ExternalLink,
  Lock,
  QrCode,
  ArrowLeft,
  FileCheck,
  Check,
} from "lucide-react";
import { Card } from "@/components/cards/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { passportService, StudentPassportData } from "@/lib/services/passportService";

export default function PublicVerifyPassportPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = React.useState<StudentPassportData | null>(null);

  React.useEffect(() => {
    const passport = passportService.getPassportData();
    setData(passport);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center space-y-3">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Verifying ledger attestation record...</p>
        </div>
      </div>
    );
  }

  const { corePassportSkills } = data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background text-foreground py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Back Nav & Official Flag */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/70 pb-4">
          <Link
            href="/student/passport"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Student Portal
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Ayush National Distributed Ledger Network • Block #{data.ledgerBlockNumber}</span>
          </div>
        </div>

        {/* Verification Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/15 via-emerald-500/5 to-transparent border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-amber-400/60 bg-[#efe1c8] shadow-lg shrink-0 flex items-center justify-center">
              <Image
                src="/images/ayu-setu-emblem.png"
                alt="Ayu-Setu Seal"
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl font-extrabold tracking-tight text-foreground font-heading">
                  Ayu-Setu Competency Verification Stamp
                </h1>
                <Badge variant="verified" size="sm" icon={<Check className="h-3.5 w-3.5" />}>
                  Authentic & Valid
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Issued under National Commission for Indian System of Medicine (NCISM) & Ministry of Ayush
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[11px] font-mono text-muted-foreground uppercase">Attestation Hash</p>
            <p className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
              {data.cryptographicHash.slice(0, 14)}...{data.cryptographicHash.slice(-8)}
            </p>
          </div>
        </div>

        {/* Passport Identity Card */}
        <Card variant="default" className="p-6 sm:p-8 space-y-6 border-border shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 pointer-events-none opacity-5">
            <Award className="h-64 w-64 text-primary" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/80">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/30 flex items-center justify-center text-xl font-bold text-primary font-serif shrink-0">
                AS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-foreground">{data.studentName}</h2>
                  <Badge variant="verified" size="sm">
                    Verified Ayush Scholar
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{data.degree}</p>
                <p className="text-xs text-accent font-medium mt-0.5">{data.institution}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-muted/40 p-3.5 rounded-2xl border border-border/70">
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-mono block">NCISM Registration</span>
                <span className="font-mono font-bold text-foreground">{data.ncismRegistrationNumber}</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-mono block">Enrollment No.</span>
                <span className="font-mono font-bold text-foreground">{data.enrollmentNumber}</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-mono block">Clinical Hours</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{data.totalClinicalHours} Hours Logged</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-mono block">Verified Skills</span>
                <span className="font-bold text-foreground">{data.totalVerifiedSkills} Core Competencies</span>
              </div>
            </div>
          </div>

          {/* Core Passport Credentials */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground font-mono">
                  AYU-SETU • COMPETENCY PASSPORT
                </h3>
                <p className="text-xs text-muted-foreground">
                  Official clinical competencies verified by institutional supervisors & clinical directors
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                corePassportSkills.clinicalDocumentation,
                corePassportSkills.caseHistory,
                corePassportSkills.panchakarmaSafety,
                corePassportSkills.researchProject,
              ].map((skill) => (
                <div
                  key={skill.id}
                  className="p-4 rounded-2xl bg-card border border-border/80 hover:border-emerald-500/40 transition-colors space-y-2 relative"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-foreground">{skill.name}</p>
                      <p className="text-[11px] text-accent font-serif italic">{skill.sanskrit}</p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold shrink-0">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>✓ Verified</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">{skill.evidenceDescription}</p>

                  <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>By: {skill.verifiedBy}</span>
                    <span className="font-mono">{skill.verifiedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cryptographic Ledger Proof Box */}
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                <span className="font-bold text-foreground">Decentralized Merkle Root Verification Proof</span>
              </div>
              <p className="text-[11px] text-muted-foreground font-mono truncate max-w-lg">
                Merkle Root: {data.merkleRootHash}
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <Badge variant="outline" size="sm" className="font-mono">
                Block #{data.ledgerBlockNumber}
              </Badge>
              <Badge variant="secondary" size="sm">
                Ed25519 Signed
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
