import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/bottom-nav"
import { Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

// Mock data for the week's events
const weekEvents = [
  {
    day: "Monday",
    date: "Apr 15",
    events: [
      {
        id: "1",
        title: "CS Department Mixer",
        time: "7:00 PM - 9:00 PM",
        location: "Gates Building",
        community: "CS Club",
        tags: ["Networking", "Free Food"],
      },
    ],
  },
  {
    day: "Tuesday",
    date: "Apr 16",
    events: [
      {
        id: "2",
        title: "Midnight Pancakes",
        time: "11:30 PM - 1:00 AM",
        location: "Wilbur Dining",
        community: "Resident Fellows",
        tags: ["Late Night", "Free Food"],
      },
    ],
  },
  {
    day: "Wednesday",
    date: "Apr 17",
    events: [],
  },
  {
    day: "Thursday",
    date: "Apr 18",
    events: [
      {
        id: "3",
        title: "Research Symposium",
        time: "3:00 PM - 5:00 PM",
        location: "Engineering Quad",
        community: "Research Association",
        tags: ["Academic", "Networking"],
      },
    ],
  },
  {
    day: "Friday",
    date: "Apr 19",
    events: [
      {
        id: "4",
        title: "Poetry Reading",
        time: "5:00 PM - 6:30 PM",
        location: "Meyer Library",
        community: "English Department",
        tags: ["Arts", "Academic"],
      },
    ],
  },
  {
    day: "Saturday",
    date: "Apr 20",
    events: [
      {
        id: "5",
        title: "Basketball Tournament",
        time: "2:00 PM - 5:00 PM",
        location: "Maples Pavilion",
        community: "Stanford Athletics",
        tags: ["Sports", "Outdoors"],
      },
      {
        id: "6",
        title: "Dorm Party",
        time: "9:00 PM - 1:00 AM",
        location: "Stern Hall",
        community: "Resident Fellows",
        tags: ["Social", "Late Night"],
      },
    ],
  },
  {
    day: "Sunday",
    date: "Apr 21",
    events: [],
  },
]

export default function MyWeekPage() {
  return (
    <main className="container pb-20">
      <div className="py-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Week</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">April 15-21</span>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {weekEvents.map((day) => (
            <div key={day.day}>
              <div className="mb-2 flex items-center gap-2">
                <h2 className="font-medium">{day.day}</h2>
                <span className="text-sm text-muted-foreground">{day.date}</span>
              </div>

              {day.events.length > 0 ? (
                <div className="space-y-3">
                  {day.events.map((event) => (
                    <Link key={event.id} href={`/event/${event.id}`}>
                      <Card className="overflow-hidden transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
                        <CardContent className="p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <Badge variant="outline" className="bg-muted text-xs font-medium">
                              {event.community}
                            </Badge>
                          </div>

                          <h3 className="mb-2 text-lg font-bold">{event.title}</h3>

                          <div className="mb-3 flex flex-wrap gap-1">
                            {event.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex h-16 items-center justify-center rounded-lg border border-dashed border-muted bg-muted/20">
                  <p className="text-sm text-muted-foreground">No events scheduled</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
