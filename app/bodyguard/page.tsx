import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import BroadcastConsole from "@/components/bodyguard/broadcast-console"
import AlertFeed from "@/components/bodyguard/alert-feed"
import EvacuationMap from "@/components/bodyguard/evacuation-map"
import LabBeacon from "@/components/bodyguard/lab-beacon"
import { ShieldAlert } from 'lucide-react'
import { EvidenceBadge } from "@/components/common/evidence-badge"
import { AccessibilityToolbar } from "@/components/common/accessibility-toolbar"

export default function BodyGuardPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-red-600" />
            <h1 className="text-xl font-bold">BodyGuard: Broadcast and Evacuation</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/civilian-portal">
              <Button variant="outline" className="border-2">Civilian Portal</Button>
            </Link>
            <Link href="/responder-portal">
              <Button className="border-2 bg-slate-900 text-white">Responder Portal</Button>
            </Link>
            <AccessibilityToolbar />
            <EvidenceBadge moduleKey="bodyguard" />
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-6 grid gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BroadcastConsole />
          <AlertFeed title="Live Alert Feed" showAdminControls />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EvacuationMap />
          <LabBeacon />
        </div>

        <Card className="border-2">
          <CardContent className="text-xs text-slate-600 p-4">
            {"Disclaimers: This demo simulates emergency broadcast, evacuation guidance, and LAB beacon functionality for demonstration. Do not use for real emergencies."}
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
