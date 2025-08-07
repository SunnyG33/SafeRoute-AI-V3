import type { AlertRecord, AuditEvent } from "@/types/alert"

export const DB_ALERTS: AlertRecord[] = []
export const DB_AUDIT: AuditEvent[] = []

export function genId() {
  return Math.random().toString(36).slice(2, 10)
}
