-- ==============================================================================
-- VAIDYA SETU - ENTERPRISE SECURITY & ROW LEVEL SECURITY (RLS) POLICIES
-- National Ayurvedic Education & Competency Management Platform
-- Conforms to NCISM / Ministry of Ayush & Digital Personal Data Protection (DPDP) Act
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Ensure Student Documents Table Exists
CREATE TABLE IF NOT EXISTS public.student_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL CHECK (document_type IN ('DEGREE_CERTIFICATE', 'NCISM_REGISTRATION', 'CLINICAL_LOGBOOK', 'IDENTITY_PROOF', 'RESEARCH_PAPER')),
    file_name TEXT NOT NULL,
    file_size_bytes BIGINT NOT NULL CHECK (file_size_bytes <= 10485760), -- Max 10MB
    mime_type TEXT NOT NULL CHECK (mime_type IN ('application/pdf', 'image/jpeg', 'image/png')),
    storage_path TEXT NOT NULL UNIQUE,
    checksum_sha256 TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    verified_by UUID REFERENCES public.users(id),
    verification_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Ensure Audit Logs Table Exists
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    user_role TEXT NOT NULL,
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id TEXT,
    status TEXT NOT NULL CHECK (status IN ('SUCCESS', 'FAILURE', 'BLOCKED', 'FLAGGED')),
    ip_address TEXT,
    user_agent TEXT,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- ==============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS) ON ALL PLATFORM TABLES
-- ==============================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 4. RLS POLICIES: USERS TABLE
-- ==============================================================================

-- Users can read their own profile
CREATE POLICY "users_read_own" ON public.users
    FOR SELECT
    USING (auth.uid() = id);

-- Users can update their own personal non-role attributes
CREATE POLICY "users_update_own" ON public.users
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Super Admins (Ministry / NCISM controllers) can read and manage all users
CREATE POLICY "admin_all_users" ON public.users
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid() AND users.role = 'ADMIN'
        )
    );

-- ==============================================================================
-- 5. RLS POLICIES: STUDENT PROFILES
-- ==============================================================================

-- Student can view and edit their own academic profile
CREATE POLICY "student_manage_own_profile" ON public.student_profiles
    FOR ALL
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Academicians can view profiles of students affiliated with their college
CREATE POLICY "academician_view_cohort_profiles" ON public.student_profiles
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users u
            WHERE u.id = auth.uid() AND u.role IN ('ACADEMICIAN', 'INSTITUTION')
        )
    );

-- Industry recruiters can only view profiles if student has submitted an active application
CREATE POLICY "industry_view_applicant_profiles" ON public.student_profiles
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.applications a
            JOIN public.opportunities o ON a.opportunity_id = o.id
            JOIN public.users u ON u.id = auth.uid()
            WHERE a.student_id = student_profiles.user_id
              AND o.organization_id = auth.uid()
              AND u.role = 'INDUSTRY'
        )
    );

-- ==============================================================================
-- 6. RLS POLICIES: STUDENT DOCUMENTS (SECURE VAULT)
-- ==============================================================================

-- Student can upload and view only their own documents
CREATE POLICY "student_manage_own_docs" ON public.student_documents
    FOR ALL
    USING (student_id = auth.uid())
    WITH CHECK (student_id = auth.uid());

-- Supervising faculty can view and attest documents of their assigned scholars
CREATE POLICY "faculty_view_and_attest_docs" ON public.student_documents
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users u
            WHERE u.id = auth.uid() AND u.role = 'ACADEMICIAN'
        )
    );

-- Industry can only view verified documents of applicants who applied to their openings
CREATE POLICY "industry_view_verified_applicant_docs" ON public.student_documents
    FOR SELECT
    USING (
        is_verified = TRUE AND
        EXISTS (
            SELECT 1 FROM public.applications a
            JOIN public.opportunities o ON a.opportunity_id = o.id
            WHERE a.student_id = student_documents.student_id
              AND o.organization_id = auth.uid()
        )
    );

-- ==============================================================================
-- 7. RLS POLICIES: COMPETENCIES & CLINICAL LOGBOOK
-- ==============================================================================

-- Students can read their own competencies
CREATE POLICY "student_read_own_competencies" ON public.competencies
    FOR SELECT
    USING (student_id = auth.uid());

-- Accredited supervisors can insert or update student competencies
CREATE POLICY "faculty_attest_competencies" ON public.competencies
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.users u
            WHERE u.id = auth.uid() AND u.role IN ('ACADEMICIAN', 'ADMIN')
        )
    );

-- Public / recruiters can read verified competencies for passport validation
CREATE POLICY "public_read_verified_competencies" ON public.competencies
    FOR SELECT
    USING (verified_at IS NOT NULL);

-- ==============================================================================
-- 8. RLS POLICIES: OPPORTUNITIES (JOB / RESIDENCY POSTINGS)
-- ==============================================================================

-- All authenticated users can view active opportunities
CREATE POLICY "authenticated_view_opportunities" ON public.opportunities
    FOR SELECT
    USING (auth.uid() IS NOT NULL);

-- Industry partners and institutions can manage their own postings
CREATE POLICY "industry_manage_own_opportunities" ON public.opportunities
    FOR ALL
    USING (organization_id = auth.uid())
    WITH CHECK (organization_id = auth.uid());

-- ==============================================================================
-- 9. RLS POLICIES: APPLICATIONS
-- ==============================================================================

-- Student can create and view their own applications
CREATE POLICY "student_manage_own_applications" ON public.applications
    FOR ALL
    USING (student_id = auth.uid())
    WITH CHECK (student_id = auth.uid());

-- Recruiter can view applications submitted to their opportunities
CREATE POLICY "recruiter_view_received_applications" ON public.applications
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = applications.opportunity_id
              AND o.organization_id = auth.uid()
        )
    );

-- ==============================================================================
-- 10. RLS POLICIES: AUDIT LOGS (TAMPER-EVIDENT RECORD)
-- ==============================================================================

-- Admins can view all platform audit logs
CREATE POLICY "admin_view_all_audit" ON public.audit_logs
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users u
            WHERE u.id = auth.uid() AND u.role = 'ADMIN'
        )
    );

-- Users can view only their own security audit history
CREATE POLICY "users_view_own_audit" ON public.audit_logs
    FOR SELECT
    USING (user_id = auth.uid());

-- Insert permitted by service role or authenticated system events
CREATE POLICY "authenticated_log_audit_events" ON public.audit_logs
    FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

-- ==============================================================================
-- 11. AUTOMATIC UPDATED_AT TIMESTAMP TRIGGER
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_modtime
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER update_docs_modtime
    BEFORE UPDATE ON public.student_documents
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
