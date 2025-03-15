import Link from "next/link"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import type { User } from "next-auth"
import { Settings, List } from "lucide-react"

export function DashboardHeader({ user }: { user: User }) {
  return (
    <header className="border-b border-[#05b9ca]/20 bg-[#041420]/80 backdrop-blur-md sticky top-0 z-10">
      <div className="container flex h-16 items-center px-4">
        <Link href="/dashboard" className="flex items-center">
          <span className="text-xl font-bold text-[#05b9ca]">Daily</span>
          <span className="text-xl font-bold text-white">Quest</span>
        </Link>

        <nav className="ml-auto flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-white hover:text-[#05b9ca] hover:bg-[#05b9ca]/10">
              <List className="h-5 w-5 mr-2" />
              Quests
            </Button>
          </Link>

          <Link href="/settings">
            <Button variant="ghost" className="text-white hover:text-[#05b9ca] hover:bg-[#05b9ca]/10">
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </Button>
          </Link>

          <UserNav user={user} />
        </nav>
      </div>
    </header>
  )
}

