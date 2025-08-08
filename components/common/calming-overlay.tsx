"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X } from 'lucide-react'

export function CalmingOverlayButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button className="border-2" variant="outline" onClick={() => setOpen(true)}>
        Open Calming Overlay
      </Button>
      {open && <CalmingOverlay onClose={() => setOpen(false)} />}
    </>
  )
}

export function CalmingOverlay({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [count, setCount] = useState(4)
  const timerRef = useRef<number | null>(null)

  // Simple 4-4-4 breathing loop
  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setCount((c) => {
        if (c > 1) return c - 1
        // rotate phase
        setPhase((p) => (p === "inhale" ? "hold" : p === "hold" ? "exhale" : "inhale"))
        return 4
      })
    }, 1000)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [])

  // Prevent background scroll
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const instruction =
    phase === "inhale" ? "Inhale slowly" : phase === "hold" ? "Hold gently" : "Exhale slowly"

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4">
      <Card className="w-full max-w-md border-2">
        <CardContent className="p-6 grid place-items-center gap-4">
          <button
            aria-label="Close calming overlay"
            onClick={onClose}
            className="absolute top-2 right-2 p-2 rounded hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="text-lg font-semibold">Calming Overlay</div>
          <div className="relative h-48 w-48">
            <div
              className={`absolute inset-0 rounded-full bg-emerald-200/60 border-2 border-emerald-400 transition-all duration-1000`}
              style={{
                transform:
                  phase === "inhale" ? "scale(1.0)" : phase === "hold" ? "scale(1.1)" : "scale(0.9)",
              }}
            />
          </div>
          <div className="text-emerald-800 font-medium">{instruction}</div>
          <div className="text-slate-600">Next in: {count}</div>
          <div className="text-xs text-slate-500 text-center">
            This simple 4-4-4 breathing pattern can reduce panic and improve focus. Use as needed.
          </div>
          <Button className="border-2" onClick={onClose}>Close</Button>
        </CardContent>
      </Card>
    </div>
  )
}
