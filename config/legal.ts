export type LegalContextKey = "beta" | "emergency" | "routing" | "ai-assist"

export const legalCopy: Record<LegalContextKey, string> = {
  beta:
    "Beta software: features are experimental and subject to change. Do not rely solely on this app in emergencies.",
  emergency:
    "Emergency guidance is informational only. Call local emergency services first. Follow professional instructions.",
  routing:
    "Routing estimates may be inaccurate during disasters. Verify conditions and follow official advisories.",
  "ai-assist":
    "AI assistance may be incorrect. Review critical steps and use human judgment. You are responsible for actions taken.",
}
