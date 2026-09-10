"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  pullFactor?: number;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className,
  pullFactor = 0.25,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    x.set((clientX - centerX) * pullFactor);
    y.set((clientY - centerY) * pullFactor);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
