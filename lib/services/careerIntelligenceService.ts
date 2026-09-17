/**
 * Skillora / Vaidya Setu - Career Intelligence Service
 * Ministry of Ayush | All India Institute of Ayurveda (AIIA)
 *
 * Core Architecture for:
 * 1. Dynamic Career Goals & Custom Role Creation
 * 2. Career Paths with Required/Preferred Skills & Gaps
 * 3. Explainable Career Recommendations (Deterministic 'Why' & Gaps)
 * 4. AI Mock Interview Engine & Question Bank
 * 5. Consolidated 5-Pillar Placement Readiness Engine
 */

import { loadSkillDna, SkillDnaItem } from "./skillIntelligenceService";

export interface CareerRoleItem {
  id: string;
  title: string;
  sanskritDomain?: string;
  category: "Clinical" | "Research" | "Data & Tech" | "Entrepreneurship" | "Industry" | "Academia";
  description: string;
  averageStartingCtcInr: number;
  projectedGrowth: string;
  requiredSkills: {
    skillName: string;
    minimumProficiency: number; // 0-100
  }[];
  preferredSkills: string[];
  recommendedLearningModules: {
    title: string;
    type: "Course" | "Clinical Lab" | "Masterclass";
    duration: string;
  }[];
  sampleRoles: string[];
  keyEmployers: string[];
  isCustom?: boolean;
}

export interface CareerPathMatch {
  career: CareerRoleItem;
  overallMatchScore: number; // 0-100
  matchedSkills: {
    skillName: string;
    studentProficiency: number;
    requiredProficiency: number;
    status: "EXCEEDS" | "MEETS" | "NEAR" | "DEFICIENT";
  }[];
  missingSkills: {
    skillName: string;
    gap: number;
    priority: "HIGH" | "MEDIUM";
  }[];
  strengths: string[];
  primaryGap: string;
  recommendedNextAction: string;
}

export interface ExplainableCareerRecommendation {
  careerId: string;
  careerTitle: string;
  fitScore: number;
  whyReasons: string[];
  needsImprovement: string[];
  nextAction: string;
  relatedOpportunityCount: number;
}

export interface MockInterviewQuestion {
  id: string;
  careerGoalId: string;
  category: "CLINICAL_CASE" | "TECHNICAL_THEORY" | "GCP_ETHICS" | "COMMUNICATION";
  questionText: string;
  idealKeyPoints: string[];
  contextCase?: string;
  difficulty: "FOUNDATIONAL" | "INTERMEDIATE" | "ADVANCED";
}

export interface MockInterviewResult {
  sessionId: string;
  careerGoal: string;
  date: string;
  overallScore: number; // 0-100
  technicalScore: number; // 0-100
  communicationScore: number; // 0-100
  fillerWordCount: number;
  fillerWordsFound: { word: string; count: number }[];
  warningCount: number; // Max 4 warnings
  pacingWpm: number;
  feedbackSummary: string;
  strengths: string[];
  improvementAreas: string[];
  recommendedLearning: string;
}

export interface PlacementReadinessReport {
  overallPlacementScore: number; // 0-100
  placementTier: "JOB_READY" | "NEAR_READY" | "IN_TRAINING";
  pillars: {
    skillReadiness: { score: number; weight: number; status: string };
    careerFit: { score: number; weight: number; status: string };
    interviewReadiness: { score: number; weight: number; status: string };
    resumeReadiness: { score: number; weight: number; status: string };
    opportunityCompatibility: { score: number; weight: number; status: string };
  };
  top3Actions: {
    id: string;
    actionTitle: string;
    description: string;
    targetModuleUrl: string;
    potentialScoreIncrease: number;
    category: "SKILL" | "INTERVIEW" | "RESUME";
  }[];
}

// STORAGE KEYS
const CAREER_GOALS_STORAGE_KEY = "vaidya_setu_career_roles_v2";
const ACTIVE_GOAL_STORAGE_KEY = "vaidya_setu_active_career_goal_v2";
const INTERVIEW_RESULTS_STORAGE_KEY = "vaidya_setu_mock_interview_results_v2";
const RESUME_PROFILE_STORAGE_KEY = "vaidya_setu_resume_profile_v2";

// 1. DEFAULT AYUSH CAREER ROLES (Admin & System Extensible)
export const DEFAULT_CAREER_ROLES: CareerRoleItem[] = [
  {
    id: "role-ayurvedic-clinician",
    title: "Ayurvedic Clinician (Kayachikitsa)",
    sanskritDomain: "कायचिकित्सा विशेषज्ञ",
    category: "Clinical",
    description: "Lead comprehensive Ayurvedic OPD/IPD diagnostics, Ashtavidha Pariksha, and personalized treatment plans for lifestyle and chronic disorders.",
    averageStartingCtcInr: 960000,
    projectedGrowth: "+34% 5-Yr Growth",
    requiredSkills: [
      { skillName: "Nadi Pariksha & Ashtavidha Pariksha", minimumProficiency: 80 },
      { skillName: "Panchakarma Protocol Supervision", minimumProficiency: 75 },
      { skillName: "Clinical Documentation (SOAP Notes)", minimumProficiency: 80 },
    ],
    preferredSkills: ["Swasthavritta Consultation", "Marma Therapy"],
    recommendedLearningModules: [
      { title: "Advanced Nadi Pariksha Simulation & Clinical Cases", type: "Clinical Lab", duration: "3 Weeks" },
      { title: "NCISM Inpatient Case Sheet & SOAP Documentation", type: "Course", duration: "10 Days" },
    ],
    sampleRoles: ["Chief Vaidya", "Resident Panchakarma Physician", "Integrative Clinician"],
    keyEmployers: ["All India Institute of Ayurveda", "Kottakkal Arya Vaidya Sala", "Patanjali Yogpeeth"],
  },
  {
    id: "role-ayurvedic-researcher",
    title: "Ayurvedic Researcher (CCRAS / Institute)",
    sanskritDomain: "आयुर्वेद अनुसंधानकर्ता",
    category: "Research",
    description: "Design multi-centric clinical protocols, publish peer-reviewed papers on classical Ayurvedic formulations, and validate Samhita mechanisms.",
    averageStartingCtcInr: 1050000,
    projectedGrowth: "+42% 5-Yr Growth",
    requiredSkills: [
      { skillName: "GCP-Ayush Clinical Trials & Bioethics", minimumProficiency: 85 },
      { skillName: "Evidence-Based Classical Formulation", minimumProficiency: 80 },
      { skillName: "Biostatistics & Ayurvedic Informatics", minimumProficiency: 75 },
    ],
    preferredSkills: ["CTRI Trial Registration", "Systematic Review Writing"],
    recommendedLearningModules: [
      { title: "GCP-Ayush Investigator & Ethics Committee Certification", type: "Masterclass", duration: "4 Weeks" },
      { title: "Biostatistics & R-Programming for Ayush Trials", type: "Course", duration: "2 Weeks" },
    ],
    sampleRoles: ["Scientist-B (CCRAS)", "Research Officer (Ayush)", "Clinical Trial Coordinator"],
    keyEmployers: ["Central Council for Research in Ayurvedic Sciences", "AIIA Research Wing", "ICMR"],
  },
  {
    id: "role-clinical-research-associate",
    title: "Clinical Research Associate (CRA - Ayush)",
    sanskritDomain: "क्लिनिकल रिसर्च एसोसिएट",
    category: "Research",
    description: "Monitor multicenter clinical trials of Ayurvedic pharmaceuticals, verify GCP adherence, evaluate patient informed consent, and manage regulatory filings.",
    averageStartingCtcInr: 1120000,
    projectedGrowth: "+46% 5-Yr Growth",
    requiredSkills: [
      { skillName: "GCP-Ayush Clinical Trials & Bioethics", minimumProficiency: 85 },
      { skillName: "Clinical Documentation (SOAP Notes)", minimumProficiency: 80 },
      { skillName: "Biostatistics & Ayurvedic Informatics", minimumProficiency: 70 },
      { skillName: "AYUSH Regulatory Compliance & Pharmacovigilance", minimumProficiency: 80 },
    ],
    preferredSkills: ["Schedule Y / New Drugs Rules", "Trial Monitoring Audits"],
    recommendedLearningModules: [
      { title: "Clinical Research Data Analysis & Regulatory Dossier Masterclass", type: "Masterclass", duration: "4 Weeks" },
      { title: "Pharmacovigilance & Schedule E-1 Adverse Event Reporting", type: "Course", duration: "10 Days" },
    ],
    sampleRoles: ["Clinical Research Associate", "Site Monitor (Herbal Pharma)", "Trial Quality Auditor"],
    keyEmployers: ["Dabur Research Foundation", "Himalaya Wellness", "IQVIA Ayush Division"],
  },
  {
    id: "role-healthcare-data-analyst",
    title: "Healthcare Data Analyst (Ayush EHR / ABDM)",
    sanskritDomain: "आयुष स्वास्थ्य डेटा विश्लेषक",
    category: "Data & Tech",
    description: "Analyze large-scale Ayush Hospital Management Information Systems (A-HMIS), NAMASTE Portal codes, and epidemiological datasets.",
    averageStartingCtcInr: 1200000,
    projectedGrowth: "+55% 5-Yr Growth",
    requiredSkills: [
      { skillName: "Biostatistics & Ayurvedic Informatics", minimumProficiency: 85 },
      { skillName: "AYUSH EHR & ABDM Standards", minimumProficiency: 80 },
      { skillName: "Evidence-Based Classical Formulation", minimumProficiency: 70 },
    ],
    preferredSkills: ["SQL & Python", "NAMASTE Portal Standard Terminology", "Power BI / Tableau"],
    recommendedLearningModules: [
      { title: "Ayur-Informatics: ABDM & A-HMIS Integration", type: "Course", duration: "3 Weeks" },
      { title: "Health Data Science & Predictive Dosha Profiling", type: "Masterclass", duration: "4 Weeks" },
    ],
    sampleRoles: ["Ayush Informatics Specialist", "Health Systems Analyst", "EHR Clinical Data Manager"],
    keyEmployers: ["National Digital Health Mission", "Ayush Grid Hub", "Piramal Health"],
  },
  {
    id: "role-ayush-entrepreneur",
    title: "AYUSH Entrepreneur / Clinic Founder",
    sanskritDomain: "आयुष उद्यमी",
    category: "Entrepreneurship",
    description: "Establish evidence-based Panchakarma wellness centers, digital tele-consultation clinics, or proprietary Ayush herbal wellness startups.",
    averageStartingCtcInr: 1400000,
    projectedGrowth: "+50% 5-Yr Growth",
    requiredSkills: [
      { skillName: "Clinical Documentation (SOAP Notes)", minimumProficiency: 75 },
      { skillName: "AYUSH Regulatory Compliance & Pharmacovigilance", minimumProficiency: 85 },
      { skillName: "Evidence-Based Classical Formulation", minimumProficiency: 75 },
    ],
    preferredSkills: ["Ayush Startup Funding", "NABH Center Accreditation", "Tele-Ayurveda Operations"],
    recommendedLearningModules: [
      { title: "Ayush Startup Accelerator: Regulations, GMP & Licensing", type: "Masterclass", duration: "3 Weeks" },
      { title: "NABH Accreditation Essentials for Ayush Centers", type: "Course", duration: "10 Days" },
    ],
    sampleRoles: ["Wellness Center Director", "Ayurvedic Brand Founder", "Tele-Consultation Lead"],
    keyEmployers: ["Self-Employed / Venture-Backed", "Ayush Export Promotion Council"],
  },
  {
    id: "role-pharmacognosy-research",
    title: "Pharmacognosy / Drug Formulation Scientist",
    sanskritDomain: "द्रव्यगुण एवं रसशास्त्र वैज्ञानिक",
    category: "Industry",
    description: "Lead standardization of classical Bhasmas, Asavas, and Rasayanas using HPTLC, ICP-MS heavy metal analysis, and GMP stability validation.",
    averageStartingCtcInr: 1150000,
    projectedGrowth: "+41% 5-Yr Growth",
    requiredSkills: [
      { skillName: "Rasashastra & Bhasma Standardization", minimumProficiency: 85 },
      { skillName: "Evidence-Based Classical Formulation", minimumProficiency: 85 },
      { skillName: "Schedule E-1 & Toxicological Profiling", minimumProficiency: 80 },
    ],
    preferredSkills: ["HPTLC Marker Compounds", "Ayurvedic Pharmacopoeia of India (API) Protocols"],
    recommendedLearningModules: [
      { title: "HPTLC & Spectrophotometric Testing of Classical Polyherbals", type: "Clinical Lab", duration: "4 Weeks" },
      { title: "Schedule E-1 Heavy Metal Safety & Detoxification (Shodhana)", type: "Course", duration: "2 Weeks" },
    ],
    sampleRoles: ["Phytochemist", "QC Manager (Herbal Pharma)", "Regulatory Dossier Writer"],
    keyEmployers: ["Dabur India", "Charak Pharmaceuticals", "Baidyanath", "Zandu"],
  },
  {
    id: "role-academic-teaching",
    title: "Academic / Medical Faculty (NCISM)",
    sanskritDomain: "आयुर्वेद प्राध्यापक एवं व्याख्याता",
    category: "Academia",
    description: "Educate undergraduate BAMS and post-graduate scholars, author scholarly commentaries on Charaka and Sushruta Samhita, and mentor dissertations.",
    averageStartingCtcInr: 920000,
    projectedGrowth: "+28% 5-Yr Growth",
    requiredSkills: [
      { skillName: "Samhita Siddhanta Hermeneutics", minimumProficiency: 85 },
      { skillName: "Clinical Documentation (SOAP Notes)", minimumProficiency: 80 },
      { skillName: "Biostatistics & Ayurvedic Informatics", minimumProficiency: 70 },
    ],
    preferredSkills: ["Medical Education Technology", "Curriculum Design according to NCISM"],
    recommendedLearningModules: [
      { title: "Samhita Pedagogy & Competency-Based NCISM Curriculum", type: "Course", duration: "2 Weeks" },
      { title: "Dissertation Mentorship & Bioethics for PG Teachers", type: "Masterclass", duration: "2 Weeks" },
    ],
    sampleRoles: ["Assistant Professor", "Department HOD", "Clinical Preceptor"],
    keyEmployers: ["National Institute of Ayurveda (NIA)", "AIIA New Delhi", "State Ayush Universities"],
  },
  {
    id: "role-healthcare-industry-specialist",
    title: "Healthcare Industry Specialist (Ayush Products)",
    sanskritDomain: "आयुष उद्योग विशेषज्ञ",
    category: "Industry",
    description: "Manage domestic and international launch of Ayush-certified wellness formulations, manage supply chain sourcing, and collaborate with AYUSH ministry.",
    averageStartingCtcInr: 1080000,
    projectedGrowth: "+38% 5-Yr Growth",
    requiredSkills: [
      { skillName: "AYUSH Regulatory Compliance & Pharmacovigilance", minimumProficiency: 80 },
      { skillName: "Evidence-Based Classical Formulation", minimumProficiency: 75 },
      { skillName: "Clinical Documentation (SOAP Notes)", minimumProficiency: 70 },
    ],
    preferredSkills: ["Good Agricultural & Collection Practices (GACP)", "Export Logistics"],
    recommendedLearningModules: [
      { title: "Ayush Global Export Regulations & WHO-GMP Guidelines", type: "Course", duration: "3 Weeks" },
    ],
    sampleRoles: ["Product Manager (Ayush)", "Supply Chain Quality Auditor", "Brand Vaidya"],
    keyEmployers: ["Organic India", "Baidyanath", "Forest Essentials", "Emami Ayush"],
  },
];

// Helper to retrieve roles (combines defaults with any user/admin created roles)
export function getCareerRoles(): CareerRoleItem[] {
  if (typeof window === "undefined") return DEFAULT_CAREER_ROLES;
  try {
    const stored = localStorage.getItem(CAREER_GOALS_STORAGE_KEY);
    if (!stored) return DEFAULT_CAREER_ROLES;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CAREER_ROLES;
  } catch {
    return DEFAULT_CAREER_ROLES;
  }
}

// Add a custom career role (for students or administrators)
export function addCustomCareerRole(newRole: Omit<CareerRoleItem, "id" | "isCustom">): CareerRoleItem {
  const roles = getCareerRoles();
  const created: CareerRoleItem = {
    ...newRole,
    id: `role-custom-${Date.now()}`,
    isCustom: true,
  };
  const updated = [created, ...roles];
  if (typeof window !== "undefined") {
    localStorage.setItem(CAREER_GOALS_STORAGE_KEY, JSON.stringify(updated));
  }
  return created;
}

// Get and Set Active Career Goal
export function getActiveCareerGoal(): string {
  if (typeof window === "undefined") return "Ayurvedic Clinician (Kayachikitsa)";
  return localStorage.getItem(ACTIVE_GOAL_STORAGE_KEY) || "Ayurvedic Clinician (Kayachikitsa)";
}

export function setActiveCareerGoal(goalTitle: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(ACTIVE_GOAL_STORAGE_KEY, goalTitle);
  }
}

// 2. CAREER PATH CALCULATOR (Against Student's Skill DNA)
export function calculateCareerPathMatches(rolesParam?: CareerRoleItem[]): CareerPathMatch[] {
  const skills = loadSkillDna();
  const roles = rolesParam || getCareerRoles();

  return roles.map((career) => {
    let totalScoreSum = 0;
    const matchedSkills: CareerPathMatch["matchedSkills"] = [];
    const missingSkills: CareerPathMatch["missingSkills"] = [];
    const strengths: string[] = [];

    career.requiredSkills.forEach((req) => {
      // Find matching skill in student's Skill DNA
      const found = skills.find(
        (s) =>
          s.name.toLowerCase().includes(req.skillName.toLowerCase().split(" ")[0]) ||
          req.skillName.toLowerCase().includes(s.name.toLowerCase().split(" ")[0])
      );

      const proficiency = found ? found.currentProficiency : 50;
      const ratio = Math.min(1.2, proficiency / req.minimumProficiency);
      const score = Math.round(ratio * 100);
      totalScoreSum += score;

      let status: "EXCEEDS" | "MEETS" | "NEAR" | "DEFICIENT" = "DEFICIENT";
      if (proficiency >= req.minimumProficiency + 5) status = "EXCEEDS";
      else if (proficiency >= req.minimumProficiency) status = "MEETS";
      else if (proficiency >= req.minimumProficiency - 12) status = "NEAR";

      matchedSkills.push({
        skillName: req.skillName,
        studentProficiency: proficiency,
        requiredProficiency: req.minimumProficiency,
        status,
      });

      if (status === "EXCEEDS" || status === "MEETS") {
        strengths.push(`${req.skillName} (${proficiency}%)`);
      } else {
        const gap = Math.max(0, req.minimumProficiency - proficiency);
        missingSkills.push({
          skillName: req.skillName,
          gap,
          priority: gap > 15 ? "HIGH" : "MEDIUM",
        });
      }
    });

    const averageMatch = Math.min(
      98,
      Math.max(45, Math.round(totalScoreSum / Math.max(1, career.requiredSkills.length)))
    );

    // Primary gap & next action
    missingSkills.sort((a, b) => b.gap - a.gap);
    const topGap = missingSkills[0]?.skillName || "None - Target Readiness Achieved";
    const recommendedModule = career.recommendedLearningModules[0]?.title || "Clinical Mastery Series";

    return {
      career,
      overallMatchScore: averageMatch,
      matchedSkills,
      missingSkills,
      strengths: strengths.length > 0 ? strengths : ["Foundational Samhita Knowledge"],
      primaryGap: topGap,
      recommendedNextAction: `Complete ${recommendedModule}`,
    };
  });
}

// 3. EXPLAINABLE RECOMMENDATIONS GENERATOR
export function getExplainableRecommendations(): ExplainableCareerRecommendation[] {
  const matches = calculateCareerPathMatches();
  // Sort by overall match descending
  const sorted = [...matches].sort((a, b) => b.overallMatchScore - a.overallMatchScore);

  return sorted.slice(0, 4).map((m, idx) => {
    const career = m.career;
    const whyReasons: string[] = [];

    // Transparent 'Why' derivation
    if (m.strengths.length > 0) {
      whyReasons.push(`Strong proficiency in ${m.strengths.slice(0, 2).join(" & ")}.`);
    }
    if (m.overallMatchScore >= 80) {
      whyReasons.push("Verified clinical hours and assessment benchmarks satisfy institutional hiring criteria.");
    } else {
      whyReasons.push("Good foundation in classical Ayurvedic diagnosis with room for rapid calibration.");
    }
    whyReasons.push(`Aligned with ${career.category} domain demand in national Ayush healthcare.`);

    const needsImprovement: string[] = [];
    if (m.missingSkills.length > 0) {
      m.missingSkills.slice(0, 2).forEach((gap) => {
        needsImprovement.push(`${gap.skillName} (${gap.gap}% below target threshold)`);
      });
    } else {
      needsImprovement.push("Advanced supervisory practice and hospital ward rotations.");
    }

    return {
      careerId: career.id,
      careerTitle: career.title,
      fitScore: m.overallMatchScore,
      whyReasons,
      needsImprovement,
      nextAction: m.recommendedNextAction,
      relatedOpportunityCount: 4 + idx * 3,
    };
  });
}

// 4. AYUSH MOCK INTERVIEW ENGINE & QUESTION BANK
export const MOCK_INTERVIEW_QUESTIONS: MockInterviewQuestion[] = [
  {
    id: "q-kayachikitsa-1",
    careerGoalId: "role-ayurvedic-clinician",
    category: "CLINICAL_CASE",
    questionText: "A 48-year-old female presents with symmetric morning stiffness in bilateral knee and wrist joints, severe sluggish digestion (Mandagni), and white coated tongue. Differentiate between Amavata and Sandhigata Vata. What initial Shamana protocol would you initiate?",
    idealKeyPoints: [
      "Amavata: Ama + Vata pathogenesis, symmetric small/medium joints, Angamarda, Aruchi",
      "Sandhigata Vata: Dhatukshaya predominant, localized large weight-bearing joints, crepitus (Sandhisphutana)",
      "Initial protocol: Deepana-Pachana with Shunthi / Hingwashtak, strictly avoiding Sneha (contraindicated in Ama state)",
      "Formulations: Simhanada Guggulu, Rasnasaptaka Kwatha, Valuka Sweda",
    ],
    contextCase: "IPD Clinical Round Vignette (Kayachikitsa OPD)",
    difficulty: "INTERMEDIATE",
  },
  {
    id: "q-kayachikitsa-2",
    careerGoalId: "role-ayurvedic-clinician",
    category: "TECHNICAL_THEORY",
    questionText: "Explain the physiological indicators of Samyak Snigdha Lakshana during Snehapana. What critical emergency precautions must be exercised prior to Virechana Karma?",
    idealKeyPoints: [
      "Samyak Snigdha: Vatanulomana, Deeptagni, Snigdha/Asamhatatva of Pureesha, Gatra Mardavata",
      "Virechana precautions: Assessment of Koshtha (Krura vs Mridu), avoidance of Sheeta Ahara, BP and dehydration monitoring",
      "Emergency: Atiyoga signs (Guda Paka, exhaustion), management with Sheeta Upachara and Samsarjana Krama",
    ],
    difficulty: "ADVANCED",
  },
  {
    id: "q-cra-1",
    careerGoalId: "role-clinical-research-associate",
    category: "GCP_ETHICS",
    questionText: "During a randomized controlled trial comparing an Ayurvedic proprietary polyherbal against standard of care, a patient develops elevated liver transaminases (ALT/AST > 3x ULN). Describe your immediate 24-hour reporting obligations under GCP-Ayush and Schedule Y guidelines.",
    idealKeyPoints: [
      "Immediate withholding of investigational product and unblinding if deemed essential for patient safety",
      "Reporting to Principal Investigator and Sponsor within 24 hours",
      "Formal Serious Adverse Event (SAE) dossier to Institutional Ethics Committee (IEC) and CTRI within statutory deadlines",
      "De-challenge / Re-challenge risk evaluation and causality assessment",
    ],
    difficulty: "ADVANCED",
  },
  {
    id: "q-pharmacognosy-1",
    careerGoalId: "role-pharmacognosy-research",
    category: "TECHNICAL_THEORY",
    questionText: "How do you validate the safety and absence of unreacted free heavy metals in classical Rasaushadhis like Swarna Bhasma or Tamra Bhasma using both classical Ayurvedic tests and modern instrumentation?",
    idealKeyPoints: [
      "Classical Bhasma Parikshas: Rekhapurnatwa, Varitaratwa, Apunarbhava, Niruttha",
      "Modern analytical methods: ICP-MS / AAS for heavy metal limits (Pb, Cd, As, Hg) as per API & WHO limits",
      "XRD (X-Ray Diffraction) for crystalline phase characterization and nanoparticle size confirmation",
    ],
    difficulty: "INTERMEDIATE",
  },
  {
    id: "q-communication-1",
    careerGoalId: "general",
    category: "COMMUNICATION",
    questionText: "How do you explain the complex concept of Dosha imbalance and dietary restrictions (Pathya-Apathya) to an anxious patient who is unfamiliar with Ayurvedic concepts and skeptical of non-allopathic medicine?",
    idealKeyPoints: [
      "Empathetic listening and acknowledging patient anxiety without clinical jargon",
      "Using simple analogies (e.g. bodily fire/metabolism Agni like a hearth fire requiring right fuel)",
      "Providing scientific rationale for dietary interactions without criticizing allopathy",
      "Establishing mutual collaborative goal setting for symptom reduction",
    ],
    difficulty: "FOUNDATIONAL",
  },
];

// Helper to evaluate speech answer
export function evaluateInterviewResponse(
  transcript: string,
  question: MockInterviewQuestion,
  warningCount: number
): {
  technicalScore: number;
  communicationScore: number;
  fillerWordsFound: { word: string; count: number }[];
  totalFillers: number;
  feedback: string;
  matchedKeywords: string[];
} {
  const lower = transcript.toLowerCase();
  const fillerList = ["um", "uh", "like", "basically", "actually", "you know", "sort of", "kind of"];
  let totalFillers = 0;
  const fillerWordsFound: { word: string; count: number }[] = [];

  fillerList.forEach((f) => {
    const regex = new RegExp(`\\b${f}\\b`, "gi");
    const matches = lower.match(regex);
    const count = matches ? matches.length : 0;
    if (count > 0) {
      fillerWordsFound.push({ word: f, count });
      totalFillers += count;
    }
  });

  // Check matching key terms from ideal key points
  const matchedKeywords: string[] = [];
  question.idealKeyPoints.forEach((kp) => {
    const words = kp.toLowerCase().split(/[ ,]+/);
    const keyNouns = words.filter((w) => w.length > 5);
    const hit = keyNouns.some((kw) => lower.includes(kw));
    if (hit) matchedKeywords.push(kp.slice(0, 35) + "...");
  });

  // Technical Score calculation
  const keywordRatio = Math.min(1, matchedKeywords.length / Math.max(1, question.idealKeyPoints.length));
  const wordLengthBonus = Math.min(1, transcript.split(/\s+/).length / 60);
  const rawTech = Math.round(keywordRatio * 70 + wordLengthBonus * 30);
  const technicalScore = Math.max(40, Math.min(96, rawTech));

  // Communication Score calculation
  const fillerPenalty = Math.min(25, totalFillers * 3);
  const warningPenalty = warningCount * 5;
  const rawComm = Math.round(90 - fillerPenalty - warningPenalty + (wordLengthBonus > 0.5 ? 8 : 0));
  const communicationScore = Math.max(35, Math.min(95, rawComm));

  let feedback = "";
  if (technicalScore >= 80 && communicationScore >= 80) {
    feedback = "Exemplary articulation! You accurately cited clinical concepts and maintained professional structure with minimal hesitations.";
  } else if (technicalScore < 70) {
    feedback = "Good communicative flow, but deeper clinical grounding in Samhita sutras and regulatory criteria will elevate your response.";
  } else {
    feedback = "Solid technical knowledge. Work on reducing filler pauses and maintaining steady eye contact to boost communication authority.";
  }

  return {
    technicalScore,
    communicationScore,
    fillerWordsFound,
    totalFillers,
    feedback,
    matchedKeywords,
  };
}

// 5. RESUME & PROFILE STORAGE HELPERS
export interface ResumeProfileData {
  lastUpdated: string;
  fileName?: string;
  fullName: string;
  email: string;
  phone: string;
  education: {
    degree: string;
    institution: string;
    graduationYear: string;
    score: string;
  }[];
  extractedSkills: {
    skillName: string;
    category: string;
    verificationStatus: "Self Declared";
  }[];
  certifications: string[];
  projects: string[];
  internships: string[];
  achievements: string[];
  resumeReadinessScore: number;
}

export function getStoredResumeProfile(): ResumeProfileData {
  const defaultProfile: ResumeProfileData = {
    lastUpdated: "2026-09-15",
    fullName: "Aarav Sharma",
    email: "aarav.sharma@aiia.edu.in",
    phone: "+91 98765 43210",
    education: [
      {
        degree: "Bachelor of Ayurvedic Medicine & Surgery (BAMS)",
        institution: "All India Institute of Ayurveda, New Delhi",
        graduationYear: "2026",
        score: "Final Year (74.8% Aggregate)",
      },
    ],
    extractedSkills: [
      { skillName: "Clinical Documentation (SOAP)", category: "Clinical Competency", verificationStatus: "Self Declared" },
      { skillName: "Nadi Pariksha Assessment", category: "Clinical Competency", verificationStatus: "Self Declared" },
      { skillName: "Charaka Samhita Nidana Sthana", category: "Ayurvedic Knowledge", verificationStatus: "Self Declared" },
      { skillName: "GCP Clinical Trials (ICH-GCP)", category: "Research Skills", verificationStatus: "Self Declared" },
      { skillName: "Basic Biostatistics (SPSS / Excel)", category: "Digital & Modern Healthcare", verificationStatus: "Self Declared" },
    ],
    certifications: [
      "NCISM Basic Life Support (BLS) & Medical Emergencies",
      "CCRAS GCP-Ayush Clinical Investigator Workshop",
    ],
    projects: [
      "Comparative Clinical Audit of Kaishore Guggulu in Hyperuricemia (60 Inpatients)",
    ],
    internships: [
      "Inpatient Clinical Rotation, Kayachikitsa Ward, AIIA Hospital (450 Hours Logged)",
    ],
    achievements: [
      "1st Prize - National Ayush Research Conclave Case Presentation (2025)",
    ],
    resumeReadinessScore: 85,
  };

  if (typeof window === "undefined") return defaultProfile;
  try {
    const stored = localStorage.getItem(RESUME_PROFILE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

export function saveResumeProfile(profile: ResumeProfileData): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(RESUME_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  }
}

// 6. CONSOLIDATED 5-PILLAR PLACEMENT READINESS CALCULATOR
export function calculatePlacementReadiness(): PlacementReadinessReport {
  const skills = loadSkillDna();
  const activeGoal = getActiveCareerGoal();
  const resume = getStoredResumeProfile();

  // 1. Skill Readiness (from Skill DNA average)
  const totalProf = skills.reduce((acc, s) => acc + s.currentProficiency, 0);
  const totalBench = skills.reduce((acc, s) => acc + s.benchmark, 0);
  const skillReadinessScore = Math.min(100, Math.round((totalProf / Math.max(1, totalBench)) * 100));

  // 2. Career Fit Score (from active goal alignment)
  const matches = calculateCareerPathMatches();
  const currentMatch = matches.find((m) => m.career.title.toLowerCase().includes(activeGoal.toLowerCase().slice(0, 10)));
  const careerFitScore = currentMatch ? currentMatch.overallMatchScore : 82;

  // 3. Interview Readiness (from stored results or baseline diagnostic)
  let interviewScore = 80;
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(INTERVIEW_RESULTS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.overallScore) interviewScore = parsed.overallScore;
      }
    } catch {}
  }

  // 4. Resume Readiness Score
  const resumeScore = resume.resumeReadinessScore || 85;

  // 5. Opportunity Compatibility
  const oppCompatibilityScore = 88;

  // Weighted Composite
  // 30% Skill + 25% Career + 20% Interview + 15% Resume + 10% Opportunity
  const composite = Math.round(
    skillReadinessScore * 0.3 +
    careerFitScore * 0.25 +
    interviewScore * 0.2 +
    resumeScore * 0.15 +
    oppCompatibilityScore * 0.1
  );

  let placementTier: "JOB_READY" | "NEAR_READY" | "IN_TRAINING" = "NEAR_READY";
  if (composite >= 85) placementTier = "JOB_READY";
  else if (composite >= 70) placementTier = "NEAR_READY";
  else placementTier = "IN_TRAINING";

  const top3Actions: PlacementReadinessReport["top3Actions"] = [
    {
      id: "act-1",
      actionTitle: "Complete GCP-Ayush Trial Ethics Assessment",
      description: "Passing this diagnostic raises your Research category from Self Declared to Assessment Verified ✓.",
      targetModuleUrl: "/assess",
      potentialScoreIncrease: 4,
      category: "SKILL",
    },
    {
      id: "act-2",
      actionTitle: "Take Kayachikitsa AI Mock Interview",
      description: "Practice clinical differential diagnosis under live 4-warning focus monitoring to improve your interview score.",
      targetModuleUrl: "/career?tab=interview",
      potentialScoreIncrease: 5,
      category: "INTERVIEW",
    },
    {
      id: "act-3",
      actionTitle: "Attach Official Attestation to Inpatient Case Audit",
      description: "Upload your hospital preceptor signature to elevate Inpatient Project to Institution Verified status.",
      targetModuleUrl: "/portfolio",
      potentialScoreIncrease: 3,
      category: "RESUME",
    },
  ];

  return {
    overallPlacementScore: composite,
    placementTier,
    pillars: {
      skillReadiness: { score: skillReadinessScore, weight: 30, status: skillReadinessScore >= 75 ? "Strong" : "Developing" },
      careerFit: { score: careerFitScore, weight: 25, status: careerFitScore >= 80 ? "Optimal" : "Targeted" },
      interviewReadiness: { score: interviewScore, weight: 20, status: interviewScore >= 75 ? "Proficient" : "Needs Practice" },
      resumeReadiness: { score: resumeScore, weight: 15, status: resumeScore >= 80 ? "ATS Optimized" : "Incomplete" },
      opportunityCompatibility: { score: oppCompatibilityScore, weight: 10, status: "High Demand" },
    },
    top3Actions,
  };
}
