import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function MarketingFooter() {
  return (
    <footer className="w-full border-t border-border bg-herbal-950 text-herbal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Column 1: Brand & Ministry Attribution (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="#hero" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent text-herbal-950 font-serif font-bold text-xl flex items-center justify-center shadow-md">
                वै
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                Vaidya Setu
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-herbal-200/80 leading-relaxed max-w-sm">
              An AI-powered smart automation platform engineered for the Ministry of Ayush and All India Institute of Ayurveda (AIIA). Connecting students, academicians, and herbal pharma for skill mapping and accredited placements.
            </p>

            <div className="text-[11px] text-herbal-400 space-y-1 pt-2">
              <p>Problem Statement: Portal for Academia - Industry collaboration for Skill Mapping, Internships and Placement</p>
              <p>Department: All India Institute of Ayurveda | Theme: Smart Automation</p>
            </div>

            {/* Social Icons Placeholders */}
            <div className="pt-2 flex items-center gap-3 text-xs text-herbal-300">
              <span className="w-8 h-8 rounded-lg bg-herbal-900 border border-herbal-800 flex items-center justify-center hover:text-accent hover:border-accent/40 cursor-pointer transition-colors">
                𝕏
              </span>
              <span className="w-8 h-8 rounded-lg bg-herbal-900 border border-herbal-800 flex items-center justify-center hover:text-accent hover:border-accent/40 cursor-pointer transition-colors">
                in
              </span>
              <span className="w-8 h-8 rounded-lg bg-herbal-900 border border-herbal-800 flex items-center justify-center hover:text-accent hover:border-accent/40 cursor-pointer transition-colors">
                yt
              </span>
              <span className="w-8 h-8 rounded-lg bg-herbal-900 border border-herbal-800 flex items-center justify-center hover:text-accent hover:border-accent/40 cursor-pointer transition-colors">
                gh
              </span>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-accent">
              Platform
            </h5>
            <ul className="space-y-2 text-xs text-herbal-200/80">
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#student-journey" className="hover:text-white transition-colors">
                  Student Journey
                </a>
              </li>
              <li>
                <a href="#career-paths" className="hover:text-white transition-colors">
                  Career Pathways
                </a>
              </li>
              <li>
                <a href="#skill-gap" className="hover:text-white transition-colors">
                  Skill Gap Report
                </a>
              </li>
              <li>
                <a href="#passport" className="hover:text-white transition-colors">
                  Competency Passport
                </a>
              </li>
              <li>
                <Link href="/foundation" className="hover:text-white transition-colors text-accent">
                  Design Architecture System
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Stakeholders */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-accent">
              Stakeholders
            </h5>
            <ul className="space-y-2 text-xs text-herbal-200/80">
              <li>
                <Link href="/student" className="hover:text-white transition-colors">
                  For Students (BAMS/MD)
                </Link>
              </li>
              <li>
                <Link href="/academician" className="hover:text-white transition-colors">
                  For Academicians & Faculty
                </Link>
              </li>
              <li>
                <Link href="/industry" className="hover:text-white transition-colors">
                  For Industry & Hospitals
                </Link>
              </li>
              <li>
                <Link href="/institution" className="hover:text-white transition-colors">
                  For Colleges & Universities
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  National Ayush Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Official & Legal */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-accent">
              Official & Legal
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
                <span className="hover:text-white cursor-pointer transition-colors block">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors block">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors block">
                  Ayush Data Security
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Attribution Bar */}
        <div className="pt-8 border-t border-herbal-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-herbal-300">
          <p>
            © {new Date().getFullYear()} Vaidya Setu • Ministry of Ayush Government of India Initiative.
          </p>
          <div className="flex items-center gap-4">
            <span>National Ayush Grid • Ministry of Ayush</span>
            <span>•</span>
            <span>All India Institute of Ayurveda</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
