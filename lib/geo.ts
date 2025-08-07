export function toRad(deg: number) {
  return (deg * Math.PI) / 180
}

export function haversineMeters(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371e3
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)

  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2)

  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)))
}

export function isWithinRadius(
  point: { lat: number; lng: number },
  center: { lat: number; lng: number },
  radiusMeters: number
) {
  return haversineMeters(point, center) <= radiusMeters
}
