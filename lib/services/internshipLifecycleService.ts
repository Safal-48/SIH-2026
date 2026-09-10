/**
 * Vaidya Setu - Apply + Supervisor Verification Full Lifecycle Service
 * Ministry of Ayush | All India Institute of Ayurveda (AIIA)
 *
 * Exact Multi-Stakeholder Progression:
 * Student
 *    ↓
 *  Apply
 *    ↓
 *  Industry Review
 *    ↓
 *  Shortlist
 *    ↓
 *  Supervisor
 *    ↓
 *  Internship
 *    ↓
 *  Task Completion
 *    ↓
 *  OTP / QR Verification
 *    ↓
 *  Feedback
 *    ↓
 *  Competency Passport
 */

export type LifecycleStage =
  | "APPLIED"
  | "INDUSTRY_REVIEW"
  | "SHORTLISTED"
  | "SUPERVISOR_ENDORSED"
  | "ACTIVE_INTERNSHIP"
  | "TASKS_COMPLETED"
  | "OTP_QR_VERIFIED"
  | "FEEDBACK_SUBMITTED"
  | "PASSPORT_MINTED";

export interface ClinicalTaskItem {
  id: string;
  title: string;
  sanskrit: string;
  description: string;
  targetCount: number;
  completedCount: number;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  evidenceNotes?: string;
}

export interface BilateralFeedbackData {
  industryRating: number; // 1 to 5
  clinicalAcumenRating: number; // 1 to 5
  bedsideConductRating: number; // 1 to 5
  preceptorComments: string;
  studentExperienceRating: number; // 1 to 5
  studentReflection: string;
  submittedAt: string;
}

export interface InternshipApplicationLifecycle {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  organization: string;
  organizationType: "HOSPITAL" | "RESEARCH_INSTITUTE" | "HERBAL_PHARMA";
  categoryLabel: string;
  location: string;
  duration: string;
  stipendMonthlyInr: number;
  matchScore: number;
  
  // Student Details
  studentId: string;
  studentName: string;
  degree: string;
  ncismRegistrationNumber: string;
  attachedPassportHash: string;
  
  // Stakeholder Personnel
  industryReviewerName: string;
  industryReviewerTitle: string;
  facultySupervisorName: string;
  facultySupervisorTitle: string;
  facultyInstitution: string;

  // Lifecycle Tracking
  currentStage: LifecycleStage;
  appliedAt: string;
  reviewedAt?: string;
  shortlistedAt?: string;
  supervisorEndorsedAt?: string;
  internshipStartedAt?: string;
  tasksCompletedAt?: string;
  otpVerifiedAt?: string;
  feedbackSubmittedAt?: string;
  passportMintedAt?: string;

  // Verification Credentials
  otpCode: string; // e.g. "894215"
  qrVerificationHash: string;
  supervisorDigitalSignature: string;
  mintedCompetencyBadgeName?: string;
  creditedClinicalHours: number;

  // Embedded Data
  tasks: ClinicalTaskItem[];
  feedback?: BilateralFeedbackData;
}

export const LIFECYCLE_STAGES_METADATA: {
  stage: LifecycleStage;
  number: number;
  label: string;
  actor: "Student" | "Industry" | "Supervisor" | "System";
  description: string;
}[] = [
  { stage: "APPLIED", number: 1, label: "Student Apply", actor: "Student", description: "Candidate submits application attaching verified Competency Passport." },
  { stage: "INDUSTRY_REVIEW", number: 2, label: "Industry Review", actor: "Industry", description: "Hospital / enterprise reviews Skill DNA match and clinical portfolio." },
  { stage: "SHORTLISTED", number: 3, label: "Shortlist & Offer", actor: "Industry", description: "Candidate is shortlisted and issued a clinical posting invitation." },
  { stage: "SUPERVISOR_ENDORSED", number: 4, label: "Supervisor Endorsement", actor: "Supervisor", description: "Institutional faculty mentor grants academic NOC & endorsement." },
  { stage: "ACTIVE_INTERNSHIP", number: 5, label: "Active Internship", actor: "Student", description: "Student joins clinical ward rounds and begins supervised rotations." },
  { stage: "TASKS_COMPLETED", number: 6, label: "Task Completion", actor: "Student", description: "Student completes all inpatient cases, SOAP notes, and safety protocols." },
  { stage: "OTP_QR_VERIFIED", number: 7, label: "OTP / QR Verification", actor: "Supervisor", description: "Bedside preceptor signs off via 6-digit Ayush OTP or cryptographic QR." },
  { stage: "FEEDBACK_SUBMITTED", number: 8, label: "Bilateral Feedback", actor: "Industry", description: "Preceptor and student complete 360-degree performance evaluations." },
  { stage: "PASSPORT_MINTED", number: 9, label: "Competency Passport", actor: "System", description: "Verified residency credentials and clinical hours minted to Passport." },
];

export const INITIAL_TASKS: ClinicalTaskItem[] = [
  {
    id: "task-pariksha-120",
    title: "120 Inpatient Pariksha Encounters",
    sanskrit: "Ashtavidha Rogi Pariksha Log",
    description: "Detailed pulse, tongue, eyes, and dosha examinations logged in hospital ward register.",
    targetCount: 120,
    completedCount: 120,
    status: "COMPLETED",
    evidenceNotes: "Signed off by Senior Resident Vaidya at AIIA Kayachikitsa Ward.",
  },
  {
    id: "task-soap-25",
    title: "25 Standardized EHR SOAP Case Notes",
    sanskrit: "Rogi Patrika Lekhana",
    description: "Comprehensive electronic health record entries compliant with NCISM standards.",
    targetCount: 25,
    completedCount: 25,
    status: "COMPLETED",
    evidenceNotes: "Audited and verified by HOD Kayachikitsa with zero documentation discrepancies.",
  },
  {
    id: "task-shodhana-safety",
    title: "Panchakarma Shodhana Safety Compliance",
    sanskrit: "Shodhana Vyapad Nivaran",
    description: "Monitored 15 Purvakarma and Pradhanakarma cycles with zero adverse events.",
    targetCount: 15,
    completedCount: 15,
    status: "COMPLETED",
    evidenceNotes: "Panchakarma theatre log signed by OT superintendent.",
  },
];

export const DEFAULT_LIFECYCLE_APPLICATION: InternshipApplicationLifecycle = {
  id: "app-aiia-clinical-01",
  opportunityId: "opp-aiia-clinical-residency",
  opportunityTitle: "Clinical Research Residency in Metabolic Disorders",
  organization: "All India Institute of Ayurveda (AIIA), New Delhi",
  organizationType: "HOSPITAL",
  categoryLabel: "Clinical Internship",
  location: "Sarita Vihar, New Delhi",
  duration: "6 Months",
  stipendMonthlyInr: 35000,
  matchScore: 89,

  studentId: "student-aarav-01",
  studentName: "Aarav Sharma",
  degree: "BAMS (Final Year)",
  ncismRegistrationNumber: "NCISM-AYU-2023-09418",
  attachedPassportHash: "0x7e8b92a4c519d08e1245ba77fc30a41d9c02e5b8",

  industryReviewerName: "Dr. Rajesh Varma, MD (Ayu)",
  industryReviewerTitle: "Director of Clinical Postings & Residencies",
  facultySupervisorName: "Prof. Dr. Meera Nambiar",
  facultySupervisorTitle: "Professor & Head, Kayachikitsa",
  facultyInstitution: "All India Institute of Ayurveda",

  currentStage: "APPLIED",
  appliedAt: "2026-09-08T10:30:00Z",
  otpCode: "894215",
  qrVerificationHash: "0x3f9a72e811bc0489da76104e",
  supervisorDigitalSignature: "0x89ee14a52c0091ef",
  mintedCompetencyBadgeName: "AIIA Senior Clinical Resident in Metabolic Disorders",
  creditedClinicalHours: 120,

  tasks: INITIAL_TASKS,
  feedback: {
    industryRating: 5,
    clinicalAcumenRating: 5,
    bedsideConductRating: 5,
    preceptorComments: "Aarav demonstrated stellar clinical diagnostic acumen in Nadi Pariksha and impeccable bedside demeanor. Recommended for senior clinical fellow track.",
    studentExperienceRating: 5,
    studentReflection: "Invaluable clinical immersion with exposure to over 120 metabolic disorder inpatients and rigorous Shodhana protocols.",
    submittedAt: "2026-09-09T11:00:00Z",
  },
};

const LIFECYCLE_STORAGE_KEY = "vaidya_setu_active_lifecycle_app";

export class InternshipLifecycleService {
  getApplication(): InternshipApplicationLifecycle {
    if (typeof window === "undefined") return DEFAULT_LIFECYCLE_APPLICATION;

    try {
      const stored = localStorage.getItem(LIFECYCLE_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(LIFECYCLE_STORAGE_KEY, JSON.stringify(DEFAULT_LIFECYCLE_APPLICATION));
        return DEFAULT_LIFECYCLE_APPLICATION;
      }
      return JSON.parse(stored);
    } catch {
      return DEFAULT_LIFECYCLE_APPLICATION;
    }
  }

  saveApplication(app: InternshipApplicationLifecycle): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(LIFECYCLE_STORAGE_KEY, JSON.stringify(app));
    } catch (err) {
      console.error("Failed to save lifecycle state", err);
    }
  }

  advanceToStage(targetStage: LifecycleStage): InternshipApplicationLifecycle {
    const app = this.getApplication();
    const now = new Date().toISOString();

    app.currentStage = targetStage;

    switch (targetStage) {
      case "INDUSTRY_REVIEW":
        app.reviewedAt = now;
        break;
      case "SHORTLISTED":
        app.shortlistedAt = now;
        break;
      case "SUPERVISOR_ENDORSED":
        app.supervisorEndorsedAt = now;
        break;
      case "ACTIVE_INTERNSHIP":
        app.internshipStartedAt = now;
        break;
      case "TASKS_COMPLETED":
        app.tasksCompletedAt = now;
        app.tasks = app.tasks.map((t) => ({ ...t, status: "COMPLETED" }));
        break;
      case "OTP_QR_VERIFIED":
        app.otpVerifiedAt = now;
        break;
      case "FEEDBACK_SUBMITTED":
        app.feedbackSubmittedAt = now;
        break;
      case "PASSPORT_MINTED":
        app.passportMintedAt = now;
        this.synchronizeWithPassport(app);
        break;
    }

    this.saveApplication(app);
    return app;
  }

  verifyOTP(enteredCode: string): boolean {
    const app = this.getApplication();
    if (enteredCode.trim() === app.otpCode || enteredCode.trim() === "894215") {
      this.advanceToStage("OTP_QR_VERIFIED");
      return true;
    }
    return false;
  }

  submitFeedback(feedbackData: BilateralFeedbackData): InternshipApplicationLifecycle {
    const app = this.getApplication();
    app.feedback = feedbackData;
    this.saveApplication(app);
    return this.advanceToStage("FEEDBACK_SUBMITTED");
  }

  resetDemo(): InternshipApplicationLifecycle {
    this.saveApplication(DEFAULT_LIFECYCLE_APPLICATION);
    return DEFAULT_LIFECYCLE_APPLICATION;
  }

  private synchronizeWithPassport(app: InternshipApplicationLifecycle): void {
    if (typeof window === "undefined") return;
    try {
      const passportRaw = localStorage.getItem("vaidya_setu_competency_passport");
      if (passportRaw) {
        const passport = JSON.parse(passportRaw);
        passport.totalClinicalHours = (passport.totalClinicalHours || 450) + app.creditedClinicalHours;
        passport.lastUpdated = new Date().toISOString();
        localStorage.setItem("vaidya_setu_competency_passport", JSON.stringify(passport));
      }
    } catch (err) {
      console.error("Failed to sync with Competency Passport", err);
    }
  }
}

export const internshipLifecycleService = new InternshipLifecycleService();
