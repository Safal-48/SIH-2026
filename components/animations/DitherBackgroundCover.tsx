"use client";

import React, { useState, useEffect } from "react";
import DitherEffect2 from "./DitherEffect2";
import { cn } from "@/lib/utils/cn";

export function DitherBackgroundCover({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none",
        className
      )}
    >
      <DitherEffect2
        background="#000000"
        color="#00FFC0"
        size={34}
        speed={56}
        scale={32}
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      />
      {/* Light subtle darkening so text has high contrast, but the dither pattern remains 100% visible */}
      <div className="fixed inset-0 bg-black/25 pointer-events-none" />
    </div>
  );
}
