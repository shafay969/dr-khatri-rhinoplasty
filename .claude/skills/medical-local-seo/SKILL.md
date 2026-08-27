---
name: medical-local-seo
description: SEO methodology for this rhinoplasty/plastic surgery practice site — local search, YMYL/E-E-A-T compliance, schema.org structured data, and SPA technical SEO. Use whenever adding pages, blog posts, FAQs, or auditing search visibility for this project.
---

# Medical / Local SEO for This Site

Researched 2026-08-24 for the Dr. Vijay Khatri rhinoplasty site (Karachi). Re-verify anything time-sensitive (Google algorithm specifics, schema property support) before relying on it more than a few months out.

## The non-negotiable constraint: this is YMYL content

Google classifies medical/health content as **Your Money or Your Life (YMYL)** and applies its strictest quality-rater standards to it — stricter than almost any other content category. Two consequences that override normal SEO instinct:

1. **Never fabricate facts to fill out schema or copy.** Structured data (`Physician`, `MedicalBusiness`, review counts, credentials, statistics) must match real, verifiable facts on the page. Mismatched or invented structured data is a spam-policy violation, not just an ethical problem — it can trigger manual action.
2. **Author/credential transparency is now a ranking input, not a nice-to-have.** Every piece of medical content should make it obvious who wrote/reviewed it and why they're qualified — name, board certification, years of experience — near the top, not buried in a footer.

Before writing schema or copy that asserts a business fact (address, phone, years in practice, procedure counts, certifications), confirm it's real. This project's `src/data/stats.ts` and `Contact.tsx` had placeholder demo values as of 2026-08 — check current file contents, don't assume they're still placeholders forever, but also don't assume they've become real without confirming with the user.

## E-E-A-T checklist for every new page/post

- **Experience**: first-person, specific scenarios ("At least a couple of times a month, someone tells me...") beat generic claims.
- **Expertise**: ties back to real, stated credentials — don't invent new ones per-post.
- **Authoritativeness**: internal links between related content (blog ↔ FAQ ↔ service pages) signal topical depth.
- **Trustworthiness**: accurate, non-oversold claims; acknowledge trade-offs and limitations rather than only selling.

## Technical SEO baseline for this SPA

This is a Vite + React Router (CSR) site. Out of the box, a pure CSR SPA serves **one static `<title>`/`<meta description>`** for every route — a real, significant ranking handicap since Google can't easily tell pages apart pre-render.

Two layers, in priority order:

1. **Per-route meta via `react-helmet-async`** — every route needs a unique `<title>`, `<meta name="description">`, and `<link rel="canonical">`. Non-negotiable minimum; do this even if prerendering isn't set up.
2. **Static prerendering** (`vite-react-ssg` for React Router v6, or React Router v7's native SSG if the project ever upgrades) — generates real static HTML per route at build time so search engines get full content without executing JS. This is a real architectural change (App.tsx routes move from JSX `<Routes>` to an exported `RouteRecord[]`, entry point changes from `ReactDOM.createRoot` to `ViteReactSSG`) — test the build thoroughly against the existing `AnimatePresence`/`useLocation()` page-transition pattern and any component touching `window`/`localStorage`/`IntersectionObserver` at module-eval time (must be inside effects/refs, not top-level) before treating it as done. Do NOT use user-agent-based "dynamic rendering" (serving bots different content than users) — Google explicitly discourages that; true build-time SSG ships identical HTML to everyone, which is fine.

## Structured data (JSON-LD) priority order

1. **`FAQPage`** — safe to add immediately; it should mirror `src/data/faqs.ts` exactly, one `Question`/`acceptedAnswer` pair per FAQ. High value: eligible for rich results, and AI answer engines can extract Q&A pairs directly.
2. **`BlogPosting`** — one per post in `src/data/blog.ts`, mirroring title/date/author/description already on the page. Safe — it's just structuring what's already rendered.
3. **`Physician` + `MedicalBusiness`** (site-wide, Home/About/Contact) — **blocked until real NAP (name/address/phone), hours, and credentials are confirmed.** This is the highest-value schema for local pack ranking but also the highest-risk if wrong.

## Local SEO (the part code can't do alone)

On-page/technical work is necessary but not sufficient for "always show on top" for `rhinoplasty surgeon Karachi`-type queries. The dominant ranking factor for local intent queries is the **Google Business Profile**, not the website:

- Primary category `Plastic Surgeon` / `Facial Plastic Surgeon`, with every procedure listed as a service with a keyword-rich description.
- Steady review velocity (built into the post-op follow-up sequence) and responding to every review.
- NAP consistency across the GBP, website schema, and any directory citations.
- Local content: area/neighborhood pages, not just service pages.

None of this is something a codebase change accomplishes — flag it to the user as a parallel, ongoing effort, not a one-time code task. No one (including Google) can honestly promise a search ranking is guaranteed or permanent; frame progress as "materially improves ranking odds," not "guarantees #1."

## Content/copy voice for this specific site

Match the existing blog voice: direct first-person from Dr. Khatri, concrete scenarios over generic claims, acknowledges trade-offs, no "in today's fast-paced world"-style filler. See `src/data/blog.ts` for calibration before writing new posts.
