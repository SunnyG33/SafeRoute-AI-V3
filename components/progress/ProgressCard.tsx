interface ProgressCardProps {
  category: string
  completion: number
  completed: string[]
  inProgress: string[]
  pending: string[]
  color: "green" | "blue" | "purple" | "orange" | "teal"
}

export function ProgressCard({ category, completion, completed, inProgress, pending, color }: ProgressCardProps) {
  const colorClasses = {
    green: {
      bg: "from-green-500/20 to-green-600/20",
      border: "border-green-500/30",
      progress: "bg-green-500",
      text: "text-green-400",
    },
    blue: {
      bg: "from-blue-500/20 to-blue-600/20",
      border: "border-blue-500/30",
      progress: "bg-blue-500",
      text: "text-blue-400",
    },
    purple: {
      bg: "from-purple-500/20 to-purple-600/20",
      border: "border-purple-500/30",
      progress: "bg-purple-500",
      text: "text-purple-400",
    },
    orange: {
      bg: "from-orange-500/20 to-orange-600/20",
      border: "border-orange-500/30",
      progress: "bg-orange-500",
      text: "text-orange-400",
    },
    teal: {
      bg: "from-teal-500/20 to-teal-600/20",
      border: "border-teal-500/30",
      progress: "bg-teal-500",
      text: "text-teal-400",
    },
  }

  const colors = colorClasses[color]

  return (
    <div className={`bg-gradient-to-br ${colors.bg} backdrop-blur-sm rounded-2xl border ${colors.border} p-6`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{category}</h2>
        <div className={`text-3xl font-bold ${colors.text}`}>{completion}%</div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-300 mb-2">
          <span>Progress</span>
          <span>{completion}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className={`${colors.progress} h-3 rounded-full transition-all duration-500`}
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-green-400 mb-3">✅ Completed ({completed.length})</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {completed.map((item, index) => (
              <div key={index} className="text-sm text-gray-300 bg-green-500/10 rounded-lg p-2">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-3">🔄 In Progress ({inProgress.length})</h3>
          <div className="space-y-2">
            {inProgress.map((item, index) => (
              <div key={index} className="text-sm text-gray-300 bg-yellow-500/10 rounded-lg p-2">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-400 mb-3">⏳ Pending ({pending.length})</h3>
          <div className="space-y-2">
            {pending.map((item, index) => (
              <div key={index} className="text-sm text-gray-300 bg-gray-500/10 rounded-lg p-2">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
