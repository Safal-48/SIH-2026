# Vaidya Setu (वैद्य सेतु)

> **"Portal for Academia - Industry collaboration for Skill Mapping, Internships and Placement"**  
> *Ministry of Ayush | Department: All India Institute of Ayurveda (AIIA) | Theme: Smart Automation*

---

## Overview

**Vaidya Setu** is an enterprise-grade, Ayurveda-focused Academia–Industry Collaboration platform engineered for the Ministry of Ayush and All India Institute of Ayurveda. 

The platform bridges ancient Ayurvedic wisdom with futuristic intelligent technology to support the complete 10-stage student journey:
`ASSESS → MAP SKILLS → IDENTIFY GAPS → LEARN → PRACTICE → VERIFY → MATCH → APPLY → EXPERIENCE → CAREER`.

---

## Step 01 Deliverables

This repository contains the completed **STEP 01: Project Foundation + Architecture + Design System**:

1. **Next.js App Router & Strict TypeScript**: Next.js 14, React 18, Strict TypeScript with zero `any` types and path aliases (`@/*`).
2. **Tailwind CSS & Ayurvedic Design Tokens**:
   - **Primary**: Deep Herbal Green (`hsl(155, 56%, 19%)` / `#133E2B`)
   - **Secondary**: Ayurvedic Earth & Sandalwood (`hsl(24, 50%, 40%)` / `#C26D30`)
   - **Accent**: Warm Ayurvedic Saffron Gold (`hsl(36, 92%, 46%)` / `#E5A93B`)
   - **Surfaces**: Light Ivory (`#FDFCF7`) & Dark Charcoal Forest (`#07170E`)
   - Complete CSS custom properties in `app/globals.css` with WCAG 2.1 AA contrast compliance and `prefers-reduced-motion` support.
3. **Typography System**:
   - Modern editorial sans (`Plus Jakarta Sans`) mapped to responsive CSS clamp utilities (`text-display`, `text-h1`, `text-h2`, `text-h3`, `text-body-lead`, `text-caption`).
4. **24+ Reusable Accessible UI Components**:
   - `Button`, `Card`, `GlassCard`, `Badge`, `Input`, `Select`, `Modal`, `Dialog`, `Tooltip`, `Tabs`, `ProgressBar`, `ProgressRing`, `Avatar`, `Navbar`, `Footer`, `SectionHeading`, `AnimatedText`, `RevealOnScroll`, `MagneticButton`, `StatCard`, `OpportunityCard`, `SkillCard`, `CareerCard`, `Timeline`, `EmptyState`, `LoadingState`.
5. **Animation System (Framer Motion & GSAP)**:
   - Smooth viewport entry reveals, staggered text reveal, spring physics magnetic button, and GSAP timeline/counter utilities.
6. **3D Visual Graph (React Three Fiber & Drei)**:
   - Procedural 7-node Ayurvedic discipline graph (`AyurvedaBotanicalNodes`), floating golden prana particles (`ParticleField`), and graceful 2D SVG fallback (`CanvasFallback`) for non-WebGL devices.
7. **Database Architecture & Types**:
   - Full Supabase SSR client architecture (`lib/supabase/client.ts`, `lib/supabase/server.ts`, `lib/supabase/middleware.ts`).
   - PostgreSQL table models and strict TypeScript interfaces for all 20+ entities (`User`, `StudentProfile`, `Skill`, `Assessment`, `CompetencyPassport`, `Opportunity`, `Verification`, etc.).
8. **Role-Based Architecture**:
   - Scaffolding and capability guards for:
     - `/student` (Ayurveda Scholar)
     - `/academician` (Faculty / Clinical Guide)
     - `/industry` (Ayurvedic Pharma / Hospitals)
     - `/institution` (Colleges / Universities)
     - `/admin` (Ministry of Ayush / National Console)
9. **Smart Automation Micro-Service Stubs**:
   - `assessmentEngine`: Evaluates diagnostic vignettes and clinical knowledge.
   - `skillGapEngine`: Computes readiness percentage and competency gaps.
   - `careerRecommendationEngine`: Generates Ayurveda Career DNA matches.
   - `learningRecommendationEngine`: Generates NCISM-aligned study modules.
   - `opportunityMatchingEngine`: Multi-criteria compatibility scoring.
   - `verificationService`: Digital signature attestation and Competency Passport hashing.
10. **Realistic Ayush Mock Datasets**:
    - Authentic BAMS/MD competencies (Nadi Pariksha, Panchakarma Protocol, Herbal Standardization, GCP Clinical Trials) and opportunities from AIIA, Dabur, Patanjali, and Arya Vaidya Sala Kottakkal.
11. **Foundation Explorer Page**:
    - Interactive live showcase at `/` allowing audit of all tokens, components, 3D graphics, and role gateways.

---

## Directory Structure

```
vaidya-setu/
├── app/
│   ├── (auth)/              # Authentication route group (prepared for future steps)
│   ├── (marketing)/         # Marketing route group
│   ├── student/             # Student role gateway (/student)
│   ├── academician/         # Academician role gateway (/academician)
│   ├── industry/            # Industry role gateway (/industry)
│   ├── institution/         # Institution role gateway (/institution)
│   ├── admin/               # Admin role gateway (/admin)
│   ├── api/
│   │   └── health/          # API Health check endpoint
│   ├── globals.css          # Ayurvedic CSS tokens, dark mode & typography
│   ├── layout.tsx           # Root layout with Plus Jakarta Sans & Navbar/Footer
│   └── page.tsx             # Design System & Foundation Explorer
├── components/
│   ├── ui/                  # Button, Badge, Input, Select, Modal, Tabs, etc.
│   ├── cards/               # Card, GlassCard, StatCard, OpportunityCard, etc.
│   ├── layout/              # Navbar, Footer, SectionHeading
│   ├── animations/          # AnimatedSection, ScrollReveal, MagneticButton, etc.
│   ├── three/               # ThreeScene, ParticleField, BotanicalNodes, Fallback
│   └── feedback/            # Timeline, EmptyState, LoadingState
├── lib/
│   ├── supabase/            # Browser & Server Supabase clients, middleware
│   ├── auth/                # Role definitions & capability guards
│   ├── assessment/          # assessmentEngine & skillGapEngine stubs
│   ├── recommendations/     # careerEngine & learningEngine stubs
│   ├── matching/            # opportunityMatchingEngine stub
│   ├── verification/        # verificationService stub
│   └── utils/               # cn, formatters, gsap-helpers, animation-variants
├── types/
│   ├── roles.ts             # UserRole & RoleConfig
│   ├── entities.ts          # Core domain models (20+ entities)
│   ├── automation.ts        # Smart engine contracts
│   └── database.types.ts    # Supabase PostgreSQL schema types
├── config/
│   ├── site.ts              # Ministry of Ayush & AIIA metadata
│   ├── design-tokens.ts     # Programmatic color, typography & shadow tokens
│   └── navigation.ts        # Role-based & public navigation routes
└── data/
    └── mock-ayurveda.ts     # Realistic Ayush clinical skills & opportunities
```

---

## Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- npm 9+

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the **Foundation Explorer**.

### Build & Type Checking
```bash
# Type check with strict TypeScript
npm run type-check

# Production build
npm run build
```
