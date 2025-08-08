export type Role = "civilian" | "responder" | "system"
export type IncidentStatus = "open" | "en_route" | "arrived" | "completed" | "closed"

export interface IncidentParticipant {
  id: string
  role: Role
  name?: string
  connected?: boolean
}

export interface Incident {
  id: string
  createdAt: number
  updatedAt: number
  status: IncidentStatus
  participants: IncidentParticipant[]
  checkinId?: string
  meta?: Record<string, any>
}

export interface IncidentEvent {
  id: string
  incidentId: string
  at: number
  type: string // "message" | "status" | "location" | "med_request" | "med_share"
  from?: Role
  payload?: any
}

const incidents = new Map<string, Incident>()
const eventStore = new Map<string, IncidentEvent[]>()

function uid(prefix = "") {
  // Prefer crypto.randomUUID when available
  // @ts-expect-error: crypto typing may be missing in this sandbox
  if (typeof crypto !== "undefined" && crypto.randomUUID) return (prefix ? `${prefix}_` : "") + crypto.randomUUID()
  return (prefix ? `${prefix}_` : "") + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function listIncidents(): Incident[] {
  return Array.from(incidents.values()).sort((a, b) => b.updatedAt - a.updatedAt)
}

export function createIncident(participants: IncidentParticipant[] = [], meta?: Incident["meta"]): Incident {
  const now = Date.now()
  const inc: Incident = {
    id: uid("inc"),
    createdAt: now,
    updatedAt: now,
    status: "open",
    participants: participants.map((p, i) => ({
      id: p.id || uid("p"),
      role: p.role,
      name: p.name?.slice(0, 80),
      connected: p.connected ?? true,
    })),
    meta: meta ?? {},
  }
  incidents.set(inc.id, inc)
  eventStore.set(inc.id, [
    {
      id: uid("evt"),
      incidentId: inc.id,
      at: now,
      type: "status",
      from: "system",
      payload: { status: "Incident created" },
    },
  ])
  return inc
}

export function getIncident(id: string): Incident | undefined {
  return incidents.get(id)
}

export function updateIncident(id: string, patch: Partial<Pick<Incident, "status" | "participants" | "meta">>): Incident | undefined {
  const curr = incidents.get(id)
  if (!curr) return undefined
  const updated: Incident = {
    ...curr,
    ...patch,
    updatedAt: Date.now(),
  }
  incidents.set(id, updated)
  return updated
}

export function setStatus(id: string, status: IncidentStatus): Incident | undefined {
  const inc = updateIncident(id, { status })
  if (inc) {
    addEvent(id, { type: "status", from: "system", payload: { status } })
  }
  return inc
}

export function addEvent(
  incidentId: string,
  e: Omit<IncidentEvent, "id" | "incidentId" | "at"> & { at?: number },
): IncidentEvent {
  const ev: IncidentEvent = {
    id: uid("evt"),
    incidentId,
    at: e.at ?? Date.now(),
    type: e.type,
    from: e.from,
    payload: e.payload,
  }
  const arr = eventStore.get(incidentId) ?? []
  arr.push(ev)
  eventStore.set(incidentId, arr)
  const inc = incidents.get(incidentId)
  if (inc) inc.updatedAt = ev.at
  return ev
}

export function getEventsSince(incidentId: string, since = 0): { events: IncidentEvent[]; now: number } {
  const arr = eventStore.get(incidentId) ?? []
  const filtered = since ? arr.filter((e) => e.at > since) : arr.slice(-100)
  return { events: filtered, now: Date.now() }
}
