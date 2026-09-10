"use client";

import * as React from "react";
import { GraduationCap, Building2, Sparkles, Check, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import {
  StudentDegreeOption,
  StudentYearOption,
  StudentOnboardingData,
} from "@/types/entities";
import {
  PREMIER_AYURVEDA_COLLEGES,
  AYURVEDA_SPECIALIZATIONS,
} from "@/lib/services/studentOnboarding";
import { cn } from "@/lib/utils/cn";

interface StepAcademicProps {
  data: StudentOnboardingData;
  onChange: (updates: Partial<StudentOnboardingData>) => void;
  errors?: Record<string, string>;
}

const DEGREE_OPTIONS: { id: StudentDegreeOption; title: string; subtitle: string; icon: string }[] = [
  {
    id: "BAMS",
    title: "BAMS",
    subtitle: "Ayurvedacharya • Undergraduate Medicine",
    icon: "🎓",
  },
  {
    id: "MD/MS Ayurveda",
    title: "MD / MS Ayurveda",
    subtitle: "Ayurveda Vachaspati • Clinical Post-Graduate",
    icon: "🩺",
  },
  {
    id: "PhD Ayurveda",
    title: "PhD Ayurveda",
    subtitle: "Vidya Varidhi • Doctoral Clinical Research",
    icon: "🔬",
  },
];

const YEAR_OPTIONS: StudentYearOption[] = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "Final Year",
  "Intern",
  "Postgraduate",
];

export function StepAcademic({ data, onChange, errors }: StepAcademicProps) {
  const [collegeQuery, setCollegeQuery] = React.useState(data.college || "");
  const [showCollegeDropdown, setShowCollegeDropdown] = React.useState(false);

  const filteredColleges = React.useMemo(() => {
    if (!collegeQuery.trim()) return PREMIER_AYURVEDA_COLLEGES.slice(0, 6);
    return PREMIER_AYURVEDA_COLLEGES.filter((col) =>
      col.toLowerCase().includes(collegeQuery.toLowerCase())
    );
  }, [collegeQuery]);

  const handleSelectCollege = (name: string) => {
    setCollegeQuery(name);
    onChange({ college: name });
    setShowCollegeDropdown(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Section Header */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          <GraduationCap className="h-3.5 w-3.5" /> Stage 01: Academic Credentials
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-sans">
          Where are you in your Ayurvedic education?
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Your academic standing establishes your NCISM curriculum baseline and clinical scope of practice.
        </p>
      </div>

      {/* 1. Degree Selection */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Select Your Degree Program <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DEGREE_OPTIONS.map((item) => {
            const isSelected = data.degree === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ degree: item.id })}
                className={cn(
                  "p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between group",
                  isSelected
                    ? "bg-card border-accent/60 shadow-lg shadow-accent/10 ring-2 ring-accent/30"
                    : "bg-card/60 border-border hover:bg-muted/60 hover:border-primary/40"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                      isSelected
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-muted-foreground/40 group-hover:border-primary"
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-bold text-foreground">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>
        {errors?.degree && (
          <p className="text-xs text-destructive font-medium">{errors.degree}</p>
        )}
      </div>

      {/* 2. Current Year */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Current Academic Year / Stage <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {YEAR_OPTIONS.map((year) => {
            const isSelected = data.currentYear === year;
            return (
              <button
                key={year}
                type="button"
                onClick={() => onChange({ currentYear: year })}
                className={cn(
                  "py-2.5 px-3 rounded-xl text-xs font-semibold text-center border transition-all",
                  isSelected
                    ? "bg-accent text-accent-foreground border-accent shadow-md shadow-accent/20 font-bold"
                    : "bg-card/80 border-border text-foreground hover:bg-muted"
                )}
              >
                {year}
              </button>
            );
          })}
        </div>
        {errors?.currentYear && (
          <p className="text-xs text-destructive font-medium">{errors.currentYear}</p>
        )}
      </div>

      {/* 3. College / Institution Autocomplete */}
      <div className="space-y-2 relative">
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          College or University <span className="text-destructive">*</span>
        </label>
        <div className="relative">
          <Input
            value={collegeQuery}
            onChange={(e) => {
              setCollegeQuery(e.target.value);
              onChange({ college: e.target.value });
              setShowCollegeDropdown(true);
            }}
            onFocus={() => setShowCollegeDropdown(true)}
            placeholder="Type or select your Ayurvedic College..."
            leftIcon={<Building2 className="h-4 w-4 text-muted-foreground" />}
            error={errors?.college}
          />

          {/* Autocomplete Suggestions Dropdown */}
          {showCollegeDropdown && filteredColleges.length > 0 && (
            <div className="absolute z-30 top-full mt-1.5 w-full rounded-xl border border-border bg-popover text-popover-foreground shadow-xl overflow-hidden max-h-56 overflow-y-auto">
              <div className="p-1.5 text-[10px] uppercase font-semibold text-muted-foreground tracking-wider bg-muted/60 px-3">
                Suggested Premier Institutes
              </div>
              {filteredColleges.map((col) => (
                <button
                  key={col}
                  type="button"
                  onClick={() => handleSelectCollege(col)}
                  className="w-full text-left px-3.5 py-2.5 text-xs hover:bg-muted/80 flex items-center justify-between border-b border-border/40 last:border-0 transition-colors"
                >
                  <span className="font-medium truncate">{col}</span>
                  {data.college === col && (
                    <Check className="h-3.5 w-3.5 text-accent shrink-0 ml-2" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. Specialization if applicable */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Specialization / Primary Discipline Focus <span className="text-muted-foreground/60">(Optional)</span>
          </label>
          <span className="text-[11px] text-muted-foreground">NCISM Harmonized</span>
        </div>

        <Input
          value={data.specialization || ""}
          onChange={(e) => onChange({ specialization: e.target.value })}
          placeholder="e.g. Kayachikitsa, Panchakarma, Dravyaguna, Shalya Tantra..."
          leftIcon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
        />

        {/* Quick Discipline Tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-muted-foreground mr-1">Popular:</span>
          {AYURVEDA_SPECIALIZATIONS.slice(0, 5).map((spec) => {
            const shortName = spec.split(" (")[0];
            const isChosen = data.specialization?.includes(shortName);
            return (
              <Badge
                key={spec}
                variant={isChosen ? "gold" : "outline"}
                size="sm"
                className="cursor-pointer hover:bg-muted transition-colors text-[10px]"
                onClick={() => onChange({ specialization: spec })}
              >
                {shortName}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
}
