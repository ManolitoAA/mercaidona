import { Star, Clock, ShoppingBag, BarChart3, Sparkles } from "lucide-react"

interface SectionTitleProps {
  title: string
  subtitle?: string
  icon?: "star" | "clock" | "shopping-bag" | "chart" | "sparkles"
}

export default function SectionTitle({ title, subtitle, icon }: SectionTitleProps) {
  const renderIcon = () => {
    switch (icon) {
      case "star":
        return <Star size={18} className="text-amber-400" fill="currentColor" />
      case "clock":
        return <Clock size={18} className="text-blue-500" />
      case "shopping-bag":
        return <ShoppingBag size={18} className="text-gray-600" />
      case "chart":
        return <BarChart3 size={18} className="text-green-600" />
      case "sparkles":
        return <Sparkles size={18} className="text-purple-500" />
      default:
        return null
    }
  }

  return (
    <div className="flex items-start">
      {icon && <div className="mr-2 mt-1">{renderIcon()}</div>}
      <div>
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-xs text-gray-600">{subtitle}</p>}
      </div>
    </div>
  )
}
