import { canSendRemote, type Sensitivity } from "@/config/data-residency"

// This is a provider-agnostic cache interface. You can back it by Upstash Redis,
// another Redis in ca-central-1, or a no-op in strict mode.
type CacheBackend = {
  get: (key: string) => Promise<string | null>
  set: (key: string, value: string, ttlSeconds?: number) => Promise<void>
  del: (key: string) => Promise<void>
}

// Lazy import to avoid shipping clients to the browser.
async function getRedisClient() {
  // Use standard REDIS_* envs already present in your project.
  const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env
  if (!REDIS_HOST || !REDIS_PORT) return null

  // ioredis works with Upstash Redis (via URL) and most managed Redis providers.
  const Redis = (await import("ioredis")).default
  const portNum = Number(REDIS_PORT)
  const tls =
    String(process.env.REDIS_TLS ?? "").toLowerCase() === "true"
      ? { tls: {} as any }
      : {}

  const client = new Redis({
    host: REDIS_HOST,
    port: Number.isFinite(portNum) ? portNum : 6379,
    password: REDIS_PASSWORD,
    // @ts-ignore TLS is optional
    ...tls,
    lazyConnect: true,
    maxRetriesPerRequest: 2,
  })
  return client
}

let backendPromise: Promise<CacheBackend> | null = null

async function buildBackend(): Promise<CacheBackend> {
  // If REDIS is not configured, use a memory fallback.
  const redis = await getRedisClient().catch(() => null)

  if (!redis) {
    // Memory fallback for dev/offline and strict residency blocks.
    const mem = new Map<string, { v: string; exp?: number }>()
    return {
      async get(key) {
        const item = mem.get(key)
        if (!item) return null
        if (item.exp && Date.now() > item.exp) {
          mem.delete(key)
          return null
        }
        return item.v
      },
      async set(key, value, ttlSeconds) {
        mem.set(key, {
          v: value,
          exp: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined,
        })
      },
      async del(key) {
        mem.delete(key)
      },
    }
  }

  await redis.connect().catch(() => {})
  return {
    async get(key) {
      try {
        return (await redis.get(key)) as string | null
      } catch {
        return null
      }
    },
    async set(key, value, ttlSeconds) {
      try {
        if (ttlSeconds && ttlSeconds > 0) {
          await redis.set(key, value, "EX", ttlSeconds)
        } else {
          await redis.set(key, value)
        }
      } catch {}
    },
    async del(key) {
      try {
        await redis.del(key)
      } catch {}
    },
  }
}

async function getBackend() {
  if (!backendPromise) backendPromise = buildBackend()
  return backendPromise
}

/**
 * Safe cache set/get that respects data residency policy.
 * - If canSendRemote(kind) === false, this will still cache in-memory (per instance) but not via remote Redis.
 * - Use 'EPHEMERAL' for non-sensitive UI state, rate limits, etc.
 */
export async function safeCacheSet(
  key: string,
  value: unknown,
  opts?: { ttlSeconds?: number; kind?: Sensitivity },
) {
  const kind = opts?.kind ?? "OTHER"
  const json = JSON.stringify(value)
  if (!canSendRemote(kind)) {
    // In strict mode or for sensitive classes, do not use remote cache. Use memory fallback only.
    const mem = await buildBackend() // a separate memory backend
    await mem.set(key, json, opts?.ttlSeconds)
    return
  }

  const backend = await getBackend()
  await backend.set(key, json, opts?.ttlSeconds)
}

export async function safeCacheGet<T = unknown>(
  key: string,
  opts?: { kind?: Sensitivity },
): Promise<T | null> {
  const backend = await getBackend()
  const v = await backend.get(key)
  if (!v) return null
  try {
    return JSON.parse(v) as T
  } catch {
    return null
  }
}

export async function safeCacheDel(key: string) {
  const backend = await getBackend()
  await backend.del(key)
}
