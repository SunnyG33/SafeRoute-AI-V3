import { NextResponse } from "next/server"
import { issueConsent, listConsent, revokeConsent } from "@/lib/consent-store"

// JSON helpers
function json(data: any, status = 200) {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  })
}

// GET /api/consent/:id -> { items: ConsentItem[] }
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const items = await listConsent(params.id)
    return json({ items }, 200)
  } catch (err) {
    console.error("[consent][GET] failed:", err)
    // Never 500 on GET for demo reliability; return empty list with error code
    return json({ items: [], error: "failed-to-list" }, 200)
  }
}

// POST /api/consent/:id -> body: { fields?: string[]; note?: string }
export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json().catch(() => ({}))
    const fields = Array.isArray(body?.fields) ? (body.fields as string[]) : []
    const note = typeof body?.note === "string" ? (body.note as string) : undefined
    const item = await issueConsent(params.id, fields, note)
    return json({ item }, 201)
  } catch (err) {
    console.error("[consent][POST] failed:", err)
    return json({ error: "failed-to-issue" }, 500)
  }
}

// DELETE /api/consent/:id?token=...
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const url = new URL(req.url)
    const token = url.searchParams.get("token")
    if (!token) return json({ error: "missing-token" }, 400)
    const ok = await revokeConsent(params.id, token)
    // For demos, treat missing token as ok=false (still 200)
    return json({ ok }, 200)
  } catch (err) {
    console.error("[consent][DELETE] failed:", err)
    return json({ ok: false, error: "failed-to-revoke" }, 500)
  }
}
