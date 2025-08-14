import { supabase } from "./supabase"
import type { User, Incident, LABBeacon, UserRole, OCAPPermissions } from "./supabase"

// User Management Functions
export async function createUser(userData: Partial<User>) {
  const { data, error } = await supabase.from("users").insert([userData]).select().single()

  if (error) throw error
  return data
}

export async function getUserByRole(role: UserRole) {
  const { data, error } = await supabase.from("users").select("*").eq("role", role).eq("status", "active")

  if (error) throw error
  return data
}

// Incident Management Functions
export async function createIncident(incidentData: Partial<Incident>) {
  // Generate incident number
  const incidentNumber = `SR-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`

  const { data, error } = await supabase
    .from("incidents")
    .insert([{ ...incidentData, incident_number: incidentNumber }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getActiveIncidents() {
  const { data, error } = await supabase
    .from("incidents")
    .select(`
      *,
      reported_by_user:users!incidents_reported_by_fkey(first_name, last_name, preferred_name)
    `)
    .in("status", ["reported", "dispatched", "in_progress"])
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function updateIncidentStatus(incidentId: string, status: string, updates: Partial<Incident> = {}) {
  const { data, error } = await supabase
    .from("incidents")
    .update({ status, ...updates, updated_at: new Date().toISOString() })
    .eq("id", incidentId)
    .select()
    .single()

  if (error) throw error
  return data
}

// LAB Beacon Functions
export async function createLABBeacon(beaconData: Partial<LABBeacon>) {
  const { data, error } = await supabase.from("lab_beacons").insert([beaconData]).select().single()

  if (error) throw error
  return data
}

export async function getActiveLABBeacons() {
  const { data, error } = await supabase
    .from("lab_beacons")
    .select(`
      *,
      user:users(first_name, last_name, preferred_name, role)
    `)
    .eq("is_active", true)
    .order("beacon_time", { ascending: false })

  if (error) throw error
  return data
}

// Real-time Communication Functions
export async function sendMessage(messageData: {
  type: string
  content: string
  sender_id: string
  recipient_ids: string[]
  incident_id?: string
  priority?: string
}) {
  const { data, error } = await supabase.from("communications").insert([messageData]).select().single()

  if (error) throw error
  return data
}

// Traditional Territory Functions
export async function getTraditionalTerritory(location: { lat: number; lng: number }) {
  const { data, error } = await supabase.rpc("get_territory_by_location", {
    lat: location.lat,
    lng: location.lng,
  })

  if (error) throw error
  return data
}

// Emergency Resource Functions
export async function findNearestResources(location: { lat: number; lng: number }, resourceType: string, limit = 10) {
  const { data, error } = await supabase.rpc("find_nearest_resources", {
    lat: location.lat,
    lng: location.lng,
    resource_type: resourceType,
    max_results: limit,
  })

  if (error) throw error
  return data
}

// Real-time Subscriptions
export function subscribeToIncidents(callback: (payload: any) => void) {
  return supabase
    .channel("incidents")
    .on("postgres_changes", { event: "*", schema: "public", table: "incidents" }, callback)
    .subscribe()
}

export function subscribeToLABBeacons(callback: (payload: any) => void) {
  return supabase
    .channel("lab_beacons")
    .on("postgres_changes", { event: "*", schema: "public", table: "lab_beacons" }, callback)
    .subscribe()
}

export function subscribeToCommunications(incidentId: string, callback: (payload: any) => void) {
  return supabase
    .channel(`communications_${incidentId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "communications",
        filter: `incident_id=eq.${incidentId}`,
      },
      callback,
    )
    .subscribe()
}

// Indigenous governance and OCAP compliance functions
export async function checkOCAPCompliance(userId: string, dataType: string): Promise<OCAPPermissions> {
  const { data: user, error } = await supabase
    .from("users")
    .select("cultural_permissions, is_indigenous, elder_status")
    .eq("id", userId)
    .single()

  if (error) throw error

  const permissions = user.cultural_permissions || {}

  return {
    ownership: permissions.data_ownership || user.is_indigenous,
    control: permissions.data_control || user.elder_status,
    access: permissions.data_access !== false,
    possession: permissions.data_possession || user.is_indigenous,
    data_sharing_consent: permissions.sharing_consent || false,
    elder_approval_required: permissions.elder_approval_required || false,
  }
}

export async function activateTLRT(location: { lat: number; lng: number }) {
  const { data, error } = await supabase.rpc("check_traditional_territory", {
    check_lat: location.lat,
    check_lng: location.lng,
  })

  if (error) throw error
  return data
}

export async function getElderNarration(territoryId: string, language = "en") {
  const { data, error } = await supabase
    .from("traditional_territories")
    .select(`
      name,
      traditional_name,
      nation_name,
      cultural_protocols,
      elder_contacts,
      users!inner(first_name, last_name, preferred_name)
    `)
    .eq("id", territoryId)
    .eq("users.elder_status", true)
    .single()

  if (error) throw error
  return data
}

export async function findCulturallyAppropriateResponders(
  location: { lat: number; lng: number },
  incidentType: string,
  requiresIndigenousResponder = false,
) {
  let query = supabase
    .from("responders")
    .select(`
      *,
      user:users(
        first_name, last_name, preferred_name, 
        is_indigenous, nation_affiliation, cultural_permissions,
        current_location
      )
    `)
    .eq("is_available", true)
    .contains("skills", [incidentType])

  if (requiresIndigenousResponder) {
    query = query.eq("user.is_indigenous", true)
  }

  const { data, error } = await query

  if (error) throw error

  // Calculate distances and cultural compatibility
  return data
    ?.map((responder) => ({
      ...responder,
      distance_km: calculateDistance(location, responder.user.current_location),
      cultural_compatibility: requiresIndigenousResponder ? (responder.user.is_indigenous ? 1.0 : 0.5) : 1.0,
    }))
    .sort((a, b) => {
      // Sort by cultural compatibility first, then distance
      if (a.cultural_compatibility !== b.cultural_compatibility) {
        return b.cultural_compatibility - a.cultural_compatibility
      }
      return a.distance_km - b.distance_km
    })
}

export async function createCulturallyAwareIncident(incidentData: Partial<Incident>) {
  // Check if incident is in traditional territory
  const territory = await activateTLRT(incidentData.location!)

  const enhancedIncidentData = {
    ...incidentData,
    incident_number: `SR-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
    involves_indigenous_territory: territory && territory.length > 0,
    cultural_protocols_required: territory && territory.length > 0,
    elder_approval_needed:
      territory && territory.some((t: any) => t.cultural_protocols?.includes("elder_approval_required")),
    traditional_territory: territory?.[0]?.name,
  }

  const { data, error } = await supabase.from("incidents").insert([enhancedIncidentData]).select().single()

  if (error) throw error

  // If elder approval needed, notify elders
  if (enhancedIncidentData.elder_approval_needed && territory?.[0]?.elder_contacts) {
    await notifyElders(data.id, territory[0].elder_contacts)
  }

  return data
}

export async function notifyElders(incidentId: string, elderIds: string[]) {
  const notifications = elderIds.map((elderId) => ({
    type: "alert",
    priority: "high",
    subject: "Cultural Protocol Approval Required",
    content: `An incident in your traditional territory requires Elder approval. Incident ID: ${incidentId}`,
    sender_id: "system",
    recipient_ids: [elderId],
    incident_id: incidentId,
    requires_elder_approval: false,
    elder_approved: true,
  }))

  const { data, error } = await supabase.from("communications").insert(notifications).select()

  if (error) throw error
  return data
}

export async function createEmergencyLABBeacon(
  userId: string,
  location: { lat: number; lng: number },
  emergencyType = "unknown",
) {
  const beaconData = {
    user_id: userId,
    location: `POINT(${location.lng} ${location.lat})`,
    is_active: true,
    is_emergency: true,
    emergency_type: emergencyType,
    auto_generated: true,
    beacon_time: new Date().toISOString(),
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
  }

  const { data, error } = await supabase.from("lab_beacons").insert([beaconData]).select().single()

  if (error) throw error

  // Auto-create incident for emergency beacon
  if (data) {
    await createCulturallyAwareIncident({
      type: "medical",
      priority: "critical",
      title: `Emergency LAB Beacon Activated`,
      description: `Automatic emergency detected via LAB beacon. Type: ${emergencyType}`,
      location,
      reported_by: userId,
      status: "reported",
    })
  }

  return data
}

export async function getCoordinationDashboardData() {
  const [incidents, beacons, responders, territories] = await Promise.all([
    getActiveIncidents(),
    getActiveLABBeacons(),
    supabase.from("responders").select("*, user:users(*)").eq("is_available", true),
    supabase.from("traditional_territories").select("*"),
  ])

  return {
    active_incidents: incidents?.length || 0,
    active_beacons: beacons?.length || 0,
    available_responders: responders.data?.length || 0,
    protected_territories: territories.data?.length || 0,
    incidents: incidents || [],
    beacons: beacons || [],
    responders: responders.data || [],
    territories: territories.data || [],
  }
}

function calculateDistance(point1: { lat: number; lng: number }, point2: { lat: number; lng: number }): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = ((point2.lat - point1.lat) * Math.PI) / 180
  const dLng = ((point2.lng - point1.lng) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((point1.lat * Math.PI) / 180) *
      Math.cos((point2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
