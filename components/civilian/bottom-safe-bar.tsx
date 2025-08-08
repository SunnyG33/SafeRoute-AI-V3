"use client"

import { Button } from "@/components/ui/button"
import { Shield } from 'lucide-react'
import { CalmingOverlayButton } from "@/components/common/calming-overlay"
import { useRouter } from "next/navigation"

export function BottomSafeBar() {
  const router = useRouter()
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur border-t">
      <div className="mx-auto max-w-6xl px-3 py-2 flex gap-2">
        <Button className="border-2" onClick={() => router.push("/hero-mode-landing")}>
          <Shield className="h-4 w-4 mr-2" />
          Hero Mode
        </Button>
        <CalmingOverlayButton />
        <div className="ml-auto text-xs text-slate-500 py-2 hidden sm:block">
          Demo only — call 911 in an emergency.
        </div>
      </div>
    </div>
  )
}
