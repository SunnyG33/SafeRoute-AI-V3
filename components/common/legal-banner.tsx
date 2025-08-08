"use client"

import { legalCopy, type LegalContextKey } from "@/config/legal"
import { AlertTriangle } from 'lucide-react'
import { cn } from "@/lib/utils"

export function LegalBanner({ context = [], className = "" }: { context?: LegalContextKey[]; className?: string }) {
  if (!context.length) return null
  const texts = context.map((k) => legalCopy[k]).filter(Boolean)

  return (
    <div
      className={cn(
        "rounded-md border border-amber-300 bg-amber-50 text-amber-900 p-3 text-sm flex gap-2",
        className,
      )}
      role="note"
      aria-label="Important safety information"
    >
      <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-600" />
      <ul className="space-y-1">
        {texts.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  )
}
