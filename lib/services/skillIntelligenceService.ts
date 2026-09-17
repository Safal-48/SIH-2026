export type SkillCategory =
  | "Ayurvedic Knowledge"
  | "Clinical Competency"
  | "Research Skills"
  | "Digital & Modern Healthcare Skills"
  | "Professional Skills";

export type VerificationStatus =
  | "Self Declared"
  | "Assessment Verified"
  | "Institution Verified"
  | "Industry Verified";

export interface SkillDnaItem {
  id: string;
  name: string;
  sanskritName?: string;
  category: SkillCategory;
  currentProficiency: number; // 0 - 100
  benchmark: number; // 0 - 100 (NCISM / Target Career requirement)
  skillGap: number; // benchmark - currentProficiency (clamped >= 0)
  progress: number; // 0 - 100
  verificationStatus: VerificationStatus;
  lastAssessedDate: string;
  verifiedBy?: string;
  evidenceCount?: number;
  clinicalImpactNotes?: string;
}

export interface SkillGapDetail {
  skillId: string;
  skillName: string;
  category: SkillCategory;
  currentScore: number;
  targetBenchmark: number;
  deficit: number;
  severity: "CRITICAL" | "MODERATE" | "DEVELOPING";
  recommendedAction: string;
  learningModuleId?: string;
}

export interface DecisionSupportOverview {
  overallReadiness: number; // 0 - 100
  readinessLabel: string;
  readinessExplanation: string;
  topStrengths: SkillDnaItem[];
  topSkillGaps: SkillGapDetail[];
  nextBestAction: {
    title: string;
    description: string;
    actionLabel: string;
    actionUrl: string;
    estimatedMinutes: number;
    impactScore: string;
  };
  careerGoal: {
    title: string;
    sanskrit: string;
    alignmentPercentage: number;
    targetRole: string;
  };
  recommendedOpportunity: {
    id: string;
    title: string;
    organization: string;
    location: string;
    stipend: string;
    matchScore: number;
    whyRelevant: string;
    actionUrl: string;
  };
}

export interface AssessmentIntegrityEvent {
  id: string;
  assessmentId: string;
  userId?: string;
  warningNumber: number; // 1, 2, 3, 4
  detectedDirection: "FACE_CENTERED" | "LEFT" | "RIGHT" | "UP" | "DOWN" | "FACE_NOT_VISIBLE" | "CAMERA_DISABLED";
  timestamp: string;
  eventType: "HEAD_DEVIATION" | "FACE_LOST" | "FREEZE";
}

export interface AssessmentRecord {
  id: string;
  type: "SKILL" | "CLINICAL" | "RESEARCH" | "PANCHAKARMA" | "PHARMA";
  title: string;
  completedAt: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  topicBreakdown: Record<string, number>;
  strengths: string[];
  weakAreas: string[];
  verificationGranted: boolean;
  status?: "NORMAL" | "SUBMITTED_AFTER_INTEGRITY_FREEZE" | "SUBMITTED_TIME_EXPIRED";
  integrityWarningsCount?: number;
  timeUsedSeconds?: number;
  integrityEvents?: AssessmentIntegrityEvent[];
}

const STORAGE_KEY_SKILL_DNA = "vaidya_setu_skill_dna_v2";
const STORAGE_KEY_ASSESSMENT_HISTORY = "vaidya_setu_assessment_history_v2";
const STORAGE_KEY_STUDY_TASKS = "vaidya_setu_study_tasks_v2";

// 🏛️ Baseline Authentic BAMS / Ayush Competency Taxonomy (Calibrated to NCISM CBDC)
export const BASELINE_SKILL_DNA: SkillDnaItem[] = [
  // 1. Ayurvedic Knowledge
  {
    id: "ayu-samhita",
    name: "Samhita & Siddhanta Principles",
    sanskritName: "संहिता एवं मौलिक सिद्धान्त",
    category: "Ayurvedic Knowledge",
    currentProficiency: 82,
    benchmark: 80,
    skillGap: 0,
    progress: 88,
    verificationStatus: "Assessment Verified",
    lastAssessedDate: "2026-09-02",
    verifiedBy: "AIIA Diagnostic Calibration",
    evidenceCount: 14,
    clinicalImpactNotes: "Strong grasp of Charaka Sutrasthana & Tridosha pathophysiology",
  },
  {
    id: "ayu-dravyaguna",
    name: "Dravyaguna Pharmacology & Rasa Panchaka",
    sanskritName: "द्रव्यगुण रसपञ्चक",
    category: "Ayurvedic Knowledge",
    currentProficiency: 64,
    benchmark: 85,
    skillGap: 21,
    progress: 60,
    verificationStatus: "Self Declared",
    lastAssessedDate: "2026-08-20",
    evidenceCount: 6,
    clinicalImpactNotes: "Need revision in Viruddha Ahara interactions & botanical markers",
  },
  {
    id: "ayu-rasashastra",
    name: "Rasashastra & Bhasma Standardization",
    sanskritName: "रसशास्त्र एवं भस्म निर्माण",
    category: "Ayurvedic Knowledge",
    currentProficiency: 58,
    benchmark: 75,
    skillGap: 17,
    progress: 52,
    verificationStatus: "Self Declared",
    lastAssessedDate: "2026-08-15",
    evidenceCount: 3,
    clinicalImpactNotes: "Puta temperature grading & safety verification pending",
  },
  {
    id: "ayu-kriya",
    name: "Kriya Sharira (Ayurvedic Physiology)",
    sanskritName: "क्रिया शारीर (दोष-धातु-मल)",
    category: "Ayurvedic Knowledge",
    currentProficiency: 78,
    benchmark: 80,
    skillGap: 2,
    progress: 80,
    verificationStatus: "Assessment Verified",
    lastAssessedDate: "2026-09-01",
    verifiedBy: "NCISM Benchmark Challenge",
    evidenceCount: 9,
  },

  // 2. Clinical Competency
  {
    id: "clin-nadi",
    name: "Nadi Pariksha & Pulse Diagnostics",
    sanskritName: "नाडी परीक्षा",
    category: "Clinical Competency",
    currentProficiency: 76,
    benchmark: 85,
    skillGap: 9,
    progress: 74,
    verificationStatus: "Assessment Verified",
    lastAssessedDate: "2026-09-04",
    verifiedBy: "AIIA Faculty Attestation",
    evidenceCount: 32,
    clinicalImpactNotes: "Gati interpretation validated across Vata-Pitta clinical presentations",
  },
  {
    id: "clin-panchakarma",
    name: "Panchakarma Protocol & Shodhana Safety",
    sanskritName: "पञ्चकर्म विधि एवं शोधन सुरक्षा",
    category: "Clinical Competency",
    currentProficiency: 70,
    benchmark: 85,
    skillGap: 15,
    progress: 68,
    verificationStatus: "Institution Verified",
    lastAssessedDate: "2026-08-28",
    verifiedBy: "Dean of Clinical Studies, AIIA",
    evidenceCount: 24,
    clinicalImpactNotes: "Virechana Vega assessment verified in IPD wards",
  },
  {
    id: "clin-diagnosis",
    name: "Clinical Case Analysis & Samprapti Ghataka",
    sanskritName: "रोग निदान एवं सम्प्राप्ति विघटन",
    category: "Clinical Competency",
    currentProficiency: 74,
    benchmark: 80,
    skillGap: 6,
    progress: 75,
    verificationStatus: "Assessment Verified",
    lastAssessedDate: "2026-09-03",
    evidenceCount: 18,
  },
  {
    id: "clin-comm",
    name: "Patient Rogi Sambhashana & Counseling",
    sanskritName: "रोगी सम्भाषण एवं सात्विक परामर्श",
    category: "Clinical Competency",
    currentProficiency: 85,
    benchmark: 80,
    skillGap: 0,
    progress: 90,
    verificationStatus: "Institution Verified",
    lastAssessedDate: "2026-08-10",
    verifiedBy: "OPD Senior Medical Officer",
    evidenceCount: 40,
  },

  // 3. Research Skills
  {
    id: "res-gcp",
    name: "GCP-Ayush Clinical Trial Methodology",
    sanskritName: "अनुसन्धान विधि एवं जीसीपी मानक",
    category: "Research Skills",
    currentProficiency: 52,
    benchmark: 75,
    skillGap: 23,
    progress: 45,
    verificationStatus: "Self Declared",
    lastAssessedDate: "2026-08-18",
    evidenceCount: 2,
    clinicalImpactNotes: "Requires CCRAS trial ethics protocol and sample sizing mastery",
  },
  {
    id: "res-evidence",
    name: "Evidence-Based Ayurvedic Literature Review",
    sanskritName: "प्रमाण आधारित साक्ष्य विश्लेषण",
    category: "Research Skills",
    currentProficiency: 65,
    benchmark: 75,
    skillGap: 10,
    progress: 62,
    verificationStatus: "Assessment Verified",
    lastAssessedDate: "2026-08-25",
    evidenceCount: 8,
  },

  // 4. Digital & Modern Healthcare Skills
  {
    id: "dig-ehr",
    name: "Ayush Hospital EHR & NAMASTE Coding",
    sanskritName: "नमस्ते पोर्टल एवं स्वास्थ्य ईएचआर",
    category: "Digital & Modern Healthcare Skills",
    currentProficiency: 60,
    benchmark: 80,
    skillGap: 20,
    progress: 55,
    verificationStatus: "Self Declared",
    lastAssessedDate: "2026-08-14",
    evidenceCount: 4,
    clinicalImpactNotes: "ICD-11 TM2 module integration required for NABH compliance",
  },

  // 5. Professional Skills
  {
    id: "prof-ethics",
    name: "Medical Jurisprudence & Clinical Ethics",
    sanskritName: "वैद्यकीय आचार संहिता",
    category: "Professional Skills",
    currentProficiency: 84,
    benchmark: 80,
    skillGap: 0,
    progress: 86,
    verificationStatus: "Assessment Verified",
    lastAssessedDate: "2026-09-01",
    evidenceCount: 15,
  },
];

// Baseline Initial Assessment History
export const BASELINE_ASSESSMENT_HISTORY: AssessmentRecord[] = [
  {
    id: "att-2026-0904",
    type: "CLINICAL",
    title: "Inpatient Kayachikitsa Diagnostic Challenge",
    completedAt: "2026-09-04T14:30:00Z",
    score: 78,
    totalQuestions: 15,
    correctAnswers: 12,
    topicBreakdown: {
      "Nadi Diagnostics": 84,
      "Panchakarma Protocol": 72,
      "Clinical Vignettes": 80,
      "Patient Safety": 76,
    },
    strengths: ["Pulse Gati Interpretation", "Samsarjana Krama Dietetics"],
    weakAreas: ["Virechana Vegiki Evaluation", "HPTLC Assay Standardization"],
    verificationGranted: true,
  },
  {
    id: "att-2026-0825",
    type: "SKILL",
    title: "Comprehensive Samhita & Classical Diagnostics",
    completedAt: "2026-08-25T11:15:00Z",
    score: 82,
    totalQuestions: 20,
    correctAnswers: 16,
    topicBreakdown: {
      "Charaka Samhita": 85,
      "Dravyaguna": 68,
      "Kriya Sharira": 88,
      "Roga Nidana": 80,
    },
    strengths: ["Tridosha Siddhanta", "Agni Evaluation"],
    weakAreas: ["Rasa Panchaka Botanical Identification"],
    verificationGranted: true,
  },
  {
    id: "att-2026-0818",
    type: "RESEARCH",
    title: "GCP-Ayush & Trial Methodology Screening",
    completedAt: "2026-08-18T09:45:00Z",
    score: 54,
    totalQuestions: 12,
    correctAnswers: 6,
    topicBreakdown: {
      "Clinical Ethics": 80,
      "Sample Sizing": 40,
      "Trial Protocols": 50,
      "Biostatistics": 45,
    },
    strengths: ["Patient Informed Consent"],
    weakAreas: ["Double-Blind Protocol Design", "CCRAS Regulatory Dossier"],
    verificationGranted: false,
  },
];

// --- Persistent State Accessors ---

export function loadSkillDna(): SkillDnaItem[] {
  if (typeof window === "undefined") return BASELINE_SKILL_DNA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SKILL_DNA);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_SKILL_DNA, JSON.stringify(BASELINE_SKILL_DNA));
      return BASELINE_SKILL_DNA;
    }
    return JSON.parse(raw);
  } catch {
    return BASELINE_SKILL_DNA;
  }
}

export function saveSkillDna(skills: SkillDnaItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_SKILL_DNA, JSON.stringify(skills));
  } catch {}
}

export function loadAssessmentHistory(): AssessmentRecord[] {
  if (typeof window === "undefined") return BASELINE_ASSESSMENT_HISTORY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ASSESSMENT_HISTORY);
    if (!raw) {
      localStorage.setItem(
        STORAGE_KEY_ASSESSMENT_HISTORY,
        JSON.stringify(BASELINE_ASSESSMENT_HISTORY)
      );
      return BASELINE_ASSESSMENT_HISTORY;
    }
    return JSON.parse(raw);
  } catch {
    return BASELINE_ASSESSMENT_HISTORY;
  }
}

export function saveAssessmentRecord(record: AssessmentRecord): void {
  if (typeof window === "undefined") return;
  try {
    const history = loadAssessmentHistory();
    const updated = [record, ...history];
    localStorage.setItem(STORAGE_KEY_ASSESSMENT_HISTORY, JSON.stringify(updated));
  } catch {}
}

// Closed-Loop: Update Skill DNA based on fresh assessment results
export function updateSkillDnaFromAssessment(record: AssessmentRecord): SkillDnaItem[] {
  const currentSkills = loadSkillDna();
  const dateStr = new Date().toISOString().split("T")[0];

  const updatedSkills = currentSkills.map((skill) => {
    // Check if this skill was tested in topicBreakdown
    let testedScore: number | null = null;
    for (const [topic, score] of Object.entries(record.topicBreakdown)) {
      if (
        skill.name.toLowerCase().includes(topic.toLowerCase()) ||
        topic.toLowerCase().includes(skill.name.toLowerCase()) ||
        (skill.category === "Clinical Competency" && (record.type === "CLINICAL" || record.type === "PANCHAKARMA")) ||
        (skill.category === "Research Skills" && record.type === "RESEARCH") ||
        (skill.category === "Ayurvedic Knowledge" && (record.type === "SKILL" || record.type === "PHARMA"))
      ) {
        testedScore = score;
        break;
      }
    }

    if (testedScore !== null) {
      // Weighted calibration: 60% new score, 40% previous score
      const calibratedProficiency = Math.round(
        skill.currentProficiency * 0.4 + testedScore * 0.6
      );
      const newGap = Math.max(0, skill.benchmark - calibratedProficiency);
      const isVerified = calibratedProficiency >= 70;

      return {
        ...skill,
        currentProficiency: calibratedProficiency,
        skillGap: newGap,
        progress: Math.min(100, Math.round((calibratedProficiency / skill.benchmark) * 100)),
        verificationStatus: (isVerified
          ? "Assessment Verified"
          : skill.verificationStatus === "Self Declared"
          ? "Self Declared"
          : skill.verificationStatus) as VerificationStatus,
        lastAssessedDate: dateStr,
        verifiedBy: isVerified ? "AIIA / NCISM Diagnostic Engine" : skill.verifiedBy,
        evidenceCount: (skill.evidenceCount || 0) + 1,
      };
    }
    return skill;
  });

  saveSkillDna(updatedSkills);
  return updatedSkills;
}

// Decision Support Calculations
export function getDecisionSupportOverview(careerGoalParam?: string): DecisionSupportOverview {
  const skills = loadSkillDna();
  const goalTitle = careerGoalParam || "Clinical Practice (Kayachikitsa)";

  // 1. Overall Readiness Calculation
  const totalProficiency = skills.reduce((sum, s) => sum + s.currentProficiency, 0);
  const totalBenchmark = skills.reduce((sum, s) => sum + s.benchmark, 0);
  const overallReadiness = Math.min(
    100,
    Math.round((totalProficiency / totalBenchmark) * 100)
  );

  // 2. Strengths (verified & proficiency >= benchmark)
  const topStrengths = [...skills]
    .filter((s) => s.currentProficiency >= 75)
    .sort((a, b) => b.currentProficiency - a.currentProficiency)
    .slice(0, 3);

  // 3. Top 3 Skill Gaps (ordered by deficit)
  const topSkillGaps: SkillGapDetail[] = [...skills]
    .filter((s) => s.skillGap > 0)
    .sort((a, b) => b.skillGap - a.skillGap)
    .slice(0, 3)
    .map((s) => {
      const severity: "CRITICAL" | "MODERATE" | "DEVELOPING" =
        s.skillGap >= 20 ? "CRITICAL" : s.skillGap >= 10 ? "MODERATE" : "DEVELOPING";

      let action = `Complete targeted micro-learning in ${s.name}`;
      if (s.id.includes("gcp")) {
        action = "Complete GCP-Ayush Trial Protocol Simulation (35 mins)";
      } else if (s.id.includes("dravyaguna")) {
        action = "Review NCISM Dravyaguna Botanical Marker Modules";
      } else if (s.id.includes("panchakarma")) {
        action = "Submit attested Shodhana safety logbook case";
      } else if (s.id.includes("ehr")) {
        action = "Practice ICD-11 TM2 coding vignettes";
      }

      return {
        skillId: s.id,
        skillName: s.name,
        category: s.category,
        currentScore: s.currentProficiency,
        targetBenchmark: s.benchmark,
        deficit: s.skillGap,
        severity,
        recommendedAction: action,
        learningModuleId: s.id,
      };
    });

  // 4. Next Best Action (Decision Support)
  let nextBestAction = {
    title: "Complete Clinical Case Assessment",
    description:
      "Your diagnostic reasoning score is 74%. Taking the 15-minute Inpatient Case Vignette will calibrate your pulse assessment and elevate your readiness past the 80% AIIA residency threshold.",
    actionLabel: "Start Clinical Assessment",
    actionUrl: "/assess?type=clinical",
    estimatedMinutes: 15,
    impactScore: "+8 Readiness Pts",
  };

  if (topSkillGaps.length > 0 && topSkillGaps[0].severity === "CRITICAL") {
    const criticalGap = topSkillGaps[0];
    nextBestAction = {
      title: `Remediate Critical Gap: ${criticalGap.skillName}`,
      description: `Deficit of ${criticalGap.deficit} points detected against national NCISM benchmarks. Completing the recommended learning module will resolve this priority blocker.`,
      actionLabel: "Start Study Module",
      actionUrl: `/learning?tab=recommended&focus=${criticalGap.skillId}`,
      estimatedMinutes: 25,
      impactScore: `+${criticalGap.deficit} Pts Target`,
    };
  }

  // 5. Readiness Explanation
  let explanation =
    "Your profile demonstrates strong foundational clinical acumen. Closing your highest-deficit research & formulation gaps will qualify you for apex institutional fellowships.";
  if (overallReadiness >= 85) {
    explanation =
      "Exceptional competency mastery across clinical diagnostics and classical samhita. Ready for fast-track interview exemptions with verified industry partners.";
  } else if (overallReadiness < 70) {
    explanation =
      "Developing stage. Focus on resolving the top 3 critical skill deficits below before applying for NABH clinical fellowships.";
  }

  return {
    overallReadiness,
    readinessLabel:
      overallReadiness >= 85
        ? "High Placement Readiness"
        : overallReadiness >= 70
        ? "Moderate Clinical Readiness"
        : "Developing Scholar Readiness",
    readinessExplanation: explanation,
    topStrengths,
    topSkillGaps,
    nextBestAction,
    careerGoal: {
      title: goalTitle,
      sanskrit: "चिकित्सक (Chikitsaka)",
      alignmentPercentage: Math.min(100, overallReadiness + 6),
      targetRole: "Post-Graduate Clinical Fellow & Resident Vaidya",
    },
    recommendedOpportunity: {
      id: "opp-aiia-kaya",
      title: "Post-Graduate Fellow in Advanced Kayachikitsa",
      organization: "All India Institute of Ayurveda (AIIA)",
      location: "New Delhi (On-Campus IPD)",
      stipend: "₹65,000 / month Stipend",
      matchScore: 92,
      whyRelevant:
        "Directly matches your Clinical Practice track. 2 prerequisite skills (Nadi Pariksha, Samhita) are verified; closing your Dravyaguna gap will fulfill all admission criteria.",
      actionUrl: "/opportunities",
    },
  };
}

// 6. Resume Extracted Skills (STRICT: Marked ONLY as 'Self Declared')
export function addSelfDeclaredSkillsFromResume(extractedSkillNames: string[]): SkillDnaItem[] {
  const currentSkills = loadSkillDna();
  const dateStr = new Date().toISOString().split("T")[0];

  const updatedSkills = [...currentSkills];

  extractedSkillNames.forEach((name) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    // Check if skill already exists
    const existing = updatedSkills.find(
      (s) => s.name.toLowerCase() === trimmed.toLowerCase()
    );

    if (!existing) {
      // Add as purely Self Declared skill
      updatedSkills.push({
        id: `skill-resume-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: trimmed,
        category: "Professional Skills",
        currentProficiency: 60,
        benchmark: 80,
        skillGap: 20,
        progress: 75,
        verificationStatus: "Self Declared", // STRICT: Never falsely elevated
        lastAssessedDate: dateStr,
        evidenceCount: 0, // No assessment evidence yet
        clinicalImpactNotes: "Extracted from student resume/profile. Pending formal diagnostic assessment.",
      });
    }
  });

  saveSkillDna(updatedSkills);
  return updatedSkills;
}

// 7. Academician / Faculty Attestation (Closed-Loop: Institution Verified)
export function attestSkillByFaculty(
  skillIdentifier: string,
  facultyName: string,
  notes?: string
): SkillDnaItem[] {
  const currentSkills = loadSkillDna();
  const dateStr = new Date().toISOString().split("T")[0];

  const updatedSkills = currentSkills.map((skill) => {
    if (
      skill.id.toLowerCase() === skillIdentifier.toLowerCase() ||
      skill.name.toLowerCase().includes(skillIdentifier.toLowerCase()) ||
      skillIdentifier.toLowerCase().includes(skill.name.toLowerCase())
    ) {
      return {
        ...skill,
        verificationStatus: "Institution Verified" as VerificationStatus,
        verifiedBy: facultyName,
        lastAssessedDate: dateStr,
        clinicalImpactNotes: notes || `Institutionally verified & attested by ${facultyName}`,
        evidenceCount: (skill.evidenceCount || 0) + 1,
      };
    }
    return skill;
  });

  saveSkillDna(updatedSkills);
  return updatedSkills;
}
