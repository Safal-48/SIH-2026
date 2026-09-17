"use client";

import * as React from "react";
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Lock,
  CameraOff,
  Eye,
  EyeOff,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
  Target,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Gauge,
  Sliders,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AssessmentIntegrityEvent } from "@/lib/services/skillIntelligenceService";
import { cn } from "@/lib/utils/cn";

export type HeadDirection =
  | "FACE_CENTERED"
  | "LEFT"
  | "RIGHT"
  | "UP"
  | "DOWN"
  | "FACE_NOT_VISIBLE"
  | "CAMERA_DISABLED";

interface AssessmentIntegrityMonitorProps {
  isActive: boolean;
  assessmentId: string;
  warningCount: number;
  isFrozen: boolean;
  onWarning: (newCount: number, direction: HeadDirection, event: AssessmentIntegrityEvent) => void;
  onFreeze: () => void;
  onSubmitFrozen: () => void;
}

const STORAGE_KEY_EVENTS = "vaidya_setu_assessment_integrity_events";
const SUSTAINED_TARGET_MS = 1200; // 1.2s sustained deviation triggers violation (fast & responsive)
const VIOLATION_PAUSE_MS = 1800; // 1.8s pause between consecutive warnings if deviation continues

// Web Audio synthesizer for audible alert beeps
function playTone(type: "warning" | "freeze") {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "freeze") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(340, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } else {
      osc.type = "sine";
      osc.frequency.setValueAtTime(620, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    }
  } catch {}
}

export function AssessmentIntegrityMonitor({
  isActive,
  assessmentId,
  warningCount,
  isFrozen,
  onWarning,
  onFreeze,
  onSubmitFrozen,
}: AssessmentIntegrityMonitorProps) {
  // Video & Canvas refs
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);

  // Layout & UI States
  const [isFloating, setIsFloating] = React.useState<boolean>(false);
  const [showPreview, setShowPreview] = React.useState<boolean>(true);
  const [cameraActive, setCameraActive] = React.useState<boolean>(false);
  const [cameraError, setCameraError] = React.useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = React.useState<boolean>(true);
  const [sensitivity, setSensitivity] = React.useState<"high" | "normal">("high");

  // Detection Live Feedback States
  const [currentDirection, setCurrentDirection] = React.useState<HeadDirection>("FACE_CENTERED");
  const [deviationProgress, setDeviationProgress] = React.useState<number>(0);
  const [horizontalOffsetPercent, setHorizontalOffsetPercent] = React.useState<number>(50);
  const [recordedViolations, setRecordedViolations] = React.useState<AssessmentIntegrityEvent[]>([]);

  // Active Warning Banner Modal
  const [activeWarningBanner, setActiveWarningBanner] = React.useState<{
    title: string;
    message: string;
    warningNum: number;
  } | null>(null);

  // Calibration Baselines
  const baselineXRef = React.useRef<number>(0.50);
  const baselineYRef = React.useRef<number>(0.48);
  const baselineAsymmetryRef = React.useRef<number>(0.0);
  const calibrationFramesCountRef = React.useRef<number>(0);

  // Tracking Accumulator Refs (Prevents stale interval closures)
  const deviationAccumulatorRef = React.useRef<number>(0);
  const lastViolationTimeRef = React.useRef<number>(0);
  const warningCountRef = React.useRef<number>(warningCount);
  const isFrozenRef = React.useRef<boolean>(isFrozen);
  const onWarningRef = React.useRef(onWarning);
  const onFreezeRef = React.useRef(onFreeze);
  const assessmentIdRef = React.useRef(assessmentId);
  const sensitivityRef = React.useRef<"high" | "normal">("high");

  React.useEffect(() => {
    warningCountRef.current = warningCount;
  }, [warningCount]);

  React.useEffect(() => {
    isFrozenRef.current = isFrozen;
  }, [isFrozen]);

  React.useEffect(() => {
    onWarningRef.current = onWarning;
  }, [onWarning]);

  React.useEffect(() => {
    onFreezeRef.current = onFreeze;
  }, [onFreeze]);

  React.useEffect(() => {
    assessmentIdRef.current = assessmentId;
  }, [assessmentId]);

  React.useEffect(() => {
    sensitivityRef.current = sensitivity;
  }, [sensitivity]);

  // Start Camera Stream
  const initCamera = React.useCallback(async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(() => {});
        };
      }
      setCameraActive(true);
      calibrationFramesCountRef.current = 0;
    } catch (err: any) {
      console.warn("Camera access request notice:", err);
      setCameraActive(false);
      setCameraError("Camera access is required for assessment integrity monitoring.");
      setCurrentDirection("CAMERA_DISABLED");
    }
  }, []);

  // Stop Camera
  const stopCamera = React.useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  }, []);

  React.useEffect(() => {
    if (isActive && !isFrozen) {
      initCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isActive, isFrozen, initCamera, stopCamera]);

  // Record Integrity Event
  const recordEvent = React.useCallback(
    (warningNum: number, dir: HeadDirection): AssessmentIntegrityEvent => {
      const event: AssessmentIntegrityEvent = {
        id: `int-ev-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        assessmentId: assessmentIdRef.current,
        warningNumber: warningNum,
        detectedDirection: dir,
        timestamp: new Date().toISOString(),
        eventType:
          warningNum >= 4
            ? "FREEZE"
            : dir === "FACE_NOT_VISIBLE"
            ? "FACE_LOST"
            : "HEAD_DEVIATION",
      };

      setRecordedViolations((prev) => [event, ...prev]);

      if (typeof window !== "undefined") {
        try {
          const raw = localStorage.getItem(STORAGE_KEY_EVENTS);
          const existing: AssessmentIntegrityEvent[] = raw ? JSON.parse(raw) : [];
          localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify([event, ...existing]));
        } catch {}
      }
      return event;
    },
    []
  );

  // Trigger Warning Escalation & Freeze
  const handleConfirmedViolation = React.useCallback(
    (dir: HeadDirection) => {
      if (isFrozenRef.current) return;

      const nextCount = warningCountRef.current + 1;
      const event = recordEvent(nextCount, dir);

      if (soundEnabled) {
        playTone(nextCount >= 4 ? "freeze" : "warning");
      }

      if (nextCount === 1) {
        setActiveWarningBanner({
          title: "Assessment Integrity Warning 1 of 3",
          message: "Sustained head deviation detected. Please keep your face centered on the screen.",
          warningNum: 1,
        });
        onWarningRef.current(1, dir, event);
      } else if (nextCount === 2) {
        setActiveWarningBanner({
          title: "Assessment Integrity Warning 2 of 3",
          message: "Multiple head deviations detected. One final warning remains before assessment freezes.",
          warningNum: 2,
        });
        onWarningRef.current(2, dir, event);
      } else if (nextCount === 3) {
        setActiveWarningBanner({
          title: "Final Assessment Integrity Warning (3 of 3)",
          message: "This is your final warning. Any further sustained head deviation will freeze your assessment.",
          warningNum: 3,
        });
        onWarningRef.current(3, dir, event);
      } else if (nextCount >= 4) {
        setActiveWarningBanner(null);
        onWarningRef.current(4, dir, event);
        onFreezeRef.current();
      }
    },
    [recordEvent, soundEnabled]
  );

  // Manual Re-Calibration Button
  const handleCalibrateCenter = React.useCallback(() => {
    calibrationFramesCountRef.current = 0;
    deviationAccumulatorRef.current = 0;
    setDeviationProgress(0);
    setCurrentDirection("FACE_CENTERED");
    setHorizontalOffsetPercent(50);
  }, []);

  // Auto-dismiss transient warning banner after 7 seconds
  React.useEffect(() => {
    if (!activeWarningBanner) return;
    const timer = setTimeout(() => {
      setActiveWarningBanner(null);
    }, 7000);
    return () => clearTimeout(timer);
  }, [activeWarningBanner]);

  // Optical Face / Head Orientation Analyzer Loop (Runs every 100ms)
  React.useEffect(() => {
    if (!isActive || isFrozen || !cameraActive) return;

    let detector: any = null;
    if (typeof window !== "undefined" && "FaceDetector" in window) {
      try {
        detector = new (window as any).FaceDetector({ fastMode: true, maxDetectedFaces: 1 });
      } catch {}
    }

    const interval = setInterval(async () => {
      if (!videoRef.current || videoRef.current.readyState < 2) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!canvas) return;

      let detectedDir: HeadDirection = "FACE_CENTERED";
      let liveCentroidX = 0.50;

      // Method A: Native FaceDetector API (if available)
      if (detector) {
        try {
          const faces = await detector.detect(video);
          if (!faces || faces.length === 0) {
            detectedDir = "FACE_NOT_VISIBLE";
          } else {
            const box = faces[0].boundingBox;
            const cx = (box.x + box.width / 2) / video.videoWidth;
            const cy = (box.y + box.height / 2) / video.videoHeight;
            liveCentroidX = cx;

            const diffX = cx - baselineXRef.current;
            const diffY = cy - baselineYRef.current;
            const thresh = sensitivityRef.current === "high" ? 0.05 : 0.08;

            if (diffX < -thresh) detectedDir = "RIGHT";
            else if (diffX > thresh) detectedDir = "LEFT";
            else if (diffY < -0.09) detectedDir = "UP";
            else if (diffY > 0.10) detectedDir = "DOWN";
            else detectedDir = "FACE_CENTERED";
          }
        } catch {
          detectedDir = "FACE_CENTERED";
        }
      } else {
        // Method B: High-Sensitivity Canvas Chrominance & Lateral Asymmetry Engine
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(video, 0, 0, 160, 120);
          const imgData = ctx.getImageData(0, 0, 160, 120);
          const data = imgData.data;

          let sumX = 0;
          let sumY = 0;
          let skinCount = 0;
          let leftSkinCount = 0;
          let rightSkinCount = 0;

          // Step of 2 pixels (4800 samples) across the face region (y: 10 to 100, x: 20 to 140)
          for (let y = 10; y < 100; y += 2) {
            for (let x = 20; x < 140; x += 2) {
              const idx = (y * 160 + x) * 4;
              const r = data[idx];
              const g = data[idx + 1];
              const b = data[idx + 2];

              // YCbCr + RGB Dual Skin Filter (Supports diverse Indian skin tones & lighting)
              const Cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
              const Cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;
              const isSkin =
                (Cr >= 130 && Cr <= 178 && Cb >= 75 && Cb <= 138) ||
                (r > 45 && g > 25 && b > 15 && r > g && r > b && r - g >= 6);

              if (isSkin) {
                sumX += x;
                sumY += y;
                skinCount += 1;

                if (x < 80) {
                  leftSkinCount += 1;
                } else {
                  rightSkinCount += 1;
                }
              }
            }
          }

          if (skinCount < 40) {
            detectedDir = "FACE_NOT_VISIBLE";
          } else {
            const rawAvgX = sumX / skinCount / 160;
            const rawAvgY = sumY / skinCount / 120;
            liveCentroidX = rawAvgX;

            // Auto-calibration during initial 10 frames
            if (calibrationFramesCountRef.current < 10) {
              baselineXRef.current = baselineXRef.current * 0.7 + rawAvgX * 0.3;
              baselineYRef.current = baselineYRef.current * 0.7 + rawAvgY * 0.3;
              const rawAsym = (leftSkinCount - rightSkinCount) / (skinCount + 1);
              baselineAsymmetryRef.current = baselineAsymmetryRef.current * 0.7 + rawAsym * 0.3;
              calibrationFramesCountRef.current += 1;
            }

            // Lateral Face Asymmetry (Yaw: when turning head left, left cheek turns forward)
            const rawAsymmetry = (leftSkinCount - rightSkinCount) / (skinCount + 1);
            const deltaAsymmetry = rawAsymmetry - baselineAsymmetryRef.current;

            // In mirrored display (-scale-x-100), looking to user's left means
            // on raw unmirrored canvas, the user's left cheek moves to canvas right (rawAvgX increases, deltaAsymmetry becomes negative)
            const userYawDelta = (rawAvgX - baselineXRef.current) * 1.5 - deltaAsymmetry * 0.28;
            const deltaY = rawAvgY - baselineYRef.current;

            // Sensitivity threshold
            const yawThreshold = sensitivityRef.current === "high" ? 0.035 : 0.065;
            const pitchThreshold = sensitivityRef.current === "high" ? 0.065 : 0.095;

            if (userYawDelta > yawThreshold) {
              detectedDir = "LEFT";
            } else if (userYawDelta < -yawThreshold) {
              detectedDir = "RIGHT";
            } else if (deltaY < -pitchThreshold) {
              detectedDir = "UP";
            } else if (deltaY > pitchThreshold) {
              detectedDir = "DOWN";
            } else {
              detectedDir = "FACE_CENTERED";
            }
          }
        }
      }

      setCurrentDirection(detectedDir);
      setHorizontalOffsetPercent(Math.round(liveCentroidX * 100));

      // Continuous Leaky Accumulator for Sustained Violation
      const now = Date.now();
      const isSuspicious = detectedDir !== "FACE_CENTERED";
      const inCooldown = now - lastViolationTimeRef.current < VIOLATION_PAUSE_MS;

      if (isSuspicious && !inCooldown) {
        // Accumulate deviation time
        deviationAccumulatorRef.current += 100;
        const progress = Math.min(
          100,
          Math.round((deviationAccumulatorRef.current / SUSTAINED_TARGET_MS) * 100)
        );
        setDeviationProgress(progress);

        if (deviationAccumulatorRef.current >= SUSTAINED_TARGET_MS) {
          // CONFIRMED SUSTAINED VIOLATION!
          deviationAccumulatorRef.current = 0;
          setDeviationProgress(0);
          lastViolationTimeRef.current = now;
          handleConfirmedViolation(detectedDir);
        }
      } else {
        // Leaky decay if returned to center (doesn't wipe on a single noisy frame)
        if (deviationAccumulatorRef.current > 0) {
          deviationAccumulatorRef.current = Math.max(0, deviationAccumulatorRef.current - 50);
          const progress = Math.min(
            100,
            Math.round((deviationAccumulatorRef.current / SUSTAINED_TARGET_MS) * 100)
          );
          setDeviationProgress(progress);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, isFrozen, cameraActive, handleConfirmedViolation]);

  return (
    <>
      {/* Hidden high-performance processing canvas */}
      <canvas ref={canvasRef} width={160} height={120} className="hidden" />

      {/* 1. TOP STATUS BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 px-4 rounded-2xl bg-[#03150d]/90 border border-emerald-500/30 text-xs shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </div>
          <span className="font-semibold text-emerald-300 flex items-center gap-1.5 text-xs">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            NCISM AI Proctoring: <strong className="text-white font-mono">Active (1.2s Detection)</strong>
          </span>
        </div>

        {/* Real-time Status Badges */}
        <div className="flex items-center gap-2.5">
          <Badge
            variant={
              currentDirection === "FACE_CENTERED"
                ? "verified"
                : currentDirection === "CAMERA_DISABLED"
                ? "outline"
                : "warning"
            }
            size="sm"
            className={cn(
              "text-[10px] font-bold font-mono tracking-wide",
              currentDirection !== "FACE_CENTERED" && "animate-pulse"
            )}
          >
            {currentDirection.replace("_", " ")}
          </Badge>

          <span
            className={cn(
              "px-2.5 py-0.5 rounded-md font-mono font-bold text-xs",
              warningCount === 0
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                : warningCount === 1
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                : warningCount === 2
                ? "bg-orange-500/20 text-orange-400 border border-orange-500/40"
                : "bg-rose-500/20 text-rose-400 border border-rose-500/50 animate-pulse"
            )}
          >
            Warnings: {warningCount} / 3 {warningCount === 3 && "(FINAL)"}
          </span>
        </div>
      </div>

      {/* Camera Permission Alert (If camera denied) */}
      {cameraError && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2">
            <CameraOff className="h-4 w-4 text-amber-400 shrink-0" />
            <span>{cameraError}</span>
          </div>
          <Button variant="outline" size="sm" onClick={initCamera} className="text-xs shrink-0">
            Retry Camera
          </Button>
        </div>
      )}

      {/* 2. PROCTORING WIDGET (LARGE SIDEBAR DOCK OR FLOATING TOP-RIGHT) */}
      {showPreview && !isFrozen && (
        <div
          className={cn(
            "rounded-3xl overflow-hidden border border-emerald-500/40 bg-[#03140c]/95 shadow-2xl backdrop-blur-2xl transition-all duration-300",
            isFloating
              ? "fixed top-24 right-4 sm:top-28 sm:right-6 z-40 w-80 sm:w-96 shadow-2xl border-emerald-400/50 animate-in fade-in"
              : "w-full"
          )}
        >
          {/* Card Header */}
          <div className="px-4 py-3 bg-emerald-950/70 border-b border-emerald-500/25 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold text-white tracking-wide flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Live Integrity Proctor
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Sensitivity Toggle */}
              <button
                onClick={() =>
                  setSensitivity((s) => (s === "high" ? "normal" : "high"))
                }
                className="px-2 py-0.5 rounded text-[10px] bg-white/10 hover:bg-white/20 text-emerald-300 font-mono flex items-center gap-1"
                title="Toggle detection sensitivity"
              >
                <Sliders className="h-3 w-3" />
                <span>{sensitivity.toUpperCase()}</span>
              </button>

              {/* Sound Toggle */}
              <button
                onClick={() => setSoundEnabled((v) => !v)}
                className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/10 text-[10px]"
                title={soundEnabled ? "Mute Proctor Chimes" : "Unmute Proctor Chimes"}
              >
                {soundEnabled ? (
                  <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <VolumeX className="h-3.5 w-3.5 text-gray-400" />
                )}
              </button>

              {/* Float / Dock Toggle */}
              <button
                onClick={() => setIsFloating((f) => !f)}
                className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/10 text-[10px]"
                title={isFloating ? "Dock to Sidebar" : "Float on Screen"}
              >
                {isFloating ? (
                  <Minimize2 className="h-3.5 w-3.5" />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* LARGE VIDEO STREAM FEED */}
          <div className="relative aspect-[4/3] bg-black overflow-hidden group">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover -scale-x-100"
            />

            {/* Centering Target Guide Box (Virtual Reticle) */}
            <div
              className={cn(
                "absolute inset-6 rounded-2xl border-2 pointer-events-none transition-all duration-200 flex items-center justify-center",
                currentDirection === "FACE_CENTERED"
                  ? "border-emerald-500/50"
                  : "border-amber-400 animate-pulse bg-amber-500/15"
              )}
            >
              {currentDirection === "FACE_CENTERED" ? (
                <span className="text-[10px] text-emerald-400/90 font-mono tracking-widest bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  HEAD ALIGNED ✓
                </span>
              ) : (
                <span className="text-[10px] text-amber-300 font-mono font-bold tracking-wider bg-black/70 px-2.5 py-0.5 rounded backdrop-blur-sm animate-bounce">
                  ⚠️ DEVIATION DETECTED
                </span>
              )}
            </div>

            {/* Top-Left Live Status Badge */}
            <div className="absolute top-3 left-3">
              <span
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold font-mono shadow-lg backdrop-blur-md flex items-center gap-1.5",
                  currentDirection === "FACE_CENTERED"
                    ? "bg-emerald-950/90 text-emerald-300 border border-emerald-500/50"
                    : currentDirection === "FACE_NOT_VISIBLE"
                    ? "bg-rose-950/90 text-rose-300 border border-rose-500/70 animate-bounce"
                    : "bg-amber-950/90 text-amber-300 border border-amber-500/70 animate-pulse"
                )}
              >
                {currentDirection === "FACE_CENTERED" ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Centered ✓
                  </>
                ) : currentDirection === "LEFT" ? (
                  "◄ Looking Left"
                ) : currentDirection === "RIGHT" ? (
                  "Looking Right ►"
                ) : currentDirection === "UP" ? (
                  "▲ Looking Up"
                ) : currentDirection === "DOWN" ? (
                  "▼ Looking Down"
                ) : currentDirection === "FACE_NOT_VISIBLE" ? (
                  "✖ Face Lost"
                ) : (
                  currentDirection
                )}
              </span>
            </div>

            {/* Top-Right Warnings Count Pill */}
            <div className="absolute top-3 right-3">
              <span
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold font-mono shadow-lg backdrop-blur-md",
                  warningCount === 0
                    ? "bg-black/70 text-gray-200 border border-white/10"
                    : warningCount === 1
                    ? "bg-amber-500 text-black border border-amber-400 font-extrabold"
                    : warningCount === 2
                    ? "bg-orange-500 text-white border border-orange-400 font-extrabold"
                    : "bg-rose-600 text-white border border-rose-400 animate-pulse font-extrabold"
                )}
              >
                {warningCount} / 3 {warningCount === 3 && "⚠️ FINAL"}
              </span>
            </div>

            {/* Real-Time Horizontal Deviation Gauge Bar (Middle-Bottom) */}
            <div className="absolute bottom-12 left-3 right-3 bg-black/80 px-2.5 py-1.5 rounded-xl border border-white/15 backdrop-blur-md">
              <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 pb-1">
                <span className={cn(currentDirection === "LEFT" && "text-amber-400 font-bold")}>◄ Left</span>
                <span className={cn(currentDirection === "FACE_CENTERED" && "text-emerald-400 font-bold")}>Center</span>
                <span className={cn(currentDirection === "RIGHT" && "text-amber-400 font-bold")}>Right ►</span>
              </div>
              <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden">
                {/* Center Safe Zone */}
                <div className="absolute left-[35%] right-[35%] h-full bg-emerald-500/20" />
                {/* Real-time Indicator Needle */}
                <div
                  className={cn(
                    "absolute top-0 bottom-0 w-3 -ml-1.5 rounded-full transition-all duration-75",
                    currentDirection === "FACE_CENTERED" ? "bg-emerald-400" : "bg-amber-400 animate-ping"
                  )}
                  style={{ left: `${Math.max(5, Math.min(95, horizontalOffsetPercent))}%` }}
                />
              </div>
            </div>

            {/* Sustained Deviation Countdown Bar */}
            {deviationProgress > 0 && (
              <div className="absolute bottom-2 left-3 right-3 bg-black/90 p-2 rounded-xl border border-amber-500/60 backdrop-blur-md space-y-1 animate-in fade-in">
                <div className="flex items-center justify-between text-[11px] text-amber-300 font-semibold font-mono">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-400 animate-bounce" />
                    Sustained Deviation:
                  </span>
                  <span>{((deviationProgress * 1.2) / 100).toFixed(1)}s / 1.2s</span>
                </div>
                <div className="h-2 w-full bg-black/70 rounded-full overflow-hidden border border-amber-500/40">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 transition-all duration-75"
                    style={{ width: `${deviationProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Quick Controls & Evaluator Simulation Footbar */}
          <div className="p-3 bg-emerald-950/50 border-t border-emerald-900/50 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <button
                onClick={handleCalibrateCenter}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-300 border border-emerald-500/40 transition-colors font-medium text-xs"
                title="Calibrate your current head posture as center baseline"
              >
                <Target className="h-3.5 w-3.5 text-emerald-400" />
                <span>Calibrate Center</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleConfirmedViolation("LEFT")}
                  disabled={isFrozen}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors font-semibold text-xs disabled:opacity-40"
                  title="Simulate 1 warning violation for demonstration"
                >
                  + Sim Warning
                </button>
                <button
                  onClick={() => {
                    onWarningRef.current(4, "LEFT", recordEvent(4, "LEFT"));
                    onFreezeRef.current();
                  }}
                  disabled={isFrozen}
                  className="px-2.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 transition-colors font-semibold text-xs disabled:opacity-40"
                  title="Simulate full assessment screen freeze"
                >
                  🚨 Freeze
                </button>
              </div>
            </div>

            <div className="text-[10px] text-gray-400 flex items-center justify-between border-t border-white/5 pt-2">
              <span>Proctor Algorithm: <strong>YCbCr Optical Yaw</strong></span>
              <span className="text-emerald-400">Zero Server Streaming • 100% Local</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. POPUP WARNING BANNER (Warnings 1, 2, 3) */}
      {activeWarningBanner && !isFrozen && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 animate-in slide-in-from-top-4 duration-300">
          <div
            className={cn(
              "p-4 sm:p-5 rounded-3xl border shadow-2xl backdrop-blur-2xl flex items-start gap-4",
              activeWarningBanner.warningNum === 1
                ? "bg-[#16190e]/95 border-amber-500/80 text-amber-200"
                : activeWarningBanner.warningNum === 2
                ? "bg-[#1c130b]/95 border-orange-500/85 text-orange-200"
                : "bg-[#250d0d]/95 border-rose-500/90 text-rose-200 animate-pulse"
            )}
          >
            <div
              className={cn(
                "p-3 rounded-2xl border shrink-0",
                activeWarningBanner.warningNum === 1
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                  : activeWarningBanner.warningNum === 2
                  ? "bg-orange-500/20 border-orange-500/40 text-orange-400"
                  : "bg-rose-500/20 border-rose-500/40 text-rose-400"
              )}
            >
              <AlertTriangle className="h-6 w-6" />
            </div>

            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-sm sm:text-base text-white">
                  {activeWarningBanner.title}
                </h4>
                <Badge
                  variant={activeWarningBanner.warningNum === 3 ? "destructive" : "warning"}
                  size="sm"
                  className="text-[10px] font-mono font-bold"
                >
                  Warning {activeWarningBanner.warningNum} of 3
                </Badge>
              </div>

              <p className="text-xs leading-relaxed text-gray-100">
                {activeWarningBanner.message}
              </p>

              <div className="text-[11px] text-gray-300 pt-1 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Timer and questions continue normally. Keep your face aligned to prevent freeze.</span>
              </div>
            </div>

            <button
              onClick={() => setActiveWarningBanner(null)}
              className="text-gray-400 hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4. FULL-SCREEN ASSESSMENT FREEZE OVERLAY (4th Violation Trigger) */}
      {isFrozen && (
        <div className="fixed inset-0 z-50 bg-[#020b06]/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="max-w-xl w-full rounded-3xl border border-rose-500/40 bg-gradient-to-b from-[#190909] via-[#110505] to-[#080202] p-6 sm:p-10 shadow-2xl text-center space-y-6">
            {/* Pulsing Lock Icon */}
            <div className="relative w-20 h-20 rounded-3xl bg-rose-500/15 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto shadow-2xl shadow-rose-950/80">
              <Lock className="h-10 w-10 text-rose-500 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500" />
              </span>
            </div>

            {/* Title & Official Explanations */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider border border-rose-500/30">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>NCISM Assessment Integrity Protocol</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Assessment Frozen
              </h2>
              <p className="text-sm text-gray-200 leading-relaxed max-w-md mx-auto">
                Your assessment has been frozen because the maximum number of integrity warnings was exceeded.
              </p>
              <p className="text-xs text-rose-300 font-medium font-mono">
                Three integrity warnings were issued during this assessment session.
              </p>
            </div>

            {/* Recorded Violations Audit Trail */}
            {recordedViolations.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-black/40 border border-rose-500/20 text-left space-y-2">
                <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">
                  Logged Integrity Telemetry:
                </span>
                <div className="max-h-28 overflow-y-auto space-y-1.5 text-[11px] font-mono pr-1">
                  {recordedViolations.slice(0, 4).map((v) => (
                    <div
                      key={v.id}
                      className="flex items-center justify-between text-gray-300 bg-white/5 px-2.5 py-1 rounded-lg"
                    >
                      <span className="text-rose-400 font-semibold">
                        Warning {v.warningNumber}: {v.detectedDirection.replace("_", " ")}
                      </span>
                      <span className="text-gray-400 text-[10px]">
                        {new Date(v.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Answer Preservation Notice */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-1.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>All previously entered answers have been safely preserved.</span>
              </div>
              <p className="text-[11px] text-gray-400 pl-6">
                Your completed responses and elapsed time log will be compiled into your official diagnostic record.
              </p>
            </div>

            {/* Primary Action Button: SUBMIT ASSESSMENT */}
            <div className="pt-2">
              <Button
                variant="gold"
                size="lg"
                onClick={onSubmitFrozen}
                rightIcon={<ArrowRight className="h-5 w-5" />}
                className="w-full text-sm font-bold py-4 shadow-xl shadow-accent/30 tracking-wide"
              >
                SUBMIT ASSESSMENT
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
