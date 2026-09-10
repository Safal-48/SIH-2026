-- =====================================================================
-- Vaidya Setu - Supabase PostgreSQL Schema & Row Level Security (RLS)
-- Ministry of Ayush | All India Institute of Ayurveda
-- =====================================================================

-- 1. Create Role Enum
CREATE TYPE public.user_role AS ENUM (
  'STUDENT',
  'ACADEMICIAN',
  'INDUSTRY',
  'INSTITUTION',
  'ADMIN'
);

-- 2. Create Public Profiles Table linked to auth.users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role public.user_role NOT NULL DEFAULT 'STUDENT',
  avatar_url TEXT,
  phone TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  institution_name TEXT,
  degree_or_designation TEXT,
  registration_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Create Student Extended Profiles
CREATE TABLE public.student_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  enrollment_number TEXT,
  institution_id TEXT,
  college TEXT,
  degree TEXT NOT NULL DEFAULT 'BAMS',
  current_year_label TEXT NOT NULL DEFAULT '1st Year',
  specialization TEXT,
  previous_exposures TEXT[] DEFAULT '{}',
  career_interests TEXT[] DEFAULT '{}',
  primary_career_goal TEXT,
  preferred_city TEXT,
  availability_type TEXT,
  languages TEXT[] DEFAULT '{"English", "Hindi"}',
  overall_skill_score INT NOT NULL DEFAULT 0,
  competency_passport_hash TEXT,
  onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
  onboarding_completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Automatically Create Profile on Auth Signup Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  assigned_role public.user_role;
BEGIN
  -- Safely extract and cast role from metadata, fallback to STUDENT
  BEGIN
    assigned_role := (new.raw_user_meta_data->>'role')::public.user_role;
  EXCEPTION WHEN OTHERS THEN
    assigned_role := 'STUDENT'::public.user_role;
  END;

  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    role,
    avatar_url,
    phone,
    is_verified
  )
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    assigned_role,
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'phone',
    FALSE
  );

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies for Profiles
-- A. Allow users to read their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- B. Allow verified profile lookups (e.g. recruiters/supervisors searching scholars)
CREATE POLICY "Public can view verified basic profiles"
  ON public.profiles
  FOR SELECT
  USING (is_verified = TRUE);

-- C. Allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- D. Admins have unrestricted access
CREATE POLICY "Admins have full access"
  ON public.profiles
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- 7. RLS Policies for Student Profiles
CREATE POLICY "Students can read own student profile"
  ON public.student_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Students can insert own student profile"
  ON public.student_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can update own student profile"
  ON public.student_profiles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Supervisors and Industry can view verified student profiles"
  ON public.student_profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('ACADEMICIAN', 'INDUSTRY', 'INSTITUTION', 'ADMIN')
    )
  );
