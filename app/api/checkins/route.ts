import { NextRequest, NextResponse } from "next/server"
import { type SafetyCheckInPayload } from "@/types/checkin"

// Ephemeral in-memory store for demo purposes
type Store = {
  checkins: SafetyCheckInPayload[]
}
const globalStore: Store =
  // @ts-expect-error attach to global for dev demo persistence
  (globalThis.__CHECKIN_STORE__ as Store) ||
  // @ts-expect-error attach to global for dev demo persistence
  (globalThis.__CHECKIN_STORE__ = { checkins: [] })

function ok<T>(data: T, init?: number | ResponseInit) {
  return NextResponse.json(data as any, typeof init === "number" ? { status: init } : init)
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get("status")
  const limit = parseInt(searchParams.get("limit") || "50", 10)

  let out = globalStore.checkins
  if (status === "need_help" || status === "safe" || status === "cant_evacuate") {
    out = out.filter((c) => c.status === status)
  }
  // newest first
  out = [...out].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit)

  return ok({ items: out, count: out.length })
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SafetyCheckInPayload
    if (!body?.id || !body?.createdAt || !body?.status) {
      return ok({ error: "Invalid payload" }, 400)
    }
    // Minimal validation
    if (!["safe", "need_help", "cant_evacuate"].includes(body.status)) {
      return ok({ error: "Invalid status" }, 400)
    }

    // Initialize assignment if missing
    body.assignment = body.assignment ?? {
      state: "unassigned",
      updatedAt: new Date().toISOString(),
    }

    globalStore.checkins.unshift(body)
    // cap memory
    if (globalStore.checkins.length > 500) globalStore.checkins.pop()

    return ok({ success: true, item: body })
  } catch (e) {
    return ok({ error: "Bad JSON" }, 400)
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, updates } = (await req.json()) as {
      id: string
      updates: Partial<SafetyCheckInPayload>
    }
    if (!id || !updates) return ok({ error: "Missing id or updates" }, 400)

    const idx = globalStore.checkins.findIndex((c) => c.id === id)
    if (idx === -1) return ok({ error: "Not found" }, 404)

    // Merge assignment updates carefully
    const current = globalStore.checkins[idx]
    const next = {
      ...current,
      ...updates,
      assignment: {
        ...current.assignment,
        ...updates.assignment,
        updatedAt: new Date().toISOString(),
      },
    } as SafetyCheckInPayload

    globalStore.checkins[idx] = next
    return ok({ success: true, item: next })
  } catch {
    return ok({ error: "Bad JSON" }, 400)
  }
}
