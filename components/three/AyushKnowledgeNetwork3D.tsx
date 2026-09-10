"use client";

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { CanvasFallback } from "./CanvasFallback";
import { cn } from "@/lib/utils/cn";
import { Sparkles, Info } from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  sanskrit: string;
  category: "ELEMENT" | "DISCIPLINE" | "CORE";
  pos: [number, number, number];
  color: string;
  size: number;
  competencies: string[];
}

const NODES_DATA: NodeData[] = [
  // Core
  {
    id: "core",
    name: "Vaidya Setu Core",
    sanskrit: "आयुर्वेद प्रज्ञा केंद्र",
    category: "CORE",
    pos: [0, 0, 0],
    color: "#E5A93B",
    size: 0.45,
    competencies: ["Autonomous Knowledge Graph", "Curriculum Mapping", "Skill Gap Vectors"],
  },
  // 5 Mahabhutas (Inner Orbit)
  {
    id: "akasha",
    name: "Akasha (Ether)",
    sanskrit: "आकाश महाभूत",
    category: "ELEMENT",
    pos: [0, 1.7, 0],
    color: "#8EA7E9",
    size: 0.22,
    competencies: ["Srotas Dynamics", "Sound & Vibration", "Mental Equilibrium"],
  },
  {
    id: "vayu",
    name: "Vayu (Air)",
    sanskrit: "वायु महाभूत",
    category: "ELEMENT",
    pos: [1.6, 0.7, 0.4],
    color: "#72B095",
    size: 0.22,
    competencies: ["Nadi Pariksha", "Prana Regulation", "Vata Neuropathy"],
  },
  {
    id: "agni",
    name: "Agni (Fire/Metabolism)",
    sanskrit: "अग्नि महाभूत",
    category: "ELEMENT",
    pos: [1.1, -1.3, -0.3],
    color: "#E07A5F",
    size: 0.24,
    competencies: ["Digestive Fire (Jatharagni)", "Cellular Dhatu Paka", "Metabolic Disorders"],
  },
  {
    id: "jala",
    name: "Jala (Water)",
    sanskrit: "जल महाभूत",
    category: "ELEMENT",
    pos: [-1.1, -1.3, 0.3],
    color: "#4FA87D",
    size: 0.22,
    competencies: ["Kapha Fluid Dynamics", "Sneha & Swedana", "Cellular Hydration"],
  },
  {
    id: "prithvi",
    name: "Prithvi (Earth)",
    sanskrit: "पृथ्वी महाभूत",
    category: "ELEMENT",
    pos: [-1.6, 0.7, -0.4],
    color: "#C26D30",
    size: 0.24,
    competencies: ["Asthi & Mamsa Tissue", "Structural Alignment", "Stability Evaluation"],
  },
  // Clinical Disciplines (Outer Constellation)
  {
    id: "dravyaguna",
    name: "Dravyaguna (Herbal R&D)",
    sanskrit: "द्रव्यगुण विज्ञान",
    category: "DISCIPLINE",
    pos: [-2.2, 1.8, 0.5],
    color: "#4FA87D",
    size: 0.28,
    competencies: ["Botanical Identification", "HPTLC Fingerprinting", "Phytopharmacology"],
  },
  {
    id: "panchakarma",
    name: "Panchakarma (Detox Therapeutics)",
    sanskrit: "पंचकर्म चिकित्सा",
    category: "DISCIPLINE",
    pos: [2.2, 1.7, -0.4],
    color: "#E5A93B",
    size: 0.28,
    competencies: ["Vamana & Virechana", "Sirodhara Protocol", "Clinical Inpatient Monitoring"],
  },
  {
    id: "rasashastra",
    name: "Rasashastra & Bhashajya",
    sanskrit: "रसशास्त्र एवं भेषज्य कल्पना",
    category: "DISCIPLINE",
    pos: [2.3, -1.4, 0.6],
    color: "#C26D30",
    size: 0.26,
    competencies: ["Bhasma Standardization", "GMP Manufacturing", "Safety & Toxicity Testing"],
  },
  {
    id: "kayachikitsa",
    name: "Kayachikitsa (Internal Medicine)",
    sanskrit: "कायचिकित्सा",
    category: "DISCIPLINE",
    pos: [-2.3, -1.3, -0.5],
    color: "#216849",
    size: 0.28,
    competencies: ["Classical Differential Diagnosis", "Syndromic Pathology", "Rasayana Therapy"],
  },
  {
    id: "shalya",
    name: "Shalya Tantra & Marma",
    sanskrit: "शल्य तंत्र एवं मर्म",
    category: "DISCIPLINE",
    pos: [0, -2.4, 0.7],
    color: "#E07A5F",
    size: 0.26,
    competencies: ["Ksharasutra Proctology", "107 Marma Points", "Minor Surgical Interventions"],
  },
  {
    id: "research",
    name: "Clinical Research & GCP-Ayush",
    sanskrit: "अनुसंधान एवं साक्ष्य-आधारित आयुर्वेद",
    category: "DISCIPLINE",
    pos: [0, 2.5, -0.6],
    color: "#8EA7E9",
    size: 0.26,
    competencies: ["Double-Blind Trials", "Ayush Grid SNOMED", "Statistical Biostatistics"],
  },
];

function ConstellationNetwork({
  activeNode,
  onHoverNode,
}: {
  activeNode: NodeData | null;
  onHoverNode: (node: NodeData | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Compute lines:
  // 1. Core connects to all Mahabhutas
  // 2. Mahabhutas connect in a pentagram ring
  // 3. Disciplines connect to related Mahabhutas
  const linePositions = useMemo(() => {
    const points: number[] = [];
    const core = NODES_DATA[0].pos;

    // Core to 5 Mahabhutas
    for (let i = 1; i <= 5; i++) {
      points.push(...core, ...NODES_DATA[i].pos);
    }
    // Pentagram ring
    for (let i = 1; i <= 5; i++) {
      const next = i === 5 ? 1 : i + 1;
      points.push(...NODES_DATA[i].pos, ...NODES_DATA[next].pos);
    }
    // Disciplines to Mahabhutas
    points.push(...NODES_DATA[6].pos, ...NODES_DATA[5].pos); // Dravyaguna -> Prithvi
    points.push(...NODES_DATA[6].pos, ...NODES_DATA[4].pos); // Dravyaguna -> Jala
    points.push(...NODES_DATA[7].pos, ...NODES_DATA[2].pos); // Panchakarma -> Vayu
    points.push(...NODES_DATA[7].pos, ...NODES_DATA[4].pos); // Panchakarma -> Jala
    points.push(...NODES_DATA[8].pos, ...NODES_DATA[3].pos); // Rasashastra -> Agni
    points.push(...NODES_DATA[9].pos, ...NODES_DATA[1].pos); // Kayachikitsa -> Akasha
    points.push(...NODES_DATA[9].pos, ...NODES_DATA[3].pos); // Kayachikitsa -> Agni
    points.push(...NODES_DATA[10].pos, ...NODES_DATA[5].pos); // Shalya -> Prithvi
    points.push(...NODES_DATA[11].pos, ...NODES_DATA[1].pos); // Research -> Akasha

    return new Float32Array(points);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current && !activeNode) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Node Meshes */}
      {NODES_DATA.map((node) => {
        const isHovered = activeNode?.id === node.id;
        return (
          <mesh
            key={node.id}
            position={node.pos}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHoverNode(node);
            }}
            onPointerOut={() => onHoverNode(null)}
            scale={isHovered ? 1.35 : 1}
          >
            <sphereGeometry args={[node.size, 32, 32]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={isHovered ? 0.9 : 0.4}
              roughness={0.2}
              metalness={0.6}
            />
          </mesh>
        );
      })}

      {/* Network Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#4FA87D"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Pulsing Prana Orbits */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.75, 0.012, 16, 100]} />
        <meshStandardMaterial
          color="#E5A93B"
          emissive="#E5A93B"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[2.7, 0.01, 16, 120]} />
        <meshStandardMaterial
          color="#4FA87D"
          emissive="#4FA87D"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

export function AyushKnowledgeNetwork3D({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [activeNode, setActiveNode] = useState<NodeData | null>(NODES_DATA[0]);

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
    return <CanvasFallback className={className} title="Ayush Knowledge Network" />;
  }

  return (
    <div className={cn("relative w-full h-[520px] rounded-3xl overflow-hidden bg-gradient-to-b from-card via-background to-muted/20 border border-border shadow-2xl", className)}>
      <Suspense fallback={<CanvasFallback className={className} title="Rendering Knowledge Constellation..." />}>
        <Canvas
          camera={{ position: [0, 0, 6.2], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[4, 5, 4]} intensity={1.3} color="#FFFDF7" />
          <pointLight position={[-4, -3, -2]} intensity={0.8} color="#4FA87D" />
          <pointLight position={[3, -2, 3]} intensity={0.9} color="#E5A93B" />

          <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.3}>
            <ConstellationNetwork
              activeNode={activeNode}
              onHoverNode={setActiveNode}
            />
          </Float>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={!activeNode}
            autoRotateSpeed={0.6}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 2.4}
          />
        </Canvas>
      </Suspense>

      {/* Floating Node Telemetry HUD */}
      {activeNode && (
        <div className="absolute top-4 left-4 max-w-xs p-4 rounded-2xl bg-card/85 backdrop-blur-md border border-border shadow-xl pointer-events-none transition-all duration-200">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: activeNode.color }}
            />
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              {activeNode.category}
            </span>
          </div>
          <h4 className="text-sm font-bold text-foreground">{activeNode.name}</h4>
          <p className="text-xs text-primary/80 font-medium mb-2.5 font-serif">
            {activeNode.sanskrit}
          </p>

          <div className="space-y-1 pt-2 border-t border-border/50">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
              Core Competencies:
            </span>
            {activeNode.competencies.map((c, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-foreground/85">
                <span className="text-primary text-[10px]">•</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Guidance Badge */}
      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border text-xs text-muted-foreground flex items-center gap-2 shadow-sm pointer-events-none">
        <Sparkles className="h-3.5 w-3.5 text-accent animate-pulse" />
        <span>Hover nodes to inspect knowledge pathways • Drag to orbit</span>
      </div>
    </div>
  );
}
