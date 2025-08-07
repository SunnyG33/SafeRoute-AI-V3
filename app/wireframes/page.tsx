import Link from "next/link"

export default function WireframesIndex() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">🛡️ SafeRoute AI Wireframes</h1>
          <p className="text-lg text-gray-600">Indigenous-First Emergency Response Platform</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mobile App Wireframes */}
          <Link href="/wireframes/mobile" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="text-6xl mb-4">📱</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Mobile App Wireframes</h2>
                <p className="text-gray-600 mb-6">
                  Interactive wireframes showing the mobile app user experience for community members and emergency
                  responders.
                </p>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg inline-block group-hover:bg-green-200 transition-colors">
                  View Mobile Wireframes →
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>✅ Territory Acknowledgment</span>
                  <span>✅ Emergency Features</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>✅ Main Dashboard</span>
                  <span>✅ Emergency Response</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Government Dashboard */}
          <Link href="/wireframes/dashboard" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="text-6xl mb-4">🖥️</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Government Dashboard</h2>
                <p className="text-gray-600 mb-6">
                  Emergency operations center dashboard for government officials and emergency management coordinators.
                </p>
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg inline-block group-hover:bg-blue-200 transition-colors">
                  View Dashboard →
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>✅ Emergency Overview</span>
                  <span>✅ Regional Map</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>✅ Community Status</span>
                  <span>✅ Real-time Metrics</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h3 className="text-2xl font-bold text-center mb-6">Key Features Demonstrated</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🏛️</div>
              <h4 className="font-bold mb-2">Indigenous-First Design</h4>
              <p className="text-sm text-gray-600">
                Territory acknowledgments, cultural protocols, and community sovereignty
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📡</div>
              <h4 className="font-bold mb-2">Starlink Integration</h4>
              <p className="text-sm text-gray-600">
                Satellite connectivity for remote communities and emergency situations
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🦸</div>
              <h4 className="font-bold mb-2">Community Heroes</h4>
              <p className="text-sm text-gray-600">Local responder network with cultural knowledge and training</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
