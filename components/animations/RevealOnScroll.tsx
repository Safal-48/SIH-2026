"use client";

import React from "react";
import { ScrollReveal } from "./ScrollReveal";

export interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 20,
}: RevealOnScrollProps) {
  return (
    <ScrollReveal
      className={className}
      delay={delay}
      direction={direction}
      distance={distance}
    >
      {children}
    </ScrollReveal>
  );
}
