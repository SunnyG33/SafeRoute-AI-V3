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
  const status = searchParams.get("status")
  const limit = Number.parseInt(searchParams.get("limit") || "50")

  try {
    let query = supabase
      .from("incidents")
      .select(`
        *,
        reported_by_user:users!incidents_reported_by_fkey(first_name, last_name, role)
      `)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (status) {
      query = query.eq("status", status)
    }

    const { data: incidents, error } = await query

    if (error) {
      console.error("Error fetching incidents:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ incidents })
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
      title,
      description,
      type,
      priority,
      location,
      address,
      what3words,
      photos,
      involves_indigenous_territory,
      traditional_territory,
    } = body

    if (!title || !description || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate incident number
    const incidentNumber = `SR-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`

    const { data: incident, error } = await supabase
      .from("incidents")
      .insert({
        incident_number: incidentNumber,
        title,
        description,
        type,
        priority: priority || "medium",
        status: "reported",
        location,
        address,
        what3words,
        photos: photos || [],
        reported_by: user.id,
        reported_at: new Date().toISOString(),
        involves_indigenous_territory: involves_indigenous_territory || false,
        traditional_territory,
        cultural_protocols_required: involves_indigenous_territory || false,
        elder_approval_needed: involves_indigenous_territory || false,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating incident:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ incident }, { status: 201 })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
