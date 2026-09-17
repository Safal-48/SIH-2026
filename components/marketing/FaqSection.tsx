"use client";

import React, { useState, useMemo } from "react";
import { ChevronDown, HelpCircle, Search, Sparkles, MessageCircleQuestion, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

interface FaqItem {
  id: string;
  category: "student" | "institution" | "industry" | "compliance";
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: "faq-1",
    category: "student",
    question: "How does the Digital Competency Passport differ from my college marksheet?",
    answer: "Traditional marksheets record theoretical exam percentages. Ayu-Setu's Digital Competency Passport documents granular, verified clinical procedures — such as your exact count of attested Nadi Pariksha evaluations, Vamana/Virechana protocols conducted, and pharmacology laboratory assays. Every case is cryptographically signed by your teaching faculty and verifiable by hospital employers in under 1 second.",
  },
  {
    id: "faq-2",
    category: "student",
    question: "Can I use Ayu-Setu during my BAMS internship to apply for MD fellowships?",
    answer: "Yes, absolutely! Rotatory interns use the platform to record daily clinical encounters in the NCISM-compliant e-Logbook. Once attested by your college mentor, you can generate a shareable verified link or QR badge to attach directly to fellowship applications at premier institutes like AIIA New Delhi and ITRA Jamnagar.",
  },
  {
    id: "faq-3",
    category: "compliance",
    question: "Is Ayu-Setu aligned with the National Commission for Indian System of Medicine (NCISM)?",
    answer: "Yes. All skill taxonomy schemas, diagnostic procedures, and logbook competencies are mapped 1-to-1 with the NCISM Competency-Based Dynamic Curriculum (CBDC) standards and National Ayush Mission guidelines.",
  },
  {
    id: "faq-4",
    category: "institution",
    question: "How does Ayu-Setu simplify annual college accreditation audits?",
    answer: "Instead of maintaining thousands of physical paper logbooks that can get lost or damaged, institution deans have a central real-time dashboard. When NCISM or NABH auditors arrive, the institution can export tamper-evident clinical attestation statistics across all OPD and IPD departments with cryptographic audit trails.",
  },
  {
    id: "faq-5",
    category: "industry",
    question: "How do pharmaceutical companies and hospitals hire through Ayu-Setu?",
    answer: "Employers post clinical fellowships, hospital resident positions, and formulation R&D jobs with specific competency criteria (e.g. 'Must have 50+ attested Panchakarma cases' or 'HPTLC standardization certified'). The matching engine surfaces pre-verified candidates whose passports match those criteria, cutting recruitment turnaround from 6 weeks to 48 hours.",
  },
  {
    id: "faq-6",
    category: "compliance",
    question: "How is tamper-proof security guaranteed for student credentials?",
    answer: "Each verified logbook entry and attestation event generates a unique SHA-256 Merkle hash stored on a distributed tamper-evident ledger. Even if a local record is altered, the cryptographic signature mismatch immediately flags the entry as invalid.",
  },
  {
    id: "faq-7",
    category: "student",
    question: "What is the Career DNA Matcher and how accurate are the recommendations?",
    answer: "The Career DNA Matcher is a clinical decision algorithm developed in collaboration with senior AIIA faculty. By analyzing your Prakriti strengths, clinical procedural interests, and academic level, it matches you with high-growth specialized paths (such as Phytopharmaceutical R&D, Luxury Wellness Tourism, or Acute Kayachikitsa) along with real CTC benchmarks and necessary bridging modules.",
  },
  {
    id: "faq-8",
    category: "institution",
    question: "Can faculty members sign off on clinical procedures directly from their mobile phones?",
    answer: "Yes. Faculty mentors have a dedicated mobile-optimized Academician Portal where they can review submitted case summaries, verify diagnosis accuracy, and provide 1-tap cryptographic approvals right at the patient's bedside during clinical rounds.",
  },
];

export function FaqSection() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIds, setOpenIds] = useState<string[]>(["faq-1", "faq-3"]);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCat = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="faq" className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-transparent overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="h-3.5 w-3.5 text-primary" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
            Everything You Need to Know About{" "}
            <span className="font-serif font-bold text-white">Ayu-</span>
            <span className="font-serif font-bold text-amber-400">Setu</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Got questions about NCISM compliance, competency passports, or employer placements? Find direct answers below.
          </p>
        </div>

        {/* Filter Pills & Search */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {[
                { id: "all", label: "All Questions" },
                { id: "student", label: "Students" },
                { id: "institution", label: "Colleges & Faculty" },
                { id: "industry", label: "Hospitals & Pharma" },
                { id: "compliance", label: "NCISM Compliance" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeCategory === tab.id
                      ? "bg-accent text-accent-foreground font-bold shadow-sm shadow-accent/20"
                      : "bg-card/70 text-muted-foreground hover:text-foreground border border-border"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border border-border w-full sm:w-64">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-foreground outline-none w-full placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-border/80 bg-card/85 backdrop-blur-md overflow-hidden transition-all duration-200 hover:border-accent/40"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-foreground">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 bg-accent/20 text-accent" : "text-muted-foreground"
                  }`}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="p-8 rounded-3xl bg-card/90 backdrop-blur-md border border-accent/40 text-center space-y-4 max-w-2xl mx-auto shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-accent/20 text-accent flex items-center justify-center mx-auto text-xl">
            💬
          </div>
          <h3 className="text-xl font-bold text-foreground">
            Still Have Questions About Your Institution or Hospital?
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Our National Ayush Mission integration team is available to conduct live demos for deans, medical directors, and student councils.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="gold"
              size="md"
              onClick={() => router.push("/role-selection")}
              className="font-bold shadow-md shadow-accent/20"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Get Started Free
            </Button>
            <a
              href="mailto:support@ayusetu.gov.in"
              className="px-4 py-2 rounded-xl bg-card hover:bg-muted border border-border text-xs font-semibold text-foreground transition-colors"
            >
              Contact Ministry Desk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
