"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function AyurvedaBotanicalNodes() {
  const groupRef = useRef<THREE.Group>(null);

  // Define 7 core Ayush discipline nodes
  const nodes = useMemo(() => [
    { position: [0, 0, 0] as [number, number, number], color: "#E5A93B", size: 0.28, label: "Core" }, // Saffron Prana
    { position: [-1.4, 0.8, 0.3] as [number, number, number], color: "#4FA87D", size: 0.2, label: "Dravyaguna" },
    { position: [1.3, 0.9, -0.4] as [number, number, number], color: "#4FA87D", size: 0.2, label: "Panchakarma" },
    { position: [0, -1.3, 0.6] as [number, number, number], color: "#C26D30", size: 0.22, label: "Rasashastra" },
    { position: [-1.1, -0.7, -0.5] as [number, number, number], color: "#216849", size: 0.18, label: "Kayachikitsa" },
    { position: [1.2, -0.6, 0.5] as [number, number, number], color: "#E5A93B", size: 0.18, label: "Nadi Pariksha" },
    { position: [0, 1.5, -0.2] as [number, number, number], color: "#216849", size: 0.19, label: "Research" },
  ], []);

  // Compute line segments connecting each satellite node to center and adjacent
  const linePositions = useMemo(() => {
    const points: number[] = [];
    const center = nodes[0].position;

    // Connect all satellites to center
    for (let i = 1; i < nodes.length; i++) {
      points.push(...center, ...nodes[i].position);
    }
    // Connect adjacent outer nodes in a subtle ring
    for (let i = 1; i < nodes.length; i++) {
      const nextIdx = i === nodes.length - 1 ? 1 : i + 1;
      points.push(...nodes[i].position, ...nodes[nextIdx].position);
    }

    return new Float32Array(points);
  }, [nodes]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Node Spheres */}
      {nodes.map((node, index) => (
        <mesh key={index} position={node.position}>
          <sphereGeometry args={[node.size, 24, 24]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.4}
          />
        </mesh>
      ))}

      {/* Network Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4FA87D" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}
