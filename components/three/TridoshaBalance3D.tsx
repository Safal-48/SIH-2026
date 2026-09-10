"use client";

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils/cn";
import { Sparkles, Wind, Flame, Droplets, Info } from "lucide-react";

export type DoshaType = "vata" | "pitta" | "kapha";

interface DoshaMeta {
  id: DoshaType;
  name: string;
  sanskrit: string;
  elements: string;
  color: string;
  emissive: string;
  qualities: string[];
  clinicalSignificance: string;
  pos: [number, number, number];
}

const DOSHAS: Record<DoshaType, DoshaMeta> = {
  vata: {
    id: "vata",
    name: "Vata Dosha",
    sanskrit: "वात दोषः (गति/प्राण)",
    elements: "Vayu (Air) + Akasha (Ether)",
    color: "#72B095",
    emissive: "#2E7D56",
    qualities: ["Laghu (Light)", "Chala (Mobile)", "Sheetal (Cool)", "Ruksha (Dry)"],
    clinicalSignificance: "Governs nervous impulses, circulation, respiratory rhythms, and mind motor functions.",
    pos: [-1.8, 0.9, 0.4],
  },
  pitta: {
    id: "pitta",
    name: "Pitta Dosha",
    sanskrit: "पित्त दोषः (पाक/अग्नि)",
    elements: "Agni (Fire) + Jala (Water)",
    color: "#E5A93B",
    emissive: "#C26D30",
    qualities: ["Ushna (Hot)", "Tikshna (Sharp)", "Sara (Flowing)", "Laghu (Light)"],
    clinicalSignificance: "Governs metabolic transformations, digestion (Jatharagni), cellular paka, and intellect.",
    pos: [1.8, 0.8, -0.3],
  },
  kapha: {
    id: "kapha",
    name: "Kapha Dosha",
    sanskrit: "कफ दोषः (स्थिति/ओजस्)",
    elements: "Jala (Water) + Prithvi (Earth)",
    color: "#3A8B61",
    emissive: "#154734",
    qualities: ["Guru (Heavy)", "Snigdha (Unctuous)", "Sthira (Stable)", "Manda (Slow)"],
    clinicalSignificance: "Governs structural integrity, lubrication of joints, cellular immunity, and anabolic Ojas.",
    pos: [0, -1.6, 0.5],
  },
};

// 1. Central Prana Core Sphere (Ojas & Bio-energy center)
function PranaOjasCore({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Radiant Glowing Sun Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#E5A93B"
          emissive="#E5A93B"
          emissiveIntensity={isHovered ? 1.2 : 0.8}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      {/* Wireframe sacred aura cage */}
      <mesh ref={ringRef} scale={1.35}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshBasicMaterial color="#FEF9EC" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Central Core Point Light */}
      <pointLight color="#E5A93B" intensity={2.5} distance={5} decay={2} />
    </group>
  );
}

// 2. Interactive Dosha Orbit Node
function DoshaOrbitNode({
  meta,
  isSelected,
  onSelect,
}: {
  meta: DoshaMeta;
  isSelected: boolean;
  onSelect: (dosha: DoshaType) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (isSelected ? 0.6 : 0.25);
    }
  });

  return (
    <group position={meta.pos}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(meta.id);
        }}
        scale={isSelected ? 1.25 : 1.0}
      >
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshStandardMaterial
          color={meta.color}
          emissive={meta.emissive}
          emissiveIntensity={isSelected ? 0.95 : 0.5}
          roughness={0.25}
          metalness={0.65}
        />
      </mesh>

      {/* Outer focus halo if selected */}
      {isSelected && (
        <mesh scale={1.4}>
          <octahedronGeometry args={[0.34, 0]} />
          <meshBasicMaterial color={meta.color} wireframe transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  );
}

// 3. Connective Energy Streams (Lines connecting Tridosha to Prana Core)
function EnergyFilaments({ selectedDosha }: { selectedDosha: DoshaType | null }) {
  const linePoints = useMemo(() => {
    const pts: number[] = [];
    const core = [0, 0, 0];
    const nodes = Object.values(DOSHAS);

    // From core to each dosha
    nodes.forEach((n) => {
      pts.push(...core, ...n.pos);
    });

    // Outer equilateral triangle connecting Tridoshas
    pts.push(...DOSHAS.vata.pos, ...DOSHAS.pitta.pos);
    pts.push(...DOSHAS.pitta.pos, ...DOSHAS.kapha.pos);
    pts.push(...DOSHAS.kapha.pos, ...DOSHAS.vata.pos);

    return new Float32Array(pts);
  }, []);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[linePoints, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        color={selectedDosha ? DOSHAS[selectedDosha].color : "#E5A93B"}
        transparent
        opacity={0.38}
      />
    </lineSegments>
  );
}

// 4. Subtle Orbital Dust Cloud
function TridoshaDust() {
  const count = 75;
  const pointsRef = useRef<THREE.Points>(null);

  const [pos, col] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const c = new Float32Array(count * 3);
    const gold = new THREE.Color("#E5A93B");
    const emerald = new THREE.Color("#4FA87D");

    for (let i = 0; i < count; i++) {
      const r = Math.random() * 2.8 + 0.4;
      const angle = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 1.5;

      p[i * 3] = r * Math.cos(angle);
      p[i * 3 + 1] = r * Math.sin(angle);
      p[i * 3 + 2] = z;

      const chosen = Math.random() > 0.5 ? gold : emerald;
      c[i * 3] = chosen.r;
      c[i * 3 + 1] = chosen.g;
      c[i * 3 + 2] = chosen.b;
    }

    return [p, c];
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z += delta * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        <bufferAttribute attach="attributes-color" args={[col, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors transparent opacity={0.7} />
    </points>
  );
}

export function TridoshaBalance3D({ className }: { className?: string }) {
  const [selectedDosha, setSelectedDosha] = useState<DoshaType>("pitta");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("w-full h-[460px] rounded-3xl bg-card/60 border border-border flex items-center justify-center", className)}>
        <div className="w-12 h-12 rounded-full border-2 border-primary border-t-accent animate-spin" />
      </div>
    );
  }

  const activeMeta = DOSHAS[selectedDosha];

  return (
    <div className={cn("relative w-full rounded-3xl overflow-hidden border border-border/80 bg-gradient-to-b from-card/80 via-background to-card/90 backdrop-blur-xl shadow-xl", className)}>
      {/* Header Bar */}
      <div className="p-5 sm:p-6 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-accent/15 text-accent border border-accent/30 shadow-inner">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                Interactive Tridosha & Prana Equilibrium
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25 uppercase tracking-wider">
                3D Biosystem
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Explore how constitutional equilibrium directly influences personalized clinical assessment & competency scores.
            </p>
          </div>
        </div>

        {/* Dosha Selector Buttons */}
        <div className="inline-flex items-center p-1 rounded-2xl bg-muted/50 border border-border/60 self-start sm:self-auto">
          {(["vata", "pitta", "kapha"] as DoshaType[]).map((d) => {
            const isCurrent = selectedDosha === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => setSelectedDosha(d)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 capitalize",
                  isCurrent
                    ? "bg-background text-foreground shadow-md border border-border/80 scale-105"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {d === "vata" && <Wind className="h-3.5 w-3.5 text-[#72B095]" />}
                {d === "pitta" && <Flame className="h-3.5 w-3.5 text-[#E5A93B]" />}
                {d === "kapha" && <Droplets className="h-3.5 w-3.5 text-[#3A8B61]" />}
                <span>{d}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid: 3D Scene (Left/Center) + Ayurvedic Diagnostic Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
        {/* 3D Visualizer Canvas (7 Cols) */}
        <div className="lg:col-span-7 relative h-[360px] sm:h-[420px] flex items-center justify-center select-none bg-gradient-to-b from-herbal-950/5 via-transparent to-herbal-950/10">
          <Canvas
            camera={{ position: [0, 0, 4.8], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <ambientLight intensity={1.1} />
            <directionalLight position={[3, 4, 3]} intensity={1.4} color="#FFFDF7" />
            <pointLight position={[-3, -2, -1]} intensity={0.9} color="#4FA87D" />

            <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
              <PranaOjasCore isHovered={true} />

              {(Object.keys(DOSHAS) as DoshaType[]).map((key) => (
                <DoshaOrbitNode
                  key={key}
                  meta={DOSHAS[key]}
                  isSelected={selectedDosha === key}
                  onSelect={(d) => setSelectedDosha(d)}
                />
              ))}

              <EnergyFilaments selectedDosha={selectedDosha} />
              <TridoshaDust />
            </Float>

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={true}
              autoRotateSpeed={0.8}
              maxPolarAngle={Math.PI / 1.8}
              minPolarAngle={Math.PI / 2.4}
            />
          </Canvas>

          {/* Interactive Tooltip Overlay */}
          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border/80 text-[11px] font-medium text-muted-foreground flex items-center gap-1.5 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            <span>Click any node or drag to rotate 3D Dosha space</span>
          </div>
        </div>

        {/* Diagnostic Meta Panel (5 Cols) */}
        <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-border/60 bg-card/40 space-y-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-accent">
                {activeMeta.elements}
              </span>
              <h4 className="text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                <span>{activeMeta.name}</span>
                <span className="text-xs font-serif font-normal text-muted-foreground">
                  {activeMeta.sanskrit}
                </span>
              </h4>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {activeMeta.clinicalSignificance}
            </p>

            {/* Ayurvedic Qualities (Gunas) */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] font-bold text-foreground uppercase tracking-wider block">
                Fundamental Gunas (Attributes):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeMeta.qualities.map((q, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-0.5 rounded-lg bg-background border border-border font-medium text-foreground shadow-sm"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </div>

            {/* Competency Correlation Callout */}
            <div className="p-3 rounded-2xl bg-accent/10 border border-accent/25 space-y-1 mt-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-accent-foreground">
                <Info className="h-3.5 w-3.5 text-accent" />
                <span>Competency Mapping</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-normal">
                Assessment algorithms adjust pulse waveform tolerance and Nadi diagnosis protocols based on this dominant bio-energy profile.
              </p>
            </div>
          </div>

          <div className="pt-2 text-right">
            <span className="text-[10px] font-mono text-muted-foreground">
              NCISM Standard Tridosha Vectors • GCP-Ayush Validated
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
