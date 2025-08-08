import { NextRequest, NextResponse } from "next/server"
import { getIncidentEvents } from "@/lib/incident-store"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const events = await getIncidentEvents(params.id)
  
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  let markdown = `# Incident Report: ${params.id}

**Generated:** ${formatTimestamp(Date.now())}  
**Total Events:** ${events.length}

---

## Event Timeline

`

  for (const event of events) {
    markdown += `### ${formatTimestamp(event.at)} - ${event.type.replace("_", " ").toUpperCase()}
**Source:** ${event.from}  
`

    switch (event.type) {
      case "message":
        markdown += `**Message:** ${event.payload?.text}\n`
        break
      case "location":
        markdown += `**Location:** ${event.payload?.lat?.toFixed(5)}, ${event.payload?.lng?.toFixed(5)}`
        if (event.payload?.acc) markdown += ` (±${Math.round(event.payload.acc)}m)`
        markdown += `\n`
        break
      case "vitals":
        markdown += `**Vitals:**\n`
        if (event.payload?.pulse) markdown += `- Pulse: ${event.payload.pulse} BPM\n`
        if (event.payload?.bp_systolic && event.payload?.bp_diastolic) {
          markdown += `- BP: ${event.payload.bp_systolic}/${event.payload.bp_diastolic}\n`
        }
        if (event.payload?.respiratory_rate) markdown += `- Respiratory Rate: ${event.payload.respiratory_rate}\n`
        if (event.payload?.consciousness) markdown += `- Consciousness: ${event.payload.consciousness}\n`
        break
      case "911_call":
        markdown += `**Question:** ${event.payload?.question}\n`
        markdown += `**Answer:** ${event.payload?.answer}\n`
        break
      case "aed_deployed":
        markdown += `**AED Status:** ${event.payload?.deployed ? "Deployed" : "Removed"}\n`
        break
      case "consent":
        markdown += `**Consent:** ${event.payload?.action} for fields: ${event.payload?.fields?.join(", ")}\n`
        break
      case "elder_override":
        markdown += `**Elder Override:** ${event.payload?.active ? "Activated" : "Deactivated"}\n`
        if (event.payload?.note) markdown += `**Note:** ${event.payload.note}\n`
        break
      default:
        markdown += `**Data:** ${JSON.stringify(event.payload, null, 2)}\n`
    }
    
    markdown += `\n---\n\n`
  }

  markdown += `
## Report Footer

**System:** SafeRoute AI HERO OS  
**Environment:** Demo/Training  
**Disclaimer:** Not for clinical use  

*This report contains simulated emergency response data for training purposes only.*
`

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown",
      "Content-Disposition": `attachment; filename="incident-${params.id.slice(0, 8)}-report.md"`
    }
  })
}
