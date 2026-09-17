"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { MarketingNavbar } from "@/components/marketing/MarketingNavbar";
import { HeroSection } from "@/components/marketing/HeroSection";
import { ScrollTextRevealThought } from "@/components/marketing/ScrollTextRevealThought";
import { EcosystemSection } from "@/components/marketing/EcosystemSection";
import { NetworkSection } from "@/components/marketing/NetworkSection";
import { PassportShowcaseSection } from "@/components/marketing/PassportShowcaseSection";
import { LivePassportVerifierSection } from "@/components/marketing/LivePassportVerifierSection";
import { IndustryPlacementRadar } from "@/components/marketing/IndustryPlacementRadar";
import { StudentJourneySection } from "@/components/marketing/StudentJourneySection";
import { TestimonialsWallSection } from "@/components/marketing/TestimonialsWallSection";
import { FaqSection } from "@/components/marketing/FaqSection";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { RoleSelectionModal } from "@/components/marketing/RoleSelectionModal";
import { QuickActionDock } from "@/components/marketing/QuickActionDock";
import { InteractiveCursorGlow } from "@/components/animations/InteractiveCursorGlow";

export default function LandingPage() {
  const router = useRouter();
  const [roleModalOpen, setRoleModalOpen] = React.useState(false);
  const [modalAction, setModalAction] = React.useState<"login" | "register">("register");

  const handleOpenRoleModal = (action: "login" | "register") => {
    setModalAction(action);
    setRoleModalOpen(true);
  };

  const handleScrollToOpportunities = () => {
    const el = document.getElementById("opportunities");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/opportunities");
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent text-foreground flex flex-col w-full max-w-full overflow-x-hidden">
      {/* Dynamic Desktop Cursor Follower Aura */}
      <InteractiveCursorGlow />

      {/* 1. Sticky Navigation Header */}
      <MarketingNavbar onOpenRoleModal={handleOpenRoleModal} />

      {/* Main Content Sections — Rich, Authoritative, Enterprise & Long-Scroll */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* 2. Official Ayu-Setu Hero Section */}
        <HeroSection
          onStartJourney={() => router.push("/role-selection")}
          onExploreOpportunities={handleScrollToOpportunities}
        />

        {/* 3. Thought Transition Section */}
        <ScrollTextRevealThought />

        {/* 4. Integrated Ayush Ecosystem (Scholars, Faculty Guides, Hospitals & Pharma, Institutions) */}
        <EcosystemSection />

        {/* 5. National Academia–Industry Exchange & Collaborative Research Synergy */}
        <NetworkSection />

        {/* 6. The Ayurveda Competency Passport — 3D Holographic Credential Showcase */}
        <PassportShowcaseSection />

        {/* 7. Public Credential Verification Sandbox (Merkle Cryptographic Hash Verifier) */}
        <LivePassportVerifierSection />

        {/* 8. National Ayush Placement & Fellowship Radar (Opportunities & Fellowships) */}
        <IndustryPlacementRadar />

        {/* 9. Complete 9-Stage Ayurveda Scholar Transformation Lifecycle */}
        <StudentJourneySection />

        {/* 10. Voices of Trust — Testimonials from Scholars, Hospital Directors & Pharma Leaders */}
        <TestimonialsWallSection />

        {/* 11. Comprehensive Ayush & NCISM Regulatory FAQ Accordion */}
        <FaqSection />

        {/* 12. Official Ministry of Ayush Call to Action */}
        <FinalCtaSection
          onStartJourney={() => router.push("/role-selection")}
          onExploreOpportunities={handleScrollToOpportunities}
        />
      </main>

      {/* Floating Interactive Quick Action Dock */}
      <QuickActionDock />

      {/* Official Government Footer */}
      <MarketingFooter />

      {/* Stakeholder Portal Launcher Modal */}
      <RoleSelectionModal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        initialAction={modalAction}
      />
    </div>
  );
}

