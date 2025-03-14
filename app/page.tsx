import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          <span className="text-cyan-400">Daily</span> Quest System
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl">
          Level up your life with daily quests inspired by Solo Leveling. Complete tasks, gain stats, and become the
          strongest hunter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href="/api/auth/signin">
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-6 text-lg">Sign In with Google</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

