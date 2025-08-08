export type DataStatus = 'mock' | 'live' | 'static' | 'planned'
export type StorageKind = 'memory' | 'file' | 'remote' | 'browser'

export type DataSourceEntry = {
  id: string
  name: string
  routes: string[]
  status: DataStatus
  storage: StorageKind
  containsSensitive: boolean
  notes?: string
}

export const DATA_SOURCES: DataSourceEntry[] = [
  // Civilian and responder flows
  {
    id: 'incidents',
    name: 'Incidents & Events',
    routes: ['/hero-live/[id]', '/responder-portal/live/[id]', '/api/incidents', '/api/incidents/[id]', '/api/incidents/[id]/events'],
    status: 'mock',
    storage: 'memory',
    containsSensitive: true,
    notes: 'In-memory incident store and event bus for demo only; no durable storage.',
  },
  {
    id: 'checkins',
    name: 'Safety Check-ins',
    routes: ['/api/checkins', '/responder-portal'],
    status: 'mock',
    storage: 'memory',
    containsSensitive: true,
    notes: 'Transient in-memory array; not persisted. For demo/testing flows.',
  },
  {
    id: 'aed',
    name: 'AED Finder',
    routes: ['/aed-finder', '/aed-finder-complete'],
    status: 'mock',
    storage: 'browser',
    containsSensitive: false,
    notes: 'Nearby AED list is simulated; routing opens external maps.',
  },

  // Business/Docs
  {
    id: 'business_docs',
    name: 'Business & Grants Docs',
    routes: ['/business', '/api/business/list', '/api/business/read'],
    status: 'static',
    storage: 'file',
    containsSensitive: false,
    notes: 'Static Markdown/HTML files stored in-repo; read-only.',
  },

  // Cross-cutting
  {
    id: 'consent',
    name: 'Consent Tokens',
    routes: ['/api/consent/[id]'],
    status: 'mock',
    storage: 'memory',
    containsSensitive: true,
    notes: 'Placeholder for SafeShare; demo toggles only.',
  },
  {
    id: 'legal',
    name: 'Legal/Disclaimers',
    routes: ['/about/master-context'],
    status: 'static',
    storage: 'file',
    containsSensitive: false,
  },
  {
    id: 'audit',
    name: 'Demo Gaps',
    routes: ['/audit/demo-gaps'],
    status: 'static',
    storage: 'browser',
    containsSensitive: false,
    notes: 'Client-side list saved to localStorage for demonstration.',
  },
]
