"use client"

import { useState, useRef } from "react"

const PatentPortfolio = () => {
  const [selectedPatent, setSelectedPatent] = useState(null)
  const containerRef = useRef(null)

  const patentData = {
    1: { title: "SafeRoute AI™", icon: "🛡️", status: "filed", description: "Master Platform" },
    2: { title: "SafeRoute OS™", icon: "⚙️", status: "filed", description: "Backend System" },
    3: { title: "HERO™ CP", icon: "🚨", status: "filed", description: "Civilian Platform" },
    4: { title: "HERO OS™", icon: "👨‍⚕️", status: "filed", description: "Responder Platform" },
    5: { title: "RAPTRnav™", icon: "🛰️", status: "ready", description: "Evacuation Routing" },
    6: { title: "ShareSafe™", icon: "🔒", status: "ready", description: "Encrypted Transfer" },
    7: { title: "LOGIQ™", icon: "🧠", status: "ready", description: "Learning Engine" },
    8: { title: "BodyGuard™", icon: "🚦", status: "ready", description: "Civic Alerts" },
    9: { title: "SkyBridge™", icon: "📡", status: "ready", description: "Fallback Comms" },
    10: { title: "Elder Portal", icon: "🌿", status: "ready", description: "Indigenous Interface" },
    11: { title: "Governance", icon: "🏛️", status: "ready", description: "OCAP® Layer" },
    12: { title: "DOROTHY™", icon: "🌡️", status: "ready", description: "Weather OS" },
    13: { title: "VITALsync™", icon: "🏥", status: "supporting", description: "Hospital Sync" },
    14: { title: "Mesh SDK", icon: "🔗", status: "supporting", description: "Hardware Kit" },
    15: { title: "Wildfire", icon: "🔥", status: "supporting", description: "Early Warning" },
    16: { title: "Flood Response", icon: "💧", status: "supporting", description: "Water Routing" },
    17: { title: "Mass Casualty", icon: "🚑", status: "supporting", description: "Multi-Agency" },
    18: { title: "NGO Portal", icon: "🤝", status: "supporting", description: "Aid Coordination" },
    19: { title: "Rescue Ops", icon: "🔍", status: "supporting", description: "SAR Interface" },
    20: { title: "Hospital Intake", icon: "🏨", status: "supporting", description: "Bed Matching" },
    21: { title: "Fire & Rescue", icon: "🚒", status: "supporting", description: "Integration Layer" },
    22: { title: "Gov Alert", icon: "📢", status: "supporting", description: "Emergency Comms" },
  }

  const getNodePosition = (index, total, radius) => {
    const angle = index * (360 / total) - 90
    const radian = (angle * Math.PI) / 180
    return {
      x: 50 + radius * Math.cos(radian), // Use percentage-based positioning
      y: 50 + radius * Math.sin(radian),
    }
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-hidden">
      {/* Orbital Rings - Centered properly */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-[280px] h-[280px] border border-blue-500/20 rounded-full"></div>
        <div className="absolute w-[480px] h-[480px] border border-pink-500/15 rounded-full"></div>
        <div className="absolute w-[680px] h-[680px] border border-cyan-500/10 rounded-full"></div>
      </div>

      {/* Central Hub - Properly centered */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex flex-col items-center justify-center shadow-[0_0_60px_rgba(102,126,234,0.8)] z-10 cursor-pointer hover:scale-105 transition-transform">
        <h1 className="text-white text-[15px] font-bold text-center mb-1">SAFEROUTE AI</h1>
        <div className="text-white/90 text-[9px] text-center">Master Orchestration</div>
      </div>

      {/* Patent Nodes - Fixed positioning */}
      <div className="absolute inset-0" ref={containerRef}>
        {/* Layer 1: Filed Patents - Inner orbit at 140px radius */}
        {[1, 2, 3, 4].map((id, index) => {
          const angle = index * 90 - 90 // 90 degrees apart
          const radian = (angle * Math.PI) / 180
          const x = 50 + (140 / 7) * Math.cos(radian) // Convert to viewport percentage
          const y = 50 + (140 / 7) * Math.sin(radian)

          return (
            <div
              key={id}
              onClick={() => setSelectedPatent(patentData[id])}
              className="absolute w-[90px] h-[90px] bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex flex-col items-center justify-center shadow-lg cursor-pointer hover:scale-110 hover:z-20 transition-all -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div className="text-[22px] mb-1">{patentData[id].icon}</div>
              <div className="text-white text-[10px] font-bold text-center px-1">{patentData[id].title}</div>
              <div className="text-white/90 text-[7px] text-center">{patentData[id].description}</div>
            </div>
          )
        })}

        {/* Layer 2: Ready Patents - Middle orbit at 240px radius */}
        {[5, 6, 7, 8, 9, 10, 11, 12].map((id, index) => {
          const angle = index * 45 - 90 // 45 degrees apart
          const radian = (angle * Math.PI) / 180
          const x = 50 + (240 / 7) * Math.cos(radian)
          const y = 50 + (240 / 7) * Math.sin(radian)

          return (
            <div
              key={id}
              onClick={() => setSelectedPatent(patentData[id])}
              className="absolute w-[75px] h-[75px] bg-gradient-to-br from-[#f093fb] to-[#f5576c] rounded-xl flex flex-col items-center justify-center shadow-lg cursor-pointer hover:scale-110 hover:z-20 transition-all -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div className="text-[19px] mb-1">{patentData[id].icon}</div>
              <div className="text-white text-[9px] font-bold text-center px-1">{patentData[id].title}</div>
              <div className="text-white/90 text-[6px] text-center">{patentData[id].description}</div>
            </div>
          )
        })}

        {/* Layer 3: Supporting Patents - Outer orbit at 340px radius */}
        {[13, 14, 15, 16, 17, 18, 19, 20, 21, 22].map((id, index) => {
          const angle = index * 36 - 90 // 36 degrees apart
          const radian = (angle * Math.PI) / 180
          const x = 50 + (340 / 7) * Math.cos(radian)
          const y = 50 + (340 / 7) * Math.sin(radian)

          return (
            <div
              key={id}
              onClick={() => setSelectedPatent(patentData[id])}
              className="absolute w-[65px] h-[65px] bg-gradient-to-br from-[#4facfe] to-[#00f2fe] rounded-xl flex flex-col items-center justify-center shadow-lg cursor-pointer hover:scale-110 hover:z-20 transition-all -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div className="text-[17px]">{patentData[id].icon}</div>
              <div className="text-white text-[8px] font-bold text-center px-1">{patentData[id].title}</div>
              <div className="text-white/90 text-[6px] text-center">{patentData[id].description}</div>
            </div>
          )
        })}
      </div>

      {/* Info Boxes */}
      <div className="absolute top-10 left-10 bg-white/95 p-4 rounded-xl w-[190px] shadow-xl z-50">
        <div className="text-[13px] font-bold text-gray-800 mb-3">Patent Portfolio</div>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full mr-2"></div>
            <div className="text-[11px] text-gray-600">
              <span className="font-bold text-gray-800">Filed (4)</span> - Core Platform
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gradient-to-br from-[#f093fb] to-[#f5576c] rounded-full mr-2"></div>
            <div className="text-[11px] text-gray-600">
              <span className="font-bold text-gray-800">Ready (8)</span> - Expanding
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gradient-to-br from-[#4facfe] to-[#00f2fe] rounded-full mr-2"></div>
            <div className="text-[11px] text-gray-600">
              <span className="font-bold text-gray-800">Supporting (10)</span> - Infrastructure
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-10 right-10 bg-white/95 p-4 rounded-xl w-[200px] shadow-xl z-50">
        <div className="text-[13px] font-bold text-gray-800 mb-3">Orbital Architecture</div>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-[22px] h-[22px] bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white text-[10px] font-semibold mr-2">
              1
            </div>
            <div className="text-[11px] text-gray-600">
              <strong className="text-gray-800">Inner Orbit</strong>
              <br />
              Core Patents (4)
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[22px] h-[22px] bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white text-[10px] font-semibold mr-2">
              2
            </div>
            <div className="text-[11px] text-gray-600">
              <strong className="text-gray-800">Middle Orbit</strong>
              <br />
              Expansion Ring (8)
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[22px] h-[22px] bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white text-[10px] font-semibold mr-2">
              3
            </div>
            <div className="text-[11px] text-gray-600">
              <strong className="text-gray-800">Outer Orbit</strong>
              <br />
              Supporting Tech (10)
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-24 left-10 bg-white/95 p-4 rounded-xl w-[190px] shadow-xl z-50">
        <div className="text-[13px] font-bold text-gray-800 mb-3">Portfolio Status</div>
        <div className="space-y-1 text-[11px]">
          <div className="flex justify-between">
            <span className="text-gray-600">Patents Filed:</span>
            <span className="text-[#667eea] font-bold">4</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ready to File:</span>
            <span className="text-[#667eea] font-bold">8</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Supporting Tech:</span>
            <span className="text-[#667eea] font-bold">10</span>
          </div>
          <div className="flex justify-between pt-2 mt-2 border-t border-gray-200 font-bold">
            <span className="text-gray-700">Total Modules:</span>
            <span className="text-[#667eea]">22</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-24 right-10 bg-white/95 p-4 rounded-xl w-[240px] shadow-xl z-50">
        <div className="flex items-center gap-2 text-[14px] font-bold text-gray-800 mb-2">
          <span>📍</span>
          <span>Click any module for details</span>
        </div>
        <p className="text-[11px] text-gray-600">
          Click on any patent node or the central hub to see detailed information about that component.
        </p>
      </div>

      {/* Modal */}
      {selectedPatent && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] animate-fadeIn"
          onClick={() => setSelectedPatent(null)}
        >
          <div
            className="bg-white p-8 rounded-2xl max-w-[600px] w-[90%] relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPatent(null)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-2xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
            >
              ×
            </button>
            <div className="flex items-center gap-4 mb-5 pb-4 border-b-2 border-gray-200">
              <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-3xl shadow-lg">
                {selectedPatent.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-[1.8em] font-bold text-gray-800 mb-1">{selectedPatent.title}</h2>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white
                  ${
                    selectedPatent.status === "filed"
                      ? "bg-gradient-to-r from-[#667eea] to-[#764ba2]"
                      : selectedPatent.status === "ready"
                        ? "bg-gradient-to-r from-[#f093fb] to-[#f5576c]"
                        : "bg-gradient-to-r from-[#4facfe] to-[#00f2fe]"
                  }`}
                >
                  {selectedPatent.status === "filed"
                    ? "Patent Filed"
                    : selectedPatent.status === "ready"
                      ? "Ready to File"
                      : "Supporting Technology"}
                </span>
              </div>
            </div>
            <div className="text-gray-700 leading-relaxed">
              <h4 className="text-[#667eea] text-lg font-semibold mt-5 mb-2 pb-1 border-b border-blue-200">
                Description
              </h4>
              <p className="text-gray-600 mb-4">{selectedPatent.description}</p>
              <h4 className="text-[#667eea] text-lg font-semibold mt-5 mb-2 pb-1 border-b border-blue-200">
                Key Features
              </h4>
              <ul className="space-y-2">
                <li className="pl-6 relative text-gray-600">
                  <span className="absolute left-0 text-[#667eea]">→</span>
                  100% Offline Capable
                </li>
                <li className="pl-6 relative text-gray-600">
                  <span className="absolute left-0 text-[#667eea]">→</span>
                  Indigenous Data Sovereignty
                </li>
                <li className="pl-6 relative text-gray-600">
                  <span className="absolute left-0 text-[#667eea]">→</span>
                  Multi-layer Fallback
                </li>
                <li className="pl-6 relative text-gray-600">
                  <span className="absolute left-0 text-[#667eea]">→</span>
                  AI-Guided Response
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PatentPortfolio
