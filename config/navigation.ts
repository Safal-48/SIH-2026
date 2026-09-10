/**
 * Vaidya Setu - Navigation Configuration
 */

import { UserRole } from "@/types/roles";

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: string;
}

export const publicNavItems: NavItem[] = [
  { title: "Smart Automation", href: "/automation" },
  { title: "Student Journey", href: "/#student-journey" },
  { title: "Competency Passport", href: "/#passport" },
  { title: "Opportunities", href: "/#opportunities" },
  { title: "Architecture", href: "/foundation" },
];

export const roleNavigation: Record<UserRole, NavItem[]> = {
  STUDENT: [
    { title: "Dashboard", href: "/student" },
    { title: "Skill Assessment", href: "/student/assessment" },
    { title: "Career DNA", href: "/student/career-dna" },
    { title: "Guided Learning", href: "/student/learning" },
    { title: "Competency Passport", href: "/student/passport" },
    { title: "Opportunities", href: "/student/opportunities" },
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
