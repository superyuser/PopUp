import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ProfileRingProps {
  name: string
  image: string
  isActive?: boolean
  size?: "sm" | "md" | "lg"
}

export function ProfileRing({ name, image, isActive = false, size = "md" }: ProfileRingProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  }

  return (
    <div className={cn("relative inline-block", isActive && "profile-ring")}>
      <Avatar className={cn("border-2 border-background", sizeClasses[size])}>
        <AvatarImage src={image || "/placeholder.svg"} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      {isActive && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary" />}
    </div>
  )
}
