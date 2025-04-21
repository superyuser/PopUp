import Link from "next/link"
import { AnimatedBackground } from "@/components/animated-background"
import { GlowingLogo } from "@/components/glowing-logo"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <AnimatedBackground interactive={true} />

      <div className="z-10 flex flex-col items-center justify-center gap-8 px-4 text-center">
        <GlowingLogo size="xl" />

        <p className="max-w-md text-lg text-white/80 animate-fade-in">discover events happening around stanford</p>
      </div>

      {/* Fizz-style buttons positioned at bottom */}
      <div className="z-10 absolute bottom-16 w-full max-w-xs flex flex-col gap-3 px-4">
        <Link href="/signup" className="w-full">
          <Button
            variant="default"
            className="w-full bg-white text-background hover:bg-white/90 rounded-full py-6 font-medium text-base"
          >
            create account
          </Button>
        </Link>

        <Link href="/login" className="w-full">
          <Button
            variant="outline"
            className="w-full border-white text-white hover:bg-white/10 rounded-full py-6 font-medium text-base"
          >
            log in
          </Button>
        </Link>
      </div>

      <footer className="absolute bottom-6 z-10 text-sm text-white/60">made with 💜 on the farm</footer>
    </main>
  )
}
