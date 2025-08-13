"use client"

import { useState } from "react"
import { Phone, Heart, Shield, X } from "lucide-react"
import Link from "next/link"

export default function FloatingEmergencyButtons() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Emergency Buttons - Show when expanded */}
      {isExpanded && (
        <div className="flex flex-col gap-3 mb-4 animate-in slide-in-from-bottom-2 duration-200">
          {/* HERO Mode Button */}
          <Link href="/civilian-portal-hero">
            <button className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 group">
              <Heart className="w-5 h-5" />
              <span className="font-semibold">Emergency HERO Mode</span>
            </button>
          </Link>

          {/* AED Finder Button */}
          <button className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 group">
            <Heart className="w-5 h-5" />
            <span className="font-semibold">AED Finder</span>
          </button>

          {/* Check-in to Safety Button */}
          <button className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 group">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">Check-in to Safety</span>
          </button>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-200 hover:scale-110 flex items-center justify-center ${
          isExpanded ? "bg-gray-600 hover:bg-gray-700" : "bg-red-600 hover:bg-red-700 animate-pulse"
        } text-white`}
      >
        {isExpanded ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
      </button>

      {/* Emergency Label */}
      {!isExpanded && (
        <div className="absolute -top-2 -left-20 bg-red-600 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
          Emergency
        </div>
      )}
    </div>
  )
}
