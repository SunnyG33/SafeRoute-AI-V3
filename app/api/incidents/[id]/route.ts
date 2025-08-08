import { NextResponse } from "next/server"
import { getIncident, setStatus, updateIncident } from "@/lib/incident-store"

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const inc = getIncident(params.id)
  if (!inc) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ incident: inc })
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const inc = getIncident(params.id)
  if (!inc) return NextResponse.json({ error: "Not found" }, { status: 404 })
  const body = await req.json().catch(() => ({}))
  if (body?.status) {
    const updated = setStatus(params.id, body.status)
    return NextResponse.json({ incident: updated })
  }
  const updated = updateIncident(params.id, {
    participants: Array.isArray(body?.participants) ? body.participants : undefined,
    meta: typeof body?.meta === "object" ? body.meta : undefined,
  })
  return NextResponse.json({ incident: updated })
}
