export type AlertType = "evacuation" | "shelter" | "warning" | "info" | "all-clear"
export type AlertSeverity = "critical" | "high" | "medium" | "low"
export type AlertStatus = "active" | "cancelled" | "expired"

export interface GeoCircle {
  lat: number
  lng: number
  radiusMeters: number
}

export interface AlertRecord {
  id: string
  createdAt: number
  updatedAt: number
  status: AlertStatus
  type: AlertType
  severity: AlertSeverity
  title: string
  message: string
  area?: GeoCircle | null
  languages: string[]
  channels: string[] // e.g., ["push","sms","radio","satellite","LAB"]
  source: string // e.g., "EOC Operator #12"
  expiresAt?: number | null
}

export type AuditActor = "responder" | "system" | "admin" | "civilian"

export type AuditAction = "create" | "update" | "cancel" | "expire" | "rebroadcast" | "sos"

export interface AuditEvent {
  id: string
  alertId?: string | null
  timestamp: number
  actor: AuditActor
  action: AuditAction
  detail?: string
}
