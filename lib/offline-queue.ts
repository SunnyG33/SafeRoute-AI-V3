let queue: Array<{ url: string; options: RequestInit }> = []
let isOnline = true

export function initOfflineQueue() {
  if (typeof window === "undefined") return

  const updateOnlineStatus = () => {
    const wasOffline = !isOnline
    isOnline = navigator.onLine
    if (wasOffline && isOnline) {
      flushQueue()
    }
  }

  window.addEventListener("online", updateOnlineStatus)
  window.addEventListener("offline", updateOnlineStatus)
  updateOnlineStatus()
}

async function flushQueue() {
  const toProcess = [...queue]
  queue = []
  
  for (const { url, options } of toProcess) {
    try {
      await fetch(url, options)
    } catch (error) {
      // Re-queue if still failing
      queue.push({ url, options })
    }
  }
}

export async function offlineFetch(url: string, options: RequestInit = {}) {
  const fullOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: typeof options.body === "object" ? JSON.stringify(options.body) : options.body,
  }

  if (!isOnline) {
    queue.push({ url, options: fullOptions })
    return new Response(JSON.stringify({ queued: true }), { status: 202 })
  }

  try {
    return await fetch(url, fullOptions)
  } catch (error) {
    queue.push({ url, options: fullOptions })
    throw error
  }
}
