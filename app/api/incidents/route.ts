import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const supabase = createClient()

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError || !session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: incidents, error } = await supabase
    .from("incidents")
    .select(`
      *,
      reported_by_user:users!incidents_reported_by_fkey(first_name, last_name, preferred_name)
    `)
    .order("created_at", { ascending: false })
    .limit(50)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ incidents })
}

export async function POST(request: NextRequest) {
  const supabase = createClient()

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError || !session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, description, type, priority, location, address, traditional_territory } = body

    const { data: incident, error } = await supabase
      .from("incidents")
      .insert({
        title,
        description,
        type,
        priority: priority || "medium",
        location,
        address,
        traditional_territory,
        reported_by: session.user.id,
        involves_indigenous_territory: !!traditional_territory,
        cultural_protocols_required: !!traditional_territory,
        elder_approval_needed: priority === "critical" && !!traditional_territory,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ incident }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
