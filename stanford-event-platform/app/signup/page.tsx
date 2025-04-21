"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { AnimatedBackground } from "@/components/animated-background"
import { GlowingLogo } from "@/components/glowing-logo"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, ArrowLeft, Search } from "lucide-react"

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([])
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [animationDirection, setAnimationDirection] = useState<"forward" | "backward">("forward")

  // Available interests and communities
  const interests = [
    "tech",
    "design",
    "business",
    "arts",
    "sports",
    "music",
    "food",
    "outdoors",
    "gaming",
    "social impact",
    "entrepreneurship",
    "photography",
    "dance",
    "film",
    "politics",
    "environment",
  ]

  const communities = [
    "CS Club",
    "Design for America",
    "Stanford Entrepreneurs",
    "Basketball Club",
    "Acapella Group",
    "Film Society",
    "Resident Fellows",
    "Stanford Athletics",
    "English Department",
    "Research Association",
    "Outdoor Adventures",
    "Photography Club",
    "Dance Marathon",
    "Environmental Action",
    "Business Association",
  ]

  const filteredCommunities = communities.filter((community) =>
    community.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleNextStep = () => {
    setAnimationDirection("forward")
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setAnimationDirection("backward")
      setStep(step - 1)
    }
  }

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest))
    } else {
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  const handleCommunityToggle = (community: string) => {
    if (selectedCommunities.includes(community)) {
      setSelectedCommunities(selectedCommunities.filter((c) => c !== community))
    } else {
      setSelectedCommunities([...selectedCommunities, community])
    }
  }

  const handleComplete = () => {
    // Simulate redirect after completion
    setTimeout(() => {
      window.location.href = "/discover"
    }, 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (step === 1 && name) {
        handleNextStep()
      } else if (step === 2 && email && email.endsWith("@stanford.edu")) {
        handleNextStep()
      } else if (step === 3 && password && password.length >= 6) {
        handleNextStep()
      } else if (step === 4 && selectedInterests.length >= 3) {
        handleNextStep()
      } else if (step === 5 && selectedCommunities.length >= 3) {
        handleNextStep()
      } else if (step === 6) {
        handleComplete()
      }
    }
  }

  // Animation classes based on direction
  const getAnimationClass = () => {
    if (animationDirection === "forward") {
      return "animate-slide-in-right"
    } else {
      return "animate-slide-in-left"
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-10">
      <AnimatedBackground dimmed interactive={false} />

      <div className="z-10 w-full max-w-md px-4">
        <div className="mb-8 flex justify-center">
          <Link href="/">
            <GlowingLogo size="md" />
          </Link>
        </div>

        <div className="relative">
          {step > 1 && (
            <button
              onClick={handlePrevStep}
              className="absolute -top-12 left-0 text-white/60 hover:text-white flex items-center gap-1 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              back
            </button>
          )}

          {/* Step 1: Name */}
          {step === 1 && (
            <GlassCard className={getAnimationClass()}>
              <h2 className="mb-6 text-center text-2xl font-bold">what's your name?</h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="first & last name"
                    className="rounded-xl bg-background/50 border-muted text-center text-lg py-6"
                    onKeyDown={handleKeyDown}
                    autoFocus
                    required
                  />
                </div>

                <div className="pt-2">
                  <Button
                    onClick={handleNextStep}
                    className="w-full multitone-button font-medium py-6 rounded-full"
                    disabled={!name}
                  >
                    continue
                  </Button>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Step 2: Email */}
          {step === 2 && (
            <GlassCard className={getAnimationClass()}>
              <h2 className="mb-6 text-center text-2xl font-bold">enter your stanford email</h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.name@stanford.edu"
                    className="rounded-xl bg-background/50 border-muted text-center text-lg py-6"
                    onKeyDown={handleKeyDown}
                    autoFocus
                    required
                  />
                </div>

                <div className="pt-2">
                  <Button
                    onClick={handleNextStep}
                    className="w-full multitone-button font-medium py-6 rounded-full"
                    disabled={!email || !email.endsWith("@stanford.edu")}
                  >
                    continue
                  </Button>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Step 3: Password */}
          {step === 3 && (
            <GlassCard className={getAnimationClass()}>
              <h2 className="mb-6 text-center text-2xl font-bold">create a password</h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="rounded-xl bg-background/50 border-muted text-center text-lg py-6"
                    onKeyDown={handleKeyDown}
                    autoFocus
                    required
                  />
                  <p className="text-xs text-center text-white/60">minimum 6 characters</p>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={handleNextStep}
                    className="w-full multitone-button font-medium py-6 rounded-full"
                    disabled={!password || password.length < 6}
                  >
                    continue
                  </Button>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Step 4: Interests */}
          {step === 4 && (
            <GlassCard className={getAnimationClass()}>
              <h2 className="mb-2 text-center text-2xl font-bold">pick your interests</h2>
              <p className="mb-6 text-center text-sm text-white/60">select at least 3</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant={selectedInterests.includes(interest) ? "default" : "outline"}
                    className={`cursor-pointer text-sm py-1.5 px-3 transition-all hover:scale-105 ${
                      selectedInterests.includes(interest)
                        ? "bg-neon-lime text-background hover:bg-neon-lime/80"
                        : "bg-background/50 hover:bg-muted"
                    }`}
                    onClick={() => handleInterestToggle(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  onClick={handleNextStep}
                  className="w-full multitone-button font-medium py-6 rounded-full"
                  disabled={selectedInterests.length < 3}
                  onKeyDown={handleKeyDown}
                >
                  continue ({selectedInterests.length}/3)
                </Button>
              </div>
            </GlassCard>
          )}

          {/* Step 5: Communities */}
          {step === 5 && (
            <GlassCard className={getAnimationClass()}>
              <h2 className="mb-2 text-center text-2xl font-bold">find communities</h2>
              <p className="mb-6 text-center text-sm text-white/60">join at least 3 groups</p>

              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="search communities..."
                    className="pl-9 rounded-xl bg-background/50 border-muted"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="max-h-60 overflow-y-auto pr-2 space-y-2">
                  {filteredCommunities.map((community) => (
                    <div
                      key={community}
                      onClick={() => handleCommunityToggle(community)}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                        selectedCommunities.includes(community)
                          ? "bg-neon-lime/20 border border-neon-lime"
                          : "bg-background/50 border border-muted hover:bg-muted/30"
                      }`}
                    >
                      <span>{community}</span>
                      {selectedCommunities.includes(community) && <Check className="h-5 w-5 text-neon-lime" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-2">
                <Button
                  onClick={handleNextStep}
                  className="w-full multitone-button font-medium py-6 rounded-full"
                  disabled={selectedCommunities.length < 3}
                  onKeyDown={handleKeyDown}
                >
                  continue ({selectedCommunities.length}/3)
                </Button>
              </div>
            </GlassCard>
          )}

          {/* Step 6: Success */}
          {step === 6 && (
            <GlassCard className={getAnimationClass() + " text-center"}>
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full bg-neon-lime flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-background" />
                  </div>
                  <div className="absolute inset-0 rounded-full blur-xl bg-neon-lime/30 animate-pulse" />
                </div>

                <h2 className="text-3xl font-bold glow-text">you're in! 🎉</h2>

                <p className="text-white/80">welcome to vibe, {name.split(" ")[0]}</p>

                <div className="pt-4 w-full">
                  <Button
                    onClick={handleComplete}
                    className="w-full multitone-button font-medium py-6 rounded-full"
                    onKeyDown={handleKeyDown}
                  >
                    let's go
                  </Button>
                </div>
              </div>
            </GlassCard>
          )}
        </div>

        {step < 6 && (
          <div className="mt-6 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`h-2 w-2 rounded-full ${i === step ? "bg-neon-lime" : "bg-white/20"}`} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
