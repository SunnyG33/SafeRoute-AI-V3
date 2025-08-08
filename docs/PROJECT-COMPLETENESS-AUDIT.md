# SafeRoute AI — Project Completeness Audit (Front-to-Back)

Last updated: 2025-08-07

This document provides a pragmatic, evidence-based assessment of implementation completeness across the app. It highlights demo-ready areas, production gaps, and a prioritized path to ship safely.

---

## Executive Summary

- Overall: 55% complete for polished demo; ~20-25% for production (PHI-friendly) without additional work.
- Core strengths:
  - Next.js App Router structure with shared providers, shadcn/ui, and Tailwind.
  - Live “Hero” civilian/responder flows with a local incident event bus and offline queue scaffolding.
  - Business/Grants content explorer and a comprehensive library of planning docs.
  - PWA and service worker baseline, accessibility scaffolding (skip links), and a Demo Gaps audit app.

- Primary blockers for production:
  1) Persistence: In-memory stores (alerts, incidents, events) — no durable DB or message bus.
  2) Security: No authentication/RBAC, no request signing, and no rate-limiting.
  3) PHI posture: No encryption at rest, audit trails are ephemeral, consent/medical share not persisted or revocable post-session.
  4) Data residency: Safe cache/residency helpers exist, but not consistently enforced across data paths.
  5) Integrations: AED finder uses mock data; maps/routing not wired to a live provider.
  6) QA/Observability: Minimal tests; no structured logging/metrics/traces.

---

## Scoring Overview

- Demo completeness: 55%
- Production readiness (PHI-aware): 20–25%
- Accessibility (WCAG AA): ~60% (good scaffolding; needs systematic audit)
- Offline resilience: ~50% (service worker + queue present; needs end-to-end testing and retry semantics)
- Data residency enforcement: ~40% (policy+safe cache added; needs integration coverage)
- i18n: ~25% (providers present; content not localized)
- Security posture: ~20% (no auth/RBAC; open APIs; no secrets hardening)

---

## Frontend (App Router + UI)

Status: Demo-ready foundation; UX is on a good trajectory for high-stress use but can be simplified further.

- Routing/Layout
  - App Router with global providers in `app/layout.tsx`.
  - `app/page.tsx` redirects to `/landing` (ensure `app/landing/page.tsx` exists & loads reliably).
- Key Flows
  - Hero Mode (civilian/responder) live sessions with incident messaging and event polling (working demo).
  - AED Finder Complete: polished high-visibility UI with mock data; map is a visual placeholder.
  - Business/Grants document explorer: real file-system-backed reader with Markdown/HTML rendering.
  - Demo Gaps dashboard: helpful internal tooling to track scope.
- UI/UX for high-stress:
  - Strong emphasis on contrast/legibility, large touch targets in emergency screens, and simplified action sets.
  - Calming/voice guidance scaffolding planned; continue reducing cognitive load (progressive disclosure, fewer choices per screen).

Gaps:
- Replace AED mock list with live geospatial data + routing (and accessibility hours/verification).
- Add truly “one-choice-at-a-time” emergency flows and optional calming overlay/voice prompts across the flow.
- Standardize jumbo text toggles and reduced motion options globally.

---

## Backend APIs and Data Model

Status: Local-first demo; not durable.

- In-memory stores:
  - Alerts: `app/api/alerts/route.ts` uses `lib/memory-db`.
  - Incidents/events: `lib/incident-store.ts` used by incident APIs; no DB.
- Business docs API:
  - File system listing and reading are implemented for allowed roots and md/html rendering.
- Offline:
  - `public/sw.js` and `lib/offline-queue.ts` exist; semantics are “good baseline” but need retries/backoff and conflict resolution decisions.

Gaps:
- Database: Provision a managed DB (Postgres/Neon or Supabase) for incidents, participants, events, audit, consent tokens, and immutable report exports.
- Message/Event streaming: Move from polling to SSE/WebSockets (post-auth) for lower-latency bi-directional comms.
- Validation: Add Zod schemas for all route payloads and return shapes, with RFC-7807 error responses.

---

## Security, Privacy, and PHI Posture

Status: Demo. Not production-safe for PHI.

- Missing:
  - AuthN/AuthZ (JWT or provider-based + role claims).
  - RBAC per route and record (civilian, responder, admin).
  - Signed URLs or capability tokens for live sessions.
  - Rate-limiting/DoS protection.
  - Structured encryption at rest for PHI + KMS wrap; field-level access policies.
  - Full audit log persistence and tamper-evident trail.

Recommendations:
- Introduce auth (e.g., NextAuth or custom JWT), strict route guards, and role-checked server actions.
- Encrypt sensitive fields at rest; centralize secrets and rotate regularly.
- Add IP-based and token bucket rate limits on public APIs.
- Start an immutable audit ledger for incident state changes, consent grants/revocations, and data access.

---

## Data Residency (Canada) and Caching

Status: Helper layer added; needs integration.

- `config/data-residency.ts` and `lib/safe-cache.ts` give you:
  - Policy switches (CA_DATA_RESIDENCY_STRICT, REMOTE_CACHE_ONLY_EPHEMERAL, REDACT_LOGS).
  - Sensitivity tagging and remote cache gating.
- What’s left:
  - Tag each data path (e.g., incident events “INCIDENT_LOG”, medical “PHI”, location “LOCATION”) and route all cache calls through `safeCache*`.
  - If strict residency is required, use a CA-region DB/Redis for durable data; keep Upstash/remote cache for EPHEMERAL only (or disable remote caching).
- Note on AI features:
  - If/when integrating AI (triage drafting, summarization), use the AI SDK which standardizes providers and models via a unified API [^1].

---

## Offline and PWA

Status: Foundation present.

- Service worker handles cache-first GET; offline queue stubs for POST.
- Manifest included; needs systematic offline QA for emergency flows (send-later, retries, de-duplication).
- Add “sync state” UI for queued actions and conflict resolution rules (e.g., last-write-wins vs. merge).

---

## Accessibility and i18n

Status: Good start; needs enforcement.

- Accessibility:
  - Skip link in layout, solid contrast in emergency views, larger controls in critical flows.
  - Action: Audit with axe and Lighthouse; ensure focus management, ARIA semantics, prefers-reduced-motion, and minimum 44x44 touch targets across the board.
- i18n:
  - Providers exist; content is mostly English.
  - Action: Externalize strings, add EN/FR bundles; plan for Indigenous language modules (scoped rollouts).

---

## Observability and Testing

Status: Minimal.

- Add: structured logging, redaction (align with `REDACT_LOGS`), request IDs, and per-incident correlation IDs.
- Metrics: latency, error rates, queue depth, offline retries.
- Traces: wire to a vendor (OpenTelemetry compatible).
- Testing: unit tests for stores/APIs; integration tests for critical flows (CPR/AED/911); synthetic monitoring for uptime and 911-sim.

---

## Performance

Status: Good baseline with modern Next.js and shadcn/ui.

- Action: Enable React Profiler for critical flows, bundle analyze, and image optimization.
- Ensure no unnecessary client components; prefer server components where feasible.

---

## Known Risks and Placeholders

- Many files in the repo are planning docs or “visual references”; that’s fine for process, but code that still uses mock data (AED, maps) must be replaced before pilots.
- Incident and alert stores are in-memory — demo-only.
- “Hero Mode” has strong UI; ensure it degrades gracefully when offline (and resumes) and that call-to-911 is always prominent.

---

## Priority Action Plan

1) Foundation (1–2 weeks)
- Provision CA-region DB (Neon/Supabase) for incidents, events, audit, consent.
- Introduce auth/RBAC; lock down APIs.
- Replace polling with SSE/WebSockets (post-auth).
- Wire residency policy to all caches and logs; disable remote caching for sensitive classes.

2) Emergency UX & Data (1–2 weeks)
- Integrate live maps (MapLibre/Leaflet) and routing; plug real AED data source.
- Add calming overlay/voice guidance toggles globally with progressive disclosure.
- Offline POST queue: retries, status UI, and idempotency keys.

3) Compliance & Quality (1–2 weeks)
- Encryption at rest, audit log immutability, consent revocation mechanics.
- Accessibility/i18n hardening; stripe through all critical flows.
- Logging/metrics/traces; CI with unit/integration tests and Lighthouse checks.

---

## Quick Readiness Matrix

- Civilian Live Flow (Hero CP): Demo-ready
- Responder Console (Hero OS): Demo-ready
- AED Finder: UI-ready with mock data; needs live map/data + routing
- 911 Simulation: Demo-ready; integrate with event bus & audit
- Business/Grant Docs: Production-ready (static reading)
- Alerts API: Demo-only (in-memory)
- Incidents/Events API: Demo-only (in-memory)
- Offline/PWA: Beta
- Residency enforcement: Partial
- Security (auth/RBAC/limits): Missing
- Accessibility: Partial
- i18n: Partial
- Tests/Observability: Missing

---

## Notes on AI Integration (future)
If you add AI features (e.g., dispatcher summaries, debriefs), use the Vercel AI SDK for a unified, provider-agnostic interface (generation/streaming, tool calls) [^1]. Keep PHI out of prompts unless consented, redact logs, and store derived artifacts in the CA-region datastore.

[^1]: AI SDK overview and usage: https://sdk.vercel.ai
