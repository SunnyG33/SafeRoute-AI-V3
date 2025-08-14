"use client"

import { useState } from "react"
import UniversalNavigation from "@/components/navigation/UniversalNavigation"
import { PresentationIcon as PresentationChart, Play, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const pitchSlides = [
  {
    title: "The Problem",
    subtitle: "Emergency Response Gaps Cost Lives",
    content:
      "Current emergency response systems fail civilians with complex interfaces, lack multi-agency coordination, and ignore indigenous sovereignty - resulting in preventable deaths and inefficient resource allocation.",
    stats: ["18 minutes average EMS response", "40% civilian CPR error rate", "Zero indigenous integration"],
    color: "from-red-500 to-pink-500",
  },
  {
    title: "Our Solution",
    subtitle: "AI-Powered Emergency Ecosystem",
    content:
      "SafeRoute AI delivers patent-protected visual-rhythm guidance for civilians and multi-agency orchestration for responders, creating the world's first comprehensive emergency response ecosystem.",
    stats: ["Visual-rhythm CPR guidance", "Multi-agency coordination", "Indigenous sovereignty respect"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Market Opportunity",
    subtitle: "$127B Global Emergency Management Market",
    content:
      "Massive addressable market with 15% CAGR driven by climate change, urbanization, and technology adoption. First-mover advantage in AI-powered civilian emergency response.",
    stats: ["$127B total market", "15% annual growth", "Untapped civilian segment"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Competitive Advantage",
    subtitle: "Patent-Protected Innovation",
    content:
      "Comprehensive patent portfolio protecting visual-rhythm guidance, multi-agency orchestration, and indigenous integration creates defensible moats against competition.",
    stats: ["Patent-pending technology", "First-to-market advantage", "Indigenous partnerships"],
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Financial Projections",
    subtitle: "Rapid Growth to $47M by Year 3",
    content:
      "SaaS model with government contracts, enterprise sales, and consumer subscriptions. Strong unit economics with 78% gross margins at scale.",
    stats: ["$2.3M Year 1 revenue", "$47M Year 3 revenue", "78% gross margins"],
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Funding Requirements",
    subtitle: "$3.5M Series A",
    content:
      "Funding for product development, market expansion, patent protection, and team scaling. Clear path to profitability and Series B readiness.",
    stats: ["$3.5M Series A", "18-month runway", "Series B ready"],
    color: "from-teal-500 to-green-500",
  },
]

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <UniversalNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500">
              <PresentationChart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Investor Pitch Deck</h1>
          </div>
          <p className="text-xl text-gray-300">Revolutionary AI-powered emergency response platform</p>
        </div>

        {/* Slide Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 bg-white/10 p-2 rounded-lg backdrop-blur-sm">
            {pitchSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-200
                  ${currentSlide === index ? "bg-cyan-400" : "bg-white/30 hover:bg-white/50"}
                `}
              />
            ))}
          </div>
        </div>

        {/* Current Slide */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`
            bg-gradient-to-br ${pitchSlides[currentSlide].color} p-1 rounded-2xl mb-8
          `}
          >
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">{pitchSlides[currentSlide].title}</h2>
              <h3 className="text-xl text-gray-200 mb-6">{pitchSlides[currentSlide].subtitle}</h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
                {pitchSlides[currentSlide].content}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {pitchSlides[currentSlide].stats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-white font-semibold">{stat}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center">
            <Button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              Previous
            </Button>

            <div className="flex gap-2">
              <Button className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white">
                <Play className="w-4 h-4 mr-2" />
                Start Presentation
              </Button>
            </div>

            <Button
              onClick={() => setCurrentSlide(Math.min(pitchSlides.length - 1, currentSlide + 1))}
              disabled={currentSlide === pitchSlides.length - 1}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-8">
          <span className="text-gray-400 text-sm">
            Slide {currentSlide + 1} of {pitchSlides.length}
          </span>
        </div>
      </div>
    </div>
  )
}
