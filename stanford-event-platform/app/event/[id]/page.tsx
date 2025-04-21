import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProfileRing } from "@/components/profile-ring"
import { BottomNav } from "@/components/bottom-nav"
import { ArrowLeft, MapPin, Calendar, Clock, MessageSquare, Users } from "lucide-react"

// Mock data for a single event
const event = {
  id: "1",
  title: "CS Department Mixer",
  community: "CS Club",
  tags: ["Networking", "Free Food"],
  date: "Today",
  time: "7:00 PM - 9:00 PM",
  location: "Gates Building",
  description:
    "Join us for the annual CS Department Mixer! Meet professors, TAs, and fellow students while enjoying free food and drinks. Great opportunity to learn about research opportunities and upcoming courses.",
  attendees: [
    { name: "Alex Johnson", image: "/placeholder.svg?height=40&width=40", isActive: true },
    { name: "Taylor Swift", image: "/placeholder.svg?height=40&width=40", isActive: true },
    { name: "Jordan Lee", image: "/placeholder.svg?height=40&width=40", isActive: false },
    { name: "Sam Wilson", image: "/placeholder.svg?height=40&width=40", isActive: false },
    { name: "Casey Brown", image: "/placeholder.svg?height=40&width=40", isActive: true },
    { name: "Jamie Smith", image: "/placeholder.svg?height=40&width=40", isActive: false },
    { name: "Riley Johnson", image: "/placeholder.svg?height=40&width=40", isActive: false },
    { name: "Morgan Chen", image: "/placeholder.svg?height=40&width=40", isActive: false },
    { name: "Pat Lee", image: "/placeholder.svg?height=40&width=40", isActive: false },
    { name: "Jordan Smith", image: "/placeholder.svg?height=40&width=40", isActive: false },
    { name: "Taylor Jones", image: "/placeholder.svg?height=40&width=40", isActive: false },
    { name: "Alex Brown", image: "/placeholder.svg?height=40&width=40", isActive: false },
  ],
  hypeScore: 85,
  friends: ["Alex Johnson", "Taylor Swift", "Jordan Lee"],
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const activeAttendees = event.attendees.filter((a) => a.isActive)

  return (
    <main className="pb-20">
      <div className="relative h-48 bg-gradient-to-b from-secondary to-background">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] bg-cover bg-center opacity-20 mix-blend-overlay" />

        <div className="container relative pt-6">
          <Link href="/discover" className="inline-flex items-center text-sm text-white/80 hover:text-white">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Link>
        </div>
      </div>

      <div className="container -mt-12">
        <div className="rounded-xl bg-muted/30 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <Badge variant="outline" className="mb-2 bg-muted text-xs font-medium">
                {event.community}
              </Badge>
              <h1 className="mb-1 text-2xl font-bold">{event.title}</h1>

              <div className="mb-4 flex flex-wrap gap-1">
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Users className="h-4 w-4" />
                <span>Interested</span>
              </Button>
              <Button size="sm" className="h-9 gap-1 multitone-button font-medium">
                Going
              </Button>
            </div>
          </div>

          <div className="mb-6 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          </div>

          <p className="mb-6 text-sm leading-relaxed">{event.description}</p>

          {activeAttendees.length > 0 && (
            <div className="mb-6 rounded-lg bg-muted/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm font-medium text-primary">
                  {activeAttendees.length} people are already there 🔥
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeAttendees.map((attendee, index) => (
                  <ProfileRing key={index} name={attendee.name} image={attendee.image} isActive={true} size="sm" />
                ))}
              </div>
            </div>
          )}

          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium">Going with</h3>
            <div className="flex flex-wrap gap-2">
              {event.friends.map((friend, index) => (
                <Badge key={index} variant="outline" className="bg-muted/50">
                  {friend}
                </Badge>
              ))}
            </div>
          </div>

          <Button className="w-full gap-2 multitone-button font-medium">
            <MessageSquare className="h-4 w-4" />
            Join Chat
          </Button>
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
