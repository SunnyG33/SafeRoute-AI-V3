"use client"

import { useSearchParams } from "next/navigation"
import AEDFinderComplete from "@/components/emergency/AEDFinderComplete"

export default function AEDFinderPage() {
  const searchParams = useSearchParams()
  const emergencyMode = searchParams.get("emergency") === "true"

  return <AEDFinderComplete emergencyMode={emergencyMode} />
}
