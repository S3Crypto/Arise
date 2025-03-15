import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { DailyQuestModal } from "@/components/daily-quest-modal"
import { StatsDisplay } from "@/components/stats-display"
import { QuestProgress } from "@/components/quest-progress"
import { getUserStats, getUserQuests } from "@/lib/firebase"
import { DashboardHeader } from "@/components/dashboard-header"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  try {
    const userStats = await getUserStats(session.user.email)
    const userQuests = await getUserQuests(session.user.email)

    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <DashboardHeader user={session.user} />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <StatsDisplay stats={userStats} />
              <QuestProgress quests={userQuests} />
            </div>
            <div className="flex justify-center items-start">
              <DailyQuestModal quests={userQuests} userEmail={session.user.email} />
            </div>
          </div>
        </div>
      </main>
    )
  } catch (error) {
    console.error("Error loading dashboard:", error)

    // Fallback UI in case of error
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <DashboardHeader user={session.user} />

        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-red-500/20 border border-red-500 text-white p-6 rounded-lg max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
            <p className="mb-4">We encountered an error while loading your quest data. Please try again later.</p>
            <a href="/" className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded">
              Return to Home
            </a>
          </div>
        </div>
      </main>
    )
  }
}

