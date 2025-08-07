import Link from "next/link"
import { redirect } from "next/navigation"

export default function HomePage() {
  redirect("/landing")

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-green-800 mb-6">🛡️ SafeRoute AI</h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Indigenous-First Emergency Response Platform powered by Starlink satellite technology, connecting remote
            communities with life-saving emergency services and local heroes.
          </p>
          <Link
            href="/wireframes"
            className="bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-800 transition-colors inline-block"
          >
            View Wireframes & Prototypes
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">🏛️</div>
            <h3 className="text-xl font-bold mb-3">Indigenous-First</h3>
            <p className="text-gray-600">
              Built in partnership with Indigenous communities, respecting traditional territories and cultural
              protocols.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">📡</div>
            <h3 className="text-xl font-bold mb-3">Satellite Connected</h3>
            <p className="text-gray-600">
              Starlink integration ensures connectivity even in the most remote locations when traditional networks
              fail.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">🦸</div>
            <h3 className="text-xl font-bold mb-3">Community Heroes</h3>
            <p className="text-gray-600">
              Local responder network with cultural knowledge and emergency training to help their communities.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Platform Components</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-bold text-lg mb-2">📱 Mobile Application</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• One-touch emergency activation</li>
                <li>• Territory acknowledgment and cultural respect</li>
                <li>• Real-time hero network connection</li>
                <li>• Offline emergency protocols</li>
                <li>• Multi-language support</li>
              </ul>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-bold text-lg mb-2">🖥️ Government Dashboard</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Real-time emergency monitoring</li>
                <li>• Indigenous community status tracking</li>
                <li>• Starlink network management</li>
                <li>• Hero deployment coordination</li>
                <li>• Cultural protocol compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
