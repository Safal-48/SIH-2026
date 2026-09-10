"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Building2,
  GraduationCap,
  Landmark,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/hooks/useAuth";
import { UserRole, ROLE_DEFINITIONS } from "@/types/roles";

function ProfileSetupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, role: currentRole, updateProfile } = useAuth();

  const roleParam = (searchParams?.get("role") as UserRole) || currentRole || "STUDENT";
  const roleConfig = ROLE_DEFINITIONS[roleParam] || ROLE_DEFINITIONS.STUDENT;

  // Form states based on role
  const [institutionName, setInstitutionName] = React.useState("All India Institute of Ayurveda, New Delhi");
  const [degreeOrDesignation, setDegreeOrDesignation] = React.useState("BAMS");
  const [registrationNumber, setRegistrationNumber] = React.useState("AIIA/BAMS/2023/042");
  const [specialization, setSpecialization] = React.useState("Panchakarma & Dravyaguna");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await updateProfile({
      role: roleParam,
      isVerified: true,
    });

    setIsSubmitting(false);
    if (roleParam === "STUDENT") {
      router.push("/student/onboarding");
    } else {
      router.push(roleConfig.baseRoute);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-xl mx-auto w-full flex items-center justify-between z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent-foreground text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          Step 3 of 3: Profile Credentials
        </div>
        <Badge variant="gold">{roleConfig.title}</Badge>
      </div>

      {/* Main Form Card */}
      <div className="max-w-xl mx-auto w-full my-8 z-10">
        <div className="rounded-3xl border border-border bg-card p-7 sm:p-9 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
              Verify Your Ayush Affiliation
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Provide your institutional details to synchronize with the National Ayush Registry.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Student Specific Fields */}
            {roleParam === "STUDENT" && (
              <>
                <Input
                  label="Ayurveda College / University"
                  placeholder="e.g. All India Institute of Ayurveda, New Delhi"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  leftIcon={<Landmark className="h-4 w-4 text-muted-foreground" />}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Current Degree"
                    value={degreeOrDesignation}
                    onChange={(e) => setDegreeOrDesignation(e.target.value)}
                    options={[
                      { value: "BAMS", label: "BAMS" },
                      { value: "MD_AYURVEDA", label: "MD (Ayurveda)" },
                      { value: "MS_AYURVEDA", label: "MS (Ayurveda)" },
                      { value: "PHD", label: "PhD Scholar" },
                    ]}
                  />

                  <Input
                    label="Enrollment / Roll No."
                    placeholder="e.g. AIIA/BAMS/2023/042"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    required
                  />
                </div>

                <Input
                  label="Specialization / Department"
                  placeholder="e.g. Panchakarma or Dravyaguna"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                />
              </>
            )}

            {/* Academician Specific Fields */}
            {roleParam === "ACADEMICIAN" && (
              <>
                <Input
                  label="Faculty / Medical College"
                  placeholder="e.g. Faculty of Ayurveda, IMS, BHU"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  leftIcon={<GraduationCap className="h-4 w-4 text-muted-foreground" />}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Designation"
                    placeholder="e.g. Associate Professor / HOD"
                    value={degreeOrDesignation}
                    onChange={(e) => setDegreeOrDesignation(e.target.value)}
                    required
                  />

                  <Input
                    label="NCISM Registration Number"
                    placeholder="e.g. NCISM/REG/2018/892"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            {/* Industry Specific Fields */}
            {roleParam === "INDUSTRY" && (
              <>
                <Input
                  label="Organization / Company Name"
                  placeholder="e.g. Dabur Research Foundation"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  leftIcon={<Building2 className="h-4 w-4 text-muted-foreground" />}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Ayush Drug / GMP License No."
                    placeholder="e.g. AYUSH-GMP-DL-9841"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    required
                  />

                  <Input
                    label="Authorized Representative Title"
                    placeholder="e.g. Head of R&D"
                    value={degreeOrDesignation}
                    onChange={(e) => setDegreeOrDesignation(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            {/* Institution Specific Fields */}
            {roleParam === "INSTITUTION" && (
              <>
                <Input
                  label="Institution Legal Name"
                  placeholder="e.g. All India Institute of Ayurveda"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  leftIcon={<Landmark className="h-4 w-4 text-muted-foreground" />}
                  required
                />

                <Input
                  label="NCISM Institution Code"
                  placeholder="e.g. AYU0420-DELHI"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  required
                />
              </>
            )}

            {/* Admin Fields */}
            {roleParam === "ADMIN" && (
              <Input
                label="Ministry Department / Directorate"
                placeholder="e.g. Central Council / National Ayush Mission"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                required
              />
            )}

            <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/15 flex items-start gap-2.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>
                Your affiliation will be validated against institutional records before final Competency Passport attestation.
              </span>
            </div>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              isLoading={isSubmitting}
              rightIcon={<ArrowRight className="h-4 w-4" />}
              className="w-full justify-center shadow-md shadow-accent/20"
            >
              {roleParam === "STUDENT"
                ? "Continue to Smart Career Onboarding"
                : `Complete Setup & Open ${roleConfig.title} Dashboard`}
            </Button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-xl mx-auto w-full text-center text-xs text-muted-foreground z-10">
        <p>© {new Date().getFullYear()} Ministry of Ayush • All India Institute of Ayurveda</p>
      </div>
    </div>
  );
}

export default function ProfileSetupPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-xs uppercase tracking-widest font-mono">Loading Profile Setup...</p>
          </div>
        </div>
      }
    >
      <ProfileSetupContent />
    </React.Suspense>
  );
}
