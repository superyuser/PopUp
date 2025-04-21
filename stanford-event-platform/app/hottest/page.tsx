"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/bottom-nav"
import { ProfileRing } from "@/components/profile-ring"
import { HypeIndicator } from "@/components/hype-indicator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FlameIcon as Fire, MessageSquare, Users, Sparkles, Clock, MapPin, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"

// Mock data for the hottest events
const hottestEvents = [
  {
    id: "1",
    title: "midnight silent disco",
    community: "music collective",
    tags: ["music", "late night", "social"],
    date: "friday",
    time: "11:30 PM - 2:00 AM",
    location: "meyer green",
    hypeScore: 92,
    hypeVelocity: "rising fast",
    attendees: [
      { name: "Alex Johnson", image: "/placeholder.svg?height=40&width=40", isActive: true },
      { name: "Taylor Swift", image: "/placeholder.svg?height=40&width=40", isActive: true },
      { name: "Jordan Lee", image: "/placeholder.svg?height=40&width=40", isActive: false },
      { name: "Sam Wilson", image: "/placeholder.svg?height=40&width=40", isActive: true },
      { name: "Casey Brown", image: "/placeholder.svg?height=40&width=40", isActive: false },
    ],
    mutualFriends: 3,
    chatActivity: "buzzing",
    badges: ["blowing up", "chat's buzzing"],
  },
  {
    id: "2",
    title: "cs + art exhibition",
    community: "design school",
    tags: ["art", "tech", "exhibition"],
    date: "saturday",
    time: "3:00 PM - 7:00 PM",
    location: "d.school",
    hypeScore: 87,
    hypeVelocity: "steady climb",
    attendees: [
      { name: "Jamie Smith", image: "/placeholder.svg?height=40&width=40", isActive: false },
      { name: "Riley Johnson", image: "/placeholder.svg?height=40&width=40", isActive: true },
      { name: "Morgan Chen", image: "/placeholder.svg?height=40&width=40", isActive: false },
      { name: "Pat Lee", image: "/placeholder.svg?height=40&width=40", isActive: true },
    ],
    mutualFriends: 2,
    chatActivity: "active",
    badges: ["trending", "squads mobilizing"],
  },
  {
    id: "3",
    title: "basketball afterparty",
    community: "athletics",
    tags: ["sports", "party", "free food"],
    date: "saturday",
    time: "9:00 PM - 12:00 AM",
    location: "row houses",
    hypeScore: 85,
    hypeVelocity: "new peak",
    attendees: [
      { name: "Jordan Smith", image: "/placeholder.svg?height=40&width=40", isActive: false },
      { name: "Taylor Jones", image: "/placeholder.svg?height=40&width=40", isActive: true },
      { name: "Alex Brown", image: "/placeholder.svg?height=40&width=40", isActive: false },
    ],
    mutualFriends: 5,
    chatActivity: "exploding",
    badges: ["squad favorite", "rsvp surge"],
  },
  {
    id: "4",
    title: "startup pitch night",
    community: "business association",
    tags: ["networking", "entrepreneurship"],
    date: "friday",
    time: "6:00 PM - 8:30 PM",
    location: "huang engineering",
    hypeScore: 78,
    hypeVelocity: "climbing",
    attendees: [
      { name: "Casey Brown", image: "/placeholder.svg?height=40&width=40", isActive: true },
      { name: "Jamie Smith", image: "/placeholder.svg?height=40&width=40", isActive: false },
      { name: "Riley Johnson", image: "/placeholder.svg?height=40&width=40", isActive: false },
    ],
    mutualFriends: 1,
    chatActivity: "active",
    badges: ["networking hotspot"],
  },
  {
    id: "5",
    title: "poetry slam + open mic",
    community: "english department",
    tags: ["arts", "performance"],
    date: "sunday",
    time: "7:00 PM - 9:00 PM",
    location: "tresidder union",
    hypeScore: 72,
    hypeVelocity: "steady",
    attendees: [
      { name: "Taylor Swift", image: "/placeholder.svg?height=40&width=40", isActive: false },
      { name: "Jordan Lee", image: "/placeholder.svg?height=40&width=40", isActive: false },
    ],
    mutualFriends: 2,
    chatActivity: "growing",
    badges: ["creative crowd"],
  },
]

// Time contexts for dynamic headers
const timeContexts = [
  { id: "tonight", label: "tonight", title: "hottest tonight 🌙" },
  { id: "weekend", label: "this weekend", title: "most popular this weekend 🔥" },
  { id: "week", label: "this week", title: "what's buzzing this week ✨" },
  { id: "special", label: "admit weekend", title: "top events during admit weekend 🎉" },
]

export default function HottestPage() {
  const [activeContext, setActiveContext] = useState("tonight")

  // Get the current context title
  const currentContext = timeContexts.find((context) => context.id === activeContext)?.title || "hottest events"

  // Badge color mapping
  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case "blowing up":
        return "bg-red-500/80 text-white"
      case "chat's buzzing":
        return "bg-purple-500/80 text-white"
      case "trending":
        return "bg-blue-500/80 text-white"
      case "squads mobilizing":
        return "bg-green-500/80 text-white"
      case "squad favorite":
        return "bg-yellow-500/80 text-black"
      case "rsvp surge":
        return "bg-orange-500/80 text-white"
      case "networking hotspot":
        return "bg-cyan-500/80 text-white"
      case "creative crowd":
        return "bg-pink-500/80 text-white"
      default:
        return "bg-muted text-foreground"
    }
  }

  // Badge icon mapping
  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "blowing up":
        return <Fire className="h-3 w-3" />
      case "chat's buzzing":
        return <MessageSquare className="h-3 w-3" />
      case "trending":
        return <TrendingUp className="h-3 w-3" />
      case "squads mobilizing":
        return <Users className="h-3 w-3" />
      case "squad favorite":
        return <Sparkles className="h-3 w-3" />
      case "rsvp surge":
        return <Zap className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <main className="container pb-20">
      <div className="py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{currentContext}</h1>
          <p className="text-sm text-muted-foreground">events ranked by real-time engagement</p>
        </div>

        <Tabs defaultValue="tonight" onValueChange={setActiveContext} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            {timeContexts.map((context) => (
              <TabsTrigger key={context.id} value={context.id}>
                {context.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {hottestEvents.map((event, index) => (
            <Link key={event.id} href={`/event/${event.id}`}>
              <Card
                className={`overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg ${
                  index === 0 ? "border-neon-lime shadow-glow" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <Badge variant="outline" className="bg-muted text-xs font-medium">
                      {event.community}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium text-muted-foreground">#{index + 1}</span>
                      <HypeIndicator
                        level={event.hypeScore > 80 ? "high" : event.hypeScore > 50 ? "medium" : "low"}
                        score={event.hypeScore}
                      />
                    </div>
                  </div>

                  <h3 className="mb-2 text-xl font-bold">{event.title}</h3>

                  <div className="mb-3 flex flex-wrap gap-1">
                    {event.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mb-3 space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        {event.date} · {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {event.badges.map((badge) => (
                      <Badge key={badge} className={`text-xs flex items-center gap-1 ${getBadgeStyle(badge)}`}>
                        {getBadgeIcon(badge)}
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {event.attendees.slice(0, 3).map((attendee, i) => (
                          <ProfileRing
                            key={i}
                            name={attendee.name}
                            image={attendee.image}
                            isActive={attendee.isActive}
                            size="sm"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {event.attendees.length} going
                        {event.mutualFriends > 0 && (
                          <span className="ml-1 text-primary">· {event.mutualFriends} friends</span>
                        )}
                      </span>
                    </div>

                    <Button
                      size="sm"
                      className={`multitone-button font-medium ${
                        event.hypeScore > 80 ? "animate-pulse-glow shadow-glow" : ""
                      }`}
                    >
                      RSVP
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
