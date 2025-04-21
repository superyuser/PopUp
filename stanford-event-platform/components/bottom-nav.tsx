"use client"

import { Home, FlameIcon as Fire, Users, MessageSquare, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/discover", label: "Discover", icon: Home },
    { href: "/hottest", label: "Hottest", icon: Fire },
    { href: "/friends", label: "Friends", icon: Users },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/profile", label: "Profile", icon: User },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border bg-background/80 backdrop-blur-lg">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center space-y-1",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className={cn("h-6 w-6", isActive && "animate-float")} />
            <span className="text-xs">{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
