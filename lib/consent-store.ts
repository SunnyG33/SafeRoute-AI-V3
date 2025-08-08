import { redis } from "./redis"
import { sign, verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "demo-secret-key"
const memoryStore = new Map<string, any>()

export interface ConsentToken {
  id: string
  incidentId: string
  fields: string[]
  issuedAt: number
  revokedAt?: number
}

export async function issueConsentToken(incidentId: string, fields: string[]): Promise<string> {
  const token: ConsentToken = {
    id: `consent_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    incidentId,
    fields,
    issuedAt: Date.now(),
  }

  const key = `consent:${incidentId}:${token.id}`
  
  if (redis) {
    await redis.set(key, JSON.stringify(token), { ex: 86400 }) // 24h expiry
  } else {
    memoryStore.set(key, token)
  }

  return sign(token, JWT_SECRET, { expiresIn: "24h" })
}

export async function revokeConsentToken(incidentId: string, tokenId: string): Promise<boolean> {
  const key = `consent:${incidentId}:${tokenId}`
  
  let token: ConsentToken | null = null
  if (redis) {
    const data = await redis.get(key)
    token = data ? JSON.parse(data as string) : null
  } else {
    token = memoryStore.get(key) || null
  }

  if (!token) return false

  token.revokedAt = Date.now()
  
  if (redis) {
    await redis.set(key, JSON.stringify(token), { ex: 86400 })
  } else {
    memoryStore.set(key, token)
  }

  return true
}

export async function listConsentTokens(incidentId: string): Promise<ConsentToken[]> {
  const pattern = `consent:${incidentId}:*`
  const tokens: ConsentToken[] = []

  if (redis) {
    const keys = await redis.keys(pattern)
    for (const key of keys) {
      const data = await redis.get(key)
      if (data) {
        tokens.push(JSON.parse(data as string))
      }
    }
  } else {
    for (const [key, token] of memoryStore.entries()) {
      if (key.startsWith(`consent:${incidentId}:`)) {
        tokens.push(token)
      }
    }
  }

  return tokens.sort((a, b) => b.issuedAt - a.issuedAt)
}

export function verifyConsentToken(tokenString: string): ConsentToken | null {
  try {
    return verify(tokenString, JWT_SECRET) as ConsentToken
  } catch {
    return null
  }
}
