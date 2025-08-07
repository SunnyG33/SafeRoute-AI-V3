"use client"

import { useMemo, useState } from "react"
import { evidenceRegistry } from "@/data/evidence-registry"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Info } from 'lucide-react'
import { cn } from "@/lib/utils"

type Props = {
  moduleKey: keyof typeof evidenceRegistry
  className?: string
}

export default function EvidenceBadge({ moduleKey, className }: Props) {
  const [open, setOpen] = useState(false)
  const entry = useMemo(() => evidenceRegistry[moduleKey], [moduleKey])

  if (!entry) return null

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        className="border-2"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`evidence-${moduleKey}`}
      >
        <Info className="h-4 w-4 mr-2" />
        Evidence
      </Button>

      {open && (
        <div
          id={`evidence-${moduleKey}`}
          className="absolute right-0 mt-2 w-[360px] max-w-[92vw] rounded-lg border-2 border-slate-300 bg-white shadow-lg p-3 z-50"
          role="dialog"
          aria-label={`${entry.title} evidence sources`}
        >
          <div className="mb-2">
            <div className="text-sm font-semibold">{entry.title}</div>
            {entry.description && <div className="text-xs text-slate-600">{entry.description}</div>}
          </div>
          <div className="space-y-2 max-h-64 overflow-auto pr-1">
            {entry.sources.map((s, i) => (
              <div key={i} className="text-xs">
                <div className="font-medium text-slate-800 break-words">{s.path}</div>
                <div className="text-slate-600">{s.why}</div>
              </div>
            ))}
          </div>
          <div className="pt-2 flex items-center justify-between">
            <Badge className="bg-slate-100 text-slate-700 border-2 border-slate-400">Traceability</Badge>
            <Button variant="outline" size="sm" className="border-2" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export { EvidenceBadge }
