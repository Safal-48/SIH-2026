"use client";

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils/cn";

// 1. Gentle Mouse Parallax Rig with smooth dampening
function BackgroundCameraRig() {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    target.set(pointer.x * 0.45, pointer.y * 0.3, 6);
    camera.position.lerp(target, 0.035);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// 2. Sacred Tridosha Energy Rings (Vata: Ether/Air, Pitta: Fire/Metabolism, Kapha: Water/Earth)
function SacredTridoshaYantra() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.015;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.2;
      ring1Ref.current.rotation.y += delta * 0.03;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.25;
      ring2Ref.current.rotation.z -= delta * 0.025;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.02;
      ring3Ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.12) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -3.2]}>
      {/* Vata Ring: Celestial Gold & Prana */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[4.2, 0.012, 16, 140]} />
        <meshBasicMaterial color="#E5A93B" transparent opacity={0.25} />
      </mesh>

      {/* Pitta Ring: Radiant Herbal Emerald */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3.8, 0, 0]}>
        <torusGeometry args={[3.3, 0.01, 16, 120]} />
        <meshBasicMaterial color="#4FA87D" transparent opacity={0.22} />
      </mesh>

      {/* Kapha Ring: Grounding Sandalwood Earth */}
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[2.5, 0.009, 16, 100]} />
        <meshBasicMaterial color="#C26D30" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

// 3. Stylized 3D Floating Ayurvedic Herbal Leaves (Neem / Tulsi leaf silhouettes)
function FloatingAyurvedaLeaves({ count = 18 }: { count?: number }) {
  const leavesRef = useRef<THREE.Group>(null);

  // Create leaf geometry using a 2D curve shape
  const leafGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.4);
    shape.bezierCurveTo(0.28, -0.15, 0.28, 0.2, 0, 0.45);
    shape.bezierCurveTo(-0.28, 0.2, -0.28, -0.15, 0, -0.4);
    return new THREE.ShapeGeometry(shape);
  }, []);

  const leafData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 4 - 1,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      ] as [number, number, number],
      scale: Math.random() * 0.35 + 0.2,
      speedY: Math.random() * 0.003 + 0.0015,
      rotSpeed: [
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 0.008,
      ] as [number, number, number],
      color: Math.random() > 0.4 ? "#3A8B61" : "#E5A93B",
      opacity: Math.random() * 0.18 + 0.12,
    }));
  }, [count]);

  useFrame((_, delta) => {
    if (!leavesRef.current) return;
    leavesRef.current.children.forEach((child, i) => {
      const d = leafData[i];
      if (!d) return;

      child.position.y += d.speedY;
      child.rotation.x += d.rotSpeed[0] * delta * 40;
      child.rotation.y += d.rotSpeed[1] * delta * 40;
      child.rotation.z += d.rotSpeed[2] * delta * 40;

      child.position.x += Math.sin(child.position.y * 2) * 0.002;

      if (child.position.y > 6) {
        child.position.y = -6;
        child.position.x = (Math.random() - 0.5) * 14;
      }
    });
  });

  return (
    <group ref={leavesRef}>
      {leafData.map((d, i) => (
        <mesh
          key={i}
          geometry={leafGeometry}
          position={d.position}
          rotation={d.rotation}
          scale={d.scale}
        >
          <meshBasicMaterial
            color={d.color}
            transparent
            opacity={d.opacity}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// 4. Floating Prana Energy Dust & Golden Pollen Field
function AmbientPranaDust({ count = 160 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    const gold = new THREE.Color("#E5A93B");
    const emerald = new THREE.Color("#4FA87D");
    const sandalwood = new THREE.Color("#C26D30");
    const ivory = new THREE.Color("#FEF9EC");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 7;

      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = Math.random() * 0.006 + 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;

      const rand = Math.random();
      const chosenColor =
        rand < 0.45 ? gold : rand < 0.8 ? emerald : rand < 0.93 ? sandalwood : ivory;
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

      if (array[i * 3 + 1] > 7) {
        array[i * 3 + 1] = -7;
        array[i * 3] = (Math.random() - 0.5) * 18;
      }
      if (array[i * 3] > 9) array[i * 3] = -9;
      if (array[i * 3] < -9) array[i * 3] = 9;
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
        size={0.042}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// 5. Floating Ayurvedic Dhatu Geometries in Perimeter (Octahedrons & Icosahedrons)
function PerimeterDhatuCrystals() {
  const groupRef = useRef<THREE.Group>(null);

  const crystals = useMemo(() => [
    { pos: [-6.8, 3.4, -2] as [number, number, number], rotSpeed: [0.008, 0.012, 0], scale: 0.26, color: "#E5A93B", type: "octa" },
    { pos: [7.2, -2.8, -1.5] as [number, number, number], rotSpeed: [-0.01, 0.008, 0.005], scale: 0.22, color: "#4FA87D", type: "ico" },
    { pos: [-6.2, -3.6, -1] as [number, number, number], rotSpeed: [0.012, -0.009, 0], scale: 0.2, color: "#C26D30", type: "octa" },
    { pos: [6.4, 3.8, -2.5] as [number, number, number], rotSpeed: [-0.007, -0.01, 0.008], scale: 0.24, color: "#E5A93B", type: "ico" },
  ], []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const c = crystals[i];
        if (c) {
          child.rotation.x += c.rotSpeed[0] * delta * 25;
          child.rotation.y += c.rotSpeed[1] * delta * 25;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {crystals.map((c, i) => (
        <mesh key={i} position={c.pos} scale={c.scale}>
          {c.type === "octa" ? (
            <octahedronGeometry args={[1, 0]} />
          ) : (
            <icosahedronGeometry args={[1, 0]} />
          )}
          <meshBasicMaterial
            color={c.color}
            wireframe
            transparent
            opacity={0.24}
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
      {/* 1. Organic Ambient Prana Glow Auras */}
      <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full bg-gradient-to-br from-emerald-500/15 via-primary/12 to-transparent blur-[110px] animate-aurora-1" />
      <div className="absolute top-[25%] -right-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-bl from-amber-400/18 via-accent/14 to-transparent blur-[120px] animate-aurora-2" />
      <div className="absolute -bottom-[15%] left-[20%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-tr from-saffron-500/14 via-earth-500/10 to-transparent blur-[110px] animate-aurora-3" />

      {/* 2. Slow-Rotating Sacred Vedic Sri Yantra Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[840px] h-[840px] opacity-[0.035] dark:opacity-[0.065] animate-spin-extremely-slow pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full text-foreground" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="200" cy="200" r="192" strokeDasharray="5 5" />
          <circle cx="200" cy="200" r="156" />
          <circle cx="200" cy="200" r="118" strokeDasharray="6 3" />
          <circle cx="200" cy="200" r="76" />
          <polygon points="200,38 340,282 60,282" strokeWidth="1.2" />
          <polygon points="200,362 60,118 340,118" strokeWidth="1.2" />
          <polygon points="200,72 312,266 88,266" strokeWidth="0.8" />
          <polygon points="200,328 88,134 312,134" strokeWidth="0.8" />
        </svg>
      </div>

      {/* 3. High-Performance Three.js 3D Prana Cosmos */}
      {mounted && hasWebGL && (
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 6], fov: 48 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
            className="w-full h-full"
          >
            <BackgroundCameraRig />
            <SacredTridoshaYantra />
            <FloatingAyurvedaLeaves count={16} />
            <AmbientPranaDust count={150} />
            <PerimeterDhatuCrystals />
          </Canvas>
        </Suspense>
      )}
    </div>
  );
}
