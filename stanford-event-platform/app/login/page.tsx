"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { AnimatedBackground } from "@/components/animated-background"
import { GlowingLogo } from "@/components/glowing-logo"
import { GlassCard } from "@/components/glass-card"
import { MultitoneButton } from "@/components/multitone-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/discover"
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && email && password) {
      handleSubmit(e)
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <AnimatedBackground dimmed interactive={false} />

      <div className="z-10 w-full max-w-md px-4">
        <div className="mb-8 flex justify-center">
          <Link href="/">
            <GlowingLogo size="md" />
          </Link>
        </div>

        <GlassCard>
          <h2 className="mb-6 text-center text-2xl font-bold">welcome back</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">
                email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.name@stanford.edu"
                className="rounded-xl bg-background/50 border-muted"
                onKeyDown={handleKeyDown}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm">
                password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-xl bg-background/50 border-muted"
                onKeyDown={handleKeyDown}
                required
              />
            </div>

            <div className="pt-2">
              <MultitoneButton type="submit" className="w-full relative" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="opacity-0">log in</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-5 w-5 rounded-full bg-background animate-ripple"></div>
                    </div>
                  </>
                ) : (
                  "log in"
                )}
              </MultitoneButton>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-white/60">
            don't have an account?{" "}
            <Link href="/signup" className="text-neon-lime hover:underline">
              create one
            </Link>
          </div>
        </GlassCard>
      </div>
    </main>
  )
}
