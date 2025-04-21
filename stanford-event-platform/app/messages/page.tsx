"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileRing } from "@/components/profile-ring"
import { BottomNav } from "@/components/bottom-nav"
import { Search, MessageSquare } from "lucide-react"

// Mock data for messages
const directMessages = [
  {
    id: "1",
    name: "Alex Johnson",
    image: "/placeholder.svg?height=40&width=40",
    isActive: true,
    lastMessage: "Are you going to the CS mixer tonight?",
    time: "5m ago",
    unread: 2,
  },
  {
    id: "2",
    name: "Taylor Swift",
    image: "/placeholder.svg?height=40&width=40",
    isActive: false,
    lastMessage: "Let's meet at the entrance at 7:15",
    time: "1h ago",
    unread: 0,
  },
  {
    id: "3",
    name: "Jordan Lee",
    image: "/placeholder.svg?height=40&width=40",
    isActive: false,
    lastMessage: "Did you see the new event posted by the CS club?",
    time: "3h ago",
    unread: 0,
  },
]

const eventChats = [
  {
    id: "1",
    title: "CS Department Mixer",
    image: "/placeholder.svg?height=40&width=40",
    lastMessage: "Alex: Does anyone know if there's parking nearby?",
    time: "10m ago",
    unread: 5,
    participants: 24,
  },
  {
    id: "2",
    title: "Midnight Pancakes",
    image: "/placeholder.svg?height=40&width=40",
    lastMessage: "Taylor: I'll bring extra syrup!",
    time: "2h ago",
    unread: 0,
    participants: 12,
  },
  {
    id: "3",
    title: "Basketball Tournament",
    image: "/placeholder.svg?height=40&width=40",
    lastMessage: "Sam: Team meeting at 1:30 before the game",
    time: "1d ago",
    unread: 0,
    participants: 18,
  },
]

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDirectMessages = directMessages.filter((message) =>
    message.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredEventChats = eventChats.filter((chat) => chat.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <main className="container pb-20">
      <div className="py-6">
        <div className="mb-6">
          <h1 className="mb-4 text-2xl font-bold">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="direct">
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="direct">Direct Messages</TabsTrigger>
            <TabsTrigger value="events">Event Chats</TabsTrigger>
          </TabsList>

          <TabsContent value="direct" className="space-y-3">
            {filteredDirectMessages.length > 0 ? (
              filteredDirectMessages.map((message) => (
                <Card key={message.id} className="overflow-hidden transition-all duration-300 hover:bg-muted/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <ProfileRing name={message.name} image={message.image} isActive={message.isActive} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{message.name}</h3>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                        <p className="truncate text-sm text-muted-foreground">{message.lastMessage}</p>
                      </div>
                      {message.unread > 0 && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                          {message.unread}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-muted">
                <p className="text-muted-foreground">No messages found</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="events" className="space-y-3">
            {filteredEventChats.length > 0 ? (
              filteredEventChats.map((chat) => (
                <Card key={chat.id} className="overflow-hidden transition-all duration-300 hover:bg-muted/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                          <MessageSquare className="h-6 w-6" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs">
                          {chat.participants}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{chat.title}</h3>
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                        </div>
                        <p className="truncate text-sm text-muted-foreground">{chat.lastMessage}</p>
                      </div>
                      {chat.unread > 0 && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                          {chat.unread}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-muted">
                <p className="text-muted-foreground">No event chats found</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </main>
  )
}
