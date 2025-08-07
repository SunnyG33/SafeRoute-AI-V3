import { NextRequest, NextResponse } from "next/server"
import type { Checkin } from "@/types/checkin"

let DB: Checkin[] = []

function id() {
  return Math.random().toString(36).slice(2, 10)
}

export async function GET() {
  const data = [...DB].sort((a, b) => b.createdAt - a.createdAt)
  return NextResponse.json({ data })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const now = Date.now()

    const record: Checkin = {
      id: id(),
      createdAt: now,
      updatedAt: now,
      status: body.status,
      name: body.name?.slice(0, 80),
      contact: body.contact?.slice(0, 120),
      language: body.language?.slice(0, 40),
      notes: body.notes?.slice(0, 2000),
      location: body.location ?? null,
      mobility: body.mobility,
      dependents: {
        children: !!body?.dependents?.children,
        elders: !!body?.dependents?.elders,
        pets: !!body?.dependents?.pets,
      },
      assignedTo: null,
      assignmentStatus: "unassigned",
    }

    DB.unshift(record)
    return NextResponse.json({ ok: true, record }, { status: 201 })
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id: checkinId } = body as { id?: string }
    if (!checkinId) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 })

    const idx = DB.findIndex((c) => c.id === checkinId)
    if (idx === -1) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })

    const current = DB[idx]
    const updated: Checkin = {
      ...current,
      assignedTo: body.assignedTo !== undefined ? body.assignedTo : current.assignedTo,
      assignmentStatus:
        body.assignmentStatus !== undefined ? body.assignmentStatus : current.assignmentStatus,
      updatedAt: Date.now(),
      notes: body.notes !== undefined ? String(body.notes).slice(0, 2000) : current.notes,
    }

    DB[idx] = updated
    return NextResponse.json({ ok: true, record: updated })
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 })
  }
}
