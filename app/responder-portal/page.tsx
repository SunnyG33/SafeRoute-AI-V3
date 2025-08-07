import ResponderDashboard from "@/components/responder/responder-dashboard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Activity, ShieldAlert } from 'lucide-react'
import AlertFeed from "@/components/bodyguard/alert-feed"

export default function ResponderPortalPage() {
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
            <h1 className="text-xl font-bold">Responder Portal</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/government-dashboard">
              <Button className="bg-blue-600 text-white border-2 border-black">
                <Activity className="h-4 w-4 mr-2" />
                Open EOC Dashboard
              </Button>
            </Link>
            <Link href="/bodyguard">
              <Button variant="outline" className="border-2">
                <ShieldAlert className="h-4 w-4 mr-2" />
                BodyGuard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-6">
        <ResponderDashboard />
      </section>
      <section className="container mx-auto px-4 py-6">
        <AlertFeed title="Broadcasts" showAdminControls={false} />
      </section>
    </main>
  )
}
