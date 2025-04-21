import { cn } from "@/lib/utils"

interface HypeIndicatorProps {
  level: "low" | "medium" | "high"
  score: number
}

export function HypeIndicator({ level, score }: HypeIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className={cn(
          "h-2 w-16 overflow-hidden rounded-full bg-muted",
          level === "low" && "shadow-glow-blue",
          level === "medium" && "shadow-glow-orange",
          level === "high" && "shadow-glow-red animate-pulse-glow",
        )}
      >
        <div
          className={cn(
            "h-full rounded-full",
            level === "low" && "bg-hype-low",
            level === "medium" && "bg-hype-medium",
            level === "high" && "bg-hype-high",
          )}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs font-medium">
        {level === "low" && "Chill"}
        {level === "medium" && "Buzzing"}
        {level === "high" && "🔥 Hot"}
      </span>
    </div>
  )
}
