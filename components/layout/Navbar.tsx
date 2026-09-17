"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { siteConfig } from "@/config/site";
import { MAIN_NAVIGATION } from "@/config/navigation";
import { cn } from "@/lib/utils/cn";
import { SmartNotificationBell } from "./SmartNotificationBell";
import { EcosystemRoleSwitcher } from "./EcosystemRoleSwitcher";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur-md transition-all">
      {/* Top Ministry Banner */}
      <div className="bg-herbal-950 text-herbal-100 text-[11px] py-1 px-4 border-b border-herbal-800/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="font-semibold">{siteConfig.ministry}</span>
            <span className="text-herbal-300/60">•</span>
            <span className="hidden sm:inline text-herbal-200">{siteConfig.department}</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-herbal-300">
            <span className="hidden md:inline">Smart Automation Portal</span>
            <Badge variant="gold" size="sm" className="bg-accent/20 text-accent border-accent/40">
              National Edition
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Official Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <img
            src="/images/ayu-setu-emblem.png"
            alt="Ayu-Setu Logo"
            className="h-10 w-10 object-cover rounded-full ring-2 ring-amber-500/50 bg-[#efe1c8] group-hover:scale-105 transition-transform drop-shadow-md shrink-0"
          />
          <div>
            <div className="flex items-baseline">
              <span className="text-xl font-heading font-black tracking-tight text-foreground">
                Ayu-
              </span>
              <span className="text-xl font-heading font-black tracking-tight text-amber-500 dark:text-amber-400">
                Setu
              </span>
            </div>
            <p className="text-[9px] text-muted-foreground font-semibold tracking-wider uppercase -mt-0.5 hidden sm:block">
              Learn • Grow • Heal • Build
            </p>
          </div>
        </Link>

        {/* Desktop 6-Item Master Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {MAIN_NAVIGATION.map((item) => {
            const hasChildren = Boolean(item.children && item.children.length > 0);
            const isActive =
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
                    "px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors",
                    isActive || isMenuOpen
                      ? "text-primary bg-primary/10 border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.title}
                  {hasChildren && (
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transition-transform",
                        isMenuOpen && "rotate-180 text-primary"
                      )}
                    />
                  )}
                </Link>

                {hasChildren && isMenuOpen && (
                  <div className="absolute top-full left-0 pt-2 w-72 z-50 animate-in fade-in-0 zoom-in-95">
                    <div className="rounded-2xl p-2 bg-card/95 backdrop-blur-xl border border-border shadow-xl space-y-1">
                      {item.children?.map((child) => (
                        <Link
                          key={child.title}
                          href={child.href}
                          className="block p-2 rounded-xl hover:bg-muted/70 transition-colors"
                        >
                          <div className="text-xs font-semibold text-foreground">
                            {child.title}
                          </div>
                          {child.description && (
                            <div className="text-[10px] text-muted-foreground leading-tight">
                              {child.description}
                            </div>
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

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <SmartNotificationBell />
          <EcosystemRoleSwitcher />

          <Link href="/assess">
            <Button variant="gold" size="sm">
              Assess Skills
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 text-foreground" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background px-4 pt-3 pb-6 space-y-3 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col space-y-1">
            {MAIN_NAVIGATION.map((item) => (
              <div key={item.title} className="border-b border-border/50 pb-1">
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-xs font-bold text-foreground uppercase tracking-wider block"
                >
                  {item.title}
                </Link>
                {item.children && (
                  <div className="pl-4 space-y-1 mb-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.title}
                        href={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
