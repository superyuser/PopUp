import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AvatarGroup } from "@/components/avatar-group"
import { HypeIndicator } from "@/components/hype-indicator"
import { CalendarDays, MapPin, Clock } from "lucide-react"

export interface EventCardProps {
  id: string
  title: string
  community: string
  tags: string[]
  date: string
  time: string
  location: string
  attendees: {
    name: string
    image: string
  }[]
  hypeScore: number
  reason?: string
}

export function EventCard({
  id,
  title,
  community,
  tags,
  date,
  time,
  location,
  attendees,
  hypeScore,
  reason,
}: EventCardProps) {
  // Determine hype level based on score
  const hypeLevel = hypeScore < 30 ? "low" : hypeScore < 70 ? "medium" : "high"

  return (
    <Link href={`/event/${id}`}>
      <Card className={`overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg`}>
        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <Badge variant="outline" className="bg-muted text-xs font-medium">
              {community}
            </Badge>
            <HypeIndicator level={hypeLevel} score={hypeScore} />
          </div>

          <h3 className="mb-2 text-xl font-bold">{title}</h3>

          {reason && <p className="mb-2 text-xs text-muted-foreground">Because you liked {reason}</p>}

          <div className="mb-3 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mb-3 space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <AvatarGroup users={attendees} limit={3} />
            <span className="text-xs text-muted-foreground">{attendees.length} attending</span>
          </div>
        </CardContent>

        <CardFooter className="bg-muted/30 p-4">
          <Button
            className={`multitone-button w-full font-medium ${hypeLevel === "high" ? "animate-pulse-glow shadow-glow" : ""}`}
          >
            RSVP
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
