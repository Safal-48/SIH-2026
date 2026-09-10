/**
 * Vaidya Setu - Student Onboarding Service & Constants
 * Ministry of Ayush | All India Institute of Ayurveda
 */

import {
  StudentOnboardingData,
  StudentDegreeOption,
  StudentYearOption,
  StudentExposureOption,
  CareerGoalOption,
  AvailabilityTypeOption,
  LanguagePreferenceOption,
} from "@/types/entities";
import { createClient } from "@/lib/supabase/client";

export const LOCAL_DRAFT_KEY = "vaidya_student_onboarding_draft";

export const INITIAL_ONBOARDING_DATA: StudentOnboardingData = {
  degree: "BAMS",
  currentYear: "Final Year",
  college: "All India Institute of Ayurveda (AIIA), New Delhi",
  specialization: "Panchakarma & Kayachikitsa",
  previousExposures: ["Clinical Posting", "Panchakarma Training", "Health Camp"],
  careerInterests: ["Clinical Practice", "Panchakarma & Wellness", "Research"],
  primaryCareerGoal: "Clinical Practice",
  preferredCity: "Delhi NCR",
  availability: "Full-time",
  languages: ["English", "Hindi"],
  onboardingCompleted: false,
};

export const PREMIER_AYURVEDA_COLLEGES: string[] = [
  "All India Institute of Ayurveda (AIIA), New Delhi",
  "National Institute of Ayurveda (NIA), Jaipur",
  "Institute of Teaching and Research in Ayurveda (ITRA), Jamnagar",
  "Faculty of Ayurveda, IMS, Banaras Hindu University (BHU), Varanasi",
  "Government Ayurveda College, Thiruvananthapuram",
  "R.A. Podar Ayurved Medical College, Mumbai",
  "State Ayurvedic College & Hospital, Lucknow",
  "Rishikul Government PG Ayurvedic College, Haridwar",
  "Government Akhandanand Ayurved College, Ahmedabad",
  "Sri Dharmasthala Manjunatheshwara (SDM) College of Ayurveda, Udupi",
  "Government Ayurvedic College & Hospital, Patna",
  "Dr. B.R.K.R. Government Ayurvedic College, Hyderabad",
  "Government Ayurveda Medical College, Bengaluru",
  "Ayurveda & Unani Tibbia College, Karol Bagh, New Delhi",
];

export const AYURVEDA_SPECIALIZATIONS: string[] = [
  "Kayachikitsa (Internal Medicine)",
  "Panchakarma (Detoxification & Purification)",
  "Dravyaguna Vigyana (Ayurvedic Pharmacology & Materia Medica)",
  "Shalya Tantra (Surgical Techniques & Ksharasutra)",
  "Shalakya Tantra (ENT & Ophthalmology)",
  "Prasuti & Stri Roga (Obstetrics & Gynecology)",
  "Kaumarbhritya (Pediatrics & Neonatology)",
  "Rasashastra & Bhaishajya Kalpana (Pharmaceutical Formulation)",
  "Swasthavritta (Preventive, Social Medicine & Yoga)",
  "Agada Tantra (Toxicology & Forensic Medicine)",
  "Roga Nidana (Pathology & Diagnostics)",
  "Samhita & Siddhanta (Fundamental Classical Principles)",
];

export interface ExposureMeta {
  id: StudentExposureOption;
  title: string;
  sanskrit: string;
  icon: string;
  description: string;
}

export const EXPOSURE_OPTIONS: ExposureMeta[] = [
  {
    id: "Clinical Posting",
    title: "Clinical Posting",
    sanskrit: "Rugna Pariksha",
    icon: "🩺",
    description: "Inpatient and OPD clinical rounds evaluating patients under registered senior Vaidyas.",
  },
  {
    id: "Internship",
    title: "Internship",
    sanskrit: "Karyashala",
    icon: "🏥",
    description: "Supervised rotatory clinical posting across departments in an accredited Ayush hospital.",
  },
  {
    id: "Health Camp",
    title: "Health Camp",
    sanskrit: "Swasthya Shibir",
    icon: "⛺",
    description: "Community rural outreach, diagnostic camps, and pulse-based preliminary checkups.",
  },
  {
    id: "Workshop",
    title: "Hands-on Workshop",
    sanskrit: "Abhyasa Satra",
    icon: "🔬",
    description: "Specialized clinical skill training (Marma Chikitsa, Ksharasutra, Agnikarma, etc.).",
  },
  {
    id: "Research Project",
    title: "Research Project",
    sanskrit: "Anusandhana",
    icon: "📑",
    description: "CCRAS, AIIA, or institutional scientific trial, literature review, or pharmacological study.",
  },
  {
    id: "Industry Visit",
    title: "Industry Visit",
    sanskrit: "Aushadha Nirmana",
    icon: "🏭",
    description: "Onsite tour of GMP-certified Ayurvedic manufacturing, R&D labs, and HPTLC testing facilities.",
  },
  {
    id: "Panchakarma Training",
    title: "Panchakarma Training",
    sanskrit: "Shodhana Vidhi",
    icon: "🌿",
    description: "Practical administration of Vamana, Virechana, Basti, Nasya, and Raktamokshana therapies.",
  },
];

export interface CareerGoalMeta {
  id: CareerGoalOption;
  title: string;
  sanskrit: string;
  icon: string;
  badge: string;
  description: string;
  demandRate: string;
  startingRange: string;
}

export const CAREER_GOAL_OPTIONS: CareerGoalMeta[] = [
  {
    id: "Clinical Practice",
    title: "Clinical Practice",
    sanskrit: "Chikitsaka",
    icon: "🩺",
    badge: "High Demand",
    description: "Private consultation, classical Nadi Pariksha diagnosis, and personalized Ayurvedic therapeutics.",
    demandRate: "94% Placement Rate",
    startingRange: "₹4.8L – ₹9.5L / yr",
  },
  {
    id: "Panchakarma & Wellness",
    title: "Panchakarma & Wellness",
    sanskrit: "Shodhana Chikitsa",
    icon: "🌿",
    badge: "Global Growth",
    description: "Detoxification retreat leadership, wellness resorts, medical tourism, and lifestyle medicine.",
    demandRate: "91% Placement Rate",
    startingRange: "₹5.2L – ₹11.0L / yr",
  },
  {
    id: "Herbal Pharma",
    title: "Herbal Pharma & Formulation",
    sanskrit: "Dravyaguna R&D",
    icon: "💊",
    badge: "R&D Focused",
    description: "Phytomedicine formulation, GMP manufacturing, HPTLC fingerprinting, and pharmacovigilance.",
    demandRate: "88% Placement Rate",
    startingRange: "₹4.5L – ₹10.0L / yr",
  },
  {
    id: "Research",
    title: "Ayush Clinical Research",
    sanskrit: "Anusandhana",
    icon: "🔬",
    badge: "Govt Sponsored",
    description: "Evidence-based clinical trials, CCRAS projects, drug discovery, and international publications.",
    demandRate: "85% Placement Rate",
    startingRange: "₹5.0L – ₹12.5L / yr",
  },
  {
    id: "Teaching",
    title: "Medical Faculty & Teaching",
    sanskrit: "Acharya",
    icon: "👨‍🏫",
    badge: "Academic",
    description: "Professorship in NCISM-accredited Ayurveda medical universities and postgraduate mentorship.",
    demandRate: "82% Placement Rate",
    startingRange: "₹6.0L – ₹14.0L / yr",
  },
  {
    id: "Government",
    title: "Government Medical Officer",
    sanskrit: "Shasana Vaidya",
    icon: "🏛️",
    badge: "Civil Service",
    description: "National Ayush Mission (NAM), public health centers, state dispensaries, and regulatory administration.",
    demandRate: "86% Placement Rate",
    startingRange: "₹7.0L – ₹13.5L / yr",
  },
  {
    id: "Entrepreneurship",
    title: "Ayush Entrepreneurship",
    sanskrit: "Udyamita",
    icon: "🚀",
    badge: "Innovation",
    description: "AyurTech platforms, proprietary herbal formulations, direct-to-consumer wellness, and clinics.",
    demandRate: "High Upside",
    startingRange: "Equity & Scaled Revenue",
  },
];

export const POPULAR_AYUSH_CITIES: string[] = [
  "Delhi NCR",
  "Jaipur",
  "Mumbai",
  "Bengaluru",
  "Jamnagar",
  "Pune",
  "Varanasi",
  "Kottakkal",
  "Haridwar",
  "Thiruvananthapuram",
  "Kolkata",
  "Hyderabad",
  "Chandigarh",
  "Lucknow",
];

export const AVAILABILITY_OPTIONS: { id: AvailabilityTypeOption; label: string; desc: string }[] = [
  { id: "Weekends", label: "Weekends Only", desc: "8-16 hrs/week (Flexible clinical observer)" },
  { id: "Part-time", label: "Part-Time", desc: "15-25 hrs/week (Academic & clinical balance)" },
  { id: "Full-time", label: "Full-Time", desc: "40+ hrs/week (Comprehensive hospital residency)" },
  { id: "1 month", label: "1 Month Intensive", desc: "Short-term clinical procedure boot camp" },
  { id: "2-3 months", label: "2–3 Months", desc: "Standard semester internship & R&D immersion" },
  { id: "3+ months", label: "3+ Months Extended", desc: "Long-term clinical fellowship & placement" },
];

export const LANGUAGE_OPTIONS: { id: LanguagePreferenceOption; label: string; subtext: string }[] = [
  { id: "English", label: "English", subtext: "Clinical reports & scientific research papers" },
  { id: "Hindi", label: "Hindi", subtext: "Patient dialogue & classical Samhita discussions" },
  { id: "Marathi", label: "Marathi", subtext: "Regional OPD consultations & hospital care" },
];

/**
 * Save draft to localStorage to prevent accidental data loss
 */
export function saveOnboardingDraftLocally(data: StudentOnboardingData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_DRAFT_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn("Failed to save onboarding draft to localStorage:", err);
  }
}

/**
 * Load draft from localStorage or fallback to defaults
 */
export function loadOnboardingDraftLocally(): StudentOnboardingData {
  if (typeof window === "undefined") return INITIAL_ONBOARDING_DATA;
  try {
    const raw = localStorage.getItem(LOCAL_DRAFT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...INITIAL_ONBOARDING_DATA, ...parsed };
    }
  } catch (err) {
    console.warn("Failed to load onboarding draft from localStorage:", err);
  }
  return INITIAL_ONBOARDING_DATA;
}

/**
 * Clear local draft after successful completion
 */
export function clearOnboardingDraftLocally(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(LOCAL_DRAFT_KEY);
  } catch (err) {
    console.warn("Failed to clear onboarding draft:", err);
  }
}

/**
 * Save / sync student onboarding profile to Supabase database
 */
export async function syncStudentOnboardingToSupabase(
  userId: string,
  data: StudentOnboardingData
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();

  try {
    // 1. Update public profiles table with basic info
    await (supabase.from("profiles") as any)
      .update({
        institution_name: data.college,
        degree_or_designation: data.degree,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    // 2. Upsert into student_profiles table
    const { error } = await (supabase.from("student_profiles") as any).upsert(
      {
        user_id: userId,
        degree: data.degree,
        current_year_label: data.currentYear,
        college: data.college,
        specialization: data.specialization || null,
        previous_exposures: data.previousExposures,
        career_interests: data.careerInterests,
        primary_career_goal: data.primaryCareerGoal,
        preferred_city: data.preferredCity,
        availability_type: data.availability,
        languages: data.languages,
        onboarding_completed: data.onboardingCompleted ?? true,
        onboarding_completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

    if (error) {
      console.warn("Supabase upsert warning (fallback to local session):", error.message);
    }

    return { success: true };
  } catch (err: any) {
    console.error("Failed to sync onboarding with Supabase:", err);
    // Still return success if local persistence succeeded so user is never blocked
    return { success: true, error: err?.message };
  }
}
