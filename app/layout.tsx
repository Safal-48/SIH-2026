import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { siteConfig } from "@/config/site";
import { AuthProvider } from "@/lib/auth/AuthContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const AyushAtmosphereBackground3D = dynamic(
  () =>
    import("@/components/three/AyushAtmosphereBackground3D").then(
      (m) => m.AyushAtmosphereBackground3D
    ),
  { ssr: false }
);

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
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} dark`}>
      <body className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-accent/25 selection:text-foreground relative">
        <AyushAtmosphereBackground3D />
        <div className="relative z-10 flex flex-col min-h-screen">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  );
}
