// Very small demo SW: cache-first for root and manifest; network for API
const CACHE = "sr-demo-v1"
const ASSETS = ["/", "/manifest.webmanifest"]

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)))
})

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url)
  if (url.pathname === "/" || url.pathname === "/manifest.webmanifest") {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request)),
    )
    return
  }
  // pass-through for APIs
})
