"use client";

import * as React from "react";
import { Clock, MapPin, Languages, Check, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import {
  AvailabilityTypeOption,
  LanguagePreferenceOption,
  StudentOnboardingData,
} from "@/types/entities";
import {
  AVAILABILITY_OPTIONS,
  LANGUAGE_OPTIONS,
  POPULAR_AYUSH_CITIES,
} from "@/lib/services/studentOnboarding";
import { cn } from "@/lib/utils/cn";

interface StepAvailabilityProps {
  data: StudentOnboardingData;
  onChange: (updates: Partial<StudentOnboardingData>) => void;
  errors?: Record<string, string>;
}

export function StepAvailability({ data, onChange, errors }: StepAvailabilityProps) {
  const selectedLanguages = data.languages || ["English", "Hindi"];

  const handleToggleLanguage = (lang: LanguagePreferenceOption) => {
    if (selectedLanguages.includes(lang)) {
      if (selectedLanguages.length === 1) return; // keep at least 1
      onChange({ languages: selectedLanguages.filter((l) => l !== lang) });
    } else {
      onChange({ languages: [...selectedLanguages, lang] });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          <Clock className="h-3.5 w-3.5" /> Stage 04: Availability & Practical Preferences
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-sans">
          When and where are you available for clinical postings?
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Industry partners and hospitals filter candidates based on mobility, working schedules, and linguistic patient care needs.
        </p>
      </div>

      {/* 1. Preferred City / Location */}
      <div className="space-y-2.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Preferred City / Location for Internships & Postings <span className="text-destructive">*</span>
        </label>
        <Input
          value={data.preferredCity || ""}
          onChange={(e) => onChange({ preferredCity: e.target.value })}
          placeholder="e.g. Delhi NCR, Jaipur, Mumbai, Kottakkal..."
          leftIcon={<MapPin className="h-4 w-4 text-muted-foreground" />}
          error={errors?.preferredCity}
        />

        {/* Quick City Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-muted-foreground mr-1">Popular Hubs:</span>
          {POPULAR_AYUSH_CITIES.slice(0, 8).map((city) => {
            const isChosen = data.preferredCity?.toLowerCase().includes(city.toLowerCase());
            return (
              <Badge
                key={city}
                variant={isChosen ? "gold" : "outline"}
                size="sm"
                className="cursor-pointer hover:bg-muted transition-colors text-[10px]"
                onClick={() => onChange({ preferredCity: city })}
              >
                {city}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* 2. Availability Schedule */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Availability Commitment <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {AVAILABILITY_OPTIONS.map((opt) => {
            const isSelected = data.availability === opt.id;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChange({ availability: opt.id })}
                className={cn(
                  "p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between group",
                  isSelected
                    ? "bg-card border-accent/60 shadow-lg shadow-accent/10 ring-2 ring-accent/30"
                    : "bg-card/60 border-border hover:bg-muted/60 hover:border-primary/40"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-foreground">{opt.label}</span>
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border flex items-center justify-center transition-all shrink-0",
                      isSelected
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-muted-foreground/40 group-hover:border-primary"
                    )}
                  >
                    {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>
        {errors?.availability && (
          <p className="text-xs text-destructive font-medium">{errors.availability}</p>
        )}
      </div>

      {/* 3. Language Preference */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Languages for Patient Consultations & Documentation <span className="text-destructive">*</span>
          </label>
          <span className="text-[11px] text-muted-foreground">Select all that apply</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {LANGUAGE_OPTIONS.map((lang) => {
            const isSelected = selectedLanguages.includes(lang.id);

            return (
              <div
                key={lang.id}
                onClick={() => handleToggleLanguage(lang.id)}
                className={cn(
                  "p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between text-left group",
                  isSelected
                    ? "bg-card border-primary/60 shadow-md ring-2 ring-primary/30"
                    : "bg-card/60 border-border hover:bg-muted/60 hover:border-primary/40"
                )}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Languages className="h-4 w-4 text-primary" />
                    <h5 className="text-sm font-bold text-foreground">{lang.label}</h5>
                  </div>
                  <div
                    className={cn(
                      "w-4 h-4 rounded border flex items-center justify-center transition-all",
                      isSelected
                        ? "border-primary bg-primary text-white"
                        : "border-muted-foreground/40 group-hover:border-primary"
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground">{lang.subtext}</p>
              </div>
            );
          })}
        </div>
        {errors?.languages && (
          <p className="text-xs text-destructive font-medium">{errors.languages}</p>
        )}
      </div>
    </div>
  );
}
