import { NextRequest, NextResponse } from "next/server"
import type { IncidentEvent } from "@/components/hero/incident-types"
import { getStore, setStore } from "./store"

function id() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID()
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { EVENTS } = getStore()
  const sinceStr = req.nextUrl.searchParams.get("since")
  const since = sinceStr ? Number(sinceStr) : 0
  const data = EVENTS.filter((e) => e.incidentId === params.id && e.at > since).sort((a, b) => a.at - b.at)
  return NextResponse.json({ ok: true, events: data, now: Date.now() })
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { INCIDENTS, EVENTS } = getStore()
  try {
    const body = await req.json()
    const ev: IncidentEvent = {
      id: id(),
      incidentId: params.id,
      at: Date.now(),
      type: body?.type,
      from: body?.from,
      payload: body?.payload ?? {},
    }
    EVENTS.push(ev)
    const idx = INCIDENTS.findIndex((i) => i.id === params.id)
    if (idx !== -1) {
      INCIDENTS[idx] = { ...INCIDENTS[idx], updatedAt: ev.at, lastEventAt: ev.at }
    }
    setStore({ INCIDENTS, EVENTS })
    return NextResponse.json({ ok: true, event: ev })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Invalid payload" }, { status: 400 })
  }
}
