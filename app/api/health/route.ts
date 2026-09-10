import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    app: "Vaidya Setu",
    version: "0.1.0",
    step: "01-foundation",
    ministry: "Ministry of Ayush",
    department: "All India Institute of Ayurveda (AIIA)",
    theme: "Smart Automation",
    timestamp: new Date().toISOString(),
  });
}
