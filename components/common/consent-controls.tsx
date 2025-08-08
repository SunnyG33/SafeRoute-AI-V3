"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

type Item = {
  token: string
  fields: string[]
  note?: string
  issuedAt: number
  revokedAt?: number
}

export function ConsentControls({ incidentId }: { incidentId: string }) {
  const [items, setItems] = useState<Item[]>([])
  const [note, setNote] = useState("")
  const [fields, setFields] = useState<Record<string, boolean>>({
    name: true,
    age: true,
    bloodType: false,
    allergies: false,
    medications: false,
    conditions: false,
  })
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function parseJsonSafe(res: Response) {
    const ct = res.headers.get("content-type") || ""
    if (ct.includes("application/json")) return res.json()
    const text = await res.text().catch(() => "")
    try {
      return JSON.parse(text)
    } catch {
      throw new Error(`Expected JSON, got: ${text.slice(0, 120) || "empty"}`)
    }
  }

  async function refresh() {
    setError(null)
    try {
      const res = await fetch(`/api/consent/${incidentId}`, { cache: "no-store" })
      if (!res.ok) {
        const msg = await res.text().catch(() => "")
        throw new Error(`HTTP ${res.status} ${msg.slice(0, 120)}`)
      }
      const data = await parseJsonSafe(res)
      setItems(Array.isArray(data.items) ? (data.items as Item[]) : [])
    } catch (e: any) {
      console.error("Failed to load consent tokens:", e)
      setItems([])
      setError("Consent service is temporarily unavailable. Please try again.")
    }
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incidentId])

  async function issue() {
    setBusy(true)
    setError(null)
    try {
      const payload = {
        fields: Object.entries(fields)
          .filter(([, v]) => v)
          .map(([k]) => k),
        note: note || undefined,
      }
      const res = await fetch(`/api/consent/${incidentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const msg = await res.text().catch(() => "")
        throw new Error(`Issue failed: HTTP ${res.status} ${msg.slice(0, 120)}`)
      }
      setNote("")
      await refresh()
    } catch (e: any) {
      console.error(e)
      setError("Could not issue consent token.")
    } finally {
      setBusy(false)
    }
  }

  async function revoke(token: string) {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch(`/api/consent/${incidentId}?token=${encodeURIComponent(token)}`, {
        method: "DELETE",
      })
      if (!res.ok) {
        const msg = await res.text().catch(() => "")
        throw new Error(`Revoke failed: HTTP ${res.status} ${msg.slice(0, 120)}`)
      }
      await refresh()
    } catch (e: any) {
      console.error(e)
      setError("Could not revoke consent token.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded border p-3 bg-white">
      <div className="text-sm font-semibold">Consent Tokens</div>
      <div className="mt-2 text-xs text-slate-600">
        Issue or revoke consent tokens for field-level sharing.
      </div>

      {error ? (
        <Alert variant="destructive" className="mt-2">
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      ) : null}

      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
        {Object.keys(fields).map((k) => (
          <label key={k} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={fields[k]}
              onChange={(e) => setFields((f) => ({ ...f, [k]: e.target.checked }))}
              aria-label={`Share ${k}`}
            />
            {k}
          </label>
        ))}
      </div>

      <input
        className="mt-2 w-full border rounded px-2 py-1 text-sm"
        placeholder="Optional note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <div className="mt-2">
        <Button className="border-2" onClick={issue} disabled={busy}>
          {busy ? "Working..." : "Issue Token"}
        </Button>
      </div>

      <div className="mt-3 text-sm">
        <div className="font-medium mb-1">Issued</div>
        <div className="space-y-2 max-h-48 overflow-auto">
          {items.length === 0 ? (
            <div className="text-slate-500 text-sm">None</div>
          ) : (
            items.map((it) => (
              <div key={it.token} className="border rounded p-2">
                <div className="text-xs text-slate-600">Fields: {it.fields.join(", ") || "—"}</div>
                {it.note ? <div className="text-xs">Note: {it.note}</div> : null}
                <div className="text-xs">Issued: {new Date(it.issuedAt).toLocaleString()}</div>
                {it.revokedAt ? (
                  <div className="text-xs text-red-700">
                    Revoked: {new Date(it.revokedAt).toLocaleString()}
                  </div>
                ) : (
                  <div className="mt-2">
                    <Button variant="outline" className="border-2" onClick={() => revoke(it.token)} disabled={busy}>
                      Revoke
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
