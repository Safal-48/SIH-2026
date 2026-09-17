"use client";

import * as React from "react";
import Link from "next/link";
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Sparkles,
  Plus,
  Trash2,
  Save,
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
  ArrowRight,
  HelpCircle,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/cards/Card";
import {
  getStoredResumeProfile,
  saveResumeProfile,
  ResumeProfileData,
} from "@/lib/services/careerIntelligenceService";
import { addSelfDeclaredSkillsFromResume } from "@/lib/services/skillIntelligenceService";

export function ResumeProfileTab() {
  const [profile, setProfile] = React.useState<ResumeProfileData | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [rawResumeText, setRawResumeText] = React.useState("");
  const [showTextParser, setShowTextParser] = React.useState(false);

  // New item inputs
  const [newSkillInput, setNewSkillInput] = React.useState("");
  const [newCertInput, setNewCertInput] = React.useState("");
  const [newProjectInput, setNewProjectInput] = React.useState("");

  React.useEffect(() => {
    setProfile(getStoredResumeProfile());
  }, []);

  if (!profile) {
    return <div className="p-8 text-center text-xs text-muted-foreground">Loading Resume &amp; Profile...</div>;
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // Simulate ATS resume parsing
    setTimeout(() => {
      const extractedKeywords = [
        "Clinical Documentation (SOAP)",
        "Nadi Pariksha Assessment",
        "Charaka Samhita Nidana Sthana",
        "GCP Clinical Trials (ICH-GCP)",
        "Basic Biostatistics (SPSS / Excel)",
        "Panchakarma Protocol Supervision",
        "Schedule E-1 Formulations",
      ];

      // STRICT: Add to Skill DNA as Self Declared
      addSelfDeclaredSkillsFromResume(extractedKeywords);

      const updated: ResumeProfileData = {
        ...profile,
        lastUpdated: new Date().toISOString().split("T")[0],
        fileName: file.name,
        extractedSkills: extractedKeywords.map((name) => ({
          skillName: name,
          category: "Extracted Clinical Skill",
          verificationStatus: "Self Declared", // STRICT: Never falsely elevated
        })),
        resumeReadinessScore: 92,
      };

      setProfile(updated);
      saveResumeProfile(updated);
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    }, 1200);
  };

  const handleParseText = () => {
    if (!rawResumeText.trim()) return;

    // Detect keywords from pasted text
    const sampleKeywords = [
      "Clinical Documentation",
      "Panchakarma Therapy",
      "Dravyaguna Identification",
      "Rasashastra Bhasma",
      "Ayurvedic Pharmacopoeia",
      "GCP-Ayush Bioethics",
      "Pulse Diagnostics",
    ];

    const detected = sampleKeywords.filter((kw) =>
      rawResumeText.toLowerCase().includes(kw.toLowerCase().split(" ")[0])
    );

    const skillsToAdd = detected.length > 0 ? detected : ["Classical Ayurvedic Case History", "Snehana-Swedana"];
    addSelfDeclaredSkillsFromResume(skillsToAdd);

    const updated: ResumeProfileData = {
      ...profile,
      extractedSkills: [
        ...profile.extractedSkills,
        ...skillsToAdd.map((name) => ({
          skillName: name,
          category: "Self-Reported Skill",
          verificationStatus: "Self Declared" as const,
        })),
      ],
      resumeReadinessScore: Math.min(100, (profile.resumeReadinessScore || 80) + 5),
    };

    setProfile(updated);
    saveResumeProfile(updated);
    setRawResumeText("");
    setShowTextParser(false);
    alert(`Successfully parsed ${skillsToAdd.length} self-declared skills. Note: They remain Self Declared until verified.`);
  };

  const handleAddManualSkill = () => {
    if (!newSkillInput.trim()) return;
    const skillName = newSkillInput.trim();

    addSelfDeclaredSkillsFromResume([skillName]);

    const updated: ResumeProfileData = {
      ...profile,
      extractedSkills: [
        ...profile.extractedSkills,
        {
          skillName,
          category: "Student Self-Reported",
          verificationStatus: "Self Declared", // STRICT: Never verified
        },
      ],
    };

    setProfile(updated);
    saveResumeProfile(updated);
    setNewSkillInput("");
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = profile.extractedSkills.filter((_, idx) => idx !== index);
    const updated: ResumeProfileData = {
      ...profile,
      extractedSkills: updatedSkills,
    };
    setProfile(updated);
    saveResumeProfile(updated);
  };

  return (
    <div className="space-y-8">
      {/* 1. Header & ATS Readiness Score */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-[#032014] to-slate-950 border border-emerald-500/30 backdrop-blur-xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <FileCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Ayush Healthcare ATS &amp; Profile Vault</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Resume &amp; Clinical Profile
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            Upload your academic CV or clinical CV to extract competencies. All resume-extracted entries remain transparently marked as self-declared until proven through assessment.
          </p>
        </div>

        {/* ATS Readiness Score Gauge */}
        <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 text-center min-w-[140px] flex-shrink-0">
          <div className="text-3xl font-extrabold text-amber-400 font-mono">
            {profile.resumeReadinessScore}%
          </div>
          <span className="text-[10px] uppercase tracking-wider text-gray-300 font-bold block mt-0.5">
            ATS Readiness
          </span>
          <span className="text-[9px] text-emerald-400 block mt-1 font-semibold">
            Institutional Standard
          </span>
        </div>
      </div>

      {/* 2. STRICT VERIFICATION INTEGRITY NOTICE */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3.5">
        <ShieldAlert className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <h4 className="font-bold text-amber-300 uppercase tracking-wider">
            National Ayush Registry Verification Rule
          </h4>
          <p className="text-gray-300 leading-relaxed">
            Information extracted from your uploaded resume or typed manually is permanently tagged as{" "}
            <span className="font-bold text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30">
              SELF DECLARED
            </span>
            . To upgrade a competency to{" "}
            <span className="font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
              Assessment Verified ✓
            </span>{" "}
            or{" "}
            <span className="font-bold text-sky-400 bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-500/30">
              Institution Verified ✓
            </span>
            , you must pass diagnostic evaluations in the ASSESS chamber or submit hospital logbook supervisor attestations.
          </p>
        </div>
      </div>

      {/* 3. Resume File Upload Box */}
      <div className="p-6 rounded-3xl bg-[#03190f]/90 border border-emerald-500/30 backdrop-blur-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
              <Upload className="h-5 w-5 text-emerald-400" />
              <span>Upload Resume (PDF, DOCX, TXT)</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {profile.fileName ? `Current file: ${profile.fileName} (Parsed ${profile.lastUpdated})` : "No resume file uploaded yet."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowTextParser(!showTextParser)}
              variant="outline"
              size="sm"
              className="text-xs border-emerald-500/30 text-emerald-300"
            >
              {showTextParser ? "Hide Text Input" : "Paste Raw Text"}
            </Button>

            <label className="cursor-pointer">
              <input
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
              <div className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 transition-colors flex items-center gap-2 shadow-md">
                <Upload className="h-3.5 w-3.5" />
                <span>{isUploading ? "Parsing ATS Keywords..." : "Select File"}</span>
              </div>
            </label>
          </div>
        </div>

        {uploadSuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4" />
            <span>Resume parsed successfully. Extracted skills tagged as Self Declared.</span>
          </div>
        )}

        {showTextParser && (
          <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-3 animate-in fade-in">
            <label className="text-xs font-bold text-gray-300 block">
              Paste your CV / Clinical Summary text:
            </label>
            <textarea
              rows={4}
              value={rawResumeText}
              onChange={(e) => setRawResumeText(e.target.value)}
              placeholder="Paste your clinical duties, research papers, BAMS internships, and procedures here..."
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-emerald-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
            />
            <div className="flex justify-end">
              <Button onClick={handleParseText} variant="gold" size="sm" className="text-xs font-bold">
                Extract Competencies
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* 4. Extracted Skills Grid (Strictly Self Declared) */}
      <div className="p-6 rounded-3xl bg-[#03190f]/90 border border-emerald-500/30 backdrop-blur-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-amber-400" />
              <span>Extracted &amp; Self-Reported Skills ({profile.extractedSkills.length})</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              These competencies are part of your application profile. Take tests to verify them.
            </p>
          </div>

          <Link href="/assess">
            <Button variant="outline" size="sm" className="border-emerald-500/30 text-emerald-300 text-xs gap-1">
              <span>Verify in ASSESS</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>

        {/* Add Skill Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Add self-reported skill (e.g. Swasthavritta Consultation, Marma Point Therapy)..."
            value={newSkillInput}
            onChange={(e) => setNewSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddManualSkill()}
            className="flex-1 px-3 py-2 rounded-xl bg-black/50 border border-emerald-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
          />
          <Button onClick={handleAddManualSkill} variant="gold" size="sm" className="text-xs font-bold gap-1">
            <Plus className="h-3.5 w-3.5" />
            <span>Add</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {profile.extractedSkills.map((sk, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 flex items-center justify-between gap-2"
            >
              <div className="space-y-0.5 min-w-0">
                <span className="text-xs font-semibold text-white block truncate">
                  {sk.skillName}
                </span>
                <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {sk.verificationStatus}
                </span>
              </div>
              <button
                onClick={() => handleRemoveSkill(idx)}
                className="text-gray-400 hover:text-rose-400 transition-colors p-1"
                title="Remove skill"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Profile Sections: Education, Experience, Certifications, Projects, Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education */}
        <div className="p-6 rounded-3xl bg-[#03190f]/90 border border-emerald-500/25 space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-emerald-400" />
            <span>Education</span>
          </h4>
          {profile.education.map((edu, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-black/30 border border-emerald-500/15 space-y-1 text-xs">
              <span className="font-bold text-white block">{edu.degree}</span>
              <span className="text-gray-300 block">{edu.institution}</span>
              <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                <span>Class of {edu.graduationYear}</span>
                <span className="text-emerald-400 font-semibold">{edu.score}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Internships & Clinical Rotations */}
        <div className="p-6 rounded-3xl bg-[#03190f]/90 border border-emerald-500/25 space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-amber-400" />
            <span>Internships &amp; Clinical Experience</span>
          </h4>
          {profile.internships.map((int, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-black/30 border border-emerald-500/15 text-xs text-gray-200">
              {int}
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="p-6 rounded-3xl bg-[#03190f]/90 border border-emerald-500/25 space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Award className="h-4 w-4 text-sky-400" />
            <span>Certifications</span>
          </h4>
          {profile.certifications.map((cert, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-black/30 border border-emerald-500/15 text-xs text-gray-200">
              {cert}
            </div>
          ))}
        </div>

        {/* Applied Projects & Achievements */}
        <div className="p-6 rounded-3xl bg-[#03190f]/90 border border-emerald-500/25 space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span>Projects &amp; Honors</span>
          </h4>
          {profile.projects.concat(profile.achievements).map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-black/30 border border-emerald-500/15 text-xs text-gray-200">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
