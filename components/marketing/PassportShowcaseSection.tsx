"use client";

import * as React from "react";
import {
  ShieldCheck,
  Award,
  QrCode,
  CheckCircle2,
  Lock,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function PassportShowcaseSection() {
  const competencies = [
    { name: "Clinical Documentation & Inpatient Records", date: "Verified 24 Aug 2026", supervisor: "Faculty of Kayachikitsa" },
    { name: "Case History Practice (120 Patients)", date: "Verified 12 Aug 2026", supervisor: "OPD Medical Superintendent" },
    { name: "Panchakarma Safety & Procedure Execution", date: "Verified 28 Jul 2026", supervisor: "HOD Panchakarma, AIIA" },
    { name: "Research Project & GCP-Ayush Trial Ethics", date: "Verified 15 Jun 2026", supervisor: "CCRAS Institutional Guide" },
  ];

  return (
    <section id="passport" className="py-24 border-b border-border/60 bg-background relative overflow-hidden">
      {/* Background decorative glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Tamper-Evident Credentials"
          title="The Ayurveda Competency Passport"
          subtitle="A verifiable, supervisor-attested digital credential that travels with the scholar throughout their medical and research career."
          align="center"
        />

        <div className="mt-16 max-w-4xl mx-auto">
          <RevealOnScroll direction="up" distance={30}>
            {/* 3D Perspective Card Container */}
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-accent/40 via-primary/30 to-border shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
              <div className="rounded-[22px] bg-gradient-to-b from-card via-card to-background p-6 sm:p-10 border border-border space-y-8">
                {/* Passport Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-herbal-800 text-white font-serif text-2xl font-bold flex items-center justify-center shadow-md">
                      वै
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl font-bold text-foreground">
                          Ayurveda Competency Passport
                        </h4>
                        <Badge variant="gold" size="sm">
                          Verified
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        National Ayush Board of Education & Training • All India Institute of Ayurveda
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block">
                      Passport Hash
                    </span>
                    <span className="font-mono text-xs font-bold text-primary">
                      AYUR-PASS-2026-89412
                    </span>
                  </div>
                </div>

                {/* Passport Credentials & Verified Badges */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Scholar Info & QR (5 Cols) */}
                  <div className="md:col-span-5 space-y-5 bg-muted/30 p-5 rounded-2xl border border-border/60">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-lg text-primary">
                        AS
                      </div>
                      <div>
                        <h5 className="text-base font-bold text-foreground">Aarav Sharma</h5>
                        <p className="text-xs text-muted-foreground">BAMS Final Year Scholar</p>
                        <p className="text-[11px] text-primary font-medium">AIIA, New Delhi</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border/60 space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Clinical Logbook Hours:</span>
                        <span className="font-bold text-foreground">450+ Verified</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Attested Procedures:</span>
                        <span className="font-bold text-foreground">58 Sodhana/Samana</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Audit Status:</span>
                        <span className="font-semibold text-emerald-600">Tamper-Proof (SHA-256)</span>
                      </div>
                    </div>

                    {/* QR Code Placeholder Box */}
                    <div className="pt-2 flex items-center gap-3 p-3 rounded-xl bg-background border border-border">
                      <div className="p-2 rounded-lg bg-muted text-foreground">
                        <QrCode className="h-7 w-7" />
                      </div>
                      <div className="text-[11px]">
                        <p className="font-bold text-foreground">Instant Verification QR</p>
                        <p className="text-muted-foreground">Scan by industry recruiters or hospitals</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Verified Competency Milestones (7 Cols) */}
                  <div className="md:col-span-7 space-y-4">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      Officially Endorsed Clinical Competencies
                    </h5>

                    <div className="space-y-2.5">
                      {competencies.map((comp, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-background border border-border hover:border-primary/40 transition-colors space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                              {comp.name}
                            </span>
                            <Badge variant="verified" size="sm">
                              Attested
                            </Badge>
                          </div>
                          <div className="flex justify-between text-[11px] text-muted-foreground pl-5">
                            <span>{comp.supervisor}</span>
                            <span>{comp.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Supervisor Digital Attestation Stamp */}
                    <div className="p-3.5 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-accent" />
                        <div>
                          <p className="font-bold text-foreground">Cryptographic Supervisor Seal</p>
                          <p className="text-[11px] text-muted-foreground">Digital signature verified via National Ayush Registry</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-accent uppercase tracking-wider font-bold">
                        Valid 2026-2031
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
