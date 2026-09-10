"use client";

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils/cn";

// 1. Mouse Parallax Rig for Ambient Atmosphere
function BackgroundCameraRig() {
  const { camera, pointer } = useThree();
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    // Gentle camera parallax with low sensitivity to prevent eye strain
    camera.position.lerp(
      vec.set(pointer.x * 0.4, pointer.y * 0.25, 6),
      0.03
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// 2. Slow-Rotating Sacred Yantra / Geometric Mandalas in Deep Background
function SacredBackgroundYantra() {
  const yantraRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (yantraRef.current) {
      yantraRef.current.rotation.z += delta * 0.02;
      yantraRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <group ref={yantraRef} position={[0, 0, -2.5]}>
      {/* Outer Ethereal Ring */}
      <mesh>
        <torusGeometry args={[3.8, 0.008, 16, 120]} />
        <meshBasicMaterial color="#E5A93B" transparent opacity={0.18} />
      </mesh>

      {/* Middle Dosha Equilibrium Orbit */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3.0, 0.006, 16, 100]} />
        <meshBasicMaterial color="#4FA87D" transparent opacity={0.14} />
      </mesh>

      {/* Inner Herbal Science Orbit */}
      <mesh rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[2.2, 0.006, 16, 80]} />
        <meshBasicMaterial color="#C26D30" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

// 3. Floating Prana Energy & Botanical Dust Field
function AmbientPranaDust({ count = 140 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    const gold = new THREE.Color("#E5A93B");
    const emerald = new THREE.Color("#4FA87D");
    const sandalwood = new THREE.Color("#C26D30");

    for (let i = 0; i < count; i++) {
      // Wide atmospheric volume distribution
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;

      // Slow organic drift speeds
      vel[i * 3] = (Math.random() - 0.5) * 0.004;
      vel[i * 3 + 1] = Math.random() * 0.006 + 0.002; // Gentle upward prana current
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.004;

      // Ayurvedic tridosha color blend
      const rand = Math.random();
      const chosenColor = rand < 0.45 ? gold : rand < 0.85 ? emerald : sandalwood;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col, vel];
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      array[i * 3] += velocities[i * 3];
      array[i * 3 + 1] += velocities[i * 3 + 1];
      array[i * 3 + 2] += velocities[i * 3 + 2];

      // Wrap around bounds for continuous gentle upward drift
      if (array[i * 3 + 1] > 6) {
        array[i * 3 + 1] = -6;
        array[i * 3] = (Math.random() - 0.5) * 16;
      }
      if (array[i * 3] > 8) array[i * 3] = -8;
      if (array[i * 3] < -8) array[i * 3] = 8;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// 4. Floating Ayurvedic Dhatu Geometries in Perimeter
function PerimeterDhatuCrystals() {
  const groupRef = useRef<THREE.Group>(null);

  const crystals = useMemo(() => [
    { pos: [-6, 3, -2] as [number, number, number], rotSpeed: [0.01, 0.015, 0], scale: 0.22, color: "#E5A93B" },
    { pos: [6.5, -2.5, -1.5] as [number, number, number], rotSpeed: [-0.01, 0.01, 0.005], scale: 0.18, color: "#4FA87D" },
    { pos: [-5.5, -3.2, -1] as [number, number, number], rotSpeed: [0.015, -0.01, 0], scale: 0.16, color: "#C26D30" },
    { pos: [5.8, 3.5, -2.2] as [number, number, number], rotSpeed: [-0.008, -0.012, 0.01], scale: 0.2, color: "#E5A93B" },
  ], []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const c = crystals[i];
        if (c) {
          child.rotation.x += c.rotSpeed[0] * delta * 20;
          child.rotation.y += c.rotSpeed[1] * delta * 20;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {crystals.map((c, i) => (
        <mesh key={i} position={c.pos} scale={c.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color={c.color}
            wireframe
            transparent
            opacity={0.22}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main 3D Atmospheric Background Component
export function AyushAtmosphereBackground3D({ className }: { className?: string }) {
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

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden select-none transition-opacity duration-1000",
        className
      )}
    >
      {/* 1. Subtle Botanical Ambient Aura Blurs (Deep Herbal & Warm Saffron) */}
      <div className="absolute -top-36 -left-36 w-[550px] h-[550px] rounded-full bg-primary/10 blur-[130px] dark:bg-primary/20" />
      <div className="absolute top-1/3 -right-48 w-[600px] h-[600px] rounded-full bg-accent/8 blur-[150px] dark:bg-accent/15" />
      <div className="absolute -bottom-48 left-1/4 w-[500px] h-[500px] rounded-full bg-secondary/8 blur-[140px] dark:bg-secondary/15" />

      {/* 2. Three.js Living 3D Cosmos */}
      {mounted && hasWebGL && (
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 6], fov: 48 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
            className="w-full h-full"
          >
            <BackgroundCameraRig />
            <SacredBackgroundYantra />
            <AmbientPranaDust count={110} />
            <PerimeterDhatuCrystals />
          </Canvas>
        </Suspense>
      )}
    </div>
  );
}
