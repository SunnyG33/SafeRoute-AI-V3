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
  const incident_id = searchParams.get("incident_id")
  const limit = Number.parseInt(searchParams.get("limit") || "50")

  try {
    let query = supabase
      .from("communications")
      .select(`
        *,
        sender:users!communications_sender_id_fkey(first_name, last_name, role)
      `)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (incident_id) {
      query = query.eq("incident_id", incident_id)
    }

    // Filter to show only communications the user should see
    query = query.or(`sender_id.eq.${user.id},recipient_ids.cs.{${user.id}}`)

    const { data: communications, error } = await query

    if (error) {
      console.error("Error fetching communications:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ communications })
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
    const { incident_id, recipient_ids, subject, content, type, priority, attachments } = body

    if (!content || !recipient_ids || recipient_ids.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data: communication, error } = await supabase
      .from("communications")
      .insert({
        incident_id,
        sender_id: user.id,
        recipient_ids,
        subject,
        content,
        type: type || "message",
        priority: priority || "normal",
        attachments: attachments || [],
        requires_elder_approval: false,
        elder_approved: true,
        sent_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating communication:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ communication }, { status: 201 })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
