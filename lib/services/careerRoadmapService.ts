/**
 * Vaidya Setu - Career Outcome & Roadmap Service
 * Ministry of Ayush | All India Institute of Ayurveda (AIIA)
 *
 * Core 7-Stage Trajectory:
 * Current Level
 *      ↓
 * Skill Gaps
 *      ↓
 * Recommended Skills
 *      ↓
 * Learning
 *      ↓
 * Practical Experience
 *      ↓
 * Verified Competency
 *      ↓
 * Career Opportunities
 *
 * Potential Outcomes:
 * Internship / Job / PG / Research / Entrepreneurship
 */

export interface RoadmapStageItem {
  id: number;
  stageKey:
    | "CURRENT_LEVEL"
    | "SKILL_GAPS"
    | "RECOMMENDED_SKILLS"
    | "LEARNING"
    | "PRACTICAL_EXPERIENCE"
    | "VERIFIED_COMPETENCY"
    | "CAREER_OPPORTUNITIES";
  title: string;
  sanskrit: string;
  status: "COMPLETED" | "ACTIVE" | "UNLOCKED";
  badgeText: string;
  summary: string;
  keyMetrics: string[];
  actionLabel: string;
  actionUrl: string;
}

export type OutcomePathwayCategory = "INTERNSHIP" | "JOB" | "PG" | "RESEARCH" | "ENTREPRENEURSHIP";

export interface CareerOutcomePathway {
  id: OutcomePathwayCategory;
  title: string;
  sanskritTitle: string;
  tagline: string;
  categoryLabel: string;
  compatibilityScore: number; // 0-100
  tier: "HIGH_ALIGNMENT" | "STRONG_FIT" | "VIABLE_PATH";
  topDestinations: string[];
  sampleRoles: string[];
  durationOrTimeline: string;
  startingCompensation: string;
  prerequisitesMet: string[];
  prerequisitesRemaining: string[];
  keyCompetenciesApplied: string[];
  ayushGovernmentSchemes?: string[];
  growthMilestones: {
    year: string;
    milestone: string;
  }[];
}

export interface StudentCareerRoadmapData {
  studentName: string;
  degree: string;
  currentYear: string;
  institution: string;
  overallReadinessScore: number;
  clinicalHoursLogged: number;
  careerDnaPrimary: string;
  stages: RoadmapStageItem[];
  pathways: CareerOutcomePathway[];
}

export const INITIAL_ROADMAP_STAGES: RoadmapStageItem[] = [
  {
    id: 1,
    stageKey: "CURRENT_LEVEL",
    title: "01. Current Level",
    sanskrit: "Prathamika Sthiti (प्राथमिक स्थिति)",
    status: "COMPLETED",
    badgeText: "Level 3 of 5",
    summary: "Final Year BAMS scholar at AIIA New Delhi. Strongest affinity in Clinical Practice (84%) and Research (71%).",
    keyMetrics: ["BAMS 4th Professional", "72% Readiness Score", "Clinical DNA: 84%"],
    actionLabel: "View Career DNA",
    actionUrl: "/student/career-dna",
  },
  {
    id: 2,
    stageKey: "SKILL_GAPS",
    title: "02. Skill Gaps",
    sanskrit: "Nipunata Nyunata (निपुणता न्यूनता)",
    status: "COMPLETED",
    badgeText: "3 Gaps Diagnosed",
    summary: "Identified diagnostic deficits in standardized clinical documentation, GCP research ethics, and acute Snehavyapat triage.",
    keyMetrics: ["Critical: Clinical Documentation", "Moderate: Research Protocols", "Procedure: Snehavyapat Safety"],
    actionLabel: "View Gap Report",
    actionUrl: "/student/skill-gap",
  },
  {
    id: 3,
    stageKey: "RECOMMENDED_SKILLS",
    title: "03. Recommended Skills",
    sanskrit: "Anushamsita Kaushalya (अनुशंसित कौशल्य)",
    status: "COMPLETED",
    badgeText: "NCISM Aligned",
    summary: "High-yield bridge proficiencies mapped to national curriculum standards and hospital NABH compliance.",
    keyMetrics: ["Standardized SOAP EHR", "GCP-Ayush Compliance", "Purvakarma Safety Protocols"],
    actionLabel: "Review Recommendations",
    actionUrl: "/student/career-dna?tab=skill-gap",
  },
  {
    id: 4,
    stageKey: "LEARNING",
    title: "04. Learning",
    sanskrit: "Nirantara Shikshana (निरन्तर शिक्षण)",
    status: "COMPLETED",
    badgeText: "3 Modules Finished",
    summary: "Closed-loop micro-learning pipeline completed: Shloka citations, clinical SOPs, and 3-question checkpoints (passed 3/3).",
    keyMetrics: ["Rugna Vrittanta SOP", "Anusandhana Vidhi", "Shodhana Suraksha"],
    actionLabel: "Explore Modules",
    actionUrl: "/student/learning",
  },
  {
    id: 5,
    stageKey: "PRACTICAL_EXPERIENCE",
    title: "05. Practical Experience",
    sanskrit: "Prayogika Abhyasa (प्रायोगिक अभ्यास)",
    status: "COMPLETED",
    badgeText: "450 Hours Logged",
    summary: "Hands-on inpatient ward rounds, 120 Rogi Pariksha records, and supervised Panchakarma cycles verified at AIIA Hospital.",
    keyMetrics: ["450 Verified Clinical Hours", "120 Patient Logbooks", "25 SOAP EHR Notes"],
    actionLabel: "View Inpatient Log",
    actionUrl: "/student/passport",
  },
  {
    id: 6,
    stageKey: "VERIFIED_COMPETENCY",
    title: "06. Verified Competency",
    sanskrit: "Pramanita Kaushalya (प्रमाणित कौशल्य)",
    status: "COMPLETED",
    badgeText: "7 Attested Skills",
    summary: "Cryptographically stamped credentials minted on the official Setu Competency Passport with supervisor signatures.",
    keyMetrics: ["Clinical Documentation ✓ Verified", "Case History ✓ Verified", "Panchakarma Safety ✓ Verified", "Research Project ✓ Verified"],
    actionLabel: "Inspect Digital Passport",
    actionUrl: "/student/passport",
  },
  {
    id: 7,
    stageKey: "CAREER_OPPORTUNITIES",
    title: "07. Career Opportunities",
    sanskrit: "Udyoga Avasara (उद्योग अवसर)",
    status: "ACTIVE",
    badgeText: "6 Smart Matches",
    summary: "AI-matched clinical residencies, CCRAS research fellowships, and hospital postings based on verified Skill DNA.",
    keyMetrics: ["AIIA Clinical Residency (89% Match)", "CCRAS Trial Fellow (92% Match)", "AVS Kottakkal (90% Match)"],
    actionLabel: "Explore Opportunities",
    actionUrl: "/student/opportunities",
  },
];

export const CAREER_OUTCOME_PATHWAYS: CareerOutcomePathway[] = [
  // 1. INTERNSHIP
  {
    id: "INTERNSHIP",
    title: "Clinical Hospital Residencies & Internships",
    sanskritTitle: "Chikitsalaya Seva & Roganidana (चिकित्सालय सेवा)",
    tagline: "Intensive inpatient bedside rotations in premier national institutes and hospital chains.",
    categoryLabel: "Clinical Residency",
    compatibilityScore: 91,
    tier: "HIGH_ALIGNMENT",
    topDestinations: [
      "All India Institute of Ayurveda (AIIA), New Delhi",
      "National Institute of Ayurveda (NIA), Jaipur",
      "Arya Vaidya Sala (AVS), Kottakkal",
      "Patanjali Yogpeeth Hospital, Haridwar",
    ],
    sampleRoles: ["Junior Clinical Resident", "Inpatient Ward Attendant", "Panchakarma Protocol Supervisor"],
    durationOrTimeline: "6 to 12 Months Posting",
    startingCompensation: "₹32,000 - ₹45,000 / month stipend",
    prerequisitesMet: [
      "450 Verified Clinical Hours",
      "Clinical Documentation ✓ Verified",
      "Case History (120 Patients) ✓ Verified",
      "Panchakarma Safety ✓ Verified",
    ],
    prerequisitesRemaining: ["Completion of final BAMS rotational viva"],
    keyCompetenciesApplied: ["Ashtavidha Pariksha", "EHR SOAP Documentation", "Shodhana Protocol Supervision"],
    ayushGovernmentSchemes: ["Ministry of Ayush National Clinical Residency Fellowship"],
    growthMilestones: [
      { year: "Year 1", milestone: "Complete 6-month AIIA metabolic residency with 100% case log compliance." },
      { year: "Year 2", milestone: "Transition to Senior Resident or specialized Panchakarma clinician." },
      { year: "Year 3", milestone: "Lead clinical ward rounds or hospital department sub-units." },
    ],
  },

  // 2. JOB
  {
    id: "JOB",
    title: "Full-Time Clinical & Healthcare Industry Placements",
    sanskritTitle: "Purna-kalika Seva (पूर्णकालिक सेवा)",
    tagline: "Direct recruitment as licensed Ayurvedic Medical Officers, Hospital Leads, and Pharma QA.",
    categoryLabel: "Full-Time Employment",
    compatibilityScore: 86,
    tier: "HIGH_ALIGNMENT",
    topDestinations: [
      "State AYUSH Medical Services (Government MO)",
      "Dabur Ayurvedic Healthcare Network",
      "Kairali Ayurvedic Group",
      "Apollo AyurVAID Hospitals",
    ],
    sampleRoles: ["Ayurvedic Medical Officer (AMO)", "Hospital Quality Assurance Officer", "Wellness Consultant"],
    durationOrTimeline: "Immediate post-internship & registration",
    startingCompensation: "₹6.0 - ₹8.5 Lakhs / annum (LPA)",
    prerequisitesMet: [
      "NCISM Student Registration #NCISM-AYU-2023-09418",
      "NABH Ayush Hospital Standards Knowledge",
      "Verified SOAP Documentation Accreditation",
    ],
    prerequisitesRemaining: ["State Medical Council Permanent Registration Number"],
    keyCompetenciesApplied: ["Primary OPD Consultation", "Hospital NABH Standards", "Customized Pathyapathya Formulation"],
    ayushGovernmentSchemes: ["National AYUSH Mission Medical Officer Cadre"],
    growthMilestones: [
      { year: "Year 1", milestone: "Join as Clinical Medical Officer managing 30+ daily OPD patient consultations." },
      { year: "Year 2", milestone: "Promote to Senior Medical Officer or Department Quality Coordinator." },
      { year: "Year 3", milestone: "Chief Medical Officer / Hospital Superintendent." },
    ],
  },

  // 3. POSTGRADUATE (PG)
  {
    id: "PG",
    title: "Postgraduate MD / MS Ayurveda via AIAPGET",
    sanskritTitle: "Snatakottara Shikshana (स्नातकोत्तर शिक्षण)",
    tagline: "Advanced clinical specialization in Kayachikitsa, Panchakarma, Dravyaguna, or Shalya Tantra.",
    categoryLabel: "Academic Specialization",
    compatibilityScore: 84,
    tier: "HIGH_ALIGNMENT",
    topDestinations: [
      "All India Institute of Ayurveda (AIIA), New Delhi",
      "Faculty of Ayurveda, Banaras Hindu University (BHU), Varanasi",
      "Institute of Teaching & Research in Ayurveda (ITRA), Jamnagar",
      "Government Ayurvedic College (GAC), Thiruvananthapuram",
    ],
    sampleRoles: ["MD Kayachikitsa Scholar", "MD Panchakarma Scholar", "MS Shalya Tantra Resident"],
    durationOrTimeline: "3 Years Regular Residency Program",
    startingCompensation: "₹65,000 - ₹95,000 / month Central PG Stipend",
    prerequisitesMet: [
      "BAMS Academic Foundation (Grade A)",
      "High Diagnostic Aptitude in Charaka Samhita",
      "Published JAIM Case Report (100% Concordance)",
    ],
    prerequisitesRemaining: ["AIAPGET National Rank < 150 (Exam Scheduled Jun 2027)"],
    keyCompetenciesApplied: ["Samhita Siddhanta", "Differential Roganidana", "Clinical Biostatistics"],
    ayushGovernmentSchemes: ["Central Government Non-Practicing Allowance & PG Stipend Scheme"],
    growthMilestones: [
      { year: "Year 1", milestone: "Clear AIAPGET in top percentile and secure MD Kayachikitsa seat at AIIA." },
      { year: "Year 2", milestone: "Conduct thesis clinical trial with biomarker tracking and submit dissertation." },
      { year: "Year 3", milestone: "Graduate as MD Ayurveda Specialist; qualify for Assistant Professor cadre." },
    ],
  },

  // 4. RESEARCH
  {
    id: "RESEARCH",
    title: "Clinical Research Fellowships & Regulatory Sciences",
    sanskritTitle: "Anusandhana & Vijnana (अनुसन्धान एवं विज्ञान)",
    tagline: "Evidence-based Ayush drug trials, pharmacovigilance, and integrative clinical research.",
    categoryLabel: "Research Fellowship",
    compatibilityScore: 88,
    tier: "HIGH_ALIGNMENT",
    topDestinations: [
      "Central Council for Research in Ayurvedic Sciences (CCRAS)",
      "CSIR - Traditional Knowledge Digital Library (TKDL)",
      "ICMR - Centre for Integrative Medicine & Research",
      "Dabur Research & Development Centre",
    ],
    sampleRoles: ["Junior Research Fellow (JRF)", "Clinical Trial Monitoring Associate", "Regulatory Medical Writer"],
    durationOrTimeline: "1 to 2 Years Fellowship leading to Ph.D.",
    startingCompensation: "₹42,000 / month + HRA Research Grant",
    prerequisitesMet: [
      "GCP-Ayush Compliance Certified",
      "Research Project ✓ Verified (Amavata Series)",
      "Scopus-indexed JAIM Original Publication",
    ],
    prerequisitesRemaining: ["AYUSH-NET / CSIR-UGC NET Junior Research Fellowship Clearance"],
    keyCompetenciesApplied: ["Protocol Design", "CTRI Trial Registration", "e-CRF Auditing & Bioethics"],
    ayushGovernmentSchemes: ["CCRAS Ayush Ph.D. Fellowship Scheme (AYUSH-PFS)"],
    growthMilestones: [
      { year: "Year 1", milestone: "Co-lead CCRAS multicentric trial as Junior Research Fellow." },
      { year: "Year 2", milestone: "Publish 2 high-impact original clinical trial papers in indexed journals." },
      { year: "Year 3", milestone: "Qualify for CCRAS Research Officer (Scientist-B) permanent gazetted cadre." },
    ],
  },

  // 5. ENTREPRENEURSHIP
  {
    id: "ENTREPRENEURSHIP",
    title: "Ayurvedic Clinics, Wellness Centers & Herbal Startups",
    sanskritTitle: "Udyamita & Chikitsa Sthapana (उद्यमिता एवं चिकित्सा)",
    tagline: "Build innovative clinical practices, Panchakarma wellness resorts, or standardized herbal D2C brands.",
    categoryLabel: "Ayush Startup & Clinic",
    compatibilityScore: 76,
    tier: "STRONG_FIT",
    topDestinations: [
      "AIIA Ayush Incubation & Innovation Centre (AIIC)",
      "National AYUSH Mission Startup Incubator",
      "Self-founded Integrative Panchakarma Clinic (Tier 1/2 Cities)",
    ],
    sampleRoles: ["Founder / Medical Director", "Clinical Entrepreneur", "Herbal Formulation Innovator"],
    durationOrTimeline: "Seed Incubation (6-12 Months to Launch)",
    startingCompensation: "Equity + ₹15-25 Lakhs Government Seed Grants",
    prerequisitesMet: [
      "Classical Purvakarma & Shodhana Mastery",
      "Standardized Botanical Formulation Knowledge",
      "Verified Competency Passport Credentials",
    ],
    prerequisitesRemaining: ["Ayush Drug Manufacturing License / NABH Ayush Clinic Accreditation"],
    keyCompetenciesApplied: ["Clinic Infrastructure Design", "Panchakarma Safety Protocols", "Patient Teleconsultation"],
    ayushGovernmentSchemes: ["Ayush Startup Challenge Grant (up to ₹1 Crore support)"],
    growthMilestones: [
      { year: "Year 1", milestone: "Incubate clinical model at AIIA Innovation Centre; launch pilot clinic." },
      { year: "Year 2", milestone: "Reach break-even with 150+ monthly Panchakarma patient packages." },
      { year: "Year 3", milestone: "Scale to multi-location integrative wellness center with proprietary herbal line." },
    ],
  },
];

export class CareerRoadmapService {
  getRoadmapData(): StudentCareerRoadmapData {
    let clinicalHours = 450;
    if (typeof window !== "undefined") {
      try {
        const passportRaw = localStorage.getItem("vaidya_setu_competency_passport");
        if (passportRaw) {
          const parsed = JSON.parse(passportRaw);
          if (parsed.totalClinicalHours) {
            clinicalHours = parsed.totalClinicalHours;
          }
        }
      } catch {
        clinicalHours = 450;
      }
    }

    // Update practical experience stage metrics with live clinical hours
    const stages = INITIAL_ROADMAP_STAGES.map((st) => {
      if (st.stageKey === "PRACTICAL_EXPERIENCE") {
        return {
          ...st,
          badgeText: `${clinicalHours} Hours Logged`,
          keyMetrics: [`${clinicalHours} Verified Clinical Hours`, "120 Patient Logbooks", "25 SOAP EHR Notes"],
        };
      }
      return st;
    });

    return {
      studentName: "Aarav Sharma",
      degree: "BAMS (Bachelor of Ayurvedic Medicine & Surgery)",
      currentYear: "Final Year (4th Professional)",
      institution: "All India Institute of Ayurveda (AIIA), New Delhi",
      overallReadinessScore: 72,
      clinicalHoursLogged: clinicalHours,
      careerDnaPrimary: "Clinical Practice (84%)",
      stages,
      pathways: CAREER_OUTCOME_PATHWAYS,
    };
  }
}

export const careerRoadmapService = new CareerRoadmapService();
