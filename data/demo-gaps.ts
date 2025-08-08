export interface DemoGap {
  id: string
  category: "Civilian" | "Responder" | "Cross-cutting"
  feature: string
  description: string
  priority: "High" | "Medium" | "Low"
  status: "Missing" | "Partial" | "Complete" | "Coming Soon"
  patentRef?: string
  evidenceNeeded: boolean
}

export const DEMO_GAPS: DemoGap[] = [
  // Civilian (HERO CP) Gaps
  {
    id: "civ-001",
    category: "Civilian",
    feature: "Voice Activation",
    description: "Hands-free navigation and emergency activation via voice commands",
    priority: "High",
    status: "Partial",
    patentRef: "Voice Command System",
    evidenceNeeded: true
  },
  {
    id: "civ-002",
    category: "Civilian",
    feature: "Live CPR Guidance",
    description: "Real-time CPR instruction with metronome and cycle counting",
    priority: "High",
    status: "Coming Soon",
    patentRef: "CPR Guidance System",
    evidenceNeeded: true
  },
  {
    id: "civ-003",
    category: "Civilian",
    feature: "Panic Reduction UX",
    description: "Calming colors, breathing exercises, and stress-reducing interface",
    priority: "High",
    status: "Partial",
    evidenceNeeded: true
  },
  {
    id: "civ-004",
    category: "Civilian",
    feature: "TLRT Cultural Overlay",
    description: "Vetted Traditional Lands dataset with cultural protocol prompts",
    priority: "Medium",
    status: "Missing",
    patentRef: "Indigenous Protocol System",
    evidenceNeeded: false
  },
  {
    id: "civ-005",
    category: "Civilian",
    feature: "Offline Resilience",
    description: "Full offline functionality with sync when reconnected",
    priority: "High",
    status: "Partial",
    evidenceNeeded: false
  },

  // Responder (HERO OS) Gaps
  {
    id: "resp-001",
    category: "Responder",
    feature: "Vitals & Scene Data (110)",
    description: "Complete vitals capture panel with AED/CPR event logging",
    priority: "High",
    status: "Partial",
    patentRef: "FIG 1: Vitals & Scene Data 110",
    evidenceNeeded: false
  },
  {
    id: "resp-002",
    category: "Responder",
    feature: "Access Medical Record (112)",
    description: "Field-level consent with revocation and audit trail",
    priority: "High",
    status: "Partial",
    patentRef: "FIG 1: Access Medical Record 112",
    evidenceNeeded: false
  },
  {
    id: "resp-003",
    category: "Responder",
    feature: "Start Incident Report (118)",
    description: "Timeline capture with PDF/MD export and professional handoff",
    priority: "Medium",
    status: "Partial",
    patentRef: "FIG 1: Start Incident Report 118",
    evidenceNeeded: false
  },
  {
    id: "resp-004",
    category: "Responder",
    feature: "Task Timers (116)",
    description: "Per-task timing (CPR cycles, medication administration)",
    priority: "Medium",
    status: "Partial",
    patentRef: "FIG 1: Timers 116",
    evidenceNeeded: false
  },
  {
    id: "resp-005",
    category: "Responder",
    feature: "Notes/Checklist (120/122)",
    description: "Protocol-bound checklists with completion state tracking",
    priority: "Medium",
    status: "Partial",
    patentRef: "FIG 4: Notes/Checklist 120/122",
    evidenceNeeded: false
  },
  {
    id: "resp-006",
    category: "Responder",
    feature: "Multi-Agency Command",
    description: "EMS/Fire/Police coordination with roles and dispatch integration",
    priority: "Medium",
    status: "Missing",
    evidenceNeeded: false
  },
  {
    id: "resp-007",
    category: "Responder",
    feature: "Live Audio/Video",
    description: "Multimodal communication with consent gating",
    priority: "Low",
    status: "Coming Soon",
    evidenceNeeded: true
  },

  // Cross-cutting Gaps
  {
    id: "cross-001",
    category: "Cross-cutting",
    feature: "Legal Copy Centralization",
    description: "Single source of truth for disclaimers applied app-wide",
    priority: "High",
    status: "Complete",
    evidenceNeeded: false
  },
  {
    id: "cross-002",
    category: "Cross-cutting",
    feature: "Accessibility AA Compliance",
    description: "Skip links, focus states, reduced motion, high contrast",
    priority: "High",
    status: "Partial",
    evidenceNeeded: true
  },
  {
    id: "cross-003",
    category: "Cross-cutting",
    feature: "Elder Protocol Override",
    description: "Governance toggle with audit trail for cultural protocols",
    priority: "Medium",
    status: "Complete",
    evidenceNeeded: false
  },
  {
    id: "cross-004",
    category: "Cross-cutting",
    feature: "Security Posture",
    description: "Auth, RBAC, encryption at rest, comprehensive audit logs",
    priority: "High",
    status: "Missing",
    evidenceNeeded: false
  },
  {
    id: "cross-005",
    category: "Cross-cutting",
    feature: "Evidence Linking",
    description: "Research citations on all critical decision points",
    priority: "Medium",
    status: "Missing",
    evidenceNeeded: true
  },
  {
    id: "cross-006",
    category: "Cross-cutting",
    feature: "Internationalization",
    description: "Full EN/FR support with Indigenous language integration",
    priority: "Medium",
    status: "Missing",
    evidenceNeeded: false
  }
]
