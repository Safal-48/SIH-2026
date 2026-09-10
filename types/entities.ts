/**
 * Vaidya Setu - Core Entity Models & Domain Interfaces
 */

import { UserRole } from "./roles";

// 1. User & Stakeholder Profiles
export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  avatarUrl?: string;
  phone?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AyushDegree =
  | "BAMS"
  | "MD_AYURVEDA"
  | "MS_AYURVEDA"
  | "PHD_AYURVEDA"
  | "DIPLOMA_PANCHAKARMA"
  | "DIPLOMA_HERBAL_PHARMA";

// Student Smart Onboarding Types
export type StudentDegreeOption = "BAMS" | "MD/MS Ayurveda" | "PhD Ayurveda";
export type StudentYearOption = "1st Year" | "2nd Year" | "3rd Year" | "Final Year" | "Intern" | "Postgraduate";

export type StudentExposureOption =
  | "Clinical Posting"
  | "Internship"
  | "Health Camp"
  | "Workshop"
  | "Research Project"
  | "Industry Visit"
  | "Panchakarma Training";

export type CareerGoalOption =
  | "Clinical Practice"
  | "Panchakarma & Wellness"
  | "Herbal Pharma"
  | "Research"
  | "Teaching"
  | "Government"
  | "Entrepreneurship";

export type AvailabilityTypeOption =
  | "Weekends"
  | "Part-time"
  | "Full-time"
  | "1 month"
  | "2-3 months"
  | "3+ months";

export type LanguagePreferenceOption = "English" | "Hindi" | "Marathi";

export interface StudentOnboardingData {
  // Step 1: Academic
  degree: StudentDegreeOption;
  currentYear: StudentYearOption;
  college: string;
  specialization?: string;

  // Step 2: Previous Exposure
  previousExposures: StudentExposureOption[];

  // Step 3: Career Goal
  careerInterests: CareerGoalOption[];
  primaryCareerGoal: CareerGoalOption;

  // Step 4: Availability & Preferences
  preferredCity: string;
  availability: AvailabilityTypeOption;
  languages: LanguagePreferenceOption[];

  // Step 5: Completion status
  onboardingCompleted?: boolean;
  onboardingCompletedAt?: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  enrollmentNumber?: string;
  institutionId?: string;
  institutionName?: string;
  college?: string;
  degree: AyushDegree | StudentDegreeOption;
  currentYearLabel?: StudentYearOption;
  specialization?: string; // e.g. Dravyaguna, Kayachikitsa, Panchakarma, Shalya Tantra
  currentYear: number; // 1, 2, 3, 4, or Internship year
  expectedGraduation?: string;
  bio?: string;
  interests?: string[];
  careerInterests?: CareerGoalOption[];
  primaryCareerGoal?: CareerGoalOption;
  previousExposures?: StudentExposureOption[];
  preferredCity?: string;
  availability?: AvailabilityTypeOption;
  languages?: LanguagePreferenceOption[];
  careerDnaId?: string;
  competencyPassportId?: string;
  overallSkillScore: number; // 0-100
  onboardingCompleted?: boolean;
  onboardingCompletedAt?: string;
  location?: {
    city: string;
    state: string;
  };
}

export interface AcademicianProfile {
  id: string;
  userId: string;
  institutionId: string;
  designation: string; // e.g. Associate Professor, HOD Dravyaguna
  department: string;
  ncismRegistrationNumber: string;
  publicationsCount: number;
  yearsOfExperience: number;
  researchFocus: string[];
  activeMenteesCount: number;
}

export type IndustryType =
  | "AYURVEDIC_PHARMACEUTICAL"
  | "PANCHAKARMA_CLINIC_HOSPITAL"
  | "AYUSH_RESEARCH_INSTITUTE"
  | "WELLNESS_RESORT"
  | "NUTRACEUTICAL_HERBAL"
  | "TELEMEDICINE_DIGITAL_AYUSH";

export interface IndustryProfile {
  id: string;
  userId: string;
  organizationName: string;
  industryType: IndustryType;
  registrationNumber: string; // e.g. GMP / Ayush Drug License
  website?: string;
  headquarters: string;
  logoUrl?: string;
  verifiedByMinistry: boolean;
  totalActiveListings: number;
  mouWithInstitutes: string[];
}

export interface InstitutionProfile {
  id: string;
  userId: string;
  institutionName: string;
  ncismCode: string;
  accreditationGrade: string; // e.g. NAAC A+, NABH Ayush
  affiliatedUniversity: string;
  state: string;
  city: string;
  totalEnrolledStudents: number;
  facultyCount: number;
}

// 2. Skill & Competency Framework
export type BloomTaxonomyLevel =
  | "REMEMBER"
  | "UNDERSTAND"
  | "APPLY"
  | "ANALYZE"
  | "EVALUATE"
  | "CREATE";

export type SkillCategory =
  | "CLINICAL_DIAGNOSTICS" // e.g. Nadi Pariksha, Ashtavidha Pariksha
  | "PANCHAKARMA_PROCEDURES" // e.g. Vamana, Virechana, Shirodhara
  | "DRAVYAGUNA_PHARMACOLOGY" // e.g. Medicinal Plant Identification, Phytochemical analysis
  | "RASASHASTRA_FORMULATION" // e.g. Bhasma preparation, Standardized extract design
  | "RESEARCH_METHODOLOGY" // e.g. Ayush Clinical Trials, GCP-Ayush, Bioethics
  | "DIGITAL_AYUSH_STANDARDS" // e.g. NAMASTE portal coding, ICD-11 TM2, EHR
  | "HOSPITAL_NABH_PROTOCOLS"; // Healthcare quality standards

export interface Skill {
  id: string;
  name: string;
  sanskritName?: string; // e.g. "नाडी परीक्षा (Nāḍī Parīkṣā)"
  category: SkillCategory;
  description: string;
  bloomLevel: BloomTaxonomyLevel;
  industryDemandScore: number; // 1-100
  isCoreAyushCompetency: boolean;
  prerequisites?: string[];
}

export interface Competency {
  id: string;
  skillId: string;
  skillName: string;
  category: SkillCategory;
  proficiencyScore: number; // 0-100
  level: "FOUNDATIONAL" | "PRACTICING" | "ADVANCED" | "EXPERT";
  verifiedAt?: string;
  verifiedBySupervisorId?: string;
  evidenceLinks?: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: SkillCategory;
  issuedBy: string; // e.g. "AIIA New Delhi"
  issuedDate: string;
  badgeLevel: "BRONZE" | "SILVER" | "GOLD" | "PRANA_EXCELLENCE";
}

export interface CompetencyPassport {
  id: string;
  studentId: string;
  passportHash: string; // Tamper-evident attestation identifier
  issuedAt: string;
  lastUpdated: string;
  verifiedCompetencies: Competency[];
  badges: Badge[];
  clinicalHoursVerified: number;
  qrVerificationUrl: string;
}

// 3. Assessment & Skill Gap Engine
export type QuestionType =
  | "CLINICAL_CASE_VIGNETTE"
  | "HERB_IDENTIFICATION"
  | "MULTIPLE_CHOICE"
  | "DOSHA_ANALYSIS"
  | "FORMULATION_DECISION";

export interface AssessmentQuestion {
  id: string;
  questionText: string;
  caseScenario?: string;
  questionType: QuestionType;
  targetSkillId: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    clinicalRationale: string;
  }[];
  difficulty: "EASY" | "MEDIUM" | "HARD";
}

export interface Assessment {
  id: string;
  title: string;
  category: SkillCategory;
  description: string;
  totalQuestions: number;
  durationMinutes: number;
  targetDegree: AyushDegree[];
  questions: AssessmentQuestion[];
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  studentId: string;
  startedAt: string;
  completedAt?: string;
  answers: {
    questionId: string;
    selectedOptionId: string;
    isCorrect: boolean;
  }[];
  score: number;
}

export interface AssessmentResult {
  id: string;
  attemptId: string;
  studentId: string;
  overallScore: number;
  domainScores: Record<SkillCategory, number>;
  strengths: string[];
  skillGaps: {
    skillId: string;
    skillName: string;
    currentScore: number;
    requiredScore: number;
    gapSeverity: "LOW" | "MODERATE" | "CRITICAL";
  }[];
  generatedCareerDna: string;
}

// 4. Guided Learning & Career Paths
export interface CareerPath {
  id: string;
  title: string;
  domain: string;
  description: string;
  projectedGrowth: string;
  averageStartingInr: number;
  requiredSkills: {
    skillId: string;
    skillName: string;
    minimumScore: number;
  }[];
  sampleRoles: string[];
  ayurvedaSpecialization: string;
}

export interface LearningTask {
  id: string;
  title: string;
  type: "CLINICAL_CASE_STUDY" | "RESEARCH_PAPER_REVIEW" | "VIRTUAL_HERBARIUM" | "INTERACTIVE_SIMULATION";
  durationHours: number;
  isCompleted: boolean;
}

export interface LearningModule {
  id: string;
  title: string;
  category: SkillCategory;
  description: string;
  estimatedHours: number;
  targetSkillGaps: string[];
  tasks: LearningTask[];
  resourceUrls: string[];
}

// 5. Opportunities, Internships & Jobs
export type OpportunityType =
  | "CLINICAL_INTERNSHIP"
  | "R_AND_D_FELLOWSHIP"
  | "HERBAL_PHARMA_TRAINEESHIP"
  | "PANCHAKARMA_RESIDENCY"
  | "AYUSH_PUBLIC_HEALTH"
  | "FULL_TIME_ROLE";

export interface Opportunity {
  id: string;
  organizationId: string;
  organizationName: string;
  title: string;
  opportunityType: OpportunityType;
  description: string;
  location: string;
  isRemote: boolean;
  stipendMonthlyInr?: number;
  durationMonths: number;
  requiredSkills: {
    skillId: string;
    skillName: string;
    minimumProficiency: number;
  }[];
  eligibilityDegrees: AyushDegree[];
  openPositions: number;
  deadline: string;
  createdAt: string;
  verifiedByAIIA: boolean;
}

export type ApplicationStatus =
  | "SUBMITTED"
  | "SUPERVISOR_ENDORSED"
  | "SHORTLISTED"
  | "INTERVIEW_SCHEDULED"
  | "OFFERED"
  | "COMPLETED"
  | "REJECTED";

export interface Application {
  id: string;
  opportunityId: string;
  studentId: string;
  status: ApplicationStatus;
  appliedDate: string;
  matchScore: number; // 0-100 based on Skill DNA compatibility
  supervisorVerificationId?: string;
  notes?: string;
}

// 6. Verification & Supervisor Endorsement
export interface Supervisor {
  id: string;
  userId: string;
  academicianProfileId: string;
  facultyName: string;
  department: string;
  institutionName: string;
}

export interface Verification {
  id: string;
  applicationId?: string;
  studentId: string;
  supervisorId: string;
  competencyId?: string;
  status: "PENDING" | "APPROVED" | "REVISION_REQUESTED";
  comments: string;
  verifiedDate?: string;
  digitalSignatureHash: string;
}

export interface Feedback {
  id: string;
  applicationId: string;
  fromRole: UserRole;
  toRole: UserRole;
  rating: number; // 1 to 5
  feedbackText: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "VERIFICATION" | "MATCH" | "ASSESSMENT" | "OPPORTUNITY" | "SYSTEM";
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}
