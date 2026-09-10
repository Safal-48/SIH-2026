/**
 * Vaidya Setu - Academician / Faculty Portal Service Layer
 * Ministry of Ayush | All India Institute of Ayurveda (AIIA) | NCISM
 *
 * Provides comprehensive enterprise services for Ayush Faculty & Research Supervisors:
 * 1. Faculty Dashboard & Profile Analytics
 * 2. Faculty Internship (Industry Sabbaticals & Immersion)
 * 3. Industrial Training (Advanced Laboratory & GMP Protocols)
 * 4. FDP (Faculty Development Programs & NCISM Credit Bank)
 * 5. Research Collaboration (Academia-Industry Joint R&D & MoUs)
 * 6. Consultancy (Technical Advisory, Formulation R&D & 70/30 Revenue Sharing)
 * 7. Guest Lectures (Keynotes, CMEs, Honorarium & Slide Decks)
 * 8. Workshops (Faculty-led Hands-on Clinical & Lab Masterclasses)
 * 9. Mentorship (PG Thesis Guidance, Intern Roster & Digital Competency Attestation)
 * 10. Live Projects (Supervised Student Real-World Research & Industry Teams)
 */

export interface FacultyProfile {
  id: string;
  fullName: string;
  title: string;
  designation: string;
  department: string;
  institution: string;
  email: string;
  phone: string;
  ncismGuideId: string;
  orcidId: string;
  scopusId: string;
  avatarText: string;
  specialization: string[];
  totalPublications: number;
  totalCitations: number;
  hIndex: number;
  activeMenteesCount: number;
  totalConsultancyVolume: string;
  earnedCpeCredits: number;
  verifiedStudentPassports: number;
}

// 2. Faculty Internship (Sabbatical Immersion)
export interface FacultyInternship {
  id: string;
  title: string;
  organization: string;
  department: string;
  location: string;
  duration: string; // e.g., "3 Months", "6 Months"
  stipend: string; // e.g., "₹85,000 / month sabbatical grant"
  status: "OFFERED" | "APPLIED" | "NOC_PENDING" | "APPROVED" | "IN_PROGRESS" | "COMPLETED";
  sabbaticalLeaveApproved: boolean;
  hostMentor: {
    name: string;
    designation: string;
    email: string;
  };
  objectives: string[];
  prerequisites: string[];
  applicationDeadline: string;
  appliedDate?: string;
  startDate?: string;
  endDate?: string;
  logbookEntriesCount: number;
}

// 3. Industrial Training
export interface IndustrialTraining {
  id: string;
  programTitle: string;
  provider: string; // e.g. "Shimadzu Analytical Excellence Centre & Dabur"
  domain: "Analytical Lab" | "Clinical GCP" | "GMP Manufacturing" | "AI & Informatics" | "Regulatory Affairs";
  modality: "Hands-on Lab" | "Hybrid Masterclass" | "Industrial In-Plant";
  location: string;
  durationHours: number;
  cpeCredits: number; // NCISM Continuing Professional Education Credits
  status: "ENROLLED" | "IN_PROGRESS" | "COMPLETED" | "UPCOMING";
  progressPercentage: number;
  startDate: string;
  endDate: string;
  certificateUrl?: string;
  certificateHash?: string;
  modules: {
    title: string;
    completed: boolean;
    hours: number;
  }[];
  skillsAcquired: string[];
}

// 4. Faculty Development Program (FDP)
export interface FacultyFDP {
  id: string;
  title: string;
  sanctioningBody: "NCISM" | "AICTE" | "Ministry of Ayush" | "UGC-HRDC";
  hostingInstitute: string;
  coordinator: string;
  mode: "Virtual Synchronous" | "Residential Immersion" | "Blended";
  durationDays: number;
  creditPoints: number;
  status: "ENROLLED" | "ACTIVE" | "COMPLETED" | "RECOMMENDED";
  completionDate?: string;
  certificateIssued: boolean;
  certificateId?: string;
  themes: string[];
  assignmentsCount: number;
  completedAssignments: number;
}

// 5. Research Collaboration
export interface ResearchCollaboration {
  id: string;
  projectTitle: string;
  collaboratingPartner: string; // e.g. "Dabur Research Foundation", "CCRAS", "CSIR-IGIB"
  partnerType: "Industry Pharma" | "National Research Council" | "Premier Institute (IIT/AIIMS)";
  principalInvestigator: string;
  coInvestigators: string[];
  sanctionedBudget: string; // e.g. "₹45,00,000"
  utilizedBudget: string; // e.g. "₹28,50,000"
  durationMonths: number;
  ethicsClearanceStatus: "CLEARED" | "UNDER_REVIEW" | "PENDING_SUBMISSION";
  iecApprovalNumber?: string;
  mouStatus: "SIGNED" | "LEGAL_REVIEW" | "DRAFT";
  currentPhase: "Proposal" | "Lab Standardization" | "Clinical Validation" | "Data Synthesis" | "Publishing";
  progress: number; // 0-100%
  milestones: {
    id: string;
    name: string;
    targetDate: string;
    status: "COMPLETED" | "IN_PROGRESS" | "PENDING";
  }[];
  startDate: string;
  targetEndDate: string;
}

// 6. Consultancy Project
export interface ConsultancyProject {
  id: string;
  clientName: string;
  clientCategory: "Ayush Pharma" | "Wellness Resort Chain" | "HealthTech Startup" | "Nutraceutical";
  projectScope: string;
  totalConsultancyFee: number; // In INR e.g. 600000 (₹6 Lakhs)
  facultySharePercentage: number; // 70%
  institutionalCorpusSharePercentage: number; // 30%
  ndaSigned: boolean;
  status: "ACTIVE" | "INVOICED" | "PROPOSAL_PENDING" | "COMPLETED";
  startDate: string;
  deliveryDeadline: string;
  deliverables: {
    name: string;
    dueDate: string;
    isDelivered: boolean;
  }[];
  invoices: {
    invoiceNo: string;
    amount: number;
    status: "PAID" | "PENDING";
    date: string;
  }[];
}

// 7. Guest Lecture
export interface GuestLecture {
  id: string;
  eventTitle: string;
  invitingOrganization: string;
  location: string;
  mode: "Keynote (In-Person)" | "Webinar (Virtual)" | "CME Masterclass";
  date: string;
  timeSlot: string;
  topicTitle: string;
  honorarium: string; // e.g. "₹25,000 + Travel & Stay"
  status: "INVITATION_RECEIVED" | "ACCEPTED" | "COMPLETED" | "RESCHEDULED";
  estimatedAudience: number;
  slidesDeckUrl?: string;
  recordingUrl?: string;
  feedbackScore?: number; // out of 5.0
}

// 8. Workshop
export interface FacultyWorkshop {
  id: string;
  workshopTitle: string;
  department: string;
  venue: string;
  mode: "In-Person Hands-On" | "Hybrid Clinical Simulation";
  date: string;
  durationHours: number;
  maxSeats: number;
  registeredAttendeesCount: number;
  registrationFee: string; // e.g. "₹1,500" or "Complimentary (Institutional)"
  status: "UPCOMING" | "LIVE_TODAY" | "COMPLETED";
  learningObjectives: string[];
  attendeesList: {
    id: string;
    name: string;
    institution: string;
    role: string;
    checkedIn: boolean;
    certificateIssued: boolean;
  }[];
}

// 9. Mentorship
export interface MenteeScholar {
  id: string;
  name: string;
  degree: "BAMS (Final Year)" | "MD Ayurveda (Dravyaguna)" | "PhD Scholar";
  institution: string;
  thesisTopic: string;
  currentMilestone: string;
  overallCompetencyScore: number;
  passportHash: string;
  avatarText: string;
  pendingVerificationsCount: number;
  recentObservations: {
    id: string;
    procedureName: string;
    date: string;
    patientContext: string;
    status: "PENDING_FACULTY_SIGN" | "VERIFIED" | "NEEDS_REVISION";
    notes?: string;
  }[];
  nextScheduledReview: string;
}

// 10. Live Project
export interface FacultyLiveProject {
  id: string;
  title: string;
  sponsor: string; // e.g., "Ministry of Ayush / Dabur Collaborative"
  domain: "Clinical Pharmacology" | "Phytochemistry" | "AI Diagnostics" | "Formulation Standardization";
  stage: "Proposal" | "Literature Review" | "Lab Trials" | "Clinical Validation" | "Final Report";
  progressPercentage: number;
  leadStudentName: string;
  teamMembers: {
    studentId: string;
    studentName: string;
    role: "Lead Research Fellow" | "Bio-analyst" | "Clinical Data Collector" | "Literature Synthesizer";
  }[];
  tasks: {
    id: string;
    title: string;
    assignedTo: string;
    dueDate: string;
    isDone: boolean;
  }[];
  budget: string;
  startDate: string;
  expectedCompletion: string;
}

// Supervisor Verification Task in Dashboard Queue
export interface SupervisorVerificationItem {
  id: string;
  menteeId: string;
  menteeName: string;
  degree: string;
  competencyDomain: string;
  evidenceTitle: string;
  submittedDate: string;
  matchScore: number;
  notes: string;
  type: "LOGBOOK_PROCEDURE" | "INTERNSHIP_NOC" | "PASSPORT_ATTESTATION";
}

const STORAGE_KEY_PREFIX = "vaidya_faculty_portal_v1";

export class AcademicianPortalService {
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

  // 1. Profile & Analytics
  public getProfile(): FacultyProfile {
    return this.load<FacultyProfile>("profile", {
      id: "fac-prof-01",
      fullName: "Prof. Dr. Anand Kulkarni",
      title: "Prof. Dr. Anand Kulkarni, MD, PhD (Ayurveda)",
      designation: "Professor & Head of Department",
      department: "Dravyaguna Vijnana & Clinical Pharmacology",
      institution: "All India Institute of Ayurveda (AIIA), New Delhi",
      email: "academician@aiia.gov.in",
      phone: "+91 98112 45678",
      ncismGuideId: "NCISM-PG-GUIDE-DL-2018-0442",
      orcidId: "0000-0002-8419-710X",
      scopusId: "57218904123",
      avatarText: "AK",
      specialization: [
        "Dravyaguna Vijnana (Ayurvedic Pharmacology)",
        "Herbal Standardization & HPTLC Profiling",
        "Prakriti-guided Clinical Trials",
        "Pharmacovigilance of ASU Drugs",
      ],
      totalPublications: 48,
      totalCitations: 1420,
      hIndex: 19,
      activeMenteesCount: 18,
      totalConsultancyVolume: "₹24,50,000",
      earnedCpeCredits: 140,
      verifiedStudentPassports: 94,
    });
  }

  // 2. Faculty Internships (Sabbaticals)
  public getInternships(): FacultyInternship[] {
    return this.load<FacultyInternship[]>("internships", [
      {
        id: "fac-int-01",
        title: "Executive R&D Sabbatical: High-Throughput Botanical Profiling & Fingerprinting",
        organization: "Dabur Research & Development Centre",
        department: "Analytical Chemistry & Bio-active Discovery",
        location: "Ghaziabad, National Capital Region",
        duration: "3 Months (Sabbatical Deputation)",
        stipend: "₹85,000 / month industry grant",
        status: "IN_PROGRESS",
        sabbaticalLeaveApproved: true,
        hostMentor: {
          name: "Dr. Rajesh Varma",
          designation: "VP & Head of Analytical Sciences",
          email: "r.varma@dabur.com",
        },
        objectives: [
          "Validate LC-MS/MS marker quantification for Guduchi (Tinospora cordifolia) formulations.",
          "Develop unified HPLC fingerprinting SOPs for NCISM Pharmacopoeia committees.",
          "Train industry chemists on classical Dravyaguna Rasa-Guna-Virya-Vipaka pharmacological correlates.",
        ],
        prerequisites: ["MD/PhD in Dravyaguna/Rasashastra", "Prior chromatographic experience"],
        applicationDeadline: "2026-06-30",
        appliedDate: "2026-07-05",
        startDate: "2026-08-01",
        endDate: "2026-10-31",
        logbookEntriesCount: 8,
      },
      {
        id: "fac-int-02",
        title: "Translational Clinical Trials Sabbatical in Metabolic Syndrome",
        organization: "CCRAS Central Council for Research in Ayurvedic Sciences",
        department: "Clinical Epidemiology & Biostatistics Cell",
        location: "Janakpuri, New Delhi",
        duration: "6 Months",
        stipend: "₹95,000 / month sabbatical research fellowship",
        status: "APPROVED",
        sabbaticalLeaveApproved: true,
        hostMentor: {
          name: "Dr. Sulochana Rao",
          designation: "Director General CCRAS & Senior Scientist",
          email: "director.ccras@gov.in",
        },
        objectives: [
          "Protocol drafting for Phase-II multi-centric trial on Triphala-Guggulu lipid lowering actions.",
          "Audit clinical data repositories conforming to CDISC standards.",
        ],
        prerequisites: ["GCP Certification", "Institutional NOC"],
        applicationDeadline: "2026-11-30",
        appliedDate: "2026-08-15",
        startDate: "2026-12-01",
        endDate: "2027-05-31",
        logbookEntriesCount: 0,
      },
      {
        id: "fac-int-03",
        title: "Industry Immersion: Classical Fermentation & Quality Standards (Asava-Arishta)",
        organization: "Arya Vaidya Sala Kottakkal",
        department: "Centre for Medicinal Plants & Formulations",
        location: "Kottakkal, Malappuram, Kerala",
        duration: "1 Month (Intensive)",
        stipend: "₹50,000 + Executive On-Site Guest Suite",
        status: "OFFERED",
        sabbaticalLeaveApproved: false,
        hostMentor: {
          name: "Dr. P. Madhavan Kutty",
          designation: "Chief Technical Officer & Senior Vaidya",
          email: "cto@aryavaidyasala.com",
        },
        objectives: [
          "Study microbiological dynamics during Dhataki pushpa induced traditional fermentation.",
          "Incorporate process analytics into PG curriculum.",
        ],
        prerequisites: ["MD in Rasashastra & Bhaishajya Kalpana"],
        applicationDeadline: "2026-10-15",
        logbookEntriesCount: 0,
      },
      {
        id: "fac-int-04",
        title: "Genomics & Bioassay Screening for Anti-Inflammatory Ayurvedic Botanicals",
        organization: "Patanjali Research Foundation",
        department: "Drug Discovery & Cell Biology Lab",
        location: "Haridwar, Uttarakhand",
        duration: "2 Months",
        stipend: "₹75,000 / month",
        status: "OFFERED",
        sabbaticalLeaveApproved: false,
        hostMentor: {
          name: "Dr. Anurag Varshney",
          designation: "Chief Scientist & Head of Drug Discovery",
          email: "a.varshney@patanjali.res.in",
        },
        objectives: [
          "In-vitro macrophage NF-kB screening of classical Dashamoola extracts.",
          "Establish high-throughput screening protocols for faculty researchers.",
        ],
        prerequisites: ["PhD in Biological Sciences / MD Ayurveda"],
        applicationDeadline: "2026-12-15",
        logbookEntriesCount: 0,
      },
    ]);
  }

  public applyInternship(internshipId: string): boolean {
    const list = this.getInternships();
    const item = list.find((i) => i.id === internshipId);
    if (!item) return false;
    item.status = "NOC_PENDING";
    item.appliedDate = new Date().toISOString().split("T")[0];
    this.save("internships", list);
    return true;
  }

  // 3. Industrial Training
  public getIndustrialTrainings(): IndustrialTraining[] {
    return this.load<IndustrialTraining[]>("industrial_trainings", [
      {
        id: "ind-tr-01",
        programTitle: "Advanced HPTLC Fingerprinting & Phytochemical Standardization",
        provider: "Shimadzu Analytical Excellence Centre & Dabur",
        domain: "Analytical Lab",
        modality: "Hands-on Lab",
        location: "Analytical Lab Suites, Gurgaon, Haryana",
        durationHours: 40,
        cpeCredits: 20,
        status: "COMPLETED",
        progressPercentage: 100,
        startDate: "2026-05-10",
        endDate: "2026-05-15",
        certificateUrl: "/certificates/hptlc-standardization-2026.pdf",
        certificateHash: "0x89ab...c120",
        modules: [
          { title: "Stationary & Mobile Phase Optimization for Barks & Resins", completed: true, hours: 8 },
          { title: "Densitometric Scanning at UV 254nm & 366nm", completed: true, hours: 10 },
          { title: "Derivatization Reagents (Vanillin-Sulfuric & Anisaldehyde)", completed: true, hours: 10 },
          { title: "Method Validation as per ICH Q2(R1) Guidelines", completed: true, hours: 12 },
        ],
        skillsAcquired: ["HPTLC Camag VisionCATS", "Marker Quantification", "Method Validation", "Spectral Matching"],
      },
      {
        id: "ind-tr-02",
        programTitle: "Good Clinical Practice (GCP) & Schedule Y/CT-2019 Compliance in AYUSH Trials",
        provider: "Clinical Development Services Agency (CDSA) & Ministry of Ayush",
        domain: "Clinical GCP",
        modality: "Hybrid Masterclass",
        location: "Virtual & AIIA Clinical Trial Centre",
        durationHours: 32,
        cpeCredits: 16,
        status: "COMPLETED",
        progressPercentage: 100,
        startDate: "2026-06-01",
        endDate: "2026-06-08",
        certificateUrl: "/certificates/ayush-gcp-compliance-2026.pdf",
        certificateHash: "0x77cd...e491",
        modules: [
          { title: "Ethics Committees Responsibilities & ICMR 2017 Guidelines", completed: true, hours: 8 },
          { title: "Informed Consent Process in Ayurvedic Clinical Interventions", completed: true, hours: 8 },
          { title: "Investigator's Brochure & ASU Classical Formulation Safety", completed: true, hours: 8 },
          { title: "Adverse Drug Reaction (ADR) Reporting & PvPI Protocols", completed: true, hours: 8 },
        ],
        skillsAcquired: ["AYUSH GCP Protocol Writing", "SAE Reporting", "Electronic Case Report Forms (eCRF)", "CTRI Registration"],
      },
      {
        id: "ind-tr-03",
        programTitle: "WHO-GMP Standards in Industrial ASU Formulation Manufacturing",
        provider: "Himalaya Wellness & Confederation of Indian Industry (CII)",
        domain: "GMP Manufacturing",
        modality: "Industrial In-Plant",
        location: "Makali Campus, Bengaluru, Karnataka",
        durationHours: 48,
        cpeCredits: 24,
        status: "IN_PROGRESS",
        progressPercentage: 65,
        startDate: "2026-08-10",
        endDate: "2026-09-25",
        modules: [
          { title: "Clean Room HVAC Classification (Class 10,000 for Bhasma Processing)", completed: true, hours: 12 },
          { title: "Water System Validation & Purified Water Generation", completed: true, hours: 12 },
          { title: "In-Process Quality Controls (IPQC) for Vati & Gutika Tablet Compression", completed: true, hours: 12 },
          { title: "Automated Packaging Validation & Barcoding Integrity", completed: false, hours: 12 },
        ],
        skillsAcquired: ["WHO-GMP Audit Preparedness", "IPQC Benchmarking", "BMR Review", "HVAC Validation"],
      },
      {
        id: "ind-tr-04",
        programTitle: "Ayush Bio-Informatics & Machine Learning Models for Prakriti Phenotyping",
        provider: "CSIR-Institute of Genomics & Integrative Biology (IGIB)",
        domain: "AI & Informatics",
        modality: "Hybrid Masterclass",
        location: "South Campus, New Delhi",
        durationHours: 36,
        cpeCredits: 18,
        status: "UPCOMING",
        progressPercentage: 0,
        startDate: "2026-10-10",
        endDate: "2026-10-22",
        modules: [
          { title: "Ayurgenomics Data Repositories & Genome-Wide Associations", completed: false, hours: 10 },
          { title: "Machine Learning Classifiers for Ayurvedic Pulse & Tongue Diagnostics", completed: false, hours: 12 },
          { title: "Network Pharmacology & Herbal Polypharmacology Mapping", completed: false, hours: 14 },
        ],
        skillsAcquired: ["Cytoscape Network Pharmacology", "Python Ayur-Informatics", "Phenome-Genome Correlation"],
      },
    ]);
  }

  public enrollIndustrialTraining(trainingId: string): boolean {
    const list = this.getIndustrialTrainings();
    const item = list.find((t) => t.id === trainingId);
    if (!item) return false;
    item.status = "ENROLLED";
    this.save("industrial_trainings", list);
    return true;
  }

  // 4. Faculty Development Programs (FDP)
  public getFDPs(): FacultyFDP[] {
    return this.load<FacultyFDP[]>("fdps", [
      {
        id: "fdp-01",
        title: "National FDP on Competency-Based Medical Education (CBME) in Ayurveda",
        sanctioningBody: "NCISM",
        hostingInstitute: "National Institute of Ayurveda (NIA), Jaipur",
        coordinator: "Prof. Dr. Sanjeev Sharma (Vice Chancellor, NIA)",
        mode: "Residential Immersion",
        durationDays: 7,
        creditPoints: 14,
        status: "COMPLETED",
        completionDate: "2026-04-18",
        certificateIssued: true,
        certificateId: "NCISM-CBME-FDP-2026-0819",
        themes: [
          "Outcome-Based Curriculum Blueprinting",
          "Formative & Summative Workplace Assessments",
          "Mini-CEX & DOPS implementation in Ayurvedic Hospitals",
          "Rubrics for Practical Clinical Logbooks",
        ],
        assignmentsCount: 4,
        completedAssignments: 4,
      },
      {
        id: "fdp-02",
        title: "Artificial Intelligence & Digital Health Technologies in Integrative Medicine",
        sanctioningBody: "AICTE",
        hostingInstitute: "IIT Delhi & All India Institute of Ayurveda Joint Initiative",
        coordinator: "Prof. Dr. Tanuja Nesari & Prof. Amit Gupta (IIT-D)",
        mode: "Blended",
        durationDays: 14,
        creditPoints: 20,
        status: "ACTIVE",
        certificateIssued: false,
        themes: [
          "Computer Vision for Ayurvedic Botanical Authentication",
          "Deep Learning for EHR Natural Language Processing",
          "Ethical Frameworks for AI in Clinical Diagnosis",
          "Grant Proposals for Digital Ayush Missions",
        ],
        assignmentsCount: 5,
        completedAssignments: 3,
      },
      {
        id: "fdp-03",
        title: "High-Impact Scientific Writing & Systematic Reviews in Ayurveda",
        sanctioningBody: "Ministry of Ayush",
        hostingInstitute: "Institute of Teaching and Research in Ayurveda (ITRA), Jamnagar",
        coordinator: "Prof. Dr. B.J. Patgiri",
        mode: "Virtual Synchronous",
        durationDays: 6,
        creditPoints: 12,
        status: "COMPLETED",
        completionDate: "2026-02-12",
        certificateIssued: true,
        certificateId: "MOA-SCIW-2026-4411",
        themes: [
          "PRISMA Guidelines for Ayurvedic Systematic Reviews",
          "PubMed/Scopus Indexing Criteria & Peer Review Navigation",
          "Biostatistical Rigor & Sample Size Calculation in Small Cohorts",
        ],
        assignmentsCount: 3,
        completedAssignments: 3,
      },
      {
        id: "fdp-04",
        title: "Translational Pharmacology & Reverse Pharmacology in ASU Formulations",
        sanctioningBody: "UGC-HRDC",
        hostingInstitute: "Banaras Hindu University (BHU), Varanasi",
        coordinator: "Prof. K.N. Dwivedi",
        mode: "Residential Immersion",
        durationDays: 10,
        creditPoints: 16,
        status: "RECOMMENDED",
        certificateIssued: false,
        themes: [
          "Ayurvedic Reverse Pharmacology Framework",
          "Safety Evaluation of Rasaushadhis (Herbo-metallic preparations)",
          "Pharmacokinetics & Herb-Drug Interaction Screening",
        ],
        assignmentsCount: 4,
        completedAssignments: 0,
      },
    ]);
  }

  public enrollFDP(fdpId: string): boolean {
    const list = this.getFDPs();
    const item = list.find((f) => f.id === fdpId);
    if (!item) return false;
    item.status = "ENROLLED";
    this.save("fdps", list);
    return true;
  }

  // 5. Research Collaboration
  public getResearchCollaborations(): ResearchCollaboration[] {
    return this.load<ResearchCollaboration[]>("research_collaborations", [
      {
        id: "res-col-01",
        projectTitle: "Standardization & Molecular Mechanisms of Guduchi-Derived Nano-Biomolecules in Metabolic Syndrome",
        collaboratingPartner: "Dabur Research Foundation & IIT Delhi",
        partnerType: "Industry Pharma",
        principalInvestigator: "Prof. Dr. Anand Kulkarni (PI, AIIA)",
        coInvestigators: ["Dr. Rajesh Varma (Co-PI, Dabur)", "Prof. Ritu Mehrotra (IIT Delhi)"],
        sanctionedBudget: "₹45,00,000",
        utilizedBudget: "₹28,50,000",
        durationMonths: 24,
        ethicsClearanceStatus: "CLEARED",
        iecApprovalNumber: "IEC/AIIA/2025/11-DR",
        mouStatus: "SIGNED",
        currentPhase: "Lab Standardization",
        progress: 68,
        milestones: [
          { id: "m1", name: "Plant raw material authentication & heavy metal audit", targetDate: "2025-12-15", status: "COMPLETED" },
          { id: "m2", name: "Green synthesis of bio-active nanoparticles & characterization", targetDate: "2026-04-30", status: "COMPLETED" },
          { id: "m3", name: "In-vitro insulin sensitizing assays in adipocytes", targetDate: "2026-09-30", status: "IN_PROGRESS" },
          { id: "m4", name: "Phase-I clinical pharmacokinetic evaluation in healthy volunteers", targetDate: "2027-03-31", status: "PENDING" },
        ],
        startDate: "2025-10-01",
        targetEndDate: "2027-09-30",
      },
      {
        id: "res-col-02",
        projectTitle: "Multi-Centric Randomized Double-Blind Trial of Medhya Rasayana in Mild Cognitive Impairment",
        collaboratingPartner: "CCRAS Central Council & NIMHANS Bengaluru",
        partnerType: "National Research Council",
        principalInvestigator: "Prof. Dr. Anand Kulkarni (Site PI)",
        coInvestigators: ["Dr. K. S. Rao (NIMHANS)", "Dr. Sulochana Rao (CCRAS)"],
        sanctionedBudget: "₹65,00,000",
        utilizedBudget: "₹18,00,000",
        durationMonths: 36,
        ethicsClearanceStatus: "CLEARED",
        iecApprovalNumber: "IEC/AIIA/2026/02-NEURO",
        mouStatus: "SIGNED",
        currentPhase: "Clinical Validation",
        progress: 35,
        milestones: [
          { id: "m1", name: "CTRI Registration & Clinical Trial Protocol freeze", targetDate: "2026-03-01", status: "COMPLETED" },
          { id: "m2", name: "Subject recruitment (n=120) across 3 tertiary centres", targetDate: "2026-09-15", status: "IN_PROGRESS" },
          { id: "m3", name: "6-month neuro-psychological MMSE & MoCA test battery", targetDate: "2027-04-15", status: "PENDING" },
          { id: "m4", name: "Interim safety monitoring board (DSMB) review", targetDate: "2027-08-30", status: "PENDING" },
        ],
        startDate: "2026-02-01",
        targetEndDate: "2029-01-31",
      },
      {
        id: "res-col-03",
        projectTitle: "Ayurgenomics of Gut Microbiome Plasticity Across Tridosha Phenotypes",
        collaboratingPartner: "CSIR-Institute of Genomics & Integrative Biology (IGIB)",
        partnerType: "Premier Institute (IIT/AIIMS)",
        principalInvestigator: "Prof. Dr. Anand Kulkarni & Dr. Mitali Mukerji",
        coInvestigators: ["Dr. Bhavna Dass (AIIA)", "Dr. S. Sengupta (IGIB)"],
        sanctionedBudget: "₹38,00,000",
        utilizedBudget: "₹34,00,000",
        durationMonths: 18,
        ethicsClearanceStatus: "CLEARED",
        iecApprovalNumber: "IEC/AIIA/2025/08-GEN",
        mouStatus: "SIGNED",
        currentPhase: "Data Synthesis",
        progress: 90,
        milestones: [
          { id: "m1", name: "Prakriti clinical assessment & 16S rRNA stool metagenomics", targetDate: "2025-11-30", status: "COMPLETED" },
          { id: "m2", name: "Microbiome taxonomic profiling (Bacteroidetes vs Firmicutes)", targetDate: "2026-03-31", status: "COMPLETED" },
          { id: "m3", name: "Joint manuscript preparation for Nature Scientific Reports", targetDate: "2026-10-15", status: "IN_PROGRESS" },
        ],
        startDate: "2025-05-01",
        targetEndDate: "2026-11-30",
      },
      {
        id: "res-col-04",
        projectTitle: "Formulation Optimization of Classical Ksharasutra with Extended Shelf-Life",
        collaboratingPartner: "Arya Vaidya Sala Kottakkal",
        partnerType: "Industry Pharma",
        principalInvestigator: "Prof. Dr. Anand Kulkarni",
        coInvestigators: ["Dr. P. Madhavan Kutty"],
        sanctionedBudget: "₹22,00,000",
        utilizedBudget: "₹4,50,000",
        durationMonths: 12,
        ethicsClearanceStatus: "UNDER_REVIEW",
        mouStatus: "LEGAL_REVIEW",
        currentPhase: "Proposal",
        progress: 20,
        milestones: [
          { id: "m1", name: "Draft MoU & IP sharing clauses finalized", targetDate: "2026-09-30", status: "IN_PROGRESS" },
          { id: "m2", name: "Institutional Ethics Committee presentation", targetDate: "2026-10-20", status: "PENDING" },
        ],
        startDate: "2026-08-01",
        targetEndDate: "2027-07-31",
      },
    ]);
  }

  public createResearchCollaboration(collab: Omit<ResearchCollaboration, "id" | "progress">): ResearchCollaboration {
    const list = this.getResearchCollaborations();
    const newCollab: ResearchCollaboration = {
      ...collab,
      id: `res-col-${Date.now()}`,
      progress: 10,
    };
    list.unshift(newCollab);
    this.save("research_collaborations", list);
    return newCollab;
  }

  // 6. Consultancy Projects
  public getConsultancies(): ConsultancyProject[] {
    return this.load<ConsultancyProject[]>("consultancies", [
      {
        id: "con-01",
        clientName: "Baidyanath Ayurved Bhawan Ltd",
        clientCategory: "Ayush Pharma",
        projectScope: "Stability formulation & taste-masking optimization for pediatric Ashwagandha effervescent tablets.",
        totalConsultancyFee: 850000,
        facultySharePercentage: 70, // ₹5,95,000
        institutionalCorpusSharePercentage: 30, // ₹2,55,000
        ndaSigned: true,
        status: "ACTIVE",
        startDate: "2026-04-01",
        deliveryDeadline: "2026-10-31",
        deliverables: [
          { name: "Raw material phytochemistry fingerprinting report", dueDate: "2026-05-30", isDelivered: true },
          { name: "Accelerated 40°C/75% RH stability dossier (3 months)", dueDate: "2026-08-15", isDelivered: true },
          { name: "Palatability sensory scoring in human panel", dueDate: "2026-10-15", isDelivered: false },
        ],
        invoices: [
          { invoiceNo: "INV-AIIA-CON-2026-01", amount: 283333, status: "PAID", date: "2026-04-15" },
          { invoiceNo: "INV-AIIA-CON-2026-02", amount: 283333, status: "PAID", date: "2026-08-20" },
          { invoiceNo: "INV-AIIA-CON-2026-03", amount: 283334, status: "PENDING", date: "2026-10-30" },
        ],
      },
      {
        id: "con-02",
        clientName: "Kerala Ayurveda Ltd & Global Wellness",
        clientCategory: "Wellness Resort Chain",
        projectScope: "Regulatory toxicology dossier preparation for US-FDA Export Notification of Ayurvedic botanical extracts.",
        totalConsultancyFee: 1200000,
        facultySharePercentage: 70, // ₹8,40,000
        institutionalCorpusSharePercentage: 30, // ₹3,60,000
        ndaSigned: true,
        status: "ACTIVE",
        startDate: "2026-05-15",
        deliveryDeadline: "2026-11-30",
        deliverables: [
          { name: "Literature review of classical ASU texts & modern toxicological benchmarks", dueDate: "2026-07-01", isDelivered: true },
          { name: "Heavy metal & pesticide residue audit protocol", dueDate: "2026-09-01", isDelivered: true },
          { name: "Final US-FDA 21 CFR Part 111 Compliance Dossier", dueDate: "2026-11-15", isDelivered: false },
        ],
        invoices: [
          { invoiceNo: "INV-AIIA-CON-2026-04", amount: 600000, status: "PAID", date: "2026-06-01" },
          { invoiceNo: "INV-AIIA-CON-2026-05", amount: 600000, status: "PENDING", date: "2026-11-20" },
        ],
      },
      {
        id: "con-03",
        clientName: "HealthQuad Ayush Ventures & VedaStart",
        clientCategory: "HealthTech Startup",
        projectScope: "Scientific Due Diligence & Clinical Efficacy Assessment for $3.5M Seed Round of an AI Pulse Diagnosis Device.",
        totalConsultancyFee: 400000,
        facultySharePercentage: 70, // ₹2,80,000
        institutionalCorpusSharePercentage: 30, // ₹1,20,000
        ndaSigned: true,
        status: "COMPLETED",
        startDate: "2026-03-01",
        deliveryDeadline: "2026-05-15",
        deliverables: [
          { name: "Sensor sensitivity benchmark against 5 senior Vaidyas", dueDate: "2026-04-10", isDelivered: true },
          { name: "Technical Due Diligence & Regulatory Risk Matrix Report", dueDate: "2026-05-10", isDelivered: true },
        ],
        invoices: [
          { invoiceNo: "INV-AIIA-CON-2026-00", amount: 400000, status: "PAID", date: "2026-05-12" },
        ],
      },
      {
        id: "con-04",
        clientName: "Organic India Pvt Ltd",
        clientCategory: "Ayush Pharma",
        projectScope: "Formulation consulting for certified organic Tulsi-Brahmi cognitive adaptogen syrup.",
        totalConsultancyFee: 550000,
        facultySharePercentage: 70,
        institutionalCorpusSharePercentage: 30,
        ndaSigned: false,
        status: "PROPOSAL_PENDING",
        startDate: "2026-10-01",
        deliveryDeadline: "2027-01-31",
        deliverables: [
          { name: "Organoleptic stability testing plan", dueDate: "2026-11-15", isDelivered: false },
          { name: "Preservative-free shelf life protocol", dueDate: "2027-01-15", isDelivered: false },
        ],
        invoices: [],
      },
    ]);
  }

  public createConsultancy(consultancy: Omit<ConsultancyProject, "id" | "invoices">): ConsultancyProject {
    const list = this.getConsultancies();
    const newCon: ConsultancyProject = {
      ...consultancy,
      id: `con-${Date.now()}`,
      invoices: [
        {
          invoiceNo: `INV-AIIA-CON-2026-${Math.floor(10 + Math.random() * 90)}`,
          amount: Math.round(consultancy.totalConsultancyFee / 2),
          status: "PENDING",
          date: new Date().toISOString().split("T")[0],
        },
      ],
    };
    list.unshift(newCon);
    this.save("consultancies", list);
    return newCon;
  }

  // 7. Guest Lectures
  public getGuestLectures(): GuestLecture[] {
    return this.load<GuestLecture[]>("guest_lectures", [
      {
        id: "gl-01",
        eventTitle: "10th World Ayurveda Congress & AROGYA Expo",
        invitingOrganization: "World Ayurveda Foundation & Ministry of Ayush",
        location: "Kolkata Exhibition Centre, West Bengal",
        mode: "Keynote (In-Person)",
        date: "2026-10-18",
        timeSlot: "10:30 AM - 11:45 AM IST",
        topicTitle: "Translational Pharmacology of Rasayana Formulations: From Ancient Texts to Molecular Targets",
        honorarium: "₹50,000 + Business Flight & 5-Star Stay",
        status: "ACCEPTED",
        estimatedAudience: 1200,
        slidesDeckUrl: "/slides/wac2026-rasayana-pharmacology.pdf",
      },
      {
        id: "gl-02",
        eventTitle: "National CME on Pharmacovigilance in Herbal & Traditional Medicines",
        invitingOrganization: "Department of Pharmacology, AIIMS New Delhi",
        location: "JLN Auditorium, AIIMS, New Delhi",
        mode: "Keynote (In-Person)",
        date: "2026-09-28",
        timeSlot: "02:00 PM - 03:30 PM IST",
        topicTitle: "Herb-Drug Interactions: What Every Allopathic & Ayush Clinician Must Know",
        honorarium: "₹25,000 + Institutional Memento",
        status: "ACCEPTED",
        estimatedAudience: 350,
      },
      {
        id: "gl-03",
        eventTitle: "International Symposium on Integrative Epigenetics",
        invitingOrganization: "University of California San Diego (UCSD) Health Sciences",
        location: "La Jolla, California (Virtual Webcast)",
        mode: "Webinar (Virtual)",
        date: "2026-11-05",
        timeSlot: "07:30 PM - 09:00 PM IST (07:00 AM PST)",
        topicTitle: "Ayurvedic Prakriti Phenotypes & Differential DNA Methylation Profiles",
        honorarium: "$1,500 USD (₹1,26,000)",
        status: "INVITATION_RECEIVED",
        estimatedAudience: 800,
      },
      {
        id: "gl-04",
        eventTitle: "Faculty CME: Panchakarma Complications & Intensive Management",
        invitingOrganization: "Gujarat Ayurved University & ITRA Jamnagar",
        location: "Auditorium Hall, Jamnagar",
        mode: "CME Masterclass",
        date: "2026-05-14",
        timeSlot: "11:00 AM - 01:00 PM IST",
        topicTitle: "Emergency Protocols in Basti & Vamana Vyapad: A Critical Analysis of Charaka Siddhisthana",
        honorarium: "₹20,000",
        status: "COMPLETED",
        estimatedAudience: 220,
        feedbackScore: 4.9,
        recordingUrl: "https://vaidyasetu.gov.in/cme/panchakarma-vyapad-2026",
      },
    ]);
  }

  public respondGuestLecture(lectureId: string, action: "ACCEPTED" | "RESCHEDULED"): boolean {
    const list = this.getGuestLectures();
    const item = list.find((l) => l.id === lectureId);
    if (!item) return false;
    item.status = action;
    this.save("guest_lectures", list);
    return true;
  }

  // 8. Workshops
  public getWorkshops(): FacultyWorkshop[] {
    return this.load<FacultyWorkshop[]>("workshops", [
      {
        id: "ws-01",
        workshopTitle: "Hands-on Masterclass: Advanced Nadi Pariksha with Digital Sensor Calibration",
        department: "Department of Roga Nidana & Dravyaguna, AIIA",
        venue: "Clinical Skills Simulation Lab, 3rd Floor, AIIA New Delhi",
        mode: "In-Person Hands-On",
        date: "2026-10-05",
        durationHours: 8,
        maxSeats: 30,
        registeredAttendeesCount: 28,
        registrationFee: "₹2,500 (Free for AIIA Postgraduates)",
        status: "UPCOMING",
        learningObjectives: [
          "Finger placement geometry on radial artery (Vata, Pitta, Kapha gati analysis).",
          "Correlation between digital pulse waveforms (P1, P2, P3 peaks) and classical Vega/Gati.",
          "Live case demonstration on 10 inpatient cardiovascular and metabolic cases.",
        ],
        attendeesList: [
          { id: "att-1", name: "Dr. Aarav Sharma", institution: "AIIA New Delhi", role: "MD Scholar", checkedIn: false, certificateIssued: false },
          { id: "att-2", name: "Dr. Meera Patel", institution: "AIIA New Delhi", role: "MD Scholar", checkedIn: false, certificateIssued: false },
          { id: "att-3", name: "Dr. Rohan Verma", institution: "Ch. Brahm Prakash Ayurved Charak Sansthan", role: "Assistant Professor", checkedIn: false, certificateIssued: false },
          { id: "att-4", name: "Dr. Ananya Joshi", institution: "BHU Faculty of Ayurveda", role: "PG Resident", checkedIn: false, certificateIssued: false },
        ],
      },
      {
        id: "ws-02",
        workshopTitle: "Laboratory Practicum: Chromatographic Fingerprinting (TLC & HPTLC) of ASU Raw Drugs",
        department: "Department of Dravyaguna Vijnana",
        venue: "Central Pharmacognosy & Phytochemistry Facility, AIIA",
        mode: "In-Person Hands-On",
        date: "2026-11-12",
        durationHours: 16,
        maxSeats: 20,
        registeredAttendeesCount: 20,
        registrationFee: "₹4,000",
        status: "UPCOMING",
        learningObjectives: [
          "Preparation of botanical solvent extracts with Soxhlet apparatus.",
          "Plate spotting, tank saturation, and Rf calculation.",
          "Adulterant detection in high-value commercial herbs (Saffron, Shilajit, Ashwagandha).",
        ],
        attendeesList: [
          { id: "att-5", name: "Dr. Priya Nair", institution: "Kerala Ayurveda Academy", role: "Quality Control Chemist", checkedIn: false, certificateIssued: false },
          { id: "att-6", name: "Dr. Vikram Seth", institution: "Dabur R&D", role: "Research Associate", checkedIn: false, certificateIssued: false },
        ],
      },
      {
        id: "ws-03",
        workshopTitle: "Clinical Simulation: Ksharasutra Preparation & Anorectal Wound Staging",
        department: "Department of Shalya Tantra & Dravyaguna Collab",
        venue: "Surgical Hands-on Wet Lab, AIIA",
        mode: "In-Person Hands-On",
        date: "2026-06-20",
        durationHours: 12,
        maxSeats: 25,
        registeredAttendeesCount: 25,
        registrationFee: "₹3,500",
        status: "COMPLETED",
        learningObjectives: [
          "Coating linen thread #20 with Snuhi ksheera, Apamarga kshara, and Haridra churna.",
          "Ph-buffering & tensile strength standardization.",
          "Patient follow-up protocols and cut-through rate management.",
        ],
        attendeesList: [
          { id: "att-7", name: "Dr. Manan Dave", institution: "NIA Jaipur", role: "Assistant Professor", checkedIn: true, certificateIssued: true },
          { id: "att-8", name: "Dr. Sunita Ghosh", institution: "Govt Ayurvedic College Patna", role: "Lecturer", checkedIn: true, certificateIssued: true },
        ],
      },
    ]);
  }

  public createWorkshop(workshop: Omit<FacultyWorkshop, "id" | "registeredAttendeesCount" | "attendeesList">): FacultyWorkshop {
    const list = this.getWorkshops();
    const newWs: FacultyWorkshop = {
      ...workshop,
      id: `ws-${Date.now()}`,
      registeredAttendeesCount: 0,
      attendeesList: [],
    };
    list.unshift(newWs);
    this.save("workshops", list);
    return newWs;
  }

  // 9. Mentorship (Scholars & Competency Sign-off)
  public getMentees(): MenteeScholar[] {
    return this.load<MenteeScholar[]>("mentees", [
      {
        id: "men-01",
        name: "Dr. Aarav Sharma",
        degree: "MD Ayurveda (Dravyaguna)",
        institution: "All India Institute of Ayurveda (AIIA)",
        thesisTopic: "Evaluation of Immunomodulatory Potential of Purified Guduchi Satva Formulations in Post-Viral Fatigue Syndromes",
        currentMilestone: "Phase II: Patient Recruitment & Biomarker Tracking (IL-6, TNF-alpha)",
        overallCompetencyScore: 89,
        passportHash: "0x4f82...d19a",
        avatarText: "AS",
        pendingVerificationsCount: 2,
        recentObservations: [
          {
            id: "obs-01",
            procedureName: "Quantitative Phytochemical Profiling of Tinospora cordifolia Extract",
            date: "2026-09-08",
            patientContext: "Batch #TC-2026-04. HPTLC densitometry performed at 254nm. TLC plates archived.",
            status: "PENDING_FACULTY_SIGN",
            notes: "Please verify optical density calibration curves before finalizing thesis chapter 4.",
          },
          {
            id: "obs-02",
            procedureName: "Informed Consent & GCP Documentation for Clinical Trial Cohort",
            date: "2026-09-05",
            patientContext: "Patient ID #AIIA-PT-089 (Female, 44y). Post-viral arthralgia cohort.",
            status: "PENDING_FACULTY_SIGN",
          },
        ],
        nextScheduledReview: "Upcoming Thursday, 03:00 PM IST",
      },
      {
        id: "men-02",
        name: "Dr. Meera Patel",
        degree: "PhD Scholar",
        institution: "All India Institute of Ayurveda & IIT-D Collab",
        thesisTopic: "Chromatographic Fingerprinting & Bioavailability Enhancement of Curcuminoid Phytosomes using Ayurvedic Lipid Processing",
        currentMilestone: "Liposome particle size analysis (DLS) & Caco-2 cell permeability assay",
        overallCompetencyScore: 94,
        passportHash: "0x889a...b772",
        avatarText: "MP",
        pendingVerificationsCount: 1,
        recentObservations: [
          {
            id: "obs-03",
            procedureName: "High-Performance Liquid Chromatography (HPLC) of Curcumin, DMC & BDMC",
            date: "2026-09-07",
            patientContext: "Chromatographic column: C18 (250 x 4.6 mm, 5 micron). Retention time verified.",
            status: "PENDING_FACULTY_SIGN",
          },
        ],
        nextScheduledReview: "Tomorrow, 11:30 AM IST",
      },
      {
        id: "men-03",
        name: "Rohan Verma",
        degree: "BAMS (Final Year)",
        institution: "All India Institute of Ayurveda",
        thesisTopic: "Clinical Observation Logbook & Internship Rotation in Dravyaguna OPD",
        currentMilestone: "Rotational Clinical Internship (Panchakarma & General OPD)",
        overallCompetencyScore: 82,
        passportHash: "0x1122...ee90",
        avatarText: "RV",
        pendingVerificationsCount: 1,
        recentObservations: [
          {
            id: "obs-04",
            procedureName: "Nadi Pariksha Assessment & Prakriti Recording (50 Outpatients)",
            date: "2026-09-02",
            patientContext: "OPD 14 (Dravyaguna Special Clinic). 50 verified pulse observations logged.",
            status: "PENDING_FACULTY_SIGN",
          },
        ],
        nextScheduledReview: "Next Monday, 04:00 PM IST",
      },
      {
        id: "men-04",
        name: "Dr. Ananya Joshi",
        degree: "MD Ayurveda (Dravyaguna)",
        institution: "All India Institute of Ayurveda",
        thesisTopic: "Comparative Pharmacognostical & Molecular Characterization of Classical Ashwagandha and Its Commercial Substitutes",
        currentMilestone: "DNA Barcoding & MatK/rbcL Gene Sequencing",
        overallCompetencyScore: 91,
        passportHash: "0x6655...cc31",
        avatarText: "AJ",
        pendingVerificationsCount: 0,
        recentObservations: [],
        nextScheduledReview: "Next Friday, 02:00 PM IST",
      },
    ]);
  }

  public verifyMenteeObservation(menteeId: string, obsId: string): boolean {
    const list = this.getMentees();
    const mentee = list.find((m) => m.id === menteeId);
    if (!mentee) return false;
    const obs = mentee.recentObservations.find((o) => o.id === obsId);
    if (!obs) return false;
    obs.status = "VERIFIED";
    mentee.pendingVerificationsCount = Math.max(0, mentee.pendingVerificationsCount - 1);
    this.save("mentees", list);

    // Also remove or mark done in verification queue
    const queue = this.getVerificationQueue();
    const filtered = queue.filter((q) => !(q.menteeId === menteeId && q.id.includes(obsId)));
    this.save("verification_queue", filtered);

    // Increment profile counter
    const prof = this.getProfile();
    prof.verifiedStudentPassports += 1;
    this.save("profile", prof);
    return true;
  }

  // 10. Live Projects (Supervised Student Real-World Research)
  public getLiveProjects(): FacultyLiveProject[] {
    return this.load<FacultyLiveProject[]>("live_projects", [
      {
        id: "lp-01",
        title: "National Database of Herb-Drug Interactions for Top 50 Prescribed Ayurvedic Botanicals",
        sponsor: "Ministry of Ayush & AIIA Bio-informatics Division",
        domain: "Clinical Pharmacology",
        stage: "Lab Trials",
        progressPercentage: 65,
        leadStudentName: "Dr. Aarav Sharma (Senior Research Fellow)",
        teamMembers: [
          { studentId: "s-01", studentName: "Dr. Aarav Sharma", role: "Lead Research Fellow" },
          { studentId: "s-02", studentName: "Dr. Meera Patel", role: "Bio-analyst" },
          { studentId: "s-03", studentName: "Rohan Verma", role: "Clinical Data Collector" },
          { studentId: "s-04", studentName: "Priya Nair", role: "Literature Synthesizer" },
        ],
        tasks: [
          { id: "t1", title: "Literature extraction from classical Samhitas (Samyoga/Viruddha)", assignedTo: "Priya Nair", dueDate: "2026-08-30", isDone: true },
          { id: "t2", title: "Cytochrome P450 (CYP3A4 / CYP2D6) in-silico binding models", assignedTo: "Dr. Meera Patel", dueDate: "2026-09-15", isDone: true },
          { id: "t3", title: "Clinical data cross-check with AIIA Inpatient EHR records", assignedTo: "Rohan Verma", dueDate: "2026-10-01", isDone: false },
          { id: "t4", title: "Final Web Portal API schema for Ayush practitioners", assignedTo: "Dr. Aarav Sharma", dueDate: "2026-10-25", isDone: false },
        ],
        budget: "₹18,00,000",
        startDate: "2026-03-01",
        expectedCompletion: "2026-11-30",
      },
      {
        id: "lp-02",
        title: "Digital Nadi Pariksha AI Classifier using Tri-Axial Piezoelectric Sensors",
        sponsor: "AIIA Innovation Cell & IIT Delhi",
        domain: "AI Diagnostics",
        stage: "Clinical Validation",
        progressPercentage: 80,
        leadStudentName: "Dr. Ananya Joshi",
        teamMembers: [
          { studentId: "s-05", studentName: "Dr. Ananya Joshi", role: "Lead Research Fellow" },
          { studentId: "s-01", studentName: "Dr. Aarav Sharma", role: "Clinical Data Collector" },
        ],
        tasks: [
          { id: "t5", title: "Sensor hardware casing 3D print & clinical sterilization", assignedTo: "Dr. Ananya Joshi", dueDate: "2026-06-15", isDone: true },
          { id: "t6", title: "Calibration against 150 healthy volunteers of known Prakriti", assignedTo: "Dr. Aarav Sharma", dueDate: "2026-08-20", isDone: true },
          { id: "t7", title: "ROC curve calculation & blind test against senior faculty consensus", assignedTo: "Dr. Ananya Joshi", dueDate: "2026-10-10", isDone: false },
        ],
        budget: "₹12,50,000",
        startDate: "2026-01-15",
        expectedCompletion: "2026-10-31",
      },
      {
        id: "lp-03",
        title: "Microbial & Heavy Metal Safety Benchmarking of Over-The-Counter Ayurvedic Syrups",
        sponsor: "Dabur Quality Assurance Division",
        domain: "Formulation Standardization",
        stage: "Final Report",
        progressPercentage: 92,
        leadStudentName: "Dr. Meera Patel",
        teamMembers: [
          { studentId: "s-02", studentName: "Dr. Meera Patel", role: "Lead Research Fellow" },
          { studentId: "s-03", studentName: "Rohan Verma", role: "Bio-analyst" },
        ],
        tasks: [
          { id: "t8", title: "Market sampling of 40 commercial brands across 4 zones", assignedTo: "Rohan Verma", dueDate: "2026-05-15", isDone: true },
          { id: "t9", title: "AAS Heavy metal quantification (Pb, Cd, As, Hg)", assignedTo: "Dr. Meera Patel", dueDate: "2026-07-20", isDone: true },
          { id: "t10", title: "Whitepaper drafting for Drug Controller General of India (AYUSH)", assignedTo: "Dr. Meera Patel", dueDate: "2026-09-30", isDone: false },
        ],
        budget: "₹8,50,000",
        startDate: "2026-02-01",
        expectedCompletion: "2026-10-15",
      },
    ]);
  }

  public createLiveProject(project: Omit<FacultyLiveProject, "id" | "progressPercentage">): FacultyLiveProject {
    const list = this.getLiveProjects();
    const newProject: FacultyLiveProject = {
      ...project,
      id: `lp-${Date.now()}`,
      progressPercentage: 15,
    };
    list.unshift(newProject);
    this.save("live_projects", list);
    return newProject;
  }

  // Pending Approvals & Attestation Queue (For Dashboard)
  public getVerificationQueue(): SupervisorVerificationItem[] {
    return this.load<SupervisorVerificationItem[]>("verification_queue", [
      {
        id: "vq-01",
        menteeId: "men-01",
        menteeName: "Dr. Aarav Sharma",
        degree: "MD Ayurveda (Dravyaguna)",
        competencyDomain: "Pharmacognosy & Chromatography",
        evidenceTitle: "Quantitative HPTLC Profiling of Tinospora cordifolia (Guduchi) Satva",
        submittedDate: "2026-09-08",
        matchScore: 92,
        notes: "Batch #TC-2026-04 verified with standard reference marker berberine/tinocordiside. Signed e-logbook submitted.",
        type: "LOGBOOK_PROCEDURE",
      },
      {
        id: "vq-02",
        menteeId: "men-01",
        menteeName: "Dr. Aarav Sharma",
        degree: "MD Ayurveda (Dravyaguna)",
        competencyDomain: "Clinical Trial Protocol",
        evidenceTitle: "AIIA Inpatient Clinical Research Residency Endorsement (NOC)",
        submittedDate: "2026-09-06",
        matchScore: 89,
        notes: "Shortlisted by AIIA Hospital & Dabur Clinical Research Unit. Requires Academic Guide digital sign-off and NOC issuance.",
        type: "INTERNSHIP_NOC",
      },
      {
        id: "vq-03",
        menteeId: "men-03",
        menteeName: "Rohan Verma",
        degree: "BAMS (Final Year)",
        competencyDomain: "Nadi Pariksha Diagnostics",
        evidenceTitle: "Clinical Observation Logbook — 50 Pulse Diagnosis Records",
        submittedDate: "2026-09-02",
        matchScore: 84,
        notes: "Rotational posting in OPD 14. Documented Vata-Pitta pulse variations confirmed with clinical findings.",
        type: "PASSPORT_ATTESTATION",
      },
    ]);
  }

  public resolveVerification(queueId: string, isApproved: boolean): boolean {
    const queue = this.getVerificationQueue();
    const idx = queue.findIndex((q) => q.id === queueId);
    if (idx === -1) return false;
    const item = queue[idx];
    queue.splice(idx, 1);
    this.save("verification_queue", queue);

    if (isApproved) {
      const prof = this.getProfile();
      prof.verifiedStudentPassports += 1;
      this.save("profile", prof);

      // Also update mentee record if applicable
      const mentees = this.getMentees();
      const mentee = mentees.find((m) => m.id === item.menteeId);
      if (mentee) {
        mentee.pendingVerificationsCount = Math.max(0, mentee.pendingVerificationsCount - 1);
        this.save("mentees", mentees);
      }
    }
    return true;
  }

  // Dashboard Aggregated Analytics
  public getAnalytics() {
    const profile = this.getProfile();
    const collabs = this.getResearchCollaborations();
    const mentees = this.getMentees();
    const projects = this.getLiveProjects();
    const consultancies = this.getConsultancies();
    const fdps = this.getFDPs();
    const trainings = this.getIndustrialTrainings();
    const workshops = this.getWorkshops();
    const lectures = this.getGuestLectures();
    const queue = this.getVerificationQueue();

    const activeCollabsCount = collabs.filter((c) => c.currentPhase !== "Proposal").length;
    const completedFDPsCount = fdps.filter((f) => f.status === "COMPLETED").length;
    const activeConsultingVolume = consultancies
      .filter((c) => c.status === "ACTIVE" || c.status === "COMPLETED")
      .reduce((sum, c) => sum + (c.totalConsultancyFee * (c.facultySharePercentage / 100)), 0);

    const pendingQueueCount = queue.length;

    return {
      profile,
      activeCollabsCount,
      activeMenteesCount: mentees.length,
      liveProjectsCount: projects.length,
      completedFDPsCount,
      activeConsultingVolume: `₹${(activeConsultingVolume / 100000).toFixed(1)} Lakhs`,
      totalEarnedCredits: profile.earnedCpeCredits,
      pendingQueueCount,
      totalLecturesDelivered: lectures.filter((l) => l.status === "COMPLETED" || l.status === "ACCEPTED").length,
      totalWorkshopsConducted: workshops.length,
      trainingsCount: trainings.length,
    };
  }
}
