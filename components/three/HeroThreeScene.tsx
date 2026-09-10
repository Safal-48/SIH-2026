"use client";

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { CanvasFallback } from "./CanvasFallback";
import { cn } from "@/lib/utils/cn";

// 1. Interactive Camera Parallax Rig
function CameraRig() {
  const { camera, pointer } = useThree();
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    // Smoothly interpolate camera position based on normalized mouse pointer
    camera.position.lerp(
      vec.set(pointer.x * 0.8, pointer.y * 0.5, 5.5),
      0.05
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// 2. Procedural Ayurvedic Sacred Geometry Rings
function SacredAyushRings() {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const middleRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.1;
      outerRingRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
    if (middleRingRef.current) {
      middleRingRef.current.rotation.z -= delta * 0.15;
      middleRingRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.25) * 0.2;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x += delta * 0.08;
      innerRingRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group>
      {/* Outer Golden Prana Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#E5A93B"
          emissive="#E5A93B"
          emissiveIntensity={0.7}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Ethereal Resonance Ring */}
      <mesh rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        <torusGeometry args={[2.5, 0.012, 16, 100]} />
        <meshStandardMaterial
          color="#E5A93B"
          emissive="#E5A93B"
          emissiveIntensity={0.35}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Middle Herbal Green Orbit */}
      <mesh ref={middleRingRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.7, 0.018, 16, 80]} />
        <meshStandardMaterial
          color="#4FA87D"
          emissive="#216849"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Inner Sandalwood Core Ring */}
      <mesh ref={innerRingRef} rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[1.2, 0.015, 16, 60]} />
        <meshStandardMaterial
          color="#C26D30"
          emissive="#C26D30"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>
    </group>
  );
}

// 3. Botanical Knowledge Nodes & Interconnects
function BotanicalKnowledgeNodes() {
  const groupRef = useRef<THREE.Group>(null);

  // Ayurvedic discipline node coordinates
  const nodes = useMemo(() => [
    { pos: [0, 0, 0] as [number, number, number], color: "#E5A93B", size: 0.38 }, // Prana core
    { pos: [-1.6, 1.0, 0.4] as [number, number, number], color: "#4FA87D", size: 0.22 }, // Dravyaguna
    { pos: [1.5, 1.1, -0.3] as [number, number, number], color: "#4FA87D", size: 0.24 }, // Panchakarma
    { pos: [0.3, -1.6, 0.5] as [number, number, number], color: "#C26D30", size: 0.22 }, // Rasashastra
    { pos: [-1.4, -0.9, -0.4] as [number, number, number], color: "#216849", size: 0.2 }, // Kayachikitsa
    { pos: [1.6, -0.7, 0.6] as [number, number, number], color: "#E5A93B", size: 0.2 }, // Nadi Pariksha
    { pos: [0, 1.8, -0.3] as [number, number, number], color: "#4FA87D", size: 0.22 }, // Research/GCP
    { pos: [-0.8, 1.5, 0.6] as [number, number, number], color: "#E5A93B", size: 0.16 }, // Digital Standards
  ], []);

  const linePositions = useMemo(() => {
    const points: number[] = [];
    const center = nodes[0].pos;

    // Connect nodes to central core
    for (let i = 1; i < nodes.length; i++) {
      points.push(...center, ...nodes[i].pos);
    }
    // Connect outer ring
    for (let i = 1; i < nodes.length; i++) {
      const next = i === nodes.length - 1 ? 1 : i + 1;
      points.push(...nodes[i].pos, ...nodes[next].pos);
    }

    return new Float32Array(points);
  }, [nodes]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Prana Light */}
      <pointLight position={[0, 0, 0]} intensity={1.8} color="#E5A93B" distance={3.5} decay={2} />

      {nodes.map((node, i) => (
        <group key={i} position={node.pos}>
          <mesh>
            <sphereGeometry args={[node.size, 32, 32]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={i === 0 ? 0.9 : 0.45}
              roughness={0.15}
              metalness={0.7}
            />
          </mesh>
          {i === 0 && (
            <mesh scale={1.3}>
              <icosahedronGeometry args={[node.size, 1]} />
              <meshBasicMaterial color="#E5A93B" wireframe transparent opacity={0.3} />
            </mesh>
          )}
        </group>
      ))}

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4FA87D" transparent opacity={0.35} />
      </lineSegments>
    </group>
  );
}

// 4. Floating Golden Prana & Botanical Particles
function HeroParticles({ count = 220 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const saffron = new THREE.Color("#E5A93B");
    const herbal = new THREE.Color("#4FA87D");

    for (let i = 0; i < count; i++) {
      const r = (Math.random() * 3.5 + 0.5);
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Interpolate between saffron gold and herbal green
      const mixedColor = saffron.clone().lerp(herbal, Math.random());
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// 5. Subtle Floating Ayurvedic Elements (Rasashastra & Botanical Crystals)
function FloatingAyushCrystals() {
  const crystalGroupRef = useRef<THREE.Group>(null);

  const crystals = useMemo(() => [
    { pos: [-2.1, 1.8, -0.6] as [number, number, number], rot: [0.4, 0.2, 0.1], scale: 0.18, color: "#E5A93B", type: "octa" },
    { pos: [2.2, -1.6, 0.4] as [number, number, number], rot: [0.1, 0.5, 0.3], scale: 0.16, color: "#4FA87D", type: "ico" },
    { pos: [-1.9, -1.5, 0.8] as [number, number, number], rot: [0.3, 0.1, 0.6], scale: 0.15, color: "#C26D30", type: "octa" },
    { pos: [2.0, 1.7, -0.4] as [number, number, number], rot: [0.5, 0.3, 0.2], scale: 0.17, color: "#E5A93B", type: "ico" },
  ], []);

  useFrame((state, delta) => {
    if (crystalGroupRef.current) {
      crystalGroupRef.current.rotation.y += delta * 0.05;
      crystalGroupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.04;
    }
  });

  return (
    <group ref={crystalGroupRef}>
      {crystals.map((c, i) => (
        <mesh key={i} position={c.pos} rotation={c.rot as [number, number, number]} scale={c.scale}>
          {c.type === "octa" ? (
            <octahedronGeometry args={[1, 0]} />
          ) : (
            <icosahedronGeometry args={[1, 0]} />
          )}
          <meshStandardMaterial
            color={c.color}
            emissive={c.color}
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.7}
            wireframe={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main 3D Hero Canvas Component
export function HeroThreeScene({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);

    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted || !hasWebGL) {
    return <CanvasFallback className={className} title="Ayurveda Intelligence Core" />;
  }

  return (
    <div className={cn("relative w-full h-full min-h-[460px] lg:min-h-[580px]", className)}>
      <Suspense fallback={<CanvasFallback className={className} title="Initializing 3D Core..." />}>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          dpr={isMobile ? [1, 1.2] : [1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 6, 4]} intensity={1.4} color="#FFFDF7" />
          <pointLight position={[-4, -3, -2]} intensity={0.8} color="#4FA87D" />
          <pointLight position={[3, -2, 3]} intensity={0.9} color="#E5A93B" />

          <CameraRig />

          <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.5}>
            <SacredAyushRings />
            <BotanicalKnowledgeNodes />
            <FloatingAyushCrystals />
          </Float>

          <HeroParticles count={isMobile ? 90 : 220} />
        </Canvas>
      </Suspense>
    </div>
  );
}
