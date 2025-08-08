import TLRTBanner from "@/components/common/tlrt-banner"
import SafetyCheckIn from "@/components/civilian/safety-check-in"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, ShieldAlert, BookText } from 'lucide-react'
import AlertFeed from "@/components/bodyguard/alert-feed"
import { LegalBanner } from "@/components/common/legal-banner"
import { EvidenceBadge } from "@/components/common/evidence-badge"
import LanguageSwitcher from "@/components/common/language-switcher"
import AccessibilityToolbar from "@/components/common/accessibility-toolbar"

export default function CivilianPortalPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/landing">
              <Button variant="outline" className="border-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Civilian Portal</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/bodyguard">
              <Button variant="outline" className="border-2">
                <ShieldAlert className="h-4 w-4 mr-2" />
                BodyGuard
              </Button>
            </Link>
            <Link href="/hero-mode-landing">
              <Button className="bg-red-600 text-white border-2 border-black">
                <Heart className="h-4 w-4 mr-2" />
                Open Hero Mode
              </Button>
            </Link>
            <AccessibilityToolbar />
            <EvidenceBadge moduleKey="civilian-portal" />
            <LanguageSwitcher />
            <Link href="/about/master-context">
              <Button variant="outline" className="border-2">
                <BookText className="h-4 w-4 mr-2" />
                Master Context
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 pt-4">
        <LegalBanner context={["beta","emergency","ai-assist"]} />
      </section>

      <section className="container mx-auto px-4 py-6">
        <TLRTBanner className="mb-6" />
        <div className="mb-6">
          <AlertFeed title="Emergency Alerts Near You" showAdminControls={false} compact nearbyFilter={{ lat: 49.2827, lng: -123.1207, radiusMeters: 5000 }} />
        </div>
        <SafetyCheckIn />
      </section>
    </main>
  )
}
