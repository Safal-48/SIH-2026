/**
 * Vaidya Setu - Industry Portal Service Layer
 * Ministry of Ayush | All India Institute of Ayurveda (AIIA)
 *
 * Provides enterprise management functions for Ayurveda industry partners:
 * 1. Postings Engine (Internship, Job, Research Project, Training)
 * 2. Candidate Discovery & 1-Click Shortlist (Linked to Competency Passports)
 * 3. Mentorship & Clinical Practicum Management
 * 4. Application Pipeline Management
 * 5. Recruitment & Skill Demand Analytics
 */

import { InternshipLifecycleService } from "./internshipLifecycleService";

export type IndustryOpportunityType = "INTERNSHIP" | "JOB" | "RESEARCH_PROJECT" | "TRAINING";

export interface IndustryListingItem {
  id: string;
  type: IndustryOpportunityType;
  title: string;
  organization: string;
  department: string;
  domain: "Clinical" | "Research" | "Panchakarma" | "Herbal Pharma" | "Hospital Admin";
  location: string;
  city: string;
  isRemote: boolean;
  compensation: string; // e.g. "₹35,000 / month" or "₹7.5 - 9.0 LPA" or "Sponsored / Free"
  duration: string; // e.g. "6 Months" or "Full-Time" or "4 Weeks"
  openPositions: number;
  applicantsCount: number;
  shortlistedCount: number;
  deadline: string;
  eligibleDegrees: string[];
  requiredSkills: string[];
  description: string;
  status: "ACTIVE" | "PAUSED" | "CLOSED";
  createdAt: string;
}

export interface IndustryCandidateProfile {
  id: string;
  name: string;
  email: string;
  degree: string;
  currentYear: string;
  institution: string;
  avatarText: string;
  primaryDomain: "Clinical" | "Research" | "Panchakarma" | "Herbal Pharma";
  overallMatchScore: number; // 0-100%
  clinicalHoursVerified: number;
  passportHash: string;
  passportIssuedAt: string;
  verifiedCompetencies: {
    name: string;
    level: "Verified" | "Mastery" | "Proficient";
    score: number;
  }[];
  careerDnaScores: {
    clinical: number;
    research: number;
    panchakarma: number;
    herbalPharma: number;
  };
  shortlistedFor: string[]; // List of opportunity IDs
  currentApplicationStatus?: "APPLIED" | "SHORTLISTED" | "SUPERVISOR_ENDORSED" | "HIRED";
}

export interface IndustryMentorshipSlot {
  id: string;
  mentorName: string;
  mentorTitle: string;
  organization: string;
  specialtyDomain: string;
  sessionTitle: string;
  mode: "Virtual Practicum" | "In-Person Clinical Round" | "Case Discussion";
  durationMinutes: number;
  date: string;
  timeSlot: string;
  capacity: number;
  enrolledMentees: number;
  status: "OPEN" | "FULL" | "COMPLETED";
  topicsCovered: string[];
}

export interface IndustryApplicationItem {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateDegree: string;
  institution: string;
  opportunityId: string;
  opportunityTitle: string;
  opportunityType: IndustryOpportunityType;
  matchScore: number;
  appliedDate: string;
  passportHash: string;
  stage: "SUBMITTED" | "UNDER_REVIEW" | "SHORTLISTED" | "SUPERVISOR_ENDORSED" | "HIRED" | "REJECTED";
  supervisorName: string;
  notes?: string;
}

export interface IndustryAnalyticsSummary {
  activeListingsCount: number;
  totalApplicantsCount: number;
  shortlistedCount: number;
  activeMentorshipPrograms: number;
  shortlistConversionRate: number; // e.g. 24%
  topInDemandSkills: {
    skillName: string;
    industryDemandPct: number;
    talentPoolSupplyPct: number;
    gapStatus: "DEFICIT" | "BALANCED" | "SURPLUS";
  }[];
  candidatesByDomain: {
    domain: string;
    count: number;
    percentage: number;
  }[];
}

// ==========================================
// DEFAULT MOCK REPOSITORY
// ==========================================

export const INITIAL_INDUSTRY_LISTINGS: IndustryListingItem[] = [
  {
    id: "ind-opp-01",
    type: "INTERNSHIP",
    title: "Clinical Research Residency in Metabolic & Endocrine Disorders",
    organization: "Dabur Research Foundation & AIIA Inpatient Facility",
    department: "Department of Kayachikitsa & Translational Medicine",
    domain: "Clinical",
    location: "Sarita Vihar, New Delhi",
    city: "New Delhi",
    isRemote: false,
    compensation: "₹35,000 / month",
    duration: "6 Months",
    openPositions: 4,
    applicantsCount: 28,
    shortlistedCount: 3,
    deadline: "2026-10-15",
    eligibleDegrees: ["BAMS (Final Year / Intern)", "MD/MS Ayurveda"],
    requiredSkills: ["Clinical Documentation (SOAP EHR)", "Nadi Pariksha Assessment", "GCP Clinical Protocols"],
    description: "Hands-on residency focusing on integrative diabetes and thyroid management clinical trials under senior Vaidyas.",
    status: "ACTIVE",
    createdAt: "2026-09-01T08:00:00Z",
  },
  {
    id: "ind-opp-02",
    type: "JOB",
    title: "Ayurvedic Medical Officer & NABH Clinical Quality Lead",
    organization: "Kerala Ayurveda Hospital & Wellness Resorts",
    department: "Clinical Operations & Quality Assurance",
    domain: "Clinical",
    location: "Kochi, Kerala",
    city: "Kochi",
    isRemote: false,
    compensation: "₹7.2 - 8.8 LPA",
    duration: "Full-Time",
    openPositions: 2,
    applicantsCount: 19,
    shortlistedCount: 2,
    deadline: "2026-10-30",
    eligibleDegrees: ["BAMS Graduate", "MD Kayachikitsa"],
    requiredSkills: ["Patient Consultation", "Panchakarma Protocol Design", "NABH Accreditation Standards"],
    description: "Lead hospital clinical audit, patient treatment plans, and Panchakarma SOP implementation across our flagship facility.",
    status: "ACTIVE",
    createdAt: "2026-09-03T10:30:00Z",
  },
  {
    id: "ind-opp-03",
    type: "RESEARCH_PROJECT",
    title: "Phytochemical Characterization & GCP Trial on Standardized Ashwagandha Extract",
    organization: "Dabur Centre of Excellence for Herbal Therapeutics",
    department: "R&D Phytomedicine Division",
    domain: "Research",
    location: "Ghaziabad, NCR",
    city: "Ghaziabad",
    isRemote: true,
    compensation: "₹40,000 / month Fellowship",
    duration: "9 Months",
    openPositions: 3,
    applicantsCount: 14,
    shortlistedCount: 1,
    deadline: "2026-11-01",
    eligibleDegrees: ["MD Dravyaguna", "MD Rasashastra", "BAMS (Intern / PG)"],
    requiredSkills: ["HPLC & HPTLC Standardization", "Literature Review & Meta-analysis", "Biostatistics"],
    description: "Multicentric collaborative clinical trial evaluating adaptogenic bioavailability and biomarker modulations.",
    status: "ACTIVE",
    createdAt: "2026-09-04T12:00:00Z",
  },
  {
    id: "ind-opp-04",
    type: "TRAINING",
    title: "National CME: Panchakarma Shodhana Safety & Critical Care Protocol",
    organization: "All India Institute of Ayurveda & Industry Consortium",
    department: "Center for Continuing Medical Education",
    domain: "Panchakarma",
    location: "Hybrid (AIIA Campus + Live Stream)",
    city: "New Delhi",
    isRemote: true,
    compensation: "Govt Sponsored / Fully Funded",
    duration: "4 Weeks (Weekend Intensive)",
    openPositions: 50,
    applicantsCount: 62,
    shortlistedCount: 45,
    deadline: "2026-09-25",
    eligibleDegrees: ["BAMS Students (All Years)", "Interns", "Postgraduates"],
    requiredSkills: ["Panchakarma Safety Protocols", "Emergency Vamana/Virechana Management", "Aseptic Measures"],
    description: "Certified professional masterclass endorsed by NCISM with real patient emergency simulation and hands-on theatre rounds.",
    status: "ACTIVE",
    createdAt: "2026-09-05T09:15:00Z",
  },
];

export const INITIAL_INDUSTRY_CANDIDATES: IndustryCandidateProfile[] = [
  {
    id: "student-aarav-01",
    name: "Aarav Sharma",
    email: "aarav.sharma@aiia.gov.in",
    degree: "BAMS (Final Year)",
    currentYear: "Final Year / Intern",
    institution: "All India Institute of Ayurveda, New Delhi",
    avatarText: "AS",
    primaryDomain: "Clinical",
    overallMatchScore: 94,
    clinicalHoursVerified: 450,
    passportHash: "0x7e8b92a4c519d08e1245ba77fc30a41d9c02e5b8",
    passportIssuedAt: "2026-09-08T18:00:00Z",
    verifiedCompetencies: [
      { name: "Clinical Case Documentation (SOAP)", level: "Mastery", score: 98 },
      { name: "Panchakarma Shodhana Safety", level: "Verified", score: 92 },
      { name: "Nadi Pariksha & Rogi Pariksha", level: "Verified", score: 88 },
      { name: "GCP Clinical Protocol Writing", level: "Proficient", score: 84 },
    ],
    careerDnaScores: {
      clinical: 84,
      research: 71,
      panchakarma: 68,
      herbalPharma: 62,
    },
    shortlistedFor: ["ind-opp-01"],
    currentApplicationStatus: "SHORTLISTED",
  },
  {
    id: "student-priya-02",
    name: "Priya Nair",
    email: "priya.nair@ayurvidya.ac.in",
    degree: "MD Ayurveda (Dravyaguna)",
    currentYear: "2nd Year PG",
    institution: "National Institute of Ayurveda (NIA), Jaipur",
    avatarText: "PN",
    primaryDomain: "Research",
    overallMatchScore: 91,
    clinicalHoursVerified: 320,
    passportHash: "0x4b1f89c02a78e4d3910c67e812f5a3b904d8c721",
    passportIssuedAt: "2026-09-05T14:30:00Z",
    verifiedCompetencies: [
      { name: "HPLC Phytochemical Profiling", level: "Mastery", score: 96 },
      { name: "Literature Meta-analysis", level: "Verified", score: 90 },
      { name: "Herb-Drug Pharmacovigilance", level: "Verified", score: 89 },
      { name: "Clinical Documentation (SOAP)", level: "Proficient", score: 82 },
    ],
    careerDnaScores: {
      clinical: 65,
      research: 89,
      panchakarma: 58,
      herbalPharma: 85,
    },
    shortlistedFor: ["ind-opp-03"],
    currentApplicationStatus: "SHORTLISTED",
  },
  {
    id: "student-rohan-03",
    name: "Rohan Joshi",
    email: "rohan.joshi@itra.edu.in",
    degree: "BAMS (Intern)",
    currentYear: "Rotatory Intern",
    institution: "Institute of Teaching & Research in Ayurveda (ITRA), Jamnagar",
    avatarText: "RJ",
    primaryDomain: "Panchakarma",
    overallMatchScore: 88,
    clinicalHoursVerified: 510,
    passportHash: "0x9812ea01f56bc74012e89d443210ab78fc11293a",
    passportIssuedAt: "2026-09-02T11:00:00Z",
    verifiedCompetencies: [
      { name: "Panchakarma Shodhana Safety", level: "Mastery", score: 95 },
      { name: "Basti Kalpana Preparation", level: "Verified", score: 91 },
      { name: "Bedside Emergency Response", level: "Verified", score: 86 },
      { name: "Electronic Health Record Mgmt", level: "Proficient", score: 80 },
    ],
    careerDnaScores: {
      clinical: 79,
      research: 60,
      panchakarma: 92,
      herbalPharma: 54,
    },
    shortlistedFor: [],
    currentApplicationStatus: "APPLIED",
  },
  {
    id: "student-sneha-04",
    name: "Dr. Sneha Deshmukh",
    email: "sneha.deshmukh@gov.in",
    degree: "MD Kayachikitsa",
    currentYear: "Final Year PG Scholar",
    institution: "Government Ayurvedic College, Pune",
    avatarText: "SD",
    primaryDomain: "Clinical",
    overallMatchScore: 92,
    clinicalHoursVerified: 680,
    passportHash: "0x1276ab89d00fca13472098bcad541097ef4321bc",
    passportIssuedAt: "2026-09-07T09:45:00Z",
    verifiedCompetencies: [
      { name: "NABH Clinical Audit Compliance", level: "Mastery", score: 94 },
      { name: "Integrative Inpatient Protocols", level: "Verified", score: 93 },
      { name: "Clinical Case Documentation (SOAP)", level: "Mastery", score: 97 },
      { name: "Patient Doctor Counseling", level: "Verified", score: 90 },
    ],
    careerDnaScores: {
      clinical: 91,
      research: 76,
      panchakarma: 74,
      herbalPharma: 60,
    },
    shortlistedFor: ["ind-opp-02"],
    currentApplicationStatus: "SHORTLISTED",
  },
  {
    id: "student-vikram-05",
    name: "Vikramaditya Chauhan",
    email: "vikram.chauhan@bhu.ac.in",
    degree: "BAMS (3rd Year)",
    currentYear: "3rd Professional",
    institution: "Faculty of Ayurveda, IMS BHU, Varanasi",
    avatarText: "VC",
    primaryDomain: "Herbal Pharma",
    overallMatchScore: 84,
    clinicalHoursVerified: 180,
    passportHash: "0x3344bba8912efc4091a18290bc571932fa998124",
    passportIssuedAt: "2026-09-06T16:15:00Z",
    verifiedCompetencies: [
      { name: "Rasashastra Bhasma Pariksha", level: "Verified", score: 87 },
      { name: "Herbal Extraction Standards", level: "Verified", score: 85 },
      { name: "Sanskrit Shloka Interpretation", level: "Mastery", score: 95 },
      { name: "Clinical Documentation (SOAP)", level: "Proficient", score: 78 },
    ],
    careerDnaScores: {
      clinical: 62,
      research: 78,
      panchakarma: 64,
      herbalPharma: 88,
    },
    shortlistedFor: [],
    currentApplicationStatus: "APPLIED",
  },
];

export const INITIAL_INDUSTRY_MENTORSHIPS: IndustryMentorshipSlot[] = [
  {
    id: "mentor-slot-01",
    mentorName: "Dr. Rajesh Varma, MD (Ayu)",
    mentorTitle: "Director of Clinical Postings & Residencies",
    organization: "Dabur Research Foundation & AIIA Affiliate",
    specialtyDomain: "Integrative Endocrinology & Diabetic Foot Care",
    sessionTitle: "Clinical Preceptorship: Managing Refractory Metabolic Disorders",
    mode: "Virtual Practicum",
    durationMinutes: 60,
    date: "Every Thursday",
    timeSlot: "05:00 PM - 06:00 PM IST",
    capacity: 15,
    enrolledMentees: 11,
    status: "OPEN",
    topicsCovered: [
      "Interpreting Modern HbA1c with Dosha Vaishamya",
      "Standardizing Shodhana for Obese Inpatients",
      "Formulation adjustments for Renal Impairment",
    ],
  },
  {
    id: "mentor-slot-02",
    mentorName: "Dr. Ananya Sen, PhD (Pharmacognosy)",
    mentorTitle: "Principal Scientist & Head of Phytomedicine R&D",
    organization: "Himalaya Drug Company Research Labs",
    specialtyDomain: "Herbal Standardization & AYUSH Pharmacovigilance",
    sessionTitle: "R&D Masterclass: Bridging Charaka Samhita with Modern HPLC & Mass Spec",
    mode: "Virtual Practicum",
    durationMinutes: 90,
    date: "Alternate Saturdays",
    timeSlot: "11:00 AM - 12:30 PM IST",
    capacity: 25,
    enrolledMentees: 22,
    status: "OPEN",
    topicsCovered: [
      "Heavy Metal Toxicity Testing & Safety Limits",
      "Designing GCP-compliant Case Report Forms (CRF)",
      "Patent Filing for Novel Ayurvedic Formulations",
    ],
  },
  {
    id: "mentor-slot-03",
    mentorName: "Vaidya Madhavan Kutty, MD",
    mentorTitle: "Chief Medical Officer",
    organization: "Kerala Ayurveda Hospital Consortium",
    specialtyDomain: "Keraleeya Panchakarma & Neurological Rehabilitation",
    sessionTitle: "Hands-on Bedside Grand Rounds: Shirodhara & Shashtika Shali Pinda Sweda",
    mode: "In-Person Clinical Round",
    durationMinutes: 120,
    date: "Monthly 2nd Sunday",
    timeSlot: "10:00 AM - 12:00 PM IST",
    capacity: 10,
    enrolledMentees: 10,
    status: "FULL",
    topicsCovered: [
      "Pre-operative Snehana Assessment in Stroke Patients",
      "Oil Temperature Regulation & Patient Vital Monitoring",
      "Handling Post-Panchakarma Complications (Vyapad)",
    ],
  },
];

export const INITIAL_INDUSTRY_APPLICATIONS: IndustryApplicationItem[] = [
  {
    id: "ind-app-01",
    candidateId: "student-aarav-01",
    candidateName: "Aarav Sharma",
    candidateDegree: "BAMS (Final Year)",
    institution: "All India Institute of Ayurveda, New Delhi",
    opportunityId: "ind-opp-01",
    opportunityTitle: "Clinical Research Residency in Metabolic & Endocrine Disorders",
    opportunityType: "INTERNSHIP",
    matchScore: 94,
    appliedDate: "2026-09-08T10:30:00Z",
    passportHash: "0x7e8b92a4c519d08e1245ba77fc30a41d9c02e5b8",
    stage: "SHORTLISTED",
    supervisorName: "Prof. Dr. Meera Nambiar (HOD Kayachikitsa, AIIA)",
    notes: "Demonstrated exemplary SOAP documentation in mock diagnostic assessment. Endorsed by supervisor.",
  },
  {
    id: "ind-app-02",
    candidateId: "student-priya-02",
    candidateName: "Priya Nair",
    candidateDegree: "MD Ayurveda (Dravyaguna)",
    institution: "National Institute of Ayurveda, Jaipur",
    opportunityId: "ind-opp-03",
    opportunityTitle: "Phytochemical Characterization & GCP Trial on Standardized Extract",
    opportunityType: "RESEARCH_PROJECT",
    matchScore: 91,
    appliedDate: "2026-09-06T15:20:00Z",
    passportHash: "0x4b1f89c02a78e4d3910c67e812f5a3b904d8c721",
    stage: "SHORTLISTED",
    supervisorName: "Dr. K. S. Sharma (Research Director, NIA)",
    notes: "Published 2 papers in indexed Ayush journals. High phytochemistry skill score.",
  },
  {
    id: "ind-app-03",
    candidateId: "student-sneha-04",
    candidateName: "Dr. Sneha Deshmukh",
    candidateDegree: "MD Kayachikitsa",
    institution: "Government Ayurvedic College, Pune",
    opportunityId: "ind-opp-02",
    opportunityTitle: "Ayurvedic Medical Officer & NABH Clinical Quality Lead",
    opportunityType: "JOB",
    matchScore: 92,
    appliedDate: "2026-09-07T11:15:00Z",
    passportHash: "0x1276ab89d00fca13472098bcad541097ef4321bc",
    stage: "SHORTLISTED",
    supervisorName: "Prof. S. R. Patil (Dean, GAC Pune)",
    notes: "Over 680 verified clinical hours and formal training in hospital quality audits.",
  },
  {
    id: "ind-app-04",
    candidateId: "student-rohan-03",
    candidateName: "Rohan Joshi",
    candidateDegree: "BAMS (Intern)",
    institution: "ITRA Jamnagar",
    opportunityId: "ind-opp-01",
    opportunityTitle: "Clinical Research Residency in Metabolic & Endocrine Disorders",
    opportunityType: "INTERNSHIP",
    matchScore: 82,
    appliedDate: "2026-09-08T18:00:00Z",
    passportHash: "0x9812ea01f56bc74012e89d443210ab78fc11293a",
    stage: "UNDER_REVIEW",
    supervisorName: "Dr. Arvind Bhatt (ITRA Supervisor)",
    notes: "Candidate requested focus on Shodhana clinical postings.",
  },
  {
    id: "ind-app-05",
    candidateId: "student-vikram-05",
    candidateName: "Vikramaditya Chauhan",
    candidateDegree: "BAMS (3rd Year)",
    institution: "IMS BHU, Varanasi",
    opportunityId: "ind-opp-04",
    opportunityTitle: "National CME: Panchakarma Shodhana Safety & Critical Care Protocol",
    opportunityType: "TRAINING",
    matchScore: 84,
    appliedDate: "2026-09-09T08:30:00Z",
    passportHash: "0x3344bba8912efc4091a18290bc571932fa998124",
    stage: "SUBMITTED",
    supervisorName: "Dr. Ramanuj Shastri (BHU Ayush Faculty)",
    notes: "Eager student with high aptitude in classical formulations.",
  },
];

const STORAGE_KEYS = {
  LISTINGS: "vaidya_setu_industry_listings",
  CANDIDATES: "vaidya_setu_industry_candidates",
  MENTORSHIPS: "vaidya_setu_industry_mentorships",
  APPLICATIONS: "vaidya_setu_industry_applications",
};

export class IndustryPortalService {
  private lifecycleService = new InternshipLifecycleService();

  // ----------------------------------------
  // LISTINGS
  // ----------------------------------------
  getListings(): IndustryListingItem[] {
    if (typeof window === "undefined") return INITIAL_INDUSTRY_LISTINGS;
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.LISTINGS);
      if (!raw) {
        localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(INITIAL_INDUSTRY_LISTINGS));
        return INITIAL_INDUSTRY_LISTINGS;
      }
      return JSON.parse(raw);
    } catch {
      return INITIAL_INDUSTRY_LISTINGS;
    }
  }

  saveListings(items: IndustryListingItem[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(items));
    } catch (err) {
      console.error("Failed to save industry listings", err);
    }
  }

  createListing(data: Omit<IndustryListingItem, "id" | "applicantsCount" | "shortlistedCount" | "createdAt" | "status">): IndustryListingItem {
    const listings = this.getListings();
    const newListing: IndustryListingItem = {
      ...data,
      id: `ind-opp-${Date.now().toString(36)}`,
      applicantsCount: 0,
      shortlistedCount: 0,
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    };

    const updated = [newListing, ...listings];
    this.saveListings(updated);
    return newListing;
  }

  // ----------------------------------------
  // CANDIDATES & SHORTLISTING
  // ----------------------------------------
  getCandidates(): IndustryCandidateProfile[] {
    if (typeof window === "undefined") return INITIAL_INDUSTRY_CANDIDATES;
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CANDIDATES);
      if (!raw) {
        localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(INITIAL_INDUSTRY_CANDIDATES));
        return INITIAL_INDUSTRY_CANDIDATES;
      }
      return JSON.parse(raw);
    } catch {
      return INITIAL_INDUSTRY_CANDIDATES;
    }
  }

  saveCandidates(candidates: IndustryCandidateProfile[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(candidates));
    } catch (err) {
      console.error("Failed to save industry candidates", err);
    }
  }

  shortlistCandidate(candidateId: string, opportunityId: string): boolean {
    const candidates = this.getCandidates();
    const target = candidates.find((c) => c.id === candidateId);
    if (!target) return false;

    if (!target.shortlistedFor.includes(opportunityId)) {
      target.shortlistedFor.push(opportunityId);
    }
    target.currentApplicationStatus = "SHORTLISTED";

    this.saveCandidates(candidates);

    // Synchronize with applications queue
    const applications = this.getApplications();
    const app = applications.find((a) => a.candidateId === candidateId && a.opportunityId === opportunityId);
    if (app) {
      app.stage = "SHORTLISTED";
      this.saveApplications(applications);
    } else {
      // Create new application entry if needed
      const listings = this.getListings();
      const opp = listings.find((l) => l.id === opportunityId);
      const newApp: IndustryApplicationItem = {
        id: `ind-app-${Date.now().toString(36)}`,
        candidateId: target.id,
        candidateName: target.name,
        candidateDegree: target.degree,
        institution: target.institution,
        opportunityId: opportunityId,
        opportunityTitle: opp?.title || "Industry Opportunity",
        opportunityType: opp?.type || "INTERNSHIP",
        matchScore: target.overallMatchScore,
        appliedDate: new Date().toISOString(),
        passportHash: target.passportHash,
        stage: "SHORTLISTED",
        supervisorName: "Assigned Faculty Supervisor",
        notes: "Directly shortlisted via Industry Talent Discovery portal.",
      };
      this.saveApplications([newApp, ...applications]);
    }

    // Synchronize with internship lifecycle service if this is Aarav Sharma
    if (candidateId === "student-aarav-01") {
      try {
        this.lifecycleService.advanceToStage("SHORTLISTED");
      } catch (e) {
        console.warn("Could not advance lifecycle service:", e);
      }
    }

    return true;
  }

  // ----------------------------------------
  // APPLICATIONS
  // ----------------------------------------
  getApplications(): IndustryApplicationItem[] {
    if (typeof window === "undefined") return INITIAL_INDUSTRY_APPLICATIONS;
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (!raw) {
        localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_INDUSTRY_APPLICATIONS));
        return INITIAL_INDUSTRY_APPLICATIONS;
      }
      return JSON.parse(raw);
    } catch {
      return INITIAL_INDUSTRY_APPLICATIONS;
    }
  }

  saveApplications(apps: IndustryApplicationItem[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    } catch (err) {
      console.error("Failed to save industry applications", err);
    }
  }

  updateApplicationStage(appId: string, newStage: IndustryApplicationItem["stage"]): boolean {
    const apps = this.getApplications();
    const target = apps.find((a) => a.id === appId);
    if (!target) return false;

    target.stage = newStage;
    this.saveApplications(apps);

    // Sync candidate current status
    const candidates = this.getCandidates();
    const candidate = candidates.find((c) => c.id === target.candidateId);
    if (candidate) {
      if (newStage === "SHORTLISTED" || newStage === "SUPERVISOR_ENDORSED" || newStage === "HIRED") {
        candidate.currentApplicationStatus = newStage;
        this.saveCandidates(candidates);
      }
    }

    return true;
  }

  // ----------------------------------------
  // MENTORSHIPS
  // ----------------------------------------
  getMentorships(): IndustryMentorshipSlot[] {
    if (typeof window === "undefined") return INITIAL_INDUSTRY_MENTORSHIPS;
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.MENTORSHIPS);
      if (!raw) {
        localStorage.setItem(STORAGE_KEYS.MENTORSHIPS, JSON.stringify(INITIAL_INDUSTRY_MENTORSHIPS));
        return INITIAL_INDUSTRY_MENTORSHIPS;
      }
      return JSON.parse(raw);
    } catch {
      return INITIAL_INDUSTRY_MENTORSHIPS;
    }
  }

  saveMentorships(slots: IndustryMentorshipSlot[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEYS.MENTORSHIPS, JSON.stringify(slots));
    } catch (err) {
      console.error("Failed to save industry mentorships", err);
    }
  }

  createMentorshipSlot(slotData: Omit<IndustryMentorshipSlot, "id" | "enrolledMentees" | "status">): IndustryMentorshipSlot {
    const slots = this.getMentorships();
    const newSlot: IndustryMentorshipSlot = {
      ...slotData,
      id: `mentor-slot-${Date.now().toString(36)}`,
      enrolledMentees: 0,
      status: "OPEN",
    };
    const updated = [newSlot, ...slots];
    this.saveMentorships(updated);
    return newSlot;
  }

  // ----------------------------------------
  // ANALYTICS
  // ----------------------------------------
  getAnalytics(): IndustryAnalyticsSummary {
    const listings = this.getListings();
    const applications = this.getApplications();
    const mentorships = this.getMentorships();
    const candidates = this.getCandidates();

    const activeListings = listings.filter((l) => l.status === "ACTIVE").length;
    const totalApplicants = applications.length;
    const shortlistedCount = applications.filter((a) => a.stage === "SHORTLISTED" || a.stage === "SUPERVISOR_ENDORSED" || a.stage === "HIRED").length;
    const conversionRate = totalApplicants > 0 ? Math.round((shortlistedCount / totalApplicants) * 100) : 0;

    return {
      activeListingsCount: activeListings,
      totalApplicantsCount: totalApplicants,
      shortlistedCount: shortlistedCount,
      activeMentorshipPrograms: mentorships.length,
      shortlistConversionRate: conversionRate,
      topInDemandSkills: [
        { skillName: "Clinical Case Documentation (SOAP EHR)", industryDemandPct: 96, talentPoolSupplyPct: 82, gapStatus: "DEFICIT" },
        { skillName: "Panchakarma Shodhana Safety Protocols", industryDemandPct: 92, talentPoolSupplyPct: 88, gapStatus: "BALANCED" },
        { skillName: "HPLC & HPTLC Phytochemical Standardization", industryDemandPct: 89, talentPoolSupplyPct: 58, gapStatus: "DEFICIT" },
        { skillName: "GCP Clinical Trial Case Reporting", industryDemandPct: 84, talentPoolSupplyPct: 62, gapStatus: "DEFICIT" },
        { skillName: "NABH Hospital Accreditation Compliance", industryDemandPct: 78, talentPoolSupplyPct: 52, gapStatus: "DEFICIT" },
        { skillName: "Nadi Pariksha & Rogi Pariksha", industryDemandPct: 90, talentPoolSupplyPct: 94, gapStatus: "SURPLUS" },
      ],
      candidatesByDomain: [
        { domain: "Clinical Practice", count: candidates.filter((c) => c.primaryDomain === "Clinical").length, percentage: 40 },
        { domain: "Research & Drug Discovery", count: candidates.filter((c) => c.primaryDomain === "Research").length, percentage: 20 },
        { domain: "Panchakarma Therapy", count: candidates.filter((c) => c.primaryDomain === "Panchakarma").length, percentage: 20 },
        { domain: "Herbal Formulations & Pharma", count: candidates.filter((c) => c.primaryDomain === "Herbal Pharma").length, percentage: 20 },
      ],
    };
  }
}
