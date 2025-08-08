# Canada Data Residency and Upstash Usage

This project can run Upstash (or any Redis) from Canada. Connectivity is not an issue; the key question is where data is stored and what data is allowed to leave Canada.

## Recommended Approach

1) Classify Data
- PHI: health info, vitals, medical summaries
- PII: names, addresses, phone numbers
- High-precision location: GPS coordinates, incident geo
- Incident logs: chat, transcripts, 911 simulation events
- Ephemeral/non-sensitive: UI state, feature flags, rate limits, cache keys

2) Policy
- If you require Canadian data residency:
  - Store PHI/PII, precise location, and incident logs only in Canada (e.g., a DB/Redis in ca-central-1).
  - Allow remote/global caches only for Ephemeral data.
  - Redact logs and error traces containing PHI/PII.

3) Options for Redis
- Keep Upstash for non-sensitive, ephemeral caching and rate-limits.
- For strict residency, provision a Redis or database in a Canadian region (e.g., AWS ca-central-1 via ElastiCache/MemoryDB, Redis Enterprise Cloud in Canada, or another managed provider that offers Canada regions).
- Hybrid: Use Upstash as a global edge cache but never put sensitive data in it.

4) Implementation in This Repo
- config/data-residency.ts: feature flags and helpers to determine what can be sent to remote cache.
- lib/safe-cache.ts: a provider-agnostic cache that respects residency rules and can fall back to in-memory for sensitive data.

## Environment Flags

- CA_DATA_RESIDENCY_STRICT=true
  - Blocks PHI/PII/incident logs/high-precision location from being cached remotely.
- REMOTE_CACHE_ONLY_EPHEMERAL=true
  - Allows remote cache usage only for Ephemeral data types.
- REDACT_LOGS=true
  - Redacts common PII/PHI fields from logs in strict mode.

## Example Usage

\`\`\`ts
import { safeCacheSet } from "@/lib/safe-cache"

// OK: Ephemeral UI state
await safeCacheSet("nav:rate-limit:ip:1.2.3.4", { hits: 4 }, { ttlSeconds: 60, kind: "EPHEMERAL" })

// NOT OK (will be kept in-memory only if strict): PHI/PII
await safeCacheSet("incident:123:med", { name: "Jane", medications: "—" }, { ttlSeconds: 300, kind: "PHI" })
\`\`\`

## Compliance Notes

- PIPEDA and provincial health acts may require data to remain in Canada and/or have contractual safeguards for cross-border transfer.
- Minimize collection, store the minimum required, and expire aggressively.
- Coarsen location by default; share precise coordinates only with explicit consent and a clear need.
- Maintain an auditable trail of where sensitive data is stored and processed.

Consult your legal counsel to validate this setup for your specific obligations.
