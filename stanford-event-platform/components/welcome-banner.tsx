"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface WelcomeBannerProps {
  username: string
  date: string
  onHypeHourToggle?: (enabled: boolean) => void
}

export function WelcomeBanner({ username, date, onHypeHourToggle }: WelcomeBannerProps) {
  const [hypeHourEnabled, setHypeHourEnabled] = useState(false)

  const handleToggle = (checked: boolean) => {
    setHypeHourEnabled(checked)
    onHypeHourToggle?.(checked)
  }

  return (
    <div className="mb-6 rounded-xl bg-muted/30 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {username}!</h1>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="hype-hour"
            checked={hypeHourEnabled}
            onCheckedChange={handleToggle}
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-secondary"
          />
          <Label htmlFor="hype-hour" className="text-sm font-medium">
            Hype Hour
          </Label>
        </div>
      </div>
    </div>
  )
}
