/**
 * Vaidya Setu - Competency Passport & Digital Portfolio Service
 * Ministry of Ayush | All India Institute of Ayurveda (AIIA)
 *
 * Official PS: Digital Portfolio specifically includes:
 * 1. Verified Skills (e.g. Clinical Documentation, Case History, Panchakarma Safety, Research Project)
 * 2. Certifications
 * 3. Projects
 * 4. Internships
 * 5. Achievements
 */

export interface VerifiedSkillItem {
  id: string;
  name: string;
  sanskrit: string;
  category: "CLINICAL" | "PANCHAKARMA" | "RESEARCH" | "PHARMACOLOGY" | "ETHICS";
  proficiencyScore: number; // 0-100
  level: "FOUNDATIONAL" | "PRACTICING" | "ADVANCED" | "EXPERT";
  status: "VERIFIED";
  verifiedBy: string;
  supervisorTitle: string;
  institution: string;
  verifiedDate: string;
  clinicalHoursApplied: number;
  evidenceType: "EHR_SOAP_AUDIT" | "CLINICAL_VIVA" | "WARD_PROCEDURE_LOG" | "RESEARCH_MANUSCRIPT";
  evidenceDescription: string;
  digitalSignatureHash: string;
}

export interface PortfolioCertification {
  id: string;
  title: string;
  issuingAuthority: string;
  accreditationBody: "NCISM" | "AIIA" | "MINISTRY_OF_AYUSH" | "CCRAS" | "NABH_AYUSH";
  issueDate: string;
  expiryDate?: string;
  certificateNumber: string;
  credentialUrl: string;
  status: "VERIFIED" | "ACTIVE";
  skillsCredited: string[];
  digitalSealHash: string;
  grade?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: "CLINICAL_AUDIT" | "DRUG_STANDARDIZATION" | "EPIDEMIOLOGY" | "PUBLIC_HEALTH";
  role: string;
  organization: string;
  duration: string;
  completionDate: string;
  description: string;
  methodology: string;
  deliverableMetric: string;
  supervisorName: string;
  supervisorTitle: string;
  status: "VERIFIED";
  artifacts: {
    name: string;
    type: "PDF" | "DATASET" | "PUBLICATION";
    size: string;
  }[];
}

export interface PortfolioInternship {
  id: string;
  role: string;
  hospitalOrOrg: string;
  department: string;
  location: string;
  duration: string;
  period: string;
  verifiedClinicalHours: number;
  patientEncountersLogged: number;
  supervisorName: string;
  supervisorDesignation: string;
  evaluationRating: number; // out of 5.0
  supervisorRemarks: string;
  status: "COMPLETED" | "VERIFIED";
  competenciesPracticed: string[];
}

export interface PortfolioAchievement {
  id: string;
  title: string;
  awardingBody: string;
  category: "ACADEMIC_EXCELLENCE" | "RESEARCH_HONOR" | "CLINICAL_DISTINCTION";
  date: string;
  rankOrDistinction: string;
  description: string;
  citationUrl?: string;
  badgeLevel: "GOLD" | "SILVER" | "PRANA_EXCELLENCE";
}

export interface StudentPassportData {
  passportId: string;
  studentId: string;
  studentName: string;
  avatarUrl: string;
  enrollmentNumber: string;
  ncismRegistrationNumber: string;
  degree: string;
  specialization: string;
  currentYear: string;
  institution: string;
  affiliatedUniversity: string;
  issueDate: string;
  lastUpdated: string;
  status: "ACTIVE_VALIDATED";
  cryptographicHash: string;
  merkleRootHash: string;
  ledgerBlockNumber: number;
  qrVerificationUrl: string;
  
  // Aggregate Metrics
  totalVerifiedSkills: number;
  totalClinicalHours: number;
  readinessScore: number;
  
  // Core Highlighted Passport Skills (Prompt Exact Matches)
  corePassportSkills: {
    clinicalDocumentation: VerifiedSkillItem;
    caseHistory: VerifiedSkillItem;
    panchakarmaSafety: VerifiedSkillItem;
    researchProject: VerifiedSkillItem;
  };

  // Full Portfolio Tracks
  verifiedSkills: VerifiedSkillItem[];
  certifications: PortfolioCertification[];
  projects: PortfolioProject[];
  internships: PortfolioInternship[];
  achievements: PortfolioAchievement[];
}

// Default Authentic Mock Student Passport Data
export const INITIAL_PASSPORT_DATA: StudentPassportData = {
  passportId: "passport-student-aarav-01",
  studentId: "student-aarav-01",
  studentName: "Aarav Sharma",
  avatarUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=256",
  enrollmentNumber: "AIIA/BAMS/2023/042",
  ncismRegistrationNumber: "NCISM-AYU-2023-09418",
  degree: "BAMS (Bachelor of Ayurvedic Medicine & Surgery)",
  specialization: "Clinical Panchakarma & Dravyaguna",
  currentYear: "Final Year (4th Professional)",
  institution: "All India Institute of Ayurveda (AIIA), New Delhi",
  affiliatedUniversity: "Autonomous National Institute, Ministry of Ayush",
  issueDate: "2025-10-15",
  lastUpdated: "2026-09-08",
  status: "ACTIVE_VALIDATED",
  cryptographicHash: "0x7e8b92a4c519d08e1245ba77fc30a41d9c02e5b8",
  merkleRootHash: "0x9c41f021e7d38204b119a0026e5d8362b9f018e4",
  ledgerBlockNumber: 489214,
  qrVerificationUrl: "https://vaidyasetu.ayush.gov.in/verify/passport-student-aarav-01",
  totalVerifiedSkills: 7,
  totalClinicalHours: 450,
  readinessScore: 72,

  // The exact 4 core verified skills required:
  corePassportSkills: {
    clinicalDocumentation: {
      id: "skill-clin-doc",
      name: "Clinical Documentation",
      sanskrit: "Rogi Patrika Lekhana (रोगी पत्रिका लेखन)",
      category: "CLINICAL",
      proficiencyScore: 86,
      level: "ADVANCED",
      status: "VERIFIED",
      verifiedBy: "Prof. Dr. Meera Nambiar, MD (Ayu)",
      supervisorTitle: "Professor & Head, Kayachikitsa",
      institution: "All India Institute of Ayurveda",
      verifiedDate: "2026-08-18",
      clinicalHoursApplied: 120,
      evidenceType: "EHR_SOAP_AUDIT",
      evidenceDescription: "Completed 25 comprehensive inpatient SOAP case records adhering to NCISM clinical reporting standards.",
      digitalSignatureHash: "0x3a4b91...cd82",
    },
    caseHistory: {
      id: "skill-case-hist",
      name: "Case History",
      sanskrit: "Ashtavidha Rogi Pariksha (अष्टविध रोगी परीक्षा)",
      category: "CLINICAL",
      proficiencyScore: 88,
      level: "ADVANCED",
      status: "VERIFIED",
      verifiedBy: "Dr. Anand Kulkarni, Ph.D.",
      supervisorTitle: "Associate Professor, Roganidana",
      institution: "AIIA Hospital Ward 4",
      verifiedDate: "2026-07-24",
      clinicalHoursApplied: 140,
      evidenceType: "CLINICAL_VIVA",
      evidenceDescription: "Directly evaluated on comprehensive clinical history taking across 120 OPD/IPD patient encounters.",
      digitalSignatureHash: "0x5f812a...7719",
    },
    panchakarmaSafety: {
      id: "skill-pk-safety",
      name: "Panchakarma Safety",
      sanskrit: "Shodhana Vyapad Nivaran (शोधन व्यापद् निवारण)",
      category: "PANCHAKARMA",
      proficiencyScore: 92,
      level: "EXPERT",
      status: "VERIFIED",
      verifiedBy: "Dr. Rajesh Varma, MD (Panchakarma)",
      supervisorTitle: "Superintendent, Panchakarma Theatre Complex",
      institution: "All India Institute of Ayurveda",
      verifiedDate: "2026-08-30",
      clinicalHoursApplied: 110,
      evidenceType: "WARD_PROCEDURE_LOG",
      evidenceDescription: "Zero-complication protocol management during 50 supervised Snehana and Virechana clinical cycles.",
      digitalSignatureHash: "0x89ee14...99c0",
    },
    researchProject: {
      id: "skill-res-proj",
      name: "Research Project",
      sanskrit: "Anusandhana Karyakrama (अनुसन्धान कार्यक्रम)",
      category: "RESEARCH",
      proficiencyScore: 84,
      level: "PRACTICING",
      status: "VERIFIED",
      verifiedBy: "Dr. Sunita Pathak, Ph.D.",
      supervisorTitle: "Director of Clinical Research, CCRAS Collaboration",
      institution: "Central Council for Research in Ayurvedic Sciences",
      verifiedDate: "2026-06-15",
      clinicalHoursApplied: 80,
      evidenceType: "RESEARCH_MANUSCRIPT",
      evidenceDescription: "Co-authored clinical case series on integrative management of Amavata (Rheumatoid Arthritis) under GCP-Ayush guidelines.",
      digitalSignatureHash: "0x1177d3...ab54",
    },
  },

  // Full list of Verified Skills (including additional proficiencies)
  verifiedSkills: [
    {
      id: "skill-clin-doc",
      name: "Clinical Documentation",
      sanskrit: "Rogi Patrika Lekhana (रोगी पत्रिका लेखन)",
      category: "CLINICAL",
      proficiencyScore: 86,
      level: "ADVANCED",
      status: "VERIFIED",
      verifiedBy: "Prof. Dr. Meera Nambiar, MD (Ayu)",
      supervisorTitle: "Professor & Head, Kayachikitsa",
      institution: "All India Institute of Ayurveda",
      verifiedDate: "2026-08-18",
      clinicalHoursApplied: 120,
      evidenceType: "EHR_SOAP_AUDIT",
      evidenceDescription: "Completed 25 comprehensive inpatient SOAP case records adhering to NCISM clinical reporting standards.",
      digitalSignatureHash: "0x3a4b91...cd82",
    },
    {
      id: "skill-case-hist",
      name: "Case History",
      sanskrit: "Ashtavidha Rogi Pariksha (अष्टविध रोगी परीक्षा)",
      category: "CLINICAL",
      proficiencyScore: 88,
      level: "ADVANCED",
      status: "VERIFIED",
      verifiedBy: "Dr. Anand Kulkarni, Ph.D.",
      supervisorTitle: "Associate Professor, Roganidana",
      institution: "AIIA Hospital Ward 4",
      verifiedDate: "2026-07-24",
      clinicalHoursApplied: 140,
      evidenceType: "CLINICAL_VIVA",
      evidenceDescription: "Directly evaluated on comprehensive clinical history taking across 120 OPD/IPD patient encounters.",
      digitalSignatureHash: "0x5f812a...7719",
    },
    {
      id: "skill-pk-safety",
      name: "Panchakarma Safety",
      sanskrit: "Shodhana Vyapad Nivaran (शोधन व्यापद् निवारण)",
      category: "PANCHAKARMA",
      proficiencyScore: 92,
      level: "EXPERT",
      status: "VERIFIED",
      verifiedBy: "Dr. Rajesh Varma, MD (Panchakarma)",
      supervisorTitle: "Superintendent, Panchakarma Theatre Complex",
      institution: "All India Institute of Ayurveda",
      verifiedDate: "2026-08-30",
      clinicalHoursApplied: 110,
      evidenceType: "WARD_PROCEDURE_LOG",
      evidenceDescription: "Zero-complication protocol management during 50 supervised Snehana and Virechana clinical cycles.",
      digitalSignatureHash: "0x89ee14...99c0",
    },
    {
      id: "skill-res-proj",
      name: "Research Project",
      sanskrit: "Anusandhana Karyakrama (अनुसन्धान कार्यक्रम)",
      category: "RESEARCH",
      proficiencyScore: 84,
      level: "PRACTICING",
      status: "VERIFIED",
      verifiedBy: "Dr. Sunita Pathak, Ph.D.",
      supervisorTitle: "Director of Clinical Research, CCRAS Collaboration",
      institution: "Central Council for Research in Ayurvedic Sciences",
      verifiedDate: "2026-06-15",
      clinicalHoursApplied: 80,
      evidenceType: "RESEARCH_MANUSCRIPT",
      evidenceDescription: "Co-authored clinical case series on integrative management of Amavata (Rheumatoid Arthritis) under GCP-Ayush guidelines.",
      digitalSignatureHash: "0x1177d3...ab54",
    },
    {
      id: "skill-nadi",
      name: "Nadi Pariksha Assessment",
      sanskrit: "Nāḍī Vijñāna (नाडी विज्ञान)",
      category: "CLINICAL",
      proficiencyScore: 82,
      level: "PRACTICING",
      status: "VERIFIED",
      verifiedBy: "Prof. Dr. Anand Kulkarni",
      supervisorTitle: "Senior Faculty, Diagnostics",
      institution: "AIIA New Delhi",
      verifiedDate: "2026-08-20",
      clinicalHoursApplied: 95,
      evidenceType: "CLINICAL_VIVA",
      evidenceDescription: "Demonstrated accurate pulse discrimination across Vata, Pitta, and Kapha variations in 120 patients.",
      digitalSignatureHash: "0x44bc91...12ef",
    },
    {
      id: "skill-dravyaguna",
      name: "Dravyaguna Botanical Identification",
      sanskrit: "Dravya Vijñāna (द्रव्य विज्ञान)",
      category: "PHARMACOLOGY",
      proficiencyScore: 78,
      level: "PRACTICING",
      status: "VERIFIED",
      verifiedBy: "Dr. Kulkarni Dravyaguna",
      supervisorTitle: "Curator, AIIA Herbal Garden",
      institution: "All India Institute of Ayurveda",
      verifiedDate: "2026-05-14",
      clinicalHoursApplied: 60,
      evidenceType: "WARD_PROCEDURE_LOG",
      evidenceDescription: "Botanical taxonomy and organoleptic validation of 50 classical medicinal plants.",
      digitalSignatureHash: "0x78ab12...3341",
    },
    {
      id: "skill-swasthavritta",
      name: "Swasthavritta Lifestyle Consultation",
      sanskrit: "Dinacharya & Ritucharya (दिनचर्या एवं ऋतुचर्या)",
      category: "CLINICAL",
      proficiencyScore: 85,
      level: "ADVANCED",
      status: "VERIFIED",
      verifiedBy: "Dr. Meera Nambiar",
      supervisorTitle: "Preventive Care Unit",
      institution: "AIIA Community Outreach",
      verifiedDate: "2026-05-28",
      clinicalHoursApplied: 45,
      evidenceType: "EHR_SOAP_AUDIT",
      evidenceDescription: "Personalized dietetic and preventive regimen formulation for 40 community lifestyle patients.",
      digitalSignatureHash: "0x91df45...88ab",
    },
  ],

  // Verified Certifications
  certifications: [
    {
      id: "cert-ncism-clin-doc",
      title: "National Competency Certificate in Clinical AYUSH Documentation",
      issuingAuthority: "National Commission for Indian System of Medicine (NCISM)",
      accreditationBody: "NCISM",
      issueDate: "2026-08-19",
      certificateNumber: "NCISM-CD-2026-88914",
      credentialUrl: "https://ncismindia.org/credentials/NCISM-CD-2026-88914",
      status: "VERIFIED",
      skillsCredited: ["Clinical Documentation", "SOAP Note Structuring", "ICD-11 TM2 Coding"],
      digitalSealHash: "0xcd9921e4a3b10294",
      grade: "Grade A+ with Distinction",
    },
    {
      id: "cert-gcp-ayush",
      title: "Good Clinical Practice (GCP) for Ayush Clinical Trials",
      issuingAuthority: "Central Council for Research in Ayurvedic Sciences (CCRAS)",
      accreditationBody: "CCRAS",
      issueDate: "2026-06-18",
      expiryDate: "2029-06-18",
      certificateNumber: "CCRAS-GCP-2026-4402",
      credentialUrl: "https://ccras.nic.in/verify/CCRAS-GCP-2026-4402",
      status: "VERIFIED",
      skillsCredited: ["Bioethics", "Informed Consent Protocol", "Safety Reporting"],
      digitalSealHash: "0x77ee12a4b89c3321",
      grade: "Certified Clinical Investigator",
    },
    {
      id: "cert-pk-safety",
      title: "Clinical Panchakarma Procedure Safety & Adverse Event Prevention",
      issuingAuthority: "All India Institute of Ayurveda (AIIA)",
      accreditationBody: "AIIA",
      issueDate: "2026-08-31",
      certificateNumber: "AIIA-PKS-2026-1029",
      credentialUrl: "https://aiia.gov.in/verify/AIIA-PKS-2026-1029",
      status: "VERIFIED",
      skillsCredited: ["Snehana Protocols", "Emergency Snehavyapat Management", "Aseptic OT Protocol"],
      digitalSealHash: "0xba4182f091c78214",
      grade: "Protocol Certified",
    },
    {
      id: "cert-nabh-ayush",
      title: "NABH Hospital Accreditation Standards for Ayush Inpatient Facilities",
      issuingAuthority: "Quality Council of India / NABH Ayush",
      accreditationBody: "NABH_AYUSH",
      issueDate: "2026-04-12",
      certificateNumber: "NABH-AYU-2026-0518",
      credentialUrl: "https://nabh.co/verify/NABH-AYU-2026-0518",
      status: "VERIFIED",
      skillsCredited: ["Hospital Safety Standards", "Patient Rights", "Medicine Storage Compliance"],
      digitalSealHash: "0x89cd34ef12ab0055",
      grade: "Standard Certified",
    },
  ],

  // Verified Projects
  projects: [
    {
      id: "proj-soap-audit",
      title: "Digital SOAP Note Compliance & Standardization in AYUSH Inpatient Wards",
      category: "CLINICAL_AUDIT",
      role: "Lead Student Investigator",
      organization: "AIIA Kayachikitsa Department",
      duration: "3 Months (Jun 2026 - Aug 2026)",
      completionDate: "2026-08-25",
      description: "Structured and standardized 25 longitudinal inpatient EHR notes using classical Ashtavidha Pariksha mapped to modern medical record conventions.",
      methodology: "Prospective audit of 25 consecutive admissions; evaluated concordance between handwritten bed-head tickets and digital standardized EHR records.",
      deliverableMetric: "99.4% adherence to NCISM mandatory documentation fields; 0 adverse documentation discrepancies.",
      supervisorName: "Prof. Dr. Meera Nambiar",
      supervisorTitle: "Head of Kayachikitsa, AIIA",
      status: "VERIFIED",
      artifacts: [
        { name: "Final_Audit_Report_AIIA_SOAP.pdf", type: "PDF", size: "3.2 MB" },
        { name: "Patient_Deidentified_Cohort.csv", type: "DATASET", size: "420 KB" },
      ],
    },
    {
      id: "proj-amavata-series",
      title: "Observational Case Series: Integrative Virechana Protocol in Seropositive Amavata",
      category: "CLINICAL_AUDIT",
      role: "Co-Investigator & Clinical Log Keeper",
      organization: "CCRAS Joint Clinical Facility",
      duration: "4 Months (Mar 2026 - Jun 2026)",
      completionDate: "2026-06-20",
      description: "Documented symptomatic remission, VAS pain score changes, and inflammatory ESR/CRP reduction in 15 patients undergoing standardized Virechana Karma.",
      methodology: "Pre-and-post intervention cohort tracking with daily vitals, dosha assessments, and standardized laboratory blood draws.",
      deliverableMetric: "Achieved 42% mean reduction in morning stiffness duration with zero complications.",
      supervisorName: "Dr. Sunita Pathak",
      supervisorTitle: "Senior Research Fellow, CCRAS",
      status: "VERIFIED",
      artifacts: [
        { name: "Amavata_Case_Series_Manuscript.pdf", type: "PUBLICATION", size: "1.8 MB" },
      ],
    },
    {
      id: "proj-ashwagandha-extract",
      title: "Comparative HPTLC Profiling of Withanolides in Field-Collected Withania somnifera",
      category: "DRUG_STANDARDIZATION",
      role: "Research Trainee",
      organization: "Dravyaguna Phytochemistry Laboratory, AIIA",
      duration: "2 Months (Apr 2026 - May 2026)",
      completionDate: "2026-05-30",
      description: "Assayed withaferin A and withanolide D content across wild vs cultivated specimens using high-performance thin-layer chromatography.",
      methodology: "Standard Ayurvedic Pharmacopoeia of India (API) extraction protocol with validated solvent systems and Rf quantification.",
      deliverableMetric: "Cataloged 12 herbarium vouchers with standardized phytochemical fingerprints.",
      supervisorName: "Dr. Anand Kulkarni",
      supervisorTitle: "Associate Professor, Dravyaguna",
      status: "VERIFIED",
      artifacts: [
        { name: "HPTLC_Fingerprint_Plate_Archive.pdf", type: "PDF", size: "4.5 MB" },
      ],
    },
  ],

  // Verified Internships & Clinical Postings
  internships: [
    {
      id: "intern-aiia-kayachikitsa",
      role: "Junior Clinical Intern & Ward Attendant",
      hospitalOrOrg: "All India Institute of Ayurveda Hospital, New Delhi",
      department: "Department of Kayachikitsa & General Medicine",
      location: "Gautampuri, Sarita Vihar, New Delhi",
      duration: "4 Months",
      period: "May 2026 - Aug 2026",
      verifiedClinicalHours: 320,
      patientEncountersLogged: 168,
      supervisorName: "Prof. Dr. Meera Nambiar",
      supervisorDesignation: "HOD & Chief Medical Officer",
      evaluationRating: 4.9,
      supervisorRemarks: "Aarav has shown outstanding clinical acumen in diagnostic pulse examination and impeccable patient documentation. Highly recommended for advanced residency.",
      status: "COMPLETED",
      competenciesPracticed: [
        "Inpatient Bedside Rounds",
        "Classical Ashtavidha Pariksha",
        "EHR SOAP Clinical Documentation",
        "Dietary Charting (Pathyapathya)",
      ],
    },
    {
      id: "intern-ccras-fellowship",
      role: "Clinical Trial Monitoring Trainee",
      hospitalOrOrg: "Central Council for Research in Ayurvedic Sciences (CCRAS)",
      department: "Clinical Research & Pharmacovigilance Unit",
      location: "Janakpuri, New Delhi",
      duration: "2 Months",
      period: "Jun 2026 - Jul 2026",
      verifiedClinicalHours: 130,
      patientEncountersLogged: 52,
      supervisorName: "Dr. Sunita Pathak",
      supervisorDesignation: "Principal Investigator & Senior Research Officer",
      evaluationRating: 4.8,
      supervisorRemarks: "Demonstrated meticulous adherence to Ayush GCP ethics and flawless e-CRF validation for multi-centric clinical trial monitoring.",
      status: "COMPLETED",
      competenciesPracticed: [
        "GCP-Ayush Compliance",
        "Informed Consent Verification",
        "Adverse Event Grading (CTCAE)",
        "Regulatory Dossier Management",
      ],
    },
  ],

  // Verified Achievements & Distinctions
  achievements: [
    {
      id: "ach-olympiad-first",
      title: "1st Rank — All India National Ayush Clinical Case Vignette Olympiad 2026",
      awardingBody: "Ministry of Ayush & All India Institute of Ayurveda",
      category: "CLINICAL_DISTINCTION",
      date: "2026-07-10",
      rankOrDistinction: "Gold Medalist (1st of 4,200 Participants)",
      description: "Diagnosed complex multi-morbid Dosha-Dushya presentation within 18 minutes with 100% diagnostic concordance.",
      badgeLevel: "GOLD",
      citationUrl: "https://aiia.gov.in/awards/olympiad-2026-aarav-sharma",
    },
    {
      id: "ach-jaim-publication",
      title: "Published Original Integrative Case Study in Scopus-Indexed JAIM",
      awardingBody: "Journal of Ayurveda and Integrative Medicine (Elsevier / JAIM)",
      category: "RESEARCH_HONOR",
      date: "2026-06-25",
      rankOrDistinction: "Peer-Reviewed First Author",
      description: "Article Title: 'Resolution of Chronic Spondylosis through Panchakarma Greedhrasi Protocol: A 12-Month Follow-Up Study'.",
      badgeLevel: "PRANA_EXCELLENCE",
      citationUrl: "https://doi.org/10.1016/j.jaim.2026.100892",
    },
    {
      id: "ach-clinical-excellence",
      title: "Prana National Clinical Rigor Honor 2026",
      awardingBody: "National Commission for Indian System of Medicine (NCISM)",
      category: "ACADEMIC_EXCELLENCE",
      date: "2026-08-30",
      rankOrDistinction: "Institutional Scholar Distinction",
      description: "Awarded for logging over 450 verified clinical hours with zero safety infractions and exemplary faculty ratings.",
      badgeLevel: "PRANA_EXCELLENCE",
    },
    {
      id: "ach-panchakarma-silver",
      title: "Silver Seal for Panchakarma Procedure Precision",
      awardingBody: "Faculty of Panchakarma, AIIA",
      category: "CLINICAL_DISTINCTION",
      date: "2026-08-28",
      rankOrDistinction: "Top 5% Practical Score",
      description: "Executed comprehensive Snehana and Shirodhara protocols with 96% supervisor rubric evaluation.",
      badgeLevel: "SILVER",
    },
  ],
};

// Storage & Service Helper
const PASSPORT_STORAGE_KEY = "vaidya_setu_competency_passport";

export class PassportService {
  getPassportData(): StudentPassportData {
    if (typeof window === "undefined") {
      return INITIAL_PASSPORT_DATA;
    }

    try {
      const stored = localStorage.getItem(PASSPORT_STORAGE_KEY);
      if (!stored) {
        const mergedData = this.mergeWithLearningProgress(INITIAL_PASSPORT_DATA);
        localStorage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify(mergedData));
        return mergedData;
      }
      const parsed = JSON.parse(stored) as StudentPassportData;
      return this.mergeWithLearningProgress(parsed);
    } catch {
      return INITIAL_PASSPORT_DATA;
    }
  }

  private mergeWithLearningProgress(current: StudentPassportData): StudentPassportData {
    if (typeof window === "undefined") return current;

    try {
      const progressRaw = localStorage.getItem("vaidya_setu_learning_progress");
      if (!progressRaw) return current;

      const progressData = JSON.parse(progressRaw);
      const updated = { ...current };

      // If case-documentation module was completed, ensure Clinical Documentation is verified with active timestamp
      if (progressData["case-documentation"]?.competencyGranted) {
        updated.corePassportSkills.clinicalDocumentation.status = "VERIFIED";
        updated.corePassportSkills.clinicalDocumentation.verifiedDate =
          progressData["case-documentation"].completedAt || updated.corePassportSkills.clinicalDocumentation.verifiedDate;
      }

      // If panchakarma-safety module was completed
      if (progressData["panchakarma-safety"]?.competencyGranted) {
        updated.corePassportSkills.panchakarmaSafety.status = "VERIFIED";
        updated.corePassportSkills.panchakarmaSafety.verifiedDate =
          progressData["panchakarma-safety"].completedAt || updated.corePassportSkills.panchakarmaSafety.verifiedDate;
      }

      // If research-protocols module was completed
      if (progressData["research-protocols"]?.competencyGranted) {
        updated.corePassportSkills.researchProject.status = "VERIFIED";
        updated.corePassportSkills.researchProject.verifiedDate =
          progressData["research-protocols"].completedAt || updated.corePassportSkills.researchProject.verifiedDate;
      }

      return updated;
    } catch {
      return current;
    }
  }

  verifySignature(hash: string): {
    isValid: boolean;
    blockNumber: number;
    signer: string;
    timestamp: string;
  } {
    return {
      isValid: true,
      blockNumber: 489214,
      signer: "AIIA Root Attestation Node (Ed25519-AIIA-01)",
      timestamp: new Date().toISOString(),
    };
  }
}

export const passportService = new PassportService();
