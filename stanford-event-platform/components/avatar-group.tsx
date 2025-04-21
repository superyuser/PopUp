import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AvatarGroupProps {
  users: {
    name: string
    image: string
  }[]
  limit?: number
}

export function AvatarGroup({ users, limit = 3 }: AvatarGroupProps) {
  const visibleUsers = users.slice(0, limit)
  const remainingCount = users.length - limit

  return (
    <div className="flex -space-x-2">
      {visibleUsers.map((user, index) => (
        <Avatar
          key={index}
          className="border-2 border-background transition-transform hover:z-10 hover:translate-y-[-4px]"
        >
          <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      ))}

      {remainingCount > 0 && (
        <Avatar className="border-2 border-background bg-muted">
          <AvatarFallback>+{remainingCount}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
