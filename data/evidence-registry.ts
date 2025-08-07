export type EvidenceSource = {
  path: string
  why: string
}

export type EvidenceEntry = {
  title: string
  description?: string
  sources: EvidenceSource[]
}

export const evidenceRegistry: Record<string, EvidenceEntry> = {
  "civilian-portal": {
    title: "Civilian Portal",
    description:
      "Consent-first safety check-ins with optional location, TLRT territory recognition, elder-friendly and accessible UI.",
    sources: [
      { path: "wireframes/design-system/ACCESSIBILITY-STANDARDS.md", why: "Tap targets, contrast, elder-friendly text and layout" },
      { path: "wireframes/design-system/COLOR-BLIND-ACCESSIBILITY-STANDARDS.md", why: "Non-color-only signaling and palettes" },
      { path: "wireframes/design-system/INDIGENOUS-CULTURAL-GUIDELINES.md", why: "Territory acknowledgment and cultural protocol design" },
      { path: "WHOSE-LAND-AM-I-ON-FEATURE-SPEC.md", why: "TLRT/territory recognition feature intent" },
      { path: "BETA-DISCLAIMERS-LEGAL-NOTICES.md", why: "Consent-first and medical liability disclaimers" },
      { path: "technical-architecture/SAFEROUTE-AI-TECHNICAL-ARCHITECTURE.md", why: "Offline-first, satellite failover posture" },
      { path: "product-specifications/SAFEROUTE-AI-PRODUCT-SPECIFICATIONS.md", why: "Module scope and guardrails" }
    ]
  },
  "responder-portal": {
    title: "Responder Portal",
    description:
      "Assignment workflow (claim → en route → arrived → completed), live feed, consent-aware data handling.",
    sources: [
      { path: "wireframes/design-system/ACCESSIBILITY-STANDARDS.md", why: "Keyboard nav, readable density, live region cues" },
      { path: "BETA-DISCLAIMERS-LEGAL-NOTICES.md", why: "Not a substitute for official dispatch; informational only" },
      { path: "technical-architecture/SAFEROUTE-AI-TECHNICAL-ARCHITECTURE.md", why: "Operational constraints and reliability posture" }
    ]
  },
  "hero-mode": {
    title: "HERO + HERO OS",
    description: "Evidence-based first aid guidance, AED workflows, CPR loop, and professional handoff.",
    sources: [
      { path: "HERO-MODE-CPR-FINAL-SPECIFICATIONS.md", why: "Clinical protocol source and UX guardrails" },
      { path: "BETA-DISCLAIMERS-LEGAL-NOTICES.md", why: "Non-diagnostic, 911-first disclaimers" }
    ]
  },
  "bodyguard": {
    title: "BodyGuard Broadcasts",
    description: "Geo-targeted broadcasts and audit with consent and cultural protocols.",
    sources: [
      { path: "wireframes/design-system/INDIGENOUS-CULTURAL-GUIDELINES.md", why: "Cultural protocol alignment for messaging" },
      { path: "BETA-DISCLAIMERS-LEGAL-NOTICES.md", why: "Public-warning and routing liability context" }
    ]
  },
  "government-dashboard": {
    title: "Government Dashboard",
    description: "EOC operations and reporting with accessible, screen-reader-friendly visualizations.",
    sources: [
      { path: "wireframes/government-dashboard/01-EMERGENCY-MANAGEMENT-DASHBOARD.md", why: "Primary EOC patterns" },
      { path: "wireframes/design-system/ACCESSIBILITY-STANDARDS.md", why: "Pro accessibility patterns for data viz" }
    ]
  },
  "raptrnav": {
    title: "RAPTRnav (Emergency Routing)",
    description: "Patient-condition-aware routing, intake capacity matching, disaster-aware navigation.",
    sources: [
      { path: "technical-architecture/SAFEROUTE-AI-TECHNICAL-ARCHITECTURE.md", why: "Routing constraints and failover" },
      { path: "BETA-DISCLAIMERS-LEGAL-NOTICES.md", why: "Routing is advisory; local ordinances override" }
    ]
  },
  "lab": {
    title: "LAB (Last Active Beacon)",
    description: "Encrypted satellite beacon with offline-first posture.",
    sources: [
      { path: "technical-architecture/SAFEROUTE-AI-TECHNICAL-ARCHITECTURE.md", why: "Security, encryption, sovereignty" },
      { path: "legal/IP-PROTECTION-MASTER-STRATEGY.md", why: "Approach to sensitive data and governance" }
    ]
  },
  "sharesafe": {
    title: "ShareSafe (Medical Data Highway)",
    description: "HIPAA-like consent and secure exchange during emergencies.",
    sources: [
      { path: "product-specifications/SAFEROUTE-AI-PRODUCT-SPECIFICATIONS.md", why: "Scope and consent requirements" },
      { path: "BETA-DISCLAIMERS-LEGAL-NOTICES.md", why: "Data and medical liability guardrails" }
    ]
  },
  "logiq": {
    title: "LOGIQ (AI Brain)",
    description: "Evidence ingestion and predictive algorithms with cultural safeguards.",
    sources: [
      { path: "technical-architecture/SAFEROUTE-AI-TECHNICAL-ARCHITECTURE.md", why: "AI use, monitoring, and safety posture" },
      { path: "wireframes/design-system/INDIGENOUS-CULTURAL-GUIDELINES.md", why: "Cultural considerations for AI" }
    ]
  }
}
