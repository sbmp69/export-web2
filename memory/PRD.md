# Alux Architectural — PRD

## Problem Statement
Premium, modern, luxury-industrial marketing website for "Alux Architectural" (Aadesh Enterprise), a brass architectural hardware brand in Mumbai, India. Aesthetic: matte black + brass gold + warm whites, glassmorphism navbar, cinematic product presentation, smooth animations.

Brand:
- Name: Alux Architectural (Aadesh Enterprise)
- Phone: 9099369442
- Email: purnatpedhadiya2016@gmail.com
- Location: Mumbai, India
- Specialty: Brass hinges, tower bolts, handles, door accessories, premium architectural hardware

## Architecture
- Backend: FastAPI + MongoDB (motor async)
- Frontend: React 19 + Tailwind + shadcn/ui + framer-motion + lucide-react
- Fonts: Playfair Display (display), Manrope (body)
- Single-page site with smooth-scroll anchors

## User Personas
- Architects / Interior Designers — sourcing architectural-grade hardware
- Builders / Contractors — bulk orders for projects
- Dealers / Distributors — trade catalogue access
- End clients — luxury home renovation

## Core Requirements (static)
- Hero with cinematic background + headline + CTAs
- About brand section
- Product showcase (5+ categories)
- Why Choose Us grid (6 pillars)
- Luxury experience gallery
- Contact with inquiry form, WhatsApp, phone, email, Google Maps
- Sticky transparent glassmorphism navbar
- Floating WhatsApp button
- Premium dark footer
- Mobile-first responsive

## Implemented (2026-05-06)
- Full single-page landing at `/` with all 9 sections
- Backend: `POST /api/inquiries`, `GET /api/inquiries`, `GET /api/` (inquiries persisted to MongoDB, no `_id` leak)
- Inquiry form with validation, interest chips, toast feedback (sonner)
- Sticky glassmorphism navbar with mobile menu
- WhatsApp floating CTA with pulse glow → opens wa.me link
- Google Maps iframe (dark inverted filter) for Mumbai
- Framer-motion scroll-triggered entrance animations
- Ken-burns hero, brass-gradient text, marquee strip, editorial bento grids
- All interactive elements have `data-testid`
- Tested: 8/8 backend tests passing + frontend E2E verified

## Implemented — Iteration 2 (2026-05-07)
- 6-category Products grid: Brass Rods, Brass Hinges, Tower Bolts, Door Handles, Architectural Hardware, Premium Brass Accessories
- NEW dedicated **Brass Rods — Export Division** section (`#rods`) targeting UAE/GCC/EU/USA buyers
  - 4 rod-type cards: Round, Hex, Square, Custom Profiles with size/grade callouts
  - Master specification table (10 rows: grade, size, length, tolerance, finish, packaging, MOQ, lead time, incoterms, certification)
  - Bulk Export inquiry panel with "Request Export Quote" + "WhatsApp Bulk Inquiry" CTAs
  - Country marquee strip (UAE, KSA, Qatar, Oman, Kuwait, Bahrain, USA, UK, Germany, Italy, Australia, Singapore)
  - 4 export-credentials badges (40+ countries, FOB·CIF·CFR, Export packaging, Mill Test Cert.)
- 5 brass-rod product images **generated via Gemini Nano Banana** (saved to `/app/frontend/public/generated/`)
- Updated navbar with "Export" link, updated footer Collection list, expanded Contact form interest chips (added "Brass Rods · Export", "International / UAE")
- Tested: 10/10 backend + all frontend specs verified

## Implemented — Iteration 3 (2026-05-07)
- Full **bilingual EN / AR** support with persistent language toggle in navbar (desktop + mobile)
- Complete Arabic translations for every section (hero, about, products, rods, why, experience, contact, footer, marquee, whatsapp)
- **RTL layout** with `html[dir="rtl"]`, **Tajawal** font for Arabic, mirrored hero gradient + reversed marquee
- New `I18nProvider` + `useI18n()` hook, `localStorage` persistence (`alux.lang`)
- Backend stores Arabic UTF-8 inquiry data correctly (no schema change needed)
- Tested: **12/12 backend + 14/14 desktop + 11/11 mobile** (Arabic round-trip, RTL, persistence, no overflow)

## Backlog / Not Yet Built
- P1: Admin dashboard to view/export inquiries
- P1: Actual email notification on inquiry submission (Resend/SendGrid)
- P2: Real high-res brand product photography (currently curated stock)
- P2: Multi-page product detail routes with spec sheets / PDFs
- P2: SEO metadata + sitemap + OG tags for social sharing
- P2: Multi-language (Hindi/English) toggle
- P3: Instagram feed integration for Experience section

## Deployment Notes
- Ingress routes `/api/*` → backend 8001; everything else → frontend 3000
- Hot reload enabled; use `sudo supervisorctl restart backend/frontend` on env/deps changes only
