export type CheckinStatus = "safe" | "need_help" | "cant_evacuate"

export type AssignmentStatus =
  | "unassigned"
  | "claimed"
  | "en_route"
  | "arrived"
  | "completed"

export interface LocationInfo {
  lat: number
  lng: number
  accuracy?: number
  territory?: string
}

export interface DependentsInfo {
  children: boolean
  elders: boolean
  pets: boolean
}

export type MobilityLevel = "none" | "limited" | "wheelchair" | "bedbound"

export interface Checkin {
  id: string
  createdAt: number
  updatedAt: number
  status: CheckinStatus
  name?: string
  contact?: string
  language?: string
  notes?: string
  location: LocationInfo | null
  mobility?: MobilityLevel
  dependents?: DependentsInfo
  assignedTo?: string | null
  assignmentStatus: AssignmentStatus
}
