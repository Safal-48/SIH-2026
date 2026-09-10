"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { AyurvedaBotanicalNodes } from "./AyurvedaBotanicalNodes";
import { ParticleField } from "./ParticleField";
import { CanvasFallback } from "./CanvasFallback";
import { cn } from "@/lib/utils/cn";

interface ThreeSceneProps {
  className?: string;
  enableControls?: boolean;
  showParticles?: boolean;
  showNodes?: boolean;
}

export function ThreeScene({
  className,
  enableControls = true,
  showParticles = true,
  showNodes = true,
}: ThreeSceneProps) {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setMounted(true);
    // WebGL capability check
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
    return <CanvasFallback className={className} />;
  }

  return (
    <div className={cn("relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden bg-gradient-to-b from-herbal-950/20 via-background to-background border border-herbal-700/15", className)}>
      <Suspense fallback={<CanvasFallback className={className} />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]} // Crisp on high DPI, battery friendly
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[4, 5, 4]} intensity={1.2} color="#FEF9EC" />
          <pointLight position={[-3, -3, -2]} intensity={0.6} color="#4FA87D" />

          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
            {showNodes && <AyurvedaBotanicalNodes />}
          </Float>

          {showParticles && <ParticleField count={120} />}

          {enableControls && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={false}
              maxPolarAngle={Math.PI / 1.7}
              minPolarAngle={Math.PI / 2.3}
            />
          )}
        </Canvas>
      </Suspense>

      {/* Subtle indicator tag */}
      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border text-[11px] font-medium text-muted-foreground pointer-events-none flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        Interactive Ayush Knowledge Graph
      </div>
    </div>
  );
}
