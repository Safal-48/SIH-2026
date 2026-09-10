"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

export default function SkillGapRedirectPage() {
  const router = useRouter();

  React.useEffect(() => {
    router.replace("/student/career-dna?tab=skill-gap");
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs uppercase tracking-widest font-mono">Loading Skill Gap Diagnostics...</p>
      </div>
    </div>
  );
}
