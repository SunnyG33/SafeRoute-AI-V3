"use client"

import { AlertTriangle } from 'lucide-react'
import { cn } from "@/lib/utils"

type Context =
  | "beta"
  | "emergency"
  | "routing"
  | "ai-assist"

type Props = {
  context?: Context[]
  className?: string
}

const defaultCopy: Record<Context, { title: string; body: string }> = {
  beta: {
    title: "Beta Notice",
    body:
      "This is a beta demonstration. Functionality may be incomplete. Do not rely on this system as your sole source of emergency information.",
  },
  emergency: {
    title: "Emergency Disclaimer",
    body:
      "This platform is not a substitute for calling 911 or your local emergency number. If you believe you are experiencing an emergency, call 911 immediately.",
  },
  routing: {
    title: "Routing Disclaimer",
    body:
      "Routing and hazard guidance are advisory. Local conditions, authorities, and cultural protocols take precedence. Always follow official instructions.",
  },
  "ai-assist": {
    title: "AI Assistance Disclaimer",
    body:
      "AI outputs may be incorrect or incomplete. Use professional judgment. Medical content is informational and not a diagnosis.",
  },
}

export default function LegalBanner({ context = ["beta", "emergency"], className }: Props) {
  return (
    <div
      className={cn(
        "w-full rounded-lg border-2 p-3 bg-amber-50 border-amber-200 text-amber-900",
        "flex items-start gap-3",
        className
      )}
      role="note"
      aria-label="Legal and safety notices"
    >
      <AlertTriangle className="h-5 w-5 text-amber-700 mt-0.5" />
      <div className="space-y-1">
        {context.map((c) => (
          <div key={c}>
            <div className="text-sm font-bold">{defaultCopy[c].title}</div>
            <div className="text-sm">{defaultCopy[c].body}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { LegalBanner }
