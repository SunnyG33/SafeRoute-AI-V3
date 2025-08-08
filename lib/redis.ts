import { Redis } from "@upstash/redis"

let redis: Redis | null = null

if (process.env.REDIS_HOST && process.env.REDIS_PORT && process.env.REDIS_PASSWORD) {
  redis = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  })
}

export { redis }
