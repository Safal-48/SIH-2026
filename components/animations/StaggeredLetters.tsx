// Stagger Text Rise — Originkit

"use client";

import * as React from "react";
import { useEffect, useMemo } from "react";
import { motion, useAnimate, stagger, useInView, type Transition } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const TAGS = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "div", "span"] as const;

type Tag = (typeof TAGS)[number];

export type FontStyle = {
  fontFamily?: string;
  fontWeight?: number | string;
  fontSize?: number | string;
  lineHeight?: number | string;
  letterSpacing?: number | string;
  textAlign?: React.CSSProperties["textAlign"];
};

export type StaggeredLettersProps = {
  text?: string;
  font?: FontStyle;
  color?: string;
  tag?: Tag;
  y?: number;
  startOpacity?: number;
  transition?: Transition;
  staggerMs?: number;
  className?: string;
  triggerOnView?: boolean;
  inView?: boolean;
  delay?: number;
  highlightWords?: string[];
  highlightColor?: string;
};

export function __OriginkitBase_StaggeredLetters({
  text = "Staggered Letters",
  font = {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 120,
    lineHeight: 1.1,
    letterSpacing: 0,
    textAlign: "left",
  },
  color = "#FFFFFF",
  tag = "h3",
  y = 40,
  startOpacity = 0,
  transition = { type: "spring", stiffness: 220, damping: 18, mass: 1 },
  staggerMs = 20,
  className = "",
  triggerOnView = true,
  inView: controlledInView,
  delay = 0,
  highlightWords = [],
  highlightColor = "#E5A93B",
}: StaggeredLettersProps) {
  const [scope, animate] = useAnimate();
  const localInView = useInView(scope, { amount: 0.2, once: false });

  // Use controlled inView from parent if passed, otherwise fall back to localInView
  const isCurrentlyInView = triggerOnView
    ? controlledInView !== undefined
      ? controlledInView
      : localInView
    : true;

  const normalizedOpacity = (startOpacity ?? 0) / 100;

  useEffect(() => {
    if (!scope.current) return;

    if (isCurrentlyInView) {
      const staggerSeconds = Math.max(0, Math.round(staggerMs ?? 0)) / 1000;
      const animationConfig = {
        ...transition,
        delay: stagger(staggerSeconds),
      };

      const timer = setTimeout(() => {
        if (scope.current) {
          animate(".char", { y: 0, opacity: 1 }, animationConfig as any);
        }
      }, Math.max(0, delay * 1000));

      return () => clearTimeout(timer);
    } else {
      // When out of view, instantly hide so it re-animates smoothly when user arrives
      animate(".char", { y, opacity: normalizedOpacity }, { duration: 0 });
    }
  }, [isCurrentlyInView, animate, delay, normalizedOpacity, scope, staggerMs, transition, y]);

  const fontStyles = (font ?? {}) as React.CSSProperties;
  const safeTag = (TAGS as readonly string[]).includes(tag) ? tag : "h3";
  const MotionTag = motion[safeTag as keyof typeof motion] as any;

  // Split text into words, preserving spaces, to detect highlightWords
  const words = useMemo(() => (text ?? "").split(" "), [text]);

  return (
    <MotionTag
      ref={scope}
      style={{
        margin: 0,
        display: "block",
        width: "100%",
        whiteSpace: "normal",
        textAlign: fontStyles.textAlign ?? "center",
        color,
        ...fontStyles,
        overflow: "visible",
      }}
      className={cn("select-none", className)}
    >
      {words.map((word, wIdx) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord || word.toLowerCase().includes(hw.toLowerCase())
        );

        const chars = word.split("");

        return (
          <span
            key={`word-${wIdx}`}
            className={cn(
              "inline-block whitespace-nowrap mr-[0.28em] my-[0.06em]",
              isHighlighted && "font-semibold drop-shadow-[0_0_24px_rgba(229,169,59,0.45)]"
            )}
            style={{
              color: isHighlighted ? highlightColor : color,
            }}
          >
            {chars.map((char, cIdx) => (
              <motion.span
                key={`c-${wIdx}-${cIdx}`}
                className="char"
                style={{
                  display: "inline-block",
                  opacity: normalizedOpacity,
                  y: y,
                  willChange: "transform, opacity",
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        );
      })}
    </MotionTag>
  );
}

const __originkitPresetProps = {
  text: "STAGGER TEXT RISE",
  font: {
    fontSize: "75px",
    textAlign: "center" as const,
    fontFamily: "Inter",
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: 0,
  },
  y: 40,
  startOpacity: 0,
  transition: {
    mass: 1,
    type: "spring" as const,
    damping: 18,
    stiffness: 220,
  },
  staggerMs: 20,
};

export default function StaggeredLetters(props: StaggeredLettersProps) {
  return (
    <__OriginkitBase_StaggeredLetters
      {...(__originkitPresetProps as StaggeredLettersProps)}
      {...props}
    />
  );
}

export { StaggeredLetters };
