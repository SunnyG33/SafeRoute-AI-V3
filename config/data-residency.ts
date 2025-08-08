export type DataResidencyPolicy = {
  // If true, never send PHI/PII or incident payloads off Canadian soil.
  CA_DATA_RESIDENCY_STRICT: boolean
  // If true, only allow remote cache for non-sensitive, short-lived data.
  REMOTE_CACHE_ONLY_EPHEMERAL: boolean
  // Redaction for logs in strict mode.
  REDACT_LOGS: boolean
}

// Map your own categories as needed.
export type Sensitivity =
  | "PHI"           // Health info
  | "PII"           // Personally identifiable info
  | "LOCATION"      // High precision location
  | "INCIDENT_LOG"  // Incident transcripts/events
  | "EPHEMERAL"     // Non-sensitive, short-lived
  | "OTHER"

export const residencyPolicy: DataResidencyPolicy = {
  CA_DATA_RESIDENCY_STRICT:
    process.env.CA_DATA_RESIDENCY_STRICT?.toLowerCase() === "true",
  REMOTE_CACHE_ONLY_EPHEMERAL:
    process.env.REMOTE_CACHE_ONLY_EPHEMERAL?.toLowerCase() !== "false",
  REDACT_LOGS: process.env.REDACT_LOGS?.toLowerCase() !== "false",
}

export function canSendRemote(kind: Sensitivity): boolean {
  const { CA_DATA_RESIDENCY_STRICT, REMOTE_CACHE_ONLY_EPHEMERAL } = residencyPolicy

  if (!CA_DATA_RESIDENCY_STRICT) {
    // No strict residency: allow as configured by cache policy.
    if (!REMOTE_CACHE_ONLY_EPHEMERAL) return true
    return kind === "EPHEMERAL"
  }

  // Strict residency rules:
  switch (kind) {
    case "PHI":
    case "PII":
    case "INCIDENT_LOG":
      return false
    case "LOCATION":
      // Allow only if approximate/coarsened location AND explicitly flagged as EPHEMERAL elsewhere.
      return false
    case "EPHEMERAL":
      return true
    default:
      return false
  }
}

export function maybeRedact<T extends Record<string, any>>(obj: T): T {
  if (!residencyPolicy.REDACT_LOGS) return obj
  const clone: any = { ...obj }
  for (const k of Object.keys(clone)) {
    if (/(name|email|phone|address|allerg|medic|condition|blood|age)/i.test(k)) {
      clone[k] = "[REDACTED]"
    }
    if (/lat|lng|location|coords|coordinate|gps/i.test(k)) {
      clone[k] = "[REDACTED]"
    }
  }
  return clone
}
