"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Dna,
  ClipboardCheck,
  TrendingDown,
  BookOpen,
  Award,
  Briefcase,
  FileText,
  Map,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils/cn";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const SIDEBAR_NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/student", icon: LayoutDashboard },
  { id: "career-dna", label: "Career DNA", href: "/student/career-dna", icon: Dna, badge: "84%" },
  { id: "skill-assessment", label: "Skill Assessment", href: "/student/assessment", icon: ClipboardCheck, badge: "Active" },
  { id: "skill-gap", label: "Skill Gap", href: "/student/skill-gap", icon: TrendingDown },
  { id: "learning", label: "Learning", href: "/student/learning", icon: BookOpen, badge: "3 Active" },
  { id: "passport", label: "Competency Passport", href: "/student/passport", icon: Award, badge: "7 Verified" },
  { id: "opportunities", label: "Opportunities", href: "/student/opportunities", icon: Briefcase, badge: "6 Open" },
  { id: "applications", label: "Applications", href: "/student/applications", icon: FileText },
  { id: "roadmap", label: "Career Roadmap", href: "/student/roadmap", icon: Map, badge: "Ready" },
  { id: "profile", label: "Profile", href: "/student/onboarding", icon: User },
  { id: "settings", label: "Settings", href: "#settings", icon: Settings },
];

interface StudentSidebarProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export function StudentSidebar({
  activeTab = "dashboard",
  onTabChange,
  className,
}: StudentSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState<boolean>(false);

  const displayName = user?.fullName || "Aarav Sharma";
  const displayEmail = user?.email || "student@aiia.gov.in";

  const handleNavClick = (item: NavItem) => {
    if (onTabChange) {
      onTabChange(item.id);
    }
    setMobileDrawerOpen(false);

    // If it's an anchor, smooth scroll to it
    if (item.href.startsWith("#")) {
      const el = document.getElementById(item.href.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* DESKTOP COLLAPSIBLE SIDEBAR */}
      {/* ========================================================================= */}
      <aside
        className={cn(
          "hidden md:flex flex-col justify-between border-r border-border bg-card/70 backdrop-blur-md transition-all duration-300 select-none z-20 h-screen sticky top-0",
          isCollapsed ? "w-20" : "w-64",
          className
        )}
      >
        {/* Brand Header & Toggle */}
        <div className="p-4 border-b border-border/80 flex items-center justify-between">
          {!isCollapsed ? (
            <Link href="/" className="flex items-center gap-2.5 group">
              <img
                src="/images/ayu-setu-emblem.png"
                alt="Ayu-Setu Emblem"
                className="w-9 h-9 rounded-full object-cover bg-[#efe1c8] ring-1 ring-amber-500/50 shadow-md group-hover:scale-105 transition-transform shrink-0"
              />
              <div className="min-w-0">
                <span className="font-bold text-sm text-foreground tracking-tight block">
                  Ayu-Setu
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest block -mt-0.5">
                  Scholar Console
                </span>
              </div>
            </Link>
          ) : (
            <img
              src="/images/ayu-setu-emblem.png"
              alt="Ayu-Setu Emblem"
              className="w-9 h-9 mx-auto rounded-full object-cover bg-[#efe1c8] ring-1 ring-amber-500/50 shadow-md shrink-0"
            />
          )}

          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors",
              isCollapsed && "mx-auto mt-2 block"
            )}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 py-3 px-2 overflow-y-auto space-y-1">
          {SIDEBAR_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item)}
                title={isCollapsed ? item.label : undefined}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all relative group",
                  isActive
                    ? "bg-accent/15 text-accent-foreground font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform group-hover:scale-110",
                    isActive ? "text-accent" : "text-muted-foreground"
                  )}
                />

                {!isCollapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}

                {!isCollapsed && item.badge && (
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-md font-mono shrink-0",
                      isActive
                        ? "bg-accent text-accent-foreground font-bold"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Left Active Glow Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-accent rounded-r-full shadow-sm shadow-accent/40" />
                )}
              </button>
            );
          })}
        </div>

        {/* Scholar Footer Info & Logout */}
        <div className="p-3 border-t border-border/80 bg-card/40 space-y-2">
          {!isCollapsed ? (
            <div className="flex items-center gap-3 p-2 rounded-xl bg-muted/40 border border-border/60">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-herbal-900 text-white font-serif font-bold text-xs flex items-center justify-center shrink-0">
                🎓
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-foreground truncate">{displayName}</p>
                <p className="text-[10px] text-muted-foreground truncate">{displayEmail}</p>
              </div>
              <Badge variant="verified" size="sm" className="px-1 text-[9px] shrink-0">
                AIIA
              </Badge>
            </div>
          ) : (
            <div
              className="w-8 h-8 mx-auto rounded-lg bg-gradient-to-br from-primary to-herbal-900 text-white font-serif font-bold text-xs flex items-center justify-center"
              title={displayName}
            >
              🎓
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => logout()}
            className={cn(
              "w-full text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 justify-start",
              isCollapsed && "justify-center px-0"
            )}
            leftIcon={<LogOut className="h-3.5 w-3.5" />}
          >
            {!isCollapsed && <span>Sign Out</span>}
          </Button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MOBILE TOP BAR WITH DRAWER TOGGLE */}
      {/* ========================================================================= */}
      <div className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-background/95 backdrop-blur-md border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/ayu-setu-emblem.png"
            alt="Ayu-Setu Emblem"
            className="w-8 h-8 rounded-full object-cover bg-[#efe1c8] ring-1 ring-amber-500/50 shrink-0"
          />
          <span className="font-bold text-sm text-foreground">Ayu-Setu</span>
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="verified" size="sm" icon={<ShieldCheck className="h-3 w-3" />}>
            Scholar
          </Badge>
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Open navigation drawer"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE SLIDING DRAWER */}
      {/* ========================================================================= */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-background/80 backdrop-blur-sm flex">
          <div className="w-4/5 max-w-xs bg-card border-r border-border h-full flex flex-col justify-between p-4 shadow-2xl animate-slide-in-right">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <img
                    src="/images/ayu-setu-emblem.png"
                    alt="Ayu-Setu Emblem"
                    className="w-8 h-8 rounded-full object-cover bg-[#efe1c8] ring-1 ring-amber-500/50 shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Ayu-Setu</h4>
                    <p className="text-[10px] text-muted-foreground">Scholar Command Center</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 rounded-lg hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Navigation links */}
              <div className="py-3 space-y-1 overflow-y-auto max-h-[60vh]">
                {SIDEBAR_NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick(item)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors",
                        isActive
                          ? "bg-accent/15 text-accent-foreground font-bold"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={cn("h-4 w-4", isActive ? "text-accent" : "")} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom logout */}
            <div className="pt-3 border-t border-border space-y-2">
              <div className="p-2 rounded-xl bg-muted/40 text-xs">
                <p className="font-bold text-foreground truncate">{displayName}</p>
                <p className="text-[10px] text-muted-foreground truncate">{displayEmail}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-center"
                onClick={() => logout()}
                leftIcon={<LogOut className="h-3.5 w-3.5" />}
              >
                Sign Out
              </Button>
            </div>
          </div>

          <div
            className="flex-1"
            onClick={() => setMobileDrawerOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* MOBILE STICKY BOTTOM NAVIGATION BAR */}
      {/* ========================================================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-md border-t border-border px-2 py-1.5 flex items-center justify-around shadow-lg">
        {[
          { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
          { id: "career-dna", label: "Career DNA", icon: Dna },
          { id: "skill-assessment", label: "Skills", icon: ClipboardCheck },
          { id: "opportunities", label: "Opp's", icon: Briefcase },
          { id: "profile", label: "Profile", icon: User },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (item.id === "skill-assessment") {
                  window.location.href = "/student/assessment-prep";
                } else if (item.id === "profile") {
                  window.location.href = "/student/onboarding";
                } else {
                  handleNavClick({
                    id: item.id,
                    label: item.label,
                    href: `#${item.id}`,
                    icon: Icon,
                  });
                }
              }}
              className={cn(
                "flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors",
                isActive ? "text-accent" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
