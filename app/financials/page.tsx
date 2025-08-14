"use client"

import UniversalNavigation from "@/components/navigation/UniversalNavigation"
import { DollarSign, TrendingUp, PieChart, BarChart3, Target } from "lucide-react"

const financialData = {
  revenue: [
    { year: "Year 1", amount: "$2.3M", growth: "Launch" },
    { year: "Year 2", amount: "$12.7M", growth: "+452%" },
    { year: "Year 3", amount: "$47.2M", growth: "+271%" },
    { year: "Year 4", amount: "$89.1M", growth: "+89%" },
    { year: "Year 5", amount: "$156.8M", growth: "+76%" },
  ],
  revenueStreams: [
    { stream: "Government Contracts", percentage: 45, amount: "$70.6M" },
    { stream: "Enterprise SaaS", percentage: 30, amount: "$47.0M" },
    { stream: "Consumer Subscriptions", percentage: 15, amount: "$23.5M" },
    { stream: "Training & Certification", percentage: 10, amount: "$15.7M" },
  ],
  metrics: [
    { metric: "Gross Margin", value: "78%", trend: "+12%" },
    { metric: "Customer Acquisition Cost", value: "$2,400", trend: "-15%" },
    { metric: "Lifetime Value", value: "$18,600", trend: "+23%" },
    { metric: "Monthly Recurring Revenue", value: "$13.1M", trend: "+45%" },
  ],
}

export default function Financials() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900">
      <UniversalNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Financial Projections</h1>
          </div>
          <p className="text-xl text-gray-300">5-Year Financial Model & Investment Returns</p>
        </div>

        {/* Revenue Projections */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-400" />
            Revenue Growth Trajectory
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {financialData.revenue.map((year, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center"
              >
                <div className="text-sm text-gray-400 mb-2">{year.year}</div>
                <div className="text-2xl font-bold text-white mb-2">{year.amount}</div>
                <div className="text-sm text-green-400">{year.growth}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Streams */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-blue-400" />
            Revenue Streams (Year 5)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {financialData.revenueStreams.map((stream, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-semibold text-white">{stream.percentage}%</div>
                  <div className="text-sm text-gray-400">{stream.amount}</div>
                </div>
                <div className="text-gray-300 text-sm">{stream.stream}</div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                    style={{ width: `${stream.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-400" />
            Key Financial Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {financialData.metrics.map((metric, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="text-2xl font-bold text-white mb-2">{metric.value}</div>
                <div className="text-gray-300 text-sm mb-2">{metric.metric}</div>
                <div className="text-green-400 text-sm">{metric.trend}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Highlights */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-green-400" />
            Investment Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">$156.8M</div>
              <div className="text-gray-300">Year 5 Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">78%</div>
              <div className="text-gray-300">Gross Margin</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">7.8x</div>
              <div className="text-gray-300">LTV/CAC Ratio</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
