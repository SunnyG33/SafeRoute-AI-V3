export type Territory = {
  id: string
  name: string
  people?: string
  bbox: { minLat: number; minLng: number; maxLat: number; maxLng: number }
  note?: string
}

export const demoTerritories: Territory[] = [
  {
    id: "musqueam",
    name: "xʷməθkʷəy̓əm (Musqueam)",
    people: "Coast Salish",
    // Approximate bounding box around Vancouver/UBC
    bbox: { minLat: 49.20, minLng: -123.27, maxLat: 49.30, maxLng: -123.05 },
    note: "Approximate demo extent only; consult official sources for accuracy.",
  },
  {
    id: "squamish",
    name: "Sḵwx̱wú7mesh (Squamish)",
    people: "Coast Salish",
    bbox: { minLat: 49.27, minLng: -123.23, maxLat: 49.45, maxLng: -123.00 },
  },
  {
    id: "tsleil",
    name: "səl̓ílwətaʔɬ (Tsleil-Waututh)",
    people: "Coast Salish",
    bbox: { minLat: 49.28, minLng: -123.10, maxLat: 49.38, maxLng: -122.95 },
  },
]

export function territoriesAt(lat: number, lng: number): Territory[] {
  return demoTerritories.filter(
    (t) => lat >= t.bbox.minLat && lat <= t.bbox.maxLat && lng >= t.bbox.minLng && lng <= t.bbox.maxLng,
  )
}
