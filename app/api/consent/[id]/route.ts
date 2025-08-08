import { NextRequest, NextResponse } from "next/server"
import { issueConsentToken, revokeConsentToken, listConsentTokens } from "@/lib/consent-store"
import { getRedis } from "@/lib/redis"
import { webcrypto as nodeWebcrypto } from "node:crypto"

type ConsentPayload = { fields?: string[]; expiresMinutes?: number; note?: string }

// Prefer webcrypto.subtle if available
const subtle: SubtleCrypto = (globalThis.crypto?.subtle as any) || (nodeWebcrypto.subtle as any)

function b64u(input: string | Uint8Array) {
  const buf = typeof input === "string" ? Buffer.from(input) : Buffer.from(input)
  return buf.toString("base64url")
}

async function hmacSign(input: string, secret: string) {
  const key = await subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const sig = await subtle.sign("HMAC", key, new TextEncoder().encode(input))
  return b64u(new Uint8Array(sig))
}

async function signToken(payload: Record<string, any>) {
  const header = { alg: "HS256", typ: "JWT" }
  const data = `${b64u(JSON.stringify(header))}.${b64u(JSON.stringify(payload))}`
  const secret = (process.env.JWT_SECRET || process.env.MASTER_ENCRYPTION_KEY || "demo-secret") as string
  const sig = await hmacSign(data, secret)
  return `${data}.${sig}`
}

// Redis helpers
async function redisList(incidentId: string): Promise<any[]> {
  const r = getRedis()
  if (!r) return listConsentTokens(incidentId)
  const raw = await r.get(`sr:consent:${incidentId}`)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed as any[]
    return []
  } catch {
    return []
  }
}

async function redisSave(incidentId: string, list: any[]) {
  const r = getRedis()
  if (!r) return
  await r.set(`sr:consent:${incidentId}`, JSON.stringify(list))
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const tokens = await listConsentTokens(params.id)
  return NextResponse.json({ tokens })
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { fields } = await req.json()
  const token = await issueConsentToken(params.id, fields || [])
  return NextResponse.json({ token })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { tokenId } = await req.json()
  const revoked = await revokeConsentToken(params.id, tokenId)
  return NextResponse.json({ revoked })
}
