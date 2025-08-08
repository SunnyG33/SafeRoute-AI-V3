export type CheckInStatus = "submitted" | "claimed" | "enroute" | "arrived" | "completed"

export type CheckIn = {
  id: string
  name: string
  phone?: string
  message?: string
  lat?: number
  lng?: number
  createdAt: string
  status: CheckInStatus
}
