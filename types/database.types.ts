/**
 * Vaidya Setu - Supabase Database Types
 * Generated & modeled for PostgreSQL + PostgREST schema
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: string;
          full_name: string;
          avatar_url: string | null;
          is_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          role: string;
          full_name: string;
          avatar_url?: string | null;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: string;
          full_name?: string;
          avatar_url?: string | null;
          is_verified?: boolean;
          updated_at?: string;
        };
      };
      student_profiles: {
        Row: {
          id: string;
          user_id: string;
          enrollment_number: string;
          institution_id: string;
          degree: string;
          specialization: string | null;
          current_year: number;
          overall_skill_score: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          enrollment_number: string;
          institution_id: string;
          degree: string;
          specialization?: string | null;
          current_year: number;
          overall_skill_score?: number;
          created_at?: string;
        };
        Update: {
          degree?: string;
          specialization?: string | null;
          current_year?: number;
          overall_skill_score?: number;
        };
      };
      skills: {
        Row: {
          id: string;
          name: string;
          sanskrit_name: string | null;
          category: string;
          description: string;
          bloom_level: string;
          industry_demand_score: number;
          is_core_ayush: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          sanskrit_name?: string | null;
          category: string;
          description: string;
          bloom_level: string;
          industry_demand_score?: number;
          is_core_ayush?: boolean;
        };
        Update: {
          name?: string;
          description?: string;
          industry_demand_score?: number;
        };
      };
      competencies: {
        Row: {
          id: string;
          student_id: string;
          skill_id: string;
          proficiency_score: number;
          level: string;
          verified_at: string | null;
          supervisor_id: string | null;
        };
        Insert: {
          id?: string;
          student_id: string;
          skill_id: string;
          proficiency_score: number;
          level: string;
          verified_at?: string | null;
          supervisor_id?: string | null;
        };
        Update: {
          proficiency_score?: number;
          level?: string;
          verified_at?: string | null;
          supervisor_id?: string | null;
        };
      };
      opportunities: {
        Row: {
          id: string;
          organization_id: string;
          title: string;
          opportunity_type: string;
          description: string;
          location: string;
          is_remote: boolean;
          stipend_monthly_inr: number | null;
          duration_months: number;
          deadline: string;
          is_verified_aiia: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          title: string;
          opportunity_type: string;
          description: string;
          location: string;
          is_remote?: boolean;
          stipend_monthly_inr?: number | null;
          duration_months: number;
          deadline: string;
          is_verified_aiia?: boolean;
          created_at?: string;
        };
        Update: {
          title?: string;
          description?: string;
          deadline?: string;
          is_verified_aiia?: boolean;
        };
      };
      applications: {
        Row: {
          id: string;
          opportunity_id: string;
          student_id: string;
          status: string;
          match_score: number;
          supervisor_verification_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          opportunity_id: string;
          student_id: string;
          status?: string;
          match_score?: number;
          supervisor_verification_id?: string | null;
          created_at?: string;
        };
        Update: {
          status?: string;
          supervisor_verification_id?: string | null;
        };
      };
      verifications: {
        Row: {
          id: string;
          student_id: string;
          supervisor_id: string;
          status: string;
          comments: string | null;
          digital_signature_hash: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          supervisor_id: string;
          status?: string;
          comments?: string | null;
          digital_signature_hash: string;
          created_at?: string;
        };
        Update: {
          status?: string;
          comments?: string | null;
        };
      };
    };
    Views: {};
    Functions: {};
  };
}
