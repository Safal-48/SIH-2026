"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle, Sparkles } from "lucide-react";
import { MarketingNavbar } from "@/components/marketing/MarketingNavbar";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { FaqSection } from "@/components/marketing/FaqSection";
import { RoleSelectionModal } from "@/components/marketing/RoleSelectionModal";

export default function FaqPage() {
  const [roleModalOpen, setRoleModalOpen] = React.useState(false);

  return (
    <div className="relative min-h-screen bg-transparent text-foreground flex flex-col">
      <MarketingNavbar onOpenRoleModal={() => setRoleModalOpen(true)} />

      <main className="flex-1 pt-24 pb-16">
        {/* Breadcrumb & Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground pb-4">
            <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="text-accent font-semibold">Frequently Asked Questions</span>
          </div>

          <div className="p-8 rounded-3xl bg-card/80 backdrop-blur-md border border-border/80 shadow-lg space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="h-3.5 w-3.5 text-accent" />
              <span>Knowledge Center & Support</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-400 to-primary">Questions</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
              Find detailed explanations regarding NCISM compliance, digital clinical logbook attestations, employer verification, and institutional onboarding.
            </p>
          </div>
        </div>

        {/* FAQ Accordion Component */}
        <FaqSection />
      </main>

      <MarketingFooter />

      <RoleSelectionModal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        initialAction="register"
      />
    </div>
  );
}
