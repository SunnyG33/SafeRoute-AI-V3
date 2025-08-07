export default function MasterContextPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">SafeRoute AI — Master Context</h1>
          <p className="text-slate-600">Instant comprehension overview for product, patents, strategy, and priorities.</p>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8 space-y-10">
        <Block
          title="The Core"
          items={[
            "Operating system for global emergency response",
            "Satellite-enabled, offline-first platform connecting civilians, responders, governments, and Indigenous communities",
            "Patenting the pathways between systems to create a defensible ecosystem moat"
          ]}
        />
        <Block
          title="Empire Architecture"
          items={[
            "SafeRoute AI (Parent Platform) — Elder, Civilian, Government, Community portals",
            "SafeRoute OS (Backend Brain) — Orchestration, offline/online sync, satellite failover",
            "HERO + HERO OS — First aid revolution: civilian guidance + responder coordination",
            "RAPTRnav — Patient-condition-aware routing and disaster navigation",
            "LAB — Last Active Beacon satellite SOS",
            "ShareSafe — HIPAA-style consented medical data exchange",
            "LOGIQ — Evidence brain and predictive algorithms",
            "MESH — Patents on interconnections",
            "DOROTHY — Weather AI feeding hazard intelligence"
          ]}
        />
        <Block
          title="Moat Strategy"
          items={[
            "Patent fortress on pathways (not just features)",
            "Indigenous partnership and governance (Elder Portal control; co-ownership)",
            "Offline-first architecture with satellite integration",
            "Network effects across civilians, responders, routing, and data"
          ]}
        />
        <Block
          title="Current Priorities (Next 90 Days)"
          items={[
            "File patents #3-6 (HERO, RAPTRnav, LAB, ShareSafe)",
            "Indigenous partnership meetings; AFN connection",
            "Canadian grants (IRAP, Indigenous Innovation)",
            "LAB prototype (satellite ping demo)",
            "Advisory board: Indigenous leader + Emergency expert"
          ]}
        />
        <Block
          title="Go-To-Market"
          items={[
            "Start Indigenous/rural; use success to win government contracts",
            "Mandates drive urban adoption; expand globally as climate standard"
          ]}
        />
        <Block
          title="How to Talk About This"
          items={[
            "Government: Rural emergency response + reconciliation through Indigenous co-ownership and governance",
            "Investors: AWS of emergency response with network effects and patent moat",
            "Indigenous leaders: Your platform; 25% ownership, Elder Portal control",
            "Media: When towers fall, SafeRoute ensures no one is left behind"
          ]}
        />
        <p className="text-xs text-slate-500">
          Note: This page is a concise synthesis for onboarding teammates, grant reviewers, and advisors.
        </p>
      </section>
    </main>
  )
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <ul className="list-disc pl-5 space-y-1 text-slate-700">
        {items.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
    </div>
  )
}
