"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Compass, ShieldCheck, Briefcase, ArrowUp, Volume2, VolumeX, Sparkles, BookOpen, Leaf, Activity } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function QuickActionDock() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [soundPlaying, setSoundPlaying] = useState(false);
  const [activeAudioCtx, setActiveAudioCtx] = useState<AudioContext | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 320);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // 1. Direct on-page element match
    const directEl = document.getElementById(id);
    if (directEl) {
      directEl.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // 2. Semantic aliases on homepage
    if (id === "how-it-works") {
      const el = document.getElementById("student-journey") || document.getElementById("ecosystem");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
      router.push("/foundation");
    } else if (id === "dosha-matcher") {
      const el = document.getElementById("passport") || document.getElementById("ecosystem");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
      router.push("/career-dna");
    } else if (id === "clinical-matrix") {
      const el = document.getElementById("verifier") || document.getElementById("passport");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
      router.push("/assessments");
    } else if (id === "network" || id === "opportunities") {
      const el = document.getElementById("network") || document.getElementById("opportunities");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
      router.push("/opportunities");
    } else if (id === "verifier") {
      const el = document.getElementById("verifier");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
      router.push("/verify");
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Pure Web Audio API Synthesized Singing Bowl / Prana Chime
  const toggleAmbientSound = () => {
    if (soundPlaying && activeAudioCtx) {
      try {
        activeAudioCtx.close();
      } catch {}
      setActiveAudioCtx(null);
      setSoundPlaying(false);
      return;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtxClass();
      setActiveAudioCtx(ctx);
      setSoundPlaying(true);

      // Play authentic meditative harmonic frequencies (432Hz fundamental + 864Hz octave harmonic)
      const playTone = (freq: number, delay: number, dur: number, maxGain: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

        gain.gain.setValueAtTime(0, ctx.currentTime + delay);
        gain.gain.linearRampToValueAtTime(maxGain, ctx.currentTime + delay + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + dur + 0.1);
      };

      // Play rhythmic meditation bowl chime sequence
      playTone(432, 0, 4.5, 0.14);
      playTone(648, 0.2, 3.8, 0.08);
      playTone(864, 0.4, 3.2, 0.05);

      setTimeout(() => {
        setSoundPlaying(false);
      }, 4800);
    } catch {
      setSoundPlaying(false);
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Quick Action Navigation Dock"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 animate-fade-in max-w-[94vw]"
    >
      <div className="flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-2xl bg-[#03150d]/90 backdrop-blur-xl border border-amber-500/40 shadow-2xl text-foreground">
        {/* Item 1: How It Works */}
        <button
          onClick={() => scrollToSection("how-it-works")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-emerald-950/60 text-xs font-semibold text-gray-300 hover:text-white transition-all hover:scale-105"
          title="How It Works"
        >
          <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Process</span>
        </button>

        {/* Item 2: Career DNA */}
        <button
          onClick={() => scrollToSection("dosha-matcher")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-emerald-950/60 text-xs font-semibold text-gray-300 hover:text-white transition-all hover:scale-105"
          title="Jump to Career DNA Matcher"
        >
          <Compass className="h-3.5 w-3.5 text-amber-400" />
          <span className="hidden sm:inline">Career DNA</span>
        </button>

        {/* Item 3: Clinical Matrix */}
        <button
          onClick={() => scrollToSection("clinical-matrix")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-emerald-950/60 text-xs font-semibold text-gray-300 hover:text-white transition-all hover:scale-105"
          title="NCISM Clinical Competency Matrix"
        >
          <Activity className="h-3.5 w-3.5 text-emerald-300" />
          <span className="hidden sm:inline">Clinical</span>
        </button>

        {/* Item 4: Placement Exchange */}
        <button
          onClick={() => scrollToSection("network")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-emerald-950/60 text-xs font-semibold text-gray-300 hover:text-white transition-all hover:scale-105"
          title="Academia-Industry Exchange & Jobs"
        >
          <Briefcase className="h-3.5 w-3.5 text-amber-400" />
          <span className="hidden sm:inline">Exchange</span>
        </button>

        <div className="w-[1px] h-5 bg-emerald-900/60 mx-1" />

        {/* Item 5: Ambient Ayurvedic Sound Easter Egg with Leaf Icon */}
        <button
          onClick={toggleAmbientSound}
          className={cn(
            "p-2 rounded-xl text-xs transition-all hover:scale-110",
            soundPlaying
              ? "bg-accent text-accent-foreground shadow-md shadow-accent/30"
              : "hover:bg-muted text-emerald-400 hover:text-foreground"
          )}
          title={soundPlaying ? "Mute Vedic Chime" : "Play Peaceful Meditative Chime (432Hz)"}
        >
          {soundPlaying ? (
            <Volume2 className="h-4 w-4 animate-pulse text-accent-foreground" />
          ) : (
            <Leaf className="h-4 w-4 text-emerald-400" />
          )}
        </button>

        {/* Item 6: Back to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all hover:scale-110"
          title="Back to Top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
