"use client";

import * as React from "react";
import { ArrowRight, Sparkles, Compass, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

interface FinalCtaSectionProps {
  onStartJourney: () => void;
  onExploreOpportunities: () => void;
}

export function FinalCtaSection({
  onStartJourney,
  onExploreOpportunities,
}: FinalCtaSectionProps) {
  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-b from-background via-herbal-950/10 to-background border-b border-border/60">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <RevealOnScroll direction="up" distance={24}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Empowering the Next Generation of Vaidyas
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground font-sans leading-tight max-w-3xl mx-auto">
            Build the skills your future needs.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join thousands of Ayurveda scholars, clinical guides, accredited institutions, and herbal pharma innovators transforming traditional healthcare with intelligent automation.
          </p>

          {/* Dual CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton>
              <Button
                variant="gold"
                size="lg"
                onClick={onStartJourney}
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="shadow-xl shadow-accent/25 px-8"
              >
                Start Your Journey
              </Button>
            </MagneticButton>

            <MagneticButton>
              <Button
                variant="outline"
                size="lg"
                onClick={onExploreOpportunities}
                leftIcon={<Compass className="h-4 w-4 text-accent" />}
                className="px-8"
              >
                Explore Opportunities
              </Button>
            </MagneticButton>
          </div>

          <div className="pt-10 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Free Scholar Registration
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Verified Institutional MOUs
            </span>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
