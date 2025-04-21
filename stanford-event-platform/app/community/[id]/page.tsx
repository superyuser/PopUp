"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BottomNav } from "@/components/bottom-nav"
import { ArrowLeft, MessageSquare, Bell, Plus, ThumbsUp } from "lucide-react"

// Mock data
const community = {
  id: "1",
  name: "CS Club",
  members: 156,
  channels: [
    { id: "general", name: "general", unread: 3 },
    { id: "announcements", name: "announcements", unread: 0 },
    { id: "event-ideas", name: "event-ideas", unread: 5 },
  ],
  eventProposals: [
    {
      id: "1",
      title: "Hackathon Weekend",
      description: "48-hour coding marathon with prizes",
      date: "May 15-17",
      votes: 24,
      hasVoted: true,
    },
    {
      id: "2",
      title: "Resume Workshop",
      description: "Get feedback from industry professionals",
      date: "April 28",
      votes: 18,
      hasVoted: false,
    },
    {
      id: "3",
      title: "Tech Talk: AI Ethics",
      description: "Panel discussion with Stanford AI researchers",
      date: "May 5",
      votes: 12,
      hasVoted: false,
    },
  ],
  isModerator: true,
}

export default function CommunityPage({ params }: { params: { id: string } }) {
  const [activeChannel, setActiveChannel] = useState("general")

  return (
    <div className="flex h-screen flex-col">
      <header className="border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/discover"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
            </Link>
            <h1 className="text-xl font-bold">{community.name}</h1>
            <Badge variant="outline" className="ml-2">
              {community.members} members
            </Badge>
          </div>

          {community.isModerator && (
            <Button className="multitone-button gap-2 font-medium">
              <Plus className="h-4 w-4" />
              Create Event
            </Button>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r border-border bg-muted/20">
          <div className="p-4">
            <h2 className="mb-2 text-sm font-medium text-muted-foreground">CHANNELS</h2>
            <div className="space-y-1">
              {community.channels.map((channel) => (
                <button
                  key={channel.id}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                    activeChannel === channel.id
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                  onClick={() => setActiveChannel(channel.id)}
                >
                  <div className="flex items-center gap-2">
                    {channel.id === "general" ? (
                      <MessageSquare className="h-4 w-4" />
                    ) : channel.id === "announcements" ? (
                      <Bell className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                    <span>#{channel.name}</span>
                  </div>

                  {channel.unread > 0 && (
                    <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 text-center text-xs">
                      {channel.unread}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="chat" className="h-full">
            <div className="border-b border-border">
              <div className="container">
                <TabsList className="h-12">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="events">Event Ideas</TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="chat" className="h-[calc(100%-3rem)] p-0">
              <div className="container py-4">
                <div className="flex h-[calc(100vh-12rem)] flex-col justify-end">
                  <div className="mb-4 rounded-lg bg-muted/30 p-4 text-center text-sm text-muted-foreground">
                    This is the beginning of the #{activeChannel} channel
                  </div>

                  <div className="mt-auto">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={`Message #${activeChannel}`}
                        className="w-full rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <Button className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full p-0" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="events" className="h-[calc(100%-3rem)] p-0">
              <div className="container py-4">
                <h2 className="mb-4 text-lg font-bold">Event Proposals</h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  Vote on event ideas or propose your own. The most popular ideas will be considered by moderators.
                </p>

                <div className="space-y-4">
                  {community.eventProposals.map((proposal) => (
                    <Card key={proposal.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{proposal.title}</h3>
                            <p className="text-sm text-muted-foreground">{proposal.description}</p>
                            <p className="mt-1 text-xs text-muted-foreground">Proposed for {proposal.date}</p>
                          </div>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            <span>{proposal.votes}</span>
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-muted/30 p-3">
                        <Button
                          variant={proposal.hasVoted ? "secondary" : "outline"}
                          size="sm"
                          className="w-full gap-2"
                          disabled={proposal.hasVoted}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          {proposal.hasVoted ? "Voted" : "Vote"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
