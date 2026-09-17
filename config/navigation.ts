/**
 * Skillora / Vaidya Setu - Master Navigation Configuration
 * Ministry of Ayush | All India Institute of Ayurveda (AIIA)
 *
 * Mandated Student-Facing Top Navigation:
 * HOME | ASSESS | LEARNING | CAREER | OPPORTUNITIES | PORTFOLIO
 */

import { UserRole } from "@/types/roles";

export interface NavDropdownItem {
  title: string;
  href: string;
  description?: string;
  icon?: string;
  badge?: string;
}

export interface MainNavItem {
  title: string;
  href: string;
  badge?: string;
  children?: NavDropdownItem[];
}

export const MAIN_NAVIGATION: MainNavItem[] = [
  {
    title: "HOME",
    href: "/home",
  },
  {
    title: "ASSESS",
    href: "/assess",
    children: [
      {
        title: "Skill Assessment",
        href: "/assess?type=skill",
        description: "Ayurvedic fundamentals, Samhita, Dravyaguna & Rasashastra testing",
      },
      {
        title: "Clinical Case Assessment",
        href: "/assess?type=clinical",
        description: "Real inpatient & outpatient vignettes with pulse diagnostic reasoning",
      },
      {
        title: "Panchakarma Protocols",
        href: "/assess?type=panchakarma",
        description: "Shodhana safety, Purvakarma, Paschatkarma & NABH hospital protocols",
      },
      {
        title: "Herbal Pharma & ASU-GMP",
        href: "/assess?type=pharma",
        description: "Dravyaguna standardization, HPTLC analytical QA & pharmacovigilance",
      },
      {
        title: "Research & Aptitude Assessment",
        href: "/assess?type=research",
        description: "GCP-Ayush trials, evidence-based methodology & bioethics evaluation",
      },
      {
        title: "Assessment History",
        href: "/assess?type=history",
        description: "Chronological test attempts, radar calibrations & verified seals",
      },
    ],
  },
  {
    title: "LEARNING",
    href: "/learning",
    children: [
      {
        title: "Learning Assistant",
        href: "/learning?tab=assistant",
        description: "Ayush AI conceptual guide, Samhita explanations & clinical Q&A",
      },
      {
        title: "Personalized Study Planner",
        href: "/learning?tab=planner",
        description: "Daily & weekly schedules dynamically derived from active skill gaps",
      },
      {
        title: "Learning Roadmap",
        href: "/learning?tab=roadmap",
        description: "Adaptive career trajectory connecting gaps to residency benchmarks",
      },
      {
        title: "Recommended Learning",
        href: "/learning?tab=recommended",
        description: "NCISM-aligned modules, certified workshops & FDP micro-courses",
      },
      {
        title: "Clinical Case Practice",
        href: "/learning?tab=practice",
        description: "Interactive clinical cases with diagnosis and treatment reasoning",
      },
    ],
  },
  {
    title: "CAREER",
    href: "/career",
    children: [
      {
        title: "Career Goals",
        href: "/career?tab=goals",
        description: "Select and calibrate your primary Ayush professional track",
      },
      {
        title: "Career Paths",
        href: "/career?tab=paths",
        description: "Explore 7 specialized trajectories in Clinical, R&D, and Wellness",
      },
      {
        title: "Career Recommendations",
        href: "/career?tab=recommendations",
        description: "Algorithmic role fit scores and prerequisite bridging plans",
      },
      {
        title: "Resume & Profile",
        href: "/career?tab=resume",
        description: "NCISM-standardized clinical CV & procedural experience record",
      },
      {
        title: "AI Mock Interview",
        href: "/career?tab=interview",
        description: "Simulated hospital residency & pharma R&D technical viva interviews",
      },
      {
        title: "Placement Readiness",
        href: "/career?tab=placement",
        description: "Benchmark analytics against national apex institutional requirements",
      },
    ],
  },
  {
    title: "OPPORTUNITIES",
    href: "/opportunities",
    children: [
      {
        title: "Opportunity Marketplace",
        href: "/opportunities",
        description: "Residencies, fellowships & R&D jobs from AIIA, Dabur & Kottakkal",
      },
    ],
  },
  {
    title: "PORTFOLIO",
    href: "/portfolio",
    children: [
      {
        title: "Digital Competency Portfolio",
        href: "/portfolio",
        description: "Cryptographically verified clinical logbook & supervisor sign-offs",
      },
    ],
  },
];

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: string;
}

export const publicNavItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Assess", href: "/assess" },
  { title: "Learning", href: "/learning" },
  { title: "Career", href: "/career" },
  { title: "Opportunities", href: "/opportunities" },
  { title: "Portfolio", href: "/portfolio" },
];

export const roleNavigation: Record<UserRole, NavItem[]> = {
  STUDENT: [
    { title: "Home", href: "/home" },
    { title: "Assess", href: "/assess" },
    { title: "Learning", href: "/learning" },
    { title: "Career", href: "/career" },
    { title: "Opportunities", href: "/opportunities" },
    { title: "Portfolio", href: "/portfolio" },
  ],
  ACADEMICIAN: [
    { title: "Dashboard", href: "/academician" },
    { title: "Student Verifications", href: "/academician/verifications" },
    { title: "Clinical Logbooks", href: "/academician/logbooks" },
    { title: "Research Collabs", href: "/academician/research" },
  ],
  INDUSTRY: [
    { title: "Dashboard", href: "/industry" },
    { title: "Post Opportunity", href: "/industry/postings/new" },
    { title: "Candidate Search", href: "/industry/candidates" },
    { title: "Applications", href: "/industry/applications" },
    { title: "R&D Sponsorship", href: "/industry/research" },
  ],
  INSTITUTION: [
    { title: "Institutional Overview", href: "/institution" },
    { title: "Cohort Analytics", href: "/institution/cohorts" },
    { title: "Faculty Roster", href: "/institution/faculty" },
    { title: "Placement Cell", href: "/institution/placements" },
  ],
  ADMIN: [
    { title: "Governance Console", href: "/admin" },
    { title: "Skill Taxonomy (NCISM)", href: "/admin/taxonomy" },
    { title: "Partner Approvals", href: "/admin/partners" },
    { title: "Platform Telemetry", href: "/admin/telemetry" },
  ],
};
