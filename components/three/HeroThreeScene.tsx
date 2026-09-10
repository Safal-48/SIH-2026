"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils/cn";

// 1. Interactive Camera Parallax Rig
function CameraRig() {
  const { camera, pointer } = useThree();
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    camera.position.lerp(
      vec.set(pointer.x * 0.9, pointer.y * 0.6, 5.2),
      0.05
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// 2. Bold, Radiant Sacred Ayush Torus Rings
function SacredAyushRings() {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const middleRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.12;
      outerRingRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.25;
    }
    if (middleRingRef.current) {
      middleRingRef.current.rotation.z -= delta * 0.16;
      middleRingRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.22;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x += delta * 0.1;
      innerRingRef.current.rotation.y += delta * 0.14;
    }
  });

  return (
    <group>
      {/* Outer Golden Prana Sun Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.2, 0.065, 24, 100]} />
        <meshStandardMaterial
          color="#E5A93B"
          emissive="#E5A93B"
          emissiveIntensity={0.65}
          roughness={0.25}
          metalness={0.8}
        />
      </mesh>

      {/* Middle Panchakarma Herbal Emerald Orbit */}
      <mesh ref={middleRingRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.7, 0.055, 20, 80]} />
        <meshStandardMaterial
          color="#4FA87D"
          emissive="#216849"
          emissiveIntensity={0.55}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Inner Rasashastra Sandalwood Orbit */}
      <mesh ref={innerRingRef} rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[1.2, 0.045, 16, 60]} />
        <meshStandardMaterial
          color="#C26D30"
          emissive="#C26D30"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
    </group>
  );
}

// 2.5 Stylized 3D Orbiting Ayurveda Leaves (Tulsi & Neem botanical vortex)
function OrbitingAyurvedaLeaves({ count = 10 }: { count?: number }) {
  const leavesGroupRef = useRef<THREE.Group>(null);

  const leafGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.3);
    shape.bezierCurveTo(0.2, -0.1, 0.2, 0.15, 0, 0.35);
    shape.bezierCurveTo(-0.2, 0.15, -0.2, -0.1, 0, -0.3);
    return new THREE.ShapeGeometry(shape);
  }, []);

  const leaves = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.4 + (i % 3) * 0.3;
      return {
        initialAngle: angle,
        radius,
        speed: 0.2 + (i % 2) * 0.1,
        yOffset: (Math.sin(angle * 2) * 0.5),
        color: i % 2 === 0 ? "#4FA87D" : "#E5A93B",
        scale: 0.28 + (i % 3) * 0.05,
      };
    });
  }, [count]);

  useFrame((state, delta) => {
    if (!leavesGroupRef.current) return;
    const t = state.clock.elapsedTime;
    leavesGroupRef.current.children.forEach((mesh, idx) => {
      const l = leaves[idx];
      if (!l) return;
      const currentAngle = l.initialAngle + t * l.speed * 0.4;
      mesh.position.x = Math.cos(currentAngle) * l.radius;
      mesh.position.z = Math.sin(currentAngle) * l.radius;
      mesh.position.y = l.yOffset + Math.sin(t * 1.5 + idx) * 0.15;
      mesh.rotation.y = -currentAngle + Math.PI / 2;
      mesh.rotation.x = Math.sin(t * 2 + idx) * 0.4;
    });
  });

  return (
    <group ref={leavesGroupRef}>
      {leaves.map((l, idx) => (
        <mesh key={idx} geometry={leafGeometry} scale={l.scale}>
          <meshStandardMaterial
            color={l.color}
            emissive={l.color}
            emissiveIntensity={0.35}
            roughness={0.3}
            metalness={0.4}
            side={THREE.DoubleSide}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

// 3. Central Ayush Knowledge Core and Orbiting Discipline Spheres
function BotanicalKnowledgeNodes() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => [
    { name: "Prana Core", pos: [0, 0, 0] as [number, number, number], color: "#E5A93B", size: 0.42 },
    { name: "Dravyaguna", pos: [-1.6, 1.0, 0.4] as [number, number, number], color: "#4FA87D", size: 0.24 },
    { name: "Panchakarma", pos: [1.5, 1.1, -0.3] as [number, number, number], color: "#4FA87D", size: 0.25 },
    { name: "Rasashastra", pos: [0.3, -1.6, 0.5] as [number, number, number], color: "#C26D30", size: 0.23 },
    { name: "Kayachikitsa", pos: [-1.4, -0.9, -0.4] as [number, number, number], color: "#216849", size: 0.22 },
    { name: "Nadi Pariksha", pos: [1.6, -0.7, 0.6] as [number, number, number], color: "#E5A93B", size: 0.22 },
    { name: "Clinical Trials", pos: [0, 1.8, -0.3] as [number, number, number], color: "#4FA87D", size: 0.23 },
    { name: "Passport Attest", pos: [-0.8, 1.5, 0.6] as [number, number, number], color: "#E5A93B", size: 0.18 },
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
      groupRef.current.rotation.y += delta * 0.09;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Radiant Glow Light */}
      <pointLight position={[0, 0, 0]} intensity={2.2} color="#E5A93B" distance={4} decay={2} />

      {nodes.map((node, i) => (
        <group key={i} position={node.pos}>
          <mesh>
            <sphereGeometry args={[node.size, 32, 32]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={i === 0 ? 0.95 : 0.55}
              roughness={0.2}
              metalness={0.7}
            />
          </mesh>
          {i === 0 && (
            <mesh scale={1.32}>
              <icosahedronGeometry args={[node.size, 1]} />
              <meshBasicMaterial color="#E5A93B" wireframe transparent opacity={0.4} />
            </mesh>
          )}
        </group>
      ))}

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#4FA87D" transparent opacity={0.45} />
      </lineSegments>
    </group>
  );
}

// 4. Floating High-Contrast Prana Particles
function HeroParticles({ count = 180 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const gold = new THREE.Color("#E5A93B");
    const emerald = new THREE.Color("#4FA87D");
    const sandalwood = new THREE.Color("#C26D30");

    for (let i = 0; i < count; i++) {
      const r = Math.random() * 3.6 + 0.6;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const rand = Math.random();
      const c = rand < 0.45 ? gold : rand < 0.8 ? emerald : sandalwood;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}

// 5. Floating Ayurvedic Dhatu Crystals
function FloatingAyushCrystals() {
  const crystalGroupRef = useRef<THREE.Group>(null);

  const crystals = useMemo(() => [
    { pos: [-2.2, 1.9, -0.6] as [number, number, number], rot: [0.4, 0.2, 0.1], scale: 0.2, color: "#E5A93B", type: "octa" },
    { pos: [2.3, -1.7, 0.4] as [number, number, number], rot: [0.1, 0.5, 0.3], scale: 0.18, color: "#4FA87D", type: "ico" },
    { pos: [-2.0, -1.6, 0.8] as [number, number, number], rot: [0.3, 0.1, 0.6], scale: 0.17, color: "#C26D30", type: "octa" },
    { pos: [2.1, 1.8, -0.4] as [number, number, number], rot: [0.5, 0.3, 0.2], scale: 0.19, color: "#E5A93B", type: "ico" },
  ], []);

  useFrame((state, delta) => {
    if (crystalGroupRef.current) {
      crystalGroupRef.current.rotation.y += delta * 0.06;
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
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

// 6. Native Three.js Floating Container (Zero external dependencies)
function FloatingSceneContainer({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.3) * 0.12;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.07;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

// Main 3D Hero Scene
export function HeroThreeScene({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("w-full h-full min-h-[480px] flex items-center justify-center rounded-3xl bg-card/60 backdrop-blur-md border border-accent/30 p-8", className)}>
        <div className="w-16 h-16 rounded-full border-2 border-primary border-t-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-[480px] sm:h-[520px] lg:h-[580px] flex items-center justify-center select-none", className)}>
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[5, 6, 4]} intensity={1.6} color="#FFFDF7" />
        <pointLight position={[-4, -3, -2]} intensity={1.0} color="#4FA87D" />
        <pointLight position={[3, -2, 3]} intensity={1.1} color="#E5A93B" />

        <CameraRig />

        <FloatingSceneContainer>
          <SacredAyushRings />
          <BotanicalKnowledgeNodes />
          <OrbitingAyurvedaLeaves count={12} />
          <FloatingAyushCrystals />
        </FloatingSceneContainer>

        <HeroParticles count={140} />
      </Canvas>
    </div>
  );
}
