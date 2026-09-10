/**
 * Vaidya Setu - Role System Types
 */

export type UserRole =
  | "STUDENT"
  | "ACADEMICIAN"
  | "INDUSTRY"
  | "INSTITUTION"
  | "ADMIN";

export interface RoleConfig {
  role: UserRole;
  title: string;
  badge: string;
  description: string;
  baseRoute: string;
  allowedCapabilities: string[];
}

export const ROLE_DEFINITIONS: Record<UserRole, RoleConfig> = {
  STUDENT: {
    role: "STUDENT",
    title: "Ayurveda Scholar / Student",
    badge: "BAMS / MD Scholar",
    description: "Map clinical and research competencies, take AI-guided skill assessments, and match with verified Ayush internships.",
    baseRoute: "/student",
    allowedCapabilities: [
      "take_assessment",
      "view_skill_dna",
      "apply_opportunities",
      "access_learning_modules",
      "export_competency_passport",
    ],
  },
  ACADEMICIAN: {
    role: "ACADEMICIAN",
    title: "Faculty / Clinical Guide",
    badge: "Ayush Academician",
    description: "Supervise student clinical competencies, endorse practical logbooks, and collaborate on industry-sponsored Ayurvedic research.",
    baseRoute: "/academician",
    allowedCapabilities: [
      "verify_student_skills",
      "mentor_interns",
      "publish_research_collabs",
      "endorse_competency_passport",
    ],
  },
  INDUSTRY: {
    role: "INDUSTRY",
    title: "Ayurveda Industry & Hospitals",
    badge: "Pharma / Hospital / Clinical Partner",
    description: "Post specialized clinical internships, hire verified Ayurvedic talent, and sponsor applied R&D formulation projects.",
    baseRoute: "/industry",
    allowedCapabilities: [
      "post_opportunities",
      "filter_skill_dna",
      "hire_students",
      "sponsor_research",
      "verify_performance",
    ],
  },
  INSTITUTION: {
    role: "INSTITUTION",
    title: "Ayurveda College / University",
    badge: "NCISM / AIIA Affiliated Institute",
    description: "Monitor institutional skill metrics, track alumni placement outcomes, and establish industry MOUs.",
    baseRoute: "/institution",
    allowedCapabilities: [
      "view_cohort_analytics",
      "track_accreditation_compliance",
      "manage_mou_agreements",
      "verify_institutional_roster",
    ],
  },
  ADMIN: {
    role: "ADMIN",
    title: "Ministry of Ayush / System Admin",
    badge: "National Portal Authority",
    description: "Governance, standards alignment with NCISM guidelines, platform telemetry, and trust verification.",
    baseRoute: "/admin",
    allowedCapabilities: [
      "system_configuration",
      "approve_industry_partners",
      "manage_skill_taxonomy",
      "view_national_ayush_analytics",
    ],
  },
};
