"use client"

import ResponderDashboard from "@/components/responder/responder-dashboard"
import { BackToHome } from "@/components/navigation/BackToHome"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ResponderPortalPage() {
  return (
    <main className="min-h-screen bg-white">
      <BackToHome />
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">Responder Portal</h1>
          <p className="text-stone-600">
            Receive civilian check-ins, claim cases, and coordinate response with Scene Sync concepts.
          </p>
          <Card className="bg-stone-50">
            <CardContent className="p-4 flex flex-wrap gap-3 items-center">
              <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">
                First Responder OS
              </Badge>
              <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                Self SafeShare Scene Sync
              </Badge>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200">
                Mesh/Offline Ready
              </Badge>
            </CardContent>
          </Card>
        </header>

        <ResponderDashboard />
      </div>
    </main>
  )
}
