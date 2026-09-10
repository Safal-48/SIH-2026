"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Shield, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { publicNavItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/85 backdrop-blur-md transition-all">
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
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-herbal-800 text-white flex items-center justify-center font-serif text-xl font-bold shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
            <span>वै</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-foreground font-sans">
                Vaidya Setu
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-accent px-1.5 py-0.2 rounded bg-accent/10 border border-accent/20">
                v1.0
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground font-medium hidden sm:block -mt-0.5">
              Academia–Industry Ayush Portal
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {publicNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link href="/#roles">
            <Button variant="outline" size="sm" leftIcon={<Shield className="h-3.5 w-3.5 text-primary" />}>
              Role Gateways
            </Button>
          </Link>
          <Link href="/#components">
            <Button variant="gold" size="sm" leftIcon={<Sparkles className="h-3.5 w-3.5 text-accent-foreground" />}>
              Explore Foundation
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 text-foreground" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {publicNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Link href="/#roles" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full justify-center">
                Role Gateways
              </Button>
            </Link>
            <Link href="/#components" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="gold" size="sm" className="w-full justify-center">
                Explore Foundation
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
