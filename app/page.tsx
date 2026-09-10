"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { MarketingNavbar } from "@/components/marketing/MarketingNavbar";
import { HeroSection } from "@/components/marketing/HeroSection";
import { EcosystemSection } from "@/components/marketing/EcosystemSection";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { PinnedJourneyStorytelling } from "@/components/marketing/PinnedJourneyStorytelling";
import { StudentJourneySection } from "@/components/marketing/StudentJourneySection";
import { CareerPathsSection } from "@/components/marketing/CareerPathsSection";
import { SkillGapPreviewSection } from "@/components/marketing/SkillGapPreviewSection";
import { PassportShowcaseSection } from "@/components/marketing/PassportShowcaseSection";
import { OpportunitiesPreviewSection } from "@/components/marketing/OpportunitiesPreviewSection";
import { NetworkSection } from "@/components/marketing/NetworkSection";
import { AutomationSection } from "@/components/marketing/AutomationSection";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { RoleSelectionModal } from "@/components/marketing/RoleSelectionModal";

export default function LandingPage() {
  const router = useRouter();
  const [roleModalOpen, setRoleModalOpen] = React.useState(false);
  const [modalAction, setModalAction] = React.useState<"login" | "register">("register");

  const handleOpenRoleModal = (action: "login" | "register") => {
    setModalAction(action);
    setRoleModalOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      {/* 1. Sticky Navigation Header */}
      <MarketingNavbar onOpenRoleModal={handleOpenRoleModal} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Full-Screen 3D Hero Section */}
        <HeroSection
          onStartJourney={() => router.push("/role-selection")}
          onExploreOpportunities={() => handleScrollToSection("opportunities")}
        />

        {/* 3. Trust / Ecosystem Introduction */}
        <EcosystemSection />

        {/* 4. Cinematic Scroll 'How It Works' */}
        <HowItWorksSection />

        {/* 5. Pinned Career Journey Storytelling (GSAP ScrollTrigger) */}
        <PinnedJourneyStorytelling />

        {/* 6. Complete Student Journey Grid */}
        <StudentJourneySection />

        {/* 6. 7 High-Growth Ayurveda Career Pathways */}
        <CareerPathsSection />

        {/* 7. Skill Gap Dashboard Mockup */}
        <SkillGapPreviewSection />

        {/* 8. Digital Competency Passport Showcase */}
        <PassportShowcaseSection />

        {/* 9. Direct Opportunity Matches */}
        <OpportunitiesPreviewSection
          onApply={() => router.push("/role-selection")}
        />

        {/* 10. Industry + Academia Synergy Network */}
        <NetworkSection />

        {/* 11. Smart Automation Flow */}
        <AutomationSection />

        {/* 12. Final High-Impact CTA */}
        <FinalCtaSection
          onStartJourney={() => router.push("/role-selection")}
          onExploreOpportunities={() => handleScrollToSection("opportunities")}
        />
      </main>

      {/* 13. Marketing Footer */}
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
