/**
 * Vaidya Setu - Closed-Loop Learning Pipeline Service
 * Ministry of Ayush | All India Institute of Ayurveda (AIIA)
 *
 * Core Architecture:
 * Skill Gap
 *    ↓
 * Learning Module
 *    ↓
 * 3 Question Quiz
 *    ↓
 * Micro Task
 *    ↓
 * Mentor / Workshop
 *    ↓
 * Verified Competency
 *
 * (Not: "Here are 100 random videos")
 */

export type PipelineStage = 1 | 2 | 3 | 4 | 5 | 6;

export interface SkillGapSource {
  gapId: string;
  skillName: string;
  sanskrit: string;
  severity: "CRITICAL" | "MODERATE" | "DEVELOPING";
  deficitScore: string;
  clinicalConsequence: string;
}

export interface QuizQuestionItem {
  id: string;
  questionNumber: 1 | 2 | 3;
  prompt: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface MicroTaskDefinition {
  taskId: string;
  title: string;
  prompt: string;
  clinicalContext: string;
  patientProfile?: {
    ageGender: string;
    prakriti: string;
    chiefComplaint: string;
    nadiPulse: string;
    agni: string;
  };
  requiredFields: {
    key: string;
    label: string;
    placeholder: string;
    hint: string;
  }[];
  sampleGoodSubmission: Record<string, string>;
}

export interface MentorOption {
  id: string;
  name: string;
  title: string;
  department: string;
  institution: string;
  availableSlot: string;
  avatarUrl?: string;
}

export interface WorkshopOption {
  id: string;
  title: string;
  date: string;
  time: string;
  mode: "Virtual Practicum" | "Hybrid Hospital Ward";
  instructor: string;
  seatsRemaining: number;
}

export interface CompetencyGrant {
  competencyId: string;
  badgeName: string;
  sanskrit: string;
  level: string;
  readinessPointsBonus: number;
  certifyingBody: string;
  verificationHash: string;
  unlockedOpportunitiesCount: number;
}

export interface LearningPipelineModule {
  id: string;
  slug: string;
  title: string;
  sanskrit: string;
  category: "Clinical Documentation" | "Research & Bioethics" | "Panchakarma Safety";
  estimatedMinutes: number;
  gapSource: SkillGapSource;
  lessonContent: {
    corePrinciple: string;
    classicalReference: {
      treatise: string;
      verse: string;
      translation: string;
    };
    clinicalGuide: string[];
    standardOperatingProcedure: string[];
    inpatientPitfallsToAvoid: string[];
  };
  quiz: QuizQuestionItem[];
  microTask: MicroTaskDefinition;
  mentors: MentorOption[];
  workshops: WorkshopOption[];
  competencyOutcome: CompetencyGrant;
}

// In-Memory & LocalStorage State
export interface ModuleProgressState {
  currentStage: PipelineStage;
  isStageCompleted: Record<PipelineStage, boolean>;
  quizAnswers: Record<string, string>;
  quizScore: number;
  microTaskSubmission: Record<string, string>;
  selectedMentorId?: string;
  selectedWorkshopId?: string;
  mentorSignOffStatus: "PENDING" | "APPROVED";
  competencyGranted: boolean;
  completedAt?: string;
}

export const PIPELINE_STAGE_METADATA: Record<
  PipelineStage,
  { numberStr: string; label: string; description: string; icon: string }
> = {
  1: {
    numberStr: "01",
    label: "Skill Gap Origin",
    description: "Diagnostic root cause analysis of identified clinical gap",
    icon: "AlertTriangle",
  },
  2: {
    numberStr: "02",
    label: "Learning Module",
    description: "High-yield clinical SOPs & classical Samhita references",
    icon: "BookOpen",
  },
  3: {
    numberStr: "03",
    label: "3-Question Quiz",
    description: "Focused conceptual validation checkpoint",
    icon: "CheckSquare",
  },
  4: {
    numberStr: "04",
    label: "Micro Task",
    description: "Hands-on applied inpatient chart or protocol drafting",
    icon: "FileText",
  },
  5: {
    numberStr: "05",
    label: "Mentor / Workshop",
    description: "AIIA faculty verification or live simulation reservation",
    icon: "UserCheck",
  },
  6: {
    numberStr: "06",
    label: "Verified Competency",
    description: "Official NCISM digital passport badge & readiness boost",
    icon: "Award",
  },
};

// =========================================================================
// 3 CORE PIPELINE MODULES (Rooted in Skill Gaps)
// =========================================================================

export const LEARNING_MODULES_BANK: LearningPipelineModule[] = [
  // 1. Bridges Critical Gap: Clinical Documentation
  {
    id: "case-documentation",
    slug: "case-documentation",
    title: "Clinical Case Documentation & SOAP Logging",
    sanskrit: "Rugna Vrittanta Nirmana Vidhi",
    category: "Clinical Documentation",
    estimatedMinutes: 25,
    gapSource: {
      gapId: "gap-clin-doc",
      skillName: "Clinical Documentation",
      sanskrit: "Rugna Vrittanta",
      severity: "CRITICAL",
      deficitScore: "-35 pts",
      clinicalConsequence:
        "Severe ambiguity during inpatient shift handover, delayed Kayachikitsa treatment adjustments, and non-compliance with NCISM/NABH documentation standards.",
    },
    lessonContent: {
      corePrinciple:
        "A classical Rugna Vrittanta bridges Ashtavidha Pariksha findings with modern electronic SOAP (Subjective, Objective, Assessment, Plan) architecture without losing Dosha-Dhatu-Mala specificity.",
      classicalReference: {
        treatise: "Charaka Samhita, Vimana Sthana 8/84",
        verse: "परीक्ष्यकारिणो हि कुशला भवन्ति...",
        translation:
          "The wise physician acts only after thorough eight-fold diagnostic examination, recording observations systematically to ensure unwavering therapeutic success.",
      },
      clinicalGuide: [
        "S (Subjective): Capture Rogi's chief complaints in their own words, chronological onset (Kala), and lifestyle aggravating factors (Mithya Ahara-Vihara).",
        "O (Objective): Document pulse rhythm (Nadi Gati), digestive fire (Agni Bala), bowel habits (Koshta), tongue coating (Jihwa Pariksha), and local examination (Shotha, Sparsha, Stambha).",
        "A (Assessment): State precise differential diagnosis (e.g. Amavata vs Sandhigata Vata), identifying the affected Dhatus, Srotas (channels), and Rogamarga (pathway).",
        "P (Plan): Formulate clear Chikitsa Sutra, specifying Deepana-Pachana medicines, Anupana, external procedures (Swedana), and daily dietary regimen (Pathya-Apathya).",
      ],
      standardOperatingProcedure: [
        "Step 1: Check patient identification and baseline vitals prior to entering inpatient cubicle.",
        "Step 2: Log chronological timeline of current flare-up vs chronic baseline.",
        "Step 3: Document Nadi findings immediately after morning calm state, before meals.",
        "Step 4: Draft complete SOAP note within 45 minutes of ward round completion.",
      ],
      inpatientPitfallsToAvoid: [
        "Never record generic 'joint pain' without specifying Rogamarga, joint warmth, and morning stiffness duration.",
        "Never prescribe Shamana formulations before confirming whether patient is in Sama or Niramavastha.",
      ],
    },
    quiz: [
      {
        id: "quiz-doc-1",
        questionNumber: 1,
        prompt:
          "In the 'Subjective' (S) section of an Ayurvedic SOAP record, which detail is essential to record for differential diagnosis of joint disorders?",
        options: [
          { id: "a", text: "Laboratory CRP blood test values", isCorrect: false },
          {
            id: "b",
            text: "Morning stiffness duration (> 45 mins) and whether pain relieves or aggravates with heat/valuka sweda",
            isCorrect: true,
          },
          { id: "c", text: "Patient's insurance policy number", isCorrect: false },
          { id: "d", text: "Prescribed discharge medicine dosage", isCorrect: false },
        ],
        explanation:
          "Morning stiffness duration and response to dry heat (Valuka Sweda) differentiate Kapha-Vata Ama (Amavata) from degenerative Dhatukshaya (Sandhigata Vata).",
      },
      {
        id: "quiz-doc-2",
        questionNumber: 2,
        prompt:
          "Under 'Objective' (O) examination, a tongue demonstrating thick white unctuous coating with sluggish Nadi (Mandam Gati) points to which pathophysiological state?",
        options: [
          { id: "a", text: "Pure Pitta Prakopa with Tikshnagni", isCorrect: false },
          { id: "b", text: "Nirama Vata with Vishamagni", isCorrect: false },
          { id: "c", text: "Sama Avastha with Mandagni and Srotorodha", isCorrect: true },
          { id: "d", text: "Shukra Dhatukshaya", isCorrect: false },
        ],
        explanation:
          "Thick white coating (Alepata) and sluggish pulse directly indicate the presence of Ama (toxic metabolic byproduct) and Mandagni.",
      },
      {
        id: "quiz-doc-3",
        questionNumber: 3,
        prompt:
          "When drafting the 'Plan' (P) for an in-patient in Sama state, which therapeutic principle takes precedence before initiating heavy Rasayana or Snehana?",
        options: [
          { id: "a", text: "Deepana and Pachana (clearing Ama and rekindling Agni)", isCorrect: true },
          { id: "b", text: "Immediate high-dose Balya Ghrita Snehapana", isCorrect: false },
          { id: "c", text: "Vigorous Vyayama (exercise)", isCorrect: false },
          { id: "d", text: "Discharge without medication", isCorrect: false },
        ],
        explanation:
          "Classical Charaka Chikitsa emphasizes 'Amadosha jite srotahsu vishuddheshu...', meaning Ama must first be digested with Langhana/Deepana-Pachana before unctuous therapies.",
      },
    ],
    microTask: {
      taskId: "task-doc-amavata",
      title: "Inpatient SOAP Note: 48yo Male with Chronic Amavata",
      prompt:
        "Review the patient profile below and draft a structured electronic SOAP note for the evening hospital handover shift.",
      clinicalContext:
        "Patient Rajesh Kumar (48M), admitted to AIIA Male Ward Bed #14 with severe symmetrical swelling and stiffness in bilateral knees, ankles, and wrist joints for 3 weeks.",
      patientProfile: {
        ageGender: "48 / Male (Vata-Kapha)",
        prakriti: "Vata-Kapha Prakriti",
        chiefComplaint: "Severe morning stiffness (>1 hr), multiple joint swellings (Shotha), sluggish digestion, body heaviness (Gaurava).",
        nadiPulse: "Mandam, Gada-tulya (sluggish, loaded pulse with Ama)",
        agni: "Mandagni with recurrent Aruchi (anorexia)",
      },
      requiredFields: [
        {
          key: "subjective",
          label: "S — Subjective Complaint & History",
          placeholder: "Describe pain characteristics, duration of morning stiffness, and relation to food/climate...",
          hint: "Include timeline, pain intensity, aggravating factors (cold/damp), and bowel habits.",
        },
        {
          key: "objective",
          label: "O — Objective Vitals & Examination",
          placeholder: "Record Sparsha (local temperature), Shotha (edema type), Jihwa, and Nadi...",
          hint: "Specify joint findings, tongue appearance, pulse quality, and Agni state.",
        },
        {
          key: "assessment",
          label: "A — Clinical Assessment & Differential",
          placeholder: "State provisional diagnosis, stage (Sama/Nirama), Rogamarga, and differential...",
          hint: "Differentiate Amavata from Sandhigata Vata and Vatarakta.",
        },
        {
          key: "plan",
          label: "P — Immediate Therapeutic Plan & Pathya",
          placeholder: "Specify Deepana-Pachana prescriptions, external procedures, and strict dietary orders...",
          hint: "e.g. Shunthi-Guduchi Kwatha, Valuka Sweda, warm water diet, avoid curds.",
        },
      ],
      sampleGoodSubmission: {
        subjective:
          "Patient reports persistent throbbing pain and morning stiffness lasting ~60 mins in bilateral knees and wrists. Severe heaviness in limbs, loss of appetite, and constipation.",
        objective:
          "Swelling in bilateral Janusandhi with mild local warmth. Tongue exhibits thick whitish coating (Liptyate). Nadi is sluggish and heavy. Agni is severely impaired (Mandagni).",
        assessment:
          "Provisional diagnosis: Amavata in Sama Avastha (Madhyama Rogamarga). Differentiated from Sandhigata Vata by presence of systemic feverishness, Ama tongue, and morning stiffness.",
        plan:
          "1. Deepana-Pachana with Shunthi-Dhanyaka Siddha Jala. 2. Valuka Sweda (dry heat fomentation) twice daily. 3. Avoid dadhi, sheeta jala, and masha. 4. Re-evaluate Nadi tomorrow morning.",
      },
    },
    mentors: [
      {
        id: "mentor-1",
        name: "Prof. Dr. Anand Kulkarni",
        title: "Senior Professor & HOD",
        department: "Department of Kayachikitsa",
        institution: "All India Institute of Ayurveda, New Delhi",
        availableSlot: "Today, 5:30 PM (Virtual Verification)",
      },
      {
        id: "mentor-2",
        name: "Dr. Meera Nambiar",
        title: "Associate Professor",
        department: "Clinical Panchakarma & Inpatient Care",
        institution: "All India Institute of Ayurveda, New Delhi",
        availableSlot: "Tomorrow, 11:00 AM (Ward Round Practicum)",
      },
    ],
    workshops: [
      {
        id: "ws-1",
        title: "Weekly Inpatient Case Audit & Documentation Practicum",
        date: "Saturday, 12 Sept 2026",
        time: "10:00 AM - 12:30 PM",
        mode: "Virtual Practicum",
        instructor: "Prof. Dr. Anand Kulkarni",
        seatsRemaining: 6,
      },
    ],
    competencyOutcome: {
      competencyId: "comp-clin-doc",
      badgeName: "NCISM Certified Clinical Case Documenter",
      sanskrit: "Pramaanita Rugna Vrittanta Vid",
      level: "Level 2 Inpatient Mastery",
      readinessPointsBonus: 18,
      certifyingBody: "All India Institute of Ayurveda • Ministry of Ayush",
      verificationHash: "AYUSH-COMP-2026-DOC-8942",
      unlockedOpportunitiesCount: 4,
    },
  },

  // 2. Bridges Moderate Gap: Research Documentation
  {
    id: "research-protocols",
    slug: "research-protocols",
    title: "CCRAS Trial Protocols & Ayush Bioethics",
    sanskrit: "Anusandhana Vidhi & Naitikata",
    category: "Research & Bioethics",
    estimatedMinutes: 20,
    gapSource: {
      gapId: "gap-res-doc",
      skillName: "Research Documentation",
      sanskrit: "Anusandhana Vidhi",
      severity: "MODERATE",
      deficitScore: "-28 pts",
      clinicalConsequence:
        "Delays in Institutional Ethics Committee (IEC) clearances, incorrect CTRI trial registration, and difficulty contributing to evidence-based Ayurveda clinical trials.",
    },
    lessonContent: {
      corePrinciple:
        "Modern AYUSH research harmonizes classical evidence principles (Yukti, Aptopadesha, Pratyaksha) with Good Clinical Practice (GCP-Ayush) and ICMR ethical standards.",
      classicalReference: {
        treatise: "Charaka Samhita, Sutra Sthana 11/17",
        verse: "द्विविधमेव खलु सर्वं... आप्तोपदेशः प्रत्यक्षमनुमानं युक्तिश्चेति।",
        translation:
          "All knowledge is authenticated through the four-fold pramanas: authoritative testimony, direct empirical observation, logical inference, and experimental rationale.",
      },
      clinicalGuide: [
        "Informed Consent: Must be bilingual (Hindi/Regional + English), detailing trial rationale, herbal formulation constituents, and voluntary withdrawal terms.",
        "Prospective CTRI Registration: Mandatorily registered on the Clinical Trials Registry - India prior to enrolling the first patient.",
        "Safety Monitoring: Reporting of Adverse Events (AEs) within 24 hours to the Ethics Committee.",
      ],
      standardOperatingProcedure: [
        "Step 1: Draft trial synopsis matching ICMR Bioethics Schedule Y and AYUSH GCP.",
        "Step 2: Submit to Institutional Ethics Committee with Patient Information Sheet.",
        "Step 3: Register on ctri.nic.in upon IEC approval.",
      ],
      inpatientPitfallsToAvoid: [
        "Never begin pilot clinical interventions prior to formal IEC written approval.",
      ],
    },
    quiz: [
      {
        id: "quiz-res-1",
        questionNumber: 1,
        prompt:
          "According to ICMR and CCRAS guidelines, when must a clinical trial involving human subjects be registered on the CTRI portal?",
        options: [
          { id: "a", text: "Prospectively, BEFORE enrolling the first participant", isCorrect: true },
          { id: "b", text: "After completing Phase 2 clinical observation", isCorrect: false },
          { id: "c", text: "Only if the trial receives foreign funding", isCorrect: false },
          { id: "d", text: "CTRI registration is optional for Ayurveda", isCorrect: false },
        ],
        explanation:
          "Prospective CTRI registration before first participant enrollment is mandatory for trial validity and publication in indexed journals.",
      },
      {
        id: "quiz-res-2",
        questionNumber: 2,
        prompt:
          "In AYUSH Good Clinical Practice, what must the Patient Information Sheet (PIS) include regarding classical herbal formulations?",
        options: [
          { id: "a", text: "Full botanical/classical ingredients and possible foreseeable side-effects", isCorrect: true },
          { id: "b", text: "Only the trade brand name", isCorrect: false },
          { id: "c", text: "Guaranteed 100% cure rate without risks", isCorrect: false },
          { id: "d", text: "Confidential chemical patents hidden from patient", isCorrect: false },
        ],
        explanation:
          "Transparency regarding ingredients, dosage, rationale, and potential risks in accessible language is a non-negotiable bioethical requirement.",
      },
      {
        id: "quiz-res-3",
        questionNumber: 3,
        prompt:
          "If a trial subject on an Ayurvedic trial medicine reports sudden rash and elevated liver enzymes, what is the mandatory GCP protocol?",
        options: [
          { id: "a", text: "Document as SAE and notify IEC within 24 hours while managing patient safety", isCorrect: true },
          { id: "b", text: "Wait until trial completion to disclose", isCorrect: false },
          { id: "c", text: "Remove subject quietly without reporting", isCorrect: false },
          { id: "d", text: "Double the dosage to overcome symptoms", isCorrect: false },
        ],
        explanation:
          "Severe Adverse Events (SAEs) must be reported to the Institutional Ethics Committee within 24 hours per GCP-Ayush regulatory mandates.",
      },
    ],
    microTask: {
      taskId: "task-res-ctri",
      title: "CTRI Clinical Trial Protocol Formulation",
      prompt:
        "Formulate the key regulatory components for a randomized controlled trial evaluating Guduchi Ghanavati in metabolic pre-diabetes.",
      clinicalContext:
        "A 12-week exploratory comparative trial at AIIA evaluating standard-of-care diet vs Guduchi Ghanavati 500mg BID on HbA1c and lipid markers.",
      requiredFields: [
        {
          key: "titleAndDesign",
          label: "Trial Title & Study Design",
          placeholder: "State formal title, phase, randomization method, and masking...",
          hint: "e.g. Double-blind randomized placebo-controlled trial.",
        },
        {
          key: "ethicsPlan",
          label: "Ethics Committee & Consent Procedure",
          placeholder: "Explain informed consent acquisition and IEC review steps...",
          hint: "Detail bilingual PIS, confidentiality, and voluntary exit.",
        },
        {
          key: "safetyReporting",
          label: "Adverse Event Monitoring & Safety SOP",
          placeholder: "Describe liver/renal safety markers and 24-hour reporting protocols...",
          hint: "Specify baseline and 6-week safety monitoring parameters.",
        },
      ],
      sampleGoodSubmission: {
        titleAndDesign:
          "A Randomized Double-Blind Placebo-Controlled Trial evaluating Guduchi Ghanavati (Tinospora cordifolia) in Pre-Diabetes (Prameha Poorvarupa). Phase II clinical evaluation.",
        ethicsPlan:
          "Institutional Ethics Committee (IEC) clearance obtained prior to screening. Informed consent obtained in Hindi and English with full explanation of study duration, blood draws, and withdrawal options.",
        safetyReporting:
          "LFT and KFT evaluated at baseline, Week 6, and Week 12. Any adverse reaction logged immediately and reported to IEC within 24 hours with appropriate medical care provided at AIIA.",
      },
    },
    mentors: [
      {
        id: "mentor-res-1",
        name: "Dr. Rajeshwar Rao",
        title: "Head of Bioethics & Clinical Research",
        department: "Central Council for Research in Ayurvedic Sciences (CCRAS)",
        institution: "Ministry of Ayush",
        availableSlot: "Friday, 4:00 PM (Protocol Review)",
      },
    ],
    workshops: [
      {
        id: "ws-res-1",
        title: "Hands-on GCP-Ayush Trial Registration Practicum",
        date: "Sunday, 13 Sept 2026",
        time: "2:00 PM - 4:00 PM",
        mode: "Virtual Practicum",
        instructor: "Dr. Rajeshwar Rao",
        seatsRemaining: 12,
      },
    ],
    competencyOutcome: {
      competencyId: "comp-res-gcp",
      badgeName: "GCP-Ayush Certified Clinical Investigator",
      sanskrit: "Anusandhana Naitikata Pramaanit",
      level: "Level 2 Evidence Trialist",
      readinessPointsBonus: 15,
      certifyingBody: "CCRAS • Ministry of Ayush",
      verificationHash: "AYUSH-COMP-2026-GCP-7719",
      unlockedOpportunitiesCount: 3,
    },
  },

  // 3. Bridges Procedure Safety Gap: Snehavyapat Triage
  {
    id: "panchakarma-safety",
    slug: "panchakarma-safety",
    title: "Panchakarma Complication Triage & Snehavyapat",
    sanskrit: "Shodhana Suraksha & Vyapat Shamana",
    category: "Panchakarma Safety",
    estimatedMinutes: 20,
    gapSource: {
      gapId: "gap-pancha-safety",
      skillName: "Procedure Safety & Emergency Triage",
      sanskrit: "Shodhana Suraksha",
      severity: "MODERATE",
      deficitScore: "-22 pts",
      clinicalConsequence:
        "High clinical risk during acute Snehapana complications (Ama-jeerna, severe vomiting, cardiac distress) leading to adverse patient safety outcomes.",
    },
    lessonContent: {
      corePrinciple:
        "Proper Shodhana requires rigorous Jeerna-Ajeerna Lakshana monitoring before increasing unctuous dosing (Arohana Snehapana).",
      classicalReference: {
        treatise: "Sushruta Samhita, Chikitsa Sthana 31/34",
        verse: "स्नेहव्यापत्सु मतिमान्... तीक्ष्णोष्णैः दीपनैः शमयेद्भिषक्।",
        translation:
          "In acute Snehavyapat, the prudent physician immediately arrests sneha administration and counters the vitiation using potent hot digestive remedies (Ushna-Tikshna Deepana).",
      },
      clinicalGuide: [
        "Never force unctuous ghee into a patient experiencing heavy eructations (Udgarashuddhi absence).",
        "Triage acute nausea immediately with sips of warm ginger water (Shunthi-Jala).",
      ],
      standardOperatingProcedure: [
        "Step 1: Daily morning examination of pulse, tongue, and hunger before dispensing Arohana Ghrita.",
        "Step 2: Monitor time required for complete digestion (Jeerna Kala).",
      ],
      inpatientPitfallsToAvoid: [
        "Never administer cold water or cold bath during active Snehapana days.",
      ],
    },
    quiz: [
      {
        id: "quiz-p-1",
        questionNumber: 1,
        prompt:
          "What is the first mandatory action if a patient vomits undigested Ghrita on Day 4 of Arohana Snehapana?",
        options: [
          { id: "a", text: "Withhold sneha, give lukewarm water sips, evaluate Agni", isCorrect: true },
          { id: "b", text: "Force another 100ml immediately", isCorrect: false },
          { id: "c", text: "Administer cold ice water", isCorrect: false },
          { id: "d", text: "Ignore and continue protocol", isCorrect: false },
        ],
        explanation:
          "Acute Snehavyapat demands immediate cessation of Sneha and administration of Ushnodaka to digest residual Ama.",
      },
      {
        id: "quiz-p-2",
        questionNumber: 2,
        prompt:
          "Which symptom indicates the arrival of 'Samyak Snigdha Lakshana' (Optimal Snehana)?",
        options: [
          { id: "a", text: "Vatanulomana, Deeptagni, Snigdha Purisha (unctuous stool)", isCorrect: true },
          { id: "b", text: "Severe fever and body burning", isCorrect: false },
          { id: "c", text: "Extreme diarrhea and delirium", isCorrect: false },
          { id: "d", text: "Joint stiffness and severe dry skin", isCorrect: false },
        ],
        explanation:
          "Proper unctuousness produces downward Vata movement, glowing digestion, and unctuous glossy stools.",
      },
      {
        id: "quiz-p-3",
        questionNumber: 3,
        prompt:
          "During active Snehapana days, what kind of water should the patient exclusively consume?",
        options: [
          { id: "a", text: "Ushnodaka (boiled lukewarm water)", isCorrect: true },
          { id: "b", text: "Refrigerated ice water", isCorrect: false },
          { id: "c", text: "Carbonated soda water", isCorrect: false },
          { id: "d", text: "Stagnant unboiled well water", isCorrect: false },
        ],
        explanation:
          "Ushnodaka is mandatory to digest fats, prevent Ama formation, and clear channel obstruction (Srotovishodhana).",
      },
    ],
    microTask: {
      taskId: "task-p-triage",
      title: "Snehapana Complication Clinical Triage Chart",
      prompt:
        "Draft the clinical intervention protocol for an inpatient experiencing acute indigestion and nausea on Day 3 of Shodhana.",
      clinicalContext:
        "Patient Sunita Devi (42F), Day 3 of Arohana Snehapana (100ml Tiktaka Ghrita). Reports heavy chest heaviness, sour belching, and inability to drink water.",
      requiredFields: [
        {
          key: "triageSteps",
          label: "Immediate Triage Orders",
          placeholder: "Detail immediate nursing orders and drug withholding...",
          hint: "Withhold sneha, start hot water sips, monitor vitals.",
        },
        {
          key: "correctiveHerbs",
          label: "Deepana-Pachana Formulation Orders",
          placeholder: "Specify herbal drugs and anupana...",
          hint: "e.g. Shunthi Churna, Hinguvashtaka, or Trikatu.",
        },
      ],
      sampleGoodSubmission: {
        triageSteps:
          "1. Immediately halt all Sneha intake for the day. 2. Patient kept on strict Langhana (fasting). 3. Provide sips of freshly boiled Shunthi-Dhanyaka Jala every 30 minutes. 4. Monitor pulse and BP every 2 hours.",
        correctiveHerbs:
          "Administer Hinguvashtaka Churna 3g with warm water after nausea subsides. Resume Snehapana only after pure hunger (Kshut Pravritti) and clean eructations (Udgarashuddhi) appear tomorrow.",
      },
    },
    mentors: [
      {
        id: "mentor-p-1",
        name: "Dr. K. S. Radhakrishnan",
        title: "Chief Panchakarma Physician",
        department: "Panchakarma Center of Excellence",
        institution: "Arya Vaidya Sala Kottakkal",
        availableSlot: "Saturday, 3:00 PM (Clinical Ward Audit)",
      },
    ],
    workshops: [
      {
        id: "ws-p-1",
        title: "NABH Panchakarma Emergency Protocols & Safety Workshop",
        date: "Sunday, 20 Sept 2026",
        time: "11:00 AM - 1:00 PM",
        mode: "Hybrid Hospital Ward",
        instructor: "Dr. K. S. Radhakrishnan",
        seatsRemaining: 8,
      },
    ],
    competencyOutcome: {
      competencyId: "comp-p-safety",
      badgeName: "NABH Certified Panchakarma Safety Lead",
      sanskrit: "Shodhana Suraksha Pramaanit",
      level: "Level 2 Safety Officer",
      readinessPointsBonus: 12,
      certifyingBody: "AIIA • Arya Vaidya Sala Kottakkal",
      verificationHash: "AYUSH-COMP-2026-PANCHA-4432",
      unlockedOpportunitiesCount: 2,
    },
  },
];

// =========================================================================
// STORAGE & RUNNER HELPERS
// =========================================================================

export function getLearningModuleById(id: string): LearningPipelineModule | undefined {
  return LEARNING_MODULES_BANK.find((m) => m.id === id || m.slug === id);
}

const STORAGE_PREFIX = "vaidya_module_progress_";

export function getInitialModuleState(): ModuleProgressState {
  return {
    currentStage: 1,
    isStageCompleted: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
    },
    quizAnswers: {},
    quizScore: 0,
    microTaskSubmission: {},
    mentorSignOffStatus: "PENDING",
    competencyGranted: false,
  };
}

export function loadModuleProgressLocally(moduleId: string): ModuleProgressState {
  if (typeof window === "undefined") return getInitialModuleState();
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${moduleId}`);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn("Failed to load module progress:", err);
  }
  return getInitialModuleState();
}

export function saveModuleProgressLocally(
  moduleId: string,
  state: ModuleProgressState
): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${moduleId}`, JSON.stringify(state));
  } catch (err) {
    console.warn("Failed to save module progress:", err);
  }
}
