export type CheckinStatus = "safe" | "need_help" | "cant_evacuate"

export interface SafetyCheckInPayload {
  id: string
  createdAt: string // ISO
  status: CheckinStatus
  note?: string
  dependents?: number
  mobilityNeeds?: boolean
  language?: string
  shareLocation: boolean
  location?: {
    lat: number
    lng: number
    accuracy?: number
  } | null
  territory?: string | null
  consentCommunityShare: boolean
  userAlias?: string // anonymous-friendly alias
  assignment?: {
    responderId?: string
    responderName?: string
    state?: "unassigned" | "claimed" | "en_route" | "arrived" | "completed"
    updatedAt?: string
  }
}
