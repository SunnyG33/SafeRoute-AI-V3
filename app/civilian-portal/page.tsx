import SafetyCheckIn from "@/components/civilian/safety-check-in"
import { BackToHome } from "@/components/navigation/BackToHome"

export default function CivilianPortalPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <BackToHome />
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold">Civilian Portal</h1>
          <p className="text-stone-600 mt-1">
            Check in, request help, and share status with responders and community officials.
          </p>
        </header>
        <SafetyCheckIn />
        <footer className="text-center text-xs text-stone-500">
          Consent-first system aligned with OCAP. This demo simulates offline resilience and mesh readiness.
        </footer>
      </div>
    </main>
  )
}
