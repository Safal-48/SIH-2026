import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { siteConfig } from "@/config/site";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { ViewportLock } from "@/components/utils/ViewportLock";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const AyurvedaBackgroundCover = dynamic(
  () =>
    import("@/components/animations/AyurvedaBackgroundCover").then(
      (m) => m.AyurvedaBackgroundCover
    ),
  { ssr: false }
);

const MouseEffects = dynamic(
  () =>
    import("@/components/animations/MouseEffects").then(
      (m) => m.MouseEffects
    ),
  { ssr: false }
);

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#03140c",
};

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "Ayurveda",
    "Ministry of Ayush",
    "All India Institute of Ayurveda",
    "AIIA",
    "Skill Mapping",
    "Internships",
    "Placements",
    "BAMS",
    "MD Ayurveda",
    "Panchakarma",
    "Competency Passport",
  ],
  authors: [{ name: "Ministry of Ayush / AIIA" }],
  icons: {
    icon: "/images/ayu-setu-emblem.png",
    shortcut: "/images/ayu-setu-emblem.png",
    apple: "/images/ayu-setu-emblem.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${outfit.variable} ${jetbrainsMono.variable} dark overflow-x-hidden w-full max-w-[100vw]`}
    >
      <body className="min-h-screen text-foreground flex flex-col font-sans selection:bg-accent/25 selection:text-foreground relative bg-background overflow-x-hidden w-full max-w-[100vw]">
        {/* Device Viewport & Gesture Scale Protection */}
        <ViewportLock />

        {/* Global Mouse Click Interaction Effects (Originkit) */}
        <MouseEffects color="#E5A93B" interactionMode="sniper" effectSize={85} />

        {/* Full-screen Authentic Ayurveda Animated Living Background */}
        <AyurvedaBackgroundCover />
        <div className="relative z-10 flex flex-col min-h-screen bg-transparent w-full max-w-[100vw] overflow-x-hidden">
          <AuthProvider>
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}

