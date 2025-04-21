import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProfileRing } from "@/components/profile-ring"
import { BottomNav } from "@/components/bottom-nav"
import { Users, Zap } from "lucide-react"

// Mock data
const friends = [
  {
    id: "1",
    name: "Alex Johnson",
    image: "/placeholder.svg?height=40&width=40",
    isActive: true,
    events: [
      { id: "1", title: "CS Department Mixer" },
      { id: "3", title: "Basketball Tournament" },
    ],
  },
  {
    id: "2",
    name: "Taylor Swift",
    image: "/placeholder.svg?height=40&width=40",
    isActive: false,
    events: [
      { id: "1", title: "CS Department Mixer" },
      { id: "2", title: "Midnight Pancakes" },
    ],
  },
  {
    id: "3",
    name: "Jordan Lee",
    image: "/placeholder.svg?height=40&width=40",
    isActive: false,
    events: [{ id: "4", title: "Poetry Reading" }],
  },
  {
    id: "4",
    name: "Sam Wilson",
    image: "/placeholder.svg?height=40&width=40",
    isActive: true,
    events: [
      { id: "2", title: "Midnight Pancakes" },
      { id: "3", title: "Basketball Tournament" },
    ],
  },
  {
    id: "5",
    name: "Casey Brown",
    image: "/placeholder.svg?height=40&width=40",
    isActive: false,
    events: [],
  },
]

export default function FriendsPage() {
  return (
    <main className="container pb-20">
      <div className="py-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Friends</h1>
          <Button className="multitone-button gap-2 font-medium">
            <Users className="h-4 w-4" />
            Create Squad
          </Button>
        </div>

        <div className="space-y-4">
          {friends.map((friend) => (
            <Card key={friend.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ProfileRing name={friend.name} image={friend.image} isActive={friend.isActive} />
                    <div>
                      <h3 className="font-medium">{friend.name}</h3>
                      {friend.events.length > 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Going to {friend.events.length} event{friend.events.length > 1 ? "s" : ""}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">Not attending any events</p>
                      )}
                    </div>
                  </div>

                  <Button variant="ghost" size="sm" className="h-8 gap-1 hover:bg-muted">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Nudge</span>
                  </Button>
                </div>

                {friend.events.length > 0 && (
                  <div className="mt-3 pl-12">
                    <h4 className="mb-1 text-xs font-medium text-muted-foreground">Attending</h4>
                    <div className="space-y-1">
                      {friend.events.map((event) => (
                        <div key={event.id} className="rounded-md bg-muted/30 px-3 py-2 text-sm">
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
