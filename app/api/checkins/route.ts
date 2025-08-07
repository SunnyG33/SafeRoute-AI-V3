import { NextRequest, NextResponse } from "next/server"
import { type Checkin, type CheckinStatus, type AssignmentStatus } from "@/types/checkin"

type NewCheckinBody = {
  status: CheckinStatus
  name?: string
  contact?: string
  language?: string
  notes?: string
  mobility?: Checkin["mobility"]
  dependents?: Checkin["dependents"]
  location: Checkin["location"]
}

const CHECKINS: Checkin[] = []

function id() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID()
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function now() {
  return Date.now()
}

export async function GET() {
  const data = [...CHECKINS].sort((a, b) => b.createdAt - a.createdAt)
  return NextResponse.json({ ok: true, data })
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as NewCheckinBody
    if (!body || !body.status) {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 })
    }

    const record: Checkin = {
      id: id(),
      createdAt: now(),
      updatedAt: now(),
      status: body.status,
      name: body.name?.slice(0, 140),
      contact: body.contact?.slice(0, 140),
      language: body.language?.slice(0, 80),
      notes: body.notes?.slice(0, 2000),
      location: body.location
        ? {
            lat: Number(body.location.lat),
            lng: Number(body.location.lng),
            accuracy: body.location.accuracy ? Number(body.location.accuracy) : undefined,
            territory: body.location.territory,
          }
        : null,
      mobility: body.mobility ?? "none",
      dependents: body.dependents ?? { children: false, elders: false, pets: false },
      assignedTo: null,
      assignmentStatus: "unassigned",
    }

    CHECKINS.unshift(record)
    return NextResponse.json({ ok: true, record })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unexpected error" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = (await req.json()) as { id: string; assignmentStatus?: AssignmentStatus; assignedTo?: string | null }
    if (!body?.id) {
      return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 })
    }
    const idx = CHECKINS.findIndex((c) => c.id === body.id)
    if (idx === -1) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })
    }

    if (body.assignmentStatus) {
      CHECKINS[idx].assignmentStatus = body.assignmentStatus
    }
    if (typeof body.assignedTo !== "undefined") {
      CHECKINS[idx].assignedTo = body.assignedTo
    }
    CHECKINS[idx].updatedAt = now()

    return NextResponse.json({ ok: true, record: CHECKINS[idx] })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unexpected error" }, { status: 500 })
  }
}
