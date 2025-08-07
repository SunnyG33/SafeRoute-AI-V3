"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { MapPin } from 'lucide-react'
import { cn } from "@/lib/utils"

interface Props {
  className?: string
}

export default function TLRTBanner({ className }: Props) {
  const [text, setText] = useState<string>("Enable location to recognize traditional territory")
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!("geolocation" in navigator)) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords
        // Demo heuristic for Vancouver core
        const inVancouver = lat > 49.2 && lat < 49.35 && lng > -123.26 && lng < -123.02
        if (inVancouver) {
          setText("Traditional Land Recognition: Musqueam, Squamish, and Tsleil-Waututh (Coast Salish Territories)")
          setActive(true)
        } else {
          setText("Traditional Land Recognition: Territory identified (demo)")
          setActive(true)
        }
      },
      () => {
        setText("Location unavailable. Showing generic territory message.")
        setActive(false)
      },
      { enableHighAccuracy: true, timeout: 7000 },
    )
  }, [])

  return (
    <div
      className={cn(
        "w-full rounded-lg border-2 p-3 flex items-center gap-2",
        active
          ? "bg-emerald-50 border-emerald-200 text-emerald-800"
          : "bg-slate-50 border-slate-200 text-slate-700",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <MapPin className={cn("h-4 w-4", active ? "text-emerald-700" : "text-slate-600")} />
      <span className="text-sm font-medium">{text}</span>
      <div className="ml-auto">
        <Badge variant="outline" className={active ? "border-emerald-400" : "border-slate-300"}>
          TLRT demo
        </Badge>
      </div>
    </div>
  )
}

export { TLRTBanner }
