"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedBackgroundProps {
  className?: string
  particleCount?: number
  dimmed?: boolean
  interactive?: boolean
}

export function AnimatedBackground({
  className,
  particleCount = 20,
  dimmed = false,
  interactive = true,
}: AnimatedBackgroundProps) {
  const [particles, setParticles] = useState<
    Array<{ id: number; size: number; x: number; y: number; color: string; delay: number }>
  >([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const colors = ["#c4ff3e33", "#ff3e8a33", "#9d3eff33", "#3e8aff33"]
    const newParticles = []

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        size: Math.random() * 100 + 50,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 5,
      })
    }

    setParticles(newParticles)
  }, [particleCount])

  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [interactive])

  return (
    <div
      className={cn("animated-background fixed inset-0 z-0", dimmed && "opacity-80", className)}
      style={
        interactive
          ? {
              backgroundPosition: `${mousePosition.x * 10}% ${mousePosition.y * 10}%`,
              transition: "background-position 1s ease-out",
            }
          : {}
      }
    >
      <div className="particles-container">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: particle.color,
              animationDelay: `${particle.delay}s`,
              filter: "blur(40px)",
              transform: interactive
                ? `translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px)`
                : "none",
              transition: "transform 2s ease-out",
            }}
          />
        ))}
      </div>
    </div>
  )
}
