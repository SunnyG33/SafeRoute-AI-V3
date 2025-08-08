export type Role = "civilian" | "responder"

export type IncidentStatus = "open" | "closed"

export interface Participant {
  id: string
  role: Role
  name?: string
  connected: boolean
}

export interface Incident {
  id: string
  createdAt: number
  updatedAt: number
  status: IncidentStatus
  checkinId?: string
  participants: Participant[]
  lastEventAt: number
}

export type EventType =
  | "message"
  | "status"
  | "location"
  | "consent"
  | "vitals"
  | "action"
  | "note"
  | "timer"

export interface IncidentEvent {
  id: string
  incidentId: string
  at: number
  type: EventType
  from: Role
  payload: any
}
