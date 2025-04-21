"use client"

import { WelcomeBanner } from "@/components/welcome-banner"
import { FilterPills } from "@/components/filter-pills"
import { EventCard } from "@/components/event-card"
import { BottomNav } from "@/components/bottom-nav"

// Mock data
const filters = ["All", "Today", "This Week", "Free Food", "Sports", "Academic", "Arts", "Social"]

const events = [
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
    reason: "CS 106A",
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
  {
    id: "3",
    title: "Basketball Tournament",
    community: "Stanford Athletics",
    tags: ["Sports", "Outdoors"],
    date: "Saturday",
    time: "2:00 PM - 5:00 PM",
    location: "Maples Pavilion",
    attendees: [
      { name: "Alex Johnson", image: "/placeholder.svg?height=40&width=40" },
      { name: "Sam Wilson", image: "/placeholder.svg?height=40&width=40" },
      { name: "Casey Brown", image: "/placeholder.svg?height=40&width=40" },
      { name: "Jordan Lee", image: "/placeholder.svg?height=40&width=40" },
    ],
    hypeScore: 75,
    reason: "your friends",
  },
  {
    id: "4",
    title: "Poetry Reading",
    community: "English Department",
    tags: ["Arts", "Academic"],
    date: "Friday",
    time: "5:00 PM - 6:30 PM",
    location: "Meyer Library",
    attendees: [
      { name: "Taylor Swift", image: "/placeholder.svg?height=40&width=40" },
      { name: "Jordan Lee", image: "/placeholder.svg?height=40&width=40" },
    ],
    hypeScore: 45,
  },
]

export default function DiscoverPage() {
  return (
    <main className="container pb-20">
      <div className="py-6">
        <WelcomeBanner
          username="bubble"
          date="wednesday, april 17"
          onHypeHourToggle={(enabled) => console.log("Hype Hour:", enabled)}
        />

        <FilterPills filters={filters} onChange={(selected) => console.log("Selected filters:", selected)} />

        <div className="mt-6 space-y-4">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
