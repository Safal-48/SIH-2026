"use client";

import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils/cn";

export interface Card3DTiltProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  glare?: boolean;
  glareColor?: "gold" | "emerald" | "sandalwood";
}

export function Card3DTilt({
  children,
  className,
  maxTilt = 8,
  perspective = 1000,
  scale = 1.02,
  glare = true,
  glareColor = "gold",
  style,
  ...props
}: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (-maxTilt to +maxTilt)
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      // Calculate glare percentage (0% to 100%)
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      setTilt({ rotateX, rotateY });
      setGlarePos({ x: glareX, y: glareY, opacity: 1 });
    },
    [maxTilt]
  );

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  // Ayurvedic themed glare gradients
  const glareGradients = {
    gold: "radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(229, 169, 59, 0.22) 0%, rgba(229, 169, 59, 0.05) 40%, transparent 70%)",
    emerald: "radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(79, 168, 125, 0.24) 0%, rgba(33, 104, 73, 0.06) 40%, transparent 70%)",
    sandalwood: "radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(194, 109, 48, 0.22) 0%, rgba(194, 109, 48, 0.05) 40%, transparent 70%)",
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        perspective: `${perspective}px`,
        ...style,
      }}
      className={cn("relative group transition-transform duration-200 ease-out", className)}
      {...props}
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: isHovered
            ? "transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)"
            : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative"
      >
        {children}

        {/* Specular Ayurvedic Glare Overlay */}
        {glare && (
          <div
            aria-hidden="true"
            style={
              {
                "--glare-x": `${glarePos.x}%`,
                "--glare-y": `${glarePos.y}%`,
                backgroundImage: glareGradients[glareColor],
                opacity: glarePos.opacity,
                transition: "opacity 0.3s ease",
              } as React.CSSProperties
            }
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-30"
          />
        )}
      </div>
    </div>
  );
}
