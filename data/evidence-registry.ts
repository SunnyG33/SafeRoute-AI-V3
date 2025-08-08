export type EvidenceItem = {
  title: string
  path: string
  note?: string
}

export type ModuleKey =
  | "civilian-portal"
  | "responder-portal"
  | "hero-mode"
  | "bodyguard"
  | "government-dashboard"
  | "routing"
  | "tlrt"

export const evidenceRegistry: Record<ModuleKey, EvidenceItem[]> = {
  "civilian-portal": [
    { title: "Accessibility Standards", path: "wireframes/design-system/ACCESSIBILITY-STANDARDS.md" },
    { title: "Color Blind Accessibility", path: "wireframes/design-system/COLOR-BLIND-ACCESSIBILITY-STANDARDS.md" },
    { title: "Indigenous Cultural Guidelines", path: "wireframes/design-system/INDIGENOUS-CULTURAL-GUIDELINES.md" },
    { title: "Product Specs", path: "product-specifications/SAFEROUTE-AI-PRODUCT-SPECIFICATIONS.md" },
    { title: "Legal Notices", path: "BETA-DISCLAIMERS-LEGAL-NOTICES.md" },
  ],
  "responder-portal": [
    { title: "Technical Architecture", path: "technical-architecture/SAFEROUTE-AI-TECHNICAL-ARCHITECTURE.md" },
    { title: "Government Dashboard Wireframes", path: "wireframes/government-dashboard/01-EMERGENCY-MANAGEMENT-DASHBOARD.md" },
    { title: "Legal Notices", path: "BETA-DISCLAIMERS-LEGAL-NOTICES.md" },
  ],
  "hero-mode": [
    { title: "HERO Mode Specification", path: "product-specifications/HERO-MODE-COMPLETE-SPECIFICATION.md" },
    { title: "CPR Guide", path: "app/cpr-guide/page.tsx", note: "Prototype guidance mapping" },
  ],
  bodyguard: [
    { title: "BodyGuard Concept", path: "components/bodyguard/broadcast-console.tsx", note: "Prototype UI" },
    { title: "Integration Checklist", path: "INTEGRATION-CHECKLIST.md" },
  ],
  "government-dashboard": [
    { title: "Emergency Management Dashboard", path: "wireframes/government-dashboard/01-EMERGENCY-MANAGEMENT-DASHBOARD.md" },
  ],
  routing: [
    { title: "Routing Concept (RAPTRnav)", path: "WHOSE-LAND-AM-I-ON-FEATURE-SPEC.md", note: "Includes considerations" },
  ],
  tlrt: [
    { title: "Whose Land Am I On - Feature Spec", path: "WHOSE-LAND-AM-I-ON-FEATURE-SPEC.md" },
    { title: "Indigenous Cultural Guidelines", path: "wireframes/design-system/INDIGENOUS-CULTURAL-GUIDELINES.md" },
  ],
}
