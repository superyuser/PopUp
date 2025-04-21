import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface MultitoneButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  glowOnHover?: boolean
}

export const MultitoneButton = forwardRef<HTMLButtonElement, MultitoneButtonProps>(
  ({ className, variant = "primary", size = "md", glowOnHover = true, children, ...props }, ref) => {
    const sizeClasses = {
      sm: "text-sm py-2 px-4",
      md: "text-base py-3 px-6",
      lg: "text-lg py-4 px-8",
    }

    return (
      <button
        ref={ref}
        className={cn(
          "rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-neon-lime focus:ring-opacity-50",
          variant === "primary" ? "multitone-button text-background" : "multitone-button-alt text-white",
          glowOnHover && "glow-button",
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

MultitoneButton.displayName = "MultitoneButton"
