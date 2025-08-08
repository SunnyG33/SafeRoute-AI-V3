"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from 'lucide-react'

export function CalmToggle() {
  const [on, setOn] = useState<boolean>(false)

  useEffect(() => {
    const saved = localStorage.getItem("calm-mode")
    if (saved === "1") {
      setOn(true)
      document.documentElement.setAttribute("data-calm", "true")
    }
  }, [])

  function toggle() {
    const next = !on
    setOn(next)
    if (next) {
      document.documentElement.setAttribute("data-calm", "true")
      localStorage.setItem("calm-mode", "1")
    } else {
      document.documentElement.removeAttribute("data-calm")
      localStorage.removeItem("calm-mode")
    }
  }

  return (
    <Button variant={on ? "default" : "outline"} className="border-2" onClick={toggle} aria-pressed={on}>
      {on ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
      Calm Mode
    </Button>
  )
}
