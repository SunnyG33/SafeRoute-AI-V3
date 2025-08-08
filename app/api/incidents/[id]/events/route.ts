import { NextResponse } from "next/server"
import { addEvent, getEventsSince, getIncident } from "@/lib/incident-store"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const url = new URL(req.url)
  const since = Number(url.searchParams.get("since") || 0)
  if (!getIncident(params.id)) return NextResponse.json({ error: "Not found" }, { status: 404 })
  const { events, now } = getEventsSince(params.id, isNaN(since) ? 0 : since)
  return NextResponse.json({ events, now })
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const inc = getIncident(params.id)
  if (!inc) return NextResponse.json({ error: "Not found" }, { status: 404 })
  const body = await req.json().catch(() => ({}))
  if (!body?.type) return NextResponse.json({ error: "Missing type" }, { status: 400 })
  const ev = addEvent(params.id, {
    type: String(body.type),
    from: body?.from || undefined,
    payload: body?.payload || undefined,
  })
  return NextResponse.json({ event: ev }, { status: 201 })
}
