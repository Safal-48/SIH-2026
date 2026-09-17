"use client";

import React, { useEffect, useState } from "react";

export function InteractiveCursorGlow() {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -200, y: -200 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;
    setIsTouch(false);

    let mouseX = -200;
    let mouseY = -200;
    let currentX = -200;
    let currentY = -200;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.closest("[role='button']") ||
          target.closest(".ayur-3d-card")
        );
        setHovered(isInteractive);
      }
    };

    const onMouseDown = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 280);
    };

    const loop = () => {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      setPos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Dynamic Cursor Light Aura */}
      <div
        className="absolute rounded-full transition-transform duration-75 ease-out will-change-transform"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: hovered ? "110px" : "64px",
          height: hovered ? "110px" : "64px",
          transform: `translate(-50%, -50%) scale(${clicked ? 1.4 : 1})`,
          background: hovered
            ? "radial-gradient(circle, rgba(229, 169, 59, 0.28) 0%, rgba(79, 168, 125, 0.18) 45%, transparent 70%)"
            : "radial-gradient(circle, rgba(79, 168, 125, 0.22) 0%, rgba(33, 104, 73, 0.1) 50%, transparent 75%)",
          filter: "blur(8px)",
        }}
      />
      {/* Precision Core Dot */}
      <div
        className="absolute rounded-full will-change-transform transition-all duration-100"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: hovered ? "8px" : "4px",
          height: hovered ? "8px" : "4px",
          transform: "translate(-50%, -50%)",
          backgroundColor: hovered ? "#E5A93B" : "rgba(79, 168, 125, 0.8)",
          boxShadow: hovered
            ? "0 0 12px 2px rgba(229, 169, 59, 0.8)"
            : "0 0 6px 1px rgba(79, 168, 125, 0.6)",
        }}
      />
    </div>
  );
}
