import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types (generated from schema)
export type UserRole = "citizen" | "elder" | "responder" | "government" | "admin"
export type UserStatus = "active" | "inactive" | "suspended" | "pending"
export type IncidentStatus = "reported" | "dispatched" | "in_progress" | "resolved" | "closed"
export type IncidentPriority = "low" | "medium" | "high" | "critical"
export type IncidentType = "medical" | "fire" | "flood" | "accident" | "missing_person" | "other"
export type MessageType = "text" | "voice" | "image" | "location" | "status_update" | "alert"
export type MessagePriority = "low" | "normal" | "high" | "urgent"

export interface User {
  id: string
  email: string
  phone?: string
  role: UserRole
  status: UserStatus
  first_name?: string
  last_name?: string
  preferred_name?: string
  current_location?: { lat: number; lng: number }
  traditional_territory?: string
  is_indigenous: boolean
  nation_affiliation?: string
  elder_status: boolean
  cultural_permissions: Record<string, any>
  medical_conditions?: string[]
  emergency_contacts: any[]
  accessibility_needs?: string[]
  preferred_language: string
  created_at: string
  updated_at: string
}

export interface Incident {
  id: string
  incident_number: string
  type: IncidentType
  priority: IncidentPriority
  status: IncidentStatus
  title: string
  description?: string
  location: { lat: number; lng: number }
  address?: string
  traditional_territory?: string
  reported_by: string
  reported_at: string
  assigned_responders?: string[]
  involves_indigenous_territory: boolean
  cultural_protocols_required: boolean
  elder_approval_needed: boolean
  created_at: string
  updated_at: string
}

export interface LABBeacon {
  id: string
  user_id: string
  incident_id?: string
  location: { lat: number; lng: number }
  accuracy_meters?: number
  is_active: boolean
  battery_level?: number
  signal_strength?: number
  is_emergency: boolean
  emergency_type?: string
  beacon_time: string
  received_at: string
}

export interface TraditionalTerritory {
  id: string
  name: string
  traditional_name?: string
  nation_name?: string
  boundary: any // PostGIS geometry
  center_point: { lat: number; lng: number }
  languages: string[]
  cultural_protocols: string[]
  elder_contacts: string[]
  data_sharing_permissions: Record<string, any>
  access_restrictions: string[]
}

export interface EmergencyResource {
  id: string
  name: string
  type: string
  description?: string
  location: { lat: number; lng: number }
  address?: string
  is_available: boolean
  operating_hours: Record<string, any>
  capacity?: number
  current_usage: number
  contact_info: Record<string, any>
  indigenous_friendly: boolean
  cultural_services: string[]
}

export interface Communication {
  id: string
  type: MessageType
  priority: MessagePriority
  subject?: string
  content: string
  sender_id: string
  recipient_ids: string[]
  incident_id?: string
  sent_at: string
  delivered_at?: string
  read_at?: string
  attachments: any[]
  requires_elder_approval: boolean
  elder_approved: boolean
}

export interface Responder {
  id: string
  user_id: string
  certifications: string[]
  skills: string[]
  specializations: string[]
  experience_years: number
  is_available: boolean
  current_status: string
  max_response_distance: number
  equipment_available: string[]
  vehicle_type?: string
  has_medical_supplies: boolean
  response_count: number
  average_response_time?: string
  rating: number
}

// OCAP compliance helper
export interface OCAPPermissions {
  ownership: boolean
  control: boolean
  access: boolean
  possession: boolean
  data_sharing_consent: boolean
  elder_approval_required: boolean
}
