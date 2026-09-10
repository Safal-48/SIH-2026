"use client";

import React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { fadeIn, slideUp } from "@/lib/utils/animation-variants";

interface AnimatedSectionProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
  variant?: "fade" | "slide";
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  variant = "slide",
  delay = 0,
  ...props
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const selectedVariant = variant === "fade" ? fadeIn : slideUp;

  return (
    <motion.section
      initial={shouldReduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={selectedVariant}
      transition={{ delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.section>
  );
}
