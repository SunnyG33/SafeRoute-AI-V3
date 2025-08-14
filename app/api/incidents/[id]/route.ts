import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { data: incident, error } = await supabase
      .from("incidents")
      .select(`
        *,
        reported_by_user:users!incidents_reported_by_fkey(first_name, last_name, role),
        elder_approved_by_user:users!incidents_elder_approved_by_fkey(first_name, last_name)
      `)
      .eq("id", params.id)
      .single()

    if (error) {
      console.error("Error fetching incident:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ incident })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { status, assigned_responders, dispatched_at, arrived_at, resolved_at } = body

    const updateData: any = {
      updated_at: new Date().toISOString(),
    }

    if (status) updateData.status = status
    if (assigned_responders) updateData.assigned_responders = assigned_responders
    if (dispatched_at) updateData.dispatched_at = dispatched_at
    if (arrived_at) updateData.arrived_at = arrived_at
    if (resolved_at) updateData.resolved_at = resolved_at

    const { data: incident, error } = await supabase
      .from("incidents")
      .update(updateData)
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating incident:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ incident })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
