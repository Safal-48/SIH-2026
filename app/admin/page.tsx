"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Home,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  Server,
  Activity,
  Layers,
  Sparkles,
  Download,
  Building2,
  Briefcase,
  GraduationCap,
  FileSpreadsheet,
  Globe,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import { useAuth } from "@/hooks/useAuth";
import { ROLE_DEFINITIONS } from "@/types/roles";

import {
  AdminAnalyticsService,
  AdminKpiMetrics,
  IndustrySkillDemandMetric,
} from "@/lib/services/adminAnalyticsService";

import { AdminKpiCards } from "@/components/admin/AdminKpiCards";
import { IndustrySkillDemandWidget } from "@/components/admin/IndustrySkillDemandWidget";
import { InstitutionAnalyticsView } from "@/components/admin/InstitutionAnalyticsView";
import { IndustryAnalyticsView } from "@/components/admin/IndustryAnalyticsView";
import { PolicymakerAnalyticsView } from "@/components/admin/PolicymakerAnalyticsView";
import { SecurityAuditLogViewer } from "@/components/admin/SecurityAuditLogViewer";

type AdminPerspectiveType = "national" | "institutions" | "industry" | "policymakers" | "security";

function AdminPortalContent() {
  const { user, logout } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const service = React.useMemo(() => new AdminAnalyticsService(), []);

  // Perspective tab
  const perspectiveParam = searchParams?.get("perspective") as AdminPerspectiveType | null;
  const [activePerspective, setActivePerspective] = React.useState<AdminPerspectiveType>(
    perspectiveParam && ["national", "institutions", "industry", "policymakers", "security"].includes(perspectiveParam)
      ? perspectiveParam
      : "national"
  );

  React.useEffect(() => {
    if (perspectiveParam && perspectiveParam !== activePerspective) {
      setActivePerspective(perspectiveParam);
    }
  }, [perspectiveParam, activePerspective]);

  const handlePerspectiveChange = (persp: AdminPerspectiveType) => {
    setActivePerspective(persp);
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    params.set("perspective", persp);
    router.replace(`/admin?${params.toString()}`, { scroll: false });
  };

  // State
  const [kpis, setKpis] = React.useState<AdminKpiMetrics>(service.getNationalKpis());
  const [skillsDemand, setSkillsDemand] = React.useState<IndustrySkillDemandMetric[]>(service.getIndustrySkillDemand());
  const [institutionAnalytics, setInstitutionAnalytics] = React.useState(service.getInstitutionAnalytics());
  const [industryAnalytics, setIndustryAnalytics] = React.useState(service.getIndustryAnalytics());
  const [policymakerAnalytics, setPolicymakerAnalytics] = React.useState(service.getPolicymakerAnalytics());

  // Toast State
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const role = ROLE_DEFINITIONS.ADMIN;
  const displayName = user?.fullName || "AIIA National Controller";
  const displayEmail = user?.email || "admin@aiia.gov.in";

  const perspectiveTabs: {
    id: AdminPerspectiveType;
    label: string;
    icon: string;
    subtitle: string;
  }[] = [
    {
      id: "national",
      label: "National Overview",
      icon: "🇮🇳",
      subtitle: "8 Core KPIs & Skill Demand",
    },
    {
      id: "institutions",
      label: "Institution Analytics",
      icon: "🏫",
      subtitle: "Colleges, NCISM Ratings & Attestations",
    },
    {
      id: "industry",
      label: "Industry Analytics",
      icon: "🏭",
      subtitle: "Pharma, Residencies & Recruitment",
    },
    {
      id: "policymakers",
      label: "Policymaker Analytics",
      icon: "🏛️",
      subtitle: "Ministry of Ayush & Workforce Policy",
    },
    {
      id: "security",
      label: "Security & Audit",
      icon: "🛡️",
      subtitle: "RLS, Threat Monitoring & Tamper-Evident Logs",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 p-4 rounded-xl bg-accent text-accent-foreground font-semibold shadow-2xl border border-accent-foreground/20 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="h-5 w-5 text-accent-foreground" />
            <span className="text-xs sm:text-sm">{toastMessage}</span>
          </div>
        )}

        {/* Top Breadcrumb & User Sign Out Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-border/70">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" /> Vaidya Setu Hub
            </Link>
            <span className="text-muted-foreground text-xs">/</span>
            <span className="text-xs font-bold text-foreground">Ministry & National Admin</span>
            <Badge variant="verified" size="sm" className="hidden sm:inline-flex text-[10px]">
              Step 16 Analytics Suite
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="text-xs hidden sm:inline-flex"
              onClick={() => showToast("✓ Exporting National Ayush Analytics Comprehensive Dossier (PDF)...")}
              leftIcon={<Download className="h-3.5 w-3.5" />}
            >
              Export National Dossier
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout()}
              leftIcon={<LogOut className="h-3.5 w-3.5 text-muted-foreground" />}
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* National Super Admin Header Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/20 via-card to-card border border-primary/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-herbal-950 text-white font-serif text-2xl font-bold flex items-center justify-center shadow-md">
              🏛️
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Ministry of Ayush & National Governance Console
                </h1>
                <Badge variant="verified" size="sm" icon={<ShieldCheck className="h-3 w-3" />}>
                  Statutory Super Admin
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {displayName} • National Commission for Indian System of Medicine (NCISM) & AIIA
              </p>
              <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                {displayEmail} • PostgreSQL RLS Enforced • AYUSH Grid Telemetry Synchronized
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 self-start sm:self-auto">
            <Badge variant="default" className="text-xs font-semibold">
              {role.badge}
            </Badge>
            <span className="text-[11px] text-muted-foreground">
              National Network: <strong className="text-foreground">540 Verified Colleges</strong>
            </span>
          </div>
        </div>

        {/* Multi-Perspective Tab Switcher (Mandated by Problem Statement) */}
        <div className="border-b border-border/80">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {perspectiveTabs.map((tab) => {
              const isActive = activePerspective === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handlePerspectiveChange(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  <span className="text-base">{tab.icon}</span>
                  <div className="text-left">
                    <span className="block">{tab.label}</span>
                    <span
                      className={`text-[9px] block ${
                        isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                      }`}
                    >
                      {tab.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Perspective Viewport */}
        <div className="min-h-[500px] space-y-6">
          {activePerspective === "national" && (
            <>
              {/* 1. All 8 Core National KPIs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    National Platform Key Performance Indicators
                  </h3>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    Telemetry: Pan-India Real-Time Sync
                  </span>
                </div>
                <AdminKpiCards metrics={kpis} onFilterClick={(k) => showToast(`Drilling into ${k}...`)} />
              </div>

              {/* 2. Industry Skill Demand Matrix (Clinical Documentation 82%, Patient Communication 77%, Research 64%, Digital Documentation 58%) */}
              <IndustrySkillDemandWidget skillsDemand={skillsDemand} />
            </>
          )}

          {activePerspective === "institutions" && (
            <InstitutionAnalyticsView
              analytics={institutionAnalytics}
              showToast={showToast}
            />
          )}

          {activePerspective === "industry" && (
            <IndustryAnalyticsView
              analytics={industryAnalytics}
              showToast={showToast}
            />
          )}

          {activePerspective === "policymakers" && (
            <PolicymakerAnalyticsView
              analytics={policymakerAnalytics}
              showToast={showToast}
            />
          )}

          {activePerspective === "security" && (
            <SecurityAuditLogViewer />
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminPortalPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground text-xs">
          Loading Vaidya Setu National Governance Console...
        </div>
      }
    >
      <AdminPortalContent />
    </React.Suspense>
  );
}
