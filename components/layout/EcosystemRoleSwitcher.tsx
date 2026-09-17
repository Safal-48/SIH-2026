"use client";

import * as React from "react";
import Link from "next/link";
import {
  UserCheck,
  GraduationCap,
  Building2,
  Landmark,
  ShieldCheck,
  ChevronDown,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { ROLE_DEFINITIONS, UserRole } from "@/types/roles";
import { cn } from "@/lib/utils/cn";

export function EcosystemRoleSwitcher() {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const roleConfigs: {
    role: UserRole;
    title: string;
    subtitle: string;
    badge: string;
    route: string;
    icon: React.ReactNode;
    iconBg: string;
    badgeColor: string;
  }[] = [
    {
      role: "STUDENT",
      title: "Student Portal",
      subtitle: "Skills & Assessments",
      badge: "Scholars",
      route: "/student",
      icon: <UserCheck className="h-4 w-4 text-emerald-400" />,
      iconBg: "bg-emerald-500/10 border-emerald-500/30",
      badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    },
    {
      role: "ACADEMICIAN",
      title: "Faculty Portal",
      subtitle: "Reviews & Mentorship",
      badge: "Faculty",
      route: "/academician",
      icon: <GraduationCap className="h-4 w-4 text-amber-400" />,
      iconBg: "bg-amber-500/10 border-amber-500/30",
      badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    },
    {
      role: "INSTITUTION",
      title: "Institution Portal",
      subtitle: "Curriculum & MoUs",
      badge: "Colleges",
      route: "/institution",
      icon: <Landmark className="h-4 w-4 text-sky-400" />,
      iconBg: "bg-sky-500/10 border-sky-500/30",
      badgeColor: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    },
    {
      role: "INDUSTRY",
      title: "Industry & Recruiters",
      subtitle: "Jobs & Internships",
      badge: "Partners",
      route: "/industry",
      icon: <Building2 className="h-4 w-4 text-purple-400" />,
      iconBg: "bg-purple-500/10 border-purple-500/30",
      badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    },
    {
      role: "ADMIN",
      title: "National Ayush Admin",
      subtitle: "Governance & Standards",
      badge: "Ministry",
      route: "/admin",
      icon: <ShieldCheck className="h-4 w-4 text-amber-300" />,
      iconBg: "bg-amber-400/10 border-amber-400/30",
      badgeColor: "bg-amber-400/15 text-amber-300 border-amber-400/30",
    },
  ];

  // Detect active role from current URL pathname
  const activeRole = React.useMemo(() => {
    if (!pathname) return null;
    if (pathname.startsWith("/academician")) return "ACADEMICIAN";
    if (pathname.startsWith("/institution")) return "INSTITUTION";
    if (pathname.startsWith("/industry")) return "INDUSTRY";
    if (pathname.startsWith("/admin")) return "ADMIN";
    if (pathname.startsWith("/student") || pathname.startsWith("/home")) return "STUDENT";
    return null;
  }, [pathname]);

  const activeConfig = roleConfigs.find((cfg) => cfg.role === activeRole);

  // Close on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Switcher Button - Displays Active Portal Name & Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all shadow-sm group",
          activeConfig
            ? "bg-emerald-950/80 border-emerald-500/50 text-white hover:border-amber-400/60 shadow-emerald-950/30"
            : "bg-white/5 border-emerald-500/30 hover:border-amber-400/50 text-gray-200"
        )}
        title="Switch Stakeholder Portal"
      >
        {activeConfig ? (
          <>
            <span className="flex-shrink-0">{activeConfig.icon}</span>
            <span className="font-heading font-semibold text-white group-hover:text-amber-300 transition-colors">
              {activeConfig.title}
            </span>
          </>
        ) : (
          <>
            <Layers className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline font-heading font-medium">Portals</span>
          </>
        )}
        <ChevronDown
          className={`h-3 w-3 text-gray-400 transition-transform ${
            isOpen ? "rotate-180 text-amber-400" : ""
          }`}
        />
      </button>

      {/* Clean Streamlined Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-[#03190f]/95 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 space-y-1">
          <div className="px-2.5 py-1.5 border-b border-emerald-500/20 flex items-center justify-between mb-1">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" />
              <span>Stakeholder Portals</span>
            </span>
            <span className="text-[10px] text-gray-400 font-sans font-medium">Quick Switch</span>
          </div>

          <div className="space-y-1">
            {roleConfigs.map((cfg) => {
              const isItemActive = cfg.role === activeRole;
              return (
                <Link
                  key={cfg.role}
                  href={cfg.route}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "p-2 rounded-xl border transition-all flex items-center justify-between gap-3 group",
                    isItemActive
                      ? "bg-amber-400/10 border-amber-400/40 text-white shadow-sm ring-1 ring-amber-400/20"
                      : "hover:bg-white/[0.07] border-transparent hover:border-emerald-500/30"
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={cn(
                        "p-2 rounded-xl border flex-shrink-0 group-hover:scale-105 transition-transform",
                        cfg.iconBg
                      )}
                    >
                      {cfg.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs sm:text-sm font-heading font-semibold text-white group-hover:text-amber-300 transition-colors truncate">
                          {cfg.title}
                        </span>
                        {isItemActive && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 uppercase tracking-wider">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-gray-400 font-sans truncate">
                        {cfg.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span
                      className={cn(
                        "text-[10px] font-semibold px-2 py-0.5 rounded-full border hidden sm:inline-block",
                        cfg.badgeColor
                      )}
                    >
                      {cfg.badge}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-gray-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
