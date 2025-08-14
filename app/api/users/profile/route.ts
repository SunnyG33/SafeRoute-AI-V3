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

  try {
    const { data: profile, error } = await supabase.from("users").select("*").eq("id", user.id).single()

    if (error) {
      console.error("Error fetching user profile:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ profile })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
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
      first_name,
      last_name,
      phone,
      preferred_name,
      preferred_language,
      home_territory,
      traditional_territory,
      nation_affiliation,
      emergency_contacts,
      medical_conditions,
      accessibility_needs,
    } = body

    const updateData: any = {
      updated_at: new Date().toISOString(),
    }

    if (first_name) updateData.first_name = first_name
    if (last_name) updateData.last_name = last_name
    if (phone !== undefined) updateData.phone = phone
    if (preferred_name !== undefined) updateData.preferred_name = preferred_name
    if (preferred_language) updateData.preferred_language = preferred_language
    if (home_territory !== undefined) updateData.home_territory = home_territory
    if (traditional_territory !== undefined) updateData.traditional_territory = traditional_territory
    if (nation_affiliation !== undefined) updateData.nation_affiliation = nation_affiliation
    if (emergency_contacts) updateData.emergency_contacts = emergency_contacts
    if (medical_conditions) updateData.medical_conditions = medical_conditions
    if (accessibility_needs) updateData.accessibility_needs = accessibility_needs

    const { data: profile, error } = await supabase.from("users").update(updateData).eq("id", user.id).select().single()

    if (error) {
      console.error("Error updating user profile:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ profile })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
