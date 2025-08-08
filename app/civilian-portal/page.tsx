"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SafeHeader } from "@/components/common/safe-header"
import { CalmToggle } from "@/components/civilian/calm-toggle"
import { QuickActions } from "@/components/civilian/quick-actions"
import { HelpStepper } from "@/components/civilian/help-stepper"
import SafetyCheckIn from "@/components/civilian/safety-check-in"
import { BottomSafeBar } from "@/components/civilian/bottom-safe-bar"

export default function CivilianPortalPage() {
  return (
    <main className="min-h-[100dvh] bg-slate-50 pb-20">
      <SafeHeader title="Civilian Portal" right={<CalmToggle />} />
      <section className="mx-auto max-w-6xl px-3 sm:px-4 py-4 grid gap-4">
        <Card className="border-l-8 border-l-emerald-600">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <QuickActions />
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Safety Check-In</CardTitle>
            </CardHeader>
            <CardContent>
              <SafetyCheckIn />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need help fast?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <HelpStepper />
            </CardContent>
          </Card>
        </div>
      </section>
      <BottomSafeBar />
    </main>
  )
}
