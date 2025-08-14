export default function SafeRouteAILanding() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-green-400 mb-4">SafeRoute AI - Test Page</h1>
        <p className="text-xl text-gray-300 mb-8">If you can see this, the basic routing is working.</p>
        <div className="space-y-4">
          <a href="/auth/login" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
            Go to Login
          </a>
          <br />
          <a
            href="/civilian-portal-hero"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Go to Civilian Portal
          </a>
        </div>
      </div>
    </div>
  )
}
