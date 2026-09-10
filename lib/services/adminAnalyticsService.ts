/**
 * Vaidya Setu - Admin & Ministry Analytics Service Layer
 * Ministry of Ayush | National Commission for Indian System of Medicine (NCISM) | AIIA
 *
 * Provides national-level intelligence across the 3 stakeholder tiers mandated by the Problem Statement:
 * 1. Core National KPIs (Total Students, Total Institutions, Industry Partners, Internships, Research Projects, Jobs, Verified Competencies, Placement Outcomes)
 * 2. Industry Skill Demand Engine (Clinical Documentation 82%, Patient Communication 77%, Research 64%, Digital Documentation 58%)
 * 3. Analytics for Institutions (NCISM Accreditation distribution, inter-college benchmarking, attestation velocity)
 * 4. Analytics for Industries (Hiring pipeline throughput, sector-wise demand, residency conversion)
 * 5. Analytics for Policymakers (State-wise workforce readiness, Ayush Grid digital standards, statutory curriculum alerts)
 */

export interface AdminKpiMetrics {
  totalStudents: number; // 42,850
  totalInstitutions: number; // 540
  industryPartners: number; // 1,420
  internships: number; // 3,890
  researchProjects: number; // 850
  jobs: number; // 2,140
  verifiedCompetencies: number; // 184,200
  placementOutcomes: number; // 87.4%
}

export interface IndustrySkillDemandMetric {
  skillName: string;
  industryDemand: number; // Percentage demanded by industry recruiters
  studentSupply: number; // Current national cohort average readiness
  gapDelta: number; // industryDemand - studentSupply
  urgencyLevel: "CRITICAL" | "MODERATE" | "BALANCED";
  topEmployersRequiring: string[];
  recommendedPolicyAction: string;
}

export interface InstitutionRankItem {
  id: string;
  name: string;
  state: string;
  enrolledScholars: number;
  ncismRating: string;
  attestationSpeedDays: number;
  placementRate: number;
  researchOutputScore: number;
}

export interface IndustrySectorItem {
  sector: string;
  percentage: number;
  activePostings: number;
  avgStipendMonthly: string;
  topSkillDemanded: string;
}

export interface StateWorkforceItem {
  state: string;
  totalInstitutions: number;
  graduatingScholars: number;
  readinessIndex: number; // 0-100%
  ayushGridCompliance: number; // 0-100%
  dominantSector: string;
}

export interface PolicyCurriculumAlert {
  id: string;
  title: string;
  severity: "URGENT" | "RECOMMENDED" | "MONITORING";
  statutoryTarget: "NCISM UG/PG Board" | "Ministry of Ayush" | "Ayush Grid Mission";
  evidence: string;
  proposedIntervention: string;
  affectedScholarsCount: number;
}

const STORAGE_KEY_PREFIX = "vaidya_admin_portal_v1";

export class AdminAnalyticsService {
  private isBrowser(): boolean {
    return typeof window !== "undefined";
  }

  private load<T>(key: string, defaultData: T): T {
    if (!this.isBrowser()) return defaultData;
    try {
      const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}_${key}`);
      return raw ? JSON.parse(raw) : defaultData;
    } catch {
      return defaultData;
    }
  }

  private save<T>(key: string, data: T): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}_${key}`, JSON.stringify(data));
    } catch (err) {
      console.warn(`Failed to persist ${key} to localStorage:`, err);
    }
  }

  // 1. Core National KPIs
  public getNationalKpis(): AdminKpiMetrics {
    return this.load<AdminKpiMetrics>("national_kpis", {
      totalStudents: 42850,
      totalInstitutions: 540,
      industryPartners: 1420,
      internships: 3890,
      researchProjects: 850,
      jobs: 2140,
      verifiedCompetencies: 184200,
      placementOutcomes: 87.4,
    });
  }

  // 2. Industry Skill Demand (Exact requested metrics)
  public getIndustrySkillDemand(): IndustrySkillDemandMetric[] {
    return this.load<IndustrySkillDemandMetric[]>("skill_demand", [
      {
        skillName: "Clinical Documentation",
        industryDemand: 82, // 82%
        studentSupply: 54,
        gapDelta: 28,
        urgencyLevel: "CRITICAL",
        topEmployersRequiring: ["Dabur Research", "CCRAS Clinical Trials", "AIIA Hospital", "Patanjali R&D"],
        recommendedPolicyAction: "Mandate Electronic SOAP & EHR documentation modules in BAMS rotational internships.",
      },
      {
        skillName: "Patient Communication",
        industryDemand: 77, // 77%
        studentSupply: 74,
        gapDelta: 3,
        urgencyLevel: "BALANCED",
        topEmployersRequiring: ["Kerala Ayurveda", "Arya Vaidya Sala", "Medanta Ayush", "Apollo AyurVAID"],
        recommendedPolicyAction: "Sustain clinical empathy & bilingual counseling workshops in OPD rotations.",
      },
      {
        skillName: "Research",
        industryDemand: 64, // 64%
        studentSupply: 41,
        gapDelta: 23,
        urgencyLevel: "CRITICAL",
        topEmployersRequiring: ["Himalaya Wellness", "CSIR-IGIB", "Dabur R&D", "CCRAS"],
        recommendedPolicyAction: "Introduce mandatory Ayurgenomics & biostatistical clinical study design in MD/MS curricula.",
      },
      {
        skillName: "Digital Documentation",
        industryDemand: 58, // 58%
        studentSupply: 36,
        gapDelta: 22,
        urgencyLevel: "CRITICAL",
        topEmployersRequiring: ["Ayush Grid Mission", "e-Aushadhi Portal", "HealthQuad Ventures", "AIIA Telemedicine"],
        recommendedPolicyAction: "Enforce national training on ICD-11 NAMASTE coding and e-CRF clinical registry reporting.",
      },
    ]);
  }

  // 3. Analytics for Institutions (Academic Leadership & Deans)
  public getInstitutionAnalytics() {
    const leaderboard: InstitutionRankItem[] = [
      {
        id: "inst-01",
        name: "All India Institute of Ayurveda (AIIA), New Delhi",
        state: "Delhi",
        enrolledScholars: 320,
        ncismRating: "A++ (3.86/4.00)",
        attestationSpeedDays: 1.8,
        placementRate: 94.2,
        researchOutputScore: 92,
      },
      {
        id: "inst-02",
        name: "National Institute of Ayurveda (NIA), Jaipur",
        state: "Rajasthan",
        enrolledScholars: 450,
        ncismRating: "A++ (3.81/4.00)",
        attestationSpeedDays: 2.1,
        placementRate: 91.5,
        researchOutputScore: 88,
      },
      {
        id: "inst-03",
        name: "Institute of Teaching & Research in Ayurveda (ITRA), Jamnagar",
        state: "Gujarat",
        enrolledScholars: 380,
        ncismRating: "A+ (3.74/4.00)",
        attestationSpeedDays: 2.4,
        placementRate: 89.0,
        researchOutputScore: 86,
      },
      {
        id: "inst-04",
        name: "Faculty of Ayurveda, Banaras Hindu University (BHU), Varanasi",
        state: "Uttar Pradesh",
        enrolledScholars: 290,
        ncismRating: "A+ (3.70/4.00)",
        attestationSpeedDays: 2.6,
        placementRate: 88.4,
        researchOutputScore: 84,
      },
      {
        id: "inst-05",
        name: "Govt Ayurveda College, Thiruvananthapuram",
        state: "Kerala",
        enrolledScholars: 240,
        ncismRating: "A (3.58/4.00)",
        attestationSpeedDays: 2.9,
        placementRate: 86.8,
        researchOutputScore: 79,
      },
    ];

    return {
      averageAttestationTurnaroundDays: 2.4,
      totalAccreditedColleges: 540,
      gradeADistributionPercentage: 68.4,
      remedialFeedbackLoopAdoption: 78.2, // % of colleges using the automated workshop loop
      interCollegeLeaderboard: leaderboard,
      accreditationDistribution: [
        { grade: "A++ (3.75 - 4.00)", count: 48, percentage: 8.9 },
        { grade: "A+ (3.50 - 3.74)", count: 184, percentage: 34.1 },
        { grade: "A (3.00 - 3.49)", count: 212, percentage: 39.3 },
        { grade: "B++ / B (2.50 - 2.99)", count: 96, percentage: 17.7 },
      ],
    };
  }

  // 4. Analytics for Industries (Pharma, Hospitals & Recruiters)
  public getIndustryAnalytics() {
    const sectors: IndustrySectorItem[] = [
      {
        sector: "Ayurvedic Pharma R&D & Formulations",
        percentage: 45,
        activePostings: 960,
        avgStipendMonthly: "₹38,500",
        topSkillDemanded: "Clinical Documentation (82%) & HPTLC",
      },
      {
        sector: "Ayush Tertiary Care Hospitals & Clinical Residencies",
        percentage: 35,
        activePostings: 750,
        avgStipendMonthly: "₹42,000",
        topSkillDemanded: "Patient Communication (77%) & SOAP EHR",
      },
      {
        sector: "Integrative Wellness, Panchakarma Resorts & Telemedicine",
        percentage: 20,
        activePostings: 430,
        avgStipendMonthly: "₹32,000",
        topSkillDemanded: "Digital Documentation (58%) & Dietetics",
      },
    ];

    return {
      averageTimeToHireDays: 14.2,
      shortlistToOfferRatio: "68.5%",
      totalActiveCorporateMoUs: 820,
      corporateSponsorshipVolume: "₹18.4 Crores",
      industrySectors: sectors,
      topHiringEnterprises: [
        { name: "Dabur Research Foundation", activeHires: 142, rating: "4.9/5" },
        { name: "CCRAS Central Council", activeHires: 188, rating: "4.8/5" },
        { name: "Himalaya Wellness Company", activeHires: 98, rating: "4.8/5" },
        { name: "Arya Vaidya Sala Kottakkal", activeHires: 115, rating: "4.9/5" },
        { name: "Patanjali Research Institute", activeHires: 104, rating: "4.7/5" },
      ],
    };
  }

  // 5. Analytics for Policymakers (Ministry of Ayush & Statutory Bodies)
  public getPolicymakerAnalytics() {
    const stateWorkforce: StateWorkforceItem[] = [
      { state: "Delhi (NCR)", totalInstitutions: 14, graduatingScholars: 2400, readinessIndex: 91, ayushGridCompliance: 88, dominantSector: "Clinical R&D" },
      { state: "Maharashtra", totalInstitutions: 82, graduatingScholars: 6800, readinessIndex: 88, ayushGridCompliance: 82, dominantSector: "Pharma Manufacturing" },
      { state: "Kerala", totalInstitutions: 24, graduatingScholars: 2200, readinessIndex: 89, ayushGridCompliance: 86, dominantSector: "Classical Panchakarma" },
      { state: "Gujarat", totalInstitutions: 44, graduatingScholars: 3900, readinessIndex: 86, ayushGridCompliance: 80, dominantSector: "Formulations & Quality" },
      { state: "Uttar Pradesh", totalInstitutions: 94, graduatingScholars: 7500, readinessIndex: 82, ayushGridCompliance: 74, dominantSector: "Public Health & OPD" },
      { state: "Karnataka", totalInstitutions: 68, graduatingScholars: 5600, readinessIndex: 85, ayushGridCompliance: 79, dominantSector: "Integrative Medicine" },
    ];

    const alerts: PolicyCurriculumAlert[] = [
      {
        id: "pol-01",
        title: "National Deficit in Clinical Documentation (82% Industry Demand vs 54% Student Supply)",
        severity: "URGENT",
        statutoryTarget: "NCISM UG/PG Board",
        evidence: "Recruiters reject 46% of candidates on clinical trial audits due to absence of standardized electronic SOAP notes.",
        proposedIntervention: "Issue national directive to integrate 16-hour electronic SOAP documentation training in BAMS 4th year practical syllabi.",
        affectedScholarsCount: 18400,
      },
      {
        id: "pol-02",
        title: "Ayush Grid EHR & SNOMED CT Integration Gap in Regional Ayurveda Colleges",
        severity: "RECOMMENDED",
        statutoryTarget: "Ayush Grid Mission",
        evidence: "Only 36% of tier-2 colleges currently log electronic patient records with unified NAMASTE ICD-11 codes.",
        proposedIntervention: "Distribute subsidized Vaidya Setu Edge EHR terminals to 240 state-run Ayurvedic dispensaries and colleges.",
        affectedScholarsCount: 12500,
      },
      {
        id: "pol-03",
        title: "Faculty Research Sabbatical Uptake Under-utilization (6-Month Scheme)",
        severity: "MONITORING",
        statutoryTarget: "Ministry of Ayush",
        evidence: "Only 14% of eligible associate professors currently leverage the NCISM industry sabbatical grant scheme.",
        proposedIntervention: "Incentivize CAS professorial promotions by granting 20 mandatory academic points for verified corporate sabbaticals.",
        affectedScholarsCount: 4200,
      },
    ];

    return {
      nationalAyushGridAdoption: 74.2, // %
      totalAyushWorkforceEmployedAnnual: 37450,
      nationalResearchGrantDisbursed: "₹142.5 Crores",
      nationalPatentYieldCount: 148,
      stateWorkforceDistribution: stateWorkforce,
      statutoryCurriculumAlerts: alerts,
    };
  }
}
