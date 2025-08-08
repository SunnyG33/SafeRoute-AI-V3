// Simple, robust in-memory consent store for demos.
// No Node-only imports. Safe in Next.js App Router and Next.js.

export type ConsentItem = {
  token: string
  fields: string[]
  note?: string
  issuedAt: number
  revokedAt?: number
}

type Store = Record<string, ConsentItem[]>

// Module-scoped singleton
const consentDB: Store = {}

// Helpers
function uid(prefix = "cns"): string {
  // Use web crypto if available; fallback to Math.random
  try {
    const arr = new Uint8Array(16)
    globalThis.crypto?.getRandomValues?.(arr)
    const hex = Array.from(arr)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
    return `${prefix}_${hex.slice(0, 12)}`
  } catch {
    return `${prefix}_${Math.random().toString(36).slice(2, 12)}`
  }
}

function getList(incidentId: string): ConsentItem[] {
  if (!consentDB[incidentId]) consentDB[incidentId] = []
  return consentDB[incidentId]
}

// API
export async function listConsent(incidentId: string): Promise<ConsentItem[]> {
  // Return a shallow copy to avoid external mutation
  return [...getList(incidentId)]
}

export async function issueConsent(
  incidentId: string,
  fields: string[] = [],
  note?: string,
): Promise<ConsentItem> {
  const item: ConsentItem = {
    token: uid("tok"),
    fields: Array.isArray(fields) ? fields : [],
    note: typeof note === "string" && note.trim() ? note.trim() : undefined,
    issuedAt: Date.now(),
  }
  getList(incidentId).push(item)
  return item
}

export async function revokeConsent(incidentId: string, token: string): Promise<boolean> {
  const list = getList(incidentId)
  const it = list.find((i) => i.token === token)
  if (!it) return false
  if (!it.revokedAt) it.revokedAt = Date.now()
  return true
}

// Optional utility for tests/demos
export function _resetConsentStore() {
  for (const k of Object.keys(consentDB)) delete consentDB[k]
}
