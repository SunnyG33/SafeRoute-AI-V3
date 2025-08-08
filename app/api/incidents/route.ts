import { NextRequest, NextResponse } from "next/server"
import type { Incident } from "@/components/hero/incident-types"

let INCIDENTS: Incident[] = []

function id() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID()
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export async function GET() {
  const data = [...INCIDENTS].sort((a, b) => b.updatedAt - a.updatedAt)
  return NextResponse.json({ ok: true, data })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const now = Date.now()
    const incident: Incident = {
      id: id(),
      createdAt: now,
      updatedAt: now,
      status: "open",
      checkinId: body?.checkinId,
      participants: [
        ...(body?.participants?.map((p: any, i: number) => ({
          id: p?.id || `p_${i + 1}`,
          role: p?.role === "responder" ? "responder" : "civilian",
          name: p?.name?.slice(0, 80),
          connected: !!p?.connected,
        })) ?? []),
      ],
      lastEventAt: now,
    }
    INCIDENTS.unshift(incident)
    return NextResponse.json({ ok: true, incident }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Invalid payload" }, { status: 400 })
  }
}
