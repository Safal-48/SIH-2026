"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

interface BotanicalLeaf {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  flipAngle: number;
  flipSpeed: number;
  swayAmp: number;
  swaySpeed: number;
  swayOffset: number;
  type: "tulsi" | "neem" | "lotus" | "sandalwood";
  color: string;
  veinColor: string;
  alpha: number;
}

interface PranaParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  glowColor: string;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
}

export function AyurvedaBackgroundCover({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Interactive mouse wind / prana vortex
    const mouse = { x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.vx = (e.clientX - mouse.lastX) * 0.25;
      mouse.vy = (e.clientY - mouse.lastY) * 0.25;
      mouse.lastX = mouse.x = e.clientX;
      mouse.lastY = mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // 1. Initialize Sacred Ayurvedic Botanical Leaves (Tulsi, Neem, Lotus, Sandalwood)
    const LEAF_COUNT = Math.min(36, Math.max(18, Math.floor(width / 45)));

    const leafPalette = [
      {
        type: "tulsi" as const,
        color: "#15803d", // Deep Holy Tulsi Green
        veinColor: "rgba(254, 240, 138, 0.65)",
      },
      {
        type: "tulsi" as const,
        color: "#16a34a", // Vibrant Tulsi Jade
        veinColor: "rgba(254, 249, 195, 0.60)",
      },
      {
        type: "neem" as const,
        color: "#059669", // Fresh Bitter Neem Emerald
        veinColor: "rgba(209, 250, 229, 0.55)",
      },
      {
        type: "neem" as const,
        color: "#10b981", // Bright Neem Leaf
        veinColor: "rgba(236, 253, 245, 0.50)",
      },
      {
        type: "lotus" as const,
        color: "#f59e0b", // Sacred Golden Saffron Lotus Petal
        veinColor: "rgba(254, 243, 199, 0.70)",
      },
      {
        type: "lotus" as const,
        color: "#e11d48", // Divine Crimson Rose Petal
        veinColor: "rgba(255, 228, 230, 0.65)",
      },
      {
        type: "sandalwood" as const,
        color: "#b45309", // Warm Amber Sandalwood / Chandana
        veinColor: "rgba(253, 230, 138, 0.60)",
      },
    ];

    const leaves: BotanicalLeaf[] = Array.from({ length: LEAF_COUNT }, () => {
      const p = leafPalette[Math.floor(Math.random() * leafPalette.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 16 + 12,
        speedY: -(Math.random() * 0.45 + 0.22), // Gentle upward prana ascension
        speedX: (Math.random() - 0.5) * 0.35,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        flipAngle: Math.random() * Math.PI * 2,
        flipSpeed: Math.random() * 0.02 + 0.01,
        swayAmp: Math.random() * 30 + 12,
        swaySpeed: Math.random() * 0.018 + 0.008,
        swayOffset: Math.random() * Math.PI * 2,
        type: p.type,
        color: p.color,
        veinColor: p.veinColor,
        alpha: Math.random() * 0.3 + 0.35, // Clear, aesthetic presence
      };
    });

    // 2. Initialize Glowing Prana Golden Dust & Pollen Particles
    const PARTICLE_COUNT = Math.min(85, Math.max(40, Math.floor(width / 16)));
    const particleColors = [
      { fill: "#F59E0B", glow: "#FBBF24" }, // Saffron gold
      { fill: "#10B981", glow: "#34D399" }, // Emerald jade
      { fill: "#FCD34D", glow: "#FEF08A" }, // Amber prana
      { fill: "#34D399", glow: "#6EE7B7" }, // Mint essence
      { fill: "#F97316", glow: "#FB923C" }, // Warm Surya orange
    ];

    const particles: PranaParticle[] = Array.from({ length: PARTICLE_COUNT }, () => {
      const col = particleColors[Math.floor(Math.random() * particleColors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.4 + 1.0,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(Math.random() * 0.4 + 0.15),
        color: col.fill,
        glowColor: col.glow,
        alpha: Math.random() * 0.5 + 0.35,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.035 + 0.012,
      };
    });

    // Detailed Botanical Leaf Drawing with 3D Flip Scale & Veins
    const drawLeaf = (leaf: BotanicalLeaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);

      // 3D tumble flip scale along X axis
      const flipScale = Math.cos(leaf.flipAngle);
      ctx.scale(Math.abs(flipScale) > 0.15 ? flipScale : 0.15, 1);
      ctx.globalAlpha = leaf.alpha;

      const sz = leaf.size;

      if (leaf.type === "tulsi") {
        // --- TULSI (Holy Basil) Leaf ---
        ctx.beginPath();
        ctx.moveTo(0, -sz * 1.1); // Leaf tip
        // Right side with gentle serrations
        ctx.bezierCurveTo(sz * 0.75, -sz * 0.5, sz * 0.8, sz * 0.4, 0, sz * 0.9);
        // Left side
        ctx.bezierCurveTo(-sz * 0.8, sz * 0.4, -sz * 0.75, -sz * 0.5, 0, -sz * 1.1);
        ctx.fillStyle = leaf.color;
        ctx.shadowColor = leaf.color;
        ctx.shadowBlur = 6;
        ctx.fill();

        // Stem (Petiole)
        ctx.beginPath();
        ctx.moveTo(0, sz * 0.9);
        ctx.quadraticCurveTo(sz * 0.1, sz * 1.1, sz * 0.05, sz * 1.25);
        ctx.strokeStyle = leaf.color;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Central Midrib
        ctx.beginPath();
        ctx.moveTo(0, -sz * 0.95);
        ctx.lineTo(0, sz * 0.9);
        ctx.strokeStyle = leaf.veinColor;
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Lateral Branching Veins (Prana Nadis)
        for (let v = 1; v <= 3; v++) {
          const yPos = -sz * 0.6 + v * (sz * 0.4);
          ctx.beginPath();
          ctx.moveTo(0, yPos);
          ctx.quadraticCurveTo(sz * 0.35, yPos - sz * 0.1, sz * 0.55, yPos - sz * 0.05);
          ctx.moveTo(0, yPos);
          ctx.quadraticCurveTo(-sz * 0.35, yPos - sz * 0.1, -sz * 0.55, yPos - sz * 0.05);
          ctx.strokeStyle = leaf.veinColor;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      } else if (leaf.type === "neem") {
        // --- NEEM (Margosa) Slender Falcate Leaflet ---
        ctx.beginPath();
        ctx.moveTo(0, -sz * 1.3); // Slender curved tip
        ctx.bezierCurveTo(sz * 0.5, -sz * 0.6, sz * 0.45, sz * 0.5, sz * 0.1, sz * 1.0);
        ctx.bezierCurveTo(-sz * 0.35, sz * 0.4, -sz * 0.3, -sz * 0.7, 0, -sz * 1.3);
        ctx.fillStyle = leaf.color;
        ctx.shadowColor = leaf.color;
        ctx.shadowBlur = 5;
        ctx.fill();

        // Slender Midrib
        ctx.beginPath();
        ctx.moveTo(0, -sz * 1.15);
        ctx.quadraticCurveTo(sz * 0.1, 0, sz * 0.1, sz * 1.0);
        ctx.strokeStyle = leaf.veinColor;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      } else if (leaf.type === "lotus") {
        // --- LOTUS PETAL (Kamala / Padma) ---
        ctx.beginPath();
        ctx.moveTo(0, -sz * 1.2); // Pointed lotus tip
        ctx.bezierCurveTo(sz * 0.85, -sz * 0.4, sz * 0.7, sz * 0.6, 0, sz * 0.85);
        ctx.bezierCurveTo(-sz * 0.7, sz * 0.6, -sz * 0.85, -sz * 0.4, 0, -sz * 1.2);

        // Radiant petal gradient
        const grad = ctx.createLinearGradient(0, sz * 0.85, 0, -sz * 1.2);
        grad.addColorStop(0, leaf.color);
        grad.addColorStop(0.7, leaf.color);
        grad.addColorStop(1, "rgba(255, 247, 237, 0.9)");
        ctx.fillStyle = grad;
        ctx.shadowColor = leaf.color;
        ctx.shadowBlur = 8;
        ctx.fill();

        // Central soft petal ridge
        ctx.beginPath();
        ctx.moveTo(0, -sz * 1.05);
        ctx.lineTo(0, sz * 0.8);
        ctx.strokeStyle = leaf.veinColor;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      } else {
        // --- SANDALWOOD (Chandana) Broad Leaf ---
        ctx.beginPath();
        ctx.moveTo(0, -sz * 1.0);
        ctx.bezierCurveTo(sz * 0.7, -sz * 0.3, sz * 0.65, sz * 0.5, 0, sz * 0.9);
        ctx.bezierCurveTo(-sz * 0.65, sz * 0.5, -sz * 0.7, -sz * 0.3, 0, -sz * 1.0);
        ctx.fillStyle = leaf.color;
        ctx.shadowColor = leaf.color;
        ctx.shadowBlur = 5;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(0, -sz * 0.85);
        ctx.lineTo(0, sz * 0.85);
        ctx.strokeStyle = leaf.veinColor;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      ctx.restore();
    };

    let time = 0;

    const render = () => {
      time += 0.014;
      ctx.clearRect(0, 0, width, height);

      // ============================================================
      // 1. Render Sacred Sri Yantra & Vedic Lotus Mandala Watermark
      // ============================================================
      ctx.save();
      const cx = width * 0.5;
      const cy = height * 0.46;
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.025); // Majestic slow cosmic rotation

      const baseR = Math.min(width, height) * 0.34;
      ctx.strokeStyle = "rgba(229, 169, 59, 0.08)";
      ctx.lineWidth = 1.2;

      // Outer concentric sacred boundaries
      ctx.beginPath();
      ctx.arc(0, 0, baseR * 1.12, 0, Math.PI * 2);
      ctx.arc(0, 0, baseR, 0, Math.PI * 2);
      ctx.arc(0, 0, baseR * 0.72, 0, Math.PI * 2);
      ctx.arc(0, 0, baseR * 0.44, 0, Math.PI * 2);
      ctx.stroke();

      // 16 Outer Lotus Petals
      const outerPetalR = baseR * 0.98;
      for (let i = 0; i < 16; i++) {
        const a = (i * Math.PI) / 8;
        ctx.beginPath();
        ctx.arc(Math.cos(a) * outerPetalR * 0.85, Math.sin(a) * outerPetalR * 0.85, outerPetalR * 0.22, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 8 Inner Lotus Petals
      const innerPetalR = baseR * 0.7;
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4;
        ctx.beginPath();
        ctx.arc(Math.cos(a) * innerPetalR * 0.6, Math.sin(a) * innerPetalR * 0.6, innerPetalR * 0.32, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Sacred Interlocking Equilateral Triangles (Prakriti & Purusha)
      const triR = baseR * 0.42;
      for (let t = 0; t < 2; t++) {
        const rot = t === 0 ? 0 : Math.PI; // Upward and downward facing
        ctx.beginPath();
        for (let pt = 0; pt < 3; pt++) {
          const angle = rot + (pt * 2 * Math.PI) / 3 - Math.PI / 2;
          const px = Math.cos(angle) * triR;
          const py = Math.sin(angle) * triR;
          if (pt === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = "rgba(229, 169, 59, 0.09)";
        ctx.stroke();
      }

      // Central Bindu Divine Glowing Point
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(253, 230, 138, 0.45)";
      ctx.shadowColor = "#F59E0B";
      ctx.shadowBlur = 12;
      ctx.fill();

      ctx.restore();

      // ============================================================
      // 2. Animate and Render Sacred Botanical Leaves
      // ============================================================
      for (let i = 0; i < leaves.length; i++) {
        const l = leaves[i];
        l.y += l.speedY;
        l.rotation += l.rotSpeed;
        l.flipAngle += l.flipSpeed;

        // Organic horizontal harmonic sway
        const sway = Math.sin(time * 1.6 + l.swayOffset) * (l.swayAmp * 0.022);
        l.x += l.speedX + sway;

        // Interactive mouse breeze repulsion/deflection
        const dx = mouse.x - l.x;
        const dy = mouse.y - l.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          l.x -= (dx / dist) * force * 3.2;
          l.y -= (dy / dist) * force * 3.2;
          l.rotation += force * 0.1;
          l.flipAngle += force * 0.15;
        }

        // Viewport wrap around
        if (l.y < -40) {
          l.y = height + 40;
          l.x = Math.random() * width;
        }
        if (l.x < -40) l.x = width + 40;
        if (l.x > width + 40) l.x = -40;

        drawLeaf(l);
      }

      // ============================================================
      // 3. Animate and Render Glowing Golden Prana Pollen Particles
      // ============================================================
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.pulse += p.pulseSpeed;
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.pulse) * 0.25;

        // Mouse attraction to prana aura
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.x += (dx / dist) * force * 1.4;
          p.y += (dy / dist) * force * 1.4;
        }

        // Viewport wrap
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw particle with pulsating radial prana glow
        ctx.save();
        const currentAlpha = p.alpha * (0.65 + Math.sin(p.pulse) * 0.35);
        ctx.globalAlpha = Math.max(0.1, currentAlpha);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();

        // Connect nearby prana particles with delicate energy filaments
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 85) {
            ctx.save();
            ctx.globalAlpha = (1 - dist2 / 85) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "#10B981";
            ctx.lineWidth = 0.7;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [mounted]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none bg-background contain-paint max-w-full",
        className
      )}
    >
      {/* 1. Deep Vedic Herbal Sanctuary Atmosphere Auroras */}
      <div className="absolute -top-[12%] -left-[8%] w-[55%] h-[55vw] max-w-[750px] max-h-[750px] rounded-full bg-gradient-to-br from-emerald-600/22 via-primary/14 to-transparent blur-[120px] animate-aurora-1" />
      <div className="absolute top-[22%] -right-[10%] w-[60%] h-[60vw] max-w-[780px] max-h-[780px] rounded-full bg-gradient-to-bl from-amber-500/18 via-accent/14 to-transparent blur-[130px] animate-aurora-2" />
      <div className="absolute -bottom-[18%] left-[18%] w-[52%] h-[52vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-tr from-emerald-500/18 via-herbal-700/14 to-transparent blur-[120px] animate-aurora-3" />

      {/* 2. Interactive Botanical Leaves, Lotus Petals & Golden Prana Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none block" />

      {/* 3. Subtle vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(4,21,13,0.55)_100%)] pointer-events-none" />
    </div>
  );
}
