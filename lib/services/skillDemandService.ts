/**
 * Skillora / Vaidya Setu - Industry Skill Demand & Supply Analytics Service
 * Ministry of Ayush | All India Institute of Ayurveda (AIIA)
 *
 * Provides national telemetry on:
 * 1. High-demand vs Emerging Ayush skills
 * 2. Industry Demand % vs Student Skill Supply %
 * 3. Institutional Curriculum & Remedial Interventions
 */

export interface SkillDemandItem {
  id: string;
  skillName: string;
  category: "Clinical" | "Research" | "Formulation" | "Health Informatics" | "Regulatory";
  industryDemandPercent: number; // 0-100%
  studentSupplyPercent: number; // 0-100%
  gapPercent: number; // industryDemand - studentSupply
  trendDirection: "RISING_FAST" | "STABLE_HIGH" | "EMERGING" | "MODERATE";
  yoyGrowthPercent: number;
  topDemandingEmployers: string[];
  recommendedInstitutionalAction: string;
  interventionType: "WORKSHOP" | "FDP" | "CERTIFICATION" | "CURRICULUM_INTERVENTION" | "INDUSTRY_PROJECT";
}

export interface DepartmentReadinessScore {
  department: string;
  sanskritName: string;
  readinessScore: number;
  studentCount: number;
  criticalGapCount: number;
  topDeficitSkill: string;
}

export const INDUSTRY_SKILL_DEMAND_DATA: SkillDemandItem[] = [
  {
    id: "dem-power-bi",
    skillName: "Health Data Analytics & Power BI",
    category: "Health Informatics",
    industryDemandPercent: 78,
    studentSupplyPercent: 34,
    gapPercent: 44,
    trendDirection: "RISING_FAST",
    yoyGrowthPercent: 62,
    topDemandingEmployers: ["National Health Authority (ABDM)", "Piramal Swasthya", "Ayush Grid Hub"],
    recommendedInstitutionalAction: "Conduct 3-Week Industry Certification Workshop in Ayush Hospital MIS & Power BI.",
    interventionType: "WORKSHOP",
  },
  {
    id: "dem-gcp-ayush",
    skillName: "GCP-Ayush Clinical Trials Protocol",
    category: "Research",
    industryDemandPercent: 88,
    studentSupplyPercent: 52,
    gapPercent: 36,
    trendDirection: "RISING_FAST",
    yoyGrowthPercent: 48,
    topDemandingEmployers: ["All India Institute of Ayurveda", "CCRAS Research Wing", "Himalaya Wellness"],
    recommendedInstitutionalAction: "Institute mandatory GCP-Ayush Investigator FDP and clinical ethics certification.",
    interventionType: "FDP",
  },
  {
    id: "dem-hptlc",
    skillName: "HPTLC Marker Phytochemical Quantification",
    category: "Formulation",
    industryDemandPercent: 82,
    studentSupplyPercent: 46,
    gapPercent: 36,
    trendDirection: "STABLE_HIGH",
    yoyGrowthPercent: 35,
    topDemandingEmployers: ["Dabur Research Foundation", "Charak Pharma", "Baidyanath"],
    recommendedInstitutionalAction: "Partner with NABL-accredited pharma lab for hands-on spectrophotometric training.",
    interventionType: "INDUSTRY_PROJECT",
  },
  {
    id: "dem-nadi-pariksha",
    skillName: "Advanced Nadi Pariksha & Waveform Analysis",
    category: "Clinical",
    industryDemandPercent: 92,
    studentSupplyPercent: 74,
    gapPercent: 18,
    trendDirection: "STABLE_HIGH",
    yoyGrowthPercent: 24,
    topDemandingEmployers: ["Kottakkal Arya Vaidya Sala", "Patanjali Yogpeeth", "National Ayurveda Hospitals"],
    recommendedInstitutionalAction: "Conduct specialized bedside Master Vaidya clinical practicums in OPD rotations.",
    interventionType: "CERTIFICATION",
  },
  {
    id: "dem-schedule-e1",
    skillName: "Schedule E-1 Toxicological Shodhana Protocols",
    category: "Regulatory",
    industryDemandPercent: 74,
    studentSupplyPercent: 48,
    gapPercent: 26,
    trendDirection: "EMERGING",
    yoyGrowthPercent: 41,
    topDemandingEmployers: ["Ayush Export Promotion Council", "Zandu Ayush", "Dabur India"],
    recommendedInstitutionalAction: "Introduce curriculum module on heavy metal safety and regulatory export compliance.",
    interventionType: "CURRICULUM_INTERVENTION",
  },
  {
    id: "dem-telemedicine",
    skillName: "Tele-Ayurveda & Remote EHR Consultation",
    category: "Health Informatics",
    industryDemandPercent: 80,
    studentSupplyPercent: 58,
    gapPercent: 22,
    trendDirection: "RISING_FAST",
    yoyGrowthPercent: 54,
    topDemandingEmployers: ["e-Sanjeevani Ayush", "Apollo AyurVAID", "Private Tele-Clinics"],
    recommendedInstitutionalAction: "Host virtual simulation practicum on remote patient triaging and digital SOAP notes.",
    interventionType: "WORKSHOP",
  },
];

export const DEPARTMENT_READINESS_DATA: DepartmentReadinessScore[] = [
  {
    department: "Kayachikitsa (Internal Medicine)",
    sanskritName: "कायचिकित्सा विभाग",
    readinessScore: 84,
    studentCount: 65,
    criticalGapCount: 4,
    topDeficitSkill: "Inpatient EHR Integration",
  },
  {
    department: "Panchakarma (Detoxification & Longevity)",
    sanskritName: "पञ्चकर्म विभाग",
    readinessScore: 88,
    studentCount: 50,
    criticalGapCount: 2,
    topDeficitSkill: "Emergency Purvakarma Complications",
  },
  {
    department: "Dravyaguna & Rasashastra (Pharma & Formulation)",
    sanskritName: "द्रव्यगुण एवं रसशास्त्र विभाग",
    readinessScore: 71,
    studentCount: 45,
    criticalGapCount: 8,
    topDeficitSkill: "HPTLC Fingerprinting & Standardization",
  },
  {
    department: "Roganidana & Research Methodology",
    sanskritName: "रोगनिदान एवं अनुसंधान विभाग",
    readinessScore: 68,
    studentCount: 55,
    criticalGapCount: 11,
    topDeficitSkill: "GCP-Ayush Trials & Biostatistics",
  },
];

export class SkillDemandService {
  public static getDemandVsSupplyData(): SkillDemandItem[] {
    return INDUSTRY_SKILL_DEMAND_DATA;
  }

  public static getDepartmentReadiness(): DepartmentReadinessScore[] {
    return DEPARTMENT_READINESS_DATA;
  }

  public static getTopInstitutionalInterventions(): {
    skillName: string;
    gap: number;
    action: string;
    interventionType: string;
  }[] {
    return INDUSTRY_SKILL_DEMAND_DATA
      .filter((s) => s.gapPercent > 25)
      .map((s) => ({
        skillName: s.skillName,
        gap: s.gapPercent,
        action: s.recommendedInstitutionalAction,
        interventionType: s.interventionType,
      }));
  }
}
