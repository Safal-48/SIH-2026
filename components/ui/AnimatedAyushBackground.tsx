"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";

export function AnimatedAyushBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Mouse coordinates for interactive prana attraction
    const mouse = { x: -1000, y: -1000, active: false };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // 60 Interactive Botanical & Prana Particles
    const PARTICLE_COUNT = Math.min(65, Math.floor((width * height) / 18000));
    const colors = [
      "rgba(33, 104, 73, 0.45)",   // Deep Herbal Green
      "rgba(79, 168, 125, 0.55)",  // Emerald
      "rgba(229, 169, 59, 0.65)",  // Saffron Gold
      "rgba(194, 109, 48, 0.45)",  // Sandalwood Earth
    ];

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.15, // slight upward drift
      radius: Math.random() * 2.8 + 1.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      baseAlpha: Math.random() * 0.4 + 0.3,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
    }));

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 1. Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Harmonic sine wave oscillation
        p.pulse += p.pulseSpeed;
        const currentRadius = p.radius + Math.sin(p.pulse) * 0.6;

        // Interactive mouse repulsion/attraction
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const force = (140 - dist) / 140;
            p.x -= (dx / dist) * force * 1.5;
            p.y -= (dy / dist) * force * 1.5;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around viewport edges
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Draw particle glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        // 2. Draw subtle connective energy filaments between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 95) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / 95) * 0.22;
            ctx.strokeStyle = `rgba(79, 168, 125, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden select-none",
        className
      )}
    >
      {/* 1. Flowing Aurora Mesh Orbs (Continuous Organic Color Waves) */}
      <div className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-br from-emerald-500/20 via-primary/15 to-transparent blur-[100px] animate-aurora-1" />
      <div className="absolute top-[20%] -right-[15%] w-[60vw] h-[60vw] max-w-[750px] max-h-[750px] rounded-full bg-gradient-to-bl from-amber-400/25 via-accent/20 to-transparent blur-[110px] animate-aurora-2" />
      <div className="absolute top-[60%] -left-[15%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full bg-gradient-to-tr from-saffron-500/20 via-earth-500/15 to-transparent blur-[120px] animate-aurora-3" />
      <div className="absolute -bottom-[20%] right-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-tl from-emerald-600/20 via-herbal-700/15 to-transparent blur-[110px] animate-aurora-4" />

      {/* 2. Slow-Rotating Sacred Vedic Yantra Watermark in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.035] dark:opacity-[0.06] animate-spin-extremely-slow pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full text-foreground" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="200" cy="200" r="190" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="150" />
          <circle cx="200" cy="200" r="110" strokeDasharray="6 3" />
          <circle cx="200" cy="200" r="70" />
          {/* Interlocking Triangles (Sacred Vedic Yantra / Mahabhutas) */}
          <polygon points="200,40 338,280 62,280" />
          <polygon points="200,360 62,120 338,120" />
          <polygon points="200,75 308,265 92,265" strokeWidth="0.75" />
          <polygon points="200,325 92,135 308,135" strokeWidth="0.75" />
        </svg>
      </div>

      {/* 3. Interactive Floating Botanical Spore & Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto" />
    </div>
  );
}
