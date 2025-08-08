import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DATA_SOURCES } from '@/data/data-sources'
import { DataBadge } from '@/components/common/data-badge'
import Link from 'next/link'

export const dynamic = 'force-static'

export default function DataProvenancePage() {
  const items = DATA_SOURCES

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Data Provenance & Demo Disclosures</h1>
        <p className="text-slate-600 mt-1">
          This application is running in Demo Mode. The modules listed below indicate the source and storage of their data.
          No real-world personal data is used in this environment.
        </p>
      </div>

      <div className="grid gap-4">
        {items.map((it) => (
          <Card key={it.id} className="border">
            <CardHeader className="py-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                {it.name}
                <DataBadge source={it.status} />
                <span className="text-xs rounded border px-2 py-0.5 bg-slate-50 text-slate-700 border-slate-200">
                  Storage: {it.storage}
                </span>
                {it.containsSensitive ? (
                  <span className="text-xs rounded border px-2 py-0.5 bg-rose-50 text-rose-800 border-rose-200">
                    Potentially sensitive
                  </span>
                ) : null}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              {it.notes ? <p className="mb-2">{it.notes}</p> : null}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-500">Routes:</span>
                {it.routes.map((r) => (
                  <Link key={r} href={r.replace('[id]', 'demo1234')} className="text-xs underline underline-offset-2">
                    {r}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 border bg-amber-50">
        <CardHeader className="py-3">
          <CardTitle className="text-amber-900">Important Notice</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-amber-900">
          • All incident, location, AED, and medical data shown here is simulated and for demonstration only. Do not rely on this system in an emergency. Call 911. <br />
          • In production, these modules must connect to approved, compliant data sources with residency and privacy controls. <br />
          • See the repository docs for production readiness tasks and compliance work.
        </CardContent>
      </Card>
    </main>
  )
}
