import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const active = searchParams.get("active")
  const emergency = searchParams.get("emergency")
  const limit = Number.parseInt(searchParams.get("limit") || "100")

  try {
    let query = supabase
      .from("lab_beacons")
      .select(`
        *,
        user:users!lab_beacons_user_id_fkey(first_name, last_name, phone),
        incident:incidents(incident_number, title, status)
      `)
      .order("received_at", { ascending: false })
      .limit(limit)

    if (active === "true") {
      query = query.eq("is_active", true)
    }

    if (emergency === "true") {
      query = query.eq("is_emergency", true)
    }

    const { data: beacons, error } = await query

    if (error) {
      console.error("Error fetching LAB beacons:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ beacons })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      location,
      is_emergency,
      emergency_type,
      battery_level,
      signal_strength,
      accuracy_meters,
      altitude_meters,
      incident_id,
    } = body

    if (!location) {
      return NextResponse.json({ error: "Location is required" }, { status: 400 })
    }

    const { data: beacon, error } = await supabase
      .from("lab_beacons")
      .insert({
        user_id: user.id,
        location,
        is_emergency: is_emergency || false,
        emergency_type,
        battery_level: battery_level || 100,
        signal_strength: signal_strength || 100,
        accuracy_meters: accuracy_meters || 10,
        altitude_meters,
        incident_id,
        is_active: true,
        auto_generated: false,
        beacon_time: new Date().toISOString(),
        received_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating LAB beacon:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ beacon }, { status: 201 })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
