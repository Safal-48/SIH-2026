"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Save,
  CheckCircle2,
  Home,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { OnboardingProgressBar } from "@/components/onboarding/OnboardingProgressBar";
import { StepAcademic } from "@/components/onboarding/StepAcademic";
import { StepExperience } from "@/components/onboarding/StepExperience";
import { StepCareerGoal } from "@/components/onboarding/StepCareerGoal";
import { StepAvailability } from "@/components/onboarding/StepAvailability";
import { StepComplete } from "@/components/onboarding/StepComplete";
import { useAuth } from "@/hooks/useAuth";
import { StudentOnboardingData } from "@/types/entities";
import {
  INITIAL_ONBOARDING_DATA,
  saveOnboardingDraftLocally,
  loadOnboardingDraftLocally,
  clearOnboardingDraftLocally,
  syncStudentOnboardingToSupabase,
} from "@/lib/services/studentOnboarding";

function StudentOnboardingContent() {
  const router = useRouter();
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const [direction, setDirection] = React.useState<number>(1);
  const [formData, setFormData] = React.useState<StudentOnboardingData>(INITIAL_ONBOARDING_DATA);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = React.useState<boolean>(false);

  // Restore draft from localStorage on mount
  React.useEffect(() => {
    const draft = loadOnboardingDraftLocally();
    if (draft) {
      setFormData(draft);
    }
  }, []);

  // Update form data and auto-save draft
  const handleUpdate = (updates: Partial<StudentOnboardingData>) => {
    setFormData((prev) => {
      const next = { ...prev, ...updates };
      saveOnboardingDraftLocally(next);
      return next;
    });
    // Clear field-specific error when modified
    setErrors({});
  };

  // Step Validation Logic
  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.degree) newErrors.degree = "Please select your degree program.";
      if (!formData.currentYear) newErrors.currentYear = "Please select your current academic year.";
      if (!formData.college || formData.college.trim().length < 3) {
        newErrors.college = "Please enter your college or institution name (at least 3 characters).";
      }
    } else if (currentStep === 3) {
      if (!formData.careerInterests || formData.careerInterests.length === 0) {
        newErrors.careerInterests = "Please select at least one career interest.";
      }
    } else if (currentStep === 4) {
      if (!formData.preferredCity || formData.preferredCity.trim().length < 2) {
        newErrors.preferredCity = "Please specify your preferred city or location.";
      }
      if (!formData.availability) {
        newErrors.availability = "Please choose your availability commitment.";
      }
      if (!formData.languages || formData.languages.length === 0) {
        newErrors.languages = "Please select at least one language for consultations.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Next Step Action
  const handleNext = async () => {
    if (!validateCurrentStep()) return;

    if (currentStep < 5) {
      const nextStep = currentStep + 1;
      setDirection(1);
      setCurrentStep(nextStep);

      // If moving to step 5 (Complete), mark completed and sync with Supabase
      if (nextStep === 5) {
        const completedData = {
          ...formData,
          onboardingCompleted: true,
          onboardingCompletedAt: new Date().toISOString(),
        };
        handleUpdate(completedData);
        if (user?.id) {
          syncStudentOnboardingToSupabase(user.id, completedData);
        }
      }
    }
  };

  // Back Step Action
  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  // Explicit Save & Continue
  const handleSaveAndContinue = async () => {
    if (!validateCurrentStep()) return;
    setIsSaving(true);
    saveOnboardingDraftLocally(formData);

    if (user?.id) {
      await syncStudentOnboardingToSupabase(user.id, formData);
    }

    setIsSaving(false);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 3000);

    if (currentStep < 5) {
      handleNext();
    }
  };

  // Slide Animation Variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.28, ease: "easeOut" },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    }),
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation */}
      <header className="max-w-3xl mx-auto w-full flex items-center justify-between pb-6 border-b border-border/70 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-xs font-semibold text-foreground hover:text-primary transition-colors group"
        >
          <div className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-amber-400/60 bg-[#efe1c8] shadow-sm shrink-0">
            <Image
              src="/images/ayu-setu-emblem.png"
              alt="Ayu-Setu"
              width={28}
              height={28}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-heading font-black tracking-tight text-sm">
            AYU<span className="text-amber-400">-SETU</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {saveSuccessNotice && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1 animate-fade-in">
              <CheckCircle2 className="h-3.5 w-3.5" /> Progress Auto-Saved
            </span>
          )}

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleSaveAndContinue}
            isLoading={isSaving}
            leftIcon={<Save className="h-3.5 w-3.5 text-muted-foreground" />}
            className="text-xs"
          >
            Save Draft
          </Button>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="max-w-3xl mx-auto w-full my-6 flex-1 z-10 flex flex-col justify-between">
        {/* Milestone Progress Bar */}
        <div className="mb-8">
          <OnboardingProgressBar
            currentStep={currentStep}
            onStepClick={(step) => {
              if (step < currentStep) {
                setDirection(step > currentStep ? 1 : -1);
                setCurrentStep(step);
              }
            }}
          />
        </div>

        {/* Dynamic Animated Step View */}
        <div className="min-h-[460px] flex flex-col justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              {currentStep === 1 && (
                <StepAcademic
                  data={formData}
                  onChange={handleUpdate}
                  errors={errors}
                />
              )}

              {currentStep === 2 && (
                <StepExperience
                  data={formData}
                  onChange={handleUpdate}
                  errors={errors}
                />
              )}

              {currentStep === 3 && (
                <StepCareerGoal
                  data={formData}
                  onChange={handleUpdate}
                  errors={errors}
                />
              )}

              {currentStep === 4 && (
                <StepAvailability
                  data={formData}
                  onChange={handleUpdate}
                  errors={errors}
                />
              )}

              {currentStep === 5 && (
                <StepComplete
                  data={formData}
                  studentName={user?.fullName || "Aarav Sharma"}
                  studentEmail={user?.email || "student@aiia.gov.in"}
                  onStartAssessment={() => router.push("/student/assessment-prep")}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Wizard Navigation (Hidden on Step 5 since StepComplete provides dedicated CTAs) */}
        {currentStep < 5 && (
          <div className="pt-8 border-t border-border/80 flex items-center justify-between gap-4 mt-8">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleBack}
              disabled={currentStep === 1}
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Back
            </Button>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="gold"
                size="lg"
                onClick={handleNext}
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="shadow-md shadow-accent/20 px-6"
              >
                {currentStep === 4 ? "Finalize Profile" : "Next Stage"}
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-3xl mx-auto w-full text-center text-xs text-muted-foreground pt-6 border-t border-border/40 z-10">
        <p>© {new Date().getFullYear()} Ministry of Ayush • All India Institute of Ayurveda</p>
      </footer>
    </div>
  );
}

export default function StudentOnboardingPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-xs uppercase tracking-widest font-mono">Loading Smart Onboarding...</p>
          </div>
        </div>
      }
    >
      <StudentOnboardingContent />
    </React.Suspense>
  );
}
