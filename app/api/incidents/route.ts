import { NextResponse } from "next/server"
import { createIncident, listIncidents, type IncidentParticipant } from "@/lib/incident-store"

export async function GET() {
  return NextResponse.json({ incidents: listIncidents() })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const participants = Array.isArray(body?.participants) ? (body.participants as IncidentParticipant[]) : []
    const meta = body?.meta && typeof body.meta === "object" ? body.meta : undefined
    const inc = createIncident(participants, meta)
    return NextResponse.json({ incident: inc }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }
}
