"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface AnimatedTextProps {
  text: string;
  className?: string;
  el?: keyof JSX.IntrinsicElements;
  staggerDelay?: number;
  wordMode?: boolean;
}

export function AnimatedText({
  text,
  className,
  el: Wrapper = "span",
  staggerDelay = 0.04,
  wordMode = true,
}: AnimatedTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const items = wordMode ? text.split(" ") : text.split("");

  if (shouldReduceMotion) {
    const Component = Wrapper as React.ElementType;
    return <Component className={className}>{text}</Component>;
  }

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 12,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const Component = Wrapper as React.ElementType;

  return (
    <Component className={cn("inline-block", className)} aria-label={text}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        aria-hidden="true"
        className="inline-block"
      >
        {items.map((item, index) => (
          <motion.span
            variants={child}
            key={index}
            className="inline-block"
          >
            {item}
            {wordMode && index < items.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}
