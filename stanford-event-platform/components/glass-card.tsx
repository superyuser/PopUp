import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export function GlassCard({ children, className }: GlassCardProps) {
  return <div className={cn("glass-card rounded-3xl p-8 shadow-lg", className)}>{children}</div>
}
