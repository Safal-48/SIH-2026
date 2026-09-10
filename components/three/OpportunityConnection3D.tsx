"use client";

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { CanvasFallback } from "./CanvasFallback";
import { cn } from "@/lib/utils/cn";
import { Sparkles, Building2, UserCheck, ShieldCheck } from "lucide-react";

interface StreamCurveProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  speed?: number;
}

function StreamConnection({ start, end, color, speed = 1 }: StreamCurveProps) {
  const curve = useMemo(() => {
    const vStart = new THREE.Vector3(...start);
    const vEnd = new THREE.Vector3(...end);
    const mid = new THREE.Vector3()
      .addVectors(vStart, vEnd)
      .multiplyScalar(0.5);
    // Add vertical arc
    mid.y += (Math.random() - 0.5) * 0.4 + 0.3;
    mid.z += (Math.random() - 0.5) * 0.5;

    return new THREE.QuadraticBezierCurve3(vStart, mid, vEnd);
  }, [start, end]);

  const linePoints = useMemo(() => curve.getPoints(30), [curve]);
  const particleMeshRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(Math.random());

  useFrame((_, delta) => {
    progressRef.current = (progressRef.current + delta * 0.35 * speed) % 1;
    if (particleMeshRef.current) {
      const pos = curve.getPoint(progressRef.current);
      particleMeshRef.current.position.copy(pos);
    }
  });

  return (
    <group>
      {/* Background Arc Line */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(linePoints.flatMap((p) => [p.x, p.y, p.z])), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.3} />
      </line>

      {/* Traveling Prana Energy Packet */}
      <mesh ref={particleMeshRef}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

function ConnectionScene() {
  const groupRef = useRef<THREE.Group>(null);

  // Left: Student Skills
  const studentNodes = useMemo(() => [
    { label: "Nadi Pariksha", pos: [-2.2, 1.2, 0] as [number, number, number], color: "#E5A93B" },
    { label: "Panchakarma Protocol", pos: [-2.4, 0.4, 0.3] as [number, number, number], color: "#4FA87D" },
    { label: "GCP-Ayush Clinical Trials", pos: [-2.2, -0.4, -0.2] as [number, number, number], color: "#8EA7E9" },
    { label: "HPTLC Quality Analysis", pos: [-2.3, -1.2, 0.1] as [number, number, number], color: "#C26D30" },
  ], []);

  // Right: Premier Industry Partners
  const industryNodes = useMemo(() => [
    { name: "AIIA New Delhi", pos: [2.2, 1.3, 0.1] as [number, number, number], color: "#E5A93B" },
    { name: "CCRAS Research", pos: [2.4, 0.5, -0.3] as [number, number, number], color: "#8EA7E9" },
    { name: "Arya Vaidya Sala", pos: [2.3, -0.3, 0.2] as [number, number, number], color: "#4FA87D" },
    { name: "Dabur R&D", pos: [2.2, -1.1, -0.1] as [number, number, number], color: "#C26D30" },
  ], []);

  // Stream Pairings
  const connections = useMemo(() => [
    { start: studentNodes[0].pos, end: industryNodes[0].pos, color: "#E5A93B", speed: 1.1 },
    { start: studentNodes[1].pos, end: industryNodes[2].pos, color: "#4FA87D", speed: 0.9 },
    { start: studentNodes[2].pos, end: industryNodes[1].pos, color: "#8EA7E9", speed: 1.2 },
    { start: studentNodes[3].pos, end: industryNodes[3].pos, color: "#C26D30", speed: 1.0 },
    { start: studentNodes[0].pos, end: industryNodes[2].pos, color: "#4FA87D", speed: 0.8 },
    { start: studentNodes[2].pos, end: industryNodes[0].pos, color: "#E5A93B", speed: 1.3 },
  ], [studentNodes, industryNodes]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Student Skill Spheres */}
      {studentNodes.map((s, i) => (
        <group key={i} position={s.pos}>
          <mesh>
            <sphereGeometry args={[0.18, 24, 24]} />
            <meshStandardMaterial
              color={s.color}
              emissive={s.color}
              emissiveIntensity={0.6}
              roughness={0.2}
              metalness={0.5}
            />
          </mesh>
        </group>
      ))}

      {/* Industry Partner Polyhedra */}
      {industryNodes.map((ind, i) => (
        <group key={i} position={ind.pos}>
          <mesh>
            <octahedronGeometry args={[0.22, 0]} />
            <meshStandardMaterial
              color={ind.color}
              emissive={ind.color}
              emissiveIntensity={0.6}
              roughness={0.2}
              metalness={0.7}
            />
          </mesh>
        </group>
      ))}

      {/* Connecting Flow Streams */}
      {connections.map((c, i) => (
        <StreamConnection
          key={i}
          start={c.start}
          end={c.end}
          color={c.color}
          speed={c.speed}
        />
      ))}
    </group>
  );
}

export function OpportunityConnection3D({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted || !hasWebGL) {
    return <CanvasFallback className={className} title="Opportunity Match Streams" />;
  }

  return (
    <div className={cn("relative w-full h-[380px] rounded-2xl overflow-hidden bg-gradient-to-b from-card/80 via-background to-background border border-border/70 shadow-lg", className)}>
      <Suspense fallback={<CanvasFallback className={className} title="Connecting Talent to Industry..." />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[4, 5, 4]} intensity={1.2} color="#FFFDF7" />
          <pointLight position={[-3, -2, -2]} intensity={0.7} color="#4FA87D" />
          <pointLight position={[3, -2, 2]} intensity={0.8} color="#E5A93B" />

          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.25}>
            <ConnectionScene />
          </Float>
        </Canvas>
      </Suspense>

      {/* Overlay Labels */}
      <div className="absolute top-3 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border text-[11px] font-semibold text-foreground">
        <UserCheck className="h-3.5 w-3.5 text-primary" />
        <span>Verified Scholar Skills</span>
      </div>

      <div className="absolute top-3 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border text-[11px] font-semibold text-foreground">
        <Building2 className="h-3.5 w-3.5 text-accent" />
        <span>Accredited Healthcare & Pharma</span>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background/90 backdrop-blur-md border border-primary/30 text-[10px] font-mono text-primary flex items-center gap-1.5">
        <Sparkles className="h-3 w-3 animate-spin" />
        <span>Algorithmic Vector Stream: Instant Competency-to-Opening Pairing</span>
      </div>
    </div>
  );
}
