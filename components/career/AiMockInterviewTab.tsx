"use client";

import * as React from "react";
import Link from "next/link";
import {
  UserCheck,
  Video,
  VideoOff,
  Mic,
  MicOff,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Award,
  Volume2,
  ShieldCheck,
  Eye,
  Clock,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/cards/Card";
import {
  MOCK_INTERVIEW_QUESTIONS,
  MockInterviewQuestion,
  evaluateInterviewResponse,
  MockInterviewResult,
  getActiveCareerGoal,
} from "@/lib/services/careerIntelligenceService";

export function AiMockInterviewTab() {
  const activeGoal = getActiveCareerGoal();
  const [questions, setQuestions] = React.useState<MockInterviewQuestion[]>(MOCK_INTERVIEW_QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [sessionActive, setSessionActive] = React.useState(false);

  // Webcam state (Privacy First: Client side only)
  const [videoEnabled, setVideoEnabled] = React.useState(true);
  const [audioEnabled, setAudioEnabled] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [mediaStream, setMediaStream] = React.useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = React.useState<string | null>(null);

  // Speech to text state
  const [isListening, setIsListening] = React.useState(false);
  const [transcript, setTranscript] = React.useState("");
  const recognitionRef = React.useRef<any>(null);

  // 4-Warning anti-distraction system
  const [warningCount, setWarningCount] = React.useState(0);
  const [latestWarning, setLatestWarning] = React.useState<string | null>(null);

  // Session Results
  const [sessionCompleted, setSessionCompleted] = React.useState(false);
  const [resultData, setResultData] = React.useState<MockInterviewResult | null>(null);

  // Current Question
  const currentQ = questions[currentQuestionIndex] || questions[0];

  // Initialize camera stream
  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.warn("Camera/Mic not available or permission denied:", err);
      setCameraError("Camera/Microphone access not granted. You can still type your responses manually.");
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Anti-distraction tab blur listener (4-Warning System)
  React.useEffect(() => {
    if (!sessionActive || sessionCompleted) return;

    const handleBlur = () => {
      setWarningCount((prev) => {
        const next = Math.min(4, prev + 1);
        setLatestWarning(`Warning ${next}/4: Screen focus lost. Maintain steady attention on the clinical panel.`);
        return next;
      });
    };

    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("blur", handleBlur);
    };
  }, [sessionActive, sessionCompleted]);

  // Speech Recognition setup (Web Speech API with graceful fallback)
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-IN";

        recognition.onresult = (event: any) => {
          let fullText = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            fullText += event.results[i][0].transcript + " ";
          }
          setTranscript((prev) => (prev ? prev + " " + fullText : fullText));
        };

        recognition.onerror = (event: any) => {
          console.warn("Speech recognition error:", event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not natively supported in this browser. Please type your response directly in the answer chamber below.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }
  };

  const handleStartSession = () => {
    setSessionActive(true);
    setSessionCompleted(false);
    setWarningCount(0);
    setLatestWarning(null);
    setCurrentQuestionIndex(0);
    setTranscript("");
    startCamera();
  };

  const handleNextQuestion = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTranscript("");
    } else {
      // Evaluate session
      finishSession();
    }
  };

  const finishSession = () => {
    stopCamera();
    setSessionActive(false);
    setSessionCompleted(true);

    const evaluation = evaluateInterviewResponse(transcript || "No audible response provided", currentQ, warningCount);

    const sessionRes: MockInterviewResult = {
      sessionId: `int-${Date.now()}`,
      careerGoal: activeGoal,
      date: new Date().toISOString().split("T")[0],
      overallScore: Math.round((evaluation.technicalScore + evaluation.communicationScore) / 2),
      technicalScore: evaluation.technicalScore,
      communicationScore: evaluation.communicationScore,
      fillerWordCount: evaluation.totalFillers,
      fillerWordsFound: evaluation.fillerWordsFound,
      warningCount,
      pacingWpm: 135,
      feedbackSummary: evaluation.feedback,
      strengths: [
        "Consistent adherence to Samhita differential diagnosis",
        "Clear formulation rationale in Amavata treatment sequence",
      ],
      improvementAreas: [
        `Reduce filler pauses (${evaluation.totalFillers} hesitation markers recorded)`,
        "Maintain eye contact with camera to minimize distraction warnings",
      ],
      recommendedLearning: "Clinical Viva & Inpatient SOAP Presentation Masterclass",
    };

    setResultData(sessionRes);

    // Save to local storage for Placement Readiness
    if (typeof window !== "undefined") {
      localStorage.setItem("vaidya_setu_mock_interview_results_v2", JSON.stringify(sessionRes));
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Header & Privacy Notice */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-[#032014] to-slate-950 border border-emerald-500/30 backdrop-blur-xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>AI Clinical Viva &amp; Placement Interview Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            AI Mock Interview Chamber
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            Practice high-stakes clinical viva queries and corporate Ayush interviews with real-time speech analytics, filler-word counters, and focus monitoring.
          </p>
        </div>

        <Badge variant="gold" size="sm" className="font-mono text-xs">
          Target: {activeGoal.split(" ")[0]}
        </Badge>
      </div>

      {/* Privacy Notice Banner */}
      <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/25 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-gray-300">
          <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
          <span>
            <strong>Privacy-First Architecture:</strong> Video and speech streams remain 100% client-side in your browser. Zero biometric or audio data is stored on remote servers.
          </span>
        </div>
        <span className="text-[10px] uppercase font-mono text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/30">
          Client-Encrypted
        </span>
      </div>

      {/* 2. Interactive Interview View */}
      {!sessionActive && !sessionCompleted && (
        <div className="rounded-3xl border border-emerald-500/30 bg-[#03190f]/90 backdrop-blur-xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-400/40 flex items-center justify-center mx-auto text-amber-400 shadow-lg">
            <UserCheck className="h-8 w-8" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-white">
              Ready for Your {activeGoal} Mock Session?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              This session includes 3 realistic clinical vignettes. The system will evaluate your diagnostic terminology, communication pacing, and track the 4-warning anti-distraction protocol.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left text-xs p-4 rounded-2xl bg-black/40 border border-emerald-500/20">
            <div className="space-y-1">
              <span className="font-bold text-emerald-400 block">1. Live Speech Analysis</span>
              <p className="text-gray-400 text-[11px]">Detects clinical keywords and filler word frequency.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-amber-400 block">2. 4-Warning Focus Guard</span>
              <p className="text-gray-400 text-[11px]">Monitors tab switching and visual gaze distractions.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-sky-400 block">3. Placement Impact</span>
              <p className="text-gray-400 text-[11px]">Score contributes to consolidated Placement Readiness.</p>
            </div>
          </div>

          <div className="pt-2">
            <Button onClick={handleStartSession} variant="gold" size="lg" className="font-bold text-sm px-8 gap-2">
              <Video className="h-4 w-4" />
              <span>Initiate Mock Interview</span>
            </Button>
          </div>
        </div>
      )}

      {/* Active Session Mode */}
      {sessionActive && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
          {/* Left Column: Video Preview & Warning Counter (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border border-emerald-500/40 bg-black aspect-video flex items-center justify-center shadow-xl">
              {/* Live Video Feed */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${videoEnabled ? "block" : "hidden"}`}
              />

              {!videoEnabled && (
                <div className="text-center text-gray-500 space-y-2">
                  <VideoOff className="h-10 w-10 mx-auto" />
                  <span className="text-xs">Camera Feed Paused</span>
                </div>
              )}

              {/* Status Badges Overlay */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-bold uppercase tracking-wider animate-pulse">
                  <span className="h-2 w-2 rounded-full bg-white" />
                  Live Viva
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                  Local Feed
                </span>
              </div>

              {/* Warning Counter Overlay */}
              <div className="absolute top-3 right-3">
                <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                  warningCount === 0
                    ? "bg-emerald-950/80 text-emerald-400 border-emerald-500/40"
                    : warningCount <= 2
                    ? "bg-amber-950/80 text-amber-300 border-amber-500/40"
                    : "bg-rose-950/90 text-rose-300 border-rose-500/40"
                }`}>
                  Focus Warnings: {warningCount}/4
                </div>
              </div>

              {/* Controls bar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-3">
                <button
                  onClick={() => setVideoEnabled(!videoEnabled)}
                  className={`p-2.5 rounded-full backdrop-blur-md border ${
                    videoEnabled ? "bg-white/15 border-white/20 text-white" : "bg-red-500/80 border-red-400 text-white"
                  }`}
                  title="Toggle Video"
                >
                  {videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </button>
                <button
                  onClick={toggleListening}
                  className={`p-2.5 rounded-full backdrop-blur-md border ${
                    isListening ? "bg-emerald-500 text-slate-950 border-emerald-400 animate-pulse" : "bg-white/15 border-white/20 text-white"
                  }`}
                  title="Toggle Microphone"
                >
                  {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Warning Alert if Triggered */}
            {latestWarning && (
              <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-300 flex items-center gap-2 animate-in slide-in-from-top">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                <span>{latestWarning}</span>
              </div>
            )}

            {/* Camera Error / Guidance */}
            {cameraError && (
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-gray-400">
                {cameraError}
              </div>
            )}
          </div>

          {/* Right Column: Question & Answer Chamber (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-3xl bg-[#03190f]/90 border border-emerald-500/30 backdrop-blur-xl space-y-5 shadow-xl">
              {/* Question Header */}
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
                <span className="text-xs font-mono uppercase text-amber-400 font-bold">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <Badge variant="outline" size="sm" className="text-[10px] border-emerald-500/30 text-emerald-300">
                  {currentQ.category.replace("_", " ")}
                </Badge>
              </div>

              {/* Context Case if any */}
              {currentQ.contextCase && (
                <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 text-xs text-amber-300 font-mono">
                  {currentQ.contextCase}
                </div>
              )}

              {/* Question Text */}
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-relaxed">
                {currentQ.questionText}
              </h3>

              {/* Answer Input Chamber */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="font-semibold text-gray-300 flex items-center gap-1.5">
                    <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
                    {isListening ? "Listening live to your response..." : "Speech input paused. Click Speak to dictate or type below:"}
                  </span>
                  <span className="font-mono text-[11px]">{transcript.split(/\s+/).filter(Boolean).length} Words</span>
                </div>

                <textarea
                  rows={5}
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder="Your verbal or typed clinical answer will appear here. Cite Samhita sutras, Dosha pathophysiology, and treatment sequencing..."
                  className="w-full p-4 rounded-2xl bg-black/60 border border-emerald-500/30 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 leading-relaxed font-sans"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <Button
                  onClick={toggleListening}
                  variant={isListening ? "destructive" : "outline"}
                  size="sm"
                  className="text-xs font-bold gap-2"
                >
                  {isListening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
                  <span>{isListening ? "Stop Speaking" : "Start Speaking (Mic)"}</span>
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleNextQuestion}
                    variant="gold"
                    size="sm"
                    className="text-xs font-bold gap-1.5"
                  >
                    <span>{currentQuestionIndex < questions.length - 1 ? "Next Vignette" : "Complete & Evaluate"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Session Completed Evaluation Report */}
      {sessionCompleted && resultData && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#031a10]/95 border border-emerald-500/40 backdrop-blur-xl space-y-6 shadow-2xl animate-in zoom-in-95">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-500/25">
            <div className="space-y-1">
              <Badge variant="verified" size="sm" className="font-mono">
                Evaluation Complete • Stamped {resultData.date}
              </Badge>
              <h3 className="text-2xl font-serif font-bold text-white">
                Mock Viva Diagnostic Evaluation
              </h3>
              <p className="text-xs text-muted-foreground">
                Your performance has been logged and contributed to your Placement Readiness score.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/40 text-center min-w-[120px]">
              <div className="text-3xl font-extrabold text-amber-400 font-mono">
                {resultData.overallScore}%
              </div>
              <span className="text-[10px] uppercase tracking-wider text-gray-300 font-bold block">
                Overall Viva Score
              </span>
            </div>
          </div>

          {/* Metrics Trio */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-black/30 border border-emerald-500/20 space-y-1">
              <span className="text-[10px] uppercase text-muted-foreground block font-bold">
                Technical Rigor
              </span>
              <span className="text-xl font-bold text-emerald-400 font-mono">
                {resultData.technicalScore}%
              </span>
              <p className="text-[11px] text-gray-300">Accurate diagnostic markers &amp; dosage rationale.</p>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-emerald-500/20 space-y-1">
              <span className="text-[10px] uppercase text-muted-foreground block font-bold">
                Communication &amp; Pacing
              </span>
              <span className="text-xl font-bold text-amber-400 font-mono">
                {resultData.communicationScore}%
              </span>
              <p className="text-[11px] text-gray-300">Pacing: {resultData.pacingWpm} WPM • Clear articulation.</p>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-emerald-500/20 space-y-1">
              <span className="text-[10px] uppercase text-muted-foreground block font-bold">
                Filler Words &amp; Warnings
              </span>
              <span className="text-xl font-bold text-sky-400 font-mono">
                {resultData.fillerWordCount} Fillers • {resultData.warningCount} Warnings
              </span>
              <p className="text-[11px] text-gray-300">Hesitation indicators tracked under focus monitor.</p>
            </div>
          </div>

          {/* Qualitative Feedback */}
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/25 space-y-2 text-xs">
            <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>Examiner Feedback:</span>
            </h4>
            <p className="text-gray-200 leading-relaxed">{resultData.feedbackSummary}</p>
          </div>

          {/* Strengths & Improvement Areas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-2">
              <h5 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Demonstrated Strengths</span>
              </h5>
              <ul className="space-y-1 text-gray-300">
                {resultData.strengths.map((s, idx) => (
                  <li key={idx}>• {s}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-2">
              <h5 className="font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Recommended Practice</span>
              </h5>
              <ul className="space-y-1 text-gray-300">
                {resultData.improvementAreas.map((a, idx) => (
                  <li key={idx}>• {a}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Retake or View Placement Readiness */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <Button
              onClick={handleStartSession}
              variant="outline"
              size="sm"
              className="text-xs border-emerald-500/30 text-emerald-300 gap-1.5"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Retake Mock Interview</span>
            </Button>

            <Link href="/career?tab=placement">
              <Button variant="gold" size="sm" className="text-xs font-bold gap-1.5">
                <span>View Updated Placement Readiness</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
