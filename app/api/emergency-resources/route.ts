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
  const type = searchParams.get("type")
  const available = searchParams.get("available")
  const limit = Number.parseInt(searchParams.get("limit") || "50")

  try {
    let query = supabase.from("emergency_resources").select("*").order("name").limit(limit)

    if (type) {
      query = query.eq("type", type)
    }

    if (available === "true") {
      query = query.eq("is_available", true)
    }

    const { data: resources, error } = await query

    if (error) {
      console.error("Error fetching emergency resources:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ resources })
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

  // Check if user has permission to add resources (government/responder roles)
  const { data: userProfile } = await supabase.from("users").select("role").eq("id", user.id).single()

  if (!userProfile || !["government", "responder"].includes(userProfile.role)) {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
  }

  try {
    const body = await request.json()
    const {
      name,
      type,
      description,
      address,
      location,
      contact_info,
      operating_hours,
      capacity,
      indigenous_friendly,
      cultural_services,
    } = body

    if (!name || !type || !address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data: resource, error } = await supabase
      .from("emergency_resources")
      .insert({
        name,
        type,
        description,
        address,
        location,
        contact_info: contact_info || {},
        operating_hours: operating_hours || {},
        capacity: capacity || 0,
        current_usage: 0,
        is_available: true,
        indigenous_friendly: indigenous_friendly || false,
        cultural_services: cultural_services || [],
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating emergency resource:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ resource }, { status: 201 })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
