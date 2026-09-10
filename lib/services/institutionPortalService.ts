/**
 * Vaidya Setu - Institution Portal Service Layer
 * Ministry of Ayush | All India Institute of Ayurveda (AIIA) | NCISM Accreditation
 *
 * Provides institutional intelligence for Ayurveda Colleges & Universities:
 * 1. Cohort Skill Heatmaps (Clinical 82%, Communication 79%, Panchakarma 64%, Research 42%, Documentation 38%)
 * 2. Automated Skill Gap Diagnostics (Top Gap: Research Documentation)
 * 3. AI-Driven Remedial Recommendations (Create Research Workshop)
 * 4. The Academia ↔ Industry Feedback Loop
 * 5. Cohort Scholar Rosters & Sub-competency Breakdowns
 * 6. Industry MoUs & Placement Outcomes
 * 7. Active Institutional Interventions & Workshop Management
 */

export interface SkillDomainScore {
  domain: string;
  score: number; // 0 - 100%
  status: "HIGH" | "MODERATE" | "CRITICAL";
  colorHex: string;
  badgeEmoji: "🟢" | "🟡" | "🔴";
  industryBenchmark: number; // Recruiter requirement percentage
  deficitPercentage: number; // industryBenchmark - score
  description: string;
  subCompetencies: {
    name: string;
    score: number;
    benchmark: number;
  }[];
}

export interface InstitutionProfile {
  id: string;
  name: string;
  code: string;
  directorName: string;
  directorTitle: string;
  email: string;
  phone: string;
  affiliation: string;
  ncismAccreditationRating: string; // e.g., "A++ (Grade 3.82 / 4.00)"
  totalEnrolledScholars: number;
  facultyGuidesCount: number;
  activeIndustryMoUs: number;
  placementConversionRate: number; // e.g., 84.6%
  ncismCriterionCompliance: number; // e.g., 94.2%
}

export interface IndustryMoUItem {
  id: string;
  partnerName: string;
  partnerType: "Pharma R&D" | "Hospital Chain" | "National Research Council" | "Wellness Enterprise";
  signedDate: string;
  expiryDate: string;
  status: "ACTIVE" | "RENEWAL_DUE" | "EXPIRING_SOON";
  recruitedScholarsCount: number;
  activeJointProjects: number;
  topDemandedSkill: string;
  annualStipendBudget: string;
}

export interface CohortScholarItem {
  id: string;
  name: string;
  degree: "BAMS Final Year" | "MD Ayurveda (Dravyaguna)" | "MD Ayurveda (Kayachikitsa)" | "PhD Scholar";
  registrationNo: string;
  overallScore: number;
  clinicalScore: number;
  communicationScore: number;
  panchakarmaScore: number;
  researchScore: number;
  documentationScore: number;
  needsResearchDocumentationWorkshop: boolean;
  assignedFacultyGuide: string;
}

export interface RemedialWorkshopItem {
  id: string;
  title: string;
  targetSkillGap: string;
  leadFacultyGuide: string;
  scheduledDate: string;
  durationHours: number;
  venue: string;
  targetCohortSize: number;
  enrolledScholarsCount: number;
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED";
  projectedSkillLift: number; // e.g. +35%
  modules: string[];
}

export interface FeedbackLoopStage {
  stage: number;
  title: string;
  subtitle: string;
  actor: "INDUSTRY" | "STUDENTS" | "INSTITUTION" | "FACULTY" | "OUTCOME";
  metric: string;
  status: "COMPLETED" | "ACTIVE" | "PENDING";
  description: string;
}

const STORAGE_KEY_PREFIX = "vaidya_institution_portal_v1";

export class InstitutionPortalService {
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

  // 1. Institution Profile
  public getProfile(): InstitutionProfile {
    return this.load<InstitutionProfile>("profile", {
      id: "inst-aiia-01",
      name: "All India Institute of Ayurveda (AIIA)",
      code: "AIIA-ND-DELHI-001",
      directorName: "Director Dr. Meera Nambiar",
      directorTitle: "Director & Professor of Dravyaguna",
      email: "institution@aiia.gov.in",
      phone: "+91 11 2695 0401",
      affiliation: "Autonomous Institute under Ministry of Ayush & NCISM Recognized",
      ncismAccreditationRating: "Grade A++ (NCISM Score: 3.86/4.00)",
      totalEnrolledScholars: 320,
      facultyGuidesCount: 24,
      activeIndustryMoUs: 12,
      placementConversionRate: 84.6,
      ncismCriterionCompliance: 94.2,
    });
  }

  // 2. Cohort Skill Heatmap (Exact requested data)
  public getSkillHeatmap(): SkillDomainScore[] {
    return this.load<SkillDomainScore[]>("skill_heatmap", [
      {
        domain: "Clinical",
        score: 82,
        status: "HIGH",
        colorHex: "#10b981", // green
        badgeEmoji: "🟢",
        industryBenchmark: 75,
        deficitPercentage: -7, // Surpassing benchmark by 7%
        description: "Exceptional mastery in Ayurvedic bedside diagnosis, Roganidana, Dosha-Dushya assessment, and classical formulations.",
        subCompetencies: [
          { name: "Nadi Pariksha & Pulse Velocity Diagnostics", score: 86, benchmark: 75 },
          { name: "Ashtavidha Pariksha & Tongue Diagnostics", score: 84, benchmark: 72 },
          { name: "Srotas & Dhatu Sarata Assessment", score: 80, benchmark: 70 },
          { name: "Dravyaguna Prescription Rationalization", score: 78, benchmark: 75 },
        ],
      },
      {
        domain: "Communication",
        score: 79,
        status: "HIGH",
        colorHex: "#10b981", // green
        badgeEmoji: "🟢",
        industryBenchmark: 70,
        deficitPercentage: -9, // Surpassing benchmark by 9%
        description: "Strong clinical empathy, bilingual patient counseling (Hindi/English), lifestyle modification guidance, and informed consent.",
        subCompetencies: [
          { name: "Patient History Elicitation & Empathy", score: 85, benchmark: 75 },
          { name: "Pathya-Apathya Diet Counseling", score: 82, benchmark: 70 },
          { name: "Informed Consent & Treatment Explanation", score: 76, benchmark: 68 },
          { name: "Inter-Professional Case Presentation", score: 73, benchmark: 65 },
        ],
      },
      {
        domain: "Panchakarma",
        score: 64,
        status: "MODERATE",
        colorHex: "#f59e0b", // yellow / amber
        badgeEmoji: "🟡",
        industryBenchmark: 70,
        deficitPercentage: 6, // Deficit of 6%
        description: "Moderate hands-on proficiency in Snehana-Swedana and Vamana; emerging gap in precision Basti timing and complication protocols.",
        subCompetencies: [
          { name: "Purvakarma (Deepana-Pachana & Snehapana)", score: 72, benchmark: 70 },
          { name: "Kashaya & Sneha Basti Preparation", score: 65, benchmark: 70 },
          { name: "Nasya & Shirodhara Clinical Execution", score: 68, benchmark: 68 },
          { name: "Panchakarma Vyapad (Complication) Protocols", score: 51, benchmark: 72 },
        ],
      },
      {
        domain: "Research",
        score: 42,
        status: "CRITICAL",
        colorHex: "#ef4444", // red
        badgeEmoji: "🔴",
        industryBenchmark: 75,
        deficitPercentage: 33, // Critical deficit of 33%
        description: "Significant deficiency in modern clinical study design, biostatistical testing (p-values/ANOVA), and Ayurgenomics methodologies.",
        subCompetencies: [
          { name: "Literature Synthesis & Systematic Review (PRISMA)", score: 48, benchmark: 72 },
          { name: "Biostatistics & Sample Size Determination", score: 36, benchmark: 70 },
          { name: "Good Clinical Practice (GCP Schedule Y) Compliance", score: 44, benchmark: 80 },
          { name: "Ayurgenomics & High-Throughput Biomarker Screening", score: 40, benchmark: 75 },
        ],
      },
      {
        domain: "Documentation",
        score: 38,
        status: "CRITICAL",
        colorHex: "#ef4444", // red
        badgeEmoji: "🔴",
        industryBenchmark: 78,
        deficitPercentage: 40, // Critical deficit of 40%
        description: "Acute gap in standardized electronic health records (SOAP notes), e-CRF clinical trial logging, and international reporting standards.",
        subCompetencies: [
          { name: "Standardized Clinical SOAP EHR Documentation", score: 42, benchmark: 80 },
          { name: "Electronic Case Report Forms (e-CRF) Data Logging", score: 34, benchmark: 82 },
          { name: "Adverse Drug Reaction (PvPI) Formal Reporting", score: 41, benchmark: 76 },
          { name: "CONSORT-Ayush Clinical Trial Manuscript Writing", score: 35, benchmark: 74 },
        ],
      },
    ]);
  }

  // 3. Automated Gap Diagnostic
  public getTopSkillGap() {
    return {
      gapName: "Research Documentation",
      compositeScore: 40, // average of Research (42%) and Documentation (38%)
      severity: "CRITICAL",
      industryDemandBenchmark: 78,
      cohortDeficitPercentage: 38,
      affectedScholarsCount: 48, // scholars scoring < 50% in this domain
      industryContext:
        "Top pharmaceutical partners (Dabur, Himalaya, CCRAS) report that 64% of shortlisted clinical residents lack verified proficiency in Electronic SOAP Documentation, GCP Trial Logs, and biostatistical synthesis.",
      actionRecommendation: {
        title: "Create Research Workshop",
        proposedTopic: "Hands-on Workshop: Electronic Research Documentation & GCP Protocols in Clinical Ayurveda",
        suggestedFacultyLead: "Prof. Dr. Anand Kulkarni (HOD Dravyaguna & Clinical Pharmacology, AIIA)",
        targetCohort: "BAMS Final Year & MD 1st Year Scholars (48 Priority Scholars)",
        projectedCompetencyLift: "+36% in Electronic Documentation within 14 Days",
      },
    };
  }

  // 4. Academia <-> Industry Feedback Loop Telemetry
  public getFeedbackLoopStages(): FeedbackLoopStage[] {
    return [
      {
        stage: 1,
        title: "Industry Demand Signal",
        subtitle: "Pharma & Clinical Trial Openings",
        actor: "INDUSTRY",
        metric: "78% Required In Research Documentation",
        status: "COMPLETED",
        description:
          "Dabur, CCRAS, and Himalaya post 24 high-stipend Clinical Residencies requiring verified SOAP and GCP logs.",
      },
      {
        stage: 2,
        title: "Scholar Competency Testing",
        subtitle: "Competency Passport Diagnostics",
        actor: "STUDENTS",
        metric: "320 Passports Evaluated",
        status: "COMPLETED",
        description:
          "Enrolled scholars complete AI diagnostics and practical logbook evaluations on Vaidya Setu.",
      },
      {
        stage: 3,
        title: "Institutional Heatmap",
        subtitle: "Real-time Diagnostic Detection",
        actor: "INSTITUTION",
        metric: "Research: 42% 🔴 | Doc: 38% 🔴",
        status: "ACTIVE",
        description:
          "College Dean & Administration alerted to critical deficit in Research Documentation via live heatmap.",
      },
      {
        stage: 4,
        title: "Remedial Intervention",
        subtitle: "Automated Workshop Commissioning",
        actor: "FACULTY",
        metric: "Prof. Dr. Anand Kulkarni Assigned",
        status: "ACTIVE",
        description:
          "Institution commissions hands-on masterclass targeting 48 low-scoring scholars.",
      },
      {
        stage: 5,
        title: "Closed-Loop Placement",
        subtitle: "Re-assessment & Industry Hiring",
        actor: "OUTCOME",
        metric: "Projected 88% Placement Rate",
        status: "PENDING",
        description:
          "Scholars achieve verified competency passports and unlock 1-click industry shortlisting.",
      },
    ];
  }

  // 5. Remedial Workshops Managed by Institution
  public getRemedialWorkshops(): RemedialWorkshopItem[] {
    return this.load<RemedialWorkshopItem[]>("remedial_workshops", [
      {
        id: "rem-ws-01",
        title: "Hands-on Workshop: Electronic Research Documentation & GCP Protocols in Clinical Ayurveda",
        targetSkillGap: "Research Documentation (Composite 40%)",
        leadFacultyGuide: "Prof. Dr. Anand Kulkarni",
        scheduledDate: "2026-09-24",
        durationHours: 16,
        venue: "AIIA Clinical Simulation Lab & Telemedicine Suites",
        targetCohortSize: 48,
        enrolledScholarsCount: 48,
        status: "SCHEDULED",
        projectedSkillLift: 36,
        modules: [
          "Module 1: Electronic Health Record SOAP Notes & Ayush ICD-11 SNOMED Coding",
          "Module 2: e-CRF Data Logging & CTRI Registry Protocols",
          "Module 3: Pharmacovigilance (PvPI) Adverse Event Reporting",
          "Module 4: CONSORT-Ayush Structured Manuscript Drafting",
        ],
      },
      {
        id: "rem-ws-02",
        title: "Intensive Practicum: Panchakarma Vyapad & Emergency Protocols",
        targetSkillGap: "Panchakarma (64%)",
        leadFacultyGuide: "Prof. Dr. Tanuja Nesari & Dr. S. K. Sharma",
        scheduledDate: "2026-10-12",
        durationHours: 12,
        venue: "Inpatient Panchakarma Suites, AIIA",
        targetCohortSize: 35,
        enrolledScholarsCount: 32,
        status: "SCHEDULED",
        projectedSkillLift: 22,
        modules: [
          "Basti Retainability & Sneha Vyapad Management",
          "Vamana Vegiki Complications & Immediate Resuscitation",
          "Sterilization & In-Process Asepsis Protocols",
        ],
      },
    ]);
  }

  // 6. Create / Commission Research Workshop (Completes Feedback Loop)
  public createResearchWorkshop(workshopData: {
    title: string;
    leadFacultyGuide: string;
    scheduledDate: string;
    durationHours: number;
    venue: string;
    targetCohortSize: number;
    modules: string[];
  }): RemedialWorkshopItem {
    const list = this.getRemedialWorkshops();
    const newWs: RemedialWorkshopItem = {
      id: `rem-ws-${Date.now()}`,
      title: workshopData.title,
      targetSkillGap: "Research Documentation",
      leadFacultyGuide: workshopData.leadFacultyGuide,
      scheduledDate: workshopData.scheduledDate,
      durationHours: workshopData.durationHours,
      venue: workshopData.venue,
      targetCohortSize: workshopData.targetCohortSize,
      enrolledScholarsCount: workshopData.targetCohortSize,
      status: "SCHEDULED",
      projectedSkillLift: 36,
      modules: workshopData.modules,
    };
    list.unshift(newWs);
    this.save("remedial_workshops", list);

    // Also simulate updating the Faculty Workshop roster in Academician service!
    if (this.isBrowser()) {
      try {
        const rawFac = localStorage.getItem("vaidya_faculty_portal_v1_workshops");
        const facWorkshops = rawFac ? JSON.parse(rawFac) : [];
        facWorkshops.unshift({
          id: `ws-inst-${Date.now()}`,
          workshopTitle: newWs.title,
          department: "Department of Dravyaguna & Clinical Pharmacology (Commissioned by AIIA Directorate)",
          venue: newWs.venue,
          mode: "Hybrid Clinical Simulation",
          date: newWs.scheduledDate,
          durationHours: newWs.durationHours,
          maxSeats: newWs.targetCohortSize,
          registeredAttendeesCount: newWs.targetCohortSize,
          registrationFee: "Complimentary (Institutional Sabbatical & Remedial Grant)",
          status: "UPCOMING",
          learningObjectives: newWs.modules,
          attendeesList: [
            { id: "att-1", name: "Dr. Aarav Sharma", institution: "AIIA New Delhi", role: "MD Scholar", checkedIn: false, certificateIssued: false },
            { id: "att-2", name: "Rohan Verma", institution: "AIIA New Delhi", role: "BAMS Final Year", checkedIn: false, certificateIssued: false },
          ],
        });
        localStorage.setItem("vaidya_faculty_portal_v1_workshops", JSON.stringify(facWorkshops));
      } catch (err) {
        console.warn("Could not sync with faculty workshops:", err);
      }
    }

    return newWs;
  }

  // 7. Industry MoUs
  public getIndustryMoUs(): IndustryMoUItem[] {
    return this.load<IndustryMoUItem[]>("industry_mous", [
      {
        id: "mou-01",
        partnerName: "Dabur Research & Development Foundation",
        partnerType: "Pharma R&D",
        signedDate: "2024-05-15",
        expiryDate: "2027-05-14",
        status: "ACTIVE",
        recruitedScholarsCount: 28,
        activeJointProjects: 4,
        topDemandedSkill: "Research Documentation (SOAP, GCP)",
        annualStipendBudget: "₹35,00,000",
      },
      {
        id: "mou-02",
        partnerName: "CCRAS Central Council for Research in Ayurvedic Sciences",
        partnerType: "National Research Council",
        signedDate: "2023-11-01",
        expiryDate: "2026-10-31",
        status: "RENEWAL_DUE",
        recruitedScholarsCount: 34,
        activeJointProjects: 6,
        topDemandedSkill: "Clinical Epidemiology & e-CRF",
        annualStipendBudget: "₹48,00,000",
      },
      {
        id: "mou-03",
        partnerName: "Himalaya Wellness Company",
        partnerType: "Pharma R&D",
        signedDate: "2025-01-20",
        expiryDate: "2028-01-19",
        status: "ACTIVE",
        recruitedScholarsCount: 16,
        activeJointProjects: 2,
        topDemandedSkill: "Pharmacovigilance (PvPI)",
        annualStipendBudget: "₹24,00,000",
      },
      {
        id: "mou-04",
        partnerName: "Arya Vaidya Sala Kottakkal",
        partnerType: "Hospital Chain",
        signedDate: "2024-08-10",
        expiryDate: "2027-08-09",
        status: "ACTIVE",
        recruitedScholarsCount: 20,
        activeJointProjects: 3,
        topDemandedSkill: "Classical Formulations & Panchakarma",
        annualStipendBudget: "₹28,00,000",
      },
    ]);
  }

  // 8. Enrolled Cohort Roster
  public getCohortScholars(): CohortScholarItem[] {
    return this.load<CohortScholarItem[]>("cohort_scholars", [
      {
        id: "sch-01",
        name: "Dr. Aarav Sharma",
        degree: "MD Ayurveda (Dravyaguna)",
        registrationNo: "AIIA-MD-2024-019",
        overallScore: 89,
        clinicalScore: 92,
        communicationScore: 86,
        panchakarmaScore: 78,
        researchScore: 48,
        documentationScore: 44,
        needsResearchDocumentationWorkshop: true,
        assignedFacultyGuide: "Prof. Dr. Anand Kulkarni",
      },
      {
        id: "sch-02",
        name: "Dr. Meera Patel",
        degree: "PhD Scholar",
        registrationNo: "AIIA-PHD-2023-004",
        overallScore: 94,
        clinicalScore: 90,
        communicationScore: 88,
        panchakarmaScore: 82,
        researchScore: 56,
        documentationScore: 52,
        needsResearchDocumentationWorkshop: false,
        assignedFacultyGuide: "Prof. Dr. Anand Kulkarni",
      },
      {
        id: "sch-03",
        name: "Rohan Verma",
        degree: "BAMS Final Year",
        registrationNo: "AIIA-BAMS-2022-044",
        overallScore: 74,
        clinicalScore: 84,
        communicationScore: 80,
        panchakarmaScore: 68,
        researchScore: 36,
        documentationScore: 32,
        needsResearchDocumentationWorkshop: true,
        assignedFacultyGuide: "Prof. Dr. Anand Kulkarni",
      },
      {
        id: "sch-04",
        name: "Dr. Ananya Joshi",
        degree: "MD Ayurveda (Kayachikitsa)",
        registrationNo: "AIIA-MD-2024-028",
        overallScore: 88,
        clinicalScore: 88,
        communicationScore: 82,
        panchakarmaScore: 74,
        researchScore: 42,
        documentationScore: 38,
        needsResearchDocumentationWorkshop: true,
        assignedFacultyGuide: "Dr. Bhavna Dass",
      },
      {
        id: "sch-05",
        name: "Priya Nair",
        degree: "BAMS Final Year",
        registrationNo: "AIIA-BAMS-2022-061",
        overallScore: 78,
        clinicalScore: 82,
        communicationScore: 78,
        panchakarmaScore: 62,
        researchScore: 40,
        documentationScore: 34,
        needsResearchDocumentationWorkshop: true,
        assignedFacultyGuide: "Dr. Vikram Seth",
      },
      {
        id: "sch-06",
        name: "Dr. Manan Dave",
        degree: "MD Ayurveda (Dravyaguna)",
        registrationNo: "AIIA-MD-2024-012",
        overallScore: 86,
        clinicalScore: 86,
        communicationScore: 81,
        panchakarmaScore: 70,
        researchScore: 44,
        documentationScore: 40,
        needsResearchDocumentationWorkshop: true,
        assignedFacultyGuide: "Prof. Dr. Anand Kulkarni",
      },
    ]);
  }
}
