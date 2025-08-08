"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Accessibility, Eye, ZoomIn } from 'lucide-react'

export default function AccessibilityToolbar({
  className = "",
}: {
  className?: string
}) {
  const [jumbo, setJumbo] = useState(false)
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (jumbo) root.classList.add("text-[18px]", "md:text-[18px]")
    else root.classList.remove("text-[18px]", "md:text-[18px]")

    if (highContrast) root.classList.add("high-contrast")
    else root.classList.remove("high-contrast")
  }, [jumbo, highContrast])

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button variant="outline" className="border-2" onClick={() => setJumbo((s) => !s)} aria-pressed={jumbo}>
        <ZoomIn className="h-4 w-4 mr-2" />
        Jumbo
      </Button>
      <Button variant="outline" className="border-2" onClick={() => setHighContrast((s) => !s)} aria-pressed={highContrast}>
        <Eye className="h-4 w-4 mr-2" />
        High Contrast
      </Button>
      <div className="p-2 rounded border text-xs hidden sm:flex items-center gap-1">
        <Accessibility className="h-4 w-4" />
        Accessibility
      </div>
    </div>
  )
}
