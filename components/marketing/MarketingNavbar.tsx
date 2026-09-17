"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Search,
  CheckCircle2,
  Compass,
  BookOpen,
  Briefcase,
  ShieldCheck,
  Activity,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/config/site";
import { MAIN_NAVIGATION, MainNavItem } from "@/config/navigation";
import { cn } from "@/lib/utils/cn";
import { SmartNotificationBell } from "@/components/layout/SmartNotificationBell";
import { EcosystemRoleSwitcher } from "@/components/layout/EcosystemRoleSwitcher";

interface MarketingNavbarProps {
  onOpenRoleModal?: (action: "login" | "register") => void;
}

export function MarketingNavbar({ onOpenRoleModal }: MarketingNavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileGroup = (title: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#04160e]/95 backdrop-blur-md border-b border-emerald-900/50 shadow-lg"
          : "bg-transparent backdrop-blur-xs border-b border-transparent"
      )}
    >
      {/* Top Ministry Ribbon */}
      <div className="bg-herbal-950 text-herbal-100 text-[11px] py-1 px-4 border-b border-herbal-800/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-semibold">{siteConfig.ministry}</span>
            <span className="text-herbal-300/60">•</span>
            <span className="hidden sm:inline text-herbal-200">{siteConfig.department}</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-herbal-300">
            <Link href="/foundation" className="hover:text-accent transition-colors hidden md:inline">
              Architecture Explorer
            </Link>
            <Badge variant="gold" size="sm" className="bg-accent/20 text-accent border-accent/40">
              National Edition
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 py-2 flex items-center justify-between gap-6">
        {/* Official Ayu-Setu Brand Logo */}
        <Link href="/" className="flex items-center gap-3.5 group shrink-0">
          <img
            src="/images/ayu-setu-emblem.png"
            alt="Ayu-Setu Official Logo"
            className="h-11 w-11 object-cover rounded-full ring-2 ring-amber-400/50 bg-[#efe1c8] group-hover:scale-105 transition-transform drop-shadow-md shrink-0"
          />
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className="text-2xl font-heading font-black tracking-tight text-white">
                Ayu-
              </span>
              <span className="text-2xl font-heading font-black tracking-tight text-amber-400">
                Setu
              </span>
            </div>
            <p className="text-[10px] text-amber-200/90 font-semibold tracking-wider uppercase -mt-0.5 hidden sm:block">
              Learn • Grow • Heal • Build
            </p>
          </div>
        </Link>

        {/* Desktop 6-Item Top Navigation with Dropdowns */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 relative">
          {MAIN_NAVIGATION.map((item) => {
            const hasChildren = Boolean(item.children && item.children.length > 0);
            const isCurrentActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(item.href);
            const isMenuOpen = activeDropdown === item.title;

            return (
              <div
                key={item.title}
                className="relative py-2"
                onMouseEnter={() => hasChildren && setActiveDropdown(item.title)}
                onMouseLeave={() => hasChildren && setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-xl text-xs xl:text-[13px] font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all duration-200",
                    isCurrentActive || isMenuOpen
                      ? "text-amber-400 bg-emerald-950/70 border border-amber-500/30"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span>{item.title}</span>
                  {hasChildren && (
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200 text-gray-400",
                        isMenuOpen && "rotate-180 text-amber-400"
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown Menu Popover */}
                {hasChildren && isMenuOpen && (
                  <div className="absolute top-full left-0 pt-2 w-80 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                    <div className="rounded-2xl p-2.5 bg-[#03150d]/95 backdrop-blur-2xl border border-emerald-500/40 shadow-2xl space-y-1">
                      <div className="px-3 py-1.5 border-b border-emerald-900/60 mb-1 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                          {item.title} Sections
                        </span>
                        <span className="text-[10px] text-gray-400">NCISM Aligned</span>
                      </div>

                      {item.children?.map((child) => (
                        <Link
                          key={child.title}
                          href={child.href}
                          className="flex flex-col p-2.5 rounded-xl hover:bg-emerald-900/50 transition-colors group/sub"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-white group-hover/sub:text-amber-300 transition-colors">
                              {child.title}
                            </span>
                            <span className="text-[10px] text-emerald-400/80 group-hover/sub:translate-x-0.5 transition-transform">
                              →
                            </span>
                          </div>
                          {child.description && (
                            <p className="text-[11px] text-gray-300/80 font-normal leading-tight mt-0.5">
                              {child.description}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <SmartNotificationBell />
          <EcosystemRoleSwitcher />

          <Link href="/student">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full h-10 px-4 border-emerald-600/60 bg-emerald-950/40 text-emerald-100 hover:text-white hover:border-emerald-400 text-xs font-semibold tracking-wide"
            >
              Scholar Home
            </Button>
          </Link>

          <Link href="/assess">
            <Button
              variant="gold"
              size="sm"
              className="rounded-full h-10 px-6 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wide shadow-md shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all"
            >
              Assess Skills
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 text-foreground" />}
        </button>
      </div>

      {/* Mobile Drawer with Accordion Dropdowns */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-[#03150d]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col space-y-1">
            {MAIN_NAVIGATION.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0);
              const isExpanded = mobileExpanded[item.title];

              return (
                <div key={item.title} className="border-b border-emerald-950/80 pb-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 text-xs font-bold text-white uppercase tracking-wider hover:text-amber-400"
                    >
                      {item.title}
                    </Link>
                    {hasChildren && (
                      <button
                        onClick={() => toggleMobileGroup(item.title)}
                        className="p-2 text-gray-400 hover:text-white"
                        aria-label={`Toggle ${item.title}`}
                      >
                        <ChevronDown
                          className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")}
                        />
                      </button>
                    )}
                  </div>

                  {hasChildren && isExpanded && (
                    <div className="pl-4 pr-2 py-1 space-y-1 bg-emerald-950/40 rounded-xl mb-2">
                      {item.children?.map((child) => (
                        <Link
                          key={child.title}
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-2.5 py-1.5 text-xs text-gray-300 hover:text-amber-300 transition-colors"
                        >
                          <div className="font-semibold">{child.title}</div>
                          {child.description && (
                            <div className="text-[10px] text-gray-400">{child.description}</div>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="pt-3 flex flex-col gap-2">
            <Link href="/student" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full justify-center text-xs">
                Scholar Dashboard
              </Button>
            </Link>
            <Link href="/assess" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="gold" size="sm" className="w-full justify-center text-xs font-bold">
                Launch Assessment
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
