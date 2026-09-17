/**
 * 🏛️ Ministry of Ayush / NCISM CBDC Comprehensive Assessment Question Bank
 * All India Institute of Ayurveda Ecosystem
 *
 * Exactly 15 questions per section (75 authentic questions total):
 * 1. skill (Ayurvedic Knowledge & Samhita)
 * 2. clinical (Clinical Diagnostics & Nadi)
 * 3. panchakarma (Panchakarma Protocols & Shodhana)
 * 4. pharma (ASU-GMP, Pharmacovigilance & Drug Standardization)
 * 5. research (GCP-Ayush & Trial Methodology)
 */

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  clinicalRationale: string;
}

export interface QuestionItem {
  id: string;
  topic: string;
  category: "Ayurvedic Knowledge" | "Clinical Competency" | "Research Skills" | "Professional Skills";
  questionType: "MCQ" | "SCENARIO" | "CASE_VIGNETTE";
  prompt: string;
  vignette?: {
    patientProfile: string;
    chiefComplaint: string;
    nadiPulse: string;
    agniStatus: string;
  };
  options: QuestionOption[];
}

export const QUESTIONS_BANK: Record<"skill" | "clinical" | "panchakarma" | "pharma" | "research", QuestionItem[]> = {
  // =========================================================================
  // 1. AYURVEDIC KNOWLEDGE & SAMHITA (15 Questions)
  // =========================================================================
  skill: [
    {
      id: "sk-1",
      topic: "Samhita & Siddhanta",
      category: "Ayurvedic Knowledge",
      questionType: "MCQ",
      prompt: "According to Charaka Sutrasthana (Chapter 1), what constitutes the fundamental classical definition of 'Ayu' (Life)?",
      options: [
        {
          id: "opt-1",
          text: "The mechanical operation of physical organs and blood circulation",
          isCorrect: false,
          clinicalRationale: "Incomplete; Charaka defines Ayu as the dynamic union of body, senses, mind, and soul.",
        },
        {
          id: "opt-2",
          text: "Sharira (body), Indriya (senses), Satva (mind), and Atma (soul) conjoined (Dhari, Jivita, Nityaga, Anubandha)",
          isCorrect: true,
          clinicalRationale: "Classical definition: 'शरीरेन्द्रियसत्त्वात्मसंयोगो धारि जीवितम्। नित्यगश्चानुबन्धश्च पर्यायैरायुरुच्यते॥'",
        },
        {
          id: "opt-3",
          text: "The equilibrium of Sapta Dhatus alone in the physical frame",
          isCorrect: false,
          clinicalRationale: "Refers strictly to Dhatusamya, not the complete metaphysical definition of Ayu.",
        },
        {
          id: "opt-4",
          text: "The predominance of Sattva Guna over Rajas and Tamas in the Mana",
          isCorrect: false,
          clinicalRationale: "Refers to mental health (Manasa Swasthya), not the composite entity of life.",
        },
      ],
    },
    {
      id: "sk-2",
      topic: "Dravyaguna Pharmacology",
      category: "Ayurvedic Knowledge",
      questionType: "SCENARIO",
      prompt: "A Vaidya prescribes Guduchi (Tinospora cordifolia) for a chronic Pitta-Jwara patient. Which combination of Rasa-Virya-Vipaka explains its therapeutic efficacy without aggravating Pitta?",
      options: [
        {
          id: "opt-1",
          text: "Tikta-Kashaya Rasa, Ushna Virya, Madhura Vipaka",
          isCorrect: true,
          clinicalRationale: "Tikta/Kashaya clears Pitta, while Madhura Vipaka and unique Prabhava impart Rasayana and Pitta-shamaka balance.",
        },
        {
          id: "opt-2",
          text: "Katu Rasa, Ushna Virya, Katu Vipaka",
          isCorrect: false,
          clinicalRationale: "Katu Vipaka with Ushna Virya would violently aggravate Pitta in fever.",
        },
        {
          id: "opt-3",
          text: "Madhura Rasa, Sheeta Virya, Amla Vipaka",
          isCorrect: false,
          clinicalRationale: "Incorrect; Guduchi is predominantly Tikta with Ushna Virya, not Sheeta.",
        },
        {
          id: "opt-4",
          text: "Lavana Rasa, Sheeta Virya, Katu Vipaka",
          isCorrect: false,
          clinicalRationale: "Factually incorrect pharmacological profile.",
        },
      ],
    },
    {
      id: "sk-3",
      topic: "Rasashastra Standardization",
      category: "Ayurvedic Knowledge",
      questionType: "MCQ",
      prompt: "Which classical organoleptic test verifies complete conversion of mineral to bhasma without free metallic luster (Nischandratva)?",
      options: [
        {
          id: "opt-1",
          text: "Rekhapurnatva (entering micro-furrows of fingertips)",
          isCorrect: false,
          clinicalRationale: "Tests particle fineness, not metallic luster elimination.",
        },
        {
          id: "opt-2",
          text: "Varitara (floating freely on calm surface of water)",
          isCorrect: false,
          clinicalRationale: "Confirms low specific gravity and micro-fineness, not absence of free metal.",
        },
        {
          id: "opt-3",
          text: "Sunlight or magnification inspection for absolute absence of reflective shine (Nischandratva)",
          isCorrect: true,
          clinicalRationale: "Nischandratva confirms complete oxidation/sulfidation and zero unreacted free metallic particles.",
        },
        {
          id: "opt-4",
          text: "Apunarbhava (inability to regain metallic form with Mitra Panchaka)",
          isCorrect: false,
          clinicalRationale: "Apunarbhava is chemical irreversibility under intense reduction, not the luster test.",
        },
      ],
    },
    {
      id: "sk-4",
      topic: "Sharira Rachana & Kriya",
      category: "Ayurvedic Knowledge",
      questionType: "MCQ",
      prompt: "Which Dhatu Poshan Nyaya describes the sequential, step-by-step transformation of Ahara Rasa from Rasa to Shukra?",
      options: [
        {
          id: "opt-1",
          text: "Ksheera Dadhi Nyaya (Law of Complete Transformation)",
          isCorrect: true,
          clinicalRationale: "Like milk transforming wholly into curd, each preceding Dhatu transforms into the successive Dhatu.",
        },
        {
          id: "opt-2",
          text: "Kedari Kulya Nyaya (Law of Transmission via Irrigation Canals)",
          isCorrect: false,
          clinicalRationale: "Kedari Kulya describes irrigation-like simultaneous nourishment of all tissues.",
        },
        {
          id: "opt-3",
          text: "Khale Kapota Nyaya (Law of Selective Uptake by Pigeons)",
          isCorrect: false,
          clinicalRationale: "Describes selective uptake based on tissue requirement.",
        },
        {
          id: "opt-4",
          text: "Ekakala Dhatu Poshana Nyaya",
          isCorrect: false,
          clinicalRationale: "Refers to instantaneous simultaneous nourishment, not sequential transformation.",
        },
      ],
    },
    {
      id: "sk-5",
      topic: "Agni & Ama Mechanics",
      category: "Ayurvedic Knowledge",
      questionType: "MCQ",
      prompt: "What is the hallmark physiological characteristic of 'Sama Dosha' compared to 'Nirama Dosha'?",
      options: [
        {
          id: "opt-1",
          text: "Sama Doshas produce heavy coated tongue (Sama Jihwa), lethargy (Gaurava), and stool sinking in water",
          isCorrect: true,
          clinicalRationale: "Sama Dosha is combined with unripe metabolic toxin (Ama), manifesting as Srotorodha and sinking stool (Nimajjana).",
        },
        {
          id: "opt-2",
          text: "Sama Dosha increases appetite and creates acute lightness",
          isCorrect: false,
          clinicalRationale: "Lightness and acute appetite are signs of Nirama state and Vishamagni/Teekshnagni.",
        },
        {
          id: "opt-3",
          text: "Sama Dosha is treated by immediate heavy Brihmana therapies",
          isCorrect: false,
          clinicalRationale: "Contraindicated; Brihmana in Sama state produces severe Srotorodha.",
        },
        {
          id: "opt-4",
          text: "Sama Dosha has no affinity for Srotas lining",
          isCorrect: false,
          clinicalRationale: "Ama causes stickiness (Picchila) and adheres tightly to micro-channels.",
        },
      ],
    },
    {
      id: "sk-6",
      topic: "Ashtanga Hridaya Sutrasthana",
      category: "Ayurvedic Knowledge",
      questionType: "MCQ",
      prompt: "In Ashtanga Hridaya (Chapter 2), why is rising during 'Brahma Muhurta' prescribed for Swastha preservation?",
      options: [
        {
          id: "opt-1",
          text: "To protect Ayu (life span) through predominant Vata-Sattva harmonious natural rhythm",
          isCorrect: true,
          clinicalRationale: "Vagbhata states: 'ब्राह्मे मुहूर्त उत्तिष्ठेत् स्वस्थो रक्षार्थमायुषः' for systemic cellular rejuvenation.",
        },
        {
          id: "opt-2",
          text: "Strictly for religious obligations without physiological implications",
          isCorrect: false,
          clinicalRationale: "Ayurveda explicitly frames it around circadian bio-dosha alignment and longevity.",
        },
        {
          id: "opt-3",
          text: "To suppress Kapha Dosha by physical exhaustion",
          isCorrect: false,
          clinicalRationale: "It balances biological clocks without causing pathological exhaustion.",
        },
        {
          id: "opt-4",
          text: "To induce intense sweating before sunrise",
          isCorrect: false,
          clinicalRationale: "Sweating before sunrise is not the stated clinical objective.",
        },
      ],
    },
    {
      id: "sk-7",
      topic: "Sushruta Sharirasthana",
      category: "Ayurvedic Knowledge",
      questionType: "MCQ",
      prompt: "According to Acharya Sushruta, trauma to a 'Sadhyo Pranahara Marma' causes fatal outcome within what time frame?",
      options: [
        {
          id: "opt-1",
          text: "Within 7 days (Saptaratra)",
          isCorrect: true,
          clinicalRationale: "Sushruta establishes Sadhyo Pranahara injury causes demise immediately up to 7 days (सद्यः प्राणहराणि तु सप्ताहात् प्रणाशयन्ति).",
        },
        {
          id: "opt-2",
          text: "Within 1 lunar month (Masa)",
          isCorrect: false,
          clinicalRationale: "Fatality within one month corresponds to Kalantara Pranahara Marmas.",
        },
        {
          id: "opt-3",
          text: "Only after surgical extraction of foreign body",
          isCorrect: false,
          clinicalRationale: "Corresponds to Vishalyaghna Marmas.",
        },
        {
          id: "opt-4",
          text: "Only causes permanent structural deformity",
          isCorrect: false,
          clinicalRationale: "Corresponds to Vaikalyakara Marmas.",
        },
      ],
    },
    {
      id: "sk-8",
      topic: "Bhaishajya Kalpana",
      category: "Ayurvedic Knowledge",
      questionType: "MCQ",
      prompt: "During Sneha Paka (medicated ghee/oil processing), which stage is clinically indicated for Nasya and internal Pana?",
      options: [
        {
          id: "opt-1",
          text: "Mridu Paka (Soft/Mild Cooking)",
          isCorrect: true,
          clinicalRationale: "Sharngadhara specifies: 'मृदुर्नस्ये च पाने च' - Mridu Paka is designated for Nasya and oral ingestion.",
        },
        {
          id: "opt-2",
          text: "Madhyama Paka for Nasya only",
          isCorrect: false,
          clinicalRationale: "Madhyama Paka is preferred for Basti and Abhyanga.",
        },
        {
          id: "opt-3",
          text: "Khara Paka for Nasya",
          isCorrect: false,
          clinicalRationale: "Khara Paka is used exclusively for external Abhyanga, never Nasya.",
        },
        {
          id: "opt-4",
          text: "Dagdha Paka",
          isCorrect: false,
          clinicalRationale: "Dagdha Paka is burnt, toxic, and discarded.",
        },
      ],
    },
    {
      id: "sk-9",
      topic: "Roganidana & Samprapti",
      category: "Ayurvedic Knowledge",
      questionType: "MCQ",
      prompt: "In the Shat Kriya Kala paradigm, during which stage does 'Khavaigunya' (local channel susceptibility) trigger Sthana Samshraya?",
      options: [
        {
          id: "opt-1",
          text: "Stage 4 (Sthana Samshraya - Localization with Prodromal Purvarupa)",
          isCorrect: true,
          clinicalRationale: "Stage 4 is where circulating aggravated Doshas lodge into defective channel beds (Khavaigunya) producing Purvarupa.",
        },
        {
          id: "opt-2",
          text: "Stage 1 (Sanchaya - Local accumulation)",
          isCorrect: false,
          clinicalRationale: "Sanchaya is mild accumulation in native seat with dislike for aggravating causes.",
        },
        {
          id: "opt-3",
          text: "Stage 3 (Prasara - Systemic overflow)",
          isCorrect: false,
          clinicalRationale: "Prasara is unlocalized overflow like overflowing fermenting liquid.",
        },
        {
          id: "opt-4",
          text: "Stage 6 (Bheda - Chronic chronicity)",
          isCorrect: false,
          clinicalRationale: "Bheda is ulceration and incurable chronicity.",
        },
      ],
    },
    {
      id: "sk-10",
      topic: "Ritu Sandhi & Ritucharya",
      category: "Ayurvedic Knowledge",
      questionType: "MCQ",
      prompt: "Why is Tikta Ghrita and Virechana specifically indicated during Sharad Ritu (Autumn)?",
      options: [
        {
          id: "opt-1",
          text: "Pitta accumulated during Varsha Ritu gets severely provoked (Prakopa) by the sudden scorching autumn sun",
          isCorrect: true,
          clinicalRationale: "Sharad Ritu natural seasonal solar heat provokes latent Varsha Pitta; Virechana is the supreme Pitta-shodhana.",
        },
        {
          id: "opt-2",
          text: "To pacify violent seasonal Vata aggravation",
          isCorrect: false,
          clinicalRationale: "Vata is pacified during Sharad; it is Pitta that is aggravated.",
        },
        {
          id: "opt-3",
          text: "Because Kapha undergoes liquefaction in autumn",
          isCorrect: false,
          clinicalRationale: "Kapha liquefaction occurs in Vasanta (Spring), not Sharad.",
        },
        {
          id: "opt-4",
          text: "To induce heavy Kapha accumulation for winter",
          isCorrect: false,
          clinicalRationale: "Factually incorrect clinical rationale.",
        },
      ],
    },
    {
      id: "sk-11",
      topic: "Padartha Vijnana",
      category: "Ayurvedic Knowledge",
      questionType: "MCQ",
      prompt: "Which fundamental philosophical doctrine states that similarity causes increase of all entities while dissimilarity causes decrease?",
      options: [
        {
          id: "opt-1",
          text: "Samanya-Vishesha Siddhanta (सर्वदा सर्वभावानां सामान्यं वृद्धि Adamant कारणम्...)",
          isCorrect: true,
          clinicalRationale: "Core axiom of Ayurvedic therapeutics: Samanya Vriddhi Karanam, Visheshascha Hrasa Hetuh.",
        },
        {
          id: "opt-2",
          text: "Satkaryavada",
          isCorrect: false,
          clinicalRationale: "Satkaryavada addresses cause-and-effect presence in manifestation.",
        },
        {
          id: "opt-3",
          text: "Pilupakavada",
          isCorrect: false,
          clinicalRationale: "Addresses subatomic thermal transformation in Vaisheshika.",
        },
        {
          id: "opt-4",
          text: "Swabhavoparamavada",
          isCorrect: false,
          clinicalRationale: "Addresses natural spontaneous cessation of entities without active cause.",
        },
      ],
    },
    {
      id: "sk-12",
      topic: "Dravyaguna Viruddha Ahara",
      category: "Ayurvedic Knowledge",
      questionType: "SCENARIO",
      prompt: "Simultaneous consumption of Matsya (Fish) with Payas (Milk) is classical example of which category of Viruddha Ahara?",
      options: [
        {
          id: "opt-1",
          text: "Samyoga Viruddha and Virya Viruddha (Sheeta milk with Ushna fish inducing Abhishyanda and Mahakushta)",
          isCorrect: true,
          clinicalRationale: "Charaka explicitly warns fish + milk causes blood vitiation and skin diseases due to opposing virya and channel occlusion.",
        },
        {
          id: "opt-2",
          text: "Matra Viruddha (Incompatible strictly by quantity)",
          isCorrect: false,
          clinicalRationale: "Matra Viruddha is equal quantity of honey + ghee.",
        },
        {
          id: "opt-3",
          text: "Kala Viruddha only",
          isCorrect: false,
          clinicalRationale: "Kala Viruddha refers to consuming cold items in winter.",
        },
        {
          id: "opt-4",
          text: "Koshtha Viruddha only",
          isCorrect: false,
          clinicalRationale: "Refers to mild laxative in Krura Koshtha.",
        },
      ],
    },
    {
      id: "sk-13",
      topic: "Rasashastra Bhasma Pariksha",
      category: "Ayurvedic Knowledge",
      questionType: "MCQ",
      prompt: "What does the 'Apunarbhava' test for metallic Bhasmas demonstrate under intense blowpipe reduction with Mitra Panchaka?",
      options: [
        {
          id: "opt-1",
          text: "The Bhasma fails to revert to its parent unreacted metallic state, confirming permanent chemical transformation",
          isCorrect: true,
          clinicalRationale: "Mitra Panchaka (Ghee, Honey, Guggulu, Gunja, Borax) tests irreversible nanostructure state.",
        },
        {
          id: "opt-2",
          text: "The Bhasma dissolves completely in pure cold water",
          isCorrect: false,
          clinicalRationale: "Bhasmas are insoluble in water; Varitara tests floating, not solubility.",
        },
        {
          id: "opt-3",
          text: "The Bhasma emits a golden spark when heated",
          isCorrect: false,
          clinicalRationale: "Emission of sparks denotes free unreduced metal or impurity.",
        },
        {
          id: "opt-4",
          text: "The Bhasma turns blue when exposed to sunlight",
          isCorrect: false,
          clinicalRationale: "Irrelevant criteria.",
        },
      ],
    },
    {
      id: "sk-14",
      topic: "Ojas Dynamics",
      category: "Ayurvedic Knowledge",
      questionType: "MCQ",
      prompt: "What is the classical quantity and anatomical location of 'Para Ojas' according to Charaka and Chakrapani?",
      options: [
        {
          id: "opt-1",
          text: "Ashta Bindu (8 drops) located in Hridaya (Heart)",
          isCorrect: true,
          clinicalRationale: "Para Ojas is strictly 8 drops situated in Hridaya; its destruction causes instantaneous demise.",
        },
        {
          id: "opt-2",
          text: "Ardha Anjali (half handful) circulating through all Dhatus",
          isCorrect: false,
          clinicalRationale: "Ardha Anjali is the measure of Apara Ojas (Shleshmika Ojas), not Para Ojas.",
        },
        {
          id: "opt-3",
          text: "Dasa Bindu located in the brain",
          isCorrect: false,
          clinicalRationale: "Classical texts fix Para Ojas strictly at 8 drops in the cardiac center.",
        },
        {
          id: "opt-4",
          text: "One Pala located in the liver and spleen",
          isCorrect: false,
          clinicalRationale: "Factually incorrect measurement.",
        },
      ],
    },
    {
      id: "sk-15",
      topic: "Arishta Lakshana",
      category: "Ayurvedic Knowledge",
      questionType: "MCQ",
      prompt: "In Charaka Indriyasthana, what signifies the fatal prognostic Arishta sign of 'Arundhati Nakshatra' vision defect?",
      options: [
        {
          id: "opt-1",
          text: "Inability of a patient with clear skies and good visual acuity to perceive the Arundhati star signifies imminent mortality",
          isCorrect: true,
          clinicalRationale: "Classic astronomical-neurological Arishta marker documented in Indriyasthana denoting terminal neuro-sensory collapse.",
        },
        {
          id: "opt-2",
          text: "Seeing double moons during midday",
          isCorrect: false,
          clinicalRationale: "Different visual distortion described under Timira, not the classical Arundhati Arishta.",
        },
        {
          id: "opt-3",
          text: "Complete night blindness responding to ghee",
          isCorrect: false,
          clinicalRationale: "Curable Naktandhya, not a fatal Arishta.",
        },
        {
          id: "opt-4",
          text: "Temporary photophobia in viral fever",
          isCorrect: false,
          clinicalRationale: "Transient symptom, not a permanent fatal sign.",
        },
      ],
    },
  ],

  // =========================================================================
  // 2. CLINICAL DIAGNOSTICS & NADI (15 Questions)
  // =========================================================================
  clinical: [
    {
      id: "clin-1",
      topic: "Nadi Pariksha Diagnostics",
      category: "Clinical Competency",
      questionType: "CASE_VIGNETTE",
      prompt: "A 48-year-old male with chronic retrosternal burning and insomnia presents with a rapid, jumping, bouncy radial pulse under the index and middle fingers. Which Nadi Gati is demonstrated?",
      vignette: {
        patientProfile: "48y Male, Software Executive, High Stress",
        chiefComplaint: "Amlapitta, Insomnia, Burning Micturition",
        nadiPulse: "Manduka (Frog-like bouncing) at Pitta Sthana",
        agniStatus: "Teekshnagni with Vidagdha Ajeerna",
      },
      options: [
        {
          id: "opt-1",
          text: "Sarpa Gati (Vata dominant snake-like creeping)",
          isCorrect: false,
          clinicalRationale: "Sarpa Gati is felt primarily under index finger with subtle fast slithering motion.",
        },
        {
          id: "opt-2",
          text: "Manduka Gati (Pitta dominant jumping/bouncing pulse)",
          isCorrect: true,
          clinicalRationale: "Manduka Gati reflects intense Pitta pressure jumping distinctly under the second finger.",
        },
        {
          id: "opt-3",
          text: "Hamsa Gati (Kapha dominant slow majestic swan glide)",
          isCorrect: false,
          clinicalRationale: "Hamsa Gati is broad, slow, and deep under the ring finger.",
        },
        {
          id: "opt-4",
          text: "Kaka Gati (Irregular chaotic pulse in Sannipata)",
          isCorrect: false,
          clinicalRationale: "Kaka Gati is intermittent and erratic seen in terminal collapse.",
        },
      ],
    },
    {
      id: "clin-2",
      topic: "Amavata vs Vatarakta Differential",
      category: "Clinical Competency",
      questionType: "CASE_VIGNETTE",
      prompt: "A 36-year-old female presents with early morning stiffness > 1 hour, bilateral wrist swelling with burning heat, fever, and shifting joint agony. How do you distinguish Amavata from Vatarakta?",
      vignette: {
        patientProfile: "36y Female, Primary School Teacher",
        chiefComplaint: "Bilateral wrist & MCP joint pain, morning stiffness",
        nadiPulse: "Gambhira, Manduka-like with Ama sluggishness",
        agniStatus: "Mandagni, heaviness, anorexia (Aruchi)",
      },
      options: [
        {
          id: "opt-1",
          text: "Amavata originates with Mandagni, Ama accumulation in Amashaya, migrating to Sandhi with Gaurava; Vatarakta originates from Rakta-Vata Margavarodha starting in small toe joints",
          isCorrect: true,
          clinicalRationale: "Pathognomonic distinction: Amavata has systemic Ama/Mandagni/Stambha; Vatarakta starts typically at Angushtha (podagra) with intense burning and Rakta dushti.",
        },
        {
          id: "opt-2",
          text: "Both conditions require identical high-dose Snehana and immediate Ghrita intake",
          isCorrect: false,
          clinicalRationale: "Snehana is strictly contraindicated in acute Amavata (Sama state); it causes violent exacerbation.",
        },
        {
          id: "opt-3",
          text: "Amavata is purely a degenerative condition without inflammatory markers",
          isCorrect: false,
          clinicalRationale: "Amavata involves marked inflammatory Purvarupa and acute systemic Ama.",
        },
        {
          id: "opt-4",
          text: "Vatarakta always has normal serum uric acid levels",
          isCorrect: false,
          clinicalRationale: "Vatarakta correlates classically with hyperuricemia and gouty diathesis.",
        },
      ],
    },
    {
      id: "clin-3",
      topic: "Prameha Stage Assessment",
      category: "Clinical Competency",
      questionType: "CASE_VIGNETTE",
      prompt: "A 52-year-old sedentary male with BMI 31, turbid urine, and sweet taste in mouth has fasting glucose 198 mg/dL. Which phase of Prameha is present?",
      vignette: {
        patientProfile: "52y Male, Businessman, Sedentary",
        chiefComplaint: "Prabhuta Avila Mutrata (Frequent turbid urine), Daurbalya",
        nadiPulse: "Manda, Snigdha, Kapha-Pitta Sthana",
        agniStatus: "Mandaagni, Medo-Dhatu dushti",
      },
      options: [
        {
          id: "opt-1",
          text: "Kaphaja Prameha in Medo-dushti phase progressing towards Madhumeha",
          isCorrect: true,
          clinicalRationale: "Prabhuta Avila Mutrata with sweet oral taste and high BMI indicates Medo-Kaphaja Prameha before irreversible Ojo-Kshaya.",
        },
        {
          id: "opt-2",
          text: "Vataja Madhumeha with complete irreversible emaciation (Krisha)",
          isCorrect: false,
          clinicalRationale: "Patient is Sthula (BMI 31) with active Kapha-Meda dominance, not Krisha Madhumeha.",
        },
        {
          id: "opt-3",
          text: "Purely psychological transient polyuria",
          isCorrect: false,
          clinicalRationale: "Biochemical and clinical signs confirm metabolic Prameha.",
        },
        {
          id: "opt-4",
          text: "Pittaja Haridra Meha with hepatic failure",
          isCorrect: false,
          clinicalRationale: "No signs of Haridra Meha or hepatic decompensation.",
        },
      ],
    },
    {
      id: "clin-4",
      topic: "Tamaka Shwasa Acute Crisis",
      category: "Clinical Competency",
      questionType: "SCENARIO",
      prompt: "During an acute attack of Tamaka Shwasa with intense wheezing, orthopnea, and thick sputum, what is the priority classical line of emergency intervention?",
      options: [
        {
          id: "opt-1",
          text: "Urah-Prishtha Snehana with Lavana-Yukta Til Taila followed by mild Swedana to liquefy occluded Kapha",
          isCorrect: true,
          clinicalRationale: "Charaka Chikitsa 17 mandates Lavana-Taila Abhyanga on chest/back and Swedana to quickly dissolve adherent bronchospastic Kapha.",
        },
        {
          id: "opt-2",
          text: "Immediate cold water sponging and heavy sedative decoctions",
          isCorrect: false,
          clinicalRationale: "Cold violently provokes both Vata and Kapha in Shwasa.",
        },
        {
          id: "opt-3",
          text: "Heavy Langhana without topical therapy",
          isCorrect: false,
          clinicalRationale: "Acute respiratory distress requires immediate channel clearance, not prolonged starvation.",
        },
        {
          id: "opt-4",
          text: "Immediate Tikshna Vamana without Purvakarma",
          isCorrect: false,
          clinicalRationale: "Vamana without Snehana/Swedana in acute breathless patient can trigger lethal asphyxia.",
        },
      ],
    },
    {
      id: "clin-5",
      topic: "Grahani Dosha & Microbiome",
      category: "Clinical Competency",
      questionType: "CASE_VIGNETTE",
      prompt: "A 29-year-old IBS patient passes alternating loose and hard stool with mucus, borborygmi, and post-prandial heaviness. Why is Takra (Buttermilk) the single drug of choice in Grahani?",
      vignette: {
        patientProfile: "29y Male, Banking Analyst",
        chiefComplaint: "Muhur Baddha Muhur Shithila Stool, Abdominal Distension",
        nadiPulse: "Vata-Kapha Nadi, Ruksha",
        agniStatus: "Vishamagni, Grahani Gata Ama",
      },
      options: [
        {
          id: "opt-1",
          text: "Takra has Laghu, Kashaya-Amla Rasa, Ushna Virya, Madhura/Amla Vipaka, stimulates Agni without provoking Pitta, and binds stool (Grahi)",
          isCorrect: true,
          clinicalRationale: "Charaka asserts Takra is unmatched in Grahani because its Deepana and Grahi properties rehabilitate the gut mucosal barrier.",
        },
        {
          id: "opt-2",
          text: "Takra acts as a potent purgative flushing out all gut flora",
          isCorrect: false,
          clinicalRationale: "Takra is Grahi (astringent-binding), not purgative.",
        },
        {
          id: "opt-3",
          text: "Takra is heavy and produces Brihmana immediately",
          isCorrect: false,
          clinicalRationale: "Takra is Laghu (light) and Deepana, not heavy.",
        },
        {
          id: "opt-4",
          text: "Takra has no action on Agni",
          isCorrect: false,
          clinicalRationale: "Factually incorrect; Takra is supreme Deepana in Grahani.",
        },
      ],
    },
    {
      id: "clin-6",
      topic: "Kamala Diagnostics",
      category: "Clinical Competency",
      questionType: "MCQ",
      prompt: "In Shakhashrita Kamala (Obstructive Jaundice), what pathognomonic stool appearance confirms biliary tract obstruction?",
      options: [
        {
          id: "opt-1",
          text: "Tila-pishta-nibha Purisha (Clay-colored stool resembling ground sesame paste)",
          isCorrect: true,
          clinicalRationale: "Charaka explicitly documents: 'तिलपिष्टनिभं वर्चः' due to Pitta being diverted to Shakha by Kapha obstruction.",
        },
        {
          id: "opt-2",
          text: "Haridra-varna Purisha (Dark yellow bile-rich stool)",
          isCorrect: false,
          clinicalRationale: "Found in Koshthashrita Kamala, where bile freely reaches the intestinal tract.",
        },
        {
          id: "opt-3",
          text: "Krishna-varna Purisha (Melena / black stool)",
          isCorrect: false,
          clinicalRationale: "Signifies upper gastrointestinal hemorrhage, not uncomplicated Shakhashrita Kamala.",
        },
        {
          id: "opt-4",
          text: "Shweta-Phena Purisha with pure mucus",
          isCorrect: false,
          clinicalRationale: "Signifies pure Kaphaja Pravahika, not biliary obstructive jaundice.",
        },
      ],
    },
    {
      id: "clin-7",
      topic: "Gridhrasi Differential Assessment",
      category: "Clinical Competency",
      questionType: "CASE_VIGNETTE",
      prompt: "A 44-year-old laborer complains of radiating pain from hip to toe, accompanied by Tandra (drowsiness), Gaurava (body heaviness), and Aruchi. Which subtype of Gridhrasi is diagnosed?",
      vignette: {
        patientProfile: "44y Male, Construction Foreman",
        chiefComplaint: "Radiating pain from Sphik to Pada, SLR positive at 40°",
        nadiPulse: "Manda, Gambhira, Kapha-Vata",
        agniStatus: "Agnimandya with severe morning heaviness",
      },
      options: [
        {
          id: "opt-1",
          text: "Vata-Kaphaja Gridhrasi (Stambha, Gaurava, Tandra, Aruchi dominating)",
          isCorrect: true,
          clinicalRationale: "Presence of Tandra, Gaurava, and Aruchi confirms Kapha association with Vata (Vata-Kaphaja Gridhrasi).",
        },
        {
          id: "opt-2",
          text: "Vataja Gridhrasi alone (Piercing shooting pain without stiffness or drowsiness)",
          isCorrect: false,
          clinicalRationale: "Pure Vataja Gridhrasi presents with intense Tod (pricking) and Spandana without Tandra and Aruchi.",
        },
        {
          id: "opt-3",
          text: "Urushthambha",
          isCorrect: false,
          clinicalRationale: "Urushthambha affects both thighs without specific unilateral sciatic nerve radiation.",
        },
        {
          id: "opt-4",
          text: "Pakshaghata",
          isCorrect: false,
          clinicalRationale: "Pakshaghata is unilateral motor hemiplegia, not sciatic radiating pain.",
        },
      ],
    },
    {
      id: "clin-8",
      topic: "Nadi Pulse Velocity & Rhythm",
      category: "Clinical Competency",
      questionType: "MCQ",
      prompt: "At what time of the day and under which physiological condition is Nadi Pariksha most diagnostically accurate according to Yoga Ratnakara?",
      options: [
        {
          id: "opt-1",
          text: "Early morning on an empty stomach (Pratah-kale, Niranna / Prabhat Samaye)",
          isCorrect: true,
          clinicalRationale: "Nadi must be assessed in early morning before meals, exercise, or hot bath for accurate baseline doshic evaluation.",
        },
        {
          id: "opt-2",
          text: "Immediately after a heavy meal to detect digestive fire strength",
          isCorrect: false,
          clinicalRationale: "Post-prandial pulse masks underlying baseline pathology due to transient physiological Pitta/Kapha rise.",
        },
        {
          id: "opt-3",
          text: "Immediately following 30 minutes of rigorous cardio",
          isCorrect: false,
          clinicalRationale: "Vigorous exertion induces artificial Vata-Pitta spike.",
        },
        {
          id: "opt-4",
          text: "During late midnight while half asleep",
          isCorrect: false,
          clinicalRationale: "Contraindicated in classical Nadi texts.",
        },
      ],
    },
    {
      id: "clin-9",
      topic: "Taruna Jwara Protocol",
      category: "Clinical Competency",
      questionType: "SCENARIO",
      prompt: "In a patient presenting with Day 3 acute high fever, burning skin, severe body ache, and heavily coated tongue (Taruna Sama Jwara), why is Ghrita (ghee) strictly contraindicated?",
      options: [
        {
          id: "opt-1",
          text: "Administering Ghrita in Taruna Sama Jwara acts like pouring ghee onto fire, aggravating Ama and causing lethal Srotorodha",
          isCorrect: true,
          clinicalRationale: "Charaka Chikitsa 3 warns: 'ज्वरादौ न तु सर्पिः स्यात्...'. In Taruna Jwara, Langhana and Pachana are mandated; Ghrita is only for Jirna Jwara (after 10-21 days).",
        },
        {
          id: "opt-2",
          text: "Because Ghrita reduces body temperature too rapidly causing hypothermia",
          isCorrect: false,
          clinicalRationale: "Factually incorrect; Ghrita in Ama state elevates toxic fever.",
        },
        {
          id: "opt-3",
          text: "Ghrita stimulates diarrhea in fever",
          isCorrect: false,
          clinicalRationale: "Ghrita in acute Ama Jwara binds toxins and worsens constipation.",
        },
        {
          id: "opt-4",
          text: "Ghrita is only contraindicated in winter fevers",
          isCorrect: false,
          clinicalRationale: "It is contraindicated in all acute Taruna Sama Jwaras across all seasons.",
        },
      ],
    },
    {
      id: "clin-10",
      topic: "Asrigdara & Stree Roga",
      category: "Clinical Competency",
      questionType: "MCQ",
      prompt: "In heavy menstrual bleeding with dark clotted flow and burning sensation (Pitta-Vataja Asrigdara), which classical formulation is first-line therapy?",
      options: [
        {
          id: "opt-1",
          text: "Pushyanuga Churna taken with Tandulodaka (Rice washing water)",
          isCorrect: true,
          clinicalRationale: "Pushyanuga Churna with Tandulodaka is classical Stambhana and Rakta-Pitta-hara prescription in severe uterine hemorrhage.",
        },
        {
          id: "opt-2",
          text: "Kalyanaka Ghrita in heavy dosage",
          isCorrect: false,
          clinicalRationale: "Kalyanaka Ghrita is primarily for psychiatric and neurological conditions.",
        },
        {
          id: "opt-3",
          text: "Pippalyasava",
          isCorrect: false,
          clinicalRationale: "Ushna-Tikshna alcoholic asava will worsen active uterine bleeding.",
        },
        {
          id: "opt-4",
          text: "Chitrakadi Vati",
          isCorrect: false,
          clinicalRationale: "Chitrakadi is hot and caustic; contraindicated in active hemorrhagic disorders.",
        },
      ],
    },
    {
      id: "clin-11",
      topic: "Twak Vikara & Kushta",
      category: "Clinical Competency",
      questionType: "MCQ",
      prompt: "Which Sapta Dravyas constitute the invariable pathological substratum (Saptako Dravya Samgrahah) in all forms of Kushta?",
      options: [
        {
          id: "opt-1",
          text: "Tridoshas (Vata, Pitta, Kapha) + Twak, Rakta, Mamsa, Lasika",
          isCorrect: true,
          clinicalRationale: "Charaka Chikitsa 7: 'त्रयो दोषाः... त्वग्रक्तमांसलसीकाश्चत्वारो दूष्याः—एष सप्ताको द्रव्यसंग्रहः'.",
        },
        {
          id: "opt-2",
          text: "Tridoshas + Asthi, Majja, Shukra, Ojas",
          isCorrect: false,
          clinicalRationale: "Deep Dhatus are involved in advanced stages, but the fundamental 7 substrata include Twak, Rakta, Mamsa, Lasika.",
        },
        {
          id: "opt-3",
          text: "Vata-Pitta alone + Meda and Majja",
          isCorrect: false,
          clinicalRationale: "All 3 Doshas are invariably involved in every Kushta.",
        },
        {
          id: "opt-4",
          text: "Kapha alone + Sweda and Mutra",
          isCorrect: false,
          clinicalRationale: "Factually incorrect pathological grouping.",
        },
      ],
    },
    {
      id: "clin-12",
      topic: "Hridroga Clinical Diagnostics",
      category: "Clinical Competency",
      questionType: "CASE_VIGNETTE",
      prompt: "A 56-year-old male with dyslipidemia and exertional heaviness over precordium has sweet oral taste, excessive salivation, and edema. Which Hridroga type is manifested?",
      vignette: {
        patientProfile: "56y Male, Hypercholesterolemia",
        chiefComplaint: "Precordial heaviness, Praseka (salivation), Ashmavirashraddha",
        nadiPulse: "Gambhira, Manda, Kapha Sthana",
        agniStatus: "Mandagni, Medovaha Srotorodha",
      },
      options: [
        {
          id: "opt-1",
          text: "Kaphaja Hridroga (Precordial heaviness like a stone, salivation, cough, drowsiness)",
          isCorrect: true,
          clinicalRationale: "Sushruta and Charaka list Ashmasamvrita (chest feels pressed by a stone), Praseka, and Gaurava as hallmark of Kaphaja Hridroga.",
        },
        {
          id: "opt-2",
          text: "Vataja Hridroga (Sharp tearing precordial pain with palpitation and emaciation)",
          isCorrect: false,
          clinicalRationale: "Vataja Hridroga causes excruciating sharp pricking (Ruja) and tachycardia, not heaviness and salivation.",
        },
        {
          id: "opt-3",
          text: "Krimija Hridroga with acute cardiac necrosis",
          isCorrect: false,
          clinicalRationale: "Krimija presents with piercing cutting pain as if by needles and blackish discoloration.",
        },
        {
          id: "opt-4",
          text: "Normal non-cardiac gastric reflux",
          isCorrect: false,
          clinicalRationale: "Precordial symptoms with exertional link require cardiac protocol.",
        },
      ],
    },
    {
      id: "clin-13",
      topic: "Sthoulya Metabolic Protocol",
      category: "Clinical Competency",
      questionType: "MCQ",
      prompt: "Why is 'Guru cha Atarpana' (heavy to digest yet non-nourishing) dietary regimen uniquely prescribed in Sthoulya (Obesity)?",
      options: [
        {
          id: "opt-1",
          text: "To pacify the intense morbid Teekshnagni/Bhasmaka Agni while preventing further Medo-Dhatu accumulation",
          isCorrect: true,
          clinicalRationale: "Charaka Sutra 21: Obese patients have voracious Agni surrounded by Medas; food must be heavy to satisfy Agni without producing fat.",
        },
        {
          id: "opt-2",
          text: "To rapidly starve the patient of all essential macronutrients",
          isCorrect: false,
          clinicalRationale: "Starvation increases Vata, exacerbating Bhasmaka Agni.",
        },
        {
          id: "opt-3",
          text: "To induce instant diarrhea",
          isCorrect: false,
          clinicalRationale: "Not the therapeutic goal.",
        },
        {
          id: "opt-4",
          text: "Because obese patients cannot tolerate any physical digestion",
          isCorrect: false,
          clinicalRationale: "Obese patients have hyperactive digestive fire.",
        },
      ],
    },
    {
      id: "clin-14",
      topic: "Mutrashmari Diagnostics",
      category: "Clinical Competency",
      questionType: "MCQ",
      prompt: "A patient presents with excruciating colicky flank pain radiating to the groin, and passes urine containing particles resembling crushed Kadamba flowers. Which Ashmari is diagnosed?",
      options: [
        {
          id: "opt-1",
          text: "Vataja Ashmari (Kadamba-pushpa-sadrishi with sharp thorny projections)",
          isCorrect: true,
          clinicalRationale: "Sushruta Nidana 3: Vataja calculus is irregular, hard, and adorned with thorns like Kadamba flower, causing extreme agony.",
        },
        {
          id: "opt-2",
          text: "Pitta Ashmari (Resembling Bhallataka seed or Madhuka flower)",
          isCorrect: false,
          clinicalRationale: "Pittaja is reddish-yellow or blackish like Marking Nut with burning sensation.",
        },
        {
          id: "opt-3",
          text: "Kaphaja Ashmari (Smooth, white like hen's egg)",
          isCorrect: false,
          clinicalRationale: "Kaphaja calculus is smooth, heavy, and pale (Kukuta-anda-pratima).",
        },
        {
          id: "opt-4",
          text: "Shukrashmari in elderly females",
          isCorrect: false,
          clinicalRationale: "Shukrashmari occurs exclusively in adult males due to coitus interruption.",
        },
      ],
    },
    {
      id: "clin-15",
      topic: "Pakshaghata Immediate Care",
      category: "Clinical Competency",
      questionType: "SCENARIO",
      prompt: "In a patient presenting with acute ischemic stroke recovery (Pakshaghata), what is the definitive classical Shodhana therapy prescribed by Charaka?",
      options: [
        {
          id: "opt-1",
          text: "Snehana, Swedana, and Mridu Snigdha Virechana (स्वेदाभ्यंजनसंयुक्तं पक्षघाते विरेचनम्)",
          isCorrect: true,
          clinicalRationale: "Charaka Chikitsa 28 explicitly establishes: 'पक्षघाते विरेचनम्' - Virechana clears brain channels (Pranavaha Srotas) and relieves downward Vata pressure.",
        },
        {
          id: "opt-2",
          text: "Aggressive bloodletting from all four limbs simultaneously",
          isCorrect: false,
          clinicalRationale: "Contraindicated; causes sudden hemodynamic collapse in ischemic stroke.",
        },
        {
          id: "opt-3",
          text: "Dry fasting for 14 days",
          isCorrect: false,
          clinicalRationale: "Fasting severely aggravates Vata, worsening neurological deficits.",
        },
        {
          id: "opt-4",
          text: "Cold water head baths",
          isCorrect: false,
          clinicalRationale: "Cold induces spasticity and aggravates Vata.",
        },
      ],
    },
  ],

  // =========================================================================
  // 3. PANCHAKARMA & SHODHANA PROTOCOLS (15 Questions)
  // =========================================================================
  panchakarma: [
    {
      id: "pk-1",
      topic: "Purvakarma Snehana Criteria",
      category: "Clinical Competency",
      questionType: "MCQ",
      prompt: "Which set of clinical signs confirms optimum internal oleation (Samyak Snigdha Lakshana) before proceeding to Swedana and Shodhana?",
      options: [
        {
          id: "opt-1",
          text: "Vatanulomana, Deeptagni, Asnigdha Varcha (evacuation of unctuous stool), and Twak Snigdhata (soft lustrous skin)",
          isCorrect: true,
          clinicalRationale: "Charaka Sutra 13: 'वातानुलोम्यं दीप्तोऽग्निर्वर्चः स्निग्धमसंहतम्। मृदुस्निग्धं च गात्रं स्यात् स्निग्धानां लक्षणं स्मृतम्॥'",
        },
        {
          id: "opt-2",
          text: "Severe diarrhea, nausea, and burning sensation in epigastrium",
          isCorrect: false,
          clinicalRationale: "Indicates Atisnigdha (excessive oleation) or Pitta provocation.",
        },
        {
          id: "opt-3",
          text: "Dry scaly skin, hard pellet stool, and flatulence",
          isCorrect: false,
          clinicalRationale: "These are classic signs of Asnigdha (insufficient oleation).",
        },
        {
          id: "opt-4",
          text: "Severe weight loss and loss of appetite",
          isCorrect: false,
          clinicalRationale: "Signs of improper administration.",
        },
      ],
    },
    {
      id: "pk-2",
      topic: "Swedana Contraindications",
      category: "Clinical Competency",
      questionType: "MCQ",
      prompt: "On which anatomical areas must Swedana (sudation) be either completely avoided or applied only with extreme mildness (Alpa/Mridu Sweda)?",
      options: [
        {
          id: "opt-1",
          text: "Mushkam (Scrotum/Testes), Hridaya (Cardiac area), and Netra (Eyes)",
          isCorrect: true,
          clinicalRationale: "Charaka Sutra 14 mandates: 'वृषणौ हृदयं दृशौ च नैव स्वेदयेत्, स्वेदयेद्वा कथमपि मृदु...' to prevent sperm death and cardiac shock.",
        },
        {
          id: "opt-2",
          text: "Back and shoulders",
          isCorrect: false,
          clinicalRationale: "Back and shoulders can safely receive deep sudation.",
        },
        {
          id: "opt-3",
          text: "Palms and soles",
          isCorrect: false,
          clinicalRationale: "Palms and soles can receive standard swedana.",
        },
        {
          id: "opt-4",
          text: "Lumbosacral region",
          isCorrect: false,
          clinicalRationale: "Kati region is prime indication for Kati Basti / Patra Pinda Sweda.",
        },
      ],
    },
    {
      id: "pk-3",
      topic: "Vamana Vidhi & Shuddhi",
      category: "Clinical Competency",
      questionType: "MCQ",
      prompt: "In classical Vamana Karma, which event marks the physiological end-point (Antiki Shuddhi) of optimal emesis?",
      options: [
        {
          id: "opt-1",
          text: "Appearance of Pitta (yellowish bitter fluid) at the end of emetic bouts (Pittanta Vamana)",
          isCorrect: true,
          clinicalRationale: "Classical dictum: 'कफान्तं विरेचनं, पित्तान्तं वमनम्'. Vamana expels stomach contents, then Kapha, terminating cleanly at Pitta.",
        },
        {
          id: "opt-2",
          text: "Passing of solid stool during emesis",
          isCorrect: false,
          clinicalRationale: "Signifies downward motility, not successful emetic climax.",
        },
        {
          id: "opt-3",
          text: "Expulsion of pure blood",
          isCorrect: false,
          clinicalRationale: "Sign of Atiyoga (severe mucosal tear / Mallory-Weiss).",
        },
        {
          id: "opt-4",
          text: "Continuous dry retching for over 2 hours",
          isCorrect: false,
          clinicalRationale: "Indicates Ayoga (ineffective emesis) and distress.",
        },
      ],
    },
    {
      id: "pk-4",
      topic: "Virechana Karma Climax",
      category: "Clinical Competency",
      questionType: "MCQ",
      prompt: "What marks the classical therapeutic end-point (Antiki Shuddhi) of successful Virechana (Therapeutic Purgation)?",
      options: [
        {
          id: "opt-1",
          text: "Appearance of clear mucous-like Kapha at the termination of purgative bouts (Kaphanta Virechana)",
          isCorrect: true,
          clinicalRationale: "Virechana expels stool, then Pitta, terminating cleanly when Kapha appears ('कफान्तं विरेचनम्').",
        },
        {
          id: "opt-2",
          text: "Continuous watery diarrhea for 24 hours without cessation",
          isCorrect: false,
          clinicalRationale: "Life-threatening Atiyoga complication.",
        },
        {
          id: "opt-3",
          text: "Vomiting of dark bile",
          isCorrect: false,
          clinicalRationale: "Indicates upward reversal of peristalsis (Urdhwaga Pitta).",
        },
        {
          id: "opt-4",
          text: "Expulsion of undigested whole food only",
          isCorrect: false,
          clinicalRationale: "Signifies Ayoga or Ajeerna.",
        },
      ],
    },
    {
      id: "pk-5",
      topic: "Samsarjana Krama Calculations",
      category: "Clinical Competency",
      questionType: "SCENARIO",
      prompt: "Following Pravara Shuddhi (superior cleansing with 30 vegas in Virechana), how many Annakala (meal sessions) must the Samsarjana Krama diet be followed?",
      options: [
        {
          id: "opt-1",
          text: "12 Annakala (3 meals each of Peya, Vilepi, Akrita/Krita Yusha, Akrita/Krita Mamsarasa over 7 days)",
          isCorrect: true,
          clinicalRationale: "Pravara Shuddhi requires 12 Annakala (Pradhana); Madhyama requires 8 Annakala; Avara requires 4 Annakala.",
        },
        {
          id: "opt-2",
          text: "Single meal of solid rice on the same evening",
          isCorrect: false,
          clinicalRationale: "Immediate heavy food quenches the tender revived Agni like a spark in water.",
        },
        {
          id: "opt-3",
          text: "4 Annakala for all patients regardless of Shuddhi",
          isCorrect: false,
          clinicalRationale: "Fails to tailor to the depth of Shodhana achieved.",
        },
        {
          id: "opt-4",
          text: "30 days of strict liquid diet",
          isCorrect: false,
          clinicalRationale: "Excessive starvation produces severe Dhatu Kshaya.",
        },
      ],
    },
    {
      id: "pk-6",
      topic: "Basti Spectrum & Classification",
      category: "Clinical Competency",
      questionType: "MCQ",
      prompt: "Why is Basti Karma designated in Charaka Samhita as 'Ardha Chikitsa' (Half of all therapeutics) or even complete medicine?",
      options: [
        {
          id: "opt-1",
          text: "Vata is the primary mover of all Doshas, Dhatus, and Malas, and Pakwashaya is its root seat; controlling Vata via Basti controls the entire organism",
          isCorrect: true,
          clinicalRationale: "Pitta, Kapha, and Malas are Pangu (lame); Vata carries them everywhere. Basti at Pakwashaya controls the master biological conductor.",
        },
        {
          id: "opt-2",
          text: "Because Basti is purely an evacuation enema for constipation",
          isCorrect: false,
          clinicalRationale: "Gross misconception; Basti is systemic cellular medicine absorbed through the rectal-colonic plexus.",
        },
        {
          id: "opt-3",
          text: "Because it only treats anorectal fistulas",
          isCorrect: false,
          clinicalRationale: "Basti treats over 80 Nanatmaja Vata disorders systemically.",
        },
        {
          id: "opt-4",
          text: "Because it replaces oral medications completely for life",
          isCorrect: false,
          clinicalRationale: "It is an intensive therapy administered in defined courses (Karma, Kala, Yoga Basti).",
        },
      ],
    },
    {
      id: "pk-7",
      topic: "Niruha Basti Preparation Sequence",
      category: "Clinical Competency",
      questionType: "MCQ",
      prompt: "In the classical compounding of Niruha Basti (Basti Samvidhana), what is the strict sequential order of mixing the ingredients?",
      options: [
        {
          id: "opt-1",
          text: "Makshika (Honey) → Saindhava (Rock salt) → Sneha (Oil/Ghee) → Kalka (Paste) → Kwatha (Decoction)",
          isCorrect: true,
          clinicalRationale: "Classical sequence: 'माक्षिकं लवणं स्नेहं कल्कं क्वाथं च योजयेत्'. This specific order ensures stable micro-emulsion without phase separation.",
        },
        {
          id: "opt-2",
          text: "Kwatha first, then Honey, then Salt, then Oil",
          isCorrect: false,
          clinicalRationale: "Adding salt directly to decoction breaks lipid emulsification.",
        },
        {
          id: "opt-3",
          text: "All ingredients mixed simultaneously in high-speed blender",
          isCorrect: false,
          clinicalRationale: "Trituration in mortar in sequence is mandatory for thermodynamic emulsion stability.",
        },
        {
          id: "opt-4",
          text: "Oil first, then Decoction, then Honey",
          isCorrect: false,
          clinicalRationale: "Causes oil to float separately on top.",
        },
      ],
    },
    {
      id: "pk-8",
      topic: "Matra Basti Administration",
      category: "Clinical Competency",
      questionType: "MCQ",
      prompt: "What distinguishes Matra Basti from standard Sneha/Anuvasana Basti regarding patient lifestyle restrictions?",
      options: [
        {
          id: "opt-1",
          text: "It can be administered daily, has no strict diet/exercise restrictions, is safe in all seasons, and can be given to children, elderly, and active workers",
          isCorrect: true,
          clinicalRationale: "Charaka Siddhisthana 4: Matra Basti is half dose of Anuvasana (1.5 Pala ≈ 72 ml), requires no strict regimen, and imparts instant strength.",
        },
        {
          id: "opt-2",
          text: "It requires 7 days of hospital admission in ICU",
          isCorrect: false,
          clinicalRationale: "Matra Basti is an outpatient OPD procedure.",
        },
        {
          id: "opt-3",
          text: "It must only be given during night without food",
          isCorrect: false,
          clinicalRationale: "Given immediately after a light warm meal.",
        },
        {
          id: "opt-4",
          text: "It causes massive watery purging within 5 minutes",
          isCorrect: false,
          clinicalRationale: "It is an unctuous retention enema meant to stay in the rectum for hours to nourish Dhatus.",
        },
      ],
    },
    {
      id: "pk-9",
      topic: "Nasya Karma Classifications",
      category: "Clinical Competency",
      questionType: "MCQ",
      prompt: "Which form of Nasya can be safely practiced daily as part of Dinacharya for sensory preservation and prevention of graying of hair?",
      options: [
        {
          id: "opt-1",
          text: "Pratimarsha Nasya (2 drops of Anu Taila in each nostril daily)",
          isCorrect: true,
          clinicalRationale: "Pratimarsha Nasya (2 drops) has zero complications, requires no Purvakarma, and preserves eyes, ears, hair, and cerebral alertness.",
        },
        {
          id: "opt-2",
          text: "Marsha Nasya in maximum 10-drop dose daily",
          isCorrect: false,
          clinicalRationale: "Marsha Nasya requires strict Purvakarma and cannot be taken casually daily in modern busy routines.",
        },
        {
          id: "opt-3",
          text: "Tikshna Pradhamana Nasya with Katphala powder daily",
          isCorrect: false,
          clinicalRationale: "Pradhamana is dry powder insufflation for acute coma/apoplexy, violently irritating if used daily.",
        },
        {
          id: "opt-4",
          text: "Avapeedana Nasya with fresh onion juice daily",
          isCorrect: false,
          clinicalRationale: "Highly caustic; used for poisoning/epilepsy emergencies.",
        },
      ],
    },
    {
      id: "pk-10",
      topic: "Shirodhara Clinical Selection",
      category: "Clinical Competency",
      questionType: "SCENARIO",
      prompt: "A 42-year-old hypertensive female with severe hot flashes, burning eyes, irritability, and Pitta-dominant insomnia is scheduled for Shirodhara. Which liquid medium is specifically indicated?",
      options: [
        {
          id: "opt-1",
          text: "Takradhara (Medicated buttermilk boiled with Musta and Amalaki)",
          isCorrect: true,
          clinicalRationale: "Takradhara has supreme cooling (Sheeta-Pitta-shamaka) action, ideal for stress-induced hypertension, burning sensation, and Pitta insomnia.",
        },
        {
          id: "opt-2",
          text: "Hot mustard oil (Sarshapa Taila)",
          isCorrect: false,
          clinicalRationale: "Extremely heating; aggravates Pitta and hypertension.",
        },
        {
          id: "opt-3",
          text: "Pure vinegar (Kanji) heated to boiling",
          isCorrect: false,
          clinicalRationale: "Severe irritant, contraindicated in Pitta insomnia.",
        },
        {
          id: "opt-4",
          text: "Undiluted alcohol",
          isCorrect: false,
          clinicalRationale: "Dangerous and non-classical.",
        },
      ],
    },
    {
      id: "pk-11",
      topic: "Raktamokshana Modality Selection",
      category: "Clinical Competency",
      questionType: "MCQ",
      prompt: "According to Acharya Sushruta, which bloodletting method is specifically designated for Pitta-dominant and deep localized blood vitiation in delicate patients?",
      options: [
        {
          id: "opt-1",
          text: "Jalaukavacharana (Leech Therapy - Jalauka is Sheeta, Madhura, and Pitta-shamaka)",
          isCorrect: true,
          clinicalRationale: "Sushruta Sutra 13: Jalauka for Pitta; Shringa (Cow horn) for Vata; Alabu (Gourd) for Kapha; Siravyadha for generalized Tridosha.",
        },
        {
          id: "opt-2",
          text: "Shringa (Cow horn suction) for Pitta",
          isCorrect: false,
          clinicalRationale: "Shringa has Ushna-Snigdha properties, strictly for Vata-Rakta.",
        },
        {
          id: "opt-3",
          text: "Alabu (Gourd cup suction) for Pitta",
          isCorrect: false,
          clinicalRationale: "Alabu has Rooksha-Ushna properties, designated for Kapha.",
        },
        {
          id: "opt-4",
          text: "Prachhanna with coarse stones",
          isCorrect: false,
          clinicalRationale: "Archaic and factually incorrect.",
        },
      ],
    },
    {
      id: "pk-12",
      topic: "Jalauka Post-Care & Vamana",
      category: "Clinical Competency",
      questionType: "MCQ",
      prompt: "Following completion of Leech application (Jalaukavacharana), how is the leech prompted to vomit ingested impure blood to prevent its demise?",
      options: [
        {
          id: "opt-1",
          text: "Dusting fine Haridra (Turmeric) or Saindhava powder on its mouth and gently stroking from tail to head",
          isCorrect: true,
          clinicalRationale: "Sushruta Sutra 13: 'तन्मुखात् तैललवणाभ्यामवतार्य... हरिद्राचूर्णेन वमयेत्'. Failure to induce emesis causes Leech poisoning (Raktamada).",
        },
        {
          id: "opt-2",
          text: "Boiling the leech in hot water immediately",
          isCorrect: false,
          clinicalRationale: "Kills the therapeutic leech.",
        },
        {
          id: "opt-3",
          text: "Freezing the leech at -20°C",
          isCorrect: false,
          clinicalRationale: "Fatal to the organism.",
        },
        {
          id: "opt-4",
          text: "Feeding it pure cow ghee immediately",
          isCorrect: false,
          clinicalRationale: "Leech cannot digest heavy ghee.",
        },
      ],
    },
    {
      id: "pk-13",
      topic: "Kati Basti Clinical Protocol",
      category: "Clinical Competency",
      questionType: "SCENARIO",
      prompt: "In administering Kati Basti for Lumbar Disc Herniation with Radiculopathy (Kativata), what technical principle governs the therapeutic efficacy?",
      options: [
        {
          id: "opt-1",
          text: "Continuous uniform thermal immersion (38-42°C) of warm medicated taila within a masha-dough ring for 30-45 minutes, producing transdermal lipid diffusion",
          isCorrect: true,
          clinicalRationale: "Maintained temperature ensures peripheral vasodilation, ligamentous softening, and transcutaneous bioactive lipid penetration.",
        },
        {
          id: "opt-2",
          text: "Pouring boiling oil directly without a containment ring",
          isCorrect: false,
          clinicalRationale: "Produces third-degree thermal burns.",
        },
        {
          id: "opt-3",
          text: "Using chilled ice water inside the dough ring",
          isCorrect: false,
          clinicalRationale: "Ice severely aggravates Vata and muscle spasticity.",
        },
        {
          id: "opt-4",
          text: "Immediate intense spinal twisting manipulation during oil retention",
          isCorrect: false,
          clinicalRationale: "Violates immobilization principles and risks disc rupture.",
        },
      ],
    },
    {
      id: "pk-14",
      topic: "Virechana Vyapad & Management",
      category: "Clinical Competency",
      questionType: "CASE_VIGNETTE",
      prompt: "A patient develops 'Guda-Nissarana' (Rectal Prolapse) and intense burning with dehydration following excessive bouts of Virechana (Atiyoga). What is the immediate antidote protocol?",
      options: [
        {
          id: "opt-1",
          text: "Cold water washing, applying Picchila Basti (e.g., Ksheera + Ghritha + Shalmalee vrinta), reducing prolapse, and oral Shadanga Paniya",
          isCorrect: true,
          clinicalRationale: "Charaka Siddhisthana 6: Picchila Basti and Ghrita restore colonic tone, arrest excessive evacuation, and pacify provoked Pitta-Vata.",
        },
        {
          id: "opt-2",
          text: "Administering another dose of castor oil to clear residual drugs",
          isCorrect: false,
          clinicalRationale: "Fatal; will cause hypovolemic shock in an already exhausted patient.",
        },
        {
          id: "opt-3",
          text: "Heavy aerobic exercise to push prolapsed bowel back",
          isCorrect: false,
          clinicalRationale: "Severely aggravates mucosal edema and tissue ischemia.",
        },
        {
          id: "opt-4",
          text: "Hot dry Fomentation directly on raw prolapsed mucosa",
          isCorrect: false,
          clinicalRationale: "Burns fragile swollen mucosal lining.",
        },
      ],
    },
    {
      id: "pk-15",
      topic: "Uttarabasti in Gynae & Uro",
      category: "Clinical Competency",
      questionType: "MCQ",
      prompt: "What is the mandatory clinical prerequisite and timing for administering Uttarabasti in female tubal blockage and infertility?",
      options: [
        {
          id: "opt-1",
          text: "Administered during 'Ritukala' (post-menstrual proliferative phase, days 6 to 11) under strict aseptic conditions following localized Yoni Prakshalana",
          isCorrect: true,
          clinicalRationale: "During Ritukala the cervical os (Garbhashaya Mukha) is receptive, unencumbered by menstrual debris, allowing medicated taila to penetrate fallopian conduits.",
        },
        {
          id: "opt-2",
          text: "Administered during active heavy menstrual bleeding on Day 1",
          isCorrect: false,
          clinicalRationale: "Contraindicated; retrograde flow of blood and taila causes severe pelvic peritonitis.",
        },
        {
          id: "opt-3",
          text: "Given only during the third trimester of pregnancy",
          isCorrect: false,
          clinicalRationale: "Absolutely contraindicated in pregnancy; induces abortion.",
        },
        {
          id: "opt-4",
          text: "No aseptic precautions needed for Ayurvedic catheters",
          isCorrect: false,
          clinicalRationale: "Strict surgical asepsis is mandatory to prevent pelvic inflammatory disease (PID).",
        },
      ],
    },
  ],

  // =========================================================================
  // 4. ASU-GMP, PHARMACOVIGILANCE & DRUG REGULATIONS (15 Questions)
  // =========================================================================
  pharma: [
    {
      id: "ph-1",
      topic: "Schedule T (ASU-GMP Standards)",
      category: "Professional Skills",
      questionType: "MCQ",
      prompt: "Under Schedule T of the Drugs and Cosmetics Rules, 1945, what is the minimum required space for an Ayurvedic manufacturing unit with basic sections?",
      options: [
        {
          id: "opt-1",
          text: "Minimum 1200 square feet for covered manufacturing area with dedicated raw material, testing, and finished goods quarantine stores",
          isCorrect: true,
          clinicalRationale: "Schedule T mandates minimum 1200 sq.ft for basic manufacturing operations plus additional space per ancillary section (Tablets, Taila, Bhasma).",
        },
        {
          id: "opt-2",
          text: "100 square feet room in a residential apartment",
          isCorrect: false,
          clinicalRationale: "Violates industrial zoning, cross-contamination standards, and statutory GMP licensing regulations.",
        },
        {
          id: "opt-3",
          text: "No minimum area required if classical books are on display",
          isCorrect: false,
          clinicalRationale: "Schedule T is statutory law with mandatory physical audit verification.",
        },
        {
          id: "opt-4",
          text: "10 acres open agricultural field",
          isCorrect: false,
          clinicalRationale: "Schedule T focuses on covered hygienic industrial facility requirements, not agricultural acreage.",
        },
      ],
    },
    {
      id: "ph-2",
      topic: "Pharmacovigilance ADR Protocol",
      category: "Professional Skills",
      questionType: "MCQ",
      prompt: "Under the National Pharmacovigilance Programme for ASU&H Drugs, within what time frame must a Serious Adverse Drug Reaction (SADR) resulting in death or hospitalization be reported?",
      options: [
        {
          id: "opt-1",
          text: "Within 24 hours of occurrence/receipt of notification to the Peripheral/Intermediary Pharmacovigilance Centre",
          isCorrect: true,
          clinicalRationale: "NPvP-ASU&H protocols mandate accelerated reporting of life-threatening and fatal events within 24 hours for regulatory action.",
        },
        {
          id: "opt-2",
          text: "Within 6 months in an annual newsletter",
          isCorrect: false,
          clinicalRationale: "Gross regulatory non-compliance that risks public health.",
        },
        {
          id: "opt-3",
          text: "Only if the patient files a criminal court case",
          isCorrect: false,
          clinicalRationale: "Pharmacovigilance is proactive scientific safety surveillance, not court litigation.",
        },
        {
          id: "opt-4",
          text: "Never report if the drug is in the classical text",
          isCorrect: false,
          clinicalRationale: "Classical formulations can produce ADRs due to adulteration, incorrect processing, or improper dosage.",
        },
      ],
    },
    {
      id: "ph-3",
      topic: "Heavy Metal Permissible Limits",
      category: "Professional Skills",
      questionType: "MCQ",
      prompt: "According to the Ayurvedic Pharmacopoeia of India (API) and WHO guidelines for herbal raw materials, what is the maximum permissible limit for Lead (Pb)?",
      options: [
        {
          id: "opt-1",
          text: "10.0 ppm (parts per million)",
          isCorrect: true,
          clinicalRationale: "Standard limits for herbal products: Lead (Pb) <= 10 ppm; Cadmium (Cd) <= 0.3 ppm; Arsenic (As) <= 3 ppm; Mercury (Hg) <= 1 ppm.",
        },
        {
          id: "opt-2",
          text: "1000 ppm",
          isCorrect: false,
          clinicalRationale: "Grossly toxic level that causes acute lead poisoning and encephalopathy.",
        },
        {
          id: "opt-3",
          text: "Zero tolerance (0.0000 ppm) impossible in soil-grown plants",
          isCorrect: false,
          clinicalRationale: "Geochemical background trace levels exist naturally; regulatory threshold is 10 ppm.",
        },
        {
          id: "opt-4",
          text: "100 ppm",
          isCorrect: false,
          clinicalRationale: "Ten times the legal threshold.",
        },
      ],
    },
    {
      id: "ph-4",
      topic: "Microbial Contamination Testing",
      category: "Professional Skills",
      questionType: "MCQ",
      prompt: "In quality testing of oral Ayurvedic churna/formulations, which specific pathogen must be completely ABSENT in 1 gram of sample?",
      options: [
        {
          id: "opt-1",
          text: "Escherichia coli and Salmonella species (Must be completely absent / gram)",
          isCorrect: true,
          clinicalRationale: "API mandates total absence of enteropathogenic E. coli and Salmonella per gram to prevent waterborne/fecal toxicity.",
        },
        {
          id: "opt-2",
          text: "Lactobacillus acidophilus",
          isCorrect: false,
          clinicalRationale: "Benign probiotic organism; not screened as a restricted fecal contaminant.",
        },
        {
          id: "opt-3",
          text: "Saccharomyces cerevisiae",
          isCorrect: false,
          clinicalRationale: "Standard yeast utilized in Asava/Arishta fermentation.",
        },
        {
          id: "opt-4",
          text: "Spirulina platensis",
          isCorrect: false,
          clinicalRationale: "Nutritional alga, not an enteropathogenic criterion.",
        },
      ],
    },
    {
      id: "ph-5",
      topic: "Pesticide Residue Assessment",
      category: "Professional Skills",
      questionType: "MCQ",
      prompt: "Which modern analytical instrument is mandatory for multi-residue pesticide analysis in herbal raw materials under AYUSH export guidelines?",
      options: [
        {
          id: "opt-1",
          text: "GC-MS/MS (Gas Chromatography-Tandem Mass Spectrometry) or LC-MS/MS",
          isCorrect: true,
          clinicalRationale: "Tandem mass spectrometry provides parts-per-billion (ppb) sensitivity required to detect organochlorine and organophosphate pesticides.",
        },
        {
          id: "opt-2",
          text: "Simple handheld optical refractometer",
          isCorrect: false,
          clinicalRationale: "Refractometers measure refractive index (Brix) in syrups, not pesticide residues.",
        },
        {
          id: "opt-3",
          text: "Litmus paper strip",
          isCorrect: false,
          clinicalRationale: "Measures pH only.",
        },
        {
          id: "opt-4",
          text: "Mercury thermometer",
          isCorrect: false,
          clinicalRationale: "Measures temperature only.",
        },
      ],
    },
    {
      id: "ph-6",
      topic: "HPTLC Chemical Fingerprinting",
      category: "Professional Skills",
      questionType: "SCENARIO",
      prompt: "A manufacturer claims a batch of Ashwagandharishta contains authenticated Withania somnifera. Which analytical marker compound confirms identity on HPTLC?",
      options: [
        {
          id: "opt-1",
          text: "Withaferin-A and Withanolide-A (quantified against reference standard Rf values)",
          isCorrect: true,
          clinicalRationale: "Withaferin-A and Withanolide-A are the statutory active chemical markers defined in the API monograph for Withania somnifera.",
        },
        {
          id: "opt-2",
          text: "Curcumin III",
          isCorrect: false,
          clinicalRationale: "Curcumin is the chemical marker for Haridra (Curcuma longa).",
        },
        {
          id: "opt-3",
          text: "Piperine",
          isCorrect: false,
          clinicalRationale: "Piperine is the chemical marker for Maricha/Pippali.",
        },
        {
          id: "opt-4",
          text: "Guggulsterone E and Z",
          isCorrect: false,
          clinicalRationale: "Guggulsterones are markers for Commiphora mukul.",
        },
      ],
    },
    {
      id: "ph-7",
      topic: "Accelerated Stability Testing",
      category: "Professional Skills",
      questionType: "MCQ",
      prompt: "Under ICH/AYUSH stability testing guidelines for ASU drugs, what are the standard accelerated environmental test conditions?",
      options: [
        {
          id: "opt-1",
          text: "40°C ± 2°C temperature with 75% ± 5% Relative Humidity (RH) for 6 months",
          isCorrect: true,
          clinicalRationale: "Standard ICH/AYUSH accelerated stability testing conditions simulating 2-3 years shelf-life stress.",
        },
        {
          id: "opt-2",
          text: "0°C in an open freezer without humidity",
          isCorrect: false,
          clinicalRationale: "Freezing does not test accelerated thermal and moisture degradation.",
        },
        {
          id: "opt-3",
          text: "100°C boiling water bath for 2 hours",
          isCorrect: false,
          clinicalRationale: "Causes instant thermal destruction, unrepresentative of ambient product shelf life.",
        },
        {
          id: "opt-4",
          text: "Exposing to direct monsoon rain on open rooftop",
          isCorrect: false,
          clinicalRationale: "Uncontrolled and unscientific.",
        },
      ],
    },
    {
      id: "ph-8",
      topic: "Rule 161 Labeling Compliance",
      category: "Professional Skills",
      questionType: "MCQ",
      prompt: "Under Rule 161 of Drugs & Cosmetics Rules, what statutory warning must be conspicuously printed on all formulations containing Schedule E(1) poisonous herbs?",
      options: [
        {
          id: "opt-1",
          text: "'Caution: To be taken under medical supervision' printed in Hindi and English",
          isCorrect: true,
          clinicalRationale: "Rule 161 mandates this explicit warning for all products containing ingredients like Vatsanabha, Bhallataka, Kupilu, and Gunja.",
        },
        {
          id: "opt-2",
          text: "'Free from all chemicals, safe for all infants in unlimited dosage'",
          isCorrect: false,
          clinicalRationale: "Illegal, misleading, and dangerous advertisement under the Magic Remedies Act.",
        },
        {
          id: "opt-3",
          text: "No warning needed if the manufacturer is in Uttarakhand",
          isCorrect: false,
          clinicalRationale: "Rule 161 is a federal law applicable uniformly across all Indian states and Union Territories.",
        },
        {
          id: "opt-4",
          text: "'Approved by Food Safety Authority for daily confectionery snack'",
          isCorrect: false,
          clinicalRationale: "ASU medicines are regulated under AYUSH, not as confectionery under FSSAI.",
        },
      ],
    },
    {
      id: "ph-9",
      topic: "API Monograph Parameters",
      category: "Professional Skills",
      questionType: "MCQ",
      prompt: "What does an excessively high 'Acid-Insoluble Ash' percentage in an Ayurvedic Churna monograph signify?",
      options: [
        {
          id: "opt-1",
          text: "Contamination with siliceous earth, sand, and soil during harvesting or post-harvest handling",
          isCorrect: true,
          clinicalRationale: "Acid-insoluble ash primarily measures silica/sand; high values prove poor washing and dirty raw material handling.",
        },
        {
          id: "opt-2",
          text: "High concentration of active therapeutic bioflavonoids",
          isCorrect: false,
          clinicalRationale: "Bioflavonoids combust into organic smoke; acid-insoluble ash is purely mineral/sand residue.",
        },
        {
          id: "opt-3",
          text: "Excessive moisture content in the packaging",
          isCorrect: false,
          clinicalRationale: "Moisture is evaluated by 'Loss on Drying' (LOD), not acid-insoluble ash.",
        },
        {
          id: "opt-4",
          text: "High percentage of volatile essential oils",
          isCorrect: false,
          clinicalRationale: "Volatile oils are measured via Clevenger hydro-distillation apparatus.",
        },
      ],
    },
    {
      id: "ph-10",
      topic: "Asava & Arishta Alcohol Limits",
      category: "Professional Skills",
      questionType: "MCQ",
      prompt: "Under the Ayurvedic Pharmacopoeia of India, what is the permissible self-generated alcohol limit in classical Asavas and Arishtas?",
      options: [
        {
          id: "opt-1",
          text: "Between 5% v/v and 12% v/v (Self-generated via Dhataki flower fermentation; non-distilled)",
          isCorrect: true,
          clinicalRationale: "Self-generated alcohol acts as a natural solvent and preservative; API sets the maximum standard ceiling at 12% v/v.",
        },
        {
          id: "opt-2",
          text: "42.8% v/v (Same as commercial rectified spirit)",
          isCorrect: false,
          clinicalRationale: "Adding rectified ethyl alcohol is illegal adulteration in classical Asava/Arishta manufacturing.",
        },
        {
          id: "opt-3",
          text: "Exactly 0.00% alcohol in all batches",
          isCorrect: false,
          clinicalRationale: "Classical Sandhana Kalpana inherently produces natural bio-ethanol.",
        },
        {
          id: "opt-4",
          text: "Over 80% v/v",
          isCorrect: false,
          clinicalRationale: "Prohibited; causes severe toxicity and violates pharmacopoeial limits.",
        },
      ],
    },
    {
      id: "ph-11",
      topic: "Schedule E(1) Shodhana Protocols",
      category: "Professional Skills",
      questionType: "SCENARIO",
      prompt: "Vatsanabha (Aconitum chasmanthum) contains neurotoxic aconitine alkaloids. Which classical Shodhana process reduces cardiac toxicity while retaining analgesic properties?",
      options: [
        {
          id: "opt-1",
          text: "Swedana in Gomutra (Cow urine) or Godugdha (Cow milk) in a Dola Yantra for 3 to 6 hours",
          isCorrect: true,
          clinicalRationale: "Aconitine hydrolyzes into benzoylaconine and aconine (1/100th less toxic) during thermal processing in cow milk/urine.",
        },
        {
          id: "opt-2",
          text: "Washing with plain cold river water for 5 seconds",
          isCorrect: false,
          clinicalRationale: "Fails to hydrolyze poisonous aconitine, retaining lethal toxicity.",
        },
        {
          id: "opt-3",
          text: "Irradiation with gamma rays without heating",
          isCorrect: false,
          clinicalRationale: "Does not perform the chemical de-esterification achieved by classical Shodhana.",
        },
        {
          id: "opt-4",
          text: "Adding synthetic paracetamol to the raw root",
          isCorrect: false,
          clinicalRationale: "Illegal allopathic adulteration under the Drugs & Cosmetics Act.",
        },
      ],
    },
    {
      id: "ph-12",
      topic: "Manufacturing License Types",
      category: "Professional Skills",
      questionType: "MCQ",
      prompt: "Under the Drugs and Cosmetics Act, what is the fundamental difference between an Ayurvedic 'Classical License' and a 'Patent/Proprietary (P&P) License'?",
      options: [
        {
          id: "opt-1",
          text: "Classical formulations strictly use ingredients and methods from recognized First Schedule Samhitas; P&P products contain Samhita ingredients in novel combinations/ratios",
          isCorrect: true,
          clinicalRationale: "Classical (Form 25D) refers strictly to texts in First Schedule; Proprietary Ayush medicines require safety data/pilot evidence under Rule 158B.",
        },
        {
          id: "opt-2",
          text: "Classical products require zero quality testing; P&P requires full testing",
          isCorrect: false,
          clinicalRationale: "Both classical and proprietary products must strictly comply with Schedule T and API standards.",
        },
        {
          id: "opt-3",
          text: "P&P medicines can incorporate modern synthetic antibiotics legally",
          isCorrect: false,
          clinicalRationale: "Adding modern synthetic active pharmaceutical ingredients (APIs) is a non-bailable criminal offense.",
        },
        {
          id: "opt-4",
          text: "Classical licenses expire every 7 days",
          isCorrect: false,
          clinicalRationale: "Factually incorrect licensing tenure.",
        },
      ],
    },
    {
      id: "ph-13",
      topic: "Aflatoxin Contamination Limits",
      category: "Professional Skills",
      questionType: "MCQ",
      prompt: "What is the maximum permissible limit for total Aflatoxins (B1 + B2 + G1 + G2) in herbal medicinal raw materials under international and AYUSH export standards?",
      options: [
        {
          id: "opt-1",
          text: "Not more than 4 µg/kg (ppb) for Aflatoxin B1, and not more than 10 µg/kg (ppb) for Total Aflatoxins",
          isCorrect: true,
          clinicalRationale: "Strict limits prevent potent carcinogenic Aspergillus hepatotoxicity in herbal consumers.",
        },
        {
          id: "opt-2",
          text: "5000 µg/kg",
          isCorrect: false,
          clinicalRationale: "Fatal toxic level.",
        },
        {
          id: "opt-3",
          text: "Aflatoxins are considered beneficial vitamins in Ayurveda",
          isCorrect: false,
          clinicalRationale: "Aflatoxins are potent fungal toxins and Class 1 human carcinogens.",
        },
        {
          id: "opt-4",
          text: "100 mg/kg",
          isCorrect: false,
          clinicalRationale: "Lethal concentration.",
        },
      ],
    },
    {
      id: "ph-14",
      topic: "Quality Council of India (QCI) Ayush Mark",
      category: "Professional Skills",
      questionType: "MCQ",
      prompt: "What is the critical distinction between 'AYUSH Standard Mark' and 'AYUSH Premium Mark' certified by the Quality Council of India (QCI)?",
      options: [
        {
          id: "opt-1",
          text: "AYUSH Standard Mark confirms compliance with domestic API standards; AYUSH Premium Mark confirms compliance with stringent WHO-GMP, US-FDA, and EU herbal export limits",
          isCorrect: true,
          clinicalRationale: "QCI Voluntary Certification: Standard Mark = National compliance; Premium Mark = International global export benchmarks (heavy metals, pesticides, microbial).",
        },
        {
          id: "opt-2",
          text: "Standard Mark is for cosmetics; Premium Mark is for gold bhasmas only",
          isCorrect: false,
          clinicalRationale: "Misconception; both apply across the entire spectrum of ASU formulations.",
        },
        {
          id: "opt-3",
          text: "Premium mark allows self-declaration without factory audit",
          isCorrect: false,
          clinicalRationale: "Premium Mark involves third-party laboratory testing and rigorous physical on-site audits.",
        },
        {
          id: "opt-4",
          text: "There is no difference between the two certifications",
          isCorrect: false,
          clinicalRationale: "They serve distinct domestic versus export compliance tiers.",
        },
      ],
    },
    {
      id: "ph-15",
      topic: "Section 33EE (Spurious ASU Drugs)",
      category: "Professional Skills",
      questionType: "MCQ",
      prompt: "Under Section 33EE of the Drugs and Cosmetics Act, which scenario constitutes a 'Spurious Ayurvedic Drug'?",
      options: [
        {
          id: "opt-1",
          text: "If it is manufactured under a name belonging to another drug, or bears the label of a fictitious company, or substitutes another drug in whole or part",
          isCorrect: true,
          clinicalRationale: "Section 33EE explicitly defines spurious Ayurvedic drugs; punishable by imprisonment and heavy non-bailable fines.",
        },
        {
          id: "opt-2",
          text: "If a patient experiences a known mild bitter taste",
          isCorrect: false,
          clinicalRationale: "Bitter taste (Tikta Rasa) is an authentic pharmacological feature.",
        },
        {
          id: "opt-3",
          text: "If it uses certified organic jaggery instead of sugar",
          isCorrect: false,
          clinicalRationale: "Jaggery (Guda) is the classical fermenting medium.",
        },
        {
          id: "opt-4",
          text: "If the product label is in Sanskrit and English",
          isCorrect: false,
          clinicalRationale: "Bilingual labeling is standard statutory practice.",
        },
      ],
    },
  ],

  // =========================================================================
  // 5. GCP-AYUSH & CLINICAL TRIAL METHODOLOGY (15 Questions)
  // =========================================================================
  research: [
    {
      id: "res-1",
      topic: "GCP-Ayush Ethical Mandates",
      category: "Research Skills",
      questionType: "MCQ",
      prompt: "Under the Good Clinical Practice (GCP) guidelines for Clinical Research in Ayurveda (Ministry of Ayush), what is the mandatory primary ethical priority?",
      options: [
        {
          id: "opt-1",
          text: "Commercial profitability of the sponsoring pharmaceutical company",
          isCorrect: false,
          clinicalRationale: "Commercial interests must never take precedence over human subject safety.",
        },
        {
          id: "opt-2",
          text: "Protection of human participant rights, physical safety, well-being, and clinical confidentiality",
          isCorrect: true,
          clinicalRationale: "GCP Core Axiom: Human subject welfare always supersedes the interests of science and society.",
        },
        {
          id: "opt-3",
          text: "Publishing scientific papers in high impact factor journals within 30 days",
          isCorrect: false,
          clinicalRationale: "Publishing speed is secondary to ethical compliance and rigour.",
        },
        {
          id: "opt-4",
          text: "Ensuring all participants receive identical surgical interventions",
          isCorrect: false,
          clinicalRationale: "Irrelevant and contraindicated in observational/medical herbal trials.",
        },
      ],
    },
    {
      id: "res-2",
      topic: "Institutional Ethics Committee (IEC)",
      category: "Research Skills",
      questionType: "MCQ",
      prompt: "What is the mandatory minimum composition of an Institutional Ethics Committee (IEC) approving an Ayurvedic clinical trial under ICMR guidelines?",
      options: [
        {
          id: "opt-1",
          text: "Minimum 7-15 members including Chairperson (non-affiliated), Member Secretary, Clinicians (including Ayurvedic expert), Basic Medical Scientist, Pharmacologist, Legal Expert, Social Scientist, and Layperson",
          isCorrect: true,
          clinicalRationale: "ICMR & GCP-Ayush mandate multi-disciplinary oversight with an unaffiliated external chairperson and non-medical layperson representation.",
        },
        {
          id: "opt-2",
          text: "Only the Principal Investigator and their spouse",
          isCorrect: false,
          clinicalRationale: "Extreme conflict of interest; illegal under ICMR rules.",
        },
        {
          id: "opt-3",
          text: "Two commercial sales representatives of the drug company",
          isCorrect: false,
          clinicalRationale: "Commercial sponsors are disqualified from voting on ethics committees.",
        },
        {
          id: "opt-4",
          text: "Single departmental head without external oversight",
          isCorrect: false,
          clinicalRationale: "Violates quorum and federal regulatory guidelines.",
        },
      ],
    },
    {
      id: "res-3",
      topic: "Informed Consent Documentation",
      category: "Research Skills",
      questionType: "MCQ",
      prompt: "In clinical research involving illiterate or semi-literate participants in rural Ayush dispensaries, what is statutory for Informed Consent?",
      options: [
        {
          id: "opt-1",
          text: "Patient Information Sheet in simple vernacular language, audio-visual recording if mandated, thumb impression, and signature of an impartial literate witness",
          isCorrect: true,
          clinicalRationale: "GCP requires impartial witness verification to ensure uncoerced comprehension of risks and free withdrawal rights.",
        },
        {
          id: "opt-2",
          text: "Verbal approval over the phone without documentation",
          isCorrect: false,
          clinicalRationale: "Completely invalid under regulatory auditing.",
        },
        {
          id: "opt-3",
          text: "Signing a 20-page document printed exclusively in Latin or English",
          isCorrect: false,
          clinicalRationale: "Violates informed comprehension requirements.",
        },
        {
          id: "opt-4",
          text: "Paying cash to waive all rights to medical care",
          isCorrect: false,
          clinicalRationale: "Unethical coercion and criminal exploitation.",
        },
      ],
    },
    {
      id: "res-4",
      topic: "Blinding in Ayurvedic Clinical Trials",
      category: "Research Skills",
      questionType: "SCENARIO",
      prompt: "A researcher conducts a Double-Blind RCT comparing Dashamoola Kwatha against a placebo. What constitutes the greatest methodological challenge in blinding herbal decoctions?",
      options: [
        {
          id: "opt-1",
          text: "Replicating identical organoleptic characteristics (taste, strong bitter smell, astringency, dark color, and viscosity) without active herbal ingredients in the placebo",
          isCorrect: true,
          clinicalRationale: "Ayurvedic kwathas have intense taste (Rasa) and aroma (Gandha); unblinded patients and evaluators easily guess active vs inert placebo.",
        },
        {
          id: "opt-2",
          text: "Computer software cannot randomize herbal drugs",
          isCorrect: false,
          clinicalRationale: "Standard statistical software randomizes trial arms without difficulty.",
        },
        {
          id: "opt-3",
          text: "Herbal drugs have no active ingredients to blind",
          isCorrect: false,
          clinicalRationale: "False; herbal decoctions contain hundreds of phytoconstituents.",
        },
        {
          id: "opt-4",
          text: "Hospital nurses refuse to serve brown liquids",
          isCorrect: false,
          clinicalRationale: "Irrelevant and factually absurd.",
        },
      ],
    },
    {
      id: "res-5",
      topic: "CTRI Prospective Registration",
      category: "Research Skills",
      questionType: "MCQ",
      prompt: "Why is prospective registration with the Clinical Trials Registry of India (CTRI) legally mandatory before enrolling the first participant in an Ayush trial?",
      options: [
        {
          id: "opt-1",
          text: "To ensure research transparency, prevent outcome reporting bias/suppression of negative findings, and validate data for peer-reviewed journal publication",
          isCorrect: true,
          clinicalRationale: "ICMJE and ICMR mandate prospective CTRI registration; retrospective registration disqualifies trial results from international scientific validity.",
        },
        {
          id: "opt-2",
          text: "To pay commercial sales taxes to the registry",
          isCorrect: false,
          clinicalRationale: "CTRI is a scientific registry hosted by ICMR-NIMS, not a tax collection portal.",
        },
        {
          id: "opt-3",
          text: "To copyright classical Charaka formulas for personal ownership",
          isCorrect: false,
          clinicalRationale: "Classical formulas are in the public domain and cannot be privately copyrighted.",
        },
        {
          id: "opt-4",
          text: "To eliminate the need for an Institutional Ethics Committee",
          isCorrect: false,
          clinicalRationale: "Ethics committee approval is an absolute prerequisite to obtain CTRI registration.",
        },
      ],
    },
    {
      id: "res-6",
      topic: "Sample Size Calculation & Statistical Power",
      category: "Research Skills",
      questionType: "MCQ",
      prompt: "What is the consequence of conducting an Ayurvedic clinical study with an inadequately small sample size (e.g., n = 8 per arm)?",
      options: [
        {
          id: "opt-1",
          text: "The study is statistically underpowered, leading to high Type II error (beta error) and inability to detect true clinical efficacy",
          isCorrect: true,
          clinicalRationale: "Small sample size lacks statistical power (1 - beta < 80%), creating false negative conclusions and waste of research resources.",
        },
        {
          id: "opt-2",
          text: "The study automatically wins international awards for brevity",
          isCorrect: false,
          clinicalRationale: "Statistically invalid studies are rejected by indexed peer-reviewed journals.",
        },
        {
          id: "opt-3",
          text: "It guarantees 100% confidence interval without variance",
          isCorrect: false,
          clinicalRationale: "Smaller samples widen standard error and confidence intervals.",
        },
        {
          id: "opt-4",
          text: "It proves the formulation is non-toxic forever",
          isCorrect: false,
          clinicalRationale: "Small sample sizes cannot detect low-frequency adverse reactions.",
        },
      ],
    },
    {
      id: "res-7",
      topic: "Reverse Pharmacology Paradigm",
      category: "Research Skills",
      questionType: "MCQ",
      prompt: "What defines the 'Reverse Pharmacology' pathway pioneered by Dr. Ashok Vaidya in Ayurvedic drug discovery?",
      options: [
        {
          id: "opt-1",
          text: "'Clinics to Laboratory' path: documented experiential clinical efficacy and safety in humans serves as starting point for target identification and mechanistic validation",
          isCorrect: true,
          clinicalRationale: "Reverses Western drug discovery (which starts at random chemical libraries and animals) by leveraging centuries of documented human safety data first.",
        },
        {
          id: "opt-2",
          text: "Administering drugs in reverse alphabetical order",
          isCorrect: false,
          clinicalRationale: "Absurd interpretation.",
        },
        {
          id: "opt-3",
          text: "Synthesizing petroleum chemicals in test tubes without plants",
          isCorrect: false,
          clinicalRationale: "Contradicts natural traditional medicine research.",
        },
        {
          id: "opt-4",
          text: "Testing exclusively on deceased cadavers",
          isCorrect: false,
          clinicalRationale: "Reverse pharmacology evaluates dynamic pharmacodynamics in living biological systems.",
        },
      ],
    },
    {
      id: "res-8",
      topic: "CONSORT-Ayush Extension",
      category: "Research Skills",
      questionType: "MCQ",
      prompt: "What specific reporting requirement is mandated by the CONSORT-Ayush extension for randomized controlled clinical trials?",
      options: [
        {
          id: "opt-1",
          text: "Detailed taxonomic identification of plants, parts used, solvent extraction ratio, classical Shodhana details, batch standardization, and Prakriti diagnosis criteria",
          isCorrect: true,
          clinicalRationale: "CONSORT-Ayush ensures full reproducibility by requiring exact botanical taxonomy, extraction parameters, and individualized Ayurvedic diagnostic measures.",
        },
        {
          id: "opt-2",
          text: "Hiding all ingredients to maintain commercial proprietary secrecy",
          isCorrect: false,
          clinicalRationale: "Violates transparency and scientific reproducibility.",
        },
        {
          id: "opt-3",
          text: "Reporting only successful patients and deleting dropout data",
          isCorrect: false,
          clinicalRationale: "Violates Intention-to-Treat (ITT) analysis and constitutes scientific fraud.",
        },
        {
          id: "opt-4",
          text: "Using only Sanskrit fonts without English translation",
          isCorrect: false,
          clinicalRationale: "CONSORT is an international reporting guideline published in English.",
        },
      ],
    },
    {
      id: "res-9",
      topic: "OECD Animal Toxicity Protocols",
      category: "Research Skills",
      questionType: "MCQ",
      prompt: "Which OECD Guideline is standardly adopted for determining 'Acute Oral Toxicity - Acute Toxic Class Method' for novel Ayurvedic formulations?",
      options: [
        {
          id: "opt-1",
          text: "OECD Guideline 423 (Stepwise procedure using 3 animals of single sex per step with starting dose of 2000 mg/kg)",
          isCorrect: true,
          clinicalRationale: "OECD 423 minimizes animal usage while identifying LD50 cut-off values and GHS hazard categories.",
        },
        {
          id: "opt-2",
          text: "OECD 101 (UV-Vis absorption)",
          isCorrect: false,
          clinicalRationale: "Physical chemistry test, not an in vivo animal toxicity method.",
        },
        {
          id: "opt-3",
          text: "Testing 500 horses without regulatory approval",
          isCorrect: false,
          clinicalRationale: "Illegal and violates CPCSEA animal welfare ethics.",
        },
        {
          id: "opt-4",
          text: "OECD 999 (Cosmetic fragrance test)",
          isCorrect: false,
          clinicalRationale: "Non-existent guideline number.",
        },
      ],
    },
    {
      id: "res-10",
      topic: "Whole System Research (N-of-1 Trials)",
      category: "Research Skills",
      questionType: "SCENARIO",
      prompt: "Why are 'N-of-1 Trial Designs' (Single-subject randomized multiple crossover trials) highly suited for validating personalized Ayurvedic interventions?",
      options: [
        {
          id: "opt-1",
          text: "They accommodate individual Deha Prakriti and Agni variations by evaluating therapeutic response and washout periods within the exact same patient as their own control",
          isCorrect: true,
          clinicalRationale: "Ayurveda emphasizes customized personalized treatment (Purusham Purusham Veekshya); N-of-1 trials scientifically honor this without averaging out heterogeneous responses.",
        },
        {
          id: "opt-2",
          text: "Because they take only 10 seconds to complete",
          isCorrect: false,
          clinicalRationale: "N-of-1 trials require multiple rigorous treatment and washout cycles over months.",
        },
        {
          id: "opt-3",
          text: "Because they do not require any ethics committee approval",
          isCorrect: false,
          clinicalRationale: "All clinical trials on human subjects require ethics approval.",
        },
        {
          id: "opt-4",
          text: "Because no statistics can be applied to them",
          isCorrect: false,
          clinicalRationale: "Bayesian and paired statistical methods are actively applied to N-of-1 data.",
        },
      ],
    },
    {
      id: "res-11",
      topic: "Biostatistical Hypothesis Testing",
      category: "Research Skills",
      questionType: "MCQ",
      prompt: "When evaluating subjective clinical symptoms graded on an ordinal rating scale (e.g., Sandhigata Vata pain 0-3) before and after Ayurvedic treatment in the same group, which test is appropriate?",
      options: [
        {
          id: "opt-1",
          text: "Wilcoxon Signed-Rank Test (Non-parametric test for paired ordinal data)",
          isCorrect: true,
          clinicalRationale: "Ordinal symptom scales (0-3) are non-normally distributed; the Wilcoxon signed-rank test is the exact statistical test for paired before-after assessments.",
        },
        {
          id: "opt-2",
          text: "Student's Independent Two-Sample Unpaired T-Test",
          isCorrect: false,
          clinicalRationale: "Unpaired t-test requires continuous normally distributed data between two distinct groups.",
        },
        {
          id: "opt-3",
          text: "Simple addition without any statistical calculation",
          isCorrect: false,
          clinicalRationale: "Fails to establish scientific statistical significance (p-value).",
        },
        {
          id: "opt-4",
          text: "Pearson's Chi-Square Test for Continuous Normals",
          isCorrect: false,
          clinicalRationale: "Chi-square tests categorical proportions, not paired ordinal score shifts.",
        },
      ],
    },
    {
      id: "res-12",
      topic: "Prakriti Assessment Tool Validation",
      category: "Research Skills",
      questionType: "MCQ",
      prompt: "What psychometric property confirms that an Ayurvedic Prakriti assessment questionnaire yields consistent results when administered by different clinicians?",
      options: [
        {
          id: "opt-1",
          text: "Inter-Rater Reliability (Cohen's Kappa coefficient >= 0.75)",
          isCorrect: true,
          clinicalRationale: "High inter-rater reliability ensures that different doctors categorize the same patient's Prakriti consistently.",
        },
        {
          id: "opt-2",
          text: "Printing the questionnaire on glossy paper",
          isCorrect: false,
          clinicalRationale: "Cosmetic attribute unrelated to scientific validity.",
        },
        {
          id: "opt-3",
          text: "Making the questionnaire 500 pages long",
          isCorrect: false,
          clinicalRationale: "Causes severe respondent fatigue without improving reliability.",
        },
        {
          id: "opt-4",
          text: "Refusing to allow any statistical correlation",
          isCorrect: false,
          clinicalRationale: "Scientific validation requires rigorous statistical psychometrics.",
        },
      ],
    },
    {
      id: "res-13",
      topic: "Systematic Review & PRISMA Guidelines",
      category: "Research Skills",
      questionType: "MCQ",
      prompt: "What is the primary objective of the PRISMA (Preferred Reporting Items for Systematic Reviews and Meta-Analyses) Flow Diagram?",
      options: [
        {
          id: "opt-1",
          text: "To transparently map the number of records identified, screened, included, and excluded with explicit reasons across all literature search phases",
          isCorrect: true,
          clinicalRationale: "PRISMA flow diagrams prevent selection bias by documenting the comprehensive trajectory of all screened scientific papers.",
        },
        {
          id: "opt-2",
          text: "To draw decorative artwork for the article front page",
          isCorrect: false,
          clinicalRationale: "Frivolous answer.",
        },
        {
          id: "opt-3",
          text: "To eliminate the need for reading scientific papers",
          isCorrect: false,
          clinicalRationale: "Systematic reviews require thorough full-text appraisal.",
        },
        {
          id: "opt-4",
          text: "To bypass peer review entirely",
          isCorrect: false,
          clinicalRationale: "PRISMA is the international standard demanded by top peer-reviewed journals.",
        },
      ],
    },
    {
      id: "res-14",
      topic: "Traditional Knowledge Digital Library (TKDL)",
      category: "Research Skills",
      questionType: "MCQ",
      prompt: "What is the primary intellectual property protection role of India's Traditional Knowledge Digital Library (TKDL)?",
      options: [
        {
          id: "opt-1",
          text: "Defensive patent protection: Translating classical Sanskrit/Ayurvedic texts into international patent languages (English, German, French, Japanese, Spanish) to establish Prior Art and block wrongful biopiracy patents globally",
          isCorrect: true,
          clinicalRationale: "TKDL broke ground globally by giving patent examiners prior art in their native languages, successfully defeating hundreds of wrongful patents on Turmeric, Neem, Ashwagandha.",
        },
        {
          id: "opt-2",
          text: "Selling ancient manuscripts to private multinational corporations",
          isCorrect: false,
          clinicalRationale: "TKDL protects sovereign heritage against predatory commercial exploitation.",
        },
        {
          id: "opt-3",
          text: "Deleting classical literature from public memory",
          isCorrect: false,
          clinicalRationale: "It digitizes and preserves classical treatises.",
        },
        {
          id: "opt-4",
          text: "Manufacturing tablets inside the library",
          isCorrect: false,
          clinicalRationale: "TKDL is a specialized digital documentation agency created by CSIR and Ministry of Ayush.",
        },
      ],
    },
    {
      id: "res-15",
      topic: "Intention-to-Treat (ITT) Analysis",
      category: "Research Skills",
      questionType: "MCQ",
      prompt: "In a randomized trial evaluating an Ayurvedic herb for Osteoarthritis, why is Intention-to-Treat (ITT) analysis preferred over Per-Protocol (PP) analysis?",
      options: [
        {
          id: "opt-1",
          text: "ITT analyzes all randomized participants according to their initial allocated group regardless of whether they dropped out or violated protocol, preserving randomization balance and avoiding overly optimistic efficacy estimates",
          isCorrect: true,
          clinicalRationale: "Per-protocol analysis introduces significant attrition bias; ITT provides realistic pragmatic clinical efficacy in real-world populations.",
        },
        {
          id: "opt-2",
          text: "ITT deletes all patients who experienced side effects",
          isCorrect: false,
          clinicalRationale: "Opposite: ITT preserves all dropout and adverse event data.",
        },
        {
          id: "opt-3",
          text: "ITT requires zero mathematics",
          isCorrect: false,
          clinicalRationale: "ITT requires sophisticated missing data imputation algorithms (e.g. Multiple Imputation / LOCF).",
        },
        {
          id: "opt-4",
          text: "Per-protocol is mandated by all global regulatory authorities over ITT",
          isCorrect: false,
          clinicalRationale: "FDA, EMA, and ICMR standardly require ITT as the primary efficacy analysis.",
        },
      ],
    },
  ],
};
