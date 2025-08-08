"use client"

import { useEffect } from "react"

export default function RegisterSW() {
  useEffect(() => {
    if (typeof window === "undefined") return
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch(() => {
          // ignore registration errors in demo
        })
    }
  }, [])
  return null
}
