interface FeatureStatusProps {
  status: "completed" | "inProgress" | "pending" | "urgent" | "medium"
  text: string
}

export function FeatureStatus({ status, text }: FeatureStatusProps) {
  const statusConfig = {
    completed: {
      icon: "✅",
      bgColor: "bg-green-500/10",
      textColor: "text-green-400",
      borderColor: "border-green-500/30",
    },
    inProgress: {
      icon: "🔄",
      bgColor: "bg-yellow-500/10",
      textColor: "text-yellow-400",
      borderColor: "border-yellow-500/30",
    },
    pending: {
      icon: "⏳",
      bgColor: "bg-gray-500/10",
      textColor: "text-gray-400",
      borderColor: "border-gray-500/30",
    },
    urgent: {
      icon: "🔥",
      bgColor: "bg-red-500/10",
      textColor: "text-red-400",
      borderColor: "border-red-500/30",
    },
    medium: {
      icon: "📋",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-400",
      borderColor: "border-blue-500/30",
    },
  }

  const config = statusConfig[status]

  return (
    <div
      className={`${config.bgColor} ${config.textColor} border ${config.borderColor} rounded-lg p-3 flex items-center gap-3`}
    >
      <span className="text-lg">{config.icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  )
}
