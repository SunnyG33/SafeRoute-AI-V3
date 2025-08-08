import type { Incident, IncidentEvent } from "@/components/hero/incident-types"

// Global in-memory store shared across routes in this module
let INCIDENTS: Incident[] = []
let EVENTS: IncidentEvent[] = []

export function getStore() {
  return { INCIDENTS, EVENTS }
}

export function setStore(next: { INCIDENTS?: Incident[]; EVENTS?: IncidentEvent[] }) {
  if (next.INCIDENTS) INCIDENTS = next.INCIDENTS
  if (next.EVENTS) EVENTS = next.EVENTS
}
