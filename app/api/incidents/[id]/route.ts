import { NextRequest, NextResponse } from "next/server"
import type { Incident } from "@/components/hero/incident-types"
import { getStore } from "./store"

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const { INCIDENTS } = getStore()
  const inc = INCIDENTS.find((i) => i.id === params.id)
  if (!inc) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })
  return NextResponse.json({ ok: true, incident: inc })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { INCIDENTS } = getStore()
  try {
    const idx = INCIDENTS.findIndex((i) => i.id === params.id)
    if (idx === -1) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })
    const body = await req.json()
    const updated: Incident = {
      ...INCIDENTS[idx],
      status: body?.status ?? INCIDENTS[idx].status,
      updatedAt: Date.now(),
    }
    INCIDENTS[idx] = updated
    return NextResponse.json({ ok: true, incident: updated })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Invalid payload" }, { status: 400 })
  }
}
