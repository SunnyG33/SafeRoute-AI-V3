import { NextResponse } from "next/server"
import { type CheckIn, type CheckInStatus } from "@/types/checkin"

let CHECKINS: CheckIn[] = []

export async function GET() {
  return NextResponse.json({ data: CHECKINS })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null as any)
  if (!body || !body.name) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }
  const now = new Date().toISOString()
  const newItem: CheckIn = {
    id: Math.random().toString(36).slice(2),
    name: String(body.name),
    phone: body.phone ? String(body.phone) : undefined,
    message: body.message ? String(body.message) : undefined,
    lat: typeof body.lat === "number" ? body.lat : undefined,
    lng: typeof body.lng === "number" ? body.lng : undefined,
    createdAt: now,
    status: "submitted",
  }
  CHECKINS.unshift(newItem)
  return NextResponse.json({ data: newItem }, { status: 201 })
}

export async function PATCH(req: Request) {
  const body = await req.json().catch(() => null as any)
  const { id, status } = body || {}
  if (!id || !status) {
    return NextResponse.json({ error: "Missing id or status" }, { status: 400 })
  }
  const allowed: CheckInStatus[] = ["submitted", "claimed", "enroute", "arrived", "completed"]
  if (!allowed.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  }
  const idx = CHECKINS.findIndex((c) => c.id === id)
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })
  CHECKINS[idx] = { ...CHECKINS[idx], status }
  return NextResponse.json({ data: CHECKINS[idx] })
}
