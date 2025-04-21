"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface GlowingLogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function GlowingLogo({ className, size = "lg" }: GlowingLogoProps) {
  const [flicker, setFlicker] = useState(1)

  useEffect(() => {
    const flickerInterval = setInterval(() => {
      // Random flicker effect
      if (Math.random() > 0.7) {
        setFlicker(Math.random() * 0.4 + 0.6) // Between 0.6 and 1.0
        setTimeout(() => setFlicker(1), 100) // Reset after 100ms
      }
    }, 500)

    return () => clearInterval(flickerInterval)
  }, [])

  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
    xl: "text-8xl",
  }

  return (
    <div className={cn("relative", className)}>
      <h1 className={cn("font-bold tracking-tight glow-text-pink", sizeClasses[size])} style={{ opacity: flicker }}>
        vibe
      </h1>
      <div className="absolute inset-0 blur-xl opacity-30 bg-neon-pink rounded-full animate-pulse" />
    </div>
  )
}
