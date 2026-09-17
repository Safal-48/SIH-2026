"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf } from "lucide-react";
import { StaggeredLetters } from "@/components/animations/StaggeredLetters";

export function ScrollTextRevealThought() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger when 20% of the section is visible in the viewport, repeatable on scroll
  const isInView = useInView(sectionRef, {
    amount: 0.2,
    once: false,
  });

  return (
    <section
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-transparent w-full overflow-hidden border-b border-border/40"
    >
      {/* Ambient background ethereal lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow / Tag: 🌿 FROM KNOWLEDGE TO PURPOSE */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/35 text-emerald-300 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-8 sm:mb-10 backdrop-blur-md shadow-lg shadow-emerald-950/40"
        >
          <Leaf className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
          <span>FROM KNOWLEDGE TO PURPOSE</span>
        </motion.div>

        {/* Quote Line 1 — Stagger Text Rise */}
        <div className="w-full">
          <StaggeredLetters
            inView={isInView}
            text="“Ayurveda is not just a way to heal,"
            font={{
              fontSize: "clamp(24px, 4.4vw, 48px)",
              lineHeight: 1.25,
              textAlign: "center",
              fontFamily: "var(--font-serif, 'Cinzel', Georgia, serif)",
              fontWeight: 600,
            }}
            color="#FFFFFF"
            highlightWords={["Ayurveda", "heal,"]}
            highlightColor="#E5A93B"
            delay={0.05}
            staggerMs={18}
            y={35}
            startOpacity={0}
          />
        </div>

        {/* Quote Line 2 — Stagger Text Rise */}
        <div className="w-full mt-2 sm:mt-3">
          <StaggeredLetters
            inView={isInView}
            text="it is a way to understand yourself—"
            font={{
              fontSize: "clamp(24px, 4.4vw, 48px)",
              lineHeight: 1.25,
              textAlign: "center",
              fontFamily: "var(--font-serif, 'Cinzel', Georgia, serif)",
              fontWeight: 600,
            }}
            color="#FFFFFF"
            highlightWords={["understand", "yourself—"]}
            highlightColor="#E5A93B"
            delay={0.35}
            staggerMs={18}
            y={35}
            startOpacity={0}
          />
        </div>

        {/* Quote Line 3 — Stagger Text Rise */}
        <div className="w-full mt-2 sm:mt-3">
          <StaggeredLetters
            inView={isInView}
            text="and live in harmony with nature.”"
            font={{
              fontSize: "clamp(24px, 4.4vw, 48px)",
              lineHeight: 1.25,
              textAlign: "center",
              fontFamily: "var(--font-serif, 'Cinzel', Georgia, serif)",
              fontWeight: 600,
            }}
            color="#FFFFFF"
            highlightWords={["harmony", "nature.”"]}
            highlightColor="#F59E0B"
            delay={0.65}
            staggerMs={18}
            y={35}
            startOpacity={0}
          />
        </div>

        {/* Attribution: — VaidyaSetu */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.95, duration: 0.5, ease: "easeOut" }}
          className="my-7 sm:my-9 flex items-center justify-center gap-3.5"
        >
          <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-amber-400/60" />
          <span className="text-lg sm:text-2xl font-serif italic text-amber-400 font-bold tracking-wide">
            — Ayu-Setu
          </span>
          <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-amber-400/60" />
        </motion.div>
      </div>
    </section>
  );
}

export default ScrollTextRevealThought;
