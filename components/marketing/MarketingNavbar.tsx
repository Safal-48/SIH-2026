"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Sparkles, LogIn } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

interface MarketingNavbarProps {
  onOpenRoleModal: (action: "login" | "register") => void;
}

export function MarketingNavbar({ onOpenRoleModal }: MarketingNavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/#hero" },
    { label: "For Students", href: "/student" },
    { label: "For Industry", href: "/industry" },
    { label: "For Institutions", href: "/institution" },
    { label: "For Faculty", href: "/academician" },
    { label: "Smart Automation", href: "/automation" },
    { label: "Opportunities", href: "/#opportunities" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/80 shadow-sm"
          : "bg-background/50 backdrop-blur-sm border-b border-transparent"
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
              Ayush Smart Automation
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-herbal-800 text-white flex items-center justify-center font-serif text-lg font-bold shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
            <span>वै</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-foreground font-sans">
                Vaidya Setu
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-accent px-1.5 py-0.2 rounded bg-accent/10 border border-accent/20">
                National
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground font-medium hidden sm:block -mt-0.5">
              Academia–Industry Ayush Portal
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<LogIn className="h-3.5 w-3.5 text-primary" />}
            >
              Login
            </Button>
          </Link>

          <Link href="/role-selection">
            <Button
              variant="gold"
              size="sm"
              leftIcon={<Sparkles className="h-3.5 w-3.5 text-accent-foreground" />}
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 text-foreground" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-center"
              >
                Login
              </Button>
            </Link>
            <Link href="/role-selection" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="gold"
                size="sm"
                className="w-full justify-center"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
