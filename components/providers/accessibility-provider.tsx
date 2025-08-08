"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

type AccessibilityContextType = {
  jumbo: boolean
  highContrast: boolean
  toggleJumbo: () => void
  toggleHighContrast: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [jumbo, setJumbo] = useState<boolean>(() => {
    if (typeof window === "undefined") return false
    return localStorage.getItem("sr_jumbo") === "1"
  })
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    if (typeof window === "undefined") return false
    return localStorage.getItem("sr_hicon") === "1"
  })

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-jumbo", jumbo ? "true" : "false")
      localStorage.setItem("sr_jumbo", jumbo ? "1" : "0")
    }
  }, [jumbo])

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-high-contrast", highContrast ? "true" : "false")
      localStorage.setItem("sr_hicon", highContrast ? "1" : "0")
    }
  }, [highContrast])

  const value = useMemo(
    () => ({
      jumbo,
      highContrast,
      toggleJumbo: () => setJumbo((v) => !v),
      toggleHighContrast: () => setHighContrast((v) => !v),
    }),
    [jumbo, highContrast],
  )

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext)
  if (!ctx) throw new Error("useAccessibility must be used within AccessibilityProvider")
  return ctx
}
