import { NextRequest, NextResponse } from "next/server"
import { DB_ALERTS, DB_AUDIT, genId } from "@/lib/memory-db"
import type { AlertRecord } from "@/types/alert"

function expireIfNeeded(a: AlertRecord): AlertRecord {
  if (a.status !== "active") return a
  if (a.expiresAt && Date.now() > a.expiresAt) {
    a.status = "expired"
    a.updatedAt = Date.now()
    DB_AUDIT.unshift({
      id: genId(),
      alertId: a.id,
      timestamp: Date.now(),
      actor: "system",
      action: "expire",
      detail: "Alert expired automatically",
    })
  }
  return a
}

export async function GET(req: NextRequest) {
  // Optional filter by proximity: ?lat=..&lng=..&radiusMeters=..
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")
  const radiusMeters = searchParams.get("radiusMeters")
  const includeExpired = searchParams.get("includeExpired") === "1"

  let records = DB_ALERTS.map(expireIfNeeded)
  if (!includeExpired) records = records.filter((a) => a.status === "active")

  if (lat && lng && radiusMeters) {
    const center = { lat: Number(lat), lng: Number(lng) }
    const r = Number(radiusMeters)
    records = records.filter((a) => {
      if (!a.area) return false
      const dLat = (center.lat - a.area.lat) * 111_000
      const dLng = (center.lng - a.area.lng) * 85_000
      const distApprox = Math.sqrt(dLat * dLat + dLng * dLng)
      return distApprox <= (a.area.radiusMeters || 0) + r
    })
  }

  records.sort((a, b) => b.createdAt - a.createdAt)
  return NextResponse.json({ data: records })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const now = Date.now()
    const record: AlertRecord = {
      id: genId(),
      createdAt: now,
      updatedAt: now,
      status: "active",
      type: body.type || "warning",
      severity: body.severity || "medium",
      title: String(body.title || "Emergency Alert").slice(0, 120),
      message: String(body.message || "").slice(0, 4000),
      area: body.area
        ? {
            lat: Number(body.area.lat),
            lng: Number(body.area.lng),
            radiusMeters: Math.max(50, Number(body.area.radiusMeters) || 500),
          }
        : null,
      languages: Array.isArray(body.languages) ? body.languages.map(String) : ["en"],
      channels: Array.isArray(body.channels) ? body.channels.map(String) : ["push"],
      source: String(body.source || "BodyGuard Console"),
      expiresAt: body.expiresAt ? Number(body.expiresAt) : null,
    }

    DB_ALERTS.unshift(record)
    DB_AUDIT.unshift({
      id: genId(),
      alertId: record.id,
      timestamp: now,
      actor: "admin",
      action: "create",
      detail: `Created ${record.type} (${record.severity})`,
    })

    return NextResponse.json({ ok: true, record }, { status: 201 })
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id } = body as { id?: string }
    if (!id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 })

    const idx = DB_ALERTS.findIndex((a) => a.id === id)
    if (idx === -1) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })

    const current = DB_ALERTS[idx]
    const now = Date.now()

    if (body.status === "cancelled" && current.status === "active") {
      current.status = "cancelled"
      current.updatedAt = now
      DB_AUDIT.unshift({
        id: genId(),
        alertId: current.id,
        timestamp: now,
        actor: "admin",
        action: "cancel",
        detail: "Alert cancelled",
      })
    } else {
      // partial update
      const prev = { ...current }
      DB_ALERTS[idx] = {
        ...current,
        updatedAt: now,
        type: body.type ?? current.type,
        severity: body.severity ?? current.severity,
        title: body.title ? String(body.title).slice(0, 120) : current.title,
        message: body.message ? String(body.message).slice(0, 4000) : current.message,
        area:
          body.area !== undefined
            ? body.area
              ? {
                  lat: Number(body.area.lat),
                  lng: Number(body.area.lng),
                  radiusMeters: Math.max(50, Number(body.area.radiusMeters) || 500),
                }
              : null
            : current.area,
        languages:
          body.languages !== undefined
            ? Array.isArray(body.languages)
              ? body.languages.map(String)
              : current.languages
            : current.languages,
        channels:
          body.channels !== undefined
            ? Array.isArray(body.channels)
              ? body.channels.map(String)
              : current.channels
            : current.channels,
        expiresAt: body.expiresAt !== undefined ? Number(body.expiresAt) || null : current.expiresAt,
      }
      DB_AUDIT.unshift({
        id: genId(),
        alertId: current.id,
        timestamp: now,
        actor: "admin",
        action: "update",
        detail: `Updated alert ${prev.title} -> ${DB_ALERTS[idx].title}`,
      })
    }

    return NextResponse.json({ ok: true, record: DB_ALERTS[idx] })
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 })
  }
}
