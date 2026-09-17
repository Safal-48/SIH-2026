"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  Lock,
  Phone,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { useAuth } from "@/hooks/useAuth";
import { UserRole, ROLE_DEFINITIONS } from "@/types/roles";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams?.get("redirect");

  const { loginWithEmail, loginWithOtp, verifyOtp, isLoading, error, clearError } = useAuth();

  const [authMode, setAuthMode] = React.useState<string>("email");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [otpToken, setOtpToken] = React.useState("");
  const [otpSent, setOtpSent] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | null>(null);

  const roleParam = searchParams?.get("role") as UserRole | null;

  React.useEffect(() => {
    if (roleParam) {
      if (roleParam === "STUDENT") setEmail("student@aiia.gov.in");
      else if (roleParam === "ACADEMICIAN") setEmail("academician@aiia.gov.in");
      else if (roleParam === "INDUSTRY") setEmail("industry@dabur.com");
      else if (roleParam === "INSTITUTION") setEmail("institution@aiia.gov.in");
      else if (roleParam === "ADMIN") setEmail("admin@ayush.gov.in");
      setPassword("DemoPass@2026");
    }
  }, [roleParam]);

  const handleRoleRedirect = (role?: UserRole) => {
    if (redirectTarget) {
      router.push(redirectTarget);
      return;
    }
    const targetRoute = role ? ROLE_DEFINITIONS[role]?.baseRoute || "/student" : "/student";
    router.push(targetRoute);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!email) {
      setLocalError("Please enter your registered email address.");
      return;
    }

    const res = await loginWithEmail(email, password);
    if (res.success) {
      handleRoleRedirect(res.role);
    } else {
      setLocalError(res.error || "Authentication failed. Please check your credentials.");
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!phone || phone.length < 10) {
      setLocalError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const res = await loginWithOtp(phone);
    if (res.success) {
      setOtpSent(true);
    } else {
      setLocalError(res.error || "Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!otpToken || otpToken.length !== 6) {
      setLocalError("Please enter the 6-digit verification code sent to your phone.");
      return;
    }

    const res = await verifyOtp(phone, otpToken);
    if (res.success) {
      handleRoleRedirect(res.role);
    } else {
      setLocalError(res.error || "Invalid OTP code.");
    }
  };

  // Quick-fill helper for test demonstrations
  const handleQuickFill = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("DemoPass@2026");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Portal Home
        </Link>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>New to Ayu-Setu?</span>
          <Link href="/role-selection" className="font-bold text-accent hover:underline">
            Register
          </Link>
        </div>
      </div>

      {/* Login Card */}
      <div className="max-w-md mx-auto w-full my-8 z-10">
        <div className="rounded-3xl border border-border bg-card p-7 sm:p-9 shadow-2xl space-y-6">
          {/* Logo & Headline */}
          <div className="text-center space-y-2">
            <img
              src="/images/ayu-setu-emblem.png"
              alt="Ayu-Setu Emblem"
              className="w-14 h-14 mx-auto rounded-full object-cover bg-[#efe1c8] ring-2 ring-amber-500/50 shadow-lg shrink-0"
            />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
              Sign In to Ayu-Setu
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Access your verified skill logs, assessments, and collaboration portal.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <Tabs
            tabs={[
              { id: "email", label: "Email / NCISM ID", icon: <Mail className="h-3.5 w-3.5" /> },
              { id: "otp", label: "Mobile OTP", icon: <Phone className="h-3.5 w-3.5" /> },
            ]}
            activeTab={authMode}
            onChange={(tab) => {
              setAuthMode(tab);
              setLocalError(null);
              clearError();
            }}
            className="w-full justify-center"
          />

          {/* Error Message */}
          {(localError || error) && (
            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{localError || error}</span>
            </div>
          )}

          {/* Email Form */}
          {authMode === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <Input
                label="Registered Email or NCISM ID"
                type="email"
                placeholder="scholar@aiia.gov.in"
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
                helperText="Enter your secure portal password"
                required
              />

              <Button
                type="submit"
                variant="gold"
                size="lg"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="w-full justify-center shadow-md shadow-accent/20"
              >
                Sign In
              </Button>
            </form>
          )}

          {/* Mobile OTP Form */}
          {authMode === "otp" && (
            <div className="space-y-4">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <Input
                    label="Mobile Number (India)"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    leftIcon={<Phone className="h-4 w-4 text-muted-foreground" />}
                    helperText="We will send a 6-digit one-time passcode"
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isLoading}
                    className="w-full justify-center"
                  >
                    Send One-Time Password
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="p-3 rounded-xl bg-muted/60 border border-border text-xs flex justify-between items-center">
                    <span>Sent to: <strong>{phone}</strong></span>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-primary font-semibold hover:underline"
                    >
                      Change
                    </button>
                  </div>

                  <Input
                    label="6-Digit Verification Code"
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={otpToken}
                    onChange={(e) => setOtpToken(e.target.value)}
                    helperText="In development mode, enter 123456"
                    required
                  />

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    isLoading={isLoading}
                    className="w-full justify-center shadow-md shadow-accent/20"
                  >
                    Verify & Enter Portal
                  </Button>
                </form>
              )}
            </div>
          )}

          {/* Quick-Fill Demo Shortcuts for Evaluators */}
          <div className="pt-4 border-t border-border space-y-2">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block text-center">
              Quick Sign-In by Role:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <Badge
                variant="outline"
                size="sm"
                className="cursor-pointer hover:bg-muted"
                onClick={() => handleQuickFill("student@aiia.gov.in")}
              >
                🎓 Student
              </Badge>
              <Badge
                variant="outline"
                size="sm"
                className="cursor-pointer hover:bg-muted"
                onClick={() => handleQuickFill("academician@aiia.gov.in")}
              >
                👨‍🏫 Faculty
              </Badge>
              <Badge
                variant="outline"
                size="sm"
                className="cursor-pointer hover:bg-muted"
                onClick={() => handleQuickFill("industry@dabur.com")}
              >
                🏥 Industry
              </Badge>
              <Badge
                variant="outline"
                size="sm"
                className="cursor-pointer hover:bg-muted"
                onClick={() => handleQuickFill("institution@aiia.gov.in")}
              >
                🏫 Institution
              </Badge>
              <Badge
                variant="outline"
                size="sm"
                className="cursor-pointer hover:bg-muted"
                onClick={() => handleQuickFill("admin@ayush.gov.in")}
              >
                🛡️ Admin
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-md mx-auto w-full text-center text-xs text-muted-foreground z-10">
        <p>© {new Date().getFullYear()} Ministry of Ayush • All India Institute of Ayurveda</p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-xs uppercase tracking-widest font-mono">Loading Portal Authentication...</p>
          </div>
        </div>
      }
    >
      <LoginFormContent />
    </React.Suspense>
  );
}
