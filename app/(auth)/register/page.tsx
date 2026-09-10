"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  ArrowLeft,
  Edit2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/hooks/useAuth";
import { UserRole, ROLE_DEFINITIONS } from "@/types/roles";

function RegisterFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = (searchParams?.get("role") as UserRole) || "STUDENT";

  const { signUpWithEmail, isLoading, error, clearError } = useAuth();

  const [role, setRole] = React.useState<UserRole>(roleParam);
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [agreeTerms, setAgreeTerms] = React.useState(true);
  const [localError, setLocalError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (roleParam && ROLE_DEFINITIONS[roleParam]) {
      setRole(roleParam);
    }
  }, [roleParam]);

  const roleConfig = ROLE_DEFINITIONS[role] || ROLE_DEFINITIONS.STUDENT;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!fullName || !email || !password) {
      setLocalError("Please fill out all required fields.");
      return;
    }

    if (!agreeTerms) {
      setLocalError("Please accept the terms of service and Ayush data guidelines.");
      return;
    }

    const res = await signUpWithEmail(email, fullName, role, password, phone);
    if (res.success) {
      // Proceed to profile setup
      router.push(`/profile-setup?role=${role}`);
    } else {
      setLocalError(res.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between z-10">
        <Link
          href="/role-selection"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Change Role
        </Link>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Have an account?</span>
          <Link href="/login" className="font-bold text-primary hover:underline">
            Sign In
          </Link>
        </div>
      </div>

      {/* Registration Card */}
      <div className="max-w-md mx-auto w-full my-8 z-10">
        <div className="rounded-3xl border border-border bg-card p-7 sm:p-9 shadow-2xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-primary to-herbal-800 text-white font-serif text-2xl font-bold flex items-center justify-center shadow-md">
              वै
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
              Create Your Account
            </h1>

            {/* Selected Role Badge with Edit shortcut */}
            <div className="inline-flex items-center gap-2 pt-1">
              <span className="text-xs text-muted-foreground">Registering as:</span>
              <Badge variant="gold" size="sm" className="font-bold">
                {roleConfig.title}
              </Badge>
              <Link
                href="/role-selection"
                className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-muted transition-colors"
                title="Change Role"
              >
                <Edit2 className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Error Message */}
          {(localError || error) && (
            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{localError || error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="e.g. Dr. Aarav Sharma"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              leftIcon={<User className="h-4 w-4 text-muted-foreground" />}
              required
            />

            <Input
              label="Official or University Email"
              type="email"
              placeholder="aarav@aiia.gov.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-4 w-4 text-muted-foreground" />}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="h-4 w-4 text-muted-foreground" />}
              helperText="Minimum 8 characters with letters & numbers"
              required
            />

            <Input
              label="Mobile Number (Optional for OTP)"
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              leftIcon={<Phone className="h-4 w-4 text-muted-foreground" />}
            />

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-accent"
              />
              <label htmlFor="terms" className="text-xs text-muted-foreground leading-snug cursor-pointer">
                I agree to the <span className="text-foreground font-semibold">NCISM Data Standards</span> and <span className="text-foreground font-semibold">Ayush Privacy Policy</span>.
              </label>
            </div>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="h-4 w-4" />}
              className="w-full justify-center shadow-md shadow-accent/20"
            >
              Continue to Profile Setup
            </Button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-md mx-auto w-full text-center text-xs text-muted-foreground z-10">
        <p>© {new Date().getFullYear()} Ministry of Ayush • All India Institute of Ayurveda</p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-xs uppercase tracking-widest font-mono">Loading Registration...</p>
          </div>
        </div>
      }
    >
      <RegisterFormContent />
    </React.Suspense>
  );
}
