import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-herbal-950 text-herbal-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Column 1: Organization & Vision */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/images/ayu-setu-emblem.png"
                alt="Ayu-Setu Logo"
                className="h-12 w-12 object-cover rounded-full ring-2 ring-amber-500/50 bg-[#efe1c8] drop-shadow-md shrink-0"
              />
              <div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-serif font-bold tracking-tight text-white">
                    Ayu-
                  </span>
                  <span className="text-2xl font-serif font-bold tracking-tight text-amber-400">
                    Setu
                  </span>
                </div>
                <p className="text-[9px] tracking-widest text-amber-300 uppercase font-semibold">
                  Learn • Grow • Heal • Build
                </p>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-herbal-200/80 leading-relaxed max-w-md">
              An Academia–Industry Skill Intelligence and Career Ecosystem for Ayurveda engineered for the Ministry of Ayush and All India Institute of Ayurveda (AIIA). Facilitating authentic skill mapping, clinical competency passports, supervisor endorsements, and industry internship placements.
            </p>
            <div className="text-[11px] text-herbal-400 space-y-1">
              <p>Problem Statement: Portal for Academia - Industry collaboration for Skill Mapping, Internships and Placement</p>
              <p>Department: All India Institute of Ayurveda | Theme: Smart Automation</p>
            </div>
          </div>

          {/* Column 2: Stakeholder Gateways */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
              Stakeholder Gateways
            </h5>
            <ul className="space-y-2 text-xs text-herbal-200/80">
              <li>
                <Link href="/student" className="hover:text-white transition-colors">
                  Ayurveda Students (BAMS/MD)
                </Link>
              </li>
              <li>
                <Link href="/academician" className="hover:text-white transition-colors">
                  Faculty & Supervisors
                </Link>
              </li>
              <li>
                <Link href="/industry" className="hover:text-white transition-colors">
                  Hospitals & Herbal Pharma
                </Link>
              </li>
              <li>
                <Link href="/institution" className="hover:text-white transition-colors">
                  Colleges & Universities
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  National Ayush Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional Links */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
              Official Portals
            </h5>
            <ul className="space-y-2 text-xs text-herbal-200/80">
              <li>
                <a
                  href={siteConfig.links.ministry}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Ministry of Ayush
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.aiia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  All India Institute of Ayurveda
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.ncism}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  NCISM India
                </a>
              </li>
              <li>
                <Link href="/#design-system" className="hover:text-white transition-colors">
                  Design Architecture System
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-herbal-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-herbal-300">
          <p>
            © {new Date().getFullYear()} Ayu-Setu • Ministry of Ayush Government of India Initiative.
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Ayush Data Standards
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
