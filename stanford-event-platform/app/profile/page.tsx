"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ProfileRing } from "@/components/profile-ring"
import { BottomNav } from "@/components/bottom-nav"
import { EventCard } from "@/components/event-card"
import { Users, Shield } from "lucide-react"

// Mock data
const user = {
  name: "Bubble",
  username: "@bubble",
  image: "/placeholder.svg?height=80&width=80",
  isActive: true,
  communities: [
    { id: "1", name: "CS Club", role: "Member" },
    { id: "2", name: "Resident Fellows", role: "Moderator" },
    { id: "3", name: "Stanford Athletics", role: "Member" },
  ],
  upcomingEvents: [
    {
      id: "1",
      title: "CS Department Mixer",
      community: "CS Club",
      tags: ["Networking", "Free Food"],
      date: "Today",
      time: "7:00 PM - 9:00 PM",
      location: "Gates Building",
      attendees: [
        { name: "Alex Johnson", image: "/placeholder.svg?height=40&width=40" },
        { name: "Taylor Swift", image: "/placeholder.svg?height=40&width=40" },
        { name: "Jordan Lee", image: "/placeholder.svg?height=40&width=40" },
      ],
      hypeScore: 85,
    },
    {
      id: "2",
      title: "Midnight Pancakes",
      community: "Resident Fellows",
      tags: ["Late Night", "Free Food"],
      date: "Tomorrow",
      time: "11:30 PM - 1:00 AM",
      location: "Wilbur Dining",
      attendees: [
        { name: "Jamie Smith", image: "/placeholder.svg?height=40&width=40" },
        { name: "Riley Johnson", image: "/placeholder.svg?height=40&width=40" },
      ],
      hypeScore: 65,
    },
  ],
  pastEvents: [
    {
      id: "5",
      title: "Startup Career Fair",
      community: "Business Association",
      tags: ["Networking", "Career"],
      date: "Last Week",
      time: "1:00 PM - 4:00 PM",
      location: "Tresidder Union",
      attendees: [
        { name: "Alex Johnson", image: "/placeholder.svg?height=40&width=40" },
        { name: "Taylor Swift", image: "/placeholder.svg?height=40&width=40" },
        { name: "Jordan Lee", image: "/placeholder.svg?height=40&width=40" },
      ],
      hypeScore: 70,
    },
  ],
  memories: [
    { id: "1", image: "/placeholder.svg?height=200&width=200", event: "CS Department Mixer" },
    { id: "2", image: "/placeholder.svg?height=200&width=200", event: "Midnight Pancakes" },
    { id: "3", image: "/placeholder.svg?height=200&width=200", event: "Basketball Tournament" },
    { id: "4", image: "/placeholder.svg?height=200&width=200", event: "Poetry Reading" },
    { id: "5", image: "/placeholder.svg?height=200&width=200", event: "Startup Career Fair" },
    { id: "6", image: "/placeholder.svg?height=200&width=200", event: "Dorm Party" },
  ],
}

export default function ProfilePage() {
  const [hideEventHistory, setHideEventHistory] = useState(false)
  const [hideFutureEvents, setHideFutureEvents] = useState(false)

  return (
    <main className="container pb-20">
      <div className="py-6">
        <div className="mb-6 flex items-center gap-4">
          <ProfileRing name={user.name} image={user.image} isActive={user.isActive} size="lg" />

          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.username}</p>
          </div>
        </div>

        <Tabs defaultValue="communities">
          <TabsList className="mb-4 grid w-full grid-cols-4">
            <TabsTrigger value="communities">Communities</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="memories">Memories</TabsTrigger>
          </TabsList>

          <TabsContent value="communities" className="space-y-4">
            {user.communities.map((community) => (
              <Card key={community.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{community.name}</h3>
                      <p className="text-sm text-muted-foreground">{community.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {!hideFutureEvents ? (
              user.upcomingEvents.map((event) => <EventCard key={event.id} {...event} />)
            ) : (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-muted">
                <p className="text-muted-foreground">Future events are hidden</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {!hideEventHistory ? (
              user.pastEvents.map((event) => <EventCard key={event.id} {...event} />)
            ) : (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-muted">
                <p className="text-muted-foreground">Event history is hidden</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="memories">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {user.memories.map((memory) => (
                <div key={memory.id} className="group relative aspect-square overflow-hidden rounded-lg">
                  <img
                    src={memory.image || "/placeholder.svg"}
                    alt={memory.event}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {memory.event}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 space-y-4 rounded-lg bg-muted/30 p-4">
          <h2 className="flex items-center gap-2 text-lg font-medium">
            <Shield className="h-5 w-5" />
            Privacy Settings
          </h2>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="hide-history" className="text-sm font-medium">
                Hide event history
              </Label>
              <p className="text-xs text-muted-foreground">Hide your past events from other users</p>
            </div>
            <Switch id="hide-history" checked={hideEventHistory} onCheckedChange={setHideEventHistory} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="hide-future" className="text-sm font-medium">
                Hide future events from non-friends
              </Label>
              <p className="text-xs text-muted-foreground">Only friends can see events you're attending</p>
            </div>
            <Switch id="hide-future" checked={hideFutureEvents} onCheckedChange={setHideFutureEvents} />
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
